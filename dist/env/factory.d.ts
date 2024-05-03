import { Env } from '#src/env';
import { EnvType } from '#src/env/type';
import { LocationStrategy } from '#src/location-strategy';
import { NamingStrategy } from '#src/naming-strategy';
export declare class EnvFactory {
    protected readonly _env: Env;
    constructor(params: {
        names: string[];
        locationStrategies: LocationStrategy[];
        namingStrategies: NamingStrategy[];
    });
    get string(): EnvType<string>;
    get boolean(): EnvType<boolean>;
    get number(): EnvType<number>;
    json<T>(): EnvType<T>;
    get base64(): EnvType<string>;
}
//# sourceMappingURL=factory.d.ts.map