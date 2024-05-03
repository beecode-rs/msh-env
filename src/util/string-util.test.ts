import { Mock, afterAll, afterEach, beforeEach, describe, expect, it, vi } from 'vitest'

import { StringUtil } from '#src/util/string-util'

describe('util - stringUtil', () => {
	afterAll(() => {
		vi.restoreAllMocks()
	})

	describe('toSnakeCase', () => {
		it.each([
			['', ''],
			[' ', ''],
			['  ', ''],
			['TEST', 'test'],
			['this is  a test', 'this_is_a_test'],
			['this-is-_a|test', 'this_is_a_test'],
			['PascalCase', 'pascal_case'],
			['camelCase', 'camel_case'],
			['snake_case', 'snake_case'],
		])('%#. should convert %s to snake case %s', (value, expected) => {
			const result = new StringUtil().toSnakeCase(value)
			expect(result).toEqual(expected)
		})
	})
	describe('toSnakeUpperCase', () => {
		const stringUtil = new StringUtil()
		let spy_stringUtil_toSnakeCase: Mock
		beforeEach(() => {
			spy_stringUtil_toSnakeCase = vi.spyOn(stringUtil, 'toSnakeCase')
		})

		it('should return snake and make it upper case', () => {
			const dummySnakeCase = 'snake_case'
			spy_stringUtil_toSnakeCase.mockReturnValue(dummySnakeCase)
			expect(stringUtil.toSnakeUpperCase('snakeCase')).toEqual('SNAKE_CASE')
		})
	})
})
