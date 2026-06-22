[**@beecode/msh-env**](../../../../README.md)

***

[@beecode/msh-env](../../../../README.md) / [business/component/env-resolver](../README.md) / Resolve

# Type Alias: Resolve\<T\>

> **Resolve**\<`T`\> = `T` *extends* [`EnvType`](../../env/type/classes/EnvType.md)\<infer V\> ? [`DeepReadonly`](DeepReadonly.md)\<`V`\> : `T` *extends* (...`args`) => `unknown` ? `T` : `T` *extends* readonly `unknown`[] ? readonly `Resolve`\<`T`\[`number`\]\>[] : `T` *extends* `object` ? `{ readonly [K in keyof T]: Resolve<T[K]> }` : `T`

Defined in: [packages/env/src/business/component/env-resolver.ts:13](https://github.com/beecode-rs/msh-env/blob/dacc5815ab70f4a82a501d760920b73127d8deb2/src/business/component/env-resolver.ts#L13)

## Type Parameters

### T

`T`
