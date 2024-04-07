import minimist from 'minimist'
import buildOptions, { Options } from 'minimist-options'

import { LocationStrategy } from '#src/location-strategy'

export class LocationStrategyCliArgsMinimist<T extends minimist.ParsedArgs> implements LocationStrategy {
	protected readonly _miniOpts: minimist.Opts
	protected readonly _args: T

	constructor(params?: { options?: Options; args?: string[] }) {
		const { options = {}, args = process.argv.slice(2) } = params ?? {}
		// @ts-ignore issue with loading minimist-options as es module
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
