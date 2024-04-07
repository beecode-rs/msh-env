[@beecode/msh-env](../README.md) / [env/factory](../modules/env_factory.md) / EnvFactory

# Class: EnvFactory

[env/factory](../modules/env_factory.md).EnvFactory

## Table of contents

### Constructors

- [constructor](env_factory.EnvFactory.md#constructor)

### Properties

- [\_env](env_factory.EnvFactory.md#_env)

### Accessors

- [base64](env_factory.EnvFactory.md#base64)
- [boolean](env_factory.EnvFactory.md#boolean)
- [number](env_factory.EnvFactory.md#number)
- [string](env_factory.EnvFactory.md#string)

### Methods

- [json](env_factory.EnvFactory.md#json)

## Constructors

### constructor

• **new EnvFactory**(`params`): [`EnvFactory`](env_factory.EnvFactory.md)

#### Parameters

| Name | Type |
| :------ | :------ |
| `params` | `Object` |
| `params.locationStrategies` | [`LocationStrategy`](../interfaces/location_strategy.LocationStrategy.md)[] |
| `params.names` | `string`[] |
| `params.namingStrategies` | [`NamingStrategy`](../interfaces/naming_strategy.NamingStrategy.md)[] |

#### Returns

[`EnvFactory`](env_factory.EnvFactory.md)

#### Defined in

[env/factory.ts:14](https://github.com/beecode-rs/msh-env/blob/b90f535/src/env/factory.ts#L14)

## Properties

### \_env

• `Protected` `Readonly` **\_env**: [`Env`](env.Env.md)

#### Defined in

[env/factory.ts:12](https://github.com/beecode-rs/msh-env/blob/b90f535/src/env/factory.ts#L12)

## Accessors

### base64

• `get` **base64**(): [`EnvType`](env_type.EnvType.md)\<`string`\>

#### Returns

[`EnvType`](env_type.EnvType.md)\<`string`\>

#### Defined in

[env/factory.ts:35](https://github.com/beecode-rs/msh-env/blob/b90f535/src/env/factory.ts#L35)

___

### boolean

• `get` **boolean**(): [`EnvType`](env_type.EnvType.md)\<`boolean`\>

#### Returns

[`EnvType`](env_type.EnvType.md)\<`boolean`\>

#### Defined in

[env/factory.ts:23](https://github.com/beecode-rs/msh-env/blob/b90f535/src/env/factory.ts#L23)

___

### number

• `get` **number**(): [`EnvType`](env_type.EnvType.md)\<`number`\>

#### Returns

[`EnvType`](env_type.EnvType.md)\<`number`\>

#### Defined in

[env/factory.ts:27](https://github.com/beecode-rs/msh-env/blob/b90f535/src/env/factory.ts#L27)

___

### string

• `get` **string**(): [`EnvType`](env_type.EnvType.md)\<`string`\>

#### Returns

[`EnvType`](env_type.EnvType.md)\<`string`\>

#### Defined in

[env/factory.ts:19](https://github.com/beecode-rs/msh-env/blob/b90f535/src/env/factory.ts#L19)

## Methods

### json

▸ **json**\<`T`\>(): [`EnvType`](env_type.EnvType.md)\<`T`\>

#### Type parameters

| Name |
| :------ |
| `T` |

#### Returns

[`EnvType`](env_type.EnvType.md)\<`T`\>

#### Defined in

[env/factory.ts:31](https://github.com/beecode-rs/msh-env/blob/b90f535/src/env/factory.ts#L31)
