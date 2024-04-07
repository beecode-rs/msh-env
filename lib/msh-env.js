"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.mshEnv = void 0;
var _factory = require("./env/factory.js");
var _environment = require("./location-strategy/environment.js");
var _simpleName = require("./naming-strategy/simple-name.js");
var _logger = require("./util/logger.js");
var mshEnv = exports.mshEnv = function mshEnv(params) {
  var _ref = params !== null && params !== void 0 ? params : {},
    _ref$locationStrategi = _ref.locationStrategies,
    locationStrategies = _ref$locationStrategi === void 0 ? [new _environment.LocationStrategyEnvironment()] : _ref$locationStrategi,
    _ref$namingStrategies = _ref.namingStrategies,
    namingStrategies = _ref$namingStrategies === void 0 ? [new _simpleName.NamingStrategySimpleName()] : _ref$namingStrategies;
  return function () {
    for (var _len = arguments.length, names = new Array(_len), _key = 0; _key < _len; _key++) {
      names[_key] = arguments[_key];
    }
    (0, _logger.logger)().debug("Initiate env: [".concat(names.join(', '), "]"));
    return new _factory.EnvFactory({
      locationStrategies: locationStrategies,
      names: [].concat(names),
      namingStrategies: namingStrategies
    });
  };
};