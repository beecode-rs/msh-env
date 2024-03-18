import { afterAll, afterEach, beforeEach, describe, expect, it, jest } from '@jest/globals'
import assert from 'assert'

import { ConvertStrategyMock } from '#src/convert-strategy/__mocks__/convert-strategy-mock'
import { Env } from '#src/env'
import { EnvType } from '#src/env/type'
import { LocationStrategyMock } from '#src/location-strategy/__mocks__/location-strategy-mock'
import { NamingStrategyMock } from '#src/naming-strategy/__mocks__/naming-strategy-mock'
import { logger } from '#src/util/logger'

jest.mock('#src/util/logger')
jest.mock('#src/env')

describe.each([
	[['DUMMY_TEST_ENV']],
	[['DUMMY_TEST_ENV', 'DUMMY_TEST_ENV2']],
	[['DUMMY_TEST_ENV', 'DUMMY_TEST_ENV2', 'DUMMY_TEST_ENV3']],
])('%#. EnvType envNames: %p', (envNames) => {
	// eslint-disable-next-line @typescript-eslint/no-explicit-any
	let dummyEnvType: EnvType<any>
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
		dummyEnvType = new EnvType({ convertStrategy: mockConvertStrategy, env: mockEnv })
	})

	afterEach(() => {
		jest.resetAllMocks()
	})
	afterAll(() => {
		jest.restoreAllMocks()
	})

	describe('constructor', () => {
		it('should pass properties', () => {
			expect(dummyEnvType['_convertStrategy']).toEqual(mockConvertStrategy)
			expect(dummyEnvType['_env']).toEqual(mockEnv)
			expect(dummyEnvType['_defaultValue']).toBeUndefined()
			expect(dummyEnvType['_allowedValues']).toEqual([])
		})
	})

	describe('default', () => {
		let spy_loggerDebug: jest.SpiedFunction<any>
		beforeEach(() => {
			// eslint-disable-next-line @typescript-eslint/no-explicit-any
			spy_loggerDebug = jest.spyOn(dummyEnvType, '_loggerDebug' as any).mockImplementation(jest.fn as any)
		})

		it('should set defaultValue', () => {
			dummyEnvType['_defaultValue'] = undefined
			const dummyDefaultValue = 'someDefaultValue'
			const result = dummyEnvType.default(dummyDefaultValue)
			expect(result).toEqual(dummyEnvType)
			expect(dummyEnvType['_defaultValue']).toEqual(dummyDefaultValue)
			expect(spy_loggerDebug).toHaveBeenCalledTimes(1)
			expect(spy_loggerDebug).toHaveBeenCalledWith('set default value', { defaultValue: dummyDefaultValue })
		})
	})

	describe('optional', () => {
		let spy_validateAllowedValues: jest.SpiedFunction<any>
		let spy_loggerDebug: jest.SpiedFunction<any>
		beforeEach(() => {
			// eslint-disable-next-line @typescript-eslint/no-explicit-any
			spy_validateAllowedValues = jest.spyOn(dummyEnvType, '_validateAllowedValues' as any).mockImplementation(jest.fn as any)
			// eslint-disable-next-line @typescript-eslint/no-explicit-any
			spy_loggerDebug = jest.spyOn(dummyEnvType, '_loggerDebug' as any).mockImplementation(jest.fn as any)
		})

		it('should call env.envValue', () => {
			dummyEnvType.optional
			expect(mockEnv.envValue).toHaveBeenCalledTimes(1)
		})

		it.each([['someValue'], [undefined], [123]])(
			"%#. should call convert strategy convert and return it's value (%s)",
			(value) => {
				mockConvertStrategy.convert.mockReturnValue(value)
				const result = dummyEnvType.optional
				expect(mockConvertStrategy.convert).toHaveBeenCalledTimes(1)
				expect(result).toBe(value)
			}
		)

		it('should use default value if envValue is undefined', () => {
			mockConvertStrategy.convert.mockReturnValue(undefined)
			const dummyDefValue = 123
			dummyEnvType['_defaultValue'] = dummyDefValue
			const result = dummyEnvType.optional
			expect(result).toBe(dummyDefValue)
		})

		it('should not use default value if envValue is not undefined', () => {
			const envValue = 111
			mockConvertStrategy.convert.mockReturnValue(envValue)
			dummyEnvType['_defaultValue'] = 123
			const result = dummyEnvType.optional
			expect(result).toBe(envValue)
		})

		it('should call validateAllowedValues', () => {
			dummyEnvType.optional
			expect(spy_validateAllowedValues).toHaveBeenCalledTimes(1)
		})

		it('should log for debugging for undefined envValue', () => {
			dummyEnvType.optional
			expect(spy_loggerDebug).toHaveBeenCalledTimes(3)
			expect(spy_loggerDebug).toHaveBeenNthCalledWith(1, 'optional')
			expect(spy_loggerDebug).toHaveBeenNthCalledWith(2, 'try to convert env string value "undefined"')
			expect(spy_loggerDebug).toHaveBeenNthCalledWith(3, 'using default value "undefined"')
		})

		it('should log for debugging for undefined envValue using defined default value', () => {
			const dummyDefValue = 123
			dummyEnvType['_defaultValue'] = dummyDefValue
			dummyEnvType.optional
			expect(spy_loggerDebug).toHaveBeenCalledTimes(3)
			expect(spy_loggerDebug).toHaveBeenNthCalledWith(1, 'optional')
			expect(spy_loggerDebug).toHaveBeenNthCalledWith(2, 'try to convert env string value "undefined"')
			expect(spy_loggerDebug).toHaveBeenNthCalledWith(3, `using default value "${dummyDefValue}"`)
		})

		it('should log for debugging for defined envValue', () => {
			const envValue = 111
			mockConvertStrategy.convert.mockReturnValue(envValue)
			dummyEnvType.optional
			expect(spy_loggerDebug).toHaveBeenCalledTimes(2)
			expect(spy_loggerDebug).toHaveBeenNthCalledWith(1, 'optional')
			expect(spy_loggerDebug).toHaveBeenNthCalledWith(2, 'try to convert env string value "undefined"')
		})
	})

	describe('required', () => {
		let mock_optional: jest.Mock<any>
		let spy_loggerDebug: jest.SpiedFunction<any>
		let mock_createError: jest.Mock<any>

		beforeEach(() => {
			mock_optional = jest.fn<any>()
			Object.defineProperty(dummyEnvType, 'optional', {
				get: () => mock_optional(),
			})
			// eslint-disable-next-line @typescript-eslint/no-explicit-any
			spy_loggerDebug = jest.spyOn(dummyEnvType, '_loggerDebug' as any).mockImplementation(() => {}) // eslint-disable-line @typescript-eslint/no-empty-function

			mock_createError = jest.fn<(a: string) => Error>().mockImplementation((msg: string) => {
				return new Error(`Env[TEST] ${msg}`)
			})
			dummyEnvType['_createError'] = mock_createError
		})

		it('should throw error ifl optional value is undefined', () => {
			mock_optional.mockReturnValue(undefined)
			try {
				dummyEnvType.required
				throw new Error('test failed')
			} catch (err: any) {
				expect(mock_optional).toHaveBeenCalledTimes(1)
				expect(mock_createError).toHaveBeenCalledTimes(1)
				expect(mock_createError).toHaveBeenCalledWith('must have value defined')
				expect(spy_loggerDebug).toHaveBeenCalledTimes(1)
				expect(spy_loggerDebug).toHaveBeenCalledWith('is required')
				expect(err.message).toEqual('Env[TEST] must have value defined')
			}
		})

		it('should return env optional value if defined', () => {
			const envValue = 123
			mock_optional.mockReturnValue(envValue)

			const result = dummyEnvType.required
			expect(result).toEqual(envValue)

			expect(mock_optional).toHaveBeenCalledTimes(1)
			expect(spy_loggerDebug).toHaveBeenCalledTimes(1)
			expect(spy_loggerDebug).toHaveBeenCalledWith('is required')
		})
	})

	describe('allowed', () => {
		let spy_loggerDebug: jest.SpiedFunction<any>

		beforeEach(() => {
			// eslint-disable-next-line @typescript-eslint/no-explicit-any
			spy_loggerDebug = jest.spyOn(dummyEnvType, '_loggerDebug' as any).mockImplementation(() => {}) // eslint-disable-line @typescript-eslint/no-empty-function
		})

		it('should set allowedValues', () => {
			const dummyAllowedValues = ['test', 'test2']
			assert.deepEqual(dummyEnvType['_allowedValues'], [])
			const result = dummyEnvType.allowed(...dummyAllowedValues)
			assert.deepEqual(dummyEnvType['_allowedValues'], dummyAllowedValues)
			expect(spy_loggerDebug).toHaveBeenCalledTimes(1)
			expect(spy_loggerDebug).toHaveBeenCalledWith('set allowed values', { allowedValues: dummyAllowedValues })
			expect(result).toBe(dummyEnvType)
		})
	})

	describe('_validateAllowedValues', () => {
		let spy_loggerDebug: jest.SpiedFunction<any>
		let spy_allowedValuesDoNotContain: jest.SpiedFunction<any>
		let spy_allowedValuesToString: jest.SpiedFunction<any>
		let mock_createError: jest.Mock<any>

		beforeEach(() => {
			// eslint-disable-next-line @typescript-eslint/no-explicit-any
			spy_loggerDebug = jest.spyOn(dummyEnvType, '_loggerDebug' as any).mockImplementation(() => {}) // eslint-disable-line @typescript-eslint/no-empty-function
			// eslint-disable-next-line @typescript-eslint/no-explicit-any
			spy_allowedValuesToString = jest.spyOn(dummyEnvType, '_allowedValuesToString' as any).mockImplementation(() => {}) // eslint-disable-line @typescript-eslint/no-empty-function
			// eslint-disable-next-line @typescript-eslint/no-explicit-any
			spy_allowedValuesDoNotContain = jest.spyOn(dummyEnvType, '_allowedValuesDoNotContain' as any).mockImplementation(() => {}) // eslint-disable-line @typescript-eslint/no-empty-function

			mock_createError = jest.fn<(a: string) => Error>().mockImplementation((msg: string) => {
				return new Error(`Env[TEST] ${msg}`)
			})
			dummyEnvType['_createError'] = mock_createError
		})

		it('should return without calling anything if if now allowed values present', () => {
			dummyEnvType['_allowedValues'] = []
			dummyEnvType['_validateAllowedValues'](undefined)
			expect(spy_loggerDebug).not.toHaveBeenCalled()
			expect(spy_allowedValuesDoNotContain).not.toHaveBeenCalled()
			expect(spy_allowedValuesToString).not.toHaveBeenCalled()
			expect(mock_createError).not.toHaveBeenCalled()
		})

		it('should not throw error if value is contained in allowed values', () => {
			const value = 'a'
			dummyEnvType['_allowedValues'] = [value]
			spy_allowedValuesDoNotContain.mockReturnValue(false)
			dummyEnvType['_validateAllowedValues'](value)
			expect(spy_loggerDebug).toHaveBeenCalledTimes(1)
			expect(spy_loggerDebug).toHaveBeenCalledWith('validating allowed values for:', { value })
			expect(spy_allowedValuesDoNotContain).toHaveBeenCalledTimes(1)
			expect(spy_allowedValuesToString).not.toHaveBeenCalledTimes(1)
			expect(mock_createError).not.toHaveBeenCalled()
		})

		it('should throw error if value is not contained', () => {
			const value = 'b'
			const dummyAllowedValues = ['a']
			const dummyAllowedValuesString = JSON.stringify(dummyAllowedValues)
			spy_allowedValuesToString.mockReturnValue(dummyAllowedValuesString)
			dummyEnvType['_allowedValues'] = dummyAllowedValues
			spy_allowedValuesDoNotContain.mockReturnValue(true)
			try {
				dummyEnvType['_validateAllowedValues'](value)
				throw new Error('test failed')
			} catch (err: any) {
				expect(spy_loggerDebug).toHaveBeenCalledTimes(1)
				expect(spy_loggerDebug).toHaveBeenCalledWith('validating allowed values for:', { value })
				expect(spy_allowedValuesDoNotContain).toHaveBeenCalledTimes(1)
				expect(spy_allowedValuesToString).toHaveBeenCalledTimes(1)
				expect(mock_createError).toHaveBeenCalledTimes(1)
				expect(mock_createError).toHaveBeenCalledWith(`must have one of the fallowing values: ${dummyAllowedValuesString}`)
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
		])('%#. should return false if value "%s" is in allowed values: %s', (value, allowedValues) => {
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
		])('%#. should return true if value "%s" is in allowed values: %s', (value, allowedValues) => {
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
		let mock_envName: jest.Mock<any>
		beforeEach(() => {
			// eslint-disable-next-line @typescript-eslint/no-explicit-any
			mock_envName = jest.fn<() => any>().mockReturnValue('Env[TEST]')
			Object.defineProperty(dummyEnvType, '_envName', {
				get: () => mock_envName(),
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
		let mock_envName: jest.Mock<any>
		beforeEach(() => {
			// eslint-disable-next-line @typescript-eslint/no-explicit-any
			mock_envName = jest.fn<() => any>().mockReturnValue('Env[TEST]')
			Object.defineProperty(dummyEnvType, '_envName', {
				get: () => mock_envName(),
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
