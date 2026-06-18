import { describe, expect, it } from 'vitest'

import { EnvFactory } from '#src/business/component/env/factory.js'
import { EnvType } from '#src/business/component/env/type.js'
import { Env } from '#src/business/component/env.js'
import { ConvertStrategyBase64ToString } from '#src/business/service/convert-strategy/base64-to-string.js'
import { ConvertStrategyToBoolean } from '#src/business/service/convert-strategy/to-boolean.js'
import { ConvertStrategyToJson } from '#src/business/service/convert-strategy/to-json.js'
import { ConvertStrategyToNumber } from '#src/business/service/convert-strategy/to-number.js'
import { ConvertStrategyToString } from '#src/business/service/convert-strategy/to-string.js'

describe.each([[['TEST']], [['TEST', 'TEST1']], [['TEST', 'TEST1', 'TEST2']]])(
	'%#. EnvFactory envNames: %p',
	(envNames) => {
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
	}
)
