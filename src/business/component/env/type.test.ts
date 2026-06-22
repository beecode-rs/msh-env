import assert from 'assert'

import { type Mock, afterAll, beforeEach, describe, expect, it, vi } from 'vitest'

import { EnvTypeSpy } from '#src/business/component/env/__mocks__/type-spy.js'
import { EnvMode } from '#src/business/component/env/type.js'
import { Env } from '#src/business/component/env.js'
import { ConvertStrategyMock } from '#src/business/service/convert-strategy/__mocks__/convert-strategy-mock.js'
import { LocationStrategyMock } from '#src/business/service/location-strategy/__mocks__/location-strategy-mock.js'
import { NamingStrategyMock } from '#src/business/service/naming-strategy/__mocks__/naming-strategy-mock.js'
import { logger } from '#src/util/logger.js'

vi.mock('#src/util/logger.js')
vi.mock('#src/business/component/env.js')

describe.each([
	[['DUMMY_TEST_ENV']],
	[['DUMMY_TEST_ENV', 'DUMMY_TEST_ENV2']],
	[['DUMMY_TEST_ENV', 'DUMMY_TEST_ENV2', 'DUMMY_TEST_ENV3']],
])('%#. EnvType envNames: %p', (envNames) => {
	// eslint-disable-next-line @typescript-eslint/no-explicit-any
	let dummyEnvType: EnvTypeSpy<any>
	let mockConvertStrategy: ConvertStrategyMock
	let mockLocationStrategy: LocationStrategyMock
	let mockNamingStrategy: NamingStrategyMock
	let mockEnv: Env

	beforeEach(() => {
		mockConvertStrategy = new ConvertStrategyMock()
		mockLocationStrategy = new LocationStrategyMock()
		mockNamingStrategy = new NamingStrategyMock()
		mockEnv = new Env({
			locationStrategies: [mockLocationStrategy],
			names: envNames,
			namingStrategies: [mockNamingStrategy],
		})
		dummyEnvType = new EnvTypeSpy({ convertStrategy: mockConvertStrategy, env: mockEnv })
	})

	afterAll(() => {
		vi.restoreAllMocks()
	})

	describe('constructor', () => {
		it('should pass properties and default mode is required', () => {
			expect(dummyEnvType['_convertStrategy']).toEqual(mockConvertStrategy)
			expect(dummyEnvType['_env']).toEqual(mockEnv)
			expect(dummyEnvType['_defaultValue']).toBeUndefined()
			expect(dummyEnvType['_allowedValues']).toEqual([])
			expect(dummyEnvType['_mode']).toEqual(EnvMode.REQUIRED)
		})
	})

	describe('optional', () => {
		it('should set mode to optional and return the same builder reference', () => {
			const result = dummyEnvType.optional

			expect(dummyEnvType['_mode']).toEqual(EnvMode.OPTIONAL)
			expect(result).toBe(dummyEnvType)
		})

		it('should not read env or convert when only optional is accessed', () => {
			// eslint-disable-next-line @typescript-eslint/no-unused-expressions
			dummyEnvType.optional

			expect(mockEnv.envValue).not.toHaveBeenCalled()
			expect(mockConvertStrategy.convert).not.toHaveBeenCalled()
		})

		it('should log optional', () => {
			// eslint-disable-next-line @typescript-eslint/no-unused-expressions
			dummyEnvType.optional

			expect(dummyEnvType.loggerDebugSpy).toHaveBeenCalledWith('optional')
		})
	})

	describe('default', () => {
		it('should set default value and mode and return the same builder', () => {
			const dummyDefaultValue = 'someDefaultValue'

			const result = dummyEnvType.default(dummyDefaultValue)

			expect(dummyEnvType['_defaultValue']).toEqual(dummyDefaultValue)
			expect(dummyEnvType['_mode']).toEqual(EnvMode.DEFAULT)
			expect(result).toBe(dummyEnvType)
		})

		it('should not read env or convert', () => {
			dummyEnvType.default('someDefaultValue')

			expect(mockEnv.envValue).not.toHaveBeenCalled()
			expect(mockConvertStrategy.convert).not.toHaveBeenCalled()
		})

		it('should log set default value with default value', () => {
			const dummyDefaultValue = 'someDefaultValue'

			dummyEnvType.default(dummyDefaultValue)

			expect(dummyEnvType.loggerDebugSpy).toHaveBeenCalledWith('set default value', {
				defaultValue: dummyDefaultValue,
			})
		})
	})

	describe('allowed', () => {
		it('should set allowedValues', () => {
			const dummyAllowedValues = ['test', 'test2']
			assert.deepEqual(dummyEnvType['_allowedValues'], [])

			const result = dummyEnvType.allowed(...dummyAllowedValues)

			assert.deepEqual(dummyEnvType['_allowedValues'], dummyAllowedValues)
			expect(dummyEnvType.loggerDebugSpy).toHaveBeenCalledTimes(1)
			expect(dummyEnvType.loggerDebugSpy).toHaveBeenCalledWith('set allowed values', {
				allowedValues: dummyAllowedValues,
			})
			expect(result).toBe(dummyEnvType)
		})
	})

	describe('value', () => {
		it('should return converted value in required mode when value is defined', () => {
			const envValue = 'actualEnvValue'
			mockConvertStrategy.convert.mockReturnValue(envValue)

			const result = dummyEnvType.value

			expect(result).toEqual(envValue)
			expect(mockEnv.envValue).toHaveBeenCalledTimes(1)
			expect(mockConvertStrategy.convert).toHaveBeenCalledTimes(1)
		})

		it('should throw in required mode when converted value is undefined', () => {
			const mock_createError: Mock = vi.fn().mockImplementation((msg: string) => {
				return new Error(`Env[TEST] ${msg}`)
			})
			dummyEnvType['createErrorSpy'] = mock_createError
			mockConvertStrategy.convert.mockReturnValue(undefined)

			try {
				// eslint-disable-next-line @typescript-eslint/no-unused-expressions
				dummyEnvType.value
				throw new Error('test failed')
			} catch (err: unknown) {
				if (!(err instanceof Error)) {
					throw err
				}
				expect(mock_createError).toHaveBeenCalledTimes(1)
				expect(mock_createError).toHaveBeenCalledWith('must have value defined')
				expect(err.message).toEqual('Env[TEST] must have value defined')
			}
		})

		it('should return undefined in optional mode when converted value is undefined', () => {
			mockConvertStrategy.convert.mockReturnValue(undefined)

			const result = dummyEnvType.optional.value

			expect(result).toBeUndefined()
		})

		it('should return default value in default mode when converted value is undefined', () => {
			const dummyDefaultValue = 'someDefaultValue'
			mockConvertStrategy.convert.mockReturnValue(undefined)

			const result = dummyEnvType.default(dummyDefaultValue).value

			expect(result).toEqual(dummyDefaultValue)
		})

		it('should rethrow error thrown by convert strategy', () => {
			mockConvertStrategy.convert.mockImplementation(() => {
				throw new Error('boom')
			})

			try {
				// eslint-disable-next-line @typescript-eslint/no-unused-expressions
				dummyEnvType.value
				throw new Error('test failed')
			} catch (err: unknown) {
				if (!(err instanceof Error)) {
					throw err
				}
				expect(err.message).toEqual('boom')
			}
		})

		it('should throw when value is not in allowed values', () => {
			const mock_createError: Mock = vi.fn().mockImplementation((msg: string) => {
				return new Error(`Env[TEST] ${msg}`)
			})
			dummyEnvType['createErrorSpy'] = mock_createError
			const dummyAllowedValues = ['a']
			const dummyAllowedValuesString = JSON.stringify(dummyAllowedValues)
			dummyEnvType.allowedValuesToStringSpy.mockReturnValue(dummyAllowedValuesString)
			dummyEnvType.allowedValuesDoNotContainSpy.mockReturnValue(true)
			dummyEnvType['_allowedValues'] = dummyAllowedValues
			mockConvertStrategy.convert.mockReturnValue('b')

			try {
				// eslint-disable-next-line @typescript-eslint/no-unused-expressions
				dummyEnvType.value
				throw new Error('test failed')
			} catch (err: unknown) {
				if (!(err instanceof Error)) {
					throw err
				}
				expect(mock_createError).toHaveBeenCalledWith(
					`must have one of the fallowing values: ${dummyAllowedValuesString}`
				)
				expect(err.message).toEqual(`Env[TEST] must have one of the fallowing values: ${dummyAllowedValuesString}`)
			}
		})
	})

	describe('_tryResolve', () => {
		it('should return ok true with value when resolution succeeds', () => {
			const envValue = 'actualEnvValue'
			mockConvertStrategy.convert.mockReturnValue(envValue)

			const result = dummyEnvType._tryResolve()

			expect(result).toEqual({ ok: true, value: envValue })
		})

		it('should return ok false with error when resolution fails and not throw', () => {
			mockConvertStrategy.convert.mockReturnValue(undefined)

			const result = dummyEnvType._tryResolve()

			expect(result.ok).toEqual(false)
			if (!result.ok) {
				expect(result.error).toBeInstanceOf(Error)
			}
		})
	})

	describe('_resolveValue', () => {
		it('should return converted value when defined', () => {
			const converted = 'someValue'

			const result = dummyEnvType['_resolveValue'](converted)

			expect(result).toEqual(converted)
		})

		it('should return default value when converted is undefined', () => {
			const dummyDefaultValue = 'someDefaultValue'
			dummyEnvType['_defaultValue'] = dummyDefaultValue

			const result = dummyEnvType['_resolveValue'](undefined)

			expect(result).toEqual(dummyDefaultValue)
		})
	})

	describe('_validateAllowedValues', () => {
		let mock_createError: Mock

		beforeEach(() => {
			mock_createError = vi.fn().mockImplementation((msg: string) => {
				return new Error(`Env[TEST] ${msg}`)
			})
			dummyEnvType['createErrorSpy'] = mock_createError
		})

		it('should return without calling anything if no allowed values present', () => {
			dummyEnvType['_allowedValues'] = []
			dummyEnvType['_validateAllowedValues'](undefined)

			expect(dummyEnvType.loggerDebugSpy).not.toHaveBeenCalled()
			expect(dummyEnvType.allowedValuesDoNotContainSpy).not.toHaveBeenCalled()
			expect(dummyEnvType.allowedValuesToStringSpy).not.toHaveBeenCalled()
			expect(mock_createError).not.toHaveBeenCalled()
		})

		it('should not throw error if value is contained in allowed values', () => {
			const value = 'a'
			dummyEnvType['_allowedValues'] = [value]
			dummyEnvType.allowedValuesDoNotContainSpy.mockReturnValue(false)

			dummyEnvType['_validateAllowedValues'](value)

			expect(dummyEnvType.loggerDebugSpy).toHaveBeenCalledTimes(1)
			expect(dummyEnvType.loggerDebugSpy).toHaveBeenCalledWith('validating allowed values for:', { value })
			expect(dummyEnvType.allowedValuesDoNotContainSpy).toHaveBeenCalledTimes(1)
			expect(dummyEnvType.allowedValuesToStringSpy).not.toHaveBeenCalledTimes(1)
			expect(mock_createError).not.toHaveBeenCalled()
		})

		it('should throw error if value is not contained', () => {
			const value = 'b'
			const dummyAllowedValues = ['a']
			const dummyAllowedValuesString = JSON.stringify(dummyAllowedValues)
			dummyEnvType.allowedValuesToStringSpy.mockReturnValue(dummyAllowedValuesString)
			dummyEnvType['_allowedValues'] = dummyAllowedValues
			dummyEnvType.allowedValuesDoNotContainSpy.mockReturnValue(true)

			try {
				dummyEnvType['_validateAllowedValues'](value)
				throw new Error('test failed')
			} catch (err: unknown) {
				if (!(err instanceof Error)) {
					throw err
				}
				expect(dummyEnvType.loggerDebugSpy).toHaveBeenCalledTimes(1)
				expect(dummyEnvType.loggerDebugSpy).toHaveBeenCalledWith('validating allowed values for:', { value })
				expect(dummyEnvType.allowedValuesDoNotContainSpy).toHaveBeenCalledTimes(1)
				expect(dummyEnvType.allowedValuesToStringSpy).toHaveBeenCalledTimes(1)
				expect(mock_createError).toHaveBeenCalledTimes(1)
				expect(mock_createError).toHaveBeenCalledWith(
					`must have one of the fallowing values: ${dummyAllowedValuesString}`
				)
				expect(err.message).toEqual(`Env[TEST] must have one of the fallowing values: ${dummyAllowedValuesString}`)
			}
		})
	})

	describe('_allowedValuesDoNotContain', () => {
		it.each([
			['a', ['a', 'b', 'c']],
			['3', ['1', '2', '3']],
			[{ a: 2 }, [{ a: 1 }, { a: 2 }, { a: 3 }]],
			[undefined, [1, 4, undefined]],
			[null, [1, 4, null]],
		])('%#. should return false if value "%s" is in allowed values: %j', (value, allowedValues) => {
			dummyEnvType['_allowedValues'] = allowedValues
			const result = dummyEnvType['_allowedValuesDoNotContain'](value)
			expect(result).toBeFalsy()
		})
		it.each([
			['d', ['a', 'b', 'c']],
			['4', ['1', '2', '3']],
			[{ b: 2 }, [{ a: 1 }, { a: 2 }, { a: 3 }]],
			[null, [1, 4, undefined]],
			[undefined, [1, 4, null]],
		])('%#. should return true if value "%s" is in allowed values: %j', (value, allowedValues) => {
			dummyEnvType['_allowedValues'] = allowedValues
			const result = dummyEnvType['_allowedValuesDoNotContain'](value)
			expect(result).toBeTruthy()
		})
	})

	describe('_allowedValuesToString', () => {
		it.each([
			[[{ a: 1 }], '{"a":1}'],
			[[{ a: 1 }, { b: 2 }], '{"a":1}, {"b":2}'],
			[['test1', 'test2'], '"test1", "test2"'],
			[[null, undefined, '', 123], 'null, , "", 123'],
		])('%#. should print json for %p', (jsonValue, stringValue) => {
			dummyEnvType['_allowedValues'] = jsonValue
			expect(dummyEnvType['_allowedValuesToString']()).toEqual(stringValue)
		})
	})

	describe('_loggerDebug', () => {
		let mock_envName: Mock
		beforeEach(() => {
			mock_envName = vi.fn().mockReturnValue('Env[TEST]')
			Object.defineProperty(dummyEnvType, '_envName', {
				get: () => {
					return mock_envName()
				},
			})
		})

		it('should call logger.debug without meta data', () => {
			dummyEnvType['_loggerDebug']('test')

			expect(logger().debug).toHaveBeenCalledTimes(1)
			expect(logger().debug).toHaveBeenCalledWith('Env[TEST] test')
			expect(mock_envName).toHaveBeenCalledTimes(1)
		})

		it('should call logger.debug with meta data', () => {
			const metaData = { test: true }
			dummyEnvType['_loggerDebug']('test', { metaData })

			expect(logger().debug).toHaveBeenCalledTimes(1)
			expect(logger().debug).toHaveBeenCalledWith('Env[TEST] test', { metaData })
			expect(mock_envName).toHaveBeenCalledTimes(1)
		})
	})

	describe('_createError', () => {
		let mock_envName: Mock
		beforeEach(() => {
			mock_envName = vi.fn().mockReturnValue('Env[TEST]')
			Object.defineProperty(dummyEnvType, '_envName', {
				get: () => {
					return mock_envName()
				},
			})
		})

		it('should return new Error', () => {
			const result = dummyEnvType['_createError']('test')

			expect(mock_envName).toHaveBeenCalledTimes(1)
			expect(result instanceof Error).toBeTruthy()
			expect(result.message).toEqual('Env[TEST] test')
		})
	})

	describe('_envName', () => {
		it('should return pretty env name', () => {
			const result = dummyEnvType['_envName']

			expect(result).toEqual(`Env[${envNames.join()}]`)
		})
	})
})
