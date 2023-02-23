/// <reference types="jest" />
import { ConvertStrategy } from '../../convert/convert-strategy';
export declare class MockConvertStrategy<T = any> implements ConvertStrategy<T> {
    convert: jest.Mock<T | undefined, [string], any>;
}
//# sourceMappingURL=mock-convert-strategy.d.ts.map