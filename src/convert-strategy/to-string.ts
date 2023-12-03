import { ConvertStrategy } from '#/convert-strategy'

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
