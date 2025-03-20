// eslint-disable-next-line @typescript-eslint/no-require-imports,no-undef
const tsConfig = require('./tsconfig.build.json')

// eslint-disable-next-line no-undef
module.exports = function (api) {
	// eslint-disable-next-line @typescript-eslint/no-unsafe-call,@typescript-eslint/no-unsafe-member-access
	api.cache(true)

	const ignore = ['node_modules', ...(tsConfig.exclude ?? [])]
	const plugins = [
		[
			'@babel/plugin-transform-modules-commonjs',
			{
				strictMode: true,
			},
		],
		[
			'@babel/plugin-proposal-decorators',
			{
				version: '2023-11',
			},
		],
	]

	const presets = ['@babel/preset-env', '@babel/preset-typescript']

	return {
		plugins,
		presets,
		ignore
	}
}
