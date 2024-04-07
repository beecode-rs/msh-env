"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.EnvType = void 0;
var _index = _interopRequireDefault(require("fast-deep-equal/es6/index.js"));
var _logger2 = require("../util/logger.js");
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }
function _typeof(o) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (o) { return typeof o; } : function (o) { return o && "function" == typeof Symbol && o.constructor === Symbol && o !== Symbol.prototype ? "symbol" : typeof o; }, _typeof(o); }
function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }
function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, _toPropertyKey(descriptor.key), descriptor); } }
function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); Object.defineProperty(Constructor, "prototype", { writable: false }); return Constructor; }
function _defineProperty(obj, key, value) { key = _toPropertyKey(key); if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }
function _toPropertyKey(t) { var i = _toPrimitive(t, "string"); return "symbol" == _typeof(i) ? i : i + ""; }
function _toPrimitive(t, r) { if ("object" != _typeof(t) || !t) return t; var e = t[Symbol.toPrimitive]; if (void 0 !== e) { var i = e.call(t, r || "default"); if ("object" != _typeof(i)) return i; throw new TypeError("@@toPrimitive must return a primitive value."); } return ("string" === r ? String : Number)(t); }
var EnvType = exports.EnvType = /*#__PURE__*/function () {
  function EnvType(params) {
    _classCallCheck(this, EnvType);
    _defineProperty(this, "_defaultValue", undefined);
    _defineProperty(this, "_allowedValues", []);
    var convertStrategy = params.convertStrategy,
      env = params.env;
    this._convertStrategy = convertStrategy;
    this._env = env;
  }
  return _createClass(EnvType, [{
    key: "default",
    value: function _default(defaultValue) {
      this._loggerDebug('set default value', {
        defaultValue: defaultValue
      });
      this._defaultValue = defaultValue;
      return this;
    }
  }, {
    key: "optional",
    get: function get() {
      this._loggerDebug("optional");
      var strOrUndefined = this._env.envValue();
      this._loggerDebug("try to convert env string value \"".concat(strOrUndefined, "\""));
      var convertedValue = this._convertStrategy.convert(strOrUndefined);
      if (convertedValue === undefined) {
        this._loggerDebug("using default value \"".concat(this._defaultValue, "\""));
      }
      var optionalValue = convertedValue !== null && convertedValue !== void 0 ? convertedValue : this._defaultValue;
      this._validateAllowedValues(optionalValue);
      return optionalValue;
    }
  }, {
    key: "required",
    get: function get() {
      this._loggerDebug("is required");
      var envValue = this.optional;
      if (envValue === undefined) {
        throw this._createError('must have value defined');
      }
      return envValue;
    }
  }, {
    key: "allowed",
    value: function allowed() {
      for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
        args[_key] = arguments[_key];
      }
      this._loggerDebug("set allowed values", {
        allowedValues: args
      });
      this._allowedValues = [].concat(args);
      return this;
    }
  }, {
    key: "_validateAllowedValues",
    value: function _validateAllowedValues(value) {
      if (this._allowedValues.length === 0) {
        return;
      }
      this._loggerDebug('validating allowed values for:', {
        value: value
      });
      if (this._allowedValuesDoNotContain(value)) {
        throw this._createError("must have one of the fallowing values: ".concat(this._allowedValuesToString()));
      }
    }
  }, {
    key: "_allowedValuesDoNotContain",
    value: function _allowedValuesDoNotContain(value) {
      var foundIndex = this._allowedValues.findIndex(function (v) {
        return (0, _index["default"])(value, v);
      });
      return foundIndex === -1;
    }
  }, {
    key: "_allowedValuesToString",
    value: function _allowedValuesToString() {
      return this._allowedValues.map(function (v) {
        return JSON.stringify(v);
      }).join(', ');
    }
  }, {
    key: "_loggerDebug",
    value: function _loggerDebug(msg) {
      var _logger;
      for (var _len2 = arguments.length, args = new Array(_len2 > 1 ? _len2 - 1 : 0), _key2 = 1; _key2 < _len2; _key2++) {
        args[_key2 - 1] = arguments[_key2];
      }
      (_logger = (0, _logger2.logger)()).debug.apply(_logger, ["".concat(this._envName, " ").concat(msg)].concat(args));
    }
  }, {
    key: "_createError",
    value: function _createError(msg) {
      return new Error("".concat(this._envName, " ").concat(msg));
    }
  }, {
    key: "_envName",
    get: function get() {
      return "Env[".concat(this._env.names.join(','), "]");
    }
  }]);
}();