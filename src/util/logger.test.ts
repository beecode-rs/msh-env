import { LoggerStrategyConsole } from '@beecode/msh-logger/logger-strategy/console/index.js'
import { LoggerStrategyVoid } from '@beecode/msh-logger/logger-strategy/void.js'

import { logger, setEnvLogger } from '#/util/logger.js'

describe('logger', () => {
	describe('NodeAppLogger', () => {
		it('should retrieve default logger', () => {
			const defaultLogger = logger()
			expect(defaultLogger instanceof LoggerStrategyVoid).toBeTruthy()
		})

		it('should allow to change logger', () => {
			const newLogger = new LoggerStrategyConsole()
			setEnvLogger(newLogger)
			const currentLogger = logger()
			expect(currentLogger instanceof LoggerStrategyConsole).toBeTruthy()
		})
	})
})
