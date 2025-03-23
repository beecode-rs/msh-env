export class StringUtil {
	toSnakeCase(str: string): string {
		return (
			str &&
			//eslint-disable-next-line @typescript-eslint/prefer-nullish-coalescing
			(str.trim().match(/[A-Z]{2,}(?=[A-Z][a-z]+[0-9]*|\b)|[A-Z]?[a-z]+[0-9]*|[A-Z]|[0-9]+/g) || [])
				.map((x) => x.toLowerCase())
				.join('_')
		)
	}

	toSnakeUpperCase(str: string): string {
		return this.toSnakeCase(str).toUpperCase()
	}
}
