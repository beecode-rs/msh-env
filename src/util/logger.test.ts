import { LoggerStrategyConsole } from '@beecode/msh-logger/lib/logger-strategy/console'
import { LoggerStrategyVoid } from '@beecode/msh-logger/lib/logger-strategy/void'
import { logger, setEnvLogger } from 'src/util/logger'

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
