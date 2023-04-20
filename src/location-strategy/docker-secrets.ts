import fs from 'fs'
import { LocationStrategy } from 'src/location-strategy'
import util from 'util'

export class LocationStrategyDockerSecrets implements LocationStrategy {
	valueByName(name: string): string | undefined {
		try {
			return fs.readFileSync(util.format('/run/secrets/%s', name), 'utf8').trim()
		} catch (e) {
			return undefined
		}
	}
}
