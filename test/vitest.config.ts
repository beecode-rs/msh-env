import path from 'node:path'

import { type Plugin, defineConfig } from 'vitest/config'

const envSrc = path.resolve(import.meta.dirname, '../src')

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

/**
 * Maps the package's public subpath imports (`@beecode/msh-env/<prefix>/...`) to
 * their source files. The public paths are flat (e.g.
 * `location-strategy/cli-args-minimist`) while the source nests most of them
 * under `business/service/`, so the root `@beecode/msh-env` alias alone cannot
 * resolve them. See the "Import path" tables in the README for the public surface.
 */
const SUBPATH_SRC_DIR: Record<string, string> = {
	'location-strategy': 'business/service/location-strategy',
	'naming-strategy': 'business/service/naming-strategy',
	util: 'util',
}

function mshEnvSubpathResolver(): Plugin {
	return {
		enforce: 'pre',
		name: 'msh-env-subpath-resolver',
		async resolveId(source, importer) {
			if (!source.startsWith('@beecode/msh-env/')) return null

			const subpath = source.slice('@beecode/msh-env/'.length)
			const slashIndex = subpath.indexOf('/')
			if (slashIndex < 0) return null

			const srcDir = SUBPATH_SRC_DIR[subpath.slice(0, slashIndex)]
			const name = subpath.slice(slashIndex + 1)
			if (!srcDir || !name) return null

			return this.resolve(path.resolve(envSrc, srcDir, name), importer, { skipSelf: true })
		},
	}
}

export default defineConfig({
	plugins: [localSrcResolver(), mshEnvSubpathResolver()],
	resolve: {
		alias: [
			{
				find: /^@beecode\/msh-env$/,
				replacement: path.resolve(import.meta.dirname, '../src/index.ts'),
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
