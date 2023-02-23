import fs from 'fs'
import { LocationStrategy } from 'src/location/location-strategy'
import util from 'util'

export class DockerSecretsLocation implements LocationStrategy {
  public valueByName(name: string): string | undefined {
    try {
      return fs.readFileSync(util.format('/run/secrets/%s', name), 'utf8').trim()
    } catch (e) {
      return undefined
    }
  }
}
