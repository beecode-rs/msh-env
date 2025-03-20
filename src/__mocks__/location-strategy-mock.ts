import { vi } from 'vitest'

import { type LocationStrategy } from '#src/location-strategy'

export class LocationStrategyMock implements LocationStrategy {
	valueByName = vi.fn()
}
