import { LoggerStrategy } from '@beecode/msh-logger/logger-strategy'
import { vi } from 'vitest'

const _cache = {
	logger: {
		clone: vi.fn(),
		debug: vi.fn(),
		error: vi.fn(),
		info: vi.fn(),
		warn: vi.fn(),
	},
}

export const logger = (): LoggerStrategy => {
	return _cache.logger
}
