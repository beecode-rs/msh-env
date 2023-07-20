import { ConvertStrategyToString } from '#/convert-strategy/to-string'

describe('ConvertStrategyToString', () => {
	const toString = new ConvertStrategyToString()

	it('should return undefined if passed undefined', () => {
		expect(toString.convert(undefined)).toBeUndefined()
		expect(toString.convert()).toBeUndefined()
	})
	it.each(['string-a', 'string-b'])('%#. should return the same string that is passed as params "${str}"', (str) => {
		expect(toString.convert(str)).toEqual(str)
	})
	it.each(['', ' ', '   '])('%#. should return undefined if "%s" passed', (str) => {
		expect(toString.convert(str)).toBeUndefined()
	})
})
