import { afterAll, afterEach, describe, expect, it, jest } from '@jest/globals'

jest.unstable_mockModule('#src/util/logger', async () => {
	return import('#src/util/__mocks__/logger')
})

jest.unstable_mockModule('#src/location-strategy/environment', async () => {
	return {
		LocationStrategyEnvironment: jest.fn().mockImplementation(() => ({
			valueByName: jest.fn(),
		})),
	}
})

jest.unstable_mockModule('#src/naming-strategy/simple-name', async () => {
	return {
		NamingStrategySimpleName: jest.fn().mockImplementation(() => ({
			names: jest.fn(),
		})),
	}
})
jest.unstable_mockModule('#src/env/factory', async () => {
	return {
		EnvFactory: jest.fn().mockImplementation(() => ({
			base64: jest.fn(),
			boolean: jest.fn(),
			json: jest.fn(),
			number: jest.fn(),
			string: jest.fn(),
		})),
	}
})

const { logger } = await import('#src/util/logger')
const { LocationStrategyEnvironment } = await import('#src/location-strategy/environment')
const { NamingStrategySimpleName } = await import('#src/naming-strategy/simple-name')
const { EnvFactory } = await import('#src/env/factory')
const { mshEnv } = await import('#src/msh-env')

describe('mshEnv', () => {
	afterEach(() => {
		jest.resetAllMocks()
	})
	afterAll(() => {
		jest.restoreAllMocks()
	})

	it('should all default strategies', () => {
		const result = mshEnv()
		expect(LocationStrategyEnvironment).toHaveBeenCalledTimes(1)
		expect(NamingStrategySimpleName).toHaveBeenCalledTimes(1)
		expect(EnvFactory).not.toHaveBeenCalled()
		expect(typeof result).toEqual('function')
	})

	it('should pass all default strategy to Env on env used', () => {
		const env = mshEnv()
		const name = 'TEST'

		const envResult = env(name)
		expect(EnvFactory).toHaveBeenCalledTimes(1)

		expect(logger().debug).toHaveBeenCalledTimes(1)
		expect(logger().debug).toHaveBeenCalledWith(`Initiate env: [${name}]`)
		expect(EnvFactory).toHaveBeenCalledTimes(1)
		expect(EnvFactory).nthCalledWith(1, {
			locationStrategies: [expect.any(LocationStrategyEnvironment)],
			names: [name],
			namingStrategies: [expect.any(NamingStrategySimpleName)],
		})
		expect(LocationStrategyEnvironment).toHaveBeenCalledTimes(1)
		expect(NamingStrategySimpleName).toHaveBeenCalledTimes(1)
		expect(envResult instanceof EnvFactory).toBeTruthy()
	})
	it('should not use default strategies if all are passed in constructor', () => {
		const userLocationStrategyEnvironment = new LocationStrategyEnvironment()
		const userNamingStrategySimpleName = new NamingStrategySimpleName()

		jest.resetAllMocks()

		const env = mshEnv({
			locationStrategies: [userLocationStrategyEnvironment],
			namingStrategies: [userNamingStrategySimpleName],
		})
		const name = 'TEST'
		env(name)

		expect(LocationStrategyEnvironment).not.toHaveBeenCalled()
		expect(NamingStrategySimpleName).not.toHaveBeenCalled()

		expect(EnvFactory).toHaveBeenCalledTimes(1)
		expect(EnvFactory).toHaveBeenCalledWith({
			locationStrategies: [userLocationStrategyEnvironment],
			names: [name],
			namingStrategies: [userNamingStrategySimpleName],
		})
	})
})
