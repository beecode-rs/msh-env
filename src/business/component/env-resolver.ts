import { MshEnvResolverError, type MshEnvResolverFailure } from './env-resolver-error.js'

import { EnvType } from '#src/business/component/env/type.js'

// prettier-ignore
export type DeepReadonly<T> =
		T extends (...args: never[]) => unknown ? T
	: T extends readonly unknown[]? readonly DeepReadonly<T[number]>[]
	: T extends object ? { readonly [K in keyof T]: DeepReadonly<T[K]> }
	: T

// prettier-ignore
export type Resolve<T> =
		T extends EnvType<infer V> ? DeepReadonly<V>
	: T extends (...args: never[]) => unknown ? T
	: T extends readonly unknown[] ? readonly Resolve<T[number]>[]
	: T extends object ? { readonly [K in keyof T]: Resolve<T[K]> }
	: T

export class MshEnvResolver {
	resolve<T>(obj: T): Resolve<T> {
		const failures: MshEnvResolverFailure[] = []
		const resolved = this._walk(obj, [], failures)
		if (failures.length > 0) {
			throw new MshEnvResolverError(failures)
		}

		return resolved as Resolve<T>
	}

	protected _walk(node: unknown, path: PropertyKey[], failures: MshEnvResolverFailure[]): unknown {
		if (this._isEnvType(node)) {
			const result = node._tryResolve()
			if (!result.ok) {
				failures.push({ error: result.error, path })

				return undefined
			}

			return this._deepFreeze(result.value)
		}
		if (Array.isArray(node)) {
			const mapped = node.map((item, index) => {
				return this._walk(item, [...path, index], failures)
			})

			return Object.freeze(mapped)
		}
		if (this._isPlainObject(node)) {
			const entries = Object.entries(node).map(([key, value]) => {
				return [key, this._walk(value, [...path, key], failures)] as const
			})

			return Object.freeze(Object.fromEntries(entries))
		}

		return node
	}

	protected _isEnvType(v: unknown): v is EnvType<unknown> {
		return v instanceof EnvType
	}

	protected _isPlainObject(v: unknown): v is Record<string, unknown> {
		if (v === null || typeof v !== 'object') {
			return false
		}
		const proto = Object.getPrototypeOf(v)

		return proto === Object.prototype || proto === null
	}

	protected _deepFreeze<T>(value: T): T {
		if (Array.isArray(value)) {
			const frozenItems = value.map((item) => {
				return this._deepFreeze(item)
			})

			return Object.freeze(frozenItems) as T
		}
		if (this._isPlainObject(value)) {
			const entries = Object.entries(value).map(([key, child]) => {
				return [key, this._deepFreeze(child)] as const
			})

			return Object.freeze(Object.fromEntries(entries)) as T
		}

		return value
	}
}

export const mshEnvResolver = <T>(obj: T): Resolve<T> => {
	return new MshEnvResolver().resolve(obj)
}
