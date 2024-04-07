[@beecode/msh-env](../README.md) / msh-env

# Module: msh-env

## Table of contents

### Type Aliases

- [MshEnv](msh_env.md#mshenv)

### Functions

- [mshEnv](msh_env.md#mshenv-1)

## Type Aliases

### MshEnv

Ƭ **MshEnv**: (...`name`: `string`[]) => [`EnvFactory`](../classes/env_factory.EnvFactory.md)

#### Type declaration

▸ (`...name`): [`EnvFactory`](../classes/env_factory.EnvFactory.md)

##### Parameters

| Name | Type |
| :------ | :------ |
| `...name` | `string`[] |

##### Returns

[`EnvFactory`](../classes/env_factory.EnvFactory.md)

#### Defined in

[msh-env.ts:8](https://github.com/beecode-rs/msh-env/blob/b90f535/src/msh-env.ts#L8)

## Functions

### mshEnv

▸ **mshEnv**(`params?`): [`MshEnv`](msh_env.md#mshenv)

#### Parameters

| Name | Type |
| :------ | :------ |
| `params?` | `Object` |
| `params.locationStrategies?` | [`LocationStrategy`](../interfaces/location_strategy.LocationStrategy.md)[] |
| `params.namingStrategies?` | [`NamingStrategy`](../interfaces/naming_strategy.NamingStrategy.md)[] |

#### Returns

[`MshEnv`](msh_env.md#mshenv)

#### Defined in

[msh-env.ts:10](https://github.com/beecode-rs/msh-env/blob/b90f535/src/msh-env.ts#L10)
