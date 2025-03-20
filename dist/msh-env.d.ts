import { EnvFactory } from '#src/env/factory';
import { type LocationStrategy } from '#src/location-strategy';
import { type NamingStrategy } from '#src/naming-strategy';
export type MshEnv = (...name: string[]) => EnvFactory;
export declare const mshEnv: (params?: {
    locationStrategies?: LocationStrategy[];
    namingStrategies?: NamingStrategy[];
}) => MshEnv;
//# sourceMappingURL=msh-env.d.ts.map