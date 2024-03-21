import { LoggerStrategy, LoggerStrategyParams } from '@beecode/msh-logger/logger-strategy'
import { jest } from '@jest/globals'

const _cache = {
	logger: {
		clone: jest.fn<(a: LoggerStrategyParams) => LoggerStrategy>(),
		debug: jest.fn<(a: unknown[]) => void>(),
		error: jest.fn<(a: unknown[]) => void>(),
		info: jest.fn<(a: unknown[]) => void>(),
		warn: jest.fn<(a: unknown[]) => void>(),
	},
}

export const logger = (): LoggerStrategy => {
	return _cache.logger
}
