import { mshEnv } from '@beecode/msh-env'
import { NamingStrategyPrefixName } from '@beecode/msh-env/naming-strategy/prefix-name'
import { setEnvLogger } from '@beecode/msh-env/util/logger'
import { LogLevel } from '@beecode/msh-logger'
import { LoggerStrategyConsole } from '@beecode/msh-logger/logger-strategy/console'
import { describe, expect, it } from '@jest/globals'
import * as dotenv from 'dotenv'
import { dirname } from 'path'
import { fileURLToPath } from 'url'

const __filename = fileURLToPath(import.meta.url)
const __dirname = dirname(__filename)
dotenv.config({ path: `${__dirname}/.env` })

describe('Prefix Example', () => {
	beforeEach(() => {
		setEnvLogger(new LoggerStrategyConsole({ logLevel: LogLevel.DEBUG }))
	})
	it('should use prefixed env first', () => {
		const env = mshEnv({
			namingStrategies: [new NamingStrategyPrefixName('APP_NAME_')],
		})
		const config = Object.freeze({
			dbName: env('DB_NAME').string.required,
			dbPassword: env('DB_PASS').string.required,
		})
		expect(config.dbName).toEqual('appSpecificDatabaseName')
		expect(config.dbPassword).toEqual('password')
	})
	it('should use additional prefix first and then prefix', () => {
		const env = mshEnv({
			namingStrategies: [new NamingStrategyPrefixName('APP_NAME_'), new NamingStrategyPrefixName('ADDITIONAL_PREFIX_')],
		})
		const config = Object.freeze({
			dbName: env('DB_NAME').string.required,
			dbPassword: env('DB_PASS').string.required,
		})
		expect(config.dbName).toEqual('appSpecificDatabaseName')
		expect(config.dbPassword).toEqual('additionalPrefixAppNameDbPass')
	})
})
