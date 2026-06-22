import DeepEqual from 'fast-deep-equal/es6/index.js'

import { type Env } from '#src/business/component/env.js'
import { type ConvertStrategy } from '#src/business/service/convert-strategy.js'
import { logger } from '#src/util/logger.js'

export enum EnvMode {
	REQUIRED = 'REQUIRED',
	OPTIONAL = 'OPTIONAL',
	DEFAULT = 'DEFAULT',
}

export class EnvType<T> {
	protected _mode: EnvMode = EnvMode.REQUIRED
	protected _defaultValue: T | undefined = undefined
	protected readonly _convertStrategy: ConvertStrategy<T>
	protected readonly _env: Env
	protected _allowedValues: T[] = []

	constructor(params: { convertStrategy: ConvertStrategy<T>; env: Env }) {
		const { convertStrategy, env } = params
		this._convertStrategy = convertStrategy
		this._env = env
	}

	// eslint-disable-next-line @typescript-eslint/prefer-return-this-type -- .optional intentionally widens the resolved type to T | undefined
	get optional(): EnvType<T | undefined> {
		this._loggerDebug('optional')
		this._mode = EnvMode.OPTIONAL

		return this
	}

	default(defaultValue: T): this {
		this._loggerDebug('set default value', { defaultValue })
		this._defaultValue = defaultValue
		this._mode = EnvMode.DEFAULT

		return this
	}

	allowed(...args: T[]): this {
		this._loggerDebug('set allowed values', { allowedValues: args })
		this._allowedValues = [...args]

		return this
	}

	get value(): T {
		return this._resolve()
	}

	_tryResolve(): { ok: true; value: T } | { ok: false; error: Error } {
		try {
			return { ok: true, value: this._resolve() }
		} catch (e: unknown) {
			if (e instanceof Error) {
				return { error: e, ok: false }
			}

			return { error: new Error(String(e)), ok: false }
		}
	}

	protected _resolve(): T {
		const raw = this._env.envValue()
		this._loggerDebug(`try to convert env string value "${String(raw)}"`)
		const converted = this._convertStrategy.convert(raw)
		const value = this._resolveValue(converted)
		if (value === undefined && this._mode !== EnvMode.OPTIONAL) {
			throw this._createError('must have value defined')
		}
		this._validateAllowedValues(value)

		return value as T
	}

	protected _resolveValue(converted: T | undefined): T | undefined {
		if (converted !== undefined) {
			return converted
		}
		this._loggerDebug(`using default value "${String(this._defaultValue)}"`)

		return this._defaultValue
	}

	protected _validateAllowedValues(value?: T): void {
		if (this._allowedValues.length === 0) {
			return
		}
		this._loggerDebug('validating allowed values for:', { value })

		if (this._allowedValuesDoNotContain(value)) {
			throw this._createError(`must have one of the fallowing values: ${this._allowedValuesToString()}`)
		}
	}

	protected _allowedValuesDoNotContain(value?: T): boolean {
		const foundIndex = this._allowedValues.findIndex((v) => {
			return DeepEqual(value, v)
		})

		return foundIndex === -1
	}

	protected _allowedValuesToString(): string {
		return this._allowedValues.map((v) => JSON.stringify(v)).join(', ')
	}

	protected _loggerDebug(msg: string, ...args: Record<string, unknown>[]): void {
		logger().debug(`${this._envName} ${msg}`, ...args)
	}

	protected _createError(msg: string): Error {
		return new Error(`${this._envName} ${msg}`)
	}

	protected get _envName(): string {
		return `Env[${this._env.names.join(',')}]`
	}
}
