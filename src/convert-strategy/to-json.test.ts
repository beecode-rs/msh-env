import { ConvertStrategyToJson } from '#/convert-strategy/to-json'

describe('ConvertStrategyToJson', () => {
	const toJson = new ConvertStrategyToJson()

	it('should return undefined if passed undefined', () => {
		expect(toJson.convert(undefined)).toBeUndefined()
		expect(toJson.convert()).toBeUndefined()
	})

	it('should return object parsed from string', () => {
		const jsonObject = { test: 'some test value' }
		const result = toJson.convert(JSON.stringify(jsonObject))
		expect(result).not.toBe(jsonObject)
		expect(result).toEqual(jsonObject)
	})
	it.each(['', ' ', '   '])('%#. should return undefined if "%s" passed', (str) => {
		expect(toJson.convert(str)).toBeUndefined()
	})
	it('should throw error if unable to convert to json', () => {
		try {
			toJson.convert('not a string')
			expect.fail('test failed')
		} catch (e) {
			expect((e as Error).message).toEqual('"not a string" is not a json. Error: Unexpected token o in JSON at position 1')
		}
	})
})
