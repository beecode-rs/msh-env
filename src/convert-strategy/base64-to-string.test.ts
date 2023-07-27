import { ConvertStrategyBase64ToString } from 'src/convert-strategy/base64-to-string'

describe('ConvertStrategyBase64ToString', () => {
	const base64ToString = new ConvertStrategyBase64ToString()

	it('should return undefined if passed undefined', () => {
		expect(base64ToString.convert(undefined)).toBeUndefined()
		expect(base64ToString.convert()).toBeUndefined()
	})
	it.each([
		['dGVzdA==', 'test'],
		['c29tZSBsb25nIHRlc3Q=', 'some long test'],
		['c29tZQpsb25nCnRlc3QKd2l0aApuZXcKcm93cw==', 'some\nlong\ntest\nwith\nnew\nrows'],
	])('%#. should convert base64 %s to string %s', (str, expectedValue) => {
		expect(base64ToString.convert(str)).toEqual(expectedValue)
	})

	it.each(['', ' ', '  '])(`%#. should return undefined if "%s" passed`, (emptyString) => {
		expect(base64ToString.convert(emptyString)).toBeUndefined()
	})

	it.each(['-', '!', 'dGVzdA!!'])('%#. should throw error if "%s" passed', (notAllowedString) => {
		try {
			base64ToString.convert(notAllowedString)
			expect.fail('test failed')
		} catch (err) {
			expect((err as Error).message).toEqual(
				`"${notAllowedString}" is not a base64. Error: Invalid character: the string to be decoded is not correctly encoded.`
			)
		}
	})
})
