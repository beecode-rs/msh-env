import { ConvertStrategy } from '../convert-strategy.js'
import { jest } from '@jest/globals'

export class ConvertStrategyMock<T = any> implements ConvertStrategy<T> {
	convert = jest.fn<(params: string) => T | undefined>()
}
