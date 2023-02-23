import { ConvertStrategy } from 'src/convert/convert-strategy'

export class MockConvertStrategy<T = any> implements ConvertStrategy<T> {
  public convert = jest.fn<T | undefined, [string]>()
}
