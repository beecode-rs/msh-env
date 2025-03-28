import { vi } from 'vitest'

import { type LocationStrategy } from '#src/location-strategy'
import { type NamingStrategy } from '#src/naming-strategy'

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
