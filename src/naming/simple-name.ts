import { NamingStrategy } from 'src/naming/naming-strategy'

export class SimpleName implements NamingStrategy {
  public names(names: string | string[]): string[] {
    return [...names]
  }
}
