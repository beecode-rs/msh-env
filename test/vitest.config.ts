import path from 'path'

import { defineConfig } from 'vitest/config'

export default defineConfig({
	resolve: {
		alias: [
			{
				find: /^@beecode\/msh-env$/,
				replacement: path.resolve(__dirname, '../src/index.ts'),
			},
			{
				find: /^@beecode\/msh-env\/(.+)$/,
				replacement: path.resolve(__dirname, '../src/$1.ts'),
			},
		],
		tsconfigPaths: true,
	},
	test: {
		mockReset: true,
		passWithNoTests: true,
		setupFiles: ['../src/__tests__/index-vitest-setup.ts'],
		watch: false,
	},
})
