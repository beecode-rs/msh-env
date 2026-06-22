import eslintNode from '@beecode/msh-config/src/eslint-config.mjs'

export default [
	{
		ignores: [
			'.base-frame-template',
			'.idea',
			'.semaphore',
			'coverage',
			'dist',
			'node_modules',
			'resource',
			'packages',
			'.*.js',
			'.*.json',
			'package-lock.json',
			'tsconfig*.json',
			'typedoc.json',
			'jest.config*.ts',
			'eslint.config.js',
			'release.config.cjs',
			'.history',
		],
	},
	...eslintNode,
	{
		// Examples are runnable demos: they print to stdout and use a deliberately
		// grouped config object for readability, so relax the rules that fight that.
		files: ['examples/**/*.ts'],
		rules: {
			'no-console': 'off',
			'sort-keys': 'off',
		},
	},
]
