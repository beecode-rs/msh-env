[**@beecode/msh-env**](../../../../../README.md)

***

[@beecode/msh-env](../../../../../README.md) / [business/service/location-strategy/custom](../README.md) / LocationStrategyCustom

# Class: LocationStrategyCustom

Defined in: [packages/env/src/business/service/location-strategy/custom.ts:3](https://github.com/beecode-rs/msh-env/blob/dacc5815ab70f4a82a501d760920b73127d8deb2/src/business/service/location-strategy/custom.ts#L3)

## Implements

- [`LocationStrategy`](../../interfaces/LocationStrategy.md)

## Constructors

### Constructor

> **new LocationStrategyCustom**(`env`): `LocationStrategyCustom`

Defined in: [packages/env/src/business/service/location-strategy/custom.ts:6](https://github.com/beecode-rs/msh-env/blob/dacc5815ab70f4a82a501d760920b73127d8deb2/src/business/service/location-strategy/custom.ts#L6)

#### Parameters

##### env

`Record`\<`string`, `string`\>

#### Returns

`LocationStrategyCustom`

## Properties

### \_env

> `protected` `readonly` **\_env**: `Record`\<`string`, `string`\>

Defined in: [packages/env/src/business/service/location-strategy/custom.ts:4](https://github.com/beecode-rs/msh-env/blob/dacc5815ab70f4a82a501d760920b73127d8deb2/src/business/service/location-strategy/custom.ts#L4)

## Methods

### valueByName()

> **valueByName**(`name`): `string` \| `undefined`

Defined in: [packages/env/src/business/service/location-strategy/custom.ts:10](https://github.com/beecode-rs/msh-env/blob/dacc5815ab70f4a82a501d760920b73127d8deb2/src/business/service/location-strategy/custom.ts#L10)

#### Parameters

##### name

`string`

#### Returns

`string` \| `undefined`

#### Implementation of

[`LocationStrategy`](../../interfaces/LocationStrategy.md).[`valueByName`](../../interfaces/LocationStrategy.md#valuebyname)
