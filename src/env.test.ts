import { afterAll, afterEach, beforeEach, describe, expect, it, jest } from '@jest/globals'
import assert from 'assert'

import { LocationStrategyMock } from '#src/__mocks__/location-strategy-mock'
import { NamingStrategyMock } from '#src/__mocks__/naming-strategy-mock'
import { Env } from '#src/env'

describe.each([
	[['DUMMY_TEST_ENV']],
	[['DUMMY_TEST_ENV', 'DUMMY_TEST_ENV2']],
	[['DUMMY_TEST_ENV', 'DUMMY_TEST_ENV2', 'DUMMY_TEST_ENV3']],
])('%#. Env %p', (dummyEnvNames) => {
	let dummyEnv: Env
	let mockLocationStrategy: LocationStrategyMock
	let mockNamingStrategy: NamingStrategyMock

	beforeEach(() => {
		mockNamingStrategy = new NamingStrategyMock()
		mockLocationStrategy = new LocationStrategyMock()
		dummyEnv = new Env({
			locationStrategies: [mockLocationStrategy],
			names: dummyEnvNames,
			namingStrategies: [mockNamingStrategy],
		})
	})

	afterEach(() => {
		jest.resetAllMocks()
	})
	afterAll(() => {
		jest.restoreAllMocks()
	})

	describe('constructor', () => {
		it('should setup properties', () => {
			expect(dummyEnv.names).toEqual(dummyEnvNames)
			assert.deepEqual(dummyEnv['_locationStrategies'], [mockLocationStrategy])
			assert.deepEqual(dummyEnv['_namingStrategies'], [mockNamingStrategy])
		})
	})

	describe('Name', () => {
		it('should return _name when Name called', () => {
			expect(dummyEnv.names).toEqual(dummyEnvNames)
		})
	})

	describe('_envNames', () => {
		it('should call names of naming strategy', () => {
			mockNamingStrategy.names.mockReturnValue(['test1'])
			const result = dummyEnv['_envNames']()
			expect(mockNamingStrategy.names).toHaveBeenCalledTimes(1)
			expect(mockNamingStrategy.names).toHaveBeenCalledWith(expect.arrayContaining(dummyEnvNames))
			assert.deepEqual(result, ['test1', ...dummyEnvNames])
		})

		it('should simulate double prefixing', () => {
			const fakePrefixFactory =
				(prefix: string) =>
				(names: string[]): string[] =>
					names.map((name) => [prefix, name].join(''))

			const mockNamingStrategy1 = new NamingStrategyMock()
			mockNamingStrategy1.names.mockImplementation(fakePrefixFactory('FIRST_'))
			const mockNamingStrategy2 = new NamingStrategyMock()
			mockNamingStrategy2.names.mockImplementation(fakePrefixFactory('SECOND_'))

			const env = new Env({
				locationStrategies: [mockLocationStrategy],
				names: dummyEnvNames,
				namingStrategies: [mockNamingStrategy1, mockNamingStrategy2],
			})
			const result = env['_envNames']()
			expect(mockNamingStrategy1.names).toHaveBeenCalledTimes(1)
			expect(mockNamingStrategy1.names).toHaveBeenCalledWith(dummyEnvNames.slice().reverse())
			expect(mockNamingStrategy2.names).toHaveBeenCalledTimes(1)
			expect(mockNamingStrategy2.names).toHaveBeenCalledWith(
				dummyEnvNames
					.slice()
					.reverse()
					.map((name) => `FIRST_${name}`)
			)

			// expect(mockNamingStrategy1.names).toHaveBeenCalledBefore(mockNamingStrategy2.names) // TODO fix this
			assert.deepEqual(result, [
				...dummyEnvNames.map((name) => `SECOND_FIRST_${name}`),
				...dummyEnvNames.map((name) => `FIRST_${name}`),
				...dummyEnvNames,
			])
		})
	})

	describe('envValue', () => {
		let spy_envNames: jest.SpiedFunction<any>
		beforeEach(() => {
			spy_envNames = jest.spyOn(dummyEnv, '_envNames' as any)
		})
		it('should call location strategy envStringValue', () => {
			const getValueReturn = 'envValue'
			const namesReturn = ['name']
			spy_envNames.mockReturnValue(namesReturn)
			mockLocationStrategy.valueByName.mockReturnValue(getValueReturn)
			const result = dummyEnv.envValue()
			expect(mockLocationStrategy.valueByName).toHaveBeenCalledTimes(1)
			expect(mockLocationStrategy.valueByName).toHaveBeenCalledWith(namesReturn[0])
			expect(result).toEqual(getValueReturn)
		})

		it('should return undefined if no env found', () => {
			const namesReturn = ['name']
			spy_envNames.mockReturnValue(namesReturn)
			const result = dummyEnv.envValue()
			expect(mockLocationStrategy.valueByName).toHaveBeenCalledTimes(1)
			expect(mockLocationStrategy.valueByName).toHaveBeenCalledWith(namesReturn[0])
			expect(result).toBeUndefined()
		})

		describe('check reducers', () => {
			let dummyEnv2: Env

			let spy_envNames2: jest.SpiedFunction<any>
			beforeEach(() => {
				dummyEnv2 = new Env({
					locationStrategies: [mockLocationStrategy, mockLocationStrategy],
					names: dummyEnvNames,
					namingStrategies: [mockNamingStrategy, mockNamingStrategy],
				})
				spy_envNames2 = jest.spyOn(dummyEnv2, '_envNames' as any)
			})

			it('should return env value if key "DUMMY_TEST_ENV" is found', () => {
				const namesReturn = ['name', 'name2']
				spy_envNames2.mockReturnValue(namesReturn)
				mockLocationStrategy.valueByName.mockReturnValue('DUMMY_TEST_ENV')
				const result = dummyEnv2.envValue()
				expect(mockLocationStrategy.valueByName).toHaveBeenCalledTimes(1)
				expect(mockLocationStrategy.valueByName).toHaveBeenCalledWith(namesReturn[0])
				expect(result).toEqual('DUMMY_TEST_ENV')
			})
		})
	})
})
