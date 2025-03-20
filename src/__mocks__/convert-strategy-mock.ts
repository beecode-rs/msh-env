import { type ConvertStrategy } from '../convert-strategy.js'
import { vi } from 'vitest'

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export class ConvertStrategyMock<T = any> implements ConvertStrategy<T> {
	convert = vi.fn()
}
