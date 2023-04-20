"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.NamingStrategyPrefixName = void 0;
const logger_1 = require("../util/logger");
class NamingStrategyPrefixName {
    constructor(prefix) {
        this._prefix = prefix;
    }
    names(names) {
        const resultNames = [...names.map((n) => [this._prefix, n].join(''))];
        (0, logger_1.logger)().debug(`Original names: [${names.join(', ')}], prefixed names : [${resultNames.join(', ')}]`);
        return resultNames;
    }
}
exports.NamingStrategyPrefixName = NamingStrategyPrefixName;
//# sourceMappingURL=prefix-name.js.map