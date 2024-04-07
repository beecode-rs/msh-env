"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.EnvFactory = void 0;
var _base64ToString = require("../convert-strategy/base64-to-string.js");
var _toBoolean = require("../convert-strategy/to-boolean.js");
var _toJson = require("../convert-strategy/to-json.js");
var _toNumber = require("../convert-strategy/to-number.js");
var _toString = require("../convert-strategy/to-string.js");
var _env = require("../env.js");
var _type = require("../env/type.js");
function _typeof(o) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (o) { return typeof o; } : function (o) { return o && "function" == typeof Symbol && o.constructor === Symbol && o !== Symbol.prototype ? "symbol" : typeof o; }, _typeof(o); }
function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }
function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, _toPropertyKey(descriptor.key), descriptor); } }
function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); Object.defineProperty(Constructor, "prototype", { writable: false }); return Constructor; }
function _toPropertyKey(t) { var i = _toPrimitive(t, "string"); return "symbol" == _typeof(i) ? i : i + ""; }
function _toPrimitive(t, r) { if ("object" != _typeof(t) || !t) return t; var e = t[Symbol.toPrimitive]; if (void 0 !== e) { var i = e.call(t, r || "default"); if ("object" != _typeof(i)) return i; throw new TypeError("@@toPrimitive must return a primitive value."); } return ("string" === r ? String : Number)(t); }
var EnvFactory = exports.EnvFactory = /*#__PURE__*/function () {
  function EnvFactory(params) {
    _classCallCheck(this, EnvFactory);
    var names = params.names,
      locationStrategies = params.locationStrategies,
      namingStrategies = params.namingStrategies;
    this._env = new _env.Env({
      locationStrategies: locationStrategies,
      names: names,
      namingStrategies: namingStrategies
    });
  }
  return _createClass(EnvFactory, [{
    key: "string",
    get: function get() {
      return new _type.EnvType({
        convertStrategy: new _toString.ConvertStrategyToString(),
        env: this._env
      });
    }
  }, {
    key: "boolean",
    get: function get() {
      return new _type.EnvType({
        convertStrategy: new _toBoolean.ConvertStrategyToBoolean(),
        env: this._env
      });
    }
  }, {
    key: "number",
    get: function get() {
      return new _type.EnvType({
        convertStrategy: new _toNumber.ConvertStrategyToNumber(),
        env: this._env
      });
    }
  }, {
    key: "json",
    value: function json() {
      return new _type.EnvType({
        convertStrategy: new _toJson.ConvertStrategyToJson(),
        env: this._env
      });
    }
  }, {
    key: "base64",
    get: function get() {
      return new _type.EnvType({
        convertStrategy: new _base64ToString.ConvertStrategyBase64ToString(),
        env: this._env
      });
    }
  }]);
}();