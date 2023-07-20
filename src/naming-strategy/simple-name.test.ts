import assert from 'assert'

import { NamingStrategySimpleName } from '#/naming-strategy/simple-name'

describe('NamingStrategySimpleName', () => {
	describe('names', () => {
		it('should return array of name', () => {
			const simpleName = new NamingStrategySimpleName()
			assert.deepEqual(simpleName.names(['some-name']), ['some-name'])
		})

		it('should return array of names', () => {
			const simpleName = new NamingStrategySimpleName()
			assert.deepEqual(simpleName.names(['some-name']), ['some-name'])
		})

		it('should return array of multiple names', () => {
			const simpleName = new NamingStrategySimpleName()
			assert.deepEqual(simpleName.names(['some-name', 'some-name2']), ['some-name', 'some-name2'])
		})
	})
})
