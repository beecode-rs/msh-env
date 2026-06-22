[![Build Status](https://beecode.semaphoreci.com/badges/msh-env/branches/main.svg?style=shields)](https://beecode.semaphoreci.com/projects/msh-env)
[![codecov](https://codecov.io/gh/beecode-rs/msh-env/branch/main/graph/badge.svg?token=fHc0YaxEiB)](https://codecov.io/gh/beecode-rs/msh-env)
[![GitHub license](https://img.shields.io/github/license/beecode-rs/msh-env)](https://github.com/beecode-rs/msh-env/blob/main/LICENSE)  
[![NPM](https://nodei.co/npm/@beecode/msh-env.png)](https://nodei.co/npm/@beecode/msh-env)

# msh-env

Micro-service helper for Node.js environment variable validation and typing.

This library provides type-safe environment variable access with validation, default values, and
flexible configuration strategies.

## Table of Contents

<!-- toc -->

- [Install](#install)
- [Usage](#usage)
  * [Basic Example](#basic-example)
  * [Resolution & errors](#resolution--errors)
  * [Immutability](#immutability)
  * [Allowed Values](#allowed-values)
  * [Standalone reads](#standalone-reads)
- [API](#api)
  * [Type Converters](#type-converters)
  * [mshEnv Options](#mshenv-options)
- [Strategies](#strategies)
  * [Location Strategy](#location-strategy)
  * [Naming Strategy](#naming-strategy)
  * [Logger](#logger)
- [Architecture](#architecture)
- [License](#license)

<!-- tocstop -->

## Install

```bash
npm i @beecode/msh-env
```

## Usage

### Basic Example

```typescript
import { mshEnvResolver, mshEnv } from '@beecode/msh-env'

const env = mshEnv()

export const config = mshEnvResolver({
	apiKey: env('API_KEY').string,                       // required (default)
	port: env('PORT').number,

	debugMode: env('DEBUG_MODE').boolean.optional,       // boolean | undefined

	logLevel: env('LOG_LEVEL').string.default('info'),
	maxRetries: env('MAX_RETRIES').number.default(3),

	dbPassword: env('DB_PASSWORD').base64.default(''),

	featureFlags: env('FEATURE_FLAGS').json<{ darkMode: boolean }>().default({ darkMode: false }),
})
```

### Resolution & errors

Building a value is **lazy** — chaining a converter like `.string` or `.number` only describes how to
read the variable; nothing is resolved yet. Resolution happens in one of two ways:

- **`mshEnvResolver({ ... })`** — the headline form. Pass a config object whose leaves are builders
  (and/or nested objects / arrays of builders). It walks the whole tree, resolves every leaf in one
  pass, and returns a fully-typed, deeply-frozen, `readonly` object. If any leaf fails, it collects
  **all** errors and throws a single `MshEnvResolverError` whose message lists every failing var with
  its dotted path.
- **`.value`** — the single terminator for a standalone one-off read
  (`env('API_KEY').string.value`). It returns a plain, non-frozen value (see [Standalone reads](#standalone-reads)).

Within a builder:

- **Required is the default.** A bare builder like `env('API_KEY').string` is required.
- **`.optional`** is a *getter* (no parens) that marks the var optional; the resolved type becomes
  `T | undefined`.
- **`.default(v)`** is a *method* that sets a fallback and **returns the builder** (it does not
  return the value), so you keep chaining.

> `T` is the type produced by the converter: `string`, `number`, `boolean`, the decoded `string`
> from `.base64`, or the generic type passed to `.json<T>()`.

**Handling the aggregated error:**

```typescript
import { mshEnvResolver, MshEnvResolverError, mshEnv } from '@beecode/msh-env'

const env = mshEnv()

try {
	const config = mshEnvResolver({
		apiKey: env('API_KEY').string,
		port: env('PORT').number,
		db: {
			host: env('DB_HOST').string,
		},
	})
} catch (e) {
	if (e instanceof MshEnvResolverError) {
		console.error(e.message)
	}
}
```

The message lists every failure, each on its own line with the dotted path, separated by ` -> `:

```
msh-env: 3 environment variable(s) failed to resolve:
  • apiKey -> Env[API_KEY] must have value defined
  • port -> Env[PORT] must have value defined
  • db.host -> Env[DB_HOST] "not-a-number" is not a number
```

### Immutability

`mshEnvResolver(...)` returns a **deeply-frozen**, `readonly` object, so the manual
`Object.freeze({ ... })` wrapper is no longer needed (and would be redundant). `.value`, used as a
standalone terminator for a one-off read, returns a plain, non-frozen value.

### Allowed Values

You can restrict a value to a specific set. Chain `.allowed(...)` before resolution — it validates
both the env value and any `.default(...)` fallback:

```typescript
import { mshEnvResolver, mshEnv } from '@beecode/msh-env'

const env = mshEnv()

// Inside the resolver (required is the default)
const config = mshEnvResolver({
	logLevel: env('LOG_LEVEL').string.allowed('debug', 'info', 'warn', 'error'),
	environment: env('NODE_ENV')
		.string.allowed('development', 'staging', 'production')
		.default('development'),
})

// Standalone one-off read
const logLevel = env('LOG_LEVEL').string.allowed('debug', 'info', 'warn', 'error').value
```

### Standalone reads

If you don't want the whole-tree resolver, terminate a single builder with `.value`. The optional and
default mode setters still apply:

```typescript
import { mshEnv } from '@beecode/msh-env'

const env = mshEnv()

// Required (default)
const dbUrl = env('DATABASE_URL').string.value

// Optional
const analyticsId = env('ANALYTICS_ID').string.optional.value

// Default fallback
const nodeEnv = env('NODE_ENV').string.default('development').value
```

Note that `.value` returns a plain, non-frozen value; only `mshEnvResolver(...)` produces the
deeply-frozen, `readonly` object (see [Immutability](#immutability)).

## API

### Type Converters

| Converter | Input | Output |
|-----------|-------|--------|
| `.string` | Any string | `string` |
| `.number` | Numeric string | `number` |
| `.boolean` | `'true'`, `'false'`, `'1'`, `'0'` | `boolean` |
| `.base64` | Base64-encoded string | `string` (decoded) |
| `.json<T>()` | Valid JSON string | `T` |

### mshEnv Options

```typescript
mshEnv(params?: {
	locationStrategies?: LocationStrategy[]
	namingStrategies?: NamingStrategy[]
}): MshEnv
```

| Option | Default | Description |
|--------|---------|-------------|
| `locationStrategies` | `[new LocationStrategyEnvironment()]` | Defines where to look for env values (first match wins) |
| `namingStrategies` | `[new NamingStrategySimpleName()]` | Defines how env names are transformed |

## Strategies

`msh-env` is built on the [Strategy Pattern](https://en.wikipedia.org/wiki/Strategy_pattern).
Strategies are optional arrays — supply your own to override the defaults, or combine several;
the defaults below are used when an option is omitted. Each strategy type is documented in detail
in its own page.

### Location Strategy

Defines **where** values are read from. Strategies are tried in order; the first non-`undefined`
result wins.

| Strategy | Import path |
|----------|-------------|
| `LocationStrategyEnvironment` *(default)* | `@beecode/msh-env/location-strategy/environment` |
| `LocationStrategyCliArgsMinimist` | `@beecode/msh-env/location-strategy/cli-args-minimist` |
| `LocationStrategyDockerSecrets` | `@beecode/msh-env/location-strategy/docker-secrets` |
| `LocationStrategyImportMetaEnv` | `@beecode/msh-env/location-strategy/import-meta-env` |
| `LocationStrategyCustom` | `@beecode/msh-env/location-strategy/custom` |

➡️ See [Location Strategy](resource/doc/strategies/location-strategy.md) for usage examples and how
to write your own.

### Naming Strategy

Defines **how** the names you pass to `env(...)` are transformed before lookup, enabling prefixes,
suffixes, and namespacing.

| Strategy | Import path |
|----------|-------------|
| `NamingStrategySimpleName` *(default)* | `@beecode/msh-env/naming-strategy/simple-name` |
| `NamingStrategyPrefixName` | `@beecode/msh-env/naming-strategy/prefix-name` |
| `NamingStrategySuffixName` | `@beecode/msh-env/naming-strategy/suffix-name` |

➡️ See [Naming Strategy](resource/doc/strategies/naming-strategy.md) for usage examples, stacking
order, and how to write your own.

### Logger

`msh-env` emits `debug`-level logs while resolving values. Logging is silent by default — call
`setEnvLogger()` from `@beecode/msh-env/util/logger` with any
[@beecode/msh-logger](https://github.com/beecode-rs/msh-logger) logger to turn it on. Do this once
at startup, **before** reading any values.

```typescript
import { mshEnv } from '@beecode/msh-env'
import { setEnvLogger } from '@beecode/msh-env/util/logger'
import { LogLevel } from '@beecode/msh-logger'
import { PresetConsoleSimpleString } from '@beecode/msh-logger/controller/preset/console-simple-string'

// Human-readable console output for local dev
setEnvLogger(new PresetConsoleSimpleString({ logLevel: LogLevel.DEBUG }))

const env = mshEnv()
```

Other ready-made loggers from `@beecode/msh-logger`:

```typescript
import { PresetConsoleJson } from '@beecode/msh-logger/controller/preset/console-json' // structured JSON
import { PresetPino } from '@beecode/msh-logger/controller/preset/pino'                 // pino
import { PresetVoid } from '@beecode/msh-logger/controller/preset/void'                 // silent (default)
```

➡️ See [Logging](resource/doc/strategies/logger.md) for every preset, log levels, and how to build
a fully custom logger. Learn more about the logger itself in the
[msh-logger project](https://github.com/beecode-rs/msh-logger).

## Architecture

Configuration is built as a tree of lazy `EnvType` builders: chaining a converter (`.string`,
`.number`, `.json<T>()`, …) only describes how a variable should be read, without resolving it.
`mshEnvResolver(...)` then walks the whole tree, resolving every leaf in one pass, aggregating all
failures into a single `MshEnvResolverError` (so you see every missing or invalid variable at once,
not just the first), and returns a deeply-frozen, fully-typed, immutable object.
## License

[MIT](LICENSE)
