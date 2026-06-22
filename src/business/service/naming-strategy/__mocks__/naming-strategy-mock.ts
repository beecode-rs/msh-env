import { vi } from 'vitest'

import { type NamingStrategy } from '#src/business/service/naming-strategy.js'

export class NamingStrategyMock implements NamingStrategy {
	names = vi.fn().mockImplementation((params: string[]) => params)
}
