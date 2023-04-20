"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.LocationStrategyEnvironment = void 0;
class LocationStrategyEnvironment {
    valueByName(name) {
        return process.env[name];
    }
}
exports.LocationStrategyEnvironment = LocationStrategyEnvironment;
//# sourceMappingURL=environment.js.map