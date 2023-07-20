import { Options } from 'minimist-options'

import { LocationStrategyCliArgsMinimist } from '#/location-strategy/cli-args-minimist.js'

/* eslint-disable @typescript-eslint/naming-convention */
describe('LocationStrategyCliArgsMinimist', () => {
	// eslint-disable-next-line @typescript-eslint/no-explicit-any
	it.each<[{ options?: Options; args?: string[] }, { _args: any }, Record<string, string | undefined>]>([
		[{ args: ['test'] }, { _args: { _: ['test'] } }, {}],
		[{ args: ['test', 'test2'] }, { _args: { _: ['test', 'test2'] } }, {}],
		[{ args: ['--test'] }, { _args: { _: [], test: true } }, {}],
		[{ args: ['-t'] }, { _args: { _: [], t: true } }, {}],
		[
			{ args: ['-t'], options: { test: { alias: 't', type: 'boolean' } } },
			{ _args: { _: [], t: true, test: true } },
			{ test: 'true' },
		],
		[
			{ args: ['--test'], options: { test: { alias: 't', type: 'boolean' } } },
			{ _args: { _: [], t: true, test: true } },
			{ test: 'true' },
		],
		[
			{ args: ['--test=someValue'], options: { test: { alias: 't', type: 'string' } } },
			{ _args: { _: [], t: 'someValue', test: 'someValue' } },
			{ test: 'someValue' },
		],
		[
			{ args: ['--test=123'], options: { test: { alias: 't', type: 'number' } } },
			{ _args: { _: [], t: 123, test: 123 } },
			{ test: '123' },
		],
		[
			{ args: ['--test'], options: { test: { alias: 't', type: 'boolean' } } },
			{ _args: { _: [], t: true, test: true } },
			{ doesNotExist: undefined },
		],
	])('%#. should pass expect result from: %j as %j and test %j', (srcParams, result, names) => {
		const cliArgLoc = new LocationStrategyCliArgsMinimist(srcParams)
		Object.entries(result).forEach(([key, value]) => {
			// eslint-disable-next-line @typescript-eslint/no-explicit-any
			expect((cliArgLoc as any)[key]).toEqual(value)
		})
		Object.entries(names).forEach(([key, value]) => {
			expect(cliArgLoc.valueByName(key)).toEqual(value)
		})
	})
})
/* eslint-enable @typescript-eslint/naming-convention */
