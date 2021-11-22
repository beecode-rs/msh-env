import { LocationStrategy } from '../location/location-strategy';
import { NamingStrategy } from '../naming/naming-strategy';
export declare class Env {
    protected readonly _names: string[];
    protected readonly _locationStrategies: LocationStrategy[];
    protected readonly _namingStrategies: NamingStrategy[];
    get Names(): string[];
    constructor(params: {
        names: string[];
        locationStrategies: LocationStrategy[];
        namingStrategies: NamingStrategy[];
    });
    protected _envNames(): string[];
    envValue(): string | undefined;
}
//# sourceMappingURL=env.d.ts.map