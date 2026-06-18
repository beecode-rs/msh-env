import { EnvFactory } from '#src/business/component/env/factory.js'
import { type MshEnv } from '#src/business/model/msh-env.js'
import { LocationStrategyEnvironment } from '#src/business/service/location-strategy/environment.js'
import { type LocationStrategy } from '#src/business/service/location-strategy.js'
import { NamingStrategySimpleName } from '#src/business/service/naming-strategy/simple-name.js'
import { type NamingStrategy } from '#src/business/service/naming-strategy.js'
import { logger } from '#src/util/logger.js'

export const mshEnv = (params?: {
	locationStrategies?: LocationStrategy[]
	namingStrategies?: NamingStrategy[]
}): MshEnv => {
	const {
		locationStrategies = [new LocationStrategyEnvironment()],
		namingStrategies = [new NamingStrategySimpleName()],
	} = params ?? {}

	return (...names: string[]): EnvFactory => {
		logger().debug(`Initiate env: [${names.join(', ')}]`)

		return new EnvFactory({ locationStrategies, names: [...names], namingStrategies })
	}
}
