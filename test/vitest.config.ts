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
				find: /^@beecode\/msh-env\/location-strategy\/(.+)$/,
				replacement: path.resolve(__dirname, '../src/business/service/location-strategy/$1.ts'),
			},
			{
				find: /^@beecode\/msh-env\/naming-strategy\/(.+)$/,
				replacement: path.resolve(__dirname, '../src/business/service/naming-strategy/$1.ts'),
			},
			{
				find: /^@beecode\/msh-env\/convert-strategy\/(.+)$/,
				replacement: path.resolve(__dirname, '../src/business/service/convert-strategy/$1.ts'),
			},
			{
				find: /^@beecode\/msh-env\/util\/(.+)$/,
				replacement: path.resolve(__dirname, '../src/util/$1.ts'),
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
