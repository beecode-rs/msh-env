"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.ConvertStrategyBase64ToString = void 0;
var _jsBase = require("js-base64");
function _typeof(o) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (o) { return typeof o; } : function (o) { return o && "function" == typeof Symbol && o.constructor === Symbol && o !== Symbol.prototype ? "symbol" : typeof o; }, _typeof(o); }
function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }
function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, _toPropertyKey(descriptor.key), descriptor); } }
function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); Object.defineProperty(Constructor, "prototype", { writable: false }); return Constructor; }
function _toPropertyKey(t) { var i = _toPrimitive(t, "string"); return "symbol" == _typeof(i) ? i : i + ""; }
function _toPrimitive(t, r) { if ("object" != _typeof(t) || !t) return t; var e = t[Symbol.toPrimitive]; if (void 0 !== e) { var i = e.call(t, r || "default"); if ("object" != _typeof(i)) return i; throw new TypeError("@@toPrimitive must return a primitive value."); } return ("string" === r ? String : Number)(t); }
var ConvertStrategyBase64ToString = exports.ConvertStrategyBase64ToString = /*#__PURE__*/function () {
  function ConvertStrategyBase64ToString() {
    _classCallCheck(this, ConvertStrategyBase64ToString);
  }
  return _createClass(ConvertStrategyBase64ToString, [{
    key: "convert",
    value: function convert(str) {
      if (str === undefined) {
        return undefined;
      }
      if (str.trim() === '') {
        return undefined;
      }
      try {
        if (!_jsBase.Base64.isValid(str)) {
          throw new Error('Invalid character: the string to be decoded is not correctly encoded.');
        }
        var decodedString = _jsBase.Base64.decode(str);
        if (decodedString.trim() === '') {
          return undefined;
        }
        return decodedString;
      } catch (err) {
        throw new Error("\"".concat(str, "\" is not a base64. Error: ").concat(err.message));
      }
    }
  }]);
}();