import { type NamingStrategy } from '../naming-strategy.js';
export declare class NamingStrategyPrefixName implements NamingStrategy {
    protected readonly _prefix: string;
    constructor(prefix: string);
    names(names: string[]): string[];
}
//# sourceMappingURL=prefix-name.d.ts.map