"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.LocationStrategyCliArgsMinimist = void 0;
var _minimist = _interopRequireDefault(require("minimist"));
var _minimistOptions = _interopRequireDefault(require("minimist-options"));
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }
function _typeof(o) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (o) { return typeof o; } : function (o) { return o && "function" == typeof Symbol && o.constructor === Symbol && o !== Symbol.prototype ? "symbol" : typeof o; }, _typeof(o); }
function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }
function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, _toPropertyKey(descriptor.key), descriptor); } }
function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); Object.defineProperty(Constructor, "prototype", { writable: false }); return Constructor; }
function _toPropertyKey(t) { var i = _toPrimitive(t, "string"); return "symbol" == _typeof(i) ? i : i + ""; }
function _toPrimitive(t, r) { if ("object" != _typeof(t) || !t) return t; var e = t[Symbol.toPrimitive]; if (void 0 !== e) { var i = e.call(t, r || "default"); if ("object" != _typeof(i)) return i; throw new TypeError("@@toPrimitive must return a primitive value."); } return ("string" === r ? String : Number)(t); }
var LocationStrategyCliArgsMinimist = exports.LocationStrategyCliArgsMinimist = /*#__PURE__*/function () {
  function LocationStrategyCliArgsMinimist(params) {
    _classCallCheck(this, LocationStrategyCliArgsMinimist);
    var _ref = params !== null && params !== void 0 ? params : {},
      _ref$options = _ref.options,
      options = _ref$options === void 0 ? {} : _ref$options,
      _ref$args = _ref.args,
      args = _ref$args === void 0 ? process.argv.slice(2) : _ref$args;
    // @ts-ignore issue with loading minimist-options as es module
    this._miniOpts = (0, _minimistOptions["default"])(options);
    this._args = (0, _minimist["default"])(args, this._miniOpts);
  }
  return _createClass(LocationStrategyCliArgsMinimist, [{
    key: "valueByName",
    value: function valueByName(name) {
      var value = this._args[name];
      if (value === undefined) {
        return value;
      }
      return value.toString();
    }
  }]);
}();