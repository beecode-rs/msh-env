# Location Strategy

Location strategies define **where** `msh-env` looks for a value when resolving an environment
variable. They implement a single method:

```typescript
export interface LocationStrategy {
	valueByName(name: string): string | undefined
}
```

Each strategy receives a candidate name (after [naming strategies](./naming-strategy.md) have
expanded it) and returns the raw string value, or `undefined` if it cannot provide one.

You can pass an **array** of location strategies to `mshEnv()`. They are tried
in order — the first one to return a non-`undefined` value wins, so the order defines precedence.

```typescript
import { mshEnv } from '@beecode/msh-env'
import { LocationStrategyCliArgsMinimist } from '@beecode/msh-env/location-strategy/cli-args-minimist'
import { LocationStrategyEnvironment } from '@beecode/msh-env/location-strategy/environment'

// CLI args take precedence over process.env
const env = mshEnv({
	locationStrategies: [
		new LocationStrategyCliArgsMinimist(),
		new LocationStrategyEnvironment(),
	],
})
```

> If you omit `locationStrategies` entirely, the default is `[new LocationStrategyEnvironment()]`.

## Available strategies

| Strategy | Import path | Source |
|----------|-------------|--------|
| `LocationStrategyEnvironment` | `@beecode/msh-env/location-strategy/environment` | `process.env` |
| `LocationStrategyCliArgsMinimist` | `@beecode/msh-env/location-strategy/cli-args-minimist` | CLI arguments (parsed with `minimist`) |
| `LocationStrategyDockerSecrets` | `@beecode/msh-env/location-strategy/docker-secrets` | Docker Swarm secrets (`/run/secrets/<name>`) |
| `LocationStrategyImportMetaEnv` | `@beecode/msh-env/location-strategy/import-meta-env` | `import.meta.env` (Vite / build tools) |
| `LocationStrategyCustom` | `@beecode/msh-env/location-strategy/custom` | A plain object you provide |

### LocationStrategyEnvironment (default)

Reads from `process.env`.

```typescript
import { mshEnv } from '@beecode/msh-env'

const env = mshEnv()
// env('DB_HOST') => process.env.DB_HOST
```

### LocationStrategyCliArgsMinimist

Parses command-line arguments using [`minimist`](https://www.npmjs.com/package/minimist) and
[`minimist-options`](https://www.npmjs.com/package/minimist-options). Useful for overriding env
vars at runtime (e.g. `--db-name=foo`, `-d foo`).

```typescript
import { mshEnv } from '@beecode/msh-env'
import { LocationStrategyCliArgsMinimist } from '@beecode/msh-env/location-strategy/cli-args-minimist'
import { LocationStrategyEnvironment } from '@beecode/msh-env/location-strategy/environment'
import { type Options } from 'minimist-options'

const options: Options = {
	DB_NAME: { alias: ['d', 'db-name', 'dbName'], type: 'string' },
}

const env = mshEnv({
	locationStrategies: [
		new LocationStrategyCliArgsMinimist({ options, args: process.argv.slice(2) }),
		new LocationStrategyEnvironment(),
	],
})

const dbName = env('DB_NAME').string.value
```

Both `options` and `args` are optional — `args` defaults to `process.argv.slice(2)`.

### LocationStrategyDockerSecrets

Reads from [Docker Swarm secrets](https://docs.docker.com/engine/swarm/secrets/), looking up a
file at `/run/secrets/<name>` and returning its trimmed contents. Returns `undefined` if the
secret does not exist, so it pairs well with a fallback to `process.env`.

```typescript
import { mshEnv } from '@beecode/msh-env'
import { LocationStrategyDockerSecrets } from '@beecode/msh-env/location-strategy/docker-secrets'
import { LocationStrategyEnvironment } from '@beecode/msh-env/location-strategy/environment'

const env = mshEnv({
	locationStrategies: [new LocationStrategyDockerSecrets(), new LocationStrategyEnvironment()],
})
```

### LocationStrategyImportMetaEnv

Reads from [`import.meta.env`](https://vitejs.dev/guide/env-and-mode.html) — for front-end or
build-tool bundles that inject environment variables at build time (Vite, etc.).

```typescript
import { mshEnv } from '@beecode/msh-env'
import { LocationStrategyImportMetaEnv } from '@beecode/msh-env/location-strategy/import-meta-env'

const env = mshEnv({ locationStrategies: [new LocationStrategyImportMetaEnv()] })
```

### LocationStrategyCustom

Reads from a plain `Record<string, string>` you provide. Handy for tests or for plugging in any
in-memory map.

```typescript
import { mshEnv } from '@beecode/msh-env'
import { LocationStrategyCustom } from '@beecode/msh-env/location-strategy/custom'

const env = mshEnv({
	locationStrategies: [new LocationStrategyCustom({ DB_HOST: 'localhost' })],
})
```

## Writing a custom location strategy

Any object with a matching `valueByName(name)` method satisfies the strategy contract (TypeScript
structural typing), so you can write one inline without importing anything:

```typescript
import { mshEnv } from '@beecode/msh-env'

// Pulls values from a remote config service, cached in memory
const remoteConfigStrategy = {
	valueByName(name: string): string | undefined {
		return myConfigCache[name]
	},
}

const env = mshEnv({ locationStrategies: [remoteConfigStrategy] })
```
