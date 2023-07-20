import { NamingStrategy } from '#/naming-strategy/index.js'
import { logger } from '#/util/logger.js'

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
