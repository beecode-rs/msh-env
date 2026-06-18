import { type ConvertStrategy } from '#src/business/service/convert-strategy.js'

export class ConvertStrategyToString implements ConvertStrategy<string> {
	convert(str?: string): string | undefined {
		if (str === undefined) {
			return undefined
		}
		if (str.trim() === '') {
			return undefined
		}

		return str
	}
}
