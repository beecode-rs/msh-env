"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ConvertStrategyToString = void 0;
class ConvertStrategyToString {
    convert(str) {
        if (str === undefined) {
            return undefined;
        }
        if (str.trim() === '') {
            return undefined;
        }
        return str;
    }
}
exports.ConvertStrategyToString = ConvertStrategyToString;
//# sourceMappingURL=to-string.js.map