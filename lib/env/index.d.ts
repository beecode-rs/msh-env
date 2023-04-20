import { LocationStrategy } from '../location-strategy';
import { NamingStrategy } from '../naming-strategy';
export declare class Env {
    readonly names: string[];
    protected readonly _locationStrategies: LocationStrategy[];
    protected readonly _namingStrategies: NamingStrategy[];
    constructor(params: {
        names: string[];
        locationStrategies: LocationStrategy[];
        namingStrategies: NamingStrategy[];
    });
    protected _envNames(): string[];
    envValue(): string | undefined;
}
//# sourceMappingURL=index.d.ts.map