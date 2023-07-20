import { jest } from '@jest/globals'

import { NamingStrategy } from '#/naming-strategy/index'

export class NamingStrategyMock implements NamingStrategy {
	names = jest.fn<(params: string[]) => string[]>()
}
