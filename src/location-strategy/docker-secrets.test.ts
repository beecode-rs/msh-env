import { afterAll, afterEach, describe, expect, it, jest } from '@jest/globals'

jest.unstable_mockModule('fs', async () => {
	return {
		readFileSync: jest.fn(),
	}
})
jest.unstable_mockModule('util', async () => {
	return {
		format: jest.fn(),
	}
})
const { readFileSync: fsReadFileSyncMock } = await import('fs')
const { format: utilFormatMock } = await import('util')
const { LocationStrategyDockerSecrets } = await import('#src/location-strategy/docker-secrets')

describe('LocationStrategyDockerSecrets', () => {
	describe('valueByName', () => {
		afterEach(() => {
			jest.resetAllMocks()
		})
		afterAll(() => {
			jest.restoreAllMocks()
		})

		it('should call fs and util', () => {
			const fsResult = 'fs-result'
			const utilResult = 'util-result'
			const envName = 'test'

			;(utilFormatMock as jest.Mock).mockReturnValue(utilResult)
			;(fsReadFileSyncMock as jest.Mock).mockReturnValue(fsResult)

			const dockerSecretsLocation = new LocationStrategyDockerSecrets()
			const result = dockerSecretsLocation.valueByName(envName)

			expect(utilFormatMock).toHaveBeenCalledTimes(1)
			expect(utilFormatMock).toHaveBeenCalledWith('/run/secrets/%s', envName)
			expect(fsReadFileSyncMock).toHaveBeenCalledTimes(1)
			expect(fsReadFileSyncMock).toHaveBeenCalledWith(utilResult, 'utf8')
			expect(result).toEqual(fsResult)
		})

		it('should return undefined if util throws an error', () => {
			;(utilFormatMock as jest.Mock).mockImplementation(() => new Error('boom'))
			const dockerSecretsLocation = new LocationStrategyDockerSecrets()
			const result = dockerSecretsLocation.valueByName('test')
			expect(result).toBeUndefined()
		})

		it('should return undefined if ts throws an error', () => {
			;(fsReadFileSyncMock as jest.Mock).mockImplementation(() => new Error('boom'))
			const dockerSecretsLocation = new LocationStrategyDockerSecrets()
			const result = dockerSecretsLocation.valueByName('test')
			expect(result).toBeUndefined()
		})
	})
})
