import { afterAll, beforeEach, describe, expect, it, vi } from 'vitest'

import { Env } from '#src/business/component/__mocks__/env.js'
import { EnvType } from '#src/business/component/env/type.js'
import { MshEnvResolverError } from '#src/business/component/env-resolver-error.js'
import { MshEnvResolver, mshEnvResolver } from '#src/business/component/env-resolver.js'
import { ConvertStrategyMock } from '#src/business/service/convert-strategy/__mocks__/convert-strategy-mock.js'
import { LocationStrategyMock } from '#src/business/service/location-strategy/__mocks__/location-strategy-mock.js'
import { NamingStrategyMock } from '#src/business/service/naming-strategy/__mocks__/naming-strategy-mock.js'

vi.mock('#src/util/logger.js')
vi.mock('#src/business/component/env.js')

describe('MshEnvResolver', () => {
	let mockLocationStrategy: LocationStrategyMock
	let mockNamingStrategy: NamingStrategyMock

	const createEnv = (): Env => {
		return new Env({
			locationStrategies: [mockLocationStrategy],
			names: ['X'],
			namingStrategies: [mockNamingStrategy],
		})
	}

	const createLeaf = <T>(convertStrategy: ConvertStrategyMock, env: Env): EnvType<T> => {
		return new EnvType<T>({ convertStrategy, env: env as never })
	}

	beforeEach(() => {
		mockLocationStrategy = new LocationStrategyMock()
		mockNamingStrategy = new NamingStrategyMock()
	})

	afterAll(() => {
		vi.restoreAllMocks()
	})

	describe('flat object', () => {
		it('should resolve all builders in a flat object', () => {
			const envString = createEnv()
			const envNumber = createEnv()
			const convertString = new ConvertStrategyMock()
			const convertNumber = new ConvertStrategyMock()
			const leafString = createLeaf<string>(convertString, envString)
			const leafNum = createLeaf<number>(convertNumber, envNumber)

			envString.envValue.mockReturnValue('hello')
			envNumber.envValue.mockReturnValue('42')
			convertString.convert.mockReturnValue('hello')
			convertNumber.convert.mockReturnValue(42)

			const result = new MshEnvResolver().resolve({ a: leafString, b: leafNum })

			expect(result.a).toEqual('hello')
			expect(result.b).toEqual(42)
		})
	})

	describe('nested object', () => {
		it('should recurse into nested objects', () => {
			const env = createEnv()
			const convert = new ConvertStrategyMock()
			const leafString = createLeaf<string>(convert, env)

			env.envValue.mockReturnValue('localhost')
			convert.convert.mockReturnValue('localhost')

			const result = new MshEnvResolver().resolve({ db: { host: leafString } })

			expect(result.db.host).toEqual('localhost')
		})
	})

	describe('array of builders', () => {
		it('should resolve an array preserving order', () => {
			const envA = createEnv()
			const envB = createEnv()
			const convertA = new ConvertStrategyMock()
			const convertB = new ConvertStrategyMock()
			const leafA = createLeaf<string>(convertA, envA)
			const leafB = createLeaf<string>(convertB, envB)

			envA.envValue.mockReturnValue('a')
			envB.envValue.mockReturnValue('b')
			convertA.convert.mockReturnValue('a')
			convertB.convert.mockReturnValue('b')

			const result = new MshEnvResolver().resolve({ ports: [leafA, leafB] })

			expect(result.ports).toEqual(['a', 'b'])
		})
	})

	describe('plain pass-through values', () => {
		it('should pass through primitives, Date and functions unchanged', () => {
			const plainFn = vi.fn(() => {
				return 99
			})
			const dateInstance = new Date()

			const result = new MshEnvResolver().resolve({ date: dateInstance, flag: true, fn: plainFn, num: 1, str: 'plain' })

			expect(result.num).toEqual(1)
			expect(result.str).toEqual('plain')
			expect(result.flag).toEqual(true)
			expect(result.date).toBe(dateInstance)
			expect(result.fn()).toEqual(99)
		})
	})

	describe('partial failure', () => {
		it('should resolve the rest then throw when one builder fails', () => {
			const envOk = createEnv()
			const envFail = createEnv()
			const convertOk = new ConvertStrategyMock()
			const convertFail = new ConvertStrategyMock()
			const leafOk = createLeaf<string>(convertOk, envOk)
			const leafFail = createLeaf<string>(convertFail, envFail)

			envOk.envValue.mockReturnValue('ok')
			convertOk.convert.mockReturnValue('ok')
			envFail.envValue.mockReturnValue(undefined)
			convertFail.convert.mockReturnValue(undefined)

			let thrown: unknown
			try {
				new MshEnvResolver().resolve({ bad: leafFail, good: leafOk })
			} catch (e: unknown) {
				thrown = e
			}

			expect(thrown!).toBeInstanceOf(MshEnvResolverError)
			expect(convertOk.convert).toHaveBeenCalledTimes(1)
			expect(envOk.envValue).toHaveBeenCalledTimes(1)
		})
	})

	describe('multiple failures', () => {
		it('should collect all failures with correct dotted paths', () => {
			const envHost = createEnv()
			const envKey = createEnv()
			const convertHost = new ConvertStrategyMock()
			const convertKey = new ConvertStrategyMock()
			const leafHost = createLeaf<string>(convertHost, envHost)
			const leafKey = createLeaf<string>(convertKey, envKey)

			envHost.envValue.mockReturnValue(undefined)
			envKey.envValue.mockReturnValue(undefined)
			convertHost.convert.mockReturnValue(undefined)
			convertKey.convert.mockReturnValue(undefined)

			let thrown: unknown
			try {
				new MshEnvResolver().resolve({ apiKey: leafKey, db: { host: leafHost } })
			} catch (e: unknown) {
				thrown = e
			}

			const error = thrown! as MshEnvResolverError
			expect(error).toBeInstanceOf(MshEnvResolverError)
			expect(error.message).toContain('db.host')
			expect(error.message).toContain('apiKey')
			expect(error.failures).toHaveLength(2)
		})
	})

	describe('return types', () => {
		it('should infer resolved types at compile time', () => {
			const envString = createEnv()
			const envBool = createEnv()
			const envNum = createEnv()
			const convertString = new ConvertStrategyMock()
			const convertBool = new ConvertStrategyMock()
			const convertNum = new ConvertStrategyMock()
			const leafStringRequired = createLeaf<string>(convertString, envString)
			const leafBoolOptional = createLeaf<boolean>(convertBool, envBool).optional
			const leafNum = createLeaf<number>(convertNum, envNum)

			envString.envValue.mockReturnValue('x')
			envBool.envValue.mockReturnValue(true)
			envNum.envValue.mockReturnValue(7)
			convertString.convert.mockReturnValue('x')
			convertBool.convert.mockReturnValue(true)
			convertNum.convert.mockReturnValue(7)

			const config = new MshEnvResolver().resolve({ a: leafStringRequired, arr: [leafNum], b: leafBoolOptional })

			const _assertTypes = (cfg: typeof config): void => {
				const _a: string = cfg.a
				const _b: boolean | undefined = cfg.b
				const _first: number = cfg.arr[0]!
				// @ts-expect-error - properties are readonly
				cfg.a = 'x'
				void _a
				void _b
				void _first
			}
			void _assertTypes

			expect(config.a).toEqual('x')
			expect(config.b).toEqual(true)
			expect(config.arr[0]).toEqual(7)
		})
	})

	describe('immutability', () => {
		it('should freeze the top-level, nested and array results', () => {
			const envString = createEnv()
			const envNum = createEnv()
			const convertString = new ConvertStrategyMock()
			const convertNum = new ConvertStrategyMock()
			const leafString = createLeaf<string>(convertString, envString)
			const leafNum = createLeaf<number>(convertNum, envNum)

			envString.envValue.mockReturnValue('host')
			envNum.envValue.mockReturnValue(5)
			convertString.convert.mockReturnValue('host')
			convertNum.convert.mockReturnValue(5)

			const config = new MshEnvResolver().resolve({ arr: [leafNum], db: { host: leafString } })

			expect(Object.isFrozen(config)).toEqual(true)
			expect(Object.isFrozen(config.db)).toEqual(true)
			expect(Object.isFrozen(config.arr)).toEqual(true)
		})

		it('should deep-freeze a builder result that is a plain object', () => {
			const env = createEnv()
			const convert = new ConvertStrategyMock()
			const leafJson = createLeaf<{ host: string; port: number }>(convert, env)

			env.envValue.mockReturnValue('{"host":"h","port":1}')
			convert.convert.mockReturnValue({ host: 'h', port: 1 })

			const config = new MshEnvResolver().resolve({ cfg: leafJson })

			expect(Object.isFrozen(config)).toEqual(true)
			expect(Object.isFrozen(config.cfg)).toEqual(true)
		})
	})
})

describe('mshEnvResolver', () => {
	it('should resolve a plain config object through the arrow function', () => {
		const result = mshEnvResolver({ num: 1, str: 'plain' })

		expect(result.num).toEqual(1)
		expect(result.str).toEqual('plain')
	})
})
