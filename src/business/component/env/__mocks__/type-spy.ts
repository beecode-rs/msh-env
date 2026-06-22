import { vi } from 'vitest'

import { EnvType } from '#src/business/component/env/type.js'

export class EnvTypeSpy<T> extends EnvType<T> {
	resolveValueSpy = vi.fn().mockImplementation(super._resolveValue)
	protected _resolveValue(converted: T | undefined): T | undefined {
		return this.resolveValueSpy(converted)
	}

	validateAllowedValuesSpy = vi.fn().mockImplementation(super._validateAllowedValues)
	protected _validateAllowedValues(value?: T): void {
		return this.validateAllowedValuesSpy(value)
	}

	allowedValuesDoNotContainSpy = vi.fn().mockImplementation(super._allowedValuesDoNotContain)
	protected _allowedValuesDoNotContain(value?: T): boolean {
		return this.allowedValuesDoNotContainSpy(value)
	}

	allowedValuesToStringSpy = vi.fn().mockImplementation(super._allowedValuesToString)
	protected _allowedValuesToString(): string {
		return this.allowedValuesToStringSpy()
	}

	loggerDebugSpy = vi.fn().mockImplementation(super._loggerDebug)
	protected _loggerDebug(msg: string, ...args: Record<string, unknown>[]): void {
		return this.loggerDebugSpy(msg, ...args)
	}

	createErrorSpy = vi.fn().mockImplementation(super._createError)
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
