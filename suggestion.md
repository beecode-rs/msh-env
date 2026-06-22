# Refactor Suggestion — move `src/` into the clean-code business layer

Goal: relocate the current flat `src/` layout into the layered structure defined by the
`clean-typescript` skill, moving all "service-like" pieces into `src/business/` while
**keeping each strategy group inside its own folder** (`convert-strategy/`,
`location-strategy/`, `naming-strategy/`).

**Three decisions are locked in for this refactor:**

1. **This ships as a major version bump (`2.0.0`).** Because subpath imports are part of the
   public API (see §2), moving folders is breaking — so we accept the major bump and use it to
   clean up the published surface deliberately, rather than papering over it.
2. **Strategy interfaces stay next to their folders**, not in a `model/` folder. Each
   `<name>-strategy.ts` interface file sits as a sibling of its `<name>-strategy/` implementation
   folder inside `business/service/`.
3. **`msh-env.ts` is split.** The `MshEnv` *type* moves to `business/model/msh-env.ts` (model is
   for types/contracts); the `mshEnv()` *factory function* stays at the `src/` root as the public
   entry point. The strategy interfaces stay grouped with their folders (decision 2); only this
   one standalone public type lives in `model/`.

---

## 1. Current state

```
src/
├── index.ts                       # public entry — re-exports { MshEnv, mshEnv }
├── msh-env.ts                     # mshEnv() facade: wires default strategies → EnvFactory
├── env.ts                         # Env class — resolves a value (names × locations)
├── env.test.ts
├── msh-env.test.ts
├── env/
│   ├── factory.ts                 # EnvFactory — pairs a ConvertStrategy + Env → EnvType
│   ├── factory.test.ts
│   ├── type.ts                    # EnvType<T> — terminal op (optional/required/default/allowed)
│   ├── type.test.ts
│   └── __mocks__/type-spy.ts
├── convert-strategy.ts            # ConvertStrategy<T> interface (sibling of folder)
├── convert-strategy/              # 5 implementations (+ tests)
├── location-strategy.ts           # LocationStrategy interface (sibling of folder)
├── location-strategy/             # 5 implementations (+ tests)
├── naming-strategy.ts             # NamingStrategy interface (sibling of folder)
├── naming-strategy/               # 3 implementations (+ tests)
├── util/
│   ├── logger.ts                  # logger() + setEnvLogger
│   ├── logger.test.ts
│   ├── string-util.ts             # ⚠ dead code — only referenced by its own test
│   ├── string-util.test.ts
│   └── __mocks__/logger.ts
├── __mocks__/                     # top-level mocks (should move with their source)
├── __tests__/index-vitest-setup.ts
└── types/global.d.ts
```

Two layers of logic exist today, both sitting at the root:

- **Strategies** (`convert-strategy/`, `location-strategy/`, `naming-strategy/`) — simple,
  mostly stateless, one-method implementations of an interface. Classic Strategy Pattern.
- **The env core** (`Env`, `EnvType<T>`, `EnvFactory`, `mshEnv`) — the real domain logic:
  generate candidate names, look them up across locations, convert + validate + default.

---

## 2. Why this is a major bump

This package is **published** (`@beecode/msh-env`), and `package.json` exposes **every
subpath** as public API via:

```json
"exports": {
  ".":   { "types": "./dist/index.d.ts", "import": "./dist/index.js" },
  "./*": { "types": "./dist/*.d.ts",     "import": "./dist/*.js" }
}
```

Those subpaths are **already consumed** in the monorepo:

| Consumer | Import |
|---|---|
| `packages/cli/src/util/config.ts` | `@beecode/msh-env/util/logger` |
| `packages/env/test/multi-locations/` | `@beecode/msh-env/location-strategy/cli-args-minimist`, `…/environment` |
| `packages/env/test/prefix-example/` | `@beecode/msh-env/naming-strategy/prefix-name` |
| README (documented public API) | `@beecode/msh-env/location/…`, `@beecode/msh-env/naming/…` |

Moving the folders changes where `dist/` files land, which changes the public subpaths → that's
a breaking change. We accept it as a `2.0.0` and use §7 to define a clean, explicit public
surface going forward.

`util/logger` is **not** moving (it stays at `src/util/`), so the `packages/cli` import keeps
working unchanged.

---

## 3. The judgement call: `service/` vs `component/`

You asked me to decide. **All three strategy groups → `business/service/`.**
The **env core** (`Env` / `EnvType` / `EnvFactory`) → `business/component/`.

Reasoning, straight from the skill's definitions:

| Layer | Signal | Why it fits |
|---|---|---|
| `service/` | Simple logic, one method, mostly stateless | Every `convert-strategy/*`, `location-strategy/*`, `naming-strategy/*` is a single-method implementation of a strategy interface. No interdependent methods, no 3+ internal states. This is the exact Strategy-Pattern template the skill places in `business/service/<name>/`. |
| `component/` | Complex, self-contained domain logic (3+ states) | `EnvType<T>` juggles optional/required/default/allowed + validation + logging. `Env` reduces across naming × location strategies. `EnvFactory` builds typed `EnvType`s. These are the cohesive "resolve one env value" domain — grouped together in one component subfolder. |

Strategies stay **in their respective folders** (your requirement) — they just move *into*
`business/service/`.

---

## 4. Proposed target structure

```
src/
├── index.ts                                  # re-exports type MshEnv from model + mshEnv from here
├── msh-env.ts                                # mshEnv() factory function — public entry, stays at root
├── msh-env.test.ts
├── util/                                     # unchanged (stateless helpers + logger setup)
│   ├── logger.ts
│   ├── logger.test.ts
│   └── __mocks__/logger.ts
├── __tests__/index-vitest-setup.ts           # unchanged
├── types/global.d.ts                         # unchanged
└── business/
    ├── model/                                # standalone types / contracts
    │   └── msh-env.ts                        # export type MshEnv   ← extracted from src/msh-env.ts
    ├── service/                              # strategies (folders preserved) + their interfaces
    │   ├── convert-strategy.ts               # ConvertStrategy<T> interface  ← sibling of folder
    │   ├── convert-strategy/
    │   │   ├── base64-to-string.ts
    │   │   ├── base64-to-string.test.ts
    │   │   ├── to-boolean.ts
    │   │   ├── to-boolean.test.ts
    │   │   ├── to-json.ts
    │   │   ├── to-json.test.ts
    │   │   ├── to-number.ts
    │   │   ├── to-number.test.ts
    │   │   ├── to-string.ts
    │   │   ├── to-string.test.ts
    │   │   └── __mocks__/convert-strategy-mock.ts
    │   ├── location-strategy.ts              # LocationStrategy interface  ← sibling of folder
    │   ├── location-strategy/
    │   │   ├── cli-args-minimist.ts
    │   │   ├── cli-args-minimist.test.ts
    │   │   ├── custom.ts
    │   │   ├── custom.test.ts
    │   │   ├── docker-secrets.ts
    │   │   ├── docker-secrets.test.ts
    │   │   ├── environment.ts
    │   │   ├── environment.test.ts
    │   │   ├── import-meta-env.ts
    │   │   ├── import-meta-env.test.ts
    │   │   └── __mocks__/location-strategy-mock.ts
    │   ├── naming-strategy.ts                # NamingStrategy interface  ← sibling of folder
    │   └── naming-strategy/
    │       ├── prefix-name.ts
    │       ├── prefix-name.test.ts
    │       ├── simple-name.ts
    │       ├── simple-name.test.ts
    │       ├── suffix-name.ts
    │       ├── suffix-name.test.ts
    │       └── __mocks__/naming-strategy-mock.ts
    └── component/                            # the env-resolution domain
        ├── env.ts                            # Env (resolver)  ← from src/env.ts (sibling of env/)
        ├── env.test.ts
        ├── __mocks__/
        │   └── env.ts                        # Env mock        ← from src/__mocks__/env.ts
        └── env/
            ├── type.ts                       # EnvType<T>      ← from src/env/type.ts (env- dropped)
            ├── type.test.ts
            ├── factory.ts                    # EnvFactory      ← from src/env/factory.ts (env- dropped)
            ├── factory.test.ts
            └── __mocks__/
                └── type-spy.ts               # ← from src/env/__mocks__/type-spy.ts
```

> `msh-env.ts` is split: the `MshEnv` *type* lives in `business/model/msh-env.ts` (model is for
> types), the `mshEnv()` *function* stays at the root as the public entry. `index.ts` re-exports
> the type from `model/` and the function from the root.

---

## 5. Move list (what → where)

### 5a. Strategy interfaces → `business/service/` (sibling of their folders)

| From | To |
|---|---|
| `src/convert-strategy.ts` | `src/business/service/convert-strategy.ts` |
| `src/location-strategy.ts` | `src/business/service/location-strategy.ts` |
| `src/naming-strategy.ts` | `src/business/service/naming-strategy.ts` |

Each interface keeps the exact same relationship it has today — a sibling file next to its
implementation folder — it just relocates *into* `business/service/`.

### 5b. Strategy implementations → `business/service/<group>/` (folders preserved)

| From | To |
|---|---|
| `src/convert-strategy/` (whole folder, incl. tests) | `src/business/service/convert-strategy/` |
| `src/location-strategy/` (whole folder, incl. tests) | `src/business/service/location-strategy/` |
| `src/naming-strategy/` (whole folder, incl. tests) | `src/business/service/naming-strategy/` |

### 5c. Env core → `business/component/` (`env.ts` next to the `env/` folder)

The `Env` resolver sits as a **sibling of the `env/` folder** — so it imports as `component/env`,
not the redundant `component/env/env`. Inside `env/`, the `env-` prefix is **dropped from the
filenames** (the folder already says "env"); the exported **classes keep** the `Env` part
(`EnvType`, `EnvFactory`).

| From | To |
|---|---|
| `src/env.ts` + `src/env.test.ts` | `src/business/component/env.ts` + `env.test.ts` (sibling of `env/`) |
| `src/env/type.ts` + `src/env/type.test.ts` | `src/business/component/env/type.ts` + `type.test.ts` |
| `src/env/factory.ts` + `src/env/factory.test.ts` | `src/business/component/env/factory.ts` + `factory.test.ts` |
| `src/__mocks__/env.ts` | `src/business/component/__mocks__/env.ts` (mocks the sibling `env.ts`) |
| `src/env/__mocks__/type-spy.ts` | `src/business/component/env/__mocks__/type-spy.ts` |

> Filenames lose the `env-` prefix (`type.ts`, `factory.ts`); the exported classes keep it
> (`EnvType`, `EnvFactory`).

### 5d. Split `msh-env.ts` — type → `business/model/`, function stays at root

`msh-env.ts` mixes a type and a function. Split them so each lands in the right layer:

| From | To |
|---|---|
| `export type MshEnv` (extracted from `src/msh-env.ts`) | `src/business/model/msh-env.ts` |
| `export const mshEnv` (the factory function) | stays at `src/msh-env.ts` (public entry point) |
| `src/msh-env.test.ts` | stays at root (tests the `mshEnv` function) |

Rationale: `model/` is for types/contracts, so the `MshEnv` signature belongs there. The `mshEnv()`
factory is the package's single public entry — a thin facade with almost no logic of its own
(resolution/conversion/validation live in `component/env/` and the strategies) — so the function
stays at the root next to `index.ts`, the conventional library layout. The type file uses a
type-only import of `EnvFactory` from `component/env/env-factory`, so there's no runtime cycle.

### 5e. Top-level mocks → move with their source

| From | To |
|---|---|
| `src/__mocks__/convert-strategy-mock.ts` | `src/business/service/convert-strategy/__mocks__/convert-strategy-mock.ts` |
| `src/__mocks__/location-strategy-mock.ts` | `src/business/service/location-strategy/__mocks__/location-strategy-mock.ts` |
| `src/__mocks__/naming-strategy-mock.ts` | `src/business/service/naming-strategy/__mocks__/naming-strategy-mock.ts` |
| `src/__mocks__/env.ts` | `src/business/component/env/__mocks__/env.ts` |
| `src/util/__mocks__/logger.ts` | **stays** (already next to its source) |

### 5f. Stays put

- `src/index.ts` (only its internal import line changes)
- `src/util/logger.ts` (+ test + mock) — `packages/cli` depends on this subpath
- `src/__tests__/index-vitest-setup.ts`
- `src/types/global.d.ts`

### 5g. Dead code — recommend deletion

- `src/util/string-util.ts` + `src/util/string-util.test.ts` — `StringUtil` has **zero**
  production references (only its own test imports it). Either delete it, or, if you foresee
  using snake-case naming, leave it but add a TODO with a removal condition.

---

## 6. After the move, every internal import needs updating

Class/export names stay the same — only paths change. Example diff:

```ts
// src/msh-env.ts  (function only — type extracted to model/)
- import { EnvFactory } from '#src/env/factory.js'
- import { LocationStrategyEnvironment } from '#src/location-strategy/environment.js'
- import { type LocationStrategy } from '#src/location-strategy.js'
- import { NamingStrategySimpleName } from '#src/naming-strategy/simple-name.js'
- import { type NamingStrategy } from '#src/naming-strategy.js'
+ import { EnvFactory } from '#src/business/component/env/factory.js'
+ import { LocationStrategyEnvironment } from '#src/business/service/location-strategy/environment.js'
+ import { type LocationStrategy } from '#src/business/service/location-strategy.js'
+ import { NamingStrategySimpleName } from '#src/business/service/naming-strategy/simple-name.js'
+ import { type NamingStrategy } from '#src/business/service/naming-strategy.js'
+ import { type MshEnv } from '#src/business/model/msh-env.js'

// src/business/model/msh-env.ts  (new — extracted type)
+ import { type EnvFactory } from '#src/business/component/env/factory.js'
+ export type MshEnv = (...name: string[]) => EnvFactory
```

Run `npm run lint-fix` after moving — it sorts/normalizes imports.

---

## 7. Public API for the `2.0.0` bump

Since we're breaking anyway, replace the catch-all `"./*"` wildcard (which leaked every internal
path, e.g. `@beecode/msh-env/env/factory`) with **explicit, clean public subpaths** that point
at the new internal layout:

```jsonc
"exports": {
  ".": {
    "types": "./dist/index.d.ts",
    "import": "./dist/index.js"
  },
  "./util/*": {
    "types": "./dist/util/*.d.ts",
    "import": "./dist/util/*.js"
  },
  "./convert-strategy/*": {
    "types": "./dist/business/service/convert-strategy/*.d.ts",
    "import": "./dist/business/service/convert-strategy/*.js"
  },
  "./location-strategy/*": {
    "types": "./dist/business/service/location-strategy/*.d.ts",
    "import": "./dist/business/service/location-strategy/*.js"
  },
  "./naming-strategy/*": {
    "types": "./dist/business/service/naming-strategy/*.d.ts",
    "import": "./dist/business/service/naming-strategy/*.js"
  }
}
```

This gives consumers **clean, stable public paths** (`@beecode/msh-env/location-strategy/cli-args-minimist`,
etc.) regardless of where files live internally — so future internal refactors won't need another
major bump. The `-strategy` segment names are kept (they're accurate and descriptive); the README's
wrong `location/` / `naming/` examples get corrected to the real names.

Work the major bump entails:

1. Replace the `exports` map as above.
2. **Update in-repo consumers** to the new explicit paths:
   - `packages/cli/src/util/config.ts` — `@beecode/msh-env/util/logger` (unchanged, still works).
   - `packages/env/test/multi-locations/index.test.ts` — `location-strategy/cli-args-minimist`,
     `location-strategy/environment`, `util/logger`.
   - `packages/env/test/prefix-example/index.test.ts` — `naming-strategy/prefix-name`, `util/logger`.
   - `packages/env/test/simple-example/index.test.ts` — `util/logger`.
3. **Fix the README** — correct the example imports from the wrong `@beecode/msh-env/location/…` /
   `@beecode/msh-env/naming/…` to the real `location-strategy/` / `naming-strategy/` paths.
4. Bump version to `2.0.0` (`npm run npm-bump-version 2.0.0`) and let semantic-release cut the release.

---

## 8. Suggested migration order

1. Create the empty folders: `business/model`, `business/service`, `business/component/env`.
2. Move the **strategy folders wholesale** (`convert-strategy/`, `location-strategy/`,
   `naming-strategy/`) into `business/service/` — tests move with them.
3. Move the **three interface files** to `business/service/` (as siblings of their folders).
4. Move the **env core** into `business/component/`: `env.ts` + `env.test.ts` as **siblings of**
   the `env/` folder; `type.ts` + `factory.ts` (+ tests) into `env/` with the `env-` prefix
   dropped (classes stay `EnvType` / `EnvFactory`).
5. Relocate the **top-level `__mocks__/`**: strategy mocks into each strategy folder, the `env`
   mock into `business/component/__mocks__/`, the type-spy into `business/component/env/__mocks__/`.
6. **Split `msh-env.ts`**: extract `export type MshEnv` into `business/model/msh-env.ts`, keep the
   `mshEnv()` function at root. Update `index.ts` to re-export the type from `model/` and the
   function from root.
7. Delete (or TODO) **`string-util.ts`** + its test.
8. Update all changed `#src/...` imports, then `npm run lint-fix`.
9. Update `package.json` `exports` (§7), bump to `2.0.0`, fix README + in-repo consumers.
10. `npm run lint-fix && npm run tsc-check && npm run test` — green = done.

Each strategy folder moves as a unit, so steps 2, 3 and 5 are mostly `git mv` + a find/replace on
`#src/` paths. No rename of classes or exports is required anywhere.
