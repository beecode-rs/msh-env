import { NamingStrategy } from '../naming/naming-strategy';
export declare class SuffixName implements NamingStrategy {
    protected readonly _suffix: string;
    constructor(suffix: string);
    names(names: string[]): string[];
}
//# sourceMappingURL=suffix-name.d.ts.map