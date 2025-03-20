import { type LocationStrategy } from '#src/location-strategy'

export class LocationStrategyImportMetaEnv implements LocationStrategy {
	valueByName(name: string): string | undefined {
		return import.meta.env[name]
	}
}
