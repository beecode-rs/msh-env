[@beecode/msh-env](../README.md) / [env](../modules/env.md) / Env

# Class: Env

[env](../modules/env.md).Env

## Table of contents

### Constructors

- [constructor](env.Env.md#constructor)

### Properties

- [\_locationStrategies](env.Env.md#_locationstrategies)
- [\_namingStrategies](env.Env.md#_namingstrategies)
- [names](env.Env.md#names)

### Methods

- [\_envNames](env.Env.md#_envnames)
- [envValue](env.Env.md#envvalue)

## Constructors

### constructor

• **new Env**(`params`): [`Env`](env.Env.md)

#### Parameters

| Name | Type |
| :------ | :------ |
| `params` | `Object` |
| `params.locationStrategies` | [`LocationStrategy`](../interfaces/location_strategy.LocationStrategy.md)[] |
| `params.names` | `string`[] |
| `params.namingStrategies` | [`NamingStrategy`](../interfaces/naming_strategy.NamingStrategy.md)[] |

#### Returns

[`Env`](env.Env.md)

#### Defined in

[env.ts:10](https://github.com/beecode-rs/msh-env/blob/b90f535/src/env.ts#L10)

## Properties

### \_locationStrategies

• `Protected` `Readonly` **\_locationStrategies**: [`LocationStrategy`](../interfaces/location_strategy.LocationStrategy.md)[]

#### Defined in

[env.ts:7](https://github.com/beecode-rs/msh-env/blob/b90f535/src/env.ts#L7)

___

### \_namingStrategies

• `Protected` `Readonly` **\_namingStrategies**: [`NamingStrategy`](../interfaces/naming_strategy.NamingStrategy.md)[]

#### Defined in

[env.ts:8](https://github.com/beecode-rs/msh-env/blob/b90f535/src/env.ts#L8)

___

### names

• `Readonly` **names**: `string`[]

#### Defined in

[env.ts:6](https://github.com/beecode-rs/msh-env/blob/b90f535/src/env.ts#L6)

## Methods

### \_envNames

▸ **_envNames**(): `string`[]

#### Returns

`string`[]

#### Defined in

[env.ts:17](https://github.com/beecode-rs/msh-env/blob/b90f535/src/env.ts#L17)

___

### envValue

▸ **envValue**(): `undefined` \| `string`

#### Returns

`undefined` \| `string`

#### Defined in

[env.ts:34](https://github.com/beecode-rs/msh-env/blob/b90f535/src/env.ts#L34)
