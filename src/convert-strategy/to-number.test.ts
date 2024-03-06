import assert from 'assert'

import { ConvertStrategyToNumber } from '#/convert-strategy/to-number'

describe('ConvertStrategyToNumber', () => {
	const toNumber = new ConvertStrategyToNumber()

	it('should return undefined if passed undefined', () => {
		expect(toNumber.convert(undefined)).toBeUndefined()
		expect(toNumber.convert()).toBeUndefined()
	})
	it.each([
		['123', 123],
		['-123', -123],
		['10.01', 10.01],
		['-10.999', -10.999],
		['0', 0],
	])('%#. should convert %s to $s number', (str, expectedValue) => {
		expect(toNumber.convert(str)).toEqual(expectedValue)
	})
	it.each(['bb123', '1.2.3.4', '11,22', '-10.999 x', 'null', 'someWord', 'some sentence', '{"json":"value"}'])(
		'%#. should throw error if "%s" passed',
		(notANumber) => {
			const checkForError = (): void => {
				toNumber.convert(notANumber)
			}
			assert.throws(checkForError, Error, `"${notANumber}" is not a number`)
		}
	)
	it.each(['', ' ', '  '])('%#. should return undefined if "%s" passed', (emptyString) => {
		expect(toNumber.convert(emptyString)).toBeUndefined()
	})
})
