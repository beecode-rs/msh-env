import { readFileSync } from 'fs'
import { format } from 'util'

import { LocationStrategy } from '#src/location-strategy'

export class LocationStrategyDockerSecrets implements LocationStrategy {
	valueByName(name: string): string | undefined {
		try {
			return readFileSync(format('/run/secrets/%s', name), 'utf8').trim()
		} catch (e) {
			return undefined
		}
	}
}
