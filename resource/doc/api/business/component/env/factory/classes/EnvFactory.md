[**@beecode/msh-env**](../../../../../README.md)

***

[@beecode/msh-env](../../../../../README.md) / [business/component/env/factory](../README.md) / EnvFactory

# Class: EnvFactory

Defined in: [packages/env/src/business/component/env/factory.ts:11](https://github.com/beecode-rs/msh-env/blob/dacc5815ab70f4a82a501d760920b73127d8deb2/src/business/component/env/factory.ts#L11)

## Constructors

### Constructor

> **new EnvFactory**(`params`): `EnvFactory`

Defined in: [packages/env/src/business/component/env/factory.ts:14](https://github.com/beecode-rs/msh-env/blob/dacc5815ab70f4a82a501d760920b73127d8deb2/src/business/component/env/factory.ts#L14)

#### Parameters

##### params

###### locationStrategies

[`LocationStrategy`](../../../../service/location-strategy/interfaces/LocationStrategy.md)[]

###### names

`string`[]

###### namingStrategies

[`NamingStrategy`](../../../../service/naming-strategy/interfaces/NamingStrategy.md)[]

#### Returns

`EnvFactory`

## Properties

### \_env

> `protected` `readonly` **\_env**: [`Env`](../../classes/Env.md)

Defined in: [packages/env/src/business/component/env/factory.ts:12](https://github.com/beecode-rs/msh-env/blob/dacc5815ab70f4a82a501d760920b73127d8deb2/src/business/component/env/factory.ts#L12)

## Accessors

### base64

#### Get Signature

> **get** **base64**(): [`EnvType`](../../type/classes/EnvType.md)\<`string`\>

Defined in: [packages/env/src/business/component/env/factory.ts:35](https://github.com/beecode-rs/msh-env/blob/dacc5815ab70f4a82a501d760920b73127d8deb2/src/business/component/env/factory.ts#L35)

##### Returns

[`EnvType`](../../type/classes/EnvType.md)\<`string`\>

***

### boolean

#### Get Signature

> **get** **boolean**(): [`EnvType`](../../type/classes/EnvType.md)\<`boolean`\>

Defined in: [packages/env/src/business/component/env/factory.ts:23](https://github.com/beecode-rs/msh-env/blob/dacc5815ab70f4a82a501d760920b73127d8deb2/src/business/component/env/factory.ts#L23)

##### Returns

[`EnvType`](../../type/classes/EnvType.md)\<`boolean`\>

***

### number

#### Get Signature

> **get** **number**(): [`EnvType`](../../type/classes/EnvType.md)\<`number`\>

Defined in: [packages/env/src/business/component/env/factory.ts:27](https://github.com/beecode-rs/msh-env/blob/dacc5815ab70f4a82a501d760920b73127d8deb2/src/business/component/env/factory.ts#L27)

##### Returns

[`EnvType`](../../type/classes/EnvType.md)\<`number`\>

***

### string

#### Get Signature

> **get** **string**(): [`EnvType`](../../type/classes/EnvType.md)\<`string`\>

Defined in: [packages/env/src/business/component/env/factory.ts:19](https://github.com/beecode-rs/msh-env/blob/dacc5815ab70f4a82a501d760920b73127d8deb2/src/business/component/env/factory.ts#L19)

##### Returns

[`EnvType`](../../type/classes/EnvType.md)\<`string`\>

## Methods

### json()

> **json**\<`T`\>(): [`EnvType`](../../type/classes/EnvType.md)\<`T`\>

Defined in: [packages/env/src/business/component/env/factory.ts:31](https://github.com/beecode-rs/msh-env/blob/dacc5815ab70f4a82a501d760920b73127d8deb2/src/business/component/env/factory.ts#L31)

#### Type Parameters

##### T

`T`

#### Returns

[`EnvType`](../../type/classes/EnvType.md)\<`T`\>
