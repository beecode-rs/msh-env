import minimist from 'minimist';
import { type Options } from 'minimist-options';
import { type LocationStrategy } from '../location-strategy.js';
export declare class LocationStrategyCliArgsMinimist<T extends minimist.ParsedArgs> implements LocationStrategy {
    protected readonly _miniOpts: minimist.Opts;
    protected readonly _args: T;
    constructor(params?: {
        options?: Options;
        args?: string[];
    });
    valueByName(name: string): string | undefined;
}
//# sourceMappingURL=cli-args-minimist.d.ts.map