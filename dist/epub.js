(function webpackUniversalModuleDefinition(root, factory) {
	if(typeof exports === 'object' && typeof module === 'object')
		module.exports = factory(require("JSZip"), require("localforage"));
	else if(typeof define === 'function' && define.amd)
		define(["JSZip", "localforage"], factory);
	else if(typeof exports === 'object')
		exports["ePub"] = factory(require("JSZip"), require("localforage"));
	else
		root["ePub"] = factory(root["JSZip"], root["localforage"]);
})(self, (__WEBPACK_EXTERNAL_MODULE__6838__, __WEBPACK_EXTERNAL_MODULE__6361__) => {
return /******/ (() => { // webpackBootstrap
/******/ 	var __webpack_modules__ = ({

/***/ 8263:
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

"use strict";


var isValue         = __webpack_require__(8175)
  , isPlainFunction = __webpack_require__(6873)
  , assign          = __webpack_require__(6596)
  , normalizeOpts   = __webpack_require__(148)
  , contains        = __webpack_require__(214);

var d = (module.exports = function (dscr, value/*, options*/) {
	var c, e, w, options, desc;
	if (arguments.length < 2 || typeof dscr !== "string") {
		options = value;
		value = dscr;
		dscr = null;
	} else {
		options = arguments[2];
	}
	if (isValue(dscr)) {
		c = contains.call(dscr, "c");
		e = contains.call(dscr, "e");
		w = contains.call(dscr, "w");
	} else {
		c = w = true;
		e = false;
	}

	desc = { value: value, configurable: c, enumerable: e, writable: w };
	return !options ? desc : assign(normalizeOpts(options), desc);
});

d.gs = function (dscr, get, set/*, options*/) {
	var c, e, options, desc;
	if (typeof dscr !== "string") {
		options = set;
		set = get;
		get = dscr;
		dscr = null;
	} else {
		options = arguments[3];
	}
	if (!isValue(get)) {
		get = undefined;
	} else if (!isPlainFunction(get)) {
		options = get;
		get = set = undefined;
	} else if (!isValue(set)) {
		set = undefined;
	} else if (!isPlainFunction(set)) {
		options = set;
		set = undefined;
	}
	if (isValue(dscr)) {
		c = contains.call(dscr, "c");
		e = contains.call(dscr, "e");
	} else {
		c = true;
		e = false;
	}

	desc = { get: get, set: set, configurable: c, enumerable: e };
	return !options ? desc : assign(normalizeOpts(options), desc);
};


/***/ }),

/***/ 6011:
/***/ ((module) => {

"use strict";


// eslint-disable-next-line no-empty-function
module.exports = function () {};


/***/ }),

/***/ 6596:
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

"use strict";


module.exports = __webpack_require__(5339)() ? Object.assign : __webpack_require__(3595);


/***/ }),

/***/ 5339:
/***/ ((module) => {

"use strict";


module.exports = function () {
	var assign = Object.assign, obj;
	if (typeof assign !== "function") return false;
	obj = { foo: "raz" };
	assign(obj, { bar: "dwa" }, { trzy: "trzy" });
	return obj.foo + obj.bar + obj.trzy === "razdwatrzy";
};


/***/ }),

/***/ 3595:
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

"use strict";


var keys  = __webpack_require__(2093)
  , value = __webpack_require__(7134)
  , max   = Math.max;

module.exports = function (dest, src /*, …srcn*/) {
	var error, i, length = max(arguments.length, 2), assign;
	dest = Object(value(dest));
	assign = function (key) {
		try {
			dest[key] = src[key];
		} catch (e) {
			if (!error) error = e;
		}
	};
	for (i = 1; i < length; ++i) {
		src = arguments[i];
		keys(src).forEach(assign);
	}
	if (error !== undefined) throw error;
	return dest;
};


/***/ }),

/***/ 9762:
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

"use strict";


var _undefined = __webpack_require__(6011)(); // Support ES3 engines

module.exports = function (val) { return val !== _undefined && val !== null; };


/***/ }),

/***/ 2093:
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

"use strict";


module.exports = __webpack_require__(3380)() ? Object.keys : __webpack_require__(4232);


/***/ }),

/***/ 3380:
/***/ ((module) => {

"use strict";


module.exports = function () {
	try {
		Object.keys("primitive");
		return true;
	} catch (e) {
		return false;
	}
};


/***/ }),

/***/ 4232:
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

"use strict";


var isValue = __webpack_require__(9762);

var keys = Object.keys;

module.exports = function (object) { return keys(isValue(object) ? Object(object) : object); };


/***/ }),

/***/ 148:
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

"use strict";


var isValue = __webpack_require__(9762);

var forEach = Array.prototype.forEach, create = Object.create;

var process = function (src, obj) {
	var key;
	for (key in src) obj[key] = src[key];
};

// eslint-disable-next-line no-unused-vars
module.exports = function (opts1 /*, …options*/) {
	var result = create(null);
	forEach.call(arguments, function (options) {
		if (!isValue(options)) return;
		process(Object(options), result);
	});
	return result;
};


/***/ }),

/***/ 5499:
/***/ ((module) => {

"use strict";


module.exports = function (fn) {
	if (typeof fn !== "function") throw new TypeError(fn + " is not a function");
	return fn;
};


/***/ }),

/***/ 7134:
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

"use strict";


var isValue = __webpack_require__(9762);

module.exports = function (value) {
	if (!isValue(value)) throw new TypeError("Cannot use null or undefined");
	return value;
};


/***/ }),

/***/ 214:
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

"use strict";


module.exports = __webpack_require__(525)() ? String.prototype.contains : __webpack_require__(1521);


/***/ }),

/***/ 525:
/***/ ((module) => {

"use strict";


var str = "razdwatrzy";

module.exports = function () {
	if (typeof str.contains !== "function") return false;
	return str.contains("dwa") === true && str.contains("foo") === false;
};


/***/ }),

/***/ 1521:
/***/ ((module) => {

"use strict";


var indexOf = String.prototype.indexOf;

module.exports = function (searchString /*, position*/) {
	return indexOf.call(this, searchString, arguments[1]) > -1;
};


/***/ }),

/***/ 3068:
/***/ ((module, exports, __webpack_require__) => {

"use strict";


var d        = __webpack_require__(8263)
  , callable = __webpack_require__(5499)

  , apply = Function.prototype.apply, call = Function.prototype.call
  , create = Object.create, defineProperty = Object.defineProperty
  , defineProperties = Object.defineProperties
  , hasOwnProperty = Object.prototype.hasOwnProperty
  , descriptor = { configurable: true, enumerable: false, writable: true }

  , on, once, off, emit, methods, descriptors, base;

on = function (type, listener) {
	var data;

	callable(listener);

	if (!hasOwnProperty.call(this, '__ee__')) {
		data = descriptor.value = create(null);
		defineProperty(this, '__ee__', descriptor);
		descriptor.value = null;
	} else {
		data = this.__ee__;
	}
	if (!data[type]) data[type] = listener;
	else if (typeof data[type] === 'object') data[type].push(listener);
	else data[type] = [data[type], listener];

	return this;
};

once = function (type, listener) {
	var once, self;

	callable(listener);
	self = this;
	on.call(this, type, once = function () {
		off.call(self, type, once);
		apply.call(listener, this, arguments);
	});

	once.__eeOnceListener__ = listener;
	return this;
};

off = function (type, listener) {
	var data, listeners, candidate, i;

	callable(listener);

	if (!hasOwnProperty.call(this, '__ee__')) return this;
	data = this.__ee__;
	if (!data[type]) return this;
	listeners = data[type];

	if (typeof listeners === 'object') {
		for (i = 0; (candidate = listeners[i]); ++i) {
			if ((candidate === listener) ||
					(candidate.__eeOnceListener__ === listener)) {
				if (listeners.length === 2) data[type] = listeners[i ? 0 : 1];
				else listeners.splice(i, 1);
			}
		}
	} else {
		if ((listeners === listener) ||
				(listeners.__eeOnceListener__ === listener)) {
			delete data[type];
		}
	}

	return this;
};

emit = function (type) {
	var i, l, listener, listeners, args;

	if (!hasOwnProperty.call(this, '__ee__')) return;
	listeners = this.__ee__[type];
	if (!listeners) return;

	if (typeof listeners === 'object') {
		l = arguments.length;
		args = new Array(l - 1);
		for (i = 1; i < l; ++i) args[i - 1] = arguments[i];

		listeners = listeners.slice();
		for (i = 0; (listener = listeners[i]); ++i) {
			apply.call(listener, this, args);
		}
	} else {
		switch (arguments.length) {
		case 1:
			call.call(listeners, this);
			break;
		case 2:
			call.call(listeners, this, arguments[1]);
			break;
		case 3:
			call.call(listeners, this, arguments[1], arguments[2]);
			break;
		default:
			l = arguments.length;
			args = new Array(l - 1);
			for (i = 1; i < l; ++i) {
				args[i - 1] = arguments[i];
			}
			apply.call(listeners, this, args);
		}
	}
};

methods = {
	on: on,
	once: once,
	off: off,
	emit: emit
};

descriptors = {
	on: d(on),
	once: d(once),
	off: d(off),
	emit: d(emit)
};

base = defineProperties({}, descriptors);

module.exports = exports = function (o) {
	return (o == null) ? create(base) : defineProperties(Object(o), descriptors);
};
exports.methods = methods;


/***/ }),

/***/ 1873:
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

var root = __webpack_require__(9325);

/** Built-in value references. */
var Symbol = root.Symbol;

module.exports = Symbol;


/***/ }),

/***/ 2552:
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

var Symbol = __webpack_require__(1873),
    getRawTag = __webpack_require__(659),
    objectToString = __webpack_require__(9350);

/** `Object#toString` result references. */
var nullTag = '[object Null]',
    undefinedTag = '[object Undefined]';

/** Built-in value references. */
var symToStringTag = Symbol ? Symbol.toStringTag : undefined;

/**
 * The base implementation of `getTag` without fallbacks for buggy environments.
 *
 * @private
 * @param {*} value The value to query.
 * @returns {string} Returns the `toStringTag`.
 */
function baseGetTag(value) {
  if (value == null) {
    return value === undefined ? undefinedTag : nullTag;
  }
  return (symToStringTag && symToStringTag in Object(value))
    ? getRawTag(value)
    : objectToString(value);
}

module.exports = baseGetTag;


/***/ }),

/***/ 4128:
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

var trimmedEndIndex = __webpack_require__(1800);

/** Used to match leading whitespace. */
var reTrimStart = /^\s+/;

/**
 * The base implementation of `_.trim`.
 *
 * @private
 * @param {string} string The string to trim.
 * @returns {string} Returns the trimmed string.
 */
function baseTrim(string) {
  return string
    ? string.slice(0, trimmedEndIndex(string) + 1).replace(reTrimStart, '')
    : string;
}

module.exports = baseTrim;


/***/ }),

/***/ 4840:
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

/** Detect free variable `global` from Node.js. */
var freeGlobal = typeof __webpack_require__.g == 'object' && __webpack_require__.g && __webpack_require__.g.Object === Object && __webpack_require__.g;

module.exports = freeGlobal;


/***/ }),

/***/ 659:
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

var Symbol = __webpack_require__(1873);

/** Used for built-in method references. */
var objectProto = Object.prototype;

/** Used to check objects for own properties. */
var hasOwnProperty = objectProto.hasOwnProperty;

/**
 * Used to resolve the
 * [`toStringTag`](http://ecma-international.org/ecma-262/7.0/#sec-object.prototype.tostring)
 * of values.
 */
var nativeObjectToString = objectProto.toString;

/** Built-in value references. */
var symToStringTag = Symbol ? Symbol.toStringTag : undefined;

/**
 * A specialized version of `baseGetTag` which ignores `Symbol.toStringTag` values.
 *
 * @private
 * @param {*} value The value to query.
 * @returns {string} Returns the raw `toStringTag`.
 */
function getRawTag(value) {
  var isOwn = hasOwnProperty.call(value, symToStringTag),
      tag = value[symToStringTag];

  try {
    value[symToStringTag] = undefined;
    var unmasked = true;
  } catch (e) {}

  var result = nativeObjectToString.call(value);
  if (unmasked) {
    if (isOwn) {
      value[symToStringTag] = tag;
    } else {
      delete value[symToStringTag];
    }
  }
  return result;
}

module.exports = getRawTag;


/***/ }),

/***/ 9350:
/***/ ((module) => {

/** Used for built-in method references. */
var objectProto = Object.prototype;

/**
 * Used to resolve the
 * [`toStringTag`](http://ecma-international.org/ecma-262/7.0/#sec-object.prototype.tostring)
 * of values.
 */
var nativeObjectToString = objectProto.toString;

/**
 * Converts `value` to a string using `Object.prototype.toString`.
 *
 * @private
 * @param {*} value The value to convert.
 * @returns {string} Returns the converted string.
 */
function objectToString(value) {
  return nativeObjectToString.call(value);
}

module.exports = objectToString;


/***/ }),

/***/ 9325:
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

var freeGlobal = __webpack_require__(4840);

/** Detect free variable `self`. */
var freeSelf = typeof self == 'object' && self && self.Object === Object && self;

/** Used as a reference to the global object. */
var root = freeGlobal || freeSelf || Function('return this')();

module.exports = root;


/***/ }),

/***/ 1800:
/***/ ((module) => {

/** Used to match a single whitespace character. */
var reWhitespace = /\s/;

/**
 * Used by `_.trim` and `_.trimEnd` to get the index of the last non-whitespace
 * character of `string`.
 *
 * @private
 * @param {string} string The string to inspect.
 * @returns {number} Returns the index of the last non-whitespace character.
 */
function trimmedEndIndex(string) {
  var index = string.length;

  while (index-- && reWhitespace.test(string.charAt(index))) {}
  return index;
}

module.exports = trimmedEndIndex;


/***/ }),

/***/ 8221:
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

var isObject = __webpack_require__(3805),
    now = __webpack_require__(124),
    toNumber = __webpack_require__(9374);

/** Error message constants. */
var FUNC_ERROR_TEXT = 'Expected a function';

/* Built-in method references for those with the same name as other `lodash` methods. */
var nativeMax = Math.max,
    nativeMin = Math.min;

/**
 * Creates a debounced function that delays invoking `func` until after `wait`
 * milliseconds have elapsed since the last time the debounced function was
 * invoked. The debounced function comes with a `cancel` method to cancel
 * delayed `func` invocations and a `flush` method to immediately invoke them.
 * Provide `options` to indicate whether `func` should be invoked on the
 * leading and/or trailing edge of the `wait` timeout. The `func` is invoked
 * with the last arguments provided to the debounced function. Subsequent
 * calls to the debounced function return the result of the last `func`
 * invocation.
 *
 * **Note:** If `leading` and `trailing` options are `true`, `func` is
 * invoked on the trailing edge of the timeout only if the debounced function
 * is invoked more than once during the `wait` timeout.
 *
 * If `wait` is `0` and `leading` is `false`, `func` invocation is deferred
 * until to the next tick, similar to `setTimeout` with a timeout of `0`.
 *
 * See [David Corbacho's article](https://css-tricks.com/debouncing-throttling-explained-examples/)
 * for details over the differences between `_.debounce` and `_.throttle`.
 *
 * @static
 * @memberOf _
 * @since 0.1.0
 * @category Function
 * @param {Function} func The function to debounce.
 * @param {number} [wait=0] The number of milliseconds to delay.
 * @param {Object} [options={}] The options object.
 * @param {boolean} [options.leading=false]
 *  Specify invoking on the leading edge of the timeout.
 * @param {number} [options.maxWait]
 *  The maximum time `func` is allowed to be delayed before it's invoked.
 * @param {boolean} [options.trailing=true]
 *  Specify invoking on the trailing edge of the timeout.
 * @returns {Function} Returns the new debounced function.
 * @example
 *
 * // Avoid costly calculations while the window size is in flux.
 * jQuery(window).on('resize', _.debounce(calculateLayout, 150));
 *
 * // Invoke `sendMail` when clicked, debouncing subsequent calls.
 * jQuery(element).on('click', _.debounce(sendMail, 300, {
 *   'leading': true,
 *   'trailing': false
 * }));
 *
 * // Ensure `batchLog` is invoked once after 1 second of debounced calls.
 * var debounced = _.debounce(batchLog, 250, { 'maxWait': 1000 });
 * var source = new EventSource('/stream');
 * jQuery(source).on('message', debounced);
 *
 * // Cancel the trailing debounced invocation.
 * jQuery(window).on('popstate', debounced.cancel);
 */
function debounce(func, wait, options) {
  var lastArgs,
      lastThis,
      maxWait,
      result,
      timerId,
      lastCallTime,
      lastInvokeTime = 0,
      leading = false,
      maxing = false,
      trailing = true;

  if (typeof func != 'function') {
    throw new TypeError(FUNC_ERROR_TEXT);
  }
  wait = toNumber(wait) || 0;
  if (isObject(options)) {
    leading = !!options.leading;
    maxing = 'maxWait' in options;
    maxWait = maxing ? nativeMax(toNumber(options.maxWait) || 0, wait) : maxWait;
    trailing = 'trailing' in options ? !!options.trailing : trailing;
  }

  function invokeFunc(time) {
    var args = lastArgs,
        thisArg = lastThis;

    lastArgs = lastThis = undefined;
    lastInvokeTime = time;
    result = func.apply(thisArg, args);
    return result;
  }

  function leadingEdge(time) {
    // Reset any `maxWait` timer.
    lastInvokeTime = time;
    // Start the timer for the trailing edge.
    timerId = setTimeout(timerExpired, wait);
    // Invoke the leading edge.
    return leading ? invokeFunc(time) : result;
  }

  function remainingWait(time) {
    var timeSinceLastCall = time - lastCallTime,
        timeSinceLastInvoke = time - lastInvokeTime,
        timeWaiting = wait - timeSinceLastCall;

    return maxing
      ? nativeMin(timeWaiting, maxWait - timeSinceLastInvoke)
      : timeWaiting;
  }

  function shouldInvoke(time) {
    var timeSinceLastCall = time - lastCallTime,
        timeSinceLastInvoke = time - lastInvokeTime;

    // Either this is the first call, activity has stopped and we're at the
    // trailing edge, the system time has gone backwards and we're treating
    // it as the trailing edge, or we've hit the `maxWait` limit.
    return (lastCallTime === undefined || (timeSinceLastCall >= wait) ||
      (timeSinceLastCall < 0) || (maxing && timeSinceLastInvoke >= maxWait));
  }

  function timerExpired() {
    var time = now();
    if (shouldInvoke(time)) {
      return trailingEdge(time);
    }
    // Restart the timer.
    timerId = setTimeout(timerExpired, remainingWait(time));
  }

  function trailingEdge(time) {
    timerId = undefined;

    // Only invoke if we have `lastArgs` which means `func` has been
    // debounced at least once.
    if (trailing && lastArgs) {
      return invokeFunc(time);
    }
    lastArgs = lastThis = undefined;
    return result;
  }

  function cancel() {
    if (timerId !== undefined) {
      clearTimeout(timerId);
    }
    lastInvokeTime = 0;
    lastArgs = lastCallTime = lastThis = timerId = undefined;
  }

  function flush() {
    return timerId === undefined ? result : trailingEdge(now());
  }

  function debounced() {
    var time = now(),
        isInvoking = shouldInvoke(time);

    lastArgs = arguments;
    lastThis = this;
    lastCallTime = time;

    if (isInvoking) {
      if (timerId === undefined) {
        return leadingEdge(lastCallTime);
      }
      if (maxing) {
        // Handle invocations in a tight loop.
        clearTimeout(timerId);
        timerId = setTimeout(timerExpired, wait);
        return invokeFunc(lastCallTime);
      }
    }
    if (timerId === undefined) {
      timerId = setTimeout(timerExpired, wait);
    }
    return result;
  }
  debounced.cancel = cancel;
  debounced.flush = flush;
  return debounced;
}

module.exports = debounce;


/***/ }),

/***/ 3805:
/***/ ((module) => {

/**
 * Checks if `value` is the
 * [language type](http://www.ecma-international.org/ecma-262/7.0/#sec-ecmascript-language-types)
 * of `Object`. (e.g. arrays, functions, objects, regexes, `new Number(0)`, and `new String('')`)
 *
 * @static
 * @memberOf _
 * @since 0.1.0
 * @category Lang
 * @param {*} value The value to check.
 * @returns {boolean} Returns `true` if `value` is an object, else `false`.
 * @example
 *
 * _.isObject({});
 * // => true
 *
 * _.isObject([1, 2, 3]);
 * // => true
 *
 * _.isObject(_.noop);
 * // => true
 *
 * _.isObject(null);
 * // => false
 */
function isObject(value) {
  var type = typeof value;
  return value != null && (type == 'object' || type == 'function');
}

module.exports = isObject;


/***/ }),

/***/ 346:
/***/ ((module) => {

/**
 * Checks if `value` is object-like. A value is object-like if it's not `null`
 * and has a `typeof` result of "object".
 *
 * @static
 * @memberOf _
 * @since 4.0.0
 * @category Lang
 * @param {*} value The value to check.
 * @returns {boolean} Returns `true` if `value` is object-like, else `false`.
 * @example
 *
 * _.isObjectLike({});
 * // => true
 *
 * _.isObjectLike([1, 2, 3]);
 * // => true
 *
 * _.isObjectLike(_.noop);
 * // => false
 *
 * _.isObjectLike(null);
 * // => false
 */
function isObjectLike(value) {
  return value != null && typeof value == 'object';
}

module.exports = isObjectLike;


/***/ }),

/***/ 4394:
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

var baseGetTag = __webpack_require__(2552),
    isObjectLike = __webpack_require__(346);

/** `Object#toString` result references. */
var symbolTag = '[object Symbol]';

/**
 * Checks if `value` is classified as a `Symbol` primitive or object.
 *
 * @static
 * @memberOf _
 * @since 4.0.0
 * @category Lang
 * @param {*} value The value to check.
 * @returns {boolean} Returns `true` if `value` is a symbol, else `false`.
 * @example
 *
 * _.isSymbol(Symbol.iterator);
 * // => true
 *
 * _.isSymbol('abc');
 * // => false
 */
function isSymbol(value) {
  return typeof value == 'symbol' ||
    (isObjectLike(value) && baseGetTag(value) == symbolTag);
}

module.exports = isSymbol;


/***/ }),

/***/ 124:
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

var root = __webpack_require__(9325);

/**
 * Gets the timestamp of the number of milliseconds that have elapsed since
 * the Unix epoch (1 January 1970 00:00:00 UTC).
 *
 * @static
 * @memberOf _
 * @since 2.4.0
 * @category Date
 * @returns {number} Returns the timestamp.
 * @example
 *
 * _.defer(function(stamp) {
 *   console.log(_.now() - stamp);
 * }, _.now());
 * // => Logs the number of milliseconds it took for the deferred invocation.
 */
var now = function() {
  return root.Date.now();
};

module.exports = now;


/***/ }),

/***/ 9374:
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

var baseTrim = __webpack_require__(4128),
    isObject = __webpack_require__(3805),
    isSymbol = __webpack_require__(4394);

/** Used as references for various `Number` constants. */
var NAN = 0 / 0;

/** Used to detect bad signed hexadecimal string values. */
var reIsBadHex = /^[-+]0x[0-9a-f]+$/i;

/** Used to detect binary string values. */
var reIsBinary = /^0b[01]+$/i;

/** Used to detect octal string values. */
var reIsOctal = /^0o[0-7]+$/i;

/** Built-in method references without a dependency on `root`. */
var freeParseInt = parseInt;

/**
 * Converts `value` to a number.
 *
 * @static
 * @memberOf _
 * @since 4.0.0
 * @category Lang
 * @param {*} value The value to process.
 * @returns {number} Returns the number.
 * @example
 *
 * _.toNumber(3.2);
 * // => 3.2
 *
 * _.toNumber(Number.MIN_VALUE);
 * // => 5e-324
 *
 * _.toNumber(Infinity);
 * // => Infinity
 *
 * _.toNumber('3.2');
 * // => 3.2
 */
function toNumber(value) {
  if (typeof value == 'number') {
    return value;
  }
  if (isSymbol(value)) {
    return NAN;
  }
  if (isObject(value)) {
    var other = typeof value.valueOf == 'function' ? value.valueOf() : value;
    value = isObject(other) ? (other + '') : other;
  }
  if (typeof value != 'string') {
    return value === 0 ? value : +value;
  }
  value = baseTrim(value);
  var isBinary = reIsBinary.test(value);
  return (isBinary || reIsOctal.test(value))
    ? freeParseInt(value.slice(2), isBinary ? 2 : 8)
    : (reIsBadHex.test(value) ? NAN : +value);
}

module.exports = toNumber;


/***/ }),

/***/ 5606:
/***/ ((module) => {

// shim for using process in browser
var process = module.exports = {};

// cached from whatever global is present so that test runners that stub it
// don't break things.  But we need to wrap it in a try catch in case it is
// wrapped in strict mode code which doesn't define any globals.  It's inside a
// function because try/catches deoptimize in certain engines.

var cachedSetTimeout;
var cachedClearTimeout;

function defaultSetTimout() {
    throw new Error('setTimeout has not been defined');
}
function defaultClearTimeout () {
    throw new Error('clearTimeout has not been defined');
}
(function () {
    try {
        if (typeof setTimeout === 'function') {
            cachedSetTimeout = setTimeout;
        } else {
            cachedSetTimeout = defaultSetTimout;
        }
    } catch (e) {
        cachedSetTimeout = defaultSetTimout;
    }
    try {
        if (typeof clearTimeout === 'function') {
            cachedClearTimeout = clearTimeout;
        } else {
            cachedClearTimeout = defaultClearTimeout;
        }
    } catch (e) {
        cachedClearTimeout = defaultClearTimeout;
    }
} ())
function runTimeout(fun) {
    if (cachedSetTimeout === setTimeout) {
        //normal enviroments in sane situations
        return setTimeout(fun, 0);
    }
    // if setTimeout wasn't available but was latter defined
    if ((cachedSetTimeout === defaultSetTimout || !cachedSetTimeout) && setTimeout) {
        cachedSetTimeout = setTimeout;
        return setTimeout(fun, 0);
    }
    try {
        // when when somebody has screwed with setTimeout but no I.E. maddness
        return cachedSetTimeout(fun, 0);
    } catch(e){
        try {
            // When we are in I.E. but the script has been evaled so I.E. doesn't trust the global object when called normally
            return cachedSetTimeout.call(null, fun, 0);
        } catch(e){
            // same as above but when it's a version of I.E. that must have the global object for 'this', hopfully our context correct otherwise it will throw a global error
            return cachedSetTimeout.call(this, fun, 0);
        }
    }


}
function runClearTimeout(marker) {
    if (cachedClearTimeout === clearTimeout) {
        //normal enviroments in sane situations
        return clearTimeout(marker);
    }
    // if clearTimeout wasn't available but was latter defined
    if ((cachedClearTimeout === defaultClearTimeout || !cachedClearTimeout) && clearTimeout) {
        cachedClearTimeout = clearTimeout;
        return clearTimeout(marker);
    }
    try {
        // when when somebody has screwed with setTimeout but no I.E. maddness
        return cachedClearTimeout(marker);
    } catch (e){
        try {
            // When we are in I.E. but the script has been evaled so I.E. doesn't  trust the global object when called normally
            return cachedClearTimeout.call(null, marker);
        } catch (e){
            // same as above but when it's a version of I.E. that must have the global object for 'this', hopfully our context correct otherwise it will throw a global error.
            // Some versions of I.E. have different rules for clearTimeout vs setTimeout
            return cachedClearTimeout.call(this, marker);
        }
    }



}
var queue = [];
var draining = false;
var currentQueue;
var queueIndex = -1;

function cleanUpNextTick() {
    if (!draining || !currentQueue) {
        return;
    }
    draining = false;
    if (currentQueue.length) {
        queue = currentQueue.concat(queue);
    } else {
        queueIndex = -1;
    }
    if (queue.length) {
        drainQueue();
    }
}

function drainQueue() {
    if (draining) {
        return;
    }
    var timeout = runTimeout(cleanUpNextTick);
    draining = true;

    var len = queue.length;
    while(len) {
        currentQueue = queue;
        queue = [];
        while (++queueIndex < len) {
            if (currentQueue) {
                currentQueue[queueIndex].run();
            }
        }
        queueIndex = -1;
        len = queue.length;
    }
    currentQueue = null;
    draining = false;
    runClearTimeout(timeout);
}

process.nextTick = function (fun) {
    var args = new Array(arguments.length - 1);
    if (arguments.length > 1) {
        for (var i = 1; i < arguments.length; i++) {
            args[i - 1] = arguments[i];
        }
    }
    queue.push(new Item(fun, args));
    if (queue.length === 1 && !draining) {
        runTimeout(drainQueue);
    }
};

// v8 likes predictible objects
function Item(fun, array) {
    this.fun = fun;
    this.array = array;
}
Item.prototype.run = function () {
    this.fun.apply(null, this.array);
};
process.title = 'browser';
process.browser = true;
process.env = {};
process.argv = [];
process.version = ''; // empty string to avoid regexp issues
process.versions = {};

function noop() {}

process.on = noop;
process.addListener = noop;
process.once = noop;
process.off = noop;
process.removeListener = noop;
process.removeAllListeners = noop;
process.emit = noop;
process.prependListener = noop;
process.prependOnceListener = noop;

process.listeners = function (name) { return [] }

process.binding = function (name) {
    throw new Error('process.binding is not supported');
};

process.cwd = function () { return '/' };
process.chdir = function (dir) {
    throw new Error('process.chdir is not supported');
};
process.umask = function() { return 0; };


/***/ }),

/***/ 4080:
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

"use strict";


var isPrototype = __webpack_require__(9202);

module.exports = function (value) {
	if (typeof value !== "function") return false;

	if (!hasOwnProperty.call(value, "length")) return false;

	try {
		if (typeof value.length !== "number") return false;
		if (typeof value.call !== "function") return false;
		if (typeof value.apply !== "function") return false;
	} catch (error) {
		return false;
	}

	return !isPrototype(value);
};


/***/ }),

/***/ 181:
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

"use strict";


var isValue = __webpack_require__(8175);

// prettier-ignore
var possibleTypes = { "object": true, "function": true, "undefined": true /* document.all */ };

module.exports = function (value) {
	if (!isValue(value)) return false;
	return hasOwnProperty.call(possibleTypes, typeof value);
};


/***/ }),

/***/ 6873:
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

"use strict";


var isFunction = __webpack_require__(4080);

var classRe = /^\s*class[\s{/}]/, functionToString = Function.prototype.toString;

module.exports = function (value) {
	if (!isFunction(value)) return false;
	if (classRe.test(functionToString.call(value))) return false;
	return true;
};


/***/ }),

/***/ 9202:
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

"use strict";


var isObject = __webpack_require__(181);

module.exports = function (value) {
	if (!isObject(value)) return false;
	try {
		if (!value.constructor) return false;
		return value.constructor.prototype === value;
	} catch (error) {
		return false;
	}
};


/***/ }),

/***/ 8175:
/***/ ((module) => {

"use strict";


// ES3 safe
var _undefined = void 0;

module.exports = function (value) { return value !== _undefined && value !== null; };


/***/ }),

/***/ 6838:
/***/ ((module) => {

"use strict";
module.exports = __WEBPACK_EXTERNAL_MODULE__6838__;

/***/ }),

/***/ 6361:
/***/ ((module) => {

"use strict";
module.exports = __WEBPACK_EXTERNAL_MODULE__6361__;

/***/ }),

/***/ 9306:
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

"use strict";

var isCallable = __webpack_require__(4901);
var tryToString = __webpack_require__(6823);

var $TypeError = TypeError;

// `Assert: IsCallable(argument) is true`
module.exports = function (argument) {
  if (isCallable(argument)) return argument;
  throw new $TypeError(tryToString(argument) + ' is not a function');
};


/***/ }),

/***/ 6194:
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

"use strict";

var has = (__webpack_require__(2248).has);

// Perform ? RequireInternalSlot(M, [[MapData]])
module.exports = function (it) {
  has(it);
  return it;
};


/***/ }),

/***/ 3506:
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

"use strict";

var isPossiblePrototype = __webpack_require__(3925);

var $String = String;
var $TypeError = TypeError;

module.exports = function (argument) {
  if (isPossiblePrototype(argument)) return argument;
  throw new $TypeError("Can't set " + $String(argument) + ' as a prototype');
};


/***/ }),

/***/ 679:
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

"use strict";

var isPrototypeOf = __webpack_require__(1625);

var $TypeError = TypeError;

module.exports = function (it, Prototype) {
  if (isPrototypeOf(Prototype, it)) return it;
  throw new $TypeError('Incorrect invocation');
};


/***/ }),

/***/ 8551:
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

"use strict";

var isObject = __webpack_require__(34);

var $String = String;
var $TypeError = TypeError;

// `Assert: Type(argument) is Object`
module.exports = function (argument) {
  if (isObject(argument)) return argument;
  throw new $TypeError($String(argument) + ' is not an object');
};


/***/ }),

/***/ 7394:
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

"use strict";

var globalThis = __webpack_require__(4576);
var uncurryThisAccessor = __webpack_require__(6706);
var classof = __webpack_require__(2195);

var ArrayBuffer = globalThis.ArrayBuffer;
var TypeError = globalThis.TypeError;

// Includes
// - Perform ? RequireInternalSlot(O, [[ArrayBufferData]]).
// - If IsSharedArrayBuffer(O) is true, throw a TypeError exception.
module.exports = ArrayBuffer && uncurryThisAccessor(ArrayBuffer.prototype, 'byteLength', 'get') || function (O) {
  if (classof(O) !== 'ArrayBuffer') throw new TypeError('ArrayBuffer expected');
  return O.byteLength;
};


/***/ }),

/***/ 3238:
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

"use strict";

var globalThis = __webpack_require__(4576);
var uncurryThis = __webpack_require__(7476);
var arrayBufferByteLength = __webpack_require__(7394);

var ArrayBuffer = globalThis.ArrayBuffer;
var ArrayBufferPrototype = ArrayBuffer && ArrayBuffer.prototype;
var slice = ArrayBufferPrototype && uncurryThis(ArrayBufferPrototype.slice);

module.exports = function (O) {
  if (arrayBufferByteLength(O) !== 0) return false;
  if (!slice) return false;
  try {
    slice(O, 0, 0);
    return false;
  } catch (error) {
    return true;
  }
};


/***/ }),

/***/ 5169:
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

"use strict";

var isDetached = __webpack_require__(3238);

var $TypeError = TypeError;

module.exports = function (it) {
  if (isDetached(it)) throw new $TypeError('ArrayBuffer is detached');
  return it;
};


/***/ }),

/***/ 5636:
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

"use strict";

var globalThis = __webpack_require__(4576);
var uncurryThis = __webpack_require__(9504);
var uncurryThisAccessor = __webpack_require__(6706);
var toIndex = __webpack_require__(7696);
var notDetached = __webpack_require__(5169);
var arrayBufferByteLength = __webpack_require__(7394);
var detachTransferable = __webpack_require__(4483);
var PROPER_STRUCTURED_CLONE_TRANSFER = __webpack_require__(1548);

var structuredClone = globalThis.structuredClone;
var ArrayBuffer = globalThis.ArrayBuffer;
var DataView = globalThis.DataView;
var min = Math.min;
var ArrayBufferPrototype = ArrayBuffer.prototype;
var DataViewPrototype = DataView.prototype;
var slice = uncurryThis(ArrayBufferPrototype.slice);
var isResizable = uncurryThisAccessor(ArrayBufferPrototype, 'resizable', 'get');
var maxByteLength = uncurryThisAccessor(ArrayBufferPrototype, 'maxByteLength', 'get');
var getInt8 = uncurryThis(DataViewPrototype.getInt8);
var setInt8 = uncurryThis(DataViewPrototype.setInt8);

module.exports = (PROPER_STRUCTURED_CLONE_TRANSFER || detachTransferable) && function (arrayBuffer, newLength, preserveResizability) {
  var byteLength = arrayBufferByteLength(arrayBuffer);
  var newByteLength = newLength === undefined ? byteLength : toIndex(newLength);
  var fixedLength = !isResizable || !isResizable(arrayBuffer);
  var newBuffer;
  notDetached(arrayBuffer);
  if (PROPER_STRUCTURED_CLONE_TRANSFER) {
    arrayBuffer = structuredClone(arrayBuffer, { transfer: [arrayBuffer] });
    if (byteLength === newByteLength && (preserveResizability || fixedLength)) return arrayBuffer;
  }
  if (byteLength >= newByteLength && (!preserveResizability || fixedLength)) {
    newBuffer = slice(arrayBuffer, 0, newByteLength);
  } else {
    var options = preserveResizability && !fixedLength && maxByteLength ? { maxByteLength: maxByteLength(arrayBuffer) } : undefined;
    newBuffer = new ArrayBuffer(newByteLength, options);
    var a = new DataView(arrayBuffer);
    var b = new DataView(newBuffer);
    var copyLength = min(newByteLength, byteLength);
    for (var i = 0; i < copyLength; i++) setInt8(b, i, getInt8(a, i));
  }
  if (!PROPER_STRUCTURED_CLONE_TRANSFER) detachTransferable(arrayBuffer);
  return newBuffer;
};


/***/ }),

/***/ 9617:
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

"use strict";

var toIndexedObject = __webpack_require__(5397);
var toAbsoluteIndex = __webpack_require__(5610);
var lengthOfArrayLike = __webpack_require__(6198);

// `Array.prototype.{ indexOf, includes }` methods implementation
var createMethod = function (IS_INCLUDES) {
  return function ($this, el, fromIndex) {
    var O = toIndexedObject($this);
    var length = lengthOfArrayLike(O);
    if (length === 0) return !IS_INCLUDES && -1;
    var index = toAbsoluteIndex(fromIndex, length);
    var value;
    // Array#includes uses SameValueZero equality algorithm
    // eslint-disable-next-line no-self-compare -- NaN check
    if (IS_INCLUDES && el !== el) while (length > index) {
      value = O[index++];
      // eslint-disable-next-line no-self-compare -- NaN check
      if (value !== value) return true;
    // Array#indexOf ignores holes, Array#includes - not
    } else for (;length > index; index++) {
      if ((IS_INCLUDES || index in O) && O[index] === el) return IS_INCLUDES || index || 0;
    } return !IS_INCLUDES && -1;
  };
};

module.exports = {
  // `Array.prototype.includes` method
  // https://tc39.es/ecma262/#sec-array.prototype.includes
  includes: createMethod(true),
  // `Array.prototype.indexOf` method
  // https://tc39.es/ecma262/#sec-array.prototype.indexof
  indexOf: createMethod(false)
};


/***/ }),

/***/ 4527:
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

"use strict";

var DESCRIPTORS = __webpack_require__(3724);
var isArray = __webpack_require__(4376);

var $TypeError = TypeError;
// eslint-disable-next-line es/no-object-getownpropertydescriptor -- safe
var getOwnPropertyDescriptor = Object.getOwnPropertyDescriptor;

// Safari < 13 does not throw an error in this case
var SILENT_ON_NON_WRITABLE_LENGTH_SET = DESCRIPTORS && !function () {
  // makes no sense without proper strict mode support
  if (this !== undefined) return true;
  try {
    // eslint-disable-next-line es/no-object-defineproperty -- safe
    Object.defineProperty([], 'length', { writable: false }).length = 1;
  } catch (error) {
    return error instanceof TypeError;
  }
}();

module.exports = SILENT_ON_NON_WRITABLE_LENGTH_SET ? function (O, length) {
  if (isArray(O) && !getOwnPropertyDescriptor(O, 'length').writable) {
    throw new $TypeError('Cannot set read only .length');
  } return O.length = length;
} : function (O, length) {
  return O.length = length;
};


/***/ }),

/***/ 772:
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

"use strict";

var call = __webpack_require__(9565);
var getBuiltIn = __webpack_require__(7751);
var getMethod = __webpack_require__(5966);

module.exports = function (iterator, method, argument, reject) {
  try {
    var returnMethod = getMethod(iterator, 'return');
    if (returnMethod) {
      return getBuiltIn('Promise').resolve(call(returnMethod, iterator)).then(function () {
        method(argument);
      }, function (error) {
        reject(error);
      });
    }
  } catch (error2) {
    return reject(error2);
  } method(argument);
};


/***/ }),

/***/ 2059:
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

"use strict";

var call = __webpack_require__(9565);
var perform = __webpack_require__(1103);
var anObject = __webpack_require__(8551);
var create = __webpack_require__(2360);
var createNonEnumerableProperty = __webpack_require__(6699);
var defineBuiltIns = __webpack_require__(6279);
var wellKnownSymbol = __webpack_require__(8227);
var InternalStateModule = __webpack_require__(1181);
var getBuiltIn = __webpack_require__(7751);
var getMethod = __webpack_require__(5966);
var AsyncIteratorPrototype = __webpack_require__(3982);
var createIterResultObject = __webpack_require__(2529);
var iteratorClose = __webpack_require__(9539);

var Promise = getBuiltIn('Promise');

var TO_STRING_TAG = wellKnownSymbol('toStringTag');
var ASYNC_ITERATOR_HELPER = 'AsyncIteratorHelper';
var WRAP_FOR_VALID_ASYNC_ITERATOR = 'WrapForValidAsyncIterator';
var setInternalState = InternalStateModule.set;

var createAsyncIteratorProxyPrototype = function (IS_ITERATOR) {
  var IS_GENERATOR = !IS_ITERATOR;
  var getInternalState = InternalStateModule.getterFor(IS_ITERATOR ? WRAP_FOR_VALID_ASYNC_ITERATOR : ASYNC_ITERATOR_HELPER);

  var getStateOrEarlyExit = function (that) {
    var stateCompletion = perform(function () {
      return getInternalState(that);
    });

    var stateError = stateCompletion.error;
    var state = stateCompletion.value;

    if (stateError || (IS_GENERATOR && state.done)) {
      return { exit: true, value: stateError ? Promise.reject(state) : Promise.resolve(createIterResultObject(undefined, true)) };
    } return { exit: false, value: state };
  };

  return defineBuiltIns(create(AsyncIteratorPrototype), {
    next: function next() {
      var stateCompletion = getStateOrEarlyExit(this);
      var state = stateCompletion.value;
      if (stateCompletion.exit) return state;
      var handlerCompletion = perform(function () {
        return anObject(state.nextHandler(Promise));
      });
      var handlerError = handlerCompletion.error;
      var value = handlerCompletion.value;
      if (handlerError) state.done = true;
      return handlerError ? Promise.reject(value) : Promise.resolve(value);
    },
    'return': function () {
      var stateCompletion = getStateOrEarlyExit(this);
      var state = stateCompletion.value;
      if (stateCompletion.exit) return state;
      state.done = true;
      var iterator = state.iterator;
      var returnMethod, result;
      var completion = perform(function () {
        if (state.inner) try {
          iteratorClose(state.inner.iterator, 'normal');
        } catch (error) {
          return iteratorClose(iterator, 'throw', error);
        }
        return getMethod(iterator, 'return');
      });
      returnMethod = result = completion.value;
      if (completion.error) return Promise.reject(result);
      if (returnMethod === undefined) return Promise.resolve(createIterResultObject(undefined, true));
      completion = perform(function () {
        return call(returnMethod, iterator);
      });
      result = completion.value;
      if (completion.error) return Promise.reject(result);
      return IS_ITERATOR ? Promise.resolve(result) : Promise.resolve(result).then(function (resolved) {
        anObject(resolved);
        return createIterResultObject(undefined, true);
      });
    }
  });
};

var WrapForValidAsyncIteratorPrototype = createAsyncIteratorProxyPrototype(true);
var AsyncIteratorHelperPrototype = createAsyncIteratorProxyPrototype(false);

createNonEnumerableProperty(AsyncIteratorHelperPrototype, TO_STRING_TAG, 'Async Iterator Helper');

module.exports = function (nextHandler, IS_ITERATOR) {
  var AsyncIteratorProxy = function AsyncIterator(record, state) {
    if (state) {
      state.iterator = record.iterator;
      state.next = record.next;
    } else state = record;
    state.type = IS_ITERATOR ? WRAP_FOR_VALID_ASYNC_ITERATOR : ASYNC_ITERATOR_HELPER;
    state.nextHandler = nextHandler;
    state.counter = 0;
    state.done = false;
    setInternalState(this, state);
  };

  AsyncIteratorProxy.prototype = IS_ITERATOR ? WrapForValidAsyncIteratorPrototype : AsyncIteratorHelperPrototype;

  return AsyncIteratorProxy;
};


/***/ }),

/***/ 6639:
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

"use strict";

// https://github.com/tc39/proposal-iterator-helpers
// https://github.com/tc39/proposal-array-from-async
var call = __webpack_require__(9565);
var aCallable = __webpack_require__(9306);
var anObject = __webpack_require__(8551);
var isObject = __webpack_require__(34);
var doesNotExceedSafeInteger = __webpack_require__(6837);
var getBuiltIn = __webpack_require__(7751);
var getIteratorDirect = __webpack_require__(1767);
var closeAsyncIteration = __webpack_require__(772);

var createMethod = function (TYPE) {
  var IS_TO_ARRAY = TYPE === 0;
  var IS_FOR_EACH = TYPE === 1;
  var IS_EVERY = TYPE === 2;
  var IS_SOME = TYPE === 3;
  return function (object, fn, target) {
    anObject(object);
    var MAPPING = fn !== undefined;
    if (MAPPING || !IS_TO_ARRAY) aCallable(fn);
    var record = getIteratorDirect(object);
    var Promise = getBuiltIn('Promise');
    var iterator = record.iterator;
    var next = record.next;
    var counter = 0;

    return new Promise(function (resolve, reject) {
      var ifAbruptCloseAsyncIterator = function (error) {
        closeAsyncIteration(iterator, reject, error, reject);
      };

      var loop = function () {
        try {
          if (MAPPING) try {
            doesNotExceedSafeInteger(counter);
          } catch (error5) { ifAbruptCloseAsyncIterator(error5); }
          Promise.resolve(anObject(call(next, iterator))).then(function (step) {
            try {
              if (anObject(step).done) {
                if (IS_TO_ARRAY) {
                  target.length = counter;
                  resolve(target);
                } else resolve(IS_SOME ? false : IS_EVERY || undefined);
              } else {
                var value = step.value;
                try {
                  if (MAPPING) {
                    var result = fn(value, counter);

                    var handler = function ($result) {
                      if (IS_FOR_EACH) {
                        loop();
                      } else if (IS_EVERY) {
                        $result ? loop() : closeAsyncIteration(iterator, resolve, false, reject);
                      } else if (IS_TO_ARRAY) {
                        try {
                          target[counter++] = $result;
                          loop();
                        } catch (error4) { ifAbruptCloseAsyncIterator(error4); }
                      } else {
                        $result ? closeAsyncIteration(iterator, resolve, IS_SOME || value, reject) : loop();
                      }
                    };

                    if (isObject(result)) Promise.resolve(result).then(handler, ifAbruptCloseAsyncIterator);
                    else handler(result);
                  } else {
                    target[counter++] = value;
                    loop();
                  }
                } catch (error3) { ifAbruptCloseAsyncIterator(error3); }
              }
            } catch (error2) { reject(error2); }
          }, reject);
        } catch (error) { reject(error); }
      };

      loop();
    });
  };
};

module.exports = {
  toArray: createMethod(0),
  forEach: createMethod(1),
  every: createMethod(2),
  some: createMethod(3),
  find: createMethod(4)
};


/***/ }),

/***/ 1750:
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

"use strict";

var call = __webpack_require__(9565);
var aCallable = __webpack_require__(9306);
var anObject = __webpack_require__(8551);
var isObject = __webpack_require__(34);
var getIteratorDirect = __webpack_require__(1767);
var createAsyncIteratorProxy = __webpack_require__(2059);
var createIterResultObject = __webpack_require__(2529);
var closeAsyncIteration = __webpack_require__(772);

var AsyncIteratorProxy = createAsyncIteratorProxy(function (Promise) {
  var state = this;
  var iterator = state.iterator;
  var mapper = state.mapper;

  return new Promise(function (resolve, reject) {
    var doneAndReject = function (error) {
      state.done = true;
      reject(error);
    };

    var ifAbruptCloseAsyncIterator = function (error) {
      closeAsyncIteration(iterator, doneAndReject, error, doneAndReject);
    };

    Promise.resolve(anObject(call(state.next, iterator))).then(function (step) {
      try {
        if (anObject(step).done) {
          state.done = true;
          resolve(createIterResultObject(undefined, true));
        } else {
          var value = step.value;
          try {
            var result = mapper(value, state.counter++);

            var handler = function (mapped) {
              resolve(createIterResultObject(mapped, false));
            };

            if (isObject(result)) Promise.resolve(result).then(handler, ifAbruptCloseAsyncIterator);
            else handler(result);
          } catch (error2) { ifAbruptCloseAsyncIterator(error2); }
        }
      } catch (error) { doneAndReject(error); }
    }, doneAndReject);
  });
});

// `AsyncIterator.prototype.map` method
// https://github.com/tc39/proposal-iterator-helpers
module.exports = function map(mapper) {
  anObject(this);
  aCallable(mapper);
  return new AsyncIteratorProxy(getIteratorDirect(this), {
    mapper: mapper
  });
};


/***/ }),

/***/ 3982:
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

"use strict";

var globalThis = __webpack_require__(4576);
var shared = __webpack_require__(7629);
var isCallable = __webpack_require__(4901);
var create = __webpack_require__(2360);
var getPrototypeOf = __webpack_require__(2787);
var defineBuiltIn = __webpack_require__(6840);
var wellKnownSymbol = __webpack_require__(8227);
var IS_PURE = __webpack_require__(6395);

var USE_FUNCTION_CONSTRUCTOR = 'USE_FUNCTION_CONSTRUCTOR';
var ASYNC_ITERATOR = wellKnownSymbol('asyncIterator');
var AsyncIterator = globalThis.AsyncIterator;
var PassedAsyncIteratorPrototype = shared.AsyncIteratorPrototype;
var AsyncIteratorPrototype, prototype;

if (PassedAsyncIteratorPrototype) {
  AsyncIteratorPrototype = PassedAsyncIteratorPrototype;
} else if (isCallable(AsyncIterator)) {
  AsyncIteratorPrototype = AsyncIterator.prototype;
} else if (shared[USE_FUNCTION_CONSTRUCTOR] || globalThis[USE_FUNCTION_CONSTRUCTOR]) {
  try {
    // eslint-disable-next-line no-new-func -- we have no alternatives without usage of modern syntax
    prototype = getPrototypeOf(getPrototypeOf(getPrototypeOf(Function('return async function*(){}()')())));
    if (getPrototypeOf(prototype) === Object.prototype) AsyncIteratorPrototype = prototype;
  } catch (error) { /* empty */ }
}

if (!AsyncIteratorPrototype) AsyncIteratorPrototype = {};
else if (IS_PURE) AsyncIteratorPrototype = create(AsyncIteratorPrototype);

if (!isCallable(AsyncIteratorPrototype[ASYNC_ITERATOR])) {
  defineBuiltIn(AsyncIteratorPrototype, ASYNC_ITERATOR, function () {
    return this;
  });
}

module.exports = AsyncIteratorPrototype;


/***/ }),

/***/ 6319:
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

"use strict";

var anObject = __webpack_require__(8551);
var iteratorClose = __webpack_require__(9539);

// call something on iterator step with safe closing on error
module.exports = function (iterator, fn, value, ENTRIES) {
  try {
    return ENTRIES ? fn(anObject(value)[0], value[1]) : fn(value);
  } catch (error) {
    iteratorClose(iterator, 'throw', error);
  }
};


/***/ }),

/***/ 2195:
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

"use strict";

var uncurryThis = __webpack_require__(9504);

var toString = uncurryThis({}.toString);
var stringSlice = uncurryThis(''.slice);

module.exports = function (it) {
  return stringSlice(toString(it), 8, -1);
};


/***/ }),

/***/ 6955:
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

"use strict";

var TO_STRING_TAG_SUPPORT = __webpack_require__(2140);
var isCallable = __webpack_require__(4901);
var classofRaw = __webpack_require__(2195);
var wellKnownSymbol = __webpack_require__(8227);

var TO_STRING_TAG = wellKnownSymbol('toStringTag');
var $Object = Object;

// ES3 wrong here
var CORRECT_ARGUMENTS = classofRaw(function () { return arguments; }()) === 'Arguments';

// fallback for IE11 Script Access Denied error
var tryGet = function (it, key) {
  try {
    return it[key];
  } catch (error) { /* empty */ }
};

// getting tag from ES6+ `Object.prototype.toString`
module.exports = TO_STRING_TAG_SUPPORT ? classofRaw : function (it) {
  var O, tag, result;
  return it === undefined ? 'Undefined' : it === null ? 'Null'
    // @@toStringTag case
    : typeof (tag = tryGet(O = $Object(it), TO_STRING_TAG)) == 'string' ? tag
    // builtinTag case
    : CORRECT_ARGUMENTS ? classofRaw(O)
    // ES3 arguments fallback
    : (result = classofRaw(O)) === 'Object' && isCallable(O.callee) ? 'Arguments' : result;
};


/***/ }),

/***/ 7740:
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

"use strict";

var hasOwn = __webpack_require__(9297);
var ownKeys = __webpack_require__(5031);
var getOwnPropertyDescriptorModule = __webpack_require__(7347);
var definePropertyModule = __webpack_require__(4913);

module.exports = function (target, source, exceptions) {
  var keys = ownKeys(source);
  var defineProperty = definePropertyModule.f;
  var getOwnPropertyDescriptor = getOwnPropertyDescriptorModule.f;
  for (var i = 0; i < keys.length; i++) {
    var key = keys[i];
    if (!hasOwn(target, key) && !(exceptions && hasOwn(exceptions, key))) {
      defineProperty(target, key, getOwnPropertyDescriptor(source, key));
    }
  }
};


/***/ }),

/***/ 2211:
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

"use strict";

var fails = __webpack_require__(9039);

module.exports = !fails(function () {
  function F() { /* empty */ }
  F.prototype.constructor = null;
  // eslint-disable-next-line es/no-object-getprototypeof -- required for testing
  return Object.getPrototypeOf(new F()) !== F.prototype;
});


/***/ }),

/***/ 2529:
/***/ ((module) => {

"use strict";

// `CreateIterResultObject` abstract operation
// https://tc39.es/ecma262/#sec-createiterresultobject
module.exports = function (value, done) {
  return { value: value, done: done };
};


/***/ }),

/***/ 6699:
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

"use strict";

var DESCRIPTORS = __webpack_require__(3724);
var definePropertyModule = __webpack_require__(4913);
var createPropertyDescriptor = __webpack_require__(6980);

module.exports = DESCRIPTORS ? function (object, key, value) {
  return definePropertyModule.f(object, key, createPropertyDescriptor(1, value));
} : function (object, key, value) {
  object[key] = value;
  return object;
};


/***/ }),

/***/ 6980:
/***/ ((module) => {

"use strict";

module.exports = function (bitmap, value) {
  return {
    enumerable: !(bitmap & 1),
    configurable: !(bitmap & 2),
    writable: !(bitmap & 4),
    value: value
  };
};


/***/ }),

/***/ 4659:
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

"use strict";

var DESCRIPTORS = __webpack_require__(3724);
var definePropertyModule = __webpack_require__(4913);
var createPropertyDescriptor = __webpack_require__(6980);

module.exports = function (object, key, value) {
  if (DESCRIPTORS) definePropertyModule.f(object, key, createPropertyDescriptor(0, value));
  else object[key] = value;
};


/***/ }),

/***/ 2106:
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

"use strict";

var makeBuiltIn = __webpack_require__(283);
var defineProperty = __webpack_require__(4913);

module.exports = function (target, name, descriptor) {
  if (descriptor.get) makeBuiltIn(descriptor.get, name, { getter: true });
  if (descriptor.set) makeBuiltIn(descriptor.set, name, { setter: true });
  return defineProperty.f(target, name, descriptor);
};


/***/ }),

/***/ 6840:
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

"use strict";

var isCallable = __webpack_require__(4901);
var definePropertyModule = __webpack_require__(4913);
var makeBuiltIn = __webpack_require__(283);
var defineGlobalProperty = __webpack_require__(9433);

module.exports = function (O, key, value, options) {
  if (!options) options = {};
  var simple = options.enumerable;
  var name = options.name !== undefined ? options.name : key;
  if (isCallable(value)) makeBuiltIn(value, name, options);
  if (options.global) {
    if (simple) O[key] = value;
    else defineGlobalProperty(key, value);
  } else {
    try {
      if (!options.unsafe) delete O[key];
      else if (O[key]) simple = true;
    } catch (error) { /* empty */ }
    if (simple) O[key] = value;
    else definePropertyModule.f(O, key, {
      value: value,
      enumerable: false,
      configurable: !options.nonConfigurable,
      writable: !options.nonWritable
    });
  } return O;
};


/***/ }),

/***/ 6279:
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

"use strict";

var defineBuiltIn = __webpack_require__(6840);

module.exports = function (target, src, options) {
  for (var key in src) defineBuiltIn(target, key, src[key], options);
  return target;
};


/***/ }),

/***/ 9433:
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

"use strict";

var globalThis = __webpack_require__(4576);

// eslint-disable-next-line es/no-object-defineproperty -- safe
var defineProperty = Object.defineProperty;

module.exports = function (key, value) {
  try {
    defineProperty(globalThis, key, { value: value, configurable: true, writable: true });
  } catch (error) {
    globalThis[key] = value;
  } return value;
};


/***/ }),

/***/ 4606:
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

"use strict";

var tryToString = __webpack_require__(6823);

var $TypeError = TypeError;

module.exports = function (O, P) {
  if (!delete O[P]) throw new $TypeError('Cannot delete property ' + tryToString(P) + ' of ' + tryToString(O));
};


/***/ }),

/***/ 3724:
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

"use strict";

var fails = __webpack_require__(9039);

// Detect IE8's incomplete defineProperty implementation
module.exports = !fails(function () {
  // eslint-disable-next-line es/no-object-defineproperty -- required for testing
  return Object.defineProperty({}, 1, { get: function () { return 7; } })[1] !== 7;
});


/***/ }),

/***/ 4483:
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

"use strict";

var globalThis = __webpack_require__(4576);
var getBuiltInNodeModule = __webpack_require__(9429);
var PROPER_STRUCTURED_CLONE_TRANSFER = __webpack_require__(1548);

var structuredClone = globalThis.structuredClone;
var $ArrayBuffer = globalThis.ArrayBuffer;
var $MessageChannel = globalThis.MessageChannel;
var detach = false;
var WorkerThreads, channel, buffer, $detach;

if (PROPER_STRUCTURED_CLONE_TRANSFER) {
  detach = function (transferable) {
    structuredClone(transferable, { transfer: [transferable] });
  };
} else if ($ArrayBuffer) try {
  if (!$MessageChannel) {
    WorkerThreads = getBuiltInNodeModule('worker_threads');
    if (WorkerThreads) $MessageChannel = WorkerThreads.MessageChannel;
  }

  if ($MessageChannel) {
    channel = new $MessageChannel();
    buffer = new $ArrayBuffer(2);

    $detach = function (transferable) {
      channel.port1.postMessage(null, [transferable]);
    };

    if (buffer.byteLength === 2) {
      $detach(buffer);
      if (buffer.byteLength === 0) detach = $detach;
    }
  }
} catch (error) { /* empty */ }

module.exports = detach;


/***/ }),

/***/ 4055:
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

"use strict";

var globalThis = __webpack_require__(4576);
var isObject = __webpack_require__(34);

var document = globalThis.document;
// typeof document.createElement is 'object' in old IE
var EXISTS = isObject(document) && isObject(document.createElement);

module.exports = function (it) {
  return EXISTS ? document.createElement(it) : {};
};


/***/ }),

/***/ 6837:
/***/ ((module) => {

"use strict";

var $TypeError = TypeError;
var MAX_SAFE_INTEGER = 0x1FFFFFFFFFFFFF; // 2 ** 53 - 1 == 9007199254740991

module.exports = function (it) {
  if (it > MAX_SAFE_INTEGER) throw $TypeError('Maximum allowed index exceeded');
  return it;
};


/***/ }),

/***/ 5002:
/***/ ((module) => {

"use strict";

module.exports = {
  IndexSizeError: { s: 'INDEX_SIZE_ERR', c: 1, m: 1 },
  DOMStringSizeError: { s: 'DOMSTRING_SIZE_ERR', c: 2, m: 0 },
  HierarchyRequestError: { s: 'HIERARCHY_REQUEST_ERR', c: 3, m: 1 },
  WrongDocumentError: { s: 'WRONG_DOCUMENT_ERR', c: 4, m: 1 },
  InvalidCharacterError: { s: 'INVALID_CHARACTER_ERR', c: 5, m: 1 },
  NoDataAllowedError: { s: 'NO_DATA_ALLOWED_ERR', c: 6, m: 0 },
  NoModificationAllowedError: { s: 'NO_MODIFICATION_ALLOWED_ERR', c: 7, m: 1 },
  NotFoundError: { s: 'NOT_FOUND_ERR', c: 8, m: 1 },
  NotSupportedError: { s: 'NOT_SUPPORTED_ERR', c: 9, m: 1 },
  InUseAttributeError: { s: 'INUSE_ATTRIBUTE_ERR', c: 10, m: 1 },
  InvalidStateError: { s: 'INVALID_STATE_ERR', c: 11, m: 1 },
  SyntaxError: { s: 'SYNTAX_ERR', c: 12, m: 1 },
  InvalidModificationError: { s: 'INVALID_MODIFICATION_ERR', c: 13, m: 1 },
  NamespaceError: { s: 'NAMESPACE_ERR', c: 14, m: 1 },
  InvalidAccessError: { s: 'INVALID_ACCESS_ERR', c: 15, m: 1 },
  ValidationError: { s: 'VALIDATION_ERR', c: 16, m: 0 },
  TypeMismatchError: { s: 'TYPE_MISMATCH_ERR', c: 17, m: 1 },
  SecurityError: { s: 'SECURITY_ERR', c: 18, m: 1 },
  NetworkError: { s: 'NETWORK_ERR', c: 19, m: 1 },
  AbortError: { s: 'ABORT_ERR', c: 20, m: 1 },
  URLMismatchError: { s: 'URL_MISMATCH_ERR', c: 21, m: 1 },
  QuotaExceededError: { s: 'QUOTA_EXCEEDED_ERR', c: 22, m: 1 },
  TimeoutError: { s: 'TIMEOUT_ERR', c: 23, m: 1 },
  InvalidNodeTypeError: { s: 'INVALID_NODE_TYPE_ERR', c: 24, m: 1 },
  DataCloneError: { s: 'DATA_CLONE_ERR', c: 25, m: 1 }
};


/***/ }),

/***/ 8727:
/***/ ((module) => {

"use strict";

// IE8- don't enum bug keys
module.exports = [
  'constructor',
  'hasOwnProperty',
  'isPrototypeOf',
  'propertyIsEnumerable',
  'toLocaleString',
  'toString',
  'valueOf'
];


/***/ }),

/***/ 6193:
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

"use strict";

var ENVIRONMENT = __webpack_require__(4215);

module.exports = ENVIRONMENT === 'NODE';


/***/ }),

/***/ 2839:
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

"use strict";

var globalThis = __webpack_require__(4576);

var navigator = globalThis.navigator;
var userAgent = navigator && navigator.userAgent;

module.exports = userAgent ? String(userAgent) : '';


/***/ }),

/***/ 9519:
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

"use strict";

var globalThis = __webpack_require__(4576);
var userAgent = __webpack_require__(2839);

var process = globalThis.process;
var Deno = globalThis.Deno;
var versions = process && process.versions || Deno && Deno.version;
var v8 = versions && versions.v8;
var match, version;

if (v8) {
  match = v8.split('.');
  // in old Chrome, versions of V8 isn't V8 = Chrome / 10
  // but their correct versions are not interesting for us
  version = match[0] > 0 && match[0] < 4 ? 1 : +(match[0] + match[1]);
}

// BrowserFS NodeJS `process` polyfill incorrectly set `.v8` to `0.0`
// so check `userAgent` even if `.v8` exists, but 0
if (!version && userAgent) {
  match = userAgent.match(/Edge\/(\d+)/);
  if (!match || match[1] >= 74) {
    match = userAgent.match(/Chrome\/(\d+)/);
    if (match) version = +match[1];
  }
}

module.exports = version;


/***/ }),

/***/ 4215:
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

"use strict";

/* global Bun, Deno -- detection */
var globalThis = __webpack_require__(4576);
var userAgent = __webpack_require__(2839);
var classof = __webpack_require__(2195);

var userAgentStartsWith = function (string) {
  return userAgent.slice(0, string.length) === string;
};

module.exports = (function () {
  if (userAgentStartsWith('Bun/')) return 'BUN';
  if (userAgentStartsWith('Cloudflare-Workers')) return 'CLOUDFLARE';
  if (userAgentStartsWith('Deno/')) return 'DENO';
  if (userAgentStartsWith('Node.js/')) return 'NODE';
  if (globalThis.Bun && typeof Bun.version == 'string') return 'BUN';
  if (globalThis.Deno && typeof Deno.version == 'object') return 'DENO';
  if (classof(globalThis.process) === 'process') return 'NODE';
  if (globalThis.window && globalThis.document) return 'BROWSER';
  return 'REST';
})();


/***/ }),

/***/ 8574:
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

"use strict";

var uncurryThis = __webpack_require__(9504);

var $Error = Error;
var replace = uncurryThis(''.replace);

var TEST = (function (arg) { return String(new $Error(arg).stack); })('zxcasd');
// eslint-disable-next-line redos/no-vulnerable -- safe
var V8_OR_CHAKRA_STACK_ENTRY = /\n\s*at [^:]*:[^\n]*/;
var IS_V8_OR_CHAKRA_STACK = V8_OR_CHAKRA_STACK_ENTRY.test(TEST);

module.exports = function (stack, dropEntries) {
  if (IS_V8_OR_CHAKRA_STACK && typeof stack == 'string' && !$Error.prepareStackTrace) {
    while (dropEntries--) stack = replace(stack, V8_OR_CHAKRA_STACK_ENTRY, '');
  } return stack;
};


/***/ }),

/***/ 6518:
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

"use strict";

var globalThis = __webpack_require__(4576);
var getOwnPropertyDescriptor = (__webpack_require__(7347).f);
var createNonEnumerableProperty = __webpack_require__(6699);
var defineBuiltIn = __webpack_require__(6840);
var defineGlobalProperty = __webpack_require__(9433);
var copyConstructorProperties = __webpack_require__(7740);
var isForced = __webpack_require__(2796);

/*
  options.target         - name of the target object
  options.global         - target is the global object
  options.stat           - export as static methods of target
  options.proto          - export as prototype methods of target
  options.real           - real prototype method for the `pure` version
  options.forced         - export even if the native feature is available
  options.bind           - bind methods to the target, required for the `pure` version
  options.wrap           - wrap constructors to preventing global pollution, required for the `pure` version
  options.unsafe         - use the simple assignment of property instead of delete + defineProperty
  options.sham           - add a flag to not completely full polyfills
  options.enumerable     - export as enumerable property
  options.dontCallGetSet - prevent calling a getter on target
  options.name           - the .name of the function if it does not match the key
*/
module.exports = function (options, source) {
  var TARGET = options.target;
  var GLOBAL = options.global;
  var STATIC = options.stat;
  var FORCED, target, key, targetProperty, sourceProperty, descriptor;
  if (GLOBAL) {
    target = globalThis;
  } else if (STATIC) {
    target = globalThis[TARGET] || defineGlobalProperty(TARGET, {});
  } else {
    target = globalThis[TARGET] && globalThis[TARGET].prototype;
  }
  if (target) for (key in source) {
    sourceProperty = source[key];
    if (options.dontCallGetSet) {
      descriptor = getOwnPropertyDescriptor(target, key);
      targetProperty = descriptor && descriptor.value;
    } else targetProperty = target[key];
    FORCED = isForced(GLOBAL ? key : TARGET + (STATIC ? '.' : '#') + key, options.forced);
    // contained in target
    if (!FORCED && targetProperty !== undefined) {
      if (typeof sourceProperty == typeof targetProperty) continue;
      copyConstructorProperties(sourceProperty, targetProperty);
    }
    // add a flag to not completely full polyfills
    if (options.sham || (targetProperty && targetProperty.sham)) {
      createNonEnumerableProperty(sourceProperty, 'sham', true);
    }
    defineBuiltIn(target, key, sourceProperty, options);
  }
};


/***/ }),

/***/ 9039:
/***/ ((module) => {

"use strict";

module.exports = function (exec) {
  try {
    return !!exec();
  } catch (error) {
    return true;
  }
};


/***/ }),

/***/ 6080:
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

"use strict";

var uncurryThis = __webpack_require__(7476);
var aCallable = __webpack_require__(9306);
var NATIVE_BIND = __webpack_require__(616);

var bind = uncurryThis(uncurryThis.bind);

// optional / simple context binding
module.exports = function (fn, that) {
  aCallable(fn);
  return that === undefined ? fn : NATIVE_BIND ? bind(fn, that) : function (/* ...args */) {
    return fn.apply(that, arguments);
  };
};


/***/ }),

/***/ 616:
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

"use strict";

var fails = __webpack_require__(9039);

module.exports = !fails(function () {
  // eslint-disable-next-line es/no-function-prototype-bind -- safe
  var test = (function () { /* empty */ }).bind();
  // eslint-disable-next-line no-prototype-builtins -- safe
  return typeof test != 'function' || test.hasOwnProperty('prototype');
});


/***/ }),

/***/ 9565:
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

"use strict";

var NATIVE_BIND = __webpack_require__(616);

var call = Function.prototype.call;

module.exports = NATIVE_BIND ? call.bind(call) : function () {
  return call.apply(call, arguments);
};


/***/ }),

/***/ 350:
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

"use strict";

var DESCRIPTORS = __webpack_require__(3724);
var hasOwn = __webpack_require__(9297);

var FunctionPrototype = Function.prototype;
// eslint-disable-next-line es/no-object-getownpropertydescriptor -- safe
var getDescriptor = DESCRIPTORS && Object.getOwnPropertyDescriptor;

var EXISTS = hasOwn(FunctionPrototype, 'name');
// additional protection from minified / mangled / dropped function names
var PROPER = EXISTS && (function something() { /* empty */ }).name === 'something';
var CONFIGURABLE = EXISTS && (!DESCRIPTORS || (DESCRIPTORS && getDescriptor(FunctionPrototype, 'name').configurable));

module.exports = {
  EXISTS: EXISTS,
  PROPER: PROPER,
  CONFIGURABLE: CONFIGURABLE
};


/***/ }),

/***/ 6706:
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

"use strict";

var uncurryThis = __webpack_require__(9504);
var aCallable = __webpack_require__(9306);

module.exports = function (object, key, method) {
  try {
    // eslint-disable-next-line es/no-object-getownpropertydescriptor -- safe
    return uncurryThis(aCallable(Object.getOwnPropertyDescriptor(object, key)[method]));
  } catch (error) { /* empty */ }
};


/***/ }),

/***/ 7476:
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

"use strict";

var classofRaw = __webpack_require__(2195);
var uncurryThis = __webpack_require__(9504);

module.exports = function (fn) {
  // Nashorn bug:
  //   https://github.com/zloirock/core-js/issues/1128
  //   https://github.com/zloirock/core-js/issues/1130
  if (classofRaw(fn) === 'Function') return uncurryThis(fn);
};


/***/ }),

/***/ 9504:
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

"use strict";

var NATIVE_BIND = __webpack_require__(616);

var FunctionPrototype = Function.prototype;
var call = FunctionPrototype.call;
var uncurryThisWithBind = NATIVE_BIND && FunctionPrototype.bind.bind(call, call);

module.exports = NATIVE_BIND ? uncurryThisWithBind : function (fn) {
  return function () {
    return call.apply(fn, arguments);
  };
};


/***/ }),

/***/ 9429:
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

"use strict";

var globalThis = __webpack_require__(4576);
var IS_NODE = __webpack_require__(6193);

module.exports = function (name) {
  if (IS_NODE) {
    try {
      return globalThis.process.getBuiltinModule(name);
    } catch (error) { /* empty */ }
    try {
      // eslint-disable-next-line no-new-func -- safe
      return Function('return require("' + name + '")')();
    } catch (error) { /* empty */ }
  }
};


/***/ }),

/***/ 7751:
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

"use strict";

var globalThis = __webpack_require__(4576);
var isCallable = __webpack_require__(4901);

var aFunction = function (argument) {
  return isCallable(argument) ? argument : undefined;
};

module.exports = function (namespace, method) {
  return arguments.length < 2 ? aFunction(globalThis[namespace]) : globalThis[namespace] && globalThis[namespace][method];
};


/***/ }),

/***/ 1767:
/***/ ((module) => {

"use strict";

// `GetIteratorDirect(obj)` abstract operation
// https://tc39.es/proposal-iterator-helpers/#sec-getiteratordirect
module.exports = function (obj) {
  return {
    iterator: obj,
    next: obj.next,
    done: false
  };
};


/***/ }),

/***/ 851:
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

"use strict";

var classof = __webpack_require__(6955);
var getMethod = __webpack_require__(5966);
var isNullOrUndefined = __webpack_require__(4117);
var Iterators = __webpack_require__(6269);
var wellKnownSymbol = __webpack_require__(8227);

var ITERATOR = wellKnownSymbol('iterator');

module.exports = function (it) {
  if (!isNullOrUndefined(it)) return getMethod(it, ITERATOR)
    || getMethod(it, '@@iterator')
    || Iterators[classof(it)];
};


/***/ }),

/***/ 81:
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

"use strict";

var call = __webpack_require__(9565);
var aCallable = __webpack_require__(9306);
var anObject = __webpack_require__(8551);
var tryToString = __webpack_require__(6823);
var getIteratorMethod = __webpack_require__(851);

var $TypeError = TypeError;

module.exports = function (argument, usingIterator) {
  var iteratorMethod = arguments.length < 2 ? getIteratorMethod(argument) : usingIterator;
  if (aCallable(iteratorMethod)) return anObject(call(iteratorMethod, argument));
  throw new $TypeError(tryToString(argument) + ' is not iterable');
};


/***/ }),

/***/ 5966:
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

"use strict";

var aCallable = __webpack_require__(9306);
var isNullOrUndefined = __webpack_require__(4117);

// `GetMethod` abstract operation
// https://tc39.es/ecma262/#sec-getmethod
module.exports = function (V, P) {
  var func = V[P];
  return isNullOrUndefined(func) ? undefined : aCallable(func);
};


/***/ }),

/***/ 4576:
/***/ (function(module, __unused_webpack_exports, __webpack_require__) {

"use strict";

var check = function (it) {
  return it && it.Math === Math && it;
};

// https://github.com/zloirock/core-js/issues/86#issuecomment-115759028
module.exports =
  // eslint-disable-next-line es/no-global-this -- safe
  check(typeof globalThis == 'object' && globalThis) ||
  check(typeof window == 'object' && window) ||
  // eslint-disable-next-line no-restricted-globals -- safe
  check(typeof self == 'object' && self) ||
  check(typeof __webpack_require__.g == 'object' && __webpack_require__.g) ||
  check(typeof this == 'object' && this) ||
  // eslint-disable-next-line no-new-func -- fallback
  (function () { return this; })() || Function('return this')();


/***/ }),

/***/ 9297:
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

"use strict";

var uncurryThis = __webpack_require__(9504);
var toObject = __webpack_require__(8981);

var hasOwnProperty = uncurryThis({}.hasOwnProperty);

// `HasOwnProperty` abstract operation
// https://tc39.es/ecma262/#sec-hasownproperty
// eslint-disable-next-line es/no-object-hasown -- safe
module.exports = Object.hasOwn || function hasOwn(it, key) {
  return hasOwnProperty(toObject(it), key);
};


/***/ }),

/***/ 421:
/***/ ((module) => {

"use strict";

module.exports = {};


/***/ }),

/***/ 397:
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

"use strict";

var getBuiltIn = __webpack_require__(7751);

module.exports = getBuiltIn('document', 'documentElement');


/***/ }),

/***/ 5917:
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

"use strict";

var DESCRIPTORS = __webpack_require__(3724);
var fails = __webpack_require__(9039);
var createElement = __webpack_require__(4055);

// Thanks to IE8 for its funny defineProperty
module.exports = !DESCRIPTORS && !fails(function () {
  // eslint-disable-next-line es/no-object-defineproperty -- required for testing
  return Object.defineProperty(createElement('div'), 'a', {
    get: function () { return 7; }
  }).a !== 7;
});


/***/ }),

/***/ 7055:
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

"use strict";

var uncurryThis = __webpack_require__(9504);
var fails = __webpack_require__(9039);
var classof = __webpack_require__(2195);

var $Object = Object;
var split = uncurryThis(''.split);

// fallback for non-array-like ES3 and non-enumerable old V8 strings
module.exports = fails(function () {
  // throws an error in rhino, see https://github.com/mozilla/rhino/issues/346
  // eslint-disable-next-line no-prototype-builtins -- safe
  return !$Object('z').propertyIsEnumerable(0);
}) ? function (it) {
  return classof(it) === 'String' ? split(it, '') : $Object(it);
} : $Object;


/***/ }),

/***/ 3167:
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

"use strict";

var isCallable = __webpack_require__(4901);
var isObject = __webpack_require__(34);
var setPrototypeOf = __webpack_require__(2967);

// makes subclassing work correct for wrapped built-ins
module.exports = function ($this, dummy, Wrapper) {
  var NewTarget, NewTargetPrototype;
  if (
    // it can work only with native `setPrototypeOf`
    setPrototypeOf &&
    // we haven't completely correct pre-ES6 way for getting `new.target`, so use this
    isCallable(NewTarget = dummy.constructor) &&
    NewTarget !== Wrapper &&
    isObject(NewTargetPrototype = NewTarget.prototype) &&
    NewTargetPrototype !== Wrapper.prototype
  ) setPrototypeOf($this, NewTargetPrototype);
  return $this;
};


/***/ }),

/***/ 3706:
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

"use strict";

var uncurryThis = __webpack_require__(9504);
var isCallable = __webpack_require__(4901);
var store = __webpack_require__(7629);

var functionToString = uncurryThis(Function.toString);

// this helper broken in `core-js@3.4.1-3.4.4`, so we can't use `shared` helper
if (!isCallable(store.inspectSource)) {
  store.inspectSource = function (it) {
    return functionToString(it);
  };
}

module.exports = store.inspectSource;


/***/ }),

/***/ 1181:
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

"use strict";

var NATIVE_WEAK_MAP = __webpack_require__(8622);
var globalThis = __webpack_require__(4576);
var isObject = __webpack_require__(34);
var createNonEnumerableProperty = __webpack_require__(6699);
var hasOwn = __webpack_require__(9297);
var shared = __webpack_require__(7629);
var sharedKey = __webpack_require__(6119);
var hiddenKeys = __webpack_require__(421);

var OBJECT_ALREADY_INITIALIZED = 'Object already initialized';
var TypeError = globalThis.TypeError;
var WeakMap = globalThis.WeakMap;
var set, get, has;

var enforce = function (it) {
  return has(it) ? get(it) : set(it, {});
};

var getterFor = function (TYPE) {
  return function (it) {
    var state;
    if (!isObject(it) || (state = get(it)).type !== TYPE) {
      throw new TypeError('Incompatible receiver, ' + TYPE + ' required');
    } return state;
  };
};

if (NATIVE_WEAK_MAP || shared.state) {
  var store = shared.state || (shared.state = new WeakMap());
  /* eslint-disable no-self-assign -- prototype methods protection */
  store.get = store.get;
  store.has = store.has;
  store.set = store.set;
  /* eslint-enable no-self-assign -- prototype methods protection */
  set = function (it, metadata) {
    if (store.has(it)) throw new TypeError(OBJECT_ALREADY_INITIALIZED);
    metadata.facade = it;
    store.set(it, metadata);
    return metadata;
  };
  get = function (it) {
    return store.get(it) || {};
  };
  has = function (it) {
    return store.has(it);
  };
} else {
  var STATE = sharedKey('state');
  hiddenKeys[STATE] = true;
  set = function (it, metadata) {
    if (hasOwn(it, STATE)) throw new TypeError(OBJECT_ALREADY_INITIALIZED);
    metadata.facade = it;
    createNonEnumerableProperty(it, STATE, metadata);
    return metadata;
  };
  get = function (it) {
    return hasOwn(it, STATE) ? it[STATE] : {};
  };
  has = function (it) {
    return hasOwn(it, STATE);
  };
}

module.exports = {
  set: set,
  get: get,
  has: has,
  enforce: enforce,
  getterFor: getterFor
};


/***/ }),

/***/ 4209:
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

"use strict";

var wellKnownSymbol = __webpack_require__(8227);
var Iterators = __webpack_require__(6269);

var ITERATOR = wellKnownSymbol('iterator');
var ArrayPrototype = Array.prototype;

// check on default Array iterator
module.exports = function (it) {
  return it !== undefined && (Iterators.Array === it || ArrayPrototype[ITERATOR] === it);
};


/***/ }),

/***/ 4376:
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

"use strict";

var classof = __webpack_require__(2195);

// `IsArray` abstract operation
// https://tc39.es/ecma262/#sec-isarray
// eslint-disable-next-line es/no-array-isarray -- safe
module.exports = Array.isArray || function isArray(argument) {
  return classof(argument) === 'Array';
};


/***/ }),

/***/ 4901:
/***/ ((module) => {

"use strict";

// https://tc39.es/ecma262/#sec-IsHTMLDDA-internal-slot
var documentAll = typeof document == 'object' && document.all;

// `IsCallable` abstract operation
// https://tc39.es/ecma262/#sec-iscallable
// eslint-disable-next-line unicorn/no-typeof-undefined -- required for testing
module.exports = typeof documentAll == 'undefined' && documentAll !== undefined ? function (argument) {
  return typeof argument == 'function' || argument === documentAll;
} : function (argument) {
  return typeof argument == 'function';
};


/***/ }),

/***/ 2796:
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

"use strict";

var fails = __webpack_require__(9039);
var isCallable = __webpack_require__(4901);

var replacement = /#|\.prototype\./;

var isForced = function (feature, detection) {
  var value = data[normalize(feature)];
  return value === POLYFILL ? true
    : value === NATIVE ? false
    : isCallable(detection) ? fails(detection)
    : !!detection;
};

var normalize = isForced.normalize = function (string) {
  return String(string).replace(replacement, '.').toLowerCase();
};

var data = isForced.data = {};
var NATIVE = isForced.NATIVE = 'N';
var POLYFILL = isForced.POLYFILL = 'P';

module.exports = isForced;


/***/ }),

/***/ 4117:
/***/ ((module) => {

"use strict";

// we can't use just `it == null` since of `document.all` special case
// https://tc39.es/ecma262/#sec-IsHTMLDDA-internal-slot-aec
module.exports = function (it) {
  return it === null || it === undefined;
};


/***/ }),

/***/ 34:
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

"use strict";

var isCallable = __webpack_require__(4901);

module.exports = function (it) {
  return typeof it == 'object' ? it !== null : isCallable(it);
};


/***/ }),

/***/ 3925:
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

"use strict";

var isObject = __webpack_require__(34);

module.exports = function (argument) {
  return isObject(argument) || argument === null;
};


/***/ }),

/***/ 6395:
/***/ ((module) => {

"use strict";

module.exports = false;


/***/ }),

/***/ 757:
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

"use strict";

var getBuiltIn = __webpack_require__(7751);
var isCallable = __webpack_require__(4901);
var isPrototypeOf = __webpack_require__(1625);
var USE_SYMBOL_AS_UID = __webpack_require__(7040);

var $Object = Object;

module.exports = USE_SYMBOL_AS_UID ? function (it) {
  return typeof it == 'symbol';
} : function (it) {
  var $Symbol = getBuiltIn('Symbol');
  return isCallable($Symbol) && isPrototypeOf($Symbol.prototype, $Object(it));
};


/***/ }),

/***/ 507:
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

"use strict";

var call = __webpack_require__(9565);

module.exports = function (record, fn, ITERATOR_INSTEAD_OF_RECORD) {
  var iterator = ITERATOR_INSTEAD_OF_RECORD ? record : record.iterator;
  var next = record.next;
  var step, result;
  while (!(step = call(next, iterator)).done) {
    result = fn(step.value);
    if (result !== undefined) return result;
  }
};


/***/ }),

/***/ 2652:
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

"use strict";

var bind = __webpack_require__(6080);
var call = __webpack_require__(9565);
var anObject = __webpack_require__(8551);
var tryToString = __webpack_require__(6823);
var isArrayIteratorMethod = __webpack_require__(4209);
var lengthOfArrayLike = __webpack_require__(6198);
var isPrototypeOf = __webpack_require__(1625);
var getIterator = __webpack_require__(81);
var getIteratorMethod = __webpack_require__(851);
var iteratorClose = __webpack_require__(9539);

var $TypeError = TypeError;

var Result = function (stopped, result) {
  this.stopped = stopped;
  this.result = result;
};

var ResultPrototype = Result.prototype;

module.exports = function (iterable, unboundFunction, options) {
  var that = options && options.that;
  var AS_ENTRIES = !!(options && options.AS_ENTRIES);
  var IS_RECORD = !!(options && options.IS_RECORD);
  var IS_ITERATOR = !!(options && options.IS_ITERATOR);
  var INTERRUPTED = !!(options && options.INTERRUPTED);
  var fn = bind(unboundFunction, that);
  var iterator, iterFn, index, length, result, next, step;

  var stop = function (condition) {
    if (iterator) iteratorClose(iterator, 'normal', condition);
    return new Result(true, condition);
  };

  var callFn = function (value) {
    if (AS_ENTRIES) {
      anObject(value);
      return INTERRUPTED ? fn(value[0], value[1], stop) : fn(value[0], value[1]);
    } return INTERRUPTED ? fn(value, stop) : fn(value);
  };

  if (IS_RECORD) {
    iterator = iterable.iterator;
  } else if (IS_ITERATOR) {
    iterator = iterable;
  } else {
    iterFn = getIteratorMethod(iterable);
    if (!iterFn) throw new $TypeError(tryToString(iterable) + ' is not iterable');
    // optimisation for array iterators
    if (isArrayIteratorMethod(iterFn)) {
      for (index = 0, length = lengthOfArrayLike(iterable); length > index; index++) {
        result = callFn(iterable[index]);
        if (result && isPrototypeOf(ResultPrototype, result)) return result;
      } return new Result(false);
    }
    iterator = getIterator(iterable, iterFn);
  }

  next = IS_RECORD ? iterable.next : iterator.next;
  while (!(step = call(next, iterator)).done) {
    try {
      result = callFn(step.value);
    } catch (error) {
      iteratorClose(iterator, 'throw', error);
    }
    if (typeof result == 'object' && result && isPrototypeOf(ResultPrototype, result)) return result;
  } return new Result(false);
};


/***/ }),

/***/ 9539:
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

"use strict";

var call = __webpack_require__(9565);
var anObject = __webpack_require__(8551);
var getMethod = __webpack_require__(5966);

module.exports = function (iterator, kind, value) {
  var innerResult, innerError;
  anObject(iterator);
  try {
    innerResult = getMethod(iterator, 'return');
    if (!innerResult) {
      if (kind === 'throw') throw value;
      return value;
    }
    innerResult = call(innerResult, iterator);
  } catch (error) {
    innerError = true;
    innerResult = error;
  }
  if (kind === 'throw') throw value;
  if (innerError) throw innerResult;
  anObject(innerResult);
  return value;
};


/***/ }),

/***/ 9462:
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

"use strict";

var call = __webpack_require__(9565);
var create = __webpack_require__(2360);
var createNonEnumerableProperty = __webpack_require__(6699);
var defineBuiltIns = __webpack_require__(6279);
var wellKnownSymbol = __webpack_require__(8227);
var InternalStateModule = __webpack_require__(1181);
var getMethod = __webpack_require__(5966);
var IteratorPrototype = (__webpack_require__(7657).IteratorPrototype);
var createIterResultObject = __webpack_require__(2529);
var iteratorClose = __webpack_require__(9539);

var TO_STRING_TAG = wellKnownSymbol('toStringTag');
var ITERATOR_HELPER = 'IteratorHelper';
var WRAP_FOR_VALID_ITERATOR = 'WrapForValidIterator';
var setInternalState = InternalStateModule.set;

var createIteratorProxyPrototype = function (IS_ITERATOR) {
  var getInternalState = InternalStateModule.getterFor(IS_ITERATOR ? WRAP_FOR_VALID_ITERATOR : ITERATOR_HELPER);

  return defineBuiltIns(create(IteratorPrototype), {
    next: function next() {
      var state = getInternalState(this);
      // for simplification:
      //   for `%WrapForValidIteratorPrototype%.next` our `nextHandler` returns `IterResultObject`
      //   for `%IteratorHelperPrototype%.next` - just a value
      if (IS_ITERATOR) return state.nextHandler();
      try {
        var result = state.done ? undefined : state.nextHandler();
        return createIterResultObject(result, state.done);
      } catch (error) {
        state.done = true;
        throw error;
      }
    },
    'return': function () {
      var state = getInternalState(this);
      var iterator = state.iterator;
      state.done = true;
      if (IS_ITERATOR) {
        var returnMethod = getMethod(iterator, 'return');
        return returnMethod ? call(returnMethod, iterator) : createIterResultObject(undefined, true);
      }
      if (state.inner) try {
        iteratorClose(state.inner.iterator, 'normal');
      } catch (error) {
        return iteratorClose(iterator, 'throw', error);
      }
      iteratorClose(iterator, 'normal');
      return createIterResultObject(undefined, true);
    }
  });
};

var WrapForValidIteratorPrototype = createIteratorProxyPrototype(true);
var IteratorHelperPrototype = createIteratorProxyPrototype(false);

createNonEnumerableProperty(IteratorHelperPrototype, TO_STRING_TAG, 'Iterator Helper');

module.exports = function (nextHandler, IS_ITERATOR) {
  var IteratorProxy = function Iterator(record, state) {
    if (state) {
      state.iterator = record.iterator;
      state.next = record.next;
    } else state = record;
    state.type = IS_ITERATOR ? WRAP_FOR_VALID_ITERATOR : ITERATOR_HELPER;
    state.nextHandler = nextHandler;
    state.counter = 0;
    state.done = false;
    setInternalState(this, state);
  };

  IteratorProxy.prototype = IS_ITERATOR ? WrapForValidIteratorPrototype : IteratorHelperPrototype;

  return IteratorProxy;
};


/***/ }),

/***/ 713:
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

"use strict";

var call = __webpack_require__(9565);
var aCallable = __webpack_require__(9306);
var anObject = __webpack_require__(8551);
var getIteratorDirect = __webpack_require__(1767);
var createIteratorProxy = __webpack_require__(9462);
var callWithSafeIterationClosing = __webpack_require__(6319);

var IteratorProxy = createIteratorProxy(function () {
  var iterator = this.iterator;
  var result = anObject(call(this.next, iterator));
  var done = this.done = !!result.done;
  if (!done) return callWithSafeIterationClosing(iterator, this.mapper, [result.value, this.counter++], true);
});

// `Iterator.prototype.map` method
// https://github.com/tc39/proposal-iterator-helpers
module.exports = function map(mapper) {
  anObject(this);
  aCallable(mapper);
  return new IteratorProxy(getIteratorDirect(this), {
    mapper: mapper
  });
};


/***/ }),

/***/ 7657:
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

"use strict";

var fails = __webpack_require__(9039);
var isCallable = __webpack_require__(4901);
var isObject = __webpack_require__(34);
var create = __webpack_require__(2360);
var getPrototypeOf = __webpack_require__(2787);
var defineBuiltIn = __webpack_require__(6840);
var wellKnownSymbol = __webpack_require__(8227);
var IS_PURE = __webpack_require__(6395);

var ITERATOR = wellKnownSymbol('iterator');
var BUGGY_SAFARI_ITERATORS = false;

// `%IteratorPrototype%` object
// https://tc39.es/ecma262/#sec-%iteratorprototype%-object
var IteratorPrototype, PrototypeOfArrayIteratorPrototype, arrayIterator;

/* eslint-disable es/no-array-prototype-keys -- safe */
if ([].keys) {
  arrayIterator = [].keys();
  // Safari 8 has buggy iterators w/o `next`
  if (!('next' in arrayIterator)) BUGGY_SAFARI_ITERATORS = true;
  else {
    PrototypeOfArrayIteratorPrototype = getPrototypeOf(getPrototypeOf(arrayIterator));
    if (PrototypeOfArrayIteratorPrototype !== Object.prototype) IteratorPrototype = PrototypeOfArrayIteratorPrototype;
  }
}

var NEW_ITERATOR_PROTOTYPE = !isObject(IteratorPrototype) || fails(function () {
  var test = {};
  // FF44- legacy iterators case
  return IteratorPrototype[ITERATOR].call(test) !== test;
});

if (NEW_ITERATOR_PROTOTYPE) IteratorPrototype = {};
else if (IS_PURE) IteratorPrototype = create(IteratorPrototype);

// `%IteratorPrototype%[@@iterator]()` method
// https://tc39.es/ecma262/#sec-%iteratorprototype%-@@iterator
if (!isCallable(IteratorPrototype[ITERATOR])) {
  defineBuiltIn(IteratorPrototype, ITERATOR, function () {
    return this;
  });
}

module.exports = {
  IteratorPrototype: IteratorPrototype,
  BUGGY_SAFARI_ITERATORS: BUGGY_SAFARI_ITERATORS
};


/***/ }),

/***/ 6269:
/***/ ((module) => {

"use strict";

module.exports = {};


/***/ }),

/***/ 6198:
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

"use strict";

var toLength = __webpack_require__(8014);

// `LengthOfArrayLike` abstract operation
// https://tc39.es/ecma262/#sec-lengthofarraylike
module.exports = function (obj) {
  return toLength(obj.length);
};


/***/ }),

/***/ 283:
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

"use strict";

var uncurryThis = __webpack_require__(9504);
var fails = __webpack_require__(9039);
var isCallable = __webpack_require__(4901);
var hasOwn = __webpack_require__(9297);
var DESCRIPTORS = __webpack_require__(3724);
var CONFIGURABLE_FUNCTION_NAME = (__webpack_require__(350).CONFIGURABLE);
var inspectSource = __webpack_require__(3706);
var InternalStateModule = __webpack_require__(1181);

var enforceInternalState = InternalStateModule.enforce;
var getInternalState = InternalStateModule.get;
var $String = String;
// eslint-disable-next-line es/no-object-defineproperty -- safe
var defineProperty = Object.defineProperty;
var stringSlice = uncurryThis(''.slice);
var replace = uncurryThis(''.replace);
var join = uncurryThis([].join);

var CONFIGURABLE_LENGTH = DESCRIPTORS && !fails(function () {
  return defineProperty(function () { /* empty */ }, 'length', { value: 8 }).length !== 8;
});

var TEMPLATE = String(String).split('String');

var makeBuiltIn = module.exports = function (value, name, options) {
  if (stringSlice($String(name), 0, 7) === 'Symbol(') {
    name = '[' + replace($String(name), /^Symbol\(([^)]*)\).*$/, '$1') + ']';
  }
  if (options && options.getter) name = 'get ' + name;
  if (options && options.setter) name = 'set ' + name;
  if (!hasOwn(value, 'name') || (CONFIGURABLE_FUNCTION_NAME && value.name !== name)) {
    if (DESCRIPTORS) defineProperty(value, 'name', { value: name, configurable: true });
    else value.name = name;
  }
  if (CONFIGURABLE_LENGTH && options && hasOwn(options, 'arity') && value.length !== options.arity) {
    defineProperty(value, 'length', { value: options.arity });
  }
  try {
    if (options && hasOwn(options, 'constructor') && options.constructor) {
      if (DESCRIPTORS) defineProperty(value, 'prototype', { writable: false });
    // in V8 ~ Chrome 53, prototypes of some methods, like `Array.prototype.values`, are non-writable
    } else if (value.prototype) value.prototype = undefined;
  } catch (error) { /* empty */ }
  var state = enforceInternalState(value);
  if (!hasOwn(state, 'source')) {
    state.source = join(TEMPLATE, typeof name == 'string' ? name : '');
  } return value;
};

// add fake Function#toString for correct work wrapped methods / constructors with methods like LoDash isNative
// eslint-disable-next-line no-extend-native -- required
Function.prototype.toString = makeBuiltIn(function toString() {
  return isCallable(this) && getInternalState(this).source || inspectSource(this);
}, 'toString');


/***/ }),

/***/ 2248:
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

"use strict";

var uncurryThis = __webpack_require__(9504);

// eslint-disable-next-line es/no-map -- safe
var MapPrototype = Map.prototype;

module.exports = {
  // eslint-disable-next-line es/no-map -- safe
  Map: Map,
  set: uncurryThis(MapPrototype.set),
  get: uncurryThis(MapPrototype.get),
  has: uncurryThis(MapPrototype.has),
  remove: uncurryThis(MapPrototype['delete']),
  proto: MapPrototype
};


/***/ }),

/***/ 6223:
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

"use strict";

var uncurryThis = __webpack_require__(9504);
var iterateSimple = __webpack_require__(507);
var MapHelpers = __webpack_require__(2248);

var Map = MapHelpers.Map;
var MapPrototype = MapHelpers.proto;
var forEach = uncurryThis(MapPrototype.forEach);
var entries = uncurryThis(MapPrototype.entries);
var next = entries(new Map()).next;

module.exports = function (map, fn, interruptible) {
  return interruptible ? iterateSimple({ iterator: entries(map), next: next }, function (entry) {
    return fn(entry[1], entry[0]);
  }) : forEach(map, fn);
};


/***/ }),

/***/ 741:
/***/ ((module) => {

"use strict";

var ceil = Math.ceil;
var floor = Math.floor;

// `Math.trunc` method
// https://tc39.es/ecma262/#sec-math.trunc
// eslint-disable-next-line es/no-math-trunc -- safe
module.exports = Math.trunc || function trunc(x) {
  var n = +x;
  return (n > 0 ? floor : ceil)(n);
};


/***/ }),

/***/ 2603:
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

"use strict";

var toString = __webpack_require__(655);

module.exports = function (argument, $default) {
  return argument === undefined ? arguments.length < 2 ? '' : $default : toString(argument);
};


/***/ }),

/***/ 2360:
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

"use strict";

/* global ActiveXObject -- old IE, WSH */
var anObject = __webpack_require__(8551);
var definePropertiesModule = __webpack_require__(6801);
var enumBugKeys = __webpack_require__(8727);
var hiddenKeys = __webpack_require__(421);
var html = __webpack_require__(397);
var documentCreateElement = __webpack_require__(4055);
var sharedKey = __webpack_require__(6119);

var GT = '>';
var LT = '<';
var PROTOTYPE = 'prototype';
var SCRIPT = 'script';
var IE_PROTO = sharedKey('IE_PROTO');

var EmptyConstructor = function () { /* empty */ };

var scriptTag = function (content) {
  return LT + SCRIPT + GT + content + LT + '/' + SCRIPT + GT;
};

// Create object with fake `null` prototype: use ActiveX Object with cleared prototype
var NullProtoObjectViaActiveX = function (activeXDocument) {
  activeXDocument.write(scriptTag(''));
  activeXDocument.close();
  var temp = activeXDocument.parentWindow.Object;
  // eslint-disable-next-line no-useless-assignment -- avoid memory leak
  activeXDocument = null;
  return temp;
};

// Create object with fake `null` prototype: use iframe Object with cleared prototype
var NullProtoObjectViaIFrame = function () {
  // Thrash, waste and sodomy: IE GC bug
  var iframe = documentCreateElement('iframe');
  var JS = 'java' + SCRIPT + ':';
  var iframeDocument;
  iframe.style.display = 'none';
  html.appendChild(iframe);
  // https://github.com/zloirock/core-js/issues/475
  iframe.src = String(JS);
  iframeDocument = iframe.contentWindow.document;
  iframeDocument.open();
  iframeDocument.write(scriptTag('document.F=Object'));
  iframeDocument.close();
  return iframeDocument.F;
};

// Check for document.domain and active x support
// No need to use active x approach when document.domain is not set
// see https://github.com/es-shims/es5-shim/issues/150
// variation of https://github.com/kitcambridge/es5-shim/commit/4f738ac066346
// avoid IE GC bug
var activeXDocument;
var NullProtoObject = function () {
  try {
    activeXDocument = new ActiveXObject('htmlfile');
  } catch (error) { /* ignore */ }
  NullProtoObject = typeof document != 'undefined'
    ? document.domain && activeXDocument
      ? NullProtoObjectViaActiveX(activeXDocument) // old IE
      : NullProtoObjectViaIFrame()
    : NullProtoObjectViaActiveX(activeXDocument); // WSH
  var length = enumBugKeys.length;
  while (length--) delete NullProtoObject[PROTOTYPE][enumBugKeys[length]];
  return NullProtoObject();
};

hiddenKeys[IE_PROTO] = true;

// `Object.create` method
// https://tc39.es/ecma262/#sec-object.create
// eslint-disable-next-line es/no-object-create -- safe
module.exports = Object.create || function create(O, Properties) {
  var result;
  if (O !== null) {
    EmptyConstructor[PROTOTYPE] = anObject(O);
    result = new EmptyConstructor();
    EmptyConstructor[PROTOTYPE] = null;
    // add "__proto__" for Object.getPrototypeOf polyfill
    result[IE_PROTO] = O;
  } else result = NullProtoObject();
  return Properties === undefined ? result : definePropertiesModule.f(result, Properties);
};


/***/ }),

/***/ 6801:
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {

"use strict";

var DESCRIPTORS = __webpack_require__(3724);
var V8_PROTOTYPE_DEFINE_BUG = __webpack_require__(8686);
var definePropertyModule = __webpack_require__(4913);
var anObject = __webpack_require__(8551);
var toIndexedObject = __webpack_require__(5397);
var objectKeys = __webpack_require__(1072);

// `Object.defineProperties` method
// https://tc39.es/ecma262/#sec-object.defineproperties
// eslint-disable-next-line es/no-object-defineproperties -- safe
exports.f = DESCRIPTORS && !V8_PROTOTYPE_DEFINE_BUG ? Object.defineProperties : function defineProperties(O, Properties) {
  anObject(O);
  var props = toIndexedObject(Properties);
  var keys = objectKeys(Properties);
  var length = keys.length;
  var index = 0;
  var key;
  while (length > index) definePropertyModule.f(O, key = keys[index++], props[key]);
  return O;
};


/***/ }),

/***/ 4913:
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {

"use strict";

var DESCRIPTORS = __webpack_require__(3724);
var IE8_DOM_DEFINE = __webpack_require__(5917);
var V8_PROTOTYPE_DEFINE_BUG = __webpack_require__(8686);
var anObject = __webpack_require__(8551);
var toPropertyKey = __webpack_require__(6969);

var $TypeError = TypeError;
// eslint-disable-next-line es/no-object-defineproperty -- safe
var $defineProperty = Object.defineProperty;
// eslint-disable-next-line es/no-object-getownpropertydescriptor -- safe
var $getOwnPropertyDescriptor = Object.getOwnPropertyDescriptor;
var ENUMERABLE = 'enumerable';
var CONFIGURABLE = 'configurable';
var WRITABLE = 'writable';

// `Object.defineProperty` method
// https://tc39.es/ecma262/#sec-object.defineproperty
exports.f = DESCRIPTORS ? V8_PROTOTYPE_DEFINE_BUG ? function defineProperty(O, P, Attributes) {
  anObject(O);
  P = toPropertyKey(P);
  anObject(Attributes);
  if (typeof O === 'function' && P === 'prototype' && 'value' in Attributes && WRITABLE in Attributes && !Attributes[WRITABLE]) {
    var current = $getOwnPropertyDescriptor(O, P);
    if (current && current[WRITABLE]) {
      O[P] = Attributes.value;
      Attributes = {
        configurable: CONFIGURABLE in Attributes ? Attributes[CONFIGURABLE] : current[CONFIGURABLE],
        enumerable: ENUMERABLE in Attributes ? Attributes[ENUMERABLE] : current[ENUMERABLE],
        writable: false
      };
    }
  } return $defineProperty(O, P, Attributes);
} : $defineProperty : function defineProperty(O, P, Attributes) {
  anObject(O);
  P = toPropertyKey(P);
  anObject(Attributes);
  if (IE8_DOM_DEFINE) try {
    return $defineProperty(O, P, Attributes);
  } catch (error) { /* empty */ }
  if ('get' in Attributes || 'set' in Attributes) throw new $TypeError('Accessors not supported');
  if ('value' in Attributes) O[P] = Attributes.value;
  return O;
};


/***/ }),

/***/ 7347:
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {

"use strict";

var DESCRIPTORS = __webpack_require__(3724);
var call = __webpack_require__(9565);
var propertyIsEnumerableModule = __webpack_require__(8773);
var createPropertyDescriptor = __webpack_require__(6980);
var toIndexedObject = __webpack_require__(5397);
var toPropertyKey = __webpack_require__(6969);
var hasOwn = __webpack_require__(9297);
var IE8_DOM_DEFINE = __webpack_require__(5917);

// eslint-disable-next-line es/no-object-getownpropertydescriptor -- safe
var $getOwnPropertyDescriptor = Object.getOwnPropertyDescriptor;

// `Object.getOwnPropertyDescriptor` method
// https://tc39.es/ecma262/#sec-object.getownpropertydescriptor
exports.f = DESCRIPTORS ? $getOwnPropertyDescriptor : function getOwnPropertyDescriptor(O, P) {
  O = toIndexedObject(O);
  P = toPropertyKey(P);
  if (IE8_DOM_DEFINE) try {
    return $getOwnPropertyDescriptor(O, P);
  } catch (error) { /* empty */ }
  if (hasOwn(O, P)) return createPropertyDescriptor(!call(propertyIsEnumerableModule.f, O, P), O[P]);
};


/***/ }),

/***/ 8480:
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {

"use strict";

var internalObjectKeys = __webpack_require__(1828);
var enumBugKeys = __webpack_require__(8727);

var hiddenKeys = enumBugKeys.concat('length', 'prototype');

// `Object.getOwnPropertyNames` method
// https://tc39.es/ecma262/#sec-object.getownpropertynames
// eslint-disable-next-line es/no-object-getownpropertynames -- safe
exports.f = Object.getOwnPropertyNames || function getOwnPropertyNames(O) {
  return internalObjectKeys(O, hiddenKeys);
};


/***/ }),

/***/ 3717:
/***/ ((__unused_webpack_module, exports) => {

"use strict";

// eslint-disable-next-line es/no-object-getownpropertysymbols -- safe
exports.f = Object.getOwnPropertySymbols;


/***/ }),

/***/ 2787:
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

"use strict";

var hasOwn = __webpack_require__(9297);
var isCallable = __webpack_require__(4901);
var toObject = __webpack_require__(8981);
var sharedKey = __webpack_require__(6119);
var CORRECT_PROTOTYPE_GETTER = __webpack_require__(2211);

var IE_PROTO = sharedKey('IE_PROTO');
var $Object = Object;
var ObjectPrototype = $Object.prototype;

// `Object.getPrototypeOf` method
// https://tc39.es/ecma262/#sec-object.getprototypeof
// eslint-disable-next-line es/no-object-getprototypeof -- safe
module.exports = CORRECT_PROTOTYPE_GETTER ? $Object.getPrototypeOf : function (O) {
  var object = toObject(O);
  if (hasOwn(object, IE_PROTO)) return object[IE_PROTO];
  var constructor = object.constructor;
  if (isCallable(constructor) && object instanceof constructor) {
    return constructor.prototype;
  } return object instanceof $Object ? ObjectPrototype : null;
};


/***/ }),

/***/ 1625:
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

"use strict";

var uncurryThis = __webpack_require__(9504);

module.exports = uncurryThis({}.isPrototypeOf);


/***/ }),

/***/ 1828:
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

"use strict";

var uncurryThis = __webpack_require__(9504);
var hasOwn = __webpack_require__(9297);
var toIndexedObject = __webpack_require__(5397);
var indexOf = (__webpack_require__(9617).indexOf);
var hiddenKeys = __webpack_require__(421);

var push = uncurryThis([].push);

module.exports = function (object, names) {
  var O = toIndexedObject(object);
  var i = 0;
  var result = [];
  var key;
  for (key in O) !hasOwn(hiddenKeys, key) && hasOwn(O, key) && push(result, key);
  // Don't enum bug & hidden keys
  while (names.length > i) if (hasOwn(O, key = names[i++])) {
    ~indexOf(result, key) || push(result, key);
  }
  return result;
};


/***/ }),

/***/ 1072:
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

"use strict";

var internalObjectKeys = __webpack_require__(1828);
var enumBugKeys = __webpack_require__(8727);

// `Object.keys` method
// https://tc39.es/ecma262/#sec-object.keys
// eslint-disable-next-line es/no-object-keys -- safe
module.exports = Object.keys || function keys(O) {
  return internalObjectKeys(O, enumBugKeys);
};


/***/ }),

/***/ 8773:
/***/ ((__unused_webpack_module, exports) => {

"use strict";

var $propertyIsEnumerable = {}.propertyIsEnumerable;
// eslint-disable-next-line es/no-object-getownpropertydescriptor -- safe
var getOwnPropertyDescriptor = Object.getOwnPropertyDescriptor;

// Nashorn ~ JDK8 bug
var NASHORN_BUG = getOwnPropertyDescriptor && !$propertyIsEnumerable.call({ 1: 2 }, 1);

// `Object.prototype.propertyIsEnumerable` method implementation
// https://tc39.es/ecma262/#sec-object.prototype.propertyisenumerable
exports.f = NASHORN_BUG ? function propertyIsEnumerable(V) {
  var descriptor = getOwnPropertyDescriptor(this, V);
  return !!descriptor && descriptor.enumerable;
} : $propertyIsEnumerable;


/***/ }),

/***/ 2967:
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

"use strict";

/* eslint-disable no-proto -- safe */
var uncurryThisAccessor = __webpack_require__(6706);
var isObject = __webpack_require__(34);
var requireObjectCoercible = __webpack_require__(7750);
var aPossiblePrototype = __webpack_require__(3506);

// `Object.setPrototypeOf` method
// https://tc39.es/ecma262/#sec-object.setprototypeof
// Works with __proto__ only. Old v8 can't work with null proto objects.
// eslint-disable-next-line es/no-object-setprototypeof -- safe
module.exports = Object.setPrototypeOf || ('__proto__' in {} ? function () {
  var CORRECT_SETTER = false;
  var test = {};
  var setter;
  try {
    setter = uncurryThisAccessor(Object.prototype, '__proto__', 'set');
    setter(test, []);
    CORRECT_SETTER = test instanceof Array;
  } catch (error) { /* empty */ }
  return function setPrototypeOf(O, proto) {
    requireObjectCoercible(O);
    aPossiblePrototype(proto);
    if (!isObject(O)) return O;
    if (CORRECT_SETTER) setter(O, proto);
    else O.__proto__ = proto;
    return O;
  };
}() : undefined);


/***/ }),

/***/ 4270:
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

"use strict";

var call = __webpack_require__(9565);
var isCallable = __webpack_require__(4901);
var isObject = __webpack_require__(34);

var $TypeError = TypeError;

// `OrdinaryToPrimitive` abstract operation
// https://tc39.es/ecma262/#sec-ordinarytoprimitive
module.exports = function (input, pref) {
  var fn, val;
  if (pref === 'string' && isCallable(fn = input.toString) && !isObject(val = call(fn, input))) return val;
  if (isCallable(fn = input.valueOf) && !isObject(val = call(fn, input))) return val;
  if (pref !== 'string' && isCallable(fn = input.toString) && !isObject(val = call(fn, input))) return val;
  throw new $TypeError("Can't convert object to primitive value");
};


/***/ }),

/***/ 5031:
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

"use strict";

var getBuiltIn = __webpack_require__(7751);
var uncurryThis = __webpack_require__(9504);
var getOwnPropertyNamesModule = __webpack_require__(8480);
var getOwnPropertySymbolsModule = __webpack_require__(3717);
var anObject = __webpack_require__(8551);

var concat = uncurryThis([].concat);

// all object keys, includes non-enumerable and symbols
module.exports = getBuiltIn('Reflect', 'ownKeys') || function ownKeys(it) {
  var keys = getOwnPropertyNamesModule.f(anObject(it));
  var getOwnPropertySymbols = getOwnPropertySymbolsModule.f;
  return getOwnPropertySymbols ? concat(keys, getOwnPropertySymbols(it)) : keys;
};


/***/ }),

/***/ 8235:
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

"use strict";

var uncurryThis = __webpack_require__(9504);
var hasOwn = __webpack_require__(9297);

var $SyntaxError = SyntaxError;
var $parseInt = parseInt;
var fromCharCode = String.fromCharCode;
var at = uncurryThis(''.charAt);
var slice = uncurryThis(''.slice);
var exec = uncurryThis(/./.exec);

var codePoints = {
  '\\"': '"',
  '\\\\': '\\',
  '\\/': '/',
  '\\b': '\b',
  '\\f': '\f',
  '\\n': '\n',
  '\\r': '\r',
  '\\t': '\t'
};

var IS_4_HEX_DIGITS = /^[\da-f]{4}$/i;
// eslint-disable-next-line regexp/no-control-character -- safe
var IS_C0_CONTROL_CODE = /^[\u0000-\u001F]$/;

module.exports = function (source, i) {
  var unterminated = true;
  var value = '';
  while (i < source.length) {
    var chr = at(source, i);
    if (chr === '\\') {
      var twoChars = slice(source, i, i + 2);
      if (hasOwn(codePoints, twoChars)) {
        value += codePoints[twoChars];
        i += 2;
      } else if (twoChars === '\\u') {
        i += 2;
        var fourHexDigits = slice(source, i, i + 4);
        if (!exec(IS_4_HEX_DIGITS, fourHexDigits)) throw new $SyntaxError('Bad Unicode escape at: ' + i);
        value += fromCharCode($parseInt(fourHexDigits, 16));
        i += 4;
      } else throw new $SyntaxError('Unknown escape sequence: "' + twoChars + '"');
    } else if (chr === '"') {
      unterminated = false;
      i++;
      break;
    } else {
      if (exec(IS_C0_CONTROL_CODE, chr)) throw new $SyntaxError('Bad control character in string literal at: ' + i);
      value += chr;
      i++;
    }
  }
  if (unterminated) throw new $SyntaxError('Unterminated string at: ' + i);
  return { value: value, end: i };
};


/***/ }),

/***/ 1103:
/***/ ((module) => {

"use strict";

module.exports = function (exec) {
  try {
    return { error: false, value: exec() };
  } catch (error) {
    return { error: true, value: error };
  }
};


/***/ }),

/***/ 7750:
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

"use strict";

var isNullOrUndefined = __webpack_require__(4117);

var $TypeError = TypeError;

// `RequireObjectCoercible` abstract operation
// https://tc39.es/ecma262/#sec-requireobjectcoercible
module.exports = function (it) {
  if (isNullOrUndefined(it)) throw new $TypeError("Can't call method on " + it);
  return it;
};


/***/ }),

/***/ 3317:
/***/ ((module) => {

"use strict";

// `SameValueZero` abstract operation
// https://tc39.es/ecma262/#sec-samevaluezero
module.exports = function (x, y) {
  // eslint-disable-next-line no-self-compare -- NaN check
  return x === y || x !== x && y !== y;
};


/***/ }),

/***/ 6119:
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

"use strict";

var shared = __webpack_require__(5745);
var uid = __webpack_require__(3392);

var keys = shared('keys');

module.exports = function (key) {
  return keys[key] || (keys[key] = uid(key));
};


/***/ }),

/***/ 7629:
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

"use strict";

var IS_PURE = __webpack_require__(6395);
var globalThis = __webpack_require__(4576);
var defineGlobalProperty = __webpack_require__(9433);

var SHARED = '__core-js_shared__';
var store = module.exports = globalThis[SHARED] || defineGlobalProperty(SHARED, {});

(store.versions || (store.versions = [])).push({
  version: '3.38.1',
  mode: IS_PURE ? 'pure' : 'global',
  copyright: '© 2014-2024 Denis Pushkarev (zloirock.ru)',
  license: 'https://github.com/zloirock/core-js/blob/v3.38.1/LICENSE',
  source: 'https://github.com/zloirock/core-js'
});


/***/ }),

/***/ 5745:
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

"use strict";

var store = __webpack_require__(7629);

module.exports = function (key, value) {
  return store[key] || (store[key] = value || {});
};


/***/ }),

/***/ 1548:
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

"use strict";

var globalThis = __webpack_require__(4576);
var fails = __webpack_require__(9039);
var V8 = __webpack_require__(9519);
var ENVIRONMENT = __webpack_require__(4215);

var structuredClone = globalThis.structuredClone;

module.exports = !!structuredClone && !fails(function () {
  // prevent V8 ArrayBufferDetaching protector cell invalidation and performance degradation
  // https://github.com/zloirock/core-js/issues/679
  if ((ENVIRONMENT === 'DENO' && V8 > 92) || (ENVIRONMENT === 'NODE' && V8 > 94) || (ENVIRONMENT === 'BROWSER' && V8 > 97)) return false;
  var buffer = new ArrayBuffer(8);
  var clone = structuredClone(buffer, { transfer: [buffer] });
  return buffer.byteLength !== 0 || clone.byteLength !== 8;
});


/***/ }),

/***/ 4495:
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

"use strict";

/* eslint-disable es/no-symbol -- required for testing */
var V8_VERSION = __webpack_require__(9519);
var fails = __webpack_require__(9039);
var globalThis = __webpack_require__(4576);

var $String = globalThis.String;

// eslint-disable-next-line es/no-object-getownpropertysymbols -- required for testing
module.exports = !!Object.getOwnPropertySymbols && !fails(function () {
  var symbol = Symbol('symbol detection');
  // Chrome 38 Symbol has incorrect toString conversion
  // `get-own-property-symbols` polyfill symbols converted to object are not Symbol instances
  // nb: Do not call `String` directly to avoid this being optimized out to `symbol+''` which will,
  // of course, fail.
  return !$String(symbol) || !(Object(symbol) instanceof Symbol) ||
    // Chrome 38-40 symbols are not inherited from DOM collections prototypes to instances
    !Symbol.sham && V8_VERSION && V8_VERSION < 41;
});


/***/ }),

/***/ 5610:
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

"use strict";

var toIntegerOrInfinity = __webpack_require__(1291);

var max = Math.max;
var min = Math.min;

// Helper for a popular repeating case of the spec:
// Let integer be ? ToInteger(index).
// If integer < 0, let result be max((length + integer), 0); else let result be min(integer, length).
module.exports = function (index, length) {
  var integer = toIntegerOrInfinity(index);
  return integer < 0 ? max(integer + length, 0) : min(integer, length);
};


/***/ }),

/***/ 7696:
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

"use strict";

var toIntegerOrInfinity = __webpack_require__(1291);
var toLength = __webpack_require__(8014);

var $RangeError = RangeError;

// `ToIndex` abstract operation
// https://tc39.es/ecma262/#sec-toindex
module.exports = function (it) {
  if (it === undefined) return 0;
  var number = toIntegerOrInfinity(it);
  var length = toLength(number);
  if (number !== length) throw new $RangeError('Wrong length or index');
  return length;
};


/***/ }),

/***/ 5397:
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

"use strict";

// toObject with fallback for non-array-like ES3 strings
var IndexedObject = __webpack_require__(7055);
var requireObjectCoercible = __webpack_require__(7750);

module.exports = function (it) {
  return IndexedObject(requireObjectCoercible(it));
};


/***/ }),

/***/ 1291:
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

"use strict";

var trunc = __webpack_require__(741);

// `ToIntegerOrInfinity` abstract operation
// https://tc39.es/ecma262/#sec-tointegerorinfinity
module.exports = function (argument) {
  var number = +argument;
  // eslint-disable-next-line no-self-compare -- NaN check
  return number !== number || number === 0 ? 0 : trunc(number);
};


/***/ }),

/***/ 8014:
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

"use strict";

var toIntegerOrInfinity = __webpack_require__(1291);

var min = Math.min;

// `ToLength` abstract operation
// https://tc39.es/ecma262/#sec-tolength
module.exports = function (argument) {
  var len = toIntegerOrInfinity(argument);
  return len > 0 ? min(len, 0x1FFFFFFFFFFFFF) : 0; // 2 ** 53 - 1 == 9007199254740991
};


/***/ }),

/***/ 8981:
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

"use strict";

var requireObjectCoercible = __webpack_require__(7750);

var $Object = Object;

// `ToObject` abstract operation
// https://tc39.es/ecma262/#sec-toobject
module.exports = function (argument) {
  return $Object(requireObjectCoercible(argument));
};


/***/ }),

/***/ 2777:
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

"use strict";

var call = __webpack_require__(9565);
var isObject = __webpack_require__(34);
var isSymbol = __webpack_require__(757);
var getMethod = __webpack_require__(5966);
var ordinaryToPrimitive = __webpack_require__(4270);
var wellKnownSymbol = __webpack_require__(8227);

var $TypeError = TypeError;
var TO_PRIMITIVE = wellKnownSymbol('toPrimitive');

// `ToPrimitive` abstract operation
// https://tc39.es/ecma262/#sec-toprimitive
module.exports = function (input, pref) {
  if (!isObject(input) || isSymbol(input)) return input;
  var exoticToPrim = getMethod(input, TO_PRIMITIVE);
  var result;
  if (exoticToPrim) {
    if (pref === undefined) pref = 'default';
    result = call(exoticToPrim, input, pref);
    if (!isObject(result) || isSymbol(result)) return result;
    throw new $TypeError("Can't convert object to primitive value");
  }
  if (pref === undefined) pref = 'number';
  return ordinaryToPrimitive(input, pref);
};


/***/ }),

/***/ 6969:
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

"use strict";

var toPrimitive = __webpack_require__(2777);
var isSymbol = __webpack_require__(757);

// `ToPropertyKey` abstract operation
// https://tc39.es/ecma262/#sec-topropertykey
module.exports = function (argument) {
  var key = toPrimitive(argument, 'string');
  return isSymbol(key) ? key : key + '';
};


/***/ }),

/***/ 2140:
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

"use strict";

var wellKnownSymbol = __webpack_require__(8227);

var TO_STRING_TAG = wellKnownSymbol('toStringTag');
var test = {};

test[TO_STRING_TAG] = 'z';

module.exports = String(test) === '[object z]';


/***/ }),

/***/ 655:
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

"use strict";

var classof = __webpack_require__(6955);

var $String = String;

module.exports = function (argument) {
  if (classof(argument) === 'Symbol') throw new TypeError('Cannot convert a Symbol value to a string');
  return $String(argument);
};


/***/ }),

/***/ 6823:
/***/ ((module) => {

"use strict";

var $String = String;

module.exports = function (argument) {
  try {
    return $String(argument);
  } catch (error) {
    return 'Object';
  }
};


/***/ }),

/***/ 3392:
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

"use strict";

var uncurryThis = __webpack_require__(9504);

var id = 0;
var postfix = Math.random();
var toString = uncurryThis(1.0.toString);

module.exports = function (key) {
  return 'Symbol(' + (key === undefined ? '' : key) + ')_' + toString(++id + postfix, 36);
};


/***/ }),

/***/ 7040:
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

"use strict";

/* eslint-disable es/no-symbol -- required for testing */
var NATIVE_SYMBOL = __webpack_require__(4495);

module.exports = NATIVE_SYMBOL
  && !Symbol.sham
  && typeof Symbol.iterator == 'symbol';


/***/ }),

/***/ 8686:
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

"use strict";

var DESCRIPTORS = __webpack_require__(3724);
var fails = __webpack_require__(9039);

// V8 ~ Chrome 36-
// https://bugs.chromium.org/p/v8/issues/detail?id=3334
module.exports = DESCRIPTORS && fails(function () {
  // eslint-disable-next-line es/no-object-defineproperty -- required for testing
  return Object.defineProperty(function () { /* empty */ }, 'prototype', {
    value: 42,
    writable: false
  }).prototype !== 42;
});


/***/ }),

/***/ 2812:
/***/ ((module) => {

"use strict";

var $TypeError = TypeError;

module.exports = function (passed, required) {
  if (passed < required) throw new $TypeError('Not enough arguments');
  return passed;
};


/***/ }),

/***/ 8622:
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

"use strict";

var globalThis = __webpack_require__(4576);
var isCallable = __webpack_require__(4901);

var WeakMap = globalThis.WeakMap;

module.exports = isCallable(WeakMap) && /native code/.test(String(WeakMap));


/***/ }),

/***/ 8227:
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

"use strict";

var globalThis = __webpack_require__(4576);
var shared = __webpack_require__(5745);
var hasOwn = __webpack_require__(9297);
var uid = __webpack_require__(3392);
var NATIVE_SYMBOL = __webpack_require__(4495);
var USE_SYMBOL_AS_UID = __webpack_require__(7040);

var Symbol = globalThis.Symbol;
var WellKnownSymbolsStore = shared('wks');
var createWellKnownSymbol = USE_SYMBOL_AS_UID ? Symbol['for'] || Symbol : Symbol && Symbol.withoutSetter || uid;

module.exports = function (name) {
  if (!hasOwn(WellKnownSymbolsStore, name)) {
    WellKnownSymbolsStore[name] = NATIVE_SYMBOL && hasOwn(Symbol, name)
      ? Symbol[name]
      : createWellKnownSymbol('Symbol.' + name);
  } return WellKnownSymbolsStore[name];
};


/***/ }),

/***/ 6573:
/***/ ((__unused_webpack_module, __unused_webpack_exports, __webpack_require__) => {

"use strict";

var DESCRIPTORS = __webpack_require__(3724);
var defineBuiltInAccessor = __webpack_require__(2106);
var isDetached = __webpack_require__(3238);

var ArrayBufferPrototype = ArrayBuffer.prototype;

if (DESCRIPTORS && !('detached' in ArrayBufferPrototype)) {
  defineBuiltInAccessor(ArrayBufferPrototype, 'detached', {
    configurable: true,
    get: function detached() {
      return isDetached(this);
    }
  });
}


/***/ }),

/***/ 7936:
/***/ ((__unused_webpack_module, __unused_webpack_exports, __webpack_require__) => {

"use strict";

var $ = __webpack_require__(6518);
var $transfer = __webpack_require__(5636);

// `ArrayBuffer.prototype.transferToFixedLength` method
// https://tc39.es/proposal-arraybuffer-transfer/#sec-arraybuffer.prototype.transfertofixedlength
if ($transfer) $({ target: 'ArrayBuffer', proto: true }, {
  transferToFixedLength: function transferToFixedLength() {
    return $transfer(this, arguments.length ? arguments[0] : undefined, false);
  }
});


/***/ }),

/***/ 8100:
/***/ ((__unused_webpack_module, __unused_webpack_exports, __webpack_require__) => {

"use strict";

var $ = __webpack_require__(6518);
var $transfer = __webpack_require__(5636);

// `ArrayBuffer.prototype.transfer` method
// https://tc39.es/proposal-arraybuffer-transfer/#sec-arraybuffer.prototype.transfer
if ($transfer) $({ target: 'ArrayBuffer', proto: true }, {
  transfer: function transfer() {
    return $transfer(this, arguments.length ? arguments[0] : undefined, true);
  }
});


/***/ }),

/***/ 4114:
/***/ ((__unused_webpack_module, __unused_webpack_exports, __webpack_require__) => {

"use strict";

var $ = __webpack_require__(6518);
var toObject = __webpack_require__(8981);
var lengthOfArrayLike = __webpack_require__(6198);
var setArrayLength = __webpack_require__(4527);
var doesNotExceedSafeInteger = __webpack_require__(6837);
var fails = __webpack_require__(9039);

var INCORRECT_TO_LENGTH = fails(function () {
  return [].push.call({ length: 0x100000000 }, 1) !== 4294967297;
});

// V8 <= 121 and Safari <= 15.4; FF < 23 throws InternalError
// https://bugs.chromium.org/p/v8/issues/detail?id=12681
var properErrorOnNonWritableLength = function () {
  try {
    // eslint-disable-next-line es/no-object-defineproperty -- safe
    Object.defineProperty([], 'length', { writable: false }).push();
  } catch (error) {
    return error instanceof TypeError;
  }
};

var FORCED = INCORRECT_TO_LENGTH || !properErrorOnNonWritableLength();

// `Array.prototype.push` method
// https://tc39.es/ecma262/#sec-array.prototype.push
$({ target: 'Array', proto: true, arity: 1, forced: FORCED }, {
  // eslint-disable-next-line no-unused-vars -- required for `.length`
  push: function push(item) {
    var O = toObject(this);
    var len = lengthOfArrayLike(O);
    var argCount = arguments.length;
    doesNotExceedSafeInteger(len + argCount);
    for (var i = 0; i < argCount; i++) {
      O[len] = arguments[i];
      len++;
    }
    setArrayLength(O, len);
    return len;
  }
});


/***/ }),

/***/ 3609:
/***/ ((__unused_webpack_module, __unused_webpack_exports, __webpack_require__) => {

"use strict";

var $ = __webpack_require__(6518);
var toObject = __webpack_require__(8981);
var lengthOfArrayLike = __webpack_require__(6198);
var setArrayLength = __webpack_require__(4527);
var deletePropertyOrThrow = __webpack_require__(4606);
var doesNotExceedSafeInteger = __webpack_require__(6837);

// IE8-
var INCORRECT_RESULT = [].unshift(0) !== 1;

// V8 ~ Chrome < 71 and Safari <= 15.4, FF < 23 throws InternalError
var properErrorOnNonWritableLength = function () {
  try {
    // eslint-disable-next-line es/no-object-defineproperty -- safe
    Object.defineProperty([], 'length', { writable: false }).unshift();
  } catch (error) {
    return error instanceof TypeError;
  }
};

var FORCED = INCORRECT_RESULT || !properErrorOnNonWritableLength();

// `Array.prototype.unshift` method
// https://tc39.es/ecma262/#sec-array.prototype.unshift
$({ target: 'Array', proto: true, arity: 1, forced: FORCED }, {
  // eslint-disable-next-line no-unused-vars -- required for `.length`
  unshift: function unshift(item) {
    var O = toObject(this);
    var len = lengthOfArrayLike(O);
    var argCount = arguments.length;
    if (argCount) {
      doesNotExceedSafeInteger(len + argCount);
      var k = len;
      while (k--) {
        var to = k + argCount;
        if (k in O) O[to] = O[k];
        else deletePropertyOrThrow(O, to);
      }
      for (var j = 0; j < argCount; j++) {
        O[j] = arguments[j];
      }
    } return setArrayLength(O, len + argCount);
  }
});


/***/ }),

/***/ 7333:
/***/ ((__unused_webpack_module, __unused_webpack_exports, __webpack_require__) => {

"use strict";

var $ = __webpack_require__(6518);
var call = __webpack_require__(9565);
var aCallable = __webpack_require__(9306);
var anObject = __webpack_require__(8551);
var isObject = __webpack_require__(34);
var getIteratorDirect = __webpack_require__(1767);
var createAsyncIteratorProxy = __webpack_require__(2059);
var createIterResultObject = __webpack_require__(2529);
var closeAsyncIteration = __webpack_require__(772);
var IS_PURE = __webpack_require__(6395);

var AsyncIteratorProxy = createAsyncIteratorProxy(function (Promise) {
  var state = this;
  var iterator = state.iterator;
  var predicate = state.predicate;

  return new Promise(function (resolve, reject) {
    var doneAndReject = function (error) {
      state.done = true;
      reject(error);
    };

    var ifAbruptCloseAsyncIterator = function (error) {
      closeAsyncIteration(iterator, doneAndReject, error, doneAndReject);
    };

    var loop = function () {
      try {
        Promise.resolve(anObject(call(state.next, iterator))).then(function (step) {
          try {
            if (anObject(step).done) {
              state.done = true;
              resolve(createIterResultObject(undefined, true));
            } else {
              var value = step.value;
              try {
                var result = predicate(value, state.counter++);

                var handler = function (selected) {
                  selected ? resolve(createIterResultObject(value, false)) : loop();
                };

                if (isObject(result)) Promise.resolve(result).then(handler, ifAbruptCloseAsyncIterator);
                else handler(result);
              } catch (error3) { ifAbruptCloseAsyncIterator(error3); }
            }
          } catch (error2) { doneAndReject(error2); }
        }, doneAndReject);
      } catch (error) { doneAndReject(error); }
    };

    loop();
  });
});

// `AsyncIterator.prototype.filter` method
// https://github.com/tc39/proposal-async-iterator-helpers
$({ target: 'AsyncIterator', proto: true, real: true, forced: IS_PURE }, {
  filter: function filter(predicate) {
    anObject(this);
    aCallable(predicate);
    return new AsyncIteratorProxy(getIteratorDirect(this), {
      predicate: predicate
    });
  }
});


/***/ }),

/***/ 3064:
/***/ ((__unused_webpack_module, __unused_webpack_exports, __webpack_require__) => {

"use strict";

var $ = __webpack_require__(6518);
var $find = (__webpack_require__(6639).find);

// `AsyncIterator.prototype.find` method
// https://github.com/tc39/proposal-async-iterator-helpers
$({ target: 'AsyncIterator', proto: true, real: true }, {
  find: function find(predicate) {
    return $find(this, predicate);
  }
});


/***/ }),

/***/ 9920:
/***/ ((__unused_webpack_module, __unused_webpack_exports, __webpack_require__) => {

"use strict";

var $ = __webpack_require__(6518);
var $forEach = (__webpack_require__(6639).forEach);

// `AsyncIterator.prototype.forEach` method
// https://github.com/tc39/proposal-async-iterator-helpers
$({ target: 'AsyncIterator', proto: true, real: true }, {
  forEach: function forEach(fn) {
    return $forEach(this, fn);
  }
});


/***/ }),

/***/ 1393:
/***/ ((__unused_webpack_module, __unused_webpack_exports, __webpack_require__) => {

"use strict";

var $ = __webpack_require__(6518);
var map = __webpack_require__(1750);
var IS_PURE = __webpack_require__(6395);

// `AsyncIterator.prototype.map` method
// https://github.com/tc39/proposal-async-iterator-helpers
$({ target: 'AsyncIterator', proto: true, real: true, forced: IS_PURE }, {
  map: map
});



/***/ }),

/***/ 4905:
/***/ ((__unused_webpack_module, __unused_webpack_exports, __webpack_require__) => {

"use strict";

var $ = __webpack_require__(6518);
var call = __webpack_require__(9565);
var aCallable = __webpack_require__(9306);
var anObject = __webpack_require__(8551);
var isObject = __webpack_require__(34);
var getBuiltIn = __webpack_require__(7751);
var getIteratorDirect = __webpack_require__(1767);
var closeAsyncIteration = __webpack_require__(772);

var Promise = getBuiltIn('Promise');
var $TypeError = TypeError;

// `AsyncIterator.prototype.reduce` method
// https://github.com/tc39/proposal-async-iterator-helpers
$({ target: 'AsyncIterator', proto: true, real: true }, {
  reduce: function reduce(reducer /* , initialValue */) {
    anObject(this);
    aCallable(reducer);
    var record = getIteratorDirect(this);
    var iterator = record.iterator;
    var next = record.next;
    var noInitial = arguments.length < 2;
    var accumulator = noInitial ? undefined : arguments[1];
    var counter = 0;

    return new Promise(function (resolve, reject) {
      var ifAbruptCloseAsyncIterator = function (error) {
        closeAsyncIteration(iterator, reject, error, reject);
      };

      var loop = function () {
        try {
          Promise.resolve(anObject(call(next, iterator))).then(function (step) {
            try {
              if (anObject(step).done) {
                noInitial ? reject(new $TypeError('Reduce of empty iterator with no initial value')) : resolve(accumulator);
              } else {
                var value = step.value;
                if (noInitial) {
                  noInitial = false;
                  accumulator = value;
                  loop();
                } else try {
                  var result = reducer(accumulator, value, counter);

                  var handler = function ($result) {
                    accumulator = $result;
                    loop();
                  };

                  if (isObject(result)) Promise.resolve(result).then(handler, ifAbruptCloseAsyncIterator);
                  else handler(result);
                } catch (error3) { ifAbruptCloseAsyncIterator(error3); }
              }
              counter++;
            } catch (error2) { reject(error2); }
          }, reject);
        } catch (error) { reject(error); }
      };

      loop();
    });
  }
});


/***/ }),

/***/ 8992:
/***/ ((__unused_webpack_module, __unused_webpack_exports, __webpack_require__) => {

"use strict";

var $ = __webpack_require__(6518);
var globalThis = __webpack_require__(4576);
var anInstance = __webpack_require__(679);
var anObject = __webpack_require__(8551);
var isCallable = __webpack_require__(4901);
var getPrototypeOf = __webpack_require__(2787);
var defineBuiltInAccessor = __webpack_require__(2106);
var createProperty = __webpack_require__(4659);
var fails = __webpack_require__(9039);
var hasOwn = __webpack_require__(9297);
var wellKnownSymbol = __webpack_require__(8227);
var IteratorPrototype = (__webpack_require__(7657).IteratorPrototype);
var DESCRIPTORS = __webpack_require__(3724);
var IS_PURE = __webpack_require__(6395);

var CONSTRUCTOR = 'constructor';
var ITERATOR = 'Iterator';
var TO_STRING_TAG = wellKnownSymbol('toStringTag');

var $TypeError = TypeError;
var NativeIterator = globalThis[ITERATOR];

// FF56- have non-standard global helper `Iterator`
var FORCED = IS_PURE
  || !isCallable(NativeIterator)
  || NativeIterator.prototype !== IteratorPrototype
  // FF44- non-standard `Iterator` passes previous tests
  || !fails(function () { NativeIterator({}); });

var IteratorConstructor = function Iterator() {
  anInstance(this, IteratorPrototype);
  if (getPrototypeOf(this) === IteratorPrototype) throw new $TypeError('Abstract class Iterator not directly constructable');
};

var defineIteratorPrototypeAccessor = function (key, value) {
  if (DESCRIPTORS) {
    defineBuiltInAccessor(IteratorPrototype, key, {
      configurable: true,
      get: function () {
        return value;
      },
      set: function (replacement) {
        anObject(this);
        if (this === IteratorPrototype) throw new $TypeError("You can't redefine this property");
        if (hasOwn(this, key)) this[key] = replacement;
        else createProperty(this, key, replacement);
      }
    });
  } else IteratorPrototype[key] = value;
};

if (!hasOwn(IteratorPrototype, TO_STRING_TAG)) defineIteratorPrototypeAccessor(TO_STRING_TAG, ITERATOR);

if (FORCED || !hasOwn(IteratorPrototype, CONSTRUCTOR) || IteratorPrototype[CONSTRUCTOR] === Object) {
  defineIteratorPrototypeAccessor(CONSTRUCTOR, IteratorConstructor);
}

IteratorConstructor.prototype = IteratorPrototype;

// `Iterator` constructor
// https://github.com/tc39/proposal-iterator-helpers
$({ global: true, constructor: true, forced: FORCED }, {
  Iterator: IteratorConstructor
});


/***/ }),

/***/ 4520:
/***/ ((__unused_webpack_module, __unused_webpack_exports, __webpack_require__) => {

"use strict";

var $ = __webpack_require__(6518);
var call = __webpack_require__(9565);
var aCallable = __webpack_require__(9306);
var anObject = __webpack_require__(8551);
var getIteratorDirect = __webpack_require__(1767);
var createIteratorProxy = __webpack_require__(9462);
var callWithSafeIterationClosing = __webpack_require__(6319);
var IS_PURE = __webpack_require__(6395);

var IteratorProxy = createIteratorProxy(function () {
  var iterator = this.iterator;
  var predicate = this.predicate;
  var next = this.next;
  var result, done, value;
  while (true) {
    result = anObject(call(next, iterator));
    done = this.done = !!result.done;
    if (done) return;
    value = result.value;
    if (callWithSafeIterationClosing(iterator, predicate, [value, this.counter++], true)) return value;
  }
});

// `Iterator.prototype.filter` method
// https://github.com/tc39/proposal-iterator-helpers
$({ target: 'Iterator', proto: true, real: true, forced: IS_PURE }, {
  filter: function filter(predicate) {
    anObject(this);
    aCallable(predicate);
    return new IteratorProxy(getIteratorDirect(this), {
      predicate: predicate
    });
  }
});


/***/ }),

/***/ 2577:
/***/ ((__unused_webpack_module, __unused_webpack_exports, __webpack_require__) => {

"use strict";

var $ = __webpack_require__(6518);
var iterate = __webpack_require__(2652);
var aCallable = __webpack_require__(9306);
var anObject = __webpack_require__(8551);
var getIteratorDirect = __webpack_require__(1767);

// `Iterator.prototype.find` method
// https://github.com/tc39/proposal-iterator-helpers
$({ target: 'Iterator', proto: true, real: true }, {
  find: function find(predicate) {
    anObject(this);
    aCallable(predicate);
    var record = getIteratorDirect(this);
    var counter = 0;
    return iterate(record, function (value, stop) {
      if (predicate(value, counter++)) return stop(value);
    }, { IS_RECORD: true, INTERRUPTED: true }).result;
  }
});


/***/ }),

/***/ 3949:
/***/ ((__unused_webpack_module, __unused_webpack_exports, __webpack_require__) => {

"use strict";

var $ = __webpack_require__(6518);
var iterate = __webpack_require__(2652);
var aCallable = __webpack_require__(9306);
var anObject = __webpack_require__(8551);
var getIteratorDirect = __webpack_require__(1767);

// `Iterator.prototype.forEach` method
// https://github.com/tc39/proposal-iterator-helpers
$({ target: 'Iterator', proto: true, real: true }, {
  forEach: function forEach(fn) {
    anObject(this);
    aCallable(fn);
    var record = getIteratorDirect(this);
    var counter = 0;
    iterate(record, function (value) {
      fn(value, counter++);
    }, { IS_RECORD: true });
  }
});


/***/ }),

/***/ 1454:
/***/ ((__unused_webpack_module, __unused_webpack_exports, __webpack_require__) => {

"use strict";

var $ = __webpack_require__(6518);
var map = __webpack_require__(713);
var IS_PURE = __webpack_require__(6395);

// `Iterator.prototype.map` method
// https://github.com/tc39/proposal-iterator-helpers
$({ target: 'Iterator', proto: true, real: true, forced: IS_PURE }, {
  map: map
});


/***/ }),

/***/ 8872:
/***/ ((__unused_webpack_module, __unused_webpack_exports, __webpack_require__) => {

"use strict";

var $ = __webpack_require__(6518);
var iterate = __webpack_require__(2652);
var aCallable = __webpack_require__(9306);
var anObject = __webpack_require__(8551);
var getIteratorDirect = __webpack_require__(1767);

var $TypeError = TypeError;

// `Iterator.prototype.reduce` method
// https://github.com/tc39/proposal-iterator-helpers
$({ target: 'Iterator', proto: true, real: true }, {
  reduce: function reduce(reducer /* , initialValue */) {
    anObject(this);
    aCallable(reducer);
    var record = getIteratorDirect(this);
    var noInitial = arguments.length < 2;
    var accumulator = noInitial ? undefined : arguments[1];
    var counter = 0;
    iterate(record, function (value) {
      if (noInitial) {
        noInitial = false;
        accumulator = value;
      } else {
        accumulator = reducer(accumulator, value, counter);
      }
      counter++;
    }, { IS_RECORD: true });
    if (noInitial) throw new $TypeError('Reduce of empty iterator with no initial value');
    return accumulator;
  }
});


/***/ }),

/***/ 8335:
/***/ ((__unused_webpack_module, __unused_webpack_exports, __webpack_require__) => {

"use strict";

var $ = __webpack_require__(6518);
var DESCRIPTORS = __webpack_require__(3724);
var globalThis = __webpack_require__(4576);
var getBuiltIn = __webpack_require__(7751);
var uncurryThis = __webpack_require__(9504);
var call = __webpack_require__(9565);
var isCallable = __webpack_require__(4901);
var isObject = __webpack_require__(34);
var isArray = __webpack_require__(4376);
var hasOwn = __webpack_require__(9297);
var toString = __webpack_require__(655);
var lengthOfArrayLike = __webpack_require__(6198);
var createProperty = __webpack_require__(4659);
var fails = __webpack_require__(9039);
var parseJSONString = __webpack_require__(8235);
var NATIVE_SYMBOL = __webpack_require__(4495);

var JSON = globalThis.JSON;
var Number = globalThis.Number;
var SyntaxError = globalThis.SyntaxError;
var nativeParse = JSON && JSON.parse;
var enumerableOwnProperties = getBuiltIn('Object', 'keys');
// eslint-disable-next-line es/no-object-getownpropertydescriptor -- safe
var getOwnPropertyDescriptor = Object.getOwnPropertyDescriptor;
var at = uncurryThis(''.charAt);
var slice = uncurryThis(''.slice);
var exec = uncurryThis(/./.exec);
var push = uncurryThis([].push);

var IS_DIGIT = /^\d$/;
var IS_NON_ZERO_DIGIT = /^[1-9]$/;
var IS_NUMBER_START = /^[\d-]$/;
var IS_WHITESPACE = /^[\t\n\r ]$/;

var PRIMITIVE = 0;
var OBJECT = 1;

var $parse = function (source, reviver) {
  source = toString(source);
  var context = new Context(source, 0, '');
  var root = context.parse();
  var value = root.value;
  var endIndex = context.skip(IS_WHITESPACE, root.end);
  if (endIndex < source.length) {
    throw new SyntaxError('Unexpected extra character: "' + at(source, endIndex) + '" after the parsed data at: ' + endIndex);
  }
  return isCallable(reviver) ? internalize({ '': value }, '', reviver, root) : value;
};

var internalize = function (holder, name, reviver, node) {
  var val = holder[name];
  var unmodified = node && val === node.value;
  var context = unmodified && typeof node.source == 'string' ? { source: node.source } : {};
  var elementRecordsLen, keys, len, i, P;
  if (isObject(val)) {
    var nodeIsArray = isArray(val);
    var nodes = unmodified ? node.nodes : nodeIsArray ? [] : {};
    if (nodeIsArray) {
      elementRecordsLen = nodes.length;
      len = lengthOfArrayLike(val);
      for (i = 0; i < len; i++) {
        internalizeProperty(val, i, internalize(val, '' + i, reviver, i < elementRecordsLen ? nodes[i] : undefined));
      }
    } else {
      keys = enumerableOwnProperties(val);
      len = lengthOfArrayLike(keys);
      for (i = 0; i < len; i++) {
        P = keys[i];
        internalizeProperty(val, P, internalize(val, P, reviver, hasOwn(nodes, P) ? nodes[P] : undefined));
      }
    }
  }
  return call(reviver, holder, name, val, context);
};

var internalizeProperty = function (object, key, value) {
  if (DESCRIPTORS) {
    var descriptor = getOwnPropertyDescriptor(object, key);
    if (descriptor && !descriptor.configurable) return;
  }
  if (value === undefined) delete object[key];
  else createProperty(object, key, value);
};

var Node = function (value, end, source, nodes) {
  this.value = value;
  this.end = end;
  this.source = source;
  this.nodes = nodes;
};

var Context = function (source, index) {
  this.source = source;
  this.index = index;
};

// https://www.json.org/json-en.html
Context.prototype = {
  fork: function (nextIndex) {
    return new Context(this.source, nextIndex);
  },
  parse: function () {
    var source = this.source;
    var i = this.skip(IS_WHITESPACE, this.index);
    var fork = this.fork(i);
    var chr = at(source, i);
    if (exec(IS_NUMBER_START, chr)) return fork.number();
    switch (chr) {
      case '{':
        return fork.object();
      case '[':
        return fork.array();
      case '"':
        return fork.string();
      case 't':
        return fork.keyword(true);
      case 'f':
        return fork.keyword(false);
      case 'n':
        return fork.keyword(null);
    } throw new SyntaxError('Unexpected character: "' + chr + '" at: ' + i);
  },
  node: function (type, value, start, end, nodes) {
    return new Node(value, end, type ? null : slice(this.source, start, end), nodes);
  },
  object: function () {
    var source = this.source;
    var i = this.index + 1;
    var expectKeypair = false;
    var object = {};
    var nodes = {};
    while (i < source.length) {
      i = this.until(['"', '}'], i);
      if (at(source, i) === '}' && !expectKeypair) {
        i++;
        break;
      }
      // Parsing the key
      var result = this.fork(i).string();
      var key = result.value;
      i = result.end;
      i = this.until([':'], i) + 1;
      // Parsing value
      i = this.skip(IS_WHITESPACE, i);
      result = this.fork(i).parse();
      createProperty(nodes, key, result);
      createProperty(object, key, result.value);
      i = this.until([',', '}'], result.end);
      var chr = at(source, i);
      if (chr === ',') {
        expectKeypair = true;
        i++;
      } else if (chr === '}') {
        i++;
        break;
      }
    }
    return this.node(OBJECT, object, this.index, i, nodes);
  },
  array: function () {
    var source = this.source;
    var i = this.index + 1;
    var expectElement = false;
    var array = [];
    var nodes = [];
    while (i < source.length) {
      i = this.skip(IS_WHITESPACE, i);
      if (at(source, i) === ']' && !expectElement) {
        i++;
        break;
      }
      var result = this.fork(i).parse();
      push(nodes, result);
      push(array, result.value);
      i = this.until([',', ']'], result.end);
      if (at(source, i) === ',') {
        expectElement = true;
        i++;
      } else if (at(source, i) === ']') {
        i++;
        break;
      }
    }
    return this.node(OBJECT, array, this.index, i, nodes);
  },
  string: function () {
    var index = this.index;
    var parsed = parseJSONString(this.source, this.index + 1);
    return this.node(PRIMITIVE, parsed.value, index, parsed.end);
  },
  number: function () {
    var source = this.source;
    var startIndex = this.index;
    var i = startIndex;
    if (at(source, i) === '-') i++;
    if (at(source, i) === '0') i++;
    else if (exec(IS_NON_ZERO_DIGIT, at(source, i))) i = this.skip(IS_DIGIT, i + 1);
    else throw new SyntaxError('Failed to parse number at: ' + i);
    if (at(source, i) === '.') i = this.skip(IS_DIGIT, i + 1);
    if (at(source, i) === 'e' || at(source, i) === 'E') {
      i++;
      if (at(source, i) === '+' || at(source, i) === '-') i++;
      var exponentStartIndex = i;
      i = this.skip(IS_DIGIT, i);
      if (exponentStartIndex === i) throw new SyntaxError("Failed to parse number's exponent value at: " + i);
    }
    return this.node(PRIMITIVE, Number(slice(source, startIndex, i)), startIndex, i);
  },
  keyword: function (value) {
    var keyword = '' + value;
    var index = this.index;
    var endIndex = index + keyword.length;
    if (slice(this.source, index, endIndex) !== keyword) throw new SyntaxError('Failed to parse value at: ' + index);
    return this.node(PRIMITIVE, value, index, endIndex);
  },
  skip: function (regex, i) {
    var source = this.source;
    for (; i < source.length; i++) if (!exec(regex, at(source, i))) break;
    return i;
  },
  until: function (array, i) {
    i = this.skip(IS_WHITESPACE, i);
    var chr = at(this.source, i);
    for (var j = 0; j < array.length; j++) if (array[j] === chr) return i;
    throw new SyntaxError('Unexpected character: "' + chr + '" at: ' + i);
  }
};

var NO_SOURCE_SUPPORT = fails(function () {
  var unsafeInt = '9007199254740993';
  var source;
  nativeParse(unsafeInt, function (key, value, context) {
    source = context.source;
  });
  return source !== unsafeInt;
});

var PROPER_BASE_PARSE = NATIVE_SYMBOL && !fails(function () {
  // Safari 9 bug
  return 1 / nativeParse('-0 \t') !== -Infinity;
});

// `JSON.parse` method
// https://tc39.es/ecma262/#sec-json.parse
// https://github.com/tc39/proposal-json-parse-with-source
$({ target: 'JSON', stat: true, forced: NO_SOURCE_SUPPORT }, {
  parse: function parse(text, reviver) {
    return PROPER_BASE_PARSE && !isCallable(reviver) ? nativeParse(text) : $parse(text, reviver);
  }
});


/***/ }),

/***/ 1517:
/***/ ((__unused_webpack_module, __unused_webpack_exports, __webpack_require__) => {

"use strict";

var $ = __webpack_require__(6518);
var aMap = __webpack_require__(6194);
var remove = (__webpack_require__(2248).remove);

// `Map.prototype.deleteAll` method
// https://github.com/tc39/proposal-collection-methods
$({ target: 'Map', proto: true, real: true, forced: true }, {
  deleteAll: function deleteAll(/* ...elements */) {
    var collection = aMap(this);
    var allDeleted = true;
    var wasDeleted;
    for (var k = 0, len = arguments.length; k < len; k++) {
      wasDeleted = remove(collection, arguments[k]);
      allDeleted = allDeleted && wasDeleted;
    } return !!allDeleted;
  }
});


/***/ }),

/***/ 1379:
/***/ ((__unused_webpack_module, __unused_webpack_exports, __webpack_require__) => {

"use strict";

var $ = __webpack_require__(6518);
var aMap = __webpack_require__(6194);
var MapHelpers = __webpack_require__(2248);

var get = MapHelpers.get;
var has = MapHelpers.has;
var set = MapHelpers.set;

// `Map.prototype.emplace` method
// https://github.com/tc39/proposal-upsert
$({ target: 'Map', proto: true, real: true, forced: true }, {
  emplace: function emplace(key, handler) {
    var map = aMap(this);
    var value, inserted;
    if (has(map, key)) {
      value = get(map, key);
      if ('update' in handler) {
        value = handler.update(value, key, map);
        set(map, key, value);
      } return value;
    }
    inserted = handler.insert(key, map);
    set(map, key, inserted);
    return inserted;
  }
});


/***/ }),

/***/ 3777:
/***/ ((__unused_webpack_module, __unused_webpack_exports, __webpack_require__) => {

"use strict";

var $ = __webpack_require__(6518);
var bind = __webpack_require__(6080);
var aMap = __webpack_require__(6194);
var iterate = __webpack_require__(6223);

// `Map.prototype.every` method
// https://github.com/tc39/proposal-collection-methods
$({ target: 'Map', proto: true, real: true, forced: true }, {
  every: function every(callbackfn /* , thisArg */) {
    var map = aMap(this);
    var boundFunction = bind(callbackfn, arguments.length > 1 ? arguments[1] : undefined);
    return iterate(map, function (value, key) {
      if (!boundFunction(value, key, map)) return false;
    }, true) !== false;
  }
});


/***/ }),

/***/ 4190:
/***/ ((__unused_webpack_module, __unused_webpack_exports, __webpack_require__) => {

"use strict";

var $ = __webpack_require__(6518);
var bind = __webpack_require__(6080);
var aMap = __webpack_require__(6194);
var MapHelpers = __webpack_require__(2248);
var iterate = __webpack_require__(6223);

var Map = MapHelpers.Map;
var set = MapHelpers.set;

// `Map.prototype.filter` method
// https://github.com/tc39/proposal-collection-methods
$({ target: 'Map', proto: true, real: true, forced: true }, {
  filter: function filter(callbackfn /* , thisArg */) {
    var map = aMap(this);
    var boundFunction = bind(callbackfn, arguments.length > 1 ? arguments[1] : undefined);
    var newMap = new Map();
    iterate(map, function (value, key) {
      if (boundFunction(value, key, map)) set(newMap, key, value);
    });
    return newMap;
  }
});


/***/ }),

/***/ 6097:
/***/ ((__unused_webpack_module, __unused_webpack_exports, __webpack_require__) => {

"use strict";

var $ = __webpack_require__(6518);
var bind = __webpack_require__(6080);
var aMap = __webpack_require__(6194);
var iterate = __webpack_require__(6223);

// `Map.prototype.findKey` method
// https://github.com/tc39/proposal-collection-methods
$({ target: 'Map', proto: true, real: true, forced: true }, {
  findKey: function findKey(callbackfn /* , thisArg */) {
    var map = aMap(this);
    var boundFunction = bind(callbackfn, arguments.length > 1 ? arguments[1] : undefined);
    var result = iterate(map, function (value, key) {
      if (boundFunction(value, key, map)) return { key: key };
    }, true);
    return result && result.key;
  }
});


/***/ }),

/***/ 2359:
/***/ ((__unused_webpack_module, __unused_webpack_exports, __webpack_require__) => {

"use strict";

var $ = __webpack_require__(6518);
var bind = __webpack_require__(6080);
var aMap = __webpack_require__(6194);
var iterate = __webpack_require__(6223);

// `Map.prototype.find` method
// https://github.com/tc39/proposal-collection-methods
$({ target: 'Map', proto: true, real: true, forced: true }, {
  find: function find(callbackfn /* , thisArg */) {
    var map = aMap(this);
    var boundFunction = bind(callbackfn, arguments.length > 1 ? arguments[1] : undefined);
    var result = iterate(map, function (value, key) {
      if (boundFunction(value, key, map)) return { value: value };
    }, true);
    return result && result.value;
  }
});


/***/ }),

/***/ 7273:
/***/ ((__unused_webpack_module, __unused_webpack_exports, __webpack_require__) => {

"use strict";

var $ = __webpack_require__(6518);
var sameValueZero = __webpack_require__(3317);
var aMap = __webpack_require__(6194);
var iterate = __webpack_require__(6223);

// `Map.prototype.includes` method
// https://github.com/tc39/proposal-collection-methods
$({ target: 'Map', proto: true, real: true, forced: true }, {
  includes: function includes(searchElement) {
    return iterate(aMap(this), function (value) {
      if (sameValueZero(value, searchElement)) return true;
    }, true) === true;
  }
});


/***/ }),

/***/ 7415:
/***/ ((__unused_webpack_module, __unused_webpack_exports, __webpack_require__) => {

"use strict";

var $ = __webpack_require__(6518);
var aMap = __webpack_require__(6194);
var iterate = __webpack_require__(6223);

// `Map.prototype.keyOf` method
// https://github.com/tc39/proposal-collection-methods
$({ target: 'Map', proto: true, real: true, forced: true }, {
  keyOf: function keyOf(searchElement) {
    var result = iterate(aMap(this), function (value, key) {
      if (value === searchElement) return { key: key };
    }, true);
    return result && result.key;
  }
});


/***/ }),

/***/ 9929:
/***/ ((__unused_webpack_module, __unused_webpack_exports, __webpack_require__) => {

"use strict";

var $ = __webpack_require__(6518);
var bind = __webpack_require__(6080);
var aMap = __webpack_require__(6194);
var MapHelpers = __webpack_require__(2248);
var iterate = __webpack_require__(6223);

var Map = MapHelpers.Map;
var set = MapHelpers.set;

// `Map.prototype.mapKeys` method
// https://github.com/tc39/proposal-collection-methods
$({ target: 'Map', proto: true, real: true, forced: true }, {
  mapKeys: function mapKeys(callbackfn /* , thisArg */) {
    var map = aMap(this);
    var boundFunction = bind(callbackfn, arguments.length > 1 ? arguments[1] : undefined);
    var newMap = new Map();
    iterate(map, function (value, key) {
      set(newMap, boundFunction(value, key, map), value);
    });
    return newMap;
  }
});


/***/ }),

/***/ 7583:
/***/ ((__unused_webpack_module, __unused_webpack_exports, __webpack_require__) => {

"use strict";

var $ = __webpack_require__(6518);
var bind = __webpack_require__(6080);
var aMap = __webpack_require__(6194);
var MapHelpers = __webpack_require__(2248);
var iterate = __webpack_require__(6223);

var Map = MapHelpers.Map;
var set = MapHelpers.set;

// `Map.prototype.mapValues` method
// https://github.com/tc39/proposal-collection-methods
$({ target: 'Map', proto: true, real: true, forced: true }, {
  mapValues: function mapValues(callbackfn /* , thisArg */) {
    var map = aMap(this);
    var boundFunction = bind(callbackfn, arguments.length > 1 ? arguments[1] : undefined);
    var newMap = new Map();
    iterate(map, function (value, key) {
      set(newMap, key, boundFunction(value, key, map));
    });
    return newMap;
  }
});


/***/ }),

/***/ 5122:
/***/ ((__unused_webpack_module, __unused_webpack_exports, __webpack_require__) => {

"use strict";

var $ = __webpack_require__(6518);
var aMap = __webpack_require__(6194);
var iterate = __webpack_require__(2652);
var set = (__webpack_require__(2248).set);

// `Map.prototype.merge` method
// https://github.com/tc39/proposal-collection-methods
$({ target: 'Map', proto: true, real: true, arity: 1, forced: true }, {
  // eslint-disable-next-line no-unused-vars -- required for `.length`
  merge: function merge(iterable /* ...iterables */) {
    var map = aMap(this);
    var argumentsLength = arguments.length;
    var i = 0;
    while (i < argumentsLength) {
      iterate(arguments[i++], function (key, value) {
        set(map, key, value);
      }, { AS_ENTRIES: true });
    }
    return map;
  }
});


/***/ }),

/***/ 230:
/***/ ((__unused_webpack_module, __unused_webpack_exports, __webpack_require__) => {

"use strict";

var $ = __webpack_require__(6518);
var aCallable = __webpack_require__(9306);
var aMap = __webpack_require__(6194);
var iterate = __webpack_require__(6223);

var $TypeError = TypeError;

// `Map.prototype.reduce` method
// https://github.com/tc39/proposal-collection-methods
$({ target: 'Map', proto: true, real: true, forced: true }, {
  reduce: function reduce(callbackfn /* , initialValue */) {
    var map = aMap(this);
    var noInitial = arguments.length < 2;
    var accumulator = noInitial ? undefined : arguments[1];
    aCallable(callbackfn);
    iterate(map, function (value, key) {
      if (noInitial) {
        noInitial = false;
        accumulator = value;
      } else {
        accumulator = callbackfn(accumulator, value, key, map);
      }
    });
    if (noInitial) throw new $TypeError('Reduce of empty map with no initial value');
    return accumulator;
  }
});


/***/ }),

/***/ 7268:
/***/ ((__unused_webpack_module, __unused_webpack_exports, __webpack_require__) => {

"use strict";

var $ = __webpack_require__(6518);
var bind = __webpack_require__(6080);
var aMap = __webpack_require__(6194);
var iterate = __webpack_require__(6223);

// `Map.prototype.some` method
// https://github.com/tc39/proposal-collection-methods
$({ target: 'Map', proto: true, real: true, forced: true }, {
  some: function some(callbackfn /* , thisArg */) {
    var map = aMap(this);
    var boundFunction = bind(callbackfn, arguments.length > 1 ? arguments[1] : undefined);
    return iterate(map, function (value, key) {
      if (boundFunction(value, key, map)) return true;
    }, true) === true;
  }
});


/***/ }),

/***/ 9733:
/***/ ((__unused_webpack_module, __unused_webpack_exports, __webpack_require__) => {

"use strict";

var $ = __webpack_require__(6518);
var aCallable = __webpack_require__(9306);
var aMap = __webpack_require__(6194);
var MapHelpers = __webpack_require__(2248);

var $TypeError = TypeError;
var get = MapHelpers.get;
var has = MapHelpers.has;
var set = MapHelpers.set;

// `Map.prototype.update` method
// https://github.com/tc39/proposal-collection-methods
$({ target: 'Map', proto: true, real: true, forced: true }, {
  update: function update(key, callback /* , thunk */) {
    var map = aMap(this);
    var length = arguments.length;
    aCallable(callback);
    var isPresentInMap = has(map, key);
    if (!isPresentInMap && length < 3) {
      throw new $TypeError('Updating absent value');
    }
    var value = isPresentInMap ? get(map, key) : aCallable(length > 2 ? arguments[2] : undefined)(key, map);
    set(map, key, callback(value, key, map));
    return map;
  }
});


/***/ }),

/***/ 4979:
/***/ ((__unused_webpack_module, __unused_webpack_exports, __webpack_require__) => {

"use strict";

var $ = __webpack_require__(6518);
var globalThis = __webpack_require__(4576);
var getBuiltIn = __webpack_require__(7751);
var createPropertyDescriptor = __webpack_require__(6980);
var defineProperty = (__webpack_require__(4913).f);
var hasOwn = __webpack_require__(9297);
var anInstance = __webpack_require__(679);
var inheritIfRequired = __webpack_require__(3167);
var normalizeStringArgument = __webpack_require__(2603);
var DOMExceptionConstants = __webpack_require__(5002);
var clearErrorStack = __webpack_require__(8574);
var DESCRIPTORS = __webpack_require__(3724);
var IS_PURE = __webpack_require__(6395);

var DOM_EXCEPTION = 'DOMException';
var Error = getBuiltIn('Error');
var NativeDOMException = getBuiltIn(DOM_EXCEPTION);

var $DOMException = function DOMException() {
  anInstance(this, DOMExceptionPrototype);
  var argumentsLength = arguments.length;
  var message = normalizeStringArgument(argumentsLength < 1 ? undefined : arguments[0]);
  var name = normalizeStringArgument(argumentsLength < 2 ? undefined : arguments[1], 'Error');
  var that = new NativeDOMException(message, name);
  var error = new Error(message);
  error.name = DOM_EXCEPTION;
  defineProperty(that, 'stack', createPropertyDescriptor(1, clearErrorStack(error.stack, 1)));
  inheritIfRequired(that, this, $DOMException);
  return that;
};

var DOMExceptionPrototype = $DOMException.prototype = NativeDOMException.prototype;

var ERROR_HAS_STACK = 'stack' in new Error(DOM_EXCEPTION);
var DOM_EXCEPTION_HAS_STACK = 'stack' in new NativeDOMException(1, 2);

// eslint-disable-next-line es/no-object-getownpropertydescriptor -- safe
var descriptor = NativeDOMException && DESCRIPTORS && Object.getOwnPropertyDescriptor(globalThis, DOM_EXCEPTION);

// Bun ~ 0.1.1 DOMException have incorrect descriptor and we can't redefine it
// https://github.com/Jarred-Sumner/bun/issues/399
var BUGGY_DESCRIPTOR = !!descriptor && !(descriptor.writable && descriptor.configurable);

var FORCED_CONSTRUCTOR = ERROR_HAS_STACK && !BUGGY_DESCRIPTOR && !DOM_EXCEPTION_HAS_STACK;

// `DOMException` constructor patch for `.stack` where it's required
// https://webidl.spec.whatwg.org/#es-DOMException-specialness
$({ global: true, constructor: true, forced: IS_PURE || FORCED_CONSTRUCTOR }, { // TODO: fix export logic
  DOMException: FORCED_CONSTRUCTOR ? $DOMException : NativeDOMException
});

var PolyfilledDOMException = getBuiltIn(DOM_EXCEPTION);
var PolyfilledDOMExceptionPrototype = PolyfilledDOMException.prototype;

if (PolyfilledDOMExceptionPrototype.constructor !== PolyfilledDOMException) {
  if (!IS_PURE) {
    defineProperty(PolyfilledDOMExceptionPrototype, 'constructor', createPropertyDescriptor(1, PolyfilledDOMException));
  }

  for (var key in DOMExceptionConstants) if (hasOwn(DOMExceptionConstants, key)) {
    var constant = DOMExceptionConstants[key];
    var constantName = constant.s;
    if (!hasOwn(PolyfilledDOMException, constantName)) {
      defineProperty(PolyfilledDOMException, constantName, createPropertyDescriptor(6, constant.c));
    }
  }
}


/***/ }),

/***/ 4603:
/***/ ((__unused_webpack_module, __unused_webpack_exports, __webpack_require__) => {

"use strict";

var defineBuiltIn = __webpack_require__(6840);
var uncurryThis = __webpack_require__(9504);
var toString = __webpack_require__(655);
var validateArgumentsLength = __webpack_require__(2812);

var $URLSearchParams = URLSearchParams;
var URLSearchParamsPrototype = $URLSearchParams.prototype;
var append = uncurryThis(URLSearchParamsPrototype.append);
var $delete = uncurryThis(URLSearchParamsPrototype['delete']);
var forEach = uncurryThis(URLSearchParamsPrototype.forEach);
var push = uncurryThis([].push);
var params = new $URLSearchParams('a=1&a=2&b=3');

params['delete']('a', 1);
// `undefined` case is a Chromium 117 bug
// https://bugs.chromium.org/p/v8/issues/detail?id=14222
params['delete']('b', undefined);

if (params + '' !== 'a=2') {
  defineBuiltIn(URLSearchParamsPrototype, 'delete', function (name /* , value */) {
    var length = arguments.length;
    var $value = length < 2 ? undefined : arguments[1];
    if (length && $value === undefined) return $delete(this, name);
    var entries = [];
    forEach(this, function (v, k) { // also validates `this`
      push(entries, { key: k, value: v });
    });
    validateArgumentsLength(length, 1);
    var key = toString(name);
    var value = toString($value);
    var index = 0;
    var dindex = 0;
    var found = false;
    var entriesLength = entries.length;
    var entry;
    while (index < entriesLength) {
      entry = entries[index++];
      if (found || entry.key === key) {
        found = true;
        $delete(this, entry.key);
      } else dindex++;
    }
    while (dindex < entriesLength) {
      entry = entries[dindex++];
      if (!(entry.key === key && entry.value === value)) append(this, entry.key, entry.value);
    }
  }, { enumerable: true, unsafe: true });
}


/***/ }),

/***/ 7566:
/***/ ((__unused_webpack_module, __unused_webpack_exports, __webpack_require__) => {

"use strict";

var defineBuiltIn = __webpack_require__(6840);
var uncurryThis = __webpack_require__(9504);
var toString = __webpack_require__(655);
var validateArgumentsLength = __webpack_require__(2812);

var $URLSearchParams = URLSearchParams;
var URLSearchParamsPrototype = $URLSearchParams.prototype;
var getAll = uncurryThis(URLSearchParamsPrototype.getAll);
var $has = uncurryThis(URLSearchParamsPrototype.has);
var params = new $URLSearchParams('a=1');

// `undefined` case is a Chromium 117 bug
// https://bugs.chromium.org/p/v8/issues/detail?id=14222
if (params.has('a', 2) || !params.has('a', undefined)) {
  defineBuiltIn(URLSearchParamsPrototype, 'has', function has(name /* , value */) {
    var length = arguments.length;
    var $value = length < 2 ? undefined : arguments[1];
    if (length && $value === undefined) return $has(this, name);
    var values = getAll(this, name); // also validates `this`
    validateArgumentsLength(length, 1);
    var value = toString($value);
    var index = 0;
    while (index < values.length) {
      if (values[index++] === value) return true;
    } return false;
  }, { enumerable: true, unsafe: true });
}


/***/ }),

/***/ 8721:
/***/ ((__unused_webpack_module, __unused_webpack_exports, __webpack_require__) => {

"use strict";

var DESCRIPTORS = __webpack_require__(3724);
var uncurryThis = __webpack_require__(9504);
var defineBuiltInAccessor = __webpack_require__(2106);

var URLSearchParamsPrototype = URLSearchParams.prototype;
var forEach = uncurryThis(URLSearchParamsPrototype.forEach);

// `URLSearchParams.prototype.size` getter
// https://github.com/whatwg/url/pull/734
if (DESCRIPTORS && !('size' in URLSearchParamsPrototype)) {
  defineBuiltInAccessor(URLSearchParamsPrototype, 'size', {
    get: function size() {
      var count = 0;
      forEach(this, function () { count++; });
      return count;
    },
    configurable: true,
    enumerable: true
  });
}


/***/ })

/******/ 	});
/************************************************************************/
/******/ 	// The module cache
/******/ 	var __webpack_module_cache__ = {};
/******/ 	
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/ 		// Check if module is in cache
/******/ 		var cachedModule = __webpack_module_cache__[moduleId];
/******/ 		if (cachedModule !== undefined) {
/******/ 			return cachedModule.exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = __webpack_module_cache__[moduleId] = {
/******/ 			// no module.id needed
/******/ 			// no module.loaded needed
/******/ 			exports: {}
/******/ 		};
/******/ 	
/******/ 		// Execute the module function
/******/ 		__webpack_modules__[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/ 	
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/ 	
/************************************************************************/
/******/ 	/* webpack/runtime/compat get default export */
/******/ 	(() => {
/******/ 		// getDefaultExport function for compatibility with non-harmony modules
/******/ 		__webpack_require__.n = (module) => {
/******/ 			var getter = module && module.__esModule ?
/******/ 				() => (module['default']) :
/******/ 				() => (module);
/******/ 			__webpack_require__.d(getter, { a: getter });
/******/ 			return getter;
/******/ 		};
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/define property getters */
/******/ 	(() => {
/******/ 		// define getter functions for harmony exports
/******/ 		__webpack_require__.d = (exports, definition) => {
/******/ 			for(var key in definition) {
/******/ 				if(__webpack_require__.o(definition, key) && !__webpack_require__.o(exports, key)) {
/******/ 					Object.defineProperty(exports, key, { enumerable: true, get: definition[key] });
/******/ 				}
/******/ 			}
/******/ 		};
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/global */
/******/ 	(() => {
/******/ 		__webpack_require__.g = (function() {
/******/ 			if (typeof globalThis === 'object') return globalThis;
/******/ 			try {
/******/ 				return this || new Function('return this')();
/******/ 			} catch (e) {
/******/ 				if (typeof window === 'object') return window;
/******/ 			}
/******/ 		})();
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/hasOwnProperty shorthand */
/******/ 	(() => {
/******/ 		__webpack_require__.o = (obj, prop) => (Object.prototype.hasOwnProperty.call(obj, prop))
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/make namespace object */
/******/ 	(() => {
/******/ 		// define __esModule on exports
/******/ 		__webpack_require__.r = (exports) => {
/******/ 			if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 				Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 			}
/******/ 			Object.defineProperty(exports, '__esModule', { value: true });
/******/ 		};
/******/ 	})();
/******/ 	
/************************************************************************/
var __webpack_exports__ = {};
// This entry need to be wrapped in an IIFE because it need to be in strict mode.
(() => {
"use strict";

// EXPORTS
__webpack_require__.d(__webpack_exports__, {
  "default": () => (/* binding */ epub)
});

// NAMESPACE OBJECT: ./src/utils/core.js
var core_namespaceObject = {};
__webpack_require__.r(core_namespaceObject);
__webpack_require__.d(core_namespaceObject, {
  blob2base64: () => (blob2base64),
  borders: () => (borders),
  bounds: () => (bounds),
  createBase64Url: () => (createBase64Url),
  createBlob: () => (createBlob),
  createBlobUrl: () => (createBlobUrl),
  defaults: () => (defaults),
  documentHeight: () => (documentHeight),
  extend: () => (extend),
  filterChildren: () => (filterChildren),
  findChildren: () => (findChildren),
  getParentByTagName: () => (getParentByTagName),
  indexOfElementNode: () => (indexOfElementNode),
  indexOfNode: () => (indexOfNode),
  indexOfSorted: () => (indexOfSorted),
  indexOfTextNode: () => (indexOfTextNode),
  insert: () => (insert),
  isElement: () => (isElement),
  isFloat: () => (isFloat),
  isNumber: () => (isNumber),
  isXml: () => (isXml),
  locationOf: () => (locationOf),
  nodeBounds: () => (nodeBounds),
  parents: () => (parents),
  parse: () => (parse),
  prefixed: () => (prefixed),
  qs: () => (qs),
  qsa: () => (qsa),
  qsp: () => (qsp),
  querySelectorByType: () => (querySelectorByType),
  revokeBlobUrl: () => (revokeBlobUrl),
  sprint: () => (sprint),
  treeWalker: () => (treeWalker),
  type: () => (type),
  uuid: () => (uuid),
  walk: () => (walk),
  windowBounds: () => (windowBounds)
});

// EXTERNAL MODULE: ./node_modules/core-js/modules/es.array-buffer.detached.js
var es_array_buffer_detached = __webpack_require__(6573);
// EXTERNAL MODULE: ./node_modules/core-js/modules/es.array-buffer.transfer.js
var es_array_buffer_transfer = __webpack_require__(8100);
// EXTERNAL MODULE: ./node_modules/core-js/modules/es.array-buffer.transfer-to-fixed-length.js
var es_array_buffer_transfer_to_fixed_length = __webpack_require__(7936);
// EXTERNAL MODULE: ./node_modules/event-emitter/index.js
var event_emitter = __webpack_require__(3068);
var event_emitter_default = /*#__PURE__*/__webpack_require__.n(event_emitter);
// EXTERNAL MODULE: ./node_modules/core-js/modules/es.array.push.js
var es_array_push = __webpack_require__(4114);
// EXTERNAL MODULE: ./node_modules/core-js/modules/es.array.unshift.js
var es_array_unshift = __webpack_require__(3609);
// EXTERNAL MODULE: ./node_modules/core-js/modules/esnext.async-iterator.filter.js
var esnext_async_iterator_filter = __webpack_require__(7333);
// EXTERNAL MODULE: ./node_modules/core-js/modules/esnext.async-iterator.for-each.js
var esnext_async_iterator_for_each = __webpack_require__(9920);
// EXTERNAL MODULE: ./node_modules/core-js/modules/esnext.iterator.constructor.js
var esnext_iterator_constructor = __webpack_require__(8992);
// EXTERNAL MODULE: ./node_modules/core-js/modules/esnext.iterator.filter.js
var esnext_iterator_filter = __webpack_require__(4520);
// EXTERNAL MODULE: ./node_modules/core-js/modules/esnext.iterator.for-each.js
var esnext_iterator_for_each = __webpack_require__(3949);
// EXTERNAL MODULE: ./node_modules/core-js/modules/web.dom-exception.stack.js
var web_dom_exception_stack = __webpack_require__(4979);
// EXTERNAL MODULE: ./node_modules/core-js/modules/web.url-search-params.delete.js
var web_url_search_params_delete = __webpack_require__(4603);
// EXTERNAL MODULE: ./node_modules/core-js/modules/web.url-search-params.has.js
var web_url_search_params_has = __webpack_require__(7566);
// EXTERNAL MODULE: ./node_modules/core-js/modules/web.url-search-params.size.js
var web_url_search_params_size = __webpack_require__(8721);
;// ./src/utils/core.js











/**
 * @module core
 */

/**
 * Generates a UUID
 * @link https://stackoverflow.com/questions/105034/how-do-i-create-a-guid-uuid
 * @returns {string} uuid
 */
const uuid = () => {
  let d = new Date().getTime();
  const uuid = "xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx".replace(/[xy]/g, c => {
    const r = (d + Math.random() * 16) % 16 | 0;
    d = Math.floor(d / 16);
    return (c == "x" ? r : r & 0x7 | 0x8).toString(16);
  });
  return uuid;
};

/**
 * Gets the height of a document
 * @returns {number} height
 */
const documentHeight = () => {
  return Math.max(document.documentElement.clientHeight, document.body.scrollHeight, document.documentElement.scrollHeight, document.body.offsetHeight, document.documentElement.offsetHeight);
};

/**
 * Checks if a node is an element
 * @param {object} obj
 * @returns {boolean}
 */
const isElement = obj => {
  return !!(obj && obj.nodeType == Node.ELEMENT_NODE);
};

/**
 * isNumber
 * @param {any} n
 * @returns {boolean}
 */
const isNumber = n => {
  return !isNaN(parseFloat(n)) && isFinite(n);
};

/**
 * isFloat
 * @param {any} n
 * @returns {boolean}
 */
const isFloat = n => {
  const f = parseFloat(n);
  if (isNumber(n) === false) {
    return false;
  }
  if (typeof n === "string" && n.indexOf(".") > -1) {
    return true;
  }
  return Math.floor(f) !== f;
};

/**
 * Get a prefixed css property
 * @param {string} unprefixed
 * @returns {string}
 */
const prefixed = unprefixed => {
  const vendors = ["Webkit", "webkit", "Moz", "O", "ms"];
  const prefixes = ["-webkit-", "-webkit-", "-moz-", "-o-", "-ms-"];
  const lower = unprefixed.toLowerCase();
  const length = vendors.length;
  if (typeof document === "undefined" || typeof document.body.style[lower] !== "undefined") {
    return unprefixed;
  }
  for (let i = 0; i < length; i++) {
    if (typeof document.body.style[prefixes[i] + lower] !== "undefined") {
      return prefixes[i] + lower;
    }
  }
  return unprefixed;
};

/**
 * Apply defaults to an object
 * @param {object} obj
 * @returns {object}
 */
const defaults = (obj, ...args) => {
  for (let i = 1, length = args.length; i < length; i++) {
    const source = args[i];
    for (const prop in source) {
      if (obj[prop] === void 0) obj[prop] = source[prop];
    }
  }
  return obj;
};

/**
 * Extend properties of an object
 * @param {object} target
 * @returns {object}
 */
const extend = (target, ...args) => {
  args.forEach(source => {
    if (!source) return;
    Object.getOwnPropertyNames(source).forEach(prop => {
      Object.defineProperty(target, prop, Object.getOwnPropertyDescriptor(source, prop));
    });
  });
  return target;
};

/**
 * Finds where something would fit into a sorted array
 * @param {any} item
 * @param {array} array
 * @param {function} [compareFunction]
 * @param {function} [start]
 * @param {function} [end]
 * @returns {number} location (in array)
 */
const locationOf = (item, array, compareFunction, start, end) => {
  const _start = start || 0;
  const _end = end || array.length;
  const pivot = parseInt(_start + (_end - _start) / 2);
  if (!compareFunction) {
    compareFunction = (a, b) => {
      if (a > b) return 1;
      if (a < b) return -1;
      if (a == b) return 0;
    };
  }
  if (_end - _start <= 0) {
    return pivot;
  }
  const compared = compareFunction(array[pivot], item);
  if (_end - _start === 1) {
    return compared >= 0 ? pivot : pivot + 1;
  }
  if (compared === 0) {
    return pivot;
  }
  if (compared === -1) {
    return locationOf(item, array, compareFunction, pivot, _end);
  } else {
    return locationOf(item, array, compareFunction, _start, pivot);
  }
};

/**
 * Fast quicksort insert for sorted array -- based on:
 * @link https://stackoverflow.com/questions/1344500/efficient-way-to-insert-a-number-into-a-sorted-array-of-numbers
 * @param {any} item
 * @param {array} array
 * @param {function} [compareFunction]
 * @returns {number} location (in array)
 */
const insert = (item, array, compareFunction) => {
  const location = locationOf(item, array, compareFunction);
  array.splice(location, 0, item);
  return location;
};

/**
 * Finds index of something in a sorted array
 * Returns -1 if not found
 * @param {any} item
 * @param {array} array
 * @param {function} [compareFunction]
 * @param {function} [start]
 * @param {function} [end]
 * @returns {number} index (in array) or -1
 */
const indexOfSorted = (item, array, compareFunction, start, end) => {
  const _start = start || 0;
  const _end = end || array.length;
  const pivot = parseInt(_start + (_end - _start) / 2);
  if (!compareFunction) {
    compareFunction = (a, b) => {
      if (a > b) return 1;
      if (a < b) return -1;
      if (a == b) return 0;
    };
  }
  if (_end - _start <= 0) {
    return -1; // Not found
  }
  const compared = compareFunction(array[pivot], item);
  if (_end - _start === 1) {
    return compared === 0 ? pivot : -1;
  }
  if (compared === 0) {
    return pivot; // Found
  }
  if (compared === -1) {
    return indexOfSorted(item, array, compareFunction, pivot, _end);
  } else {
    return indexOfSorted(item, array, compareFunction, _start, pivot);
  }
};

/**
 * Find the bounds of an element
 * taking padding and margin into account
 * @param {Element} el
 * @returns {{ height: number, width: number }}
 */
const bounds = el => {
  const style = window.getComputedStyle(el);
  const widthProps = ["width", "paddingRight", "paddingLeft", "marginRight", "marginLeft", "borderRightWidth", "borderLeftWidth"];
  const heightProps = ["height", "paddingTop", "paddingBottom", "marginTop", "marginBottom", "borderTopWidth", "borderBottomWidth"];
  const ret = {
    height: 0,
    width: 0
  };
  widthProps.forEach(prop => {
    ret.width += parseFloat(style[prop]) || 0;
  });
  heightProps.forEach(prop => {
    ret.height += parseFloat(style[prop]) || 0;
  });
  return ret;
};

/**
 * Find the bounds of an element
 * taking padding, margin and borders into account
 * @param {Element} el
 * @returns {{ height: number, width: number }}
 */
const borders = el => {
  const style = window.getComputedStyle(el);
  const widthProps = ["paddingRight", "paddingLeft", "marginRight", "marginLeft", "borderRightWidth", "borderLeftWidth"];
  const heightProps = ["paddingTop", "paddingBottom", "marginTop", "marginBottom", "borderTopWidth", "borderBottomWidth"];
  const ret = {
    height: 0,
    width: 0
  };
  widthProps.forEach(prop => {
    ret.width += parseFloat(style[prop]) || 0;
  });
  heightProps.forEach(prop => {
    ret.height += parseFloat(style[prop]) || 0;
  });
  return ret;
};

/**
 * Find the bounds of any node
 * allows for getting bounds of text nodes by wrapping them in a range
 * @param {Node} node
 * @returns {DOMRect}
 */
const nodeBounds = node => {
  let rect;
  const doc = node.ownerDocument;
  if (node.nodeType == Node.TEXT_NODE) {
    const range = doc.createRange();
    range.selectNodeContents(node);
    rect = range.getBoundingClientRect();
  } else {
    rect = node.getBoundingClientRect();
  }
  return rect;
};

/**
 * Find the equivalent of getBoundingClientRect of a browser window
 * @returns {{ width: number, height: number, top: number, left: number, right: number, bottom: number }}
 */
const windowBounds = () => {
  const width = window.innerWidth;
  const height = window.innerHeight;
  return {
    top: 0,
    left: 0,
    right: width,
    bottom: height,
    width: width,
    height: height
  };
};

/**
 * Gets the index of a node in its parent
 * @param {Node} node
 * @param {string} typeId
 * @return {number} index
 */
const indexOfNode = (node, typeId) => {
  const parent = node.parentNode;
  const children = parent.childNodes;
  let index = -1;
  for (let i = 0; i < children.length; i++) {
    const sib = children[i];
    if (sib.nodeType === typeId) {
      index++;
    }
    if (sib == node) break;
  }
  return index;
};

/**
 * Gets the index of a text node in its parent
 * @param {Node} textNode
 * @returns {number} index
 */
const indexOfTextNode = textNode => {
  return indexOfNode(textNode, Node.TEXT_NODE);
};

/**
 * Gets the index of an element node in its parent
 * @param {Element} elementNode
 * @returns {number} index
 */
const indexOfElementNode = elementNode => {
  return indexOfNode(elementNode, Node.ELEMENT_NODE);
};

/**
 * Check if extension is xml
 * @param {string} ext
 * @returns {boolean}
 */
const isXml = ext => {
  return ["xml", "opf", "ncx"].indexOf(ext) > -1;
};

/**
 * Create a new blob
 * @param {any} content
 * @param {string} mime
 * @returns {Blob}
 */
const createBlob = (content, mime) => {
  return new Blob([content], {
    type: mime
  });
};

/**
 * Create a new blob url
 * @param {any} content
 * @param {string} mime
 * @returns {string} url
 */
const createBlobUrl = (content, mime) => {
  const blob = createBlob(content, mime);
  return URL.createObjectURL(blob);
};

/**
 * Remove a blob url
 * @param {string} url
 */
const revokeBlobUrl = url => {
  return URL.revokeObjectURL(url);
};

/**
 * Create a new base64 encoded url
 * @param {any} content
 * @param {string} mime
 * @returns {string} url
 */
const createBase64Url = (content, mime) => {
  if (typeof content !== "string") {
    // Only handles strings
    return;
  }
  const data = btoa(content);
  const datauri = "data:" + mime + ";base64," + data;
  return datauri;
};

/**
 * Get type of an object
 * @param {object} obj
 * @returns {string} type
 */
const type = obj => {
  return Object.prototype.toString.call(obj).slice(8, -1);
};

/**
 * Parse xml (or html) markup
 * @param {string} markup
 * @param {string} mime
 * @returns {Document} document
 */
const parse = (markup, mime) => {
  // Remove byte order mark before parsing
  // https://www.w3.org/International/questions/qa-byte-order-mark
  if (markup.charCodeAt(0) === 0xFEFF) {
    markup = markup.slice(1);
  }
  const parser = new DOMParser();
  return parser.parseFromString(markup, mime);
};

/**
 * querySelector polyfill
 * @param {Element} el
 * @param {string} sel selector string
 * @returns {Element} element
 */
const qs = (el, sel) => {
  if (!el) {
    throw new Error("No Element Provided");
  }
  if (typeof el.querySelector !== "undefined") {
    return el.querySelector(sel);
  } else {
    const elements = el.getElementsByTagName(sel);
    if (elements.length) {
      return elements[0];
    }
  }
};

/**
 * querySelectorAll polyfill
 * @param {Element} el
 * @param {string} sel selector string
 * @returns {Element[]} elements
 */
const qsa = (el, sel) => {
  if (typeof el.querySelector !== "undefined") {
    return el.querySelectorAll(sel);
  } else {
    return el.getElementsByTagName(sel);
  }
};

/**
 * querySelector by property
 * @param {Element} el
 * @param {string} sel selector string
 * @param {object[]} props
 * @returns {Element[]} elements
 */
const qsp = (el, sel, props) => {
  if (typeof el.querySelector !== "undefined") {
    sel += "[";
    for (const prop in props) {
      sel += prop + "~='" + props[prop] + "'";
    }
    sel += "]";
    return el.querySelector(sel);
  } else {
    const q = el.getElementsByTagName(sel);
    const filtered = Array.prototype.slice.call(q, 0).filter(el => {
      for (const prop in props) {
        if (el.getAttribute(prop) === props[prop]) {
          return true;
        }
      }
      return false;
    });
    if (filtered) {
      return filtered[0];
    }
  }
};

/**
 * Sprint through all text nodes in a document
 * @param {Element} root element to start with
 * @param {function} func function to run on each element
 */
const sprint = (root, func) => {
  const doc = root.ownerDocument || root;
  if (typeof doc.createTreeWalker !== "undefined") {
    treeWalker(root, func, NodeFilter.SHOW_TEXT);
  } else {
    walk(root, node => {
      if (node && node.nodeType === Node.TEXT_NODE) {
        func(node);
      }
    }, true);
  }
};

/**
 * Create a treeWalker
 * @param {Element} root element to start with
 * @param {function} func function to run on each element
 * @param {function|object} filter function or object to filter with
 */
const treeWalker = (root, func, filter) => {
  const treeWalker = document.createTreeWalker(root, filter, null, false);
  let node;
  while (node = treeWalker.nextNode()) {
    func(node);
  }
};

/**
 * @param {Node} node
 * @param {method} callback false for continue,true for break inside callback
 * @returns {boolean}
 */
const walk = (node, callback) => {
  if (callback(node)) {
    return true;
  }
  node = node.firstChild;
  if (node) {
    do {
      let walked = walk(node, callback); // recursive call
      if (walked) {
        return true;
      }
      node = node.nextSibling;
    } while (node);
  }
  return false;
};

/**
 * Convert a blob to a base64 encoded string
 * @param {Blog} blob
 * @returns {Promise}
 */
const blob2base64 = blob => {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.readAsDataURL(blob);
    reader.onloadend = () => {
      resolve(reader.result);
    };
  });
};

/**
 * querySelector with filter by epub type
 * @param {Element} html
 * @param {string} element element type to find
 * @param {string} type epub type to find
 * @returns {Element[]} elements
 */
const querySelectorByType = (html, element, type) => {
  let query;
  if (typeof html.querySelector !== "undefined") {
    query = html.querySelector(`${element}[*|type="${type}"]`);
  }
  // Handle IE not supporting namespaced epub:type in querySelector
  if (!query || query.length === 0) {
    query = qsa(html, element);
    for (let i = 0; i < query.length; i++) {
      if (query[i].getAttributeNS("http://www.idpf.org/2007/ops", "type") === type || query[i].getAttribute("epub:type") === type) {
        return query[i];
      }
    }
  } else {
    return query;
  }
};

/**
 * Find direct descendents of an element
 * @param {Element} el
 * @returns {Element[]} children
 */
const findChildren = el => {
  const result = [];
  const childNodes = el.childNodes;
  for (let i = 0; i < childNodes.length; i++) {
    const node = childNodes[i];
    if (node.nodeType === Node.ELEMENT_NODE) {
      result.push(node);
    }
  }
  return result;
};

/**
 * Find all parents (ancestors) of an element
 * @param {Node} node
 * @returns {Node[]} parents
 */
const parents = node => {
  const nodes = [node];
  for (; node; node = node.parentNode) {
    nodes.unshift(node);
  }
  return nodes;
};

/**
 * Find all direct descendents of a specific type
 * @param {Element} el
 * @param {string} nodeName
 * @param {boolean} [single]
 * @returns {Element[]} children
 */
const filterChildren = (el, nodeName, single) => {
  const result = [];
  const childNodes = el.childNodes;
  for (let i = 0; i < childNodes.length; i++) {
    const node = childNodes[i];
    if (node.nodeType === Node.ELEMENT_NODE && node.nodeName.toLowerCase() === nodeName) {
      if (single) {
        return node;
      } else {
        result.push(node);
      }
    }
  }
  if (!single) {
    return result;
  }
};

/**
 * Filter all parents (ancestors) with tag name
 * @param {Node} node
 * @param {string} tagname
 * @returns {Node[]} parents
 */
const getParentByTagName = (node, tagname) => {
  if (node === null || tagname === "") return;
  let parent = node.parentNode;
  while (parent.nodeType === Node.ELEMENT_NODE) {
    if (parent.tagName.toLowerCase() === tagname) {
      return parent;
    }
    parent = parent.parentNode;
  }
};
;// ./src/utils/defer.js


/**
 * Creates a new pending promise and provides methods to resolve or reject it.
 */
class Defer {
  constructor() {
    /**
     * @member {string} id
     * @memberof Defer
     * @readonly
     */
    this.id = uuid();
    /**
     * A method to resolve the associated Promise with the value passed.
     * If the promise is already settled it does nothing.
     * @member {method} resolve
     * @param {anything} value : This value is used to resolve the promise
     * If the value is a Promise then the associated promise assumes the state
     * of Promise passed as value.
     * @memberof Defer
     * @readonly
     */
    this.resolve = null;
    /**
     * A method to reject the associated Promise with the value passed.
     * If the promise is already settled it does nothing.
     * @member {method} reject
     * @param {anything} reason: The reason for the rejection of the Promise.
     * Generally its an Error object. If however a Promise is passed, then the Promise
     * itself will be the reason for rejection no matter the state of the Promise.
     * @memberof Defer
     * @readonly
     */
    this.reject = null;
    /**
     * A newly created Pomise object.
     * Initially in pending state.
     * @member {Promise} promise
     * @memberof Defer
     * @readonly
     */
    this.promise = new Promise((resolve, reject) => {
      this.resolve = resolve;
      this.reject = reject;
    });
  }
}
/* harmony default export */ const defer = (Defer);
;// ./src/utils/path.js
/* provided dependency */ var process = __webpack_require__(5606);




/**
 * Creates a Path object for parsing and manipulation of a path strings
 * @link https://nodejs.org/api/path.html
 */
class Path {
  /**
   * Constructor
   * @param {string} uri a url string (relative or absolute)
   */
  constructor(uri) {
    if (uri.indexOf("://") > -1) {
      uri = new URL(uri).pathname;
    }
    const parsed = this.parse(uri);
    /**
     * @member {string} directory
     * @memberof Path
     * @readonly
     */
    this.directory = parsed.dir + "/";
    /**
     * @member {string} filename
     * @memberof Path
     * @readonly
     */
    this.filename = parsed.base;
    /**
     * @member {string} extension
     * @memberof Path
     * @readonly
     */
    this.extension = parsed.ext.slice(1);
    /**
     * @member {string} path
     * @memberof Path
     * @readonly
     */
    this.path = uri;
  }

  /**
   * Parse the path
   * @link https://nodejs.org/api/path.html#path_path_parse_path
   * @param {string} path
   * @returns {object}
   */
  parse(path) {
    const ret = {
      root: "",
      dir: "",
      base: "",
      ext: "",
      name: ""
    };
    if (path.length === 0) {
      return ret;
    }
    const parts = this.splitPath(path);
    if (!parts || parts.length !== 4) {
      throw new Error(`Invalid path: ${path}`);
    }
    ret.root = parts[0];
    if (this.isDirectory(path)) {
      ret.dir = parts[0] + parts[1] + parts[2];
    } else {
      ret.dir = parts[0] + parts[1].slice(0, -1);
      ret.base = parts[2];
      ret.ext = parts[3];
      ret.name = parts[2].slice(0, parts[2].length - parts[3].length);
    }
    return ret;
  }

  /**
   * dirname
   * @link https://nodejs.org/api/path.html#pathdirnamepath
   * @param {string} path 
   * @returns {string}
   */
  dirname(path) {
    const result = this.splitPath(path);
    const root = result[0];
    const dir = result[1];
    if (!root && !dir) {
      return ".";
    }
    return root + dir;
  }

  /**
   * isAbsolute
   * @link https://nodejs.org/api/path.html#pathisabsolutepath
   * @param {string} path
   * @returns {boolean}
   */
  isAbsolute(path) {
    return path.charAt(0) === "/";
  }

  /**
   * Check if path ends with a directory
   * @param {string} path
   * @returns {boolean}
   */
  isDirectory(path) {
    return path.charAt(path.length - 1) === "/";
  }

  /**
   * Resolve path
   * @link https://nodejs.org/api/path.html#pathresolvepaths
   * @returns {string} resolved
   */
  resolve() {
    let resolvedPath = "";
    let resolvedAbsolute = false;
    for (let i = arguments.length - 1; i >= -1 && !resolvedAbsolute; i--) {
      let path;
      if (i >= 0) {
        path = arguments[i];
      } else {
        path = process ? process.cwd() : "/";
      }
      if (path.length === 0) {
        continue;
      }
      resolvedPath = path + "/" + resolvedPath;
      resolvedAbsolute = this.isAbsolute(path);
    }
    resolvedPath = this.normalizeArray(resolvedPath.split("/"), !resolvedAbsolute).join("/");
    return (resolvedAbsolute ? "/" : "") + resolvedPath || ".";
  }

  /**
   * Relative path resolve
   * @link https://nodejs.org/api/path.html#pathrelativefrom-to
   * @param {string} from
   * @param {string} to 
   * @returns {string} relative path
   */
  relative(from, to) {
    if (from === to) return "";
    from = this.resolve(from);
    to = this.resolve(to);
    if (from === to) return "";
    const fromParts = this.trimArray(from.split("/"));
    const toParts = this.trimArray(to.split("/"));
    const length = Math.min(fromParts.length, toParts.length);
    let samePartsLength = length;
    for (let i = 0; i < length; i++) {
      if (fromParts[i] !== toParts[i]) {
        samePartsLength = i;
        break;
      }
    }
    let outputParts = [];
    for (let i = samePartsLength; i < fromParts.length; i++) {
      outputParts.push("..");
    }
    outputParts = outputParts.concat(toParts.slice(samePartsLength));
    return outputParts.join("/");
  }

  /**
   * Normalize path
   * @link https://nodejs.org/api/path.html#pathnormalizepath
   * @param {string} path 
   * @returns {string}
   */
  normalize(path) {
    const isAbsolute = this.isAbsolute(path);
    const trailingSlash = path && path[path.length - 1] === "/";
    path = this.normalizeArray(path.split("/"), !isAbsolute).join("/");
    if (!path && !isAbsolute) {
      path = ".";
    }
    if (path && trailingSlash) {
      path += "/";
    }
    return (isAbsolute ? "/" : "") + path;
  }

  /**
   * Return the path string
   * @returns {string} path
   */
  toString() {
    return this.path;
  }
  normalizeArray(parts, allowAboveRoot) {
    const res = [];
    for (let i = 0; i < parts.length; i++) {
      const p = parts[i];
      if (!p || p === ".") {
        continue;
      }
      if (p === "..") {
        if (res.length && res[res.length - 1] !== "..") {
          res.pop();
        } else if (allowAboveRoot) {
          res.push("..");
        }
      } else {
        res.push(p);
      }
    }
    return res;
  }
  splitPath(filename) {
    const pattern = /^(\/?|)([\s\S]*?)((?:\.{1,2}|[^\/]+?|)(\.[^.\/]*|))(?:[\/]*)$/;
    return pattern.exec(filename).slice(1);
  }
  trimArray(arr) {
    const lastIndex = arr.length - 1;
    let start = 0;
    for (; start <= lastIndex; start++) {
      if (arr[start]) {
        break;
      }
    }
    let end = lastIndex;
    for (; end >= 0; end--) {
      if (arr[end]) {
        break;
      }
    }
    if (start === 0 && end === lastIndex) {
      return arr;
    }
    if (start > end) {
      return [];
    }
    return arr.slice(start, end + 1);
  }
}
/* harmony default export */ const utils_path = (Path);
;// ./src/utils/url.js





/**
 * Creates a Url object for parsing and manipulation of a url string
 */
class Url {
  /**
   * Constructor
   * @param {string} url a url string (relative or absolute)
   * @param {string} [base] optional base for the url, default to window.location.href
   */
  constructor(url, base) {
    this.Url = undefined;
    this.href = url;
    this.protocol = "";
    this.origin = "";
    this.hash = "";
    this.hash = "";
    this.search = "";
    this.base = base;
    const absolute = url.indexOf("://") > -1;
    if (!absolute && base !== false && typeof base !== "string" && window && window.location) {
      this.base = window.location.href;
    }
    let pathname = url;
    // URL Polyfill doesn't throw an error if base is empty
    if (absolute || this.base) {
      try {
        if (this.base) {
          // Safari doesn't like an undefined base
          this.Url = new URL(url, this.base);
        } else {
          this.Url = new URL(url);
        }
        this.href = this.Url.href;
        this.protocol = this.Url.protocol;
        this.origin = this.Url.origin;
        this.hash = this.Url.hash;
        this.search = this.Url.search;
        pathname = this.Url.pathname + (this.Url.search ? this.Url.search : "");
      } catch (e) {
        // Skip URL parsing
        this.Url = undefined;
        // resolve the pathname from the base
        if (this.base) {
          const basePath = new utils_path(this.base);
          pathname = basePath.resolve(pathname);
        }
        console.error(e);
      }
      // override URL.origin property for Firefox browser
      if (this.origin === "null" && this.protocol === "file:") {
        this.origin = "file://";
      }
    }
    /**
     * @member {Path} path
     * @memberof Url
     * @readonly
     */
    this.path = new utils_path(pathname);
    this.directory = this.path.directory;
    this.filename = this.path.filename;
    this.extension = this.path.extension;
  }

  /**
   * Resolves a relative path to a absolute url
   * @param {string} path
   * @returns {string} url
   */
  resolve(path) {
    if (path.indexOf("://") > -1) {
      // is absolute
      return path;
    }
    const dir = this.path.directory;
    const fullpath = utils_path.prototype.resolve(dir, path);
    return this.origin + fullpath;
  }

  /**
   * Resolve a path relative to the url
   * @param {string} path
   * @returns {string} path
   */
  relative(path) {
    const dir = this.path.directory;
    return utils_path.prototype.relative(path, dir);
  }

  /**
   * toString
   * @returns {string}
   */
  toString() {
    return this.href;
  }
}
/* harmony default export */ const utils_url = (Url);
// EXTERNAL MODULE: ./node_modules/core-js/modules/esnext.json.parse.js
var esnext_json_parse = __webpack_require__(8335);
// EXTERNAL MODULE: ./node_modules/core-js/modules/esnext.map.delete-all.js
var esnext_map_delete_all = __webpack_require__(1517);
// EXTERNAL MODULE: ./node_modules/core-js/modules/esnext.map.emplace.js
var esnext_map_emplace = __webpack_require__(1379);
// EXTERNAL MODULE: ./node_modules/core-js/modules/esnext.map.every.js
var esnext_map_every = __webpack_require__(3777);
// EXTERNAL MODULE: ./node_modules/core-js/modules/esnext.map.filter.js
var esnext_map_filter = __webpack_require__(4190);
// EXTERNAL MODULE: ./node_modules/core-js/modules/esnext.map.find.js
var esnext_map_find = __webpack_require__(2359);
// EXTERNAL MODULE: ./node_modules/core-js/modules/esnext.map.find-key.js
var esnext_map_find_key = __webpack_require__(6097);
// EXTERNAL MODULE: ./node_modules/core-js/modules/esnext.map.includes.js
var esnext_map_includes = __webpack_require__(7273);
// EXTERNAL MODULE: ./node_modules/core-js/modules/esnext.map.key-of.js
var esnext_map_key_of = __webpack_require__(7415);
// EXTERNAL MODULE: ./node_modules/core-js/modules/esnext.map.map-keys.js
var esnext_map_map_keys = __webpack_require__(9929);
// EXTERNAL MODULE: ./node_modules/core-js/modules/esnext.map.map-values.js
var esnext_map_map_values = __webpack_require__(7583);
// EXTERNAL MODULE: ./node_modules/core-js/modules/esnext.map.merge.js
var esnext_map_merge = __webpack_require__(5122);
// EXTERNAL MODULE: ./node_modules/core-js/modules/esnext.map.reduce.js
var esnext_map_reduce = __webpack_require__(230);
// EXTERNAL MODULE: ./node_modules/core-js/modules/esnext.map.some.js
var esnext_map_some = __webpack_require__(7268);
// EXTERNAL MODULE: ./node_modules/core-js/modules/esnext.map.update.js
var esnext_map_update = __webpack_require__(9733);
// EXTERNAL MODULE: ./node_modules/core-js/modules/esnext.async-iterator.map.js
var esnext_async_iterator_map = __webpack_require__(1393);
// EXTERNAL MODULE: ./node_modules/core-js/modules/esnext.iterator.map.js
var esnext_iterator_map = __webpack_require__(1454);
;// ./src/utils/rangeobject.js


/**
 * Lightweight Polyfill for DOM Range
 */
class RangeObject {
  constructor() {
    this.collapsed = false;
    this.commonAncestorContainer = undefined;
    this.endContainer = undefined;
    this.endOffset = undefined;
    this.startContainer = undefined;
    this.startOffset = undefined;
  }

  /**
   * Set start
   * @param {Node} startNode 
   * @param {Node} startOffset 
   */
  setStart(startNode, startOffset) {
    this.startContainer = startNode;
    this.startOffset = startOffset;
    if (!this.endContainer) {
      this.collapse(true);
    } else {
      this.commonAncestorContainer = this._commonAncestorContainer();
    }
    this._checkCollapsed();
  }

  /**
   * Set end
   * @param {Node} endNode 
   * @param {Node} endOffset 
   */
  setEnd(endNode, endOffset) {
    this.endContainer = endNode;
    this.endOffset = endOffset;
    if (!this.startContainer) {
      this.collapse(false);
    } else {
      this.collapsed = false;
      this.commonAncestorContainer = this._commonAncestorContainer();
    }
    this._checkCollapsed();
  }

  /**
   * collapse
   * @param {boolean} toStart 
   */
  collapse(toStart) {
    this.collapsed = true;
    if (toStart) {
      this.endContainer = this.startContainer;
      this.endOffset = this.startOffset;
      this.commonAncestorContainer = this.startContainer.parentNode;
    } else {
      this.startContainer = this.endContainer;
      this.startOffset = this.endOffset;
      this.commonAncestorContainer = this.endOffset.parentNode;
    }
  }

  /**
   * Select Node
   * @param {Node} referenceNode 
   */
  selectNode(referenceNode) {
    const parent = referenceNode.parentNode;
    const index = Array.prototype.indexOf.call(parent.childNodes, referenceNode);
    this.setStart(parent, index);
    this.setEnd(parent, index + 1);
  }

  /**
   * Select Node Contents
   * @param {Node} referenceNode 
   */
  selectNodeContents(referenceNode) {
    const endIndex = referenceNode.nodeType === Node.TEXT_NODE ? referenceNode.textContent.length : parent.childNodes.length;
    this.setStart(referenceNode, 0);
    this.setEnd(referenceNode, endIndex);
  }
  _commonAncestorContainer(startContainer, endContainer) {
    const startParents = parents(startContainer || this.startContainer);
    const endParents = parents(endContainer || this.endContainer);
    if (startParents[0] != endParents[0]) return undefined;
    for (let i = 0; i < startParents.length; i++) {
      if (startParents[i] != endParents[i]) {
        return startParents[i - 1];
      }
    }
  }
  _checkCollapsed() {
    if (this.startContainer === this.endContainer && this.startOffset === this.endOffset) {
      this.collapsed = true;
    } else {
      this.collapsed = false;
    }
  }
  toString() {
    // TODO: implement walking between start and end to find text
  }
}
/* harmony default export */ const rangeobject = (RangeObject);
;// ./src/epubcfi.js












/**
 * Parsing and creation of EpubCFIs: https://idpf.org/epub/linking/cfi/epub-cfi.html
 * 
 * Implements:
 * - Character Offset: `epubcfi(/6/4[chap01ref]!/4[body01]/10[para05]/2/1:3)`
 * - Simple Ranges: `epubcfi(/6/4[chap01ref]!/4[body01]/10[para05],/2/1:1,/3:4)`
 * 
 * Does Not Implement:
 * - Temporal Offset `(~)`
 * - Spatial Offset `(@)`
 * - Temporal-Spatial Offset `(~ + @)`
 * - Text Location Assertion `([)`
 */
class EpubCFI {
  /**
   * Constructor
   * @param {string|Range|Node} [cfiFrom] 
   * @param {string|object} [base] 
   * @param {string} [ignoreClass] class to ignore when parsing DOM
   */
  constructor(cfiFrom, base, ignoreClass) {
    /**
     * @member {object} base
     * @memberof EpubCFI
     * @readonly
     */
    this.base = {};
    /**
     * @member {number} spinePos spine position
     * @memberof EpubCFI
     * @readonly
     */
    this.spinePos = 0; // For compatibility
    /**
     * @member {object} path
     * @memberof EpubCFI
     * @readonly
     */
    this.path = {};
    /**
     * @member {boolean} range
     * @memberof EpubCFI
     * @readonly
     */
    this.range = false;
    /**
     * @member {object} start
     * @memberof EpubCFI
     * @readonly
     */
    this.start = null;
    /**
     * @member {object} end
     * @memberof EpubCFI
     * @readonly
     */
    this.end = null;
    /**
     * @member {string} str EpubCFI string format
     * @memberof EpubCFI
     * @readonly
     */
    this.str = "";

    // Allow instantiation without the "new" keyword
    if (!(this instanceof EpubCFI)) {
      return new EpubCFI(cfiFrom, base, ignoreClass);
    }
    if (typeof base === "string") {
      this.base = this.parseComponent(base);
      this.spinePos = this.base.steps[1].index;
    } else if (typeof base === "object" && base.steps) {
      this.base = base;
    }
    const type = this.checkType(cfiFrom);
    if (type === "string") {
      return this.parse(cfiFrom);
    } else if (type === "range") {
      return this.fromRange(cfiFrom, this.base, ignoreClass);
    } else if (type === "node") {
      return this.fromNode(cfiFrom, this.base, ignoreClass);
    } else if (type === "EpubCFI" && cfiFrom.path) {
      return cfiFrom;
    } else if (cfiFrom === undefined) {
      return this;
    } else {
      throw new TypeError("not a valid argument for EpubCFI");
    }
  }

  /**
   * Check the type of constructor input
   * @param {string|Range|Node} cfi
   * @returns {string} argument type
   * @private
   */
  checkType(cfi) {
    if (typeof cfi === "undefined") {
      return undefined;
    } else if (this.isCfiString(cfi)) {
      return "string";
    } else if (typeof cfi === "object") {
      if (cfi instanceof Range || typeof cfi.startContainer !== "undefined") {
        return "range";
      } else if (cfi instanceof Node) {
        return "node";
      } else if (cfi instanceof EpubCFI) {
        return "EpubCFI";
      } else return undefined;
    } else return undefined;
  }

  /**
   * Collapse a CFI Range to a single CFI Position
   * @param {boolean} [toStart]
   */
  collapse(toStart) {
    if (this.range === false) return;
    if (toStart) {
      this.path.steps = this.path.steps.concat(this.start.steps);
      this.path.terminal = this.start.terminal;
    } else {
      this.path.steps = this.path.steps.concat(this.end.steps);
      this.path.terminal = this.end.terminal;
    }
    this.range = false;
  }

  /**
   * Compare which of two CFIs is earlier in the text
   * @param {string|EpubCFI} cfiOne 
   * @param {string|EpubCFI} cfiTwo 
   * @returns {number} First is earlier = -1, Second is earlier = 1, They are equal = 0 
   */
  compare(cfiOne, cfiTwo) {
    if (typeof cfiOne === "string") {
      cfiOne = new EpubCFI(cfiOne);
    }
    if (typeof cfiTwo === "string") {
      cfiTwo = new EpubCFI(cfiTwo);
    }
    // Compare Spine Positions
    if (cfiOne.spinePos > cfiTwo.spinePos) return 1;
    if (cfiOne.spinePos < cfiTwo.spinePos) return -1;
    let stepsA, terminalA;
    if (cfiOne.range) {
      stepsA = cfiOne.path.steps.concat(cfiOne.start.steps);
      terminalA = cfiOne.start.terminal;
    } else {
      stepsA = cfiOne.path.steps;
      terminalA = cfiOne.path.terminal;
    }
    let stepsB, terminalB;
    if (cfiTwo.range) {
      stepsB = cfiTwo.path.steps.concat(cfiTwo.start.steps);
      terminalB = cfiTwo.start.terminal;
    } else {
      stepsB = cfiTwo.path.steps;
      terminalB = cfiTwo.path.terminal;
    }
    // Compare Each Step in the First item
    for (let i = 0; i < stepsA.length; i++) {
      if (!stepsA[i]) return -1;
      if (!stepsB[i]) return 1;
      if (stepsA[i].index > stepsB[i].index) return 1;
      if (stepsA[i].index < stepsB[i].index) return -1;
    }
    // All steps in First equal to Second and First is Less Specific
    if (stepsA.length < stepsB.length) return -1;

    // Compare the character offset of the text node
    if (terminalA.offset > terminalB.offset) return 1;
    if (terminalA.offset < terminalB.offset) return -1;
    return 0; // CFI's are equal
  }

  /**
   * Generate chapter component
   * @param {number} spineNodeIndex
   * @param {number} position
   * @param {string} [id] 
   * @returns {string} EpubCFI string format
   */
  generateChapterComponent(spineNodeIndex, position, id) {
    const pos = parseInt(position);
    const index = (spineNodeIndex + 1) * 2;
    let cfi = "/" + index + "/";
    cfi += (pos + 1) * 2;
    if (id) cfi += "[" + id + "]";
    return cfi;
  }

  /**
   * Get chapter component
   * @param {string} cfiStr EpubCFI string format
   * @example in: /6/4!/4/1:0 out: /6/4
   * @returns {string} Base component
   * @private
   */
  getBaseComponent(cfiStr) {
    const indirection = cfiStr.split("!");
    return indirection[0];
  }

  /**
   * Get path component
   * @param {string} cfiStr EpubCFI string format
   * @example in: /6/4!/4/1:0 out: /4/1:0
   * @returns {string} Path component
   * @private
   */
  getPathComponent(cfiStr) {
    const indirection = cfiStr.split("!");
    if (indirection[1]) {
      const ranges = indirection[1].split(",");
      return ranges[0];
    }
  }

  /**
   * getRange
   * @param {string} cfiStr EubCFI string format
   * @example in: /6/4!/4/1:0
   * @returns {object[]} An array of ranges or null if the array length is not 3
   * @private
   */
  getRange(cfiStr) {
    const ranges = cfiStr.split(",");
    if (ranges.length === 3) {
      return [ranges[1], ranges[2]];
    }
    return null;
  }

  /**
   * getCharecterOffsetComponent (unused)
   * @param {string} cfiStr 
   * @returns {string}
   * @private
   */
  getCharecterOffsetComponent(cfiStr) {
    const arr = cfiStr.split(":");
    return arr[1] || "";
  }

  /**
   * joinSteps
   * @param {object[]} steps 
   * @returns {string} 
   * @private
   */
  joinSteps(steps) {
    if (!steps) return "";
    return steps.map(part => {
      let segment = "";
      if (part.type === "element") {
        segment += (part.index + 1) * 2;
      }
      if (part.type === "text") {
        segment += 1 + 2 * part.index; // TODO: double check that this is odd
      }
      if (part.id) {
        segment += "[" + part.id + "]";
      }
      return segment;
    }).join("/");
  }

  /**
   * pathTo
   * @param {Node} node 
   * @param {number} offset 
   * @param {string} [ignoreClass] 
   * @returns {object} segment object
   * @private
   */
  pathTo(node, offset, ignoreClass) {
    const segment = {
      steps: [],
      terminal: {
        offset: null,
        assertion: null
      }
    };
    let step,
      curNode = node;
    while (curNode && curNode.parentNode && curNode.parentNode.nodeType !== Node.DOCUMENT_NODE) {
      if (ignoreClass) {
        step = this.filteredStep(curNode, ignoreClass);
      } else {
        step = this.step(curNode);
      }
      if (step) segment.steps.unshift(step);
      curNode = curNode.parentNode;
    }
    if (offset !== null && offset >= 0) {
      segment.terminal.offset = offset;
      // Make sure we are getting to a textNode if there is an offset
      if (segment.steps[segment.steps.length - 1].type !== "text") {
        segment.steps.push({
          index: 0,
          type: "text"
        });
      }
    }
    return segment;
  }

  /**
   * equalStep
   * @param {object} stepA 
   * @param {object} stepB 
   * @returns {boolean}
   * @private
   */
  equalStep(stepA, stepB) {
    if (stepA && stepB && stepA.id === stepB.id && stepA.index === stepB.index && stepA.type === stepB.type) {
      return true;
    }
    return false;
  }

  /**
   * filter
   * @param {Node} node 
   * @param {string} [ignoreClass] 
   * @returns {Node} 
   * @private
   */
  filter(node, ignoreClass) {
    let parent;
    let isText;
    let needsIgnoring;
    if (node.nodeType === Node.TEXT_NODE) {
      isText = true;
      parent = node.parentNode;
      needsIgnoring = node.parentNode.classList.contains(ignoreClass);
    } else {
      isText = false;
      needsIgnoring = node.classList.contains(ignoreClass);
    }
    if (needsIgnoring && isText) {
      const prevSibling = parent.previousSibling;
      const nextSibling = parent.nextSibling;
      let sibling; // to join with

      // If the sibling is a text node, join the nodes
      if (prevSibling && prevSibling.nodeType === Node.TEXT_NODE) {
        sibling = prevSibling;
      } else if (nextSibling && nextSibling.nodeType === Node.TEXT_NODE) {
        sibling = nextSibling;
      }
      return sibling || node;
    } else if (needsIgnoring && !isText) {
      // Otherwise just skip the element node
      return null;
    } else {
      // No need to filter
      return node;
    }
  }

  /**
   * filteredPosition
   * @param {Node} node 
   * @param {string} [ignoreClass] 
   * @returns {number} index
   * @private
   */
  filteredPosition(node, ignoreClass) {
    let children, map;
    if (node.nodeType === Node.ELEMENT_NODE) {
      children = node.parentNode.children;
      map = this.normalizedMap(children, Node.ELEMENT_NODE, ignoreClass);
    } else {
      children = node.parentNode.childNodes;
      // Inside an ignored node
      if (node.parentNode.classList.contains(ignoreClass)) {
        node = node.parentNode;
        children = node.parentNode.childNodes;
      }
      map = this.normalizedMap(children, Node.TEXT_NODE, ignoreClass);
    }
    const index = Array.prototype.indexOf.call(children, node);
    return map[index];
  }

  /**
   * filteredStep
   * @param {Node} node 
   * @param {string} ignoreClass 
   * @returns {object} step
   * @private
   */
  filteredStep(node, ignoreClass) {
    const _node = this.filter(node, ignoreClass);

    // Node filtered, so ignore
    if (_node === null) return;
    return {
      id: _node.id,
      index: this.filteredPosition(_node, ignoreClass),
      tagName: _node.tagName,
      type: _node.nodeType === Node.TEXT_NODE ? "text" : "element"
    };
  }

  /**
   * findNode
   * @param {object[]} steps 
   * @param {Document} [doc] 
   * @param {string} [ignoreClass] 
   * @returns {Node}
   * @private
   */
  findNode(steps, doc, ignoreClass) {
    const _doc = doc || document;
    let container;
    if (ignoreClass) {
      container = this.walkToNode(steps, _doc, ignoreClass);
    } else if (typeof _doc.evaluate !== "undefined") {
      const xpath = this.stepsToXpath(steps);
      const xtype = XPathResult.FIRST_ORDERED_NODE_TYPE;
      container = _doc.evaluate(xpath, _doc, null, xtype, null).singleNodeValue;
    } else {
      container = this.walkToNode(steps, _doc);
    }
    return container;
  }

  /**
   * fixMiss
   * @param {object[]} steps 
   * @param {number} offset 
   * @param {Document} [doc] 
   * @param {string} [ignoreClass] 
   * @returns {object|void}
   * @private
   */
  fixMiss(steps, offset, doc, ignoreClass) {
    let container = this.findNode(steps.slice(0, -1), doc, ignoreClass);
    const children = container.childNodes;
    const lastStepIndex = steps[steps.length - 1].index;
    const map = this.normalizedMap(children, Node.TEXT_NODE, ignoreClass);
    for (const childIndex in map) {
      if (!map.hasOwnProperty(childIndex)) return;
      if (map[childIndex] === lastStepIndex) {
        const child = children[childIndex];
        const len = child.textContent.length;
        if (offset > len) {
          offset = offset - len;
        } else {
          if (child.nodeType === Node.ELEMENT_NODE) {
            container = child.childNodes[0];
          } else {
            container = child;
          }
          break;
        }
      }
    }
    return {
      container: container,
      offset: offset
    };
  }

  /**
   * Create a EpubCFI object from a Node
   * @param {Node} node
   * @param {string|object} base
   * @param {string} [ignoreClass]
   * @returns {EpubCFI}
   */
  fromNode(node, base, ignoreClass) {
    const cfi = new EpubCFI();
    if (typeof base === "string") {
      cfi.base = this.parseComponent(base);
      cfi.spinePos = cfi.base.steps[1].index;
    } else if (typeof base === "object") {
      cfi.base = base;
    }
    cfi.path = this.pathTo(node, null, ignoreClass);
    return cfi;
  }

  /**
   * Create a CFI object from a Range
   * @param {Range} range
   * @param {string|object} base
   * @param {string} [ignoreClass]
   * @returns {EpubCFI} 
   */
  fromRange(range, base, ignoreClass) {
    const cfi = new EpubCFI();
    const start = range.startContainer;
    const doc = start.ownerDocument;
    const end = range.endContainer;
    let startOffset = range.startOffset;
    let endOffset = range.endOffset;
    let needsIgnoring = false;
    if (ignoreClass) {
      // Tell pathTo if / what to ignore
      needsIgnoring = doc.querySelector("." + ignoreClass) !== null;
    }
    if (typeof base === "string") {
      cfi.base = this.parseComponent(base);
      cfi.spinePos = cfi.base.steps[1].index;
    } else if (typeof base === "object") {
      cfi.base = base;
    }
    if (range.collapsed) {
      if (needsIgnoring) {
        startOffset = this.patchOffset(start, startOffset, ignoreClass);
      }
      cfi.path = this.pathTo(start, startOffset, ignoreClass);
    } else {
      cfi.range = true;
      if (needsIgnoring) {
        startOffset = this.patchOffset(start, startOffset, ignoreClass);
      }
      cfi.start = this.pathTo(start, startOffset, ignoreClass);
      if (needsIgnoring) {
        endOffset = this.patchOffset(end, endOffset, ignoreClass);
      }
      cfi.end = this.pathTo(end, endOffset, ignoreClass);

      // Create a new empty path
      cfi.path = {
        steps: [],
        terminal: null
      };

      // Push steps that are shared between start and end to the common path
      for (let i = 0, len = cfi.start.steps.length; i < len; i++) {
        if (this.equalStep(cfi.start.steps[i], cfi.end.steps[i])) {
          if (i === len - 1) {
            // Last step is equal, check terminals
            if (cfi.start.terminal === cfi.end.terminal) {
              // CFI's are equal
              cfi.path.steps.push(cfi.start.steps[i]);
              // Not a range
              cfi.range = false;
            }
          } else {
            cfi.path.steps.push(cfi.start.steps[i]);
          }
        } else {
          break;
        }
      }
      cfi.start.steps = cfi.start.steps.slice(cfi.path.steps.length);
      cfi.end.steps = cfi.end.steps.slice(cfi.path.steps.length);

      // TODO: Add Sanity check to make sure that the end if greater than the start
    }
    return cfi;
  }

  /**
   * Check if a string is wrapped with "epubcfi()"
   * @param {string} str EpubCFI string format
   * @returns {boolean} `true` if the string is valid, `false` otherwise
   */
  isCfiString(str) {
    if (typeof str === "string" && str.indexOf("epubcfi(") === 0 && str[str.length - 1] === ")") {
      return true;
    }
    return false;
  }

  /**
   * normalizedMap
   * @param {Node[]} children 
   * @param {number} nodeType 
   * @param {string} [ignoreClass] 
   * @returns {object}
   * @private
   */
  normalizedMap(children, nodeType, ignoreClass) {
    const output = {};
    let prevIndex = -1;
    let currNodeType;
    let prevNodeType;
    for (let i = 0, len = children.length; i < len; i++) {
      currNodeType = children[i].nodeType;

      // Check if needs ignoring
      if (currNodeType === Node.ELEMENT_NODE && children[i].classList.contains(ignoreClass)) {
        currNodeType = Node.TEXT_NODE;
      }
      if (i > 0 && currNodeType === Node.TEXT_NODE && prevNodeType === Node.TEXT_NODE) {
        // join text nodes
        output[i] = prevIndex;
      } else if (nodeType === currNodeType) {
        prevIndex = prevIndex + 1;
        output[i] = prevIndex;
      }
      prevNodeType = currNodeType;
    }
    return output;
  }

  /**
   * Parse a cfi string to a EpubCFI object representation
   * @param {string} cfiStr EpubCFI string format
   * @returns {EpubCFI} EpubCFI object
   */
  parse(cfiStr) {
    const cfi = new EpubCFI();
    if (typeof cfiStr !== "string") {
      throw new TypeError("invalid argument type");
    }
    if (this.isCfiString(cfiStr)) {
      // Remove initial 'epubcfi(' and ending ')'
      cfi.str = cfiStr; // save EpubCFI string
      cfiStr = cfiStr.slice(8, cfiStr.length - 1);
    } else {
      throw new Error("invalid EpubCFI string format");
    }
    const baseComponent = this.getBaseComponent(cfiStr);

    // Make sure this is a valid cfi or return
    if (!baseComponent) {
      cfi.spinePos = -1;
      return cfi;
    }
    cfi.base = this.parseComponent(baseComponent);
    const pathComponent = this.getPathComponent(cfiStr);
    cfi.path = this.parseComponent(pathComponent);
    const range = this.getRange(cfiStr);
    if (range) {
      cfi.range = true;
      cfi.start = this.parseComponent(range[0]);
      cfi.end = this.parseComponent(range[1]);
    }

    // Get spine node position
    // cfi.spineSegment = cfi.base.steps[1];

    // Chapter segment is always the second step
    cfi.spinePos = cfi.base.steps[1].index;
    return cfi;
  }

  /**
   * Parsing the component string value
   * @param {string} value string value
   * @example in: /4/1:1 out: object
   * @returns {object} component object
   * @private
   */
  parseComponent(value) {
    const component = {
      steps: [],
      terminal: {
        offset: null,
        assertion: null
      }
    };
    const parts = value.split(":");
    const steps = parts[0].split("/");
    if (parts.length > 1) {
      component.terminal = this.parseTerminal(parts[1]);
    }
    if (steps[0] === "") {
      steps.shift(); // Ignore the first slash
    }
    component.steps = steps.map(step => this.parseStep(step));
    return component;
  }

  /**
   * Parsing the step string value
   * Check if step is a text node or element
   * @param {string} str string value
   * @returns {object} step object
   * @private
   */
  parseStep(str) {
    const num = parseInt(str);
    if (isNaN(num)) return;
    const isElement = num % 2 === 0;
    const hasBrackets = str.match(/\[(.*)\]/);
    return {
      id: hasBrackets && hasBrackets[1] ? hasBrackets[1] : null,
      index: isElement ? num / 2 - 1 : (num - 1) / 2,
      type: isElement ? "element" : "text"
    };
  }

  /**
   * Parsing the terminal string value
   * @param {string} str string value
   * @returns {object} terminal object
   * @private
   */
  parseTerminal(str) {
    const arr = str.match(/\[(.*)\]/);
    const cmp = arr && arr[1];
    const txt = cmp ? str.split("[")[0] : str;
    const num = parseInt(txt);
    return {
      assertion: cmp ? arr[1] : null,
      offset: isNumber(num) ? num : null
    };
  }

  /**
   * Get patch offset of text node
   * @param {Node} node 
   * @param {number} offset 
   * @param {string} [ignoreClass] 
   * @returns {number} Total offset
   * @private
   */
  patchOffset(node, offset, ignoreClass) {
    if (node.nodeType !== Node.TEXT_NODE) {
      throw new Error("Anchor must be a text node");
    }
    let curr = node;
    let totalOffset = offset;

    // If the parent is a ignored node, get offset from it's start
    if (node.parentNode.classList.contains(ignoreClass)) {
      curr = node.parentNode;
    }
    while (curr.previousSibling) {
      if (curr.previousSibling.nodeType === Node.ELEMENT_NODE) {
        // Originally a text node, so join
        if (curr.previousSibling.classList.contains(ignoreClass)) {
          totalOffset += curr.previousSibling.textContent.length;
        } else {
          break; // Normal node, dont join
        }
      } else {
        // If the previous sibling is a text node, join the nodes
        totalOffset += curr.previousSibling.textContent.length;
      }
      curr = curr.previousSibling;
    }
    return totalOffset;
  }

  /**
   * Get position index
   * @param {Node} node 
   * @returns {number} Position index
   * @private
   */
  position(node) {
    let children, index;
    if (node.nodeType === Node.ELEMENT_NODE) {
      children = node.parentNode.children;
      if (!children) {
        children = findChildren(node.parentNode);
      }
      index = Array.prototype.indexOf.call(children, node);
    } else {
      children = this.textNodes(node.parentNode);
      index = children.indexOf(node);
    }
    return index;
  }

  /**
   * segmentString
   * @param {object} segment 
   * @returns {string}
   * @private
   */
  segmentString(segment) {
    let str = "/";
    str += this.joinSteps(segment.steps);
    if (segment.terminal && segment.terminal.offset !== null) {
      str += ":" + segment.terminal.offset;
    }
    if (segment.terminal && segment.terminal.assertion !== null) {
      str += "[" + segment.terminal.assertion + "]";
    }
    return str;
  }

  /**
   * step
   * @param {Node} node 
   * @returns {object} step object
   * @private
   */
  step(node) {
    return {
      id: node.id,
      index: this.position(node),
      tagName: node.tagName,
      type: node.nodeType === Node.TEXT_NODE ? "text" : "element"
    };
  }

  /**
   * stepsToXpath
   * @param {object[]} steps 
   * @returns {string}
   * @private
   */
  stepsToXpath(steps) {
    const xpath = [".", "*"];
    steps.forEach(step => {
      const position = step.index + 1;
      if (step.id) {
        xpath.push("*[position()=" + position + " and @id='" + step.id + "']");
      } else if (step.type === "text") {
        xpath.push("text()[" + position + "]");
      } else {
        xpath.push("*[" + position + "]");
      }
    });
    return xpath.join("/");
  }

  /**
   * stepsToQuerySelector (unused)
   * @param {object[]} steps 
   * @returns {string}
   * @private
   */
  stepsToQuerySelector(steps) {
    const query = ["html"];
    steps.forEach(step => {
      const position = step.index + 1;
      if (step.id) {
        query.push("#" + step.id);
      } else if (step.type === "text") {
        // unsupported in querySelector
        // query.push("text()[" + position + "]");
      } else {
        query.push("*:nth-child(" + position + ")");
      }
    });
    return query.join(">");
  }

  /**
   * textNodes
   * @param {Node} container 
   * @param {string} [ignoreClass] 
   * @returns {object[]}
   * @private
   */
  textNodes(container, ignoreClass) {
    return Array.prototype.slice.call(container.childNodes).filter(node => {
      if (node.nodeType === Node.TEXT_NODE) {
        return true;
      } else if (node.classList.contains(ignoreClass)) {
        return true;
      }
      return false;
    });
  }

  /**
   * Creates a DOM range representing a CFI
   * @param {Document} [doc] document referenced in the base
   * @param {string} [ignoreClass]
   * @return {Range}
   */
  toRange(doc, ignoreClass) {
    const _doc = doc || document;
    let start, end, startContainer, endContainer;
    let startSteps, endSteps, hasOffset;
    const needsIgnoring = ignoreClass && _doc.querySelector("." + ignoreClass) !== null;
    const reqClass = needsIgnoring ? ignoreClass : undefined;
    let range, missed;
    if (typeof _doc.createRange !== "undefined") {
      range = _doc.createRange();
    } else {
      range = new rangeobject();
    }
    if (this.range) {
      start = this.start;
      startSteps = this.path.steps.concat(start.steps);
      startContainer = this.findNode(startSteps, _doc, reqClass);
      end = this.end;
      endSteps = this.path.steps.concat(end.steps);
      endContainer = this.findNode(endSteps, _doc, reqClass);
    } else {
      start = this.path;
      startSteps = this.path.steps;
      startContainer = this.findNode(startSteps, _doc, reqClass);
    }
    if (startContainer) {
      try {
        hasOffset = start.terminal.offset !== null;
        range.setStart(startContainer, hasOffset ? start.terminal.offset : 0);
      } catch (e) {
        missed = this.fixMiss(startSteps, start.terminal.offset, _doc, reqClass);
        range.setStart(missed.container, missed.offset);
        console.error(e);
      }
    } else {
      console.error("No startContainer found for", this.toString());
      return null; // No start found
    }
    if (endContainer) {
      try {
        hasOffset = end.terminal.offset !== null;
        range.setEnd(endContainer, hasOffset ? end.terminal.offset : 0);
      } catch (e) {
        missed = this.fixMiss(endSteps, this.end.terminal.offset, _doc, reqClass);
        range.setEnd(missed.container, missed.offset);
        console.error(e);
      }
    }
    return range;
  }

  /**
   * Convert CFI to a epubcfi(...) string
   * @returns {string} EpubCFI string format
   */
  toString() {
    let str = "epubcfi(";
    str += this.segmentString(this.base);
    str += "!";
    str += this.segmentString(this.path);
    // Add Range, if present
    if (this.range && this.start) {
      str += ",";
      str += this.segmentString(this.start);
    }
    if (this.range && this.end) {
      str += ",";
      str += this.segmentString(this.end);
    }
    str += ")";
    return str;
  }

  /**
   * walkToNode
   * @param {object[]} steps 
   * @param {Document} [doc] 
   * @param {string} [ignoreClass] 
   * @returns {Node}
   * @private
   */
  walkToNode(steps, doc, ignoreClass) {
    const _doc = doc || document;
    let container = _doc.documentElement;
    for (let i = 0, len = steps.length; i < len; i++) {
      const step = steps[i];
      if (step.type === "element") {
        //better to get a container using id as some times step.index may not be correct
        //For ex.https://github.com/futurepress/epub.js/issues/561
        if (step.id) {
          container = _doc.getElementById(step.id);
        } else {
          const children = container.children || findChildren(container);
          container = children[step.index];
        }
      } else if (step.type === "text") {
        container = this.textNodes(container, ignoreClass)[step.index];
      }
      if (!container) {
        //Break the for loop as due to incorrect index we can get error if
        //container is undefined so that other functionailties works fine
        //like navigation
        break;
      }
    }
    return container;
  }
}
/* harmony default export */ const src_epubcfi = (EpubCFI);
;// ./src/location.js


/**
 * Location class
 */
class Location {
  /**
   * Constructor
   */
  constructor() {
    /**
     * @member {string} cfi EpubCFI string format
     * @memberof Location
     */
    this.cfi = null;
    /**
     * @member {number} index Location index
     * @memberof Location
     */
    this.index = 0;
    /**
     * Percentage in the range from 0 to 1
     * @member {number} percentage
     * @memberof Location
     */
    this.percentage = 0;
  }

  /**
   * Set location properties
   * @param {object} [props]
   * @param {string} [props.cfi]
   * @param {number} [props.index]
   * @param {number} [props.percentage]
   */
  set(props) {
    extend(this, props || {});
    return this;
  }
}
/* harmony default export */ const src_location = (Location);
;// ./src/utils/queue.js



/**
 * Queue for handling tasks one at a time
 */
class Queue {
  /**
   * Constructor
   * @param {object} context what this will resolve to in the tasks
   */
  constructor(context) {
    this._q = [];
    this.context = context;
    this.running = false;
    this.paused = false;
  }

  /**
   * Add an item to the queue
   * @param {any} task
   * @param {any[]} [args]
   * @return {Promise<any>}
   */
  enqueue(task, ...args) {
    let queued;
    if (typeof task === "function") {
      const deferred = new defer();
      const promise = deferred.promise;
      queued = {
        task,
        args,
        deferred,
        promise
      };
    } else {
      // Task is a promise
      queued = {
        promise: task
      };
    }
    this._q.push(queued);

    // Wait to start queue flush
    if (this.paused === false && !this.running) {
      this.run();
    }
    return queued.promise;
  }

  /**
   * Run one item
   * @return {Promise<any>}
   */
  dequeue() {
    let inwait;
    if (this._q.length && !this.paused) {
      inwait = this._q.shift();
      const task = inwait.task;
      if (task) {
        const result = task.apply(this.context, inwait.args);
        if (result && typeof result["then"] === "function") {
          // Task is a function that returns a promise
          return result.then(val => {
            inwait.deferred.resolve(val);
          }, err => {
            inwait.deferred.reject(err);
          });
        } else {
          // Task resolves immediately
          inwait.deferred.resolve(result);
          return inwait.promise;
        }
      } else if (inwait.promise) {
        // Task is a promise
        return inwait.promise;
      }
    } else {
      inwait = new defer();
      inwait.deferred.resolve();
      return inwait.promise;
    }
  }

  /**
   * Run All Immediately
   */
  dump() {
    while (this._q.length) {
      this.dequeue();
    }
  }

  /**
   * Run all tasks sequentially, at convince
   * @return {Promise<any>}
   */
  run() {
    if (this.running === false) {
      this.running = true;
      this.deferred = new defer();
    }
    requestAnimationFrame(() => {
      if (this._q.length) {
        this.dequeue().then(() => {
          this.run();
        });
      } else {
        this.deferred.resolve();
        this.running = false;
      }
    });
    if (this.paused) {
      this.paused = false;
    }
    return this.deferred.promise;
  }

  /**
   * Clear all items in wait
   */
  clear() {
    this._q = [];
  }

  /**
   * Get the number of tasks in the queue
   * @return {number} tasks
   */
  length() {
    return this._q.length;
  }

  /**
   * Pause a running queue
   */
  pause() {
    this.paused = true;
  }

  /**
   * End the queue
   */
  stop() {
    this._q = [];
    this.running = false;
    this.paused = true;
  }
}
/* harmony default export */ const queue = (Queue);
;// ./src/utils/constants.js
/**
 * @module constants
 */

const EPUBJS_VERSION = "0.3";

// Dom events to listen for
const DOM_EVENTS = ["keydown", "keyup", "keypressed", "mouseup", "mousedown", "mousemove", "click", "touchend", "touchstart", "touchmove"];
const EVENTS = {
  BOOK: {
    OPEN_FAILED: "openFailed"
  },
  CONTENTS: {
    EXPAND: "expand",
    RESIZED: "resized",
    SELECTED: "selected",
    SELECTED_RANGE: "selectedRange",
    LINK_CLICKED: "linkClicked"
  },
  LOCATIONS: {
    CHANGED: "changed"
  },
  MANAGERS: {
    RESIZE: "resize",
    RESIZED: "resized",
    ORIENTATION_CHANGE: "orientationchange",
    ADDED: "added",
    SCROLL: "scroll",
    SCROLLED: "scrolled",
    REMOVED: "removed",
    RELOCATED: "relocated"
  },
  VIEWS: {
    AXIS: "axis",
    WRITING_MODE: "writingMode",
    LOAD_ERROR: "loaderror",
    RENDERED: "rendered",
    RESIZED: "resized",
    DISPLAYED: "displayed",
    SHOWN: "shown",
    HIDDEN: "hidden",
    MARK_CLICKED: "markClicked"
  },
  RENDITION: {
    STARTED: "started",
    ATTACHED: "attached",
    DISPLAYED: "displayed",
    DISPLAY_ERROR: "displayerror",
    RENDERED: "rendered",
    REMOVED: "removed",
    RESIZED: "resized",
    ORIENTATION_CHANGE: "orientationchange",
    RELOCATED: "relocated",
    MARK_CLICKED: "markClicked",
    SELECTED: "selected",
    LAYOUT: "layout"
  },
  LAYOUT: {
    UPDATED: "updated"
  },
  ANNOTATION: {
    ATTACH: "attach",
    DETACH: "detach"
  },
  THEMES: {
    SELECTED: "selected",
    INJECTED: "injected",
    REJECTED: "rejected"
  },
  VIEWPORT: {
    RESIZED: "resized",
    ORIENTATION_CHANGE: "orientationchange"
  }
};
;// ./src/locations.js



























/**
 * Find Locations for a Book
 */
class Locations extends Map {
  /**
   * Constructor
   * @param {Sections} [sections]
   * @param {Function} [request]
   * @param {number} [pause=100]
   */
  constructor(sections, request, pause) {
    super();
    this.sections = sections;
    this.pause = pause || 100;
    this.break = 150;
    this.request = request;
    /**
     * @member {Location} current Current Location
     * @memberof Locations
     * @readonly
     */
    this.current = new src_location();
    this.processing = new defer();
    /**
     * @member {Promise<Locations>} generated
     * @memberof Locations
     * @readonly
     */
    this.generated = this.processing.promise;
    this.q = new queue(this);
  }

  /**
   * Load all of sections in the book to generate locations
   * @param {number} [chars] how many chars to split on (default:150)
   * @return {Promise<Locations>} Locations
   */
  async generate(chars) {
    if (Number.isInteger(chars)) {
      this.break = chars;
    } else {
      this.break = parseInt(chars);
      console.warn("The input value type is not an integer");
    }
    this.q.pause();
    this.sections.forEach(section => {
      if (section.linear) {
        this.q.enqueue(this.process.bind(this), section);
      }
    });
    return this.q.run().then(() => {
      const len = this.size === 1 ? 1 : this.size - 1;
      const arr = [...this.values()];
      arr.forEach((loc, index) => {
        loc.index = index;
        loc.percentage = index / len;
      });
      if (this.size) {
        this.current.set(arr[0]);
      }
      this.processing.resolve(this);
      return this;
    });
  }

  /**
   * createRange
   * @returns {object}
   * @private
   */
  createRange() {
    return {
      startContainer: undefined,
      startOffset: undefined,
      endContainer: undefined,
      endOffset: undefined
    };
  }

  /**
   * process
   * @param {Section} section 
   * @returns {Promise<Locations>}
   */
  async process(section) {
    return section.load(this.request).then(contents => {
      return this.parse(contents, section.cfiBase);
    });
  }

  /**
   * parse
   * @param {Element} contents 
   * @param {string} cfiBase 
   * @param {number} [chars]
   * @returns {Promise<Locations>}
   */
  async parse(contents, cfiBase, chars) {
    chars = chars || this.break;
    let range;
    let counter = 0;
    let prev;
    const parser = node => {
      const def = new defer();
      if (node.textContent.trim().length === 0) {
        def.resolve(false);
        return def.promise; // continue
      }

      // Start range
      if (counter == 0) {
        range = this.createRange();
        range.startContainer = node;
        range.startOffset = 0;
      }
      const len = node.length;
      let dist = chars - counter;
      let pos = 0;

      // Node is smaller than a break,
      // skip over it
      if (dist > len) {
        counter += len;
        pos = len;
      }
      while (pos < len) {
        dist = chars - counter;
        if (counter === 0) {
          // Start new range
          pos += 1;
          range = this.createRange();
          range.startContainer = node;
          range.startOffset = pos;
        }

        // Gone over
        if (pos + dist >= len) {
          // Continue counter for next node
          counter += len - pos;
          // break
          pos = len;
          // At End
        } else {
          // Advance pos
          pos += dist;
          // End the previous range
          range.endContainer = node;
          range.endOffset = pos;
          const cfi = new src_epubcfi(range, cfiBase).toString();
          const loc = new src_location().set({
            cfi
          });
          this.set(cfi, loc);
          counter = 0;
        }
      }
      prev = node;
      def.resolve(true);
      return def.promise;
    };
    const doc = contents.ownerDocument;
    const body = qs(doc, "body");
    return this.treeWalker(body, parser).then(() => {
      // Close remaining
      if (range && range.startContainer && prev) {
        range.endContainer = prev;
        range.endOffset = prev.length;
        const cfi = new src_epubcfi(range, cfiBase).toString();
        const loc = new src_location().set({
          cfi
        });
        this.set(cfi, loc);
        counter = 0;
      }
      return this;
    });
  }

  /**
   * treeWalker
   * @param {Node} root 
   * @param {function} func 
   * @returns {Promise<any>}
   * @private
   */
  treeWalker(root, func) {
    const what = NodeFilter.SHOW_TEXT;
    const task = document.createTreeWalker(root, what);
    const tasks = [];
    while (task.nextNode()) {
      tasks.push(func(task.currentNode));
    }
    return Promise.all(tasks);
  }

  /**
   * Get a location from an EpubCFI
   * @param {string|EpubCFI} value EpubCFI
   * @return {number} Location index or -1 otherwise
   */
  locationFromCfi(value) {
    if (this.size === 0) return -1;
    const cfi = new src_epubcfi(value);
    const arr = [...this.keys()];
    const ind = locationOf(cfi, arr, cfi.compare);
    const max = this.size - 1;
    return ind > max ? -1 : ind;
  }

  /**
   * Get a percentage position in locations from an EpubCFI
   * @param {string|EpubCFI} cfi EpubCFI
   * @return {number} Percentage
   */
  percentageFromCfi(cfi) {
    if (this.size === 0) {
      return 0;
    }
    // Find closest cfi
    const index = this.locationFromCfi(cfi);
    // Get percentage in total
    return this.percentageFromLocation(index);
  }

  /**
   * Get a percentage position from a location index
   * @param {number} index Location index
   * @return {number} Percentage
   */
  percentageFromLocation(index) {
    if (this.size === 0 || this.size >= index && index < 0) {
      return 0;
    }
    const len = this.size === 1 ? 1 : this.size - 1;
    return index / len;
  }

  /**
   * Get an EpubCFI from location index
   * @param {number} index Location index
   * @return {string|null} EpubCFI string format
   */
  cfiFromLocation(index) {
    if (this.size === 0 || this.size >= index && index < 0) {
      return null;
    }
    return [...this.keys()][index];
  }

  /**
   * Get an EpubCFI from location percentage
   * @param {number} value Percentage in ranging from 0 to 1
   * @return {string|null} EpubCFI string format
   */
  cfiFromPercentage(value) {
    let ret,
      max = this.size - 1;
    if (value >= 0 && value <= 1) {
      const index = Math.round(max * value);
      ret = this.cfiFromLocation(index);
    } else {
      const cfi = new src_epubcfi([...this.keys()][max]);
      cfi.collapse();
      ret = cfi.toString();
      console.warn("Recommended a normalize value to between 0 - 1");
    }
    return ret;
  }

  /**
   * Load locations from JSON
   * @param {string} locations
   * @returns {Locations}
   */
  load(locations) {
    if (typeof locations === "string") {
      this.clear();
      const data = JSON.parse(locations);
      data.items.forEach(i => this.set(i.cfi, i));
      this.break = data.break;
      this.pause = data.pause;
      this.current.set(this.get(data.idref));
    } else {
      console.error("Invalid argument type");
    }
    return this;
  }

  /**
   * Save locations to JSON
   * @return {string} A JSON string
   */
  save() {
    return JSON.stringify({
      items: [...this.values()],
      idref: this.current.cfi,
      break: this.break,
      pause: this.pause
    });
  }

  /**
   * Set current location
   * @param {object} [options]
   * @param {string} [options.cfi] EpubCFI string format
   * @param {number} [options.index] Location index
   * @param {number} [options.percentage] Percentage
   * @returns {Locations}
   */
  set(options) {
    if (arguments.length === 2) {
      super.set(arguments[0], arguments[1]);
      return this;
    } else if (this.size === 0) {
      return this;
    }
    Object.keys(options || {}).forEach(opt => {
      const value = options[opt];
      if (this.current[opt] === value || typeof value === "undefined") {
        delete options[opt];
      } else if (typeof value === "string") {
        if (opt === "cfi" && src_epubcfi.prototype.isCfiString(value)) {
          const ind = this.locationFromCfi(value);
          const loc = [...this.values()][ind];
          if (loc) {
            this.current.set(loc);
          } else {
            delete options[opt];
          }
        }
      } else if (typeof value === "number") {
        if (opt === "index") {
          const cfi = this.cfiFromLocation(value);
          const loc = this.get(cfi);
          if (loc) {
            this.current.set(loc);
          } else {
            delete options[opt];
          }
        } else if (opt === "percentage") {
          const cfi = this.cfiFromPercentage(value);
          const loc = this.get(cfi);
          if (loc) {
            this.current.set(loc);
          } else {
            delete options[opt];
          }
        }
      } else {
        console.error("Invalid value type to " + opt);
      }
    });
    if (Object.keys(options || {}).length) {
      const {
        ...current
      } = this.current;
      /**
       * Current location changed
       * @event changed
       * @param {object} current Current location
       * @param {object} changed Changed properties
       * @memberof Locations
       */
      this.emit(EVENTS.LOCATIONS.CHANGED, current, options);
    }
    return this;
  }

  /**
   * clear locations
   */
  clear() {
    super.clear();
    this.current.cfi = null;
    this.current.index = -1;
    this.current.percentage = 0;
  }

  /**
   * destroy
   */
  destroy() {
    this.clear();
    this.pause = undefined;
    this.break = undefined;
    this.current = undefined;
    this.request = undefined;
    this.q.stop();
    this.q = undefined;
    this.sections = undefined;
    this.generated = undefined;
  }
}
event_emitter_default()(Locations.prototype);
/* harmony default export */ const locations = (Locations);
;// ./src/container.js






/**
 * Parsing the Epub Container
 * @link https://www.w3.org/TR/epub/#sec-container-metainf
 */
class Container {
  /**
   * Constructor
   */
  constructor() {
    /**
     * @member {string} directory Package directory
     * @memberof Container
     * @readonly
     */
    this.directory = "";
    /**
     * @member {string} fullPath Path to package file
     * @memberof Container
     * @readonly
     */
    this.fullPath = "";
    /**
     * @member {string} encoding Encoding
     * @memberof Container
     * @readonly
     */
    this.encoding = "";
    /**
     * @member {string} mediaType Media type
     * @memberof Container
     * @readonly
     */
    this.mediaType = "";
    /**
     * @member {string} version
     * @memberof Container
     * @readonly
     */
    this.version = "";
  }

  /**
   * Clear parts
   */
  clear() {
    this.directory = "";
    this.fullPath = "";
    this.encoding = "";
    this.mediaType = "";
    this.version = "";
  }

  /**
   * Parse the Container XML
   * @param {Document} doc
   * @returns {Promise<Container>}
   */
  parse(doc) {
    if (!doc) {
      throw new Error("Container File Not Found");
    }
    const container = qs(doc, "container");
    if (!container) {
      throw new Error("container node not found");
    }
    const rootfile = qs(doc, "rootfile");
    if (!rootfile) {
      throw new Error("rootfile node not found");
    }
    this.fullPath = rootfile.getAttribute("full-path");
    this.directory = utils_path.prototype.dirname(this.fullPath);
    this.encoding = doc.characterSet;
    this.mediaType = rootfile.getAttribute("media-type");
    this.version = container.getAttribute("version");
    return Promise.resolve(this);
  }

  /**
   * Load a container from JSON
   * @param {object} container 
   * @returns {Promise<Container>}
   */
  load(container) {
    Object.keys(container).forEach(p => {
      switch (p) {
        case "directory":
          this.directory = container[p];
          break;
        case "encoding":
          this.encoding = container[p];
          break;
        case "full-path":
          this.fullPath = container[p];
          break;
        case "media-type":
          this.mediaType = container[p];
          break;
        case "version":
          this.version = container[p];
          break;
      }
    });
    return Promise.resolve(this);
  }

  /**
   * destroy
   */
  destroy() {
    this.directory = undefined;
    this.encoding = undefined;
    this.fullPath = undefined;
    this.mediaType = undefined;
    this.version = undefined;
  }
}
/* harmony default export */ const container = (Container);
;// ./src/packaging/metadata.js

















/**
 * Metadata class
 * @extends {Map}
 */
class Metadata extends Map {
  constructor() {
    super();
  }

  /**
   * Parse the metadata node
   * @param {Node} node metadata
   * @returns {Promise<Metadata>}
   */
  parse(node) {
    const items = [...node.children];
    items.forEach(item => {
      if (item.nodeName === "meta") {
        this.parseMeta(item);
      } else if (/dc:/.test(item.nodeName)) {
        // dc:title
        // dc:creator
        // dc:coverage
        // dc:contributor
        // dc:description
        // dc:publisher
        // dc:identifier
        // dc:language
        // dc:relation
        // dc:subject
        // dc:format
        // dc:rights
        // dc:source
        // dc:date
        // dc:type
        const key = item.nodeName.substring(3);
        this.set(key, item.textContent);
      }
    });
    return Promise.resolve(this);
  }

  /**
   * Parse the meta node
   * @param {Node} item 
   * @returns {void}
   * @private
   */
  parseMeta(item) {
    const prop = item.getAttribute("property");
    if (typeof prop === "undefined" || typeof prop !== "string") {
      return;
    } else if (/rendition:/.test(prop)) {
      // rendition:layout
      // rendition:spread
      // rendition:flow
      // rendition:viewport
      // rendition:orientation
      const key = prop.substring(10);
      this.set(key, item.textContent);
    } else if (/dcterms:/.test(prop)) {
      // dcterms:modified
      const key = prop.substring(8);
      this.set(key, item.textContent);
    } else if (/media:/.test(prop)) {
      // media:active-class
      // media:duration
      // media:narrator
      // media:playback-active-class
      this.set(prop, item.textContent);
    }
  }

  /**
   * Load metadata from JSON
   * @param {object} metadata 
   * @returns {Promise<Metadata>}
   */
  load(metadata) {
    Object.keys(metadata).forEach(prop => {
      this.set(prop, metadata[prop]);
    });
    return Promise.resolve(this);
  }

  /**
   * destroy
   */
  destroy() {
    this.clear();
  }
}
/* harmony default export */ const metadata = (Metadata);
;// ./src/packaging/manifest.js



















/**
 * Manifest class
 * @extends {Map}
 */
class Manifest extends Map {
  constructor() {
    super();
    /**
     * @member {string} navPath
     * @memberof Manifest
     * @readonly
     */
    this.navPath = null;
    /**
     * @member {string} coverPath
     * @memberof Manifest
     * @readonly
     */
    this.coverPath = null;
  }

  /**
   * Clear manifest
   */
  clear() {
    super.clear();
    this.navPath = null;
    this.coverPath = null;
  }

  /**
   * Parse the manifest node
   * @param {Node} node manifest
   * @returns {Promise<Manifest>}
   */
  parse(node) {
    const items = [...node.children];
    items.forEach(item => {
      const props = item.getAttribute("properties");
      const entry = {
        "id": item.getAttribute("id"),
        "href": item.getAttribute("href") || "",
        "media-type": item.getAttribute("media-type") || "",
        "media-overlay": item.getAttribute("media-overlay") || "",
        "properties": props ? props.split(" ") : []
      };
      this.set(entry.id, entry);
      if (this.navPath === null && (props === "nav" || entry["media-type"] === "application/x-dtbncx+xml")) {
        this.navPath = entry.href;
      }
      if (this.coverPath === null && props === "cover-image") {
        this.coverPath = entry.href;
      }
    });
    if (this.coverPath === null) {
      this.coverPath = this.findCoverPath(node);
    }
    return Promise.resolve(this);
  }

  /**
   * Find the Cover Path for Epub 2.0
   * @param {Node} node manifest node
   * @return {string} href
   * @private
   */
  findCoverPath(node) {
    const doc = node.ownerDocument;
    const meta = qsp(doc, "meta", {
      name: "cover"
    });
    if (meta) {
      const id = meta.getAttribute("content");
      const item = doc.getElementById(id);
      return item ? item.getAttribute("href") : null;
    }
    return null;
  }

  /**
   * Load manifest from JSON
   * @param {object[]} manifest 
   * @returns {Promise<Manifest>}
   */
  load(manifest) {
    manifest.forEach(item => {
      for (const prop of item.properties) {
        switch (prop) {
          case "nav":
            this.navPath = item.href;
            break;
          case "cover-image":
            this.coverPath = item.href;
            break;
        }
      }
      this.set(item.id, item);
    });
    return Promise.resolve(this);
  }

  /**
   * destroy
   */
  destroy() {
    this.clear();
    this.navPath = undefined;
    this.coverPath = undefined;
  }
}
/* harmony default export */ const manifest = (Manifest);
;// ./src/packaging/spine.js



















/**
 * A collection of Spine Items
 * @extends {Map}
 */
class Spine extends Map {
  constructor() {
    super();
    /**
     * Node index from the package.opf
     * @member {number} nodeIndex
     * @memberof Spine
     * @readonly
     */
    this.nodeIndex = 0;
  }

  /**
   * Clear spine items
   */
  clear() {
    super.clear();
    this.nodeIndex = 0;
  }

  /**
   * Parse element spine
   * @param {Node} node spine
   * @returns {Promise<Spine>}
   */
  parse(node) {
    const items = [...node.children];
    items.forEach((item, index) => {
      const idref = item.getAttribute("idref");
      const props = item.getAttribute("properties");
      const entry = {
        id: item.getAttribute("id"),
        idref: idref,
        index: index,
        linear: item.getAttribute("linear") || "yes",
        properties: props ? props.split(" ") : []
      };
      this.set(idref, entry);
    });
    this.nodeIndex = indexOfNode(node, Node.ELEMENT_NODE);
    return Promise.resolve(this);
  }

  /**
   * Load spine from JSON
   * @param {object[]} spine 
   * @returns {Promise<Spine>}
   */
  load(spine) {
    spine.forEach((item, index) => {
      this.set(item.idref, {
        id: item.id || null,
        idref: item.idref,
        index: index,
        linear: item.linear,
        properties: item.properties
      });
    });
    this.nodeIndex = 0;
    return Promise.resolve(this);
  }

  /**
   * destroy
   */
  destroy() {
    this.clear();
    this.nodeIndex = undefined;
  }
}
/* harmony default export */ const spine = (Spine);
;// ./src/packaging.js






/**
 * Open Packaging Format Parser
 */
class Packaging {
  /**
   * Constructor
   */
  constructor() {
    /**
     * @member {Metadata} metadata
     * @memberof Packaging
     * @readonly
     */
    this.metadata = new metadata();
    /**
     * @member {Manifest} manifest
     * @memberof Packaging
     * @readonly
     */
    this.manifest = new manifest();
    /**
     * @member {Spine} spine
     * @memberof Packaging
     * @readonly
     */
    this.spine = new spine();
    /**
     * @member {string} direction
     * @memberof Packaging
     * @readonly
     */
    this.direction = null;
    /**
     * @member {string} version Package version
     * @memberof Packaging
     * @readonly
     */
    this.version = null;
    /**
     * @member {string} uniqueIdentifier
     * @memberof Packaging
     * @readonly
     */
    this.uniqueIdentifier = null;
  }

  /**
   * Clear packaging parts
   */
  clear() {
    this.metadata.clear();
    this.manifest.clear();
    this.spine.clear();
    this.direction = null;
    this.version = null;
    this.uniqueIdentifier = null;
  }

  /**
   * Parse OPF XML
   * @param {Document} packageXml OPF XML
   * @return {Promise<Packaging>}
   */
  async parse(packageXml) {
    if (!packageXml) {
      throw new Error("Package File Not Found");
    }
    const metadataNode = qs(packageXml, "metadata");
    if (!metadataNode) {
      throw new Error("No Metadata Found");
    }
    const manifestNode = qs(packageXml, "manifest");
    if (!manifestNode) {
      throw new Error("No Manifest Found");
    }
    const spineNode = qs(packageXml, "spine");
    if (!spineNode) {
      throw new Error("No Spine Found");
    }
    const tasks = [];
    tasks.push(this.metadata.parse(metadataNode));
    tasks.push(this.manifest.parse(manifestNode));
    tasks.push(this.spine.parse(spineNode));
    this.direction = this.parseDirection(packageXml, spineNode);
    this.version = this.parseVersion(packageXml);
    this.uniqueIdentifier = this.metadata.get("identifier");
    if (typeof this.uniqueIdentifier === "undefined") {
      this.uniqueIdentifier = this.findUniqueIdentifier(packageXml);
    }
    return Promise.all(tasks).then(() => {
      return this;
    });
  }

  /**
   * Parse direction flow
   * @param {Document} packageXml
   * @param {Node} node spine node 
   * @returns {string}
   * @private
   */
  parseDirection(packageXml, node) {
    const el = packageXml.documentElement;
    let dir = el.getAttribute("dir");
    if (dir === null) {
      dir = node.getAttribute("page-progression-direction");
    }
    return dir || "";
  }

  /**
   * Parse package version
   * @param {Document} packageXml 
   * @returns {string}
   * @private
   */
  parseVersion(packageXml) {
    const el = packageXml.documentElement;
    return el.getAttribute("version") || "";
  }

  /**
   * Find Unique Identifier
   * @param {Document} packageXml
   * @return {string} Unique Identifier text
   * @private
   */
  findUniqueIdentifier(packageXml) {
    const el = packageXml.documentElement;
    const uniqueIdentifier = el.getAttribute("unique-identifier");
    if (!uniqueIdentifier) {
      return "";
    }
    const identifier = packageXml.getElementById(uniqueIdentifier);
    if (!identifier) {
      return "";
    }
    if (identifier.localName === "identifier" && identifier.namespaceURI === "http://purl.org/dc/elements/1.1/") {
      return identifier.childNodes.length > 0 ? identifier.childNodes[0].nodeValue.trim() : "";
    }
    return "";
  }

  /**
   * Load package from JSON
   * @param {object} data Serialized JSON object data
   * @return {Promise<Packaging>}
   */
  async load(data) {
    const tasks = [];
    tasks.push(this.metadata.load(data.metadata));
    tasks.push(this.manifest.load(data.manifest));
    tasks.push(this.spine.load(data.spine));
    this.direction = data.direction;
    this.version = data.version;
    this.uniqueIdentifier = this.metadata.get("identifier");
    return Promise.all(tasks).then(() => {
      return this;
    });
  }

  /**
   * destroy
   */
  destroy() {
    this.metadata.destroy();
    this.manifest.destroy();
    this.spine.destroy();
    this.metadata = undefined;
    this.manifest = undefined;
    this.spine = undefined;
    this.direction = undefined;
    this.version = undefined;
    this.uniqueIdentifier = undefined;
  }
}
/* harmony default export */ const packaging = (Packaging);
;// ./src/navigation/landmarks.js



















/**
 * Landmarks Parser
 * @link https://www.w3.org/TR/epub/#sec-nav-landmarks
 * @extends {Map}
 */
class Landmarks extends Map {
  /**
   * Constructor
   */
  constructor() {
    super();
  }

  /**
   * Parse Landmarks
   * @param {Node|object[]} target nav
   * @returns {Promise<Landmarks>}
   */
  parse(target) {
    if (Array.isArray(target)) {
      this.load(target);
    } else if (target.nodeName === "nav") {
      this.parseNav(target);
    }
    return new Promise((resolve, reject) => {
      resolve(this);
    });
  }

  /**
   * Parse landmarks from a Epub >= 3.0 Nav
   * @param {Node} node nav
   * @private
   */
  parseNav(node) {
    const navItems = node ? qsa(node, "li") : [];
    navItems.forEach(item => {
      const entry = this.navItem(item);
      if (entry) {
        this.set(entry.type, entry);
      }
    });
  }

  /**
   * Create a LandmarkItem
   * @param {Node} node li
   * @return {object|null} LandmarkItem
   * @private
   */
  navItem(node) {
    const link = filterChildren(node, "a", true);
    if (!link) return null;
    const type = link.getAttribute("epub:type");
    const href = link.getAttribute("href") || "";
    if (!type) return null;
    return {
      type,
      href,
      label: link.textContent || ""
    };
  }

  /**
   * Load Landmarks from JSON
   * @param {object[]} items Serialized items
   * @private
   */
  load(items) {
    items.forEach(item => {
      this.set(item.type, item);
    });
  }

  /**
   * destroy
   */
  destroy() {
    this.clear();
  }
}
/* harmony default export */ const landmarks = (Landmarks);
;// ./src/navigation/pagelist.js







/**
 * Page List Parser
 * @link https://www.w3.org/TR/epub/#sec-nav-pagelist
 * @extends {Array}
 */
class PageList extends Array {
  /**
   * Constructor
   */
  constructor() {
    super();
    this.epubcfi = new src_epubcfi();
    /**
     * Page indexes
     * @member {number[]} pages
     * @memberof PageList
     * @readonly
     */
    this.pages = [];
    /**
     * @member {string[]} locations
     * @memberof PageList
     * @readonly
     */
    this.locations = [];
    /**
     * @member {number} firstPage
     * @memberof PageList
     * @readonly
     */
    this.firstPage = 0;
    /**
     * @member {number} lastPage
     * @memberof PageList
     * @readonly
     */
    this.lastPage = 0;
    /**
     * @member {number} totalPages
     * @memberof PageList
     * @readonly
     */
    this.totalPages = 0;
  }

  /**
   * Parse Page List
   * @param {Node|object[]} target
   * @returns {Promise<PageList>}
   */
  parse(target) {
    if (Array.isArray(target)) {
      this.load(target);
    } else if (target.nodeName === "nav") {
      this.parseNav(target);
    } else if (target.nodeName === "pageList") {
      this.parseNcx(target);
    }
    if (this.length) {
      this.process();
    }
    return new Promise((resolve, reject) => {
      resolve(this);
    });
  }

  /**
   * Parse page-list from a Epub >= 3.0 Nav
   * @param {Node} node nav
   * @private
   */
  parseNav(node) {
    const navItems = node ? qsa(node, "li") : [];
    navItems.forEach(item => {
      this.push(this.navItem(item));
    });
  }

  /**
   * Create navItem
   * @param {Node} node li
   * @return {object} PageList item
   * @private
   */
  navItem(node) {
    const content = qs(node, "a");
    const href = content.getAttribute("href") || "";
    const text = content.textContent || "";
    const page = parseInt(text);
    if (href.indexOf("epubcfi") !== -1) {
      const split = href.split("#");
      return {
        cfi: split.length > 1 ? split[1] : null,
        packageUrl: split[0],
        href,
        page
      };
    } else {
      return {
        href,
        page
      };
    }
  }

  /**
   * parseNcx
   * @param {Node} node pageList
   * @private
   */
  parseNcx(node) {
    const pageTargets = qsa(node, "pageTarget") || [];
    pageTargets.forEach(item => {
      this.push(this.ncxItem(item));
    });
  }

  /**
   * Create ncxItem
   * @param {Node} node pageTarget
   * @returns {object}
   * @private
   */
  ncxItem(node) {
    const navLabel = qs(node, "navLabel");
    const navLabelText = qs(navLabel, "text");
    const pageText = navLabelText.textContent;
    const content = qs(node, "content");
    return {
      href: content.getAttribute("src"),
      page: parseInt(pageText, 10)
    };
  }

  /**
   * Process pageList items
   * @private
   */
  process() {
    this.forEach(item => {
      this.pages.push(item.page);
      if (item.cfi) {
        this.locations.push(item.cfi);
      }
    }, this);
    this.firstPage = parseInt(this.pages[0]);
    this.lastPage = parseInt(this.pages[this.pages.length - 1]);
    this.totalPages = this.lastPage - this.firstPage;
  }

  /**
   * Get a page index from a EpubCFI
   * @param {string} cfi EpubCFI
   * @return {number} Page index
   */
  pageFromCfi(cfi) {
    // Check if the pageList has not been set yet
    if (this.locations.length === 0) {
      return -1;
    }
    // TODO: check if CFI is valid?

    // check if the cfi is in the location list
    let pg,
      index = indexOfSorted(cfi, this.locations, this.epubcfi.compare);
    if (index != -1) {
      pg = this.pages[index];
    } else {
      // Otherwise add it to the list of locations
      // Insert it in the correct position in the locations page
      index = locationOf(cfi, this.locations, this.epubcfi.compare);
      // Get the page at the location just before the new one, or return the first
      pg = index - 1 >= 0 ? this.pages[index - 1] : this.pages[0];
      if (pg !== undefined) {
        // Add the new page in so that the locations and page array match up
        //this.pages.splice(index, 0, pg);
      } else {
        pg = -1;
      }
    }
    return pg;
  }

  /**
   * Get a EpubCFI by Page index
   * @param {string|number} pg Page index
   * @return {string|null} cfi
   */
  cfiFromPage(pg) {
    // check that pg is an int
    if (typeof pg !== "number") {
      pg = parseInt(pg);
    }

    // check if the cfi is in the page list
    // Pages could be unsorted.
    const index = this.pages.indexOf(pg);
    let cfi = null;
    if (index !== -1) {
      cfi = this.locations[index];
    }
    // TODO: handle pages not in the list
    return cfi;
  }

  /**
   * Get a Page index from Book percentage
   * @param {number} value Percentage
   * @return {number} Page index
   */
  pageFromPercentage(value) {
    return Math.round(this.totalPages * value);
  }

  /**
   * Returns a value between 0 - 1 corresponding to the location of a page
   * @param {number} pg the page
   * @return {number} Percentage
   */
  percentageFromPage(pg) {
    const percentage = (pg - this.firstPage) / this.totalPages;
    return Math.round(percentage * 1000) / 1000;
  }

  /**
   * Returns a value between 0 - 1 corresponding to the location of a cfi
   * @param {string} cfi EpubCFI
   * @return {number} Percentage
   */
  percentageFromCfi(cfi) {
    const pg = this.pageFromCfi(cfi);
    const percentage = this.percentageFromPage(pg);
    return percentage;
  }

  /**
   * Load PageList from JSON
   * @param {object[]} items Serialized JSON data items
   * @private
   */
  load(items) {
    items.forEach(item => {
      this.push(item);
    });
  }

  /**
   * Clear PageList
   */
  clear() {
    if (this.length) {
      this.splice(0);
      this.pages.splice(0);
      this.locations.splice(0);
      this.firstPage = 0;
      this.lastPage = 0;
      this.totalPages = 0;
    }
  }

  /**
   * Destroy
   */
  destroy() {
    this.clear();
    this.pages = undefined;
    this.locations = undefined;
    this.firstPage = undefined;
    this.lastPage = undefined;
    this.totalPages = undefined;
    this.epubcfi = undefined;
  }
}
/* harmony default export */ const pagelist = (PageList);
;// ./src/navigation/toc.js




















/**
 * Table Of Contents Parser
 * @link https://www.w3.org/TR/epub/#sec-nav-toc
 * @extends {Array}
 */
class Toc extends Array {
  /**
   * Constructor
   */
  constructor() {
    super();
    /**
     * @member {Map} links
     * @memberof Toc
     * @readonly
     */
    this.links = new Map();
  }

  /**
   * Get navigation item by href
   * @param {string} target
   * @return {object} navItem
   * @example toc.get("chapter_001.xhtml")
   */
  get(target) {
    const arr = target.split("/");
    const key = arr.length ? arr[arr.length - 1] : target;
    return this.links.get(target) || this.links.get(key);
  }

  /**
   * Parse out the toc items
   * @param {Node|object[]} target 
   * @returns {Promise<Toc>}
   */
  parse(target) {
    if (Array.isArray(target)) {
      this.load(target);
    } else if (target.nodeName === "nav") {
      this.parseNav(target);
    } else if (target.nodeName === "navMap") {
      this.parseNcx(target);
    }
    return new Promise(resolve => {
      resolve(this);
    });
  }

  /**
   * Parse toc from a Epub >= 3.0 Nav
   * @param {Node} nav
   * @param {object[]} [toc=null]
   * @param {string} [parentId=null] 
   * @private
   */
  parseNav(nav, toc = null, parentId = null) {
    const navList = filterChildren(nav, "ol", true);
    if (!navList) return;
    if (!navList.children) return;
    const len = navList.children.length;
    const items = toc || this;
    for (let i = 0; i < len; i++) {
      const child = navList.children[i];
      if (child.nodeName !== "li") continue;
      const item = this.navItem(child, navList);
      if (item) {
        item.parentId = parentId;
        items.push(item);
        this.parseNav(child, item.subitems, item.id); // recursive call
      }
    }
  }

  /**
   * Create a navItem
   * @param {Node} node
   * @return {object|null} navItem
   * @private
   */
  navItem(node) {
    const link = qs(node, "a") || qs(node, "span");
    if (!link) return null;
    const href = link.getAttribute("href");
    const harr = href.split("#");
    const hash = harr.length === 2 ? harr[1] : "";
    const id = node.getAttribute("id") || hash || href;
    const label = link.textContent || "";
    const entry = {
      id,
      href,
      bind: harr[0],
      label,
      parentId: null,
      subitems: []
    };
    this.links.set(href, entry);
    return entry;
  }

  /**
   * Parse from a Epub 2 NCX
   * @link https://www.w3.org/TR/epub/#sec-opf2-ncx
   * @param {Node} node navMap
   * @param {object[]} [toc=null]
   * @param {string} [parentId=null] 
   * @private
   */
  parseNcx(node, toc = null, parentId = null) {
    if (!node.children) return;
    const len = node.children.length;
    const items = toc || this;
    for (let i = 0; i < len; ++i) {
      const child = node.children[i];
      if (child.nodeName !== "navPoint") continue;
      const item = this.ncxItem(child);
      item.parentId = parentId;
      items.push(item);
      this.parseNcx(child, item.subitems, item.id); // recursive call
    }
  }

  /**
   * Create a ncxItem
   * @param {Node} node navPoint
   * @return {object} ncxItem
   * @private
   */
  ncxItem(node) {
    const content = qs(node, "content");
    const navLabel = qs(node, "navLabel");
    const href = content.getAttribute("src");
    const harr = href.split("#");
    const hash = harr.length === 2 ? harr[1] : "";
    const id = node.getAttribute("id") || hash || href;
    const label = navLabel.textContent || "";
    const entry = {
      id,
      href,
      bind: harr[0],
      label,
      parentId: null,
      subitems: []
    };
    this.links.set(href, entry);
    return entry;
  }

  /**
   * Load navigation items from JSON
   * @param {object[]} items Serialized JSON items
   * @param {number} [level=0] 
   * @param {string} [parentId=null] 
   * @private
   */
  load(items, level = 0, parentId = null) {
    level += 1;
    items.forEach(item => {
      const href = item.href;
      const harr = href.split("#");
      const hash = harr.length === 2 ? harr[1] : "";
      item.id = item.id || hash || href;
      item.bind = harr[0];
      item.parentId = parentId;
      if (level === 1) {
        this.push(item);
      }
      this.links.set(href, item);
      this.load(item.subitems, level, item.id); // recursive call
    });
  }

  /**
   * Clear navigation items
   */
  clear() {
    if (this.length) {
      this.links.clear();
      this.splice(0);
    }
  }

  /**
   * destroy
   */
  destroy() {
    this.clear();
    this.links = undefined;
  }
}
/* harmony default export */ const toc = (Toc);
;// ./src/navigation.js









/**
 * Navigation Parser
 * @link https://www.w3.org/TR/epub/#sec-nav
 */
class Navigation {
  /**
   * Constructor
   */
  constructor() {
    /**
     * Landmarks
     * @member {Landmarks} landmarks
     * @memberof Navigation
     * @readonly
     */
    this.landmarks = new landmarks();
    /**
     * List of numbered pages
     * @member {PageList} pageList
     * @memberof Navigation
     * @readonly
     */
    this.pageList = new pagelist();
    /**
     * Table of Contents
     * @member {Toc} toc
     * @memberof Navigation
     * @readonly
     */
    this.toc = new toc();
  }

  /**
   * Clear all navigation parts
   */
  clear() {
    this.landmarks.clear();
    this.pageList.clear();
    this.toc.clear();
  }

  /**
   * Parse navigation document
   * @param {Document} doc html OR xhtml OR ncx
   * @returns {Promise<Navigation>}
   */
  async parse(doc) {
    const tasks = [];
    const element = doc.documentElement;
    if (element.tagName === "html") {
      const items = qsa(doc, "nav");
      items.forEach(nav => {
        const type = nav.getAttribute("epub:type");
        switch (type) {
          case "landmarks":
            tasks.push(this.landmarks.parse(nav));
            break;
          case "page-list":
            tasks.push(this.pageList.parse(nav));
            break;
          case "toc":
            tasks.push(this.toc.parse(nav));
            break;
        }
      });
    } else if (element.tagName === "ncx") {
      const items = [...element.children];
      items.forEach(item => {
        switch (item.tagName) {
          case "navMap":
            tasks.push(this.toc.parse(item));
            break;
          case "pageList":
            tasks.push(this.pageList.parse(item));
            break;
        }
      });
    }
    return Promise.all(tasks).then(() => {
      return this;
    });
  }

  /**
   * Load navigation object from JSON
   * @param {object} data 
   * @returns {Promise<Navigation>}
   */
  async load(data) {
    const tasks = [];
    tasks.push(this.landmarks.parse(data["landmarks"] || []));
    tasks.push(this.pageList.parse(data["page-list"] || []));
    tasks.push(this.toc.parse(data["toc"] || []));
    return Promise.all(tasks).then(() => {
      return this;
    });
  }

  /**
   * forEach pass through
   * @param {IArguments} args
   */
  forEach(...args) {
    this.toc.forEach(...args);
  }

  /**
   * destroy
   */
  destroy() {
    this.clear();
    this.landmarks.destroy();
    this.landmarks = undefined;
    this.pageList.destroy();
    this.pageList = undefined;
    this.toc.destroy();
    this.toc = undefined;
  }
}
/* harmony default export */ const navigation = (Navigation);
;// ./src/utils/replacements.js






/**
 * @module replacements
 */



/**
 * replaceBase
 * @param {Document} doc 
 * @param {Section} section 
 */
const replaceBase = (doc, section) => {
  if (!doc) return;
  let head = qs(doc, "head");
  let base = qs(head, "base");
  if (!base) {
    base = doc.createElement("base");
    head.insertBefore(base, head.firstChild);
  }
  let url = section.url;
  const absolute = url.indexOf("://") > -1;
  if (!absolute) {
    const uri = new URL(url, doc.baseURI);
    url = uri.href;
  }
  base.setAttribute("href", url);
};

/**
 * replaceCanonical
 * @param {Document} doc 
 * @param {Section} section 
 */
const replaceCanonical = (doc, section) => {
  if (!doc) return;
  let url = section.canonical;
  let head = qs(doc, "head");
  let link = qs(head, "link[rel='canonical']");
  if (link) {
    link.setAttribute("href", url);
  } else {
    link = doc.createElement("link");
    link.setAttribute("rel", "canonical");
    link.setAttribute("href", url);
    head.appendChild(link);
  }
};

/**
 * replaceMeta
 * @param {Document} doc 
 * @param {Section} section 
 */
const replaceMeta = (doc, section) => {
  if (!doc) return;
  let head = qs(doc, "head");
  let meta = qs(head, "link[property='dc.identifier']");
  if (meta) {
    meta.setAttribute("content", section.idref);
  } else {
    meta = doc.createElement("meta");
    meta.setAttribute("name", "dc.identifier");
    meta.setAttribute("content", section.idref);
    head.appendChild(meta);
  }
};

/**
 * replaceLinks
 * @param {Node} contents 
 * @param {function} fn 
 * @todo move me to Contents
 */
const replaceLinks = (contents, fn) => {
  const links = contents.querySelectorAll("a[href]");
  if (!links.length) return;
  const replaceLink = link => {
    const href = link.getAttribute("href");
    if (href.indexOf("mailto:") === 0) {
      return;
    }
    if (href.indexOf("://") > -1) {
      // is absolute
      link.setAttribute("target", "_blank");
    } else {
      link.onclick = e => {
        fn(href);
        return false;
      };
    }
  };
  for (let i = 0; i < links.length; i++) {
    replaceLink(links[i]);
  }
};
const relative = (p1, p2) => {
  const arr = p1.split("/");
  let result = "";
  for (let i = 1; i < arr.length; ++i) {
    result += "../";
  }
  return result + p2;
};

/**
 * substitute
 * @param {string} content 
 * @param {string[]} urls 
 * @param {string[]} replacements 
 */
const substitute = (content, section, urls, replacements) => {
  urls.forEach((url, i) => {
    if (url && replacements[i]) {
      // Account for special characters in the file name.
      // See https://stackoverflow.com/a/6318729.
      url = relative(section.href, url);
      url = url.replace(/[-[\]{}()*+?.,\\^$|#\s]/g, "\\$&");
      content = content.replace(new RegExp(url, "g"), replacements[i]);
    }
  });
  return content;
};
;// ./src/utils/mime.js
/**
 * @module mime
 */

/**
 * From Zip.js, by Gildas Lormeau edited down
 * @private
 */
const table = {
  "application": {
    "ecmascript": ["es", "ecma"],
    "javascript": "js",
    "ogg": "ogx",
    "pdf": "pdf",
    "postscript": ["ps", "ai", "eps", "epsi", "epsf", "eps2", "eps3"],
    "rdf+xml": "rdf",
    "smil": ["smi", "smil"],
    "xhtml+xml": ["xhtml", "xht"],
    "xml": ["xml", "xsl", "xsd", "opf", "ncx"],
    "zip": "zip",
    "x-httpd-eruby": "rhtml",
    "x-latex": "latex",
    "x-maker": ["frm", "maker", "frame", "fm", "fb", "book", "fbdoc"],
    "x-object": "o",
    "x-shockwave-flash": ["swf", "swfl"],
    "x-silverlight": "scr",
    "epub+zip": "epub",
    "font-tdpfr": "pfr",
    "inkml+xml": ["ink", "inkml"],
    "json": "json",
    "jsonml+json": "jsonml",
    "mathml+xml": "mathml",
    "metalink+xml": "metalink",
    "mp4": "mp4s",
    // "oebps-package+xml" : "opf",
    "omdoc+xml": "omdoc",
    "oxps": "oxps",
    "vnd.amazon.ebook": "azw",
    "widget": "wgt",
    // "x-dtbncx+xml" : "ncx",
    "x-dtbook+xml": "dtb",
    "x-dtbresource+xml": "res",
    "x-font-bdf": "bdf",
    "x-font-ghostscript": "gsf",
    "x-font-linux-psf": "psf",
    "x-font-otf": "otf",
    "x-font-pcf": "pcf",
    "x-font-snf": "snf",
    "x-font-ttf": ["ttf", "ttc"],
    "x-font-type1": ["pfa", "pfb", "pfm", "afm"],
    "x-font-woff": "woff",
    "x-mobipocket-ebook": ["prc", "mobi"],
    "x-mspublisher": "pub",
    "x-nzb": "nzb",
    "x-tgif": "obj",
    "xaml+xml": "xaml",
    "xml-dtd": "dtd",
    "xproc+xml": "xpl",
    "xslt+xml": "xslt",
    "internet-property-stream": "acx",
    "x-compress": "z",
    "x-compressed": "tgz",
    "x-gzip": "gz"
  },
  "audio": {
    "flac": "flac",
    "midi": ["mid", "midi", "kar", "rmi"],
    "mpeg": ["mpga", "mpega", "mp2", "mp3", "m4a", "mp2a", "m2a", "m3a"],
    "mpegurl": "m3u",
    "ogg": ["oga", "ogg", "spx"],
    "x-aiff": ["aif", "aiff", "aifc"],
    "x-ms-wma": "wma",
    "x-wav": "wav",
    "adpcm": "adp",
    "mp4": "mp4a",
    "webm": "weba",
    "x-aac": "aac",
    "x-caf": "caf",
    "x-matroska": "mka",
    "x-pn-realaudio-plugin": "rmp",
    "xm": "xm",
    "mid": ["mid", "rmi"]
  },
  "image": {
    "gif": "gif",
    "ief": "ief",
    "jpeg": ["jpeg", "jpg", "jpe"],
    "pcx": "pcx",
    "png": "png",
    "svg+xml": ["svg", "svgz"],
    "tiff": ["tiff", "tif"],
    "x-icon": "ico",
    "bmp": "bmp",
    "webp": "webp",
    "x-pict": ["pic", "pct"],
    "x-tga": "tga",
    "cis-cod": "cod"
  },
  "text": {
    "cache-manifest": ["manifest", "appcache"],
    "css": "css",
    "csv": "csv",
    "html": ["html", "htm", "shtml", "stm"],
    "mathml": "mml",
    "plain": ["txt", "text", "brf", "conf", "def", "list", "log", "in", "bas"],
    "richtext": "rtx",
    "tab-separated-values": "tsv",
    "x-bibtex": "bib"
  },
  "video": {
    "mpeg": ["mpeg", "mpg", "mpe", "m1v", "m2v", "mp2", "mpa", "mpv2"],
    "mp4": ["mp4", "mp4v", "mpg4"],
    "quicktime": ["qt", "mov"],
    "ogg": "ogv",
    "vnd.mpegurl": ["mxu", "m4u"],
    "x-flv": "flv",
    "x-la-asf": ["lsf", "lsx"],
    "x-mng": "mng",
    "x-ms-asf": ["asf", "asx", "asr"],
    "x-ms-wm": "wm",
    "x-ms-wmv": "wmv",
    "x-ms-wmx": "wmx",
    "x-ms-wvx": "wvx",
    "x-msvideo": "avi",
    "x-sgi-movie": "movie",
    "x-matroska": ["mpv", "mkv", "mk3d", "mks"],
    "3gpp2": "3g2",
    "h261": "h261",
    "h263": "h263",
    "h264": "h264",
    "jpeg": "jpgv",
    "jpm": ["jpm", "jpgm"],
    "mj2": ["mj2", "mjp2"],
    "vnd.ms-playready.media.pyv": "pyv",
    "vnd.uvvu.mp4": ["uvu", "uvvu"],
    "vnd.vivo": "viv",
    "webm": "webm",
    "x-f4v": "f4v",
    "x-m4v": "m4v",
    "x-ms-vob": "vob",
    "x-smv": "smv"
  }
};
const mime_mimeTypes = (() => {
  const types = {};
  for (const type in table) {
    if (table.hasOwnProperty(type)) {
      for (const subtype in table[type]) {
        if (table[type].hasOwnProperty(subtype)) {
          const val = table[type][subtype];
          if (typeof val === "string") {
            types[val] = type + "/" + subtype;
          } else {
            for (let i = 0; i < val.length; i++) {
              types[val[i]] = type + "/" + subtype;
            }
          }
        }
      }
    }
  }
  return types;
})();
const defaultValue = "text/plain";

/**
 * lookup
 * @param {string} filename 
 * @returns {string}
 */
const lookup = filename => {
  let value;
  if (filename) {
    const type = filename.split(".").pop().toLowerCase();
    value = mime_mimeTypes[type];
  }
  return value || defaultValue;
};
/* harmony default export */ const mime = ({
  lookup
});
;// ./src/resources.js


























/**
 * Assets container for URL replacements
 * @extends {Map}
 */
class Resources extends Map {
  /**
   * Constructor
   * @param {Function} request
   * @param {Function} resolve
   * @param {string} [replacements=null]
   */
  constructor(request, resolve, replacements) {
    super();
    this.archive = undefined;
    this.storage = undefined;
    this.request = request;
    this.resolve = resolve;
    this.replacements = replacements || null;
  }

  /**
   * Clear replacement URLs
   * @override
   */
  clear() {
    if (this.replacements === "blobUrl") {
      this.forEach((value, key) => {
        URL.revokeObjectURL(value);
      });
    }
    super.clear();
  }

  /**
   * Create a url to a resource
   * @param {string} href
   * @param {string} [mimeType]
   * @return {Promise<string>} Promise resolves with url string
   */
  async createUrl(href, mimeType) {
    const uri = this.resolve(href); // absolute path
    const url = new utils_url(uri);
    const base64 = this.replacements === "base64";
    if (this.archive) {
      const type = base64 ? "base64" : "blob";
      return this.archive.request(uri, type).then(data => {
        return base64 ? data : URL.createObjectURL(data);
      });
    } else if (base64) {
      return this.request(uri, "blob").then(blob => {
        return blob2base64(blob);
      });
    } else {
      return this.request(uri, "blob").then(blob => {
        const type = mimeType || mime.lookup(url.filename);
        return createBlobUrl(blob, type);
      });
    }
  }

  /**
   * Revoke URL for a resource item
   * @param {string} url 
   */
  revokeUrl(url) {
    if (this.replacements === "blobUrl") {
      const blobUrl = this.get(url);
      if (blobUrl) {
        URL.revokeObjectURL(blobUrl);
      }
    }
  }

  /**
   * Substitute urls in content, with replacements,
   * relative to a url if provided
   * @param {string} content
   * @param {Section} section
   */
  substitute(content, section) {
    section.output = substitute(content, section, [...this.keys()], [...this.values()]);
  }

  /**
   * Unpack resources from manifest
   * @param {Manifest} manifest
   * @param {Archive} archive
   * @param {Storage} storage
   * @returns {Promise<Resources>}
   */
  async unpack(manifest, archive, storage) {
    this.archive = archive;
    this.storage = storage;
    if (this.replacements === null) {
      this.replacements = archive || storage.name ? "blobUrl" : null;
    }
    const tasks = [];
    manifest.forEach((item, key) => {
      if (item["media-type"] === "application/xhtml+xml" || item["media-type"] === "text/html") {
        if (storage.name && !archive) {
          tasks.push(storage.put(this.resolve(item.href)));
        }
      } else if (this.replacements) {
        const task = this.createUrl(item.href, item["media-type"]).then(url => {
          this.set(item.href, url);
          return url;
        });
        tasks.push(task);
      } else {
        this.set(item.href, null);
      }
    });
    return Promise.all(tasks).then(() => {
      return this;
    });
  }

  /**
   * destroy
   */
  destroy() {
    this.clear();
    this.archive = undefined;
    this.storage = undefined;
    this.request = undefined;
    this.resolve = undefined;
    this.replacements = undefined;
  }
}
/* harmony default export */ const resources = (Resources);
;// ./src/annotation.js




/**
 * Annotation class
 */
class Annotation {
  /**
   * Constructor
   * @param {string} type Type of annotation to add: `"highlight"` OR `"underline"`
   * @param {string} cfiRange EpubCFI range to attach annotation to
   * @param {object} [options]
   * @param {object} [options.data] Data to assign to annotation
   * @param {Function} [options.cb] Callback after annotation is clicked
   * @param {string} [options.className] CSS class to assign to annotation
   * @param {object} [options.styles] CSS styles to assign to annotation
   */
  constructor(type, cfiRange, {
    data,
    cb,
    className,
    styles
  }) {
    /**
     * @member {string} type
     * @memberof Annotation
     * @readonly
     */
    this.type = type;
    this.cfiRange = cfiRange;
    /**
     * @member {number} sectionIndex
     * @memberof Annotation
     * @readonly
     */
    this.sectionIndex = new src_epubcfi(cfiRange).spinePos;
    this.data = data;
    this.cb = cb;
    this.className = className;
    this.styles = styles;
    /**
     * @member {Mark} mark
     * @memberof Annotation
     * @readonly
     */
    this.mark = undefined;
  }

  /**
   * Update stored data
   * @param {object} data
   */
  update(data) {
    this.data = data;
  }

  /**
   * Add to a view
   * @param {View} view
   * @returns {object|null}
   */
  attach(view) {
    let result;
    if (!view) {
      return null;
    } else if (this.type === "highlight") {
      result = view.highlight(this.cfiRange, this.data, this.cb, this.className, this.styles);
    } else if (this.type === "underline") {
      result = view.underline(this.cfiRange, this.data, this.cb, this.className, this.styles);
    }
    this.mark = result;
    /**
     * @event attach
     * @param {Mark} result
     * @memberof Annotation
     */
    this.emit(EVENTS.ANNOTATION.ATTACH, result);
    return result;
  }

  /**
   * Remove from a view
   * @param {View} view
   * @returns {boolean}
   */
  detach(view) {
    let result = false;
    if (!view) {
      return result;
    } else if (this.type === "highlight") {
      result = view.unhighlight(this.cfiRange);
    } else if (this.type === "underline") {
      result = view.ununderline(this.cfiRange);
    }
    this.mark = undefined;
    /**
     * @event detach
     * @param {boolean} result
     * @memberof Annotation
     */
    this.emit(EVENTS.ANNOTATION.DETACH, result);
    return result;
  }

  /**
   * [Not Implemented] Get text of an annotation
   * @TODO: needs implementation in contents
   */
  text() {}
}
event_emitter_default()(Annotation.prototype);
/* harmony default export */ const src_annotation = (Annotation);
;// ./src/annotations.js



















/**
 * Handles managing adding & removing Annotations
 */
class Annotations extends Map {
  /**
   * Constructor
   * @param {Rendition} rendition
   */
  constructor(rendition) {
    super();
    this.rendition = rendition;
    this.rendition.hooks.render.register(this.inject.bind(this));
    this.rendition.hooks.unloaded.register(this.reject.bind(this));
  }

  /**
   * Append an annotation to store
   * @param {string} type Type of annotation to append: `"highlight"` OR `"underline"`
   * @param {string} cfiRange EpubCFI range to attach annotation to
   * @param {object} [options]
   * @param {object} [options.data] Data to assign to annotation
   * @param {Function} [options.cb] Callback after annotation is added
   * @param {string} [options.className] CSS class to assign to annotation
   * @param {object} [options.styles] CSS styles to assign to annotation
   * @returns {Annotation} Annotation that was append
   */
  append(type, cfiRange, options) {
    const key = encodeURI(type + ":" + cfiRange);
    const annotation = new src_annotation(type, cfiRange, options);
    this.rendition.views().forEach(view => {
      const index = view.section.index;
      if (annotation.sectionIndex === index) {
        annotation.attach(view);
      }
    });
    this.set(key, annotation);
    return annotation;
  }

  /**
   * Remove an annotation from store
   * @param {string} type Type of annotation to remove: `"highlight"` OR `"underline"`
   * @param {string} cfiRange EpubCFI range to attach annotation to
   */
  remove(type, cfiRange) {
    const key = encodeURI(type + ":" + cfiRange);
    const annotation = this.get(key);
    if (annotation) {
      this.rendition.views().forEach(view => {
        const index = view.section.index;
        if (annotation.sectionIndex === index) {
          annotation.detach(view);
        }
      });
      this.delete(key);
    }
  }

  /**
   * Hook for injecting annotation into a view
   * @param {View} view
   * @private
   */
  inject(view) {
    const index = view.section.index;
    this.forEach((note, key) => {
      if (note.sectionIndex === index) {
        note.attach(view);
      }
    });
  }

  /**
   * Hook for removing annotation from a view
   * @param {View} view
   * @private
   */
  reject(view) {
    const index = view.section.index;
    this.forEach((note, key) => {
      if (note.sectionIndex === index) {
        note.detach(view);
      }
    });
  }

  /**
   * [Not Implemented] Show annotations
   * @TODO: needs implementation in View
   */
  show() {}

  /**
   * [Not Implemented] Hide annotations
   * @TODO: needs implementation in View
   */
  hide() {}
}
/* harmony default export */ const annotations = (Annotations);
;// ./src/layout.js






/**
 * Figures out the CSS values to apply for a layout
 */
class Layout {
  /**
   * Constructor
   * @param {object} [options] 
   * @param {string} [options.axis='horizontal'] values: `"horizontal"` OR `"vertical"`
   * @param {string} [options.flow='paginated'] values: `"paginated"` OR `"scrolled"` OR `"scrolled-doc"`
   * @param {string} [options.spread='auto'] values: `"auto"` OR `"none"`
   * @param {string} [options.direction='ltr'] values: `"ltr"` OR `"rtl"`
   * @param {string} [options.orientation='auto'] values: `"auto"` OR `"landscape"` OR `"portrait"`
   * @param {number} [options.minSpreadWidth=800]
   * @param {number} [options.pageWidth] page width
   * @param {number} [options.pageHeight] page height
   */
  constructor(options) {
    /**
     * @member {string} axis
     * @memberof Layout
     * @readonly
     */
    this.axis = "horizontal";
    /**
     * @member {string} name Layout name
     * @memberof Layout
     * @readonly
     */
    this.name = "reflowable";
    /**
     * @member {string} flow
     * @memberof Layout
     * @readonly
     */
    this.flow = "paginated";
    /**
     * @member {boolean} spread
     * @memberof Layout
     * @readonly
     */
    this.spread = "auto";
    /**
     * @member {string} direction
     * @memberof Layout
     * @readonly
     */
    this.direction = "ltr";
    /**
     * @member {string} orientation no implementation
     * @memberof Layout
     * @readonly
     */
    this.orientation = "auto";
    /**
     * @member {string} viewport no implementation
     * @memberof Layout
     * @readonly
     */
    this.viewport = "";
    /**
     * @member {number} minSpreadWidth
     * @memberof Layout
     * @readonly
     */
    this.minSpreadWidth = 800;
    /**
     * @member {number} width Layout width
     * @memberof Layout
     * @readonly
     */
    this.width = 0;
    /**
     * @member {number} height Layout height
     * @memberof Layout
     * @readonly
     */
    this.height = 0;
    /**
     * @member {number} pageWidth
     * @memberof Layout
     * @readonly
     */
    this.pageWidth = 0;
    /**
     * @member {number} pageHeight
     * @memberof Layout
     * @readonly
     */
    this.pageHeight = 0;
    /**
     * @member {number} spreadWidth Spread width
     * @memberof Layout
     * @readonly
     */
    this.spreadWidth = 0;
    /**
     * @member {number} delta
     * @memberof Layout
     * @readonly
     */
    this.delta = 0;
    /**
     * @member {number} columnWidth Column width
     * @memberof Layout
     * @readonly
     */
    this.columnWidth = 0;
    /**
     * @member {number} gap
     * @memberof Layout
     * @readonly
     */
    this.gap = 0;
    /**
     * @member {number} divisor
     * @memberof Layout
     * @readonly
     */
    this.divisor = 1;
    this.set(options || {});
  }

  /**
   * Set options
   * @param {object} options
   */
  set(options) {
    const error = name => console.error(`Invalid '${name}' property type`);
    Object.keys(options).forEach(opt => {
      const value = options[opt];
      if (this[opt] === value || typeof value === "undefined") {
        delete options[opt];
      } else if (opt === "axis" || opt === "direction" || opt === "orientation") {
        if (typeof value === "string") {
          this[opt] = options[opt];
        } else error(opt);
      } else if (opt === "flow") {
        if (typeof value === "string") {
          switch (value) {
            case "scrolled":
            case "scrolled-continuous":
              this.flow = "scrolled";
              this.axis = options["axis"] || "vertical";
              this.spread = "none"; // autocomplete
              break;
            case "scrolled-doc":
              this.flow = value;
              this.axis = options["axis"] || "vertical";
              this.spread = "none"; // autocomplete
              break;
            default:
              this.flow = "paginated";
              this.axis = "horizontal"; // autocomplete
              break;
          }
        } else error(opt);
      } else if (opt === "spread") {
        if (typeof value === "string") {
          switch (value) {
            case "auto":
            case "both":
              this.spread = "auto";
              break;
            default:
              this.spread = "none";
              break;
          }
        } else error(opt);
      } else if (opt === "width" || opt === "height" || opt === "pageWidth" || opt === "pageHeight" || opt === "gap" || opt === "minSpreadWidth") {
        if (typeof value === "number") {
          if (value >= 0) {
            this[opt] = options[opt];
          }
        } else error(opt);
      }
    });
    this.calculate();
    if (Object.keys(options).length) {
      this.emit(EVENTS.LAYOUT.UPDATED, this, options);
    }
  }

  /**
   * Calculate the dimensions of the pagination
   * @param {number} [width] width of the rendering
   * @param {number} [height] height of the rendering
   * @param {number} [gap] width of the gap between columns
   */
  calculate(width, height, gap) {
    const szw = width || this.width;
    const szh = height || this.height;
    if (!(gap >= 0)) {
      let section;
      if (this.axis === "horizontal") {
        section = Math.floor(szw / 12);
      } else {
        section = Math.floor(szh / 17);
      }
      this.gap = section % 2 === 0 ? section : section - 1;
    } else {
      this.gap = gap;
    }
    if (this.flow === "paginated") {
      this.divisor = this.spread === "auto" && szw >= this.minSpreadWidth ? 2 : 1;
      this.columnWidth = szw / this.divisor - this.gap;
      this.spreadWidth = this.columnWidth * this.divisor + this.gap;
      this.pageWidth = this.columnWidth + this.gap;
      this.pageHeight = szh;
    } else {
      this.divisor = 1;
    }
    this.delta = szw;
    this.width = szw;
    this.height = szh;
  }

  /**
   * Count number of pages
   * @param {number} totalLength
   * @param {number} [pageLength]
   * @return {{spreads: number, pages: number}}
   */
  count(totalLength, pageLength) {
    let spreads, pages;
    if (this.flow === "paginated") {
      pageLength = pageLength || this.delta;
      spreads = Math.ceil(totalLength / pageLength);
      pages = spreads * this.divisor;
    } else {
      pageLength = pageLength || this.height;
      spreads = Math.ceil(totalLength / pageLength);
      pages = spreads;
    }
    return {
      spreads,
      pages
    };
  }

  /**
   * destroty
   */
  destroy() {
    Object.keys(this).forEach(p => this[p] = undefined);
  }
}
event_emitter_default()(Layout.prototype);
/* harmony default export */ const layout = (Layout);
;// ./src/themes.js





















/**
 * Themes to apply to displayed content
 */
class Themes extends Map {
  /**
   * Constructor
   * @param {Rendition} rendition
   */
  constructor(rendition) {
    super();
    this.rendition = rendition;
    /**
     * @member {string} current
     * @memberof Themes
     * @readonly
     */
    this.current = null;
    /**
     * Injected css rules
     * @member {object} rules
     * @memberof Themes
     * @readonly
     */
    this.rules = {};
    this.rendition.hooks.content.register(this.inject.bind(this));
    this.rendition.hooks.content.register(this.update.bind(this));
  }

  /**
   * Add themes to be used by a rendition
   * @param {IArguments} args
   * @example register("light", "/path/to/light.css")
   * @example register("light", "https://example.com/to/light.css")
   * @example register("light", { body: { color: "purple"}})
   * @example register({ light: {...}, dark: {...}})
   */
  register() {
    if (arguments.length === 0) {
      return;
    }
    if (arguments.length === 1 && typeof arguments[0] === "object") {
      return this.registerThemes(arguments[0]);
    }
    if (arguments.length === 2 && typeof arguments[1] === "string") {
      return this.registerUrl(arguments[0], arguments[1]);
    }
    if (arguments.length === 2 && typeof arguments[1] === "object") {
      return this.registerRules(arguments[0], arguments[1]);
    }
  }

  /**
   * Register themes object
   * @param {object} themes
   */
  registerThemes(themes) {
    for (const theme in themes) {
      if (themes.hasOwnProperty(theme)) {
        if (typeof themes[theme] === "string") {
          this.registerUrl(theme, themes[theme]);
        } else {
          this.registerRules(theme, themes[theme]);
        }
      }
    }
  }

  /**
   * Register a url
   * @param {string} name Theme name
   * @param {string} input URL string
   * @example registerUrl("light", "light.css")
   * @example registerUrl("light", "http://example.com/light.css")
   */
  registerUrl(name, input) {
    const url = new utils_url(input);
    this.set(name, {
      injected: false,
      url: url.toString()
    });
  }

  /**
   * Register rule
   * @param {string} name
   * @param {object} rules
   * @example registerRules("light", { body: { color: "purple"}})
   */
  registerRules(name, rules) {
    this.set(name, {
      injected: false,
      rules: rules
    });
  }

  /**
   * Select a theme
   * @param {string} [name] Theme name
   * @description Use null to reject the current selected theme
   */
  select(name) {
    const prev = this.current;
    let theme;
    if (name) {
      theme = this.get(name);
    } else if (prev && name === null) {
      theme = this.get(prev);
    }
    if (this.current === name || !theme) {
      return;
    }
    this.current = name;
    const contents = this.rendition.getContents();
    contents.forEach(content => {
      if (!content) {
        return;
      } else if (name) {
        content.removeClass(prev);
        content.appendClass(name);
        this.append(name, theme, content);
      } else if (prev) {
        content.removeClass(prev);
        this.remove(prev, theme, content);
      }
    });
    /**
     * Emit which occurs when theme is selected
     * @event selected
     * @param {string} name Theme key
     * @param {object} theme Theme value
     * @memberof Themes
     */
    this.emit(EVENTS.THEMES.SELECTED, name, theme);
  }

  /**
   * Append theme to contents
   * @param {string} key
   * @param {object} theme 
   * @param {Contents} contents
   * @private
   */
  append(key, theme, contents) {
    if (theme.url) {
      contents.appendStylesheet(key, theme.url);
      theme.injected = true;
    }
    if (theme.rules) {
      contents.appendStylesheet(key, theme.rules);
      theme.injected = true;
    }
    if (theme.injected) {
      /**
       * Emit of injected a stylesheet into contents
       * @event injected
       * @param {string} key Theme key
       * @param {object} theme Theme value
       * @param {Contents} contents
       * @memberof Themes
       */
      this.emit(EVENTS.THEMES.INJECTED, key, theme, contents);
    }
  }

  /**
   * Remove theme from contents
   * @param {string} key 
   * @param {object} theme 
   * @param {Contents} contents 
   * @private
   */
  remove(key, theme, contents) {
    if (contents.removeStylesheet(key)) {
      theme.injected = false;
      /**
       * Emit of rejected a stylesheet into contents
       * @event rejected
       * @param {string} key Theme key
       * @param {object} theme Theme value
       * @param {Contents} contents
       * @memberof Themes
       */
      this.emit(EVENTS.THEMES.REJECTED, key, theme, contents);
    }
  }

  /**
   * Clear all themes
   */
  clear() {
    this.select(null);
    super.clear();
  }

  /**
   * Inject all themes into contents
   * @param {Contents} contents
   * @private
   */
  inject(contents) {
    if (!this.current) return;
    this.forEach((theme, key) => {
      if (this.current === key) {
        this.append(key, theme, contents);
      }
    });
    contents.appendClass(this.current);
  }

  /**
   * Update all themes into contents
   * @param {Contents} contents
   * @private
   */
  update(contents) {
    const rules = this.rules;
    for (const rule in rules) {
      if (rules.hasOwnProperty(rule)) {
        contents.css(rule, rules[rule].value, rules[rule].priority);
      }
    }
  }

  /**
   * Append rule
   * @param {string} name
   * @param {string} value
   * @param {boolean} [priority=false]
   */
  appendRule(name, value, priority = false) {
    const rule = {
      value: value,
      priority: priority
    };
    const contents = this.rendition.getContents();
    contents.forEach(content => {
      if (content) {
        content.css(name, rule.value, rule.priority);
      }
    });
    this.rules[name] = rule;
  }

  /**
   * Remove rule
   * @param {string} name
   */
  removeRule(name) {
    delete this.rules[name];
    const contents = this.rendition.getContents();
    contents.forEach(content => {
      if (content) {
        content.css(name);
      }
    });
  }

  /**
   * Remove all rules
   */
  removeRules() {
    Object.keys(this.rules).forEach(key => {
      this.removeRule(key);
    });
  }

  /**
   * Adjust the font size of a rendition
   * @param {string} size
   */
  fontSize(size) {
    this.appendRule("font-size", size);
  }

  /**
   * Adjust the font-family of a rendition
   * @param {string} f
   */
  font(f) {
    this.appendRule("font-family", f, true);
  }

  /**
   * destroy
   */
  destroy() {
    this.clear();
    this.removeRules();
    this.current = undefined;
    this.rules = undefined;
  }
}
event_emitter_default()(Themes.prototype);
/* harmony default export */ const themes = (Themes);
;// ./src/utils/hook.js




/**
 * Hooks allow for injecting functions that must all complete in order before finishing
 * They will execute in parallel but all must finish before continuing
 * Functions may return a promise if they are async.
 */
class Hook {
  /**
   * Constructor
   * @param {any} context scope of this
   * @example this.content = new Hook(this);
   */
  constructor(context) {
    this.context = context || this;
    this.tasks = [];
  }

  /**
   * Adds a function to be run before a hook completes
   * @example this.content.register(() => {...});
   */
  register() {
    for (let i = 0; i < arguments.length; ++i) {
      if (typeof arguments[i] === "function") {
        this.tasks.push(arguments[i]);
      } else if (arguments[i] instanceof Array) {
        // unpack array
        this.register(arguments[i]); // recursive call
      } else {
        throw new TypeError("Invalid argument type");
      }
    }
  }

  /**
   * Removes a function
   * @example this.content.deregister(() => {...});
   */
  deregister(func) {
    for (let i = 0; i < this.tasks.length; i++) {
      if (this.tasks[i] === func) {
        this.tasks.splice(i, 1);
        break;
      }
    }
  }

  /**
   * Triggers a hook to run all functions
   * @example this.content.trigger(args).then(() => {...});
   * @returns {Promise[]}
   */
  trigger() {
    const args = arguments;
    const context = this.context;
    const promises = [];
    let executing;
    this.tasks.forEach(task => {
      try {
        executing = task.apply(context, args);
      } catch (err) {
        console.error(err);
      }
      if (executing && typeof executing["then"] === "function") {
        // Task is a function that returns a promise
        promises.push(executing);
      }
    });
    return Promise.all(promises);
  }

  /**
   * list
   * @returns {Array}
   */
  list() {
    return this.tasks;
  }

  /**
   * clear
   */
  clear() {
    this.tasks = [];
  }
}
/* harmony default export */ const hook = (Hook);
;// ./src/viewport.js







/**
 * viewport configuration class
 */
class Viewport {
  /**
   * Constructor
   * @param {Layout} layout
   */
  constructor(layout) {
    this.layout = layout;
    this.layout.on(EVENTS.LAYOUT.UPDATED, (props, changed) => {
      if (changed.axis) {
        this.updateAxis(props.axis);
      } else if (changed.flow) {
        this.updateFlow(props.flow);
      } else if (changed.direction) {
        this.direction(props.direction);
      }
    });
    /**
     * viewport container
     * @member {Element} container
     * @memberof Viewport
     * @readonly
     */
    this.container = null;
    /**
     * viewport element
     * @member {Element} target
     * @memberof Viewport
     * @readonly
     */
    this.target = null;
    /**
     * viewport rect
     * @member {object} rect
     * @memberof Viewport
     * @readonly
     */
    this.rect = {
      bottom: 0,
      height: 0,
      left: 0,
      right: 0,
      top: 0,
      width: 0,
      x: 0,
      y: 0
    };
  }

  /**
   * Attach to viewport element
   * @param {Element|string} input viewport element
   * @param {object} options
   * @param {string|number} options.width viewport container width
   * @param {string|number} options.height viewport container height
   * @param {object} options.views
   * @returns {Element|null} attached element
   */
  attachTo(input, options) {
    const element = this.getElement(input);
    if (!element) return null;
    this.views = options.views;
    this.container = this.create(options);
    this.container.appendChild(this.views.container);
    element.appendChild(this.container);
    this.target = element;
    this.appendListeners();
    return element;
  }

  /**
   * Create viewport-container
   * @param {object} options 
   * @param {string|number} [options.width]
   * @param {string|number} [options.height]
   * @returns {Element} container
   * @private
   */
  create(options) {
    let szw = options.width;
    let szh = options.height;
    if (szw && isNumber(szw)) {
      szw = szw + "px";
    }
    if (szh && isNumber(szh)) {
      szh = szh + "px";
    }
    const container = document.createElement("div");
    container.classList.add("viewport-container");
    container.style.wordSpacing = "0";
    container.style.lineHeight = "0";
    container.style.verticalAlign = "top";
    container.style.position = "relative";
    container.style.display = "flex";
    container.style.flexWrap = "nowrap";
    container.style.width = szw || "100%";
    container.style.height = szh || "100%";
    container.style.overflow = "hidden";
    return container;
  }

  /**
   * appendListeners
   * @private
   */
  appendListeners() {
    //-- ORIENTATION_CHANGE
    screen.orientation.addEventListener("change", this.orientation.bind(this));
    //-- RESIZED
    this.resizeFunc = new ResizeObserver(e => {
      requestAnimationFrame(() => this.resized(e));
    });
    this.resizeFunc.observe(this.container);
  }

  /**
   * removeListeners
   * @private
   */
  removeListeners() {
    //-- ORIENTATION_CHANGE
    screen.orientation.removeEventListener("change", this.orientation.bind(this));
    //-- RESIZE
    if (this.resizeFunc) {
      this.resizeFunc.disconnect();
    }
  }

  /**
   * Get viewport element
   * @param {Element|string} input 
   * @returns {Element}
   * @private
   */
  getElement(input) {
    let element;
    if (typeof input === "string") {
      element = document.getElementById(input);
    } else if (input instanceof Element) {
      element = input;
    } else {
      throw new TypeError("Invalid argument type");
    }
    return element;
  }

  /**
   * orientationchanged
   * @param {Event} e 
   * @private
   */
  orientation(e) {
    this.emit(EVENTS.VIEWPORT.ORIENTATION_CHANGE, e.target);
  }

  /**
   * resized event handler
   * @param {object} entries 
   * @private
   */
  resized(entries) {
    let changed = false;
    const cmp = rect => Object.keys(this.rect).forEach(p => {
      if (!rect) return;
      if (this.rect[p] !== rect[p] && rect[p] !== void 0) {
        this.rect[p] = rect[p];
        changed = true;
      }
    });
    entries.forEach(entry => cmp(entry.contentRect));
    if (!changed) return;
    this.emit(EVENTS.VIEWPORT.RESIZED, this.rect);
  }

  /**
   * size
   * @param {string|number} [width] 
   * @param {string|number} [height] 
   * @returns {object}
   */
  size(width, height) {
    this.rect.width = this.target.clientWidth;
    this.rect.height = this.target.clientHeight;
    if (!width) {
      width = this.rect.width;
      this.container.style.width = width + "px";
    } else if (isNumber(width)) {
      this.container.style.width = width + "px";
      this.rect.width = width;
    } else {
      this.container.style.width = width;
      this.rect.width = this.container.clientWidth;
    }
    if (!height) {
      height = this.rect.height;
      this.container.style.height = height + "px";
    } else if (isNumber(height)) {
      this.container.style.height = height + "px";
      this.rect.height = height;
    } else {
      this.container.style.height = height;
      this.rect.height = this.container.clientHeight;
    }
    return {
      width: this.rect.width,
      height: this.rect.height
    };
  }

  /**
   * Update direction
   * @param {string} [value] `layout.direction` value
   * @private
   */
  direction(value) {
    const dir = value || this.layout.direction;
    this.target.dir = dir;
    this.target.classList.add(dir);
  }

  /**
   * Update axis
   * @param {string} [value] values: `"horizontal"` OR `"vertical"`
   * @private
   */
  updateAxis(value) {
    const axis = value || this.layout.axis;
    if (axis === "horizontal") {
      this.views.container.style["flex-wrap"] = "nowrap";
    } else {
      this.views.container.style["flex-wrap"] = "wrap";
    }
  }

  /**
   * Update flow
   * @param {string} [value] `layout.flow` value
   * @private
   */
  updateFlow(value) {
    const flow = value || this.layout.flow;
    if (flow === "paginated") {
      this.views.container.style["overflow-y"] = "hidden";
      this.views.container.style["overflow-x"] = "hidden";
      this.views.container.style["flex-wrap"] = "nowrap";
    } else if (this.layout.axis === "horizontal") {
      this.views.container.style["overflow-y"] = "hidden";
      this.views.container.style["overflow-x"] = "auto";
      this.views.container.style["flex-wrap"] = "nowrap";
    } else if (this.layout.axis === "vertical") {
      this.views.container.style["overflow-y"] = "auto";
      this.views.container.style["overflow-x"] = "hidden";
      this.views.container.style["flex-wrap"] = "wrap";
    }
    this.target.className = flow;
  }

  /**
   * Update viewport container
   */
  update() {
    this.updateAxis();
    this.updateFlow();
    this.direction();
  }

  /**
   * destroy
   */
  destroy() {
    if (this.target) {
      this.removeListeners();
      this.target.removeChild(this.container);
      this.container.removeChild(this.views.container);
      this.container = undefined;
      this.target = undefined;
      this.rect = undefined;
    }
  }
}
event_emitter_default()(Viewport.prototype);
/* harmony default export */ const viewport = (Viewport);
// EXTERNAL MODULE: ./node_modules/core-js/modules/esnext.async-iterator.find.js
var esnext_async_iterator_find = __webpack_require__(3064);
// EXTERNAL MODULE: ./node_modules/core-js/modules/esnext.iterator.find.js
var esnext_iterator_find = __webpack_require__(2577);
;// ./src/mapping.js




/**
 * Map text locations to CFI ranges
 */
class Mapping {
  /**
   * Constructor
   * @param {Layout} layout Layout to apply
   * @param {boolean} [dev=false] toggle developer highlighting
   */
  constructor(layout, dev = false) {
    this.layout = layout;
    this.devMode = dev;
  }

  /**
   * Find CFI pairs for entire section at once
   * @param {any} view 
   * @returns {object[]}
   */
  section(view) {
    const ranges = this.findRanges(view);
    return this.rangeListToCfiList(view.section.cfiBase, ranges);
  }

  /**
   * Find CFI pairs for a page
   * @param {Contents} contents Contents from view
   * @param {string} cfiBase string of the base for a cfi
   * @param {number} start position to start at
   * @param {number} end position to end at
   * @returns {{ start: string, end: string }}
   */
  page(contents, cfiBase, start, end) {
    const root = contents && contents.document ? contents.document.body : false;
    if (!root) return null;
    const result = this.rangePairToCfiPair(cfiBase, {
      start: this.findStart(root, start, end),
      end: this.findEnd(root, start, end)
    });
    if (this.devMode === true) {
      const doc = contents.document;
      const startRange = new src_epubcfi(result.start).toRange(doc);
      const endRange = new src_epubcfi(result.end).toRange(doc);
      const selection = doc.defaultView.getSelection();
      const range = doc.createRange();
      selection.removeAllRanges();
      range.setStart(startRange.startContainer, startRange.startOffset);
      range.setEnd(endRange.endContainer, endRange.endOffset);
      selection.addRange(range);
    }
    return result;
  }

  /**
   * Walk a node, preforming a function on each node it finds
   * @param {Node} root Node to walkToNode
   * @param {Function} func walk function
   * @return {any} returns the result of the walk function
   * @private
   */
  walk(root, func) {
    // IE11 has strange issue, if root is text node IE throws exception on
    // calling treeWalker.nextNode(), saying
    // Unexpected call to method or property access instead of returning null value
    if (root && root.nodeType === Node.TEXT_NODE) {
      return;
    }
    // safeFilter is required so that it can work in IE as filter is a function for IE
    // and for other browser filter is an object.
    const filter = {
      acceptNode: node => {
        if (node.data.trim().length > 0) {
          return NodeFilter.FILTER_ACCEPT;
        } else {
          return NodeFilter.FILTER_REJECT;
        }
      }
    };
    const safeFilter = filter.acceptNode;
    safeFilter.acceptNode = filter.acceptNode;
    const treeWalker = document.createTreeWalker(root, NodeFilter.SHOW_TEXT, safeFilter, false);
    let node;
    let result;
    while (node = treeWalker.nextNode()) {
      result = func(node);
      if (result) break;
    }
    return result;
  }

  /**
   * findRanges
   * @param {*} view 
   * @returns {object[]} columns
   */
  findRanges(view) {
    const columns = [];
    const scrollWidth = view.contents.scrollWidth();
    const spreads = Math.ceil(scrollWidth / this.layout.spreadWidth);
    const countPages = spreads * this.layout.divisor;
    const columnWidth = this.layout.columnWidth;
    const gap = this.layout.gap;
    const body = view.document.body;
    for (let i = 0; i < countPages; i++) {
      const start = (columnWidth + gap) * i;
      const end = columnWidth * (i + 1) + gap * i;
      columns.push({
        start: this.findStart(body, start, end),
        end: this.findEnd(body, start, end)
      });
    }
    return columns;
  }

  /**
   * Find Start Range
   * @param {Node} root root node
   * @param {number} start position to start at
   * @param {number} end position to end at
   * @return {Range}
   * @private
   */
  findStart(root, start, end) {
    const stack = [root];
    const hor = this.layout.axis === "horizontal";
    const ltr = this.layout.direction === "ltr";
    const rtl = this.layout.direction === "rtl";
    let prev = root;
    while (stack.length) {
      const el = stack.shift();
      const found = this.walk(el, node => {
        let left, right, top, bottom;
        const elPos = nodeBounds(node);
        if (hor && ltr) {
          left = hor ? elPos.left : elPos.top;
          right = hor ? elPos.right : elPos.bottom;
          if (left >= start && left <= end) {
            return node;
          } else if (right > start) {
            return node;
          } else {
            prev = node;
            stack.push(node);
          }
        } else if (hor && rtl) {
          left = elPos.left;
          right = elPos.right;
          if (right <= end && right >= start) {
            return node;
          } else if (left < end) {
            return node;
          } else {
            prev = node;
            stack.push(node);
          }
        } else {
          top = elPos.top;
          bottom = elPos.bottom;
          if (top >= start && top <= end) {
            return node;
          } else if (bottom > start) {
            return node;
          } else {
            prev = node;
            stack.push(node);
          }
        }
      });
      if (found) {
        return this.findTextStartRange(found, start, end);
      }
    }

    // Return last element
    return this.findTextStartRange(prev, start, end);
  }

  /**
   * Find End Range
   * @param {Node} root root node
   * @param {number} start position to start at
   * @param {number} end position to end at
   * @return {Range}
   * @private
   */
  findEnd(root, start, end) {
    const stack = [root];
    const hor = this.layout.axis === "horizontal";
    const ltr = this.layout.direction === "ltr";
    const rtl = this.layout.direction === "rtl";
    let prev = root;
    while (stack.length) {
      const el = stack.shift();
      const found = this.walk(el, node => {
        let left, right, top, bottom;
        const elPos = nodeBounds(node);
        if (hor && ltr) {
          left = Math.round(elPos.left);
          right = Math.round(elPos.right);
          if (left > end && prev) {
            return prev;
          } else if (right > end) {
            return node;
          } else {
            prev = node;
            stack.push(node);
          }
        } else if (hor && rtl) {
          left = Math.round(hor ? elPos.left : elPos.top);
          right = Math.round(hor ? elPos.right : elPos.bottom);
          if (right < start && prev) {
            return prev;
          } else if (left < start) {
            return node;
          } else {
            prev = node;
            stack.push(node);
          }
        } else {
          top = Math.round(elPos.top);
          bottom = Math.round(elPos.bottom);
          if (top > end && prev) {
            return prev;
          } else if (bottom > end) {
            return node;
          } else {
            prev = node;
            stack.push(node);
          }
        }
      });
      if (found) {
        return this.findTextEndRange(found, start, end);
      }
    }

    // end of chapter
    return this.findTextEndRange(prev, start, end);
  }

  /**
   * Find Text Start Range
   * @param {Node} root root node
   * @param {number} start position to start at
   * @param {number} end position to end at
   * @return {Range}
   * @private
   */
  findTextStartRange(node, start, end) {
    const ranges = this.splitTextNodeIntoRanges(node);
    const hor = this.layout.axis === "horizontal";
    const ltr = this.layout.direction === "ltr";
    const rtl = this.layout.direction === "rtl";
    for (let i = 0; i < ranges.length; i++) {
      const range = ranges[i];
      const pos = range.getBoundingClientRect();
      if (hor && ltr) {
        if (pos.left >= start) {
          return range;
        }
      } else if (hor && rtl) {
        if (pos.right <= end) {
          return range;
        }
      } else {
        if (pos.top >= start) {
          return range;
        }
      }
    }
    return ranges[0];
  }

  /**
   * Find Text End Range
   * @param {Node} root root node
   * @param {number} start position to start at
   * @param {number} end position to end at
   * @return {Range}
   * @private
   */
  findTextEndRange(node, start, end) {
    const ranges = this.splitTextNodeIntoRanges(node);
    const hor = this.layout.axis === "horizontal";
    const ltr = this.layout.direction === "ltr";
    const rtl = this.layout.direction === "rtl";
    let prev;
    for (let i = 0; i < ranges.length; i++) {
      const range = ranges[i];
      const pos = range.getBoundingClientRect();
      if (hor && ltr) {
        if (pos.left > end && prev) {
          return prev;
        } else if (pos.right > end) {
          return range;
        }
      } else if (hor && rtl) {
        if (pos.right < start && prev) {
          return prev;
        } else if (pos.left < start) {
          return range;
        }
      } else {
        if (pos.top > end && prev) {
          return prev;
        } else if (pos.bottom > end) {
          return range;
        }
      }
      prev = range;
    }

    // Ends before limit
    return ranges[ranges.length - 1];
  }

  /**
   * Split up a text node into ranges for each word
   * @param {Node} root root node
   * @param {string} [splitter=' '] what to split on
   * @return {Array<Range>}
   * @private
   */
  splitTextNodeIntoRanges(node, splitter = " ") {
    const ranges = [];
    const textContent = node.textContent || "";
    const text = textContent.trim();
    const doc = node.ownerDocument;
    let range;
    let pos = text.indexOf(splitter);
    if (pos === -1 || node.nodeType != Node.TEXT_NODE) {
      range = doc.createRange();
      range.selectNodeContents(node);
      return [range];
    }
    range = doc.createRange();
    range.setStart(node, 0);
    range.setEnd(node, pos);
    ranges.push(range);
    range = false;
    while (pos !== -1) {
      pos = text.indexOf(splitter, pos + 1);
      if (pos > 0) {
        if (range) {
          range.setEnd(node, pos);
          ranges.push(range);
        }
        range = doc.createRange();
        range.setStart(node, pos + 1);
      }
    }
    if (range) {
      range.setEnd(node, text.length);
      ranges.push(range);
    }
    return ranges;
  }

  /**
   * Turn a pair of ranges into a pair of CFIs
   * @param {string} cfiBase base string for an EpubCFI
   * @param {{ start: Range, end: Range }} rangePair Range pair
   * @return {{ start: string, end: string }} EpubCFI pair
   * @private
   */
  rangePairToCfiPair(cfiBase, rangePair) {
    const startRange = rangePair.start;
    const endRange = rangePair.end;
    startRange.collapse(true);
    endRange.collapse(false);
    return {
      start: new src_epubcfi(startRange, cfiBase).toString(),
      end: new src_epubcfi(endRange, cfiBase).toString()
    };
  }

  /**
   * rangeListToCfiList
   * @param {string} cfiBase 
   * @param {object[]} columns 
   * @returns {object[]}
   */
  rangeListToCfiList(cfiBase, columns) {
    const map = [];
    for (let i = 0; i < columns.length; i++) {
      const cifPair = this.rangePairToCfiPair(cfiBase, columns[i]);
      map.push(cifPair);
    }
    return map;
  }
}
/* harmony default export */ const src_mapping = (Mapping);
;// ./src/managers/helpers/views.js


/**
 * Views
 */
class Views extends Array {
  /**
   * Constructor
   */
  constructor() {
    super();
    /**
     * @member {Element} container
     * @memberof Views
     * @readonly
     */
    this.container = null;
    this.init();
  }
  init() {
    this.container = document.createElement("div");
    this.container.classList.add("views-container");
    this.container.style.display = "flex";
    this.container.style.width = "100%";
    this.container.style.height = "100%";
  }

  /**
   * first
   * @returns {object} view
   */
  first() {
    return this[0];
  }

  /**
   * last
   * @returns {object} view
   */
  last() {
    return this[this.length - 1];
  }

  /**
   * get
   * @param {number} i index
   * @returns {object} view
   */
  get(i) {
    return this[i];
  }

  /**
   * append
   * @param {object} view 
   * @returns {object} view
   */
  append(view) {
    this.container.appendChild(view.container);
    this.push(view);
    return view;
  }

  /**
   * prepend
   * @param {object} view 
   * @returns {object} view
   */
  prepend(view) {
    this.container.insertBefore(view.container, this.container.firstChild);
    this.unshift(view);
    return view;
  }

  /**
   * insert
   * @param {object} view 
   * @param {number} index 
   * @returns {object} view
   */
  insert(view, index) {
    const children = this.container.children;
    if (index < children.length) {
      this.container.insertBefore(view.container, children[index]);
    } else {
      this.container.appendChild(view.container);
    }
    this.splice(index, 0, view);
    return view;
  }

  /**
   * remove
   * @param {object} view 
   * @param {number} [i] index
   */
  remove(view, i) {
    const index = i || this.indexOf(view);
    if (index > -1) {
      this.container.removeChild(view.container);
      this.splice(index, 1);
      view.destroy();
    }
  }

  /**
   * clear
   */
  clear() {
    const len = this.length;
    for (let i = 0; i < len; ++i) {
      const view = this[i];
      this.remove(view, i);
    }
  }

  /**
   * find
   * @param {Section} section 
   * @returns {object} view
   */
  find(section) {
    for (let i = 0; i < this.length; i++) {
      const view = this[i];
      if (view.displayed && view.section.index == section.index) {
        return view;
      }
    }
  }

  /**
   * displayed
   * @returns {object[]}
   */
  displayed() {
    const displayed = [];
    for (let i = 0; i < this.length; i++) {
      const view = this[i];
      if (view.displayed) {
        displayed.push(view);
      }
    }
    return displayed;
  }

  /**
   * show
   */
  show() {
    for (let i = 0; i < this.length; i++) {
      const view = this[i];
      if (view.displayed) {
        view.show();
      }
    }
  }

  /**
   * hide
   */
  hide() {
    for (let i = 0; i < this.length; i++) {
      const view = this[i];
      if (view.displayed) {
        view.hide();
      }
    }
  }

  /**
   * update
   */
  update() {
    for (let i = 0; i < this.length; ++i) {
      const view = this[i];
      if (view.displayed) {
        view.update();
      }
    }
  }

  /**
   * destroy
   */
  destroy() {
    this.clear();
    this.container = undefined;
  }
}
/* harmony default export */ const views = (Views);
;// ./src/contents.js



























const hasNavigator = typeof navigator !== "undefined";
const isChrome = hasNavigator && /Chrome/.test(navigator.userAgent);
const isWebkit = hasNavigator && !isChrome && /AppleWebKit/.test(navigator.userAgent);
const AXIS_H = "horizontal";
const AXIS_V = "vertical";

/**
 * Handles DOM manipulation, queries and events for View contents
 */
class Contents {
  /**
   * Constructor
   * @param {Document} doc Document
   * @param {Element} content Parent Element (typically Body)
   * @param {Section} section Section object reference
   */
  constructor(doc, content, section) {
    /**
     * @member {EpubCFI} epubcfi Blank Cfi for Parsing
     * @memberof Contents
     * @readonly
     */
    this.epubcfi = new src_epubcfi();
    this.document = doc;
    /**
     * @member {Element} content document.body by current location
     * @memberof Contents
     * @readonly
     */
    this.content = content || this.document.body;
    /**
     * @member {object} contentRect
     * @memberof Contents
     * @readonly
     */
    this.contentRect = {
      bottom: 0,
      height: 0,
      left: 0,
      right: 0,
      top: 0,
      width: 0,
      x: 0,
      y: 0
    };
    /**
     * @member {Section} section
     * @memberof Contents
     * @readonly
     */
    this.section = section;
    this.scripts = new Map();
    this.styles = new Map();
    this.active = true;
    this.window = this.document.defaultView;
    /**
     * @member {string} mode writing-mode
     * @memberof Contents
     * @readonly
     */
    this.mode = this.writingMode();
    this.appendListeners();
  }

  /**
   * Get or Set width
   * @param {number} [w]
   * @returns {number} width
   */
  width(w) {
    const frame = this.content;
    if (w && isNumber(w)) {
      w = w + "px";
    }
    if (w) {
      frame.style.width = w;
    }
    return parseInt(this.window.getComputedStyle(frame)["width"]);
  }

  /**
   * Get or Set height
   * @param {number} [h]
   * @returns {number} height
   */
  height(h) {
    const frame = this.content;
    if (h && isNumber(h)) {
      h = h + "px";
    }
    if (h) {
      frame.style.height = h;
    }
    return parseInt(this.window.getComputedStyle(frame)["height"]);
  }

  /**
   * Get size of the text using Range
   * @returns {{ width: number, height: number }}
   */
  textSize() {
    const range = this.document.createRange();
    range.selectNodeContents(this.content);
    const rect = range.getBoundingClientRect();
    const border = borders(this.content);
    const width = rect.width + border.width;
    const height = this.content.clientHeight;
    return {
      width: Math.round(width),
      height: Math.round(height)
    };
  }

  /**
   * Get documentElement scrollWidth
   * @returns {number} width
   */
  scrollWidth() {
    return this.document.documentElement.scrollWidth;
  }

  /**
   * Get documentElement scrollHeight
   * @returns {number} height
   */
  scrollHeight() {
    return this.document.documentElement.scrollHeight;
  }

  /**
   * Set overflow css style of the contents
   * @param {string} [overflow]
   * @returns {string}
   */
  overflow(overflow) {
    const elt = this.document.documentElement;
    if (overflow) {
      elt.style.overflow = overflow;
    }
    return this.window.getComputedStyle(elt)["overflow"];
  }

  /**
   * Set overflowX css style of the documentElement
   * @param {string} [overflow]
   * @returns {string}
   */
  overflowX(overflow) {
    const elt = this.document.documentElement;
    if (overflow) {
      elt.style.overflowX = overflow;
    }
    return this.window.getComputedStyle(elt)["overflowX"];
  }

  /**
   * Set overflowY css style of the documentElement
   * @param {string} [overflow]
   * @returns {string}
   */
  overflowY(overflow) {
    const elt = this.document.documentElement;
    if (overflow) {
      elt.style.overflowY = overflow;
    }
    return this.window.getComputedStyle(elt)["overflowY"];
  }

  /**
   * Set Css styles on the contents element (typically Body)
   * @param {string} property
   * @param {string} value
   * @param {boolean} [priority] set as "important"
   * @returns {any}
   */
  css(property, value, priority) {
    const content = this.content;
    if (value) {
      content.style.setProperty(property, value, priority ? "important" : "");
    } else {
      content.style.removeProperty(property);
    }
    return this.window.getComputedStyle(content)[property];
  }

  /**
   * Get or Set the viewport element
   * @param {object} [options]
   * @param {string} [options.width]
   * @param {string} [options.height]
   * @param {string} [options.scale]
   * @param {string} [options.minimum]
   * @param {string} [options.maximum]
   * @param {string} [options.scalable]
   * @returns {object}
   */
  viewport(options) {
    const parsed = {
      width: undefined,
      height: undefined,
      scale: undefined,
      minimum: undefined,
      maximum: undefined,
      scalable: undefined
    };
    let viewport = this.document.querySelector("meta[name='viewport']");

    /***
     * check for the viewport size
     * <meta name="viewport" content="width=1024,height=697" />
     */
    if (viewport && viewport.hasAttribute("content")) {
      const content = viewport.getAttribute("content");
      const width = content.match(/width\s*=\s*([^,]*)/);
      const height = content.match(/height\s*=\s*([^,]*)/);
      const scale = content.match(/initial-scale\s*=\s*([^,]*)/);
      const minimum = content.match(/minimum-scale\s*=\s*([^,]*)/);
      const maximum = content.match(/maximum-scale\s*=\s*([^,]*)/);
      const scalable = content.match(/user-scalable\s*=\s*([^,]*)/);
      if (width && width.length && typeof width[1] !== "undefined") {
        parsed.width = width[1];
      }
      if (height && height.length && typeof height[1] !== "undefined") {
        parsed.height = height[1];
      }
      if (scale && scale.length && typeof scale[1] !== "undefined") {
        parsed.scale = scale[1];
      }
      if (minimum && minimum.length && typeof minimum[1] !== "undefined") {
        parsed.minimum = minimum[1];
      }
      if (maximum && maximum.length && typeof maximum[1] !== "undefined") {
        parsed.maximum = maximum[1];
      }
      if (scalable && scalable.length && typeof scalable[1] !== "undefined") {
        parsed.scalable = scalable[1];
      }
    }
    const settings = defaults(options || {}, parsed);
    const newContent = [];
    if (options) {
      if (settings.width) {
        newContent.push("width=" + settings.width);
      }
      if (settings.height) {
        newContent.push("height=" + settings.height);
      }
      if (settings.scale) {
        newContent.push("initial-scale=" + settings.scale);
      }
      if (settings.scalable === "no") {
        newContent.push("minimum-scale=" + settings.scale);
        newContent.push("maximum-scale=" + settings.scale);
        newContent.push("user-scalable=" + settings.scalable);
      } else {
        if (settings.scalable) {
          newContent.push("user-scalable=" + settings.scalable);
        }
        if (settings.minimum) {
          newContent.push("minimum-scale=" + settings.minimum);
        }
        if (settings.maximum) {
          newContent.push("minimum-scale=" + settings.maximum);
        }
      }
      if (viewport === null) {
        viewport = this.document.createElement("meta");
        viewport.setAttribute("name", "viewport");
        this.document.head.appendChild(viewport);
      }
      viewport.setAttribute("content", newContent.join(", "));
      this.window.scrollTo(0, 0);
    }
    return settings;
  }

  /**
   * Event emitter for when the contents has expanded
   * @private
   */
  expand() {
    this.emit(EVENTS.CONTENTS.EXPAND);
  }

  /**
   * content resize event handler
   * @param {object[]} entries
   * @private
   */
  resize(entries) {
    let changed = false;
    const cmp = rect => Object.keys(this.contentRect).forEach(p => {
      if (!rect) return;
      if (this.contentRect[p] !== rect[p] && rect[p] !== void 0) {
        this.contentRect[p] = rect[p];
        changed = true;
      }
    });
    entries.forEach(entry => cmp(entry.contentRect));
    if (!changed) return;
    this.emit(EVENTS.CONTENTS.RESIZED, this.contentRect);
  }

  /**
   * Get the documentElement
   * @returns {Element} documentElement
   */
  root() {
    if (!this.document) return null;
    return this.document.documentElement;
  }

  /**
   * Get the location offset of a EpubCFI or an #id
   * @param {string | EpubCFI} target
   * @param {string} [ignoreClass] for the cfi
   * @returns {{ left: number, top: number }} target position left and top
   */
  locationOf(target, ignoreClass) {
    const targetPos = {
      left: 0,
      top: 0
    };
    if (!this.document) return targetPos;
    let position;
    if (this.epubcfi.isCfiString(target)) {
      const range = new src_epubcfi(target).toRange(this.document, ignoreClass);
      if (range) {
        try {
          if (!range.endContainer || range.startContainer == range.endContainer && range.startOffset == range.endOffset) {
            // If the end for the range is not set, it results in collapsed becoming
            // true. This in turn leads to inconsistent behaviour when calling
            // getBoundingRect. Wrong bounds lead to the wrong page being displayed.
            // https://developer.microsoft.com/en-us/microsoft-edge/platform/issues/15684911/
            let pos = range.startContainer.textContent.indexOf(" ", range.startOffset);
            if (pos == -1) {
              pos = range.startContainer.textContent.length;
            }
            range.setEnd(range.startContainer, pos);
          }
        } catch (e) {
          console.error("setting end offset to start container length failed", e);
        }
        if (range.startContainer.nodeType === Node.ELEMENT_NODE) {
          position = range.startContainer.getBoundingClientRect();
          targetPos.left = position.left;
          targetPos.top = position.top;
        } else {
          // Webkit does not handle collapsed range bounds correctly
          // https://bugs.webkit.org/show_bug.cgi?id=138949

          // Construct a new non-collapsed range
          if (isWebkit) {
            const container = range.startContainer;
            const newRange = new Range();
            try {
              if (container.nodeType === Node.ELEMENT_NODE) {
                position = container.getBoundingClientRect();
              } else if (range.startOffset + 2 < container.length) {
                newRange.setStart(container, range.startOffset);
                newRange.setEnd(container, range.startOffset + 2);
                position = newRange.getBoundingClientRect();
              } else if (range.startOffset - 2 > 0) {
                newRange.setStart(container, range.startOffset - 2);
                newRange.setEnd(container, range.startOffset);
                position = newRange.getBoundingClientRect();
              } else {
                // empty, return the parent element
                position = container.parentNode.getBoundingClientRect();
              }
            } catch (e) {
              console.error(e, e.stack);
            }
          } else {
            position = range.getBoundingClientRect();
          }
        }
      }
    } else if (typeof target === "string" && target.indexOf("#") > -1) {
      const id = target.substring(target.indexOf("#") + 1);
      const el = this.document.getElementById(id);
      if (el) {
        if (isWebkit) {
          // Webkit reports incorrect bounding rects in Columns
          const newRange = new Range();
          newRange.selectNode(el);
          position = newRange.getBoundingClientRect();
        } else {
          position = el.getBoundingClientRect();
        }
      }
    }
    if (position) {
      targetPos.left = position.left;
      targetPos.top = position.top;
    }
    return targetPos;
  }

  /**
   * Create stylesheet link
   * @param {string} key 
   * @param {string} src 
   * @returns {Promise<Node>}
   * @private
   */
  createLink(key, src) {
    return new Promise((resolve, reject) => {
      const id = `epubjs-injected-css-${key}`;
      let node = this.styles.get(id);
      if (node) {
        this.document.head.removeChild(node);
      }
      node = this.document.createElement("link");
      node.rel = "stylesheet";
      node.type = "text/css";
      node.href = src;
      node.onload = () => {
        resolve(node);
      };
      node.onerror = () => {
        reject(new Error(`Failed to load source: ${src}`));
      };
      this.document.head.appendChild(node);
      this.styles.set(id, node);
    });
  }

  /**
   * Create stylesheet rules
   * @param {string} key 
   * @param {object} rules 
   * @returns {Promise<Node>}
   * @private
   */
  createStyle(key, rules) {
    return new Promise(resolve => {
      const id = `epubjs-injected-css-${key}`;
      let node = this.styles.get(id);
      if (node) {
        this.document.head.removeChild(node);
      }
      node = this.document.createElement("style");
      node.id = id;
      this.document.head.appendChild(node);
      Object.keys(rules).forEach(selector => {
        const value = rules[selector];
        const index = node.sheet.cssRules.length;
        const items = Object.keys(value).map(k => {
          return `${k}:${value[k]}`;
        }).join(";");
        node.sheet.insertRule(`${selector}{${items}}`, index);
      });
      this.styles.set(id, node);
      resolve(node);
    });
  }

  /**
   * Append a stylesheet link/rules to the document head
   * @param {string} key
   * @param {string|object} input url or rules 
   * @returns {Promise<Node>}
   * @example appendStylesheet("common", "/pach/to/stylesheet.css")
   * @example appendStylesheet("common", "https://example.com/to/stylesheet.css")
   * @example appendStylesheet("common", { h1: { "font-size": "1.5em" }})
   */
  appendStylesheet(key, input) {
    const def = new defer();
    if (!this.document) {
      def.reject(new Error("Document cannot be null"));
      return def.promise;
    }
    if (typeof input === "string") {
      this.createLink(key, input).then(node => {
        def.resolve(node);
      });
    } else {
      this.createStyle(key, input).then(node => {
        def.resolve(node);
      });
    }
    return def.promise;
  }

  /**
   * Remove a stylesheet link from the document head
   * @param {string} key 
   * @returns {boolean}
   */
  removeStylesheet(key) {
    if (!this.document) {
      return false;
    }
    const id = `epubjs-injected-css-${key}`;
    const node = this.styles.get(id);
    if (typeof node === "undefined") {
      return false;
    }
    this.document.head.removeChild(node);
    return this.styles.delete(id);
  }

  /**
   * Clear all injected stylesheets
   */
  clearStylesheets() {
    this.styles.forEach(node => {
      this.document.head.removeChild(node);
    });
    this.styles.clear();
  }

  /**
   * Append a script node to the document head
   * @param {string} key
   * @param {string} src url 
   * @example appendScript("common", "/path/to/script.js")
   * @example appendScript("common", "https://examples.com/to/script.js")
   * @returns {Promise<Node>} loaded
   */
  appendScript(key, src) {
    return new Promise((resolve, reject) => {
      if (!this.document) {
        reject(new Error("Document cannot be null"));
        return;
      }
      const id = `epubjs-injected-src-${key}`;
      let node = this.styles.get(id);
      if (typeof node === "undefined") {
        node = this.document.createElement("script");
        node.type = "text/javascript";
        node.src = src;
        node.onload = () => {
          resolve(node);
        };
        node.onerror = () => {
          reject(new Error(`Failed to load source: ${src}`));
        };
        this.document.head.appendChild(node);
      }
      this.scripts.set(id, node);
    });
  }

  /**
   * Remove a script node from the document head
   * @param {string} key 
   * @returns {boolean}
   */
  removeScript(key) {
    if (!this.document) {
      return false;
    }
    const id = `epubjs-injected-src-${key}`;
    const node = this.scripts.get(id);
    if (typeof node === "undefined") {
      return false;
    }
    this.document.head.removeChild(node);
    return this.scripts.remove(id);
  }

  /**
   * Clear all injected scripts
   */
  clearScripts() {
    this.scripts.forEach(node => {
      this.document.head.removeChild(node);
    });
    this.scripts.clear();
  }

  /**
   * Append a class to the contents container
   * @param {string} className
   */
  appendClass(className) {
    if (!this.document) return;
    const content = this.content;
    if (content) {
      content.classList.add(className);
    }
  }

  /**
   * Remove a class from the contents container
   * @param {string} className
   */
  removeClass(className) {
    if (!this.document) return;
    const content = this.content;
    if (content) {
      content.classList.remove(className);
    }
  }

  /**
   * Get a Dom Range from EpubCFI
   * @param {EpubCFI} cfi
   * @param {string} [ignoreClass]
   * @returns {Range} range
   */
  range(cfi, ignoreClass) {
    const epubcfi = new src_epubcfi(cfi);
    return epubcfi.toRange(this.document, ignoreClass);
  }

  /**
   * Get an EpubCFI from a Dom Range
   * @param {Range} range
   * @param {string} [ignoreClass]
   * @returns {string} EpubCFI
   */
  cfiFromRange(range, ignoreClass) {
    return new src_epubcfi(range, this.section.cfiBase, ignoreClass).toString();
  }

  /**
   * Get an EpubCFI from a Dom node
   * @param {Node} node
   * @param {string} [ignoreClass]
   * @returns {string} EpubCFI
   */
  cfiFromNode(node, ignoreClass) {
    return new src_epubcfi(node, this.section.cfiBase, ignoreClass).toString();
  }

  /**
   * map
   * @param {Layout} layout 
   * @todo find where this is used - remove?
   * @returns {object[]}
   */
  map(layout) {
    const map = new src_mapping(layout);
    return map.section();
  }

  /**
   * Apply CSS to a Document
   * @param {Layout} layout 
   */
  format(layout) {
    if (layout.flow === "paginated") {
      this.columns(layout);
    } else {
      this.size(layout);
    }
  }

  /**
   * Size the contents to a given width and height
   * @param {Layout} layout
   * @private
   */
  size(layout) {
    const doc = layout.flow === "scrolled-doc";
    const szw = doc ? layout.pageWidth : layout.width;
    const szh = layout.height;
    const dir = layout.direction;
    const viewport = {
      scale: 1.0,
      scalable: "no"
    };
    if (layout.axis === AXIS_V) {
      this.width(szw);
      viewport.width = szw;
      this.css("height", "auto");
      this.css("padding", "20px " + szw / 12 + "px");
    } else {
      this.height(szh);
      viewport.height = szh;
      this.css("width", "auto");
      this.css("padding", szw / 17 + "px 20px");
    }
    this.css("overflow", "hidden");
    this.css("margin", "0");
    this.css("box-sizing", "border-box");
    this.viewport(viewport);
    this.direction(dir);
  }

  /**
   * Apply columns to the contents for pagination
   * @param {Layout} layout
   * @private
   */
  columns(layout) {
    const pgw = layout.pageWidth;
    const pgh = layout.pageHeight;
    const clw = layout.columnWidth;
    const dir = layout.direction;
    const gap = layout.gap;
    this.width(pgw);
    this.height(pgh);
    this.viewport({
      width: pgw,
      height: pgh,
      scale: 1.0,
      scalable: "no"
    });
    this.direction(dir);
    this.css("overflow", "hidden");
    this.css("margin", "0", true);
    this.css("box-sizing", "border-box");
    this.css("max-height", "inherit");
    if (layout.axis === AXIS_V) {
      this.css("display", "flex");
      this.css("padding-top", gap / 2 + "px", true);
      this.css("padding-bottom", gap / 2 + "px", true);
      this.css("padding-left", "20px");
      this.css("padding-right", "20px");
    } else {
      this.css("display", "block");
      this.css("padding-top", "20px");
      this.css("padding-bottom", "20px");
      this.css("padding-left", gap / 2 + "px", true);
      this.css("padding-right", gap / 2 + "px", true);
    }
    this.css("column-gap", gap + "px");
    this.css("column-fill", "auto");
    this.css("column-width", clw + "px");

    // Fix glyph clipping in WebKit
    // https://github.com/futurepress/epub.js/issues/983
    this.css("-webkit-line-box-contain", "block glyphs replaced");
  }

  /**
   * Scale contents from center
   * @param {number} scale
   * @param {number} offsetX
   * @param {number} offsetY
   */
  scale(scale, offsetX, offsetY) {
    const value = "scale(" + scale + ")";
    let translate = "";
    if (offsetX >= 0 || offsetY >= 0) {
      translate = " translate(" + (offsetX || 0) + "px, " + (offsetY || 0) + "px )";
    }
    this.css("transform", value + translate);
    this.css("transform-origin", "top left");
  }

  /**
   * Set the direction of the text
   * @param {string} [dir='ltr'] values: `"ltr"` OR `"rtl"`
   */
  direction(dir = "ltr") {
    this.document.documentElement.dir = dir;
  }

  /**
   * mapPage
   * @param {string} cfiBase 
   * @param {Layout} layout 
   * @param {number} start 
   * @param {number} end 
   * @param {boolean} dev 
   * @returns {any}
   */
  mapPage(cfiBase, layout, start, end, dev) {
    const mapping = new src_mapping(layout, dev);
    return mapping.page(this, cfiBase, start, end);
  }

  /**
   * Set the writingMode of the text
   * @param {string} [mode='horizontal-tb'] `"horizontal-tb"` OR `"vertical-rl"` OR `"vertical-lr"`
   */
  writingMode(mode = "horizontal-tb") {
    if (this.mode === mode) return this.mode;
    const WRITING_MODE = prefixed("writing-mode");
    const elt = this.document.documentElement;
    elt.style[WRITING_MODE] = mode;
    this.mode = this.window.getComputedStyle(elt)[WRITING_MODE] || "";
    return this.mode;
  }

  /**
   * Append listeners
   * @private
   */
  appendListeners() {
    if (!this.document) return;
    //-- DOM EVENTS
    DOM_EVENTS.forEach(eventName => {
      this.document.addEventListener(eventName, this.triggerEvent.bind(this), {
        passive: true
      });
    }, this);
    //-- SELECTION
    this.document.addEventListener("selectionchange", this.selectionHandler.bind(this), {
      passive: true
    });
    //-- RESIZE
    this.resizeObserver = new ResizeObserver(e => {
      requestAnimationFrame(() => this.resize(e));
    });
    this.resizeObserver.observe(this.document.documentElement);
    //-- LINK CLICKED
    replaceLinks(this.content, href => {
      this.emit(EVENTS.CONTENTS.LINK_CLICKED, href);
    });
  }

  /**
   * Remove listeners
   * @private
   */
  removeListeners() {
    if (!this.document) return;
    //-- DOM EVENTS
    DOM_EVENTS.forEach(eventName => {
      this.document.removeEventListener(eventName, this.triggerEvent.bind(this), {
        passive: true
      });
    }, this);
    //-- SELECTION
    this.document.removeEventListener("selectionchange", this.selectionHandler.bind(this), {
      passive: true
    });
    //-- RESIZE
    if (this.resizeObserver) {
      this.resizeObserver.disconnect();
    }
    //-- MUTATION
    if (this.mutationObserver) {
      this.mutationObserver.disconnect();
    }
  }

  /**
   * Emit passed browser events
   * @private
   */
  triggerEvent(e) {
    this.emit(e.type, e);
  }

  /**
   * Handle getting text on selection
   * @private
   */
  selectionHandler(e) {
    if (this.selectionEndTimeout) {
      clearTimeout(this.selectionEndTimeout);
    }
    this.selectionEndTimeout = setTimeout(() => {
      const selection = this.window.getSelection();
      if (!(selection && selection.rangeCount > 0)) return;
      const range = selection.getRangeAt(0);
      if (!range.collapsed) {
        const cfirange = new src_epubcfi(range, this.section.cfiBase).toString();
        this.emit(EVENTS.CONTENTS.SELECTED, cfirange);
        this.emit(EVENTS.CONTENTS.SELECTED_RANGE, range);
      }
    }, 250);
  }

  /**
   * Test if images are loaded or add listener for when they load
   * @private
   */
  imageLoadListeners() {
    const images = this.document.querySelectorAll("img");
    for (let i = 0; i < images.length; i++) {
      const img = images[i];
      if (typeof img.naturalWidth !== "undefined" && img.naturalWidth === 0) {
        img.onload = this.expand.bind(this);
      }
    }
  }

  /**
   * Listen for media query changes and emit 'expand' event
   * Adapted from: https://github.com/tylergaw/media-query-events/blob/master/js/mq-events.js
   * @private
   */
  mediaQueryListeners() {
    const sheets = this.document.styleSheets;
    const mediaChangeHandler = m => {
      if (m.matches) {
        setTimeout(this.expand.bind(this), 1);
      }
    };
    for (let i = 0; i < sheets.length; i += 1) {
      let rules;
      // Firefox errors if we access cssRules cross-domain
      try {
        rules = sheets[i].cssRules;
      } catch (e) {
        console.error(e);
        return;
      }
      if (!rules) return; // Stylesheets changed
      for (let j = 0; j < rules.length; j += 1) {
        if (rules[j].media) {
          const mql = this.window.matchMedia(rules[j].media.mediaText);
          mql.onchange = mediaChangeHandler;
        }
      }
    }
  }

  /**
   * Listen for font load and check for resize when loaded (unused)
   * @private
   */
  fontLoadListeners() {
    if (!this.document || !this.document.fonts) {
      return;
    }

    //this.document.fonts.ready.then(() => this.resize());
  }

  /**
   * Use css transitions to detect resize (unused)
   * @private
   */
  transitionListeners() {
    const body = this.content;
    body.style["transitionProperty"] = "font, font-size, font-size-adjust, font-stretch, font-variation-settings, font-weight, width, height";
    body.style["transitionDuration"] = "0.001ms";
    body.style["transitionTimingFunction"] = "linear";
    body.style["transitionDelay"] = "0";

    //this.document.addEventListener('transitionend', this.resize.bind(this));
  }

  /**
   * Use MutationObserver to listen for changes in 
   * the DOM and check for resize (unused)
   * @private
   */
  mutationListener() {
    const mutation = (mutations, observer) => {
      mutations.forEach(m => {
        //console.log(m)
      });
    };
    this.mutationObserver = new MutationObserver(mutation);
    this.mutationObserver.observe(this.document, {
      attributes: true,
      childList: true,
      characterData: true,
      subtree: true
    });
  }

  /**
   * destroy
   */
  destroy() {
    this.removeListeners();
    this.clearStylesheets();
    this.styles = undefined;
    this.clearScripts();
    this.scripts = undefined;
  }
}
event_emitter_default()(Contents.prototype);
/* harmony default export */ const contents = (Contents);
;// ./src/marks-pane/events.js



const rectContains = (rect, x, y, offset) => {
  const top = rect.top - offset.top;
  const left = rect.left - offset.left;
  const bottom = top + rect.height;
  const right = left + rect.width;
  return top <= y && left <= x && bottom > y && right > x;
};

/**
 * Check if the item contains the point denoted by the passed coordinates
 * @param {Mark} mark the mark object
 * @param {number} x
 * @param {number} y
 * @returns {boolean}
 * @private
 */
const contains = (mark, target, x, y) => {
  const rect = mark.getBoundingClientRect();
  const offset = target.getBoundingClientRect();

  // Check overall bounding box first
  if (!rectContains(rect, x, y, offset)) {
    return false;
  }

  // Then continue to check each child rect
  const rects = mark.getClientRects();
  for (let i = 0, len = rects.length; i < len; i++) {
    if (rectContains(rects[i], x, y, offset)) {
      return true;
    }
  }
  return false;
};

/**
 * Clone a mouse event object.
 * @param {MouseEvent} e A mouse event object to clone.
 * @returns {MouseEvent}
 * @private
 */
const clone = e => {
  const opts = Object.assign({}, e, {
    bubbles: false
  });
  return new MouseEvent(e.type, opts);
};
const dispatch = (e, target, marks) => {
  let x = e.clientX;
  let y = e.clientY;
  if (e.touches && e.touches.length) {
    x = e.touches[0].clientX;
    y = e.touches[0].clientY;
  }
  marks.forEach((mark, key) => {
    if (contains(mark, target, x, y)) {
      mark.dispatchEvent(clone(e));
    }
  });
};

/**
 * Start proxying all mouse events that occur on the target node to each node in
 * a set of tracked marks.
 *
 * The marks in tracked do not strictly have to be DOM Nodes, but they do have
 * to have dispatchEvent, getBoundingClientRect, and getClientRects methods.
 *
 * @param {Node} target The node on which to listen for mouse events.
 * @param {Mark[]} marks A (possibly mutable) array of marks to which to proxy events.
 */
const proxyMouse = (target, marks) => {
  let node;
  if (target.nodeName === "iframe" || target.nodeName === "IFRAME") {
    node = target.contentDocument;
  } else {
    node = target;
  }
  const events = ["mouseup", "mousedown", "click", "touchstart"];
  for (const event of events) {
    node.addEventListener(event, e => dispatch(e, target, marks), false);
  }
};
/* harmony default export */ const events = (proxyMouse);
;// ./src/marks-pane/marks.js


















const NS_URI = "http://www.w3.org/2000/svg";

/**
 * Marks class
 */
class Marks extends Map {
  /**
   * Constructor
   * @param {Node} target view
   * @param {Node} [container=document.body] epub-view container
   */
  constructor(target, container = document.body) {
    super();
    this.target = target;
    /**
     * @member {Node} element the marks container
     * @memberof Marks
     * @readonly
     */
    this.element = document.createElementNS(NS_URI, "svg");
    this.element.style.position = "absolute";
    this.element.setAttribute("pointer-events", "none");
    // Set up mouse event proxying between the target element and the marks
    events(this.target, this);
    this.container = container;
    this.container.appendChild(this.element);
    this.render();
  }

  /**
   * Append mark
   * @param {string} key 
   * @param {Mark} mark 
   * @returns {Mark}
   */
  appendMark(key, mark) {
    const g = document.createElementNS(NS_URI, "g");
    this.element.appendChild(g);
    mark.bind(g, this.container);
    mark.render();
    this.set(key, mark);
    return mark;
  }

  /**
   * Remove mark
   * @param {string} key 
   * @returns {void}
   */
  removeMark(key) {
    const mark = this.get(key);
    if (mark) {
      const el = mark.unbind();
      this.element.removeChild(el);
      this.delete(key);
    }
  }

  /**
   * render
   */
  render() {
    this.updateStyle(this.element);
    this.forEach((mark, key) => mark.render());
  }

  /**
   * Update style
   * @param {Node} el the marks container
   * @private 
   */
  updateStyle(el) {
    const rect = this.target.getBoundingClientRect();
    const offset = this.container.getBoundingClientRect();
    const top = rect.top - offset.top;
    const left = rect.left - offset.left;
    const width = this.target.scrollWidth;
    const height = this.target.scrollHeight;
    el.style.setProperty("top", `${top}px`, "important");
    el.style.setProperty("left", `${left}px`, "important");
    el.style.setProperty("width", `${width}px`, "important");
    el.style.setProperty("height", `${height}px`, "important");
  }
}
/* harmony default export */ const marks = (Marks);
;// ./src/marks-pane/mark.js

/**
 * Mark class
 */
class Mark {
  constructor() {
    /**
     * @member {Node} element the mark container to rects
     * @memberof Mark
     * @readonly
     */
    this.element = null;
    this.range = null;
  }

  /**
   * bind
   * @param {Node} element the mark container to rects
   * @param {Node} container the epub-view container
   */
  bind(element, container) {
    this.element = element;
    this.container = container;
  }

  /**
   * unbind
   * @returns {Node}
   */
  unbind() {
    const el = this.element;
    this.element = null;
    return el;
  }

  /**
   * Clear the mark container
   */
  clear() {
    while (this.element.firstChild) {
      this.element.removeChild(this.element.firstChild);
    }
  }

  /**
   * render
   * @abstract
   */
  render() {}

  /**
   * Dispatch event
   * @param {MouseEvent} e 
   */
  dispatchEvent(e) {
    if (this.element) {
      this.element.dispatchEvent(e);
    }
  }

  /**
   * Get bounding client rect
   * @returns {DOMRect}
   */
  getBoundingClientRect() {
    return this.element.getBoundingClientRect();
  }

  /**
   * Get client rects
   * @returns {object[]}
   */
  getClientRects() {
    const rects = [];
    let el = this.element.firstChild;
    while (el) {
      rects.push(el.getBoundingClientRect());
      el = el.nextSibling;
    }
    return rects;
  }
}
/* harmony default export */ const mark = (Mark);
;// ./src/marks-pane/highlight.js

const highlight_NS_URI = "http://www.w3.org/2000/svg";

/**
 * Highlight class
 * @extends Mark
 */
class Highlight extends mark {
  /**
   * Constructor
   * @param {Range} range 
   * @param {object} [options]
   * @param {string} [options.className] 
   * @param {object} [options.data={}] 
   * @param {object} [options.attributes={}] 
   * @param {object[]} [options.listeners=[]]
   */
  constructor(range, {
    className,
    data,
    attributes,
    listeners
  }) {
    super();
    this.range = range;
    this.className = className;
    this.data = data || {};
    this.attributes = attributes || {};
    this.listeners = listeners || [];
  }

  /**
   * bind
   * @param {Node} element 
   * @param {Node} container 
   * @override
   */
  bind(element, container) {
    super.bind(element, container);
    for (const p in this.data) {
      if (this.data.hasOwnProperty(p)) {
        this.element.dataset[p] = this.data[p];
      }
    }
    for (const p in this.attributes) {
      if (this.attributes.hasOwnProperty(p)) {
        this.element.setAttribute(p, this.attributes[p]);
      }
    }
    if (this.className) {
      this.element.classList.add(this.className);
    }
  }

  /**
   * render
   * @override
   */
  render() {
    this.clear();
    const rects = this.range.getClientRects();
    const offset = this.element.getBoundingClientRect();
    const container = this.container.getBoundingClientRect();
    for (let i = 0, len = rects.length; i < len; i++) {
      const r = rects[i];
      const rect = document.createElementNS(highlight_NS_URI, "rect");
      rect.setAttribute("x", r.left - offset.left + container.left);
      rect.setAttribute("y", r.top - offset.top + container.top);
      rect.setAttribute("height", r.height);
      rect.setAttribute("width", r.width);
      this.element.appendChild(rect);
    }
  }
}
/* harmony default export */ const highlight = (Highlight);
;// ./src/marks-pane/underline.js

const underline_NS_URI = "http://www.w3.org/2000/svg";

/**
 * Underline class
 * @extends Highlight
 */
class Underline extends highlight {
  /**
   * Constructor
   * @param {Range} range 
   * @param {object} [options]
   * @param {string} [options.className] 
   * @param {object} [options.data={}] 
   * @param {object} [options.attributes={}] 
   * @param {object[]} [options.listeners=[]]
   */
  constructor(range, options) {
    super(range, options);
  }

  /**
   * render
   * @override
   */
  render() {
    this.clear();
    const rects = this.range.getClientRects();
    const offset = this.element.getBoundingClientRect();
    const container = this.container.getBoundingClientRect();
    for (let i = 0, len = rects.length; i < len; i++) {
      const r = rects[i];
      const rect = document.createElementNS(underline_NS_URI, "rect");
      const line = document.createElementNS(underline_NS_URI, "line");
      rect.setAttribute("x", r.left - offset.left + container.left);
      rect.setAttribute("y", r.top - offset.top + container.top);
      rect.setAttribute("height", r.height);
      rect.setAttribute("width", r.width);
      rect.setAttribute("fill", "none");
      line.setAttribute("x1", r.left - offset.left + container.left);
      line.setAttribute("x2", r.left - offset.left + container.left + r.width);
      line.setAttribute("y1", r.top - offset.top + container.top + r.height - 1);
      line.setAttribute("y2", r.top - offset.top + container.top + r.height - 1);
      line.setAttribute("stroke-width", 1);
      line.setAttribute("stroke", "black"); //TODO: match text color?
      line.setAttribute("stroke-linecap", "square");
      this.element.appendChild(rect);
      this.element.appendChild(line);
    }
  }
}
/* harmony default export */ const underline = (Underline);
;// ./src/managers/views/iframe.js











const iframe_AXIS_H = "horizontal";
const iframe_AXIS_V = "vertical";

/**
 * IframeView class
 */
class IframeView {
  /**
   * Constructor
   * @param {Layout} layout
   * @param {Section} section
   * @param {object} [options]
   * @param {string} [options.method='write'] values: `"blobUrl"` OR `"srcdoc"` OR `"write"`
   * @param {string} [options.ignoreClass='']
   * @param {string[]} [options.sandbox=[]] iframe sandbox policy list
   */
  constructor(layout, section, options) {
    this.layout = layout;
    this.section = section;
    this.settings = extend({
      method: null,
      sandbox: [],
      forceEvenPages: false,
      ignoreClass: ""
    }, options || {});
    /**
     * @member {string} id
     * @memberof IframeView
     * @readonly
     */
    this.id = "vc-" + uuid();
    /**
     * @member {Contents} contents
     * @memberof IframeView
     * @readonly
     */
    this.contents = null;
    this.document = null;
    /**
     * @member {Element} container
     * @memberof IframeView
     * @readonly
     */
    this.container = null;
    this.displayed = false;
    /**
     * @member {Marks} marks
     * @memberof IframeView
     * @readonly
     */
    this.marks = null;
    /**
     * Load method
     * @member {string} method
     * @memberof IframeView
     * @readonly
     */
    this.method = this.settings.method || "write";
    /**
     * @member {string} writingMode
     * @memberof IframeView
     * @readonly
     */
    this.writingMode = "";
    this.init();
  }

  /**
   * create view-container
   * @private
   */
  init() {
    this.container = document.createElement("div");
    this.container.classList.add("view-container");
    this.container.style.height = "0";
    this.container.style.width = "0";
    this.container.style.overflow = "hidden";
    this.container.style.position = "relative";
  }

  /**
   * Create iframe element
   * @returns {Element} iframe
   * @private
   */
  create() {
    this.iframe = document.createElement("iframe");
    this.iframe.id = this.id;
    this.iframe.seamless = "seamless";
    this.iframe.style.overflow = "hidden";
    this.iframe.style.border = "none";
    this.iframe.style.width = "0";
    this.iframe.style.height = "0";
    this.settings.sandbox.forEach(p => {
      if (p) this.iframe.sandbox.add(p);
    });
    this.iframe.setAttribute("enable-annotation", "true");
    this.container.setAttribute("ref", this.section.index);
    this.width = 0;
    this.height = 0;
    return this.iframe;
  }

  /**
   * render
   * @param {Function} request 
   * @returns {Promise<string>} section render
   */
  render(request) {
    const def = new defer();
    this.create();
    this.section.render(request).then(contents => {
      return this.load(contents);
    }).then(output => {
      this.update();
      def.resolve(output);
    }, err => {
      /**
       * @event loaderror
       * @param {object} err
       * @memberof IframeView
       */
      this.emit(EVENTS.VIEWS.LOAD_ERROR, err);
      def.reject(err);
    }).then(() => {
      /**
       * @event rendered
       * @param {IframeView} view
       * @memberof IframeView
       */
      this.emit(EVENTS.VIEWS.RENDERED, this);
    });
    return def.promise;
  }

  /**
   * reset
   */
  reset() {
    if (this.iframe) {
      this.iframe.style.width = "0";
      this.iframe.style.height = "0";
      this.width = 0;
      this.height = 0;
    }
  }

  /**
   * Update view
   */
  update() {
    this.contents.format(this.layout);
    this.axis();
    this.mode();
    this.expand();
  }

  /**
   * update axis
   * @private
   */
  axis() {
    if (this.layout.axis === iframe_AXIS_H) {
      this.container.style.flex = "none";
    } else {
      this.container.style.flex = "initial";
    }
  }

  /**
   * update writing mode
   * @param {string} value 
   * @private
   */
  mode(value) {
    const mode = value || this.contents.mode;
    if (this.writingMode !== mode) {
      this.writingMode = mode;
      this.emit(EVENTS.VIEWS.WRITING_MODE, mode);
    }
  }

  /**
   * Resize a single axis based on content dimensions
   * @private
   */
  expand() {
    if (!this.iframe || this.expanding) return;
    this.expanding = true;
    const sz = this.contents.textSize();
    if (this.layout.axis === iframe_AXIS_H) {
      if (sz.width % this.layout.pageWidth > 0) {
        sz.width = Math.ceil(sz.width / this.layout.pageWidth) * this.layout.pageWidth;
      }
      if (this.settings.forceEvenPages) {
        const columns = sz.width / this.layout.pageWidth;
        if (this.layout.divisor > 1 && this.layout.name === "reflowable" && columns % 2 > 0) {
          // add a blank page
          sz.width += this.layout.pageWidth;
        }
      }
    } else if (this.layout.axis === iframe_AXIS_V) {
      if (this.layout.flow === "paginated" && sz.height % this.layout.height > 0) {
        sz.height = Math.ceil(sz.height / this.layout.height) * this.layout.height;
      }
    }
    if (this.width !== sz.width || this.height !== sz.height) {
      this.reframe(sz.width, sz.height);
    }
    this.expanding = false;
  }

  /**
   * reframe
   * @param {number} width 
   * @param {number} height 
   * @private
   */
  reframe(width, height) {
    this.container.style.width = width + "px";
    this.container.style.height = height + "px";
    this.iframe.style.width = width + "px";
    this.iframe.style.height = height + "px";
    this.width = width;
    this.height = height;
    this.marks && this.marks.render();
  }

  /**
   * load
   * @param {string} contents 
   * @returns {Promise<any>} loading promise
   */
  load(contents) {
    const loading = new defer();
    if (!this.iframe) {
      loading.reject(new Error("No Iframe Available"));
      return loading.promise;
    }
    this.container.appendChild(this.iframe);
    this.document = this.iframe.contentDocument;
    this.iframe.onload = e => this.onLoad(e, loading);
    if (!this.document) {
      loading.reject(new Error("No Document Available"));
      return loading.promise;
    } else if (this.method === "blobUrl") {
      this.blobUrl = createBlobUrl(contents, "application/xhtml+xml");
      this.iframe.src = this.blobUrl;
    } else if (this.method === "srcdoc") {
      this.iframe.srcdoc = contents;
    } else {
      this.document.open();
      this.document.write("<!DOCTYPE html>");
      this.document.write(contents);
      this.document.close();
    }
    return loading.promise;
  }

  /**
   * onLoad
   * @param {Event} event 
   * @param {Defer} defer 
   */
  onLoad(event, defer) {
    this.document = event.target.contentDocument;
    this.contents = new contents(this.document, this.document.body, this.section);
    let link = this.document.querySelector("link[rel='canonical']");
    if (link) {
      link.setAttribute("href", this.section.canonical);
    } else {
      link = this.document.createElement("link");
      link.setAttribute("rel", "canonical");
      link.setAttribute("href", this.section.canonical);
      this.document.head.appendChild(link);
    }
    this.contents.on(EVENTS.CONTENTS.RESIZED, rect => {
      /**
       * @event resized
       * @param {object} rect
       * @memberof IframeView
       */
      this.emit(EVENTS.VIEWS.RESIZED, rect);
    });
    defer.resolve(this.contents);
  }

  /**
   * display
   * @param {Function} request 
   * @returns {Promise<view>} displayed promise
   */
  display(request) {
    const displayed = new defer();
    if (this.displayed) {
      displayed.resolve(this);
    } else {
      this.render(request).then(() => {
        /**
         * @event displayed
         * @memberof IframeView
         */
        this.emit(EVENTS.VIEWS.DISPLAYED);
        this.displayed = true;
        displayed.resolve(this);
      }, err => {
        displayed.reject(err);
      });
    }
    return displayed.promise;
  }

  /**
   * show
   */
  show() {
    this.container.style.visibility = "visible";
    this.iframe.style.visibility = "visible";
    // Remind Safari to redraw the iframe
    this.iframe.style.transform = "translateZ(0)";
    this.iframe.offsetWidth;
    this.iframe.style.transform = null;
    /**
     * @event shown
     * @param {IframeView} view
     * @memberof IframeView
     */
    this.emit(EVENTS.VIEWS.SHOWN, this);
  }

  /**
   * hide
   */
  hide() {
    this.container.style.visibility = "hidden";
    this.iframe.style.visibility = "hidden";
    /**
     * @event hidden
     * @param {IframeView} view
     * @memberof IframeView
     */
    this.emit(EVENTS.VIEWS.HIDDEN, this);
  }

  /**
   * offset
   * @returns {{ top: number, left: number }}
   */
  offset() {
    return {
      top: this.container.offsetTop,
      left: this.container.offsetLeft
    };
  }

  /**
   * position
   * @returns {DOMRect}
   */
  position() {
    return this.container.getBoundingClientRect();
  }

  /**
   * locationOf
   * @param {string|EpubCFI} target 
   * @returns {{ top: number, left: number }}
   */
  locationOf(target) {
    const pos = this.contents.locationOf(target, this.settings.ignoreClass);
    return {
      top: pos.top,
      left: pos.left
    };
  }

  /**
   * highlight
   * @param {string} cfiRange 
   * @param {object} [data={}] 
   * @param {Function} [cb=null] callback function
   * @param {string} [className='epubjs-hl'] 
   * @param {object} [styles={}] 
   * @returns {object}
   */
  highlight(cfiRange, data = {}, cb = null, className = "epubjs-hl", styles = {}) {
    if (!this.contents) {
      return;
    }
    data["epubcfi"] = cfiRange;
    if (this.marks === null) {
      this.marks = new marks(this.iframe, this.container);
    }
    const attributes = Object.assign({
      "fill": "yellow",
      "fill-opacity": "0.3",
      "mix-blend-mode": "multiply"
    }, styles);
    const emitter = e => {
      /**
       * @event markClicked
       * @param {string} cfiRange
       * @param {object} data
       * @memberof IframeView
       */
      this.emit(EVENTS.VIEWS.MARK_CLICKED, cfiRange, data);
    };
    const key = encodeURI("epubjs-hl:" + cfiRange);
    const range = this.contents.range(cfiRange);
    const m = new highlight(range, {
      className,
      data,
      attributes,
      listeners: [emitter, cb]
    });
    const h = this.marks.appendMark(key, m);
    h.element.setAttribute("ref", className);
    h.element.addEventListener("click", emitter);
    h.element.addEventListener("touchstart", emitter);
    if (cb) {
      h.element.addEventListener("click", cb);
      h.element.addEventListener("touchstart", cb);
    }
    return h;
  }

  /**
   * underline
   * @param {string} cfiRange 
   * @param {object} [data={}] 
   * @param {Function} [cb=null]
   * @param {string} [className='epubjs-ul'] 
   * @param {object} [styles={}] 
   * @returns {object}
   */
  underline(cfiRange, data = {}, cb = null, className = "epubjs-ul", styles = {}) {
    if (!this.contents) {
      return;
    }
    data["epubcfi"] = cfiRange;
    if (this.marks === null) {
      this.marks = new marks(this.iframe, this.container);
    }
    const attributes = Object.assign({
      "stroke": "black",
      "stroke-opacity": "0.3",
      "mix-blend-mode": "multiply"
    }, styles);
    const emitter = e => {
      /**
       * @event markClicked
       * @param {string} cfiRange
       * @param {object} data
       * @memberof IframeView
       */
      this.emit(EVENTS.VIEWS.MARK_CLICKED, cfiRange, data);
    };
    const key = encodeURI("epubjs-ul:" + cfiRange);
    const range = this.contents.range(cfiRange);
    const m = new underline(range, {
      className,
      data,
      attributes,
      listeners: [emitter, cb]
    });
    const h = this.marks.appendMark(key, m);
    h.element.setAttribute("ref", className);
    h.element.addEventListener("click", emitter);
    h.element.addEventListener("touchstart", emitter);
    if (cb) {
      h.element.addEventListener("click", cb);
      h.element.addEventListener("touchstart", cb);
    }
    return h;
  }

  /**
   * unhighlight
   * @param {string} cfiRange 
   * @returns {boolean}
   */
  unhighlight(cfiRange) {
    const key = encodeURI("epubjs-hl:" + cfiRange);
    const mark = this.marks.get(key);
    let result = false;
    if (mark) {
      mark.listeners.forEach(l => {
        if (l) {
          mark.element.removeEventListener("click", l);
          mark.element.removeEventListener("touchstart", l);
        }
        ;
      });
      this.marks.removeMark(key);
      result = true;
    }
    return result;
  }

  /**
   * ununderline
   * @param {string} cfiRange 
   * @returns {boolean}
   */
  ununderline(cfiRange) {
    const key = encodeURI("epubjs-ul:" + cfiRange);
    const mark = this.marks.get(key);
    let result = false;
    if (mark) {
      mark.listeners.forEach(l => {
        if (l) {
          mark.element.removeEventListener("click", l);
          mark.element.removeEventListener("touchstart", l);
        }
        ;
      });
      this.marks.removeMark(key);
      result = true;
    }
    return result;
  }

  /**
   * destroy
   */
  destroy() {
    if (this.marks) {
      this.marks.forEach((mark, key) => {
        if (mark instanceof highlight) {
          this.unhighlight(mark.data["epubcfi"]);
        } else {
          this.ununderline(mark.data["epubcfi"]);
        }
      });
    }
    if (this.blobUrl) {
      revokeBlobUrl(this.blobUrl);
      this.blobUrl = undefined;
    }
    if (this.displayed) {
      this.displayed = undefined;
      this.expanding = undefined;
      this.document = undefined;
      this.contents.destroy();
      this.contents = undefined;
      this.settings = undefined;
      this.section = undefined;
      this.container.removeChild(this.iframe);
      this.container = undefined;
      this.iframe = undefined;
      this.layout = undefined;
      this.method = undefined;
      this.width = undefined;
      this.height = undefined;
      this.writingMode = undefined;
      this.id = undefined;
      if (this.marks) {
        this.marks.element.remove();
        this.marks.clear();
        this.marks = undefined;
      }
    }
  }
}
event_emitter_default()(IframeView.prototype);
/* harmony default export */ const iframe = (IframeView);
;// ./src/utils/scrolltype.js
/**
 * createDefiner
 * @returns {Element}
 */
const createDefiner = () => {
  const definer = document.createElement("div");
  definer.dir = "rtl";
  definer.style.position = "fixed";
  definer.style.width = "1px";
  definer.style.height = "1px";
  definer.style.top = "0px";
  definer.style.left = "0px";
  definer.style.overflow = "hidden";
  const innerDiv = document.createElement("div");
  innerDiv.style.width = "2px";
  const spanA = document.createElement("span");
  spanA.style.width = "1px";
  spanA.style.display = "inline-block";
  const spanB = document.createElement("span");
  spanB.style.width = "1px";
  spanB.style.display = "inline-block";
  innerDiv.appendChild(spanA);
  innerDiv.appendChild(spanB);
  definer.appendChild(innerDiv);
  return definer;
};

/**
 * Detect RTL scroll type
 * @link https://github.com/othree/jquery.rtl-scroll-type/blob/master/src/jquery.rtl-scroll.js
 * @returns {string} scroll type
 */
const scrollType = () => {
  let type = "reverse";
  const definer = createDefiner();
  document.body.appendChild(definer);
  if (definer.scrollLeft > 0) {
    type = "default";
  } else {
    if (typeof Element !== "undefined" && Element.prototype.scrollIntoView) {
      definer.children[0].children[1].scrollIntoView();
      if (definer.scrollLeft < 0) {
        type = "negative";
      }
    } else {
      definer.scrollLeft = 1;
      if (definer.scrollLeft === 0) {
        type = "negative";
      }
    }
  }
  document.body.removeChild(definer);
  return type;
};
/* harmony default export */ const scrolltype = (scrollType);
// EXTERNAL MODULE: ./node_modules/lodash/debounce.js
var debounce = __webpack_require__(8221);
var debounce_default = /*#__PURE__*/__webpack_require__.n(debounce);
;// ./src/managers/default/index.js


















const default_AXIS_H = "horizontal";
const default_AXIS_V = "vertical";

/**
 * Default View Manager
 */
class DefaultViewManager {
  /**
   * Constructor
   * @param {Book} book 
   * @param {object} [options]
   * @param {string} [options.method] values: `"blobUrl"` OR `"srcdoc"` OR `"write"`
   * @param {string} [options.ignoreClass='']
   * @param {string|object} [options.view='iframe']
   * @param {string[]} [options.sandbox=[]] iframe sandbox policy list
   */
  constructor(book, options) {
    /**
     * @member {string} name Manager name
     * @memberof DefaultViewManager
     * @readonly
     */
    this.name = "default";
    this.load = book.load.bind(book);
    this.layout = book.rendition.layout;
    this.layout.on(EVENTS.LAYOUT.UPDATED, (props, changed) => {
      if (changed.flow) {
        this.paginated = props.flow === "paginated";
      }
      this.views.update();
      this.calculate();
    });
    this.settings = extend({
      view: "iframe",
      method: null,
      sandbox: [],
      ignoreClass: "",
      forceEvenPages: true
    }, options || {});
    /**
     * @member {boolean} paginated
     * @memberof DefaultViewManager
     * @readonly
     */
    this.paginated = this.layout.flow === "paginated";
    /**
     * @member {object[]} location
     * @memberof DefaultViewManager
     * @readonly
     */
    this.location = [];
    /**
     * @member {Mapping} mapping
     * @memberof DefaultViewManager
     * @readonly
     */
    this.mapping = new src_mapping(this.layout);
    /**
     * @member {boolean} rendered
     * @memberof DefaultViewManager
     * @readonly
     */
    this.rendered = false;
    this.scrollType = null;
    /**
     * @member {Views} views 
     * @memberof DefaultViewManager
     * @readonly
     */
    this.views = new views();
    this.viewport = book.rendition.viewport;
    /**
     * @member {string} writingMode
     * @memberof DefaultViewManager
     * @readonly
     */
    this.writingMode = null;
    this.q = new queue(this);
  }

  /**
   * render
   * @param {Element|string} element viewport element
   * @param {object} size 
   * @param {string|number} size.width
   * @param {string|number} size.height
   */
  render(element, size) {
    this.scrollType = scrolltype();
    this.viewport.attachTo(element, {
      views: this.views,
      width: size.width,
      height: size.height
    });
    this.rendered = true;
    this.appendEventListeners();
    window.onpagehide = this.destroy.bind(this);
  }

  /**
   * display
   * @param {Section} section 
   * @param {string|number} [target] 
   * @returns {Promise<view|null>} displaying promise
   */
  display(section, target) {
    const displaying = new defer();
    if (target === section.href || isNumber(target)) {
      target = undefined;
    }
    const view = this.views.find(section);
    if (view) {
      const offset = view.offset();
      let x,
        y = offset.top;
      if (this.layout.direction === "ltr") {
        x = offset.left;
        this.scrollTo(x, y, true);
      } else {
        x = offset.left + view.width;
        this.scrollTo(x, y, true);
      }
      if (target) {
        this.moveTo(view.locationOf(target), view.width);
      }
      displaying.resolve();
      return displaying.promise;
    }
    this.clear();
    this.append(section).then(view => {
      // Move to correct place within the section, if needed
      if (target) {
        const offset = view.locationOf(target);
        this.moveTo(offset, view.width);
      }
      return view;
    }, err => {
      displaying.reject(err);
    }).then(view => {
      this.views.show();
      displaying.resolve(view);
    });
    return displaying.promise;
  }

  /**
   * appendEventListeners
   * @private
   */
  appendEventListeners() {
    const lsc = this.views.container;
    lsc.addEventListener("scroll", this.onscroll.bind(this));
    if ("onscrollend" in window) {
      lsc.addEventListener("scrollend", this.onscrollend.bind(this));
    }
    const timeout = this.name === "default" ? 0 : 30;
    this.scrollend = debounce_default()(this.scrolled.bind(this), timeout);
  }

  /**
   * removeEventListeners
   * @private
   */
  removeEventListeners() {
    const lsc = this.views.container;
    lsc.removeEventListener("scroll", this.onscroll.bind(this));
    if ("onscrollend" in window) {
      lsc.removeEventListener("scrollend", this.onscrollend.bind(this));
    }
    this.scrollend = undefined;
  }

  /**
   * Require the view from passed string, or as a class function
   * @param {string|class} view
   * @return {class}
   * @private
   */
  requireView(view) {
    let result;
    if (typeof view == "string" && view === "iframe") {
      result = iframe;
    } else {
      result = view;
    }
    return result;
  }

  /**
   * createView
   * @param {Section} section 
   * @returns {object} View (default: IframeView)
   * @private
   */
  createView(section) {
    const view = this.requireView(this.settings.view);
    return new view(this.layout, section, {
      snap: this.settings.snap,
      method: this.settings.method,
      sandbox: this.settings.sandbox,
      ignoreClass: this.settings.ignoreClass,
      forceEvenPages: this.settings.forceEvenPages
    });
  }

  /**
   * the view displayed event handler
   * @param {object} view 
   * @private
   */
  displayed(view) {
    this.emit(EVENTS.MANAGERS.ADDED, view);
  }

  /**
   * the view resized event handler
   * @param {object} view 
   * @private
   */
  resized(view) {
    this.relocated();
    this.emit(EVENTS.MANAGERS.RESIZED, view);
  }

  /**
   * moveTo
   * @param {object} offset
   * @param {number} offset.top
   * @param {number} offset.left
   * @param {number} width 
   * @private
   */
  moveTo(offset, width) {
    let distX = 0,
      distY;
    const lsc = this.views.container;
    if (this.paginated) {
      distX = Math.floor(offset.left / this.layout.delta) * this.layout.delta;
      if (distX + this.layout.delta > lsc.scrollWidth) {
        distX = lsc.scrollWidth - this.layout.delta;
      }
      distY = Math.floor(offset.top / this.layout.delta) * this.layout.delta;
      if (distY + this.layout.delta > lsc.scrollHeight) {
        distY = lsc.scrollHeight - this.layout.delta;
      }
    } else {
      distY = offset.top;
    }
    if (this.layout.direction === "rtl") {
      /***
      	the `floor` function above (L343) is on positive values, so we should add one `layout.delta`
      	to distX or use `Math.ceil` function, or multiply offset.left by -1
      	before `Math.floor`
      */
      distX = distX + this.layout.delta;
      distX = distX - width;
    }
    this.scrollTo(distX, distY, true);
  }

  /**
   * append
   * @param {Section} section Section object
   * @returns {Promise<any>}
   * @private
   */
  append(section) {
    const view = this.createView(section);
    view.on(EVENTS.VIEWS.DISPLAYED, () => {
      this.displayed(view);
    });
    view.on(EVENTS.VIEWS.RESIZED, rect => {
      this.resized(view);
    });
    view.on(EVENTS.VIEWS.WRITING_MODE, mode => {
      this.updateWritingMode(mode);
    });
    this.views.append(view);
    return view.display(this.load);
  }

  /**
   * prepend
   * @param {Section} section 
   * @returns {Promise<any>}
   * @private
   */
  prepend(section) {
    const view = this.createView(section);
    view.on(EVENTS.VIEWS.DISPLAYED, () => {
      this.displayed(view);
    });
    view.on(EVENTS.VIEWS.RESIZED, rect => {
      this.counter(view);
      this.resized(view);
    });
    view.on(EVENTS.VIEWS.WRITING_MODE, mode => {
      this.updateWritingMode(mode);
    });
    this.views.prepend(view);
    return view.display(this.load);
  }

  /**
   * counter
   * @param {object} view 
   * @private
   */
  counter(view) {
    const content = view.contents.content;
    if (this.layout.axis === default_AXIS_V) {
      const y = content.scrollHeight;
      this.scrollBy(0, y, true);
    } else {
      const x = content.scrollWidth;
      this.scrollBy(x, 0, true);
    }
  }

  /**
   * next
   * @returns {Promise<view|null>} next view
   */
  next() {
    let left, section;
    const def = new defer();
    const dir = this.layout.direction;
    const ish = this.layout.axis === default_AXIS_H && this.paginated;
    const isv = this.layout.axis === default_AXIS_V && this.paginated;
    const lsc = this.views.container;
    if (this.views.length === 0) {
      def.resolve(null);
      return def.promise;
    } else if (ish && dir === "ltr") {
      this.scrollLeft = lsc.scrollLeft;
      left = lsc.scrollLeft + lsc.offsetWidth + this.layout.delta;
      if (left <= lsc.scrollWidth) {
        this.scrollBy(this.layout.delta, 0, true);
      } else {
        section = this.views.last().section.next();
      }
    } else if (ish && dir === "rtl") {
      this.scrollLeft = lsc.scrollLeft;
      if (this.scrollType === "default") {
        left = lsc.scrollLeft;
        if (left > 0) {
          this.scrollBy(this.layout.delta, 0, true);
        } else {
          section = this.views.last().section.next();
        }
      } else {
        left = lsc.scrollLeft + this.layout.delta * -1;
        if (left > lsc.scrollWidth * -1) {
          this.scrollBy(this.layout.delta, 0, true);
        } else {
          section = this.views.last().section.next();
        }
      }
    } else if (isv) {
      const top = lsc.scrollTop + lsc.offsetHeight;
      if (top < lsc.scrollHeight) {
        this.scrollBy(0, this.layout.height, true);
      } else {
        section = this.views.last().section.next();
      }
    } else {
      section = this.views.last().section.next();
    }
    if (section) {
      this.clear();
      // The new section may have a different 
      // writing-mode from the old section. 
      // Thus, we need to update layout.
      this.calculate();
      this.append(section).then(view => {
        // Reset position to start for scrolled-doc vertical-rl in default mode
        if (!ish && dir === "rtl" && this.scrollType === "default") {
          this.scrollTo(lsc.scrollWidth, 0, true);
        }
        this.views.show();
        def.resolve(view);
      }, err => {
        def.reject(err);
      });
    } else {
      this.relocated();
      def.resolve(null);
    }
    return def.promise;
  }

  /**
   * prev
   * @returns {Promise<view|null>}
   */
  prev() {
    let left, section;
    const def = new defer();
    const dir = this.layout.direction;
    const ish = this.layout.axis === default_AXIS_H && this.paginated;
    const isv = this.layout.axis === default_AXIS_V && this.paginated;
    const lsc = this.views.container;
    if (this.views.length === 0) {
      def.resolve(null);
      return def.promise;
    } else if (ish && dir === "ltr") {
      this.scrollLeft = lsc.scrollLeft;
      left = lsc.scrollLeft;
      if (left > 0) {
        this.scrollBy(-this.layout.delta, 0, true);
      } else {
        section = this.views.first().section.prev();
      }
    } else if (ish && dir === "rtl") {
      this.scrollLeft = lsc.scrollLeft;
      if (this.scrollType === "default") {
        left = lsc.scrollLeft + lsc.offsetWidth;
        if (left < lsc.scrollWidth) {
          this.scrollBy(-this.layout.delta, 0, true);
        } else {
          section = this.views.first().section.prev();
        }
      } else {
        left = lsc.scrollLeft;
        if (left < 0) {
          this.scrollBy(-this.layout.delta, 0, true);
        } else {
          section = this.views.first().section.prev();
        }
      }
    } else if (isv) {
      const top = lsc.scrollTop;
      if (top > 0) {
        this.scrollBy(0, -this.layout.height, true);
      } else {
        section = this.views.first().section.prev();
      }
    } else {
      section = this.views.first().section.prev();
    }
    if (section) {
      this.clear();
      // The new section may have a different 
      // writing-mode from the old section. 
      // Thus, we need to update layout.
      this.calculate();
      this.prepend(section).then(view => {
        if (ish) {
          if (dir === "rtl") {
            if (this.scrollType === "default") {
              this.scrollTo(0, 0, true);
            } else {
              this.scrollTo(lsc.scrollWidth * -1 + this.layout.delta, 0, true);
            }
          } else {
            this.scrollTo(lsc.scrollWidth - this.layout.delta, 0, true);
          }
        }
        this.views.show();
        def.resolve(view);
      }, err => {
        def.reject(err);
      });
    } else {
      this.relocated();
      def.resolve(null);
    }
    return def.promise;
  }

  /**
   * Get current visible view
   * @returns {view|null} view
   */
  current() {
    const views = this.visible();
    if (views.length) {
      return views[views.length - 1];
    }
    return null;
  }

  /**
   * clear views
   */
  clear() {
    this.views.hide();
    this.scrollTo(0, 0, true);
    this.views.clear();
  }

  /**
   * relocated
   * @private
   */
  relocated() {
    this.currentLocation();
    this.emit(EVENTS.MANAGERS.RELOCATED, this.location);
  }

  /**
   * currentLocation
   * @returns {object[]} Location sections
   */
  currentLocation() {
    if (this.layout.axis === default_AXIS_H && this.paginated) {
      this.location = this.paginatedLocation();
    } else {
      this.location = this.scrolledLocation();
    }
    return this.location;
  }

  /**
   * Get location from scrolled flow
   * @returns {object[]} Location sections
   * @private
   */
  scrolledLocation() {
    const lsc = this.views.container;
    const views = this.visible();
    const sections = views.map(view => {
      const {
        index,
        href
      } = view.section;
      let startPos;
      let endPos;
      let startPage;
      let endPage;
      let total;
      if (this.layout.axis === default_AXIS_V) {
        const top = lsc.scrollTop;
        startPos = Math.abs(top);
        endPos = Math.abs(top) + lsc.clientHeight;
        startPage = Math.ceil(startPos / lsc.clientHeight);
        endPage = Math.ceil(endPos / lsc.clientHeight);
        total = this.layout.count(view.height, lsc.clientHeight).pages;
      } else {
        const left = lsc.scrollLeft;
        startPos = Math.abs(left);
        endPos = Math.abs(left) + lsc.clientWidth;
        startPage = Math.ceil(startPos / lsc.clientWidth);
        endPage = Math.ceil(endPos / lsc.clientWidth);
        total = this.layout.count(view.height, lsc.clientWidth).pages;
      }
      const pages = [];
      for (let i = startPage; i < endPage; i++) {
        pages.push({
          index: i
        });
      }
      const mapping = this.mapping.page(view.contents, view.section.cfiBase, startPos, endPos);
      return {
        axis: this.layout.axis,
        href,
        index,
        pages,
        total,
        mapping
      };
    });
    return sections;
  }

  /**
   * Get location from paginated flow
   * @returns {object[]} sections
   * @private
   */
  paginatedLocation() {
    const lsc = this.views.container;
    const rect = this.viewport.rect;
    const left = lsc.scrollLeft;
    const views = this.visible();
    const sections = views.map(view => {
      const {
        index,
        href
      } = view.section;
      const pages = [];
      const total = this.layout.count(view.width).pages;
      const startPos = Math.abs(left);
      const endPos = Math.abs(left) + rect.width;
      const startPage = Math.floor(startPos / this.layout.pageWidth);
      const endPage = Math.floor(endPos / this.layout.pageWidth);
      for (let i = startPage; i < endPage; i++) {
        pages.push({
          index: i
        });
      }
      const mapping = this.mapping.page(view.contents, view.section.cfiBase, startPos, endPos);
      return {
        axis: this.layout.axis,
        href,
        index,
        pages,
        total,
        mapping
      };
    });
    return sections;
  }

  /**
   * isVisible
   * @param {any} view 
   * @param {number} offsetPrev 
   * @param {number} offsetNext 
   * @returns {boolean}
   * @private
   */
  isVisible(view, offsetPrev, offsetNext) {
    const vpos = view.position();
    const rect = this.viewport.rect;
    if (this.layout.axis === default_AXIS_H && vpos.right > rect.left - offsetPrev && vpos.left < rect.right + offsetNext) {
      return true;
    }
    if (this.layout.axis === default_AXIS_V && vpos.bottom > rect.top - offsetPrev && vpos.top < rect.bottom + offsetNext) {
      return true;
    }
    return false;
  }

  /**
   * Get array of visible views
   * @returns {object[]} array of visible views
   */
  visible() {
    const views = this.views.displayed();
    const items = [];
    for (let i = 0, len = views.length; i < len; i++) {
      const view = views[i];
      if (this.isVisible(view, 0, 0)) {
        items.push(view);
      }
    }
    return items;
  }

  /**
   * scrollBy
   * @param {number} x 
   * @param {number} y 
   * @param {boolean} silent 
   * @private
   */
  scrollBy(x, y, silent) {
    const dir = this.layout.direction === "rtl" ? -1 : 1;
    const lsc = this.views.container;
    if (silent) {
      this.ignore = true;
    }
    if (x) lsc.scrollLeft += x * dir;
    if (y) lsc.scrollTop += y;
  }

  /**
   * scrollTo
   * @param {number} x 
   * @param {number} y 
   * @param {boolean} silent 
   * @private
   */
  scrollTo(x, y, silent) {
    if (silent) {
      this.ignore = true;
    }
    this.views.container.scrollLeft = x;
    this.views.container.scrollTop = y;
  }

  /**
   * scrolled
   * @param {Event} e 
   */
  scrolled(e) {
    if (this.paginated && this.name === "default") {
      return;
    }
    this.relocated();
    this.emit(EVENTS.MANAGERS.SCROLLED, {
      top: e.target.scrollTop,
      left: e.target.scrollLeft
    });
  }

  /**
   * onscroll
   * @param {Event} e 
   * @private
   */
  onscroll(e) {
    if (this.paginated && this.name === "default") {
      return;
    }
    if (this.ignore) {
      this.ignore = false;
    } else {
      this.emit(EVENTS.MANAGERS.SCROLL, {
        top: e.target.scrollTop,
        left: e.target.scrollLeft
      });
      if (!("onscrollend" in window)) {
        this.scrollend(e);
      }
    }
  }

  /**
   * onscrollend
   * @param {Event} e 
   * @private
   */
  onscrollend(e) {
    this.scrollend(e);
  }

  /**
   * calculate
   * @private
   */
  calculate() {
    if (this.paginated) {
      this.layout.calculate(this.viewport.rect.width, this.viewport.rect.height, this.settings.gap);
      this.settings.offset = this.layout.delta / this.layout.divisor;
    } else {
      this.layout.calculate(this.viewport.rect.width, this.viewport.rect.height);
    }
  }

  /**
   * Update writing mode
   * @param {string} mode 
   * @private
   */
  updateWritingMode(mode) {
    this.writingMode = mode;
  }

  /**
   * Get contents array from views
   * @returns {Array<Contents>} [view.contents]
   */
  getContents() {
    const contents = [];
    if (!this.views) {
      return contents;
    }
    this.views.forEach(view => {
      view && contents.push(view.contents);
    });
    return contents;
  }

  /**
   * isRendered
   * @returns {boolean}
   */
  isRendered() {
    return this.rendered;
  }

  /**
   * destroy
   */
  destroy() {
    this.removeEventListeners();
    this.views.destroy();
    this.views = undefined;
    this.ignore = undefined;
    this.location = undefined;
    this.rendered = undefined;
    this.paginated = undefined;
    this.scrollType = undefined;
    this.writingMode = undefined;
  }
}
event_emitter_default()(DefaultViewManager.prototype);
/* harmony default export */ const managers_default = (DefaultViewManager);
;// ./src/managers/helpers/snap.js





// easing equations from https://github.com/danro/easing-js/blob/master/easing.js
const PI_D2 = Math.PI / 2;
const EASING_EQUATIONS = {
  easeOutSine: pos => {
    return Math.sin(pos * PI_D2);
  },
  easeInOutSine: pos => {
    return -0.5 * (Math.cos(Math.PI * pos) - 1);
  },
  easeInOutQuint: pos => {
    if ((pos /= 0.5) < 1) {
      return 0.5 * Math.pow(pos, 5);
    }
    return 0.5 * (Math.pow(pos - 2, 5) + 2);
  },
  easeInCubic: pos => {
    return Math.pow(pos, 3);
  }
};

/**
 * Snap
 */
class Snap {
  /**
   * Constructor
   * @param {*} manager
   * @param {object} [options]
   * @param {number} [options.duration=300]
   * @param {number} [options.minVelocity=0.2]
   * @param {number} [options.minDistance=10]
   */
  constructor(manager, options) {
    this.settings = extend({
      duration: 300,
      minVelocity: 0.2,
      minDistance: 10,
      easing: EASING_EQUATIONS["easeInCubic"]
    }, options || {});
    if (this.supportsTouch()) {
      this.setup(manager);
    }
  }

  /**
   * setup
   * @param {*} manager 
   */
  setup(manager) {
    this.manager = manager;
    this.layout = this.manager.layout;
    this.element = this.manager.views.container;
    this.scroller = this.element;

    // set lookahead offset to page width
    this.manager.settings.offset = this.layout.width;
    this.manager.settings.afterScrolledTimeout = this.settings.duration * 2;
    this.isVertical = this.manager.layout.axis === "vertical";

    // disable snapping if not paginated or axis in not horizontal
    if (!this.manager.paginated || this.isVertical) {
      return;
    }
    this.touchCanceler = false;
    this.resizeCanceler = false;
    this.snapping = false;
    this.scrollLeft;
    this.scrollTop;
    this.startTouchX = undefined;
    this.startTouchY = undefined;
    this.startTime = undefined;
    this.endTouchX = undefined;
    this.endTouchY = undefined;
    this.endTime = undefined;
    this.addListeners();
  }

  /**
   * supportsTouch
   * @returns {boolean}
   */
  supportsTouch() {
    return "ontouchstart" in window || window.DocumentTouch && document instanceof DocumentTouch;
  }

  /**
   * disableScroll
   * @private
   */
  disableScroll() {

    //this.element.style.overflow = "hidden";
  }

  /**
   * enableScroll
   * @private
   */
  enableScroll() {

    //this.element.style.overflow = null;
  }

  /**
   * addListeners
   * @private
   */
  addListeners() {
    window.addEventListener("resize", this.onResize.bind(this));
    this.scroller.addEventListener("scroll", this.onScroll.bind(this));
    this.scroller.addEventListener("touchstart", this.onTouchStart.bind(this), {
      passive: true
    });
    this.scroller.addEventListener("touchmove", this.onTouchMove.bind(this), {
      passive: true
    });
    this.scroller.addEventListener("touchend", this.onTouchEnd.bind(this), {
      passive: true
    });
    this.on("touchstart", this.onTouchStart.bind(this));
    this.on("touchmove", this.onTouchMove.bind(this));
    this.on("touchend", this.onTouchEnd.bind(this));
    this.manager.on(EVENTS.MANAGERS.ADDED, this.afterDisplayed.bind(this));
  }

  /**
   * removeListeners
   * @private
   */
  removeListeners() {
    window.removeEventListener("resize", this.onResize.bind(this));
    this.scroller.removeEventListener("scroll", this.onScroll.bind(this));
    this.scroller.removeEventListener("touchstart", this.onTouchStart.bind(this), {
      passive: true
    });
    this.scroller.removeEventListener("touchmove", this.onTouchMove.bind(this), {
      passive: true
    });
    this.scroller.removeEventListener("touchend", this.onTouchEnd.bind(this), {
      passive: true
    });
    this.off("touchstart", this.onTouchStart.bind(this));
    this.off("touchmove", this.onTouchMove.bind(this));
    this.off("touchend", this.onTouchEnd.bind(this));
    this.manager.off(EVENTS.MANAGERS.ADDED, this.afterDisplayed.bind(this));
  }

  /**
   * afterDisplayed
   * @param {*} view
   * @private
   */
  afterDisplayed(view) {
    const contents = view.contents;
    ["touchstart", "touchmove", "touchend"].forEach(e => {
      contents.on(e, ev => this.triggerViewEvent(ev, contents));
    });
  }

  /**
   * triggerViewEvent
   * @param {Event} e 
   * @param {Contents} contents 
   * @private
   */
  triggerViewEvent(e, contents) {
    this.emit(e.type, e, contents);
  }

  /**
   * onScroll
   * @param {Event} e 
   * @private
   */
  onScroll(e) {
    this.scrollLeft = this.scroller.scrollLeft;
    this.scrollTop = this.scroller.scrollTop;
  }

  /**
   * onResize
   * @param {Event} e 
   * @private
   */
  onResize(e) {
    this.resizeCanceler = true;
  }

  /**
   * onTouchStart
   * @param {Event} e 
   * @private
   */
  onTouchStart(e) {
    const {
      screenX,
      screenY
    } = e.touches[0];
    this.touchCanceler = true;
    if (!this.startTouchX) {
      this.startTouchX = screenX;
      this.startTouchY = screenY;
      this.startTime = new Date().getTime();
    }
    this.endTouchX = screenX;
    this.endTouchY = screenY;
    this.endTime = new Date().getTime();
  }

  /**
   * onTouchMove
   * @param {Event} e 
   * @private
   */
  onTouchMove(e) {
    const {
      screenX,
      screenY
    } = e.touches[0];
    const deltaY = Math.abs(screenY - this.endTouchY);
    this.touchCanceler = true;
    if (deltaY < 10) {
      this.element.scrollLeft -= screenX - this.endTouchX;
    }
    this.endTouchX = screenX;
    this.endTouchY = screenY;
    this.endTime = new Date().getTime();
  }

  /**
   * onTouchEnd
   * @param {Event} e 
   * @private
   */
  onTouchEnd(e) {
    this.touchCanceler = false;
    let swipped = this.wasSwiped();
    if (swipped !== 0) {
      this.snap(swipped);
    } else {
      this.snap();
    }
    this.startTouchX = undefined;
    this.startTouchY = undefined;
    this.startTime = undefined;
    this.endTouchX = undefined;
    this.endTouchY = undefined;
    this.endTime = undefined;
  }

  /**
   * wasSwiped
   * @returns {number}
   */
  wasSwiped() {
    const snapWidth = this.layout.pageWidth * this.layout.divisor;
    const distance = this.endTouchX - this.startTouchX;
    const absolute = Math.abs(distance);
    const time = this.endTime - this.startTime;
    const velocity = distance / time;
    const minVelocity = this.settings.minVelocity;
    if (absolute <= this.settings.minDistance || absolute >= snapWidth) {
      return 0;
    }
    if (velocity > minVelocity) {
      return -1; // previous
    } else if (velocity < -minVelocity) {
      return 1; // next
    }
  }

  /**
   * needsSnap
   * @returns {boolean}
   */
  needsSnap() {
    const left = this.scrollLeft;
    const snapWidth = this.layout.pageWidth * this.layout.divisor;
    return left % snapWidth !== 0;
  }

  /**
   * snap
   * @param {number} [howMany=0] 
   * @returns {Promise}
   */
  snap(howMany = 0) {
    const left = this.scrollLeft;
    const snapWidth = this.layout.pageWidth * this.layout.divisor;
    let snapTo = Math.round(left / snapWidth) * snapWidth;
    if (howMany) {
      snapTo += howMany * snapWidth;
    }
    return this.smoothScrollTo(snapTo);
  }

  /**
   * smoothScrollTo
   * @param {number} destination 
   * @returns {Promise}
   */
  smoothScrollTo(destination) {
    const deferred = new defer();
    const start = this.scrollLeft;
    const startTime = new Date().getTime();
    const duration = this.settings.duration;
    this.snapping = true;

    // add animation loop
    const tick = () => {
      const now = new Date().getTime();
      const time = Math.min(1, (now - startTime) / duration);
      if (this.touchCanceler || this.resizeCanceler) {
        this.resizeCanceler = false;
        this.snapping = false;
        deferred.resolve();
        return;
      }
      if (time < 1) {
        requestAnimationFrame(tick);
        this.scrollTo(start + (destination - start) * time, 0);
      } else {
        this.scrollTo(destination, 0);
        this.snapping = false;
        deferred.resolve();
      }
    };
    tick.call(this);
    return deferred.promise;
  }

  /**
   * scrollTo
   * @param {number} [left=0] 
   * @param {number} [top=0] 
   */
  scrollTo(left = 0, top = 0) {
    this.scroller.scrollLeft = left;
    this.scroller.scrollTop = top;
  }

  /**
   * destroy
   * @returns {void}
   */
  destroy() {
    if (typeof this.scroller === "undefined") {
      return;
    }
    this.removeListeners();
    this.scroller = undefined;
  }
}
event_emitter_default()(Snap.prototype);
/* harmony default export */ const snap = (Snap);
;// ./src/managers/continuous/index.js






const continuous_AXIS_H = "horizontal";

/**
 * Continuous view manager
 * @extends {DefaultViewManager}
 */
class ContinuousViewManager extends managers_default {
  /**
   * Constructor
   * @param {Book} book
   * @param {object} [options]
   * @param {string} [options.axis]
   * @param {object} [options.snap]
   * @param {string} [options.method] values: `"blobUrl"` OR `"srcdoc"` OR `"write"`
   * @param {string} [options.ignoreClass='']
   * @param {string|object} [options.view='iframe']
   * @param {string[]} [options.sandbox=[]] iframe sandbox policy list
   */
  constructor(book, options) {
    super(book, options);
    /**
     * @member {string} name
     * @memberof ContinuousViewManager
     * @readonly
     */
    this.name = "continuous";
    this.settings = extend({
      axis: null,
      snap: null,
      view: "iframe",
      method: null,
      offset: 500,
      offsetDelta: 250,
      ignoreClass: "",
      forceEvenPages: false
    }, options || {});
  }

  /**
   * render
   * @param {Element|string} element viewport element
   * @param {object} size 
   * @override
   */
  render(element, size) {
    super.render(element, size);
    if (this.paginated && this.settings.snap) {
      this.snapper = new snap(this, this.settings.snap);
    }
  }

  /**
   * display
   * @param {Section} section 
   * @param {string|number} [target] 
   * @returns {Promise<view|null>} displaying promise
   * @override
   */
  async display(section, target) {
    return super.display(section, target).then(() => this.fill());
  }

  /**
   * fill
   * @param {Defer} value
   * @returns {Promise<any>}
   */
  fill(value) {
    const full = value || new defer();
    this.q.enqueue(() => {
      return this.check();
    }).then(result => {
      if (result) {
        this.fill(full); // recursive call
      } else {
        full.resolve();
      }
    });
    return full.promise;
  }

  /**
   * moveTo
   * @param {object} offset 
   * @override
   */
  moveTo(offset) {
    let distX = 0,
      distY = 0;
    if (this.paginated) {
      distX = Math.floor(offset.left / this.layout.delta) * this.layout.delta;
    } else {
      distY = offset.top;
    }
    if (distX > 0 || distY > 0) {
      this.scrollBy(distX, distY, true);
    }
  }

  /**
   * Remove Previous Listeners if present
   * @param {*} view 
   */
  removeShownListeners(view) {
    view.off(EVENTS.VIEWS.DISPLAYED);
  }

  /**
   * update
   * @param {number} [offset] 
   * @returns {Promise<any>}
   */
  async update(offset) {
    const views = this.views;
    const delta = offset || this.settings.offset || 0;
    const promises = [];
    for (let i = 0; i < views.length; i++) {
      const view = views[i];
      if (this.isVisible(view, delta, delta)) {
        if (view.displayed) {
          view.show();
        } else {
          const displayed = view.display(this.load).then(view => {
            view.show();
          });
          promises.push(displayed);
        }
      }
    }
    if (promises.length) {
      return Promise.all(promises);
    } else {
      return Promise.resolve(null);
    }
  }

  /**
   * check
   * @param {number} [offsetLeft]
   * @param {number} [offsetTop]
   * @returns {Promise<any>}
   * @private
   */
  async check(offsetLeft, offsetTop) {
    const promises = [];
    const vph = this.layout.axis === continuous_AXIS_H;
    const lsc = this.views.container;
    const rtl = this.layout.direction === "rtl";
    let delta = this.settings.offset || 0;
    if (offsetLeft && vph) {
      delta = offsetLeft;
    }
    if (offsetTop && !vph) {
      delta = offsetTop;
    }
    const rect = this.viewport.rect;
    const visibleLength = vph ? Math.floor(rect.width) : rect.height;
    const contentLength = vph ? lsc.scrollWidth : lsc.scrollHeight;
    let offset = vph ? lsc.scrollLeft : lsc.scrollTop;
    if (this.writingMode.indexOf(continuous_AXIS_H) === 0) {
      // Scroll offset starts at width of element
      if (rtl && this.scrollType === "default") {
        offset = contentLength - visibleLength - offset;
      }
      // Scroll offset starts at 0 and goes negative
      if (rtl && this.scrollType === "negative") {
        offset = offset * -1;
      }
    }
    const append = () => {
      const view = this.views.last();
      const next = view && view.section.next();
      if (next) {
        promises.push(this.append(next));
      }
    };
    const prepend = () => {
      const view = this.views.first();
      const prev = view && view.section.prev();
      if (prev) {
        promises.push(this.prepend(prev));
      }
    };
    const end = offset + visibleLength + delta;
    const start = offset - delta;
    if (end >= contentLength) {
      append();
    }
    if (start < 0) {
      prepend();
    }
    if (promises.length) {
      return Promise.all(promises).then(() => {
        return this.update(delta);
      });
    } else {
      return Promise.resolve(null);
    }
  }

  /**
   * scrolled
   * @param {Event} e 
   * @override
   */
  scrolled(e) {
    this.q.enqueue(() => {
      return this.check();
    }).then(() => {
      this.relocated();
      this.emit(EVENTS.MANAGERS.SCROLLED, {
        top: e.target.scrollTop,
        left: e.target.scrollLeft
      });
    });
  }

  /**
   * next
   * @returns {Promise<any>}
   * @override
   */
  next() {
    if (this.views.length === 0) {
      return Promise.resolve(null);
    }
    if (this.paginated && this.layout.axis === continuous_AXIS_H) {
      this.scrollBy(this.layout.delta, 0, true);
    } else {
      this.scrollBy(0, this.layout.height, true);
    }
    return this.q.enqueue(() => {
      return this.check();
    });
  }

  /**
   * prev
   * @returns {Promise<any>}
   * @override
   */
  prev() {
    if (this.views.length === 0) {
      return Promise.resolve(null);
    }
    if (this.paginated && this.layout.axis === continuous_AXIS_H) {
      this.scrollBy(-this.layout.delta, 0, true);
    } else {
      this.scrollBy(0, -this.layout.height, true);
    }
    return this.q.enqueue(() => {
      return this.check();
    });
  }

  /**
   * destroy
   * @override
   */
  destroy() {
    super.destroy();
    if (this.snapper) {
      this.snapper.destroy();
    }
  }
}
/* harmony default export */ const continuous = (ContinuousViewManager);
;// ./src/rendition.js

















// Default View Managers



/**
 * Displays an Epub as a series of Views for each Section.
 * Requires Manager and View class to handle specifics of rendering
 * the section content.
 * @param {Book} book
 * @param {object} [options]
 * @param {string} [options.axis] viewport axis
 * @param {string|number} [options.width] viewport width
 * @param {string|number} [options.height] viewport height
 * @param {string} [options.ignoreClass] class for the cfi parser to ignore
 * @param {string|class} [options.manager='default'] string values: default / continuous
 * @param {string|class} [options.view='iframe']
 * @param {string} [options.method='write'] values: `"write"` OR `"srcdoc"`
 * @param {string} [options.layout] layout to force
 * @param {string} [options.spread] force spread value
 * @param {string} [options.direction] direction `"ltr"` OR `"rtl"`
 * @param {number} [options.pageWidth] page width
 * @param {number} [options.pageHeight] page height
 * @param {number} [options.minSpreadWidth] overridden by spread: none (never) / both (always)
 * @param {string} [options.stylesheet] url of stylesheet to be injected
 * @param {string} [options.script] url of script to be injected
 * @param {object} [options.snap] use snap scrolling
 * @param {string[]} [options.sandbox=[]] iframe sandbox policy list
 */
class Rendition {
  constructor(book, options) {
    /**
     * @member {object} settings
     * @memberof Rendition
     * @readonly
     */
    this.settings = extend({
      axis: undefined,
      width: null,
      height: null,
      manager: "default",
      view: "iframe",
      flow: null,
      method: "write",
      // the 'baseUrl' value is set from the 'book.settings.replacements' property
      layout: null,
      spread: null,
      minSpreadWidth: 800,
      script: null,
      snap: null,
      direction: null,
      // TODO: implement to 'auto' detection
      ignoreClass: "",
      sandbox: [],
      stylesheet: null
    }, options || {});
    if (typeof this.settings.manager === "object") {
      this.manager = this.settings.manager;
    }
    this.book = book;
    /**
     * Adds Hook methods to the Rendition prototype
     * @member {object} hooks
     * @property {Hook} hooks.content
     * @property {Hook} hooks.display
     * @property {Hook} hooks.layout
     * @property {Hook} hooks.render
     * @property {Hook} hooks.show
     * @property {Hook} hooks.unloaded
     * @memberof Rendition
     */
    this.hooks = {
      content: new hook(this),
      display: new hook(this),
      layout: new hook(this),
      render: new hook(this),
      show: new hook(this),
      unloaded: new hook(this)
    };
    this.hooks.content.register(this.handleLinks.bind(this));
    this.hooks.content.register(this.passEvents.bind(this));
    this.hooks.content.register(this.adjustImages.bind(this));
    this.book.sections.hooks.content.register(this.injectIdentifier.bind(this));
    if (this.settings.stylesheet) {
      this.book.sections.hooks.content.register(this.injectStylesheet.bind(this));
    }
    if (this.settings.script) {
      this.book.sections.hooks.content.register(this.injectScript.bind(this));
    }
    /**
     * @member {Annotations} annotations
     * @memberof Rendition
     * @readonly
     */
    this.annotations = new annotations(this);
    /**
     * @member {Themes} themes
     * @memberof Rendition
     * @readonly
     */
    this.themes = new themes(this);
    this.epubcfi = new src_epubcfi();
    /**
     * A Rendered Location Range
     * @typedef location
     * @type {object}
     * @property {object} start
     * @property {string} start.index
     * @property {string} start.href
     * @property {object} start.displayed
     * @property {number} start.displayed.page
     * @property {number} start.displayed.total
     * @property {string} start.cfi EpubCFI string format
     * @property {number} start.location
     * @property {number} start.percentage
     * @property {object} end
     * @property {string} end.index
     * @property {string} end.href
     * @property {object} end.displayed
     * @property {number} end.displayed.page
     * @property {number} end.displayed.total
     * @property {string} end.cfi EpubCFI string format
     * @property {number} end.location
     * @property {number} end.percentage
     * @property {boolean} atStart Location at start position
     * @property {boolean} atEnd Location at end position
     * @memberof Rendition
     */
    this.location = undefined;
    this.starting = new defer();
    /**
     * returns after the rendition has started
     * @member {Promise<any>} started
     * @memberof Rendition
     */
    this.started = this.starting.promise;
    this.q = new queue(this);
    // Hold queue until book is opened
    this.q.enqueue(this.book.opened);
    // Block the queue until rendering is started
    this.q.enqueue(this.start.bind(this));
  }

  /**
   * Set the manager function
   * @param {Function} manager
   */
  setManager(manager) {
    this.manager = manager;
  }

  /**
   * Require the manager from passed string, or as a class function
   * @param {string|object} manager [description]
   * @return {any}
   */
  requireManager(manager) {
    let ret;

    // If manager is a string, try to load from imported managers
    if (typeof manager === "string" && manager === "default") {
      ret = managers_default;
    } else if (typeof manager === "string" && manager === "continuous") {
      ret = continuous;
    } else {
      // otherwise, assume we were passed a class function
      ret = manager;
    }
    return ret;
  }

  /**
   * Start the rendering
   */
  start() {
    const props = this.determineLayoutProperties();
    /**
     * @member {Layout} layout
     * @memberof Rendition
     * @readonly
     */
    this.layout = new layout(props);
    this.layout.on(EVENTS.LAYOUT.UPDATED, (props, changed) => {
      /**
       * Emit of updated the Layout state
       * @event layout
       * @param {Layout} props
       * @param {object} changed
       * @memberof Rendition
       */
      this.emit(EVENTS.RENDITION.LAYOUT, props, changed);
    });
    /**
     * @member {Viewport} viewport
     * @memberof Rendition
     * @readonly
     */
    this.viewport = new viewport(this.layout);
    this.viewport.on(EVENTS.VIEWPORT.RESIZED, rect => {
      if (this.layout.flow === "paginated") {
        this.layout.set({
          width: rect.width,
          height: rect.height
        });
      } else if (this.layout.axis === "horizontal") {
        this.layout.set({
          height: rect.height
        });
      } else if (this.layout.axis === "vertical") {
        this.layout.set({
          width: rect.width
        });
      }
      if (!this.location) return;
      /**
       * Emit that the rendition has been resized
       * @event resized
       * @param {object} rect
       * @memberof Rendition
       */
      this.emit(EVENTS.RENDITION.RESIZED, rect);
      this.display(this.location.start.cfi);
    });
    this.viewport.on(EVENTS.VIEWPORT.ORIENTATION_CHANGE, target => {
      /**
       * @event orientationchange
       * @param {object} target
       * @memberof Rendition
       */
      this.emit(EVENTS.RENDITION.ORIENTATION_CHANGE, target);
    });
    if (!this.manager) {
      const manager = this.requireManager(this.settings.manager);
      const options = {
        snap: this.settings.snap,
        view: this.settings.view,
        method: this.settings.method,
        sandbox: this.settings.sandbox,
        ignoreClass: this.settings.ignoreClass
      };
      this.manager = new manager(this.book, options);
    }
    this.manager.on(EVENTS.MANAGERS.ADDED, this.afterDisplayed.bind(this));
    this.manager.on(EVENTS.MANAGERS.REMOVED, this.afterRemoved.bind(this));
    this.manager.on(EVENTS.MANAGERS.RESIZED, this.onResized.bind(this));
    this.manager.on(EVENTS.MANAGERS.RELOCATED, this.relocated.bind(this));
    /**
     * Emit that rendering has started
     * @event started
     * @memberof Rendition
     */
    this.emit(EVENTS.RENDITION.STARTED);
    this.starting.resolve();
  }

  /**
   * Call to attach the container to an element in the dom
   * Container must be attached before rendering can begin
   * @param {Element|string} element viewport element
   * @return {Promise<any>}
   */
  attachTo(element) {
    return this.q.enqueue(() => {
      // Start rendering
      this.manager.render(element, {
        width: this.settings.width,
        height: this.settings.height
      });
      /**
       * Emit that rendering has attached to an element
       * @event attached
       * @memberof Rendition
       */
      this.emit(EVENTS.RENDITION.ATTACHED);
    });
  }

  /**
   * Display a point in the book
   * The request will be added to the rendering Queue,
   * so it will wait until book is opened, rendering started
   * and all other rendering tasks have finished to be called.
   * @param {string|number} [target] `Section.index` OR `Section.idref` OR `Section.href` OR EpubCFI
   * @example rendition.display()
   * @example rendition.display(3)
   * @example rendition.display("#chapter_001")
   * @example rendition.display("chapter_001.xhtml")
   * @example rendition.display("epubcfi(/6/8!/4/2/16/1:0)")
   * @return {Promise<Section>}
   */
  display(target) {
    if (this.displaying) {
      this.displaying.resolve();
    }
    return this.q.enqueue(this._display.bind(this), target);
  }

  /**
   * Tells the manager what to display immediately
   * @param {string} [target]
   * @return {Promise<Section>}
   * @private
   */
  _display(target) {
    const displaying = new defer();
    this.displaying = displaying;

    // Check if this is a book percentage
    if (this.book.locations.length && isFloat(target)) {
      target = this.book.locations.cfiFromPercentage(parseFloat(target));
    }
    const section = this.book.sections.get(target);
    if (!section) {
      displaying.reject(new Error("No Section Found"));
      return displaying.promise;
    }
    this.manager.display(section, target).then(() => {
      displaying.resolve(section);
      this.displaying = undefined;
      /**
       * Emit that a section has been displayed
       * @event displayed
       * @param {Section} section
       * @memberof Rendition
       */
      this.emit(EVENTS.RENDITION.DISPLAYED, section);
    }, err => {
      /**
       * Emit that has been an error displaying
       * @event displayError
       * @param {Error} err
       * @memberof Rendition
       */
      this.emit(EVENTS.RENDITION.DISPLAY_ERROR, err);
    }).then(() => {
      this.viewport.update();
    });
    return displaying.promise;
  }

  /**
   * Report what section has been displayed
   * @param {object} view
   * @private
   */
  afterDisplayed(view) {
    view.on(EVENTS.VIEWS.MARK_CLICKED, (cfiRange, data) => {
      this.triggerMarkEvent(cfiRange, data, view.contents);
    });
    this.hooks.render.trigger(view, this).then(() => {
      if (view.contents) {
        this.hooks.content.trigger(view.contents, this).then(() => {
          /**
           * Emit that a section has been rendered
           * @event rendered
           * @param {View} view
           * @memberof Rendition
           */
          this.emit(EVENTS.RENDITION.RENDERED, view);
        });
      } else {
        this.emit(EVENTS.RENDITION.RENDERED, view);
      }
    });
  }

  /**
   * Report what has been removed
   * @param {object} view
   * @private
   */
  afterRemoved(view) {
    this.hooks.unloaded.trigger(view, this).then(() => {
      /**
       * Emit that a section has been removed
       * @event removed
       * @param {View} view
       * @memberof Rendition
       */
      this.emit(EVENTS.RENDITION.REMOVED, view);
    });
  }

  /**
   * Report resize events and display the last seen location
   * @param {object} view 
   * @private
   */
  onResized(view) {
    return this.adjustImages(view.contents);
  }

  /**
   * Move the Rendition to a specific offset
   * Usually you would be better off calling display()
   * @param {object} offset
   */
  moveTo(offset) {
    this.manager.moveTo(offset);
  }

  /**
   * Resize viewport container
   * @param {number|string} [width]
   * @param {number|string} [height]
   * @returns {{ width: number, height: number }}
   * @example rendition.resize(800, 600)
   * @example rendition.resize("90%", 600)
   */
  resize(width, height) {
    return this.viewport.size(width, height);
  }

  /**
   * Clear all rendered views
   */
  clear() {
    this.manager.clear();
  }

  /**
   * Go to the next "page" in the rendition
   * @return {Promise<any>}
   */
  next() {
    return this.q.enqueue(this.manager.next.bind(this.manager));
  }

  /**
   * Go to the previous "page" in the rendition
   * @return {Promise<any>}
   */
  prev() {
    return this.q.enqueue(this.manager.prev.bind(this.manager));
  }

  /**
   * Determine the Layout properties from metadata and settings
   * @link http://www.idpf.org/epub/301/spec/epub-publications.html#meta-properties-rendering
   * @return {object} Layout properties
   * @private
   */
  determineLayoutProperties() {
    const metadata = this.book.packaging.metadata;
    const direction = this.book.packaging.direction;
    return {
      axis: this.settings.axis,
      name: this.settings.layout || metadata.get("layout"),
      flow: this.settings.flow || metadata.get("flow"),
      spread: this.settings.spread || metadata.get("spread"),
      viewport: metadata.get("viewport"),
      direction: this.settings.direction || direction || "ltr",
      orientation: this.settings.orientation || metadata.get("orientation"),
      minSpreadWidth: this.settings.minSpreadWidth,
      pageWidth: this.settings.pageWidth,
      pageHeight: this.settings.pageHeight
    };
  }

  /**
   * Layout configuration
   * @param {object} options
   */
  updateLayout(options) {
    this.layout.set(options);
    this.display(this.location.start.cfi);
  }

  /**
   * Get the Current Location object
   * @return {displayedLocation|Promise} location (may be a promise)
   */
  currentLocation() {
    const location = this.manager.currentLocation();
    if (location && location.then && typeof location.then === "function") {
      location.then(result => {
        return this.located(result);
      });
    } else if (location) {
      return this.located(location);
    }
  }

  /**
   * Creates a Rendition#locationRange from location
   * passed by the Manager
   * @param {object} location Location sections
   * @returns {object}
   * @private
   */
  located(location) {
    if (location.length === 0) return {};
    const start = location[0];
    const end = location[location.length - 1];
    const located = {
      atStart: false,
      atEnd: false,
      start: {
        cfi: start.mapping.start,
        href: start.href,
        index: start.index,
        displayed: {
          page: start.pages[0],
          total: start.total
        }
      },
      end: {
        cfi: end.mapping.end,
        href: end.href,
        index: end.index,
        displayed: {
          page: end.pages[end.pages.length - 1],
          total: end.total
        }
      }
    };
    const locations = this.book.locations;
    if (locations.size) {
      const locationStart = locations.locationFromCfi(start.mapping.start);
      const locationEnd = locations.locationFromCfi(end.mapping.end);
      if (locationStart !== -1) {
        located.start.location = locationStart;
        located.start.percentage = locations.percentageFromLocation(locationStart);
      }
      if (locationEnd !== -1) {
        located.end.location = locationEnd;
        located.end.percentage = locations.percentageFromLocation(locationEnd);
      }
    }
    const pageList = this.book.navigation.pageList;
    if (pageList.length) {
      const pageStart = pageList.pageFromCfi(start.mapping.start);
      const pageEnd = pageList.pageFromCfi(end.mapping.end);
      if (pageStart !== -1) {
        located.start.page = pageStart;
      }
      if (pageEnd !== -1) {
        located.end.page = pageEnd;
      }
    }
    const startPage = located.start.displayed.page;
    if (this.book.sections.first().index === start.index && startPage.index === 0) {
      located.atStart = true;
    }
    const endPage = located.end.displayed.page;
    if (this.book.sections.last().index === end.index && endPage.index === located.end.displayed.total - 1) {
      located.atEnd = true;
    }
    return located;
  }

  /**
   * relocated event handler
   * @fires relocated
   * @private
   */
  relocated(location) {
    const located = this.located(location);
    if (!located || !located.start || !located.end) {
      return;
    }
    this.location = located;
    /**
     * @event relocated
     * @param {object} location
     * @memberof Rendition
     */
    this.emit(EVENTS.RENDITION.RELOCATED, this.location);
  }

  /**
   * Remove and Clean Up the Rendition
   */
  destroy() {
    this.q.clear();
    this.q = undefined;
    this.layout.destroy();
    this.themes.destroy();
    this.viewport.destroy();
    this.manager.destroy();
    this.hooks.display.clear();
    this.hooks.content.clear();
    this.hooks.layout.clear();
    this.hooks.render.clear();
    this.hooks.show.clear();
    this.hooks.unloaded.clear();
    this.hooks = undefined;
    this.layout = undefined;
    this.themes = undefined;
    this.manager = undefined;
    this.epubcfi = undefined;
    this.started = undefined;
    this.starting = undefined;
    this.viewport = undefined;
  }

  /**
   * Pass the events from a view's Contents
   * @param {Contents} view contents
   * @private
   */
  passEvents(contents) {
    DOM_EVENTS.forEach(e => {
      contents.on(e, ev => this.triggerViewEvent(ev, contents));
    });
    contents.on(EVENTS.CONTENTS.SELECTED, e => this.triggerSelectedEvent(e, contents));
  }

  /**
   * Emit events passed by a view
   * @param {event} e
   * @private
   */
  triggerViewEvent(e, contents) {
    this.emit(e.type, e, contents);
  }

  /**
   * Emit a selection event's CFI Range passed from a a view
   * @param {string} cfirange
   * @private
   */
  triggerSelectedEvent(cfirange, contents) {
    /**
     * Emit that a text selection has occurred
     * @event selected
     * @param {string} cfirange
     * @param {Contents} contents
     * @memberof Rendition
     */
    this.emit(EVENTS.RENDITION.SELECTED, cfirange, contents);
  }

  /**
   * Emit a markClicked event with the cfiRange and data from a mark
   * @param {EpubCFI} cfirange
   * @param {object} data 
   * @param {Contents} contents 
   * @private
   */
  triggerMarkEvent(cfiRange, data, contents) {
    /**
     * Emit that a mark was clicked
     * @event markClicked
     * @param {EpubCFI} cfiRange
     * @param {object} data
     * @param {Contents} contents
     * @memberof Rendition
     */
    this.emit(EVENTS.RENDITION.MARK_CLICKED, cfiRange, data, contents);
  }

  /**
   * Get a Range from a Visible CFI
   * @param {string} epubcfi EpubCfi string
   * @param {string} ignoreClass
   * @return {Range}
   */
  getRange(epubcfi, ignoreClass) {
    const cfi = new src_epubcfi(epubcfi);
    const found = this.manager.visible().filter(view => {
      if (cfi.spinePos === view.section.index) return true;
    });

    // Should only every return 1 item
    if (found.length) {
      return found[0].contents.range(cfi, ignoreClass);
    }
  }

  /**
   * Hook to adjust images to fit in columns
   * @param {Contents} contents
   * @returns {Promise<Node|null>}
   * @private
   */
  adjustImages(contents) {
    const content = contents.content;
    const padding = {
      top: parseFloat(content.style["padding-top"]),
      bottom: parseFloat(content.style["padding-bottom"]),
      left: parseFloat(content.style["padding-left"]),
      right: parseFloat(content.style["padding-right"])
    };
    const paddingX = padding.left + padding.right;
    const paddingY = padding.top + padding.bottom;
    const width = (this.layout.columnWidth ? this.layout.columnWidth - paddingX + "px" : "100%") + " !important";
    const height = content.offsetHeight - paddingY + "px !important";
    return contents.appendStylesheet("images", {
      "img": {
        "max-width": width,
        "max-height": height,
        "object-fit": "contain",
        "page-break-inside": "avoid",
        "break-inside": "avoid",
        "box-sizing": "border-box"
      },
      "svg": {
        "max-width": width,
        "max-height": height,
        "page-break-inside": "avoid",
        "break-inside": "avoid"
      }
    });
  }

  /**
   * Get the Contents object of each rendered view
   * @returns {Array<Contents>}
   */
  getContents() {
    return this.manager ? this.manager.getContents() : [];
  }

  /**
   * Get the views member from the manager
   * @returns {Views}
   */
  views() {
    const views = this.manager ? this.manager.views : undefined;
    return views || [];
  }

  /**
   * Hook to handle link clicks in rendered content
   * @param {Contents} contents
   * @private
   */
  handleLinks(contents) {
    if (contents) {
      contents.on(EVENTS.CONTENTS.LINK_CLICKED, href => {
        this.display(href);
      });
    }
  }

  /**
   * Hook to handle injecting stylesheet before
   * a Section is serialized
   * @param {Document} doc
   * @param {Section} section
   * @private
   */
  injectStylesheet(doc, section) {
    const style = doc.createElement("link");
    style.setAttribute("type", "text/css");
    style.setAttribute("rel", "stylesheet");
    style.setAttribute("href", this.settings.stylesheet);
    doc.getElementsByTagName("head")[0].appendChild(style);
  }

  /**
   * Hook to handle injecting scripts before
   * a Section is serialized
   * @param {Document} doc
   * @param {Section} section
   * @private
   */
  injectScript(doc, section) {
    const script = doc.createElement("script");
    script.setAttribute("type", "text/javascript");
    script.setAttribute("src", this.settings.script);
    script.textContent = " "; // Needed to prevent self closing tag
    doc.getElementsByTagName("head")[0].appendChild(script);
  }

  /**
   * Hook to handle the document identifier before
   * a Section is serialized
   * @param {Document} doc
   * @param {Section} section 
   * @private
   */
  injectIdentifier(doc, section) {
    const ident = this.book.packaging.metadata.get("identifier");
    const meta = doc.createElement("meta");
    meta.setAttribute("name", "dc.relation.ispartof");
    if (ident) meta.setAttribute("content", ident);
    doc.getElementsByTagName("head")[0].appendChild(meta);
  }
}
event_emitter_default()(Rendition.prototype);
/* harmony default export */ const rendition = (Rendition);
;// ./src/utils/request.js







// TODO: fallback for url if window isn't defined
const SUPPORTS_URL = window && window.URL ? true : false;
const BLOB_RESPONSE = SUPPORTS_URL ? "blob" : "arraybuffer";
const read = (e, def) => {
  const xhr = e.target;
  if (xhr.status === 403) {
    def.reject({
      message: "Forbidden",
      target: xhr,
      stack: new Error().stack
    });
  }
};
const load = (e, type, def) => {
  const xhr = e.target;
  let r;
  if (xhr.responseType === "document") {
    if (xhr.response === null && xhr.responseXML === null) {
      def.reject({
        message: "Empty Response",
        target: xhr,
        stack: new Error().stack
      });
    } else if (xhr.responseXML) {
      r = xhr.responseXML;
    } else if (isXml(type)) {
      r = parse(xhr.response, "text/xml");
    } else if (type === "xhtml") {
      r = parse(xhr.response, "application/xhtml+xml");
    } else if (type === "html" || type === "htm") {
      r = parse(xhr.response, "text/html");
    }
  } else if (xhr.responseType === "json") {
    r = xhr.response;
  } else if (xhr.responseType === "blob") {
    if (SUPPORTS_URL) {
      r = xhr.response;
    } else {
      // Safari doesn't support responseType blob, 
      // so create a blob from arraybuffer
      r = new Blob([xhr.response]);
    }
  } else {
    r = xhr.response;
  }
  def.resolve(r);
};

/**
 * request
 * @param {string|ArrayBuffer} url 
 * @param {string} [type] 
 * @param {boolean} [withCredentials=false] 
 * @param {object[]} [headers=[]] 
 * @returns {Promise<any>}
 */
const request = (url, type, withCredentials = false, headers = []) => {
  const def = new defer();
  const xhr = new XMLHttpRequest();
  type = type || new utils_path(url).extension;
  xhr.withCredentials = withCredentials;
  if (isXml(type)) {
    xhr.responseType = "document";
    xhr.overrideMimeType("text/xml"); // for OPF parsing
  } else if (type === "xhtml") {
    xhr.responseType = "document";
  } else if (type === "html" || type === "htm") {
    xhr.responseType = "document";
  } else if (type === "binary") {
    xhr.responseType = "arraybuffer";
  } else if (type === "blob") {
    xhr.responseType = BLOB_RESPONSE;
  } else if (type === "json") {
    xhr.responseType = "json";
  }
  xhr.onreadystatechange = e => read(e, def);
  xhr.onload = e => load(e, type, def);
  xhr.onerror = e => {
    def.reject({
      message: "Error",
      target: e.target,
      stack: new Error().stack
    });
  };
  xhr.open("GET", url, true);
  for (const header in headers) {
    xhr.setRequestHeader(header, headers[header]);
  }
  xhr.send();
  return def.promise;
};
/* harmony default export */ const utils_request = (request);
;// ./src/input.js





/**
 * Base class for Archive and Storage
 */
class Input {
  /**
   * Constructor
   */
  constructor() {
    /**
     * @member {object} instance
     * @memberof Input
     * @readonly
     */
    this.instance = null;
  }

  /**
   * Request a URL from entries
   * @param {string} url a URL to request
   * @param {string} [type] specify the type of the returned result
   * @returns {Promise<Blob|string|JSON|Document|XMLDocument>}
   */
  async request(url, type) {
    type = type || new utils_path(url).extension;
    let response;
    if (type === "blob" || type === "binary") {
      response = this.getBlob(url);
    } else if (type === "base64") {
      response = this.getBase64(url);
    } else {
      response = this.getText(url);
    }
    return response.then(r => {
      const deferred = new defer();
      if (r) {
        const result = this.handleResponse(r, type);
        deferred.resolve(result);
      } else {
        deferred.reject({
          message: "File not found in: " + url,
          stack: new Error().stack
        });
      }
      return deferred.promise;
    });
  }

  /**
   * Handle the response from request
   * @param {any} response
   * @param {string} [type]
   * @returns {any} the parsed result
   */
  handleResponse(response, type) {
    let r;
    if (isXml(type)) {
      r = parse(response, "text/xml");
    } else if (type === "xhtml") {
      r = parse(response, "application/xhtml+xml");
    } else if (type == "html" || type == "htm") {
      r = parse(response, "text/html");
    } else if (type === "json") {
      r = JSON.parse(response);
    } else {
      r = response;
    }
    return r;
  }

  /**
   * Get a Blob from entries by URL
   * @param {string} url
   * @param {string} [mimeType]
   * @returns {Promise<Blob|null>}
   * @abstract
   */
  async getBlob(url, mimeType) {}

  /**
   * Get a Text from entries by URL
   * @param {string} url
   * @param {string} [mimeType]
   * @returns {Promise<string|null>}
   * @abstract
   */
  async getText(url, mimeType) {}

  /**
   * Get a base64 encoded result from entries by URL
   * @param {string} url
   * @param {string} [mimeType]
   * @returns {Promise<string|null>} base64 encoded
   * @abstract
   */
  async getBase64(url, mimeType) {}

  /**
   * destroy
   */
  destroy() {
    this.instance = undefined;
  }
}
/* harmony default export */ const input = (Input);
// EXTERNAL MODULE: external "JSZip"
var external_JSZip_ = __webpack_require__(6838);
var external_JSZip_default = /*#__PURE__*/__webpack_require__.n(external_JSZip_);
;// ./src/archive.js





/**
 * Handles Unzipping a requesting files from an Epub Archive
 * @extends {Input}
 */
class Archive extends input {
  constructor() {
    super();
    this.createInstance();
  }

  /**
   * Create JSZip instance
   */
  createInstance() {
    if ((external_JSZip_default())) {
      this.instance = new (external_JSZip_default())();
    } else {
      throw new Error("JSZip lib not loaded");
    }
  }

  /**
   * Open an archive
   * @param {string|ArrayBuffer} input
   * @param {string} [encoding] tells JSZip if the input data is base64 encoded
   * @returns {Promise<any>} zipfile
   */
  open(input, encoding) {
    if (encoding === "base64") {
      const data = input.split(",");
      input = data.length === 2 ? data[1] : input;
    }
    return this.instance.loadAsync(input, {
      base64: encoding === "base64"
    });
  }

  /**
   * Load and Open an archive
   * @param {string} zipUrl
   * @param {boolean} [isBase64] tells JSZip if the input data is base64 encoded
   * @returns {Promise<any>} zipfile
   */
  async openUrl(zipUrl, isBase64) {
    return utils_request(zipUrl, "binary").then(data => {
      return this.instance.loadAsync(data, {
        base64: isBase64
      });
    });
  }

  /**
   * Get entry from Archive
   * @param {string} url 
   * @returns {object} entry
   * @private
   */
  get(url) {
    const name = window.decodeURIComponent(url.substring(1));
    return this.instance.file(name);
  }

  /**
   * Get a Blob from Archive by URL
   * @param {string} url
   * @param {string} [mimeType]
   * @returns {Promise<Blob|null>}
   * @override
   */
  async getBlob(url, mimeType) {
    const entry = this.get(url);
    if (entry) {
      const type = mimeType || mime.lookup(entry.name);
      return entry.async("uint8array").then(data => {
        return new Blob([data], {
          type
        });
      });
    } else {
      return new Promise(resolve => {
        resolve(null);
      });
    }
  }

  /**
   * Get Text from Archive by URL
   * @param {string} url
   * @returns {Promise<string|null>}
   * @override
   */
  async getText(url) {
    const entry = this.get(url);
    if (entry) {
      return entry.async("string").then(text => {
        return text;
      });
    } else {
      return new Promise(resolve => {
        resolve(null);
      });
    }
  }

  /**
   * Get a base64 encoded result from Archive by URL
   * @param {string} url
   * @param {string} [mimeType]
   * @returns {Promise<string|null>} base64 encoded
   * @override
   */
  async getBase64(url, mimeType) {
    const entry = this.get(url);
    if (entry) {
      const type = mimeType || mime.lookup(entry.name);
      return entry.async("base64").then(data => {
        return "data:" + type + ";base64," + data;
      });
    } else {
      return new Promise(resolve => {
        resolve(null);
      });
    }
  }
}
/* harmony default export */ const archive = (Archive);
// EXTERNAL MODULE: external "localforage"
var external_localforage_ = __webpack_require__(6361);
var external_localforage_default = /*#__PURE__*/__webpack_require__.n(external_localforage_);
;// ./src/storage.js








/**
 * Handles saving and requesting files from local storage
 * @extends {Input}
 */
class Storage extends input {
  /**
   * Constructor
   * @param {string} name This should be the name of the application for modals
   */
  constructor(name) {
    super();
    /**
     * @member {string} name
     * @memberof Storage
     * @readonly
     */
    this.name = name;
    /**
     * @member {boolean} online Current status
     * @memberof Storage
     * @readonly
     */
    this.online = window.navigator.onLine;
  }

  /**
   * Create LocalForage instance
   */
  createInstance() {
    if ((external_localforage_default())) {
      this.instance = external_localforage_default().createInstance({
        name: this.name
      });
      this.appendListeners();
    } else {
      throw new TypeError("LocalForage lib not loaded");
    }
  }

  /**
   * Append event listeners
   * @private
   */
  appendListeners() {
    window.addEventListener("online", this.status.bind(this));
    window.addEventListener("offline", this.status.bind(this));
  }

  /**
   * Remove event listeners
   * @private
   */
  removeListeners() {
    window.removeEventListener("online", this.status.bind(this));
    window.removeEventListener("offline", this.status.bind(this));
  }

  /**
   * Update the online / offline status
   * @param {Event} event 
   * @private
   */
  status(event) {
    this.online = event.type === "online";
    if (this.online) {
      this.emit("online");
    } else {
      this.emit("offline");
    }
  }

  /**
   * Get entry from Storage
   * @param {string|number} input key
   * @returns {Promise<any>}
   * @example storage.get(0).then(data => ...)
   * @example storage.get('https://example.com/to/book.epub').then(data => ...)
   */
  async get(input) {
    const key = this.getKey(input);
    return this.instance.getItem(key);
  }

  /**
   * Set data into Storage
   * @param {string|number} input
   * @param {ArrayBuffer} data
   * @return {Promise<ArrayBuffer|null>}
   */
  async set(input, data) {
    const key = this.getKey(input);
    return this.instance.setItem(key, data);
  }

  /**
   * Put data into Storage
   * @param {string} url 
   * @returns {Promise<ArrayBuffer>}
   */
  async put(url) {
    return this.get(url).then(data => {
      return data || utils_request(url, "binary").then(result => {
        return this.set(url, result);
      });
    });
  }

  /**
   * Dispatch a request by URL
   * @param {string} url a url to request from storage
   * @param {string} [type] specify the type of the returned result
   * @param {boolean} [withCredentials]
   * @param {string[]} [headers]
   * @return {Promise<Blob|string|JSON|Document|XMLDocument>}
   */
  async dispatch(url, type, withCredentials, headers) {
    if (this.online) {
      //-- From network
      const tasks = [];
      tasks.push(utils_request(url, type, withCredentials, headers));
      tasks.push(this.put(url));
      return Promise.all(tasks).then(result => {
        return result[0] || null;
      });
    } else {
      //-- From storage
      return this.request(url, type);
    }
  }

  /**
   * Get entry key from input
   * @param {string|number} input 
   * @returns {string} key
   * @private
   */
  getKey(input) {
    let key;
    if (typeof input === "string") {
      key = input;
    } else {
      key = `book-${input}`;
    }
    return key;
  }

  /**
   * Get a Blob from Storage by URL
   * @param {string} url
   * @param {string} [mimeType]
   * @returns {Promise<Blob|null>}
   * @override
   */
  async getBlob(url, mimeType) {
    return this.get(url).then(data => {
      if (!data) return null;
      const type = mimeType || mime.lookup(url);
      return new Blob([data], {
        type
      });
    });
  }

  /**
   * Get a Text from Storage by URL
   * @param {string} url
   * @param {string} [mimeType]
   * @returns {Promise<string|null>}
   * @override
   */
  async getText(url, mimeType) {
    return this.get(url).then(data => {
      if (!data) return null;
      const def = new defer();
      const reader = new FileReader();
      const type = mimeType || mime.lookup(url);
      const blob = new Blob([data], {
        type
      });
      reader.onloadend = () => {
        def.resolve(reader.result);
      };
      reader.readAsText(blob, type);
      return def.promise;
    });
  }

  /**
   * Get a base64 encoded result from Storage by URL
   * @param {string} url
   * @param {string} [mimeType]
   * @returns {Promise<string|null>} base64 encoded
   * @override
   */
  async getBase64(url, mimeType) {
    return this.get(url).then(data => {
      if (!data) return null;
      const def = new defer();
      const reader = new FileReader();
      const type = mimeType || mime.lookup(url);
      const blob = new Blob([data], {
        type
      });
      reader.onloadend = () => {
        def.resolve(reader.result);
      };
      reader.readAsDataURL(blob, type);
      return def.promise;
    });
  }

  /**
   * destroy
   * @override
   */
  destroy() {
    super.destroy();
    this.removeListeners();
  }
}
event_emitter_default()(Storage.prototype);
/* harmony default export */ const storage = (Storage);
// EXTERNAL MODULE: ./node_modules/core-js/modules/esnext.async-iterator.reduce.js
var esnext_async_iterator_reduce = __webpack_require__(4905);
// EXTERNAL MODULE: ./node_modules/core-js/modules/esnext.iterator.reduce.js
var esnext_iterator_reduce = __webpack_require__(8872);
;// ./src/section.js










/**
 * Represents a Section of the Book
 * In most books this is equivalent to a Chapter
 */
class Section {
  /**
   * Constructor
   * @param {object} item Spine Item
   * @param {object} hooks 
   */
  constructor(item, hooks) {
    /**
     * @member {string} idref
     * @memberof Section
     * @readonly
     */
    this.idref = item.idref;
    /**
     * @member {boolean} linear
     * @memberof Section
     * @readonly
     */
    this.linear = item.linear === "yes";
    /**
     * @member {number} index
     * @memberof Section
     * @readonly
     */
    this.index = item.index;
    /**
     * @member {string} href
     * @memberof Section
     * @readonly
     */
    this.href = item.href;
    /**
     * @member {string} url
     * @memberof Section
     * @readonly
     */
    this.url = item.url;
    /**
     * @member {string} canonical
     * @memberof Section
     * @readonly
     */
    this.canonical = item.canonical;
    /**
     * @member {string} cfiBase
     * @memberof Section
     * @readonly
     */
    this.cfiBase = item.cfiBase;
    /**
     * @member {Function} next
     * @memberof Section
     * @readonly
     */
    this.next = item.next;
    /**
     * @member {Function} prev
     * @memberof Section
     * @readonly
     */
    this.prev = item.prev;
    /**
     * @member {string[]} properties
     * @memberof Section
     * @readonly
     */
    this.properties = item.properties;
    this.hooks = hooks;
    /**
     * @member {Document} document
     * @memberof Section
     * @readonly
     */
    this.document = undefined;
    /**
     * @member {Element} contents
     * @memberof Section
     * @readonly
     */
    this.contents = undefined;
    /**
     * @member {string} output
     * @memberof Section
     * @readonly
     */
    this.output = undefined;
  }

  /**
   * Load the section from its url
   * @param {Function} request a request method to use for loading
   * @return {Promise<Element>} a promise with the xml document
   */
  load(request) {
    const loading = new defer();
    if (this.contents) {
      loading.resolve(this.contents);
    } else {
      request(this.url).then(xml => {
        this.document = xml;
        this.contents = xml.documentElement;
        return this.hooks.content.trigger(this.document, this);
      }).then(() => {
        loading.resolve(this.contents);
      }).catch(error => {
        loading.reject(error);
      });
    }
    return loading.promise;
  }

  /**
   * Render the contents of a section
   * @todo better way to return this from hooks?
   * @param {Function} request a request method to use for loading
   * @return {Promise<string>} output a serialized XML Document
   */
  render(request) {
    const rendering = new defer();
    this.load(request).then(contents => {
      const serializer = new XMLSerializer();
      this.output = serializer.serializeToString(contents);
      return this.output;
    }).then(() => {
      return this.hooks.serialize.trigger(this.output, this);
    }).then(() => {
      rendering.resolve(this.output);
    }).catch(error => {
      rendering.reject(error);
    });
    return rendering.promise;
  }

  /**
   * Find a string in a section
   * @param {string} query The query string to find
   * @return {object[]} A list of matches, with form { cfi, excerpt }
   */
  find(query) {
    const section = this;
    const matches = [];
    const q = query.toLowerCase();
    const find = node => {
      const text = node.textContent.toLowerCase();
      const limit = 150;
      let pos,
        last = -1;
      while (pos !== -1) {
        // Search for the query
        pos = text.indexOf(q, last + 1);
        if (pos !== -1) {
          // We found it! Generate a CFI
          const range = section.document.createRange();
          range.setStart(node, pos);
          range.setEnd(node, pos + q.length);
          const cfi = section.cfiFromRange(range);
          let excerpt;
          // Generate the excerpt
          if (node.textContent.length < limit) {
            excerpt = node.textContent;
          } else {
            excerpt = node.textContent.substring(pos - limit / 2, pos + limit / 2);
            excerpt = "..." + excerpt + "...";
          }

          // Add the CFI to the matches list
          matches.push({
            cfi: cfi,
            excerpt: excerpt
          });
        }
        last = pos;
      }
    };
    sprint(section.document, node => find(node));
    return matches;
  }

  /**
   * Search a string in multiple sequential Element of the section.
   * If the document.createTreeWalker api is missed(eg: IE8), use 
   * `find` as a fallback.
   * @param {string} query The query string to search
   * @param {number} [maxSeqEle=5] The maximum number of Element that are combined for search, default value is 5.
   * @return {object[]} A list of matches, with form { cfi, excerpt }
   */
  search(query, maxSeqEle = 5) {
    if (typeof document.createTreeWalker === "undefined") {
      return this.find(query);
    }
    const matches = [];
    const excerptLimit = 150;
    const section = this;
    const q = query.toLowerCase();
    const search = nodeList => {
      const textWithCase = nodeList.reduce((acc, current) => {
        return acc + current.textContent;
      }, "");
      const text = textWithCase.toLowerCase();
      const pos = text.indexOf(q);
      if (pos !== -1) {
        const startNodeIndex = 0,
          endPos = pos + q.length;
        let endNodeIndex = 0,
          len = 0;
        if (pos < nodeList[startNodeIndex].length) {
          while (endNodeIndex < nodeList.length - 1) {
            len += nodeList[endNodeIndex].length;
            if (endPos <= len) {
              break;
            }
            endNodeIndex += 1;
          }
          const startNode = nodeList[startNodeIndex];
          const endNode = nodeList[endNodeIndex];
          const range = section.document.createRange();
          range.setStart(startNode, pos);
          const beforeEndLengthCount = nodeList.slice(0, endNodeIndex).reduce((acc, current) => {
            return acc + current.textContent.length;
          }, 0);
          range.setEnd(endNode, beforeEndLengthCount > endPos ? endPos : endPos - beforeEndLengthCount);
          const cfi = section.cfiFromRange(range);
          let excerpt = nodeList.slice(0, endNodeIndex + 1).reduce((acc, current) => {
            return acc + current.textContent;
          }, "");
          if (excerpt.length > excerptLimit) {
            excerpt = excerpt.substring(pos - excerptLimit / 2, pos + excerptLimit / 2);
            excerpt = "..." + excerpt + "...";
          }
          matches.push({
            cfi: cfi,
            excerpt: excerpt
          });
        }
      }
    };
    const treeWalker = document.createTreeWalker(section.document, NodeFilter.SHOW_TEXT, null, false);
    let node,
      nodeList = [];
    while (node = treeWalker.nextNode()) {
      nodeList.push(node);
      if (nodeList.length == maxSeqEle) {
        search(nodeList.slice(0, maxSeqEle));
        nodeList = nodeList.slice(1, maxSeqEle);
      }
    }
    if (nodeList.length > 0) {
      search(nodeList);
    }
    return matches;
  }

  /**
   * Get a CFI from a Range in the Section
   * @param {Range} range
   * @return {string} cfi an EpubCFI string
   */
  cfiFromRange(range) {
    return new src_epubcfi(range, this.cfiBase).toString();
  }

  /**
   * Get a CFI from an Element in the Section
   * @param {Element} el
   * @return {string} cfi an EpubCFI string
   */
  cfiFromElement(el) {
    return new src_epubcfi(el, this.cfiBase).toString();
  }

  /**
   * Unload the section document
   */
  unload() {
    this.document = undefined;
    this.contents = undefined;
    this.output = undefined;
  }

  /**
   * destroy
   */
  destroy() {
    this.unload();
    this.hooks.serialize.clear();
    this.hooks.content.clear();
    this.hooks = undefined;
    this.idref = undefined;
    this.linear = undefined;
    this.properties = undefined;
    this.index = undefined;
    this.href = undefined;
    this.url = undefined;
    this.next = undefined;
    this.prev = undefined;
    this.cfiBase = undefined;
  }
}
/* harmony default export */ const src_section = (Section);
;// ./src/sections.js























/**
 * Sections class
 * @extends {Map}
 */
class Sections extends Map {
  constructor() {
    super();
    /**
     * @member {object} hooks
     * @property {Hook} content
     * @property {Hook} serialize
     * @memberof Sections
     * @readonly
     */
    this.hooks = {
      content: new hook(this),
      serialize: new hook(this)
    };
    // Register replacements
    this.hooks.content.register(replaceBase);
    this.hooks.content.register(replaceMeta);
    this.hooks.content.register(replaceCanonical);
    this.points = {};
    this.nav = undefined;
    this.pkg = undefined;
  }

  /**
   * Clear sections
   */
  clear() {
    this.forEach(i => i.destroy());
    this.hooks.serialize.clear();
    this.hooks.content.clear();
    this.hooks.content.register(replaceBase);
    this.hooks.content.register(replaceMeta);
    this.hooks.content.register(replaceCanonical);
    this.points = {};
    super.clear();
  }

  /**
   * Get an item from the spine
   * @param {string|number} [target]
   * @return {Section|null} section
   * @example sections.get();
   * @example sections.get(3);
   * @example sections.get("#chapter_001");
   * @example sections.get("chapter_001.xhtml");
   * @example sections.get("epubcfi(/6/8!/4/2/16/1:0)")
   * @override
   */
  get(target) {
    let result;
    if (typeof target === "undefined") {
      result = this.first();
    } else if (typeof target === "number" && isNaN(target) === false) {
      result = [...this.values()][target];
    } else if (typeof target === "string") {
      if (src_epubcfi.prototype.isCfiString(target)) {
        const cfi = new src_epubcfi(target);
        const pos = cfi.spinePos;
        result = [...this.values()][pos];
      } else if (target.indexOf("#") === 0) {
        if (result = this.pkg.spine.get(target.substring(1))) {
          result = [...this.values()][result.index];
        }
      } else {
        if (result = this.nav.toc.get(target)) {
          result = super.get(result.bind);
        } else {
          target = target.split("#")[0]; // Remove fragments
          result = super.get(target);
        }
      }
    }
    return result || null;
  }

  /**
   * Find the first Section in the Spine
   * @return {Section|null} first section
   */
  first() {
    return this.points.first || null;
  }

  /**
   * Find the last Section in the Spine
   * @return {Section|null} last section
   */
  last() {
    return this.points.last || null;
  }

  /**
   * Unpack items from a opf into spine items
   * @param {Packaging} packaging
   * @param {Navigation} navigation 
   * @param {Function} resolve URL resolve
   * @param {Function} canonical Resolve canonical url
   * @returns {Promise<Sections>}
   */
  unpack(packaging, navigation, resolve, canonical) {
    this.pkg = packaging;
    this.nav = navigation;
    const manifest = packaging.manifest;
    const spine = packaging.spine;
    const toc = navigation.toc;
    spine.forEach((itemref, key) => {
      const item = manifest.get(key);
      const data = {};
      data.cfiBase = src_epubcfi.prototype.generateChapterComponent(spine.nodeIndex, itemref.index, itemref.id);
      if (item) {
        const link = toc.get(item.href);
        data.bind = link ? link.bind : item.href;
        data.href = item.href;
        data.url = resolve(item.href, true);
        data.canonical = canonical(item.href);
        data.properties = [];
        if (item.properties.length) {
          data.properties.push.apply(data.properties, item.properties);
        }
      }
      data.idref = itemref.idref;
      data.index = itemref.index;
      data.linear = itemref.linear;
      if (data.linear === "yes") {
        data.next = () => {
          let nextIndex = data.index;
          while (nextIndex < this.size - 1) {
            let next = this.get(nextIndex + 1);
            if (next && next.linear) {
              return next;
            }
            nextIndex += 1;
          }
          return null;
        };
        data.prev = () => {
          let prevIndex = data.index;
          while (prevIndex > 0) {
            let prev = this.get(prevIndex - 1);
            if (prev && prev.linear) {
              return prev;
            }
            prevIndex -= 1;
          }
          return null;
        };
      } else {
        data.prev = () => {
          return null;
        };
        data.next = () => {
          return null;
        };
      }
      const section = new src_section(data, this.hooks);
      this.set(data.bind, section);
    });
    if (this.size) {
      let nextIndex = 0;
      while (nextIndex < this.size) {
        let next = this.get(nextIndex);
        if (next && next.linear) {
          this.points["first"] = next;
          break;
        }
        nextIndex += 1;
      }
    }
    if (this.size) {
      let prevIndex = this.size;
      while (prevIndex > 0) {
        let prev = this.get(prevIndex - 1);
        if (prev && prev.linear) {
          this.points["last"] = prev;
          break;
        }
        prevIndex -= 1;
      }
    }
    return new Promise(resolve => {
      resolve(this);
    });
  }

  /**
   * destroy
   */
  destroy() {
    this.clear();
    this.hooks = undefined;
    this.points = undefined;
    this.nav = undefined;
    this.pkg = undefined;
  }
}
/* harmony default export */ const sections = (Sections);
;// ./src/book.js




















const CONTAINER_PATH_0 = "META-INF/container.xml";
const CONTAINER_PATH_1 = "META-INF/container.json";
const INPUT_TYPE = {
  BINARY: "binary",
  BASE64: "base64",
  EPUB: "epub",
  DIRECTORY: "directory"
};

/**
 * An Epub representation with methods for the loading, 
 * parsing and manipulation of its contents.
 */
class Book {
  /**
   * Constructor
   * @param {string|ArrayBuffer} [input] Url, Path or ArrayBuffer
   * @param {object} [options]
   * @param {string} [options.format='xml'] epub container format
   * @param {object} [options.request] object options to xhr request
   * @param {Function} [options.request.method] a request function to use instead of the default
   * @param {boolean} [options.request.withCredentials=false] send the xhr request withCredentials
   * @param {string[]} [options.request.headers=[]] send the xhr request headers
   * @param {string} [options.encoding='binary'] optional to pass `"binary"` or `"base64"` for archived Epubs
   * @param {string} [options.replacements=null] use `"base64"` or `"blobUrl"` for replacing assets
   * @param {Function} [options.canonical] optional function to determine canonical urls for a path
   * @param {string} [options.store=null] cache the contents in local storage, value should be the name of the reader
   * @example new Book()
   * @example new Book("/path/to/book/", { store: "epub-js" })
   * @example new Book({ replacements: "base64", store: "epub-js" })
   */
  constructor(input, options) {
    if (typeof options === "undefined" && typeof input !== "string" && input instanceof Blob === false && input instanceof ArrayBuffer === false) {
      options = input;
      input = undefined;
    }
    this.settings = extend({
      canonical: undefined,
      encoding: undefined,
      replacements: null,
      request: {
        method: undefined,
        withCredentials: false,
        headers: []
      },
      store: null
    }, options || {});
    /**
     * @member {Function} request
     * @memberof Book
     * @readonly
     */
    this.request = this.settings.request.method || utils_request;
    /**
     * @member {Archive} archive
     * @memberof Book
     * @private
     */
    this.archive = undefined;
    /**
     * @member {Storage} storage
     * @memberof Book
     * @readonly
     */
    this.storage = new storage(this.settings.store);
    /**
     * @member {Rendition} rendition
     * @memberof Book
     * @readonly
     */
    this.rendition = undefined;
    /**
     * @member {Container} container
     * @memberof Book
     * @readonly
     */
    this.container = new container();
    /**
     * @member {Packaging} packaging
     * @memberof Book
     * @readonly
     */
    this.packaging = new packaging();
    /**
     * @member {Resources} resources
     * @memberof Book
     * @readonly
     */
    this.resources = new resources(this.request.bind(this), this.resolve.bind(this), this.settings.replacements);
    /**
     * @member {Sections} sections
     * @memberof Book
     * @readonly
     */
    this.sections = new sections();
    /**
     * @member {Locations} locations
     * @memberof Book
     * @readonly
     */
    this.locations = new locations(this.sections, this.load.bind(this));
    /**
     * @member {Navigation} navigation
     * @memberof Book
     * @readonly
     */
    this.navigation = new navigation();
    /**
     * @member {Url} url
     * @memberof Book
     * @readonly
     */
    this.url = undefined;
    if (this.settings.store) {
      this.storage.createInstance();
    }
    if (input) {
      this.open(input).catch(error => {
        /**
         * @event openFailed
         * @param {object} error
         * @memberof Book
         */
        this.emit(EVENTS.BOOK.OPEN_FAILED, error);
      });
    }
  }

  /**
   * Init Promises
   * @private
   */
  init() {
    /**
     * @member {boolean} archived
     * @memberof Book
     * @readonly
     */
    this.archived = false;
    /**
     * @member {string} cover
     * @memberof Book
     * @readonly
     */
    this.cover = null;
    /**
     * @member {Path} path
     * @memberof Book
     * @readonly
     */
    this.path = undefined;
    /**
     * @member {boolean} isOpen
     * @memberof Book
     * @readonly
     */
    this.isOpen = false;
    this.opening = new defer();
    /**
     * @member {Promise<Book>} opened returns after the book is loaded
     * @memberof Book
     * @readonly
     */
    this.opened = this.opening.promise;
    this.loading = {
      packaging: new defer(),
      resources: new defer(),
      navigation: new defer(),
      sections: new defer(),
      cover: new defer()
    };
    /**
     * Sequential loading of tasks
     * @member {object} loaded
     * @property {Promise<Packaging>} packaging
     * @property {Promise<Resources>} resources
     * @property {Promise<Navigation>} navigation
     * @property {Promise<Sections>} sections
     * @property {Promise<string>} cover
     * @memberof Book
     * @readonly
     */
    this.loaded = {
      packaging: this.loading.packaging.promise,
      resources: this.loading.resources.promise,
      navigation: this.loading.navigation.promise,
      sections: this.loading.sections.promise,
      cover: this.loading.cover.promise
    };
  }

  /**
   * Clear parts
   */
  clear() {
    this.container.clear();
    this.packaging.clear();
    this.resources.clear();
    this.navigation.clear();
    this.sections.clear();
    this.locations.clear();
  }

  /**
   * Open a epub or url
   * @param {string|ArrayBuffer} input Url, Path or ArrayBuffer
   * @param {string} [openAs] input type: `"binary"` OR `"base64"` OR `"epub"` OR `"json"` OR `"directory"`
   * @returns {Promise<Book>} of when the book has been loaded
   * @example book.open("/path/to/book/")
   * @example book.open("/path/to/book.epub")
   * @example book.open("https://example.com/book/")
   * @example book.open("https://example.com/book.epub")
   * @example book.open([arraybuffer], "binary")
   */
  async open(input, openAs) {
    this.init();
    const type = openAs || this.determineType(input);
    if (this.settings.store) {
      this.store(input);
    }
    let opening;
    if (type === INPUT_TYPE.BINARY) {
      this.archived = true;
      this.url = new utils_url("/", "");
      opening = this.openEpub(input);
    } else if (type === INPUT_TYPE.BASE64) {
      this.archived = true;
      this.url = new utils_url("/", "");
      opening = this.openEpub(input, type);
    } else if (type === INPUT_TYPE.EPUB) {
      this.archived = true;
      this.url = new utils_url("/", "");
      opening = this.request(input, "binary", this.settings.request.withCredentials, this.settings.request.headers).then(this.openEpub.bind(this));
    } else {
      this.url = new utils_url(input);
      let path;
      if (this.settings.format === "json") {
        path = CONTAINER_PATH_1;
      } else {
        path = CONTAINER_PATH_0;
      }
      opening = this.openContainer(path, type);
    }
    return opening;
  }

  /**
   * Open an archived epub
   * @param {string|ArrayBuffer} input
   * @param {string} [type] input type: `"base64"`
   * @returns {Promise<any>}
   * @private
   */
  async openEpub(input, type) {
    const encoding = type || this.settings.encoding;
    return this.unarchive(input, encoding).then(() => {
      return this.openContainer(CONTAINER_PATH_0);
    });
  }

  /**
   * Open the epub container
   * @param {string} url
   * @returns {Promise<string>}
   * @private
   */
  async openContainer(url) {
    return this.load(url).then(data => {
      if (this.settings.format === "json") {
        return this.container.load(data);
      } else {
        return this.container.parse(data);
      }
    }).then(container => {
      const uri = this.resolve(container.fullPath);
      return this.openPackaging(uri);
    });
  }

  /**
   * Open the package.opf
   * @param {string} url
   * @returns {Promise<any>}
   * @private
   */
  async openPackaging(url) {
    this.path = new utils_path(url);
    return this.load(url).then(data => {
      if (this.settings.format === "json") {
        return this.packaging.load(data);
      } else {
        return this.packaging.parse(data);
      }
    }).then(() => {
      return this.loadNavigation();
    }).then(() => {
      return this.unpack();
    });
  }

  /**
   * Load a resource from the Book
   * @param {string} path path to the resource to load
   * @param {string} [type=null] 
   * @returns {Promise<any>} returns a promise with the requested resource
   */
  load(path, type = null) {
    const resolved = this.resolve(path);
    if (this.archived) {
      return this.archive.request(resolved);
    } else {
      return this.request(resolved, type, this.settings.request.withCredentials, this.settings.request.headers);
    }
  }

  /**
   * Resolve a path to it's absolute position in the Book
   * @param {string} path
   * @param {boolean} [absolute=false] force resolving the full URL
   * @returns {string} the resolved path string
   */
  resolve(path, absolute = false) {
    if (!path) return;
    if (path.indexOf("://") > -1) {
      return path; // is absolute
    }
    let resolved = path;
    if (this.path) {
      resolved = this.path.resolve(this.path.directory, path);
    }
    if (absolute === false && this.url) {
      resolved = this.url.resolve(resolved);
    }
    return resolved;
  }

  /**
   * Get a canonical link to a path
   * @param {string} path
   * @returns {string} the canonical path string
   */
  canonical(path) {
    if (!path) return "";
    let url;
    if (this.settings.canonical) {
      url = this.settings.canonical(path);
    } else {
      url = this.resolve(path, true);
    }
    return url;
  }

  /**
   * Determine the type of they input passed to open
   * @param {string} input
   * @returns {string} values: `"binary"` OR `"directory"` OR `"epub"` OR `"opf"`
   * @private
   */
  determineType(input) {
    if (this.settings.encoding === "base64") {
      return INPUT_TYPE.BASE64;
    }
    if (typeof input !== "string") {
      return INPUT_TYPE.BINARY;
    }
    const path = new utils_url(input).path;
    let extension = path.extension;
    // If there's a search string, remove it before determining type
    if (extension) {
      extension = extension.replace(/\?.*$/, "");
    }
    if (extension === "epub") {
      return INPUT_TYPE.EPUB;
    } else {
      return INPUT_TYPE.DIRECTORY;
    }
  }

  /**
   * Unpack the contents of the book packaging
   * @returns {Promise<Book>}
   * @private
   */
  async unpack() {
    this.loading.packaging.resolve(this.packaging);
    this.loading.navigation.resolve(this.navigation);
    this.resources.unpack(this.packaging.manifest, this.archive, this.storage).then(resources => {
      this.loading.resources.resolve(resources);
    });
    this.sections.unpack(this.packaging, this.navigation, this.resolve.bind(this), this.canonical.bind(this)).then(sections => {
      this.loading.sections.resolve(sections);
    });
    if (this.resources.replacements) {
      this.sections.hooks.serialize.register(this.resources.substitute.bind(this.resources));
    }
    if (this.packaging.manifest.coverPath) {
      this.cover = this.resolve(this.packaging.manifest.coverPath);
    }
    this.loading.cover.resolve(this.cover);
    const tasks = [...Object.values(this.loaded)];
    return Promise.all(tasks).then(() => {
      this.isOpen = true;
      this.opening.resolve(this);
      return this.opened;
    });
  }

  /**
   * Load navigation
   * @returns {Promise<Navigation>}
   * @private
   */
  async loadNavigation() {
    const navPath = this.packaging.manifest.navPath;
    if (navPath) {
      return this.load(navPath).then(data => {
        if (this.settings.format === "json") {
          return this.navigation.load(data);
        } else {
          return this.navigation.parse(data);
        }
      });
    } else {
      return Promise.resolve(this.navigation);
    }
  }

  /**
   * Gets a Section of the Book from the Spine
   * Alias for `book.sections.get`
   * @param {string|number} [target]
   * @returns {Section|null}
   * @example book.section()
   * @example book.section(3)
   * @example book.section("#chapter_001")
   * @example book.section("chapter_001.xhtml")
   * @example book.section("epubcfi(/6/8!/4/2/16/1:0)")
   */
  section(target) {
    return this.sections.get(target);
  }

  /**
   * Sugar to render a book to an element
   * @param {Element|string} element element or string to add a rendition to
   * @param {object} [options]
   * @returns {Rendition}
   */
  renderTo(element, options) {
    const method = "blobUrl";
    if (this.settings.replacements === method) {
      options = extend({
        method
      }, options || {});
    }
    this.rendition = new rendition(this, options);
    this.rendition.attachTo(element);
    return this.rendition;
  }

  /**
   * Set if request should use withCredentials
   * @param {boolean} credentials
   */
  setRequestCredentials(credentials) {
    this.settings.request.withCredentials = credentials;
  }

  /**
   * Set headers request should use
   * @param {string[]} headers
   */
  setRequestHeaders(headers) {
    this.settings.request.headers = headers;
  }

  /**
   * Unarchive a zipped epub
   * @param {string|ArrayBuffer} input url string or arraybuffer data
   * @param {string} [encoding] input type: `"base64"`
   * @returns {Promise<any>}
   * @private
   */
  unarchive(input, encoding) {
    this.archive = new archive();
    return this.archive.open(input, encoding);
  }

  /**
   * Storage configure
   * @param {string|ArrayBuffer} input
   * @private
   */
  store(input) {
    if (typeof input === "string") {
      //-- replace request method to go through store
      this.request = this.storage.dispatch.bind(this.storage);
    }
  }

  /**
   * Get the cover url
   * @returns {Promise<string>} coverUrl
   */
  async coverUrl() {
    return this.loaded.cover.then(() => {
      if (this.archived && this.cover) {
        return this.resources.createUrl(this.cover);
      }
      return this.cover;
    });
  }

  /**
   * Find a DOM Range for a given CFI Range
   * @param {EpubCFI} cfiRange a epub cfi range
   * @returns {Promise<Range>}
   */
  async getRange(cfiRange) {
    const cfi = new src_epubcfi(cfiRange);
    const item = this.sections.get(cfi.spinePos);
    const request = this.load.bind(this);
    if (!item) {
      return new Promise((resolve, reject) => {
        reject(new Error("CFI could not be found"));
      });
    }
    return item.load(request).then(contents => {
      const range = cfi.toRange(item.document);
      return range;
    });
  }

  /**
   * Generates the Book Key using the identifier in the manifest or other string provided
   * @param {string} [identifier] to use instead of metadata identifier
   * @returns {string} key
   */
  key(identifier) {
    const ident = identifier || this.packaging.metadata.get("identifier") || this.url.filename;
    return `epubjs:${EPUBJS_VERSION}:${ident}`;
  }

  /**
   * Destroy the Book and all associated objects
   */
  destroy() {
    this.isOpen = undefined;
    this.opened = undefined;
    this.loaded = undefined;
    this.opening = undefined;
    this.loading = undefined;
    this.archive && this.archive.destroy();
    this.storage && this.storage.destroy();
    this.sections && this.sections.destroy();
    this.locations && this.locations.destroy();
    this.resources && this.resources.destroy();
    this.container && this.container.destroy();
    this.packaging && this.packaging.destroy();
    this.rendition && this.rendition.destroy();
    this.navigation && this.navigation.destroy();
    this.archive = undefined;
    this.storage = undefined;
    this.archived = undefined;
    this.sections = undefined;
    this.locations = undefined;
    this.resources = undefined;
    this.container = undefined;
    this.packaging = undefined;
    this.rendition = undefined;
    this.navigation = undefined;
    this.url = undefined;
    this.path = undefined;
    this.cover = undefined;
    this.request = undefined;
    this.settings = undefined;
  }
}
event_emitter_default()(Book.prototype);
/* harmony default export */ const book = (Book);
;// ./src/epub.js










/**
 * Create a new Book instance
 * @param {string|ArrayBuffer} inpit URL, Path or ArrayBuffer
 * @param {object} [options] to pass to the book
 * @returns {Book} a new Book object
 * @example ePub()
 * @example ePub("/path/to/book/")
 * @example ePub("/path/to/book/", { replacements: "blobUrl", store: "epub-js" })
 * @example ePub("/path/to/book.epub")
 * @example ePub("https://example.com/to/book.epub")
 */
function ePub(inpit, options) {
  return new book(inpit, options);
}
ePub.VERSION = EPUBJS_VERSION;
if (typeof __webpack_require__.g !== "undefined") {
  __webpack_require__.g.EPUBJS_VERSION = EPUBJS_VERSION;
}
ePub.Book = book;
ePub.Rendition = rendition;
ePub.Contents = contents;
ePub.EpubCFI = src_epubcfi;
ePub.utils = core_namespaceObject;
/* harmony default export */ const epub = (ePub);
})();

__webpack_exports__ = __webpack_exports__["default"];
/******/ 	return __webpack_exports__;
/******/ })()
;
});
//# sourceMappingURL=epub.js.map