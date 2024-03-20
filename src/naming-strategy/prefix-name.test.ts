import { afterAll, afterEach, describe, expect, it, jest } from '@jest/globals'
import assert from 'assert'

jest.unstable_mockModule('#src/util/logger', async () => {
	return import('#src/util/__mocks__/logger')
})
const { logger: loggerMock } = await import('#src/util/logger')
const { NamingStrategyPrefixName } = await import('#src/naming-strategy/prefix-name')

describe('NamingStrategyPrefixName', () => {
	afterEach(() => {
		jest.resetAllMocks()
	})
	afterAll(() => {
		jest.restoreAllMocks()
	})

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

			expect(loggerMock().debug).toHaveBeenCalledTimes(1)
			expect(loggerMock().debug).toHaveBeenCalledWith('Original names: [some-name], prefixed names : [test_some-name]')
		})
	})
})
