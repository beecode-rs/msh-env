// const mockLogger = {
// 	clone: jest.fn<(a: LoggerStrategyParams) => LoggerStrategy>(),
// 	debug: jest.fn<(a: StringOrObjectType[]) => void>(),
// 	error: jest.fn<(a: StringOrObjectType[]) => void>(),
// 	info: jest.fn<(a: StringOrObjectType[]) => void>(),
// 	warn: jest.fn<(a: StringOrObjectType[]) => void>(),
// }
jest.unstable_mockModule('src/util/logger', async () => {
	return import('src/util/__mocks__/logger')
})

import { LoggerStrategy } from '@beecode/msh-logger'
import { jest } from '@jest/globals'
import assert from 'assert'
import { NamingStrategy } from 'src/naming-strategy'

describe('NamingStrategyPrefixName', () => {
	let logger: () => LoggerStrategy
	let namingStrategyPrefixNameFactory: (name: string) => NamingStrategy

	afterEach(() => jest.resetAllMocks())
	afterAll(() => jest.restoreAllMocks())

	beforeEach(async () => {
		const { logger: loggerImported } = await import('src/util/logger')
		logger = loggerImported
		const { NamingStrategyPrefixName } = await import('src/naming-strategy/prefix-name')
		namingStrategyPrefixNameFactory = (name: string) => new NamingStrategyPrefixName(name)
	})

	describe('names', () => {
		it('should prefix name with "test" with default join char "_"', () => {
			const prefixName = namingStrategyPrefixNameFactory('test_')
			assert.deepEqual(prefixName.names(['some-name']), ['test_some-name'])
		})

		it('should prefix name with "test" with join char "-"', () => {
			const prefixName = namingStrategyPrefixNameFactory('test-')
			assert.deepEqual(prefixName.names(['some-name']), ['test-some-name'])
		})

		it('should prefix array names with "test" with default join char "_"', () => {
			const prefixName = namingStrategyPrefixNameFactory('test_')
			assert.deepEqual(prefixName.names(['name-one', 'name-two']), ['test_name-one', 'test_name-two'])
		})

		it('should prefix array names with "test" with join char "-"', () => {
			const prefixName = namingStrategyPrefixNameFactory('test-')
			assert.deepEqual(prefixName.names(['name-one', 'name-two']), ['test-name-one', 'test-name-two'])
		})

		it('should log messages for debugging', async () => {
			const prefixName = namingStrategyPrefixNameFactory('test_')
			prefixName.names(['some-name'])

			expect(logger().debug).toHaveBeenCalledTimes(1)
			expect(logger().debug).toHaveBeenCalledWith('Original names: [some-name], prefixed names : [test_some-name]')
		})
	})
})
