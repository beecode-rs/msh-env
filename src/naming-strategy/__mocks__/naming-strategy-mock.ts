import { NamingStrategy } from 'src/naming-strategy'

export class NamingStrategyMock implements NamingStrategy {
	names = jest.fn<string[], [string[]]>()
}
