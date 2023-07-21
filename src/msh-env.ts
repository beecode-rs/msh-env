import { EnvFactory } from '#/env/factory.js'
import { LocationStrategyEnvironment } from '#/location-strategy/environment.js'
import { LocationStrategy } from '#/location-strategy/index.js'
import { NamingStrategy } from '#/naming-strategy/index.js'
import { NamingStrategySimpleName } from '#/naming-strategy/simple-name.js'
import { logger } from '#/util/logger.js'

export const MshEnv = (params?: {
	locationStrategies?: LocationStrategy[]
	namingStrategies?: NamingStrategy[]
}): ((...name: string[]) => EnvFactory) => {
	const { locationStrategies = [new LocationStrategyEnvironment()], namingStrategies = [new NamingStrategySimpleName()] } =
		params ?? {}

	return (...names: string[]): EnvFactory => {
		logger().debug(`Initiate env: [${names.join(', ')}]`)

		return new EnvFactory({ locationStrategies, names: [...names], namingStrategies })
	}
}
