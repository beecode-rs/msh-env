import { LocationStrategy } from '#/location-strategy'

export class LocationStrategyEnvironment implements LocationStrategy {
	valueByName(name: string): string | undefined {
		return process.env[name]
	}
}
