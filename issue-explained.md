# `npm run test:unit` Fails — `Cannot find module '#src/...'` from `@beecode/msh-logger`

## Symptom

Running `npm run test:unit` in `packages/env` failed with:

```
Error: Cannot find module '#src/business/service/formatting-strategy/simple-string.js'
  imported from /home/milos/code/msh/packages/logger/dist/controller/preset/console-simple-string.js
```

Only `src/util/logger.test.ts` failed (1 suite); all other 18 suites passed.

## Root Cause

Two problems compounded to produce this error.

### Problem 1: Global Vite alias hijacked `#src` imports from other packages

`vitest.config.ts` had:

```ts
resolve: {
  alias: {
    '#src': path.resolve(import.meta.dirname, 'src'),
  },
},
```

Vite aliases are **global** — they apply to **every** module, not just files in this package. When `logger.test.ts` imported `@beecode/msh-logger/controller/preset/console-simple-string`, Vite loaded the logger's built `dist/` file. That file internally imports `#src/business/service/...`. Vite intercepted that import and resolved `#src` to the **env** package's `src/` directory instead of letting Node.js resolve it via the logger's own `package.json` `imports` field. The path didn't exist in the env package → error.

### Problem 2: Logger's `dist/package.json` missing multi-segment `#src/*` pattern

Each package has a `fix-hybrid-lib-esm` build step that generates a `dist/package.json` with `imports` so that `#src` resolves correctly within the built output. The **logger** package's generated file was:

```json
{"type": "module", "imports": {"#src": "./index.js", "#src/*.js": "./*.js"}}
```

In Node.js subpath patterns, `*` does **not** match path separators (`/`). So `#src/*.js` only matches single-segment paths like `#src/foo.js`. It cannot match multi-segment paths like `#src/business/service/formatting-strategy/simple-string.js`.

The **env** package already had the correct pattern (`"#src/*": "./*.js"`), but the logger was missing it.

## Fix

### 1. `packages/logger/package.json` — added `#src/*` to `fix-hybrid-lib-esm`

```diff
- "fix-hybrid-lib-esm": "... {\"#src\": \"./index.js\", \"#src/*.js\": \"./*.js\"} ..."
+ "fix-hybrid-lib-esm": "... {\"#src\": \"./index.js\", \"#src/*.js\": \"./*.js\", \"#src/*\": \"./*.js\"} ..."
```

This ensures the generated `dist/package.json` can resolve multi-segment `#src` imports at runtime.

### 2. `packages/env/vitest.config.ts` — replaced global alias with scoped plugin

Replaced the global Vite alias with a custom plugin that only resolves `#src` for files within the env package's own `src/` directory. Imports from other packages (like the logger) fall through to Node.js's native `imports` resolution.

```ts
function localSrcResolver(): Plugin {
  return {
    name: 'local-src-resolver',
    enforce: 'pre',
    async resolveId(source, importer) {
      if (!source.startsWith('#src')) return null
      if (!importer || !importer.startsWith(envSrc)) return null

      const subpath = source.replace(/^#src\/?/, '').replace(/\.js$/, '')
      const target = subpath
        ? path.resolve(envSrc, subpath)
        : path.resolve(envSrc, 'index')

      return this.resolve(target, importer, { skipSelf: true })
    },
  }
}
```

## Key Takeaway

When using `#`-prefixed subpath imports (`#src`) as a convention across multiple packages in a monorepo, **Vite aliases are not scoped** — they intercept `#src` from all packages. Use a custom Vite plugin that checks the `importer` to scope the resolution. Additionally, ensure `dist/package.json` includes both `#src/*.js` (single-segment) and `#src/*` (multi-segment) patterns.
