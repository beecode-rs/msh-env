# Logging

`msh-env` emits `debug`-level logs while it works — which candidate names it looks up, which
location strategy answered, the raw string value, conversion attempts, and any default value it
falls back to. This is invaluable when an env var silently resolves to the wrong value.

Logging is delegated to **[@beecode/msh-logger](https://github.com/beecode-rs/msh-logger)**, a
strategy-based logging abstraction that separates *formatting* from *transport*. By default
`msh-env` ships with a no-op logger (`PresetVoid`), so there is **no console output** unless you
opt in.

## Changing the logger

Use `setEnvLogger()` to plug in any
[`LoggerStrategy`](https://github.com/beecode-rs/msh-logger#creating-child-loggers-clone) from
`@beecode/msh-logger`. Call it **once at app bootstrap**, before you read any values — the logger
is consulted at resolution time, so it must be in place first.

```typescript
import { mshEnv } from '@beecode/msh-env'
import { setEnvLogger } from '@beecode/msh-env/util/logger'
import { LogLevel } from '@beecode/msh-logger'
import { PresetConsoleSimpleString } from '@beecode/msh-logger/controller/preset/console-simple-string'

// 1) pick a logger
setEnvLogger(new PresetConsoleSimpleString({ logLevel: LogLevel.DEBUG }))

// 2) then use msh-env
const env = mshEnv()
const apiKey = env('API_KEY').string.value
```

> The examples below use msh-logger's ready-made **presets**, each pairing a formatting strategy
> with a transporting strategy. See the
> [msh-logger README](https://github.com/beecode-rs/msh-logger#presets) for the full list and for
> how to assemble a logger from individual formatting/transporting strategies.

## Examples

### Human-readable console output

`PresetConsoleSimpleString` prints plain, easy-to-read lines. Good for local development.

```typescript
import { setEnvLogger } from '@beecode/msh-env/util/logger'
import { LogLevel } from '@beecode/msh-logger'
import { PresetConsoleSimpleString } from '@beecode/msh-logger/controller/preset/console-simple-string'

setEnvLogger(new PresetConsoleSimpleString({ logLevel: LogLevel.DEBUG }))
```

### Structured JSON for log aggregation

`PresetConsoleJson` emits newline-delimited JSON objects — the right choice when logs are
collected by a service (Datadog, Loki, CloudWatch, …).

```typescript
import { setEnvLogger } from '@beecode/msh-env/util/logger'
import { LogLevel } from '@beecode/msh-logger'
import { PresetConsoleJson } from '@beecode/msh-logger/controller/preset/console-json'

setEnvLogger(new PresetConsoleJson({ logLevel: LogLevel.INFO }))
```

### Pino (high-performance)

`PresetPino` wraps the popular [`pino`](https://getpino.io) logger.

```typescript
import { setEnvLogger } from '@beecode/msh-env/util/logger'
import { LogLevel } from '@beecode/msh-logger'
import { PresetPino } from '@beecode/msh-logger/controller/preset/pino'

setEnvLogger(new PresetPino({ logLevel: LogLevel.INFO }))
```

### Silence logs explicitly

`PresetVoid` discards everything — this is already the default, but you can set it explicitly to
disable logging in a specific context (e.g. tests).

```typescript
import { setEnvLogger } from '@beecode/msh-env/util/logger'
import { PresetVoid } from '@beecode/msh-logger/controller/preset/void'

setEnvLogger(new PresetVoid())
```

## Going further

- **Log levels:** `DEBUG`, `INFO`, `WARN`, `ERROR` (see the
  [msh-logger log levels](https://github.com/beecode-rs/msh-logger#log-levels)). Since `msh-env`
  logs at `DEBUG`, set the level to `DEBUG` (or lower) to see its output, or to `INFO`+ to hide it.
- **Custom loggers & child loggers:** msh-logger lets you build a `LoggerStrategy` from any
  formatting + transporting combination, or extend `LoggerStrategyBase`. See the
  [msh-logger project](https://github.com/beecode-rs/msh-logger).
