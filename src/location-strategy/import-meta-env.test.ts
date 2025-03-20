import { describe, expect, it } from 'vitest'

import { LocationStrategyImportMetaEnv } from '#src/location-strategy/import-meta-env'

describe('LocationStrategyImportMetaEnv', () => {
	describe('valueByName', () => {
		it('should return env value', () => {
			import.meta.env.test = 'test-env-value'
			const environmentLocation = new LocationStrategyImportMetaEnv()
			expect(environmentLocation.valueByName('test')).toEqual(import.meta.env.test)
			delete import.meta.env.test
		})
		it('should return undefined if env not set', () => {
			delete import.meta.env.test
			const environmentLocation = new LocationStrategyImportMetaEnv()
			expect(environmentLocation.valueByName('test')).toBeUndefined()
		})
	})
})
