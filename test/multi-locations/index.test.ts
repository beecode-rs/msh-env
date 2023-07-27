import { MshEnv } from '@beecode/msh-env'
import { LocationStrategyCliArgsMinimist } from '@beecode/msh-env/lib/location-strategy/cli-args-minimist.js'
import { LocationStrategyEnvironment } from '@beecode/msh-env/lib/location-strategy/environment.js'
import { setEnvLogger } from '@beecode/msh-env/lib/util/logger.js'
import { LogLevel } from '@beecode/msh-logger'
import { LoggerStrategyConsole } from '@beecode/msh-logger/lib/logger-strategy/console.js'
import * as dotenv from 'dotenv'
import { Options } from 'minimist-options'

dotenv.config({ path: `${__dirname}/.env` })

describe('Multiple Locations Example', () => {
	beforeEach(() => {
		setEnvLogger(new LoggerStrategyConsole({ logLevel: LogLevel.DEBUG }))
	})
	it.each([
		['dbNameFromArgs', ['node', 'some-app.js', '--db-name=dbNameFromArgs']],
		['dbNameFromArgs', ['node', 'some-app.js', '--db-name', 'dbNameFromArgs']],
		['dbNameFromArgs', ['node', 'some-app.js', '-d=dbNameFromArgs']],
		['dbNameFromArgs', ['node', 'some-app.js', '-d', 'dbNameFromArgs']],
		['dbNameFromArgs', ['node', 'some-app.js', '--DB_NAME', 'dbNameFromArgs']],
		['dbNameFromArgs', ['node', 'some-app.js', '--DB_NAME=dbNameFromArgs']],
		['dbNameFromEnv', ['node', 'some-app.js']],
	])('%#. should expect dbName to be %s, for args %j', (dbName, args) => {
		const options: Options = { DB_NAME: { alias: ['d', 'db-name', 'dbName'], type: 'string' } }
		const env = MshEnv({
			locationStrategies: [
				new LocationStrategyCliArgsMinimist({ args: args.slice(2), options }),
				new LocationStrategyEnvironment(),
			],
		})
		const config = Object.freeze({
			dbName: env('DB_NAME').string.required,
			dbPassword: env('DB_PASS').string.required,
		})
		expect(config.dbName).toEqual(dbName)
		expect(config.dbPassword).toEqual('password')
	})
})
