import { vi } from 'vitest'

import { EnvType } from '#src/env/type'

export class EnvTypeSpy<T> extends EnvType<T> {
	validateAllowedValuesSpy = vi.fn<[T | undefined]>().mockImplementation(super._validateAllowedValues)
	protected _validateAllowedValues(value?: T): void {
		return this.validateAllowedValuesSpy(value)
	}

	allowedValuesDoNotContainSpy = vi.fn<[T | undefined]>().mockImplementation(super._allowedValuesDoNotContain)
	protected _allowedValuesDoNotContain(value?: T): boolean {
		return this.allowedValuesDoNotContainSpy(value)
	}

	allowedValuesToStringSpy = vi.fn().mockImplementation(super._allowedValuesToString)
	protected _allowedValuesToString(): string {
		return this.allowedValuesToStringSpy()
	}

	// eslint-disable-next-line @typescript-eslint/no-explicit-any
	loggerDebugSpy = vi.fn<[string, ...Record<string, any>[]]>().mockImplementation(super._loggerDebug)
	// eslint-disable-next-line @typescript-eslint/no-explicit-any
	protected _loggerDebug(msg: string, ...args: Record<string, any>[]): void {
		return this.loggerDebugSpy(msg, ...args)
	}

	createErrorSpy = vi.fn<[string]>().mockImplementation(super._createError)
	protected _createError(msg: string): Error {
		return this.createErrorSpy(msg)
	}

	envNameSpy = vi.fn().mockImplementation(() => {
		return super._envName
	})

	protected get _envName(): string {
		return this.envNameSpy()
	}
}
