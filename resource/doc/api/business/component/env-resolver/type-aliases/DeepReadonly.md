[**@beecode/msh-env**](../../../../README.md)

***

[@beecode/msh-env](../../../../README.md) / [business/component/env-resolver](../README.md) / DeepReadonly

# Type Alias: DeepReadonly\<T\>

> **DeepReadonly**\<`T`\> = `T` *extends* (...`args`) => `unknown` ? `T` : `T` *extends* readonly `unknown`[] ? readonly `DeepReadonly`\<`T`\[`number`\]\>[] : `T` *extends* `object` ? `{ readonly [K in keyof T]: DeepReadonly<T[K]> }` : `T`

Defined in: [packages/env/src/business/component/env-resolver.ts:6](https://github.com/beecode-rs/msh-env/blob/dacc5815ab70f4a82a501d760920b73127d8deb2/src/business/component/env-resolver.ts#L6)

## Type Parameters

### T

`T`
