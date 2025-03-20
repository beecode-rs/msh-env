import { type ConvertStrategy } from '../convert-strategy.js';
import { type Env } from '../env.js';
export declare class EnvType<T> {
    protected _defaultValue: T | undefined;
    protected readonly _convertStrategy: ConvertStrategy<T>;
    protected readonly _env: Env;
    protected _allowedValues: T[];
    constructor(params: {
        convertStrategy: ConvertStrategy<T>;
        env: Env;
    });
    default(defaultValue: T): this;
    get optional(): T | undefined;
    get required(): T;
    allowed(...args: T[]): this;
    protected _validateAllowedValues(value?: T): void;
    protected _allowedValuesDoNotContain(value?: T): boolean;
    protected _allowedValuesToString(): string;
    protected _loggerDebug(msg: string, ...args: Record<string, unknown>[]): void;
    protected _createError(msg: string): Error;
    protected get _envName(): string;
}
//# sourceMappingURL=type.d.ts.map