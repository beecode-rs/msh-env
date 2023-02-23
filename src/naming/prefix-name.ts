import { NamingStrategy } from 'src/naming/naming-strategy'
import { logger } from 'src/util/logger'

export class PrefixName implements NamingStrategy {
  protected readonly _prefix: string

  public constructor(prefix: string) {
    this._prefix = prefix
  }

  public names(names: string[]): string[] {
    const resultNames = [...names.map((n) => [this._prefix, n].join(''))]
    logger().debug(`Original names: [${names.join(', ')}], prefixed names : [${resultNames.join(', ')}]`)
    return resultNames
  }
}
