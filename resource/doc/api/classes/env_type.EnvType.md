[@beecode/msh-env](../README.md) / [env/type](../modules/env_type.md) / EnvType

# Class: EnvType\<T\>

[env/type](../modules/env_type.md).EnvType

## Type parameters

| Name |
| :------ |
| `T` |

## Table of contents

### Constructors

- [constructor](env_type.EnvType.md#constructor)

### Properties

- [\_allowedValues](env_type.EnvType.md#_allowedvalues)
- [\_convertStrategy](env_type.EnvType.md#_convertstrategy)
- [\_defaultValue](env_type.EnvType.md#_defaultvalue)
- [\_env](env_type.EnvType.md#_env)

### Accessors

- [\_envName](env_type.EnvType.md#_envname)
- [optional](env_type.EnvType.md#optional)
- [required](env_type.EnvType.md#required)

### Methods

- [\_allowedValuesDoNotContain](env_type.EnvType.md#_allowedvaluesdonotcontain)
- [\_allowedValuesToString](env_type.EnvType.md#_allowedvaluestostring)
- [\_createError](env_type.EnvType.md#_createerror)
- [\_loggerDebug](env_type.EnvType.md#_loggerdebug)
- [\_validateAllowedValues](env_type.EnvType.md#_validateallowedvalues)
- [allowed](env_type.EnvType.md#allowed)
- [default](env_type.EnvType.md#default)

## Constructors

### constructor

• **new EnvType**\<`T`\>(`params`): [`EnvType`](env_type.EnvType.md)\<`T`\>

#### Type parameters

| Name |
| :------ |
| `T` |

#### Parameters

| Name | Type |
| :------ | :------ |
| `params` | `Object` |
| `params.convertStrategy` | [`ConvertStrategy`](../interfaces/convert_strategy.ConvertStrategy.md)\<`T`\> |
| `params.env` | [`Env`](env.Env.md) |

#### Returns

[`EnvType`](env_type.EnvType.md)\<`T`\>

#### Defined in

[env/type.ts:13](https://github.com/beecode-rs/msh-env/blob/b90f535/src/env/type.ts#L13)

## Properties

### \_allowedValues

• `Protected` **\_allowedValues**: `T`[] = `[]`

#### Defined in

[env/type.ts:11](https://github.com/beecode-rs/msh-env/blob/b90f535/src/env/type.ts#L11)

___

### \_convertStrategy

• `Protected` `Readonly` **\_convertStrategy**: [`ConvertStrategy`](../interfaces/convert_strategy.ConvertStrategy.md)\<`T`\>

#### Defined in

[env/type.ts:9](https://github.com/beecode-rs/msh-env/blob/b90f535/src/env/type.ts#L9)

___

### \_defaultValue

• `Protected` **\_defaultValue**: `undefined` \| `T` = `undefined`

#### Defined in

[env/type.ts:8](https://github.com/beecode-rs/msh-env/blob/b90f535/src/env/type.ts#L8)

___

### \_env

• `Protected` `Readonly` **\_env**: [`Env`](env.Env.md)

#### Defined in

[env/type.ts:10](https://github.com/beecode-rs/msh-env/blob/b90f535/src/env/type.ts#L10)

## Accessors

### \_envName

• `get` **_envName**(): `string`

#### Returns

`string`

#### Defined in

[env/type.ts:92](https://github.com/beecode-rs/msh-env/blob/b90f535/src/env/type.ts#L92)

___

### optional

• `get` **optional**(): `undefined` \| `T`

#### Returns

`undefined` \| `T`

#### Defined in

[env/type.ts:26](https://github.com/beecode-rs/msh-env/blob/b90f535/src/env/type.ts#L26)

___

### required

• `get` **required**(): `T`

#### Returns

`T`

#### Defined in

[env/type.ts:43](https://github.com/beecode-rs/msh-env/blob/b90f535/src/env/type.ts#L43)

## Methods

### \_allowedValuesDoNotContain

▸ **_allowedValuesDoNotContain**(`value?`): `boolean`

#### Parameters

| Name | Type |
| :------ | :------ |
| `value?` | `T` |

#### Returns

`boolean`

#### Defined in

[env/type.ts:72](https://github.com/beecode-rs/msh-env/blob/b90f535/src/env/type.ts#L72)

___

### \_allowedValuesToString

▸ **_allowedValuesToString**(): `string`

#### Returns

`string`

#### Defined in

[env/type.ts:80](https://github.com/beecode-rs/msh-env/blob/b90f535/src/env/type.ts#L80)

___

### \_createError

▸ **_createError**(`msg`): `Error`

#### Parameters

| Name | Type |
| :------ | :------ |
| `msg` | `string` |

#### Returns

`Error`

#### Defined in

[env/type.ts:88](https://github.com/beecode-rs/msh-env/blob/b90f535/src/env/type.ts#L88)

___

### \_loggerDebug

▸ **_loggerDebug**(`msg`, `...args`): `void`

#### Parameters

| Name | Type |
| :------ | :------ |
| `msg` | `string` |
| `...args` | `Record`\<`string`, `any`\>[] |

#### Returns

`void`

#### Defined in

[env/type.ts:84](https://github.com/beecode-rs/msh-env/blob/b90f535/src/env/type.ts#L84)

___

### \_validateAllowedValues

▸ **_validateAllowedValues**(`value?`): `void`

#### Parameters

| Name | Type |
| :------ | :------ |
| `value?` | `T` |

#### Returns

`void`

#### Defined in

[env/type.ts:61](https://github.com/beecode-rs/msh-env/blob/b90f535/src/env/type.ts#L61)

___

### allowed

▸ **allowed**(`...args`): `this`

#### Parameters

| Name | Type |
| :------ | :------ |
| `...args` | `T`[] |

#### Returns

`this`

#### Defined in

[env/type.ts:54](https://github.com/beecode-rs/msh-env/blob/b90f535/src/env/type.ts#L54)

___

### default

▸ **default**(`defaultValue`): `this`

#### Parameters

| Name | Type |
| :------ | :------ |
| `defaultValue` | `T` |

#### Returns

`this`

#### Defined in

[env/type.ts:19](https://github.com/beecode-rs/msh-env/blob/b90f535/src/env/type.ts#L19)
