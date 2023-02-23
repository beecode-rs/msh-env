import { Base64ToString } from 'src/convert/base64-to-string'
import { ToBoolean } from 'src/convert/to-boolean'
import { ToJson } from 'src/convert/to-json'
import { ToNumber } from 'src/convert/to-number'
import { ToString } from 'src/convert/to-string'
import { Env } from 'src/env/env'
import { EnvFactory } from 'src/env/env-factory'
import { EnvType } from 'src/env/env-type'

describe.each([[['TEST']], [['TEST', 'TEST1']], [['TEST', 'TEST1', 'TEST2']]])('EnvFactory envNames: %p', (envNames) => {
  const envFactory = new EnvFactory({ names: envNames, locationStrategies: [], namingStrategies: [] })

  describe('constructor', () => {
    it('should store env in private _env property', () => {
      expect(envFactory['_env'] instanceof Env).toBeTruthy()
    })
  })

  describe('getter', () => {
    it('should return EnvType with ToString convert strategy', () => {
      const result = envFactory.string
      expect(result instanceof EnvType).toBeTruthy()
      expect(result['_convertStrategy'] instanceof ToString).toBeTruthy()
    })
    it('should return EnvType with ToBoolean convert strategy', () => {
      const result = envFactory.boolean
      expect(result instanceof EnvType).toBeTruthy()
      expect(result['_convertStrategy'] instanceof ToBoolean).toBeTruthy()
    })
    it('should return EnvType with ToNumber convert strategy', () => {
      const result = envFactory.number
      expect(result instanceof EnvType).toBeTruthy()
      expect(result['_convertStrategy'] instanceof ToNumber).toBeTruthy()
    })
    it('should return EnvType with Base64ToString convert strategy', () => {
      const result = envFactory.base64
      expect(result instanceof EnvType).toBeTruthy()
      expect(result['_convertStrategy'] instanceof Base64ToString).toBeTruthy()
    })
    it('should return EnvType with ToJson convert strategy', () => {
      const result = envFactory.json()
      expect(result instanceof EnvType).toBeTruthy()
      expect(result['_convertStrategy'] instanceof ToJson).toBeTruthy()
    })
  })
})
