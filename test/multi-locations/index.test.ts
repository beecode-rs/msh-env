import { mshEnv } from '@beecode/msh-env'
import { LocationStrategyCliArgsMinimist } from '@beecode/msh-env/location-strategy/cli-args-minimist'
import { LocationStrategyEnvironment } from '@beecode/msh-env/location-strategy/environment'
import { setEnvLogger } from '@beecode/msh-env/util/logger'
import { LogLevel } from '@beecode/msh-logger'
import { LoggerStrategyConsole } from '@beecode/msh-logger/logger-strategy/console'
import * as dotenv from 'dotenv'
import { Options } from 'minimist-options'
import { dirname } from 'path'
import { fileURLToPath } from 'url'
import { beforeEach, describe, expect, it } from 'vitest'

const __filename = fileURLToPath(import.meta.url)
const __dirname = dirname(__filename)
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
		const env = mshEnv({
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
