import { EnvFactory } from '#src/env/factory'
import { type LocationStrategy } from '#src/location-strategy'
import { LocationStrategyEnvironment } from '#src/location-strategy/environment'
import { type NamingStrategy } from '#src/naming-strategy'
import { NamingStrategySimpleName } from '#src/naming-strategy/simple-name'
import { logger } from '#src/util/logger'

export type MshEnv = (...name: string[]) => EnvFactory

export const mshEnv = (params?: { locationStrategies?: LocationStrategy[]; namingStrategies?: NamingStrategy[] }): MshEnv => {
	const { locationStrategies = [new LocationStrategyEnvironment()], namingStrategies = [new NamingStrategySimpleName()] } =
		params ?? {}

	return (...names: string[]): EnvFactory => {
		logger().debug(`Initiate env: [${names.join(', ')}]`)

		return new EnvFactory({ locationStrategies, names: [...names], namingStrategies })
	}
}
