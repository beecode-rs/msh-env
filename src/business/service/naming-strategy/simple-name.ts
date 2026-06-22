import { type NamingStrategy } from '#src/business/service/naming-strategy.js'

export class NamingStrategySimpleName implements NamingStrategy {
	names(names: string | string[]): string[] {
		if (Array.isArray(names)) {
			return [...names]
		}

		return [names]
	}
}
