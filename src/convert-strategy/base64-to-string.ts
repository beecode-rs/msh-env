import { decode } from 'base-64'
import { ConvertStrategy } from 'src/convert-strategy'

export class ConvertStrategyBase64ToString implements ConvertStrategy<string> {
	convert(str?: string): string | undefined {
		if (str === undefined) {
			return undefined
		}
		if (str.trim() === '') {
			return undefined
		}
		try {
			return decode(str)
		} catch (err: any) {
			throw new Error(`"${str}" is not a base64. Error: ${err.message}`)
		}
	}
}
