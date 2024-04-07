"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.setEnvLogger = exports.logger = void 0;
var _void = require("@beecode/msh-logger/logger-strategy/void");
var _cache = {
  logger: new _void.LoggerStrategyVoid()
};
var setEnvLogger = exports.setEnvLogger = function setEnvLogger(logger) {
  _cache.logger = logger;
};
var logger = exports.logger = function logger() {
  return _cache.logger;
};