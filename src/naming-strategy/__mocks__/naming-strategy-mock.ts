import { jest } from '@jest/globals'
import { NamingStrategy } from 'src/naming-strategy'

export class NamingStrategyMock implements NamingStrategy {
	names = jest.fn<(params: string[]) => string[]>()
}
