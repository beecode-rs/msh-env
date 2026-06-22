import path from 'node:path'

import { type Plugin, coverageConfigDefaults, defineConfig } from 'vitest/config'

const envSrc = path.resolve(process.cwd(), 'src')

/**
 * Resolves `#src` imports only for files within this package's src/ directory.
 * A global Vite alias would also intercept `#src` imports from dependencies
 * (like @beecode/msh-logger) which have their own `#src` package.json imports.
 */
function localSrcResolver(): Plugin {
	return {
		enforce: 'pre',
		name: 'local-src-resolver',
		async resolveId(source, importer) {
			if (!source.startsWith('#src')) return null
			if (!importer?.startsWith(envSrc)) return null

			const subpath = source.replace(/^#src\/?/, '').replace(/\.js$/, '')

			// eslint-disable-next-line no-ternary
			const target = subpath ? path.resolve(envSrc, subpath) : path.resolve(envSrc, 'index')

			// Delegate to Vite's normal resolver (handles .ts extension, index files, etc.)
			return this.resolve(target, importer, { skipSelf: true })
		},
	}
}

export default defineConfig({
	plugins: [localSrcResolver()],
	test: {
		coverage: {
			exclude: [...coverageConfigDefaults.exclude],
		},
		mockReset: true,
		passWithNoTests: true,
		setupFiles: ['./src/__tests__/index-vitest-setup.ts'],
		watch: false,
	},
})
