[**@beecode/msh-env**](../../../README.md)

***

[@beecode/msh-env](../../../README.md) / [types/global](../README.md) / ImportMeta

# Interface: ImportMeta

Defined in: node\_modules/typescript/lib/lib.es5.d.ts:629

The type of `import.meta`.

If you need to declare that a given property exists on `import.meta`,
this type may be augmented via interface merging.

## Properties

### dirname

> **dirname**: `string`

Defined in: node\_modules/@types/node/web-globals/importmeta.d.ts:7

***

### env

> **env**: `Record`\<`string`, `string` \| `undefined`\>

Defined in: [packages/env/src/types/global.d.ts:2](https://github.com/beecode-rs/msh-env/blob/dacc5815ab70f4a82a501d760920b73127d8deb2/src/types/global.d.ts#L2)

***

### filename

> **filename**: `string`

Defined in: node\_modules/@types/node/web-globals/importmeta.d.ts:8

***

### main

> **main**: `boolean`

Defined in: node\_modules/@types/node/web-globals/importmeta.d.ts:9

***

### url

> **url**: `string`

Defined in: node\_modules/@types/node/web-globals/importmeta.d.ts:10

## Methods

### resolve()

> **resolve**(`specifier`, `parent?`): `string`

Defined in: node\_modules/@types/node/web-globals/importmeta.d.ts:11

#### Parameters

##### specifier

`string`

##### parent?

`string` \| `URL`

#### Returns

`string`
