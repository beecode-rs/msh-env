import { LocationStrategy } from 'src/location/location-strategy'

export class MockLocationStrategy implements LocationStrategy {
  valueByName = jest.fn<string | undefined, [string]>()
}
