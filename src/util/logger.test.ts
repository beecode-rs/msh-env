import { PresetConsoleSimpleString } from '@beecode/msh-logger/controller/preset/console-simple-string'
import { PresetVoid } from '@beecode/msh-logger/controller/preset/void'
import { describe, expect, it } from 'vitest'

import { logger, setEnvLogger } from '#src/util/logger.js'

describe('logger', () => {
	describe('NodeAppLogger', () => {
		it('should retrieve default logger', () => {
			const defaultLogger = logger()
			expect(defaultLogger instanceof PresetVoid).toBeTruthy()
		})

		it('should allow to change logger', () => {
			const newLogger = new PresetConsoleSimpleString()
			setEnvLogger(newLogger)
			const currentLogger = logger()
			expect(currentLogger instanceof PresetConsoleSimpleString).toBeTruthy()
		})
	})
})
