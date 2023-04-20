import { LocationStrategy } from 'src/location-strategy'

export class LocationStrategyMock implements LocationStrategy {
	valueByName = jest.fn<string | undefined, [string]>()
}
