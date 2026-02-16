import { type LocationStrategy } from '#src/location-strategy.js'

export class LocationStrategyImportMetaEnv implements LocationStrategy {
	valueByName(name: string): string | undefined {
		return import.meta.env[name]
	}
}
