# Simple Types Example

Loads a `.env` file and reads **every value type** (`string`, `number`, `boolean`, `json`, `base64`)
using all the options: **required** (mandatory), **optional**, **default**, and **allowed** values.

## Run it

This example runs directly with Node — no compile step (Node ≥ 22.18 strips TypeScript types natively).

```bash
# one-time: install dependencies (links the local @beecode/msh-env package)
npm install

# run it
npm start
# or, equivalently:
node index.ts
```

> The parent package (`@beecode/msh-env`) must be built (`npm run build` in the repo root `packages/env`)
> so that `dist/` exists. It is referenced via `"file:../"`.

## What it demonstrates

| Variable              | Type     | Option   | Result                                    |
| --------------------- | -------- | -------- | ----------------------------------------- |
| `SIMPLE_STRING`       | string   | required | `hello-world`                             |
| `SIMPLE_NUMBER`       | number   | required | `42`                                      |
| `SIMPLE_BOOLEAN`      | boolean  | required | `true`                                    |
| `SIMPLE_JSON`         | json     | required | `{ key: 'value', nested: { n: 1 } }`      |
| `SIMPLE_BASE64`       | base64   | required | `hello from msh-env` (decoded)            |
| `OPTIONAL_STRING`     | string   | optional | `optional-present` (set)                  |
| `OPTIONAL_MISSING_*`  | string   | optional | `undefined` (not set)                     |
| `DEFAULT_MISSING_*`   | string   | default  | `fallback-string` (not set -> default)    |
| `ALLOWED_STRING`      | string   | allowed  | `prod` (one of `dev`/`prod`/`test`)       |
| `ALLOWED_NUMBER`      | number   | allowed  | `2` (one of `1`/`2`/`3`)                  |

Edit `.env` to see how the resolved values change.
