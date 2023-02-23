import minimist from 'minimist';
import { Options } from 'minimist-options';
import { LocationStrategy } from '../location/location-strategy';
export declare class CliArgsMinimistLocation<T extends minimist.ParsedArgs> implements LocationStrategy {
    protected readonly _miniOpts: minimist.Opts;
    protected readonly _args: T;
    constructor(params?: {
        options?: Options;
        args?: string[];
    });
    valueByName(name: string): string | undefined;
}
//# sourceMappingURL=cli-args-minimist-location.d.ts.map