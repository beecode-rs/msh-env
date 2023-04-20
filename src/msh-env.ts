import { EnvFactory } from 'src/env/factory'
import { LocationStrategy } from 'src/location-strategy'
import { LocationStrategyEnvironment } from 'src/location-strategy/environment'
import { NamingStrategy } from 'src/naming-strategy'
import { NamingStrategySimpleName } from 'src/naming-strategy/simple-name'
import { logger } from 'src/util/logger'

export const MshEnv = (params?: {
	locationStrategies?: LocationStrategy[]
	namingStrategies?: NamingStrategy[]
}): ((...name: string[]) => EnvFactory) => {
	const { locationStrategies = [new LocationStrategyEnvironment()], namingStrategies = [new NamingStrategySimpleName()] } =
		params ?? {}

	return (...names: string[]): EnvFactory => {
		logger().debug(`Initiate env: [${names.join(', ')}]`)

		return new EnvFactory({ locationStrategies, namingStrategies, names: [...names] })
	}
}
