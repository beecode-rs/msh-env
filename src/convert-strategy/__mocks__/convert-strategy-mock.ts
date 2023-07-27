import { jest } from '@jest/globals'
import { ConvertStrategy } from 'src/convert-strategy'

export class ConvertStrategyMock<T = any> implements ConvertStrategy<T> {
	convert = jest.fn<(params: string) => T | undefined>()
}
