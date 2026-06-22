import { describe, expect, it } from 'vitest'

import { MshEnvResolverError } from '#src/business/component/env-resolver-error.js'

describe('MshEnvResolverError', () => {
	describe('name', () => {
		it('should be MshEnvResolverError', () => {
			const error = new MshEnvResolverError([])

			expect(error.name).toEqual('MshEnvResolverError')
		})
	})

	describe('message', () => {
		it('should format the summary with header, failure lines and hint', () => {
			const failures = [
				{ error: new Error('Env[API_KEY] must have value defined'), path: ['apiKey'] },
				{ error: new Error('Env[DB_HOST] must have value defined'), path: ['db', 'host'] },
			]

			const error = new MshEnvResolverError(failures)

			expect(error.message).toContain('msh-env: 2 environment variable(s) failed to resolve:')
			expect(error.message).toContain('  • apiKey -> Env[API_KEY] must have value defined')
			expect(error.message).toContain('  • db.host -> Env[DB_HOST] must have value defined')
			expect(error.message).toContain(
				'Set the missing variables, fix the failing values, or mark them .optional / .default(...).'
			)
		})

		it('should reflect the number of failures in the header count for one failure', () => {
			const failures = [{ error: new Error('Env[PORT] must have value defined'), path: ['port'] }]

			const error = new MshEnvResolverError(failures)

			expect(error.message).toContain('msh-env: 1 environment variable(s) failed to resolve:')
			expect(error.message).toContain('  • port -> Env[PORT] must have value defined')
		})

		it('should render array index path segments as dotted numeric segments', () => {
			const failures = [{ error: new Error('Env[PORTS] must have value defined'), path: ['ports', 0] }]

			const error = new MshEnvResolverError(failures)

			expect(error.message).toContain('  • ports.0 -> Env[PORTS] must have value defined')
		})
	})

	describe('failures', () => {
		it('should be the exact array passed to the constructor', () => {
			const failures = [
				{ error: new Error('Env[API_KEY] must have value defined'), path: ['apiKey'] },
				{ error: new Error('Env[DB_HOST] must have value defined'), path: ['db', 'host'] },
			]

			const error = new MshEnvResolverError(failures)

			expect(error.failures).toBe(failures)
		})
	})
})
