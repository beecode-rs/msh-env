import { mshEnv } from '@beecode/msh-env'
import { setEnvLogger } from '@beecode/msh-env/util/logger'
import { LogLevel } from '@beecode/msh-logger'
import { LoggerStrategyConsole } from '@beecode/msh-logger/logger-strategy/console'
import * as assert from 'assert'
import * as dotenv from 'dotenv'
import { dirname } from 'path'
import { fileURLToPath } from 'url'
import { beforeEach, describe, expect, it } from 'vitest'
// import { assert } from 'vitest'

const __filename = fileURLToPath(import.meta.url)
const __dirname = dirname(__filename)

dotenv.config({ path: `${__dirname}/.env` })

describe('Simple Example', () => {
	beforeEach(() => {
		setEnvLogger(new LoggerStrategyConsole({ logLevel: LogLevel.DEBUG }))
	})

	const env = mshEnv()
	it('should read required fields from env', () => {
		const config = Object.freeze({
			testEnvBase64: env('TEST_ENV_BASE64').base64.required,
			testEnvBoolean: env('TEST_ENV_BOOLEAN').boolean.required,
			testEnvJson: env('TEST_ENV_JSON').json().required,
			testEnvNumber: env('TEST_ENV_NUMBER').number.required,
			testEnvString: env('TEST_ENV_STRING').string.required,
		})
		expect(config.testEnvString).toEqual('test-env-string')
		expect(config.testEnvNumber).toEqual(42)
		expect(config.testEnvBoolean).toBeTruthy()
		assert.deepEqual(config.testEnvJson, { 'test-key': 'test-value' })
		expect(config.testEnvBase64).toEqual('test value')
	})
	it('should read optional fields from evn', () => {
		const config = Object.freeze({
			testEnvBase64: env('TEST_ENV_BASE64').base64.optional,
			testEnvBoolean: env('TEST_ENV_BOOLEAN').boolean.optional,
			testEnvJson: env('TEST_ENV_JSON').json().optional,
			testEnvNumber: env('TEST_ENV_NUMBER').number.optional,
			testEnvString: env('TEST_ENV_STRING').string.optional,
		})
		expect(config.testEnvString).toEqual('test-env-string')
		expect(config.testEnvNumber).toEqual(42)
		expect(config.testEnvBoolean).toBeTruthy()
		assert.deepEqual(config.testEnvJson, { 'test-key': 'test-value' })
		expect(config.testEnvBase64).toEqual('test value')
	})
	it('should read undefined optional fields from undefined evn', () => {
		const config = Object.freeze({
			testEnvBase64: env('NOT_DEFINED_TEST_ENV_BASE64').base64.optional,
			testEnvBoolean: env('NOT_DEFINED_TEST_ENV_BOOLEAN').boolean.optional,
			testEnvJson: env('NOT_DEFINED_TEST_ENV_JSON').json().optional,
			testEnvNumber: env('NOT_DEFINED_TEST_ENV_NUMBER').number.optional,
			testEnvString: env('NOT_DEFINED_TEST_ENV_STRING').string.optional,
		})
		expect(config.testEnvString).toBeUndefined()
		expect(config.testEnvNumber).toBeUndefined()
		expect(config.testEnvBoolean).toBeUndefined()
		expect(config.testEnvJson).toBeUndefined()
		expect(config.testEnvBase64).toBeUndefined()
	})
	it('should read default value if required but undefined evn', () => {
		const config = Object.freeze({
			testEnvBase64: env('NOT_DEFINED_TEST_ENV_BASE64').base64.default('default value').required,
			testEnvBoolean: env('NOT_DEFINED_TEST_ENV_BOOLEAN').boolean.default(false).required,
			testEnvJson: env('NOT_DEFINED_TEST_ENV_JSON').json().default({ 'default-key': 'default-value' }).required,
			testEnvNumber: env('NOT_DEFINED_TEST_ENV_NUMBER').number.default(66).required,
			testEnvString: env('NOT_DEFINED_TEST_ENV_STRING').string.default('default-value').required,
		})
		expect(config.testEnvString).toEqual('default-value')
		expect(config.testEnvNumber).toEqual(66)
		expect(config.testEnvBoolean).toBeFalsy()
		assert.deepEqual(config.testEnvJson, { 'default-key': 'default-value' })
		expect(config.testEnvBase64).toEqual('default value')
	})
	describe('throw error', () => {
		it('should throw error if required string is not defined', () => {
			try {
				Object.freeze({
					testEnvString: env('NOT_DEFINED_TEST_ENV_STRING').string.required,
				})
				throw new Error('test failed')
			} catch (e: unknown) {
				if (e instanceof Error) {
					expect(e.message).toEqual('Env[NOT_DEFINED_TEST_ENV_STRING] must have value defined')
				}
			}
		})
		it('should throw error if required number is not defined', () => {
			try {
				Object.freeze({
					testEnvNumber: env('NOT_DEFINED_TEST_ENV_NUMBER').number.required,
				})
				throw new Error('test failed')
			} catch (e: unknown) {
				if (e instanceof Error) {
					expect(e.message).toEqual('Env[NOT_DEFINED_TEST_ENV_NUMBER] must have value defined')
				}
			}
		})
		it('should throw error if required boolean is not defined', () => {
			try {
				Object.freeze({
					testEnvBoolean: env('NOT_DEFINED_TEST_ENV_BOOLEAN').boolean.required,
				})
				throw new Error('test failed')
			} catch (e: unknown) {
				if (e instanceof Error) {
					expect(e.message).toEqual('Env[NOT_DEFINED_TEST_ENV_BOOLEAN] must have value defined')
				}
			}
		})
		it('should throw error if required json is not defined', () => {
			try {
				Object.freeze({
					testEnvJson: env('NOT_DEFINED_TEST_ENV_JSON').json().required,
				})
				throw new Error('test failed')
			} catch (e: unknown) {
				if (e instanceof Error) {
					expect(e.message).toEqual('Env[NOT_DEFINED_TEST_ENV_JSON] must have value defined')
				}
			}
		})
		it('should throw error if required base64 is not defined', () => {
			try {
				Object.freeze({
					testEnvBase64: env('NOT_DEFINED_TEST_ENV_BASE64').base64.required,
				})
				throw new Error('test failed')
			} catch (e: unknown) {
				if (e instanceof Error) {
					expect(e.message).toEqual('Env[NOT_DEFINED_TEST_ENV_BASE64] must have value defined')
				}
			}
		})
	})
	describe('unable to convert', () => {
		it('should throw error if unable to convert number', () => {
			try {
				Object.freeze({
					testEnvNumber: env('TEST_ENV_STRING').number.optional,
				})
			} catch (e: unknown) {
				if (e instanceof Error) {
					expect(e.message).toEqual('"test-env-string" is not a number')
				}
			}
		})
		it('should throw error if unable to convert boolean', () => {
			try {
				Object.freeze({
					testEnvBoolean: env('TEST_ENV_STRING').boolean.optional,
				})
			} catch (e: unknown) {
				if (e instanceof Error) {
					expect(e.message).toEqual('"test-env-string" is not a boolean')
				}
			}
		})
		it('should throw error if unable to convert json', () => {
			try {
				Object.freeze({
					testEnvJson: env('TEST_ENV_STRING').json().optional,
				})
			} catch (e: unknown) {
				if (e instanceof Error) {
					expect(e.message).toEqual(
						`"test-env-string" is not a json. Error: Unexpected token 'e', "test-env-string" is not valid JSON`
					)
				}
			}
		})
		it('should throw error if unable to convert base64', () => {
			try {
				Object.freeze({
					testEnvBase64: env('TEST_ENV_STRING').base64.optional,
				})
			} catch (e: unknown) {
				if (e instanceof Error) {
					expect(e.message).toEqual(
						'"test-env-string" is not a base64. Error: Invalid character: the string to be decoded is not correctly encoded.'
					)
				}
			}
		})
	})
	describe('throw error not allowed value', () => {
		it('should throw error if string not in allowed list', () => {
			try {
				Object.freeze({
					testEnvString: env('TEST_ENV_STRING').string.allowed('test', 'test2').required,
				})
				throw new Error('test failed')
			} catch (e: unknown) {
				if (e instanceof Error) {
					expect(e.message).toEqual('Env[TEST_ENV_STRING] must have one of the fallowing values: "test", "test2"')
				}
			}
		})
		it('should throw error if json not in allowed list', () => {
			try {
				Object.freeze({
					testEnvString: env('TEST_ENV_JSON').json().allowed({ some: 'test' }).required,
				})
				throw new Error('test failed')
			} catch (e: unknown) {
				if (e instanceof Error) {
					expect(e.message).toEqual('Env[TEST_ENV_JSON] must have one of the fallowing values: {"some":"test"}')
				}
			}
		})
	})
	describe('no error if value in allowed values', () => {
		it('should not throw error if string in allowed list', () => {
			Object.freeze({
				testEnvString: env('TEST_ENV_STRING').string.allowed('test', 'test2', 'test-env-string').required,
			})
		})
		it('should not throw error if json in allowed list', () => {
			Object.freeze({
				testEnvString: env('TEST_ENV_JSON').json().allowed({ some: 'test' }, { 'test-key': 'test-value' }).required,
			})
		})
	})
})
