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

- [msh-env](#msh-env)
	- [Table of Contents](#table-of-contents)
	- [Install](#install)
	- [Usage](#usage)
		- [Basic Example](#basic-example)
		- [Terminal Operations](#terminal-operations)
		- [Allowed Values](#allowed-values)
	- [API](#api)
		- [Type Converters](#type-converters)
		- [mshEnv Options](#mshenv-options)
	- [Strategies](#strategies)
		- [Location Strategy](#location-strategy)
		- [Naming Strategy](#naming-strategy)
		- [Logger](#logger)
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
import { mshEnv } from '@beecode/msh-env'

const env = mshEnv()

export const config = Object.freeze({
	// Required - throws if not defined
	apiKey: env('API_KEY').string.required,
	port: env('PORT').number.required,

	// Optional - returns undefined if not defined
	debugMode: env('DEBUG_MODE').boolean.optional,

	// Default - returns default value if not defined
	logLevel: env('LOG_LEVEL').string.default('info'),
	maxRetries: env('MAX_RETRIES').number.default(3),

	// Base64 decoding
	dbPassword: env('DB_PASSWORD').base64.default(''),

	// JSON parsing
	featureFlags: env('FEATURE_FLAGS').json<{ darkMode: boolean }>().default({ darkMode: false }),
})
```

### Terminal Operations

Every environment property chain must end with a terminal operation. There are three options:

| Terminal | Returns | Behavior |
|----------|---------|----------|
| `.required` | `T` | Throws error if env var is undefined |
| `.optional` | `T \| undefined` | Returns undefined if env var is undefined |
| `.default(value)` | `T` | Returns the default value if env var is undefined |

> `T` represents the type of the environment variable based on the converter used: `string`,
> `number`, `boolean`, the decoded `string` from `.base64`, or the generic type passed to
> `.json<T>()`.

**Examples:**

```typescript
const env = mshEnv()

// .required - Use when the env var MUST be present
// Application will fail fast if DATABASE_URL is not set
const dbUrl = env('DATABASE_URL').string.required

// .optional - Use when the env var is truly optional
// Returns undefined if ANALYTICS_ID is not set
const analyticsId = env('ANALYTICS_ID').string.optional

// .default() - Use when you have a sensible fallback value
// Returns 'development' if NODE_ENV is not set
const nodeEnv = env('NODE_ENV').string.default('development')

// .default() works with all types
const timeout = env('TIMEOUT_MS').number.default(5000)
const verbose = env('VERBOSE').boolean.default(false)
const config = env('APP_CONFIG').json<AppConfig>().default({ theme: 'light' })
```

### Allowed Values

You can restrict a value to a specific set. Chain `.allowed(...)` before the terminal operation:

```typescript
const env = mshEnv()

// With required - throws if value is not in the allowed list
const logLevel = env('LOG_LEVEL').string.allowed('debug', 'info', 'warn', 'error').required

// With default - validates both the env value and the default value
const environment = env('NODE_ENV').string.allowed('development', 'staging', 'production').default('development')
```

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

(wip)
## License

[MIT](LICENSE)
