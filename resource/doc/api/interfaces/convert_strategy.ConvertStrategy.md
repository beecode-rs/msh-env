[@beecode/msh-env](../README.md) / [convert-strategy](../modules/convert_strategy.md) / ConvertStrategy

# Interface: ConvertStrategy\<T\>

[convert-strategy](../modules/convert_strategy.md).ConvertStrategy

## Type parameters

| Name |
| :------ |
| `T` |

## Implemented by

- [`ConvertStrategyBase64ToString`](../classes/convert_strategy_base64_to_string.ConvertStrategyBase64ToString.md)
- [`ConvertStrategyToBoolean`](../classes/convert_strategy_to_boolean.ConvertStrategyToBoolean.md)
- [`ConvertStrategyToJson`](../classes/convert_strategy_to_json.ConvertStrategyToJson.md)
- [`ConvertStrategyToNumber`](../classes/convert_strategy_to_number.ConvertStrategyToNumber.md)
- [`ConvertStrategyToString`](../classes/convert_strategy_to_string.ConvertStrategyToString.md)

## Table of contents

### Methods

- [convert](convert_strategy.ConvertStrategy.md#convert)

## Methods

### convert

▸ **convert**(`str?`): `undefined` \| `T`

#### Parameters

| Name | Type |
| :------ | :------ |
| `str?` | `string` |

#### Returns

`undefined` \| `T`

#### Defined in

[convert-strategy.ts:2](https://github.com/beecode-rs/msh-env/blob/b90f535/src/convert-strategy.ts#L2)
