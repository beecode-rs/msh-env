"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.LocationStrategyDockerSecrets = void 0;
const fs_1 = __importDefault(require("fs"));
const util_1 = __importDefault(require("../util"));
class LocationStrategyDockerSecrets {
    valueByName(name) {
        try {
            return fs_1.default.readFileSync(util_1.default.format('/run/secrets/%s', name), 'utf8').trim();
        }
        catch (e) {
            return undefined;
        }
    }
}
exports.LocationStrategyDockerSecrets = LocationStrategyDockerSecrets;
//# sourceMappingURL=docker-secrets.js.map