import { jest } from '@jest/globals'
import { EnvFactory } from 'src/env/factory'
import { LocationStrategyEnvironment } from 'src/location-strategy/environment'
import { MshEnv } from 'src/msh-env'
import { NamingStrategySimpleName } from 'src/naming-strategy/simple-name'
import { logger } from 'src/util/logger'

jest.mock('src/location-strategy/environment')
jest.mock('src/naming-strategy/simple-name')
jest.mock('src/env/factory')
jest.mock('src/util/logger')

describe('MshEnv', () => {
	afterEach(() => jest.resetAllMocks())
	afterAll(() => jest.restoreAllMocks())

	it('should all default strategies', () => {
		const result = MshEnv()
		expect(LocationStrategyEnvironment).toHaveBeenCalledTimes(1)
		expect(NamingStrategySimpleName).toHaveBeenCalledTimes(1)
		expect(EnvFactory).not.toHaveBeenCalled()
		expect(typeof result).toEqual('function')
	})

	it('should pass all default strategy to Env on env used', () => {
		const env = MshEnv()
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

		const env = MshEnv({
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
