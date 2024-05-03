import { ConvertStrategy } from '../convert-strategy.js'
import { vi } from 'vitest'

export class ConvertStrategyMock<T = any> implements ConvertStrategy<T> {
	convert = vi.fn()
}
