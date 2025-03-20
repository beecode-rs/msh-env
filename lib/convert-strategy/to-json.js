"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.ConvertStrategyToJson = void 0;
function _typeof(o) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (o) { return typeof o; } : function (o) { return o && "function" == typeof Symbol && o.constructor === Symbol && o !== Symbol.prototype ? "symbol" : typeof o; }, _typeof(o); }
function _classCallCheck(a, n) { if (!(a instanceof n)) throw new TypeError("Cannot call a class as a function"); }
function _defineProperties(e, r) { for (var t = 0; t < r.length; t++) { var o = r[t]; o.enumerable = o.enumerable || !1, o.configurable = !0, "value" in o && (o.writable = !0), Object.defineProperty(e, _toPropertyKey(o.key), o); } }
function _createClass(e, r, t) { return r && _defineProperties(e.prototype, r), t && _defineProperties(e, t), Object.defineProperty(e, "prototype", { writable: !1 }), e; }
function _toPropertyKey(t) { var i = _toPrimitive(t, "string"); return "symbol" == _typeof(i) ? i : i + ""; }
function _toPrimitive(t, r) { if ("object" != _typeof(t) || !t) return t; var e = t[Symbol.toPrimitive]; if (void 0 !== e) { var i = e.call(t, r || "default"); if ("object" != _typeof(i)) return i; throw new TypeError("@@toPrimitive must return a primitive value."); } return ("string" === r ? String : Number)(t); }
var ConvertStrategyToJson = exports.ConvertStrategyToJson = /*#__PURE__*/function () {
  function ConvertStrategyToJson() {
    _classCallCheck(this, ConvertStrategyToJson);
  }
  return _createClass(ConvertStrategyToJson, [{
    key: "convert",
    value: function convert(str) {
      if (str === undefined) {
        return undefined;
      }
      if (str.trim() === '') {
        return undefined;
      }
      try {
        return JSON.parse(str); // TODO validate if parsed value is of type T
      } catch (err) {
        if (err instanceof Error) {
          throw new Error("\"".concat(str, "\" is not a json. Error: ").concat(err.message));
        }
        throw err;
      }
    }
  }]);
}();