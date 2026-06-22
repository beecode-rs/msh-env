# Naming Strategy

Naming strategies transform the names you pass to `env(...)` into the candidate names that are
actually looked up. This enables isolation and namespacing (e.g. reading `MYAPP_DB_HOST` when you
ask for `DB_HOST`). They implement a single method:

```typescript
export interface NamingStrategy {
	names(name: string[]): string[]
}
```

You can pass an **array** of naming strategies to `mshEnv()`. They are applied in
order, each wrapping the output of the previous one, so the strategies listed **last** take
precedence in the final lookup order.

> If you omit `namingStrategies` entirely, the default is `[new NamingStrategySimpleName()]`.

## Available strategies

| Strategy | Import path | Description |
|----------|-------------|-------------|
| `NamingStrategySimpleName` | `@beecode/msh-env/naming-strategy/simple-name` | Uses names as-is (default) |
| `NamingStrategyPrefixName` | `@beecode/msh-env/naming-strategy/prefix-name` | Prepends a prefix |
| `NamingStrategySuffixName` | `@beecode/msh-env/naming-strategy/suffix-name` | Appends a suffix |

### NamingStrategySimpleName (default)

Uses the names as-is.

```typescript
import { mshEnv } from '@beecode/msh-env'

const env = mshEnv()
// env('TEST') looks for: TEST
```

### NamingStrategyPrefixName

Prepends a prefix. The prefixed name is tried first, then the original — so a prefixed value
wins when present, and the bare name still works as a fallback.

```typescript
import { mshEnv } from '@beecode/msh-env'
import { NamingStrategyPrefixName } from '@beecode/msh-env/naming-strategy/prefix-name'

const env = mshEnv({ namingStrategies: [new NamingStrategyPrefixName('MYAPP_')] })
// env('DB_HOST') looks for: MYAPP_DB_HOST, then DB_HOST
```

### NamingStrategySuffixName

Appends a suffix.

```typescript
import { mshEnv } from '@beecode/msh-env'
import { NamingStrategySuffixName } from '@beecode/msh-env/naming-strategy/suffix-name'

const env = mshEnv({ namingStrategies: [new NamingStrategySuffixName('_FILE')] })
// env('DB_HOST') looks for: DB_HOST_FILE, then DB_HOST
```

## Stacking strategies

Multiple naming strategies compose. Each later strategy wraps the names produced so far, so the
last strategy in the array ends up outermost:

```typescript
import { mshEnv } from '@beecode/msh-env'
import { NamingStrategyPrefixName } from '@beecode/msh-env/naming-strategy/prefix-name'

const env = mshEnv({
	namingStrategies: [new NamingStrategyPrefixName('FOO_'), new NamingStrategyPrefixName('BAR_')],
})
// env('TEST') looks for: BAR_FOO_TEST, then FOO_TEST, then TEST
```

## Writing a custom naming strategy

Any object with a matching `names(...)` method satisfies the contract (TypeScript structural
typing):

```typescript
import { mshEnv } from '@beecode/msh-env'

// Lowercases every name, e.g. env('DB_HOST') => 'db_host'
const lowercaseStrategy = {
	names(names: string[]): string[] {
		return names.map((n) => n.toLowerCase())
	},
}

const env = mshEnv({ namingStrategies: [lowercaseStrategy] })
```
