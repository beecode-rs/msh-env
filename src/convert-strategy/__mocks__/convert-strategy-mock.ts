import { jest } from '@jest/globals'

import { ConvertStrategy } from '#/convert-strategy'

export class ConvertStrategyMock<T = any> implements ConvertStrategy<T> {
	convert = jest.fn<(params: string) => T | undefined>()
}
