"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.EnvFactory = void 0;
const base64_to_string_1 = require("../convert-strategy/base64-to-string");
const to_boolean_1 = require("../convert-strategy/to-boolean");
const to_json_1 = require("../convert-strategy/to-json");
const to_number_1 = require("../convert-strategy/to-number");
const to_string_1 = require("../convert-strategy/to-string");
const env_1 = require("../env");
const type_1 = require("../env/type");
class EnvFactory {
    constructor(params) {
        const { names, locationStrategies, namingStrategies } = params;
        this._env = new env_1.Env({ locationStrategies, names, namingStrategies });
    }
    get string() {
        return new type_1.EnvType({ convertStrategy: new to_string_1.ConvertStrategyToString(), env: this._env });
    }
    get boolean() {
        return new type_1.EnvType({ convertStrategy: new to_boolean_1.ConvertStrategyToBoolean(), env: this._env });
    }
    get number() {
        return new type_1.EnvType({ convertStrategy: new to_number_1.ConvertStrategyToNumber(), env: this._env });
    }
    json() {
        return new type_1.EnvType({ convertStrategy: new to_json_1.ConvertStrategyToJson(), env: this._env });
    }
    get base64() {
        return new type_1.EnvType({ convertStrategy: new base64_to_string_1.ConvertStrategyBase64ToString(), env: this._env });
    }
}
exports.EnvFactory = EnvFactory;
//# sourceMappingURL=factory.js.map