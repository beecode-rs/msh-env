import { MshEnv } from '@beecode/msh-env'
import { NamingStrategyPrefixName } from '@beecode/msh-env/lib/naming-strategy/prefix-name'
import { setEnvLogger } from '@beecode/msh-env/lib/util/logger'
import { LogLevel } from '@beecode/msh-logger'
import { LoggerStrategyConsole } from '@beecode/msh-logger/lib/logger-strategy/console'
import * as dotenv from 'dotenv'

dotenv.config({ path: `${__dirname}/.env` })

describe('Prefix Example', () => {
	beforeEach(() => {
		setEnvLogger(new LoggerStrategyConsole({ logLevel: LogLevel.DEBUG }))
	})
	it('should use prefixed env first', () => {
		const env = MshEnv({
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
		const env = MshEnv({
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
