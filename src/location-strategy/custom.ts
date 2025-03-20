import { type LocationStrategy } from '#src/location-strategy'

export class LocationStrategyCustom implements LocationStrategy {
	protected readonly _env: Record<string, string>

	constructor(env: Record<string, string>) {
		this._env = env
	}

	valueByName(name: string): string | undefined {
		return this._env[name]
	}
}
