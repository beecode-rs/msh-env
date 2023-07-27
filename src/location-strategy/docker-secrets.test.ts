// eslint-disable-next-line import/order
import { jest } from '@jest/globals'

jest.mock('fs')
jest.mock('util')

import fs from 'fs'
import { LocationStrategyDockerSecrets } from 'src/location-strategy/docker-secrets'
import util from 'util'

describe('LocationStrategyDockerSecrets', () => {
	describe('valueByName', () => {
		afterEach(() => jest.resetAllMocks())
		afterAll(() => jest.restoreAllMocks())

		it('should call fs and util', () => {
			const fsResult = 'fs-result'
			const utilResult = 'util-result'
			const envName = 'test'

			;(util.format as jest.Mock).mockReturnValue(utilResult)
			;(fs.readFileSync as jest.Mock).mockReturnValue(fsResult)

			const dockerSecretsLocation = new LocationStrategyDockerSecrets()
			const result = dockerSecretsLocation.valueByName(envName)

			expect(util.format).toHaveBeenCalledTimes(1)
			expect(util.format).toHaveBeenCalledWith('/run/secrets/%s', envName)
			expect(fs.readFileSync).toHaveBeenCalledTimes(1)
			expect(fs.readFileSync).toHaveBeenCalledWith(utilResult, 'utf8')
			expect(result).toEqual(fsResult)
		})

		it('should return undefined if util throws an error', () => {
			;(util.format as jest.Mock).mockImplementation(() => new Error('boom'))
			const dockerSecretsLocation = new LocationStrategyDockerSecrets()
			const result = dockerSecretsLocation.valueByName('test')
			expect(result).toBeUndefined()
		})

		it('should return undefined if ts throws an error', () => {
			;(fs.readFileSync as jest.Mock).mockImplementation(() => new Error('boom'))
			const dockerSecretsLocation = new LocationStrategyDockerSecrets()
			const result = dockerSecretsLocation.valueByName('test')
			expect(result).toBeUndefined()
		})
	})
})
