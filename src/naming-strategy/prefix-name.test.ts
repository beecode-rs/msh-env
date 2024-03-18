// import { LoggerStrategy } from '@beecode/msh-logger'
import { afterAll, afterEach, describe, expect, it, jest } from '@jest/globals'
import assert from 'assert'

// import { NamingStrategy } from '#src/naming-strategy'
// import { NamingStrategyPrefixName } from '#src/naming-strategy/prefix-name'
// import { logger } from '#src/util/logger'

// jest.unstable_mockModule('#/util/logger', async () => {
// 	return import('#/util/__mocks__/logger')
// })
jest.mock('#src/util/logger')

describe('NamingStrategyPrefixName', async () => {
	const { logger } = await import('#src/util/logger')
	const { NamingStrategyPrefixName } = await import('#src/naming-strategy/prefix-name')

	// let loggerMock: () => LoggerStrategy
	// let namingStrategyPrefixNameFactoryMock: (name: string) => NamingStrategy

	afterEach(() => {
		jest.resetAllMocks()
	})
	afterAll(() => {
		jest.restoreAllMocks()
	})

	// TODO: ESM: Check it this could solve the problem with runnint esmodule in jest
	// It would be good if I could run jest as esmodule, and have jset-mock running
	// issue is with hoisting, but maybe I could get all mocked imports with await :thinking:

	// beforeEach(async () => {
	// const { logger: loggerImported } = await import('#src/util/logger')
	// logger = loggerImported
	// const { NamingStrategyPrefixName } = await import('#src/naming-strategy/prefix-name')
	// namingStrategyPrefixNameFactory = (name: string) => new NamingStrategyPrefixName(name)
	// })

	describe('names', () => {
		it('should prefix name with "test" with default join char "_"', () => {
			const prefixName = new NamingStrategyPrefixName('test_')
			assert.deepEqual(prefixName.names(['some-name']), ['test_some-name'])
		})

		it('should prefix name with "test" with join char "-"', () => {
			const prefixName = new NamingStrategyPrefixName('test-')
			assert.deepEqual(prefixName.names(['some-name']), ['test-some-name'])
		})

		it('should prefix array names with "test" with default join char "_"', () => {
			const prefixName = new NamingStrategyPrefixName('test_')
			assert.deepEqual(prefixName.names(['name-one', 'name-two']), ['test_name-one', 'test_name-two'])
		})

		it('should prefix array names with "test" with join char "-"', () => {
			const prefixName = new NamingStrategyPrefixName('test-')
			assert.deepEqual(prefixName.names(['name-one', 'name-two']), ['test-name-one', 'test-name-two'])
		})

		it('should log messages for debugging', async () => {
			const prefixName = new NamingStrategyPrefixName('test_')
			prefixName.names(['some-name'])

			expect(logger().debug).toHaveBeenCalledTimes(1)
			expect(logger().debug).toHaveBeenCalledWith('Original names: [some-name], prefixed names : [test_some-name]')
		})
	})
})
