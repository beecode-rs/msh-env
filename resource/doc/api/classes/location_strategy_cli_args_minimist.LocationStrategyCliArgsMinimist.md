[@beecode/msh-env](../README.md) / [location-strategy/cli-args-minimist](../modules/location_strategy_cli_args_minimist.md) / LocationStrategyCliArgsMinimist

# Class: LocationStrategyCliArgsMinimist\<T\>

[location-strategy/cli-args-minimist](../modules/location_strategy_cli_args_minimist.md).LocationStrategyCliArgsMinimist

## Type parameters

| Name | Type |
| :------ | :------ |
| `T` | extends `minimist.ParsedArgs` |

## Implements

- [`LocationStrategy`](../interfaces/location_strategy.LocationStrategy.md)

## Table of contents

### Constructors

- [constructor](location_strategy_cli_args_minimist.LocationStrategyCliArgsMinimist.md#constructor)

### Properties

- [\_args](location_strategy_cli_args_minimist.LocationStrategyCliArgsMinimist.md#_args)
- [\_miniOpts](location_strategy_cli_args_minimist.LocationStrategyCliArgsMinimist.md#_miniopts)

### Methods

- [valueByName](location_strategy_cli_args_minimist.LocationStrategyCliArgsMinimist.md#valuebyname)

## Constructors

### constructor

• **new LocationStrategyCliArgsMinimist**\<`T`\>(`params?`): [`LocationStrategyCliArgsMinimist`](location_strategy_cli_args_minimist.LocationStrategyCliArgsMinimist.md)\<`T`\>

#### Type parameters

| Name | Type |
| :------ | :------ |
| `T` | extends `ParsedArgs` |

#### Parameters

| Name | Type |
| :------ | :------ |
| `params?` | `Object` |
| `params.args?` | `string`[] |
| `params.options?` | `Options` |

#### Returns

[`LocationStrategyCliArgsMinimist`](location_strategy_cli_args_minimist.LocationStrategyCliArgsMinimist.md)\<`T`\>

#### Defined in

[location-strategy/cli-args-minimist.ts:10](https://github.com/beecode-rs/msh-env/blob/b90f535/src/location-strategy/cli-args-minimist.ts#L10)

## Properties

### \_args

• `Protected` `Readonly` **\_args**: `T`

#### Defined in

[location-strategy/cli-args-minimist.ts:8](https://github.com/beecode-rs/msh-env/blob/b90f535/src/location-strategy/cli-args-minimist.ts#L8)

___

### \_miniOpts

• `Protected` `Readonly` **\_miniOpts**: `Opts`

#### Defined in

[location-strategy/cli-args-minimist.ts:7](https://github.com/beecode-rs/msh-env/blob/b90f535/src/location-strategy/cli-args-minimist.ts#L7)

## Methods

### valueByName

▸ **valueByName**(`name`): `undefined` \| `string`

#### Parameters

| Name | Type |
| :------ | :------ |
| `name` | `string` |

#### Returns

`undefined` \| `string`

#### Implementation of

[LocationStrategy](../interfaces/location_strategy.LocationStrategy.md).[valueByName](../interfaces/location_strategy.LocationStrategy.md#valuebyname)

#### Defined in

[location-strategy/cli-args-minimist.ts:17](https://github.com/beecode-rs/msh-env/blob/b90f535/src/location-strategy/cli-args-minimist.ts#L17)
