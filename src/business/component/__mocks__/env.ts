import { vi } from 'vitest'

import { type LocationStrategy } from '#src/business/service/location-strategy.js'
import { type NamingStrategy } from '#src/business/service/naming-strategy.js'

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

	protected _envNames = vi.fn()

	envValue = vi.fn()
}
