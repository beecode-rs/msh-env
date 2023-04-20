"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.MshEnv = void 0;
const factory_1 = require("./env/factory");
const environment_1 = require("./location-strategy/environment");
const simple_name_1 = require("./naming-strategy/simple-name");
const logger_1 = require("./util/logger");
const MshEnv = (params) => {
    const { locationStrategies = [new environment_1.LocationStrategyEnvironment()], namingStrategies = [new simple_name_1.NamingStrategySimpleName()] } = params !== null && params !== void 0 ? params : {};
    return (...names) => {
        (0, logger_1.logger)().debug(`Initiate env: [${names.join(', ')}]`);
        return new factory_1.EnvFactory({ locationStrategies, namingStrategies, names: [...names] });
    };
};
exports.MshEnv = MshEnv;
//# sourceMappingURL=msh-env.js.map