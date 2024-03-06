import { ConvertStrategy } from '#/convert-strategy'

export class ConvertStrategyToJson<T> implements ConvertStrategy<T> {
	convert(str?: string): T | undefined {
		if (str === undefined) {
			return undefined
		}
		if (str.trim() === '') {
			return undefined
		}
		try {
			return JSON.parse(str)
		} catch (err: any) {
			throw new Error(`"${str}" is not a json. Error: ${err.message}`)
		}
	}
}
