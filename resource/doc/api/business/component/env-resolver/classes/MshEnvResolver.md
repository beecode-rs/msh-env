[**@beecode/msh-env**](../../../../README.md)

***

[@beecode/msh-env](../../../../README.md) / [business/component/env-resolver](../README.md) / MshEnvResolver

# Class: MshEnvResolver

Defined in: [packages/env/src/business/component/env-resolver.ts:20](https://github.com/beecode-rs/msh-env/blob/dacc5815ab70f4a82a501d760920b73127d8deb2/src/business/component/env-resolver.ts#L20)

## Constructors

### Constructor

> **new MshEnvResolver**(): `MshEnvResolver`

#### Returns

`MshEnvResolver`

## Methods

### \_deepFreeze()

> `protected` **\_deepFreeze**\<`T`\>(`value`): `T`

Defined in: [packages/env/src/business/component/env-resolver.ts:73](https://github.com/beecode-rs/msh-env/blob/dacc5815ab70f4a82a501d760920b73127d8deb2/src/business/component/env-resolver.ts#L73)

#### Type Parameters

##### T

`T`

#### Parameters

##### value

`T`

#### Returns

`T`

***

### \_isEnvType()

> `protected` **\_isEnvType**(`v`): `v is EnvType<unknown>`

Defined in: [packages/env/src/business/component/env-resolver.ts:60](https://github.com/beecode-rs/msh-env/blob/dacc5815ab70f4a82a501d760920b73127d8deb2/src/business/component/env-resolver.ts#L60)

#### Parameters

##### v

`unknown`

#### Returns

`v is EnvType<unknown>`

***

### \_isPlainObject()

> `protected` **\_isPlainObject**(`v`): `v is Record<string, unknown>`

Defined in: [packages/env/src/business/component/env-resolver.ts:64](https://github.com/beecode-rs/msh-env/blob/dacc5815ab70f4a82a501d760920b73127d8deb2/src/business/component/env-resolver.ts#L64)

#### Parameters

##### v

`unknown`

#### Returns

`v is Record<string, unknown>`

***

### \_walk()

> `protected` **\_walk**(`node`, `path`, `failures`): `unknown`

Defined in: [packages/env/src/business/component/env-resolver.ts:31](https://github.com/beecode-rs/msh-env/blob/dacc5815ab70f4a82a501d760920b73127d8deb2/src/business/component/env-resolver.ts#L31)

#### Parameters

##### node

`unknown`

##### path

`PropertyKey`[]

##### failures

[`MshEnvResolverFailure`](../../env-resolver-error/interfaces/MshEnvResolverFailure.md)[]

#### Returns

`unknown`

***

### resolve()

> **resolve**\<`T`\>(`obj`): [`Resolve`](../type-aliases/Resolve.md)\<`T`\>

Defined in: [packages/env/src/business/component/env-resolver.ts:21](https://github.com/beecode-rs/msh-env/blob/dacc5815ab70f4a82a501d760920b73127d8deb2/src/business/component/env-resolver.ts#L21)

#### Type Parameters

##### T

`T`

#### Parameters

##### obj

`T`

#### Returns

[`Resolve`](../type-aliases/Resolve.md)\<`T`\>
