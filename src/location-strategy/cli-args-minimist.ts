import minimist from 'minimist'
import buildOptions from 'minimist-options'

import { LocationStrategy } from '#/location-strategy/index'

export class LocationStrategyCliArgsMinimist<T extends minimist.ParsedArgs> implements LocationStrategy {
	protected readonly _miniOpts: minimist.Opts
	protected readonly _args: T

	constructor(params?: { options?: buildOptions.Options; args?: string[] }) {
		const { options = {}, args = process.argv.slice(2) } = params ?? {}
		// @ts-expect-error
		this._miniOpts = buildOptions(options)
		this._args = minimist<T>(args, this._miniOpts)
	}

	valueByName(name: string): string | undefined {
		const value = this._args[name]
		if (value === undefined) {
			return value
		}

		return value.toString()
	}
}
