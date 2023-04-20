import { LoggerStrategy, LoggerStrategyParams, StringOrObjectType } from '@beecode/msh-logger'

export const _cache = {
	logger: {
		clone: jest.fn<LoggerStrategy, [LoggerStrategyParams]>(),
		debug: jest.fn<void, StringOrObjectType[]>(),
		error: jest.fn<void, StringOrObjectType[]>(),
		info: jest.fn<void, StringOrObjectType[]>(),
		warn: jest.fn<void, StringOrObjectType[]>(),
	},
}

export const logger = (): LoggerStrategy => {
	return _cache.logger
}
