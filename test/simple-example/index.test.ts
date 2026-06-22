import * as assert from 'assert'
import { dirname } from 'path'
import { fileURLToPath } from 'url'

import { MshEnvResolverError, mshEnv, mshEnvResolver } from '@beecode/msh-env'
import { setEnvLogger } from '@beecode/msh-env/util/logger'
import { LogLevel } from '@beecode/msh-logger'
import { PresetConsoleSimpleString } from '@beecode/msh-logger/controller/preset/console-simple-string'
import * as dotenv from 'dotenv'
import { beforeEach, describe, expect, it } from 'vitest'

const __filename = fileURLToPath(import.meta.url)
const __dirname = dirname(__filename)

dotenv.config({ path: `${__dirname}/.env` })

describe('Simple Example', () => {
	beforeEach(() => {
		setEnvLogger(new PresetConsoleSimpleString({ logLevel: LogLevel.DEBUG }))
	})

	const env = mshEnv()
	it('should read required fields from env', () => {
		const config = mshEnvResolver({
			testEnvBase64: env('TEST_ENV_BASE64').base64,
			testEnvBoolean: env('TEST_ENV_BOOLEAN').boolean,
			testEnvJson: env('TEST_ENV_JSON').json(),
			testEnvNumber: env('TEST_ENV_NUMBER').number,
			testEnvString: env('TEST_ENV_STRING').string,
		})
		expect(config.testEnvString).toEqual('test-env-string')
		expect(config.testEnvNumber).toEqual(42)
		expect(config.testEnvBoolean).toBeTruthy()
		assert.deepEqual(config.testEnvJson, { 'test-key': 'test-value' })
		expect(config.testEnvBase64).toEqual('test value')
	})
	it('should read optional fields from evn', () => {
		const config = mshEnvResolver({
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
		const config = mshEnvResolver({
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
	it('should read default value if undefined evn', () => {
		const config = mshEnvResolver({
			testEnvBase64: env('NOT_DEFINED_TEST_ENV_BASE64').base64.default('default value'),
			testEnvBoolean: env('NOT_DEFINED_TEST_ENV_BOOLEAN').boolean.default(false),
			testEnvJson: env('NOT_DEFINED_TEST_ENV_JSON').json().default({ 'default-key': 'default-value' }),
			testEnvNumber: env('NOT_DEFINED_TEST_ENV_NUMBER').number.default(66),
			testEnvString: env('NOT_DEFINED_TEST_ENV_STRING').string.default('default-value'),
		})
		expect(config.testEnvString).toEqual('default-value')
		expect(config.testEnvNumber).toEqual(66)
		expect(config.testEnvBoolean).toBeFalsy()
		assert.deepEqual(config.testEnvJson, { 'default-key': 'default-value' })
		expect(config.testEnvBase64).toEqual('default value')
	})
	describe('throw error', () => {
		it('should throw error if required string is not defined', () => {
			expect(() => {
				return env('NOT_DEFINED_TEST_ENV_STRING').string.value
			}).toThrow('Env[NOT_DEFINED_TEST_ENV_STRING] must have value defined')
		})
		it('should throw error if required number is not defined', () => {
			expect(() => {
				return env('NOT_DEFINED_TEST_ENV_NUMBER').number.value
			}).toThrow('Env[NOT_DEFINED_TEST_ENV_NUMBER] must have value defined')
		})
		it('should throw error if required boolean is not defined', () => {
			expect(() => {
				return env('NOT_DEFINED_TEST_ENV_BOOLEAN').boolean.value
			}).toThrow('Env[NOT_DEFINED_TEST_ENV_BOOLEAN] must have value defined')
		})
		it('should throw error if required json is not defined', () => {
			expect(() => {
				return env('NOT_DEFINED_TEST_ENV_JSON').json().value
			}).toThrow('Env[NOT_DEFINED_TEST_ENV_JSON] must have value defined')
		})
		it('should throw error if required base64 is not defined', () => {
			expect(() => {
				return env('NOT_DEFINED_TEST_ENV_BASE64').base64.value
			}).toThrow('Env[NOT_DEFINED_TEST_ENV_BASE64] must have value defined')
		})
	})
	describe('unable to convert', () => {
		it('should throw error if unable to convert number', () => {
			expect(() => {
				return env('TEST_ENV_STRING').number.value
			}).toThrow('"test-env-string" is not a number')
		})
		it('should throw when a non-boolean required var resolves to undefined', () => {
			expect(() => {
				return env('TEST_ENV_STRING').boolean.value
			}).toThrow('Env[TEST_ENV_STRING] must have value defined')
		})
		it('should throw error if unable to convert json', () => {
			expect(() => {
				return env('TEST_ENV_STRING').json().value
			}).toThrow(`"test-env-string" is not a json. Error: Unexpected token 'e', "test-env-string" is not valid JSON`)
		})
		it('should leniently decode a non-base64 string without throwing', () => {
			const value = env('TEST_ENV_STRING').base64.value
			expect(typeof value).toEqual('string')
		})
	})
	describe('throw error not allowed value', () => {
		it('should throw error if string not in allowed list', () => {
			expect(() => {
				return env('TEST_ENV_STRING').string.allowed('test', 'test2').value
			}).toThrow('Env[TEST_ENV_STRING] must have one of the fallowing values: "test", "test2"')
		})
		it('should throw error if json not in allowed list', () => {
			expect(() => {
				return env('TEST_ENV_JSON').json().allowed({ some: 'test' }).value
			}).toThrow('Env[TEST_ENV_JSON] must have one of the fallowing values: {"some":"test"}')
		})
	})
	describe('no error if value in allowed values', () => {
		it('should not throw error if string in allowed list', () => {
			const value = env('TEST_ENV_STRING').string.allowed('test', 'test2', 'test-env-string').value
			expect(value).toEqual('test-env-string')
		})
		it('should not throw error if json in allowed list', () => {
			const value = env('TEST_ENV_JSON').json().allowed({ some: 'test' }, { 'test-key': 'test-value' }).value
			assert.deepEqual(value, { 'test-key': 'test-value' })
		})
	})
	describe('aggregate error reporting', () => {
		it('should collect all missing required vars into one MshEnvResolverError', () => {
			try {
				mshEnvResolver({
					a: env('MISSING_ONE').string,
					b: env('MISSING_TWO').number,
					c: env('MISSING_THREE').boolean,
				})
				throw new Error('test failed, expected MshEnvResolver to throw')
			} catch (e: unknown) {
				expect(e).toBeInstanceOf(MshEnvResolverError)
				if (e instanceof MshEnvResolverError) {
					expect(e.message).toContain('MISSING_ONE')
					expect(e.message).toContain('MISSING_TWO')
					expect(e.message).toContain('MISSING_THREE')
					expect(e.failures).toHaveLength(3)
				}
			}
		})
	})
})
