"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.Env = void 0;
var _logger = require("./util/logger.js");
function _typeof(o) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (o) { return typeof o; } : function (o) { return o && "function" == typeof Symbol && o.constructor === Symbol && o !== Symbol.prototype ? "symbol" : typeof o; }, _typeof(o); }
function _toConsumableArray(arr) { return _arrayWithoutHoles(arr) || _iterableToArray(arr) || _unsupportedIterableToArray(arr) || _nonIterableSpread(); }
function _nonIterableSpread() { throw new TypeError("Invalid attempt to spread non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }
function _unsupportedIterableToArray(o, minLen) { if (!o) return; if (typeof o === "string") return _arrayLikeToArray(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === "Object" && o.constructor) n = o.constructor.name; if (n === "Map" || n === "Set") return Array.from(o); if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen); }
function _iterableToArray(iter) { if (typeof Symbol !== "undefined" && iter[Symbol.iterator] != null || iter["@@iterator"] != null) return Array.from(iter); }
function _arrayWithoutHoles(arr) { if (Array.isArray(arr)) return _arrayLikeToArray(arr); }
function _arrayLikeToArray(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) arr2[i] = arr[i]; return arr2; }
function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }
function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, _toPropertyKey(descriptor.key), descriptor); } }
function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); Object.defineProperty(Constructor, "prototype", { writable: false }); return Constructor; }
function _toPropertyKey(t) { var i = _toPrimitive(t, "string"); return "symbol" == _typeof(i) ? i : i + ""; }
function _toPrimitive(t, r) { if ("object" != _typeof(t) || !t) return t; var e = t[Symbol.toPrimitive]; if (void 0 !== e) { var i = e.call(t, r || "default"); if ("object" != _typeof(i)) return i; throw new TypeError("@@toPrimitive must return a primitive value."); } return ("string" === r ? String : Number)(t); }
var Env = exports.Env = /*#__PURE__*/function () {
  function Env(params) {
    _classCallCheck(this, Env);
    var locationStrategies = params.locationStrategies,
      namingStrategies = params.namingStrategies,
      names = params.names;
    this._locationStrategies = locationStrategies;
    this._namingStrategies = namingStrategies;
    this.names = _toConsumableArray(names);
  }
  return _createClass(Env, [{
    key: "_envNames",
    value: function _envNames() {
      var _this$_namingStrategi = this._namingStrategies.reduce(function (acc, ns) {
          var _acc$result;
          acc.lastResult = ns.names(_toConsumableArray(acc.lastResult));
          (_acc$result = acc.result).push.apply(_acc$result, _toConsumableArray(acc.lastResult));
          return acc;
        }, {
          lastResult: _toConsumableArray(this.names).reverse(),
          result: _toConsumableArray(this.names).reverse()
        }),
        result = _this$_namingStrategi.result;
      var resultNames = _toConsumableArray(result).reverse();
      (0, _logger.logger)().debug("Try names in this order: [".concat(resultNames.join(', '), "]"));
      return resultNames;
    }
  }, {
    key: "envValue",
    value: function envValue() {
      var _this = this;
      return this._envNames().reduce(function (envResult, name) {
        if (envResult) {
          return envResult;
        }
        return _this._locationStrategies.reduce(function (locResult, ls) {
          if (locResult) {
            return locResult;
          }
          return ls.valueByName(name);
        }, undefined);
      }, undefined);
    }
  }]);
}();