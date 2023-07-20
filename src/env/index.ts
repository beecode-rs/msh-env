import { LocationStrategy } from '#/location-strategy/index'
import { NamingStrategy } from '#/naming-strategy/index'
import { logger } from '#/util/logger'

export class Env {
	readonly names: string[]
	protected readonly _locationStrategies: LocationStrategy[]
	protected readonly _namingStrategies: NamingStrategy[]

	constructor(params: { names: string[]; locationStrategies: LocationStrategy[]; namingStrategies: NamingStrategy[] }) {
		const { locationStrategies, namingStrategies, names } = params
		this._locationStrategies = locationStrategies
		this._namingStrategies = namingStrategies
		this.names = [...names]
	}

	protected _envNames(): string[] {
		const { result } = this._namingStrategies.reduce<{ result: string[]; lastResult: string[] }>(
			(acc, ns) => {
				acc.lastResult = ns.names([...acc.lastResult])
				acc.result.push(...acc.lastResult)

				return acc
			},
			{ lastResult: [...this.names].reverse(), result: [...this.names].reverse() }
		)

		const resultNames = [...result].reverse()
		logger().debug(`Try names in this order: [${resultNames.join(', ')}]`)

		return resultNames
	}

	envValue(): string | undefined {
		return this._envNames().reduce<string | undefined>((envResult, name) => {
			if (envResult) {
				return envResult
			}

			return this._locationStrategies.reduce<string | undefined>((locResult, ls) => {
				if (locResult) {
					return locResult
				}

				return ls.valueByName(name)
			}, undefined)
		}, undefined)
	}
}
