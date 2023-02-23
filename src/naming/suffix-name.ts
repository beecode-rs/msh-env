import { NamingStrategy } from 'src/naming/naming-strategy'
import { logger } from 'src/util/logger'

export class SuffixName implements NamingStrategy {
  protected readonly _suffix: string

  public constructor(suffix: string) {
    this._suffix = suffix
  }

  public names(names: string[]): string[] {
    const resultNames = [...names.map((n) => [n, this._suffix].join(''))]
    logger().debug(`Original names: [${names.join(', ')}], suffixed names : [${resultNames.join(', ')}]`)
    return resultNames
  }
}
