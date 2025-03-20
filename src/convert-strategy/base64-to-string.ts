import { Base64 } from 'js-base64'

import { type ConvertStrategy } from '#src/convert-strategy'

export class ConvertStrategyBase64ToString implements ConvertStrategy<string> {
	convert(str?: string): string | undefined {
		if (str === undefined) {
			return undefined
		}
		if (str.trim() === '') {
			return undefined
		}
		try {
			if (!Base64.isValid(str)) {
				throw new Error('Invalid character: the string to be decoded is not correctly encoded.')
			}

			const decodedString = Base64.decode(str)
			if (decodedString.trim() === '') {
				return undefined
			}

			return decodedString
		} catch (err: unknown) {
			if (err instanceof Error) {
				throw new Error(`"${str}" is not a base64. Error: ${err.message}`)
			}
			throw err
		}
	}
}
