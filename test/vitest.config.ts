import path from 'path'
import tsconfigPaths from 'vite-tsconfig-paths'
import { defineConfig } from 'vitest/config'

export default defineConfig({
	plugins: [tsconfigPaths({ projects: ['../tsconfig.json'] })],
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
	},
	test: {
		mockReset: true,
		passWithNoTests: true,
		setupFiles: ['./index-jest-setup.ts'],
		watch: false,
	},
})
