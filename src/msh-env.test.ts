import { type Mock, afterAll, describe, expect, it, vi } from 'vitest'

vi.mock('#src/util/logger.js')

vi.mock('#src/business/service/location-strategy/environment.js', () => {
	return {
		LocationStrategyEnvironment: vi.fn().mockImplementation(() => ({
			valueByName: vi.fn(),
		})),
	}
})

vi.mock('#src/business/service/naming-strategy/simple-name.js', () => {
	return {
		NamingStrategySimpleName: vi.fn().mockImplementation(() => ({
			names: vi.fn(),
		})),
	}
})
vi.mock('#src/business/component/env/factory.js', () => {
	return {
		EnvFactory: vi.fn().mockImplementation(() => ({
			base64: vi.fn(),
			boolean: vi.fn(),
			json: vi.fn(),
			number: vi.fn(),
			string: vi.fn(),
		})),
	}
})

import { EnvFactory } from '#src/business/component/env/factory.js'
import { LocationStrategyEnvironment } from '#src/business/service/location-strategy/environment.js'
import { NamingStrategySimpleName } from '#src/business/service/naming-strategy/simple-name.js'
import { mshEnv } from '#src/msh-env.js'
import { logger } from '#src/util/logger.js'

describe('mshEnv', () => {
	afterAll(() => {
		vi.restoreAllMocks()
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

		;(LocationStrategyEnvironment as Mock).mockReset()
		;(NamingStrategySimpleName as Mock).mockReset()

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
