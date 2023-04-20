import { EnvFactory } from './env/factory';
import { LocationStrategy } from './location-strategy';
import { NamingStrategy } from './naming-strategy';
export declare const MshEnv: (params?: {
    locationStrategies?: LocationStrategy[];
    namingStrategies?: NamingStrategy[];
}) => (...name: string[]) => EnvFactory;
//# sourceMappingURL=msh-env.d.ts.map