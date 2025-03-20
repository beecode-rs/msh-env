// eslint-disable-next-line import/order
import { type Mock, afterAll, describe, expect, it, vi } from 'vitest'

vi.mock('fs', () => {
	return {
		readFileSync: vi.fn(),
	}
})

vi.mock('util', () => {
	return {
		format: vi.fn(),
	}
})

import { readFileSync } from 'fs'
import { format } from 'util'

import { LocationStrategyDockerSecrets } from '#src/location-strategy/docker-secrets'

describe('LocationStrategyDockerSecrets', () => {
	describe('valueByName', () => {
		afterAll(() => {
			vi.restoreAllMocks()
		})

		it('should call fs and util', () => {
			const fsResult = 'fs-result'
			const utilResult = 'util-result'
			const envName = 'test'

			;(format as Mock).mockReturnValue(utilResult)
			;(readFileSync as Mock).mockReturnValue(fsResult)

			const dockerSecretsLocation = new LocationStrategyDockerSecrets()
			const result = dockerSecretsLocation.valueByName(envName)

			expect(format).toHaveBeenCalledTimes(1)
			expect(format).toHaveBeenCalledWith('/run/secrets/%s', envName)
			expect(readFileSync).toHaveBeenCalledTimes(1)
			expect(readFileSync).toHaveBeenCalledWith(utilResult, 'utf8')
			expect(result).toEqual(fsResult)
		})

		it('should return undefined if util throws an error', () => {
			;(format as Mock).mockImplementation(() => new Error('boom'))
			const dockerSecretsLocation = new LocationStrategyDockerSecrets()
			const result = dockerSecretsLocation.valueByName('test')
			expect(result).toBeUndefined()
		})

		it('should return undefined if ts throws an error', () => {
			;(readFileSync as Mock).mockImplementation(() => new Error('boom'))
			const dockerSecretsLocation = new LocationStrategyDockerSecrets()
			const result = dockerSecretsLocation.valueByName('test')
			expect(result).toBeUndefined()
		})
	})
})
