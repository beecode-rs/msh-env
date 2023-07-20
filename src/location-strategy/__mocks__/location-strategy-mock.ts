import { jest } from '@jest/globals'

import { LocationStrategy } from '#/location-strategy/index'

export class LocationStrategyMock implements LocationStrategy {
	valueByName = jest.fn<(params: string) => string | undefined>()
}
