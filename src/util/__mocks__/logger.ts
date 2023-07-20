import { LoggerStrategy, LoggerStrategyParams, StringOrObjectType } from '@beecode/msh-logger'
import { jest } from '@jest/globals'

/* eslint-disable @typescript-eslint/no-invalid-void-type */
export const _cache = {
	logger: {
		clone: jest.fn<(a: LoggerStrategyParams) => LoggerStrategy>(),
		debug: jest.fn<(a: StringOrObjectType[]) => void>(),
		error: jest.fn<(a: StringOrObjectType[]) => void>(),
		info: jest.fn<(a: StringOrObjectType[]) => void>(),
		warn: jest.fn<(a: StringOrObjectType[]) => void>(),
	},
}
/* eslint-enable @typescript-eslint/no-invalid-void-type */

export const logger = (): LoggerStrategy => {
	return _cache.logger
}
