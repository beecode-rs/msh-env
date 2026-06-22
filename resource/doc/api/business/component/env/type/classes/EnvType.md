[**@beecode/msh-env**](../../../../../README.md)

***

[@beecode/msh-env](../../../../../README.md) / [business/component/env/type](../README.md) / EnvType

# Class: EnvType\<T\>

Defined in: [packages/env/src/business/component/env/type.ts:13](https://github.com/beecode-rs/msh-env/blob/dacc5815ab70f4a82a501d760920b73127d8deb2/src/business/component/env/type.ts#L13)

## Type Parameters

### T

`T`

## Constructors

### Constructor

> **new EnvType**\<`T`\>(`params`): `EnvType`\<`T`\>

Defined in: [packages/env/src/business/component/env/type.ts:20](https://github.com/beecode-rs/msh-env/blob/dacc5815ab70f4a82a501d760920b73127d8deb2/src/business/component/env/type.ts#L20)

#### Parameters

##### params

###### convertStrategy

[`ConvertStrategy`](../../../../service/convert-strategy/interfaces/ConvertStrategy.md)\<`T`\>

###### env

[`Env`](../../classes/Env.md)

#### Returns

`EnvType`\<`T`\>

## Properties

### \_allowedValues

> `protected` **\_allowedValues**: `T`[] = `[]`

Defined in: [packages/env/src/business/component/env/type.ts:18](https://github.com/beecode-rs/msh-env/blob/dacc5815ab70f4a82a501d760920b73127d8deb2/src/business/component/env/type.ts#L18)

***

### \_convertStrategy

> `protected` `readonly` **\_convertStrategy**: [`ConvertStrategy`](../../../../service/convert-strategy/interfaces/ConvertStrategy.md)\<`T`\>

Defined in: [packages/env/src/business/component/env/type.ts:16](https://github.com/beecode-rs/msh-env/blob/dacc5815ab70f4a82a501d760920b73127d8deb2/src/business/component/env/type.ts#L16)

***

### \_defaultValue

> `protected` **\_defaultValue**: `T` \| `undefined` = `undefined`

Defined in: [packages/env/src/business/component/env/type.ts:15](https://github.com/beecode-rs/msh-env/blob/dacc5815ab70f4a82a501d760920b73127d8deb2/src/business/component/env/type.ts#L15)

***

### \_env

> `protected` `readonly` **\_env**: [`Env`](../../classes/Env.md)

Defined in: [packages/env/src/business/component/env/type.ts:17](https://github.com/beecode-rs/msh-env/blob/dacc5815ab70f4a82a501d760920b73127d8deb2/src/business/component/env/type.ts#L17)

***

### \_mode

> `protected` **\_mode**: [`EnvMode`](../enumerations/EnvMode.md) = `EnvMode.REQUIRED`

Defined in: [packages/env/src/business/component/env/type.ts:14](https://github.com/beecode-rs/msh-env/blob/dacc5815ab70f4a82a501d760920b73127d8deb2/src/business/component/env/type.ts#L14)

## Accessors

### \_envName

#### Get Signature

> **get** `protected` **\_envName**(): `string`

Defined in: [packages/env/src/business/component/env/type.ts:118](https://github.com/beecode-rs/msh-env/blob/dacc5815ab70f4a82a501d760920b73127d8deb2/src/business/component/env/type.ts#L118)

##### Returns

`string`

***

### optional

#### Get Signature

> **get** **optional**(): `EnvType`\<`T` \| `undefined`\>

Defined in: [packages/env/src/business/component/env/type.ts:27](https://github.com/beecode-rs/msh-env/blob/dacc5815ab70f4a82a501d760920b73127d8deb2/src/business/component/env/type.ts#L27)

##### Returns

`EnvType`\<`T` \| `undefined`\>

***

### value

#### Get Signature

> **get** **value**(): `T`

Defined in: [packages/env/src/business/component/env/type.ts:49](https://github.com/beecode-rs/msh-env/blob/dacc5815ab70f4a82a501d760920b73127d8deb2/src/business/component/env/type.ts#L49)

##### Returns

`T`

## Methods

### \_allowedValuesDoNotContain()

> `protected` **\_allowedValuesDoNotContain**(`value?`): `boolean`

Defined in: [packages/env/src/business/component/env/type.ts:98](https://github.com/beecode-rs/msh-env/blob/dacc5815ab70f4a82a501d760920b73127d8deb2/src/business/component/env/type.ts#L98)

#### Parameters

##### value?

`T`

#### Returns

`boolean`

***

### \_allowedValuesToString()

> `protected` **\_allowedValuesToString**(): `string`

Defined in: [packages/env/src/business/component/env/type.ts:106](https://github.com/beecode-rs/msh-env/blob/dacc5815ab70f4a82a501d760920b73127d8deb2/src/business/component/env/type.ts#L106)

#### Returns

`string`

***

### \_createError()

> `protected` **\_createError**(`msg`): `Error`

Defined in: [packages/env/src/business/component/env/type.ts:114](https://github.com/beecode-rs/msh-env/blob/dacc5815ab70f4a82a501d760920b73127d8deb2/src/business/component/env/type.ts#L114)

#### Parameters

##### msg

`string`

#### Returns

`Error`

***

### \_loggerDebug()

> `protected` **\_loggerDebug**(`msg`, ...`args`): `void`

Defined in: [packages/env/src/business/component/env/type.ts:110](https://github.com/beecode-rs/msh-env/blob/dacc5815ab70f4a82a501d760920b73127d8deb2/src/business/component/env/type.ts#L110)

#### Parameters

##### msg

`string`

##### args

...`Record`\<`string`, `unknown`\>[]

#### Returns

`void`

***

### \_resolve()

> `protected` **\_resolve**(): `T`

Defined in: [packages/env/src/business/component/env/type.ts:65](https://github.com/beecode-rs/msh-env/blob/dacc5815ab70f4a82a501d760920b73127d8deb2/src/business/component/env/type.ts#L65)

#### Returns

`T`

***

### \_resolveValue()

> `protected` **\_resolveValue**(`converted`): `T` \| `undefined`

Defined in: [packages/env/src/business/component/env/type.ts:78](https://github.com/beecode-rs/msh-env/blob/dacc5815ab70f4a82a501d760920b73127d8deb2/src/business/component/env/type.ts#L78)

#### Parameters

##### converted

`T` \| `undefined`

#### Returns

`T` \| `undefined`

***

### \_tryResolve()

> **\_tryResolve**(): \{ `ok`: `true`; `value`: `T`; \} \| \{ `error`: `Error`; `ok`: `false`; \}

Defined in: [packages/env/src/business/component/env/type.ts:53](https://github.com/beecode-rs/msh-env/blob/dacc5815ab70f4a82a501d760920b73127d8deb2/src/business/component/env/type.ts#L53)

#### Returns

\{ `ok`: `true`; `value`: `T`; \} \| \{ `error`: `Error`; `ok`: `false`; \}

***

### \_validateAllowedValues()

> `protected` **\_validateAllowedValues**(`value?`): `void`

Defined in: [packages/env/src/business/component/env/type.ts:87](https://github.com/beecode-rs/msh-env/blob/dacc5815ab70f4a82a501d760920b73127d8deb2/src/business/component/env/type.ts#L87)

#### Parameters

##### value?

`T`

#### Returns

`void`

***

### allowed()

> **allowed**(...`args`): `this`

Defined in: [packages/env/src/business/component/env/type.ts:42](https://github.com/beecode-rs/msh-env/blob/dacc5815ab70f4a82a501d760920b73127d8deb2/src/business/component/env/type.ts#L42)

#### Parameters

##### args

...`T`[]

#### Returns

`this`

***

### default()

> **default**(`defaultValue`): `this`

Defined in: [packages/env/src/business/component/env/type.ts:34](https://github.com/beecode-rs/msh-env/blob/dacc5815ab70f4a82a501d760920b73127d8deb2/src/business/component/env/type.ts#L34)

#### Parameters

##### defaultValue

`T`

#### Returns

`this`
