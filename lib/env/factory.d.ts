import { Env } from '../env.js';
import { EnvType } from '../env/type.js';
import { type LocationStrategy } from '../location-strategy.js';
import { type NamingStrategy } from '../naming-strategy.js';
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