import { EnvFactory } from '#/env/factory'
import { LocationStrategyEnvironment } from '#/location-strategy/environment'
import { LocationStrategy } from '#/location-strategy/index'
import { NamingStrategy } from '#/naming-strategy/index'
import { NamingStrategySimpleName } from '#/naming-strategy/simple-name'
import { logger } from '#/util/logger'

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
