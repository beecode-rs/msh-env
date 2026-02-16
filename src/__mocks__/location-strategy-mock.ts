import { vi } from 'vitest'

import { type LocationStrategy } from '#src/location-strategy.js'

export class LocationStrategyMock implements LocationStrategy {
	valueByName = vi.fn()
}
