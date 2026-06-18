import { vi } from 'vitest'

import { type ConvertStrategy } from '../convert-strategy.js'

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export class ConvertStrategyMock<T = any> implements ConvertStrategy<T> {
	convert = vi.fn()
}
