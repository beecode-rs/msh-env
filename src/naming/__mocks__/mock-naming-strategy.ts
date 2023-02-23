import { NamingStrategy } from 'src/naming/naming-strategy'

export class MockNamingStrategy implements NamingStrategy {
  names = jest.fn<string[], [string[]]>()
}
