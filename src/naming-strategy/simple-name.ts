import { type NamingStrategy } from '#src/naming-strategy'

export class NamingStrategySimpleName implements NamingStrategy {
	names(names: string | string[]): string[] {
		return [...names]
	}
}
