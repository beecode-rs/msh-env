// eslint-disable-next-line import/order
import { afterAll, afterEach, describe, expect, it, jest } from '@jest/globals'

import assert from 'assert'

import { NamingStrategySuffixName } from '#src/naming-strategy/suffix-name'
import { logger } from '#src/util/logger'

jest.mock('#src/util/logger')

describe('NamingStrategySuffixName', () => {
	describe('names', () => {
		afterEach(() => {
			jest.resetAllMocks()
		})
		afterAll(() => {
			jest.restoreAllMocks()
		})

		it('should suffix name with "test" with default join char "_"', () => {
			const suffixName = new NamingStrategySuffixName('_test')
			assert.deepEqual(suffixName.names(['some-name']), ['some-name_test'])
		})

		it('should suffix name with "test" with join char "-"', () => {
			const suffixName = new NamingStrategySuffixName('-test')
			assert.deepEqual(suffixName.names(['some-name']), ['some-name-test'])
		})

		it('should suffix array names with "test" with default join char "_"', () => {
			const suffixName = new NamingStrategySuffixName('_test')
			assert.deepEqual(suffixName.names(['name-one', 'name-two']), ['name-one_test', 'name-two_test'])
		})

		it('should suffix array names with "test" with join char "-"', () => {
			const suffixName = new NamingStrategySuffixName('-test')
			assert.deepEqual(suffixName.names(['name-one', 'name-two']), ['name-one-test', 'name-two-test'])
		})

		it('should log messages for debugging', () => {
			const suffixName = new NamingStrategySuffixName('_test')
			suffixName.names(['some-name'])
			expect(logger().debug).toHaveBeenCalledTimes(1)
			expect(logger().debug).toHaveBeenCalledWith('Original names: [some-name], suffixed names : [some-name_test]')
		})
	})
})
