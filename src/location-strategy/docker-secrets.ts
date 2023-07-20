import fs from 'fs'
import util from 'util'

import { LocationStrategy } from '#/location-strategy/index.js'

export class LocationStrategyDockerSecrets implements LocationStrategy {
	valueByName(name: string): string | undefined {
		try {
			return fs.readFileSync(util.format('/run/secrets/%s', name), 'utf8').trim()
		} catch (e) {
			return undefined
		}
	}
}
