import { NamingStrategy } from '#/naming-strategy/index'
import { logger } from '#/util/logger'

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
