import DeepEqual from 'fast-deep-equal/es6/index.js'

import { ConvertStrategy } from '#src/convert-strategy'
import { Env } from '#src/env'
import { logger } from '#src/util/logger'

export class EnvType<T> {
	protected _defaultValue: T | undefined = undefined
	protected readonly _convertStrategy: ConvertStrategy<T>
	protected readonly _env: Env
	protected _allowedValues: T[] = []

	constructor(params: { convertStrategy: ConvertStrategy<T>; env: Env }) {
		const { convertStrategy, env } = params
		this._convertStrategy = convertStrategy
		this._env = env
	}

	default(defaultValue: T): this {
		this._loggerDebug('set default value', { defaultValue })
		this._defaultValue = defaultValue

		return this
	}

	get optional(): T | undefined {
		this._loggerDebug(`optional`)
		const strOrUndefined = this._env.envValue()

		this._loggerDebug(`try to convert env string value "${strOrUndefined}"`)
		const convertedValue = this._convertStrategy.convert(strOrUndefined)

		if (convertedValue === undefined) {
			this._loggerDebug(`using default value "${this._defaultValue}"`)
		}
		const optionalValue = convertedValue ?? this._defaultValue

		this._validateAllowedValues(optionalValue)

		return optionalValue
	}

	get required(): T {
		this._loggerDebug(`is required`)

		const envValue = this.optional
		if (envValue === undefined) {
			throw this._createError('must have value defined')
		}

		return envValue
	}

	allowed(...args: T[]): this {
		this._loggerDebug(`set allowed values`, { allowedValues: args })
		this._allowedValues = [...args]

		return this
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
		const result = this._allowedValues.find((v) => DeepEqual(value, v))
		if (result === undefined && value === undefined) {
			return false
		}
		if (result === null && value === null) {
			return false
		}

		return !result
	}

	protected _allowedValuesToString(): string {
		return this._allowedValues.map((v) => JSON.stringify(v)).join(', ')
	}

	protected _loggerDebug(msg: string, ...args: Record<string, any>[]): void {
		logger().debug(`${this._envName} ${msg}`, ...args)
	}

	protected _createError(msg: string): Error {
		return new Error(`${this._envName} ${msg}`)
	}

	protected get _envName(): string {
		return `Env[${this._env.names.join(',')}]`
	}
}
