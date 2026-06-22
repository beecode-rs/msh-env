import path from 'node:path'

import { ContractReporter } from '@beecode/msh-test-contractor/contract-reporter'
import { contractYamlPlugin } from '@beecode/msh-test-contractor/vitest-plugin'
import { type Plugin, coverageConfigDefaults, defineConfig } from 'vitest/config'

const envSrc = path.resolve(process.cwd(), 'src')

/**
 * Resolves `#src` imports only for files within this package's src/ directory.
 * Duplicated from vitest.config.ts because contract subjects (e.g. naming strategies)
 * import `#src/util/logger.js` at runtime. A global alias would also intercept `#src`
 * imports from dependencies (like @beecode/msh-logger) which have their own `#src` imports.
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
	plugins: [localSrcResolver(), contractYamlPlugin()],
	test: {
		coverage: {
			exclude: ['lib/**', 'src/index.ts', 'src/**/__fixtures__/**', ...coverageConfigDefaults.exclude],
		},
		exclude: ['src/**/__fixtures__/**'],
		include: ['src/**/*.contract.yaml'],
		mockReset: true,
		passWithNoTests: true,
		reporters: [new ContractReporter()],
		setupFiles: ['./src/__tests__/index-vitest-setup.ts'],
		watch: false,
	},
})
