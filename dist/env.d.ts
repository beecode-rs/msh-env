import { LocationStrategy } from '#src/location-strategy';
import { NamingStrategy } from '#src/naming-strategy';
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
//# sourceMappingURL=env.d.ts.map