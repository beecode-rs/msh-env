import { type LocationStrategy } from '#src/business/service/location-strategy.js'

export class LocationStrategyEnvironment implements LocationStrategy {
	valueByName(name: string): string | undefined {
		return process.env[name]
	}
}
