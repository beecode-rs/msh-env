import { describe, expect, it } from '@jest/globals'

import { LocationStrategyEnvironment } from '#/location-strategy/environment'

describe('LocationStrategyEnvironment', () => {
	describe('valueByName', () => {
		it('should return env value', () => {
			process.env.test = 'test-env-value'
			const environmentLocation = new LocationStrategyEnvironment()
			expect(environmentLocation.valueByName('test')).toEqual(process.env.test)
			delete process.env.test
		})
		it('should return undefined if env not set', () => {
			delete process.env.test
			const environmentLocation = new LocationStrategyEnvironment()
			expect(environmentLocation.valueByName('test')).toBeUndefined()
		})
	})
})
