import MshNodeEnv, { naming } from '../..'
import { ConsoleLogger, LogLevelType } from '@beecode/msh-node-log'
import { expect } from 'chai'
import dotenv from 'dotenv'

dotenv.config({ path: `${__dirname}/.env` })

describe('Prefix Example', () => {
  it('should use prefixed env first', () => {
    const env = MshNodeEnv({
      namingStrategies: [new naming.PrefixName({ prefix: 'APP_NAME' })],
      loggerStrategy: new ConsoleLogger(LogLevelType.DEBUG),
    })
    const config = Object.freeze({
      dbName: env('DB_NAME').string.required,
      dbPassword: env('DB_PASS').string.required,
    })
    expect(config.dbName).to.equal('appSpecificDatabaseName')
    expect(config.dbPassword).to.equal('password')
  })
  it('should use additional prefix first and then prefix', () => {
    const env = MshNodeEnv({
      namingStrategies: [new naming.PrefixName({ prefix: 'APP_NAME' }), new naming.PrefixName({ prefix: 'ADDITIONAL_PREFIX' })],
      loggerStrategy: new ConsoleLogger(LogLevelType.DEBUG),
    })
    const config = Object.freeze({
      dbName: env('DB_NAME').string.required,
      dbPassword: env('DB_PASS').string.required,
    })
    expect(config.dbName).to.equal('appSpecificDatabaseName')
    expect(config.dbPassword).to.equal('additionalPrefixAppNameDbPass')
  })
})
