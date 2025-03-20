import { vi } from 'vitest'

import { type NamingStrategy } from '#src/naming-strategy'

export class NamingStrategyMock implements NamingStrategy {
	names = vi.fn().mockImplementation((params: string[]) => params)
}
