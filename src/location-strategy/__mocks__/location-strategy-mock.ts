import { jest } from '@jest/globals'

import { LocationStrategy } from '#/location-strategy/index.js'

export class LocationStrategyMock implements LocationStrategy {
	valueByName = jest.fn<(params: string) => string | undefined>()
}
