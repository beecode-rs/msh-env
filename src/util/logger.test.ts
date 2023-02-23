import { ConsoleLogger } from '@beecode/msh-node-log/lib/console-logger'
import { NoLogger } from '@beecode/msh-node-log/lib/no-logger'
import { NodeEnvLogger, logger } from 'src/util/logger'

describe('logger', () => {
  describe('NodeAppLogger', () => {
    it('should retrieve default logger', () => {
      const defaultLogger = logger()
      expect(defaultLogger instanceof NoLogger).toBeTruthy()
    })

    it('should allow to change logger', () => {
      const newLogger = new ConsoleLogger()
      NodeEnvLogger(newLogger)
      const currentLogger = logger()
      expect(currentLogger instanceof ConsoleLogger).toBeTruthy()
    })
  })
})
