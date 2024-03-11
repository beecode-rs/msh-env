import { describe, expect, it } from '@jest/globals'

import { ConvertStrategyToBoolean } from '#/convert-strategy/to-boolean'

describe('ConvertStrategyToBoolean', () => {
	const toBoolean = new ConvertStrategyToBoolean()

	it('should return undefined if passed undefined', () => {
		expect(toBoolean.convert(undefined)).toBeUndefined()
		expect(toBoolean.convert()).toBeUndefined()
	})
	it.each(['true', 'True', 'TRUE', 'TrUe', 'tRuE'])('%#. should return true if "%s" passed', (strValue) => {
		expect(toBoolean.convert(strValue)).toBeTruthy()
	})

	it.each(['false', 'False', 'FALSE', 'FaLsE', 'fAlSe'])('%#. should return false if "%s" passed', (strValue) => {
		expect(toBoolean.convert(strValue)).toBeFalsy()
	})
	it.each(['not boolean', ''])('%#. should return undefined if "%s" passed', (someValue) => {
		expect(toBoolean.convert(someValue)).toBeUndefined()
	})
})
