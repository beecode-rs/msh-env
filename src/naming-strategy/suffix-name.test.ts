import { afterAll, afterEach, describe, expect, it, jest } from '@jest/globals'
import assert from 'assert'

jest.unstable_mockModule('#src/util/logger', async () => {
	return import('#src/util/__mocks__/logger')
})

const { logger: loggerMock } = await import('#src/util/logger')
const { NamingStrategySuffixName } = await import('#src/naming-strategy/suffix-name')

describe('NamingStrategySuffixName', () => {
	// let logger: any
	// let NamingStrategySuffixName: any
	// beforeAll(async () => {
	// 	logger = await import('#src/util/logger')
	// 	NamingStrategySuffixName = await import('#src/naming-strategy/suffix-name')
	// })
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
			expect(loggerMock().debug).toHaveBeenCalledTimes(1)
			expect(loggerMock().debug).toHaveBeenCalledWith('Original names: [some-name], suffixed names : [some-name_test]')
		})
	})
})
