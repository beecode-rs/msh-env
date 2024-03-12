import { ConvertStrategyBase64ToString } from '#/convert-strategy/base64-to-string'
import { ConvertStrategyToBoolean } from '#/convert-strategy/to-boolean'
import { ConvertStrategyToJson } from '#/convert-strategy/to-json'
import { ConvertStrategyToNumber } from '#/convert-strategy/to-number'
import { ConvertStrategyToString } from '#/convert-strategy/to-string'
import { Env } from '#/env'
import { EnvType } from '#/env/type'
import { LocationStrategy } from '#/location-strategy'
import { NamingStrategy } from '#/naming-strategy'

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
