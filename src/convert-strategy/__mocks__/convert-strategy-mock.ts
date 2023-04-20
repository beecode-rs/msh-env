import { ConvertStrategy } from 'src/convert-strategy'

export class ConvertStrategyMock<T = any> implements ConvertStrategy<T> {
	convert = jest.fn<T | undefined, [string]>()
}
