export interface MshEnvResolverFailure {
	path: PropertyKey[]
	error: Error
}

export class MshEnvResolverError extends Error {
	constructor(readonly failures: MshEnvResolverFailure[]) {
		super()
		this.name = 'MshEnvResolverError'
		this.message = this._formatSummary(failures)
	}

	protected _formatSummary(failures: MshEnvResolverFailure[]): string {
		const lines = failures.map(({ path, error }) => {
			return `  • ${this._pathToString(path)} -> ${error.message}`
		})

		return [
			`msh-env: ${String(failures.length)} environment variable(s) failed to resolve:`,
			...lines,
			'',
			'Set the missing variables, fix the failing values, or mark them .optional / .default(...).',
		].join('\n')
	}

	protected _pathToString(path: PropertyKey[]): string {
		return path
			.map((p) => {
				return String(p)
			})
			.join('.')
	}
}
