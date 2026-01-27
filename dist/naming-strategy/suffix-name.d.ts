import { type NamingStrategy } from '../naming-strategy.js';
export declare class NamingStrategySuffixName implements NamingStrategy {
    protected readonly _suffix: string;
    constructor(suffix: string);
    names(names: string[]): string[];
}
//# sourceMappingURL=suffix-name.d.ts.map