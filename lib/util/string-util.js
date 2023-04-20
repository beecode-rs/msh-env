"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.StringUtil = void 0;
class StringUtil {
    toSnakeCase(str) {
        return (str &&
            (str.trim().match(/[A-Z]{2,}(?=[A-Z][a-z]+[0-9]*|\b)|[A-Z]?[a-z]+[0-9]*|[A-Z]|[0-9]+/g) || [])
                .map((x) => x.toLowerCase())
                .join('_'));
    }
    toSnakeUpperCase(str) {
        return this.toSnakeCase(str).toUpperCase();
    }
}
exports.StringUtil = StringUtil;
//# sourceMappingURL=string-util.js.map