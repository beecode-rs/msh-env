import { Base64ToString } from 'src/convert/base64-to-string'
import { ToBoolean } from 'src/convert/to-boolean'
import { ToJson } from 'src/convert/to-json'
import { ToNumber } from 'src/convert/to-number'
import { ToString } from 'src/convert/to-string'
import { Env } from 'src/env/env'
import { EnvType } from 'src/env/env-type'
import { LocationStrategy } from 'src/location/location-strategy'
import { NamingStrategy } from 'src/naming/naming-strategy'

export class EnvFactory {
  protected readonly _env: Env

  constructor(params: { names: string[]; locationStrategies: LocationStrategy[]; namingStrategies: NamingStrategy[] }) {
    const { names, locationStrategies, namingStrategies } = params
    this._env = new Env({ names, locationStrategies, namingStrategies })
  }

  public get string(): EnvType<string> {
    return new EnvType<string>({ convertStrategy: new ToString(), env: this._env })
  }

  public get boolean(): EnvType<boolean> {
    return new EnvType<boolean>({ convertStrategy: new ToBoolean(), env: this._env })
  }

  public get number(): EnvType<number> {
    return new EnvType<number>({ convertStrategy: new ToNumber(), env: this._env })
  }

  public json<T>(): EnvType<T> {
    return new EnvType<T>({ convertStrategy: new ToJson<T>(), env: this._env })
  }

  public get base64(): EnvType<string> {
    return new EnvType<string>({ convertStrategy: new Base64ToString(), env: this._env })
  }
}
