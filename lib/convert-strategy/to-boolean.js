"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ConvertStrategyToBoolean = void 0;
class ConvertStrategyToBoolean {
    convert(str) {
        if (str === undefined) {
            return undefined;
        }
        const strLower = str.toLowerCase();
        if (strLower === 'true') {
            return true;
        }
        else if (strLower === 'false') {
            return false;
        }
        return undefined;
    }
}
exports.ConvertStrategyToBoolean = ConvertStrategyToBoolean;
//# sourceMappingURL=to-boolean.js.map