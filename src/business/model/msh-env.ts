import { type EnvFactory } from '#src/business/component/env/factory.js'

export type MshEnv = (...name: string[]) => EnvFactory
