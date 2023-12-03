import { LoggerStrategy, LoggerStrategyParams } from '@beecode/msh-logger/logger-strategy/index'
import { jest } from '@jest/globals'

/* eslint-disable @typescript-eslint/no-invalid-void-type */
export const _cache = {
	logger: {
		clone: jest.fn<(a: LoggerStrategyParams) => LoggerStrategy>(),
		debug: jest.fn<(a: unknown[]) => void>(),
		error: jest.fn<(a: unknown[]) => void>(),
		info: jest.fn<(a: unknown[]) => void>(),
		warn: jest.fn<(a: unknown[]) => void>(),
	},
}
/* eslint-enable @typescript-eslint/no-invalid-void-type */

export const logger = (): LoggerStrategy => {
	return _cache.logger
}
