import { NamingStrategy } from '#/naming-strategy/index'

export class NamingStrategySimpleName implements NamingStrategy {
	names(names: string | string[]): string[] {
		return [...names]
	}
}
