import assert from 'assert'
import { afterAll, describe, expect, it, vi } from 'vitest'

vi.mock('#src/util/logger')
import { NamingStrategyPrefixName } from '#src/naming-strategy/prefix-name'
import { logger } from '#src/util/logger'

describe('NamingStrategyPrefixName', () => {
	afterAll(() => {
		vi.restoreAllMocks()
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

		it('should log messages for debugging', () => {
			const prefixName = new NamingStrategyPrefixName('test_')
			prefixName.names(['some-name'])

			expect(logger().debug).toHaveBeenCalledTimes(1)

			expect(logger().debug).toHaveBeenCalledWith('Original names: [some-name], prefixed names : [test_some-name]')
		})
	})
})
