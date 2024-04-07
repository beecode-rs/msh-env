import { ConvertStrategyBase64ToString } from '../convert-strategy/base64-to-string.js';
import { ConvertStrategyToBoolean } from '../convert-strategy/to-boolean.js';
import { ConvertStrategyToJson } from '../convert-strategy/to-json.js';
import { ConvertStrategyToNumber } from '../convert-strategy/to-number.js';
import { ConvertStrategyToString } from '../convert-strategy/to-string.js';
import { Env } from '../env.js';
import { EnvType } from '../env/type.js';
export class EnvFactory {
    _env;
    constructor(params) {
        const { names, locationStrategies, namingStrategies } = params;
        this._env = new Env({ locationStrategies, names, namingStrategies });
    }
    get string() {
        return new EnvType({ convertStrategy: new ConvertStrategyToString(), env: this._env });
    }
    get boolean() {
        return new EnvType({ convertStrategy: new ConvertStrategyToBoolean(), env: this._env });
    }
    get number() {
        return new EnvType({ convertStrategy: new ConvertStrategyToNumber(), env: this._env });
    }
    json() {
        return new EnvType({ convertStrategy: new ConvertStrategyToJson(), env: this._env });
    }
    get base64() {
        return new EnvType({ convertStrategy: new ConvertStrategyBase64ToString(), env: this._env });
    }
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZmFjdG9yeS5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uL3NyYy9lbnYvZmFjdG9yeS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQSxPQUFPLEVBQUUsNkJBQTZCLEVBQUUsTUFBTSx3Q0FBd0MsQ0FBQTtBQUN0RixPQUFPLEVBQUUsd0JBQXdCLEVBQUUsTUFBTSxrQ0FBa0MsQ0FBQTtBQUMzRSxPQUFPLEVBQUUscUJBQXFCLEVBQUUsTUFBTSwrQkFBK0IsQ0FBQTtBQUNyRSxPQUFPLEVBQUUsdUJBQXVCLEVBQUUsTUFBTSxpQ0FBaUMsQ0FBQTtBQUN6RSxPQUFPLEVBQUUsdUJBQXVCLEVBQUUsTUFBTSxpQ0FBaUMsQ0FBQTtBQUN6RSxPQUFPLEVBQUUsR0FBRyxFQUFFLE1BQU0sVUFBVSxDQUFBO0FBQzlCLE9BQU8sRUFBRSxPQUFPLEVBQUUsTUFBTSxlQUFlLENBQUE7QUFJdkMsTUFBTSxPQUFPLFVBQVU7SUFDSCxJQUFJLENBQUs7SUFFNUIsWUFBWSxNQUF1RztRQUNsSCxNQUFNLEVBQUUsS0FBSyxFQUFFLGtCQUFrQixFQUFFLGdCQUFnQixFQUFFLEdBQUcsTUFBTSxDQUFBO1FBQzlELElBQUksQ0FBQyxJQUFJLEdBQUcsSUFBSSxHQUFHLENBQUMsRUFBRSxrQkFBa0IsRUFBRSxLQUFLLEVBQUUsZ0JBQWdCLEVBQUUsQ0FBQyxDQUFBO0lBQ3JFLENBQUM7SUFFRCxJQUFJLE1BQU07UUFDVCxPQUFPLElBQUksT0FBTyxDQUFTLEVBQUUsZUFBZSxFQUFFLElBQUksdUJBQXVCLEVBQUUsRUFBRSxHQUFHLEVBQUUsSUFBSSxDQUFDLElBQUksRUFBRSxDQUFDLENBQUE7SUFDL0YsQ0FBQztJQUVELElBQUksT0FBTztRQUNWLE9BQU8sSUFBSSxPQUFPLENBQVUsRUFBRSxlQUFlLEVBQUUsSUFBSSx3QkFBd0IsRUFBRSxFQUFFLEdBQUcsRUFBRSxJQUFJLENBQUMsSUFBSSxFQUFFLENBQUMsQ0FBQTtJQUNqRyxDQUFDO0lBRUQsSUFBSSxNQUFNO1FBQ1QsT0FBTyxJQUFJLE9BQU8sQ0FBUyxFQUFFLGVBQWUsRUFBRSxJQUFJLHVCQUF1QixFQUFFLEVBQUUsR0FBRyxFQUFFLElBQUksQ0FBQyxJQUFJLEVBQUUsQ0FBQyxDQUFBO0lBQy9GLENBQUM7SUFFRCxJQUFJO1FBQ0gsT0FBTyxJQUFJLE9BQU8sQ0FBSSxFQUFFLGVBQWUsRUFBRSxJQUFJLHFCQUFxQixFQUFLLEVBQUUsR0FBRyxFQUFFLElBQUksQ0FBQyxJQUFJLEVBQUUsQ0FBQyxDQUFBO0lBQzNGLENBQUM7SUFFRCxJQUFJLE1BQU07UUFDVCxPQUFPLElBQUksT0FBTyxDQUFTLEVBQUUsZUFBZSxFQUFFLElBQUksNkJBQTZCLEVBQUUsRUFBRSxHQUFHLEVBQUUsSUFBSSxDQUFDLElBQUksRUFBRSxDQUFDLENBQUE7SUFDckcsQ0FBQztDQUNEIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgQ29udmVydFN0cmF0ZWd5QmFzZTY0VG9TdHJpbmcgfSBmcm9tICcjc3JjL2NvbnZlcnQtc3RyYXRlZ3kvYmFzZTY0LXRvLXN0cmluZydcbmltcG9ydCB7IENvbnZlcnRTdHJhdGVneVRvQm9vbGVhbiB9IGZyb20gJyNzcmMvY29udmVydC1zdHJhdGVneS90by1ib29sZWFuJ1xuaW1wb3J0IHsgQ29udmVydFN0cmF0ZWd5VG9Kc29uIH0gZnJvbSAnI3NyYy9jb252ZXJ0LXN0cmF0ZWd5L3RvLWpzb24nXG5pbXBvcnQgeyBDb252ZXJ0U3RyYXRlZ3lUb051bWJlciB9IGZyb20gJyNzcmMvY29udmVydC1zdHJhdGVneS90by1udW1iZXInXG5pbXBvcnQgeyBDb252ZXJ0U3RyYXRlZ3lUb1N0cmluZyB9IGZyb20gJyNzcmMvY29udmVydC1zdHJhdGVneS90by1zdHJpbmcnXG5pbXBvcnQgeyBFbnYgfSBmcm9tICcjc3JjL2VudidcbmltcG9ydCB7IEVudlR5cGUgfSBmcm9tICcjc3JjL2Vudi90eXBlJ1xuaW1wb3J0IHsgTG9jYXRpb25TdHJhdGVneSB9IGZyb20gJyNzcmMvbG9jYXRpb24tc3RyYXRlZ3knXG5pbXBvcnQgeyBOYW1pbmdTdHJhdGVneSB9IGZyb20gJyNzcmMvbmFtaW5nLXN0cmF0ZWd5J1xuXG5leHBvcnQgY2xhc3MgRW52RmFjdG9yeSB7XG5cdHByb3RlY3RlZCByZWFkb25seSBfZW52OiBFbnZcblxuXHRjb25zdHJ1Y3RvcihwYXJhbXM6IHsgbmFtZXM6IHN0cmluZ1tdOyBsb2NhdGlvblN0cmF0ZWdpZXM6IExvY2F0aW9uU3RyYXRlZ3lbXTsgbmFtaW5nU3RyYXRlZ2llczogTmFtaW5nU3RyYXRlZ3lbXSB9KSB7XG5cdFx0Y29uc3QgeyBuYW1lcywgbG9jYXRpb25TdHJhdGVnaWVzLCBuYW1pbmdTdHJhdGVnaWVzIH0gPSBwYXJhbXNcblx0XHR0aGlzLl9lbnYgPSBuZXcgRW52KHsgbG9jYXRpb25TdHJhdGVnaWVzLCBuYW1lcywgbmFtaW5nU3RyYXRlZ2llcyB9KVxuXHR9XG5cblx0Z2V0IHN0cmluZygpOiBFbnZUeXBlPHN0cmluZz4ge1xuXHRcdHJldHVybiBuZXcgRW52VHlwZTxzdHJpbmc+KHsgY29udmVydFN0cmF0ZWd5OiBuZXcgQ29udmVydFN0cmF0ZWd5VG9TdHJpbmcoKSwgZW52OiB0aGlzLl9lbnYgfSlcblx0fVxuXG5cdGdldCBib29sZWFuKCk6IEVudlR5cGU8Ym9vbGVhbj4ge1xuXHRcdHJldHVybiBuZXcgRW52VHlwZTxib29sZWFuPih7IGNvbnZlcnRTdHJhdGVneTogbmV3IENvbnZlcnRTdHJhdGVneVRvQm9vbGVhbigpLCBlbnY6IHRoaXMuX2VudiB9KVxuXHR9XG5cblx0Z2V0IG51bWJlcigpOiBFbnZUeXBlPG51bWJlcj4ge1xuXHRcdHJldHVybiBuZXcgRW52VHlwZTxudW1iZXI+KHsgY29udmVydFN0cmF0ZWd5OiBuZXcgQ29udmVydFN0cmF0ZWd5VG9OdW1iZXIoKSwgZW52OiB0aGlzLl9lbnYgfSlcblx0fVxuXG5cdGpzb248VD4oKTogRW52VHlwZTxUPiB7XG5cdFx0cmV0dXJuIG5ldyBFbnZUeXBlPFQ+KHsgY29udmVydFN0cmF0ZWd5OiBuZXcgQ29udmVydFN0cmF0ZWd5VG9Kc29uPFQ+KCksIGVudjogdGhpcy5fZW52IH0pXG5cdH1cblxuXHRnZXQgYmFzZTY0KCk6IEVudlR5cGU8c3RyaW5nPiB7XG5cdFx0cmV0dXJuIG5ldyBFbnZUeXBlPHN0cmluZz4oeyBjb252ZXJ0U3RyYXRlZ3k6IG5ldyBDb252ZXJ0U3RyYXRlZ3lCYXNlNjRUb1N0cmluZygpLCBlbnY6IHRoaXMuX2VudiB9KVxuXHR9XG59XG4iXX0=