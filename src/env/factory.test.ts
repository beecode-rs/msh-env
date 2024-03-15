import { describe, expect, it } from '@jest/globals'

import { ConvertStrategyBase64ToString } from '#src/convert-strategy/base64-to-string'
import { ConvertStrategyToBoolean } from '#src/convert-strategy/to-boolean'
import { ConvertStrategyToJson } from '#src/convert-strategy/to-json'
import { ConvertStrategyToNumber } from '#src/convert-strategy/to-number'
import { ConvertStrategyToString } from '#src/convert-strategy/to-string'
import { Env } from '#src/env'
import { EnvFactory } from '#src/env/factory'
import { EnvType } from '#src/env/type'

describe.each([[['TEST']], [['TEST', 'TEST1']], [['TEST', 'TEST1', 'TEST2']]])('%#. EnvFactory envNames: %p', (envNames) => {
	const envFactory = new EnvFactory({ locationStrategies: [], names: envNames, namingStrategies: [] })

	describe('constructor', () => {
		it('should store env in private _env property', () => {
			expect(envFactory['_env'] instanceof Env).toBeTruthy()
		})
	})

	describe('getter', () => {
		it('should return EnvType with ToString convert strategy', () => {
			const result = envFactory.string
			expect(result instanceof EnvType).toBeTruthy()
			expect(result['_convertStrategy'] instanceof ConvertStrategyToString).toBeTruthy()
		})
		it('should return EnvType with ToBoolean convert strategy', () => {
			const result = envFactory.boolean
			expect(result instanceof EnvType).toBeTruthy()
			expect(result['_convertStrategy'] instanceof ConvertStrategyToBoolean).toBeTruthy()
		})
		it('should return EnvType with ToNumber convert strategy', () => {
			const result = envFactory.number
			expect(result instanceof EnvType).toBeTruthy()
			expect(result['_convertStrategy'] instanceof ConvertStrategyToNumber).toBeTruthy()
		})
		it('should return EnvType with Base64ToString convert strategy', () => {
			const result = envFactory.base64
			expect(result instanceof EnvType).toBeTruthy()
			expect(result['_convertStrategy'] instanceof ConvertStrategyBase64ToString).toBeTruthy()
		})
		it('should return EnvType with ToJson convert strategy', () => {
			const result = envFactory.json()
			expect(result instanceof EnvType).toBeTruthy()
			expect(result['_convertStrategy'] instanceof ConvertStrategyToJson).toBeTruthy()
		})
	})
})
