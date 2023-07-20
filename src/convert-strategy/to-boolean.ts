import { ConvertStrategy } from '#/convert-strategy/index'

export class ConvertStrategyToBoolean implements ConvertStrategy<boolean> {
	convert(str?: string): boolean | undefined {
		if (str === undefined) {
			return undefined
		}
		const strLower = str.toLowerCase()
		if (strLower === 'true') {
			return true
		} else if (strLower === 'false') {
			return false
		}

		return undefined
	}
}
