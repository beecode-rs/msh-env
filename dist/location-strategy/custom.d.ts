import { type LocationStrategy } from '#src/location-strategy';
export declare class LocationStrategyCustom implements LocationStrategy {
    protected readonly _env: Record<string, string>;
    constructor(env: Record<string, string>);
    valueByName(name: string): string | undefined;
}
//# sourceMappingURL=custom.d.ts.map