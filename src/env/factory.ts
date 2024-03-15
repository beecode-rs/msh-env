import { ConvertStrategyBase64ToString } from '#src/convert-strategy/base64-to-string'
import { ConvertStrategyToBoolean } from '#src/convert-strategy/to-boolean'
import { ConvertStrategyToJson } from '#src/convert-strategy/to-json'
import { ConvertStrategyToNumber } from '#src/convert-strategy/to-number'
import { ConvertStrategyToString } from '#src/convert-strategy/to-string'
import { Env } from '#src/env'
import { EnvType } from '#src/env/type'
import { LocationStrategy } from '#src/location-strategy'
import { NamingStrategy } from '#src/naming-strategy'

export class EnvFactory {
	protected readonly _env: Env

	constructor(params: { names: string[]; locationStrategies: LocationStrategy[]; namingStrategies: NamingStrategy[] }) {
		const { names, locationStrategies, namingStrategies } = params
		this._env = new Env({ locationStrategies, names, namingStrategies })
	}

	get string(): EnvType<string> {
		return new EnvType<string>({ convertStrategy: new ConvertStrategyToString(), env: this._env })
	}

	get boolean(): EnvType<boolean> {
		return new EnvType<boolean>({ convertStrategy: new ConvertStrategyToBoolean(), env: this._env })
	}

	get number(): EnvType<number> {
		return new EnvType<number>({ convertStrategy: new ConvertStrategyToNumber(), env: this._env })
	}

	json<T>(): EnvType<T> {
		return new EnvType<T>({ convertStrategy: new ConvertStrategyToJson<T>(), env: this._env })
	}

	get base64(): EnvType<string> {
		return new EnvType<string>({ convertStrategy: new ConvertStrategyBase64ToString(), env: this._env })
	}
}
