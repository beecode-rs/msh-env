import { EnvFactory } from 'src/env/env-factory'
import { EnvironmentLocation } from 'src/location/environment-location'
import { LocationStrategy } from 'src/location/location-strategy'
import { NamingStrategy } from 'src/naming/naming-strategy'
import { SimpleName } from 'src/naming/simple-name'
import { logger } from 'src/util/logger'

export type MshNodeEnvReturn = (...name: string[]) => EnvFactory

export const MshNodeEnv = (
  params: { locationStrategies?: LocationStrategy[]; namingStrategies?: NamingStrategy[] } = {}
): MshNodeEnvReturn => {
  const { locationStrategies = [new EnvironmentLocation()], namingStrategies = [new SimpleName()] } = params

  return (...names: string[]): EnvFactory => {
    logger().debug(`Initiate env: [${names.join(', ')}]`)
    return new EnvFactory({ locationStrategies, namingStrategies, names: [...names] })
  }
}
