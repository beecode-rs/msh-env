import { type ConvertStrategy } from '#src/convert-strategy'

export class ConvertStrategyToJson<T> implements ConvertStrategy<T> {
	convert(str?: string): T | undefined {
		if (str === undefined) {
			return undefined
		}
		if (str.trim() === '') {
			return undefined
		}
		try {
			return JSON.parse(str) as T // TODO validate if parsed value is of type T
		} catch (err: unknown) {
			if (err instanceof Error) {
				throw new Error(`"${str}" is not a json. Error: ${err.message}`)
			}
			throw err
		}
	}
}
