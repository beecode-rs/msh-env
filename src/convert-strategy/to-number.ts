import { type ConvertStrategy } from '#src/convert-strategy'

export class ConvertStrategyToNumber implements ConvertStrategy<number> {
	convert(str?: string): number | undefined {
		if (str === undefined) {
			return undefined
		}
		if (str.trim() === '') {
			return undefined
		}
		const convertedValue = Number(str)
		if (isNaN(convertedValue)) {
			throw new Error(`"${str}" is not a number`)
		}

		return convertedValue
	}
}
