import { jest } from '@jest/globals'
import { LocationStrategy } from 'src/location-strategy'

export class LocationStrategyMock implements LocationStrategy {
	valueByName = jest.fn<(params: string) => string | undefined>()
}
