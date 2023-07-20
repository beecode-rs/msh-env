import { NamingStrategy } from '#/naming-strategy/index.js'

export class NamingStrategySimpleName implements NamingStrategy {
	names(names: string | string[]): string[] {
		return [...names]
	}
}
