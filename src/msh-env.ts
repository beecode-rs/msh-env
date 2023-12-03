import { EnvFactory } from '#/env/factory'
import { LocationStrategy } from '#/location-strategy'
import { LocationStrategyEnvironment } from '#/location-strategy/environment'
import { NamingStrategy } from '#/naming-strategy'
import { NamingStrategySimpleName } from '#/naming-strategy/simple-name'
import { logger } from '#/util/logger'

export type MshEnv = (...name: string[]) => EnvFactory

export const mshEnv = (params?: { locationStrategies?: LocationStrategy[]; namingStrategies?: NamingStrategy[] }): MshEnv => {
	const { locationStrategies = [new LocationStrategyEnvironment()], namingStrategies = [new NamingStrategySimpleName()] } =
		params ?? {}

	return (...names: string[]): EnvFactory => {
		logger().debug(`Initiate env: [${names.join(', ')}]`)

		return new EnvFactory({ locationStrategies, names: [...names], namingStrategies })
	}
}
