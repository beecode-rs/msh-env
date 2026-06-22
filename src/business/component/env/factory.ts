import { EnvType } from '#src/business/component/env/type.js'
import { Env } from '#src/business/component/env.js'
import { ConvertStrategyBase64ToString } from '#src/business/service/convert-strategy/base64-to-string.js'
import { ConvertStrategyToBoolean } from '#src/business/service/convert-strategy/to-boolean.js'
import { ConvertStrategyToJson } from '#src/business/service/convert-strategy/to-json.js'
import { ConvertStrategyToNumber } from '#src/business/service/convert-strategy/to-number.js'
import { ConvertStrategyToString } from '#src/business/service/convert-strategy/to-string.js'
import { type LocationStrategy } from '#src/business/service/location-strategy.js'
import { type NamingStrategy } from '#src/business/service/naming-strategy.js'

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
