[**@beecode/msh-env**](../../../../../README.md)

***

[@beecode/msh-env](../../../../../README.md) / [business/service/location-strategy/cli-args-minimist](../README.md) / LocationStrategyCliArgsMinimist

# Class: LocationStrategyCliArgsMinimist\<T\>

Defined in: [packages/env/src/business/service/location-strategy/cli-args-minimist.ts:6](https://github.com/beecode-rs/msh-env/blob/dacc5815ab70f4a82a501d760920b73127d8deb2/src/business/service/location-strategy/cli-args-minimist.ts#L6)

## Type Parameters

### T

`T` *extends* `minimist.ParsedArgs`

## Implements

- [`LocationStrategy`](../../interfaces/LocationStrategy.md)

## Constructors

### Constructor

> **new LocationStrategyCliArgsMinimist**\<`T`\>(`params?`): `LocationStrategyCliArgsMinimist`\<`T`\>

Defined in: [packages/env/src/business/service/location-strategy/cli-args-minimist.ts:10](https://github.com/beecode-rs/msh-env/blob/dacc5815ab70f4a82a501d760920b73127d8deb2/src/business/service/location-strategy/cli-args-minimist.ts#L10)

#### Parameters

##### params?

###### args?

`string`[]

###### options?

`Options`

#### Returns

`LocationStrategyCliArgsMinimist`\<`T`\>

## Properties

### \_args

> `protected` `readonly` **\_args**: `T`

Defined in: [packages/env/src/business/service/location-strategy/cli-args-minimist.ts:8](https://github.com/beecode-rs/msh-env/blob/dacc5815ab70f4a82a501d760920b73127d8deb2/src/business/service/location-strategy/cli-args-minimist.ts#L8)

***

### \_miniOpts

> `protected` `readonly` **\_miniOpts**: `Opts`

Defined in: [packages/env/src/business/service/location-strategy/cli-args-minimist.ts:7](https://github.com/beecode-rs/msh-env/blob/dacc5815ab70f4a82a501d760920b73127d8deb2/src/business/service/location-strategy/cli-args-minimist.ts#L7)

## Methods

### valueByName()

> **valueByName**(`name`): `string` \| `undefined`

Defined in: [packages/env/src/business/service/location-strategy/cli-args-minimist.ts:17](https://github.com/beecode-rs/msh-env/blob/dacc5815ab70f4a82a501d760920b73127d8deb2/src/business/service/location-strategy/cli-args-minimist.ts#L17)

#### Parameters

##### name

`string`

#### Returns

`string` \| `undefined`

#### Implementation of

[`LocationStrategy`](../../interfaces/LocationStrategy.md).[`valueByName`](../../interfaces/LocationStrategy.md#valuebyname)
