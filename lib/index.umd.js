/**
 * @beecode/msh-env v0.1.1
 * Copyright 2018-2023 Milos Bugarinovic <milos.bugarinovic@gmail.com>
 */

(function (global, factory) {
	typeof exports === 'object' && typeof module !== 'undefined' ? factory(exports, require('./util')) :
	typeof define === 'function' && define.amd ? define(['exports', 'util'], factory) :
	(global = typeof globalThis !== 'undefined' ? globalThis : global || self, factory(global["@beecode/msh-env"] = {}, global.require$$0));
})(this, (function (exports, require$$0) { 'use strict';

	var commonjsGlobal = typeof globalThis !== 'undefined' ? globalThis : typeof window !== 'undefined' ? window : typeof global !== 'undefined' ? global : typeof self !== 'undefined' ? self : {};

	function getDefaultExportFromCjs (x) {
		return x && x.__esModule && Object.prototype.hasOwnProperty.call(x, 'default') ? x['default'] : x;
	}

	var base64 = {exports: {}};

	/*! https://mths.be/base64 v1.0.0 by @mathias | MIT license */
	base64.exports;

	(function (module, exports) {
	(function(root) {

			// Detect free variables `exports`.
			var freeExports = exports;

			// Detect free variable `module`.
			var freeModule = module &&
				module.exports == freeExports && module;

			// Detect free variable `global`, from Node.js or Browserified code, and use
			// it as `root`.
			var freeGlobal = typeof commonjsGlobal == 'object' && commonjsGlobal;
			if (freeGlobal.global === freeGlobal || freeGlobal.window === freeGlobal) {
				root = freeGlobal;
			}

			/*--------------------------------------------------------------------------*/

			var InvalidCharacterError = function(message) {
				this.message = message;
			};
			InvalidCharacterError.prototype = new Error;
			InvalidCharacterError.prototype.name = 'InvalidCharacterError';

			var error = function(message) {
				// Note: the error messages used throughout this file match those used by
				// the native `atob`/`btoa` implementation in Chromium.
				throw new InvalidCharacterError(message);
			};

			var TABLE = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/';
			// http://whatwg.org/html/common-microsyntaxes.html#space-character
			var REGEX_SPACE_CHARACTERS = /[\t\n\f\r ]/g;

			// `decode` is designed to be fully compatible with `atob` as described in the
			// HTML Standard. http://whatwg.org/html/webappapis.html#dom-windowbase64-atob
			// The optimized base64-decoding algorithm used is based on @atk’s excellent
			// implementation. https://gist.github.com/atk/1020396
			var decode = function(input) {
				input = String(input)
					.replace(REGEX_SPACE_CHARACTERS, '');
				var length = input.length;
				if (length % 4 == 0) {
					input = input.replace(/==?$/, '');
					length = input.length;
				}
				if (
					length % 4 == 1 ||
					// http://whatwg.org/C#alphanumeric-ascii-characters
					/[^+a-zA-Z0-9/]/.test(input)
				) {
					error(
						'Invalid character: the string to be decoded is not correctly encoded.'
					);
				}
				var bitCounter = 0;
				var bitStorage;
				var buffer;
				var output = '';
				var position = -1;
				while (++position < length) {
					buffer = TABLE.indexOf(input.charAt(position));
					bitStorage = bitCounter % 4 ? bitStorage * 64 + buffer : buffer;
					// Unless this is the first of a group of 4 characters…
					if (bitCounter++ % 4) {
						// …convert the first 8 bits to a single ASCII character.
						output += String.fromCharCode(
							0xFF & bitStorage >> (-2 * bitCounter & 6)
						);
					}
				}
				return output;
			};

			// `encode` is designed to be fully compatible with `btoa` as described in the
			// HTML Standard: http://whatwg.org/html/webappapis.html#dom-windowbase64-btoa
			var encode = function(input) {
				input = String(input);
				if (/[^\0-\xFF]/.test(input)) {
					// Note: no need to special-case astral symbols here, as surrogates are
					// matched, and the input is supposed to only contain ASCII anyway.
					error(
						'The string to be encoded contains characters outside of the ' +
						'Latin1 range.'
					);
				}
				var padding = input.length % 3;
				var output = '';
				var position = -1;
				var a;
				var b;
				var c;
				var buffer;
				// Make sure any padding is handled outside of the loop.
				var length = input.length - padding;

				while (++position < length) {
					// Read three bytes, i.e. 24 bits.
					a = input.charCodeAt(position) << 16;
					b = input.charCodeAt(++position) << 8;
					c = input.charCodeAt(++position);
					buffer = a + b + c;
					// Turn the 24 bits into four chunks of 6 bits each, and append the
					// matching character for each of them to the output.
					output += (
						TABLE.charAt(buffer >> 18 & 0x3F) +
						TABLE.charAt(buffer >> 12 & 0x3F) +
						TABLE.charAt(buffer >> 6 & 0x3F) +
						TABLE.charAt(buffer & 0x3F)
					);
				}

				if (padding == 2) {
					a = input.charCodeAt(position) << 8;
					b = input.charCodeAt(++position);
					buffer = a + b;
					output += (
						TABLE.charAt(buffer >> 10) +
						TABLE.charAt((buffer >> 4) & 0x3F) +
						TABLE.charAt((buffer << 2) & 0x3F) +
						'='
					);
				} else if (padding == 1) {
					buffer = input.charCodeAt(position);
					output += (
						TABLE.charAt(buffer >> 2) +
						TABLE.charAt((buffer << 4) & 0x3F) +
						'=='
					);
				}

				return output;
			};

			var base64 = {
				'encode': encode,
				'decode': decode,
				'version': '1.0.0'
			};

			// Some AMD build optimizers, like r.js, check for specific condition patterns
			// like the following:
			if (freeExports && !freeExports.nodeType) {
				if (freeModule) { // in Node.js or RingoJS v0.8.0+
					freeModule.exports = base64;
				} else { // in Narwhal or RingoJS v0.7.0-
					for (var key in base64) {
						base64.hasOwnProperty(key) && (freeExports[key] = base64[key]);
					}
				}
			} else { // in Rhino or a web browser
				root.base64 = base64;
			}

		}(commonjsGlobal)); 
	} (base64, base64.exports));

	var base64Exports = base64.exports;

	class ConvertStrategyBase64ToString {
	    convert(str) {
	        if (str === undefined) {
	            return undefined;
	        }
	        if (str.trim() === '') {
	            return undefined;
	        }
	        try {
	            return base64Exports.decode(str);
	        }
	        catch (err) {
	            throw new Error(`"${str}" is not a base64. Error: ${err.message}`);
	        }
	    }
	}

	class ConvertStrategyToBoolean {
	    convert(str) {
	        if (str === undefined) {
	            return undefined;
	        }
	        const strLower = str.toLowerCase();
	        if (strLower === 'true') {
	            return true;
	        }
	        else if (strLower === 'false') {
	            return false;
	        }
	        return undefined;
	    }
	}

	class ConvertStrategyToJson {
	    convert(str) {
	        if (str === undefined) {
	            return undefined;
	        }
	        if (str.trim() === '') {
	            return undefined;
	        }
	        try {
	            return JSON.parse(str);
	        }
	        catch (err) {
	            throw new Error(`"${str}" is not a json. Error: ${err.message}`);
	        }
	    }
	}

	class ConvertStrategyToNumber {
	    convert(str) {
	        if (str === undefined) {
	            return undefined;
	        }
	        if (str.trim() === '') {
	            return undefined;
	        }
	        const convertedValue = Number(str);
	        if (isNaN(convertedValue)) {
	            throw new Error(`"${str}" is not a number`);
	        }
	        return convertedValue;
	    }
	}

	class ConvertStrategyToString {
	    convert(str) {
	        if (str === undefined) {
	            return undefined;
	        }
	        if (str.trim() === '') {
	            return undefined;
	        }
	        return str;
	    }
	}

	var _void = {};

	Object.defineProperty(_void, "__esModule", { value: true });
	var LoggerStrategyVoid_1 = _void.LoggerStrategyVoid = void 0;
	class LoggerStrategyVoid {
	    debug(_, __) { } // eslint-disable-line
	    error(_, __) { } // eslint-disable-line
	    info(_, __) { } // eslint-disable-line
	    warn(_, __) { } // eslint-disable-line
	    // eslint-disable-next-line
	    clone(_) {
	        return new LoggerStrategyVoid();
	    }
	}
	LoggerStrategyVoid_1 = _void.LoggerStrategyVoid = LoggerStrategyVoid;

	const _cache = {
	    logger: new LoggerStrategyVoid_1(),
	};
	const logger = () => {
	    return _cache.logger;
	};

	class Env {
	    names;
	    _locationStrategies;
	    _namingStrategies;
	    constructor(params) {
	        const { locationStrategies, namingStrategies, names } = params;
	        this._locationStrategies = locationStrategies;
	        this._namingStrategies = namingStrategies;
	        this.names = [...names];
	    }
	    _envNames() {
	        const { result } = this._namingStrategies.reduce((acc, ns) => {
	            acc.lastResult = ns.names([...acc.lastResult]);
	            acc.result.push(...acc.lastResult);
	            return acc;
	        }, { lastResult: [...this.names].reverse(), result: [...this.names].reverse() });
	        const resultNames = [...result].reverse();
	        logger().debug(`Try names in this order: [${resultNames.join(', ')}]`);
	        return resultNames;
	    }
	    envValue() {
	        return this._envNames().reduce((envResult, name) => {
	            if (envResult) {
	                return envResult;
	            }
	            return this._locationStrategies.reduce((locResult, ls) => {
	                if (locResult) {
	                    return locResult;
	                }
	                return ls.valueByName(name);
	            }, undefined);
	        }, undefined);
	    }
	}

	var toStr$9 = Object.prototype.toString;

	var isArguments$2 = function isArguments(value) {
		var str = toStr$9.call(value);
		var isArgs = str === '[object Arguments]';
		if (!isArgs) {
			isArgs = str !== '[object Array]' &&
				value !== null &&
				typeof value === 'object' &&
				typeof value.length === 'number' &&
				value.length >= 0 &&
				toStr$9.call(value.callee) === '[object Function]';
		}
		return isArgs;
	};

	var implementation$b;
	var hasRequiredImplementation;

	function requireImplementation () {
		if (hasRequiredImplementation) return implementation$b;
		hasRequiredImplementation = 1;

		var keysShim;
		if (!Object.keys) {
			// modified from https://github.com/es-shims/es5-shim
			var has = Object.prototype.hasOwnProperty;
			var toStr = Object.prototype.toString;
			var isArgs = isArguments$2; // eslint-disable-line global-require
			var isEnumerable = Object.prototype.propertyIsEnumerable;
			var hasDontEnumBug = !isEnumerable.call({ toString: null }, 'toString');
			var hasProtoEnumBug = isEnumerable.call(function () {}, 'prototype');
			var dontEnums = [
				'toString',
				'toLocaleString',
				'valueOf',
				'hasOwnProperty',
				'isPrototypeOf',
				'propertyIsEnumerable',
				'constructor'
			];
			var equalsConstructorPrototype = function (o) {
				var ctor = o.constructor;
				return ctor && ctor.prototype === o;
			};
			var excludedKeys = {
				$applicationCache: true,
				$console: true,
				$external: true,
				$frame: true,
				$frameElement: true,
				$frames: true,
				$innerHeight: true,
				$innerWidth: true,
				$onmozfullscreenchange: true,
				$onmozfullscreenerror: true,
				$outerHeight: true,
				$outerWidth: true,
				$pageXOffset: true,
				$pageYOffset: true,
				$parent: true,
				$scrollLeft: true,
				$scrollTop: true,
				$scrollX: true,
				$scrollY: true,
				$self: true,
				$webkitIndexedDB: true,
				$webkitStorageInfo: true,
				$window: true
			};
			var hasAutomationEqualityBug = (function () {
				/* global window */
				if (typeof window === 'undefined') { return false; }
				for (var k in window) {
					try {
						if (!excludedKeys['$' + k] && has.call(window, k) && window[k] !== null && typeof window[k] === 'object') {
							try {
								equalsConstructorPrototype(window[k]);
							} catch (e) {
								return true;
							}
						}
					} catch (e) {
						return true;
					}
				}
				return false;
			}());
			var equalsConstructorPrototypeIfNotBuggy = function (o) {
				/* global window */
				if (typeof window === 'undefined' || !hasAutomationEqualityBug) {
					return equalsConstructorPrototype(o);
				}
				try {
					return equalsConstructorPrototype(o);
				} catch (e) {
					return false;
				}
			};

			keysShim = function keys(object) {
				var isObject = object !== null && typeof object === 'object';
				var isFunction = toStr.call(object) === '[object Function]';
				var isArguments = isArgs(object);
				var isString = isObject && toStr.call(object) === '[object String]';
				var theKeys = [];

				if (!isObject && !isFunction && !isArguments) {
					throw new TypeError('Object.keys called on a non-object');
				}

				var skipProto = hasProtoEnumBug && isFunction;
				if (isString && object.length > 0 && !has.call(object, 0)) {
					for (var i = 0; i < object.length; ++i) {
						theKeys.push(String(i));
					}
				}

				if (isArguments && object.length > 0) {
					for (var j = 0; j < object.length; ++j) {
						theKeys.push(String(j));
					}
				} else {
					for (var name in object) {
						if (!(skipProto && name === 'prototype') && has.call(object, name)) {
							theKeys.push(String(name));
						}
					}
				}

				if (hasDontEnumBug) {
					var skipConstructor = equalsConstructorPrototypeIfNotBuggy(object);

					for (var k = 0; k < dontEnums.length; ++k) {
						if (!(skipConstructor && dontEnums[k] === 'constructor') && has.call(object, dontEnums[k])) {
							theKeys.push(dontEnums[k]);
						}
					}
				}
				return theKeys;
			};
		}
		implementation$b = keysShim;
		return implementation$b;
	}

	var slice$1 = Array.prototype.slice;
	var isArgs = isArguments$2;

	var origKeys = Object.keys;
	var keysShim = origKeys ? function keys(o) { return origKeys(o); } : requireImplementation();

	var originalKeys = Object.keys;

	keysShim.shim = function shimObjectKeys() {
		if (Object.keys) {
			var keysWorksWithArguments = (function () {
				// Safari 5.0 bug
				var args = Object.keys(arguments);
				return args && args.length === arguments.length;
			}(1, 2));
			if (!keysWorksWithArguments) {
				Object.keys = function keys(object) { // eslint-disable-line func-name-matching
					if (isArgs(object)) {
						return originalKeys(slice$1.call(object));
					}
					return originalKeys(object);
				};
			}
		} else {
			Object.keys = keysShim;
		}
		return Object.keys || keysShim;
	};

	var objectKeys$2 = keysShim;

	/* eslint complexity: [2, 18], max-statements: [2, 33] */
	var shams$1 = function hasSymbols() {
		if (typeof Symbol !== 'function' || typeof Object.getOwnPropertySymbols !== 'function') { return false; }
		if (typeof Symbol.iterator === 'symbol') { return true; }

		var obj = {};
		var sym = Symbol('test');
		var symObj = Object(sym);
		if (typeof sym === 'string') { return false; }

		if (Object.prototype.toString.call(sym) !== '[object Symbol]') { return false; }
		if (Object.prototype.toString.call(symObj) !== '[object Symbol]') { return false; }

		// temp disabled per https://github.com/ljharb/object.assign/issues/17
		// if (sym instanceof Symbol) { return false; }
		// temp disabled per https://github.com/WebReflection/get-own-property-symbols/issues/4
		// if (!(symObj instanceof Symbol)) { return false; }

		// if (typeof Symbol.prototype.toString !== 'function') { return false; }
		// if (String(sym) !== Symbol.prototype.toString.call(sym)) { return false; }

		var symVal = 42;
		obj[sym] = symVal;
		for (sym in obj) { return false; } // eslint-disable-line no-restricted-syntax, no-unreachable-loop
		if (typeof Object.keys === 'function' && Object.keys(obj).length !== 0) { return false; }

		if (typeof Object.getOwnPropertyNames === 'function' && Object.getOwnPropertyNames(obj).length !== 0) { return false; }

		var syms = Object.getOwnPropertySymbols(obj);
		if (syms.length !== 1 || syms[0] !== sym) { return false; }

		if (!Object.prototype.propertyIsEnumerable.call(obj, sym)) { return false; }

		if (typeof Object.getOwnPropertyDescriptor === 'function') {
			var descriptor = Object.getOwnPropertyDescriptor(obj, sym);
			if (descriptor.value !== symVal || descriptor.enumerable !== true) { return false; }
		}

		return true;
	};

	var origSymbol = typeof Symbol !== 'undefined' && Symbol;
	var hasSymbolSham = shams$1;

	var hasSymbols$5 = function hasNativeSymbols() {
		if (typeof origSymbol !== 'function') { return false; }
		if (typeof Symbol !== 'function') { return false; }
		if (typeof origSymbol('foo') !== 'symbol') { return false; }
		if (typeof Symbol('bar') !== 'symbol') { return false; }

		return hasSymbolSham();
	};

	var test = {
		foo: {}
	};

	var $Object = Object;

	var hasProto$1 = function hasProto() {
		return { __proto__: test }.foo === test.foo && !({ __proto__: null } instanceof $Object);
	};

	/* eslint no-invalid-this: 1 */

	var ERROR_MESSAGE = 'Function.prototype.bind called on incompatible ';
	var slice = Array.prototype.slice;
	var toStr$8 = Object.prototype.toString;
	var funcType = '[object Function]';

	var implementation$a = function bind(that) {
	    var target = this;
	    if (typeof target !== 'function' || toStr$8.call(target) !== funcType) {
	        throw new TypeError(ERROR_MESSAGE + target);
	    }
	    var args = slice.call(arguments, 1);

	    var bound;
	    var binder = function () {
	        if (this instanceof bound) {
	            var result = target.apply(
	                this,
	                args.concat(slice.call(arguments))
	            );
	            if (Object(result) === result) {
	                return result;
	            }
	            return this;
	        } else {
	            return target.apply(
	                that,
	                args.concat(slice.call(arguments))
	            );
	        }
	    };

	    var boundLength = Math.max(0, target.length - args.length);
	    var boundArgs = [];
	    for (var i = 0; i < boundLength; i++) {
	        boundArgs.push('$' + i);
	    }

	    bound = Function('binder', 'return function (' + boundArgs.join(',') + '){ return binder.apply(this,arguments); }')(binder);

	    if (target.prototype) {
	        var Empty = function Empty() {};
	        Empty.prototype = target.prototype;
	        bound.prototype = new Empty();
	        Empty.prototype = null;
	    }

	    return bound;
	};

	var implementation$9 = implementation$a;

	var functionBind = Function.prototype.bind || implementation$9;

	var bind$1 = functionBind;

	var src = bind$1.call(Function.call, Object.prototype.hasOwnProperty);

	var undefined$1;

	var $SyntaxError = SyntaxError;
	var $Function = Function;
	var $TypeError$1 = TypeError;

	// eslint-disable-next-line consistent-return
	var getEvalledConstructor = function (expressionSyntax) {
		try {
			return $Function('"use strict"; return (' + expressionSyntax + ').constructor;')();
		} catch (e) {}
	};

	var $gOPD$2 = Object.getOwnPropertyDescriptor;
	if ($gOPD$2) {
		try {
			$gOPD$2({}, '');
		} catch (e) {
			$gOPD$2 = null; // this is IE 8, which has a broken gOPD
		}
	}

	var throwTypeError = function () {
		throw new $TypeError$1();
	};
	var ThrowTypeError = $gOPD$2
		? (function () {
			try {
				// eslint-disable-next-line no-unused-expressions, no-caller, no-restricted-properties
				arguments.callee; // IE 8 does not throw here
				return throwTypeError;
			} catch (calleeThrows) {
				try {
					// IE 8 throws on Object.getOwnPropertyDescriptor(arguments, '')
					return $gOPD$2(arguments, 'callee').get;
				} catch (gOPDthrows) {
					return throwTypeError;
				}
			}
		}())
		: throwTypeError;

	var hasSymbols$4 = hasSymbols$5();
	var hasProto = hasProto$1();

	var getProto$1 = Object.getPrototypeOf || (
		hasProto
			? function (x) { return x.__proto__; } // eslint-disable-line no-proto
			: null
	);

	var needsEval = {};

	var TypedArray = typeof Uint8Array === 'undefined' || !getProto$1 ? undefined$1 : getProto$1(Uint8Array);

	var INTRINSICS = {
		'%AggregateError%': typeof AggregateError === 'undefined' ? undefined$1 : AggregateError,
		'%Array%': Array,
		'%ArrayBuffer%': typeof ArrayBuffer === 'undefined' ? undefined$1 : ArrayBuffer,
		'%ArrayIteratorPrototype%': hasSymbols$4 && getProto$1 ? getProto$1([][Symbol.iterator]()) : undefined$1,
		'%AsyncFromSyncIteratorPrototype%': undefined$1,
		'%AsyncFunction%': needsEval,
		'%AsyncGenerator%': needsEval,
		'%AsyncGeneratorFunction%': needsEval,
		'%AsyncIteratorPrototype%': needsEval,
		'%Atomics%': typeof Atomics === 'undefined' ? undefined$1 : Atomics,
		'%BigInt%': typeof BigInt === 'undefined' ? undefined$1 : BigInt,
		'%BigInt64Array%': typeof BigInt64Array === 'undefined' ? undefined$1 : BigInt64Array,
		'%BigUint64Array%': typeof BigUint64Array === 'undefined' ? undefined$1 : BigUint64Array,
		'%Boolean%': Boolean,
		'%DataView%': typeof DataView === 'undefined' ? undefined$1 : DataView,
		'%Date%': Date,
		'%decodeURI%': decodeURI,
		'%decodeURIComponent%': decodeURIComponent,
		'%encodeURI%': encodeURI,
		'%encodeURIComponent%': encodeURIComponent,
		'%Error%': Error,
		'%eval%': eval, // eslint-disable-line no-eval
		'%EvalError%': EvalError,
		'%Float32Array%': typeof Float32Array === 'undefined' ? undefined$1 : Float32Array,
		'%Float64Array%': typeof Float64Array === 'undefined' ? undefined$1 : Float64Array,
		'%FinalizationRegistry%': typeof FinalizationRegistry === 'undefined' ? undefined$1 : FinalizationRegistry,
		'%Function%': $Function,
		'%GeneratorFunction%': needsEval,
		'%Int8Array%': typeof Int8Array === 'undefined' ? undefined$1 : Int8Array,
		'%Int16Array%': typeof Int16Array === 'undefined' ? undefined$1 : Int16Array,
		'%Int32Array%': typeof Int32Array === 'undefined' ? undefined$1 : Int32Array,
		'%isFinite%': isFinite,
		'%isNaN%': isNaN,
		'%IteratorPrototype%': hasSymbols$4 && getProto$1 ? getProto$1(getProto$1([][Symbol.iterator]())) : undefined$1,
		'%JSON%': typeof JSON === 'object' ? JSON : undefined$1,
		'%Map%': typeof Map === 'undefined' ? undefined$1 : Map,
		'%MapIteratorPrototype%': typeof Map === 'undefined' || !hasSymbols$4 || !getProto$1 ? undefined$1 : getProto$1(new Map()[Symbol.iterator]()),
		'%Math%': Math,
		'%Number%': Number,
		'%Object%': Object,
		'%parseFloat%': parseFloat,
		'%parseInt%': parseInt,
		'%Promise%': typeof Promise === 'undefined' ? undefined$1 : Promise,
		'%Proxy%': typeof Proxy === 'undefined' ? undefined$1 : Proxy,
		'%RangeError%': RangeError,
		'%ReferenceError%': ReferenceError,
		'%Reflect%': typeof Reflect === 'undefined' ? undefined$1 : Reflect,
		'%RegExp%': RegExp,
		'%Set%': typeof Set === 'undefined' ? undefined$1 : Set,
		'%SetIteratorPrototype%': typeof Set === 'undefined' || !hasSymbols$4 || !getProto$1 ? undefined$1 : getProto$1(new Set()[Symbol.iterator]()),
		'%SharedArrayBuffer%': typeof SharedArrayBuffer === 'undefined' ? undefined$1 : SharedArrayBuffer,
		'%String%': String,
		'%StringIteratorPrototype%': hasSymbols$4 && getProto$1 ? getProto$1(''[Symbol.iterator]()) : undefined$1,
		'%Symbol%': hasSymbols$4 ? Symbol : undefined$1,
		'%SyntaxError%': $SyntaxError,
		'%ThrowTypeError%': ThrowTypeError,
		'%TypedArray%': TypedArray,
		'%TypeError%': $TypeError$1,
		'%Uint8Array%': typeof Uint8Array === 'undefined' ? undefined$1 : Uint8Array,
		'%Uint8ClampedArray%': typeof Uint8ClampedArray === 'undefined' ? undefined$1 : Uint8ClampedArray,
		'%Uint16Array%': typeof Uint16Array === 'undefined' ? undefined$1 : Uint16Array,
		'%Uint32Array%': typeof Uint32Array === 'undefined' ? undefined$1 : Uint32Array,
		'%URIError%': URIError,
		'%WeakMap%': typeof WeakMap === 'undefined' ? undefined$1 : WeakMap,
		'%WeakRef%': typeof WeakRef === 'undefined' ? undefined$1 : WeakRef,
		'%WeakSet%': typeof WeakSet === 'undefined' ? undefined$1 : WeakSet
	};

	if (getProto$1) {
		try {
			null.error; // eslint-disable-line no-unused-expressions
		} catch (e) {
			// https://github.com/tc39/proposal-shadowrealm/pull/384#issuecomment-1364264229
			var errorProto = getProto$1(getProto$1(e));
			INTRINSICS['%Error.prototype%'] = errorProto;
		}
	}

	var doEval = function doEval(name) {
		var value;
		if (name === '%AsyncFunction%') {
			value = getEvalledConstructor('async function () {}');
		} else if (name === '%GeneratorFunction%') {
			value = getEvalledConstructor('function* () {}');
		} else if (name === '%AsyncGeneratorFunction%') {
			value = getEvalledConstructor('async function* () {}');
		} else if (name === '%AsyncGenerator%') {
			var fn = doEval('%AsyncGeneratorFunction%');
			if (fn) {
				value = fn.prototype;
			}
		} else if (name === '%AsyncIteratorPrototype%') {
			var gen = doEval('%AsyncGenerator%');
			if (gen && getProto$1) {
				value = getProto$1(gen.prototype);
			}
		}

		INTRINSICS[name] = value;

		return value;
	};

	var LEGACY_ALIASES = {
		'%ArrayBufferPrototype%': ['ArrayBuffer', 'prototype'],
		'%ArrayPrototype%': ['Array', 'prototype'],
		'%ArrayProto_entries%': ['Array', 'prototype', 'entries'],
		'%ArrayProto_forEach%': ['Array', 'prototype', 'forEach'],
		'%ArrayProto_keys%': ['Array', 'prototype', 'keys'],
		'%ArrayProto_values%': ['Array', 'prototype', 'values'],
		'%AsyncFunctionPrototype%': ['AsyncFunction', 'prototype'],
		'%AsyncGenerator%': ['AsyncGeneratorFunction', 'prototype'],
		'%AsyncGeneratorPrototype%': ['AsyncGeneratorFunction', 'prototype', 'prototype'],
		'%BooleanPrototype%': ['Boolean', 'prototype'],
		'%DataViewPrototype%': ['DataView', 'prototype'],
		'%DatePrototype%': ['Date', 'prototype'],
		'%ErrorPrototype%': ['Error', 'prototype'],
		'%EvalErrorPrototype%': ['EvalError', 'prototype'],
		'%Float32ArrayPrototype%': ['Float32Array', 'prototype'],
		'%Float64ArrayPrototype%': ['Float64Array', 'prototype'],
		'%FunctionPrototype%': ['Function', 'prototype'],
		'%Generator%': ['GeneratorFunction', 'prototype'],
		'%GeneratorPrototype%': ['GeneratorFunction', 'prototype', 'prototype'],
		'%Int8ArrayPrototype%': ['Int8Array', 'prototype'],
		'%Int16ArrayPrototype%': ['Int16Array', 'prototype'],
		'%Int32ArrayPrototype%': ['Int32Array', 'prototype'],
		'%JSONParse%': ['JSON', 'parse'],
		'%JSONStringify%': ['JSON', 'stringify'],
		'%MapPrototype%': ['Map', 'prototype'],
		'%NumberPrototype%': ['Number', 'prototype'],
		'%ObjectPrototype%': ['Object', 'prototype'],
		'%ObjProto_toString%': ['Object', 'prototype', 'toString'],
		'%ObjProto_valueOf%': ['Object', 'prototype', 'valueOf'],
		'%PromisePrototype%': ['Promise', 'prototype'],
		'%PromiseProto_then%': ['Promise', 'prototype', 'then'],
		'%Promise_all%': ['Promise', 'all'],
		'%Promise_reject%': ['Promise', 'reject'],
		'%Promise_resolve%': ['Promise', 'resolve'],
		'%RangeErrorPrototype%': ['RangeError', 'prototype'],
		'%ReferenceErrorPrototype%': ['ReferenceError', 'prototype'],
		'%RegExpPrototype%': ['RegExp', 'prototype'],
		'%SetPrototype%': ['Set', 'prototype'],
		'%SharedArrayBufferPrototype%': ['SharedArrayBuffer', 'prototype'],
		'%StringPrototype%': ['String', 'prototype'],
		'%SymbolPrototype%': ['Symbol', 'prototype'],
		'%SyntaxErrorPrototype%': ['SyntaxError', 'prototype'],
		'%TypedArrayPrototype%': ['TypedArray', 'prototype'],
		'%TypeErrorPrototype%': ['TypeError', 'prototype'],
		'%Uint8ArrayPrototype%': ['Uint8Array', 'prototype'],
		'%Uint8ClampedArrayPrototype%': ['Uint8ClampedArray', 'prototype'],
		'%Uint16ArrayPrototype%': ['Uint16Array', 'prototype'],
		'%Uint32ArrayPrototype%': ['Uint32Array', 'prototype'],
		'%URIErrorPrototype%': ['URIError', 'prototype'],
		'%WeakMapPrototype%': ['WeakMap', 'prototype'],
		'%WeakSetPrototype%': ['WeakSet', 'prototype']
	};

	var bind = functionBind;
	var hasOwn$1 = src;
	var $concat$1 = bind.call(Function.call, Array.prototype.concat);
	var $spliceApply = bind.call(Function.apply, Array.prototype.splice);
	var $replace$1 = bind.call(Function.call, String.prototype.replace);
	var $strSlice = bind.call(Function.call, String.prototype.slice);
	var $exec$1 = bind.call(Function.call, RegExp.prototype.exec);

	/* adapted from https://github.com/lodash/lodash/blob/4.17.15/dist/lodash.js#L6735-L6744 */
	var rePropName = /[^%.[\]]+|\[(?:(-?\d+(?:\.\d+)?)|(["'])((?:(?!\2)[^\\]|\\.)*?)\2)\]|(?=(?:\.|\[\])(?:\.|\[\]|%$))/g;
	var reEscapeChar = /\\(\\)?/g; /** Used to match backslashes in property paths. */
	var stringToPath = function stringToPath(string) {
		var first = $strSlice(string, 0, 1);
		var last = $strSlice(string, -1);
		if (first === '%' && last !== '%') {
			throw new $SyntaxError('invalid intrinsic syntax, expected closing `%`');
		} else if (last === '%' && first !== '%') {
			throw new $SyntaxError('invalid intrinsic syntax, expected opening `%`');
		}
		var result = [];
		$replace$1(string, rePropName, function (match, number, quote, subString) {
			result[result.length] = quote ? $replace$1(subString, reEscapeChar, '$1') : number || match;
		});
		return result;
	};
	/* end adaptation */

	var getBaseIntrinsic = function getBaseIntrinsic(name, allowMissing) {
		var intrinsicName = name;
		var alias;
		if (hasOwn$1(LEGACY_ALIASES, intrinsicName)) {
			alias = LEGACY_ALIASES[intrinsicName];
			intrinsicName = '%' + alias[0] + '%';
		}

		if (hasOwn$1(INTRINSICS, intrinsicName)) {
			var value = INTRINSICS[intrinsicName];
			if (value === needsEval) {
				value = doEval(intrinsicName);
			}
			if (typeof value === 'undefined' && !allowMissing) {
				throw new $TypeError$1('intrinsic ' + name + ' exists, but is not available. Please file an issue!');
			}

			return {
				alias: alias,
				name: intrinsicName,
				value: value
			};
		}

		throw new $SyntaxError('intrinsic ' + name + ' does not exist!');
	};

	var getIntrinsic = function GetIntrinsic(name, allowMissing) {
		if (typeof name !== 'string' || name.length === 0) {
			throw new $TypeError$1('intrinsic name must be a non-empty string');
		}
		if (arguments.length > 1 && typeof allowMissing !== 'boolean') {
			throw new $TypeError$1('"allowMissing" argument must be a boolean');
		}

		if ($exec$1(/^%?[^%]*%?$/, name) === null) {
			throw new $SyntaxError('`%` may not be present anywhere but at the beginning and end of the intrinsic name');
		}
		var parts = stringToPath(name);
		var intrinsicBaseName = parts.length > 0 ? parts[0] : '';

		var intrinsic = getBaseIntrinsic('%' + intrinsicBaseName + '%', allowMissing);
		var intrinsicRealName = intrinsic.name;
		var value = intrinsic.value;
		var skipFurtherCaching = false;

		var alias = intrinsic.alias;
		if (alias) {
			intrinsicBaseName = alias[0];
			$spliceApply(parts, $concat$1([0, 1], alias));
		}

		for (var i = 1, isOwn = true; i < parts.length; i += 1) {
			var part = parts[i];
			var first = $strSlice(part, 0, 1);
			var last = $strSlice(part, -1);
			if (
				(
					(first === '"' || first === "'" || first === '`')
					|| (last === '"' || last === "'" || last === '`')
				)
				&& first !== last
			) {
				throw new $SyntaxError('property names with quotes must have matching quotes');
			}
			if (part === 'constructor' || !isOwn) {
				skipFurtherCaching = true;
			}

			intrinsicBaseName += '.' + part;
			intrinsicRealName = '%' + intrinsicBaseName + '%';

			if (hasOwn$1(INTRINSICS, intrinsicRealName)) {
				value = INTRINSICS[intrinsicRealName];
			} else if (value != null) {
				if (!(part in value)) {
					if (!allowMissing) {
						throw new $TypeError$1('base intrinsic for ' + name + ' exists, but the property is not available.');
					}
					return void undefined$1;
				}
				if ($gOPD$2 && (i + 1) >= parts.length) {
					var desc = $gOPD$2(value, part);
					isOwn = !!desc;

					// By convention, when a data property is converted to an accessor
					// property to emulate a data property that does not suffer from
					// the override mistake, that accessor's getter is marked with
					// an `originalValue` property. Here, when we detect this, we
					// uphold the illusion by pretending to see that original data
					// property, i.e., returning the value rather than the getter
					// itself.
					if (isOwn && 'get' in desc && !('originalValue' in desc.get)) {
						value = desc.get;
					} else {
						value = value[part];
					}
				} else {
					isOwn = hasOwn$1(value, part);
					value = value[part];
				}

				if (isOwn && !skipFurtherCaching) {
					INTRINSICS[intrinsicRealName] = value;
				}
			}
		}
		return value;
	};

	var GetIntrinsic$6 = getIntrinsic;

	var $defineProperty = GetIntrinsic$6('%Object.defineProperty%', true);

	var hasPropertyDescriptors$1 = function hasPropertyDescriptors() {
		if ($defineProperty) {
			try {
				$defineProperty({}, 'a', { value: 1 });
				return true;
			} catch (e) {
				// IE 8 has a broken defineProperty
				return false;
			}
		}
		return false;
	};

	hasPropertyDescriptors$1.hasArrayLengthDefineBug = function hasArrayLengthDefineBug() {
		// node v0.6 has a bug where array lengths can be Set but not Defined
		if (!hasPropertyDescriptors$1()) {
			return null;
		}
		try {
			return $defineProperty([], 'length', { value: 1 }).length !== 1;
		} catch (e) {
			// In Firefox 4-22, defining length on an array throws an exception.
			return true;
		}
	};

	var hasPropertyDescriptors_1 = hasPropertyDescriptors$1;

	var keys = objectKeys$2;
	var hasSymbols$3 = typeof Symbol === 'function' && typeof Symbol('foo') === 'symbol';

	var toStr$7 = Object.prototype.toString;
	var concat = Array.prototype.concat;
	var origDefineProperty = Object.defineProperty;

	var isFunction = function (fn) {
		return typeof fn === 'function' && toStr$7.call(fn) === '[object Function]';
	};

	var hasPropertyDescriptors = hasPropertyDescriptors_1();

	var supportsDescriptors$2 = origDefineProperty && hasPropertyDescriptors;

	var defineProperty$1 = function (object, name, value, predicate) {
		if (name in object) {
			if (predicate === true) {
				if (object[name] === value) {
					return;
				}
			} else if (!isFunction(predicate) || !predicate()) {
				return;
			}
		}
		if (supportsDescriptors$2) {
			origDefineProperty(object, name, {
				configurable: true,
				enumerable: false,
				value: value,
				writable: true
			});
		} else {
			object[name] = value; // eslint-disable-line no-param-reassign
		}
	};

	var defineProperties$1 = function (object, map) {
		var predicates = arguments.length > 2 ? arguments[2] : {};
		var props = keys(map);
		if (hasSymbols$3) {
			props = concat.call(props, Object.getOwnPropertySymbols(map));
		}
		for (var i = 0; i < props.length; i += 1) {
			defineProperty$1(object, props[i], map[props[i]], predicates[props[i]]);
		}
	};

	defineProperties$1.supportsDescriptors = !!supportsDescriptors$2;

	var defineProperties_1 = defineProperties$1;

	var callBind$5 = {exports: {}};

	(function (module) {

		var bind = functionBind;
		var GetIntrinsic = getIntrinsic;

		var $apply = GetIntrinsic('%Function.prototype.apply%');
		var $call = GetIntrinsic('%Function.prototype.call%');
		var $reflectApply = GetIntrinsic('%Reflect.apply%', true) || bind.call($call, $apply);

		var $gOPD = GetIntrinsic('%Object.getOwnPropertyDescriptor%', true);
		var $defineProperty = GetIntrinsic('%Object.defineProperty%', true);
		var $max = GetIntrinsic('%Math.max%');

		if ($defineProperty) {
			try {
				$defineProperty({}, 'a', { value: 1 });
			} catch (e) {
				// IE 8 has a broken defineProperty
				$defineProperty = null;
			}
		}

		module.exports = function callBind(originalFunction) {
			var func = $reflectApply(bind, $call, arguments);
			if ($gOPD && $defineProperty) {
				var desc = $gOPD(func, 'length');
				if (desc.configurable) {
					// original length, plus the receiver, minus any additional arguments (after the receiver)
					$defineProperty(
						func,
						'length',
						{ value: 1 + $max(0, originalFunction.length - (arguments.length - 1)) }
					);
				}
			}
			return func;
		};

		var applyBind = function applyBind() {
			return $reflectApply(bind, $apply, arguments);
		};

		if ($defineProperty) {
			$defineProperty(module.exports, 'apply', { value: applyBind });
		} else {
			module.exports.apply = applyBind;
		} 
	} (callBind$5));

	var callBindExports = callBind$5.exports;

	var GetIntrinsic$5 = getIntrinsic;

	var callBind$4 = callBindExports;

	var $indexOf$1 = callBind$4(GetIntrinsic$5('String.prototype.indexOf'));

	var callBound$b = function callBoundIntrinsic(name, allowMissing) {
		var intrinsic = GetIntrinsic$5(name, !!allowMissing);
		if (typeof intrinsic === 'function' && $indexOf$1(name, '.prototype.') > -1) {
			return callBind$4(intrinsic);
		}
		return intrinsic;
	};

	// modified from https://github.com/es-shims/es6-shim
	var objectKeys$1 = objectKeys$2;
	var hasSymbols$2 = shams$1();
	var callBound$a = callBound$b;
	var toObject = Object;
	var $push = callBound$a('Array.prototype.push');
	var $propIsEnumerable = callBound$a('Object.prototype.propertyIsEnumerable');
	var originalGetSymbols = hasSymbols$2 ? Object.getOwnPropertySymbols : null;

	// eslint-disable-next-line no-unused-vars
	var implementation$8 = function assign(target, source1) {
		if (target == null) { throw new TypeError('target must be an object'); }
		var to = toObject(target); // step 1
		if (arguments.length === 1) {
			return to; // step 2
		}
		for (var s = 1; s < arguments.length; ++s) {
			var from = toObject(arguments[s]); // step 3.a.i

			// step 3.a.ii:
			var keys = objectKeys$1(from);
			var getSymbols = hasSymbols$2 && (Object.getOwnPropertySymbols || originalGetSymbols);
			if (getSymbols) {
				var syms = getSymbols(from);
				for (var j = 0; j < syms.length; ++j) {
					var key = syms[j];
					if ($propIsEnumerable(from, key)) {
						$push(keys, key);
					}
				}
			}

			// step 3.a.iii:
			for (var i = 0; i < keys.length; ++i) {
				var nextKey = keys[i];
				if ($propIsEnumerable(from, nextKey)) { // step 3.a.iii.2
					var propValue = from[nextKey]; // step 3.a.iii.2.a
					to[nextKey] = propValue; // step 3.a.iii.2.b
				}
			}
		}

		return to; // step 4
	};

	var implementation$7 = implementation$8;

	var lacksProperEnumerationOrder = function () {
		if (!Object.assign) {
			return false;
		}
		/*
		 * v8, specifically in node 4.x, has a bug with incorrect property enumeration order
		 * note: this does not detect the bug unless there's 20 characters
		 */
		var str = 'abcdefghijklmnopqrst';
		var letters = str.split('');
		var map = {};
		for (var i = 0; i < letters.length; ++i) {
			map[letters[i]] = letters[i];
		}
		var obj = Object.assign({}, map);
		var actual = '';
		for (var k in obj) {
			actual += k;
		}
		return str !== actual;
	};

	var assignHasPendingExceptions = function () {
		if (!Object.assign || !Object.preventExtensions) {
			return false;
		}
		/*
		 * Firefox 37 still has "pending exception" logic in its Object.assign implementation,
		 * which is 72% slower than our shim, and Firefox 40's native implementation.
		 */
		var thrower = Object.preventExtensions({ 1: 2 });
		try {
			Object.assign(thrower, 'xy');
		} catch (e) {
			return thrower[1] === 'y';
		}
		return false;
	};

	var polyfill$4 = function getPolyfill() {
		if (!Object.assign) {
			return implementation$7;
		}
		if (lacksProperEnumerationOrder()) {
			return implementation$7;
		}
		if (assignHasPendingExceptions()) {
			return implementation$7;
		}
		return Object.assign;
	};

	var define$3 = defineProperties_1;
	var getPolyfill$5 = polyfill$4;

	var shim$5 = function shimAssign() {
		var polyfill = getPolyfill$5();
		define$3(
			Object,
			{ assign: polyfill },
			{ assign: function () { return Object.assign !== polyfill; } }
		);
		return polyfill;
	};

	var defineProperties = defineProperties_1;
	var callBind$3 = callBindExports;

	var implementation$6 = implementation$8;
	var getPolyfill$4 = polyfill$4;
	var shim$4 = shim$5;

	var polyfill$3 = callBind$3.apply(getPolyfill$4());
	// eslint-disable-next-line no-unused-vars
	var bound = function assign(target, source1) {
		return polyfill$3(Object, arguments);
	};

	defineProperties(bound, {
		getPolyfill: getPolyfill$4,
		implementation: implementation$6,
		shim: shim$4
	});

	var object_assign = bound;

	var implementation$5 = {exports: {}};

	var functionsHaveNames = function functionsHaveNames() {
		return typeof function f() {}.name === 'string';
	};

	var gOPD$4 = Object.getOwnPropertyDescriptor;
	if (gOPD$4) {
		try {
			gOPD$4([], 'length');
		} catch (e) {
			// IE 8 has a broken gOPD
			gOPD$4 = null;
		}
	}

	functionsHaveNames.functionsHaveConfigurableNames = function functionsHaveConfigurableNames() {
		if (!functionsHaveNames() || !gOPD$4) {
			return false;
		}
		var desc = gOPD$4(function () {}, 'name');
		return !!desc && !!desc.configurable;
	};

	var $bind = Function.prototype.bind;

	functionsHaveNames.boundFunctionsHaveNames = function boundFunctionsHaveNames() {
		return functionsHaveNames() && typeof $bind === 'function' && function f() {}.bind().name !== '';
	};

	var functionsHaveNames_1 = functionsHaveNames;

	(function (module) {

		var functionsHaveConfigurableNames = functionsHaveNames_1.functionsHaveConfigurableNames();

		var $Object = Object;
		var $TypeError = TypeError;

		module.exports = function flags() {
			if (this != null && this !== $Object(this)) {
				throw new $TypeError('RegExp.prototype.flags getter called on non-object');
			}
			var result = '';
			if (this.hasIndices) {
				result += 'd';
			}
			if (this.global) {
				result += 'g';
			}
			if (this.ignoreCase) {
				result += 'i';
			}
			if (this.multiline) {
				result += 'm';
			}
			if (this.dotAll) {
				result += 's';
			}
			if (this.unicode) {
				result += 'u';
			}
			if (this.unicodeSets) {
				result += 'v';
			}
			if (this.sticky) {
				result += 'y';
			}
			return result;
		};

		if (functionsHaveConfigurableNames && Object.defineProperty) {
			Object.defineProperty(module.exports, 'name', { value: 'get flags' });
		} 
	} (implementation$5));

	var implementationExports = implementation$5.exports;

	var implementation$4 = implementationExports;

	var supportsDescriptors$1 = defineProperties_1.supportsDescriptors;
	var $gOPD$1 = Object.getOwnPropertyDescriptor;

	var polyfill$2 = function getPolyfill() {
		if (supportsDescriptors$1 && (/a/mig).flags === 'gim') {
			var descriptor = $gOPD$1(RegExp.prototype, 'flags');
			if (
				descriptor
				&& typeof descriptor.get === 'function'
				&& typeof RegExp.prototype.dotAll === 'boolean'
				&& typeof RegExp.prototype.hasIndices === 'boolean'
			) {
				/* eslint getter-return: 0 */
				var calls = '';
				var o = {};
				Object.defineProperty(o, 'hasIndices', {
					get: function () {
						calls += 'd';
					}
				});
				Object.defineProperty(o, 'sticky', {
					get: function () {
						calls += 'y';
					}
				});
				if (calls === 'dy') {
					return descriptor.get;
				}
			}
		}
		return implementation$4;
	};

	var supportsDescriptors = defineProperties_1.supportsDescriptors;
	var getPolyfill$3 = polyfill$2;
	var gOPD$3 = Object.getOwnPropertyDescriptor;
	var defineProperty = Object.defineProperty;
	var TypeErr = TypeError;
	var getProto = Object.getPrototypeOf;
	var regex = /a/;

	var shim$3 = function shimFlags() {
		if (!supportsDescriptors || !getProto) {
			throw new TypeErr('RegExp.prototype.flags requires a true ES5 environment that supports property descriptors');
		}
		var polyfill = getPolyfill$3();
		var proto = getProto(regex);
		var descriptor = gOPD$3(proto, 'flags');
		if (!descriptor || descriptor.get !== polyfill) {
			defineProperty(proto, 'flags', {
				configurable: true,
				enumerable: false,
				get: polyfill
			});
		}
		return polyfill;
	};

	var define$2 = defineProperties_1;
	var callBind$2 = callBindExports;

	var implementation$3 = implementationExports;
	var getPolyfill$2 = polyfill$2;
	var shim$2 = shim$3;

	var flagsBound = callBind$2(getPolyfill$2());

	define$2(flagsBound, {
		getPolyfill: getPolyfill$2,
		implementation: implementation$3,
		shim: shim$2
	});

	var regexp_prototype_flags = flagsBound;

	// this should only run in node >= 13.2, so it
	// does not need any of the intense fallbacks that old node/browsers do

	var $iterator = Symbol.iterator;
	var node = function getIterator(iterable) {
		// alternatively, `iterable[$iterator]?.()`
		if (iterable != null && typeof iterable[$iterator] !== 'undefined') {
			return iterable[$iterator]();
		}
	};

	var util_inspect = require$$0.inspect;

	var hasMap = typeof Map === 'function' && Map.prototype;
	var mapSizeDescriptor = Object.getOwnPropertyDescriptor && hasMap ? Object.getOwnPropertyDescriptor(Map.prototype, 'size') : null;
	var mapSize = hasMap && mapSizeDescriptor && typeof mapSizeDescriptor.get === 'function' ? mapSizeDescriptor.get : null;
	var mapForEach = hasMap && Map.prototype.forEach;
	var hasSet = typeof Set === 'function' && Set.prototype;
	var setSizeDescriptor = Object.getOwnPropertyDescriptor && hasSet ? Object.getOwnPropertyDescriptor(Set.prototype, 'size') : null;
	var setSize = hasSet && setSizeDescriptor && typeof setSizeDescriptor.get === 'function' ? setSizeDescriptor.get : null;
	var setForEach = hasSet && Set.prototype.forEach;
	var hasWeakMap = typeof WeakMap === 'function' && WeakMap.prototype;
	var weakMapHas = hasWeakMap ? WeakMap.prototype.has : null;
	var hasWeakSet = typeof WeakSet === 'function' && WeakSet.prototype;
	var weakSetHas = hasWeakSet ? WeakSet.prototype.has : null;
	var hasWeakRef = typeof WeakRef === 'function' && WeakRef.prototype;
	var weakRefDeref = hasWeakRef ? WeakRef.prototype.deref : null;
	var booleanValueOf = Boolean.prototype.valueOf;
	var objectToString = Object.prototype.toString;
	var functionToString = Function.prototype.toString;
	var $match = String.prototype.match;
	var $slice$2 = String.prototype.slice;
	var $replace = String.prototype.replace;
	var $toUpperCase = String.prototype.toUpperCase;
	var $toLowerCase = String.prototype.toLowerCase;
	var $test = RegExp.prototype.test;
	var $concat = Array.prototype.concat;
	var $join = Array.prototype.join;
	var $arrSlice = Array.prototype.slice;
	var $floor = Math.floor;
	var bigIntValueOf$1 = typeof BigInt === 'function' ? BigInt.prototype.valueOf : null;
	var gOPS = Object.getOwnPropertySymbols;
	var symToString = typeof Symbol === 'function' && typeof Symbol.iterator === 'symbol' ? Symbol.prototype.toString : null;
	var hasShammedSymbols = typeof Symbol === 'function' && typeof Symbol.iterator === 'object';
	// ie, `has-tostringtag/shams
	var toStringTag = typeof Symbol === 'function' && Symbol.toStringTag && (typeof Symbol.toStringTag === hasShammedSymbols ? 'object' : 'symbol')
	    ? Symbol.toStringTag
	    : null;
	var isEnumerable = Object.prototype.propertyIsEnumerable;

	var gPO$1 = (typeof Reflect === 'function' ? Reflect.getPrototypeOf : Object.getPrototypeOf) || (
	    [].__proto__ === Array.prototype // eslint-disable-line no-proto
	        ? function (O) {
	            return O.__proto__; // eslint-disable-line no-proto
	        }
	        : null
	);

	function addNumericSeparator(num, str) {
	    if (
	        num === Infinity
	        || num === -Infinity
	        || num !== num
	        || (num && num > -1000 && num < 1000)
	        || $test.call(/e/, str)
	    ) {
	        return str;
	    }
	    var sepRegex = /[0-9](?=(?:[0-9]{3})+(?![0-9]))/g;
	    if (typeof num === 'number') {
	        var int = num < 0 ? -$floor(-num) : $floor(num); // trunc(num)
	        if (int !== num) {
	            var intStr = String(int);
	            var dec = $slice$2.call(str, intStr.length + 1);
	            return $replace.call(intStr, sepRegex, '$&_') + '.' + $replace.call($replace.call(dec, /([0-9]{3})/g, '$&_'), /_$/, '');
	        }
	    }
	    return $replace.call(str, sepRegex, '$&_');
	}

	var utilInspect = util_inspect;
	var inspectCustom = utilInspect.custom;
	var inspectSymbol = isSymbol$2(inspectCustom) ? inspectCustom : null;

	var objectInspect = function inspect_(obj, options, depth, seen) {
	    var opts = options || {};

	    if (has$1(opts, 'quoteStyle') && (opts.quoteStyle !== 'single' && opts.quoteStyle !== 'double')) {
	        throw new TypeError('option "quoteStyle" must be "single" or "double"');
	    }
	    if (
	        has$1(opts, 'maxStringLength') && (typeof opts.maxStringLength === 'number'
	            ? opts.maxStringLength < 0 && opts.maxStringLength !== Infinity
	            : opts.maxStringLength !== null
	        )
	    ) {
	        throw new TypeError('option "maxStringLength", if provided, must be a positive integer, Infinity, or `null`');
	    }
	    var customInspect = has$1(opts, 'customInspect') ? opts.customInspect : true;
	    if (typeof customInspect !== 'boolean' && customInspect !== 'symbol') {
	        throw new TypeError('option "customInspect", if provided, must be `true`, `false`, or `\'symbol\'`');
	    }

	    if (
	        has$1(opts, 'indent')
	        && opts.indent !== null
	        && opts.indent !== '\t'
	        && !(parseInt(opts.indent, 10) === opts.indent && opts.indent > 0)
	    ) {
	        throw new TypeError('option "indent" must be "\\t", an integer > 0, or `null`');
	    }
	    if (has$1(opts, 'numericSeparator') && typeof opts.numericSeparator !== 'boolean') {
	        throw new TypeError('option "numericSeparator", if provided, must be `true` or `false`');
	    }
	    var numericSeparator = opts.numericSeparator;

	    if (typeof obj === 'undefined') {
	        return 'undefined';
	    }
	    if (obj === null) {
	        return 'null';
	    }
	    if (typeof obj === 'boolean') {
	        return obj ? 'true' : 'false';
	    }

	    if (typeof obj === 'string') {
	        return inspectString(obj, opts);
	    }
	    if (typeof obj === 'number') {
	        if (obj === 0) {
	            return Infinity / obj > 0 ? '0' : '-0';
	        }
	        var str = String(obj);
	        return numericSeparator ? addNumericSeparator(obj, str) : str;
	    }
	    if (typeof obj === 'bigint') {
	        var bigIntStr = String(obj) + 'n';
	        return numericSeparator ? addNumericSeparator(obj, bigIntStr) : bigIntStr;
	    }

	    var maxDepth = typeof opts.depth === 'undefined' ? 5 : opts.depth;
	    if (typeof depth === 'undefined') { depth = 0; }
	    if (depth >= maxDepth && maxDepth > 0 && typeof obj === 'object') {
	        return isArray$1(obj) ? '[Array]' : '[Object]';
	    }

	    var indent = getIndent(opts, depth);

	    if (typeof seen === 'undefined') {
	        seen = [];
	    } else if (indexOf(seen, obj) >= 0) {
	        return '[Circular]';
	    }

	    function inspect(value, from, noIndent) {
	        if (from) {
	            seen = $arrSlice.call(seen);
	            seen.push(from);
	        }
	        if (noIndent) {
	            var newOpts = {
	                depth: opts.depth
	            };
	            if (has$1(opts, 'quoteStyle')) {
	                newOpts.quoteStyle = opts.quoteStyle;
	            }
	            return inspect_(value, newOpts, depth + 1, seen);
	        }
	        return inspect_(value, opts, depth + 1, seen);
	    }

	    if (typeof obj === 'function' && !isRegExp(obj)) { // in older engines, regexes are callable
	        var name = nameOf(obj);
	        var keys = arrObjKeys(obj, inspect);
	        return '[Function' + (name ? ': ' + name : ' (anonymous)') + ']' + (keys.length > 0 ? ' { ' + $join.call(keys, ', ') + ' }' : '');
	    }
	    if (isSymbol$2(obj)) {
	        var symString = hasShammedSymbols ? $replace.call(String(obj), /^(Symbol\(.*\))_[^)]*$/, '$1') : symToString.call(obj);
	        return typeof obj === 'object' && !hasShammedSymbols ? markBoxed(symString) : symString;
	    }
	    if (isElement(obj)) {
	        var s = '<' + $toLowerCase.call(String(obj.nodeName));
	        var attrs = obj.attributes || [];
	        for (var i = 0; i < attrs.length; i++) {
	            s += ' ' + attrs[i].name + '=' + wrapQuotes(quote(attrs[i].value), 'double', opts);
	        }
	        s += '>';
	        if (obj.childNodes && obj.childNodes.length) { s += '...'; }
	        s += '</' + $toLowerCase.call(String(obj.nodeName)) + '>';
	        return s;
	    }
	    if (isArray$1(obj)) {
	        if (obj.length === 0) { return '[]'; }
	        var xs = arrObjKeys(obj, inspect);
	        if (indent && !singleLineValues(xs)) {
	            return '[' + indentedJoin(xs, indent) + ']';
	        }
	        return '[ ' + $join.call(xs, ', ') + ' ]';
	    }
	    if (isError(obj)) {
	        var parts = arrObjKeys(obj, inspect);
	        if (!('cause' in Error.prototype) && 'cause' in obj && !isEnumerable.call(obj, 'cause')) {
	            return '{ [' + String(obj) + '] ' + $join.call($concat.call('[cause]: ' + inspect(obj.cause), parts), ', ') + ' }';
	        }
	        if (parts.length === 0) { return '[' + String(obj) + ']'; }
	        return '{ [' + String(obj) + '] ' + $join.call(parts, ', ') + ' }';
	    }
	    if (typeof obj === 'object' && customInspect) {
	        if (inspectSymbol && typeof obj[inspectSymbol] === 'function' && utilInspect) {
	            return utilInspect(obj, { depth: maxDepth - depth });
	        } else if (customInspect !== 'symbol' && typeof obj.inspect === 'function') {
	            return obj.inspect();
	        }
	    }
	    if (isMap$2(obj)) {
	        var mapParts = [];
	        if (mapForEach) {
	            mapForEach.call(obj, function (value, key) {
	                mapParts.push(inspect(key, obj, true) + ' => ' + inspect(value, obj));
	            });
	        }
	        return collectionOf('Map', mapSize.call(obj), mapParts, indent);
	    }
	    if (isSet$2(obj)) {
	        var setParts = [];
	        if (setForEach) {
	            setForEach.call(obj, function (value) {
	                setParts.push(inspect(value, obj));
	            });
	        }
	        return collectionOf('Set', setSize.call(obj), setParts, indent);
	    }
	    if (isWeakMap$1(obj)) {
	        return weakCollectionOf('WeakMap');
	    }
	    if (isWeakSet$1(obj)) {
	        return weakCollectionOf('WeakSet');
	    }
	    if (isWeakRef(obj)) {
	        return weakCollectionOf('WeakRef');
	    }
	    if (isNumber$1(obj)) {
	        return markBoxed(inspect(Number(obj)));
	    }
	    if (isBigInt$1(obj)) {
	        return markBoxed(inspect(bigIntValueOf$1.call(obj)));
	    }
	    if (isBoolean$1(obj)) {
	        return markBoxed(booleanValueOf.call(obj));
	    }
	    if (isString$2(obj)) {
	        return markBoxed(inspect(String(obj)));
	    }
	    if (!isDate$1(obj) && !isRegExp(obj)) {
	        var ys = arrObjKeys(obj, inspect);
	        var isPlainObject = gPO$1 ? gPO$1(obj) === Object.prototype : obj instanceof Object || obj.constructor === Object;
	        var protoTag = obj instanceof Object ? '' : 'null prototype';
	        var stringTag = !isPlainObject && toStringTag && Object(obj) === obj && toStringTag in obj ? $slice$2.call(toStr$6(obj), 8, -1) : protoTag ? 'Object' : '';
	        var constructorTag = isPlainObject || typeof obj.constructor !== 'function' ? '' : obj.constructor.name ? obj.constructor.name + ' ' : '';
	        var tag = constructorTag + (stringTag || protoTag ? '[' + $join.call($concat.call([], stringTag || [], protoTag || []), ': ') + '] ' : '');
	        if (ys.length === 0) { return tag + '{}'; }
	        if (indent) {
	            return tag + '{' + indentedJoin(ys, indent) + '}';
	        }
	        return tag + '{ ' + $join.call(ys, ', ') + ' }';
	    }
	    return String(obj);
	};

	function wrapQuotes(s, defaultStyle, opts) {
	    var quoteChar = (opts.quoteStyle || defaultStyle) === 'double' ? '"' : "'";
	    return quoteChar + s + quoteChar;
	}

	function quote(s) {
	    return $replace.call(String(s), /"/g, '&quot;');
	}

	function isArray$1(obj) { return toStr$6(obj) === '[object Array]' && (!toStringTag || !(typeof obj === 'object' && toStringTag in obj)); }
	function isDate$1(obj) { return toStr$6(obj) === '[object Date]' && (!toStringTag || !(typeof obj === 'object' && toStringTag in obj)); }
	function isRegExp(obj) { return toStr$6(obj) === '[object RegExp]' && (!toStringTag || !(typeof obj === 'object' && toStringTag in obj)); }
	function isError(obj) { return toStr$6(obj) === '[object Error]' && (!toStringTag || !(typeof obj === 'object' && toStringTag in obj)); }
	function isString$2(obj) { return toStr$6(obj) === '[object String]' && (!toStringTag || !(typeof obj === 'object' && toStringTag in obj)); }
	function isNumber$1(obj) { return toStr$6(obj) === '[object Number]' && (!toStringTag || !(typeof obj === 'object' && toStringTag in obj)); }
	function isBoolean$1(obj) { return toStr$6(obj) === '[object Boolean]' && (!toStringTag || !(typeof obj === 'object' && toStringTag in obj)); }

	// Symbol and BigInt do have Symbol.toStringTag by spec, so that can't be used to eliminate false positives
	function isSymbol$2(obj) {
	    if (hasShammedSymbols) {
	        return obj && typeof obj === 'object' && obj instanceof Symbol;
	    }
	    if (typeof obj === 'symbol') {
	        return true;
	    }
	    if (!obj || typeof obj !== 'object' || !symToString) {
	        return false;
	    }
	    try {
	        symToString.call(obj);
	        return true;
	    } catch (e) {}
	    return false;
	}

	function isBigInt$1(obj) {
	    if (!obj || typeof obj !== 'object' || !bigIntValueOf$1) {
	        return false;
	    }
	    try {
	        bigIntValueOf$1.call(obj);
	        return true;
	    } catch (e) {}
	    return false;
	}

	var hasOwn = Object.prototype.hasOwnProperty || function (key) { return key in this; };
	function has$1(obj, key) {
	    return hasOwn.call(obj, key);
	}

	function toStr$6(obj) {
	    return objectToString.call(obj);
	}

	function nameOf(f) {
	    if (f.name) { return f.name; }
	    var m = $match.call(functionToString.call(f), /^function\s*([\w$]+)/);
	    if (m) { return m[1]; }
	    return null;
	}

	function indexOf(xs, x) {
	    if (xs.indexOf) { return xs.indexOf(x); }
	    for (var i = 0, l = xs.length; i < l; i++) {
	        if (xs[i] === x) { return i; }
	    }
	    return -1;
	}

	function isMap$2(x) {
	    if (!mapSize || !x || typeof x !== 'object') {
	        return false;
	    }
	    try {
	        mapSize.call(x);
	        try {
	            setSize.call(x);
	        } catch (s) {
	            return true;
	        }
	        return x instanceof Map; // core-js workaround, pre-v2.5.0
	    } catch (e) {}
	    return false;
	}

	function isWeakMap$1(x) {
	    if (!weakMapHas || !x || typeof x !== 'object') {
	        return false;
	    }
	    try {
	        weakMapHas.call(x, weakMapHas);
	        try {
	            weakSetHas.call(x, weakSetHas);
	        } catch (s) {
	            return true;
	        }
	        return x instanceof WeakMap; // core-js workaround, pre-v2.5.0
	    } catch (e) {}
	    return false;
	}

	function isWeakRef(x) {
	    if (!weakRefDeref || !x || typeof x !== 'object') {
	        return false;
	    }
	    try {
	        weakRefDeref.call(x);
	        return true;
	    } catch (e) {}
	    return false;
	}

	function isSet$2(x) {
	    if (!setSize || !x || typeof x !== 'object') {
	        return false;
	    }
	    try {
	        setSize.call(x);
	        try {
	            mapSize.call(x);
	        } catch (m) {
	            return true;
	        }
	        return x instanceof Set; // core-js workaround, pre-v2.5.0
	    } catch (e) {}
	    return false;
	}

	function isWeakSet$1(x) {
	    if (!weakSetHas || !x || typeof x !== 'object') {
	        return false;
	    }
	    try {
	        weakSetHas.call(x, weakSetHas);
	        try {
	            weakMapHas.call(x, weakMapHas);
	        } catch (s) {
	            return true;
	        }
	        return x instanceof WeakSet; // core-js workaround, pre-v2.5.0
	    } catch (e) {}
	    return false;
	}

	function isElement(x) {
	    if (!x || typeof x !== 'object') { return false; }
	    if (typeof HTMLElement !== 'undefined' && x instanceof HTMLElement) {
	        return true;
	    }
	    return typeof x.nodeName === 'string' && typeof x.getAttribute === 'function';
	}

	function inspectString(str, opts) {
	    if (str.length > opts.maxStringLength) {
	        var remaining = str.length - opts.maxStringLength;
	        var trailer = '... ' + remaining + ' more character' + (remaining > 1 ? 's' : '');
	        return inspectString($slice$2.call(str, 0, opts.maxStringLength), opts) + trailer;
	    }
	    // eslint-disable-next-line no-control-regex
	    var s = $replace.call($replace.call(str, /(['\\])/g, '\\$1'), /[\x00-\x1f]/g, lowbyte);
	    return wrapQuotes(s, 'single', opts);
	}

	function lowbyte(c) {
	    var n = c.charCodeAt(0);
	    var x = {
	        8: 'b',
	        9: 't',
	        10: 'n',
	        12: 'f',
	        13: 'r'
	    }[n];
	    if (x) { return '\\' + x; }
	    return '\\x' + (n < 0x10 ? '0' : '') + $toUpperCase.call(n.toString(16));
	}

	function markBoxed(str) {
	    return 'Object(' + str + ')';
	}

	function weakCollectionOf(type) {
	    return type + ' { ? }';
	}

	function collectionOf(type, size, entries, indent) {
	    var joinedEntries = indent ? indentedJoin(entries, indent) : $join.call(entries, ', ');
	    return type + ' (' + size + ') {' + joinedEntries + '}';
	}

	function singleLineValues(xs) {
	    for (var i = 0; i < xs.length; i++) {
	        if (indexOf(xs[i], '\n') >= 0) {
	            return false;
	        }
	    }
	    return true;
	}

	function getIndent(opts, depth) {
	    var baseIndent;
	    if (opts.indent === '\t') {
	        baseIndent = '\t';
	    } else if (typeof opts.indent === 'number' && opts.indent > 0) {
	        baseIndent = $join.call(Array(opts.indent + 1), ' ');
	    } else {
	        return null;
	    }
	    return {
	        base: baseIndent,
	        prev: $join.call(Array(depth + 1), baseIndent)
	    };
	}

	function indentedJoin(xs, indent) {
	    if (xs.length === 0) { return ''; }
	    var lineJoiner = '\n' + indent.prev + indent.base;
	    return lineJoiner + $join.call(xs, ',' + lineJoiner) + '\n' + indent.prev;
	}

	function arrObjKeys(obj, inspect) {
	    var isArr = isArray$1(obj);
	    var xs = [];
	    if (isArr) {
	        xs.length = obj.length;
	        for (var i = 0; i < obj.length; i++) {
	            xs[i] = has$1(obj, i) ? inspect(obj[i], obj) : '';
	        }
	    }
	    var syms = typeof gOPS === 'function' ? gOPS(obj) : [];
	    var symMap;
	    if (hasShammedSymbols) {
	        symMap = {};
	        for (var k = 0; k < syms.length; k++) {
	            symMap['$' + syms[k]] = syms[k];
	        }
	    }

	    for (var key in obj) { // eslint-disable-line no-restricted-syntax
	        if (!has$1(obj, key)) { continue; } // eslint-disable-line no-restricted-syntax, no-continue
	        if (isArr && String(Number(key)) === key && key < obj.length) { continue; } // eslint-disable-line no-restricted-syntax, no-continue
	        if (hasShammedSymbols && symMap['$' + key] instanceof Symbol) {
	            // this is to prevent shammed Symbols, which are stored as strings, from being included in the string key section
	            continue; // eslint-disable-line no-restricted-syntax, no-continue
	        } else if ($test.call(/[^\w$]/, key)) {
	            xs.push(inspect(key, obj) + ': ' + inspect(obj[key], obj));
	        } else {
	            xs.push(key + ': ' + inspect(obj[key], obj));
	        }
	    }
	    if (typeof gOPS === 'function') {
	        for (var j = 0; j < syms.length; j++) {
	            if (isEnumerable.call(obj, syms[j])) {
	                xs.push('[' + inspect(syms[j]) + ']: ' + inspect(obj[syms[j]], obj));
	            }
	        }
	    }
	    return xs;
	}

	var GetIntrinsic$4 = getIntrinsic;
	var callBound$9 = callBound$b;
	var inspect = objectInspect;

	var $TypeError = GetIntrinsic$4('%TypeError%');
	var $WeakMap$1 = GetIntrinsic$4('%WeakMap%', true);
	var $Map$2 = GetIntrinsic$4('%Map%', true);

	var $weakMapGet = callBound$9('WeakMap.prototype.get', true);
	var $weakMapSet = callBound$9('WeakMap.prototype.set', true);
	var $weakMapHas = callBound$9('WeakMap.prototype.has', true);
	var $mapGet$1 = callBound$9('Map.prototype.get', true);
	var $mapSet = callBound$9('Map.prototype.set', true);
	var $mapHas$5 = callBound$9('Map.prototype.has', true);

	/*
	 * This function traverses the list returning the node corresponding to the
	 * given key.
	 *
	 * That node is also moved to the head of the list, so that if it's accessed
	 * again we don't need to traverse the whole list. By doing so, all the recently
	 * used nodes can be accessed relatively quickly.
	 */
	var listGetNode = function (list, key) { // eslint-disable-line consistent-return
		for (var prev = list, curr; (curr = prev.next) !== null; prev = curr) {
			if (curr.key === key) {
				prev.next = curr.next;
				curr.next = list.next;
				list.next = curr; // eslint-disable-line no-param-reassign
				return curr;
			}
		}
	};

	var listGet = function (objects, key) {
		var node = listGetNode(objects, key);
		return node && node.value;
	};
	var listSet = function (objects, key, value) {
		var node = listGetNode(objects, key);
		if (node) {
			node.value = value;
		} else {
			// Prepend the new node to the beginning of the list
			objects.next = { // eslint-disable-line no-param-reassign
				key: key,
				next: objects.next,
				value: value
			};
		}
	};
	var listHas = function (objects, key) {
		return !!listGetNode(objects, key);
	};

	var sideChannel = function getSideChannel() {
		var $wm;
		var $m;
		var $o;
		var channel = {
			assert: function (key) {
				if (!channel.has(key)) {
					throw new $TypeError('Side channel does not contain ' + inspect(key));
				}
			},
			get: function (key) { // eslint-disable-line consistent-return
				if ($WeakMap$1 && key && (typeof key === 'object' || typeof key === 'function')) {
					if ($wm) {
						return $weakMapGet($wm, key);
					}
				} else if ($Map$2) {
					if ($m) {
						return $mapGet$1($m, key);
					}
				} else {
					if ($o) { // eslint-disable-line no-lonely-if
						return listGet($o, key);
					}
				}
			},
			has: function (key) {
				if ($WeakMap$1 && key && (typeof key === 'object' || typeof key === 'function')) {
					if ($wm) {
						return $weakMapHas($wm, key);
					}
				} else if ($Map$2) {
					if ($m) {
						return $mapHas$5($m, key);
					}
				} else {
					if ($o) { // eslint-disable-line no-lonely-if
						return listHas($o, key);
					}
				}
				return false;
			},
			set: function (key, value) {
				if ($WeakMap$1 && key && (typeof key === 'object' || typeof key === 'function')) {
					if (!$wm) {
						$wm = new $WeakMap$1();
					}
					$weakMapSet($wm, key, value);
				} else if ($Map$2) {
					if (!$m) {
						$m = new $Map$2();
					}
					$mapSet($m, key, value);
				} else {
					if (!$o) {
						/*
						 * Initialize the linked list as an empty node, so that we don't have
						 * to special-case handling of the first node: we can always refer to
						 * it as (previous node).next, instead of something like (list).head
						 */
						$o = { key: {}, next: null };
					}
					listSet($o, key, value);
				}
			}
		};
		return channel;
	};

	var numberIsNaN = function (value) {
		return value !== value;
	};

	var implementation$2 = function is(a, b) {
		if (a === 0 && b === 0) {
			return 1 / a === 1 / b;
		}
		if (a === b) {
			return true;
		}
		if (numberIsNaN(a) && numberIsNaN(b)) {
			return true;
		}
		return false;
	};

	var implementation$1 = implementation$2;

	var polyfill$1 = function getPolyfill() {
		return typeof Object.is === 'function' ? Object.is : implementation$1;
	};

	var getPolyfill$1 = polyfill$1;
	var define$1 = defineProperties_1;

	var shim$1 = function shimObjectIs() {
		var polyfill = getPolyfill$1();
		define$1(Object, { is: polyfill }, {
			is: function testObjectIs() {
				return Object.is !== polyfill;
			}
		});
		return polyfill;
	};

	var define = defineProperties_1;
	var callBind$1 = callBindExports;

	var implementation = implementation$2;
	var getPolyfill = polyfill$1;
	var shim = shim$1;

	var polyfill = callBind$1(getPolyfill(), Object);

	define(polyfill, {
		getPolyfill: getPolyfill,
		implementation: implementation,
		shim: shim
	});

	var objectIs = polyfill;

	var hasSymbols$1 = shams$1;

	var shams = function hasToStringTagShams() {
		return hasSymbols$1() && !!Symbol.toStringTag;
	};

	var hasToStringTag$8 = shams();
	var callBound$8 = callBound$b;

	var $toString$4 = callBound$8('Object.prototype.toString');

	var isStandardArguments = function isArguments(value) {
		if (hasToStringTag$8 && value && typeof value === 'object' && Symbol.toStringTag in value) {
			return false;
		}
		return $toString$4(value) === '[object Arguments]';
	};

	var isLegacyArguments = function isArguments(value) {
		if (isStandardArguments(value)) {
			return true;
		}
		return value !== null &&
			typeof value === 'object' &&
			typeof value.length === 'number' &&
			value.length >= 0 &&
			$toString$4(value) !== '[object Array]' &&
			$toString$4(value.callee) === '[object Function]';
	};

	var supportsStandardArguments = (function () {
		return isStandardArguments(arguments);
	}());

	isStandardArguments.isLegacyArguments = isLegacyArguments; // for tests

	var isArguments$1 = supportsStandardArguments ? isStandardArguments : isLegacyArguments;

	var toString = {}.toString;

	var isarray = Array.isArray || function (arr) {
	  return toString.call(arr) == '[object Array]';
	};

	var fnToStr = Function.prototype.toString;
	var reflectApply = typeof Reflect === 'object' && Reflect !== null && Reflect.apply;
	var badArrayLike;
	var isCallableMarker;
	if (typeof reflectApply === 'function' && typeof Object.defineProperty === 'function') {
		try {
			badArrayLike = Object.defineProperty({}, 'length', {
				get: function () {
					throw isCallableMarker;
				}
			});
			isCallableMarker = {};
			// eslint-disable-next-line no-throw-literal
			reflectApply(function () { throw 42; }, null, badArrayLike);
		} catch (_) {
			if (_ !== isCallableMarker) {
				reflectApply = null;
			}
		}
	} else {
		reflectApply = null;
	}

	var constructorRegex = /^\s*class\b/;
	var isES6ClassFn = function isES6ClassFunction(value) {
		try {
			var fnStr = fnToStr.call(value);
			return constructorRegex.test(fnStr);
		} catch (e) {
			return false; // not a function
		}
	};

	var tryFunctionObject = function tryFunctionToStr(value) {
		try {
			if (isES6ClassFn(value)) { return false; }
			fnToStr.call(value);
			return true;
		} catch (e) {
			return false;
		}
	};
	var toStr$5 = Object.prototype.toString;
	var objectClass = '[object Object]';
	var fnClass = '[object Function]';
	var genClass = '[object GeneratorFunction]';
	var ddaClass = '[object HTMLAllCollection]'; // IE 11
	var ddaClass2 = '[object HTML document.all class]';
	var ddaClass3 = '[object HTMLCollection]'; // IE 9-10
	var hasToStringTag$7 = typeof Symbol === 'function' && !!Symbol.toStringTag; // better: use `has-tostringtag`

	var isIE68 = !(0 in [,]); // eslint-disable-line no-sparse-arrays, comma-spacing

	var isDDA = function isDocumentDotAll() { return false; };
	if (typeof document === 'object') {
		// Firefox 3 canonicalizes DDA to undefined when it's not accessed directly
		var all = document.all;
		if (toStr$5.call(all) === toStr$5.call(document.all)) {
			isDDA = function isDocumentDotAll(value) {
				/* globals document: false */
				// in IE 6-8, typeof document.all is "object" and it's truthy
				if ((isIE68 || !value) && (typeof value === 'undefined' || typeof value === 'object')) {
					try {
						var str = toStr$5.call(value);
						return (
							str === ddaClass
							|| str === ddaClass2
							|| str === ddaClass3 // opera 12.16
							|| str === objectClass // IE 6-8
						) && value('') == null; // eslint-disable-line eqeqeq
					} catch (e) { /**/ }
				}
				return false;
			};
		}
	}

	var isCallable$1 = reflectApply
		? function isCallable(value) {
			if (isDDA(value)) { return true; }
			if (!value) { return false; }
			if (typeof value !== 'function' && typeof value !== 'object') { return false; }
			try {
				reflectApply(value, null, badArrayLike);
			} catch (e) {
				if (e !== isCallableMarker) { return false; }
			}
			return !isES6ClassFn(value) && tryFunctionObject(value);
		}
		: function isCallable(value) {
			if (isDDA(value)) { return true; }
			if (!value) { return false; }
			if (typeof value !== 'function' && typeof value !== 'object') { return false; }
			if (hasToStringTag$7) { return tryFunctionObject(value); }
			if (isES6ClassFn(value)) { return false; }
			var strClass = toStr$5.call(value);
			if (strClass !== fnClass && strClass !== genClass && !(/^\[object HTML/).test(strClass)) { return false; }
			return tryFunctionObject(value);
		};

	var isCallable = isCallable$1;

	var toStr$4 = Object.prototype.toString;
	var hasOwnProperty = Object.prototype.hasOwnProperty;

	var forEachArray = function forEachArray(array, iterator, receiver) {
	    for (var i = 0, len = array.length; i < len; i++) {
	        if (hasOwnProperty.call(array, i)) {
	            if (receiver == null) {
	                iterator(array[i], i, array);
	            } else {
	                iterator.call(receiver, array[i], i, array);
	            }
	        }
	    }
	};

	var forEachString = function forEachString(string, iterator, receiver) {
	    for (var i = 0, len = string.length; i < len; i++) {
	        // no such thing as a sparse string.
	        if (receiver == null) {
	            iterator(string.charAt(i), i, string);
	        } else {
	            iterator.call(receiver, string.charAt(i), i, string);
	        }
	    }
	};

	var forEachObject = function forEachObject(object, iterator, receiver) {
	    for (var k in object) {
	        if (hasOwnProperty.call(object, k)) {
	            if (receiver == null) {
	                iterator(object[k], k, object);
	            } else {
	                iterator.call(receiver, object[k], k, object);
	            }
	        }
	    }
	};

	var forEach$2 = function forEach(list, iterator, thisArg) {
	    if (!isCallable(iterator)) {
	        throw new TypeError('iterator must be a function');
	    }

	    var receiver;
	    if (arguments.length >= 3) {
	        receiver = thisArg;
	    }

	    if (toStr$4.call(list) === '[object Array]') {
	        forEachArray(list, iterator, receiver);
	    } else if (typeof list === 'string') {
	        forEachString(list, iterator, receiver);
	    } else {
	        forEachObject(list, iterator, receiver);
	    }
	};

	var forEach_1 = forEach$2;

	var possibleNames = [
		'BigInt64Array',
		'BigUint64Array',
		'Float32Array',
		'Float64Array',
		'Int16Array',
		'Int32Array',
		'Int8Array',
		'Uint16Array',
		'Uint32Array',
		'Uint8Array',
		'Uint8ClampedArray'
	];

	var g$2 = typeof globalThis === 'undefined' ? commonjsGlobal : globalThis;

	var availableTypedArrays$2 = function availableTypedArrays() {
		var out = [];
		for (var i = 0; i < possibleNames.length; i++) {
			if (typeof g$2[possibleNames[i]] === 'function') {
				out[out.length] = possibleNames[i];
			}
		}
		return out;
	};

	var GetIntrinsic$3 = getIntrinsic;

	var $gOPD = GetIntrinsic$3('%Object.getOwnPropertyDescriptor%', true);

	if ($gOPD) {
		try {
			$gOPD([], 'length');
		} catch (e) {
			// IE 8 has a broken gOPD
			$gOPD = null;
		}
	}

	var gopd = $gOPD;

	var forEach$1 = forEach_1;
	var availableTypedArrays$1 = availableTypedArrays$2;
	var callBound$7 = callBound$b;

	var $toString$3 = callBound$7('Object.prototype.toString');
	var hasToStringTag$6 = shams();
	var gOPD$2 = gopd;

	var g$1 = typeof globalThis === 'undefined' ? commonjsGlobal : globalThis;
	var typedArrays$1 = availableTypedArrays$1();

	var $indexOf = callBound$7('Array.prototype.indexOf', true) || function indexOf(array, value) {
		for (var i = 0; i < array.length; i += 1) {
			if (array[i] === value) {
				return i;
			}
		}
		return -1;
	};
	var $slice$1 = callBound$7('String.prototype.slice');
	var toStrTags$1 = {};
	var getPrototypeOf$1 = Object.getPrototypeOf; // require('getprototypeof');
	if (hasToStringTag$6 && gOPD$2 && getPrototypeOf$1) {
		forEach$1(typedArrays$1, function (typedArray) {
			var arr = new g$1[typedArray]();
			if (Symbol.toStringTag in arr) {
				var proto = getPrototypeOf$1(arr);
				var descriptor = gOPD$2(proto, Symbol.toStringTag);
				if (!descriptor) {
					var superProto = getPrototypeOf$1(proto);
					descriptor = gOPD$2(superProto, Symbol.toStringTag);
				}
				toStrTags$1[typedArray] = descriptor.get;
			}
		});
	}

	var tryTypedArrays$1 = function tryAllTypedArrays(value) {
		var anyTrue = false;
		forEach$1(toStrTags$1, function (getter, typedArray) {
			if (!anyTrue) {
				try {
					anyTrue = getter.call(value) === typedArray;
				} catch (e) { /**/ }
			}
		});
		return anyTrue;
	};

	var isTypedArray$2 = function isTypedArray(value) {
		if (!value || typeof value !== 'object') { return false; }
		if (!hasToStringTag$6 || !(Symbol.toStringTag in value)) {
			var tag = $slice$1($toString$3(value), 8, -1);
			return $indexOf(typedArrays$1, tag) > -1;
		}
		if (!gOPD$2) { return false; }
		return tryTypedArrays$1(value);
	};

	var callBind = callBindExports;
	var callBound$6 = callBound$b;
	var GetIntrinsic$2 = getIntrinsic;
	var isTypedArray$1 = isTypedArray$2;

	var $ArrayBuffer = GetIntrinsic$2('ArrayBuffer', true);
	var $Float32Array = GetIntrinsic$2('Float32Array', true);
	var $byteLength$1 = callBound$6('ArrayBuffer.prototype.byteLength', true);

	// in node 0.10, ArrayBuffers have no prototype methods, but have an own slot-checking `slice` method
	var abSlice = $ArrayBuffer && !$byteLength$1 && new $ArrayBuffer().slice;
	var $abSlice = abSlice && callBind(abSlice);

	var isArrayBuffer$1 = $byteLength$1 || $abSlice
		? function isArrayBuffer(obj) {
			if (!obj || typeof obj !== 'object') {
				return false;
			}
			try {
				if ($byteLength$1) {
					$byteLength$1(obj);
				} else {
					$abSlice(obj, 0);
				}
				return true;
			} catch (e) {
				return false;
			}
		}
		: $Float32Array
			// in node 0.8, ArrayBuffers have no prototype or own methods
			? function IsArrayBuffer(obj) {
				try {
					return (new $Float32Array(obj)).buffer === obj && !isTypedArray$1(obj);
				} catch (e) {
					return typeof obj === 'object' && e.name === 'RangeError';
				}
			}
			: function isArrayBuffer(obj) { // eslint-disable-line no-unused-vars
				return false;
			};

	var getDay = Date.prototype.getDay;
	var tryDateObject = function tryDateGetDayCall(value) {
		try {
			getDay.call(value);
			return true;
		} catch (e) {
			return false;
		}
	};

	var toStr$3 = Object.prototype.toString;
	var dateClass = '[object Date]';
	var hasToStringTag$5 = shams();

	var isDateObject = function isDateObject(value) {
		if (typeof value !== 'object' || value === null) {
			return false;
		}
		return hasToStringTag$5 ? tryDateObject(value) : toStr$3.call(value) === dateClass;
	};

	var callBound$5 = callBound$b;
	var hasToStringTag$4 = shams();
	var has;
	var $exec;
	var isRegexMarker;
	var badStringifier;

	if (hasToStringTag$4) {
		has = callBound$5('Object.prototype.hasOwnProperty');
		$exec = callBound$5('RegExp.prototype.exec');
		isRegexMarker = {};

		var throwRegexMarker = function () {
			throw isRegexMarker;
		};
		badStringifier = {
			toString: throwRegexMarker,
			valueOf: throwRegexMarker
		};

		if (typeof Symbol.toPrimitive === 'symbol') {
			badStringifier[Symbol.toPrimitive] = throwRegexMarker;
		}
	}

	var $toString$2 = callBound$5('Object.prototype.toString');
	var gOPD$1 = Object.getOwnPropertyDescriptor;
	var regexClass = '[object RegExp]';

	var isRegex$1 = hasToStringTag$4
		// eslint-disable-next-line consistent-return
		? function isRegex(value) {
			if (!value || typeof value !== 'object') {
				return false;
			}

			var descriptor = gOPD$1(value, 'lastIndex');
			var hasLastIndexDataProperty = descriptor && has(descriptor, 'value');
			if (!hasLastIndexDataProperty) {
				return false;
			}

			try {
				$exec(value, badStringifier);
			} catch (e) {
				return e === isRegexMarker;
			}
		}
		: function isRegex(value) {
			// In older browsers, typeof regex incorrectly returns 'function'
			if (!value || (typeof value !== 'object' && typeof value !== 'function')) {
				return false;
			}

			return $toString$2(value) === regexClass;
		};

	var callBound$4 = callBound$b;

	var $byteLength = callBound$4('SharedArrayBuffer.prototype.byteLength', true);

	var isSharedArrayBuffer$1 = $byteLength
		? function isSharedArrayBuffer(obj) {
			if (!obj || typeof obj !== 'object') {
				return false;
			}
			try {
				$byteLength(obj);
				return true;
			} catch (e) {
				return false;
			}
		}
		: function isSharedArrayBuffer(obj) { // eslint-disable-line no-unused-vars
			return false;
		};

	var strValue = String.prototype.valueOf;
	var tryStringObject = function tryStringObject(value) {
		try {
			strValue.call(value);
			return true;
		} catch (e) {
			return false;
		}
	};
	var toStr$2 = Object.prototype.toString;
	var strClass = '[object String]';
	var hasToStringTag$3 = shams();

	var isString$1 = function isString(value) {
		if (typeof value === 'string') {
			return true;
		}
		if (typeof value !== 'object') {
			return false;
		}
		return hasToStringTag$3 ? tryStringObject(value) : toStr$2.call(value) === strClass;
	};

	var numToStr = Number.prototype.toString;
	var tryNumberObject = function tryNumberObject(value) {
		try {
			numToStr.call(value);
			return true;
		} catch (e) {
			return false;
		}
	};
	var toStr$1 = Object.prototype.toString;
	var numClass = '[object Number]';
	var hasToStringTag$2 = shams();

	var isNumberObject = function isNumberObject(value) {
		if (typeof value === 'number') {
			return true;
		}
		if (typeof value !== 'object') {
			return false;
		}
		return hasToStringTag$2 ? tryNumberObject(value) : toStr$1.call(value) === numClass;
	};

	var callBound$3 = callBound$b;
	var $boolToStr = callBound$3('Boolean.prototype.toString');
	var $toString$1 = callBound$3('Object.prototype.toString');

	var tryBooleanObject = function booleanBrandCheck(value) {
		try {
			$boolToStr(value);
			return true;
		} catch (e) {
			return false;
		}
	};
	var boolClass = '[object Boolean]';
	var hasToStringTag$1 = shams();

	var isBooleanObject = function isBoolean(value) {
		if (typeof value === 'boolean') {
			return true;
		}
		if (value === null || typeof value !== 'object') {
			return false;
		}
		return hasToStringTag$1 && Symbol.toStringTag in value ? tryBooleanObject(value) : $toString$1(value) === boolClass;
	};

	var isSymbol$1 = {exports: {}};

	var toStr = Object.prototype.toString;
	var hasSymbols = hasSymbols$5();

	if (hasSymbols) {
		var symToStr = Symbol.prototype.toString;
		var symStringRegex = /^Symbol\(.*\)$/;
		var isSymbolObject = function isRealSymbolObject(value) {
			if (typeof value.valueOf() !== 'symbol') {
				return false;
			}
			return symStringRegex.test(symToStr.call(value));
		};

		isSymbol$1.exports = function isSymbol(value) {
			if (typeof value === 'symbol') {
				return true;
			}
			if (toStr.call(value) !== '[object Symbol]') {
				return false;
			}
			try {
				return isSymbolObject(value);
			} catch (e) {
				return false;
			}
		};
	} else {

		isSymbol$1.exports = function isSymbol(value) {
			// this environment does not support Symbols.
			return false ;
		};
	}

	var isSymbolExports = isSymbol$1.exports;

	var isBigint = {exports: {}};

	var $BigInt = typeof BigInt !== 'undefined' && BigInt;

	var hasBigints = function hasNativeBigInts() {
		return typeof $BigInt === 'function'
			&& typeof BigInt === 'function'
			&& typeof $BigInt(42) === 'bigint' // eslint-disable-line no-magic-numbers
			&& typeof BigInt(42) === 'bigint'; // eslint-disable-line no-magic-numbers
	};

	var hasBigInts = hasBigints();

	if (hasBigInts) {
		var bigIntValueOf = BigInt.prototype.valueOf;
		var tryBigInt = function tryBigIntObject(value) {
			try {
				bigIntValueOf.call(value);
				return true;
			} catch (e) {
			}
			return false;
		};

		isBigint.exports = function isBigInt(value) {
			if (
				value === null
				|| typeof value === 'undefined'
				|| typeof value === 'boolean'
				|| typeof value === 'string'
				|| typeof value === 'number'
				|| typeof value === 'symbol'
				|| typeof value === 'function'
			) {
				return false;
			}
			if (typeof value === 'bigint') {
				return true;
			}

			return tryBigInt(value);
		};
	} else {
		isBigint.exports = function isBigInt(value) {
			return false ;
		};
	}

	var isBigintExports = isBigint.exports;

	var isString = isString$1;
	var isNumber = isNumberObject;
	var isBoolean = isBooleanObject;
	var isSymbol = isSymbolExports;
	var isBigInt = isBigintExports;

	// eslint-disable-next-line consistent-return
	var whichBoxedPrimitive$1 = function whichBoxedPrimitive(value) {
		// eslint-disable-next-line eqeqeq
		if (value == null || (typeof value !== 'object' && typeof value !== 'function')) {
			return null;
		}
		if (isString(value)) {
			return 'String';
		}
		if (isNumber(value)) {
			return 'Number';
		}
		if (isBoolean(value)) {
			return 'Boolean';
		}
		if (isSymbol(value)) {
			return 'Symbol';
		}
		if (isBigInt(value)) {
			return 'BigInt';
		}
	};

	var $Map$1 = typeof Map === 'function' && Map.prototype ? Map : null;
	var $Set$2 = typeof Set === 'function' && Set.prototype ? Set : null;

	var exported$2;

	if (!$Map$1) {
		// eslint-disable-next-line no-unused-vars
		exported$2 = function isMap(x) {
			// `Map` is not present in this environment.
			return false;
		};
	}

	var $mapHas$4 = $Map$1 ? Map.prototype.has : null;
	var $setHas$4 = $Set$2 ? Set.prototype.has : null;
	if (!exported$2 && !$mapHas$4) {
		// eslint-disable-next-line no-unused-vars
		exported$2 = function isMap(x) {
			// `Map` does not have a `has` method
			return false;
		};
	}

	var isMap$1 = exported$2 || function isMap(x) {
		if (!x || typeof x !== 'object') {
			return false;
		}
		try {
			$mapHas$4.call(x);
			if ($setHas$4) {
				try {
					$setHas$4.call(x);
				} catch (e) {
					return true;
				}
			}
			return x instanceof $Map$1; // core-js workaround, pre-v2.5.0
		} catch (e) {}
		return false;
	};

	var $Map = typeof Map === 'function' && Map.prototype ? Map : null;
	var $Set$1 = typeof Set === 'function' && Set.prototype ? Set : null;

	var exported$1;

	if (!$Set$1) {
		// eslint-disable-next-line no-unused-vars
		exported$1 = function isSet(x) {
			// `Set` is not present in this environment.
			return false;
		};
	}

	var $mapHas$3 = $Map ? Map.prototype.has : null;
	var $setHas$3 = $Set$1 ? Set.prototype.has : null;
	if (!exported$1 && !$setHas$3) {
		// eslint-disable-next-line no-unused-vars
		exported$1 = function isSet(x) {
			// `Set` does not have a `has` method
			return false;
		};
	}

	var isSet$1 = exported$1 || function isSet(x) {
		if (!x || typeof x !== 'object') {
			return false;
		}
		try {
			$setHas$3.call(x);
			if ($mapHas$3) {
				try {
					$mapHas$3.call(x);
				} catch (e) {
					return true;
				}
			}
			return x instanceof $Set$1; // core-js workaround, pre-v2.5.0
		} catch (e) {}
		return false;
	};

	var $WeakMap = typeof WeakMap === 'function' && WeakMap.prototype ? WeakMap : null;
	var $WeakSet$1 = typeof WeakSet === 'function' && WeakSet.prototype ? WeakSet : null;

	var exported;

	if (!$WeakMap) {
		// eslint-disable-next-line no-unused-vars
		exported = function isWeakMap(x) {
			// `WeakMap` is not present in this environment.
			return false;
		};
	}

	var $mapHas$2 = $WeakMap ? $WeakMap.prototype.has : null;
	var $setHas$2 = $WeakSet$1 ? $WeakSet$1.prototype.has : null;
	if (!exported && !$mapHas$2) {
		// eslint-disable-next-line no-unused-vars
		exported = function isWeakMap(x) {
			// `WeakMap` does not have a `has` method
			return false;
		};
	}

	var isWeakmap = exported || function isWeakMap(x) {
		if (!x || typeof x !== 'object') {
			return false;
		}
		try {
			$mapHas$2.call(x, $mapHas$2);
			if ($setHas$2) {
				try {
					$setHas$2.call(x, $setHas$2);
				} catch (e) {
					return true;
				}
			}
			return x instanceof $WeakMap; // core-js workaround, pre-v3
		} catch (e) {}
		return false;
	};

	var isWeakset = {exports: {}};

	var GetIntrinsic$1 = getIntrinsic;
	var callBound$2 = callBound$b;

	var $WeakSet = GetIntrinsic$1('%WeakSet%', true);

	var $setHas$1 = callBound$2('WeakSet.prototype.has', true);

	if ($setHas$1) {
		var $mapHas$1 = callBound$2('WeakMap.prototype.has', true);

		isWeakset.exports = function isWeakSet(x) {
			if (!x || typeof x !== 'object') {
				return false;
			}
			try {
				$setHas$1(x, $setHas$1);
				if ($mapHas$1) {
					try {
						$mapHas$1(x, $mapHas$1);
					} catch (e) {
						return true;
					}
				}
				return x instanceof $WeakSet; // core-js workaround, pre-v3
			} catch (e) {}
			return false;
		};
	} else {
		// eslint-disable-next-line no-unused-vars
		isWeakset.exports = function isWeakSet(x) {
			// `WeakSet` does not exist, or does not have a `has` method
			return false;
		};
	}

	var isWeaksetExports = isWeakset.exports;

	var isMap = isMap$1;
	var isSet = isSet$1;
	var isWeakMap = isWeakmap;
	var isWeakSet = isWeaksetExports;

	var whichCollection$1 = function whichCollection(value) {
		if (value && typeof value === 'object') {
			if (isMap(value)) {
				return 'Map';
			}
			if (isSet(value)) {
				return 'Set';
			}
			if (isWeakMap(value)) {
				return 'WeakMap';
			}
			if (isWeakSet(value)) {
				return 'WeakSet';
			}
		}
		return false;
	};

	var forEach = forEach_1;
	var availableTypedArrays = availableTypedArrays$2;
	var callBound$1 = callBound$b;
	var gOPD = gopd;

	var $toString = callBound$1('Object.prototype.toString');
	var hasToStringTag = shams();

	var g = typeof globalThis === 'undefined' ? commonjsGlobal : globalThis;
	var typedArrays = availableTypedArrays();

	var $slice = callBound$1('String.prototype.slice');
	var toStrTags = {};
	var getPrototypeOf = Object.getPrototypeOf; // require('getprototypeof');
	if (hasToStringTag && gOPD && getPrototypeOf) {
		forEach(typedArrays, function (typedArray) {
			if (typeof g[typedArray] === 'function') {
				var arr = new g[typedArray]();
				if (Symbol.toStringTag in arr) {
					var proto = getPrototypeOf(arr);
					var descriptor = gOPD(proto, Symbol.toStringTag);
					if (!descriptor) {
						var superProto = getPrototypeOf(proto);
						descriptor = gOPD(superProto, Symbol.toStringTag);
					}
					toStrTags[typedArray] = descriptor.get;
				}
			}
		});
	}

	var tryTypedArrays = function tryAllTypedArrays(value) {
		var foundName = false;
		forEach(toStrTags, function (getter, typedArray) {
			if (!foundName) {
				try {
					var name = getter.call(value);
					if (name === typedArray) {
						foundName = name;
					}
				} catch (e) {}
			}
		});
		return foundName;
	};

	var isTypedArray = isTypedArray$2;

	var whichTypedArray$1 = function whichTypedArray(value) {
		if (!isTypedArray(value)) { return false; }
		if (!hasToStringTag || !(Symbol.toStringTag in value)) { return $slice($toString(value), 8, -1); }
		return tryTypedArrays(value);
	};

	var assign = object_assign;
	var callBound = callBound$b;
	var flags = regexp_prototype_flags;
	var GetIntrinsic = getIntrinsic;
	var getIterator = node;
	var getSideChannel = sideChannel;
	var is = objectIs;
	var isArguments = isArguments$1;
	var isArray = isarray;
	var isArrayBuffer = isArrayBuffer$1;
	var isDate = isDateObject;
	var isRegex = isRegex$1;
	var isSharedArrayBuffer = isSharedArrayBuffer$1;
	var objectKeys = objectKeys$2;
	var whichBoxedPrimitive = whichBoxedPrimitive$1;
	var whichCollection = whichCollection$1;
	var whichTypedArray = whichTypedArray$1;

	var byteLength = callBound('ArrayBuffer.prototype.byteLength', true)
		|| function byteLength(ab) { return ab.byteLength; }; // in node < 0.11, byteLength is an own nonconfigurable property
	var sabByteLength = callBound('SharedArrayBuffer.prototype.byteLength', true);

	var $getTime = callBound('Date.prototype.getTime');
	var gPO = Object.getPrototypeOf;
	var $objToString = callBound('Object.prototype.toString');

	var $Set = GetIntrinsic('%Set%', true);
	var $mapHas = callBound('Map.prototype.has', true);
	var $mapGet = callBound('Map.prototype.get', true);
	var $mapSize = callBound('Map.prototype.size', true);
	var $setAdd = callBound('Set.prototype.add', true);
	var $setDelete = callBound('Set.prototype.delete', true);
	var $setHas = callBound('Set.prototype.has', true);
	var $setSize = callBound('Set.prototype.size', true);

	// taken from https://github.com/browserify/commonjs-assert/blob/bba838e9ba9e28edf3127ce6974624208502f6bc/internal/util/comparisons.js#L401-L414
	function setHasEqualElement(set, val1, opts, channel) {
	  var i = getIterator(set);
	  var result;
	  while ((result = i.next()) && !result.done) {
	    if (internalDeepEqual(val1, result.value, opts, channel)) { // eslint-disable-line no-use-before-define
	      // Remove the matching element to make sure we do not check that again.
	      $setDelete(set, result.value);
	      return true;
	    }
	  }

	  return false;
	}

	// taken from https://github.com/browserify/commonjs-assert/blob/bba838e9ba9e28edf3127ce6974624208502f6bc/internal/util/comparisons.js#L416-L439
	function findLooseMatchingPrimitives(prim) {
	  if (typeof prim === 'undefined') {
	    return null;
	  }
	  if (typeof prim === 'object') { // Only pass in null as object!
	    return void 0;
	  }
	  if (typeof prim === 'symbol') {
	    return false;
	  }
	  if (typeof prim === 'string' || typeof prim === 'number') {
	    // Loose equal entries exist only if the string is possible to convert to a regular number and not NaN.
	    return +prim === +prim; // eslint-disable-line no-implicit-coercion
	  }
	  return true;
	}

	// taken from https://github.com/browserify/commonjs-assert/blob/bba838e9ba9e28edf3127ce6974624208502f6bc/internal/util/comparisons.js#L449-L460
	function mapMightHaveLoosePrim(a, b, prim, item, opts, channel) {
	  var altValue = findLooseMatchingPrimitives(prim);
	  if (altValue != null) {
	    return altValue;
	  }
	  var curB = $mapGet(b, altValue);
	  var looseOpts = assign({}, opts, { strict: false });
	  if (
	    (typeof curB === 'undefined' && !$mapHas(b, altValue))
	    // eslint-disable-next-line no-use-before-define
	    || !internalDeepEqual(item, curB, looseOpts, channel)
	  ) {
	    return false;
	  }
	  // eslint-disable-next-line no-use-before-define
	  return !$mapHas(a, altValue) && internalDeepEqual(item, curB, looseOpts, channel);
	}

	// taken from https://github.com/browserify/commonjs-assert/blob/bba838e9ba9e28edf3127ce6974624208502f6bc/internal/util/comparisons.js#L441-L447
	function setMightHaveLoosePrim(a, b, prim) {
	  var altValue = findLooseMatchingPrimitives(prim);
	  if (altValue != null) {
	    return altValue;
	  }

	  return $setHas(b, altValue) && !$setHas(a, altValue);
	}

	// taken from https://github.com/browserify/commonjs-assert/blob/bba838e9ba9e28edf3127ce6974624208502f6bc/internal/util/comparisons.js#L518-L533
	function mapHasEqualEntry(set, map, key1, item1, opts, channel) {
	  var i = getIterator(set);
	  var result;
	  var key2;
	  while ((result = i.next()) && !result.done) {
	    key2 = result.value;
	    if (
	      // eslint-disable-next-line no-use-before-define
	      internalDeepEqual(key1, key2, opts, channel)
	      // eslint-disable-next-line no-use-before-define
	      && internalDeepEqual(item1, $mapGet(map, key2), opts, channel)
	    ) {
	      $setDelete(set, key2);
	      return true;
	    }
	  }

	  return false;
	}

	function internalDeepEqual(actual, expected, options, channel) {
	  var opts = options || {};

	  // 7.1. All identical values are equivalent, as determined by ===.
	  if (opts.strict ? is(actual, expected) : actual === expected) {
	    return true;
	  }

	  var actualBoxed = whichBoxedPrimitive(actual);
	  var expectedBoxed = whichBoxedPrimitive(expected);
	  if (actualBoxed !== expectedBoxed) {
	    return false;
	  }

	  // 7.3. Other pairs that do not both pass typeof value == 'object', equivalence is determined by ==.
	  if (!actual || !expected || (typeof actual !== 'object' && typeof expected !== 'object')) {
	    return opts.strict ? is(actual, expected) : actual == expected; // eslint-disable-line eqeqeq
	  }

	  /*
	   * 7.4. For all other Object pairs, including Array objects, equivalence is
	   * determined by having the same number of owned properties (as verified
	   * with Object.prototype.hasOwnProperty.call), the same set of keys
	   * (although not necessarily the same order), equivalent values for every
	   * corresponding key, and an identical 'prototype' property. Note: this
	   * accounts for both named and indexed properties on Arrays.
	   */
	  // see https://github.com/nodejs/node/commit/d3aafd02efd3a403d646a3044adcf14e63a88d32 for memos/channel inspiration

	  var hasActual = channel.has(actual);
	  var hasExpected = channel.has(expected);
	  var sentinel;
	  if (hasActual && hasExpected) {
	    if (channel.get(actual) === channel.get(expected)) {
	      return true;
	    }
	  } else {
	    sentinel = {};
	  }
	  if (!hasActual) { channel.set(actual, sentinel); }
	  if (!hasExpected) { channel.set(expected, sentinel); }

	  // eslint-disable-next-line no-use-before-define
	  return objEquiv(actual, expected, opts, channel);
	}

	function isBuffer(x) {
	  if (!x || typeof x !== 'object' || typeof x.length !== 'number') {
	    return false;
	  }
	  if (typeof x.copy !== 'function' || typeof x.slice !== 'function') {
	    return false;
	  }
	  if (x.length > 0 && typeof x[0] !== 'number') {
	    return false;
	  }

	  return !!(x.constructor && x.constructor.isBuffer && x.constructor.isBuffer(x));
	}

	function setEquiv(a, b, opts, channel) {
	  if ($setSize(a) !== $setSize(b)) {
	    return false;
	  }
	  var iA = getIterator(a);
	  var iB = getIterator(b);
	  var resultA;
	  var resultB;
	  var set;
	  while ((resultA = iA.next()) && !resultA.done) {
	    if (resultA.value && typeof resultA.value === 'object') {
	      if (!set) { set = new $Set(); }
	      $setAdd(set, resultA.value);
	    } else if (!$setHas(b, resultA.value)) {
	      if (opts.strict) { return false; }
	      if (!setMightHaveLoosePrim(a, b, resultA.value)) {
	        return false;
	      }
	      if (!set) { set = new $Set(); }
	      $setAdd(set, resultA.value);
	    }
	  }
	  if (set) {
	    while ((resultB = iB.next()) && !resultB.done) {
	      // We have to check if a primitive value is already matching and only if it's not, go hunting for it.
	      if (resultB.value && typeof resultB.value === 'object') {
	        if (!setHasEqualElement(set, resultB.value, opts.strict, channel)) {
	          return false;
	        }
	      } else if (
	        !opts.strict
	        && !$setHas(a, resultB.value)
	        && !setHasEqualElement(set, resultB.value, opts.strict, channel)
	      ) {
	        return false;
	      }
	    }
	    return $setSize(set) === 0;
	  }
	  return true;
	}

	function mapEquiv(a, b, opts, channel) {
	  if ($mapSize(a) !== $mapSize(b)) {
	    return false;
	  }
	  var iA = getIterator(a);
	  var iB = getIterator(b);
	  var resultA;
	  var resultB;
	  var set;
	  var key;
	  var item1;
	  var item2;
	  while ((resultA = iA.next()) && !resultA.done) {
	    key = resultA.value[0];
	    item1 = resultA.value[1];
	    if (key && typeof key === 'object') {
	      if (!set) { set = new $Set(); }
	      $setAdd(set, key);
	    } else {
	      item2 = $mapGet(b, key);
	      if ((typeof item2 === 'undefined' && !$mapHas(b, key)) || !internalDeepEqual(item1, item2, opts, channel)) {
	        if (opts.strict) {
	          return false;
	        }
	        if (!mapMightHaveLoosePrim(a, b, key, item1, opts, channel)) {
	          return false;
	        }
	        if (!set) { set = new $Set(); }
	        $setAdd(set, key);
	      }
	    }
	  }

	  if (set) {
	    while ((resultB = iB.next()) && !resultB.done) {
	      key = resultB.value[0];
	      item2 = resultB.value[1];
	      if (key && typeof key === 'object') {
	        if (!mapHasEqualEntry(set, a, key, item2, opts, channel)) {
	          return false;
	        }
	      } else if (
	        !opts.strict
	        && (!a.has(key) || !internalDeepEqual($mapGet(a, key), item2, opts, channel))
	        && !mapHasEqualEntry(set, a, key, item2, assign({}, opts, { strict: false }), channel)
	      ) {
	        return false;
	      }
	    }
	    return $setSize(set) === 0;
	  }
	  return true;
	}

	function objEquiv(a, b, opts, channel) {
	  /* eslint max-statements: [2, 100], max-lines-per-function: [2, 120], max-depth: [2, 5], max-lines: [2, 400] */
	  var i, key;

	  if (typeof a !== typeof b) { return false; }
	  if (a == null || b == null) { return false; }

	  if ($objToString(a) !== $objToString(b)) { return false; }

	  if (isArguments(a) !== isArguments(b)) { return false; }

	  var aIsArray = isArray(a);
	  var bIsArray = isArray(b);
	  if (aIsArray !== bIsArray) { return false; }

	  // TODO: replace when a cross-realm brand check is available
	  var aIsError = a instanceof Error;
	  var bIsError = b instanceof Error;
	  if (aIsError !== bIsError) { return false; }
	  if (aIsError || bIsError) {
	    if (a.name !== b.name || a.message !== b.message) { return false; }
	  }

	  var aIsRegex = isRegex(a);
	  var bIsRegex = isRegex(b);
	  if (aIsRegex !== bIsRegex) { return false; }
	  if ((aIsRegex || bIsRegex) && (a.source !== b.source || flags(a) !== flags(b))) {
	    return false;
	  }

	  var aIsDate = isDate(a);
	  var bIsDate = isDate(b);
	  if (aIsDate !== bIsDate) { return false; }
	  if (aIsDate || bIsDate) { // && would work too, because both are true or both false here
	    if ($getTime(a) !== $getTime(b)) { return false; }
	  }
	  if (opts.strict && gPO && gPO(a) !== gPO(b)) { return false; }

	  var aWhich = whichTypedArray(a);
	  var bWhich = whichTypedArray(b);
	  if ((aWhich || bWhich) && aWhich !== bWhich) {
	    return false;
	  }

	  var aIsBuffer = isBuffer(a);
	  var bIsBuffer = isBuffer(b);
	  if (aIsBuffer !== bIsBuffer) { return false; }
	  if (aIsBuffer || bIsBuffer) { // && would work too, because both are true or both false here
	    if (a.length !== b.length) { return false; }
	    for (i = 0; i < a.length; i++) {
	      if (a[i] !== b[i]) { return false; }
	    }
	    return true;
	  }

	  var aIsArrayBuffer = isArrayBuffer(a);
	  var bIsArrayBuffer = isArrayBuffer(b);
	  if (aIsArrayBuffer !== bIsArrayBuffer) { return false; }
	  if (aIsArrayBuffer || bIsArrayBuffer) { // && would work too, because both are true or both false here
	    if (byteLength(a) !== byteLength(b)) { return false; }
	    return typeof Uint8Array === 'function' && internalDeepEqual(new Uint8Array(a), new Uint8Array(b), opts, channel);
	  }

	  var aIsSAB = isSharedArrayBuffer(a);
	  var bIsSAB = isSharedArrayBuffer(b);
	  if (aIsSAB !== bIsSAB) { return false; }
	  if (aIsSAB || bIsSAB) { // && would work too, because both are true or both false here
	    if (sabByteLength(a) !== sabByteLength(b)) { return false; }
	    return typeof Uint8Array === 'function' && internalDeepEqual(new Uint8Array(a), new Uint8Array(b), opts, channel);
	  }

	  if (typeof a !== typeof b) { return false; }

	  var ka = objectKeys(a);
	  var kb = objectKeys(b);
	  // having the same number of owned properties (keys incorporates hasOwnProperty)
	  if (ka.length !== kb.length) { return false; }

	  // the same set of keys (although not necessarily the same order),
	  ka.sort();
	  kb.sort();
	  // ~~~cheap key test
	  for (i = ka.length - 1; i >= 0; i--) {
	    if (ka[i] != kb[i]) { return false; } // eslint-disable-line eqeqeq
	  }

	  // equivalent values for every corresponding key, and ~~~possibly expensive deep test
	  for (i = ka.length - 1; i >= 0; i--) {
	    key = ka[i];
	    if (!internalDeepEqual(a[key], b[key], opts, channel)) { return false; }
	  }

	  var aCollection = whichCollection(a);
	  var bCollection = whichCollection(b);
	  if (aCollection !== bCollection) {
	    return false;
	  }
	  if (aCollection === 'Set' || bCollection === 'Set') { // aCollection === bCollection
	    return setEquiv(a, b, opts, channel);
	  }
	  if (aCollection === 'Map') { // aCollection === bCollection
	    return mapEquiv(a, b, opts, channel);
	  }

	  return true;
	}

	var deepEqual = function deepEqual(a, b, opts) {
	  return internalDeepEqual(a, b, opts, getSideChannel());
	};

	var DeepEqual = /*@__PURE__*/getDefaultExportFromCjs(deepEqual);

	class EnvType {
	    _defaultValue = undefined;
	    _convertStrategy;
	    _env;
	    _allowedValues = [];
	    constructor(params) {
	        const { convertStrategy, env } = params;
	        this._convertStrategy = convertStrategy;
	        this._env = env;
	    }
	    default(defaultValue) {
	        this._loggerDebug('set default value', { defaultValue });
	        this._defaultValue = defaultValue;
	        return this;
	    }
	    get optional() {
	        this._loggerDebug(`optional`);
	        const strOrUndefined = this._env.envValue();
	        this._loggerDebug(`try to convert env string value "${strOrUndefined}"`);
	        const convertedValue = this._convertStrategy.convert(strOrUndefined);
	        if (convertedValue === undefined) {
	            this._loggerDebug(`using default value "${this._defaultValue}"`);
	        }
	        const optionalValue = convertedValue ?? this._defaultValue;
	        this._validateAllowedValues(optionalValue);
	        return optionalValue;
	    }
	    get required() {
	        this._loggerDebug(`is required`);
	        const envValue = this.optional;
	        if (envValue === undefined) {
	            throw this._createError('must have value defined');
	        }
	        return envValue;
	    }
	    allowed(...args) {
	        this._loggerDebug(`set allowed values`, { allowedValues: args });
	        this._allowedValues = [...args];
	        return this;
	    }
	    _validateAllowedValues(value) {
	        if (this._allowedValues.length === 0) {
	            return;
	        }
	        this._loggerDebug('validating allowed values for:', { value });
	        if (this._allowedValuesDoNotContain(value)) {
	            throw this._createError(`must have one of the fallowing values: ${this._allowedValuesToString()}`);
	        }
	    }
	    _allowedValuesDoNotContain(value) {
	        const result = this._allowedValues.find((v) => DeepEqual(value, v));
	        if (result === undefined && value === undefined) {
	            return false;
	        }
	        if (result === null && value === null) {
	            return false;
	        }
	        return !result;
	    }
	    _allowedValuesToString() {
	        return this._allowedValues.map((v) => JSON.stringify(v)).join(', ');
	    }
	    _loggerDebug(msg, ...args) {
	        logger().debug(`${this._envName} ${msg}`, ...args);
	    }
	    _createError(msg) {
	        return new Error(`${this._envName} ${msg}`);
	    }
	    get _envName() {
	        return `Env[${this._env.names.join(',')}]`;
	    }
	}

	class EnvFactory {
	    _env;
	    constructor(params) {
	        const { names, locationStrategies, namingStrategies } = params;
	        this._env = new Env({ locationStrategies, names, namingStrategies });
	    }
	    get string() {
	        return new EnvType({ convertStrategy: new ConvertStrategyToString(), env: this._env });
	    }
	    get boolean() {
	        return new EnvType({ convertStrategy: new ConvertStrategyToBoolean(), env: this._env });
	    }
	    get number() {
	        return new EnvType({ convertStrategy: new ConvertStrategyToNumber(), env: this._env });
	    }
	    json() {
	        return new EnvType({ convertStrategy: new ConvertStrategyToJson(), env: this._env });
	    }
	    get base64() {
	        return new EnvType({ convertStrategy: new ConvertStrategyBase64ToString(), env: this._env });
	    }
	}

	class LocationStrategyEnvironment {
	    valueByName(name) {
	        return process.env[name];
	    }
	}

	class NamingStrategySimpleName {
	    names(names) {
	        return [...names];
	    }
	}

	const MshEnv = (params) => {
	    const { locationStrategies = [new LocationStrategyEnvironment()], namingStrategies = [new NamingStrategySimpleName()] } = params ?? {};
	    return (...names) => {
	        logger().debug(`Initiate env: [${names.join(', ')}]`);
	        return new EnvFactory({ locationStrategies, names: [...names], namingStrategies });
	    };
	};

	exports.MshEnv = MshEnv;

}));
