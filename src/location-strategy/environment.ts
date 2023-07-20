import { LocationStrategy } from '#/location-strategy/index.js'

export class LocationStrategyEnvironment implements LocationStrategy {
	valueByName(name: string): string | undefined {
		return process.env[name]
	}
}
