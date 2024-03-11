// TODO only working if we import @beecode/msh-logger/logger-strategy/console/index
import { LoggerStrategyConsole } from '@beecode/msh-logger/logger-strategy/console/index'
import { LoggerStrategyVoid } from '@beecode/msh-logger/logger-strategy/void'
import { describe, expect, it } from '@jest/globals'

import { logger, setEnvLogger } from '#/util/logger'

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
