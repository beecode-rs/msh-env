import { LoggerStrategy } from '@beecode/msh-logger'
import { LoggerStrategyVoid } from '@beecode/msh-logger/dist/logger-strategy/void'

const _cache = {
	logger: new LoggerStrategyVoid(),
}

export const setEnvLogger = (logger: LoggerStrategy): void => {
	_cache.logger = logger
}

export const logger = (): LoggerStrategy => {
	return _cache.logger
}
