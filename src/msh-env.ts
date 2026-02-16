import { EnvFactory } from '#src/env/factory.js'
import { LocationStrategyEnvironment } from '#src/location-strategy/environment.js'
import { type LocationStrategy } from '#src/location-strategy.js'
import { NamingStrategySimpleName } from '#src/naming-strategy/simple-name.js'
import { type NamingStrategy } from '#src/naming-strategy.js'
import { logger } from '#src/util/logger.js'

export type MshEnv = (...name: string[]) => EnvFactory

export const mshEnv = (params?: { locationStrategies?: LocationStrategy[]; namingStrategies?: NamingStrategy[] }): MshEnv => {
	const { locationStrategies = [new LocationStrategyEnvironment()], namingStrategies = [new NamingStrategySimpleName()] } =
		params ?? {}

	return (...names: string[]): EnvFactory => {
		logger().debug(`Initiate env: [${names.join(', ')}]`)

		return new EnvFactory({ locationStrategies, names: [...names], namingStrategies })
	}
}
