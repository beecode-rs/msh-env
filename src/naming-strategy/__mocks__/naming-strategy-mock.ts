import { jest } from '@jest/globals'

import { NamingStrategy } from '#/naming-strategy'

export class NamingStrategyMock implements NamingStrategy {
	names = jest.fn<(params: string[]) => string[]>().mockImplementation((params: string[]) => params)
}
