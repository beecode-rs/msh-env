"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ConvertStrategyBase64ToString = void 0;
const base_64_1 = require("base-64");
class ConvertStrategyBase64ToString {
    convert(str) {
        if (str === undefined) {
            return undefined;
        }
        if (str.trim() === '') {
            return undefined;
        }
        try {
            return (0, base_64_1.decode)(str);
        }
        catch (err) {
            throw new Error(`"${str}" is not a base64. Error: ${err.message}`);
        }
    }
}
exports.ConvertStrategyBase64ToString = ConvertStrategyBase64ToString;
//# sourceMappingURL=base64-to-string.js.map