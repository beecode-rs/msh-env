import { NamingStrategy } from '#src/naming-strategy';
export declare class NamingStrategySuffixName implements NamingStrategy {
    protected readonly _suffix: string;
    constructor(suffix: string);
    names(names: string[]): string[];
}
//# sourceMappingURL=suffix-name.d.ts.map