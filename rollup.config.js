import { fileURLToPath } from 'node:url'
import { createRequire } from 'node:module'

import commonjs from '@rollup/plugin-commonjs'
import json from '@rollup/plugin-json'
import resolve from '@rollup/plugin-node-resolve'
import typescript from '@rollup/plugin-typescript'
import terser from '@rollup/plugin-terser'
import license from 'rollup-plugin-license'
import alias from '@rollup/plugin-alias'

const require = createRequire(import.meta.url)
const pkg = require('./package.json')
const { name, version, main, module, browser, author } = pkg

const isProduction = process.env.NODE_ENV === 'production'

const settings = {
	globals: {
		ms: 'mshEnv',
	},
}

export default {
	input: './src/index.ts',
	output: [
		{
			file: main,
			name: main,
			...settings,
			format: 'cjs',
			plugins: [isProduction && terser()],
		},
		{
			file: module,
			...settings,
			name: name,
			format: 'es',
		},
		{
			file: browser,
			...settings,
			name: name,
			format: 'umd',
		},
	],
	// external: ['mshEnv'],

	plugins: [
		json(),
		resolve({
			jsnext: true,
			main: true,
		}),
		typescript({
			typescript: require('typescript'),
			tsconfig: './tsconfig-build.json',
		}),
		commonjs({
			include: 'node_modules/**',
			extensions: ['.js'],
			ignoreGlobal: false,
			sourceMap: false,
		}),
		license({
			banner: `
        ${name} v${version}
        Copyright 2018<%= moment().format('YYYY') > 2018 ? '-' + moment().format('YYYY') : null %> ${author}
      `,
		}),
		alias({
			entries: {
				src: fileURLToPath(new URL('src', import.meta.url)),
			},
		}),
	],
}
