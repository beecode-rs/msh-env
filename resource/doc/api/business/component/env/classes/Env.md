[**@beecode/msh-env**](../../../../README.md)

***

[@beecode/msh-env](../../../../README.md) / [business/component/env](../README.md) / Env

# Class: Env

Defined in: [packages/env/src/business/component/env.ts:5](https://github.com/beecode-rs/msh-env/blob/dacc5815ab70f4a82a501d760920b73127d8deb2/src/business/component/env.ts#L5)

## Constructors

### Constructor

> **new Env**(`params`): `Env`

Defined in: [packages/env/src/business/component/env.ts:10](https://github.com/beecode-rs/msh-env/blob/dacc5815ab70f4a82a501d760920b73127d8deb2/src/business/component/env.ts#L10)

#### Parameters

##### params

###### locationStrategies

[`LocationStrategy`](../../../service/location-strategy/interfaces/LocationStrategy.md)[]

###### names

`string`[]

###### namingStrategies

[`NamingStrategy`](../../../service/naming-strategy/interfaces/NamingStrategy.md)[]

#### Returns

`Env`

## Properties

### \_locationStrategies

> `protected` `readonly` **\_locationStrategies**: [`LocationStrategy`](../../../service/location-strategy/interfaces/LocationStrategy.md)[]

Defined in: [packages/env/src/business/component/env.ts:7](https://github.com/beecode-rs/msh-env/blob/dacc5815ab70f4a82a501d760920b73127d8deb2/src/business/component/env.ts#L7)

***

### \_namingStrategies

> `protected` `readonly` **\_namingStrategies**: [`NamingStrategy`](../../../service/naming-strategy/interfaces/NamingStrategy.md)[]

Defined in: [packages/env/src/business/component/env.ts:8](https://github.com/beecode-rs/msh-env/blob/dacc5815ab70f4a82a501d760920b73127d8deb2/src/business/component/env.ts#L8)

***

### names

> `readonly` **names**: `string`[]

Defined in: [packages/env/src/business/component/env.ts:6](https://github.com/beecode-rs/msh-env/blob/dacc5815ab70f4a82a501d760920b73127d8deb2/src/business/component/env.ts#L6)

## Methods

### \_envNames()

> `protected` **\_envNames**(): `string`[]

Defined in: [packages/env/src/business/component/env.ts:17](https://github.com/beecode-rs/msh-env/blob/dacc5815ab70f4a82a501d760920b73127d8deb2/src/business/component/env.ts#L17)

#### Returns

`string`[]

***

### envValue()

> **envValue**(): `string` \| `undefined`

Defined in: [packages/env/src/business/component/env.ts:34](https://github.com/beecode-rs/msh-env/blob/dacc5815ab70f4a82a501d760920b73127d8deb2/src/business/component/env.ts#L34)

#### Returns

`string` \| `undefined`
