import { NamingStrategy } from '#src/naming-strategy'
import { logger } from '#src/util/logger'

export class NamingStrategyPrefixName implements NamingStrategy {
	protected readonly _prefix: string

	constructor(prefix: string) {
		this._prefix = prefix
	}

	names(names: string[]): string[] {
		const resultNames = [...names.map((n) => [this._prefix, n].join(''))]
		logger().debug(`Original names: [${names.join(', ')}], prefixed names : [${resultNames.join(', ')}]`)

		return resultNames
	}
}
