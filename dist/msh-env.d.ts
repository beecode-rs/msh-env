import { EnvFactory } from './env/factory.js';
import { type LocationStrategy } from './location-strategy.js';
import { type NamingStrategy } from './naming-strategy.js';
export type MshEnv = (...name: string[]) => EnvFactory;
export declare const mshEnv: (params?: {
    locationStrategies?: LocationStrategy[];
    namingStrategies?: NamingStrategy[];
}) => MshEnv;
//# sourceMappingURL=msh-env.d.ts.map