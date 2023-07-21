import { NamingStrategy } from '#/naming-strategy/index.js'
import { logger } from '#/util/logger.js'

export class NamingStrategySuffixName implements NamingStrategy {
	protected readonly _suffix: string

	constructor(suffix: string) {
		this._suffix = suffix
	}

	names(names: string[]): string[] {
		const resultNames = [...names.map((n) => [n, this._suffix].join(''))]
		logger().debug(`Original names: [${names.join(', ')}], suffixed names : [${resultNames.join(', ')}]`)

		return resultNames
	}
}
