import { vi } from 'vitest'

import { NamingStrategy } from '#src/naming-strategy'

export class NamingStrategyMock implements NamingStrategy {
	names = vi.fn().mockImplementation((params: string[]) => params)
}
