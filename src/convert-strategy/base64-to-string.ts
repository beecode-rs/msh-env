import { Base64 } from 'js-base64'

import { ConvertStrategy } from '#/convert-strategy/index.js'

export class ConvertStrategyBase64ToString implements ConvertStrategy<string> {
	convert(str?: string): string | undefined {
		if (str === undefined) {
			return undefined
		}
		if (str.trim() === '') {
			return undefined
		}
		try {
			return Base64.decode(str)
		} catch (err: any) {
			throw new Error(`"${str}" is not a base64. Error: ${err.message}`)
		}
	}
}
