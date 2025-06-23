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

/***/ 34:
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

"use strict";

var isCallable = __webpack_require__(4901);

module.exports = function (it) {
  return typeof it == 'object' ? it !== null : isCallable(it);
};


/***/ }),

/***/ 41:
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

"use strict";


var $defineProperty = __webpack_require__(3036);

var $SyntaxError = __webpack_require__(8068);
var $TypeError = __webpack_require__(9675);

var gopd = __webpack_require__(5795);

/** @type {import('.')} */
module.exports = function defineDataProperty(
	obj,
	property,
	value
) {
	if (!obj || (typeof obj !== 'object' && typeof obj !== 'function')) {
		throw new $TypeError('`obj` must be an object or a function`');
	}
	if (typeof property !== 'string' && typeof property !== 'symbol') {
		throw new $TypeError('`property` must be a string or a symbol`');
	}
	if (arguments.length > 3 && typeof arguments[3] !== 'boolean' && arguments[3] !== null) {
		throw new $TypeError('`nonEnumerable`, if provided, must be a boolean or null');
	}
	if (arguments.length > 4 && typeof arguments[4] !== 'boolean' && arguments[4] !== null) {
		throw new $TypeError('`nonWritable`, if provided, must be a boolean or null');
	}
	if (arguments.length > 5 && typeof arguments[5] !== 'boolean' && arguments[5] !== null) {
		throw new $TypeError('`nonConfigurable`, if provided, must be a boolean or null');
	}
	if (arguments.length > 6 && typeof arguments[6] !== 'boolean') {
		throw new $TypeError('`loose`, if provided, must be a boolean');
	}

	var nonEnumerable = arguments.length > 3 ? arguments[3] : null;
	var nonWritable = arguments.length > 4 ? arguments[4] : null;
	var nonConfigurable = arguments.length > 5 ? arguments[5] : null;
	var loose = arguments.length > 6 ? arguments[6] : false;

	/* @type {false | TypedPropertyDescriptor<unknown>} */
	var desc = !!gopd && gopd(obj, property);

	if ($defineProperty) {
		$defineProperty(obj, property, {
			configurable: nonConfigurable === null && desc ? desc.configurable : !nonConfigurable,
			enumerable: nonEnumerable === null && desc ? desc.enumerable : !nonEnumerable,
			value: value,
			writable: nonWritable === null && desc ? desc.writable : !nonWritable
		});
	} else if (loose || (!nonEnumerable && !nonWritable && !nonConfigurable)) {
		// must fall back to [[Set]], and was not explicitly asked to make non-enumerable, non-writable, or non-configurable
		obj[property] = value; // eslint-disable-line no-param-reassign
	} else {
		throw new $SyntaxError('This environment does not support defining a property as non-configurable, non-writable, or non-enumerable.');
	}
};


/***/ }),

/***/ 57:
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

"use strict";
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   A: () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var core_js_modules_es_iterator_constructor_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(8111);
/* harmony import */ var core_js_modules_es_iterator_for_each_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(7588);
/* harmony import */ var event_emitter__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(3068);
/* harmony import */ var _utils_core__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(9046);
/* harmony import */ var _utils_constants__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(5720);






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
    this.layout.on(_utils_constants__WEBPACK_IMPORTED_MODULE_4__/* .EVENTS */ .qY.LAYOUT.UPDATED, (props, changed) => {
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
    if (szw && (0,_utils_core__WEBPACK_IMPORTED_MODULE_3__.isNumber)(szw)) {
      szw = szw + "px";
    }
    if (szh && (0,_utils_core__WEBPACK_IMPORTED_MODULE_3__.isNumber)(szh)) {
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
    this.emit(_utils_constants__WEBPACK_IMPORTED_MODULE_4__/* .EVENTS */ .qY.VIEWPORT.ORIENTATION_CHANGE, e.target);
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
    this.emit(_utils_constants__WEBPACK_IMPORTED_MODULE_4__/* .EVENTS */ .qY.VIEWPORT.RESIZED, this.rect);
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
    } else if ((0,_utils_core__WEBPACK_IMPORTED_MODULE_3__.isNumber)(width)) {
      this.container.style.width = width + "px";
      this.rect.width = width;
    } else {
      this.container.style.width = width;
      this.rect.width = this.container.clientWidth;
    }
    if (!height) {
      height = this.rect.height;
      this.container.style.height = height + "px";
    } else if ((0,_utils_core__WEBPACK_IMPORTED_MODULE_3__.isNumber)(height)) {
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
      this.views.container.style["display"] = "flex";
    } else {
      this.views.container.style["display"] = "grid";
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
      this.views.container.style["display"] = "flex";
      this.views.container.style["overflow-y"] = "hidden";
      this.views.container.style["overflow-x"] = "hidden";
    } else if (this.layout.axis === "horizontal") {
      this.views.container.style["display"] = "flex";
      this.views.container.style["overflow-y"] = "hidden";
      this.views.container.style["overflow-x"] = "auto";
    } else if (this.layout.axis === "vertical") {
      this.views.container.style["display"] = "grid";
      this.views.container.style["overflow-y"] = "auto";
      this.views.container.style["overflow-x"] = "hidden";
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
event_emitter__WEBPACK_IMPORTED_MODULE_2__(Viewport.prototype);
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (Viewport);

/***/ }),

/***/ 76:
/***/ ((module) => {

"use strict";


/** @type {import('./functionCall')} */
module.exports = Function.prototype.call;


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

/***/ 116:
/***/ ((__unused_webpack_module, __unused_webpack_exports, __webpack_require__) => {

"use strict";

var $ = __webpack_require__(6518);
var call = __webpack_require__(9565);
var iterate = __webpack_require__(2652);
var aCallable = __webpack_require__(9306);
var anObject = __webpack_require__(8551);
var getIteratorDirect = __webpack_require__(1767);
var iteratorClose = __webpack_require__(9539);
var iteratorHelperWithoutClosingOnEarlyError = __webpack_require__(4549);

var findWithoutClosingOnEarlyError = iteratorHelperWithoutClosingOnEarlyError('find', TypeError);

// `Iterator.prototype.find` method
// https://tc39.es/ecma262/#sec-iterator.prototype.find
$({ target: 'Iterator', proto: true, real: true, forced: findWithoutClosingOnEarlyError }, {
  find: function find(predicate) {
    anObject(this);
    try {
      aCallable(predicate);
    } catch (error) {
      iteratorClose(this, 'throw', error);
    }

    if (findWithoutClosingOnEarlyError) return call(findWithoutClosingOnEarlyError, this, predicate);

    var record = getIteratorDirect(this);
    var counter = 0;
    return iterate(record, function (value, stop) {
      if (predicate(value, counter++)) return stop(value);
    }, { IS_RECORD: true, INTERRUPTED: true }).result;
  }
});


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

/***/ 214:
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

"use strict";


module.exports = __webpack_require__(525)() ? String.prototype.contains : __webpack_require__(1521);


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

/***/ 397:
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

"use strict";

var getBuiltIn = __webpack_require__(7751);

module.exports = getBuiltIn('document', 'documentElement');


/***/ }),

/***/ 414:
/***/ ((module) => {

"use strict";


/** @type {import('./round')} */
module.exports = Math.round;


/***/ }),

/***/ 421:
/***/ ((module) => {

"use strict";

module.exports = {};


/***/ }),

/***/ 453:
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

"use strict";


var undefined;

var $Object = __webpack_require__(9612);

var $Error = __webpack_require__(9383);
var $EvalError = __webpack_require__(1237);
var $RangeError = __webpack_require__(9290);
var $ReferenceError = __webpack_require__(9538);
var $SyntaxError = __webpack_require__(8068);
var $TypeError = __webpack_require__(9675);
var $URIError = __webpack_require__(5345);

var abs = __webpack_require__(1514);
var floor = __webpack_require__(8968);
var max = __webpack_require__(6188);
var min = __webpack_require__(8002);
var pow = __webpack_require__(5880);
var round = __webpack_require__(414);
var sign = __webpack_require__(3093);

var $Function = Function;

// eslint-disable-next-line consistent-return
var getEvalledConstructor = function (expressionSyntax) {
	try {
		return $Function('"use strict"; return (' + expressionSyntax + ').constructor;')();
	} catch (e) {}
};

var $gOPD = __webpack_require__(5795);
var $defineProperty = __webpack_require__(3036);

var throwTypeError = function () {
	throw new $TypeError();
};
var ThrowTypeError = $gOPD
	? (function () {
		try {
			// eslint-disable-next-line no-unused-expressions, no-caller, no-restricted-properties
			arguments.callee; // IE 8 does not throw here
			return throwTypeError;
		} catch (calleeThrows) {
			try {
				// IE 8 throws on Object.getOwnPropertyDescriptor(arguments, '')
				return $gOPD(arguments, 'callee').get;
			} catch (gOPDthrows) {
				return throwTypeError;
			}
		}
	}())
	: throwTypeError;

var hasSymbols = __webpack_require__(4039)();

var getProto = __webpack_require__(3628);
var $ObjectGPO = __webpack_require__(1064);
var $ReflectGPO = __webpack_require__(8648);

var $apply = __webpack_require__(1002);
var $call = __webpack_require__(76);

var needsEval = {};

var TypedArray = typeof Uint8Array === 'undefined' || !getProto ? undefined : getProto(Uint8Array);

var INTRINSICS = {
	__proto__: null,
	'%AggregateError%': typeof AggregateError === 'undefined' ? undefined : AggregateError,
	'%Array%': Array,
	'%ArrayBuffer%': typeof ArrayBuffer === 'undefined' ? undefined : ArrayBuffer,
	'%ArrayIteratorPrototype%': hasSymbols && getProto ? getProto([][Symbol.iterator]()) : undefined,
	'%AsyncFromSyncIteratorPrototype%': undefined,
	'%AsyncFunction%': needsEval,
	'%AsyncGenerator%': needsEval,
	'%AsyncGeneratorFunction%': needsEval,
	'%AsyncIteratorPrototype%': needsEval,
	'%Atomics%': typeof Atomics === 'undefined' ? undefined : Atomics,
	'%BigInt%': typeof BigInt === 'undefined' ? undefined : BigInt,
	'%BigInt64Array%': typeof BigInt64Array === 'undefined' ? undefined : BigInt64Array,
	'%BigUint64Array%': typeof BigUint64Array === 'undefined' ? undefined : BigUint64Array,
	'%Boolean%': Boolean,
	'%DataView%': typeof DataView === 'undefined' ? undefined : DataView,
	'%Date%': Date,
	'%decodeURI%': decodeURI,
	'%decodeURIComponent%': decodeURIComponent,
	'%encodeURI%': encodeURI,
	'%encodeURIComponent%': encodeURIComponent,
	'%Error%': $Error,
	'%eval%': eval, // eslint-disable-line no-eval
	'%EvalError%': $EvalError,
	'%Float16Array%': typeof Float16Array === 'undefined' ? undefined : Float16Array,
	'%Float32Array%': typeof Float32Array === 'undefined' ? undefined : Float32Array,
	'%Float64Array%': typeof Float64Array === 'undefined' ? undefined : Float64Array,
	'%FinalizationRegistry%': typeof FinalizationRegistry === 'undefined' ? undefined : FinalizationRegistry,
	'%Function%': $Function,
	'%GeneratorFunction%': needsEval,
	'%Int8Array%': typeof Int8Array === 'undefined' ? undefined : Int8Array,
	'%Int16Array%': typeof Int16Array === 'undefined' ? undefined : Int16Array,
	'%Int32Array%': typeof Int32Array === 'undefined' ? undefined : Int32Array,
	'%isFinite%': isFinite,
	'%isNaN%': isNaN,
	'%IteratorPrototype%': hasSymbols && getProto ? getProto(getProto([][Symbol.iterator]())) : undefined,
	'%JSON%': typeof JSON === 'object' ? JSON : undefined,
	'%Map%': typeof Map === 'undefined' ? undefined : Map,
	'%MapIteratorPrototype%': typeof Map === 'undefined' || !hasSymbols || !getProto ? undefined : getProto(new Map()[Symbol.iterator]()),
	'%Math%': Math,
	'%Number%': Number,
	'%Object%': $Object,
	'%Object.getOwnPropertyDescriptor%': $gOPD,
	'%parseFloat%': parseFloat,
	'%parseInt%': parseInt,
	'%Promise%': typeof Promise === 'undefined' ? undefined : Promise,
	'%Proxy%': typeof Proxy === 'undefined' ? undefined : Proxy,
	'%RangeError%': $RangeError,
	'%ReferenceError%': $ReferenceError,
	'%Reflect%': typeof Reflect === 'undefined' ? undefined : Reflect,
	'%RegExp%': RegExp,
	'%Set%': typeof Set === 'undefined' ? undefined : Set,
	'%SetIteratorPrototype%': typeof Set === 'undefined' || !hasSymbols || !getProto ? undefined : getProto(new Set()[Symbol.iterator]()),
	'%SharedArrayBuffer%': typeof SharedArrayBuffer === 'undefined' ? undefined : SharedArrayBuffer,
	'%String%': String,
	'%StringIteratorPrototype%': hasSymbols && getProto ? getProto(''[Symbol.iterator]()) : undefined,
	'%Symbol%': hasSymbols ? Symbol : undefined,
	'%SyntaxError%': $SyntaxError,
	'%ThrowTypeError%': ThrowTypeError,
	'%TypedArray%': TypedArray,
	'%TypeError%': $TypeError,
	'%Uint8Array%': typeof Uint8Array === 'undefined' ? undefined : Uint8Array,
	'%Uint8ClampedArray%': typeof Uint8ClampedArray === 'undefined' ? undefined : Uint8ClampedArray,
	'%Uint16Array%': typeof Uint16Array === 'undefined' ? undefined : Uint16Array,
	'%Uint32Array%': typeof Uint32Array === 'undefined' ? undefined : Uint32Array,
	'%URIError%': $URIError,
	'%WeakMap%': typeof WeakMap === 'undefined' ? undefined : WeakMap,
	'%WeakRef%': typeof WeakRef === 'undefined' ? undefined : WeakRef,
	'%WeakSet%': typeof WeakSet === 'undefined' ? undefined : WeakSet,

	'%Function.prototype.call%': $call,
	'%Function.prototype.apply%': $apply,
	'%Object.defineProperty%': $defineProperty,
	'%Object.getPrototypeOf%': $ObjectGPO,
	'%Math.abs%': abs,
	'%Math.floor%': floor,
	'%Math.max%': max,
	'%Math.min%': min,
	'%Math.pow%': pow,
	'%Math.round%': round,
	'%Math.sign%': sign,
	'%Reflect.getPrototypeOf%': $ReflectGPO
};

if (getProto) {
	try {
		null.error; // eslint-disable-line no-unused-expressions
	} catch (e) {
		// https://github.com/tc39/proposal-shadowrealm/pull/384#issuecomment-1364264229
		var errorProto = getProto(getProto(e));
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
		if (gen && getProto) {
			value = getProto(gen.prototype);
		}
	}

	INTRINSICS[name] = value;

	return value;
};

var LEGACY_ALIASES = {
	__proto__: null,
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

var bind = __webpack_require__(6743);
var hasOwn = __webpack_require__(9957);
var $concat = bind.call($call, Array.prototype.concat);
var $spliceApply = bind.call($apply, Array.prototype.splice);
var $replace = bind.call($call, String.prototype.replace);
var $strSlice = bind.call($call, String.prototype.slice);
var $exec = bind.call($call, RegExp.prototype.exec);

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
	$replace(string, rePropName, function (match, number, quote, subString) {
		result[result.length] = quote ? $replace(subString, reEscapeChar, '$1') : number || match;
	});
	return result;
};
/* end adaptation */

var getBaseIntrinsic = function getBaseIntrinsic(name, allowMissing) {
	var intrinsicName = name;
	var alias;
	if (hasOwn(LEGACY_ALIASES, intrinsicName)) {
		alias = LEGACY_ALIASES[intrinsicName];
		intrinsicName = '%' + alias[0] + '%';
	}

	if (hasOwn(INTRINSICS, intrinsicName)) {
		var value = INTRINSICS[intrinsicName];
		if (value === needsEval) {
			value = doEval(intrinsicName);
		}
		if (typeof value === 'undefined' && !allowMissing) {
			throw new $TypeError('intrinsic ' + name + ' exists, but is not available. Please file an issue!');
		}

		return {
			alias: alias,
			name: intrinsicName,
			value: value
		};
	}

	throw new $SyntaxError('intrinsic ' + name + ' does not exist!');
};

module.exports = function GetIntrinsic(name, allowMissing) {
	if (typeof name !== 'string' || name.length === 0) {
		throw new $TypeError('intrinsic name must be a non-empty string');
	}
	if (arguments.length > 1 && typeof allowMissing !== 'boolean') {
		throw new $TypeError('"allowMissing" argument must be a boolean');
	}

	if ($exec(/^%?[^%]*%?$/, name) === null) {
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
		$spliceApply(parts, $concat([0, 1], alias));
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

		if (hasOwn(INTRINSICS, intrinsicRealName)) {
			value = INTRINSICS[intrinsicRealName];
		} else if (value != null) {
			if (!(part in value)) {
				if (!allowMissing) {
					throw new $TypeError('base intrinsic for ' + name + ' exists, but the property is not available.');
				}
				return void undefined;
			}
			if ($gOPD && (i + 1) >= parts.length) {
				var desc = $gOPD(value, part);
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
				isOwn = hasOwn(value, part);
				value = value[part];
			}

			if (isOwn && !skipFurtherCaching) {
				INTRINSICS[intrinsicRealName] = value;
			}
		}
	}
	return value;
};


/***/ }),

/***/ 487:
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

"use strict";


var setFunctionLength = __webpack_require__(6897);

var $defineProperty = __webpack_require__(3036);

var callBindBasic = __webpack_require__(3126);
var applyBind = __webpack_require__(2205);

module.exports = function callBind(originalFunction) {
	var func = callBindBasic(arguments);
	var adjustedLength = originalFunction.length - (arguments.length - 1);
	return setFunctionLength(
		func,
		1 + (adjustedLength > 0 ? adjustedLength : 0),
		true
	);
};

if ($defineProperty) {
	$defineProperty(module.exports, 'apply', { value: applyBind });
} else {
	module.exports.apply = applyBind;
}


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

/***/ 525:
/***/ ((module) => {

"use strict";


var str = "razdwatrzy";

module.exports = function () {
	if (typeof str.contains !== "function") return false;
	return str.contains("dwa") === true && str.contains("foo") === false;
};


/***/ }),

/***/ 537:
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {

/* provided dependency */ var process = __webpack_require__(5606);
// Copyright Joyent, Inc. and other Node contributors.
//
// Permission is hereby granted, free of charge, to any person obtaining a
// copy of this software and associated documentation files (the
// "Software"), to deal in the Software without restriction, including
// without limitation the rights to use, copy, modify, merge, publish,
// distribute, sublicense, and/or sell copies of the Software, and to permit
// persons to whom the Software is furnished to do so, subject to the
// following conditions:
//
// The above copyright notice and this permission notice shall be included
// in all copies or substantial portions of the Software.
//
// THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS
// OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF
// MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN
// NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM,
// DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR
// OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE
// USE OR OTHER DEALINGS IN THE SOFTWARE.

var getOwnPropertyDescriptors = Object.getOwnPropertyDescriptors ||
  function getOwnPropertyDescriptors(obj) {
    var keys = Object.keys(obj);
    var descriptors = {};
    for (var i = 0; i < keys.length; i++) {
      descriptors[keys[i]] = Object.getOwnPropertyDescriptor(obj, keys[i]);
    }
    return descriptors;
  };

var formatRegExp = /%[sdj%]/g;
exports.format = function(f) {
  if (!isString(f)) {
    var objects = [];
    for (var i = 0; i < arguments.length; i++) {
      objects.push(inspect(arguments[i]));
    }
    return objects.join(' ');
  }

  var i = 1;
  var args = arguments;
  var len = args.length;
  var str = String(f).replace(formatRegExp, function(x) {
    if (x === '%%') return '%';
    if (i >= len) return x;
    switch (x) {
      case '%s': return String(args[i++]);
      case '%d': return Number(args[i++]);
      case '%j':
        try {
          return JSON.stringify(args[i++]);
        } catch (_) {
          return '[Circular]';
        }
      default:
        return x;
    }
  });
  for (var x = args[i]; i < len; x = args[++i]) {
    if (isNull(x) || !isObject(x)) {
      str += ' ' + x;
    } else {
      str += ' ' + inspect(x);
    }
  }
  return str;
};


// Mark that a method should not be used.
// Returns a modified function which warns once by default.
// If --no-deprecation is set, then it is a no-op.
exports.deprecate = function(fn, msg) {
  if (typeof process !== 'undefined' && process.noDeprecation === true) {
    return fn;
  }

  // Allow for deprecating things in the process of starting up.
  if (typeof process === 'undefined') {
    return function() {
      return exports.deprecate(fn, msg).apply(this, arguments);
    };
  }

  var warned = false;
  function deprecated() {
    if (!warned) {
      if (process.throwDeprecation) {
        throw new Error(msg);
      } else if (process.traceDeprecation) {
        console.trace(msg);
      } else {
        console.error(msg);
      }
      warned = true;
    }
    return fn.apply(this, arguments);
  }

  return deprecated;
};


var debugs = {};
var debugEnvRegex = /^$/;

if (process.env.NODE_DEBUG) {
  var debugEnv = process.env.NODE_DEBUG;
  debugEnv = debugEnv.replace(/[|\\{}()[\]^$+?.]/g, '\\$&')
    .replace(/\*/g, '.*')
    .replace(/,/g, '$|^')
    .toUpperCase();
  debugEnvRegex = new RegExp('^' + debugEnv + '$', 'i');
}
exports.debuglog = function(set) {
  set = set.toUpperCase();
  if (!debugs[set]) {
    if (debugEnvRegex.test(set)) {
      var pid = process.pid;
      debugs[set] = function() {
        var msg = exports.format.apply(exports, arguments);
        console.error('%s %d: %s', set, pid, msg);
      };
    } else {
      debugs[set] = function() {};
    }
  }
  return debugs[set];
};


/**
 * Echos the value of a value. Trys to print the value out
 * in the best way possible given the different types.
 *
 * @param {Object} obj The object to print out.
 * @param {Object} opts Optional options object that alters the output.
 */
/* legacy: obj, showHidden, depth, colors*/
function inspect(obj, opts) {
  // default options
  var ctx = {
    seen: [],
    stylize: stylizeNoColor
  };
  // legacy...
  if (arguments.length >= 3) ctx.depth = arguments[2];
  if (arguments.length >= 4) ctx.colors = arguments[3];
  if (isBoolean(opts)) {
    // legacy...
    ctx.showHidden = opts;
  } else if (opts) {
    // got an "options" object
    exports._extend(ctx, opts);
  }
  // set default options
  if (isUndefined(ctx.showHidden)) ctx.showHidden = false;
  if (isUndefined(ctx.depth)) ctx.depth = 2;
  if (isUndefined(ctx.colors)) ctx.colors = false;
  if (isUndefined(ctx.customInspect)) ctx.customInspect = true;
  if (ctx.colors) ctx.stylize = stylizeWithColor;
  return formatValue(ctx, obj, ctx.depth);
}
exports.inspect = inspect;


// http://en.wikipedia.org/wiki/ANSI_escape_code#graphics
inspect.colors = {
  'bold' : [1, 22],
  'italic' : [3, 23],
  'underline' : [4, 24],
  'inverse' : [7, 27],
  'white' : [37, 39],
  'grey' : [90, 39],
  'black' : [30, 39],
  'blue' : [34, 39],
  'cyan' : [36, 39],
  'green' : [32, 39],
  'magenta' : [35, 39],
  'red' : [31, 39],
  'yellow' : [33, 39]
};

// Don't use 'blue' not visible on cmd.exe
inspect.styles = {
  'special': 'cyan',
  'number': 'yellow',
  'boolean': 'yellow',
  'undefined': 'grey',
  'null': 'bold',
  'string': 'green',
  'date': 'magenta',
  // "name": intentionally not styling
  'regexp': 'red'
};


function stylizeWithColor(str, styleType) {
  var style = inspect.styles[styleType];

  if (style) {
    return '\u001b[' + inspect.colors[style][0] + 'm' + str +
           '\u001b[' + inspect.colors[style][1] + 'm';
  } else {
    return str;
  }
}


function stylizeNoColor(str, styleType) {
  return str;
}


function arrayToHash(array) {
  var hash = {};

  array.forEach(function(val, idx) {
    hash[val] = true;
  });

  return hash;
}


function formatValue(ctx, value, recurseTimes) {
  // Provide a hook for user-specified inspect functions.
  // Check that value is an object with an inspect function on it
  if (ctx.customInspect &&
      value &&
      isFunction(value.inspect) &&
      // Filter out the util module, it's inspect function is special
      value.inspect !== exports.inspect &&
      // Also filter out any prototype objects using the circular check.
      !(value.constructor && value.constructor.prototype === value)) {
    var ret = value.inspect(recurseTimes, ctx);
    if (!isString(ret)) {
      ret = formatValue(ctx, ret, recurseTimes);
    }
    return ret;
  }

  // Primitive types cannot have properties
  var primitive = formatPrimitive(ctx, value);
  if (primitive) {
    return primitive;
  }

  // Look up the keys of the object.
  var keys = Object.keys(value);
  var visibleKeys = arrayToHash(keys);

  if (ctx.showHidden) {
    keys = Object.getOwnPropertyNames(value);
  }

  // IE doesn't make error fields non-enumerable
  // http://msdn.microsoft.com/en-us/library/ie/dww52sbt(v=vs.94).aspx
  if (isError(value)
      && (keys.indexOf('message') >= 0 || keys.indexOf('description') >= 0)) {
    return formatError(value);
  }

  // Some type of object without properties can be shortcutted.
  if (keys.length === 0) {
    if (isFunction(value)) {
      var name = value.name ? ': ' + value.name : '';
      return ctx.stylize('[Function' + name + ']', 'special');
    }
    if (isRegExp(value)) {
      return ctx.stylize(RegExp.prototype.toString.call(value), 'regexp');
    }
    if (isDate(value)) {
      return ctx.stylize(Date.prototype.toString.call(value), 'date');
    }
    if (isError(value)) {
      return formatError(value);
    }
  }

  var base = '', array = false, braces = ['{', '}'];

  // Make Array say that they are Array
  if (isArray(value)) {
    array = true;
    braces = ['[', ']'];
  }

  // Make functions say that they are functions
  if (isFunction(value)) {
    var n = value.name ? ': ' + value.name : '';
    base = ' [Function' + n + ']';
  }

  // Make RegExps say that they are RegExps
  if (isRegExp(value)) {
    base = ' ' + RegExp.prototype.toString.call(value);
  }

  // Make dates with properties first say the date
  if (isDate(value)) {
    base = ' ' + Date.prototype.toUTCString.call(value);
  }

  // Make error with message first say the error
  if (isError(value)) {
    base = ' ' + formatError(value);
  }

  if (keys.length === 0 && (!array || value.length == 0)) {
    return braces[0] + base + braces[1];
  }

  if (recurseTimes < 0) {
    if (isRegExp(value)) {
      return ctx.stylize(RegExp.prototype.toString.call(value), 'regexp');
    } else {
      return ctx.stylize('[Object]', 'special');
    }
  }

  ctx.seen.push(value);

  var output;
  if (array) {
    output = formatArray(ctx, value, recurseTimes, visibleKeys, keys);
  } else {
    output = keys.map(function(key) {
      return formatProperty(ctx, value, recurseTimes, visibleKeys, key, array);
    });
  }

  ctx.seen.pop();

  return reduceToSingleString(output, base, braces);
}


function formatPrimitive(ctx, value) {
  if (isUndefined(value))
    return ctx.stylize('undefined', 'undefined');
  if (isString(value)) {
    var simple = '\'' + JSON.stringify(value).replace(/^"|"$/g, '')
                                             .replace(/'/g, "\\'")
                                             .replace(/\\"/g, '"') + '\'';
    return ctx.stylize(simple, 'string');
  }
  if (isNumber(value))
    return ctx.stylize('' + value, 'number');
  if (isBoolean(value))
    return ctx.stylize('' + value, 'boolean');
  // For some reason typeof null is "object", so special case here.
  if (isNull(value))
    return ctx.stylize('null', 'null');
}


function formatError(value) {
  return '[' + Error.prototype.toString.call(value) + ']';
}


function formatArray(ctx, value, recurseTimes, visibleKeys, keys) {
  var output = [];
  for (var i = 0, l = value.length; i < l; ++i) {
    if (hasOwnProperty(value, String(i))) {
      output.push(formatProperty(ctx, value, recurseTimes, visibleKeys,
          String(i), true));
    } else {
      output.push('');
    }
  }
  keys.forEach(function(key) {
    if (!key.match(/^\d+$/)) {
      output.push(formatProperty(ctx, value, recurseTimes, visibleKeys,
          key, true));
    }
  });
  return output;
}


function formatProperty(ctx, value, recurseTimes, visibleKeys, key, array) {
  var name, str, desc;
  desc = Object.getOwnPropertyDescriptor(value, key) || { value: value[key] };
  if (desc.get) {
    if (desc.set) {
      str = ctx.stylize('[Getter/Setter]', 'special');
    } else {
      str = ctx.stylize('[Getter]', 'special');
    }
  } else {
    if (desc.set) {
      str = ctx.stylize('[Setter]', 'special');
    }
  }
  if (!hasOwnProperty(visibleKeys, key)) {
    name = '[' + key + ']';
  }
  if (!str) {
    if (ctx.seen.indexOf(desc.value) < 0) {
      if (isNull(recurseTimes)) {
        str = formatValue(ctx, desc.value, null);
      } else {
        str = formatValue(ctx, desc.value, recurseTimes - 1);
      }
      if (str.indexOf('\n') > -1) {
        if (array) {
          str = str.split('\n').map(function(line) {
            return '  ' + line;
          }).join('\n').slice(2);
        } else {
          str = '\n' + str.split('\n').map(function(line) {
            return '   ' + line;
          }).join('\n');
        }
      }
    } else {
      str = ctx.stylize('[Circular]', 'special');
    }
  }
  if (isUndefined(name)) {
    if (array && key.match(/^\d+$/)) {
      return str;
    }
    name = JSON.stringify('' + key);
    if (name.match(/^"([a-zA-Z_][a-zA-Z_0-9]*)"$/)) {
      name = name.slice(1, -1);
      name = ctx.stylize(name, 'name');
    } else {
      name = name.replace(/'/g, "\\'")
                 .replace(/\\"/g, '"')
                 .replace(/(^"|"$)/g, "'");
      name = ctx.stylize(name, 'string');
    }
  }

  return name + ': ' + str;
}


function reduceToSingleString(output, base, braces) {
  var numLinesEst = 0;
  var length = output.reduce(function(prev, cur) {
    numLinesEst++;
    if (cur.indexOf('\n') >= 0) numLinesEst++;
    return prev + cur.replace(/\u001b\[\d\d?m/g, '').length + 1;
  }, 0);

  if (length > 60) {
    return braces[0] +
           (base === '' ? '' : base + '\n ') +
           ' ' +
           output.join(',\n  ') +
           ' ' +
           braces[1];
  }

  return braces[0] + base + ' ' + output.join(', ') + ' ' + braces[1];
}


// NOTE: These type checking functions intentionally don't use `instanceof`
// because it is fragile and can be easily faked with `Object.create()`.
exports.types = __webpack_require__(9032);

function isArray(ar) {
  return Array.isArray(ar);
}
exports.isArray = isArray;

function isBoolean(arg) {
  return typeof arg === 'boolean';
}
exports.isBoolean = isBoolean;

function isNull(arg) {
  return arg === null;
}
exports.isNull = isNull;

function isNullOrUndefined(arg) {
  return arg == null;
}
exports.isNullOrUndefined = isNullOrUndefined;

function isNumber(arg) {
  return typeof arg === 'number';
}
exports.isNumber = isNumber;

function isString(arg) {
  return typeof arg === 'string';
}
exports.isString = isString;

function isSymbol(arg) {
  return typeof arg === 'symbol';
}
exports.isSymbol = isSymbol;

function isUndefined(arg) {
  return arg === void 0;
}
exports.isUndefined = isUndefined;

function isRegExp(re) {
  return isObject(re) && objectToString(re) === '[object RegExp]';
}
exports.isRegExp = isRegExp;
exports.types.isRegExp = isRegExp;

function isObject(arg) {
  return typeof arg === 'object' && arg !== null;
}
exports.isObject = isObject;

function isDate(d) {
  return isObject(d) && objectToString(d) === '[object Date]';
}
exports.isDate = isDate;
exports.types.isDate = isDate;

function isError(e) {
  return isObject(e) &&
      (objectToString(e) === '[object Error]' || e instanceof Error);
}
exports.isError = isError;
exports.types.isNativeError = isError;

function isFunction(arg) {
  return typeof arg === 'function';
}
exports.isFunction = isFunction;

function isPrimitive(arg) {
  return arg === null ||
         typeof arg === 'boolean' ||
         typeof arg === 'number' ||
         typeof arg === 'string' ||
         typeof arg === 'symbol' ||  // ES6 symbol
         typeof arg === 'undefined';
}
exports.isPrimitive = isPrimitive;

exports.isBuffer = __webpack_require__(1135);

function objectToString(o) {
  return Object.prototype.toString.call(o);
}


function pad(n) {
  return n < 10 ? '0' + n.toString(10) : n.toString(10);
}


var months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep',
              'Oct', 'Nov', 'Dec'];

// 26 Feb 16:19:34
function timestamp() {
  var d = new Date();
  var time = [pad(d.getHours()),
              pad(d.getMinutes()),
              pad(d.getSeconds())].join(':');
  return [d.getDate(), months[d.getMonth()], time].join(' ');
}


// log is just a thin wrapper to console.log that prepends a timestamp
exports.log = function() {
  console.log('%s - %s', timestamp(), exports.format.apply(exports, arguments));
};


/**
 * Inherit the prototype methods from one constructor into another.
 *
 * The Function.prototype.inherits from lang.js rewritten as a standalone
 * function (not on Function.prototype). NOTE: If this file is to be loaded
 * during bootstrapping this function needs to be rewritten using some native
 * functions as prototype setup using normal JavaScript does not work as
 * expected during bootstrapping (see mirror.js in r114903).
 *
 * @param {function} ctor Constructor function which needs to inherit the
 *     prototype.
 * @param {function} superCtor Constructor function to inherit prototype from.
 */
exports.inherits = __webpack_require__(6698);

exports._extend = function(origin, add) {
  // Don't do anything if add isn't an object
  if (!add || !isObject(add)) return origin;

  var keys = Object.keys(add);
  var i = keys.length;
  while (i--) {
    origin[keys[i]] = add[keys[i]];
  }
  return origin;
};

function hasOwnProperty(obj, prop) {
  return Object.prototype.hasOwnProperty.call(obj, prop);
}

var kCustomPromisifiedSymbol = typeof Symbol !== 'undefined' ? Symbol('util.promisify.custom') : undefined;

exports.promisify = function promisify(original) {
  if (typeof original !== 'function')
    throw new TypeError('The "original" argument must be of type Function');

  if (kCustomPromisifiedSymbol && original[kCustomPromisifiedSymbol]) {
    var fn = original[kCustomPromisifiedSymbol];
    if (typeof fn !== 'function') {
      throw new TypeError('The "util.promisify.custom" argument must be of type Function');
    }
    Object.defineProperty(fn, kCustomPromisifiedSymbol, {
      value: fn, enumerable: false, writable: false, configurable: true
    });
    return fn;
  }

  function fn() {
    var promiseResolve, promiseReject;
    var promise = new Promise(function (resolve, reject) {
      promiseResolve = resolve;
      promiseReject = reject;
    });

    var args = [];
    for (var i = 0; i < arguments.length; i++) {
      args.push(arguments[i]);
    }
    args.push(function (err, value) {
      if (err) {
        promiseReject(err);
      } else {
        promiseResolve(value);
      }
    });

    try {
      original.apply(this, args);
    } catch (err) {
      promiseReject(err);
    }

    return promise;
  }

  Object.setPrototypeOf(fn, Object.getPrototypeOf(original));

  if (kCustomPromisifiedSymbol) Object.defineProperty(fn, kCustomPromisifiedSymbol, {
    value: fn, enumerable: false, writable: false, configurable: true
  });
  return Object.defineProperties(
    fn,
    getOwnPropertyDescriptors(original)
  );
}

exports.promisify.custom = kCustomPromisifiedSymbol

function callbackifyOnRejected(reason, cb) {
  // `!reason` guard inspired by bluebird (Ref: https://goo.gl/t5IS6M).
  // Because `null` is a special error value in callbacks which means "no error
  // occurred", we error-wrap so the callback consumer can distinguish between
  // "the promise rejected with null" or "the promise fulfilled with undefined".
  if (!reason) {
    var newReason = new Error('Promise was rejected with a falsy value');
    newReason.reason = reason;
    reason = newReason;
  }
  return cb(reason);
}

function callbackify(original) {
  if (typeof original !== 'function') {
    throw new TypeError('The "original" argument must be of type Function');
  }

  // We DO NOT return the promise as it gives the user a false sense that
  // the promise is actually somehow related to the callback's execution
  // and that the callback throwing will reject the promise.
  function callbackified() {
    var args = [];
    for (var i = 0; i < arguments.length; i++) {
      args.push(arguments[i]);
    }

    var maybeCb = args.pop();
    if (typeof maybeCb !== 'function') {
      throw new TypeError('The last argument must be of type Function');
    }
    var self = this;
    var cb = function() {
      return maybeCb.apply(self, arguments);
    };
    // In true node style we process the callback on `nextTick` with all the
    // implications (stack, `uncaughtException`, `async_hooks`)
    original.apply(this, args)
      .then(function(ret) { process.nextTick(cb.bind(null, null, ret)) },
            function(rej) { process.nextTick(callbackifyOnRejected.bind(null, rej, cb)) });
  }

  Object.setPrototypeOf(callbackified, Object.getPrototypeOf(original));
  Object.defineProperties(callbackified,
                          getOwnPropertyDescriptors(original));
  return callbackified;
}
exports.callbackify = callbackify;


/***/ }),

/***/ 592:
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

"use strict";


var $defineProperty = __webpack_require__(3036);

var hasPropertyDescriptors = function hasPropertyDescriptors() {
	return !!$defineProperty;
};

hasPropertyDescriptors.hasArrayLengthDefineBug = function hasArrayLengthDefineBug() {
	// node v0.6 has a bug where array lengths can be Set but not Defined
	if (!$defineProperty) {
		return null;
	}
	try {
		return $defineProperty([], 'length', { value: 1 }).length !== 1;
	} catch (e) {
		// In Firefox 4-22, defining length on an array throws an exception.
		return true;
	}
};

module.exports = hasPropertyDescriptors;


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

/***/ 622:
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

"use strict";
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   A: () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var core_js_modules_es_array_push_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(4114);
/* harmony import */ var _utils_core__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(9046);
/* harmony import */ var _utils_defer__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(8285);
/* harmony import */ var _default__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(3362);
/* harmony import */ var _helpers_snap__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(2596);
/* harmony import */ var _utils_constants__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(5720);






const AXIS_H = "horizontal";

/**
 * Continuous view manager
 * @extends {DefaultViewManager}
 */
class ContinuousViewManager extends _default__WEBPACK_IMPORTED_MODULE_3__/* ["default"] */ .A {
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
    this.settings = (0,_utils_core__WEBPACK_IMPORTED_MODULE_1__.extend)({
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
      this.snapper = new _helpers_snap__WEBPACK_IMPORTED_MODULE_4__/* ["default"] */ .A(this, this.settings.snap);
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
    const full = value || new _utils_defer__WEBPACK_IMPORTED_MODULE_2__/* ["default"] */ .A();
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
    view.off(_utils_constants__WEBPACK_IMPORTED_MODULE_5__/* .EVENTS */ .qY.VIEWS.DISPLAYED);
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
    const vph = this.layout.axis === AXIS_H;
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
    if (this.writingMode.indexOf(AXIS_H) === 0) {
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
      this.emit(_utils_constants__WEBPACK_IMPORTED_MODULE_5__/* .EVENTS */ .qY.MANAGERS.SCROLLED, {
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
    if (this.paginated && this.layout.axis === AXIS_H) {
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
    if (this.paginated && this.layout.axis === AXIS_H) {
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
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (ContinuousViewManager);

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

/***/ 684:
/***/ ((module) => {

"use strict";

// Should throw an error on invalid iterator
// https://issues.chromium.org/issues/336839115
module.exports = function (methodName, argument) {
  // eslint-disable-next-line es/no-iterator -- required for testing
  var method = typeof Iterator == 'function' && Iterator.prototype[methodName];
  if (method) try {
    method.call({ next: null }, argument).next();
  } catch (error) {
    return true;
  }
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

/***/ 944:
/***/ ((module) => {

"use strict";

var $TypeError = TypeError;

module.exports = function (options) {
  var alphabet = options && options.alphabet;
  if (alphabet === undefined || alphabet === 'base64' || alphabet === 'base64url') return alphabet || 'base64';
  throw new $TypeError('Incorrect `alphabet` option');
};


/***/ }),

/***/ 984:
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

"use strict";
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   A: () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var core_js_modules_web_url_search_params_delete_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(4603);
/* harmony import */ var core_js_modules_web_url_search_params_has_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(7566);
/* harmony import */ var core_js_modules_web_url_search_params_size_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(8721);
/* harmony import */ var _path__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(1010);





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
          const basePath = new _path__WEBPACK_IMPORTED_MODULE_3__/* ["default"] */ .A(this.base);
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
    this.path = new _path__WEBPACK_IMPORTED_MODULE_3__/* ["default"] */ .A(pathname);
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
    const fullpath = _path__WEBPACK_IMPORTED_MODULE_3__/* ["default"] */ .A.prototype.resolve(dir, path);
    return this.origin + fullpath;
  }

  /**
   * Resolve a path relative to the url
   * @param {string} path
   * @returns {string} path
   */
  relative(path) {
    const dir = this.path.directory;
    return _path__WEBPACK_IMPORTED_MODULE_3__/* ["default"] */ .A.prototype.relative(path, dir);
  }

  /**
   * toString
   * @returns {string}
   */
  toString() {
    return this.href;
  }
}
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (Url);

/***/ }),

/***/ 1002:
/***/ ((module) => {

"use strict";


/** @type {import('./functionApply')} */
module.exports = Function.prototype.apply;


/***/ }),

/***/ 1010:
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

"use strict";
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   A: () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var core_js_modules_es_array_push_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(4114);
/* harmony import */ var core_js_modules_web_url_search_params_delete_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(4603);
/* harmony import */ var core_js_modules_web_url_search_params_has_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(7566);
/* harmony import */ var core_js_modules_web_url_search_params_size_js__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(8721);




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
        path = "/";
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
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (Path);

/***/ }),

/***/ 1064:
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

"use strict";


var $Object = __webpack_require__(9612);

/** @type {import('./Object.getPrototypeOf')} */
module.exports = $Object.getPrototypeOf || null;


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

/***/ 1093:
/***/ ((module) => {

"use strict";


var toStr = Object.prototype.toString;

module.exports = function isArguments(value) {
	var str = toStr.call(value);
	var isArgs = str === '[object Arguments]';
	if (!isArgs) {
		isArgs = str !== '[object Array]' &&
			value !== null &&
			typeof value === 'object' &&
			typeof value.length === 'number' &&
			value.length >= 0 &&
			toStr.call(value.callee) === '[object Function]';
	}
	return isArgs;
};


/***/ }),

/***/ 1108:
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

"use strict";

var classof = __webpack_require__(6955);

module.exports = function (it) {
  var klass = classof(it);
  return klass === 'BigInt64Array' || klass === 'BigUint64Array';
};


/***/ }),

/***/ 1135:
/***/ ((module) => {

module.exports = function isBuffer(arg) {
  return arg && typeof arg === 'object'
    && typeof arg.copy === 'function'
    && typeof arg.fill === 'function'
    && typeof arg.readUInt8 === 'function';
}

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

/***/ 1189:
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

"use strict";


var slice = Array.prototype.slice;
var isArgs = __webpack_require__(1093);

var origKeys = Object.keys;
var keysShim = origKeys ? function keys(o) { return origKeys(o); } : __webpack_require__(8875);

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
					return originalKeys(slice.call(object));
				}
				return originalKeys(object);
			};
		}
	} else {
		Object.keys = keysShim;
	}
	return Object.keys || keysShim;
};

module.exports = keysShim;


/***/ }),

/***/ 1237:
/***/ ((module) => {

"use strict";


/** @type {import('./eval')} */
module.exports = EvalError;


/***/ }),

/***/ 1261:
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

"use strict";
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   A: () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _utils_request__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(3412);
/* harmony import */ var _utils_mime__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(9357);
/* harmony import */ var _input__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(2575);
/* harmony import */ var jszip__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(6838);





/**
 * Handles Unzipping a requesting files from an Epub Archive
 * @extends {Input}
 */
class Archive extends _input__WEBPACK_IMPORTED_MODULE_2__/* ["default"] */ .A {
  constructor() {
    super();
    this.createInstance();
  }

  /**
   * Create JSZip instance
   */
  createInstance() {
    if (jszip__WEBPACK_IMPORTED_MODULE_3__) {
      this.instance = new jszip__WEBPACK_IMPORTED_MODULE_3__();
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
    return (0,_utils_request__WEBPACK_IMPORTED_MODULE_0__/* ["default"] */ .A)(zipUrl, "binary").then(data => {
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
      const type = mimeType || _utils_mime__WEBPACK_IMPORTED_MODULE_1__/* ["default"] */ .A.lookup(entry.name);
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
      const type = mimeType || _utils_mime__WEBPACK_IMPORTED_MODULE_1__/* ["default"] */ .A.lookup(entry.name);
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
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (Archive);

/***/ }),

/***/ 1270:
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

"use strict";
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   A: () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var core_js_modules_es_iterator_constructor_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(8111);
/* harmony import */ var core_js_modules_es_iterator_for_each_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(7588);


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
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (proxyMouse);

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

/***/ 1333:
/***/ ((module) => {

"use strict";


/** @type {import('./shams')} */
/* eslint complexity: [2, 18], max-statements: [2, 33] */
module.exports = function hasSymbols() {
	if (typeof Symbol !== 'function' || typeof Object.getOwnPropertySymbols !== 'function') { return false; }
	if (typeof Symbol.iterator === 'symbol') { return true; }

	/** @type {{ [k in symbol]?: unknown }} */
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
	for (var _ in obj) { return false; } // eslint-disable-line no-restricted-syntax, no-unreachable-loop
	if (typeof Object.keys === 'function' && Object.keys(obj).length !== 0) { return false; }

	if (typeof Object.getOwnPropertyNames === 'function' && Object.getOwnPropertyNames(obj).length !== 0) { return false; }

	var syms = Object.getOwnPropertySymbols(obj);
	if (syms.length !== 1 || syms[0] !== sym) { return false; }

	if (!Object.prototype.propertyIsEnumerable.call(obj, sym)) { return false; }

	if (typeof Object.getOwnPropertyDescriptor === 'function') {
		// eslint-disable-next-line no-extra-parens
		var descriptor = /** @type {PropertyDescriptor} */ (Object.getOwnPropertyDescriptor(obj, sym));
		if (descriptor.value !== symVal || descriptor.enumerable !== true) { return false; }
	}

	return true;
};


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

/***/ 1385:
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

"use strict";

var iteratorClose = __webpack_require__(9539);

module.exports = function (iters, kind, value) {
  for (var i = iters.length - 1; i >= 0; i--) {
    if (iters[i] === undefined) continue;
    try {
      value = iteratorClose(iters[i].iterator, kind, value);
    } catch (error) {
      kind = 'throw';
      value = error;
    }
  }
  if (kind === 'throw') throw value;
  return value;
};


/***/ }),

/***/ 1469:
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

"use strict";

var arraySpeciesConstructor = __webpack_require__(7433);

// `ArraySpeciesCreate` abstract operation
// https://tc39.es/ecma262/#sec-arrayspeciescreate
module.exports = function (originalArray, length) {
  return new (arraySpeciesConstructor(originalArray))(length === 0 ? 0 : length);
};


/***/ }),

/***/ 1514:
/***/ ((module) => {

"use strict";


/** @type {import('./abs')} */
module.exports = Math.abs;


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

/***/ 1521:
/***/ ((module) => {

"use strict";


var indexOf = String.prototype.indexOf;

module.exports = function (searchString /*, position*/) {
	return indexOf.call(this, searchString, arguments[1]) > -1;
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

/***/ 1549:
/***/ ((__unused_webpack_module, __unused_webpack_exports, __webpack_require__) => {

"use strict";

var $ = __webpack_require__(6518);
var globalThis = __webpack_require__(4576);
var $fromBase64 = __webpack_require__(9143);
var anUint8Array = __webpack_require__(4154);

var Uint8Array = globalThis.Uint8Array;

var INCORRECT_BEHAVIOR_OR_DOESNT_EXISTS = !Uint8Array || !Uint8Array.prototype.setFromBase64 || !(function () {
  var target = new Uint8Array([255, 255, 255, 255, 255]);
  try {
    target.setFromBase64('MjYyZg===');
  } catch (error) {
    return target[0] === 50 && target[1] === 54 && target[2] === 50 && target[3] === 255 && target[4] === 255;
  }
})();

// `Uint8Array.prototype.setFromBase64` method
// https://github.com/tc39/proposal-arraybuffer-base64
if (Uint8Array) $({ target: 'Uint8Array', proto: true, forced: INCORRECT_BEHAVIOR_OR_DOESNT_EXISTS }, {
  setFromBase64: function setFromBase64(string /* , options */) {
    anUint8Array(this);

    var result = $fromBase64(string, arguments.length > 1 ? arguments[1] : undefined, this, this.length);

    return { read: result.read, written: result.written };
  }
});


/***/ }),

/***/ 1619:
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

"use strict";
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   A: () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var core_js_modules_es_iterator_constructor_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(8111);
/* harmony import */ var core_js_modules_es_iterator_filter_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(2489);
/* harmony import */ var core_js_modules_es_iterator_for_each_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(7588);
/* harmony import */ var event_emitter__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(3068);
/* harmony import */ var _annotations__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(7961);
/* harmony import */ var _epubcfi__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(7421);
/* harmony import */ var _layout__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(7173);
/* harmony import */ var _themes__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(7257);
/* harmony import */ var _utils_defer__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(8285);
/* harmony import */ var _utils_hook__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(8510);
/* harmony import */ var _viewport__WEBPACK_IMPORTED_MODULE_10__ = __webpack_require__(57);
/* harmony import */ var _utils_queue__WEBPACK_IMPORTED_MODULE_11__ = __webpack_require__(1758);
/* harmony import */ var _utils_core__WEBPACK_IMPORTED_MODULE_12__ = __webpack_require__(9046);
/* harmony import */ var _utils_constants__WEBPACK_IMPORTED_MODULE_13__ = __webpack_require__(5720);
/* harmony import */ var _managers_default_index__WEBPACK_IMPORTED_MODULE_14__ = __webpack_require__(3362);
/* harmony import */ var _managers_continuous_index__WEBPACK_IMPORTED_MODULE_15__ = __webpack_require__(622);















// Default View Managers



/**
 * Displays an Epub as a series of Views for each Section.
 * Requires Manager and View class to handle specifics of rendering
 * the section content.
 * @param {Book} book
 * @param {object} [options]
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
    this.settings = (0,_utils_core__WEBPACK_IMPORTED_MODULE_12__.extend)({
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
      content: new _utils_hook__WEBPACK_IMPORTED_MODULE_9__/* ["default"] */ .A(this),
      display: new _utils_hook__WEBPACK_IMPORTED_MODULE_9__/* ["default"] */ .A(this),
      layout: new _utils_hook__WEBPACK_IMPORTED_MODULE_9__/* ["default"] */ .A(this),
      render: new _utils_hook__WEBPACK_IMPORTED_MODULE_9__/* ["default"] */ .A(this),
      show: new _utils_hook__WEBPACK_IMPORTED_MODULE_9__/* ["default"] */ .A(this),
      unloaded: new _utils_hook__WEBPACK_IMPORTED_MODULE_9__/* ["default"] */ .A(this)
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
    this.annotations = new _annotations__WEBPACK_IMPORTED_MODULE_4__/* ["default"] */ .A(this);
    /**
     * @member {Themes} themes
     * @memberof Rendition
     * @readonly
     */
    this.themes = new _themes__WEBPACK_IMPORTED_MODULE_7__/* ["default"] */ .A(this);
    this.epubcfi = new _epubcfi__WEBPACK_IMPORTED_MODULE_5__/* ["default"] */ .A();
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
    this.starting = new _utils_defer__WEBPACK_IMPORTED_MODULE_8__/* ["default"] */ .A();
    /**
     * returns after the rendition has started
     * @member {Promise<any>} started
     * @memberof Rendition
     */
    this.started = this.starting.promise;
    this.q = new _utils_queue__WEBPACK_IMPORTED_MODULE_11__/* ["default"] */ .A(this);
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
      ret = _managers_default_index__WEBPACK_IMPORTED_MODULE_14__/* ["default"] */ .A;
    } else if (typeof manager === "string" && manager === "continuous") {
      ret = _managers_continuous_index__WEBPACK_IMPORTED_MODULE_15__/* ["default"] */ .A;
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
    this.layout = new _layout__WEBPACK_IMPORTED_MODULE_6__/* ["default"] */ .A(props);
    this.layout.on(_utils_constants__WEBPACK_IMPORTED_MODULE_13__/* .EVENTS */ .qY.LAYOUT.UPDATED, (props, changed) => {
      /**
       * Emit of updated the Layout state
       * @event layout
       * @param {Layout} props
       * @param {object} changed
       * @memberof Rendition
       */
      this.emit(_utils_constants__WEBPACK_IMPORTED_MODULE_13__/* .EVENTS */ .qY.RENDITION.LAYOUT, props, changed);
    });
    /**
     * @member {Viewport} viewport
     * @memberof Rendition
     * @readonly
     */
    this.viewport = new _viewport__WEBPACK_IMPORTED_MODULE_10__/* ["default"] */ .A(this.layout);
    this.viewport.on(_utils_constants__WEBPACK_IMPORTED_MODULE_13__/* .EVENTS */ .qY.VIEWPORT.RESIZED, rect => {
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
      this.emit(_utils_constants__WEBPACK_IMPORTED_MODULE_13__/* .EVENTS */ .qY.RENDITION.RESIZED, rect);
      this.display(this.location.start.cfi);
    });
    this.viewport.on(_utils_constants__WEBPACK_IMPORTED_MODULE_13__/* .EVENTS */ .qY.VIEWPORT.ORIENTATION_CHANGE, target => {
      /**
       * @event orientationchange
       * @param {object} target
       * @memberof Rendition
       */
      this.emit(_utils_constants__WEBPACK_IMPORTED_MODULE_13__/* .EVENTS */ .qY.RENDITION.ORIENTATION_CHANGE, target);
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
    this.manager.on(_utils_constants__WEBPACK_IMPORTED_MODULE_13__/* .EVENTS */ .qY.MANAGERS.ADDED, this.afterDisplayed.bind(this));
    this.manager.on(_utils_constants__WEBPACK_IMPORTED_MODULE_13__/* .EVENTS */ .qY.MANAGERS.REMOVED, this.afterRemoved.bind(this));
    this.manager.on(_utils_constants__WEBPACK_IMPORTED_MODULE_13__/* .EVENTS */ .qY.MANAGERS.RESIZED, this.onResized.bind(this));
    this.manager.on(_utils_constants__WEBPACK_IMPORTED_MODULE_13__/* .EVENTS */ .qY.MANAGERS.RELOCATED, this.relocated.bind(this));
    /**
     * Emit that rendering has started
     * @event started
     * @memberof Rendition
     */
    this.emit(_utils_constants__WEBPACK_IMPORTED_MODULE_13__/* .EVENTS */ .qY.RENDITION.STARTED);
    navigator.epubReadingSystem = {
      name: "epub-js",
      version: _utils_constants__WEBPACK_IMPORTED_MODULE_13__/* .EPUBJS_VERSION */ .JX,
      layoutStyle: this.layout.style,
      hasFeature: name => {
        switch (name) {
          case "dom-manipulation":
            return true;
          case "layout-changes":
            return true;
          case "touch-events":
            return true;
          case "mouse-events":
            return true;
          case "keyboard-events":
            return true;
          case "spine-scripting":
            return false;
          default:
            return false;
        }
      }
    };
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
      this.emit(_utils_constants__WEBPACK_IMPORTED_MODULE_13__/* .EVENTS */ .qY.RENDITION.ATTACHED);
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
    const displaying = new _utils_defer__WEBPACK_IMPORTED_MODULE_8__/* ["default"] */ .A();
    this.displaying = displaying;

    // Check if this is a book percentage
    if (this.book.locations.length && (0,_utils_core__WEBPACK_IMPORTED_MODULE_12__.isFloat)(target)) {
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
      this.emit(_utils_constants__WEBPACK_IMPORTED_MODULE_13__/* .EVENTS */ .qY.RENDITION.DISPLAYED, section);
    }, err => {
      /**
       * Emit that has been an error displaying
       * @event displayError
       * @param {Error} err
       * @memberof Rendition
       */
      this.emit(_utils_constants__WEBPACK_IMPORTED_MODULE_13__/* .EVENTS */ .qY.RENDITION.DISPLAY_ERROR, err);
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
    view.on(_utils_constants__WEBPACK_IMPORTED_MODULE_13__/* .EVENTS */ .qY.VIEWS.MARK_CLICKED, (cfiRange, data) => {
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
          this.emit(_utils_constants__WEBPACK_IMPORTED_MODULE_13__/* .EVENTS */ .qY.RENDITION.RENDERED, view);
        });
      } else {
        this.emit(_utils_constants__WEBPACK_IMPORTED_MODULE_13__/* .EVENTS */ .qY.RENDITION.RENDERED, view);
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
      this.emit(_utils_constants__WEBPACK_IMPORTED_MODULE_13__/* .EVENTS */ .qY.RENDITION.REMOVED, view);
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
    this.emit(_utils_constants__WEBPACK_IMPORTED_MODULE_13__/* .EVENTS */ .qY.RENDITION.RELOCATED, this.location);
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
    _utils_constants__WEBPACK_IMPORTED_MODULE_13__/* .DOM_EVENTS */ .py.forEach(e => {
      contents.on(e, ev => this.triggerViewEvent(ev, contents));
    });
    contents.on(_utils_constants__WEBPACK_IMPORTED_MODULE_13__/* .EVENTS */ .qY.CONTENTS.SELECTED, e => this.triggerSelectedEvent(e, contents));
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
    this.emit(_utils_constants__WEBPACK_IMPORTED_MODULE_13__/* .EVENTS */ .qY.RENDITION.SELECTED, cfirange, contents);
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
    this.emit(_utils_constants__WEBPACK_IMPORTED_MODULE_13__/* .EVENTS */ .qY.RENDITION.MARK_CLICKED, cfiRange, data, contents);
  }

  /**
   * Get a Range from a Visible CFI
   * @param {string} epubcfi EpubCfi string
   * @param {string} ignoreClass
   * @return {Range}
   */
  getRange(epubcfi, ignoreClass) {
    const cfi = new _epubcfi__WEBPACK_IMPORTED_MODULE_5__/* ["default"] */ .A(epubcfi);
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
      contents.on(_utils_constants__WEBPACK_IMPORTED_MODULE_13__/* .EVENTS */ .qY.CONTENTS.LINK_CLICKED, href => {
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
event_emitter__WEBPACK_IMPORTED_MODULE_3__(Rendition.prototype);
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (Rendition);

/***/ }),

/***/ 1625:
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

"use strict";

var uncurryThis = __webpack_require__(9504);

module.exports = uncurryThis({}.isPrototypeOf);


/***/ }),

/***/ 1701:
/***/ ((__unused_webpack_module, __unused_webpack_exports, __webpack_require__) => {

"use strict";

var $ = __webpack_require__(6518);
var call = __webpack_require__(9565);
var aCallable = __webpack_require__(9306);
var anObject = __webpack_require__(8551);
var getIteratorDirect = __webpack_require__(1767);
var createIteratorProxy = __webpack_require__(9462);
var callWithSafeIterationClosing = __webpack_require__(6319);
var iteratorClose = __webpack_require__(9539);
var iteratorHelperThrowsOnInvalidIterator = __webpack_require__(684);
var iteratorHelperWithoutClosingOnEarlyError = __webpack_require__(4549);
var IS_PURE = __webpack_require__(6395);

var MAP_WITHOUT_THROWING_ON_INVALID_ITERATOR = !IS_PURE && !iteratorHelperThrowsOnInvalidIterator('map', function () { /* empty */ });
var mapWithoutClosingOnEarlyError = !IS_PURE && !MAP_WITHOUT_THROWING_ON_INVALID_ITERATOR
  && iteratorHelperWithoutClosingOnEarlyError('map', TypeError);

var FORCED = IS_PURE || MAP_WITHOUT_THROWING_ON_INVALID_ITERATOR || mapWithoutClosingOnEarlyError;

var IteratorProxy = createIteratorProxy(function () {
  var iterator = this.iterator;
  var result = anObject(call(this.next, iterator));
  var done = this.done = !!result.done;
  if (!done) return callWithSafeIterationClosing(iterator, this.mapper, [result.value, this.counter++], true);
});

// `Iterator.prototype.map` method
// https://tc39.es/ecma262/#sec-iterator.prototype.map
$({ target: 'Iterator', proto: true, real: true, forced: FORCED }, {
  map: function map(mapper) {
    anObject(this);
    try {
      aCallable(mapper);
    } catch (error) {
      iteratorClose(this, 'throw', error);
    }

    if (mapWithoutClosingOnEarlyError) return call(mapWithoutClosingOnEarlyError, this, mapper);

    return new IteratorProxy(getIteratorDirect(this), {
      mapper: mapper
    });
  }
});


/***/ }),

/***/ 1758:
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

"use strict";
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   A: () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var core_js_modules_es_array_push_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(4114);
/* harmony import */ var _defer__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(8285);



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
      const deferred = new _defer__WEBPACK_IMPORTED_MODULE_1__/* ["default"] */ .A();
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
      inwait = new _defer__WEBPACK_IMPORTED_MODULE_1__/* ["default"] */ .A();
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
      this.deferred = new _defer__WEBPACK_IMPORTED_MODULE_1__/* ["default"] */ .A();
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
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (Queue);

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

/***/ 1873:
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

var root = __webpack_require__(9325);

/** Built-in value references. */
var Symbol = root.Symbol;

module.exports = Symbol;


/***/ }),

/***/ 1946:
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

"use strict";

var uncurryThis = __webpack_require__(9504);
var aCallable = __webpack_require__(9306);
var isNullOrUndefined = __webpack_require__(4117);
var lengthOfArrayLike = __webpack_require__(6198);
var toObject = __webpack_require__(8981);
var MapHelpers = __webpack_require__(2248);
var iterate = __webpack_require__(6223);

var Map = MapHelpers.Map;
var mapHas = MapHelpers.has;
var mapSet = MapHelpers.set;
var push = uncurryThis([].push);

// `Array.prototype.uniqueBy` method
// https://github.com/tc39/proposal-array-unique
module.exports = function uniqueBy(resolver) {
  var that = toObject(this);
  var length = lengthOfArrayLike(that);
  var result = [];
  var map = new Map();
  var resolverFunction = !isNullOrUndefined(resolver) ? aCallable(resolver) : function (value) {
    return value;
  };
  var index, item, key;
  for (index = 0; index < length; index++) {
    item = that[index];
    key = resolverFunction(item);
    if (!mapHas(map, key)) mapSet(map, key, item);
  }
  iterate(map, function (value) {
    push(result, value);
  });
  return result;
};


/***/ }),

/***/ 2093:
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

"use strict";


module.exports = __webpack_require__(3380)() ? Object.keys : __webpack_require__(4232);


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

/***/ 2134:
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

"use strict";
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   A: () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var core_js_modules_es_array_push_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(4114);

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
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (Mark);

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

/***/ 2205:
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

"use strict";


var bind = __webpack_require__(6743);
var $apply = __webpack_require__(1002);
var actualApply = __webpack_require__(3144);

/** @type {import('./applyBind')} */
module.exports = function applyBind() {
	return actualApply(bind, $apply, arguments);
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

/***/ 2299:
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

"use strict";
// Currently in sync with Node.js lib/internal/util/comparisons.js
// https://github.com/nodejs/node/commit/112cc7c27551254aa2b17098fb774867f05ed0d9



function _slicedToArray(arr, i) { return _arrayWithHoles(arr) || _iterableToArrayLimit(arr, i) || _unsupportedIterableToArray(arr, i) || _nonIterableRest(); }
function _nonIterableRest() { throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }
function _unsupportedIterableToArray(o, minLen) { if (!o) return; if (typeof o === "string") return _arrayLikeToArray(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === "Object" && o.constructor) n = o.constructor.name; if (n === "Map" || n === "Set") return Array.from(o); if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen); }
function _arrayLikeToArray(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) arr2[i] = arr[i]; return arr2; }
function _iterableToArrayLimit(r, l) { var t = null == r ? null : "undefined" != typeof Symbol && r[Symbol.iterator] || r["@@iterator"]; if (null != t) { var e, n, i, u, a = [], f = !0, o = !1; try { if (i = (t = t.call(r)).next, 0 === l) { if (Object(t) !== t) return; f = !1; } else for (; !(f = (e = i.call(t)).done) && (a.push(e.value), a.length !== l); f = !0); } catch (r) { o = !0, n = r; } finally { try { if (!f && null != t.return && (u = t.return(), Object(u) !== u)) return; } finally { if (o) throw n; } } return a; } }
function _arrayWithHoles(arr) { if (Array.isArray(arr)) return arr; }
function _typeof(o) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (o) { return typeof o; } : function (o) { return o && "function" == typeof Symbol && o.constructor === Symbol && o !== Symbol.prototype ? "symbol" : typeof o; }, _typeof(o); }
var regexFlagsSupported = /a/g.flags !== undefined;
var arrayFromSet = function arrayFromSet(set) {
  var array = [];
  set.forEach(function (value) {
    return array.push(value);
  });
  return array;
};
var arrayFromMap = function arrayFromMap(map) {
  var array = [];
  map.forEach(function (value, key) {
    return array.push([key, value]);
  });
  return array;
};
var objectIs = Object.is ? Object.is : __webpack_require__(7653);
var objectGetOwnPropertySymbols = Object.getOwnPropertySymbols ? Object.getOwnPropertySymbols : function () {
  return [];
};
var numberIsNaN = Number.isNaN ? Number.isNaN : __webpack_require__(4133);
function uncurryThis(f) {
  return f.call.bind(f);
}
var hasOwnProperty = uncurryThis(Object.prototype.hasOwnProperty);
var propertyIsEnumerable = uncurryThis(Object.prototype.propertyIsEnumerable);
var objectToString = uncurryThis(Object.prototype.toString);
var _require$types = (__webpack_require__(537).types),
  isAnyArrayBuffer = _require$types.isAnyArrayBuffer,
  isArrayBufferView = _require$types.isArrayBufferView,
  isDate = _require$types.isDate,
  isMap = _require$types.isMap,
  isRegExp = _require$types.isRegExp,
  isSet = _require$types.isSet,
  isNativeError = _require$types.isNativeError,
  isBoxedPrimitive = _require$types.isBoxedPrimitive,
  isNumberObject = _require$types.isNumberObject,
  isStringObject = _require$types.isStringObject,
  isBooleanObject = _require$types.isBooleanObject,
  isBigIntObject = _require$types.isBigIntObject,
  isSymbolObject = _require$types.isSymbolObject,
  isFloat32Array = _require$types.isFloat32Array,
  isFloat64Array = _require$types.isFloat64Array;
function isNonIndex(key) {
  if (key.length === 0 || key.length > 10) return true;
  for (var i = 0; i < key.length; i++) {
    var code = key.charCodeAt(i);
    if (code < 48 || code > 57) return true;
  }
  // The maximum size for an array is 2 ** 32 -1.
  return key.length === 10 && key >= Math.pow(2, 32);
}
function getOwnNonIndexProperties(value) {
  return Object.keys(value).filter(isNonIndex).concat(objectGetOwnPropertySymbols(value).filter(Object.prototype.propertyIsEnumerable.bind(value)));
}

// Taken from https://github.com/feross/buffer/blob/680e9e5e488f22aac27599a57dc844a6315928dd/index.js
// original notice:
/*!
 * The buffer module from node.js, for the browser.
 *
 * @author   Feross Aboukhadijeh <feross@feross.org> <http://feross.org>
 * @license  MIT
 */
function compare(a, b) {
  if (a === b) {
    return 0;
  }
  var x = a.length;
  var y = b.length;
  for (var i = 0, len = Math.min(x, y); i < len; ++i) {
    if (a[i] !== b[i]) {
      x = a[i];
      y = b[i];
      break;
    }
  }
  if (x < y) {
    return -1;
  }
  if (y < x) {
    return 1;
  }
  return 0;
}
var ONLY_ENUMERABLE = undefined;
var kStrict = true;
var kLoose = false;
var kNoIterator = 0;
var kIsArray = 1;
var kIsSet = 2;
var kIsMap = 3;

// Check if they have the same source and flags
function areSimilarRegExps(a, b) {
  return regexFlagsSupported ? a.source === b.source && a.flags === b.flags : RegExp.prototype.toString.call(a) === RegExp.prototype.toString.call(b);
}
function areSimilarFloatArrays(a, b) {
  if (a.byteLength !== b.byteLength) {
    return false;
  }
  for (var offset = 0; offset < a.byteLength; offset++) {
    if (a[offset] !== b[offset]) {
      return false;
    }
  }
  return true;
}
function areSimilarTypedArrays(a, b) {
  if (a.byteLength !== b.byteLength) {
    return false;
  }
  return compare(new Uint8Array(a.buffer, a.byteOffset, a.byteLength), new Uint8Array(b.buffer, b.byteOffset, b.byteLength)) === 0;
}
function areEqualArrayBuffers(buf1, buf2) {
  return buf1.byteLength === buf2.byteLength && compare(new Uint8Array(buf1), new Uint8Array(buf2)) === 0;
}
function isEqualBoxedPrimitive(val1, val2) {
  if (isNumberObject(val1)) {
    return isNumberObject(val2) && objectIs(Number.prototype.valueOf.call(val1), Number.prototype.valueOf.call(val2));
  }
  if (isStringObject(val1)) {
    return isStringObject(val2) && String.prototype.valueOf.call(val1) === String.prototype.valueOf.call(val2);
  }
  if (isBooleanObject(val1)) {
    return isBooleanObject(val2) && Boolean.prototype.valueOf.call(val1) === Boolean.prototype.valueOf.call(val2);
  }
  if (isBigIntObject(val1)) {
    return isBigIntObject(val2) && BigInt.prototype.valueOf.call(val1) === BigInt.prototype.valueOf.call(val2);
  }
  return isSymbolObject(val2) && Symbol.prototype.valueOf.call(val1) === Symbol.prototype.valueOf.call(val2);
}

// Notes: Type tags are historical [[Class]] properties that can be set by
// FunctionTemplate::SetClassName() in C++ or Symbol.toStringTag in JS
// and retrieved using Object.prototype.toString.call(obj) in JS
// See https://tc39.github.io/ecma262/#sec-object.prototype.tostring
// for a list of tags pre-defined in the spec.
// There are some unspecified tags in the wild too (e.g. typed array tags).
// Since tags can be altered, they only serve fast failures
//
// Typed arrays and buffers are checked by comparing the content in their
// underlying ArrayBuffer. This optimization requires that it's
// reasonable to interpret their underlying memory in the same way,
// which is checked by comparing their type tags.
// (e.g. a Uint8Array and a Uint16Array with the same memory content
// could still be different because they will be interpreted differently).
//
// For strict comparison, objects should have
// a) The same built-in type tags
// b) The same prototypes.

function innerDeepEqual(val1, val2, strict, memos) {
  // All identical values are equivalent, as determined by ===.
  if (val1 === val2) {
    if (val1 !== 0) return true;
    return strict ? objectIs(val1, val2) : true;
  }

  // Check more closely if val1 and val2 are equal.
  if (strict) {
    if (_typeof(val1) !== 'object') {
      return typeof val1 === 'number' && numberIsNaN(val1) && numberIsNaN(val2);
    }
    if (_typeof(val2) !== 'object' || val1 === null || val2 === null) {
      return false;
    }
    if (Object.getPrototypeOf(val1) !== Object.getPrototypeOf(val2)) {
      return false;
    }
  } else {
    if (val1 === null || _typeof(val1) !== 'object') {
      if (val2 === null || _typeof(val2) !== 'object') {
        // eslint-disable-next-line eqeqeq
        return val1 == val2;
      }
      return false;
    }
    if (val2 === null || _typeof(val2) !== 'object') {
      return false;
    }
  }
  var val1Tag = objectToString(val1);
  var val2Tag = objectToString(val2);
  if (val1Tag !== val2Tag) {
    return false;
  }
  if (Array.isArray(val1)) {
    // Check for sparse arrays and general fast path
    if (val1.length !== val2.length) {
      return false;
    }
    var keys1 = getOwnNonIndexProperties(val1, ONLY_ENUMERABLE);
    var keys2 = getOwnNonIndexProperties(val2, ONLY_ENUMERABLE);
    if (keys1.length !== keys2.length) {
      return false;
    }
    return keyCheck(val1, val2, strict, memos, kIsArray, keys1);
  }
  // [browserify] This triggers on certain types in IE (Map/Set) so we don't
  // wan't to early return out of the rest of the checks. However we can check
  // if the second value is one of these values and the first isn't.
  if (val1Tag === '[object Object]') {
    // return keyCheck(val1, val2, strict, memos, kNoIterator);
    if (!isMap(val1) && isMap(val2) || !isSet(val1) && isSet(val2)) {
      return false;
    }
  }
  if (isDate(val1)) {
    if (!isDate(val2) || Date.prototype.getTime.call(val1) !== Date.prototype.getTime.call(val2)) {
      return false;
    }
  } else if (isRegExp(val1)) {
    if (!isRegExp(val2) || !areSimilarRegExps(val1, val2)) {
      return false;
    }
  } else if (isNativeError(val1) || val1 instanceof Error) {
    // Do not compare the stack as it might differ even though the error itself
    // is otherwise identical.
    if (val1.message !== val2.message || val1.name !== val2.name) {
      return false;
    }
  } else if (isArrayBufferView(val1)) {
    if (!strict && (isFloat32Array(val1) || isFloat64Array(val1))) {
      if (!areSimilarFloatArrays(val1, val2)) {
        return false;
      }
    } else if (!areSimilarTypedArrays(val1, val2)) {
      return false;
    }
    // Buffer.compare returns true, so val1.length === val2.length. If they both
    // only contain numeric keys, we don't need to exam further than checking
    // the symbols.
    var _keys = getOwnNonIndexProperties(val1, ONLY_ENUMERABLE);
    var _keys2 = getOwnNonIndexProperties(val2, ONLY_ENUMERABLE);
    if (_keys.length !== _keys2.length) {
      return false;
    }
    return keyCheck(val1, val2, strict, memos, kNoIterator, _keys);
  } else if (isSet(val1)) {
    if (!isSet(val2) || val1.size !== val2.size) {
      return false;
    }
    return keyCheck(val1, val2, strict, memos, kIsSet);
  } else if (isMap(val1)) {
    if (!isMap(val2) || val1.size !== val2.size) {
      return false;
    }
    return keyCheck(val1, val2, strict, memos, kIsMap);
  } else if (isAnyArrayBuffer(val1)) {
    if (!areEqualArrayBuffers(val1, val2)) {
      return false;
    }
  } else if (isBoxedPrimitive(val1) && !isEqualBoxedPrimitive(val1, val2)) {
    return false;
  }
  return keyCheck(val1, val2, strict, memos, kNoIterator);
}
function getEnumerables(val, keys) {
  return keys.filter(function (k) {
    return propertyIsEnumerable(val, k);
  });
}
function keyCheck(val1, val2, strict, memos, iterationType, aKeys) {
  // For all remaining Object pairs, including Array, objects and Maps,
  // equivalence is determined by having:
  // a) The same number of owned enumerable properties
  // b) The same set of keys/indexes (although not necessarily the same order)
  // c) Equivalent values for every corresponding key/index
  // d) For Sets and Maps, equal contents
  // Note: this accounts for both named and indexed properties on Arrays.
  if (arguments.length === 5) {
    aKeys = Object.keys(val1);
    var bKeys = Object.keys(val2);

    // The pair must have the same number of owned properties.
    if (aKeys.length !== bKeys.length) {
      return false;
    }
  }

  // Cheap key test
  var i = 0;
  for (; i < aKeys.length; i++) {
    if (!hasOwnProperty(val2, aKeys[i])) {
      return false;
    }
  }
  if (strict && arguments.length === 5) {
    var symbolKeysA = objectGetOwnPropertySymbols(val1);
    if (symbolKeysA.length !== 0) {
      var count = 0;
      for (i = 0; i < symbolKeysA.length; i++) {
        var key = symbolKeysA[i];
        if (propertyIsEnumerable(val1, key)) {
          if (!propertyIsEnumerable(val2, key)) {
            return false;
          }
          aKeys.push(key);
          count++;
        } else if (propertyIsEnumerable(val2, key)) {
          return false;
        }
      }
      var symbolKeysB = objectGetOwnPropertySymbols(val2);
      if (symbolKeysA.length !== symbolKeysB.length && getEnumerables(val2, symbolKeysB).length !== count) {
        return false;
      }
    } else {
      var _symbolKeysB = objectGetOwnPropertySymbols(val2);
      if (_symbolKeysB.length !== 0 && getEnumerables(val2, _symbolKeysB).length !== 0) {
        return false;
      }
    }
  }
  if (aKeys.length === 0 && (iterationType === kNoIterator || iterationType === kIsArray && val1.length === 0 || val1.size === 0)) {
    return true;
  }

  // Use memos to handle cycles.
  if (memos === undefined) {
    memos = {
      val1: new Map(),
      val2: new Map(),
      position: 0
    };
  } else {
    // We prevent up to two map.has(x) calls by directly retrieving the value
    // and checking for undefined. The map can only contain numbers, so it is
    // safe to check for undefined only.
    var val2MemoA = memos.val1.get(val1);
    if (val2MemoA !== undefined) {
      var val2MemoB = memos.val2.get(val2);
      if (val2MemoB !== undefined) {
        return val2MemoA === val2MemoB;
      }
    }
    memos.position++;
  }
  memos.val1.set(val1, memos.position);
  memos.val2.set(val2, memos.position);
  var areEq = objEquiv(val1, val2, strict, aKeys, memos, iterationType);
  memos.val1.delete(val1);
  memos.val2.delete(val2);
  return areEq;
}
function setHasEqualElement(set, val1, strict, memo) {
  // Go looking.
  var setValues = arrayFromSet(set);
  for (var i = 0; i < setValues.length; i++) {
    var val2 = setValues[i];
    if (innerDeepEqual(val1, val2, strict, memo)) {
      // Remove the matching element to make sure we do not check that again.
      set.delete(val2);
      return true;
    }
  }
  return false;
}

// See https://developer.mozilla.org/en-US/docs/Web/JavaScript/Equality_comparisons_and_sameness#Loose_equality_using
// Sadly it is not possible to detect corresponding values properly in case the
// type is a string, number, bigint or boolean. The reason is that those values
// can match lots of different string values (e.g., 1n == '+00001').
function findLooseMatchingPrimitives(prim) {
  switch (_typeof(prim)) {
    case 'undefined':
      return null;
    case 'object':
      // Only pass in null as object!
      return undefined;
    case 'symbol':
      return false;
    case 'string':
      prim = +prim;
    // Loose equal entries exist only if the string is possible to convert to
    // a regular number and not NaN.
    // Fall through
    case 'number':
      if (numberIsNaN(prim)) {
        return false;
      }
  }
  return true;
}
function setMightHaveLoosePrim(a, b, prim) {
  var altValue = findLooseMatchingPrimitives(prim);
  if (altValue != null) return altValue;
  return b.has(altValue) && !a.has(altValue);
}
function mapMightHaveLoosePrim(a, b, prim, item, memo) {
  var altValue = findLooseMatchingPrimitives(prim);
  if (altValue != null) {
    return altValue;
  }
  var curB = b.get(altValue);
  if (curB === undefined && !b.has(altValue) || !innerDeepEqual(item, curB, false, memo)) {
    return false;
  }
  return !a.has(altValue) && innerDeepEqual(item, curB, false, memo);
}
function setEquiv(a, b, strict, memo) {
  // This is a lazily initiated Set of entries which have to be compared
  // pairwise.
  var set = null;
  var aValues = arrayFromSet(a);
  for (var i = 0; i < aValues.length; i++) {
    var val = aValues[i];
    // Note: Checking for the objects first improves the performance for object
    // heavy sets but it is a minor slow down for primitives. As they are fast
    // to check this improves the worst case scenario instead.
    if (_typeof(val) === 'object' && val !== null) {
      if (set === null) {
        set = new Set();
      }
      // If the specified value doesn't exist in the second set its an not null
      // object (or non strict only: a not matching primitive) we'll need to go
      // hunting for something thats deep-(strict-)equal to it. To make this
      // O(n log n) complexity we have to copy these values in a new set first.
      set.add(val);
    } else if (!b.has(val)) {
      if (strict) return false;

      // Fast path to detect missing string, symbol, undefined and null values.
      if (!setMightHaveLoosePrim(a, b, val)) {
        return false;
      }
      if (set === null) {
        set = new Set();
      }
      set.add(val);
    }
  }
  if (set !== null) {
    var bValues = arrayFromSet(b);
    for (var _i = 0; _i < bValues.length; _i++) {
      var _val = bValues[_i];
      // We have to check if a primitive value is already
      // matching and only if it's not, go hunting for it.
      if (_typeof(_val) === 'object' && _val !== null) {
        if (!setHasEqualElement(set, _val, strict, memo)) return false;
      } else if (!strict && !a.has(_val) && !setHasEqualElement(set, _val, strict, memo)) {
        return false;
      }
    }
    return set.size === 0;
  }
  return true;
}
function mapHasEqualEntry(set, map, key1, item1, strict, memo) {
  // To be able to handle cases like:
  //   Map([[{}, 'a'], [{}, 'b']]) vs Map([[{}, 'b'], [{}, 'a']])
  // ... we need to consider *all* matching keys, not just the first we find.
  var setValues = arrayFromSet(set);
  for (var i = 0; i < setValues.length; i++) {
    var key2 = setValues[i];
    if (innerDeepEqual(key1, key2, strict, memo) && innerDeepEqual(item1, map.get(key2), strict, memo)) {
      set.delete(key2);
      return true;
    }
  }
  return false;
}
function mapEquiv(a, b, strict, memo) {
  var set = null;
  var aEntries = arrayFromMap(a);
  for (var i = 0; i < aEntries.length; i++) {
    var _aEntries$i = _slicedToArray(aEntries[i], 2),
      key = _aEntries$i[0],
      item1 = _aEntries$i[1];
    if (_typeof(key) === 'object' && key !== null) {
      if (set === null) {
        set = new Set();
      }
      set.add(key);
    } else {
      // By directly retrieving the value we prevent another b.has(key) check in
      // almost all possible cases.
      var item2 = b.get(key);
      if (item2 === undefined && !b.has(key) || !innerDeepEqual(item1, item2, strict, memo)) {
        if (strict) return false;
        // Fast path to detect missing string, symbol, undefined and null
        // keys.
        if (!mapMightHaveLoosePrim(a, b, key, item1, memo)) return false;
        if (set === null) {
          set = new Set();
        }
        set.add(key);
      }
    }
  }
  if (set !== null) {
    var bEntries = arrayFromMap(b);
    for (var _i2 = 0; _i2 < bEntries.length; _i2++) {
      var _bEntries$_i = _slicedToArray(bEntries[_i2], 2),
        _key = _bEntries$_i[0],
        item = _bEntries$_i[1];
      if (_typeof(_key) === 'object' && _key !== null) {
        if (!mapHasEqualEntry(set, a, _key, item, strict, memo)) return false;
      } else if (!strict && (!a.has(_key) || !innerDeepEqual(a.get(_key), item, false, memo)) && !mapHasEqualEntry(set, a, _key, item, false, memo)) {
        return false;
      }
    }
    return set.size === 0;
  }
  return true;
}
function objEquiv(a, b, strict, keys, memos, iterationType) {
  // Sets and maps don't have their entries accessible via normal object
  // properties.
  var i = 0;
  if (iterationType === kIsSet) {
    if (!setEquiv(a, b, strict, memos)) {
      return false;
    }
  } else if (iterationType === kIsMap) {
    if (!mapEquiv(a, b, strict, memos)) {
      return false;
    }
  } else if (iterationType === kIsArray) {
    for (; i < a.length; i++) {
      if (hasOwnProperty(a, i)) {
        if (!hasOwnProperty(b, i) || !innerDeepEqual(a[i], b[i], strict, memos)) {
          return false;
        }
      } else if (hasOwnProperty(b, i)) {
        return false;
      } else {
        // Array is sparse.
        var keysA = Object.keys(a);
        for (; i < keysA.length; i++) {
          var key = keysA[i];
          if (!hasOwnProperty(b, key) || !innerDeepEqual(a[key], b[key], strict, memos)) {
            return false;
          }
        }
        if (keysA.length !== Object.keys(b).length) {
          return false;
        }
        return true;
      }
    }
  }

  // The pair must have equivalent values for every corresponding key.
  // Possibly expensive deep test:
  for (i = 0; i < keys.length; i++) {
    var _key2 = keys[i];
    if (!innerDeepEqual(a[_key2], b[_key2], strict, memos)) {
      return false;
    }
  }
  return true;
}
function isDeepEqual(val1, val2) {
  return innerDeepEqual(val1, val2, kLoose);
}
function isDeepStrictEqual(val1, val2) {
  return innerDeepEqual(val1, val2, kStrict);
}
module.exports = {
  isDeepEqual: isDeepEqual,
  isDeepStrictEqual: isDeepStrictEqual
};

/***/ }),

/***/ 2303:
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

"use strict";

var globalThis = __webpack_require__(4576);
var uncurryThis = __webpack_require__(9504);

var Uint8Array = globalThis.Uint8Array;
var SyntaxError = globalThis.SyntaxError;
var parseInt = globalThis.parseInt;
var min = Math.min;
var NOT_HEX = /[^\da-f]/i;
var exec = uncurryThis(NOT_HEX.exec);
var stringSlice = uncurryThis(''.slice);

module.exports = function (string, into) {
  var stringLength = string.length;
  if (stringLength % 2 !== 0) throw new SyntaxError('String should be an even number of characters');
  var maxLength = into ? min(into.length, stringLength / 2) : stringLength / 2;
  var bytes = into || new Uint8Array(maxLength);
  var read = 0;
  var written = 0;
  while (written < maxLength) {
    var hexits = stringSlice(string, read, read += 2);
    if (exec(NOT_HEX, hexits)) throw new SyntaxError('String should only contain hex characters');
    bytes[written++] = parseInt(hexits, 16);
  }
  return { bytes: bytes, read: read };
};


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

/***/ 2464:
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

"use strict";


var define = __webpack_require__(8452);
var getPolyfill = __webpack_require__(6642);

/* http://www.ecma-international.org/ecma-262/6.0/#sec-number.isnan */

module.exports = function shimNumberIsNaN() {
	var polyfill = getPolyfill();
	define(Number, { isNaN: polyfill }, {
		isNaN: function testIsNaN() {
			return Number.isNaN !== polyfill;
		}
	});
	return polyfill;
};


/***/ }),

/***/ 2488:
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

"use strict";
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   A: () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var core_js_modules_es_array_push_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(4114);

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
      if (view) this.remove(view, i);
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
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (Views);

/***/ }),

/***/ 2489:
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
var iteratorClose = __webpack_require__(9539);
var iteratorHelperThrowsOnInvalidIterator = __webpack_require__(684);
var iteratorHelperWithoutClosingOnEarlyError = __webpack_require__(4549);

var FILTER_WITHOUT_THROWING_ON_INVALID_ITERATOR = !IS_PURE && !iteratorHelperThrowsOnInvalidIterator('filter', function () { /* empty */ });
var filterWithoutClosingOnEarlyError = !IS_PURE && !FILTER_WITHOUT_THROWING_ON_INVALID_ITERATOR
  && iteratorHelperWithoutClosingOnEarlyError('filter', TypeError);

var FORCED = IS_PURE || FILTER_WITHOUT_THROWING_ON_INVALID_ITERATOR || filterWithoutClosingOnEarlyError;

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
// https://tc39.es/ecma262/#sec-iterator.prototype.filter
$({ target: 'Iterator', proto: true, real: true, forced: FORCED }, {
  filter: function filter(predicate) {
    anObject(this);
    try {
      aCallable(predicate);
    } catch (error) {
      iteratorClose(this, 'throw', error);
    }

    if (filterWithoutClosingOnEarlyError) return call(filterWithoutClosingOnEarlyError, this, predicate);

    return new IteratorProxy(getIteratorDirect(this), {
      predicate: predicate
    });
  }
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

/***/ 2575:
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

"use strict";
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   A: () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var core_js_modules_esnext_json_parse_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(8335);
/* harmony import */ var _utils_core__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(9046);
/* harmony import */ var _utils_defer__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(8285);
/* harmony import */ var _utils_path__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(1010);





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
    type = type || new _utils_path__WEBPACK_IMPORTED_MODULE_3__/* ["default"] */ .A(url).extension;
    let response;
    if (type === "blob" || type === "binary") {
      response = this.getBlob(url);
    } else if (type === "base64") {
      response = this.getBase64(url);
    } else {
      response = this.getText(url);
    }
    return response.then(r => {
      const deferred = new _utils_defer__WEBPACK_IMPORTED_MODULE_2__/* ["default"] */ .A();
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
    if ((0,_utils_core__WEBPACK_IMPORTED_MODULE_1__.isXml)(type)) {
      r = (0,_utils_core__WEBPACK_IMPORTED_MODULE_1__.parse)(response, "text/xml");
    } else if (type === "xhtml") {
      r = (0,_utils_core__WEBPACK_IMPORTED_MODULE_1__.parse)(response, "application/xhtml+xml");
    } else if (type == "html" || type == "htm") {
      r = (0,_utils_core__WEBPACK_IMPORTED_MODULE_1__.parse)(response, "text/html");
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
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (Input);

/***/ }),

/***/ 2588:
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

"use strict";
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   Kj: () => (/* binding */ replaceMeta),
/* harmony export */   OB: () => (/* binding */ replaceBase),
/* harmony export */   V2: () => (/* binding */ substitute),
/* harmony export */   iQ: () => (/* binding */ replaceLinks),
/* harmony export */   rG: () => (/* binding */ replaceCanonical)
/* harmony export */ });
/* harmony import */ var core_js_modules_es_iterator_constructor_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(8111);
/* harmony import */ var core_js_modules_es_iterator_for_each_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(7588);
/* harmony import */ var core_js_modules_web_url_search_params_delete_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(4603);
/* harmony import */ var core_js_modules_web_url_search_params_has_js__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(7566);
/* harmony import */ var core_js_modules_web_url_search_params_size_js__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(8721);
/* harmony import */ var _core__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(9046);





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
  let head = (0,_core__WEBPACK_IMPORTED_MODULE_5__.qs)(doc, "head");
  let base = (0,_core__WEBPACK_IMPORTED_MODULE_5__.qs)(head, "base");
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
  let head = (0,_core__WEBPACK_IMPORTED_MODULE_5__.qs)(doc, "head");
  let link = (0,_core__WEBPACK_IMPORTED_MODULE_5__.qs)(head, "link[rel='canonical']");
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
  let head = (0,_core__WEBPACK_IMPORTED_MODULE_5__.qs)(doc, "head");
  let meta = (0,_core__WEBPACK_IMPORTED_MODULE_5__.qs)(head, "link[property='dc.identifier']");
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

/***/ }),

/***/ 2596:
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

"use strict";
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   A: () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var event_emitter__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(3068);
/* harmony import */ var _utils_defer__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(8285);
/* harmony import */ var _utils_core__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(9046);
/* harmony import */ var _utils_constants__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(5720);





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
    this.settings = (0,_utils_core__WEBPACK_IMPORTED_MODULE_2__.extend)({
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
    this.manager.on(_utils_constants__WEBPACK_IMPORTED_MODULE_3__/* .EVENTS */ .qY.MANAGERS.ADDED, this.afterDisplayed.bind(this));
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
    this.manager.off(_utils_constants__WEBPACK_IMPORTED_MODULE_3__/* .EVENTS */ .qY.MANAGERS.ADDED, this.afterDisplayed.bind(this));
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
    const deferred = new _utils_defer__WEBPACK_IMPORTED_MODULE_1__/* ["default"] */ .A();
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
event_emitter__WEBPACK_IMPORTED_MODULE_0__(Snap.prototype);
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (Snap);

/***/ }),

/***/ 2603:
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

"use strict";

var toString = __webpack_require__(655);

module.exports = function (argument, $default) {
  return argument === undefined ? arguments.length < 2 ? '' : $default : toString(argument);
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
    if (iterator) iteratorClose(iterator, 'normal');
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

/***/ 2665:
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

"use strict";
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   A: () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var core_js_modules_es_array_push_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(4114);
/* harmony import */ var core_js_modules_es_iterator_constructor_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(8111);
/* harmony import */ var core_js_modules_es_iterator_for_each_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(7588);
/* harmony import */ var _navigation_landmarks__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(9507);
/* harmony import */ var _navigation_pagelist__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(5263);
/* harmony import */ var _navigation_toc__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(8940);
/* harmony import */ var _utils_core__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(9046);








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
    this.landmarks = new _navigation_landmarks__WEBPACK_IMPORTED_MODULE_3__/* ["default"] */ .A();
    /**
     * List of numbered pages
     * @member {PageList} pageList
     * @memberof Navigation
     * @readonly
     */
    this.pageList = new _navigation_pagelist__WEBPACK_IMPORTED_MODULE_4__/* ["default"] */ .A();
    /**
     * Table of Contents
     * @member {Toc} toc
     * @memberof Navigation
     * @readonly
     */
    this.toc = new _navigation_toc__WEBPACK_IMPORTED_MODULE_5__/* ["default"] */ .A();
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
      const items = (0,_utils_core__WEBPACK_IMPORTED_MODULE_6__.qsa)(doc, "nav");
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
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (Navigation);

/***/ }),

/***/ 2682:
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

"use strict";


var isCallable = __webpack_require__(9600);

var toStr = Object.prototype.toString;
var hasOwnProperty = Object.prototype.hasOwnProperty;

/** @type {<This, A extends readonly unknown[]>(arr: A, iterator: (this: This | void, value: A[number], index: number, arr: A) => void, receiver: This | undefined) => void} */
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

/** @type {<This, S extends string>(string: S, iterator: (this: This | void, value: S[number], index: number, string: S) => void, receiver: This | undefined) => void} */
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

/** @type {<This, O>(obj: O, iterator: (this: This | void, value: O[keyof O], index: keyof O, obj: O) => void, receiver: This | undefined) => void} */
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

/** @type {(x: unknown) => x is readonly unknown[]} */
function isArray(x) {
    return toStr.call(x) === '[object Array]';
}

/** @type {import('.')._internal} */
module.exports = function forEach(list, iterator, thisArg) {
    if (!isCallable(iterator)) {
        throw new TypeError('iterator must be a function');
    }

    var receiver;
    if (arguments.length >= 3) {
        receiver = thisArg;
    }

    if (isArray(list)) {
        forEachArray(list, iterator, receiver);
    } else if (typeof list === 'string') {
        forEachString(list, iterator, receiver);
    } else {
        forEachObject(list, iterator, receiver);
    }
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

/***/ 2804:
/***/ ((module) => {

"use strict";

var commonAlphabet = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
var base64Alphabet = commonAlphabet + '+/';
var base64UrlAlphabet = commonAlphabet + '-_';

var inverse = function (characters) {
  // TODO: use `Object.create(null)` in `core-js@4`
  var result = {};
  var index = 0;
  for (; index < 64; index++) result[characters.charAt(index)] = index;
  return result;
};

module.exports = {
  i2c: base64Alphabet,
  c2i: inverse(base64Alphabet),
  i2cUrl: base64UrlAlphabet,
  c2iUrl: inverse(base64UrlAlphabet)
};


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

/***/ 2839:
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

"use strict";

var globalThis = __webpack_require__(4576);

var navigator = globalThis.navigator;
var userAgent = navigator && navigator.userAgent;

module.exports = userAgent ? String(userAgent) : '';


/***/ }),

/***/ 2955:
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

"use strict";
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   A: () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _core__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(9046);


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
    const startParents = (0,_core__WEBPACK_IMPORTED_MODULE_0__.parents)(startContainer || this.startContainer);
    const endParents = (0,_core__WEBPACK_IMPORTED_MODULE_0__.parents)(endContainer || this.endContainer);
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
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (RangeObject);

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

/***/ 3003:
/***/ ((module) => {

"use strict";


/* http://www.ecma-international.org/ecma-262/6.0/#sec-number.isnan */

module.exports = function isNaN(value) {
	return value !== value;
};


/***/ }),

/***/ 3036:
/***/ ((module) => {

"use strict";


/** @type {import('.')} */
var $defineProperty = Object.defineProperty || false;
if ($defineProperty) {
	try {
		$defineProperty({}, 'a', { value: 1 });
	} catch (e) {
		// IE 8 has a broken defineProperty
		$defineProperty = false;
	}
}

module.exports = $defineProperty;


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

/***/ 3093:
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

"use strict";


var $isNaN = __webpack_require__(4459);

/** @type {import('./sign')} */
module.exports = function sign(number) {
	if ($isNaN(number) || number === 0) {
		return number;
	}
	return number < 0 ? -1 : +1;
};


/***/ }),

/***/ 3126:
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

"use strict";


var bind = __webpack_require__(6743);
var $TypeError = __webpack_require__(9675);

var $call = __webpack_require__(76);
var $actualApply = __webpack_require__(3144);

/** @type {(args: [Function, thisArg?: unknown, ...args: unknown[]]) => Function} TODO FIXME, find a way to use import('.') */
module.exports = function callBindBasic(args) {
	if (args.length < 1 || typeof args[0] !== 'function') {
		throw new $TypeError('a function is required');
	}
	return $actualApply(bind, $call, args);
};


/***/ }),

/***/ 3144:
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

"use strict";


var bind = __webpack_require__(6743);

var $apply = __webpack_require__(1002);
var $call = __webpack_require__(76);
var $reflectApply = __webpack_require__(7119);

/** @type {import('./actualApply')} */
module.exports = $reflectApply || bind.call($call, $apply);


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

/***/ 3238:
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

"use strict";

var globalThis = __webpack_require__(4576);
var NATIVE_ARRAY_BUFFER = __webpack_require__(7811);
var arrayBufferByteLength = __webpack_require__(7394);

var DataView = globalThis.DataView;

module.exports = function (O) {
  if (!NATIVE_ARRAY_BUFFER || arrayBufferByteLength(O) !== 0) return false;
  try {
    // eslint-disable-next-line no-new -- thrower
    new DataView(O);
    return false;
  } catch (error) {
    return true;
  }
};


/***/ }),

/***/ 3241:
/***/ ((__unused_webpack_module, __unused_webpack_exports, __webpack_require__) => {

"use strict";

// TODO: Remove from `core-js@4`
var ArrayBufferViewCore = __webpack_require__(4644);
var $group = __webpack_require__(7957);

var aTypedArray = ArrayBufferViewCore.aTypedArray;
var getTypedArrayConstructor = ArrayBufferViewCore.getTypedArrayConstructor;
var exportTypedArrayMethod = ArrayBufferViewCore.exportTypedArrayMethod;

// `%TypedArray%.prototype.groupBy` method
// https://github.com/tc39/proposal-array-grouping
exportTypedArrayMethod('groupBy', function groupBy(callbackfn /* , thisArg */) {
  var thisArg = arguments.length > 1 ? arguments[1] : undefined;
  return $group(aTypedArray(this), callbackfn, thisArg, getTypedArrayConstructor);
}, true);


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

/***/ 3362:
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

"use strict";
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   A: () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var core_js_modules_es_array_push_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(4114);
/* harmony import */ var core_js_modules_es_iterator_constructor_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(8111);
/* harmony import */ var core_js_modules_es_iterator_find_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(116);
/* harmony import */ var core_js_modules_es_iterator_for_each_js__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(7588);
/* harmony import */ var core_js_modules_es_iterator_map_js__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(1701);
/* harmony import */ var event_emitter__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(3068);
/* harmony import */ var _mapping__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(7501);
/* harmony import */ var _helpers_views__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(2488);
/* harmony import */ var _utils_queue__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(1758);
/* harmony import */ var _views_iframe__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(8797);
/* harmony import */ var _utils_scrolltype__WEBPACK_IMPORTED_MODULE_14__ = __webpack_require__(4112);
/* harmony import */ var _utils_defer__WEBPACK_IMPORTED_MODULE_10__ = __webpack_require__(8285);
/* harmony import */ var _utils_constants__WEBPACK_IMPORTED_MODULE_11__ = __webpack_require__(5720);
/* harmony import */ var _utils_core__WEBPACK_IMPORTED_MODULE_12__ = __webpack_require__(9046);
/* harmony import */ var lodash_debounce__WEBPACK_IMPORTED_MODULE_13__ = __webpack_require__(8221);















const AXIS_H = "horizontal";
const AXIS_V = "vertical";

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
    this.layout.on(_utils_constants__WEBPACK_IMPORTED_MODULE_11__/* .EVENTS */ .qY.LAYOUT.UPDATED, (props, changed) => {
      if (changed.flow) {
        this.paginated = props.flow === "paginated";
      }
      this.views.update();
      this.calculate();
    });
    this.settings = (0,_utils_core__WEBPACK_IMPORTED_MODULE_12__.extend)({
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
    this.mapping = new _mapping__WEBPACK_IMPORTED_MODULE_6__/* ["default"] */ .A(this.layout);
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
    this.views = new _helpers_views__WEBPACK_IMPORTED_MODULE_7__/* ["default"] */ .A();
    this.viewport = book.rendition.viewport;
    /**
     * @member {string} writingMode
     * @memberof DefaultViewManager
     * @readonly
     */
    this.writingMode = null;
    this.q = new _utils_queue__WEBPACK_IMPORTED_MODULE_8__/* ["default"] */ .A(this);
  }

  /**
   * render
   * @param {Element|string} element viewport element
   * @param {object} size 
   * @param {string|number} size.width
   * @param {string|number} size.height
   */
  render(element, size) {
    this.scrollType = (0,_utils_scrolltype__WEBPACK_IMPORTED_MODULE_14__/* ["default"] */ .A)();
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
    const displaying = new _utils_defer__WEBPACK_IMPORTED_MODULE_10__/* ["default"] */ .A();
    if (target === section.href || (0,_utils_core__WEBPACK_IMPORTED_MODULE_12__.isNumber)(target)) {
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
    this.scrollend = lodash_debounce__WEBPACK_IMPORTED_MODULE_13__(this.scrolled.bind(this), timeout);
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
      result = _views_iframe__WEBPACK_IMPORTED_MODULE_9__/* ["default"] */ .A;
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
    this.emit(_utils_constants__WEBPACK_IMPORTED_MODULE_11__/* .EVENTS */ .qY.MANAGERS.ADDED, view);
  }

  /**
   * the view resized event handler
   * @param {object} view 
   * @private
   */
  resized(view) {
    this.relocated();
    this.emit(_utils_constants__WEBPACK_IMPORTED_MODULE_11__/* .EVENTS */ .qY.MANAGERS.RESIZED, view);
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
    view.on(_utils_constants__WEBPACK_IMPORTED_MODULE_11__/* .EVENTS */ .qY.VIEWS.DISPLAYED, () => {
      this.displayed(view);
    });
    view.on(_utils_constants__WEBPACK_IMPORTED_MODULE_11__/* .EVENTS */ .qY.VIEWS.RESIZED, rect => {
      this.resized(view);
    });
    view.on(_utils_constants__WEBPACK_IMPORTED_MODULE_11__/* .EVENTS */ .qY.VIEWS.WRITING_MODE, mode => {
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
    view.on(_utils_constants__WEBPACK_IMPORTED_MODULE_11__/* .EVENTS */ .qY.VIEWS.DISPLAYED, () => {
      this.displayed(view);
    });
    view.on(_utils_constants__WEBPACK_IMPORTED_MODULE_11__/* .EVENTS */ .qY.VIEWS.RESIZED, rect => {
      this.counter(view);
      this.resized(view);
    });
    view.on(_utils_constants__WEBPACK_IMPORTED_MODULE_11__/* .EVENTS */ .qY.VIEWS.WRITING_MODE, mode => {
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
    if (this.layout.axis === AXIS_V) {
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
    const def = new _utils_defer__WEBPACK_IMPORTED_MODULE_10__/* ["default"] */ .A();
    const dir = this.layout.direction;
    const ish = this.layout.axis === AXIS_H && this.paginated;
    const isv = this.layout.axis === AXIS_V && this.paginated;
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
    const def = new _utils_defer__WEBPACK_IMPORTED_MODULE_10__/* ["default"] */ .A();
    const dir = this.layout.direction;
    const ish = this.layout.axis === AXIS_H && this.paginated;
    const isv = this.layout.axis === AXIS_V && this.paginated;
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
    this.emit(_utils_constants__WEBPACK_IMPORTED_MODULE_11__/* .EVENTS */ .qY.MANAGERS.RELOCATED, this.location);
  }

  /**
   * currentLocation
   * @returns {object[]} Location sections
   */
  currentLocation() {
    if (this.layout.axis === AXIS_H && this.paginated) {
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
      if (this.layout.axis === AXIS_V) {
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
    if (this.layout.axis === AXIS_H && vpos.right > rect.left - offsetPrev && vpos.left < rect.right + offsetNext) {
      return true;
    }
    if (this.layout.axis === AXIS_V && vpos.bottom > rect.top - offsetPrev && vpos.top < rect.bottom + offsetNext) {
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
    this.emit(_utils_constants__WEBPACK_IMPORTED_MODULE_11__/* .EVENTS */ .qY.MANAGERS.SCROLLED, {
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
      this.emit(_utils_constants__WEBPACK_IMPORTED_MODULE_11__/* .EVENTS */ .qY.MANAGERS.SCROLL, {
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
event_emitter__WEBPACK_IMPORTED_MODULE_5__(DefaultViewManager.prototype);
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (DefaultViewManager);

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

/***/ 3392:
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

"use strict";

var uncurryThis = __webpack_require__(9504);

var id = 0;
var postfix = Math.random();
var toString = uncurryThis(1.1.toString);

module.exports = function (key) {
  return 'Symbol(' + (key === undefined ? '' : key) + ')_' + toString(++id + postfix, 36);
};


/***/ }),

/***/ 3412:
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

"use strict";
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   A: () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var core_js_modules_web_url_search_params_delete_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(4603);
/* harmony import */ var core_js_modules_web_url_search_params_has_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(7566);
/* harmony import */ var core_js_modules_web_url_search_params_size_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(8721);
/* harmony import */ var _path__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(1010);
/* harmony import */ var _defer__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(8285);
/* harmony import */ var _core__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(9046);







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
    } else if ((0,_core__WEBPACK_IMPORTED_MODULE_5__.isXml)(type)) {
      r = (0,_core__WEBPACK_IMPORTED_MODULE_5__.parse)(xhr.response, "text/xml");
    } else if (type === "xhtml") {
      r = (0,_core__WEBPACK_IMPORTED_MODULE_5__.parse)(xhr.response, "application/xhtml+xml");
    } else if (type === "html" || type === "htm") {
      r = (0,_core__WEBPACK_IMPORTED_MODULE_5__.parse)(xhr.response, "text/html");
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
  const def = new _defer__WEBPACK_IMPORTED_MODULE_4__/* ["default"] */ .A();
  const xhr = new XMLHttpRequest();
  type = type || new _path__WEBPACK_IMPORTED_MODULE_3__/* ["default"] */ .A(url).extension;
  xhr.withCredentials = withCredentials;
  if ((0,_core__WEBPACK_IMPORTED_MODULE_5__.isXml)(type)) {
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
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (request);

/***/ }),

/***/ 3463:
/***/ ((module) => {

"use strict";

var $TypeError = TypeError;

module.exports = function (argument) {
  if (typeof argument == 'string') return argument;
  throw new $TypeError('Argument is not a string');
};


/***/ }),

/***/ 3495:
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

"use strict";
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   A: () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var core_js_modules_es_array_push_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(4114);
/* harmony import */ var core_js_modules_es_iterator_constructor_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(8111);
/* harmony import */ var core_js_modules_es_iterator_for_each_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(7588);
/* harmony import */ var core_js_modules_esnext_map_delete_all_js__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(1517);
/* harmony import */ var core_js_modules_esnext_map_emplace_js__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(1379);
/* harmony import */ var core_js_modules_esnext_map_every_js__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(3777);
/* harmony import */ var core_js_modules_esnext_map_filter_js__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(4190);
/* harmony import */ var core_js_modules_esnext_map_find_js__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(2359);
/* harmony import */ var core_js_modules_esnext_map_find_key_js__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(6097);
/* harmony import */ var core_js_modules_esnext_map_get_or_insert_js__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(7254);
/* harmony import */ var core_js_modules_esnext_map_get_or_insert_computed_js__WEBPACK_IMPORTED_MODULE_10__ = __webpack_require__(7036);
/* harmony import */ var core_js_modules_esnext_map_includes_js__WEBPACK_IMPORTED_MODULE_11__ = __webpack_require__(7273);
/* harmony import */ var core_js_modules_esnext_map_key_of_js__WEBPACK_IMPORTED_MODULE_12__ = __webpack_require__(7415);
/* harmony import */ var core_js_modules_esnext_map_map_keys_js__WEBPACK_IMPORTED_MODULE_13__ = __webpack_require__(9929);
/* harmony import */ var core_js_modules_esnext_map_map_values_js__WEBPACK_IMPORTED_MODULE_14__ = __webpack_require__(7583);
/* harmony import */ var core_js_modules_esnext_map_merge_js__WEBPACK_IMPORTED_MODULE_15__ = __webpack_require__(5122);
/* harmony import */ var core_js_modules_esnext_map_reduce_js__WEBPACK_IMPORTED_MODULE_16__ = __webpack_require__(230);
/* harmony import */ var core_js_modules_esnext_map_some_js__WEBPACK_IMPORTED_MODULE_17__ = __webpack_require__(7268);
/* harmony import */ var core_js_modules_esnext_map_update_js__WEBPACK_IMPORTED_MODULE_18__ = __webpack_require__(9733);
/* harmony import */ var _epubcfi__WEBPACK_IMPORTED_MODULE_19__ = __webpack_require__(7421);
/* harmony import */ var _utils_hook__WEBPACK_IMPORTED_MODULE_20__ = __webpack_require__(8510);
/* harmony import */ var _section__WEBPACK_IMPORTED_MODULE_21__ = __webpack_require__(3864);
/* harmony import */ var _utils_replacements__WEBPACK_IMPORTED_MODULE_22__ = __webpack_require__(2588);
























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
      content: new _utils_hook__WEBPACK_IMPORTED_MODULE_20__/* ["default"] */ .A(this),
      serialize: new _utils_hook__WEBPACK_IMPORTED_MODULE_20__/* ["default"] */ .A(this)
    };
    // Register replacements
    this.hooks.content.register(_utils_replacements__WEBPACK_IMPORTED_MODULE_22__/* .replaceBase */ .OB);
    this.hooks.content.register(_utils_replacements__WEBPACK_IMPORTED_MODULE_22__/* .replaceMeta */ .Kj);
    this.hooks.content.register(_utils_replacements__WEBPACK_IMPORTED_MODULE_22__/* .replaceCanonical */ .rG);
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
    this.hooks.content.register(_utils_replacements__WEBPACK_IMPORTED_MODULE_22__/* .replaceBase */ .OB);
    this.hooks.content.register(_utils_replacements__WEBPACK_IMPORTED_MODULE_22__/* .replaceMeta */ .Kj);
    this.hooks.content.register(_utils_replacements__WEBPACK_IMPORTED_MODULE_22__/* .replaceCanonical */ .rG);
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
      if (_epubcfi__WEBPACK_IMPORTED_MODULE_19__/* ["default"] */ .A.prototype.isCfiString(target)) {
        const cfi = new _epubcfi__WEBPACK_IMPORTED_MODULE_19__/* ["default"] */ .A(target);
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
      data.cfiBase = _epubcfi__WEBPACK_IMPORTED_MODULE_19__/* ["default"] */ .A.prototype.generateChapterComponent(spine.nodeIndex, itemref.index, itemref.id);
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
      const section = new _section__WEBPACK_IMPORTED_MODULE_21__/* ["default"] */ .A(data, this.hooks);
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
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (Sections);

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

/***/ 3517:
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

"use strict";

var uncurryThis = __webpack_require__(9504);
var fails = __webpack_require__(9039);
var isCallable = __webpack_require__(4901);
var classof = __webpack_require__(6955);
var getBuiltIn = __webpack_require__(7751);
var inspectSource = __webpack_require__(3706);

var noop = function () { /* empty */ };
var construct = getBuiltIn('Reflect', 'construct');
var constructorRegExp = /^\s*(?:class|function)\b/;
var exec = uncurryThis(constructorRegExp.exec);
var INCORRECT_TO_STRING = !constructorRegExp.test(noop);

var isConstructorModern = function isConstructor(argument) {
  if (!isCallable(argument)) return false;
  try {
    construct(noop, [], argument);
    return true;
  } catch (error) {
    return false;
  }
};

var isConstructorLegacy = function isConstructor(argument) {
  if (!isCallable(argument)) return false;
  switch (classof(argument)) {
    case 'AsyncFunction':
    case 'GeneratorFunction':
    case 'AsyncGeneratorFunction': return false;
  }
  try {
    // we can't check .prototype since constructors produced by .bind haven't it
    // `Function#toString` throws on some built-it function in some legacy engines
    // (for example, `DOMQuad` and similar in FF41-)
    return INCORRECT_TO_STRING || !!exec(constructorRegExp, inspectSource(argument));
  } catch (error) {
    return true;
  }
};

isConstructorLegacy.sham = true;

// `IsConstructor` abstract operation
// https://tc39.es/ecma262/#sec-isconstructor
module.exports = !construct || fails(function () {
  var called;
  return isConstructorModern(isConstructorModern.call)
    || !isConstructorModern(Object)
    || !isConstructorModern(function () { called = true; })
    || called;
}) ? isConstructorLegacy : isConstructorModern;


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

/***/ 3628:
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

"use strict";


var reflectGetProto = __webpack_require__(8648);
var originalGetProto = __webpack_require__(1064);

var getDunderProto = __webpack_require__(7176);

/** @type {import('.')} */
module.exports = reflectGetProto
	? function getProto(O) {
		// @ts-expect-error TS can't narrow inside a closure, for some reason
		return reflectGetProto(O);
	}
	: originalGetProto
		? function getProto(O) {
			if (!O || (typeof O !== 'object' && typeof O !== 'function')) {
				throw new TypeError('getProto: not an object');
			}
			// @ts-expect-error TS can't narrow inside a closure, for some reason
			return originalGetProto(O);
		}
		: getDunderProto
			? function getProto(O) {
				// @ts-expect-error TS can't narrow inside a closure, for some reason
				return getDunderProto(O);
			}
			: null;


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

/***/ 3717:
/***/ ((__unused_webpack_module, exports) => {

"use strict";

// eslint-disable-next-line es/no-object-getownpropertysymbols -- safe
exports.f = Object.getOwnPropertySymbols;


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

/***/ 3755:
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

"use strict";
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   A: () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _mark__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(2134);

const NS_URI = "http://www.w3.org/2000/svg";

/**
 * Highlight class
 * @extends Mark
 */
class Highlight extends _mark__WEBPACK_IMPORTED_MODULE_0__/* ["default"] */ .A {
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
      const rect = document.createElementNS(NS_URI, "rect");
      rect.setAttribute("x", r.left - offset.left + container.left);
      rect.setAttribute("y", r.top - offset.top + container.top);
      rect.setAttribute("height", r.height);
      rect.setAttribute("width", r.width);
      this.element.appendChild(rect);
    }
  }
}
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (Highlight);

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

/***/ 3864:
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

"use strict";
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   A: () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var core_js_modules_es_array_push_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(4114);
/* harmony import */ var core_js_modules_es_iterator_constructor_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(8111);
/* harmony import */ var core_js_modules_es_iterator_find_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(116);
/* harmony import */ var core_js_modules_es_iterator_reduce_js__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(8237);
/* harmony import */ var _epubcfi__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(7421);
/* harmony import */ var _utils_defer__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(8285);
/* harmony import */ var _utils_core__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(9046);








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
    const loading = new _utils_defer__WEBPACK_IMPORTED_MODULE_5__/* ["default"] */ .A();
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
    const rendering = new _utils_defer__WEBPACK_IMPORTED_MODULE_5__/* ["default"] */ .A();
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
    (0,_utils_core__WEBPACK_IMPORTED_MODULE_6__.sprint)(section.document, node => find(node));
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
    return new _epubcfi__WEBPACK_IMPORTED_MODULE_4__/* ["default"] */ .A(range, this.cfiBase).toString();
  }

  /**
   * Get a CFI from an Element in the Section
   * @param {Element} el
   * @return {string} cfi an EpubCFI string
   */
  cfiFromElement(el) {
    return new _epubcfi__WEBPACK_IMPORTED_MODULE_4__/* ["default"] */ .A(el, this.cfiBase).toString();
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
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (Section);

/***/ }),

/***/ 3918:
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

"use strict";
/* provided dependency */ var process = __webpack_require__(5606);
// Currently in sync with Node.js lib/internal/assert/assertion_error.js
// https://github.com/nodejs/node/commit/0817840f775032169ddd70c85ac059f18ffcc81c



function ownKeys(e, r) { var t = Object.keys(e); if (Object.getOwnPropertySymbols) { var o = Object.getOwnPropertySymbols(e); r && (o = o.filter(function (r) { return Object.getOwnPropertyDescriptor(e, r).enumerable; })), t.push.apply(t, o); } return t; }
function _objectSpread(e) { for (var r = 1; r < arguments.length; r++) { var t = null != arguments[r] ? arguments[r] : {}; r % 2 ? ownKeys(Object(t), !0).forEach(function (r) { _defineProperty(e, r, t[r]); }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(e, Object.getOwnPropertyDescriptors(t)) : ownKeys(Object(t)).forEach(function (r) { Object.defineProperty(e, r, Object.getOwnPropertyDescriptor(t, r)); }); } return e; }
function _defineProperty(obj, key, value) { key = _toPropertyKey(key); if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }
function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }
function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, _toPropertyKey(descriptor.key), descriptor); } }
function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); Object.defineProperty(Constructor, "prototype", { writable: false }); return Constructor; }
function _toPropertyKey(arg) { var key = _toPrimitive(arg, "string"); return _typeof(key) === "symbol" ? key : String(key); }
function _toPrimitive(input, hint) { if (_typeof(input) !== "object" || input === null) return input; var prim = input[Symbol.toPrimitive]; if (prim !== undefined) { var res = prim.call(input, hint || "default"); if (_typeof(res) !== "object") return res; throw new TypeError("@@toPrimitive must return a primitive value."); } return (hint === "string" ? String : Number)(input); }
function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function"); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, writable: true, configurable: true } }); Object.defineProperty(subClass, "prototype", { writable: false }); if (superClass) _setPrototypeOf(subClass, superClass); }
function _createSuper(Derived) { var hasNativeReflectConstruct = _isNativeReflectConstruct(); return function _createSuperInternal() { var Super = _getPrototypeOf(Derived), result; if (hasNativeReflectConstruct) { var NewTarget = _getPrototypeOf(this).constructor; result = Reflect.construct(Super, arguments, NewTarget); } else { result = Super.apply(this, arguments); } return _possibleConstructorReturn(this, result); }; }
function _possibleConstructorReturn(self, call) { if (call && (_typeof(call) === "object" || typeof call === "function")) { return call; } else if (call !== void 0) { throw new TypeError("Derived constructors may only return object or undefined"); } return _assertThisInitialized(self); }
function _assertThisInitialized(self) { if (self === void 0) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return self; }
function _wrapNativeSuper(Class) { var _cache = typeof Map === "function" ? new Map() : undefined; _wrapNativeSuper = function _wrapNativeSuper(Class) { if (Class === null || !_isNativeFunction(Class)) return Class; if (typeof Class !== "function") { throw new TypeError("Super expression must either be null or a function"); } if (typeof _cache !== "undefined") { if (_cache.has(Class)) return _cache.get(Class); _cache.set(Class, Wrapper); } function Wrapper() { return _construct(Class, arguments, _getPrototypeOf(this).constructor); } Wrapper.prototype = Object.create(Class.prototype, { constructor: { value: Wrapper, enumerable: false, writable: true, configurable: true } }); return _setPrototypeOf(Wrapper, Class); }; return _wrapNativeSuper(Class); }
function _construct(Parent, args, Class) { if (_isNativeReflectConstruct()) { _construct = Reflect.construct.bind(); } else { _construct = function _construct(Parent, args, Class) { var a = [null]; a.push.apply(a, args); var Constructor = Function.bind.apply(Parent, a); var instance = new Constructor(); if (Class) _setPrototypeOf(instance, Class.prototype); return instance; }; } return _construct.apply(null, arguments); }
function _isNativeReflectConstruct() { if (typeof Reflect === "undefined" || !Reflect.construct) return false; if (Reflect.construct.sham) return false; if (typeof Proxy === "function") return true; try { Boolean.prototype.valueOf.call(Reflect.construct(Boolean, [], function () {})); return true; } catch (e) { return false; } }
function _isNativeFunction(fn) { return Function.toString.call(fn).indexOf("[native code]") !== -1; }
function _setPrototypeOf(o, p) { _setPrototypeOf = Object.setPrototypeOf ? Object.setPrototypeOf.bind() : function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return _setPrototypeOf(o, p); }
function _getPrototypeOf(o) { _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf.bind() : function _getPrototypeOf(o) { return o.__proto__ || Object.getPrototypeOf(o); }; return _getPrototypeOf(o); }
function _typeof(o) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (o) { return typeof o; } : function (o) { return o && "function" == typeof Symbol && o.constructor === Symbol && o !== Symbol.prototype ? "symbol" : typeof o; }, _typeof(o); }
var _require = __webpack_require__(537),
  inspect = _require.inspect;
var _require2 = __webpack_require__(9597),
  ERR_INVALID_ARG_TYPE = _require2.codes.ERR_INVALID_ARG_TYPE;

// https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/String/endsWith
function endsWith(str, search, this_len) {
  if (this_len === undefined || this_len > str.length) {
    this_len = str.length;
  }
  return str.substring(this_len - search.length, this_len) === search;
}

// https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/String/repeat
function repeat(str, count) {
  count = Math.floor(count);
  if (str.length == 0 || count == 0) return '';
  var maxCount = str.length * count;
  count = Math.floor(Math.log(count) / Math.log(2));
  while (count) {
    str += str;
    count--;
  }
  str += str.substring(0, maxCount - str.length);
  return str;
}
var blue = '';
var green = '';
var red = '';
var white = '';
var kReadableOperator = {
  deepStrictEqual: 'Expected values to be strictly deep-equal:',
  strictEqual: 'Expected values to be strictly equal:',
  strictEqualObject: 'Expected "actual" to be reference-equal to "expected":',
  deepEqual: 'Expected values to be loosely deep-equal:',
  equal: 'Expected values to be loosely equal:',
  notDeepStrictEqual: 'Expected "actual" not to be strictly deep-equal to:',
  notStrictEqual: 'Expected "actual" to be strictly unequal to:',
  notStrictEqualObject: 'Expected "actual" not to be reference-equal to "expected":',
  notDeepEqual: 'Expected "actual" not to be loosely deep-equal to:',
  notEqual: 'Expected "actual" to be loosely unequal to:',
  notIdentical: 'Values identical but not reference-equal:'
};

// Comparing short primitives should just show === / !== instead of using the
// diff.
var kMaxShortLength = 10;
function copyError(source) {
  var keys = Object.keys(source);
  var target = Object.create(Object.getPrototypeOf(source));
  keys.forEach(function (key) {
    target[key] = source[key];
  });
  Object.defineProperty(target, 'message', {
    value: source.message
  });
  return target;
}
function inspectValue(val) {
  // The util.inspect default values could be changed. This makes sure the
  // error messages contain the necessary information nevertheless.
  return inspect(val, {
    compact: false,
    customInspect: false,
    depth: 1000,
    maxArrayLength: Infinity,
    // Assert compares only enumerable properties (with a few exceptions).
    showHidden: false,
    // Having a long line as error is better than wrapping the line for
    // comparison for now.
    // TODO(BridgeAR): `breakLength` should be limited as soon as soon as we
    // have meta information about the inspected properties (i.e., know where
    // in what line the property starts and ends).
    breakLength: Infinity,
    // Assert does not detect proxies currently.
    showProxy: false,
    sorted: true,
    // Inspect getters as we also check them when comparing entries.
    getters: true
  });
}
function createErrDiff(actual, expected, operator) {
  var other = '';
  var res = '';
  var lastPos = 0;
  var end = '';
  var skipped = false;
  var actualInspected = inspectValue(actual);
  var actualLines = actualInspected.split('\n');
  var expectedLines = inspectValue(expected).split('\n');
  var i = 0;
  var indicator = '';

  // In case both values are objects explicitly mark them as not reference equal
  // for the `strictEqual` operator.
  if (operator === 'strictEqual' && _typeof(actual) === 'object' && _typeof(expected) === 'object' && actual !== null && expected !== null) {
    operator = 'strictEqualObject';
  }

  // If "actual" and "expected" fit on a single line and they are not strictly
  // equal, check further special handling.
  if (actualLines.length === 1 && expectedLines.length === 1 && actualLines[0] !== expectedLines[0]) {
    var inputLength = actualLines[0].length + expectedLines[0].length;
    // If the character length of "actual" and "expected" together is less than
    // kMaxShortLength and if neither is an object and at least one of them is
    // not `zero`, use the strict equal comparison to visualize the output.
    if (inputLength <= kMaxShortLength) {
      if ((_typeof(actual) !== 'object' || actual === null) && (_typeof(expected) !== 'object' || expected === null) && (actual !== 0 || expected !== 0)) {
        // -0 === +0
        return "".concat(kReadableOperator[operator], "\n\n") + "".concat(actualLines[0], " !== ").concat(expectedLines[0], "\n");
      }
    } else if (operator !== 'strictEqualObject') {
      // If the stderr is a tty and the input length is lower than the current
      // columns per line, add a mismatch indicator below the output. If it is
      // not a tty, use a default value of 80 characters.
      var maxLength = process.stderr && process.stderr.isTTY ? process.stderr.columns : 80;
      if (inputLength < maxLength) {
        while (actualLines[0][i] === expectedLines[0][i]) {
          i++;
        }
        // Ignore the first characters.
        if (i > 2) {
          // Add position indicator for the first mismatch in case it is a
          // single line and the input length is less than the column length.
          indicator = "\n  ".concat(repeat(' ', i), "^");
          i = 0;
        }
      }
    }
  }

  // Remove all ending lines that match (this optimizes the output for
  // readability by reducing the number of total changed lines).
  var a = actualLines[actualLines.length - 1];
  var b = expectedLines[expectedLines.length - 1];
  while (a === b) {
    if (i++ < 2) {
      end = "\n  ".concat(a).concat(end);
    } else {
      other = a;
    }
    actualLines.pop();
    expectedLines.pop();
    if (actualLines.length === 0 || expectedLines.length === 0) break;
    a = actualLines[actualLines.length - 1];
    b = expectedLines[expectedLines.length - 1];
  }
  var maxLines = Math.max(actualLines.length, expectedLines.length);
  // Strict equal with identical objects that are not identical by reference.
  // E.g., assert.deepStrictEqual({ a: Symbol() }, { a: Symbol() })
  if (maxLines === 0) {
    // We have to get the result again. The lines were all removed before.
    var _actualLines = actualInspected.split('\n');

    // Only remove lines in case it makes sense to collapse those.
    // TODO: Accept env to always show the full error.
    if (_actualLines.length > 30) {
      _actualLines[26] = "".concat(blue, "...").concat(white);
      while (_actualLines.length > 27) {
        _actualLines.pop();
      }
    }
    return "".concat(kReadableOperator.notIdentical, "\n\n").concat(_actualLines.join('\n'), "\n");
  }
  if (i > 3) {
    end = "\n".concat(blue, "...").concat(white).concat(end);
    skipped = true;
  }
  if (other !== '') {
    end = "\n  ".concat(other).concat(end);
    other = '';
  }
  var printedLines = 0;
  var msg = kReadableOperator[operator] + "\n".concat(green, "+ actual").concat(white, " ").concat(red, "- expected").concat(white);
  var skippedMsg = " ".concat(blue, "...").concat(white, " Lines skipped");
  for (i = 0; i < maxLines; i++) {
    // Only extra expected lines exist
    var cur = i - lastPos;
    if (actualLines.length < i + 1) {
      // If the last diverging line is more than one line above and the
      // current line is at least line three, add some of the former lines and
      // also add dots to indicate skipped entries.
      if (cur > 1 && i > 2) {
        if (cur > 4) {
          res += "\n".concat(blue, "...").concat(white);
          skipped = true;
        } else if (cur > 3) {
          res += "\n  ".concat(expectedLines[i - 2]);
          printedLines++;
        }
        res += "\n  ".concat(expectedLines[i - 1]);
        printedLines++;
      }
      // Mark the current line as the last diverging one.
      lastPos = i;
      // Add the expected line to the cache.
      other += "\n".concat(red, "-").concat(white, " ").concat(expectedLines[i]);
      printedLines++;
      // Only extra actual lines exist
    } else if (expectedLines.length < i + 1) {
      // If the last diverging line is more than one line above and the
      // current line is at least line three, add some of the former lines and
      // also add dots to indicate skipped entries.
      if (cur > 1 && i > 2) {
        if (cur > 4) {
          res += "\n".concat(blue, "...").concat(white);
          skipped = true;
        } else if (cur > 3) {
          res += "\n  ".concat(actualLines[i - 2]);
          printedLines++;
        }
        res += "\n  ".concat(actualLines[i - 1]);
        printedLines++;
      }
      // Mark the current line as the last diverging one.
      lastPos = i;
      // Add the actual line to the result.
      res += "\n".concat(green, "+").concat(white, " ").concat(actualLines[i]);
      printedLines++;
      // Lines diverge
    } else {
      var expectedLine = expectedLines[i];
      var actualLine = actualLines[i];
      // If the lines diverge, specifically check for lines that only diverge by
      // a trailing comma. In that case it is actually identical and we should
      // mark it as such.
      var divergingLines = actualLine !== expectedLine && (!endsWith(actualLine, ',') || actualLine.slice(0, -1) !== expectedLine);
      // If the expected line has a trailing comma but is otherwise identical,
      // add a comma at the end of the actual line. Otherwise the output could
      // look weird as in:
      //
      //   [
      //     1         // No comma at the end!
      // +   2
      //   ]
      //
      if (divergingLines && endsWith(expectedLine, ',') && expectedLine.slice(0, -1) === actualLine) {
        divergingLines = false;
        actualLine += ',';
      }
      if (divergingLines) {
        // If the last diverging line is more than one line above and the
        // current line is at least line three, add some of the former lines and
        // also add dots to indicate skipped entries.
        if (cur > 1 && i > 2) {
          if (cur > 4) {
            res += "\n".concat(blue, "...").concat(white);
            skipped = true;
          } else if (cur > 3) {
            res += "\n  ".concat(actualLines[i - 2]);
            printedLines++;
          }
          res += "\n  ".concat(actualLines[i - 1]);
          printedLines++;
        }
        // Mark the current line as the last diverging one.
        lastPos = i;
        // Add the actual line to the result and cache the expected diverging
        // line so consecutive diverging lines show up as +++--- and not +-+-+-.
        res += "\n".concat(green, "+").concat(white, " ").concat(actualLine);
        other += "\n".concat(red, "-").concat(white, " ").concat(expectedLine);
        printedLines += 2;
        // Lines are identical
      } else {
        // Add all cached information to the result before adding other things
        // and reset the cache.
        res += other;
        other = '';
        // If the last diverging line is exactly one line above or if it is the
        // very first line, add the line to the result.
        if (cur === 1 || i === 0) {
          res += "\n  ".concat(actualLine);
          printedLines++;
        }
      }
    }
    // Inspected object to big (Show ~20 rows max)
    if (printedLines > 20 && i < maxLines - 2) {
      return "".concat(msg).concat(skippedMsg, "\n").concat(res, "\n").concat(blue, "...").concat(white).concat(other, "\n") + "".concat(blue, "...").concat(white);
    }
  }
  return "".concat(msg).concat(skipped ? skippedMsg : '', "\n").concat(res).concat(other).concat(end).concat(indicator);
}
var AssertionError = /*#__PURE__*/function (_Error, _inspect$custom) {
  _inherits(AssertionError, _Error);
  var _super = _createSuper(AssertionError);
  function AssertionError(options) {
    var _this;
    _classCallCheck(this, AssertionError);
    if (_typeof(options) !== 'object' || options === null) {
      throw new ERR_INVALID_ARG_TYPE('options', 'Object', options);
    }
    var message = options.message,
      operator = options.operator,
      stackStartFn = options.stackStartFn;
    var actual = options.actual,
      expected = options.expected;
    var limit = Error.stackTraceLimit;
    Error.stackTraceLimit = 0;
    if (message != null) {
      _this = _super.call(this, String(message));
    } else {
      if (process.stderr && process.stderr.isTTY) {
        // Reset on each call to make sure we handle dynamically set environment
        // variables correct.
        if (process.stderr && process.stderr.getColorDepth && process.stderr.getColorDepth() !== 1) {
          blue = "\x1B[34m";
          green = "\x1B[32m";
          white = "\x1B[39m";
          red = "\x1B[31m";
        } else {
          blue = '';
          green = '';
          white = '';
          red = '';
        }
      }
      // Prevent the error stack from being visible by duplicating the error
      // in a very close way to the original in case both sides are actually
      // instances of Error.
      if (_typeof(actual) === 'object' && actual !== null && _typeof(expected) === 'object' && expected !== null && 'stack' in actual && actual instanceof Error && 'stack' in expected && expected instanceof Error) {
        actual = copyError(actual);
        expected = copyError(expected);
      }
      if (operator === 'deepStrictEqual' || operator === 'strictEqual') {
        _this = _super.call(this, createErrDiff(actual, expected, operator));
      } else if (operator === 'notDeepStrictEqual' || operator === 'notStrictEqual') {
        // In case the objects are equal but the operator requires unequal, show
        // the first object and say A equals B
        var base = kReadableOperator[operator];
        var res = inspectValue(actual).split('\n');

        // In case "actual" is an object, it should not be reference equal.
        if (operator === 'notStrictEqual' && _typeof(actual) === 'object' && actual !== null) {
          base = kReadableOperator.notStrictEqualObject;
        }

        // Only remove lines in case it makes sense to collapse those.
        // TODO: Accept env to always show the full error.
        if (res.length > 30) {
          res[26] = "".concat(blue, "...").concat(white);
          while (res.length > 27) {
            res.pop();
          }
        }

        // Only print a single input.
        if (res.length === 1) {
          _this = _super.call(this, "".concat(base, " ").concat(res[0]));
        } else {
          _this = _super.call(this, "".concat(base, "\n\n").concat(res.join('\n'), "\n"));
        }
      } else {
        var _res = inspectValue(actual);
        var other = '';
        var knownOperators = kReadableOperator[operator];
        if (operator === 'notDeepEqual' || operator === 'notEqual') {
          _res = "".concat(kReadableOperator[operator], "\n\n").concat(_res);
          if (_res.length > 1024) {
            _res = "".concat(_res.slice(0, 1021), "...");
          }
        } else {
          other = "".concat(inspectValue(expected));
          if (_res.length > 512) {
            _res = "".concat(_res.slice(0, 509), "...");
          }
          if (other.length > 512) {
            other = "".concat(other.slice(0, 509), "...");
          }
          if (operator === 'deepEqual' || operator === 'equal') {
            _res = "".concat(knownOperators, "\n\n").concat(_res, "\n\nshould equal\n\n");
          } else {
            other = " ".concat(operator, " ").concat(other);
          }
        }
        _this = _super.call(this, "".concat(_res).concat(other));
      }
    }
    Error.stackTraceLimit = limit;
    _this.generatedMessage = !message;
    Object.defineProperty(_assertThisInitialized(_this), 'name', {
      value: 'AssertionError [ERR_ASSERTION]',
      enumerable: false,
      writable: true,
      configurable: true
    });
    _this.code = 'ERR_ASSERTION';
    _this.actual = actual;
    _this.expected = expected;
    _this.operator = operator;
    if (Error.captureStackTrace) {
      // eslint-disable-next-line no-restricted-syntax
      Error.captureStackTrace(_assertThisInitialized(_this), stackStartFn);
    }
    // Create error message including the error code in the name.
    _this.stack;
    // Reset the name.
    _this.name = 'AssertionError';
    return _possibleConstructorReturn(_this);
  }
  _createClass(AssertionError, [{
    key: "toString",
    value: function toString() {
      return "".concat(this.name, " [").concat(this.code, "]: ").concat(this.message);
    }
  }, {
    key: _inspect$custom,
    value: function value(recurseTimes, ctx) {
      // This limits the `actual` and `expected` property default inspection to
      // the minimum depth. Otherwise those values would be too verbose compared
      // to the actual error message which contains a combined view of these two
      // input values.
      return inspect(this, _objectSpread(_objectSpread({}, ctx), {}, {
        customInspect: false,
        depth: 0
      }));
    }
  }]);
  return AssertionError;
}( /*#__PURE__*/_wrapNativeSuper(Error), inspect.custom);
module.exports = AssertionError;

/***/ }),

/***/ 3925:
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

"use strict";

var isObject = __webpack_require__(34);

module.exports = function (argument) {
  return isObject(argument) || argument === null;
};


/***/ }),

/***/ 3972:
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

"use strict";

var isObject = __webpack_require__(34);

var $String = String;
var $TypeError = TypeError;

module.exports = function (argument) {
  if (argument === undefined || isObject(argument)) return argument;
  throw new $TypeError($String(argument) + ' is not an object or undefined');
};


/***/ }),

/***/ 4035:
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

"use strict";


var callBound = __webpack_require__(6556);
var hasToStringTag = __webpack_require__(9092)();
var hasOwn = __webpack_require__(9957);
var gOPD = __webpack_require__(5795);

/** @type {import('.')} */
var fn;

if (hasToStringTag) {
	/** @type {(receiver: ThisParameterType<typeof RegExp.prototype.exec>, ...args: Parameters<typeof RegExp.prototype.exec>) => ReturnType<typeof RegExp.prototype.exec>} */
	var $exec = callBound('RegExp.prototype.exec');
	/** @type {object} */
	var isRegexMarker = {};

	var throwRegexMarker = function () {
		throw isRegexMarker;
	};
	/** @type {{ toString(): never, valueOf(): never, [Symbol.toPrimitive]?(): never }} */
	var badStringifier = {
		toString: throwRegexMarker,
		valueOf: throwRegexMarker
	};

	if (typeof Symbol.toPrimitive === 'symbol') {
		badStringifier[Symbol.toPrimitive] = throwRegexMarker;
	}

	/** @type {import('.')} */
	// @ts-expect-error TS can't figure out that the $exec call always throws
	// eslint-disable-next-line consistent-return
	fn = function isRegex(value) {
		if (!value || typeof value !== 'object') {
			return false;
		}

		// eslint-disable-next-line no-extra-parens
		var descriptor = /** @type {NonNullable<typeof gOPD>} */ (gOPD)(/** @type {{ lastIndex?: unknown }} */ (value), 'lastIndex');
		var hasLastIndexDataProperty = descriptor && hasOwn(descriptor, 'value');
		if (!hasLastIndexDataProperty) {
			return false;
		}

		try {
			// eslint-disable-next-line no-extra-parens
			$exec(value, /** @type {string} */ (/** @type {unknown} */ (badStringifier)));
		} catch (e) {
			return e === isRegexMarker;
		}
	};
} else {
	/** @type {(receiver: ThisParameterType<typeof Object.prototype.toString>, ...args: Parameters<typeof Object.prototype.toString>) => ReturnType<typeof Object.prototype.toString>} */
	var $toString = callBound('Object.prototype.toString');
	/** @const @type {'[object RegExp]'} */
	var regexClass = '[object RegExp]';

	/** @type {import('.')} */
	fn = function isRegex(value) {
		// In older browsers, typeof regex incorrectly returns 'function'
		if (!value || (typeof value !== 'object' && typeof value !== 'function')) {
			return false;
		}

		return $toString(value) === regexClass;
	};
}

module.exports = fn;


/***/ }),

/***/ 4039:
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

"use strict";


var origSymbol = typeof Symbol !== 'undefined' && Symbol;
var hasSymbolSham = __webpack_require__(1333);

/** @type {import('.')} */
module.exports = function hasNativeSymbols() {
	if (typeof origSymbol !== 'function') { return false; }
	if (typeof Symbol !== 'function') { return false; }
	if (typeof origSymbol('foo') !== 'symbol') { return false; }
	if (typeof Symbol('bar') !== 'symbol') { return false; }

	return hasSymbolSham();
};


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

/***/ 4112:
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

"use strict";
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   A: () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* unused harmony export createDefiner */
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
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (scrollType);

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

/***/ 4117:
/***/ ((module) => {

"use strict";

// we can't use just `it == null` since of `document.all` special case
// https://tc39.es/ecma262/#sec-IsHTMLDDA-internal-slot-aec
module.exports = function (it) {
  return it === null || it === undefined;
};


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

/***/ 4133:
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

"use strict";


var callBind = __webpack_require__(487);
var define = __webpack_require__(8452);

var implementation = __webpack_require__(3003);
var getPolyfill = __webpack_require__(6642);
var shim = __webpack_require__(2464);

var polyfill = callBind(getPolyfill(), Number);

/* http://www.ecma-international.org/ecma-262/6.0/#sec-number.isnan */

define(polyfill, {
	getPolyfill: getPolyfill,
	implementation: implementation,
	shim: shim
});

module.exports = polyfill;


/***/ }),

/***/ 4148:
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

"use strict";
/* provided dependency */ var process = __webpack_require__(5606);
// Currently in sync with Node.js lib/assert.js
// https://github.com/nodejs/node/commit/2a51ae424a513ec9a6aa3466baa0cc1d55dd4f3b

// Originally from narwhal.js (http://narwhaljs.org)
// Copyright (c) 2009 Thomas Robinson <280north.com>
//
// Permission is hereby granted, free of charge, to any person obtaining a copy
// of this software and associated documentation files (the 'Software'), to
// deal in the Software without restriction, including without limitation the
// rights to use, copy, modify, merge, publish, distribute, sublicense, and/or
// sell copies of the Software, and to permit persons to whom the Software is
// furnished to do so, subject to the following conditions:
//
// The above copyright notice and this permission notice shall be included in
// all copies or substantial portions of the Software.
//
// THE SOFTWARE IS PROVIDED 'AS IS', WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
// IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
// FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
// AUTHORS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN
// ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION
// WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.



function _typeof(o) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (o) { return typeof o; } : function (o) { return o && "function" == typeof Symbol && o.constructor === Symbol && o !== Symbol.prototype ? "symbol" : typeof o; }, _typeof(o); }
function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, _toPropertyKey(descriptor.key), descriptor); } }
function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); Object.defineProperty(Constructor, "prototype", { writable: false }); return Constructor; }
function _toPropertyKey(arg) { var key = _toPrimitive(arg, "string"); return _typeof(key) === "symbol" ? key : String(key); }
function _toPrimitive(input, hint) { if (_typeof(input) !== "object" || input === null) return input; var prim = input[Symbol.toPrimitive]; if (prim !== undefined) { var res = prim.call(input, hint || "default"); if (_typeof(res) !== "object") return res; throw new TypeError("@@toPrimitive must return a primitive value."); } return (hint === "string" ? String : Number)(input); }
function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }
var _require = __webpack_require__(9597),
  _require$codes = _require.codes,
  ERR_AMBIGUOUS_ARGUMENT = _require$codes.ERR_AMBIGUOUS_ARGUMENT,
  ERR_INVALID_ARG_TYPE = _require$codes.ERR_INVALID_ARG_TYPE,
  ERR_INVALID_ARG_VALUE = _require$codes.ERR_INVALID_ARG_VALUE,
  ERR_INVALID_RETURN_VALUE = _require$codes.ERR_INVALID_RETURN_VALUE,
  ERR_MISSING_ARGS = _require$codes.ERR_MISSING_ARGS;
var AssertionError = __webpack_require__(3918);
var _require2 = __webpack_require__(537),
  inspect = _require2.inspect;
var _require$types = (__webpack_require__(537).types),
  isPromise = _require$types.isPromise,
  isRegExp = _require$types.isRegExp;
var objectAssign = __webpack_require__(9133)();
var objectIs = __webpack_require__(9394)();
var RegExpPrototypeTest = __webpack_require__(8075)('RegExp.prototype.test');
var errorCache = new Map();
var isDeepEqual;
var isDeepStrictEqual;
var parseExpressionAt;
var findNodeAround;
var decoder;
function lazyLoadComparison() {
  var comparison = __webpack_require__(2299);
  isDeepEqual = comparison.isDeepEqual;
  isDeepStrictEqual = comparison.isDeepStrictEqual;
}

// Escape control characters but not \n and \t to keep the line breaks and
// indentation intact.
// eslint-disable-next-line no-control-regex
var escapeSequencesRegExp = /[\x00-\x08\x0b\x0c\x0e-\x1f]/g;
var meta = (/* unused pure expression or super */ null && (["\\u0000", "\\u0001", "\\u0002", "\\u0003", "\\u0004", "\\u0005", "\\u0006", "\\u0007", '\\b', '', '', "\\u000b", '\\f', '', "\\u000e", "\\u000f", "\\u0010", "\\u0011", "\\u0012", "\\u0013", "\\u0014", "\\u0015", "\\u0016", "\\u0017", "\\u0018", "\\u0019", "\\u001a", "\\u001b", "\\u001c", "\\u001d", "\\u001e", "\\u001f"]));
var escapeFn = function escapeFn(str) {
  return meta[str.charCodeAt(0)];
};
var warned = false;

// The assert module provides functions that throw
// AssertionError's when particular conditions are not met. The
// assert module must conform to the following interface.

var assert = module.exports = ok;
var NO_EXCEPTION_SENTINEL = {};

// All of the following functions must throw an AssertionError
// when a corresponding condition is not met, with a message that
// may be undefined if not provided. All assertion methods provide
// both the actual and expected values to the assertion error for
// display purposes.

function innerFail(obj) {
  if (obj.message instanceof Error) throw obj.message;
  throw new AssertionError(obj);
}
function fail(actual, expected, message, operator, stackStartFn) {
  var argsLen = arguments.length;
  var internalMessage;
  if (argsLen === 0) {
    internalMessage = 'Failed';
  } else if (argsLen === 1) {
    message = actual;
    actual = undefined;
  } else {
    if (warned === false) {
      warned = true;
      var warn = process.emitWarning ? process.emitWarning : console.warn.bind(console);
      warn('assert.fail() with more than one argument is deprecated. ' + 'Please use assert.strictEqual() instead or only pass a message.', 'DeprecationWarning', 'DEP0094');
    }
    if (argsLen === 2) operator = '!=';
  }
  if (message instanceof Error) throw message;
  var errArgs = {
    actual: actual,
    expected: expected,
    operator: operator === undefined ? 'fail' : operator,
    stackStartFn: stackStartFn || fail
  };
  if (message !== undefined) {
    errArgs.message = message;
  }
  var err = new AssertionError(errArgs);
  if (internalMessage) {
    err.message = internalMessage;
    err.generatedMessage = true;
  }
  throw err;
}
assert.fail = fail;

// The AssertionError is defined in internal/error.
assert.AssertionError = AssertionError;
function innerOk(fn, argLen, value, message) {
  if (!value) {
    var generatedMessage = false;
    if (argLen === 0) {
      generatedMessage = true;
      message = 'No value argument passed to `assert.ok()`';
    } else if (message instanceof Error) {
      throw message;
    }
    var err = new AssertionError({
      actual: value,
      expected: true,
      message: message,
      operator: '==',
      stackStartFn: fn
    });
    err.generatedMessage = generatedMessage;
    throw err;
  }
}

// Pure assertion tests whether a value is truthy, as determined
// by !!value.
function ok() {
  for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
    args[_key] = arguments[_key];
  }
  innerOk.apply(void 0, [ok, args.length].concat(args));
}
assert.ok = ok;

// The equality assertion tests shallow, coercive equality with ==.
/* eslint-disable no-restricted-properties */
assert.equal = function equal(actual, expected, message) {
  if (arguments.length < 2) {
    throw new ERR_MISSING_ARGS('actual', 'expected');
  }
  // eslint-disable-next-line eqeqeq
  if (actual != expected) {
    innerFail({
      actual: actual,
      expected: expected,
      message: message,
      operator: '==',
      stackStartFn: equal
    });
  }
};

// The non-equality assertion tests for whether two objects are not
// equal with !=.
assert.notEqual = function notEqual(actual, expected, message) {
  if (arguments.length < 2) {
    throw new ERR_MISSING_ARGS('actual', 'expected');
  }
  // eslint-disable-next-line eqeqeq
  if (actual == expected) {
    innerFail({
      actual: actual,
      expected: expected,
      message: message,
      operator: '!=',
      stackStartFn: notEqual
    });
  }
};

// The equivalence assertion tests a deep equality relation.
assert.deepEqual = function deepEqual(actual, expected, message) {
  if (arguments.length < 2) {
    throw new ERR_MISSING_ARGS('actual', 'expected');
  }
  if (isDeepEqual === undefined) lazyLoadComparison();
  if (!isDeepEqual(actual, expected)) {
    innerFail({
      actual: actual,
      expected: expected,
      message: message,
      operator: 'deepEqual',
      stackStartFn: deepEqual
    });
  }
};

// The non-equivalence assertion tests for any deep inequality.
assert.notDeepEqual = function notDeepEqual(actual, expected, message) {
  if (arguments.length < 2) {
    throw new ERR_MISSING_ARGS('actual', 'expected');
  }
  if (isDeepEqual === undefined) lazyLoadComparison();
  if (isDeepEqual(actual, expected)) {
    innerFail({
      actual: actual,
      expected: expected,
      message: message,
      operator: 'notDeepEqual',
      stackStartFn: notDeepEqual
    });
  }
};
/* eslint-enable */

assert.deepStrictEqual = function deepStrictEqual(actual, expected, message) {
  if (arguments.length < 2) {
    throw new ERR_MISSING_ARGS('actual', 'expected');
  }
  if (isDeepEqual === undefined) lazyLoadComparison();
  if (!isDeepStrictEqual(actual, expected)) {
    innerFail({
      actual: actual,
      expected: expected,
      message: message,
      operator: 'deepStrictEqual',
      stackStartFn: deepStrictEqual
    });
  }
};
assert.notDeepStrictEqual = notDeepStrictEqual;
function notDeepStrictEqual(actual, expected, message) {
  if (arguments.length < 2) {
    throw new ERR_MISSING_ARGS('actual', 'expected');
  }
  if (isDeepEqual === undefined) lazyLoadComparison();
  if (isDeepStrictEqual(actual, expected)) {
    innerFail({
      actual: actual,
      expected: expected,
      message: message,
      operator: 'notDeepStrictEqual',
      stackStartFn: notDeepStrictEqual
    });
  }
}
assert.strictEqual = function strictEqual(actual, expected, message) {
  if (arguments.length < 2) {
    throw new ERR_MISSING_ARGS('actual', 'expected');
  }
  if (!objectIs(actual, expected)) {
    innerFail({
      actual: actual,
      expected: expected,
      message: message,
      operator: 'strictEqual',
      stackStartFn: strictEqual
    });
  }
};
assert.notStrictEqual = function notStrictEqual(actual, expected, message) {
  if (arguments.length < 2) {
    throw new ERR_MISSING_ARGS('actual', 'expected');
  }
  if (objectIs(actual, expected)) {
    innerFail({
      actual: actual,
      expected: expected,
      message: message,
      operator: 'notStrictEqual',
      stackStartFn: notStrictEqual
    });
  }
};
var Comparison = /*#__PURE__*/_createClass(function Comparison(obj, keys, actual) {
  var _this = this;
  _classCallCheck(this, Comparison);
  keys.forEach(function (key) {
    if (key in obj) {
      if (actual !== undefined && typeof actual[key] === 'string' && isRegExp(obj[key]) && RegExpPrototypeTest(obj[key], actual[key])) {
        _this[key] = actual[key];
      } else {
        _this[key] = obj[key];
      }
    }
  });
});
function compareExceptionKey(actual, expected, key, message, keys, fn) {
  if (!(key in actual) || !isDeepStrictEqual(actual[key], expected[key])) {
    if (!message) {
      // Create placeholder objects to create a nice output.
      var a = new Comparison(actual, keys);
      var b = new Comparison(expected, keys, actual);
      var err = new AssertionError({
        actual: a,
        expected: b,
        operator: 'deepStrictEqual',
        stackStartFn: fn
      });
      err.actual = actual;
      err.expected = expected;
      err.operator = fn.name;
      throw err;
    }
    innerFail({
      actual: actual,
      expected: expected,
      message: message,
      operator: fn.name,
      stackStartFn: fn
    });
  }
}
function expectedException(actual, expected, msg, fn) {
  if (typeof expected !== 'function') {
    if (isRegExp(expected)) return RegExpPrototypeTest(expected, actual);
    // assert.doesNotThrow does not accept objects.
    if (arguments.length === 2) {
      throw new ERR_INVALID_ARG_TYPE('expected', ['Function', 'RegExp'], expected);
    }

    // Handle primitives properly.
    if (_typeof(actual) !== 'object' || actual === null) {
      var err = new AssertionError({
        actual: actual,
        expected: expected,
        message: msg,
        operator: 'deepStrictEqual',
        stackStartFn: fn
      });
      err.operator = fn.name;
      throw err;
    }
    var keys = Object.keys(expected);
    // Special handle errors to make sure the name and the message are compared
    // as well.
    if (expected instanceof Error) {
      keys.push('name', 'message');
    } else if (keys.length === 0) {
      throw new ERR_INVALID_ARG_VALUE('error', expected, 'may not be an empty object');
    }
    if (isDeepEqual === undefined) lazyLoadComparison();
    keys.forEach(function (key) {
      if (typeof actual[key] === 'string' && isRegExp(expected[key]) && RegExpPrototypeTest(expected[key], actual[key])) {
        return;
      }
      compareExceptionKey(actual, expected, key, msg, keys, fn);
    });
    return true;
  }
  // Guard instanceof against arrow functions as they don't have a prototype.
  if (expected.prototype !== undefined && actual instanceof expected) {
    return true;
  }
  if (Error.isPrototypeOf(expected)) {
    return false;
  }
  return expected.call({}, actual) === true;
}
function getActual(fn) {
  if (typeof fn !== 'function') {
    throw new ERR_INVALID_ARG_TYPE('fn', 'Function', fn);
  }
  try {
    fn();
  } catch (e) {
    return e;
  }
  return NO_EXCEPTION_SENTINEL;
}
function checkIsPromise(obj) {
  // Accept native ES6 promises and promises that are implemented in a similar
  // way. Do not accept thenables that use a function as `obj` and that have no
  // `catch` handler.

  // TODO: thenables are checked up until they have the correct methods,
  // but according to documentation, the `then` method should receive
  // the `fulfill` and `reject` arguments as well or it may be never resolved.

  return isPromise(obj) || obj !== null && _typeof(obj) === 'object' && typeof obj.then === 'function' && typeof obj.catch === 'function';
}
function waitForActual(promiseFn) {
  return Promise.resolve().then(function () {
    var resultPromise;
    if (typeof promiseFn === 'function') {
      // Return a rejected promise if `promiseFn` throws synchronously.
      resultPromise = promiseFn();
      // Fail in case no promise is returned.
      if (!checkIsPromise(resultPromise)) {
        throw new ERR_INVALID_RETURN_VALUE('instance of Promise', 'promiseFn', resultPromise);
      }
    } else if (checkIsPromise(promiseFn)) {
      resultPromise = promiseFn;
    } else {
      throw new ERR_INVALID_ARG_TYPE('promiseFn', ['Function', 'Promise'], promiseFn);
    }
    return Promise.resolve().then(function () {
      return resultPromise;
    }).then(function () {
      return NO_EXCEPTION_SENTINEL;
    }).catch(function (e) {
      return e;
    });
  });
}
function expectsError(stackStartFn, actual, error, message) {
  if (typeof error === 'string') {
    if (arguments.length === 4) {
      throw new ERR_INVALID_ARG_TYPE('error', ['Object', 'Error', 'Function', 'RegExp'], error);
    }
    if (_typeof(actual) === 'object' && actual !== null) {
      if (actual.message === error) {
        throw new ERR_AMBIGUOUS_ARGUMENT('error/message', "The error message \"".concat(actual.message, "\" is identical to the message."));
      }
    } else if (actual === error) {
      throw new ERR_AMBIGUOUS_ARGUMENT('error/message', "The error \"".concat(actual, "\" is identical to the message."));
    }
    message = error;
    error = undefined;
  } else if (error != null && _typeof(error) !== 'object' && typeof error !== 'function') {
    throw new ERR_INVALID_ARG_TYPE('error', ['Object', 'Error', 'Function', 'RegExp'], error);
  }
  if (actual === NO_EXCEPTION_SENTINEL) {
    var details = '';
    if (error && error.name) {
      details += " (".concat(error.name, ")");
    }
    details += message ? ": ".concat(message) : '.';
    var fnType = stackStartFn.name === 'rejects' ? 'rejection' : 'exception';
    innerFail({
      actual: undefined,
      expected: error,
      operator: stackStartFn.name,
      message: "Missing expected ".concat(fnType).concat(details),
      stackStartFn: stackStartFn
    });
  }
  if (error && !expectedException(actual, error, message, stackStartFn)) {
    throw actual;
  }
}
function expectsNoError(stackStartFn, actual, error, message) {
  if (actual === NO_EXCEPTION_SENTINEL) return;
  if (typeof error === 'string') {
    message = error;
    error = undefined;
  }
  if (!error || expectedException(actual, error)) {
    var details = message ? ": ".concat(message) : '.';
    var fnType = stackStartFn.name === 'doesNotReject' ? 'rejection' : 'exception';
    innerFail({
      actual: actual,
      expected: error,
      operator: stackStartFn.name,
      message: "Got unwanted ".concat(fnType).concat(details, "\n") + "Actual message: \"".concat(actual && actual.message, "\""),
      stackStartFn: stackStartFn
    });
  }
  throw actual;
}
assert.throws = function throws(promiseFn) {
  for (var _len2 = arguments.length, args = new Array(_len2 > 1 ? _len2 - 1 : 0), _key2 = 1; _key2 < _len2; _key2++) {
    args[_key2 - 1] = arguments[_key2];
  }
  expectsError.apply(void 0, [throws, getActual(promiseFn)].concat(args));
};
assert.rejects = function rejects(promiseFn) {
  for (var _len3 = arguments.length, args = new Array(_len3 > 1 ? _len3 - 1 : 0), _key3 = 1; _key3 < _len3; _key3++) {
    args[_key3 - 1] = arguments[_key3];
  }
  return waitForActual(promiseFn).then(function (result) {
    return expectsError.apply(void 0, [rejects, result].concat(args));
  });
};
assert.doesNotThrow = function doesNotThrow(fn) {
  for (var _len4 = arguments.length, args = new Array(_len4 > 1 ? _len4 - 1 : 0), _key4 = 1; _key4 < _len4; _key4++) {
    args[_key4 - 1] = arguments[_key4];
  }
  expectsNoError.apply(void 0, [doesNotThrow, getActual(fn)].concat(args));
};
assert.doesNotReject = function doesNotReject(fn) {
  for (var _len5 = arguments.length, args = new Array(_len5 > 1 ? _len5 - 1 : 0), _key5 = 1; _key5 < _len5; _key5++) {
    args[_key5 - 1] = arguments[_key5];
  }
  return waitForActual(fn).then(function (result) {
    return expectsNoError.apply(void 0, [doesNotReject, result].concat(args));
  });
};
assert.ifError = function ifError(err) {
  if (err !== null && err !== undefined) {
    var message = 'ifError got unwanted exception: ';
    if (_typeof(err) === 'object' && typeof err.message === 'string') {
      if (err.message.length === 0 && err.constructor) {
        message += err.constructor.name;
      } else {
        message += err.message;
      }
    } else {
      message += inspect(err);
    }
    var newErr = new AssertionError({
      actual: err,
      expected: null,
      operator: 'ifError',
      message: message,
      stackStartFn: ifError
    });

    // Make sure we actually have a stack trace!
    var origStack = err.stack;
    if (typeof origStack === 'string') {
      // This will remove any duplicated frames from the error frames taken
      // from within `ifError` and add the original error frames to the newly
      // created ones.
      var tmp2 = origStack.split('\n');
      tmp2.shift();
      // Filter all frames existing in err.stack.
      var tmp1 = newErr.stack.split('\n');
      for (var i = 0; i < tmp2.length; i++) {
        // Find the first occurrence of the frame.
        var pos = tmp1.indexOf(tmp2[i]);
        if (pos !== -1) {
          // Only keep new frames.
          tmp1 = tmp1.slice(0, pos);
          break;
        }
      }
      newErr.stack = "".concat(tmp1.join('\n'), "\n").concat(tmp2.join('\n'));
    }
    throw newErr;
  }
};

// Currently in sync with Node.js lib/assert.js
// https://github.com/nodejs/node/commit/2a871df3dfb8ea663ef5e1f8f62701ec51384ecb
function internalMatch(string, regexp, message, fn, fnName) {
  if (!isRegExp(regexp)) {
    throw new ERR_INVALID_ARG_TYPE('regexp', 'RegExp', regexp);
  }
  var match = fnName === 'match';
  if (typeof string !== 'string' || RegExpPrototypeTest(regexp, string) !== match) {
    if (message instanceof Error) {
      throw message;
    }
    var generatedMessage = !message;

    // 'The input was expected to not match the regular expression ' +
    message = message || (typeof string !== 'string' ? 'The "string" argument must be of type string. Received type ' + "".concat(_typeof(string), " (").concat(inspect(string), ")") : (match ? 'The input did not match the regular expression ' : 'The input was expected to not match the regular expression ') + "".concat(inspect(regexp), ". Input:\n\n").concat(inspect(string), "\n"));
    var err = new AssertionError({
      actual: string,
      expected: regexp,
      message: message,
      operator: fnName,
      stackStartFn: fn
    });
    err.generatedMessage = generatedMessage;
    throw err;
  }
}
assert.match = function match(string, regexp, message) {
  internalMatch(string, regexp, message, match, 'match');
};
assert.doesNotMatch = function doesNotMatch(string, regexp, message) {
  internalMatch(string, regexp, message, doesNotMatch, 'doesNotMatch');
};

// Expose a strict only variant of assert
function strict() {
  for (var _len6 = arguments.length, args = new Array(_len6), _key6 = 0; _key6 < _len6; _key6++) {
    args[_key6] = arguments[_key6];
  }
  innerOk.apply(void 0, [strict, args.length].concat(args));
}
assert.strict = objectAssign(strict, assert, {
  equal: assert.strictEqual,
  deepEqual: assert.deepStrictEqual,
  notEqual: assert.notStrictEqual,
  notDeepEqual: assert.notDeepStrictEqual
});
assert.strict.strict = assert.strict;

/***/ }),

/***/ 4154:
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

"use strict";

var classof = __webpack_require__(6955);

var $TypeError = TypeError;

// Perform ? RequireInternalSlot(argument, [[TypedArrayName]])
// If argument.[[TypedArrayName]] is not "Uint8Array", throw a TypeError exception
module.exports = function (argument) {
  if (classof(argument) === 'Uint8Array') return argument;
  throw new $TypeError('Argument is not an Uint8Array');
};


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

/***/ 4232:
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

"use strict";


var isValue = __webpack_require__(9762);

var keys = Object.keys;

module.exports = function (object) { return keys(isValue(object) ? Object(object) : object); };


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

/***/ 4459:
/***/ ((module) => {

"use strict";


/** @type {import('./isNaN')} */
module.exports = Number.isNaN || function isNaN(a) {
	return a !== a;
};


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

/***/ 4549:
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

"use strict";

var globalThis = __webpack_require__(4576);

// https://github.com/tc39/ecma262/pull/3467
module.exports = function (METHOD_NAME, ExpectedError) {
  var Iterator = globalThis.Iterator;
  var IteratorPrototype = Iterator && Iterator.prototype;
  var method = IteratorPrototype && IteratorPrototype[METHOD_NAME];

  var CLOSED = false;

  if (method) try {
    method.call({
      next: function () { return { done: true }; },
      'return': function () { CLOSED = true; }
    }, -1);
  } catch (error) {
    // https://bugs.webkit.org/show_bug.cgi?id=291195
    if (!(error instanceof ExpectedError)) CLOSED = false;
  }

  if (!CLOSED) return method;
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

/***/ 4644:
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

"use strict";

var NATIVE_ARRAY_BUFFER = __webpack_require__(7811);
var DESCRIPTORS = __webpack_require__(3724);
var globalThis = __webpack_require__(4576);
var isCallable = __webpack_require__(4901);
var isObject = __webpack_require__(34);
var hasOwn = __webpack_require__(9297);
var classof = __webpack_require__(6955);
var tryToString = __webpack_require__(6823);
var createNonEnumerableProperty = __webpack_require__(6699);
var defineBuiltIn = __webpack_require__(6840);
var defineBuiltInAccessor = __webpack_require__(2106);
var isPrototypeOf = __webpack_require__(1625);
var getPrototypeOf = __webpack_require__(2787);
var setPrototypeOf = __webpack_require__(2967);
var wellKnownSymbol = __webpack_require__(8227);
var uid = __webpack_require__(3392);
var InternalStateModule = __webpack_require__(1181);

var enforceInternalState = InternalStateModule.enforce;
var getInternalState = InternalStateModule.get;
var Int8Array = globalThis.Int8Array;
var Int8ArrayPrototype = Int8Array && Int8Array.prototype;
var Uint8ClampedArray = globalThis.Uint8ClampedArray;
var Uint8ClampedArrayPrototype = Uint8ClampedArray && Uint8ClampedArray.prototype;
var TypedArray = Int8Array && getPrototypeOf(Int8Array);
var TypedArrayPrototype = Int8ArrayPrototype && getPrototypeOf(Int8ArrayPrototype);
var ObjectPrototype = Object.prototype;
var TypeError = globalThis.TypeError;

var TO_STRING_TAG = wellKnownSymbol('toStringTag');
var TYPED_ARRAY_TAG = uid('TYPED_ARRAY_TAG');
var TYPED_ARRAY_CONSTRUCTOR = 'TypedArrayConstructor';
// Fixing native typed arrays in Opera Presto crashes the browser, see #595
var NATIVE_ARRAY_BUFFER_VIEWS = NATIVE_ARRAY_BUFFER && !!setPrototypeOf && classof(globalThis.opera) !== 'Opera';
var TYPED_ARRAY_TAG_REQUIRED = false;
var NAME, Constructor, Prototype;

var TypedArrayConstructorsList = {
  Int8Array: 1,
  Uint8Array: 1,
  Uint8ClampedArray: 1,
  Int16Array: 2,
  Uint16Array: 2,
  Int32Array: 4,
  Uint32Array: 4,
  Float32Array: 4,
  Float64Array: 8
};

var BigIntArrayConstructorsList = {
  BigInt64Array: 8,
  BigUint64Array: 8
};

var isView = function isView(it) {
  if (!isObject(it)) return false;
  var klass = classof(it);
  return klass === 'DataView'
    || hasOwn(TypedArrayConstructorsList, klass)
    || hasOwn(BigIntArrayConstructorsList, klass);
};

var getTypedArrayConstructor = function (it) {
  var proto = getPrototypeOf(it);
  if (!isObject(proto)) return;
  var state = getInternalState(proto);
  return (state && hasOwn(state, TYPED_ARRAY_CONSTRUCTOR)) ? state[TYPED_ARRAY_CONSTRUCTOR] : getTypedArrayConstructor(proto);
};

var isTypedArray = function (it) {
  if (!isObject(it)) return false;
  var klass = classof(it);
  return hasOwn(TypedArrayConstructorsList, klass)
    || hasOwn(BigIntArrayConstructorsList, klass);
};

var aTypedArray = function (it) {
  if (isTypedArray(it)) return it;
  throw new TypeError('Target is not a typed array');
};

var aTypedArrayConstructor = function (C) {
  if (isCallable(C) && (!setPrototypeOf || isPrototypeOf(TypedArray, C))) return C;
  throw new TypeError(tryToString(C) + ' is not a typed array constructor');
};

var exportTypedArrayMethod = function (KEY, property, forced, options) {
  if (!DESCRIPTORS) return;
  if (forced) for (var ARRAY in TypedArrayConstructorsList) {
    var TypedArrayConstructor = globalThis[ARRAY];
    if (TypedArrayConstructor && hasOwn(TypedArrayConstructor.prototype, KEY)) try {
      delete TypedArrayConstructor.prototype[KEY];
    } catch (error) {
      // old WebKit bug - some methods are non-configurable
      try {
        TypedArrayConstructor.prototype[KEY] = property;
      } catch (error2) { /* empty */ }
    }
  }
  if (!TypedArrayPrototype[KEY] || forced) {
    defineBuiltIn(TypedArrayPrototype, KEY, forced ? property
      : NATIVE_ARRAY_BUFFER_VIEWS && Int8ArrayPrototype[KEY] || property, options);
  }
};

var exportTypedArrayStaticMethod = function (KEY, property, forced) {
  var ARRAY, TypedArrayConstructor;
  if (!DESCRIPTORS) return;
  if (setPrototypeOf) {
    if (forced) for (ARRAY in TypedArrayConstructorsList) {
      TypedArrayConstructor = globalThis[ARRAY];
      if (TypedArrayConstructor && hasOwn(TypedArrayConstructor, KEY)) try {
        delete TypedArrayConstructor[KEY];
      } catch (error) { /* empty */ }
    }
    if (!TypedArray[KEY] || forced) {
      // V8 ~ Chrome 49-50 `%TypedArray%` methods are non-writable non-configurable
      try {
        return defineBuiltIn(TypedArray, KEY, forced ? property : NATIVE_ARRAY_BUFFER_VIEWS && TypedArray[KEY] || property);
      } catch (error) { /* empty */ }
    } else return;
  }
  for (ARRAY in TypedArrayConstructorsList) {
    TypedArrayConstructor = globalThis[ARRAY];
    if (TypedArrayConstructor && (!TypedArrayConstructor[KEY] || forced)) {
      defineBuiltIn(TypedArrayConstructor, KEY, property);
    }
  }
};

for (NAME in TypedArrayConstructorsList) {
  Constructor = globalThis[NAME];
  Prototype = Constructor && Constructor.prototype;
  if (Prototype) enforceInternalState(Prototype)[TYPED_ARRAY_CONSTRUCTOR] = Constructor;
  else NATIVE_ARRAY_BUFFER_VIEWS = false;
}

for (NAME in BigIntArrayConstructorsList) {
  Constructor = globalThis[NAME];
  Prototype = Constructor && Constructor.prototype;
  if (Prototype) enforceInternalState(Prototype)[TYPED_ARRAY_CONSTRUCTOR] = Constructor;
}

// WebKit bug - typed arrays constructors prototype is Object.prototype
if (!NATIVE_ARRAY_BUFFER_VIEWS || !isCallable(TypedArray) || TypedArray === Function.prototype) {
  // eslint-disable-next-line no-shadow -- safe
  TypedArray = function TypedArray() {
    throw new TypeError('Incorrect invocation');
  };
  if (NATIVE_ARRAY_BUFFER_VIEWS) for (NAME in TypedArrayConstructorsList) {
    if (globalThis[NAME]) setPrototypeOf(globalThis[NAME], TypedArray);
  }
}

if (!NATIVE_ARRAY_BUFFER_VIEWS || !TypedArrayPrototype || TypedArrayPrototype === ObjectPrototype) {
  TypedArrayPrototype = TypedArray.prototype;
  if (NATIVE_ARRAY_BUFFER_VIEWS) for (NAME in TypedArrayConstructorsList) {
    if (globalThis[NAME]) setPrototypeOf(globalThis[NAME].prototype, TypedArrayPrototype);
  }
}

// WebKit bug - one more object in Uint8ClampedArray prototype chain
if (NATIVE_ARRAY_BUFFER_VIEWS && getPrototypeOf(Uint8ClampedArrayPrototype) !== TypedArrayPrototype) {
  setPrototypeOf(Uint8ClampedArrayPrototype, TypedArrayPrototype);
}

if (DESCRIPTORS && !hasOwn(TypedArrayPrototype, TO_STRING_TAG)) {
  TYPED_ARRAY_TAG_REQUIRED = true;
  defineBuiltInAccessor(TypedArrayPrototype, TO_STRING_TAG, {
    configurable: true,
    get: function () {
      return isObject(this) ? this[TYPED_ARRAY_TAG] : undefined;
    }
  });
  for (NAME in TypedArrayConstructorsList) if (globalThis[NAME]) {
    createNonEnumerableProperty(globalThis[NAME], TYPED_ARRAY_TAG, NAME);
  }
}

module.exports = {
  NATIVE_ARRAY_BUFFER_VIEWS: NATIVE_ARRAY_BUFFER_VIEWS,
  TYPED_ARRAY_TAG: TYPED_ARRAY_TAG_REQUIRED && TYPED_ARRAY_TAG,
  aTypedArray: aTypedArray,
  aTypedArrayConstructor: aTypedArrayConstructor,
  exportTypedArrayMethod: exportTypedArrayMethod,
  exportTypedArrayStaticMethod: exportTypedArrayStaticMethod,
  getTypedArrayConstructor: getTypedArrayConstructor,
  isView: isView,
  isTypedArray: isTypedArray,
  TypedArray: TypedArray,
  TypedArrayPrototype: TypedArrayPrototype
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

/***/ 4692:
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

"use strict";
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   A: () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var core_js_modules_es_array_push_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(4114);
/* harmony import */ var _packaging_metadata__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(8534);
/* harmony import */ var _packaging_manifest__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(9798);
/* harmony import */ var _packaging_spine__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(6116);
/* harmony import */ var _utils_core__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(9046);






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
    this.metadata = new _packaging_metadata__WEBPACK_IMPORTED_MODULE_1__/* ["default"] */ .A();
    /**
     * @member {Manifest} manifest
     * @memberof Packaging
     * @readonly
     */
    this.manifest = new _packaging_manifest__WEBPACK_IMPORTED_MODULE_2__/* ["default"] */ .A();
    /**
     * @member {Spine} spine
     * @memberof Packaging
     * @readonly
     */
    this.spine = new _packaging_spine__WEBPACK_IMPORTED_MODULE_3__/* ["default"] */ .A();
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
    const metadataNode = (0,_utils_core__WEBPACK_IMPORTED_MODULE_4__.qs)(packageXml, "metadata");
    if (!metadataNode) {
      throw new Error("No Metadata Found");
    }
    const manifestNode = (0,_utils_core__WEBPACK_IMPORTED_MODULE_4__.qs)(packageXml, "manifest");
    if (!manifestNode) {
      throw new Error("No Manifest Found");
    }
    const spineNode = (0,_utils_core__WEBPACK_IMPORTED_MODULE_4__.qs)(packageXml, "spine");
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
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (Packaging);

/***/ }),

/***/ 4732:
/***/ ((__unused_webpack_module, __unused_webpack_exports, __webpack_require__) => {

"use strict";

var ArrayBufferViewCore = __webpack_require__(4644);
var uncurryThis = __webpack_require__(9504);
var aCallable = __webpack_require__(9306);
var arrayFromConstructorAndList = __webpack_require__(5370);

var aTypedArray = ArrayBufferViewCore.aTypedArray;
var getTypedArrayConstructor = ArrayBufferViewCore.getTypedArrayConstructor;
var exportTypedArrayMethod = ArrayBufferViewCore.exportTypedArrayMethod;
var sort = uncurryThis(ArrayBufferViewCore.TypedArrayPrototype.sort);

// `%TypedArray%.prototype.toSorted` method
// https://tc39.es/ecma262/#sec-%typedarray%.prototype.tosorted
exportTypedArrayMethod('toSorted', function toSorted(compareFn) {
  if (compareFn !== undefined) aCallable(compareFn);
  var O = aTypedArray(this);
  var A = arrayFromConstructorAndList(getTypedArrayConstructor(O), O);
  return sort(A, compareFn);
});


/***/ }),

/***/ 4776:
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

"use strict";
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   A: () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _utils_core__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(9046);


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
    (0,_utils_core__WEBPACK_IMPORTED_MODULE_0__.extend)(this, props || {});
    return this;
  }
}
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (Location);

/***/ }),

/***/ 4840:
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

/** Detect free variable `global` from Node.js. */
var freeGlobal = typeof __webpack_require__.g == 'object' && __webpack_require__.g && __webpack_require__.g.Object === Object && __webpack_require__.g;

module.exports = freeGlobal;


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

/***/ 5263:
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

"use strict";
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   A: () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var core_js_modules_es_array_push_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(4114);
/* harmony import */ var core_js_modules_es_iterator_constructor_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(8111);
/* harmony import */ var core_js_modules_es_iterator_for_each_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(7588);
/* harmony import */ var _epubcfi__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(7421);
/* harmony import */ var _utils_core__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(9046);






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
    this.epubcfi = new _epubcfi__WEBPACK_IMPORTED_MODULE_3__/* ["default"] */ .A();
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
    const navItems = node ? (0,_utils_core__WEBPACK_IMPORTED_MODULE_4__.qsa)(node, "li") : [];
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
    const content = (0,_utils_core__WEBPACK_IMPORTED_MODULE_4__.qs)(node, "a");
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
    const pageTargets = (0,_utils_core__WEBPACK_IMPORTED_MODULE_4__.qsa)(node, "pageTarget") || [];
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
    const navLabel = (0,_utils_core__WEBPACK_IMPORTED_MODULE_4__.qs)(node, "navLabel");
    const navLabelText = (0,_utils_core__WEBPACK_IMPORTED_MODULE_4__.qs)(navLabel, "text");
    const pageText = navLabelText.textContent;
    const content = (0,_utils_core__WEBPACK_IMPORTED_MODULE_4__.qs)(node, "content");
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
      index = (0,_utils_core__WEBPACK_IMPORTED_MODULE_4__.indexOfSorted)(cfi, this.locations, this.epubcfi.compare);
    if (index != -1) {
      pg = this.pages[index];
    } else {
      // Otherwise add it to the list of locations
      // Insert it in the correct position in the locations page
      index = (0,_utils_core__WEBPACK_IMPORTED_MODULE_4__.locationOf)(cfi, this.locations, this.epubcfi.compare);
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
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (PageList);

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

/***/ 5345:
/***/ ((module) => {

"use strict";


/** @type {import('./uri')} */
module.exports = URIError;


/***/ }),

/***/ 5370:
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

"use strict";

var lengthOfArrayLike = __webpack_require__(6198);

module.exports = function (Constructor, list, $length) {
  var index = 0;
  var length = arguments.length > 2 ? $length : lengthOfArrayLike(list);
  var result = new Constructor(length);
  while (length > index) result[index] = list[index++];
  return result;
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

/***/ 5499:
/***/ ((module) => {

"use strict";


module.exports = function (fn) {
	if (typeof fn !== "function") throw new TypeError(fn + " is not a function");
	return fn;
};


/***/ }),

/***/ 5548:
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

"use strict";
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   A: () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _highlight__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(3755);

const NS_URI = "http://www.w3.org/2000/svg";

/**
 * Underline class
 * @extends Highlight
 */
class Underline extends _highlight__WEBPACK_IMPORTED_MODULE_0__/* ["default"] */ .A {
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
      const rect = document.createElementNS(NS_URI, "rect");
      const line = document.createElementNS(NS_URI, "line");
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
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (Underline);

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

/***/ 5623:
/***/ ((__unused_webpack_module, __unused_webpack_exports, __webpack_require__) => {

"use strict";

var $ = __webpack_require__(6518);
var globalThis = __webpack_require__(4576);
var uncurryThis = __webpack_require__(9504);
var anUint8Array = __webpack_require__(4154);
var notDetached = __webpack_require__(5169);

var numberToString = uncurryThis(1.1.toString);

// `Uint8Array.prototype.toHex` method
// https://github.com/tc39/proposal-arraybuffer-base64
if (globalThis.Uint8Array) $({ target: 'Uint8Array', proto: true }, {
  toHex: function toHex() {
    anUint8Array(this);
    notDetached(this.buffer);
    var result = '';
    for (var i = 0, length = this.length; i < length; i++) {
      var hex = numberToString(this[i], 16);
      result += hex.length === 1 ? '0' + hex : hex;
    }
    return result;
  }
});


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

/***/ 5680:
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

"use strict";


var whichTypedArray = __webpack_require__(5767);

/** @type {import('.')} */
module.exports = function isTypedArray(value) {
	return !!whichTypedArray(value);
};


/***/ }),

/***/ 5720:
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

"use strict";
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   JX: () => (/* binding */ EPUBJS_VERSION),
/* harmony export */   py: () => (/* binding */ DOM_EVENTS),
/* harmony export */   qY: () => (/* binding */ EVENTS)
/* harmony export */ });
/**
 * Global constants
 * @module constants
 */

/**
 * epub-js library version
 * @constant
 * @type {string}
 */
const EPUBJS_VERSION = "0.3.96";

/**
 * The DOM events to listen for ...
 * @constant
 * @type {Array}
 */
const DOM_EVENTS = ["keydown", "keyup", "keypressed", "mouseup", "mousedown", "mousemove", "click", "touchend", "touchstart", "touchmove"];

/**
 * Events
 * @constant
 * @type {object}
 */
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

/***/ }),

/***/ 5745:
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

"use strict";

var store = __webpack_require__(7629);

module.exports = function (key, value) {
  return store[key] || (store[key] = value || {});
};


/***/ }),

/***/ 5767:
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

"use strict";


var forEach = __webpack_require__(2682);
var availableTypedArrays = __webpack_require__(9209);
var callBind = __webpack_require__(487);
var callBound = __webpack_require__(6556);
var gOPD = __webpack_require__(5795);
var getProto = __webpack_require__(3628);

var $toString = callBound('Object.prototype.toString');
var hasToStringTag = __webpack_require__(9092)();

var g = typeof globalThis === 'undefined' ? __webpack_require__.g : globalThis;
var typedArrays = availableTypedArrays();

var $slice = callBound('String.prototype.slice');

/** @type {<T = unknown>(array: readonly T[], value: unknown) => number} */
var $indexOf = callBound('Array.prototype.indexOf', true) || function indexOf(array, value) {
	for (var i = 0; i < array.length; i += 1) {
		if (array[i] === value) {
			return i;
		}
	}
	return -1;
};

/** @typedef {import('./types').Getter} Getter */
/** @type {import('./types').Cache} */
var cache = { __proto__: null };
if (hasToStringTag && gOPD && getProto) {
	forEach(typedArrays, function (typedArray) {
		var arr = new g[typedArray]();
		if (Symbol.toStringTag in arr && getProto) {
			var proto = getProto(arr);
			// @ts-expect-error TS won't narrow inside a closure
			var descriptor = gOPD(proto, Symbol.toStringTag);
			if (!descriptor && proto) {
				var superProto = getProto(proto);
				// @ts-expect-error TS won't narrow inside a closure
				descriptor = gOPD(superProto, Symbol.toStringTag);
			}
			// @ts-expect-error TODO: fix
			cache['$' + typedArray] = callBind(descriptor.get);
		}
	});
} else {
	forEach(typedArrays, function (typedArray) {
		var arr = new g[typedArray]();
		var fn = arr.slice || arr.set;
		if (fn) {
			cache[
				/** @type {`$${import('.').TypedArrayName}`} */ ('$' + typedArray)
			] = /** @type {import('./types').BoundSlice | import('./types').BoundSet} */ (
				// @ts-expect-error TODO FIXME
				callBind(fn)
			);
		}
	});
}

/** @type {(value: object) => false | import('.').TypedArrayName} */
var tryTypedArrays = function tryAllTypedArrays(value) {
	/** @type {ReturnType<typeof tryAllTypedArrays>} */ var found = false;
	forEach(
		/** @type {Record<`\$${import('.').TypedArrayName}`, Getter>} */ (cache),
		/** @type {(getter: Getter, name: `\$${import('.').TypedArrayName}`) => void} */
		function (getter, typedArray) {
			if (!found) {
				try {
					// @ts-expect-error a throw is fine here
					if ('$' + getter(value) === typedArray) {
						found = /** @type {import('.').TypedArrayName} */ ($slice(typedArray, 1));
					}
				} catch (e) { /**/ }
			}
		}
	);
	return found;
};

/** @type {(value: object) => false | import('.').TypedArrayName} */
var trySlices = function tryAllSlices(value) {
	/** @type {ReturnType<typeof tryAllSlices>} */ var found = false;
	forEach(
		/** @type {Record<`\$${import('.').TypedArrayName}`, Getter>} */(cache),
		/** @type {(getter: Getter, name: `\$${import('.').TypedArrayName}`) => void} */ function (getter, name) {
			if (!found) {
				try {
					// @ts-expect-error a throw is fine here
					getter(value);
					found = /** @type {import('.').TypedArrayName} */ ($slice(name, 1));
				} catch (e) { /**/ }
			}
		}
	);
	return found;
};

/** @type {import('.')} */
module.exports = function whichTypedArray(value) {
	if (!value || typeof value !== 'object') { return false; }
	if (!hasToStringTag) {
		/** @type {string} */
		var tag = $slice($toString(value), 8, -1);
		if ($indexOf(typedArrays, tag) > -1) {
			return tag;
		}
		if (tag !== 'Object') {
			return false;
		}
		// node < 0.6 hits here on real Typed Arrays
		return trySlices(value);
	}
	if (!gOPD) { return null; } // unknown engine
	return tryTypedArrays(value);
};


/***/ }),

/***/ 5795:
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

"use strict";


/** @type {import('.')} */
var $gOPD = __webpack_require__(6549);

if ($gOPD) {
	try {
		$gOPD([], 'length');
	} catch (e) {
		// IE 8 has a broken gOPD
		$gOPD = null;
	}
}

module.exports = $gOPD;


/***/ }),

/***/ 5854:
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

"use strict";

var toPrimitive = __webpack_require__(2777);

var $TypeError = TypeError;

// `ToBigInt` abstract operation
// https://tc39.es/ecma262/#sec-tobigint
module.exports = function (argument) {
  var prim = toPrimitive(argument, 'number');
  if (typeof prim == 'number') throw new $TypeError("Can't convert number to bigint");
  // eslint-disable-next-line es/no-bigint -- safe
  return BigInt(prim);
};


/***/ }),

/***/ 5871:
/***/ ((__unused_webpack_module, __unused_webpack_exports, __webpack_require__) => {

"use strict";

var uncurryThis = __webpack_require__(9504);
var ArrayBufferViewCore = __webpack_require__(4644);
var arrayFromConstructorAndList = __webpack_require__(5370);
var $arrayUniqueBy = __webpack_require__(1946);

var aTypedArray = ArrayBufferViewCore.aTypedArray;
var getTypedArrayConstructor = ArrayBufferViewCore.getTypedArrayConstructor;
var exportTypedArrayMethod = ArrayBufferViewCore.exportTypedArrayMethod;
var arrayUniqueBy = uncurryThis($arrayUniqueBy);

// `%TypedArray%.prototype.uniqueBy` method
// https://github.com/tc39/proposal-array-unique
exportTypedArrayMethod('uniqueBy', function uniqueBy(resolver) {
  aTypedArray(this);
  return arrayFromConstructorAndList(getTypedArrayConstructor(this), arrayUniqueBy(this, resolver));
}, true);


/***/ }),

/***/ 5880:
/***/ ((module) => {

"use strict";


/** @type {import('./pow')} */
module.exports = Math.pow;


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

/***/ 5976:
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

"use strict";
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   A: () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var core_js_modules_es_iterator_constructor_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(8111);
/* harmony import */ var core_js_modules_es_iterator_for_each_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(7588);
/* harmony import */ var _utils_path__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(1010);
/* harmony import */ var _utils_core__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(9046);





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
    const container = (0,_utils_core__WEBPACK_IMPORTED_MODULE_3__.qs)(doc, "container");
    if (!container) {
      throw new Error("container node not found");
    }
    const rootfile = (0,_utils_core__WEBPACK_IMPORTED_MODULE_3__.qs)(doc, "rootfile");
    if (!rootfile) {
      throw new Error("rootfile node not found");
    }
    this.fullPath = rootfile.getAttribute("full-path");
    this.directory = _utils_path__WEBPACK_IMPORTED_MODULE_2__/* ["default"] */ .A.prototype.dirname(this.fullPath);
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
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (Container);

/***/ }),

/***/ 6011:
/***/ ((module) => {

"use strict";


// eslint-disable-next-line no-empty-function
module.exports = function () {};


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

/***/ 6116:
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

"use strict";
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   A: () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var core_js_modules_es_iterator_constructor_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(8111);
/* harmony import */ var core_js_modules_es_iterator_for_each_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(7588);
/* harmony import */ var core_js_modules_esnext_map_delete_all_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(1517);
/* harmony import */ var core_js_modules_esnext_map_emplace_js__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(1379);
/* harmony import */ var core_js_modules_esnext_map_every_js__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(3777);
/* harmony import */ var core_js_modules_esnext_map_filter_js__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(4190);
/* harmony import */ var core_js_modules_esnext_map_find_js__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(2359);
/* harmony import */ var core_js_modules_esnext_map_find_key_js__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(6097);
/* harmony import */ var core_js_modules_esnext_map_get_or_insert_js__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(7254);
/* harmony import */ var core_js_modules_esnext_map_get_or_insert_computed_js__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(7036);
/* harmony import */ var core_js_modules_esnext_map_includes_js__WEBPACK_IMPORTED_MODULE_10__ = __webpack_require__(7273);
/* harmony import */ var core_js_modules_esnext_map_key_of_js__WEBPACK_IMPORTED_MODULE_11__ = __webpack_require__(7415);
/* harmony import */ var core_js_modules_esnext_map_map_keys_js__WEBPACK_IMPORTED_MODULE_12__ = __webpack_require__(9929);
/* harmony import */ var core_js_modules_esnext_map_map_values_js__WEBPACK_IMPORTED_MODULE_13__ = __webpack_require__(7583);
/* harmony import */ var core_js_modules_esnext_map_merge_js__WEBPACK_IMPORTED_MODULE_14__ = __webpack_require__(5122);
/* harmony import */ var core_js_modules_esnext_map_reduce_js__WEBPACK_IMPORTED_MODULE_15__ = __webpack_require__(230);
/* harmony import */ var core_js_modules_esnext_map_some_js__WEBPACK_IMPORTED_MODULE_16__ = __webpack_require__(7268);
/* harmony import */ var core_js_modules_esnext_map_update_js__WEBPACK_IMPORTED_MODULE_17__ = __webpack_require__(9733);
/* harmony import */ var _utils_core__WEBPACK_IMPORTED_MODULE_18__ = __webpack_require__(9046);




















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
    this.nodeIndex = (0,_utils_core__WEBPACK_IMPORTED_MODULE_18__.indexOfNode)(node, Node.ELEMENT_NODE);
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
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (Spine);

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

/***/ 6188:
/***/ ((module) => {

"use strict";


/** @type {import('./max')} */
module.exports = Math.max;


/***/ }),

/***/ 6193:
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

"use strict";

var ENVIRONMENT = __webpack_require__(4215);

module.exports = ENVIRONMENT === 'NODE';


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

/***/ 6269:
/***/ ((module) => {

"use strict";

module.exports = {};


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

/***/ 6361:
/***/ ((module) => {

"use strict";
module.exports = __WEBPACK_EXTERNAL_MODULE__6361__;

/***/ }),

/***/ 6395:
/***/ ((module) => {

"use strict";

module.exports = false;


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

/***/ 6549:
/***/ ((module) => {

"use strict";


/** @type {import('./gOPD')} */
module.exports = Object.getOwnPropertyDescriptor;


/***/ }),

/***/ 6556:
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

"use strict";


var GetIntrinsic = __webpack_require__(453);

var callBindBasic = __webpack_require__(3126);

/** @type {(thisArg: string, searchString: string, position?: number) => number} */
var $indexOf = callBindBasic([GetIntrinsic('%String.prototype.indexOf%')]);

/** @type {import('.')} */
module.exports = function callBoundIntrinsic(name, allowMissing) {
	/* eslint no-extra-parens: 0 */

	var intrinsic = /** @type {(this: unknown, ...args: unknown[]) => unknown} */ (GetIntrinsic(name, !!allowMissing));
	if (typeof intrinsic === 'function' && $indexOf(name, '.prototype.') > -1) {
		return callBindBasic(/** @type {const} */ ([intrinsic]));
	}
	return intrinsic;
};


/***/ }),

/***/ 6573:
/***/ ((__unused_webpack_module, __unused_webpack_exports, __webpack_require__) => {

"use strict";

var DESCRIPTORS = __webpack_require__(3724);
var defineBuiltInAccessor = __webpack_require__(2106);
var isDetached = __webpack_require__(3238);

var ArrayBufferPrototype = ArrayBuffer.prototype;

// `ArrayBuffer.prototype.detached` getter
// https://tc39.es/ecma262/#sec-get-arraybuffer.prototype.detached
if (DESCRIPTORS && !('detached' in ArrayBufferPrototype)) {
  defineBuiltInAccessor(ArrayBufferPrototype, 'detached', {
    configurable: true,
    get: function detached() {
      return isDetached(this);
    }
  });
}


/***/ }),

/***/ 6576:
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

"use strict";


var getPolyfill = __webpack_require__(9394);
var define = __webpack_require__(8452);

module.exports = function shimObjectIs() {
	var polyfill = getPolyfill();
	define(Object, { is: polyfill }, {
		is: function testObjectIs() {
			return Object.is !== polyfill;
		}
	});
	return polyfill;
};


/***/ }),

/***/ 6578:
/***/ ((module) => {

"use strict";


/** @type {import('.')} */
module.exports = [
	'Float16Array',
	'Float32Array',
	'Float64Array',
	'Int8Array',
	'Int16Array',
	'Int32Array',
	'Uint8Array',
	'Uint8ClampedArray',
	'Uint16Array',
	'Uint32Array',
	'BigInt64Array',
	'BigUint64Array'
];


/***/ }),

/***/ 6596:
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

"use strict";


module.exports = __webpack_require__(5339)() ? Object.assign : __webpack_require__(3595);


/***/ }),

/***/ 6642:
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

"use strict";


var implementation = __webpack_require__(3003);

module.exports = function getPolyfill() {
	if (Number.isNaN && Number.isNaN(NaN) && !Number.isNaN('a')) {
		return Number.isNaN;
	}
	return implementation;
};


/***/ }),

/***/ 6698:
/***/ ((module) => {

if (typeof Object.create === 'function') {
  // implementation from standard node.js 'util' module
  module.exports = function inherits(ctor, superCtor) {
    if (superCtor) {
      ctor.super_ = superCtor
      ctor.prototype = Object.create(superCtor.prototype, {
        constructor: {
          value: ctor,
          enumerable: false,
          writable: true,
          configurable: true
        }
      })
    }
  };
} else {
  // old school shim for old browsers
  module.exports = function inherits(ctor, superCtor) {
    if (superCtor) {
      ctor.super_ = superCtor
      var TempCtor = function () {}
      TempCtor.prototype = superCtor.prototype
      ctor.prototype = new TempCtor()
      ctor.prototype.constructor = ctor
    }
  }
}


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

/***/ 6743:
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

"use strict";


var implementation = __webpack_require__(9353);

module.exports = Function.prototype.bind || implementation;


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

/***/ 6838:
/***/ ((module) => {

"use strict";
module.exports = __WEBPACK_EXTERNAL_MODULE__6838__;

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

/***/ 6897:
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

"use strict";


var GetIntrinsic = __webpack_require__(453);
var define = __webpack_require__(41);
var hasDescriptors = __webpack_require__(592)();
var gOPD = __webpack_require__(5795);

var $TypeError = __webpack_require__(9675);
var $floor = GetIntrinsic('%Math.floor%');

/** @type {import('.')} */
module.exports = function setFunctionLength(fn, length) {
	if (typeof fn !== 'function') {
		throw new $TypeError('`fn` is not a function');
	}
	if (typeof length !== 'number' || length < 0 || length > 0xFFFFFFFF || $floor(length) !== length) {
		throw new $TypeError('`length` must be a positive 32-bit integer');
	}

	var loose = arguments.length > 2 && !!arguments[2];

	var functionLengthIsConfigurable = true;
	var functionLengthIsWritable = true;
	if ('length' in fn && gOPD) {
		var desc = gOPD(fn, 'length');
		if (desc && !desc.configurable) {
			functionLengthIsConfigurable = false;
		}
		if (desc && !desc.writable) {
			functionLengthIsWritable = false;
		}
	}

	if (functionLengthIsConfigurable || functionLengthIsWritable || !loose) {
		if (hasDescriptors) {
			define(/** @type {Parameters<define>[0]} */ (fn), 'length', length, true, true);
		} else {
			define(/** @type {Parameters<define>[0]} */ (fn), 'length', length);
		}
	}
	return fn;
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

/***/ 7036:
/***/ ((__unused_webpack_module, __unused_webpack_exports, __webpack_require__) => {

"use strict";

var $ = __webpack_require__(6518);
var aCallable = __webpack_require__(9306);
var aMap = __webpack_require__(6194);
var MapHelpers = __webpack_require__(2248);

var get = MapHelpers.get;
var has = MapHelpers.has;
var set = MapHelpers.set;

// `Map.prototype.getOrInsertComputed` method
// https://github.com/tc39/proposal-upsert
$({ target: 'Map', proto: true, real: true, forced: true }, {
  getOrInsertComputed: function getOrInsertComputed(key, callbackfn) {
    aMap(this);
    aCallable(callbackfn);
    if (has(this, key)) return get(this, key);
    // CanonicalizeKeyedCollectionKey
    if (key === 0 && 1 / key === -Infinity) key = 0;
    var value = callbackfn(key);
    set(this, key, value);
    return value;
  }
});


/***/ }),

/***/ 7040:
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

"use strict";

/* eslint-disable es/no-symbol -- required for testing */
var NATIVE_SYMBOL = __webpack_require__(4495);

module.exports = NATIVE_SYMBOL &&
  !Symbol.sham &&
  typeof Symbol.iterator == 'symbol';


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

/***/ 7119:
/***/ ((module) => {

"use strict";


/** @type {import('./reflectApply')} */
module.exports = typeof Reflect !== 'undefined' && Reflect && Reflect.apply;


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

/***/ 7173:
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

"use strict";
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   A: () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var core_js_modules_es_iterator_constructor_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(8111);
/* harmony import */ var core_js_modules_es_iterator_for_each_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(7588);
/* harmony import */ var _utils_constants__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(5720);
/* harmony import */ var event_emitter__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(3068);





/**
 * Figures out the CSS values to apply for a layout
 */
class Layout {
  /**
   * Constructor
   * @param {object} [options] 
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
     * @member {string} style
     * @memberof Layout
     * @readonly
     */
    this.style = "paginated";
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
      } else if (opt === "direction" || opt === "orientation") {
        if (typeof value === "string") {
          this[opt] = options[opt];
        } else error(opt);
      } else if (opt === "flow") {
        if (typeof value === "string") {
          switch (value) {
            case "scrolled":
            case "scrolled-continuous":
              this.flow = "scrolled";
              this.axis = "vertical"; // autocomplete
              this.style = "scrolling"; // autocomplete
              this.spread = "none"; // autocomplete
              break;
            case "scrolled-doc":
              this.flow = value;
              this.axis = "vertical"; // autocomplete
              this.style = "scrolling"; // autocomplete
              this.spread = "none"; // autocomplete
              break;
            default:
              this.flow = "paginated";
              this.axis = "horizontal"; // autocomplete
              this.style = "paginated"; // autocomplete
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
      this.emit(_utils_constants__WEBPACK_IMPORTED_MODULE_2__/* .EVENTS */ .qY.LAYOUT.UPDATED, this, options);
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
event_emitter__WEBPACK_IMPORTED_MODULE_3__(Layout.prototype);
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (Layout);

/***/ }),

/***/ 7176:
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

"use strict";


var callBind = __webpack_require__(3126);
var gOPD = __webpack_require__(5795);

var hasProtoAccessor;
try {
	// eslint-disable-next-line no-extra-parens, no-proto
	hasProtoAccessor = /** @type {{ __proto__?: typeof Array.prototype }} */ ([]).__proto__ === Array.prototype;
} catch (e) {
	if (!e || typeof e !== 'object' || !('code' in e) || e.code !== 'ERR_PROTO_ACCESS') {
		throw e;
	}
}

// eslint-disable-next-line no-extra-parens
var desc = !!hasProtoAccessor && gOPD && gOPD(Object.prototype, /** @type {keyof typeof Object.prototype} */ ('__proto__'));

var $Object = Object;
var $getPrototypeOf = $Object.getPrototypeOf;

/** @type {import('./get')} */
module.exports = desc && typeof desc.get === 'function'
	? callBind([desc.get])
	: typeof $getPrototypeOf === 'function'
		? /** @type {import('./get')} */ function getDunder(value) {
			// eslint-disable-next-line eqeqeq
			return $getPrototypeOf(value == null ? value : $Object(value));
		}
		: false;


/***/ }),

/***/ 7244:
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

"use strict";


var hasToStringTag = __webpack_require__(9092)();
var callBound = __webpack_require__(6556);

var $toString = callBound('Object.prototype.toString');

/** @type {import('.')} */
var isStandardArguments = function isArguments(value) {
	if (
		hasToStringTag
		&& value
		&& typeof value === 'object'
		&& Symbol.toStringTag in value
	) {
		return false;
	}
	return $toString(value) === '[object Arguments]';
};

/** @type {import('.')} */
var isLegacyArguments = function isArguments(value) {
	if (isStandardArguments(value)) {
		return true;
	}
	return value !== null
		&& typeof value === 'object'
		&& 'length' in value
		&& typeof value.length === 'number'
		&& value.length >= 0
		&& $toString(value) !== '[object Array]'
		&& 'callee' in value
		&& $toString(value.callee) === '[object Function]';
};

var supportsStandardArguments = (function () {
	return isStandardArguments(arguments);
}());

// @ts-expect-error TODO make this not error
isStandardArguments.isLegacyArguments = isLegacyArguments; // for tests

/** @type {import('.')} */
module.exports = supportsStandardArguments ? isStandardArguments : isLegacyArguments;


/***/ }),

/***/ 7254:
/***/ ((__unused_webpack_module, __unused_webpack_exports, __webpack_require__) => {

"use strict";

var $ = __webpack_require__(6518);
var aMap = __webpack_require__(6194);
var MapHelpers = __webpack_require__(2248);

var get = MapHelpers.get;
var has = MapHelpers.has;
var set = MapHelpers.set;

// `Map.prototype.getOrInsert` method
// https://github.com/tc39/proposal-upsert
$({ target: 'Map', proto: true, real: true, forced: true }, {
  getOrInsert: function getOrInsert(key, value) {
    if (has(aMap(this), key)) return get(this, key);
    set(this, key, value);
    return value;
  }
});


/***/ }),

/***/ 7257:
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

"use strict";
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   A: () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var core_js_modules_es_iterator_constructor_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(8111);
/* harmony import */ var core_js_modules_es_iterator_for_each_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(7588);
/* harmony import */ var core_js_modules_esnext_map_delete_all_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(1517);
/* harmony import */ var core_js_modules_esnext_map_emplace_js__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(1379);
/* harmony import */ var core_js_modules_esnext_map_every_js__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(3777);
/* harmony import */ var core_js_modules_esnext_map_filter_js__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(4190);
/* harmony import */ var core_js_modules_esnext_map_find_js__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(2359);
/* harmony import */ var core_js_modules_esnext_map_find_key_js__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(6097);
/* harmony import */ var core_js_modules_esnext_map_get_or_insert_js__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(7254);
/* harmony import */ var core_js_modules_esnext_map_get_or_insert_computed_js__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(7036);
/* harmony import */ var core_js_modules_esnext_map_includes_js__WEBPACK_IMPORTED_MODULE_10__ = __webpack_require__(7273);
/* harmony import */ var core_js_modules_esnext_map_key_of_js__WEBPACK_IMPORTED_MODULE_11__ = __webpack_require__(7415);
/* harmony import */ var core_js_modules_esnext_map_map_keys_js__WEBPACK_IMPORTED_MODULE_12__ = __webpack_require__(9929);
/* harmony import */ var core_js_modules_esnext_map_map_values_js__WEBPACK_IMPORTED_MODULE_13__ = __webpack_require__(7583);
/* harmony import */ var core_js_modules_esnext_map_merge_js__WEBPACK_IMPORTED_MODULE_14__ = __webpack_require__(5122);
/* harmony import */ var core_js_modules_esnext_map_reduce_js__WEBPACK_IMPORTED_MODULE_15__ = __webpack_require__(230);
/* harmony import */ var core_js_modules_esnext_map_some_js__WEBPACK_IMPORTED_MODULE_16__ = __webpack_require__(7268);
/* harmony import */ var core_js_modules_esnext_map_update_js__WEBPACK_IMPORTED_MODULE_17__ = __webpack_require__(9733);
/* harmony import */ var event_emitter__WEBPACK_IMPORTED_MODULE_18__ = __webpack_require__(3068);
/* harmony import */ var _utils_url__WEBPACK_IMPORTED_MODULE_19__ = __webpack_require__(984);
/* harmony import */ var _utils_constants__WEBPACK_IMPORTED_MODULE_20__ = __webpack_require__(5720);






















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
    const url = new _utils_url__WEBPACK_IMPORTED_MODULE_19__/* ["default"] */ .A(input);
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
    this.emit(_utils_constants__WEBPACK_IMPORTED_MODULE_20__/* .EVENTS */ .qY.THEMES.SELECTED, name, theme);
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
      this.emit(_utils_constants__WEBPACK_IMPORTED_MODULE_20__/* .EVENTS */ .qY.THEMES.INJECTED, key, theme, contents);
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
      this.emit(_utils_constants__WEBPACK_IMPORTED_MODULE_20__/* .EVENTS */ .qY.THEMES.REJECTED, key, theme, contents);
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
event_emitter__WEBPACK_IMPORTED_MODULE_18__(Themes.prototype);
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (Themes);

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

/***/ 7302:
/***/ ((__unused_webpack_module, __unused_webpack_exports, __webpack_require__) => {

"use strict";

// TODO: Remove from `core-js@4`
var ArrayBufferViewCore = __webpack_require__(4644);
var lengthOfArrayLike = __webpack_require__(6198);
var isBigIntArray = __webpack_require__(1108);
var toAbsoluteIndex = __webpack_require__(5610);
var toBigInt = __webpack_require__(5854);
var toIntegerOrInfinity = __webpack_require__(1291);

var aTypedArray = ArrayBufferViewCore.aTypedArray;
var getTypedArrayConstructor = ArrayBufferViewCore.getTypedArrayConstructor;
var exportTypedArrayMethod = ArrayBufferViewCore.exportTypedArrayMethod;
var max = Math.max;
var min = Math.min;

// `%TypedArray%.prototype.toSpliced` method
// https://tc39.es/proposal-change-array-by-copy/#sec-%typedarray%.prototype.toSpliced
exportTypedArrayMethod('toSpliced', function toSpliced(start, deleteCount /* , ...items */) {
  var O = aTypedArray(this);
  var C = getTypedArrayConstructor(O);
  var len = lengthOfArrayLike(O);
  var actualStart = toAbsoluteIndex(start, len);
  var argumentsLength = arguments.length;
  var k = 0;
  var insertCount, actualDeleteCount, thisIsBigIntArray, convertedItems, value, newLen, A;
  if (argumentsLength === 0) {
    insertCount = actualDeleteCount = 0;
  } else if (argumentsLength === 1) {
    insertCount = 0;
    actualDeleteCount = len - actualStart;
  } else {
    actualDeleteCount = min(max(toIntegerOrInfinity(deleteCount), 0), len - actualStart);
    insertCount = argumentsLength - 2;
    if (insertCount) {
      convertedItems = new C(insertCount);
      thisIsBigIntArray = isBigIntArray(convertedItems);
      for (var i = 2; i < argumentsLength; i++) {
        value = arguments[i];
        // FF30- typed arrays doesn't properly convert objects to typed array values
        convertedItems[i - 2] = thisIsBigIntArray ? toBigInt(value) : +value;
      }
    }
  }
  newLen = len + insertCount - actualDeleteCount;
  A = new C(newLen);

  for (; k < actualStart; k++) A[k] = O[k];
  for (; k < actualStart + insertCount; k++) A[k] = convertedItems[k - actualStart];
  for (; k < newLen; k++) A[k] = O[k + actualDeleteCount - insertCount];

  return A;
}, true);


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

/***/ 7350:
/***/ ((__unused_webpack_module, __unused_webpack_exports, __webpack_require__) => {

"use strict";

var ArrayBufferViewCore = __webpack_require__(4644);
var $filterReject = (__webpack_require__(9213).filterReject);
var fromSameTypeAndList = __webpack_require__(9948);

var aTypedArray = ArrayBufferViewCore.aTypedArray;
var exportTypedArrayMethod = ArrayBufferViewCore.exportTypedArrayMethod;

// `%TypedArray%.prototype.filterReject` method
// https://github.com/tc39/proposal-array-filtering
exportTypedArrayMethod('filterReject', function filterReject(callbackfn /* , thisArg */) {
  var list = $filterReject(aTypedArray(this), callbackfn, arguments.length > 1 ? arguments[1] : undefined);
  return fromSameTypeAndList(this, list);
}, true);


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

/***/ 7421:
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

"use strict";
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   A: () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var core_js_modules_es_array_push_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(4114);
/* harmony import */ var core_js_modules_es_iterator_constructor_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(8111);
/* harmony import */ var core_js_modules_es_iterator_filter_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(2489);
/* harmony import */ var core_js_modules_es_iterator_for_each_js__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(7588);
/* harmony import */ var core_js_modules_es_iterator_map_js__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(1701);
/* harmony import */ var _utils_rangeobject__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(2955);
/* harmony import */ var _utils_core__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(9046);








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
      offset: (0,_utils_core__WEBPACK_IMPORTED_MODULE_6__.isNumber)(num) ? num : null
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
        children = (0,_utils_core__WEBPACK_IMPORTED_MODULE_6__.findChildren)(node.parentNode);
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
      range = new _utils_rangeobject__WEBPACK_IMPORTED_MODULE_5__/* ["default"] */ .A();
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
          const children = container.children || (0,_utils_core__WEBPACK_IMPORTED_MODULE_6__.findChildren)(container);
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
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (EpubCFI);

/***/ }),

/***/ 7433:
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

"use strict";

var isArray = __webpack_require__(4376);
var isConstructor = __webpack_require__(3517);
var isObject = __webpack_require__(34);
var wellKnownSymbol = __webpack_require__(8227);

var SPECIES = wellKnownSymbol('species');
var $Array = Array;

// a part of `ArraySpeciesCreate` abstract operation
// https://tc39.es/ecma262/#sec-arrayspeciescreate
module.exports = function (originalArray) {
  var C;
  if (isArray(originalArray)) {
    C = originalArray.constructor;
    // cross-realm fallback
    if (isConstructor(C) && (C === $Array || isArray(C.prototype))) C = undefined;
    else if (isObject(C)) {
      C = C[SPECIES];
      if (C === null) C = undefined;
    }
  } return C === undefined ? $Array : C;
};


/***/ }),

/***/ 7467:
/***/ ((__unused_webpack_module, __unused_webpack_exports, __webpack_require__) => {

"use strict";

var arrayToReversed = __webpack_require__(7628);
var ArrayBufferViewCore = __webpack_require__(4644);

var aTypedArray = ArrayBufferViewCore.aTypedArray;
var exportTypedArrayMethod = ArrayBufferViewCore.exportTypedArrayMethod;
var getTypedArrayConstructor = ArrayBufferViewCore.getTypedArrayConstructor;

// `%TypedArray%.prototype.toReversed` method
// https://tc39.es/ecma262/#sec-%typedarray%.prototype.toreversed
exportTypedArrayMethod('toReversed', function toReversed() {
  return arrayToReversed(aTypedArray(this), getTypedArrayConstructor(this));
});


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

/***/ 7501:
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

"use strict";
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   A: () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var core_js_modules_es_array_push_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(4114);
/* harmony import */ var _epubcfi__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(7421);
/* harmony import */ var _utils_core__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(9046);




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
      const startRange = new _epubcfi__WEBPACK_IMPORTED_MODULE_1__/* ["default"] */ .A(result.start).toRange(doc);
      const endRange = new _epubcfi__WEBPACK_IMPORTED_MODULE_1__/* ["default"] */ .A(result.end).toRange(doc);
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
        const elPos = (0,_utils_core__WEBPACK_IMPORTED_MODULE_2__.nodeBounds)(node);
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
        const elPos = (0,_utils_core__WEBPACK_IMPORTED_MODULE_2__.nodeBounds)(node);
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
      start: new _epubcfi__WEBPACK_IMPORTED_MODULE_1__/* ["default"] */ .A(startRange, cfiBase).toString(),
      end: new _epubcfi__WEBPACK_IMPORTED_MODULE_1__/* ["default"] */ .A(endRange, cfiBase).toString()
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
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (Mapping);

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

/***/ 7588:
/***/ ((__unused_webpack_module, __unused_webpack_exports, __webpack_require__) => {

"use strict";

var $ = __webpack_require__(6518);
var call = __webpack_require__(9565);
var iterate = __webpack_require__(2652);
var aCallable = __webpack_require__(9306);
var anObject = __webpack_require__(8551);
var getIteratorDirect = __webpack_require__(1767);
var iteratorClose = __webpack_require__(9539);
var iteratorHelperWithoutClosingOnEarlyError = __webpack_require__(4549);

var forEachWithoutClosingOnEarlyError = iteratorHelperWithoutClosingOnEarlyError('forEach', TypeError);

// `Iterator.prototype.forEach` method
// https://tc39.es/ecma262/#sec-iterator.prototype.foreach
$({ target: 'Iterator', proto: true, real: true, forced: forEachWithoutClosingOnEarlyError }, {
  forEach: function forEach(fn) {
    anObject(this);
    try {
      aCallable(fn);
    } catch (error) {
      iteratorClose(this, 'throw', error);
    }

    if (forEachWithoutClosingOnEarlyError) return call(forEachWithoutClosingOnEarlyError, this, fn);

    var record = getIteratorDirect(this);
    var counter = 0;
    iterate(record, function (value) {
      fn(value, counter++);
    }, { IS_RECORD: true });
  }
});


/***/ }),

/***/ 7628:
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

"use strict";

var lengthOfArrayLike = __webpack_require__(6198);

// https://tc39.es/proposal-change-array-by-copy/#sec-array.prototype.toReversed
// https://tc39.es/proposal-change-array-by-copy/#sec-%typedarray%.prototype.toReversed
module.exports = function (O, C) {
  var len = lengthOfArrayLike(O);
  var A = new C(len);
  var k = 0;
  for (; k < len; k++) A[k] = O[len - k - 1];
  return A;
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
  version: '3.43.0',
  mode: IS_PURE ? 'pure' : 'global',
  copyright: '© 2014-2025 Denis Pushkarev (zloirock.ru)',
  license: 'https://github.com/zloirock/core-js/blob/v3.43.0/LICENSE',
  source: 'https://github.com/zloirock/core-js'
});


/***/ }),

/***/ 7653:
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

"use strict";


var define = __webpack_require__(8452);
var callBind = __webpack_require__(487);

var implementation = __webpack_require__(9211);
var getPolyfill = __webpack_require__(9394);
var shim = __webpack_require__(6576);

var polyfill = callBind(getPolyfill(), Object);

define(polyfill, {
	getPolyfill: getPolyfill,
	implementation: implementation,
	shim: shim
});

module.exports = polyfill;


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

/***/ 7706:
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

"use strict";
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   A: () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var event_emitter__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(3068);
/* harmony import */ var _epubcfi__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(7421);
/* harmony import */ var _utils_constants__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(5720);




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
    this.sectionIndex = new _epubcfi__WEBPACK_IMPORTED_MODULE_1__/* ["default"] */ .A(cfiRange).spinePos;
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
    this.emit(_utils_constants__WEBPACK_IMPORTED_MODULE_2__/* .EVENTS */ .qY.ANNOTATION.ATTACH, result);
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
    this.emit(_utils_constants__WEBPACK_IMPORTED_MODULE_2__/* .EVENTS */ .qY.ANNOTATION.DETACH, result);
    return result;
  }

  /**
   * [Not Implemented] Get text of an annotation
   * @TODO: needs implementation in contents
   */
  text() {}
}
event_emitter__WEBPACK_IMPORTED_MODULE_0__(Annotation.prototype);
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (Annotation);

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

/***/ 7811:
/***/ ((module) => {

"use strict";

// eslint-disable-next-line es/no-typed-arrays -- safe
module.exports = typeof ArrayBuffer != 'undefined' && typeof DataView != 'undefined';


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

/***/ 7957:
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

"use strict";

var bind = __webpack_require__(6080);
var uncurryThis = __webpack_require__(9504);
var IndexedObject = __webpack_require__(7055);
var toObject = __webpack_require__(8981);
var toPropertyKey = __webpack_require__(6969);
var lengthOfArrayLike = __webpack_require__(6198);
var objectCreate = __webpack_require__(2360);
var arrayFromConstructorAndList = __webpack_require__(5370);

var $Array = Array;
var push = uncurryThis([].push);

module.exports = function ($this, callbackfn, that, specificConstructor) {
  var O = toObject($this);
  var self = IndexedObject(O);
  var boundFunction = bind(callbackfn, that);
  var target = objectCreate(null);
  var length = lengthOfArrayLike(self);
  var index = 0;
  var Constructor, key, value;
  for (;length > index; index++) {
    value = self[index];
    key = toPropertyKey(boundFunction(value, index, O));
    // in some IE versions, `hasOwnProperty` returns incorrect result on integer keys
    // but since it's a `null` prototype object, we can safely use `in`
    if (key in target) push(target[key], value);
    else target[key] = [value];
  }
  // TODO: Remove this block from `core-js@4`
  if (specificConstructor) {
    Constructor = specificConstructor(O);
    if (Constructor !== $Array) {
      for (key in target) target[key] = arrayFromConstructorAndList(Constructor, target[key]);
    }
  } return target;
};


/***/ }),

/***/ 7961:
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

"use strict";
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   A: () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var core_js_modules_es_iterator_constructor_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(8111);
/* harmony import */ var core_js_modules_es_iterator_for_each_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(7588);
/* harmony import */ var core_js_modules_esnext_map_delete_all_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(1517);
/* harmony import */ var core_js_modules_esnext_map_emplace_js__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(1379);
/* harmony import */ var core_js_modules_esnext_map_every_js__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(3777);
/* harmony import */ var core_js_modules_esnext_map_filter_js__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(4190);
/* harmony import */ var core_js_modules_esnext_map_find_js__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(2359);
/* harmony import */ var core_js_modules_esnext_map_find_key_js__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(6097);
/* harmony import */ var core_js_modules_esnext_map_get_or_insert_js__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(7254);
/* harmony import */ var core_js_modules_esnext_map_get_or_insert_computed_js__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(7036);
/* harmony import */ var core_js_modules_esnext_map_includes_js__WEBPACK_IMPORTED_MODULE_10__ = __webpack_require__(7273);
/* harmony import */ var core_js_modules_esnext_map_key_of_js__WEBPACK_IMPORTED_MODULE_11__ = __webpack_require__(7415);
/* harmony import */ var core_js_modules_esnext_map_map_keys_js__WEBPACK_IMPORTED_MODULE_12__ = __webpack_require__(9929);
/* harmony import */ var core_js_modules_esnext_map_map_values_js__WEBPACK_IMPORTED_MODULE_13__ = __webpack_require__(7583);
/* harmony import */ var core_js_modules_esnext_map_merge_js__WEBPACK_IMPORTED_MODULE_14__ = __webpack_require__(5122);
/* harmony import */ var core_js_modules_esnext_map_reduce_js__WEBPACK_IMPORTED_MODULE_15__ = __webpack_require__(230);
/* harmony import */ var core_js_modules_esnext_map_some_js__WEBPACK_IMPORTED_MODULE_16__ = __webpack_require__(7268);
/* harmony import */ var core_js_modules_esnext_map_update_js__WEBPACK_IMPORTED_MODULE_17__ = __webpack_require__(9733);
/* harmony import */ var _annotation__WEBPACK_IMPORTED_MODULE_18__ = __webpack_require__(7706);




















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
    const annotation = new _annotation__WEBPACK_IMPORTED_MODULE_18__/* ["default"] */ .A(type, cfiRange, options);
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
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (Annotations);

/***/ }),

/***/ 8002:
/***/ ((module) => {

"use strict";


/** @type {import('./min')} */
module.exports = Math.min;


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

/***/ 8068:
/***/ ((module) => {

"use strict";


/** @type {import('./syntax')} */
module.exports = SyntaxError;


/***/ }),

/***/ 8075:
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

"use strict";


var GetIntrinsic = __webpack_require__(453);

var callBind = __webpack_require__(487);

var $indexOf = callBind(GetIntrinsic('String.prototype.indexOf'));

module.exports = function callBoundIntrinsic(name, allowMissing) {
	var intrinsic = GetIntrinsic(name, !!allowMissing);
	if (typeof intrinsic === 'function' && $indexOf(name, '.prototype.') > -1) {
		return callBind(intrinsic);
	}
	return intrinsic;
};


/***/ }),

/***/ 8077:
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

"use strict";
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   A: () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var core_js_modules_es_iterator_constructor_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(8111);
/* harmony import */ var core_js_modules_es_iterator_for_each_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(7588);
/* harmony import */ var core_js_modules_esnext_map_delete_all_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(1517);
/* harmony import */ var core_js_modules_esnext_map_emplace_js__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(1379);
/* harmony import */ var core_js_modules_esnext_map_every_js__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(3777);
/* harmony import */ var core_js_modules_esnext_map_filter_js__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(4190);
/* harmony import */ var core_js_modules_esnext_map_find_js__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(2359);
/* harmony import */ var core_js_modules_esnext_map_find_key_js__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(6097);
/* harmony import */ var core_js_modules_esnext_map_get_or_insert_js__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(7254);
/* harmony import */ var core_js_modules_esnext_map_get_or_insert_computed_js__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(7036);
/* harmony import */ var core_js_modules_esnext_map_includes_js__WEBPACK_IMPORTED_MODULE_10__ = __webpack_require__(7273);
/* harmony import */ var core_js_modules_esnext_map_key_of_js__WEBPACK_IMPORTED_MODULE_11__ = __webpack_require__(7415);
/* harmony import */ var core_js_modules_esnext_map_map_keys_js__WEBPACK_IMPORTED_MODULE_12__ = __webpack_require__(9929);
/* harmony import */ var core_js_modules_esnext_map_map_values_js__WEBPACK_IMPORTED_MODULE_13__ = __webpack_require__(7583);
/* harmony import */ var core_js_modules_esnext_map_merge_js__WEBPACK_IMPORTED_MODULE_14__ = __webpack_require__(5122);
/* harmony import */ var core_js_modules_esnext_map_reduce_js__WEBPACK_IMPORTED_MODULE_15__ = __webpack_require__(230);
/* harmony import */ var core_js_modules_esnext_map_some_js__WEBPACK_IMPORTED_MODULE_16__ = __webpack_require__(7268);
/* harmony import */ var core_js_modules_esnext_map_update_js__WEBPACK_IMPORTED_MODULE_17__ = __webpack_require__(9733);
/* harmony import */ var _events__WEBPACK_IMPORTED_MODULE_18__ = __webpack_require__(1270);



















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
    (0,_events__WEBPACK_IMPORTED_MODULE_18__/* ["default"] */ .A)(this.target, this);
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
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (Marks);

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

/***/ 8111:
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
// https://tc39.es/ecma262/#sec-iterator
$({ global: true, constructor: true, forced: FORCED }, {
  Iterator: IteratorConstructor
});


/***/ }),

/***/ 8175:
/***/ ((module) => {

"use strict";


// ES3 safe
var _undefined = void 0;

module.exports = function (value) { return value !== _undefined && value !== null; };


/***/ }),

/***/ 8184:
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

"use strict";


var callBound = __webpack_require__(6556);
var safeRegexTest = __webpack_require__(9721);
var isFnRegex = safeRegexTest(/^\s*(?:function)?\*/);
var hasToStringTag = __webpack_require__(9092)();
var getProto = __webpack_require__(3628);

var toStr = callBound('Object.prototype.toString');
var fnToStr = callBound('Function.prototype.toString');

var getGeneratorFunc = function () { // eslint-disable-line consistent-return
	if (!hasToStringTag) {
		return false;
	}
	try {
		return Function('return function*() {}')();
	} catch (e) {
	}
};
/** @type {undefined | false | null | GeneratorFunctionConstructor} */
var GeneratorFunction;

/** @type {import('.')} */
module.exports = function isGeneratorFunction(fn) {
	if (typeof fn !== 'function') {
		return false;
	}
	if (isFnRegex(fnToStr(fn))) {
		return true;
	}
	if (!hasToStringTag) {
		var str = toStr(fn);
		return str === '[object GeneratorFunction]';
	}
	if (!getProto) {
		return false;
	}
	if (typeof GeneratorFunction === 'undefined') {
		var generatorFunc = getGeneratorFunc();
		GeneratorFunction = generatorFunc
			// eslint-disable-next-line no-extra-parens
			? /** @type {GeneratorFunctionConstructor} */ (getProto(generatorFunc))
			: false;
	}
	return getProto(fn) === GeneratorFunction;
};


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

/***/ 8237:
/***/ ((__unused_webpack_module, __unused_webpack_exports, __webpack_require__) => {

"use strict";

var $ = __webpack_require__(6518);
var iterate = __webpack_require__(2652);
var aCallable = __webpack_require__(9306);
var anObject = __webpack_require__(8551);
var getIteratorDirect = __webpack_require__(1767);
var iteratorClose = __webpack_require__(9539);
var iteratorHelperWithoutClosingOnEarlyError = __webpack_require__(4549);
var apply = __webpack_require__(8745);
var fails = __webpack_require__(9039);

var $TypeError = TypeError;

// https://bugs.webkit.org/show_bug.cgi?id=291651
var FAILS_ON_INITIAL_UNDEFINED = fails(function () {
  // eslint-disable-next-line es/no-iterator-prototype-reduce, es/no-array-prototype-keys, array-callback-return -- required for testing
  [].keys().reduce(function () { /* empty */ }, undefined);
});

var reduceWithoutClosingOnEarlyError = !FAILS_ON_INITIAL_UNDEFINED && iteratorHelperWithoutClosingOnEarlyError('reduce', $TypeError);

// `Iterator.prototype.reduce` method
// https://tc39.es/ecma262/#sec-iterator.prototype.reduce
$({ target: 'Iterator', proto: true, real: true, forced: FAILS_ON_INITIAL_UNDEFINED || reduceWithoutClosingOnEarlyError }, {
  reduce: function reduce(reducer /* , initialValue */) {
    anObject(this);
    try {
      aCallable(reducer);
    } catch (error) {
      iteratorClose(this, 'throw', error);
    }

    var noInitial = arguments.length < 2;
    var accumulator = noInitial ? undefined : arguments[1];
    if (reduceWithoutClosingOnEarlyError) {
      return apply(reduceWithoutClosingOnEarlyError, this, noInitial ? [reducer] : [reducer, accumulator]);
    }
    var record = getIteratorDirect(this);
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

/***/ 8285:
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

"use strict";
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   A: () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _core__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(9046);


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
    this.id = (0,_core__WEBPACK_IMPORTED_MODULE_0__.uuid)();
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
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (Defer);

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

/***/ 8366:
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

"use strict";
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   A: () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var core_js_modules_es_array_push_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(4114);
/* harmony import */ var event_emitter__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(3068);
/* harmony import */ var localforage__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(6361);
/* harmony import */ var _utils_request__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(3412);
/* harmony import */ var _utils_mime__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(9357);
/* harmony import */ var _utils_defer__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(8285);
/* harmony import */ var _input__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(2575);








/**
 * Handles saving and requesting files from local storage
 * @extends {Input}
 */
class Storage extends _input__WEBPACK_IMPORTED_MODULE_6__/* ["default"] */ .A {
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
    if (localforage__WEBPACK_IMPORTED_MODULE_2__) {
      this.instance = localforage__WEBPACK_IMPORTED_MODULE_2__.createInstance({
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
      return data || (0,_utils_request__WEBPACK_IMPORTED_MODULE_3__/* ["default"] */ .A)(url, "binary").then(result => {
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
      tasks.push((0,_utils_request__WEBPACK_IMPORTED_MODULE_3__/* ["default"] */ .A)(url, type, withCredentials, headers));
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
      const type = mimeType || _utils_mime__WEBPACK_IMPORTED_MODULE_4__/* ["default"] */ .A.lookup(url);
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
      const def = new _utils_defer__WEBPACK_IMPORTED_MODULE_5__/* ["default"] */ .A();
      const reader = new FileReader();
      const type = mimeType || _utils_mime__WEBPACK_IMPORTED_MODULE_4__/* ["default"] */ .A.lookup(url);
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
      const def = new _utils_defer__WEBPACK_IMPORTED_MODULE_5__/* ["default"] */ .A();
      const reader = new FileReader();
      const type = mimeType || _utils_mime__WEBPACK_IMPORTED_MODULE_4__/* ["default"] */ .A.lookup(url);
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
event_emitter__WEBPACK_IMPORTED_MODULE_1__(Storage.prototype);
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (Storage);

/***/ }),

/***/ 8378:
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

"use strict";
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   A: () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var core_js_modules_es_array_buffer_detached_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(6573);
/* harmony import */ var core_js_modules_es_array_buffer_transfer_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(8100);
/* harmony import */ var core_js_modules_es_array_buffer_transfer_to_fixed_length_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(7936);
/* harmony import */ var event_emitter__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(3068);
/* harmony import */ var _utils_core__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(9046);
/* harmony import */ var _utils_defer__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(8285);
/* harmony import */ var _utils_url__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(984);
/* harmony import */ var _utils_path__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(1010);
/* harmony import */ var _locations__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(8823);
/* harmony import */ var _container__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(5976);
/* harmony import */ var _packaging__WEBPACK_IMPORTED_MODULE_10__ = __webpack_require__(4692);
/* harmony import */ var _navigation__WEBPACK_IMPORTED_MODULE_11__ = __webpack_require__(2665);
/* harmony import */ var _resources__WEBPACK_IMPORTED_MODULE_12__ = __webpack_require__(9050);
/* harmony import */ var _rendition__WEBPACK_IMPORTED_MODULE_13__ = __webpack_require__(1619);
/* harmony import */ var _archive__WEBPACK_IMPORTED_MODULE_14__ = __webpack_require__(1261);
/* harmony import */ var _utils_request__WEBPACK_IMPORTED_MODULE_15__ = __webpack_require__(3412);
/* harmony import */ var _epubcfi__WEBPACK_IMPORTED_MODULE_16__ = __webpack_require__(7421);
/* harmony import */ var _storage__WEBPACK_IMPORTED_MODULE_17__ = __webpack_require__(8366);
/* harmony import */ var _utils_constants__WEBPACK_IMPORTED_MODULE_18__ = __webpack_require__(5720);
/* harmony import */ var _sections__WEBPACK_IMPORTED_MODULE_19__ = __webpack_require__(3495);




















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
    this.settings = (0,_utils_core__WEBPACK_IMPORTED_MODULE_4__.extend)({
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
    this.request = this.settings.request.method || _utils_request__WEBPACK_IMPORTED_MODULE_15__/* ["default"] */ .A;
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
    this.storage = new _storage__WEBPACK_IMPORTED_MODULE_17__/* ["default"] */ .A(this.settings.store);
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
    this.container = new _container__WEBPACK_IMPORTED_MODULE_9__/* ["default"] */ .A();
    /**
     * @member {Packaging} packaging
     * @memberof Book
     * @readonly
     */
    this.packaging = new _packaging__WEBPACK_IMPORTED_MODULE_10__/* ["default"] */ .A();
    /**
     * @member {Resources} resources
     * @memberof Book
     * @readonly
     */
    this.resources = new _resources__WEBPACK_IMPORTED_MODULE_12__/* ["default"] */ .A(this.request.bind(this), this.resolve.bind(this), this.settings.replacements);
    /**
     * @member {Sections} sections
     * @memberof Book
     * @readonly
     */
    this.sections = new _sections__WEBPACK_IMPORTED_MODULE_19__/* ["default"] */ .A();
    /**
     * @member {Locations} locations
     * @memberof Book
     * @readonly
     */
    this.locations = new _locations__WEBPACK_IMPORTED_MODULE_8__/* ["default"] */ .A(this.sections, this.load.bind(this));
    /**
     * @member {Navigation} navigation
     * @memberof Book
     * @readonly
     */
    this.navigation = new _navigation__WEBPACK_IMPORTED_MODULE_11__/* ["default"] */ .A();
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
        this.emit(_utils_constants__WEBPACK_IMPORTED_MODULE_18__/* .EVENTS */ .qY.BOOK.OPEN_FAILED, error);
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
    this.opening = new _utils_defer__WEBPACK_IMPORTED_MODULE_5__/* ["default"] */ .A();
    /**
     * @member {Promise<Book>} opened returns after the book is loaded
     * @memberof Book
     * @readonly
     */
    this.opened = this.opening.promise;
    this.loading = {
      packaging: new _utils_defer__WEBPACK_IMPORTED_MODULE_5__/* ["default"] */ .A(),
      resources: new _utils_defer__WEBPACK_IMPORTED_MODULE_5__/* ["default"] */ .A(),
      navigation: new _utils_defer__WEBPACK_IMPORTED_MODULE_5__/* ["default"] */ .A(),
      sections: new _utils_defer__WEBPACK_IMPORTED_MODULE_5__/* ["default"] */ .A(),
      cover: new _utils_defer__WEBPACK_IMPORTED_MODULE_5__/* ["default"] */ .A()
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
      this.url = new _utils_url__WEBPACK_IMPORTED_MODULE_6__/* ["default"] */ .A("/", "");
      opening = this.openEpub(input);
    } else if (type === INPUT_TYPE.BASE64) {
      this.archived = true;
      this.url = new _utils_url__WEBPACK_IMPORTED_MODULE_6__/* ["default"] */ .A("/", "");
      opening = this.openEpub(input, type);
    } else if (type === INPUT_TYPE.EPUB) {
      this.archived = true;
      this.url = new _utils_url__WEBPACK_IMPORTED_MODULE_6__/* ["default"] */ .A("/", "");
      opening = this.request(input, "binary", this.settings.request.withCredentials, this.settings.request.headers).then(this.openEpub.bind(this));
    } else {
      this.url = new _utils_url__WEBPACK_IMPORTED_MODULE_6__/* ["default"] */ .A(input);
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
    this.path = new _utils_path__WEBPACK_IMPORTED_MODULE_7__/* ["default"] */ .A(url);
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
    const path = new _utils_url__WEBPACK_IMPORTED_MODULE_6__/* ["default"] */ .A(input).path;
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
      options = (0,_utils_core__WEBPACK_IMPORTED_MODULE_4__.extend)({
        method
      }, options || {});
    }
    this.rendition = new _rendition__WEBPACK_IMPORTED_MODULE_13__/* ["default"] */ .A(this, options);
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
    this.archive = new _archive__WEBPACK_IMPORTED_MODULE_14__/* ["default"] */ .A();
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
    const cfi = new _epubcfi__WEBPACK_IMPORTED_MODULE_16__/* ["default"] */ .A(cfiRange);
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
    return `epubjs:${_utils_constants__WEBPACK_IMPORTED_MODULE_18__/* .EPUBJS_VERSION */ .JX}:${ident}`;
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
event_emitter__WEBPACK_IMPORTED_MODULE_3__(Book.prototype);
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (Book);

/***/ }),

/***/ 8403:
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

"use strict";


// modified from https://github.com/es-shims/es6-shim
var objectKeys = __webpack_require__(1189);
var hasSymbols = __webpack_require__(1333)();
var callBound = __webpack_require__(6556);
var $Object = __webpack_require__(9612);
var $push = callBound('Array.prototype.push');
var $propIsEnumerable = callBound('Object.prototype.propertyIsEnumerable');
var originalGetSymbols = hasSymbols ? $Object.getOwnPropertySymbols : null;

// eslint-disable-next-line no-unused-vars
module.exports = function assign(target, source1) {
	if (target == null) { throw new TypeError('target must be an object'); }
	var to = $Object(target); // step 1
	if (arguments.length === 1) {
		return to; // step 2
	}
	for (var s = 1; s < arguments.length; ++s) {
		var from = $Object(arguments[s]); // step 3.a.i

		// step 3.a.ii:
		var keys = objectKeys(from);
		var getSymbols = hasSymbols && ($Object.getOwnPropertySymbols || originalGetSymbols);
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


/***/ }),

/***/ 8452:
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

"use strict";


var keys = __webpack_require__(1189);
var hasSymbols = typeof Symbol === 'function' && typeof Symbol('foo') === 'symbol';

var toStr = Object.prototype.toString;
var concat = Array.prototype.concat;
var defineDataProperty = __webpack_require__(41);

var isFunction = function (fn) {
	return typeof fn === 'function' && toStr.call(fn) === '[object Function]';
};

var supportsDescriptors = __webpack_require__(592)();

var defineProperty = function (object, name, value, predicate) {
	if (name in object) {
		if (predicate === true) {
			if (object[name] === value) {
				return;
			}
		} else if (!isFunction(predicate) || !predicate()) {
			return;
		}
	}

	if (supportsDescriptors) {
		defineDataProperty(object, name, value, true);
	} else {
		defineDataProperty(object, name, value);
	}
};

var defineProperties = function (object, map) {
	var predicates = arguments.length > 2 ? arguments[2] : {};
	var props = keys(map);
	if (hasSymbols) {
		props = concat.call(props, Object.getOwnPropertySymbols(map));
	}
	for (var i = 0; i < props.length; i += 1) {
		defineProperty(object, props[i], map[props[i]], predicates[props[i]]);
	}
};

defineProperties.supportsDescriptors = !!supportsDescriptors;

module.exports = defineProperties;


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

/***/ 8510:
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

"use strict";
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   A: () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var core_js_modules_es_array_push_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(4114);
/* harmony import */ var core_js_modules_es_iterator_constructor_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(8111);
/* harmony import */ var core_js_modules_es_iterator_for_each_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(7588);



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
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (Hook);

/***/ }),

/***/ 8534:
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

"use strict";
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   A: () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var core_js_modules_es_iterator_constructor_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(8111);
/* harmony import */ var core_js_modules_es_iterator_for_each_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(7588);
/* harmony import */ var core_js_modules_esnext_map_delete_all_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(1517);
/* harmony import */ var core_js_modules_esnext_map_emplace_js__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(1379);
/* harmony import */ var core_js_modules_esnext_map_every_js__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(3777);
/* harmony import */ var core_js_modules_esnext_map_filter_js__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(4190);
/* harmony import */ var core_js_modules_esnext_map_find_js__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(2359);
/* harmony import */ var core_js_modules_esnext_map_find_key_js__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(6097);
/* harmony import */ var core_js_modules_esnext_map_get_or_insert_js__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(7254);
/* harmony import */ var core_js_modules_esnext_map_get_or_insert_computed_js__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(7036);
/* harmony import */ var core_js_modules_esnext_map_includes_js__WEBPACK_IMPORTED_MODULE_10__ = __webpack_require__(7273);
/* harmony import */ var core_js_modules_esnext_map_key_of_js__WEBPACK_IMPORTED_MODULE_11__ = __webpack_require__(7415);
/* harmony import */ var core_js_modules_esnext_map_map_keys_js__WEBPACK_IMPORTED_MODULE_12__ = __webpack_require__(9929);
/* harmony import */ var core_js_modules_esnext_map_map_values_js__WEBPACK_IMPORTED_MODULE_13__ = __webpack_require__(7583);
/* harmony import */ var core_js_modules_esnext_map_merge_js__WEBPACK_IMPORTED_MODULE_14__ = __webpack_require__(5122);
/* harmony import */ var core_js_modules_esnext_map_reduce_js__WEBPACK_IMPORTED_MODULE_15__ = __webpack_require__(230);
/* harmony import */ var core_js_modules_esnext_map_some_js__WEBPACK_IMPORTED_MODULE_16__ = __webpack_require__(7268);
/* harmony import */ var core_js_modules_esnext_map_update_js__WEBPACK_IMPORTED_MODULE_17__ = __webpack_require__(9733);


















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
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (Metadata);

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

/***/ 8574:
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

"use strict";

var uncurryThis = __webpack_require__(9504);

var $Error = Error;
var replace = uncurryThis(''.replace);

var TEST = (function (arg) { return String(new $Error(arg).stack); })('zxcasd');
// eslint-disable-next-line redos/no-vulnerable, sonarjs/slow-regex -- safe
var V8_OR_CHAKRA_STACK_ENTRY = /\n\s*at [^:]*:[^\n]*/;
var IS_V8_OR_CHAKRA_STACK = V8_OR_CHAKRA_STACK_ENTRY.test(TEST);

module.exports = function (stack, dropEntries) {
  if (IS_V8_OR_CHAKRA_STACK && typeof stack == 'string' && !$Error.prepareStackTrace) {
    while (dropEntries--) stack = replace(stack, V8_OR_CHAKRA_STACK_ENTRY, '');
  } return stack;
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

/***/ 8648:
/***/ ((module) => {

"use strict";


/** @type {import('./Reflect.getPrototypeOf')} */
module.exports = (typeof Reflect !== 'undefined' && Reflect.getPrototypeOf) || null;


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

/***/ 8745:
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

"use strict";

var NATIVE_BIND = __webpack_require__(616);

var FunctionPrototype = Function.prototype;
var apply = FunctionPrototype.apply;
var call = FunctionPrototype.call;

// eslint-disable-next-line es/no-function-prototype-bind, es/no-reflect -- safe
module.exports = typeof Reflect == 'object' && Reflect.apply || (NATIVE_BIND ? call.bind(apply) : function () {
  return call.apply(apply, arguments);
});


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

/***/ 8797:
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

"use strict";
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   A: () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var core_js_modules_es_iterator_constructor_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(8111);
/* harmony import */ var core_js_modules_es_iterator_for_each_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(7588);
/* harmony import */ var event_emitter__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(3068);
/* harmony import */ var _contents__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(8905);
/* harmony import */ var _utils_defer__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(8285);
/* harmony import */ var _utils_constants__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(5720);
/* harmony import */ var _utils_core__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(9046);
/* harmony import */ var _marks_pane_marks__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(8077);
/* harmony import */ var _marks_pane_highlight__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(3755);
/* harmony import */ var _marks_pane_underline__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(5548);











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
    this.settings = (0,_utils_core__WEBPACK_IMPORTED_MODULE_6__.extend)({
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
    this.id = "vc-" + (0,_utils_core__WEBPACK_IMPORTED_MODULE_6__.uuid)();
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
    const def = new _utils_defer__WEBPACK_IMPORTED_MODULE_4__/* ["default"] */ .A();
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
      this.emit(_utils_constants__WEBPACK_IMPORTED_MODULE_5__/* .EVENTS */ .qY.VIEWS.LOAD_ERROR, err);
      def.reject(err);
    }).then(() => {
      /**
       * @event rendered
       * @param {IframeView} view
       * @memberof IframeView
       */
      this.emit(_utils_constants__WEBPACK_IMPORTED_MODULE_5__/* .EVENTS */ .qY.VIEWS.RENDERED, this);
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
    if (this.layout.axis === "horizontal") {
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
      this.emit(_utils_constants__WEBPACK_IMPORTED_MODULE_5__/* .EVENTS */ .qY.VIEWS.WRITING_MODE, mode);
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
    const pw = this.layout.pageWidth;
    if (this.layout.flow === "paginated") {
      if (sz.width % pw > 0) {
        sz.width = Math.ceil(sz.width / pw) * pw;
      }
      if (this.settings.forceEvenPages) {
        const columns = sz.width / pw;
        if (this.layout.divisor > 1 && this.layout.name === "reflowable" && columns % 2 > 0) {
          // add a blank page
          sz.width += pw;
        }
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
    const loading = new _utils_defer__WEBPACK_IMPORTED_MODULE_4__/* ["default"] */ .A();
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
      this.blobUrl = (0,_utils_core__WEBPACK_IMPORTED_MODULE_6__.createBlobUrl)(contents, "application/xhtml+xml");
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
    this.contents = new _contents__WEBPACK_IMPORTED_MODULE_3__/* ["default"] */ .A(this.document, this.document.body, this.section);
    let link = this.document.querySelector("link[rel='canonical']");
    if (link) {
      link.setAttribute("href", this.section.canonical);
    } else {
      link = this.document.createElement("link");
      link.setAttribute("rel", "canonical");
      link.setAttribute("href", this.section.canonical);
      this.document.head.appendChild(link);
    }
    this.contents.on(_utils_constants__WEBPACK_IMPORTED_MODULE_5__/* .EVENTS */ .qY.CONTENTS.RESIZED, rect => {
      /**
       * @event resized
       * @param {object} rect
       * @memberof IframeView
       */
      this.emit(_utils_constants__WEBPACK_IMPORTED_MODULE_5__/* .EVENTS */ .qY.VIEWS.RESIZED, rect);
    });
    defer.resolve(this.contents);
  }

  /**
   * display
   * @param {Function} request 
   * @returns {Promise<view>} displayed promise
   */
  display(request) {
    const displayed = new _utils_defer__WEBPACK_IMPORTED_MODULE_4__/* ["default"] */ .A();
    if (this.displayed) {
      displayed.resolve(this);
    } else {
      this.render(request).then(() => {
        /**
         * @event displayed
         * @memberof IframeView
         */
        this.emit(_utils_constants__WEBPACK_IMPORTED_MODULE_5__/* .EVENTS */ .qY.VIEWS.DISPLAYED);
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
    this.emit(_utils_constants__WEBPACK_IMPORTED_MODULE_5__/* .EVENTS */ .qY.VIEWS.SHOWN, this);
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
    this.emit(_utils_constants__WEBPACK_IMPORTED_MODULE_5__/* .EVENTS */ .qY.VIEWS.HIDDEN, this);
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
      this.marks = new _marks_pane_marks__WEBPACK_IMPORTED_MODULE_7__/* ["default"] */ .A(this.iframe, this.container);
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
      this.emit(_utils_constants__WEBPACK_IMPORTED_MODULE_5__/* .EVENTS */ .qY.VIEWS.MARK_CLICKED, cfiRange, data);
    };
    const key = encodeURI("epubjs-hl:" + cfiRange);
    const range = this.contents.range(cfiRange);
    const m = new _marks_pane_highlight__WEBPACK_IMPORTED_MODULE_8__/* ["default"] */ .A(range, {
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
      this.marks = new _marks_pane_marks__WEBPACK_IMPORTED_MODULE_7__/* ["default"] */ .A(this.iframe, this.container);
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
      this.emit(_utils_constants__WEBPACK_IMPORTED_MODULE_5__/* .EVENTS */ .qY.VIEWS.MARK_CLICKED, cfiRange, data);
    };
    const key = encodeURI("epubjs-ul:" + cfiRange);
    const range = this.contents.range(cfiRange);
    const m = new _marks_pane_underline__WEBPACK_IMPORTED_MODULE_9__/* ["default"] */ .A(range, {
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
        if (mark instanceof _marks_pane_highlight__WEBPACK_IMPORTED_MODULE_8__/* ["default"] */ .A) {
          this.unhighlight(mark.data["epubcfi"]);
        } else {
          this.ununderline(mark.data["epubcfi"]);
        }
      });
    }
    if (this.blobUrl) {
      (0,_utils_core__WEBPACK_IMPORTED_MODULE_6__.revokeBlobUrl)(this.blobUrl);
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
event_emitter__WEBPACK_IMPORTED_MODULE_2__(IframeView.prototype);
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (IframeView);

/***/ }),

/***/ 8823:
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

"use strict";
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   A: () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var core_js_modules_es_array_push_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(4114);
/* harmony import */ var core_js_modules_es_iterator_constructor_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(8111);
/* harmony import */ var core_js_modules_es_iterator_for_each_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(7588);
/* harmony import */ var core_js_modules_esnext_json_parse_js__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(8335);
/* harmony import */ var core_js_modules_esnext_map_delete_all_js__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(1517);
/* harmony import */ var core_js_modules_esnext_map_emplace_js__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(1379);
/* harmony import */ var core_js_modules_esnext_map_every_js__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(3777);
/* harmony import */ var core_js_modules_esnext_map_filter_js__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(4190);
/* harmony import */ var core_js_modules_esnext_map_find_js__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(2359);
/* harmony import */ var core_js_modules_esnext_map_find_key_js__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(6097);
/* harmony import */ var core_js_modules_esnext_map_get_or_insert_js__WEBPACK_IMPORTED_MODULE_10__ = __webpack_require__(7254);
/* harmony import */ var core_js_modules_esnext_map_get_or_insert_computed_js__WEBPACK_IMPORTED_MODULE_11__ = __webpack_require__(7036);
/* harmony import */ var core_js_modules_esnext_map_includes_js__WEBPACK_IMPORTED_MODULE_12__ = __webpack_require__(7273);
/* harmony import */ var core_js_modules_esnext_map_key_of_js__WEBPACK_IMPORTED_MODULE_13__ = __webpack_require__(7415);
/* harmony import */ var core_js_modules_esnext_map_map_keys_js__WEBPACK_IMPORTED_MODULE_14__ = __webpack_require__(9929);
/* harmony import */ var core_js_modules_esnext_map_map_values_js__WEBPACK_IMPORTED_MODULE_15__ = __webpack_require__(7583);
/* harmony import */ var core_js_modules_esnext_map_merge_js__WEBPACK_IMPORTED_MODULE_16__ = __webpack_require__(5122);
/* harmony import */ var core_js_modules_esnext_map_reduce_js__WEBPACK_IMPORTED_MODULE_17__ = __webpack_require__(230);
/* harmony import */ var core_js_modules_esnext_map_some_js__WEBPACK_IMPORTED_MODULE_18__ = __webpack_require__(7268);
/* harmony import */ var core_js_modules_esnext_map_update_js__WEBPACK_IMPORTED_MODULE_19__ = __webpack_require__(9733);
/* harmony import */ var event_emitter__WEBPACK_IMPORTED_MODULE_20__ = __webpack_require__(3068);
/* harmony import */ var _epubcfi__WEBPACK_IMPORTED_MODULE_21__ = __webpack_require__(7421);
/* harmony import */ var _location__WEBPACK_IMPORTED_MODULE_22__ = __webpack_require__(4776);
/* harmony import */ var _utils_defer__WEBPACK_IMPORTED_MODULE_23__ = __webpack_require__(8285);
/* harmony import */ var _utils_queue__WEBPACK_IMPORTED_MODULE_24__ = __webpack_require__(1758);
/* harmony import */ var _utils_constants__WEBPACK_IMPORTED_MODULE_25__ = __webpack_require__(5720);
/* harmony import */ var _utils_core__WEBPACK_IMPORTED_MODULE_26__ = __webpack_require__(9046);




























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
    this.current = new _location__WEBPACK_IMPORTED_MODULE_22__/* ["default"] */ .A();
    this.processing = new _utils_defer__WEBPACK_IMPORTED_MODULE_23__/* ["default"] */ .A();
    /**
     * @member {Promise<Locations>} generated
     * @memberof Locations
     * @readonly
     */
    this.generated = this.processing.promise;
    this.q = new _utils_queue__WEBPACK_IMPORTED_MODULE_24__/* ["default"] */ .A(this);
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
      const def = new _utils_defer__WEBPACK_IMPORTED_MODULE_23__/* ["default"] */ .A();
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
          const cfi = new _epubcfi__WEBPACK_IMPORTED_MODULE_21__/* ["default"] */ .A(range, cfiBase).toString();
          const loc = new _location__WEBPACK_IMPORTED_MODULE_22__/* ["default"] */ .A().set({
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
    const body = (0,_utils_core__WEBPACK_IMPORTED_MODULE_26__.qs)(doc, "body");
    return this.treeWalker(body, parser).then(() => {
      // Close remaining
      if (range && range.startContainer && prev) {
        range.endContainer = prev;
        range.endOffset = prev.length;
        const cfi = new _epubcfi__WEBPACK_IMPORTED_MODULE_21__/* ["default"] */ .A(range, cfiBase).toString();
        const loc = new _location__WEBPACK_IMPORTED_MODULE_22__/* ["default"] */ .A().set({
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
    const cfi = new _epubcfi__WEBPACK_IMPORTED_MODULE_21__/* ["default"] */ .A(value);
    const arr = [...this.keys()];
    const ind = (0,_utils_core__WEBPACK_IMPORTED_MODULE_26__.locationOf)(cfi, arr, cfi.compare);
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
      const cfi = new _epubcfi__WEBPACK_IMPORTED_MODULE_21__/* ["default"] */ .A([...this.keys()][max]);
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
        if (opt === "cfi" && _epubcfi__WEBPACK_IMPORTED_MODULE_21__/* ["default"] */ .A.prototype.isCfiString(value)) {
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
      this.emit(_utils_constants__WEBPACK_IMPORTED_MODULE_25__/* .EVENTS */ .qY.LOCATIONS.CHANGED, current, options);
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
event_emitter__WEBPACK_IMPORTED_MODULE_20__(Locations.prototype);
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (Locations);

/***/ }),

/***/ 8875:
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

"use strict";


var keysShim;
if (!Object.keys) {
	// modified from https://github.com/es-shims/es5-shim
	var has = Object.prototype.hasOwnProperty;
	var toStr = Object.prototype.toString;
	var isArgs = __webpack_require__(1093); // eslint-disable-line global-require
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
module.exports = keysShim;


/***/ }),

/***/ 8905:
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

"use strict";
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   A: () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var core_js_modules_es_array_push_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(4114);
/* harmony import */ var core_js_modules_es_iterator_constructor_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(8111);
/* harmony import */ var core_js_modules_es_iterator_for_each_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(7588);
/* harmony import */ var core_js_modules_es_iterator_map_js__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(1701);
/* harmony import */ var core_js_modules_esnext_map_delete_all_js__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(1517);
/* harmony import */ var core_js_modules_esnext_map_emplace_js__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(1379);
/* harmony import */ var core_js_modules_esnext_map_every_js__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(3777);
/* harmony import */ var core_js_modules_esnext_map_filter_js__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(4190);
/* harmony import */ var core_js_modules_esnext_map_find_js__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(2359);
/* harmony import */ var core_js_modules_esnext_map_find_key_js__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(6097);
/* harmony import */ var core_js_modules_esnext_map_get_or_insert_js__WEBPACK_IMPORTED_MODULE_10__ = __webpack_require__(7254);
/* harmony import */ var core_js_modules_esnext_map_get_or_insert_computed_js__WEBPACK_IMPORTED_MODULE_11__ = __webpack_require__(7036);
/* harmony import */ var core_js_modules_esnext_map_includes_js__WEBPACK_IMPORTED_MODULE_12__ = __webpack_require__(7273);
/* harmony import */ var core_js_modules_esnext_map_key_of_js__WEBPACK_IMPORTED_MODULE_13__ = __webpack_require__(7415);
/* harmony import */ var core_js_modules_esnext_map_map_keys_js__WEBPACK_IMPORTED_MODULE_14__ = __webpack_require__(9929);
/* harmony import */ var core_js_modules_esnext_map_map_values_js__WEBPACK_IMPORTED_MODULE_15__ = __webpack_require__(7583);
/* harmony import */ var core_js_modules_esnext_map_merge_js__WEBPACK_IMPORTED_MODULE_16__ = __webpack_require__(5122);
/* harmony import */ var core_js_modules_esnext_map_reduce_js__WEBPACK_IMPORTED_MODULE_17__ = __webpack_require__(230);
/* harmony import */ var core_js_modules_esnext_map_some_js__WEBPACK_IMPORTED_MODULE_18__ = __webpack_require__(7268);
/* harmony import */ var core_js_modules_esnext_map_update_js__WEBPACK_IMPORTED_MODULE_19__ = __webpack_require__(9733);
/* harmony import */ var event_emitter__WEBPACK_IMPORTED_MODULE_20__ = __webpack_require__(3068);
/* harmony import */ var _epubcfi__WEBPACK_IMPORTED_MODULE_21__ = __webpack_require__(7421);
/* harmony import */ var _mapping__WEBPACK_IMPORTED_MODULE_22__ = __webpack_require__(7501);
/* harmony import */ var _utils_defer__WEBPACK_IMPORTED_MODULE_23__ = __webpack_require__(8285);
/* harmony import */ var _utils_replacements__WEBPACK_IMPORTED_MODULE_24__ = __webpack_require__(2588);
/* harmony import */ var _utils_constants__WEBPACK_IMPORTED_MODULE_25__ = __webpack_require__(5720);
/* harmony import */ var _utils_core__WEBPACK_IMPORTED_MODULE_26__ = __webpack_require__(9046);



























const hasNavigator = typeof navigator !== "undefined";
const isChrome = hasNavigator && /Chrome/.test(navigator.userAgent);
const isWebkit = hasNavigator && !isChrome && /AppleWebKit/.test(navigator.userAgent);

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
    if (w && (0,_utils_core__WEBPACK_IMPORTED_MODULE_26__.isNumber)(w)) {
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
    if (h && (0,_utils_core__WEBPACK_IMPORTED_MODULE_26__.isNumber)(h)) {
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
    const border = (0,_utils_core__WEBPACK_IMPORTED_MODULE_26__.borders)(this.content);
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
    const settings = (0,_utils_core__WEBPACK_IMPORTED_MODULE_26__.defaults)(options || {}, parsed);
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
    this.emit(_utils_constants__WEBPACK_IMPORTED_MODULE_25__/* .EVENTS */ .qY.CONTENTS.EXPAND);
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
    this.emit(_utils_constants__WEBPACK_IMPORTED_MODULE_25__/* .EVENTS */ .qY.CONTENTS.RESIZED, this.contentRect);
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
    if (_epubcfi__WEBPACK_IMPORTED_MODULE_21__/* ["default"] */ .A.prototype.isCfiString(target)) {
      const range = new _epubcfi__WEBPACK_IMPORTED_MODULE_21__/* ["default"] */ .A(target).toRange(this.document, ignoreClass);
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
    const def = new _utils_defer__WEBPACK_IMPORTED_MODULE_23__/* ["default"] */ .A();
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
    const epubcfi = new _epubcfi__WEBPACK_IMPORTED_MODULE_21__/* ["default"] */ .A(cfi);
    return epubcfi.toRange(this.document, ignoreClass);
  }

  /**
   * Get an EpubCFI from a Dom Range
   * @param {Range} range
   * @param {string} [ignoreClass]
   * @returns {string} EpubCFI
   */
  cfiFromRange(range, ignoreClass) {
    return new _epubcfi__WEBPACK_IMPORTED_MODULE_21__/* ["default"] */ .A(range, this.section.cfiBase, ignoreClass).toString();
  }

  /**
   * Get an EpubCFI from a Dom node
   * @param {Node} node
   * @param {string} [ignoreClass]
   * @returns {string} EpubCFI
   */
  cfiFromNode(node, ignoreClass) {
    return new _epubcfi__WEBPACK_IMPORTED_MODULE_21__/* ["default"] */ .A(node, this.section.cfiBase, ignoreClass).toString();
  }

  /**
   * map
   * @param {Layout} layout 
   * @todo find where this is used - remove?
   * @returns {object[]}
   */
  map(layout) {
    const map = new _mapping__WEBPACK_IMPORTED_MODULE_22__/* ["default"] */ .A(layout);
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
    const dir = layout.direction;
    this.width(szw);
    this.viewport({
      width: szw,
      scale: 1.0,
      scalable: "no"
    });
    this.direction(dir);
    this.css("height", "auto");
    this.css("padding", "20px " + szw / 12 + "px");
    this.css("overflow", "hidden");
    this.css("margin", "0");
    this.css("box-sizing", "border-box");
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
    this.css("display", "block");
    this.css("padding-top", "20px");
    this.css("padding-bottom", "20px");
    this.css("padding-left", gap / 2 + "px", true);
    this.css("padding-right", gap / 2 + "px", true);
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
    const mapping = new _mapping__WEBPACK_IMPORTED_MODULE_22__/* ["default"] */ .A(layout, dev);
    return mapping.page(this, cfiBase, start, end);
  }

  /**
   * Set the writingMode of the text
   * @param {string} [mode='horizontal-tb'] `"horizontal-tb"` OR `"vertical-rl"` OR `"vertical-lr"`
   */
  writingMode(mode = "horizontal-tb") {
    if (this.mode === mode) return this.mode;
    const WRITING_MODE = (0,_utils_core__WEBPACK_IMPORTED_MODULE_26__.prefixed)("writing-mode");
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
    _utils_constants__WEBPACK_IMPORTED_MODULE_25__/* .DOM_EVENTS */ .py.forEach(eventName => {
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
    (0,_utils_replacements__WEBPACK_IMPORTED_MODULE_24__/* .replaceLinks */ .iQ)(this.content, href => {
      this.emit(_utils_constants__WEBPACK_IMPORTED_MODULE_25__/* .EVENTS */ .qY.CONTENTS.LINK_CLICKED, href);
    });
  }

  /**
   * Remove listeners
   * @private
   */
  removeListeners() {
    if (!this.document) return;
    //-- DOM EVENTS
    _utils_constants__WEBPACK_IMPORTED_MODULE_25__/* .DOM_EVENTS */ .py.forEach(eventName => {
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
        const cfirange = new _epubcfi__WEBPACK_IMPORTED_MODULE_21__/* ["default"] */ .A(range, this.section.cfiBase).toString();
        this.emit(_utils_constants__WEBPACK_IMPORTED_MODULE_25__/* .EVENTS */ .qY.CONTENTS.SELECTED, cfirange);
        this.emit(_utils_constants__WEBPACK_IMPORTED_MODULE_25__/* .EVENTS */ .qY.CONTENTS.SELECTED_RANGE, range);
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
    this.section = undefined;
  }
}
event_emitter__WEBPACK_IMPORTED_MODULE_20__(Contents.prototype);
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (Contents);

/***/ }),

/***/ 8940:
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

"use strict";
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   A: () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var core_js_modules_es_array_push_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(4114);
/* harmony import */ var core_js_modules_es_iterator_constructor_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(8111);
/* harmony import */ var core_js_modules_es_iterator_for_each_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(7588);
/* harmony import */ var core_js_modules_esnext_map_delete_all_js__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(1517);
/* harmony import */ var core_js_modules_esnext_map_emplace_js__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(1379);
/* harmony import */ var core_js_modules_esnext_map_every_js__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(3777);
/* harmony import */ var core_js_modules_esnext_map_filter_js__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(4190);
/* harmony import */ var core_js_modules_esnext_map_find_js__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(2359);
/* harmony import */ var core_js_modules_esnext_map_find_key_js__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(6097);
/* harmony import */ var core_js_modules_esnext_map_get_or_insert_js__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(7254);
/* harmony import */ var core_js_modules_esnext_map_get_or_insert_computed_js__WEBPACK_IMPORTED_MODULE_10__ = __webpack_require__(7036);
/* harmony import */ var core_js_modules_esnext_map_includes_js__WEBPACK_IMPORTED_MODULE_11__ = __webpack_require__(7273);
/* harmony import */ var core_js_modules_esnext_map_key_of_js__WEBPACK_IMPORTED_MODULE_12__ = __webpack_require__(7415);
/* harmony import */ var core_js_modules_esnext_map_map_keys_js__WEBPACK_IMPORTED_MODULE_13__ = __webpack_require__(9929);
/* harmony import */ var core_js_modules_esnext_map_map_values_js__WEBPACK_IMPORTED_MODULE_14__ = __webpack_require__(7583);
/* harmony import */ var core_js_modules_esnext_map_merge_js__WEBPACK_IMPORTED_MODULE_15__ = __webpack_require__(5122);
/* harmony import */ var core_js_modules_esnext_map_reduce_js__WEBPACK_IMPORTED_MODULE_16__ = __webpack_require__(230);
/* harmony import */ var core_js_modules_esnext_map_some_js__WEBPACK_IMPORTED_MODULE_17__ = __webpack_require__(7268);
/* harmony import */ var core_js_modules_esnext_map_update_js__WEBPACK_IMPORTED_MODULE_18__ = __webpack_require__(9733);
/* harmony import */ var _utils_core__WEBPACK_IMPORTED_MODULE_19__ = __webpack_require__(9046);





















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
    const navList = (0,_utils_core__WEBPACK_IMPORTED_MODULE_19__.filterChildren)(nav, "ol", true);
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
    const link = (0,_utils_core__WEBPACK_IMPORTED_MODULE_19__.qs)(node, "a") || (0,_utils_core__WEBPACK_IMPORTED_MODULE_19__.qs)(node, "span");
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
    const content = (0,_utils_core__WEBPACK_IMPORTED_MODULE_19__.qs)(node, "content");
    const navLabel = (0,_utils_core__WEBPACK_IMPORTED_MODULE_19__.qs)(node, "navLabel");
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
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (Toc);

/***/ }),

/***/ 8968:
/***/ ((module) => {

"use strict";


/** @type {import('./floor')} */
module.exports = Math.floor;


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

/***/ 9032:
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {

"use strict";
// Currently in sync with Node.js lib/internal/util/types.js
// https://github.com/nodejs/node/commit/112cc7c27551254aa2b17098fb774867f05ed0d9



var isArgumentsObject = __webpack_require__(7244);
var isGeneratorFunction = __webpack_require__(8184);
var whichTypedArray = __webpack_require__(5767);
var isTypedArray = __webpack_require__(5680);

function uncurryThis(f) {
  return f.call.bind(f);
}

var BigIntSupported = typeof BigInt !== 'undefined';
var SymbolSupported = typeof Symbol !== 'undefined';

var ObjectToString = uncurryThis(Object.prototype.toString);

var numberValue = uncurryThis(Number.prototype.valueOf);
var stringValue = uncurryThis(String.prototype.valueOf);
var booleanValue = uncurryThis(Boolean.prototype.valueOf);

if (BigIntSupported) {
  var bigIntValue = uncurryThis(BigInt.prototype.valueOf);
}

if (SymbolSupported) {
  var symbolValue = uncurryThis(Symbol.prototype.valueOf);
}

function checkBoxedPrimitive(value, prototypeValueOf) {
  if (typeof value !== 'object') {
    return false;
  }
  try {
    prototypeValueOf(value);
    return true;
  } catch(e) {
    return false;
  }
}

exports.isArgumentsObject = isArgumentsObject;
exports.isGeneratorFunction = isGeneratorFunction;
exports.isTypedArray = isTypedArray;

// Taken from here and modified for better browser support
// https://github.com/sindresorhus/p-is-promise/blob/cda35a513bda03f977ad5cde3a079d237e82d7ef/index.js
function isPromise(input) {
	return (
		(
			typeof Promise !== 'undefined' &&
			input instanceof Promise
		) ||
		(
			input !== null &&
			typeof input === 'object' &&
			typeof input.then === 'function' &&
			typeof input.catch === 'function'
		)
	);
}
exports.isPromise = isPromise;

function isArrayBufferView(value) {
  if (typeof ArrayBuffer !== 'undefined' && ArrayBuffer.isView) {
    return ArrayBuffer.isView(value);
  }

  return (
    isTypedArray(value) ||
    isDataView(value)
  );
}
exports.isArrayBufferView = isArrayBufferView;


function isUint8Array(value) {
  return whichTypedArray(value) === 'Uint8Array';
}
exports.isUint8Array = isUint8Array;

function isUint8ClampedArray(value) {
  return whichTypedArray(value) === 'Uint8ClampedArray';
}
exports.isUint8ClampedArray = isUint8ClampedArray;

function isUint16Array(value) {
  return whichTypedArray(value) === 'Uint16Array';
}
exports.isUint16Array = isUint16Array;

function isUint32Array(value) {
  return whichTypedArray(value) === 'Uint32Array';
}
exports.isUint32Array = isUint32Array;

function isInt8Array(value) {
  return whichTypedArray(value) === 'Int8Array';
}
exports.isInt8Array = isInt8Array;

function isInt16Array(value) {
  return whichTypedArray(value) === 'Int16Array';
}
exports.isInt16Array = isInt16Array;

function isInt32Array(value) {
  return whichTypedArray(value) === 'Int32Array';
}
exports.isInt32Array = isInt32Array;

function isFloat32Array(value) {
  return whichTypedArray(value) === 'Float32Array';
}
exports.isFloat32Array = isFloat32Array;

function isFloat64Array(value) {
  return whichTypedArray(value) === 'Float64Array';
}
exports.isFloat64Array = isFloat64Array;

function isBigInt64Array(value) {
  return whichTypedArray(value) === 'BigInt64Array';
}
exports.isBigInt64Array = isBigInt64Array;

function isBigUint64Array(value) {
  return whichTypedArray(value) === 'BigUint64Array';
}
exports.isBigUint64Array = isBigUint64Array;

function isMapToString(value) {
  return ObjectToString(value) === '[object Map]';
}
isMapToString.working = (
  typeof Map !== 'undefined' &&
  isMapToString(new Map())
);

function isMap(value) {
  if (typeof Map === 'undefined') {
    return false;
  }

  return isMapToString.working
    ? isMapToString(value)
    : value instanceof Map;
}
exports.isMap = isMap;

function isSetToString(value) {
  return ObjectToString(value) === '[object Set]';
}
isSetToString.working = (
  typeof Set !== 'undefined' &&
  isSetToString(new Set())
);
function isSet(value) {
  if (typeof Set === 'undefined') {
    return false;
  }

  return isSetToString.working
    ? isSetToString(value)
    : value instanceof Set;
}
exports.isSet = isSet;

function isWeakMapToString(value) {
  return ObjectToString(value) === '[object WeakMap]';
}
isWeakMapToString.working = (
  typeof WeakMap !== 'undefined' &&
  isWeakMapToString(new WeakMap())
);
function isWeakMap(value) {
  if (typeof WeakMap === 'undefined') {
    return false;
  }

  return isWeakMapToString.working
    ? isWeakMapToString(value)
    : value instanceof WeakMap;
}
exports.isWeakMap = isWeakMap;

function isWeakSetToString(value) {
  return ObjectToString(value) === '[object WeakSet]';
}
isWeakSetToString.working = (
  typeof WeakSet !== 'undefined' &&
  isWeakSetToString(new WeakSet())
);
function isWeakSet(value) {
  return isWeakSetToString(value);
}
exports.isWeakSet = isWeakSet;

function isArrayBufferToString(value) {
  return ObjectToString(value) === '[object ArrayBuffer]';
}
isArrayBufferToString.working = (
  typeof ArrayBuffer !== 'undefined' &&
  isArrayBufferToString(new ArrayBuffer())
);
function isArrayBuffer(value) {
  if (typeof ArrayBuffer === 'undefined') {
    return false;
  }

  return isArrayBufferToString.working
    ? isArrayBufferToString(value)
    : value instanceof ArrayBuffer;
}
exports.isArrayBuffer = isArrayBuffer;

function isDataViewToString(value) {
  return ObjectToString(value) === '[object DataView]';
}
isDataViewToString.working = (
  typeof ArrayBuffer !== 'undefined' &&
  typeof DataView !== 'undefined' &&
  isDataViewToString(new DataView(new ArrayBuffer(1), 0, 1))
);
function isDataView(value) {
  if (typeof DataView === 'undefined') {
    return false;
  }

  return isDataViewToString.working
    ? isDataViewToString(value)
    : value instanceof DataView;
}
exports.isDataView = isDataView;

// Store a copy of SharedArrayBuffer in case it's deleted elsewhere
var SharedArrayBufferCopy = typeof SharedArrayBuffer !== 'undefined' ? SharedArrayBuffer : undefined;
function isSharedArrayBufferToString(value) {
  return ObjectToString(value) === '[object SharedArrayBuffer]';
}
function isSharedArrayBuffer(value) {
  if (typeof SharedArrayBufferCopy === 'undefined') {
    return false;
  }

  if (typeof isSharedArrayBufferToString.working === 'undefined') {
    isSharedArrayBufferToString.working = isSharedArrayBufferToString(new SharedArrayBufferCopy());
  }

  return isSharedArrayBufferToString.working
    ? isSharedArrayBufferToString(value)
    : value instanceof SharedArrayBufferCopy;
}
exports.isSharedArrayBuffer = isSharedArrayBuffer;

function isAsyncFunction(value) {
  return ObjectToString(value) === '[object AsyncFunction]';
}
exports.isAsyncFunction = isAsyncFunction;

function isMapIterator(value) {
  return ObjectToString(value) === '[object Map Iterator]';
}
exports.isMapIterator = isMapIterator;

function isSetIterator(value) {
  return ObjectToString(value) === '[object Set Iterator]';
}
exports.isSetIterator = isSetIterator;

function isGeneratorObject(value) {
  return ObjectToString(value) === '[object Generator]';
}
exports.isGeneratorObject = isGeneratorObject;

function isWebAssemblyCompiledModule(value) {
  return ObjectToString(value) === '[object WebAssembly.Module]';
}
exports.isWebAssemblyCompiledModule = isWebAssemblyCompiledModule;

function isNumberObject(value) {
  return checkBoxedPrimitive(value, numberValue);
}
exports.isNumberObject = isNumberObject;

function isStringObject(value) {
  return checkBoxedPrimitive(value, stringValue);
}
exports.isStringObject = isStringObject;

function isBooleanObject(value) {
  return checkBoxedPrimitive(value, booleanValue);
}
exports.isBooleanObject = isBooleanObject;

function isBigIntObject(value) {
  return BigIntSupported && checkBoxedPrimitive(value, bigIntValue);
}
exports.isBigIntObject = isBigIntObject;

function isSymbolObject(value) {
  return SymbolSupported && checkBoxedPrimitive(value, symbolValue);
}
exports.isSymbolObject = isSymbolObject;

function isBoxedPrimitive(value) {
  return (
    isNumberObject(value) ||
    isStringObject(value) ||
    isBooleanObject(value) ||
    isBigIntObject(value) ||
    isSymbolObject(value)
  );
}
exports.isBoxedPrimitive = isBoxedPrimitive;

function isAnyArrayBuffer(value) {
  return typeof Uint8Array !== 'undefined' && (
    isArrayBuffer(value) ||
    isSharedArrayBuffer(value)
  );
}
exports.isAnyArrayBuffer = isAnyArrayBuffer;

['isProxy', 'isExternal', 'isModuleNamespaceObject'].forEach(function(method) {
  Object.defineProperty(exports, method, {
    enumerable: false,
    value: function() {
      throw new Error(method + ' is not supported in userland');
    }
  });
});


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

/***/ 9046:
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

"use strict";
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   blob2base64: () => (/* binding */ blob2base64),
/* harmony export */   borders: () => (/* binding */ borders),
/* harmony export */   createBlobUrl: () => (/* binding */ createBlobUrl),
/* harmony export */   defaults: () => (/* binding */ defaults),
/* harmony export */   extend: () => (/* binding */ extend),
/* harmony export */   filterChildren: () => (/* binding */ filterChildren),
/* harmony export */   findChildren: () => (/* binding */ findChildren),
/* harmony export */   indexOfNode: () => (/* binding */ indexOfNode),
/* harmony export */   indexOfSorted: () => (/* binding */ indexOfSorted),
/* harmony export */   isFloat: () => (/* binding */ isFloat),
/* harmony export */   isNumber: () => (/* binding */ isNumber),
/* harmony export */   isXml: () => (/* binding */ isXml),
/* harmony export */   locationOf: () => (/* binding */ locationOf),
/* harmony export */   nodeBounds: () => (/* binding */ nodeBounds),
/* harmony export */   parents: () => (/* binding */ parents),
/* harmony export */   parse: () => (/* binding */ parse),
/* harmony export */   prefixed: () => (/* binding */ prefixed),
/* harmony export */   qs: () => (/* binding */ qs),
/* harmony export */   qsa: () => (/* binding */ qsa),
/* harmony export */   qsp: () => (/* binding */ qsp),
/* harmony export */   revokeBlobUrl: () => (/* binding */ revokeBlobUrl),
/* harmony export */   sprint: () => (/* binding */ sprint),
/* harmony export */   uuid: () => (/* binding */ uuid)
/* harmony export */ });
/* unused harmony exports documentHeight, isElement, insert, bounds, windowBounds, indexOfTextNode, indexOfElementNode, createBlob, createBase64Url, type, treeWalker, walk, querySelectorByType, getParentByTagName */
/* harmony import */ var core_js_modules_es_array_push_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(4114);
/* harmony import */ var core_js_modules_es_iterator_constructor_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(8111);
/* harmony import */ var core_js_modules_es_iterator_filter_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(2489);
/* harmony import */ var core_js_modules_es_iterator_for_each_js__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(7588);
/* harmony import */ var core_js_modules_web_dom_exception_stack_js__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(4979);
/* harmony import */ var core_js_modules_web_url_search_params_delete_js__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(4603);
/* harmony import */ var core_js_modules_web_url_search_params_has_js__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(7566);
/* harmony import */ var core_js_modules_web_url_search_params_size_js__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(8721);








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

/***/ }),

/***/ 9050:
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

"use strict";
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   A: () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var core_js_modules_es_array_push_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(4114);
/* harmony import */ var core_js_modules_es_iterator_constructor_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(8111);
/* harmony import */ var core_js_modules_es_iterator_for_each_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(7588);
/* harmony import */ var core_js_modules_esnext_map_delete_all_js__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(1517);
/* harmony import */ var core_js_modules_esnext_map_emplace_js__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(1379);
/* harmony import */ var core_js_modules_esnext_map_every_js__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(3777);
/* harmony import */ var core_js_modules_esnext_map_filter_js__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(4190);
/* harmony import */ var core_js_modules_esnext_map_find_js__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(2359);
/* harmony import */ var core_js_modules_esnext_map_find_key_js__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(6097);
/* harmony import */ var core_js_modules_esnext_map_get_or_insert_js__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(7254);
/* harmony import */ var core_js_modules_esnext_map_get_or_insert_computed_js__WEBPACK_IMPORTED_MODULE_10__ = __webpack_require__(7036);
/* harmony import */ var core_js_modules_esnext_map_includes_js__WEBPACK_IMPORTED_MODULE_11__ = __webpack_require__(7273);
/* harmony import */ var core_js_modules_esnext_map_key_of_js__WEBPACK_IMPORTED_MODULE_12__ = __webpack_require__(7415);
/* harmony import */ var core_js_modules_esnext_map_map_keys_js__WEBPACK_IMPORTED_MODULE_13__ = __webpack_require__(9929);
/* harmony import */ var core_js_modules_esnext_map_map_values_js__WEBPACK_IMPORTED_MODULE_14__ = __webpack_require__(7583);
/* harmony import */ var core_js_modules_esnext_map_merge_js__WEBPACK_IMPORTED_MODULE_15__ = __webpack_require__(5122);
/* harmony import */ var core_js_modules_esnext_map_reduce_js__WEBPACK_IMPORTED_MODULE_16__ = __webpack_require__(230);
/* harmony import */ var core_js_modules_esnext_map_some_js__WEBPACK_IMPORTED_MODULE_17__ = __webpack_require__(7268);
/* harmony import */ var core_js_modules_esnext_map_update_js__WEBPACK_IMPORTED_MODULE_18__ = __webpack_require__(9733);
/* harmony import */ var core_js_modules_web_url_search_params_delete_js__WEBPACK_IMPORTED_MODULE_19__ = __webpack_require__(4603);
/* harmony import */ var core_js_modules_web_url_search_params_has_js__WEBPACK_IMPORTED_MODULE_20__ = __webpack_require__(7566);
/* harmony import */ var core_js_modules_web_url_search_params_size_js__WEBPACK_IMPORTED_MODULE_21__ = __webpack_require__(8721);
/* harmony import */ var _utils_replacements__WEBPACK_IMPORTED_MODULE_22__ = __webpack_require__(2588);
/* harmony import */ var _utils_core__WEBPACK_IMPORTED_MODULE_23__ = __webpack_require__(9046);
/* harmony import */ var _utils_url__WEBPACK_IMPORTED_MODULE_24__ = __webpack_require__(984);
/* harmony import */ var _utils_mime__WEBPACK_IMPORTED_MODULE_25__ = __webpack_require__(9357);



























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
    const url = new _utils_url__WEBPACK_IMPORTED_MODULE_24__/* ["default"] */ .A(uri);
    const base64 = this.replacements === "base64";
    if (this.archive) {
      const type = base64 ? "base64" : "blob";
      return this.archive.request(uri, type).then(data => {
        return base64 ? data : URL.createObjectURL(data);
      });
    } else if (base64) {
      return this.request(uri, "blob").then(blob => {
        return (0,_utils_core__WEBPACK_IMPORTED_MODULE_23__.blob2base64)(blob);
      });
    } else {
      return this.request(uri, "blob").then(blob => {
        const type = mimeType || _utils_mime__WEBPACK_IMPORTED_MODULE_25__/* ["default"] */ .A.lookup(url.filename);
        return (0,_utils_core__WEBPACK_IMPORTED_MODULE_23__.createBlobUrl)(blob, type);
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
    section.output = (0,_utils_replacements__WEBPACK_IMPORTED_MODULE_22__/* .substitute */ .V2)(content, section, [...this.keys()], [...this.values()]);
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
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (Resources);

/***/ }),

/***/ 9092:
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

"use strict";


var hasSymbols = __webpack_require__(1333);

/** @type {import('.')} */
module.exports = function hasToStringTagShams() {
	return hasSymbols() && !!Symbol.toStringTag;
};


/***/ }),

/***/ 9133:
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

"use strict";


var implementation = __webpack_require__(8403);

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

module.exports = function getPolyfill() {
	if (!Object.assign) {
		return implementation;
	}
	if (lacksProperEnumerationOrder()) {
		return implementation;
	}
	if (assignHasPendingExceptions()) {
		return implementation;
	}
	return Object.assign;
};


/***/ }),

/***/ 9143:
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

"use strict";

var globalThis = __webpack_require__(4576);
var uncurryThis = __webpack_require__(9504);
var anObjectOrUndefined = __webpack_require__(3972);
var aString = __webpack_require__(3463);
var hasOwn = __webpack_require__(9297);
var base64Map = __webpack_require__(2804);
var getAlphabetOption = __webpack_require__(944);
var notDetached = __webpack_require__(5169);

var base64Alphabet = base64Map.c2i;
var base64UrlAlphabet = base64Map.c2iUrl;

var SyntaxError = globalThis.SyntaxError;
var TypeError = globalThis.TypeError;
var at = uncurryThis(''.charAt);

var skipAsciiWhitespace = function (string, index) {
  var length = string.length;
  for (;index < length; index++) {
    var chr = at(string, index);
    if (chr !== ' ' && chr !== '\t' && chr !== '\n' && chr !== '\f' && chr !== '\r') break;
  } return index;
};

var decodeBase64Chunk = function (chunk, alphabet, throwOnExtraBits) {
  var chunkLength = chunk.length;

  if (chunkLength < 4) {
    chunk += chunkLength === 2 ? 'AA' : 'A';
  }

  var triplet = (alphabet[at(chunk, 0)] << 18)
    + (alphabet[at(chunk, 1)] << 12)
    + (alphabet[at(chunk, 2)] << 6)
    + alphabet[at(chunk, 3)];

  var chunkBytes = [
    (triplet >> 16) & 255,
    (triplet >> 8) & 255,
    triplet & 255
  ];

  if (chunkLength === 2) {
    if (throwOnExtraBits && chunkBytes[1] !== 0) {
      throw new SyntaxError('Extra bits');
    }
    return [chunkBytes[0]];
  }

  if (chunkLength === 3) {
    if (throwOnExtraBits && chunkBytes[2] !== 0) {
      throw new SyntaxError('Extra bits');
    }
    return [chunkBytes[0], chunkBytes[1]];
  }

  return chunkBytes;
};

var writeBytes = function (bytes, elements, written) {
  var elementsLength = elements.length;
  for (var index = 0; index < elementsLength; index++) {
    bytes[written + index] = elements[index];
  }
  return written + elementsLength;
};

/* eslint-disable max-statements, max-depth -- TODO */
module.exports = function (string, options, into, maxLength) {
  aString(string);
  anObjectOrUndefined(options);
  var alphabet = getAlphabetOption(options) === 'base64' ? base64Alphabet : base64UrlAlphabet;
  var lastChunkHandling = options ? options.lastChunkHandling : undefined;

  if (lastChunkHandling === undefined) lastChunkHandling = 'loose';

  if (lastChunkHandling !== 'loose' && lastChunkHandling !== 'strict' && lastChunkHandling !== 'stop-before-partial') {
    throw new TypeError('Incorrect `lastChunkHandling` option');
  }

  if (into) notDetached(into.buffer);

  var bytes = into || [];
  var written = 0;
  var read = 0;
  var chunk = '';
  var index = 0;

  if (maxLength) while (true) {
    index = skipAsciiWhitespace(string, index);
    if (index === string.length) {
      if (chunk.length > 0) {
        if (lastChunkHandling === 'stop-before-partial') {
          break;
        }
        if (lastChunkHandling === 'loose') {
          if (chunk.length === 1) {
            throw new SyntaxError('Malformed padding: exactly one additional character');
          }
          written = writeBytes(bytes, decodeBase64Chunk(chunk, alphabet, false), written);
        } else {
          throw new SyntaxError('Missing padding');
        }
      }
      read = string.length;
      break;
    }
    var chr = at(string, index);
    ++index;
    if (chr === '=') {
      if (chunk.length < 2) {
        throw new SyntaxError('Padding is too early');
      }
      index = skipAsciiWhitespace(string, index);
      if (chunk.length === 2) {
        if (index === string.length) {
          if (lastChunkHandling === 'stop-before-partial') {
            break;
          }
          throw new SyntaxError('Malformed padding: only one =');
        }
        if (at(string, index) === '=') {
          ++index;
          index = skipAsciiWhitespace(string, index);
        }
      }
      if (index < string.length) {
        throw new SyntaxError('Unexpected character after padding');
      }
      written = writeBytes(bytes, decodeBase64Chunk(chunk, alphabet, lastChunkHandling === 'strict'), written);
      read = string.length;
      break;
    }
    if (!hasOwn(alphabet, chr)) {
      throw new SyntaxError('Unexpected character');
    }
    var remainingBytes = maxLength - written;
    if (remainingBytes === 1 && chunk.length === 2 || remainingBytes === 2 && chunk.length === 3) {
      // special case: we can fit exactly the number of bytes currently represented by chunk, so we were just checking for `=`
      break;
    }

    chunk += chr;
    if (chunk.length === 4) {
      written = writeBytes(bytes, decodeBase64Chunk(chunk, alphabet, false), written);
      chunk = '';
      read = index;
      if (written === maxLength) {
        break;
      }
    }
  }

  return { bytes: bytes, read: read, written: written };
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

/***/ 9209:
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

"use strict";


var possibleNames = __webpack_require__(6578);

var g = typeof globalThis === 'undefined' ? __webpack_require__.g : globalThis;

/** @type {import('.')} */
module.exports = function availableTypedArrays() {
	var /** @type {ReturnType<typeof availableTypedArrays>} */ out = [];
	for (var i = 0; i < possibleNames.length; i++) {
		if (typeof g[possibleNames[i]] === 'function') {
			// @ts-expect-error
			out[out.length] = possibleNames[i];
		}
	}
	return out;
};


/***/ }),

/***/ 9211:
/***/ ((module) => {

"use strict";


var numberIsNaN = function (value) {
	return value !== value;
};

module.exports = function is(a, b) {
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



/***/ }),

/***/ 9213:
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

"use strict";

var bind = __webpack_require__(6080);
var uncurryThis = __webpack_require__(9504);
var IndexedObject = __webpack_require__(7055);
var toObject = __webpack_require__(8981);
var lengthOfArrayLike = __webpack_require__(6198);
var arraySpeciesCreate = __webpack_require__(1469);

var push = uncurryThis([].push);

// `Array.prototype.{ forEach, map, filter, some, every, find, findIndex, filterReject }` methods implementation
var createMethod = function (TYPE) {
  var IS_MAP = TYPE === 1;
  var IS_FILTER = TYPE === 2;
  var IS_SOME = TYPE === 3;
  var IS_EVERY = TYPE === 4;
  var IS_FIND_INDEX = TYPE === 6;
  var IS_FILTER_REJECT = TYPE === 7;
  var NO_HOLES = TYPE === 5 || IS_FIND_INDEX;
  return function ($this, callbackfn, that, specificCreate) {
    var O = toObject($this);
    var self = IndexedObject(O);
    var length = lengthOfArrayLike(self);
    var boundFunction = bind(callbackfn, that);
    var index = 0;
    var create = specificCreate || arraySpeciesCreate;
    var target = IS_MAP ? create($this, length) : IS_FILTER || IS_FILTER_REJECT ? create($this, 0) : undefined;
    var value, result;
    for (;length > index; index++) if (NO_HOLES || index in self) {
      value = self[index];
      result = boundFunction(value, index, O);
      if (TYPE) {
        if (IS_MAP) target[index] = result; // map
        else if (result) switch (TYPE) {
          case 3: return true;              // some
          case 5: return value;             // find
          case 6: return index;             // findIndex
          case 2: push(target, value);      // filter
        } else switch (TYPE) {
          case 4: return false;             // every
          case 7: push(target, value);      // filterReject
        }
      }
    }
    return IS_FIND_INDEX ? -1 : IS_SOME || IS_EVERY ? IS_EVERY : target;
  };
};

module.exports = {
  // `Array.prototype.forEach` method
  // https://tc39.es/ecma262/#sec-array.prototype.foreach
  forEach: createMethod(0),
  // `Array.prototype.map` method
  // https://tc39.es/ecma262/#sec-array.prototype.map
  map: createMethod(1),
  // `Array.prototype.filter` method
  // https://tc39.es/ecma262/#sec-array.prototype.filter
  filter: createMethod(2),
  // `Array.prototype.some` method
  // https://tc39.es/ecma262/#sec-array.prototype.some
  some: createMethod(3),
  // `Array.prototype.every` method
  // https://tc39.es/ecma262/#sec-array.prototype.every
  every: createMethod(4),
  // `Array.prototype.find` method
  // https://tc39.es/ecma262/#sec-array.prototype.find
  find: createMethod(5),
  // `Array.prototype.findIndex` method
  // https://tc39.es/ecma262/#sec-array.prototype.findIndex
  findIndex: createMethod(6),
  // `Array.prototype.filterReject` method
  // https://github.com/tc39/proposal-array-filtering
  filterReject: createMethod(7)
};


/***/ }),

/***/ 9290:
/***/ ((module) => {

"use strict";


/** @type {import('./range')} */
module.exports = RangeError;


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

/***/ 9325:
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

var freeGlobal = __webpack_require__(4840);

/** Detect free variable `self`. */
var freeSelf = typeof self == 'object' && self && self.Object === Object && self;

/** Used as a reference to the global object. */
var root = freeGlobal || freeSelf || Function('return this')();

module.exports = root;


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

/***/ 9353:
/***/ ((module) => {

"use strict";


/* eslint no-invalid-this: 1 */

var ERROR_MESSAGE = 'Function.prototype.bind called on incompatible ';
var toStr = Object.prototype.toString;
var max = Math.max;
var funcType = '[object Function]';

var concatty = function concatty(a, b) {
    var arr = [];

    for (var i = 0; i < a.length; i += 1) {
        arr[i] = a[i];
    }
    for (var j = 0; j < b.length; j += 1) {
        arr[j + a.length] = b[j];
    }

    return arr;
};

var slicy = function slicy(arrLike, offset) {
    var arr = [];
    for (var i = offset || 0, j = 0; i < arrLike.length; i += 1, j += 1) {
        arr[j] = arrLike[i];
    }
    return arr;
};

var joiny = function (arr, joiner) {
    var str = '';
    for (var i = 0; i < arr.length; i += 1) {
        str += arr[i];
        if (i + 1 < arr.length) {
            str += joiner;
        }
    }
    return str;
};

module.exports = function bind(that) {
    var target = this;
    if (typeof target !== 'function' || toStr.apply(target) !== funcType) {
        throw new TypeError(ERROR_MESSAGE + target);
    }
    var args = slicy(arguments, 1);

    var bound;
    var binder = function () {
        if (this instanceof bound) {
            var result = target.apply(
                this,
                concatty(args, arguments)
            );
            if (Object(result) === result) {
                return result;
            }
            return this;
        }
        return target.apply(
            that,
            concatty(args, arguments)
        );

    };

    var boundLength = max(0, target.length - args.length);
    var boundArgs = [];
    for (var i = 0; i < boundLength; i++) {
        boundArgs[i] = '$' + i;
    }

    bound = Function('binder', 'return function (' + joiny(boundArgs, ',') + '){ return binder.apply(this,arguments); }')(binder);

    if (target.prototype) {
        var Empty = function Empty() {};
        Empty.prototype = target.prototype;
        bound.prototype = new Empty();
        Empty.prototype = null;
    }

    return bound;
};


/***/ }),

/***/ 9357:
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

"use strict";
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   A: () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
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
const mimeTypes = (() => {
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
    value = mimeTypes[type];
  }
  return value || defaultValue;
};
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = ({
  lookup
});

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

/***/ 9383:
/***/ ((module) => {

"use strict";


/** @type {import('.')} */
module.exports = Error;


/***/ }),

/***/ 9394:
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

"use strict";


var implementation = __webpack_require__(9211);

module.exports = function getPolyfill() {
	return typeof Object.is === 'function' ? Object.is : implementation;
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
var iteratorCloseAll = __webpack_require__(1385);

var TO_STRING_TAG = wellKnownSymbol('toStringTag');
var ITERATOR_HELPER = 'IteratorHelper';
var WRAP_FOR_VALID_ITERATOR = 'WrapForValidIterator';
var NORMAL = 'normal';
var THROW = 'throw';
var setInternalState = InternalStateModule.set;

var createIteratorProxyPrototype = function (IS_ITERATOR) {
  var getInternalState = InternalStateModule.getterFor(IS_ITERATOR ? WRAP_FOR_VALID_ITERATOR : ITERATOR_HELPER);

  return defineBuiltIns(create(IteratorPrototype), {
    next: function next() {
      var state = getInternalState(this);
      // for simplification:
      //   for `%WrapForValidIteratorPrototype%.next` or with `state.returnHandlerResult` our `nextHandler` returns `IterResultObject`
      //   for `%IteratorHelperPrototype%.next` - just a value
      if (IS_ITERATOR) return state.nextHandler();
      if (state.done) return createIterResultObject(undefined, true);
      try {
        var result = state.nextHandler();
        return state.returnHandlerResult ? result : createIterResultObject(result, state.done);
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
        iteratorClose(state.inner.iterator, NORMAL);
      } catch (error) {
        return iteratorClose(iterator, THROW, error);
      }
      if (state.openIters) try {
        iteratorCloseAll(state.openIters, NORMAL);
      } catch (error) {
        return iteratorClose(iterator, THROW, error);
      }
      if (iterator) iteratorClose(iterator, NORMAL);
      return createIterResultObject(undefined, true);
    }
  });
};

var WrapForValidIteratorPrototype = createIteratorProxyPrototype(true);
var IteratorHelperPrototype = createIteratorProxyPrototype(false);

createNonEnumerableProperty(IteratorHelperPrototype, TO_STRING_TAG, 'Iterator Helper');

module.exports = function (nextHandler, IS_ITERATOR, RETURN_HANDLER_RESULT) {
  var IteratorProxy = function Iterator(record, state) {
    if (state) {
      state.iterator = record.iterator;
      state.next = record.next;
    } else state = record;
    state.type = IS_ITERATOR ? WRAP_FOR_VALID_ITERATOR : ITERATOR_HELPER;
    state.returnHandlerResult = !!RETURN_HANDLER_RESULT;
    state.nextHandler = nextHandler;
    state.counter = 0;
    state.done = false;
    setInternalState(this, state);
  };

  IteratorProxy.prototype = IS_ITERATOR ? WrapForValidIteratorPrototype : IteratorHelperPrototype;

  return IteratorProxy;
};


/***/ }),

/***/ 9504:
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

"use strict";

var NATIVE_BIND = __webpack_require__(616);

var FunctionPrototype = Function.prototype;
var call = FunctionPrototype.call;
// eslint-disable-next-line es/no-function-prototype-bind -- safe
var uncurryThisWithBind = NATIVE_BIND && FunctionPrototype.bind.bind(call, call);

module.exports = NATIVE_BIND ? uncurryThisWithBind : function (fn) {
  return function () {
    return call.apply(fn, arguments);
  };
};


/***/ }),

/***/ 9507:
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

"use strict";
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   A: () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var core_js_modules_es_iterator_constructor_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(8111);
/* harmony import */ var core_js_modules_es_iterator_for_each_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(7588);
/* harmony import */ var core_js_modules_esnext_map_delete_all_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(1517);
/* harmony import */ var core_js_modules_esnext_map_emplace_js__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(1379);
/* harmony import */ var core_js_modules_esnext_map_every_js__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(3777);
/* harmony import */ var core_js_modules_esnext_map_filter_js__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(4190);
/* harmony import */ var core_js_modules_esnext_map_find_js__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(2359);
/* harmony import */ var core_js_modules_esnext_map_find_key_js__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(6097);
/* harmony import */ var core_js_modules_esnext_map_get_or_insert_js__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(7254);
/* harmony import */ var core_js_modules_esnext_map_get_or_insert_computed_js__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(7036);
/* harmony import */ var core_js_modules_esnext_map_includes_js__WEBPACK_IMPORTED_MODULE_10__ = __webpack_require__(7273);
/* harmony import */ var core_js_modules_esnext_map_key_of_js__WEBPACK_IMPORTED_MODULE_11__ = __webpack_require__(7415);
/* harmony import */ var core_js_modules_esnext_map_map_keys_js__WEBPACK_IMPORTED_MODULE_12__ = __webpack_require__(9929);
/* harmony import */ var core_js_modules_esnext_map_map_values_js__WEBPACK_IMPORTED_MODULE_13__ = __webpack_require__(7583);
/* harmony import */ var core_js_modules_esnext_map_merge_js__WEBPACK_IMPORTED_MODULE_14__ = __webpack_require__(5122);
/* harmony import */ var core_js_modules_esnext_map_reduce_js__WEBPACK_IMPORTED_MODULE_15__ = __webpack_require__(230);
/* harmony import */ var core_js_modules_esnext_map_some_js__WEBPACK_IMPORTED_MODULE_16__ = __webpack_require__(7268);
/* harmony import */ var core_js_modules_esnext_map_update_js__WEBPACK_IMPORTED_MODULE_17__ = __webpack_require__(9733);
/* harmony import */ var _utils_core__WEBPACK_IMPORTED_MODULE_18__ = __webpack_require__(9046);




















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
    const navItems = node ? (0,_utils_core__WEBPACK_IMPORTED_MODULE_18__.qsa)(node, "li") : [];
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
    const link = (0,_utils_core__WEBPACK_IMPORTED_MODULE_18__.filterChildren)(node, "a", true);
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
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (Landmarks);

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

/***/ 9538:
/***/ ((module) => {

"use strict";


/** @type {import('./ref')} */
module.exports = ReferenceError;


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

/***/ 9565:
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

"use strict";

var NATIVE_BIND = __webpack_require__(616);

var call = Function.prototype.call;
// eslint-disable-next-line es/no-function-prototype-bind -- safe
module.exports = NATIVE_BIND ? call.bind(call) : function () {
  return call.apply(call, arguments);
};


/***/ }),

/***/ 9577:
/***/ ((__unused_webpack_module, __unused_webpack_exports, __webpack_require__) => {

"use strict";

var arrayWith = __webpack_require__(9928);
var ArrayBufferViewCore = __webpack_require__(4644);
var isBigIntArray = __webpack_require__(1108);
var toIntegerOrInfinity = __webpack_require__(1291);
var toBigInt = __webpack_require__(5854);

var aTypedArray = ArrayBufferViewCore.aTypedArray;
var getTypedArrayConstructor = ArrayBufferViewCore.getTypedArrayConstructor;
var exportTypedArrayMethod = ArrayBufferViewCore.exportTypedArrayMethod;

var PROPER_ORDER = function () {
  try {
    // eslint-disable-next-line no-throw-literal, es/no-typed-arrays, es/no-array-prototype-with -- required for testing
    new Int8Array(1)['with'](2, { valueOf: function () { throw 8; } });
  } catch (error) {
    // some early implementations, like WebKit, does not follow the final semantic
    // https://github.com/tc39/proposal-change-array-by-copy/pull/86
    return error === 8;
  }
}();

// Bug in WebKit. It should truncate a negative fractional index to zero, but instead throws an error
var THROW_ON_NEGATIVE_FRACTIONAL_INDEX = PROPER_ORDER && function () {
  try {
    // eslint-disable-next-line es/no-typed-arrays, es/no-array-prototype-with -- required for testing
    new Int8Array(1)['with'](-0.5, 1);
  } catch (error) {
    return true;
  }
}();

// `%TypedArray%.prototype.with` method
// https://tc39.es/ecma262/#sec-%typedarray%.prototype.with
exportTypedArrayMethod('with', { 'with': function (index, value) {
  var O = aTypedArray(this);
  var relativeIndex = toIntegerOrInfinity(index);
  var actualValue = isBigIntArray(O) ? toBigInt(value) : +value;
  return arrayWith(O, getTypedArrayConstructor(O), relativeIndex, actualValue);
} }['with'], !PROPER_ORDER || THROW_ON_NEGATIVE_FRACTIONAL_INDEX);


/***/ }),

/***/ 9597:
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

"use strict";
// Currently in sync with Node.js lib/internal/errors.js
// https://github.com/nodejs/node/commit/3b044962c48fe313905877a96b5d0894a5404f6f

/* eslint node-core/documented-errors: "error" */
/* eslint node-core/alphabetize-errors: "error" */
/* eslint node-core/prefer-util-format-errors: "error" */



// The whole point behind this internal module is to allow Node.js to no
// longer be forced to treat every error message change as a semver-major
// change. The NodeError classes here all expose a `code` property whose
// value statically and permanently identifies the error. While the error
// message may change, the code should not.
function _typeof(o) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (o) { return typeof o; } : function (o) { return o && "function" == typeof Symbol && o.constructor === Symbol && o !== Symbol.prototype ? "symbol" : typeof o; }, _typeof(o); }
function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, _toPropertyKey(descriptor.key), descriptor); } }
function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); Object.defineProperty(Constructor, "prototype", { writable: false }); return Constructor; }
function _toPropertyKey(arg) { var key = _toPrimitive(arg, "string"); return _typeof(key) === "symbol" ? key : String(key); }
function _toPrimitive(input, hint) { if (_typeof(input) !== "object" || input === null) return input; var prim = input[Symbol.toPrimitive]; if (prim !== undefined) { var res = prim.call(input, hint || "default"); if (_typeof(res) !== "object") return res; throw new TypeError("@@toPrimitive must return a primitive value."); } return (hint === "string" ? String : Number)(input); }
function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }
function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function"); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, writable: true, configurable: true } }); Object.defineProperty(subClass, "prototype", { writable: false }); if (superClass) _setPrototypeOf(subClass, superClass); }
function _setPrototypeOf(o, p) { _setPrototypeOf = Object.setPrototypeOf ? Object.setPrototypeOf.bind() : function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return _setPrototypeOf(o, p); }
function _createSuper(Derived) { var hasNativeReflectConstruct = _isNativeReflectConstruct(); return function _createSuperInternal() { var Super = _getPrototypeOf(Derived), result; if (hasNativeReflectConstruct) { var NewTarget = _getPrototypeOf(this).constructor; result = Reflect.construct(Super, arguments, NewTarget); } else { result = Super.apply(this, arguments); } return _possibleConstructorReturn(this, result); }; }
function _possibleConstructorReturn(self, call) { if (call && (_typeof(call) === "object" || typeof call === "function")) { return call; } else if (call !== void 0) { throw new TypeError("Derived constructors may only return object or undefined"); } return _assertThisInitialized(self); }
function _assertThisInitialized(self) { if (self === void 0) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return self; }
function _isNativeReflectConstruct() { if (typeof Reflect === "undefined" || !Reflect.construct) return false; if (Reflect.construct.sham) return false; if (typeof Proxy === "function") return true; try { Boolean.prototype.valueOf.call(Reflect.construct(Boolean, [], function () {})); return true; } catch (e) { return false; } }
function _getPrototypeOf(o) { _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf.bind() : function _getPrototypeOf(o) { return o.__proto__ || Object.getPrototypeOf(o); }; return _getPrototypeOf(o); }
var codes = {};

// Lazy loaded
var assert;
var util;
function createErrorType(code, message, Base) {
  if (!Base) {
    Base = Error;
  }
  function getMessage(arg1, arg2, arg3) {
    if (typeof message === 'string') {
      return message;
    } else {
      return message(arg1, arg2, arg3);
    }
  }
  var NodeError = /*#__PURE__*/function (_Base) {
    _inherits(NodeError, _Base);
    var _super = _createSuper(NodeError);
    function NodeError(arg1, arg2, arg3) {
      var _this;
      _classCallCheck(this, NodeError);
      _this = _super.call(this, getMessage(arg1, arg2, arg3));
      _this.code = code;
      return _this;
    }
    return _createClass(NodeError);
  }(Base);
  codes[code] = NodeError;
}

// https://github.com/nodejs/node/blob/v10.8.0/lib/internal/errors.js
function oneOf(expected, thing) {
  if (Array.isArray(expected)) {
    var len = expected.length;
    expected = expected.map(function (i) {
      return String(i);
    });
    if (len > 2) {
      return "one of ".concat(thing, " ").concat(expected.slice(0, len - 1).join(', '), ", or ") + expected[len - 1];
    } else if (len === 2) {
      return "one of ".concat(thing, " ").concat(expected[0], " or ").concat(expected[1]);
    } else {
      return "of ".concat(thing, " ").concat(expected[0]);
    }
  } else {
    return "of ".concat(thing, " ").concat(String(expected));
  }
}

// https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/String/startsWith
function startsWith(str, search, pos) {
  return str.substr(!pos || pos < 0 ? 0 : +pos, search.length) === search;
}

// https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/String/endsWith
function endsWith(str, search, this_len) {
  if (this_len === undefined || this_len > str.length) {
    this_len = str.length;
  }
  return str.substring(this_len - search.length, this_len) === search;
}

// https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/String/includes
function includes(str, search, start) {
  if (typeof start !== 'number') {
    start = 0;
  }
  if (start + search.length > str.length) {
    return false;
  } else {
    return str.indexOf(search, start) !== -1;
  }
}
createErrorType('ERR_AMBIGUOUS_ARGUMENT', 'The "%s" argument is ambiguous. %s', TypeError);
createErrorType('ERR_INVALID_ARG_TYPE', function (name, expected, actual) {
  if (assert === undefined) assert = __webpack_require__(4148);
  assert(typeof name === 'string', "'name' must be a string");

  // determiner: 'must be' or 'must not be'
  var determiner;
  if (typeof expected === 'string' && startsWith(expected, 'not ')) {
    determiner = 'must not be';
    expected = expected.replace(/^not /, '');
  } else {
    determiner = 'must be';
  }
  var msg;
  if (endsWith(name, ' argument')) {
    // For cases like 'first argument'
    msg = "The ".concat(name, " ").concat(determiner, " ").concat(oneOf(expected, 'type'));
  } else {
    var type = includes(name, '.') ? 'property' : 'argument';
    msg = "The \"".concat(name, "\" ").concat(type, " ").concat(determiner, " ").concat(oneOf(expected, 'type'));
  }

  // TODO(BridgeAR): Improve the output by showing `null` and similar.
  msg += ". Received type ".concat(_typeof(actual));
  return msg;
}, TypeError);
createErrorType('ERR_INVALID_ARG_VALUE', function (name, value) {
  var reason = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : 'is invalid';
  if (util === undefined) util = __webpack_require__(537);
  var inspected = util.inspect(value);
  if (inspected.length > 128) {
    inspected = "".concat(inspected.slice(0, 128), "...");
  }
  return "The argument '".concat(name, "' ").concat(reason, ". Received ").concat(inspected);
}, TypeError, RangeError);
createErrorType('ERR_INVALID_RETURN_VALUE', function (input, name, value) {
  var type;
  if (value && value.constructor && value.constructor.name) {
    type = "instance of ".concat(value.constructor.name);
  } else {
    type = "type ".concat(_typeof(value));
  }
  return "Expected ".concat(input, " to be returned from the \"").concat(name, "\"") + " function but got ".concat(type, ".");
}, TypeError);
createErrorType('ERR_MISSING_ARGS', function () {
  for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
    args[_key] = arguments[_key];
  }
  if (assert === undefined) assert = __webpack_require__(4148);
  assert(args.length > 0, 'At least one arg needs to be specified');
  var msg = 'The ';
  var len = args.length;
  args = args.map(function (a) {
    return "\"".concat(a, "\"");
  });
  switch (len) {
    case 1:
      msg += "".concat(args[0], " argument");
      break;
    case 2:
      msg += "".concat(args[0], " and ").concat(args[1], " arguments");
      break;
    default:
      msg += args.slice(0, len - 1).join(', ');
      msg += ", and ".concat(args[len - 1], " arguments");
      break;
  }
  return "".concat(msg, " must be specified");
}, TypeError);
module.exports.codes = codes;

/***/ }),

/***/ 9600:
/***/ ((module) => {

"use strict";


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
var toStr = Object.prototype.toString;
var objectClass = '[object Object]';
var fnClass = '[object Function]';
var genClass = '[object GeneratorFunction]';
var ddaClass = '[object HTMLAllCollection]'; // IE 11
var ddaClass2 = '[object HTML document.all class]';
var ddaClass3 = '[object HTMLCollection]'; // IE 9-10
var hasToStringTag = typeof Symbol === 'function' && !!Symbol.toStringTag; // better: use `has-tostringtag`

var isIE68 = !(0 in [,]); // eslint-disable-line no-sparse-arrays, comma-spacing

var isDDA = function isDocumentDotAll() { return false; };
if (typeof document === 'object') {
	// Firefox 3 canonicalizes DDA to undefined when it's not accessed directly
	var all = document.all;
	if (toStr.call(all) === toStr.call(document.all)) {
		isDDA = function isDocumentDotAll(value) {
			/* globals document: false */
			// in IE 6-8, typeof document.all is "object" and it's truthy
			if ((isIE68 || !value) && (typeof value === 'undefined' || typeof value === 'object')) {
				try {
					var str = toStr.call(value);
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

module.exports = reflectApply
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
		if (hasToStringTag) { return tryFunctionObject(value); }
		if (isES6ClassFn(value)) { return false; }
		var strClass = toStr.call(value);
		if (strClass !== fnClass && strClass !== genClass && !(/^\[object HTML/).test(strClass)) { return false; }
		return tryFunctionObject(value);
	};


/***/ }),

/***/ 9612:
/***/ ((module) => {

"use strict";


/** @type {import('.')} */
module.exports = Object;


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

/***/ 9631:
/***/ ((__unused_webpack_module, __unused_webpack_exports, __webpack_require__) => {

"use strict";

var $ = __webpack_require__(6518);
var globalThis = __webpack_require__(4576);
var uncurryThis = __webpack_require__(9504);
var anObjectOrUndefined = __webpack_require__(3972);
var anUint8Array = __webpack_require__(4154);
var notDetached = __webpack_require__(5169);
var base64Map = __webpack_require__(2804);
var getAlphabetOption = __webpack_require__(944);

var base64Alphabet = base64Map.i2c;
var base64UrlAlphabet = base64Map.i2cUrl;

var charAt = uncurryThis(''.charAt);

// `Uint8Array.prototype.toBase64` method
// https://github.com/tc39/proposal-arraybuffer-base64
if (globalThis.Uint8Array) $({ target: 'Uint8Array', proto: true }, {
  toBase64: function toBase64(/* options */) {
    var array = anUint8Array(this);
    var options = arguments.length ? anObjectOrUndefined(arguments[0]) : undefined;
    var alphabet = getAlphabetOption(options) === 'base64' ? base64Alphabet : base64UrlAlphabet;
    var omitPadding = !!options && !!options.omitPadding;
    notDetached(this.buffer);

    var result = '';
    var i = 0;
    var length = array.length;
    var triplet;

    var at = function (shift) {
      return charAt(alphabet, (triplet >> (6 * shift)) & 63);
    };

    for (; i + 2 < length; i += 3) {
      triplet = (array[i] << 16) + (array[i + 1] << 8) + array[i + 2];
      result += at(3) + at(2) + at(1) + at(0);
    }
    if (i + 2 === length) {
      triplet = (array[i] << 16) + (array[i + 1] << 8);
      result += at(3) + at(2) + at(1) + (omitPadding ? '' : '=');
    } else if (i + 1 === length) {
      triplet = array[i] << 16;
      result += at(3) + at(2) + (omitPadding ? '' : '==');
    }

    return result;
  }
});


/***/ }),

/***/ 9675:
/***/ ((module) => {

"use strict";


/** @type {import('./type')} */
module.exports = TypeError;


/***/ }),

/***/ 9721:
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

"use strict";


var callBound = __webpack_require__(6556);
var isRegex = __webpack_require__(4035);

var $exec = callBound('RegExp.prototype.exec');
var $TypeError = __webpack_require__(9675);

/** @type {import('.')} */
module.exports = function regexTester(regex) {
	if (!isRegex(regex)) {
		throw new $TypeError('`regex` must be a RegExp');
	}
	return function test(s) {
		return $exec(regex, s) !== null;
	};
};


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

/***/ 9762:
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

"use strict";


var _undefined = __webpack_require__(6011)(); // Support ES3 engines

module.exports = function (val) { return val !== _undefined && val !== null; };


/***/ }),

/***/ 9797:
/***/ ((__unused_webpack_module, __unused_webpack_exports, __webpack_require__) => {

"use strict";

var $ = __webpack_require__(6518);
var globalThis = __webpack_require__(4576);
var aString = __webpack_require__(3463);
var anUint8Array = __webpack_require__(4154);
var notDetached = __webpack_require__(5169);
var $fromHex = __webpack_require__(2303);

// `Uint8Array.prototype.setFromHex` method
// https://github.com/tc39/proposal-arraybuffer-base64
if (globalThis.Uint8Array) $({ target: 'Uint8Array', proto: true }, {
  setFromHex: function setFromHex(string) {
    anUint8Array(this);
    aString(string);
    notDetached(this.buffer);
    var read = $fromHex(string, this).read;
    return { read: read, written: read / 2 };
  }
});


/***/ }),

/***/ 9798:
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

"use strict";
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   A: () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var core_js_modules_es_iterator_constructor_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(8111);
/* harmony import */ var core_js_modules_es_iterator_for_each_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(7588);
/* harmony import */ var core_js_modules_esnext_map_delete_all_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(1517);
/* harmony import */ var core_js_modules_esnext_map_emplace_js__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(1379);
/* harmony import */ var core_js_modules_esnext_map_every_js__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(3777);
/* harmony import */ var core_js_modules_esnext_map_filter_js__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(4190);
/* harmony import */ var core_js_modules_esnext_map_find_js__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(2359);
/* harmony import */ var core_js_modules_esnext_map_find_key_js__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(6097);
/* harmony import */ var core_js_modules_esnext_map_get_or_insert_js__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(7254);
/* harmony import */ var core_js_modules_esnext_map_get_or_insert_computed_js__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(7036);
/* harmony import */ var core_js_modules_esnext_map_includes_js__WEBPACK_IMPORTED_MODULE_10__ = __webpack_require__(7273);
/* harmony import */ var core_js_modules_esnext_map_key_of_js__WEBPACK_IMPORTED_MODULE_11__ = __webpack_require__(7415);
/* harmony import */ var core_js_modules_esnext_map_map_keys_js__WEBPACK_IMPORTED_MODULE_12__ = __webpack_require__(9929);
/* harmony import */ var core_js_modules_esnext_map_map_values_js__WEBPACK_IMPORTED_MODULE_13__ = __webpack_require__(7583);
/* harmony import */ var core_js_modules_esnext_map_merge_js__WEBPACK_IMPORTED_MODULE_14__ = __webpack_require__(5122);
/* harmony import */ var core_js_modules_esnext_map_reduce_js__WEBPACK_IMPORTED_MODULE_15__ = __webpack_require__(230);
/* harmony import */ var core_js_modules_esnext_map_some_js__WEBPACK_IMPORTED_MODULE_16__ = __webpack_require__(7268);
/* harmony import */ var core_js_modules_esnext_map_update_js__WEBPACK_IMPORTED_MODULE_17__ = __webpack_require__(9733);
/* harmony import */ var _utils_core__WEBPACK_IMPORTED_MODULE_18__ = __webpack_require__(9046);




















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
    const meta = (0,_utils_core__WEBPACK_IMPORTED_MODULE_18__.qsp)(doc, "meta", {
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
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (Manifest);

/***/ }),

/***/ 9928:
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

"use strict";

var lengthOfArrayLike = __webpack_require__(6198);
var toIntegerOrInfinity = __webpack_require__(1291);

var $RangeError = RangeError;

// https://tc39.es/proposal-change-array-by-copy/#sec-array.prototype.with
// https://tc39.es/proposal-change-array-by-copy/#sec-%typedarray%.prototype.with
module.exports = function (O, C, index, value) {
  var len = lengthOfArrayLike(O);
  var relativeIndex = toIntegerOrInfinity(index);
  var actualIndex = relativeIndex < 0 ? len + relativeIndex : relativeIndex;
  if (actualIndex >= len || actualIndex < 0) throw new $RangeError('Incorrect index');
  var A = new C(len);
  var k = 0;
  for (; k < len; k++) A[k] = k === actualIndex ? value : O[k];
  return A;
};


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

/***/ 9948:
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

"use strict";

var arrayFromConstructorAndList = __webpack_require__(5370);
var getTypedArrayConstructor = (__webpack_require__(4644).getTypedArrayConstructor);

module.exports = function (instance, list) {
  return arrayFromConstructorAndList(getTypedArrayConstructor(instance), list);
};


/***/ }),

/***/ 9957:
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

"use strict";


var call = Function.prototype.call;
var $hasOwn = Object.prototype.hasOwnProperty;
var bind = __webpack_require__(6743);

/** @type {import('.')} */
module.exports = bind.call(call, $hasOwn);


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
/************************************************************************/
var __webpack_exports__ = {};
// This entry needs to be wrapped in an IIFE because it needs to be in strict mode.
(() => {
"use strict";
/* harmony import */ var core_js_modules_es_array_buffer_detached_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(6573);
/* harmony import */ var core_js_modules_es_array_buffer_transfer_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(8100);
/* harmony import */ var core_js_modules_es_array_buffer_transfer_to_fixed_length_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(7936);
/* harmony import */ var core_js_modules_es_typed_array_to_reversed_js__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(7467);
/* harmony import */ var core_js_modules_es_typed_array_to_sorted_js__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(4732);
/* harmony import */ var core_js_modules_es_typed_array_with_js__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(9577);
/* harmony import */ var core_js_modules_esnext_typed_array_filter_reject_js__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(7350);
/* harmony import */ var core_js_modules_esnext_typed_array_group_by_js__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(3241);
/* harmony import */ var core_js_modules_esnext_typed_array_to_spliced_js__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(7302);
/* harmony import */ var core_js_modules_esnext_typed_array_unique_by_js__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(5871);
/* harmony import */ var core_js_modules_esnext_uint8_array_set_from_base64_js__WEBPACK_IMPORTED_MODULE_10__ = __webpack_require__(1549);
/* harmony import */ var core_js_modules_esnext_uint8_array_set_from_hex_js__WEBPACK_IMPORTED_MODULE_11__ = __webpack_require__(9797);
/* harmony import */ var core_js_modules_esnext_uint8_array_to_base64_js__WEBPACK_IMPORTED_MODULE_12__ = __webpack_require__(9631);
/* harmony import */ var core_js_modules_esnext_uint8_array_to_hex_js__WEBPACK_IMPORTED_MODULE_13__ = __webpack_require__(5623);
/* harmony import */ var core_js_modules_web_dom_exception_stack_js__WEBPACK_IMPORTED_MODULE_14__ = __webpack_require__(4979);
/* harmony import */ var assert__WEBPACK_IMPORTED_MODULE_15__ = __webpack_require__(4148);
/* harmony import */ var _src_book__WEBPACK_IMPORTED_MODULE_16__ = __webpack_require__(8378);

















const arrayBufferToBase64 = buffer => {
  let binary = "";
  let bytes = new Uint8Array(buffer);
  let len = bytes.byteLength;
  for (let i = 0; i < len; i++) {
    binary += String.fromCharCode(bytes[i]);
  }
  return window.btoa(binary);
};
const assertion = (book, {
  archived,
  url
}) => {
  assert__WEBPACK_IMPORTED_MODULE_15__.equal(book.isOpen, true);
  assert__WEBPACK_IMPORTED_MODULE_15__.equal(book.archived, archived);
  assert__WEBPACK_IMPORTED_MODULE_15__.equal(book.url.toString(), url);
  assert__WEBPACK_IMPORTED_MODULE_15__.equal(book.container.directory, "OPS/");
  assert__WEBPACK_IMPORTED_MODULE_15__.equal(book.container.fullPath, "OPS/package.opf");
  assert__WEBPACK_IMPORTED_MODULE_15__.equal(book.container.encoding, "UTF-8");
  assert__WEBPACK_IMPORTED_MODULE_15__.equal(book.container.mediaType, "application/oebps-package+xml");
};
const url = path => {
  let result = location.origin;
  if (/localhost/.test(result)) {
    result += path;
  } else {
    result += "epub-js";
    result += path;
  }
  return result;
};
describe("Book", () => {
  describe("open book from epub file of local server", () => {
    const book = new _src_book__WEBPACK_IMPORTED_MODULE_16__/* ["default"] */ .A();
    const path = url("/assets/alice.epub");
    it("should open a archived epub", async () => {
      await book.open(path);
      await book.opened;
      assertion(book, {
        archived: true,
        url: "/"
      });
    });
    it("should have a blob cover url", async () => {
      const coverUrl = await book.coverUrl();
      assert__WEBPACK_IMPORTED_MODULE_15__(/blob:/.test(coverUrl));
    });
    after(() => {
      book.destroy();
    });
  });
  describe("open book from epub file of remote server", () => {
    const book = new _src_book__WEBPACK_IMPORTED_MODULE_16__/* ["default"] */ .A();
    const path = url("/assets/alice.epub");
    it("should open a archived epub", async () => {
      await book.open(path);
      await book.opened;
      assertion(book, {
        archived: true,
        url: "/"
      });
    });
    it("should have a blob cover url", async () => {
      const coverUrl = await book.coverUrl();
      assert__WEBPACK_IMPORTED_MODULE_15__(/blob:/.test(coverUrl));
    });
    after(() => {
      book.destroy();
    });
  });
  describe("open book from array buffer", () => {
    let book, data;
    before(async () => {
      const response = await fetch(url("/assets/alice.epub"));
      data = await response.arrayBuffer();
      book = new _src_book__WEBPACK_IMPORTED_MODULE_16__/* ["default"] */ .A();
    });
    it("should open a archived epub", async () => {
      await book.open(data);
      await book.opened;
      assertion(book, {
        archived: true,
        url: "/"
      });
    });
    it("should have a blob cover url", async () => {
      const coverUrl = await book.coverUrl();
      assert__WEBPACK_IMPORTED_MODULE_15__(/blob:/.test(coverUrl));
    });
    after(() => {
      book.destroy();
    });
  });
  describe("open book from data URL in base64 encoding", () => {
    let book, data;
    before(async () => {
      const response = await fetch(url("/assets/alice.epub"));
      const blob = await response.blob();
      const buff = await blob.arrayBuffer();
      data = arrayBufferToBase64(buff);
      book = new _src_book__WEBPACK_IMPORTED_MODULE_16__/* ["default"] */ .A();
    });
    it("should open a archived epub", async () => {
      await book.open(data, "base64");
      await book.opened;
      assertion(book, {
        archived: true,
        url: "/"
      });
    });
    it("should have a blob cover url", async () => {
      const coverUrl = await book.coverUrl();
      assert__WEBPACK_IMPORTED_MODULE_15__(/blob:/.test(coverUrl));
    });
    after(() => {
      book.destroy();
    });
  });
  describe("open book from epub file without cover", () => {
    const book = new _src_book__WEBPACK_IMPORTED_MODULE_16__/* ["default"] */ .A();
    const path = url("/assets/alice_without_cover.epub");
    it("should open a archived epub", async () => {
      await book.open(path);
      await book.opened;
      assertion(book, {
        archived: true,
        url: "/"
      });
    });
    it("should have a empty cover url", async () => {
      const coverUrl = await book.coverUrl();
      assert__WEBPACK_IMPORTED_MODULE_15__.equal(coverUrl, null);
    });
    after(() => {
      book.destroy();
    });
  });
  describe("open book from directory of local server", () => {
    const book = new _src_book__WEBPACK_IMPORTED_MODULE_16__/* ["default"] */ .A();
    const path = url("/assets/alice/");
    it("should open a unarchived epub", async () => {
      await book.open(path);
      await book.opened;
      assertion(book, {
        archived: false,
        url: path
      });
    });
    after(() => {
      book.destroy();
    });
  });
  describe("open book from directory of remote server", () => {
    const book = new _src_book__WEBPACK_IMPORTED_MODULE_16__/* ["default"] */ .A();
    const path = url("/assets/alice/");
    it("should open a unarchived epub", async () => {
      await book.open(path);
      await book.opened;
      assertion(book, {
        archived: false,
        url: path
      });
    });
    after(() => {
      book.destroy();
    });
  });
});
})();

// This entry needs to be wrapped in an IIFE because it needs to be in strict mode.
(() => {
"use strict";
/* harmony import */ var assert__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(4148);
/* harmony import */ var _src_utils_request__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(3412);
/* harmony import */ var _src_epubcfi__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(7421);



describe("EpubCFI", () => {
  let doc1, doc2, doc3;
  before(async () => {
    doc1 = await (0,_src_utils_request__WEBPACK_IMPORTED_MODULE_1__/* ["default"] */ .A)("../assets/chapter1.xhtml");
    doc2 = await (0,_src_utils_request__WEBPACK_IMPORTED_MODULE_1__/* ["default"] */ .A)("../assets/chapter1-highlights.xhtml");
    doc3 = await (0,_src_utils_request__WEBPACK_IMPORTED_MODULE_1__/* ["default"] */ .A)("../assets/highlight.xhtml");
  });
  describe("#constructor()", () => {
    it("should parse a cfi on init", () => {
      const cfi = new _src_epubcfi__WEBPACK_IMPORTED_MODULE_2__/* ["default"] */ .A("epubcfi(/6/2[cover]!/6)");
      assert__WEBPACK_IMPORTED_MODULE_0__.equal(cfi.spinePos, 0);
    });
    it("should parse a cfi and ignore the base if present", () => {
      const cfi = new _src_epubcfi__WEBPACK_IMPORTED_MODULE_2__/* ["default"] */ .A("epubcfi(/6/2[cover]!/6)", "/6/6[end]");
      assert__WEBPACK_IMPORTED_MODULE_0__.equal(cfi.spinePos, 0);
    });
  });
  describe("#parse()", () => {
    it("should parse a cfi", () => {
      const cfi = "epubcfi(/6/2[cover]!/6)";
      const parsed = _src_epubcfi__WEBPACK_IMPORTED_MODULE_2__/* ["default"] */ .A.prototype.parse(cfi);
      assert__WEBPACK_IMPORTED_MODULE_0__.equal(parsed.spinePos, 0);
    });
    xit("should parse a cfi and ignore the base if present", () => {
      const cfi = "epubcfi(/6/2[cover]!/6)";
      const parsed = _src_epubcfi__WEBPACK_IMPORTED_MODULE_2__/* ["default"] */ .A.prototype.parse(cfi, "/6/6[end]");
      assert__WEBPACK_IMPORTED_MODULE_0__.equal(parsed.spinePos, 0);
    }); // TODO: comparison of the base component from the parse method is not implemented
    it("should parse a cfi with a character offset", () => {
      const cfi = "epubcfi(/6/4[chap01ref]!/4[body01]/10[para05]/2/1:3)";
      const parsed = _src_epubcfi__WEBPACK_IMPORTED_MODULE_2__/* ["default"] */ .A.prototype.parse(cfi);
      assert__WEBPACK_IMPORTED_MODULE_0__.equal(parsed.path.terminal.offset, 3);
    });
    it("should parse a cfi with a range", () => {
      const cfi = "epubcfi(/6/4[chap01ref]!/4[body01]/10[para05],/2/1:1,/3:4)";
      const parsed = _src_epubcfi__WEBPACK_IMPORTED_MODULE_2__/* ["default"] */ .A.prototype.parse(cfi);
      assert__WEBPACK_IMPORTED_MODULE_0__.equal(parsed.range, true);
      assert__WEBPACK_IMPORTED_MODULE_0__.equal(parsed.start.steps.length, 2);
      assert__WEBPACK_IMPORTED_MODULE_0__.equal(parsed.end.steps.length, 1);
      assert__WEBPACK_IMPORTED_MODULE_0__.equal(parsed.start.terminal.offset, 1);
      assert__WEBPACK_IMPORTED_MODULE_0__.equal(parsed.end.terminal.offset, 4);
    });
  });
  describe("#toString()", () => {
    it("should parse a cfi and write it back", () => {
      const cfi1 = "epubcfi(/6/2[cover]!/6)";
      const cfi2 = "epubcfi(/6/4[chap01ref]!/4[body01]/10[para05]/2/1:3)";
      const cfi3 = "epubcfi(/6/4[chap01ref]!/4[body01]/10[para05],/2/1:1,/3:4)";
      assert__WEBPACK_IMPORTED_MODULE_0__.equal(new _src_epubcfi__WEBPACK_IMPORTED_MODULE_2__/* ["default"] */ .A(cfi1).toString(), cfi1);
      assert__WEBPACK_IMPORTED_MODULE_0__.equal(new _src_epubcfi__WEBPACK_IMPORTED_MODULE_2__/* ["default"] */ .A(cfi2).toString(), cfi2);
      assert__WEBPACK_IMPORTED_MODULE_0__.equal(new _src_epubcfi__WEBPACK_IMPORTED_MODULE_2__/* ["default"] */ .A(cfi3).toString(), cfi3);
    });
  });
  describe("#checkType()", () => {
    it("should determine the type as cfi string", () => {
      assert__WEBPACK_IMPORTED_MODULE_0__.equal(_src_epubcfi__WEBPACK_IMPORTED_MODULE_2__/* ["default"] */ .A.prototype.checkType("epubcfi(/6/2[cover]!/6)"), "string");
    });
    it("should determine the type as EpubCFI instance", () => {
      const cfi = new _src_epubcfi__WEBPACK_IMPORTED_MODULE_2__/* ["default"] */ .A("epubcfi(/6/4[chap01ref]!/4[body01]/10[para05]/2/1:3)");
      assert__WEBPACK_IMPORTED_MODULE_0__.equal(_src_epubcfi__WEBPACK_IMPORTED_MODULE_2__/* ["default"] */ .A.prototype.checkType(cfi), "EpubCFI");
    });
    it("should determine the type as node", () => {
      const node = document.createElement("div");
      assert__WEBPACK_IMPORTED_MODULE_0__.equal(_src_epubcfi__WEBPACK_IMPORTED_MODULE_2__/* ["default"] */ .A.prototype.checkType(node), "node");
    });
    it("should determine the type as range", () => {
      const range = document.createRange();
      assert__WEBPACK_IMPORTED_MODULE_0__.equal(_src_epubcfi__WEBPACK_IMPORTED_MODULE_2__/* ["default"] */ .A.prototype.checkType(range), "range");
    });
    it("should determine the type as undefined", () => {
      assert__WEBPACK_IMPORTED_MODULE_0__.equal(_src_epubcfi__WEBPACK_IMPORTED_MODULE_2__/* ["default"] */ .A.prototype.checkType("/6/2[cover]!/6"), undefined);
    });
  });
  describe("#compare()", () => {
    it("should compare CFIs", () => {
      const epubcfi = new _src_epubcfi__WEBPACK_IMPORTED_MODULE_2__/* ["default"] */ .A();
      // Spines
      assert__WEBPACK_IMPORTED_MODULE_0__.equal(epubcfi.compare("epubcfi(/6/4[cover]!/4)", "epubcfi(/6/2[cover]!/4)"), 1, "First spine is greater");
      assert__WEBPACK_IMPORTED_MODULE_0__.equal(epubcfi.compare("epubcfi(/6/4[cover]!/4)", "epubcfi(/6/6[cover]!/4)"), -1, "Second spine is greater");
      // First is deeper
      assert__WEBPACK_IMPORTED_MODULE_0__.equal(epubcfi.compare("epubcfi(/6/2[cover]!/8/2)", "epubcfi(/6/2[cover]!/6)"), 1, "First Element is after Second");
      assert__WEBPACK_IMPORTED_MODULE_0__.equal(epubcfi.compare("epubcfi(/6/2[cover]!/4/2)", "epubcfi(/6/2[cover]!/6)"), -1, "First Element is before Second");
      // Second is deeper
      assert__WEBPACK_IMPORTED_MODULE_0__.equal(epubcfi.compare("epubcfi(/6/2[cover]!/8/2)", "epubcfi(/6/2[cover]!/6/4/2/2)"), 1, "First Element is after Second");
      assert__WEBPACK_IMPORTED_MODULE_0__.equal(epubcfi.compare("epubcfi(/6/2[cover]!/4/4)", "epubcfi(/6/2[cover]!/6/4/2/2)"), -1, "First Element is before Second");
      assert__WEBPACK_IMPORTED_MODULE_0__.equal(epubcfi.compare("epubcfi(/6/2[cover]!/4/6)", "epubcfi(/6/2[cover]!/4/6/8/1:0)"), -1, "First is less specific, so is before Second");
      // Same Depth
      assert__WEBPACK_IMPORTED_MODULE_0__.equal(epubcfi.compare("epubcfi(/6/2[cover]!/6/8)", "epubcfi(/6/2[cover]!/6/2)"), 1, "First Element is after Second");
      assert__WEBPACK_IMPORTED_MODULE_0__.equal(epubcfi.compare("epubcfi(/6/2[cover]!/4/20)", "epubcfi(/6/2[cover]!/6/10)"), -1, "First Element is before Second");
      // Text nodes
      assert__WEBPACK_IMPORTED_MODULE_0__.equal(epubcfi.compare("epubcfi(/6/2[cover]!/4/5)", "epubcfi(/6/2[cover]!/4/3)"), 1, "First TextNode is after Second");
      assert__WEBPACK_IMPORTED_MODULE_0__.equal(epubcfi.compare("epubcfi(/6/2[cover]!/4/7)", "epubcfi(/6/2[cover]!/4/13)"), -1, "First TextNode is before Second");
      // Char offset
      assert__WEBPACK_IMPORTED_MODULE_0__.equal(epubcfi.compare("epubcfi(/6/2[cover]!/4/5:1)", "epubcfi(/6/2[cover]!/4/5:0)"), 1, "First Char Offset after Second");
      assert__WEBPACK_IMPORTED_MODULE_0__.equal(epubcfi.compare("epubcfi(/6/2[cover]!/4/5:2)", "epubcfi(/6/2[cover]!/4/5:30)"), -1, "Second Char Offset before Second");
      // Normal example
      assert__WEBPACK_IMPORTED_MODULE_0__.equal(epubcfi.compare("epubcfi(/6/2[cover]!/4/8/5:1)", "epubcfi(/6/2[cover]!/4/6/15:2)"), 1, "First Element after Second");
      assert__WEBPACK_IMPORTED_MODULE_0__.equal(epubcfi.compare("epubcfi(/6/2[cover]!/4/8/1:0)", "epubcfi(/6/2[cover]!/4/8/1:0)"), 0, "All Equal");
      // Different Lengths
      assert__WEBPACK_IMPORTED_MODULE_0__.equal(epubcfi.compare("epubcfi(/6/16[id42]!/4[5N3C0-8c483216e03a4ff49927fc1a97dc7b2c]/10/1:317)", "epubcfi(/6/16[id42]!/4[5N3C0-8c483216e03a4ff49927fc1a97dc7b2c]/10/2[page18]/1:0)"), -1, "First CFI is before Second");
      assert__WEBPACK_IMPORTED_MODULE_0__.equal(epubcfi.compare("epubcfi(/6/16[id42]!/4[5N3C0-8c483216e03a4ff49927fc1a97dc7b2c]/12/1:0)", "epubcfi(/6/16[id42]!/4[5N3C0-8c483216e03a4ff49927fc1a97dc7b2c]/12/2/1:9)"), -1, "First CFI is before Second");
      assert__WEBPACK_IMPORTED_MODULE_0__.equal(epubcfi.compare("epubcfi(/6/16!/4/12/1:0)", "epubcfi(/6/16!/4/12/2/1:9)"), -1, "First CFI is before Second");
    });
  });
  describe("#fromNode()", () => {
    const base = "/6/4[chap01ref]";
    it("should get a cfi from a p node", () => {
      const elm = doc2.getElementById("c001p0004");
      const cfi = new _src_epubcfi__WEBPACK_IMPORTED_MODULE_2__/* ["default"] */ .A(elm, base);
      assert__WEBPACK_IMPORTED_MODULE_0__.equal(elm.nodeType, Node.ELEMENT_NODE, "provided a element node");
      assert__WEBPACK_IMPORTED_MODULE_0__.equal(cfi.toString(), "epubcfi(/6/4[chap01ref]!/4/2/10/2[c001p0004])");
    });
    it("should get a cfi from a text node", () => {
      const elm = doc2.getElementById("c001p0004");
      const txt = elm.childNodes[0];
      const cfi = new _src_epubcfi__WEBPACK_IMPORTED_MODULE_2__/* ["default"] */ .A(txt, base);
      assert__WEBPACK_IMPORTED_MODULE_0__.equal(txt.nodeType, Node.TEXT_NODE, "provided a text node");
      assert__WEBPACK_IMPORTED_MODULE_0__.equal(cfi.toString(), "epubcfi(/6/4[chap01ref]!/4/2/10/2[c001p0004]/1)");
    });
    it("should get a cfi from a text node inside a highlight", () => {
      const elm = doc2.getElementById("highlight-1");
      const txt = elm.childNodes[0];
      const cfi = new _src_epubcfi__WEBPACK_IMPORTED_MODULE_2__/* ["default"] */ .A(txt, base, "annotator-hl");
      assert__WEBPACK_IMPORTED_MODULE_0__.equal(txt.nodeType, Node.TEXT_NODE, "provided a text node");
      assert__WEBPACK_IMPORTED_MODULE_0__.equal(cfi.toString(), "epubcfi(/6/4[chap01ref]!/4/2/32/2[c001p0017]/1)");
    });
    it("should get a cfi from a highlight node", () => {
      const txt = doc2.getElementById("highlight-1");
      const cfi = new _src_epubcfi__WEBPACK_IMPORTED_MODULE_2__/* ["default"] */ .A(txt, base, "annotator-hl");
      assert__WEBPACK_IMPORTED_MODULE_0__.equal(txt.nodeType, Node.ELEMENT_NODE, "provided a highlight node");
      assert__WEBPACK_IMPORTED_MODULE_0__.equal(cfi.toString(), "epubcfi(/6/4[chap01ref]!/4/2/32/2[c001p0017])");
    });
  });
  describe("#fromRange()", () => {
    const base = "/6/4[chap01ref]";
    it("should get a cfi from a collapsed range", () => {
      const t1 = doc1.getElementById("c001p0004").childNodes[0];
      const range = doc1.createRange();
      range.setStart(t1, 6);
      const cfi = new _src_epubcfi__WEBPACK_IMPORTED_MODULE_2__/* ["default"] */ .A(range, base);
      assert__WEBPACK_IMPORTED_MODULE_0__.equal(cfi.range, false);
      assert__WEBPACK_IMPORTED_MODULE_0__.equal(cfi.toString(), "epubcfi(/6/4[chap01ref]!/4/2/10/2[c001p0004]/1:6)");
    });
    it("should get a cfi from a range", () => {
      const t1 = doc1.getElementById("c001p0004").childNodes[0];
      const t2 = doc1.getElementById("c001p0007").childNodes[0];
      const range = doc1.createRange();
      range.setStart(t1, 6);
      range.setEnd(t2, 27);
      const cfi = new _src_epubcfi__WEBPACK_IMPORTED_MODULE_2__/* ["default"] */ .A(range, base);
      assert__WEBPACK_IMPORTED_MODULE_0__.equal(cfi.range, true);
      assert__WEBPACK_IMPORTED_MODULE_0__.equal(cfi.toString(), "epubcfi(/6/4[chap01ref]!/4/2,/10/2[c001p0004]/1:6,/16/2[c001p0007]/1:27)");
    });
    it("should get a cfi from a range with offset 0", () => {
      const t1 = doc1.getElementById("c001p0004").childNodes[0];
      const range = doc1.createRange();
      range.setStart(t1, 0);
      range.setEnd(t1, 1);
      const cfi = new _src_epubcfi__WEBPACK_IMPORTED_MODULE_2__/* ["default"] */ .A(range, base);
      assert__WEBPACK_IMPORTED_MODULE_0__.equal(cfi.range, true);
      assert__WEBPACK_IMPORTED_MODULE_0__.equal(cfi.toString(), "epubcfi(/6/4[chap01ref]!/4/2/10/2[c001p0004],/1:0,/1:1)");
    });
    it("should get a cfi from a range inside a highlight", () => {
      const t1 = doc2.getElementById("highlight-1").childNodes[0];
      const range = doc2.createRange();
      range.setStart(t1, 6);
      const cfi = new _src_epubcfi__WEBPACK_IMPORTED_MODULE_2__/* ["default"] */ .A(range, base, "annotator-hl");
      assert__WEBPACK_IMPORTED_MODULE_0__.equal(cfi.toString(), "epubcfi(/6/4[chap01ref]!/4/2/32/2[c001p0017]/1:43)");
    });
    it("should get a cfi from a range past a highlight", () => {
      const t1 = doc2.getElementById("c001s0001").childNodes[1];
      const range = doc2.createRange();
      range.setStart(t1, 25);
      const cfi = new _src_epubcfi__WEBPACK_IMPORTED_MODULE_2__/* ["default"] */ .A(range, base, "annotator-hl");
      assert__WEBPACK_IMPORTED_MODULE_0__.equal(cfi.toString(), "epubcfi(/6/4[chap01ref]!/4/2/4/2[c001s0001]/1:41)");
    }); // TODO: might need to have double ranges in front
    it("should get a cfi from a range in between two highlights", () => {
      const t1 = doc3.getElementById("p2").childNodes[1];
      const range = doc3.createRange();
      range.setStart(t1, 4);
      const cfi = new _src_epubcfi__WEBPACK_IMPORTED_MODULE_2__/* ["default"] */ .A(range, base, "annotator-hl");
      assert__WEBPACK_IMPORTED_MODULE_0__.equal(cfi.toString(), "epubcfi(/6/4[chap01ref]!/4/4[p2]/1:123)");
    });
    it("should correctly count text nodes, independent of any elements present in between", () => {
      const t1 = doc3.getElementById("p3").childNodes[2];
      const range = doc3.createRange();
      range.setStart(t1, 4);
      const cfi = new _src_epubcfi__WEBPACK_IMPORTED_MODULE_2__/* ["default"] */ .A(range, base);
      assert__WEBPACK_IMPORTED_MODULE_0__.equal(cfi.toString(), "epubcfi(/6/4[chap01ref]!/4/6[p3]/3:4)");
    });
  });
  describe("#toRange()", () => {
    const base = "/6/4[chap01ref]";
    const ignoreClass = "annotator-hl";
    it("should get a range from a cfi", () => {
      const t1 = doc2.getElementById("c001p0004").childNodes[0];
      const ogRange = doc2.createRange();
      ogRange.setStart(t1, 6);
      const cfi = new _src_epubcfi__WEBPACK_IMPORTED_MODULE_2__/* ["default"] */ .A(ogRange, base);
      // Check it was parse correctly
      assert__WEBPACK_IMPORTED_MODULE_0__.equal(cfi.toString(), "epubcfi(/6/4[chap01ref]!/4/2/10/2[c001p0004]/1:6)");
      // Check the range
      const newRange = cfi.toRange(doc2);
      assert__WEBPACK_IMPORTED_MODULE_0__.equal(newRange.startContainer, t1);
      assert__WEBPACK_IMPORTED_MODULE_0__.equal(newRange.startOffset, 6);
      assert__WEBPACK_IMPORTED_MODULE_0__.equal(newRange.collapsed, true);
    });
    it("should get a range from a cfi with a range", () => {
      const t1 = doc2.getElementById("c001p0004").childNodes[0];
      const t2 = doc2.getElementById("c001p0007").childNodes[0];
      const ogRange = doc2.createRange();
      ogRange.setStart(t1, 6);
      ogRange.setEnd(t2, 27);
      const cfi = new _src_epubcfi__WEBPACK_IMPORTED_MODULE_2__/* ["default"] */ .A(ogRange, base);
      // Check it was parse correctly
      assert__WEBPACK_IMPORTED_MODULE_0__.equal(cfi.toString(), "epubcfi(/6/4[chap01ref]!/4/2,/10/2[c001p0004]/1:6,/16/2[c001p0007]/1:27)");
      // Check the range
      const newRange = cfi.toRange(doc2);
      assert__WEBPACK_IMPORTED_MODULE_0__.equal(newRange.startContainer, t1);
      assert__WEBPACK_IMPORTED_MODULE_0__.equal(newRange.startOffset, 6);
      assert__WEBPACK_IMPORTED_MODULE_0__.equal(newRange.endContainer, t2);
      assert__WEBPACK_IMPORTED_MODULE_0__.equal(newRange.endOffset, 27);
      assert__WEBPACK_IMPORTED_MODULE_0__.equal(newRange.collapsed, false);
    });
    xit("should get a cfi from a range inside a highlight", () => {
      const t1 = doc2.getElementById("highlight-1").childNodes[0];
      const ogRange = doc2.createRange();
      ogRange.setStart(t1, 6);
      const cfi = new _src_epubcfi__WEBPACK_IMPORTED_MODULE_2__/* ["default"] */ .A(ogRange, base, ignoreClass);
      assert__WEBPACK_IMPORTED_MODULE_0__.equal(cfi.toString(), "epubcfi(/6/4[chap01ref]!/4/2/32/2[c001p0017]/1:43)");
      // Check the range
      const newRange = cfi.toRange(doc2, ignoreClass);
      assert__WEBPACK_IMPORTED_MODULE_0__.equal(newRange.startContainer, t1);
      assert__WEBPACK_IMPORTED_MODULE_0__.equal(newRange.startContainer.textContent, t1.textContent);
      assert__WEBPACK_IMPORTED_MODULE_0__.equal(newRange.startOffset, 6);
      assert__WEBPACK_IMPORTED_MODULE_0__.equal(newRange.collapsed, true);
    });
    xit("should get a cfi from a range inside a highlight range", () => {
      const t1 = doc2.getElementById("highlight-2").childNodes[0];
      const t2 = doc2.getElementById("c001s0001").childNodes[1];
      const ogRange = doc2.createRange();
      ogRange.setStart(t1, 5);
      ogRange.setEnd(t2, 25);
      const cfi = new _src_epubcfi__WEBPACK_IMPORTED_MODULE_2__/* ["default"] */ .A(ogRange, base, ignoreClass);
      assert__WEBPACK_IMPORTED_MODULE_0__.equal(cfi.toString(), "epubcfi(/6/4[chap01ref]!/4/2/4/2[c001s0001],/1:5,/1:41)");
      // Check the range
      const newRange = cfi.toRange(doc2, ignoreClass);
      assert__WEBPACK_IMPORTED_MODULE_0__.equal(newRange.startContainer, t1);
      assert__WEBPACK_IMPORTED_MODULE_0__.equal(newRange.startContainer.textContent, t1.textContent);
      assert__WEBPACK_IMPORTED_MODULE_0__.equal(newRange.startOffset, 5);
      assert__WEBPACK_IMPORTED_MODULE_0__.equal(newRange.endContainer, t2);
      assert__WEBPACK_IMPORTED_MODULE_0__.equal(newRange.endContainer.textContent, t2.textContent);
      assert__WEBPACK_IMPORTED_MODULE_0__.equal(newRange.endOffset, 25);
      assert__WEBPACK_IMPORTED_MODULE_0__.equal(newRange.collapsed, false);
    });
  });
  describe("#isCfiString()", () => {
    it("should check if the string is wrapped using 'epubcfi()'", () => {
      const cfi = new _src_epubcfi__WEBPACK_IMPORTED_MODULE_2__/* ["default"] */ .A();
      assert__WEBPACK_IMPORTED_MODULE_0__.equal(cfi.isCfiString("epubcfi(/6/4[chap01ref]!/4/2,/10/2[c001p0004]/1:6,/16/2[c001p0007]/1:27)"), true);
    });
  });
});
})();

// This entry needs to be wrapped in an IIFE because it needs to be in strict mode.
(() => {
"use strict";
/* harmony import */ var core_js_modules_es_array_push_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(4114);
/* harmony import */ var assert__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(4148);
/* harmony import */ var _src_book__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(8378);
/* harmony import */ var _src_locations__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(8823);




describe("Locations", () => {
  let book,
    rendition,
    sections = {};
  before(async () => {
    book = new _src_book__WEBPACK_IMPORTED_MODULE_2__/* ["default"] */ .A("../assets/alice/");
    await book.opened;
    rendition = book.renderTo(document.body);
    const set = (index, section) => {
      sections[index] = {
        cfi: rendition.currentLocation().start.cfi,
        idx: section.index
      };
    };
    const tasks = [];
    for (let i = 2; i < 13; ++i) {
      tasks.push(rendition.display(i).then(s => set(i, s)));
    }
    return Promise.all(tasks);
  });
  describe("#parse()", () => {
    it("should parse locations from a document", async () => {
      const sec = book.section(sections[2].idx);
      const lcs = new _src_locations__WEBPACK_IMPORTED_MODULE_3__/* ["default"] */ .A();
      await lcs.parse(sec.contents, sec.cfiBase, 549);
      const loc = [...lcs.values()][0];
      assert__WEBPACK_IMPORTED_MODULE_1__.equal(lcs.size, 1);
      assert__WEBPACK_IMPORTED_MODULE_1__.equal(loc.cfi, "epubcfi(/6/6!/4/2,/4[pgepubid00001]/1:0,/14/4/2/1:33)");
      assert__WEBPACK_IMPORTED_MODULE_1__.equal(loc.index, 0);
      assert__WEBPACK_IMPORTED_MODULE_1__.equal(loc.percentage, 0);
    });
  });
  describe("#generate()", () => {
    it("should generate locations", async () => {
      await book.locations.generate(549);
      assert__WEBPACK_IMPORTED_MODULE_1__.equal(book.locations.size, 101);
    });
  });
  describe("#set()", () => {
    it("should set current location by epubcfi", async () => {
      const locs = book.locations;
      const curr = book.locations.current;
      locs.set({
        cfi: sections[3].cfi
      });
      assert__WEBPACK_IMPORTED_MODULE_1__.equal(curr.index, 1);
      assert__WEBPACK_IMPORTED_MODULE_1__.equal(curr.percentage, 0.01);
      locs.set({
        cfi: sections[4].cfi
      });
      assert__WEBPACK_IMPORTED_MODULE_1__.equal(curr.index, 14);
      assert__WEBPACK_IMPORTED_MODULE_1__.equal(curr.percentage, 0.14);
      locs.set({
        cfi: sections[5].cfi
      });
      assert__WEBPACK_IMPORTED_MODULE_1__.equal(curr.index, 25);
      assert__WEBPACK_IMPORTED_MODULE_1__.equal(curr.percentage, 0.25);
      locs.set({
        cfi: sections[6].cfi
      });
      assert__WEBPACK_IMPORTED_MODULE_1__.equal(curr.index, 36);
      assert__WEBPACK_IMPORTED_MODULE_1__.equal(curr.percentage, 0.36);
      locs.set({
        cfi: sections[7].cfi
      });
      assert__WEBPACK_IMPORTED_MODULE_1__.equal(curr.index, 50);
      assert__WEBPACK_IMPORTED_MODULE_1__.equal(curr.percentage, 0.50);
      locs.set({
        cfi: sections[8].cfi
      });
      assert__WEBPACK_IMPORTED_MODULE_1__.equal(curr.index, 61);
      assert__WEBPACK_IMPORTED_MODULE_1__.equal(curr.percentage, 0.61);
      locs.set({
        cfi: sections[9].cfi
      });
      assert__WEBPACK_IMPORTED_MODULE_1__.equal(curr.index, 71);
      assert__WEBPACK_IMPORTED_MODULE_1__.equal(curr.percentage, 0.71);
      locs.set({
        cfi: sections[10].cfi
      });
      assert__WEBPACK_IMPORTED_MODULE_1__.equal(curr.index, 77);
      assert__WEBPACK_IMPORTED_MODULE_1__.equal(curr.percentage, 0.77);
      locs.set({
        cfi: sections[11].cfi
      });
      assert__WEBPACK_IMPORTED_MODULE_1__.equal(curr.index, 89);
      assert__WEBPACK_IMPORTED_MODULE_1__.equal(curr.percentage, 0.89);
      locs.set({
        cfi: sections[12].cfi
      });
      assert__WEBPACK_IMPORTED_MODULE_1__.equal(curr.index, 95);
      assert__WEBPACK_IMPORTED_MODULE_1__.equal(curr.percentage, 0.95);
    });
    it("should set current location by index", () => {
      const locs = book.locations;
      const curr = book.locations.current;
      const keys = [...locs.keys()];
      locs.on("changed", (current, changed) => {
        if (changed.index) {
          assert__WEBPACK_IMPORTED_MODULE_1__.equal(current.cfi, keys[changed.index]);
          assert__WEBPACK_IMPORTED_MODULE_1__.equal(current.index, changed.index);
        }
      });
      locs.set({
        index: 1
      }); // section:3
      assert__WEBPACK_IMPORTED_MODULE_1__.equal(curr.percentage, 0.01);
      locs.set({
        index: 14
      }); // section:4
      assert__WEBPACK_IMPORTED_MODULE_1__.equal(curr.percentage, 0.14);
      locs.set({
        index: 25
      }); // section:5
      assert__WEBPACK_IMPORTED_MODULE_1__.equal(curr.percentage, 0.25);
      locs.set({
        index: 36
      }); // section:6
      assert__WEBPACK_IMPORTED_MODULE_1__.equal(curr.percentage, 0.36);
      locs.set({
        index: 50
      }); // section:7
      assert__WEBPACK_IMPORTED_MODULE_1__.equal(curr.percentage, 0.50);
      locs.set({
        index: 61
      }); // section:8
      assert__WEBPACK_IMPORTED_MODULE_1__.equal(curr.percentage, 0.61);
      locs.set({
        index: 71
      }); // section:9
      assert__WEBPACK_IMPORTED_MODULE_1__.equal(curr.percentage, 0.71);
      locs.set({
        index: 77
      }); // section:10
      assert__WEBPACK_IMPORTED_MODULE_1__.equal(curr.percentage, 0.77);
      locs.set({
        index: 89
      }); // section:11
      assert__WEBPACK_IMPORTED_MODULE_1__.equal(curr.percentage, 0.89);
      locs.set({
        index: 95
      }); // section:12
      assert__WEBPACK_IMPORTED_MODULE_1__.equal(curr.percentage, 0.95);
    });
    it("should set current location by percentage", () => {
      const locs = book.locations;
      const curr = book.locations.current;
      const keys = [...locs.keys()];
      locs.on("changed", (current, changed) => {
        if (changed.percentage) {
          assert__WEBPACK_IMPORTED_MODULE_1__.equal(current.cfi, keys[current.index]);
          assert__WEBPACK_IMPORTED_MODULE_1__.equal(current.percentage, changed.percentage);
        }
      });
      locs.set({
        percentage: 0.01
      }); // section:3
      assert__WEBPACK_IMPORTED_MODULE_1__.equal(curr.index, 1);
      locs.set({
        percentage: 0.14
      }); // section:4
      assert__WEBPACK_IMPORTED_MODULE_1__.equal(curr.index, 14);
      locs.set({
        percentage: 0.25
      }); // section:5
      assert__WEBPACK_IMPORTED_MODULE_1__.equal(curr.index, 25);
      locs.set({
        percentage: 0.36
      }); // section:6
      assert__WEBPACK_IMPORTED_MODULE_1__.equal(curr.index, 36);
      locs.set({
        percentage: 0.50
      }); // section:7
      assert__WEBPACK_IMPORTED_MODULE_1__.equal(curr.index, 50);
      locs.set({
        percentage: 0.61
      }); // section:8
      assert__WEBPACK_IMPORTED_MODULE_1__.equal(curr.index, 61);
      locs.set({
        percentage: 0.71
      }); // section:9
      assert__WEBPACK_IMPORTED_MODULE_1__.equal(curr.index, 71);
      locs.set({
        percentage: 0.77
      }); // section:10
      assert__WEBPACK_IMPORTED_MODULE_1__.equal(curr.index, 77);
      locs.set({
        percentage: 0.89
      }); // section:11
      assert__WEBPACK_IMPORTED_MODULE_1__.equal(curr.index, 89);
      locs.set({
        percentage: 0.95
      }); // section:12
      assert__WEBPACK_IMPORTED_MODULE_1__.equal(curr.index, 95);
    });
  });
  describe("#cfiFromPercentage()", () => {
    it("should get epubcfi from percentage", () => {
      const locs = book.locations;
      const keys = [...locs.keys()];
      keys.forEach((key, index) => {
        const percentage = index / (locs.size - 1);
        assert__WEBPACK_IMPORTED_MODULE_1__.equal(key, locs.cfiFromPercentage(percentage));
      });
    });
  });
  describe("#clear()", () => {
    it("should clear locations", () => {
      book.locations.clear();
      assert__WEBPACK_IMPORTED_MODULE_1__.equal(book.locations.size, 0);
    });
  });
  after(() => {
    book.destroy();
  });
});
})();

// This entry needs to be wrapped in an IIFE because it needs to be in strict mode.
(() => {
"use strict";
/* harmony import */ var core_js_modules_es_array_push_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(4114);
/* harmony import */ var assert__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(4148);
/* harmony import */ var _src_navigation__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(2665);
/* harmony import */ var _src_utils_request__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(3412);




describe("Navigation", () => {
  const items = {};
  before(async () => {
    const tasks = [];
    const task = async (index, path) => {
      return (0,_src_utils_request__WEBPACK_IMPORTED_MODULE_3__/* ["default"] */ .A)(path).then(doc => {
        items[index] = {
          nav: new _src_navigation__WEBPACK_IMPORTED_MODULE_2__/* ["default"] */ .A(),
          doc
        };
      });
    };
    tasks.push(task(0, "../assets/alice/OPS/nav.xhtml"));
    tasks.push(task(1, "../assets/alice/OPS/nav.ncx"));
    tasks.push(task(2, "../assets/alice/OPS/nav.json"));
    return Promise.all(tasks);
  });
  describe("#parse()", () => {
    it("should parse navigation from nav.xhtml document", async () => {
      const nav = items[0].nav;
      const doc = items[0].doc;
      await nav.parse(doc);
      assert__WEBPACK_IMPORTED_MODULE_1__.equal(nav.landmarks.size, 1);
      assert__WEBPACK_IMPORTED_MODULE_1__.equal(nav.pageList.length, 48);
      assert__WEBPACK_IMPORTED_MODULE_1__.equal(nav.toc.links.size, 11);
    });
    it("should parse navigation from nav.ncx document", async () => {
      const nav = items[1].nav;
      const doc = items[1].doc;
      await nav.parse(doc);
      assert__WEBPACK_IMPORTED_MODULE_1__.equal(nav.pageList.length, 48);
      assert__WEBPACK_IMPORTED_MODULE_1__.equal(nav.toc.links.size, 11);
    });
    it("should load navigation from nav.json object", async () => {
      const nav = items[2].nav;
      const doc = items[2].doc;
      await nav.load(doc);
      assert__WEBPACK_IMPORTED_MODULE_1__.equal(nav.landmarks.size, 1);
      assert__WEBPACK_IMPORTED_MODULE_1__.equal(nav.pageList.length, 48);
      assert__WEBPACK_IMPORTED_MODULE_1__.equal(nav.toc.links.size, 11);
    });
  });
  describe("#clear()", () => {
    it("should clear navigation parts", () => {
      const nav = items[0].nav;
      nav.clear();
      assert__WEBPACK_IMPORTED_MODULE_1__.equal(nav.landmarks.size, 0);
      assert__WEBPACK_IMPORTED_MODULE_1__.equal(nav.pageList.length, 0);
      assert__WEBPACK_IMPORTED_MODULE_1__.equal(nav.toc.length, 0);
    });
  });
  after(() => {
    const len = items.length;
    for (let i = 0; i < len; ++i) {
      items[i].doc = undefined;
      items[i].nav.destroy();
      delete items[i];
    }
  });
});
})();

// This entry needs to be wrapped in an IIFE because it needs to be in strict mode.
(() => {
"use strict";
/* harmony import */ var assert__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(4148);
/* harmony import */ var _src_utils_request__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(3412);
/* harmony import */ var _src_packaging__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(4692);



describe("Packaging", () => {
  let pkg1, pkg2;
  before(async () => {
    pkg1 = await (0,_src_utils_request__WEBPACK_IMPORTED_MODULE_1__/* ["default"] */ .A)("../assets/alice/OPS/package.opf", null);
    pkg2 = await (0,_src_utils_request__WEBPACK_IMPORTED_MODULE_1__/* ["default"] */ .A)("../assets/alice/OPS/package.json", "json");
  });
  describe("#parse()", () => {
    it("should parse package.opf from document", async () => {
      const packaging = new _src_packaging__WEBPACK_IMPORTED_MODULE_2__/* ["default"] */ .A();
      await packaging.parse(pkg1);
      assert__WEBPACK_IMPORTED_MODULE_0__.equal(packaging.version, "3.0");
      assert__WEBPACK_IMPORTED_MODULE_0__.equal(packaging.metadata.size, 9);
      assert__WEBPACK_IMPORTED_MODULE_0__.equal(packaging.manifest.size, 42);
      assert__WEBPACK_IMPORTED_MODULE_0__.equal(packaging.spine.size, 13);
    });
  });
  describe("#load()", () => {
    it("should load package.json from object", async () => {
      const packaging = new _src_packaging__WEBPACK_IMPORTED_MODULE_2__/* ["default"] */ .A();
      await packaging.load(pkg2);
      assert__WEBPACK_IMPORTED_MODULE_0__.equal(packaging.version, "3.0");
      assert__WEBPACK_IMPORTED_MODULE_0__.equal(packaging.metadata.size, 9);
      assert__WEBPACK_IMPORTED_MODULE_0__.equal(packaging.manifest.size, 42);
      assert__WEBPACK_IMPORTED_MODULE_0__.equal(packaging.spine.size, 13);
    });
  });
});
})();

// This entry needs to be wrapped in an IIFE because it needs to be in strict mode.
(() => {
"use strict";
/* harmony import */ var assert__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(4148);
/* harmony import */ var _src_utils_path__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(1010);


describe("Path", () => {
  describe("#constructor()", () => {
    it("should init object properties from path", () => {
      const path = new _src_utils_path__WEBPACK_IMPORTED_MODULE_1__/* ["default"] */ .A("/fred/chasen/derf.html");
      assert__WEBPACK_IMPORTED_MODULE_0__.equal(path.path, "/fred/chasen/derf.html");
      assert__WEBPACK_IMPORTED_MODULE_0__.equal(path.directory, "/fred/chasen/");
      assert__WEBPACK_IMPORTED_MODULE_0__.equal(path.extension, "html");
      assert__WEBPACK_IMPORTED_MODULE_0__.equal(path.filename, "derf.html");
    });
    it("should init object properties from url", () => {
      const path = new _src_utils_path__WEBPACK_IMPORTED_MODULE_1__/* ["default"] */ .A("http://example.com/fred/chasen/derf.html");
      assert__WEBPACK_IMPORTED_MODULE_0__.equal(path.path, "/fred/chasen/derf.html");
      assert__WEBPACK_IMPORTED_MODULE_0__.equal(path.directory, "/fred/chasen/");
      assert__WEBPACK_IMPORTED_MODULE_0__.equal(path.extension, "html");
      assert__WEBPACK_IMPORTED_MODULE_0__.equal(path.filename, "derf.html");
    });
  });
  describe("#dirname()", () => {
    it("should get directory from path", () => {
      const path = _src_utils_path__WEBPACK_IMPORTED_MODULE_1__/* ["default"] */ .A.prototype.dirname("/fred/chasen/derf.html");
      assert__WEBPACK_IMPORTED_MODULE_0__.equal(path, "/fred/chasen/");
    });
    it("should get directory from relative path", () => {
      const path = _src_utils_path__WEBPACK_IMPORTED_MODULE_1__/* ["default"] */ .A.prototype.dirname("fred/chasen/derf.html");
      assert__WEBPACK_IMPORTED_MODULE_0__.equal(path, "fred/chasen/");
    });
  });
  describe("#parse()", () => {
    it("should parse a path", () => {
      const path = _src_utils_path__WEBPACK_IMPORTED_MODULE_1__/* ["default"] */ .A.prototype.parse("/fred/chasen/derf.html");
      assert__WEBPACK_IMPORTED_MODULE_0__.equal(path.dir, "/fred/chasen");
      assert__WEBPACK_IMPORTED_MODULE_0__.equal(path.ext, ".html");
      assert__WEBPACK_IMPORTED_MODULE_0__.equal(path.base, "derf.html");
      assert__WEBPACK_IMPORTED_MODULE_0__.equal(path.name, "derf");
    });
    it("should parse a relative path", () => {
      const path = _src_utils_path__WEBPACK_IMPORTED_MODULE_1__/* ["default"] */ .A.prototype.parse("fred/chasen/derf.html");
      assert__WEBPACK_IMPORTED_MODULE_0__.equal(path.dir, "fred/chasen");
      assert__WEBPACK_IMPORTED_MODULE_0__.equal(path.ext, ".html");
      assert__WEBPACK_IMPORTED_MODULE_0__.equal(path.base, "derf.html");
      assert__WEBPACK_IMPORTED_MODULE_0__.equal(path.name, "derf");
    });
  });
  describe("#isDirectory()", () => {
    it("should recognize a directory", () => {
      const isDir = _src_utils_path__WEBPACK_IMPORTED_MODULE_1__/* ["default"] */ .A.prototype.isDirectory;
      assert__WEBPACK_IMPORTED_MODULE_0__.equal(isDir("fred/chasen"), false);
      assert__WEBPACK_IMPORTED_MODULE_0__.equal(isDir("fred/chasen/"), true);
      assert__WEBPACK_IMPORTED_MODULE_0__.equal(isDir("/fred/chasen"), false);
      assert__WEBPACK_IMPORTED_MODULE_0__.equal(isDir("/fred/chasen/"), true);
      assert__WEBPACK_IMPORTED_MODULE_0__.equal(isDir("/fred/chasen/derf.html"), false);
    });
  });
  describe("#resolve()", () => {
    it("should resolve a path", () => {
      const a = _src_utils_path__WEBPACK_IMPORTED_MODULE_1__/* ["default"] */ .A.prototype.dirname("/fred/chasen/index.html");
      const b = "derf.html";
      const resolved = _src_utils_path__WEBPACK_IMPORTED_MODULE_1__/* ["default"] */ .A.prototype.resolve(a, b);
      assert__WEBPACK_IMPORTED_MODULE_0__.equal(resolved, "/fred/chasen/derf.html");
    });
    it("should resolve a relative path", () => {
      const a = _src_utils_path__WEBPACK_IMPORTED_MODULE_1__/* ["default"] */ .A.prototype.dirname("fred/chasen/index.html");
      const b = "derf.html";
      const resolved = _src_utils_path__WEBPACK_IMPORTED_MODULE_1__/* ["default"] */ .A.prototype.resolve(a, b);
      assert__WEBPACK_IMPORTED_MODULE_0__.equal(resolved, "/fred/chasen/derf.html");
    });
    it("should resolve a level up", () => {
      const a = _src_utils_path__WEBPACK_IMPORTED_MODULE_1__/* ["default"] */ .A.prototype.dirname("/fred/chasen/index.html");
      const b = "../derf.html";
      const resolved = _src_utils_path__WEBPACK_IMPORTED_MODULE_1__/* ["default"] */ .A.prototype.resolve(a, b);
      assert__WEBPACK_IMPORTED_MODULE_0__.equal(resolved, "/fred/derf.html");
    });
  });
  describe("#relative()", () => {
    it("should find a relative path at the same level", () => {
      const a = _src_utils_path__WEBPACK_IMPORTED_MODULE_1__/* ["default"] */ .A.prototype.dirname("/fred/chasen/index.html");
      const b = "/fred/chasen/derf.html";
      const relative = _src_utils_path__WEBPACK_IMPORTED_MODULE_1__/* ["default"] */ .A.prototype.relative(a, b);
      assert__WEBPACK_IMPORTED_MODULE_0__.equal(relative, "derf.html");
    });
    it("should find a relative path down a level", () => {
      const a = _src_utils_path__WEBPACK_IMPORTED_MODULE_1__/* ["default"] */ .A.prototype.dirname("/fred/chasen/index.html");
      const b = "/fred/chasen/ops/derf.html";
      const relative = _src_utils_path__WEBPACK_IMPORTED_MODULE_1__/* ["default"] */ .A.prototype.relative(a, b);
      assert__WEBPACK_IMPORTED_MODULE_0__.equal(relative, "ops/derf.html");
    });
    it("should resolve a level up", () => {
      const a = _src_utils_path__WEBPACK_IMPORTED_MODULE_1__/* ["default"] */ .A.prototype.dirname("/fred/chasen/index.html");
      const b = "/fred/derf.html";
      const relative = _src_utils_path__WEBPACK_IMPORTED_MODULE_1__/* ["default"] */ .A.prototype.relative(a, b);
      assert__WEBPACK_IMPORTED_MODULE_0__.equal(relative, "../derf.html");
    });
  });
});
})();

// This entry needs to be wrapped in an IIFE because it needs to be in strict mode.
(() => {
"use strict";
/* harmony import */ var assert__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(4148);
/* harmony import */ var _src_book__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(8378);


const url = path => (/epub-js/.test(location.href) ? "/epub-js" : "") + path;
describe("Rendition", () => {
  let book, rendition;
  before(async () => {
    book = new _src_book__WEBPACK_IMPORTED_MODULE_1__/* ["default"] */ .A("../assets/handbook/");
    await book.opened;
    rendition = book.renderTo(document.body);
  });
  describe("#display()", () => {
    it("should be displayed by default", async () => {
      const section = await rendition.display();
      assert__WEBPACK_IMPORTED_MODULE_0__.equal(section.index, 0);
      assert__WEBPACK_IMPORTED_MODULE_0__.equal(section.idref, "s0");
      assert__WEBPACK_IMPORTED_MODULE_0__.equal(section.href, "xhtml/nav.xhtml");
      assert__WEBPACK_IMPORTED_MODULE_0__.equal(section.url, url("/assets/handbook/EPUB/xhtml/nav.xhtml"));
    });
    it("should be displayed by index", async () => {
      const section = await rendition.display(2);
      assert__WEBPACK_IMPORTED_MODULE_0__.equal(section.index, 2);
      assert__WEBPACK_IMPORTED_MODULE_0__.equal(section.idref, "s2");
      assert__WEBPACK_IMPORTED_MODULE_0__.equal(section.href, "xhtml/mathml.xhtml");
      assert__WEBPACK_IMPORTED_MODULE_0__.equal(section.url, url("/assets/handbook/EPUB/xhtml/mathml.xhtml"));
    });
    it("should be displayed by idref", async () => {
      const section = await rendition.display("#s2");
      assert__WEBPACK_IMPORTED_MODULE_0__.equal(section.index, 2);
      assert__WEBPACK_IMPORTED_MODULE_0__.equal(section.idref, "s2");
      assert__WEBPACK_IMPORTED_MODULE_0__.equal(section.href, "xhtml/mathml.xhtml");
      assert__WEBPACK_IMPORTED_MODULE_0__.equal(section.url, url("/assets/handbook/EPUB/xhtml/mathml.xhtml"));
    });
    it("should be displayed by href", async () => {
      const section = await rendition.display("xhtml/mathml.xhtml");
      assert__WEBPACK_IMPORTED_MODULE_0__.equal(section.index, 2);
      assert__WEBPACK_IMPORTED_MODULE_0__.equal(section.idref, "s2");
      assert__WEBPACK_IMPORTED_MODULE_0__.equal(section.href, "xhtml/mathml.xhtml");
      assert__WEBPACK_IMPORTED_MODULE_0__.equal(section.url, url("/assets/handbook/EPUB/xhtml/mathml.xhtml"));
    });
    it("should be displayed by epubcfi", async () => {
      const section = await rendition.display("epubcfi(/6/6!/4/2[mathml]/2/1:0)");
      assert__WEBPACK_IMPORTED_MODULE_0__.equal(section.index, 2);
      assert__WEBPACK_IMPORTED_MODULE_0__.equal(section.idref, "s2");
      assert__WEBPACK_IMPORTED_MODULE_0__.equal(section.href, "xhtml/mathml.xhtml");
      assert__WEBPACK_IMPORTED_MODULE_0__.equal(section.url, url("/assets/handbook/EPUB/xhtml/mathml.xhtml"));
    });
  });
  after(() => {
    book.destroy();
  });
});
})();

// This entry needs to be wrapped in an IIFE because it needs to be in strict mode.
(() => {
"use strict";
/* harmony import */ var core_js_modules_es_iterator_constructor_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(8111);
/* harmony import */ var core_js_modules_es_iterator_find_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(116);
/* harmony import */ var assert__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(4148);
/* harmony import */ var _src_book__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(8378);




const url = path => (/epub-js/.test(location.href) ? "/epub-js" : "") + path;
describe("Section", () => {
  let book, section1, section2;
  before(async () => {
    book = new _src_book__WEBPACK_IMPORTED_MODULE_3__/* ["default"] */ .A("../assets/alice/");
    await book.opened;
    section1 = book.section("chapter_001.xhtml");
    section2 = book.section("chapter_010.xhtml");
  });
  describe("#load()", () => {
    it("should load section #001", async () => {
      assert__WEBPACK_IMPORTED_MODULE_2__.equal(section1.idref, "chapter_001");
      assert__WEBPACK_IMPORTED_MODULE_2__.equal(section1.linear, true);
      assert__WEBPACK_IMPORTED_MODULE_2__.equal(section1.index, 3);
      assert__WEBPACK_IMPORTED_MODULE_2__.equal(section1.href, "chapter_001.xhtml");
      assert__WEBPACK_IMPORTED_MODULE_2__.equal(section1.url, url("/assets/alice/OPS/chapter_001.xhtml"));
      assert__WEBPACK_IMPORTED_MODULE_2__.equal(section1.cfiBase, "/6/8");
      await section1.load(book.request);
      assert__WEBPACK_IMPORTED_MODULE_2__.equal(section1.document instanceof Document, true);
      assert__WEBPACK_IMPORTED_MODULE_2__.equal(section1.contents instanceof Element, true);
    });
    it("should load section #010", async () => {
      assert__WEBPACK_IMPORTED_MODULE_2__.equal(section2.idref, "chapter_010");
      assert__WEBPACK_IMPORTED_MODULE_2__.equal(section2.linear, true);
      assert__WEBPACK_IMPORTED_MODULE_2__.equal(section2.index, 12);
      assert__WEBPACK_IMPORTED_MODULE_2__.equal(section2.href, "chapter_010.xhtml");
      assert__WEBPACK_IMPORTED_MODULE_2__.equal(section2.url, url("/assets/alice/OPS/chapter_010.xhtml"));
      assert__WEBPACK_IMPORTED_MODULE_2__.equal(section2.cfiBase, "/6/26");
      await section2.load(book.request);
      assert__WEBPACK_IMPORTED_MODULE_2__.equal(section2.document instanceof Document, true);
      assert__WEBPACK_IMPORTED_MODULE_2__.equal(section2.contents instanceof Element, true);
    });
  });
  describe("#render()", () => {
    it("should render section #001", async () => {
      await section1.render(book.request);
      assert__WEBPACK_IMPORTED_MODULE_2__.equal(typeof section1.output === "string", true);
    });
    it("should render section #010", async () => {
      await section2.render(book.request);
      assert__WEBPACK_IMPORTED_MODULE_2__.equal(typeof section2.output === "string", true);
    });
  });
  describe("#find()", () => {
    it("should finds a single result in a section", () => {
      const pattern = "they were filled with cupboards and book-shelves";
      const results = section1.find(pattern);
      assert__WEBPACK_IMPORTED_MODULE_2__.equal(results.length, 1);
      assert__WEBPACK_IMPORTED_MODULE_2__.equal(results[0].cfi, "epubcfi(/6/8!/4/2/16,/1:275,/1:323)");
      assert__WEBPACK_IMPORTED_MODULE_2__.equal(results[0].excerpt, "... see anything; then she looked at the sides of the well and\n\t\tnoticed that they were filled with cupboards and book-shelves; here and there she saw\n\t\t...");
    });
    it("should finds multiple results in a section", () => {
      const pattern = "white rabbit";
      const results = section1.find(pattern);
      assert__WEBPACK_IMPORTED_MODULE_2__.equal(results.length, 2);
      assert__WEBPACK_IMPORTED_MODULE_2__.equal(results[0].cfi, "epubcfi(/6/8!/4/2/8,/1:240,/1:252)");
      assert__WEBPACK_IMPORTED_MODULE_2__.equal(results[0].excerpt, "...e worth the trouble of getting up and picking the daisies, when suddenly a White Rabbit with pink eyes ran close by her....");
      assert__WEBPACK_IMPORTED_MODULE_2__.equal(results[1].cfi, "epubcfi(/6/8!/4/2/20,/1:148,/1:160)");
      assert__WEBPACK_IMPORTED_MODULE_2__.equal(results[1].excerpt, "...ut it was\n\t\tall dark overhead; before her was another long passage and the White Rabbit was still\n\t\tin sight, hurrying down it. There was not a moment...");
    });
  });
  describe("#search()", () => {
    it("should finds a single result in a section", () => {
      const pattern = "they were filled with cupboards and book-shelves";
      const results = section1.search(pattern);
      assert__WEBPACK_IMPORTED_MODULE_2__.equal(results.length, 1);
      assert__WEBPACK_IMPORTED_MODULE_2__.equal(results[0].cfi, "epubcfi(/6/8!/4/2/16,/1:275,/1:323)");
      assert__WEBPACK_IMPORTED_MODULE_2__.equal(results[0].excerpt, "... see anything; then she looked at the sides of the well and\n\t\tnoticed that they were filled with cupboards and book-shelves; here and there she saw\n\t\t...");
    });
    it("should finds multiple results in a section", () => {
      const pattern = "white rabbit";
      const results = section1.search(pattern);
      assert__WEBPACK_IMPORTED_MODULE_2__.equal(results.length, 2);
      assert__WEBPACK_IMPORTED_MODULE_2__.equal(results[0].cfi, "epubcfi(/6/8!/4/2/8,/1:240,/1:252)");
      assert__WEBPACK_IMPORTED_MODULE_2__.equal(results[0].excerpt, "...e worth the trouble of getting up and picking the daisies, when suddenly a White Rabbit with pink eyes ran close by her....");
      assert__WEBPACK_IMPORTED_MODULE_2__.equal(results[1].cfi, "epubcfi(/6/8!/4/2/20,/1:148,/1:160)");
      assert__WEBPACK_IMPORTED_MODULE_2__.equal(results[1].excerpt, "...ut it was\n\t\tall dark overhead; before her was another long passage and the White Rabbit was still\n\t\tin sight, hurrying down it. There was not a moment...");
    });
    it("should finds result that spanning multiple document nodes, tag at ending", () => {
      const pattern = "I beg";
      const results = section2.search(pattern);
      assert__WEBPACK_IMPORTED_MODULE_2__.equal(results.length, 1);
      assert__WEBPACK_IMPORTED_MODULE_2__.equal(results[0].cfi, "epubcfi(/6/26!/4/2/6,/1:5,/2/1:3)");
      assert__WEBPACK_IMPORTED_MODULE_2__.equal(results[0].excerpt, "\"Oh, I beg");
    });
    it("should finds result that spanning multiple document nodes, tag at middle", () => {
      const pattern = "I beg your pardon";
      const results = section2.search(pattern);
      assert__WEBPACK_IMPORTED_MODULE_2__.equal(results.length, 1);
      assert__WEBPACK_IMPORTED_MODULE_2__.equal(results[0].cfi, "epubcfi(/6/26!/4/2/6,/1:5,/3:12)");
      assert__WEBPACK_IMPORTED_MODULE_2__.equal(results[0].excerpt, "\"Oh, I beg your pardon!\" she exclaimed in a tone of great dismay.");
    });
  });
  after(() => {
    book.destroy();
  });
});
})();

// This entry needs to be wrapped in an IIFE because it needs to be in strict mode.
(() => {
"use strict";
/* harmony import */ var assert__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(4148);
/* harmony import */ var _src_book__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(8378);


const url = path => (/epub-js/.test(location.href) ? "/epub-js" : "") + path;
describe("Sections", () => {
  let book;
  before(async () => {
    book = new _src_book__WEBPACK_IMPORTED_MODULE_1__/* ["default"] */ .A("../assets/alice/");
    await book.opened;
  });
  describe("#get()", () => {
    it("should get default section", () => {
      const section = book.sections.get();
      assert__WEBPACK_IMPORTED_MODULE_0__.equal(section.idref, "titlepage");
      assert__WEBPACK_IMPORTED_MODULE_0__.equal(section.linear, true);
      assert__WEBPACK_IMPORTED_MODULE_0__.equal(section.index, 2);
      assert__WEBPACK_IMPORTED_MODULE_0__.equal(section.href, "titlepage.xhtml");
      assert__WEBPACK_IMPORTED_MODULE_0__.equal(section.url, url("/assets/alice/OPS/titlepage.xhtml"));
      assert__WEBPACK_IMPORTED_MODULE_0__.equal(section.cfiBase, "/6/6");
    });
    it("should get section from index", () => {
      const section = book.sections.get(1);
      assert__WEBPACK_IMPORTED_MODULE_0__.equal(section.idref, "nav");
      assert__WEBPACK_IMPORTED_MODULE_0__.equal(section.linear, false);
      assert__WEBPACK_IMPORTED_MODULE_0__.equal(section.index, 1);
      assert__WEBPACK_IMPORTED_MODULE_0__.equal(section.href, "nav.xhtml");
      assert__WEBPACK_IMPORTED_MODULE_0__.equal(section.url, url("/assets/alice/OPS/nav.xhtml"));
      assert__WEBPACK_IMPORTED_MODULE_0__.equal(section.cfiBase, "/6/4");
    });
    it("should get section from id", () => {
      const section = book.sections.get("#chapter_010");
      assert__WEBPACK_IMPORTED_MODULE_0__.equal(section.idref, "chapter_010");
      assert__WEBPACK_IMPORTED_MODULE_0__.equal(section.linear, true);
      assert__WEBPACK_IMPORTED_MODULE_0__.equal(section.index, 12);
      assert__WEBPACK_IMPORTED_MODULE_0__.equal(section.href, "chapter_010.xhtml");
      assert__WEBPACK_IMPORTED_MODULE_0__.equal(section.url, url("/assets/alice/OPS/chapter_010.xhtml"));
      assert__WEBPACK_IMPORTED_MODULE_0__.equal(section.cfiBase, "/6/26");
    });
    it("should get section from href", () => {
      const section = book.sections.get("chapter_001.xhtml");
      assert__WEBPACK_IMPORTED_MODULE_0__.equal(section.idref, "chapter_001");
      assert__WEBPACK_IMPORTED_MODULE_0__.equal(section.linear, true);
      assert__WEBPACK_IMPORTED_MODULE_0__.equal(section.index, 3);
      assert__WEBPACK_IMPORTED_MODULE_0__.equal(section.href, "chapter_001.xhtml");
      assert__WEBPACK_IMPORTED_MODULE_0__.equal(section.url, url("/assets/alice/OPS/chapter_001.xhtml"));
      assert__WEBPACK_IMPORTED_MODULE_0__.equal(section.cfiBase, "/6/8");
    });
    it("should get section from epubcfi", () => {
      const section = book.sections.get("epubcfi(/6/8!/4/2/16/1:0)");
      assert__WEBPACK_IMPORTED_MODULE_0__.equal(section.idref, "chapter_001");
      assert__WEBPACK_IMPORTED_MODULE_0__.equal(section.linear, true);
      assert__WEBPACK_IMPORTED_MODULE_0__.equal(section.index, 3);
      assert__WEBPACK_IMPORTED_MODULE_0__.equal(section.href, "chapter_001.xhtml");
      assert__WEBPACK_IMPORTED_MODULE_0__.equal(section.url, url("/assets/alice/OPS/chapter_001.xhtml"));
      assert__WEBPACK_IMPORTED_MODULE_0__.equal(section.cfiBase, "/6/8");
    });
  });
  describe("#first()", () => {
    it("should get first section", () => {
      const section = book.sections.first();
      assert__WEBPACK_IMPORTED_MODULE_0__.equal(section.idref, "titlepage");
      assert__WEBPACK_IMPORTED_MODULE_0__.equal(section.linear, true);
      assert__WEBPACK_IMPORTED_MODULE_0__.equal(section.index, 2);
      assert__WEBPACK_IMPORTED_MODULE_0__.equal(section.href, "titlepage.xhtml");
      assert__WEBPACK_IMPORTED_MODULE_0__.equal(section.url, url("/assets/alice/OPS/titlepage.xhtml"));
      assert__WEBPACK_IMPORTED_MODULE_0__.equal(section.cfiBase, "/6/6");
    });
  });
  describe("#last()", () => {
    it("should get last section", () => {
      const section = book.sections.last();
      assert__WEBPACK_IMPORTED_MODULE_0__.equal(section.idref, "chapter_010");
      assert__WEBPACK_IMPORTED_MODULE_0__.equal(section.linear, true);
      assert__WEBPACK_IMPORTED_MODULE_0__.equal(section.index, 12);
      assert__WEBPACK_IMPORTED_MODULE_0__.equal(section.href, "chapter_010.xhtml");
      assert__WEBPACK_IMPORTED_MODULE_0__.equal(section.url, url("/assets/alice/OPS/chapter_010.xhtml"));
      assert__WEBPACK_IMPORTED_MODULE_0__.equal(section.cfiBase, "/6/26");
    });
  });
  after(() => {
    book.destroy();
  });
});
})();

// This entry needs to be wrapped in an IIFE because it needs to be in strict mode.
(() => {
"use strict";
/* harmony import */ var assert__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(4148);
/* harmony import */ var _src_book__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(8378);


const url = path => {
  let result = location.origin;
  if (/localhost/.test(result)) {
    result += path;
  } else {
    result += "epub-js";
    result += path;
  }
  return result;
};
describe("Themes", () => {
  let book, rendition, theme, path;
  before(async () => {
    book = new _src_book__WEBPACK_IMPORTED_MODULE_1__/* ["default"] */ .A("../assets/alice/");
    path = url("/examples/themes.css");
    rendition = book.renderTo(document.body, {
      spread: "none"
    });
    await book.opened;
    await rendition.display();
  });
  describe("#register()", () => {
    it("should register a theme by url", async () => {
      rendition.themes.register("light", path);
      await rendition.hooks.content;
      theme = rendition.themes.get("light");
      assert__WEBPACK_IMPORTED_MODULE_0__.equal(theme.url, path);
      rendition.themes.register("dark", path);
      await rendition.hooks.content;
      theme = rendition.themes.get("dark");
      assert__WEBPACK_IMPORTED_MODULE_0__.equal(theme.url, path);
      rendition.themes.clear();
      await rendition.hooks.content;
      assert__WEBPACK_IMPORTED_MODULE_0__.equal(rendition.themes.size, 0);
    });
    it("should register a theme by rules", async () => {
      rendition.themes.register("light", {
        background: "#fff",
        color: "#000"
      });
      await rendition.hooks.content;
      theme = rendition.themes.get("light");
      assert__WEBPACK_IMPORTED_MODULE_0__.equal(theme.rules.background, "#fff");
      assert__WEBPACK_IMPORTED_MODULE_0__.equal(theme.rules.color, "#000");
      rendition.themes.register("dark", {
        background: "#000",
        color: "#fff"
      });
      await rendition.hooks.content;
      theme = rendition.themes.get("dark");
      assert__WEBPACK_IMPORTED_MODULE_0__.equal(theme.rules.background, "#000");
      assert__WEBPACK_IMPORTED_MODULE_0__.equal(theme.rules.color, "#fff");
      rendition.themes.clear();
      assert__WEBPACK_IMPORTED_MODULE_0__.equal(rendition.themes.size, 0);
    });
    it("should register a themes from object with rules", async () => {
      rendition.themes.register({
        light: {
          body: {
            background: "#fff",
            color: "#000"
          }
        },
        dark: {
          body: {
            background: "#000",
            color: "#fff"
          }
        }
      });
      await rendition.hooks.content;
      theme = rendition.themes.get("light");
      assert__WEBPACK_IMPORTED_MODULE_0__.equal(theme.rules.body.background, "#fff");
      assert__WEBPACK_IMPORTED_MODULE_0__.equal(theme.rules.body.color, "#000");
      theme = rendition.themes.get("dark");
      assert__WEBPACK_IMPORTED_MODULE_0__.equal(theme.rules.body.background, "#000");
      assert__WEBPACK_IMPORTED_MODULE_0__.equal(theme.rules.body.color, "#fff");
      rendition.themes.clear();
      assert__WEBPACK_IMPORTED_MODULE_0__.equal(rendition.themes.size, 0);
    });
    it("should register a themes from object with urls", async () => {
      rendition.themes.register({
        light: path,
        dark: path
      });
      await rendition.hooks.content;
      theme = rendition.themes.get("light");
      assert__WEBPACK_IMPORTED_MODULE_0__.equal(theme.url, path);
      theme = rendition.themes.get("dark");
      assert__WEBPACK_IMPORTED_MODULE_0__.equal(theme.url, path);
    });
  });
  describe("#select()", () => {
    it("switching theme using select method", async () => {
      rendition.themes.on("selected", (key, theme) => {
        if (key === null) {
          assert__WEBPACK_IMPORTED_MODULE_0__.equal(theme.injected, false);
        } else {
          assert__WEBPACK_IMPORTED_MODULE_0__.equal(theme.injected, true);
        }
      });
      rendition.themes.select("light");
      await rendition.hooks.content;
      assert__WEBPACK_IMPORTED_MODULE_0__.equal(rendition.themes.current, "light");
      rendition.themes.select("dark");
      await rendition.hooks.content;
      assert__WEBPACK_IMPORTED_MODULE_0__.equal(rendition.themes.current, "dark");
      rendition.themes.select(null);
      await rendition.hooks.content;
      assert__WEBPACK_IMPORTED_MODULE_0__.equal(rendition.themes.current, null);
    });
  });
  describe("#appendRule()", () => {
    it("should inject css rule into contents", async () => {
      rendition.themes.appendRule("font-size", "100%");
      await rendition.hooks.content;
      const rule = rendition.themes.rules["font-size"];
      assert__WEBPACK_IMPORTED_MODULE_0__.equal(rule.value, "100%");
    });
  });
  describe("#removeRule()", () => {
    it("should reject css rule into contents", async () => {
      rendition.themes.removeRule("font-size");
      await rendition.hooks.content;
      const rule = rendition.themes.rules["font-size"];
      assert__WEBPACK_IMPORTED_MODULE_0__.equal(rule, undefined);
    });
  });
  describe("#clear()", () => {
    it("should clear all themes", async () => {
      rendition.themes.clear();
      await rendition.hooks.content;
      assert__WEBPACK_IMPORTED_MODULE_0__.equal(rendition.themes.size, 0);
    });
  });
  after(() => {
    book.destroy();
  });
});
})();

// This entry needs to be wrapped in an IIFE because it needs to be in strict mode.
(() => {
"use strict";
/* harmony import */ var assert__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(4148);
/* harmony import */ var _src_utils_url__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(984);


describe("Url", () => {
  describe("#constructor()", () => {
    it("should init object properties from url", () => {
      const url = new _src_utils_url__WEBPACK_IMPORTED_MODULE_1__/* ["default"] */ .A("http://example.com/fred/chasen/derf.html");
      assert__WEBPACK_IMPORTED_MODULE_0__.equal(url.href, "http://example.com/fred/chasen/derf.html");
      assert__WEBPACK_IMPORTED_MODULE_0__.equal(url.directory, "/fred/chasen/");
      assert__WEBPACK_IMPORTED_MODULE_0__.equal(url.extension, "html");
      assert__WEBPACK_IMPORTED_MODULE_0__.equal(url.filename, "derf.html");
      assert__WEBPACK_IMPORTED_MODULE_0__.equal(url.origin, "http://example.com");
      assert__WEBPACK_IMPORTED_MODULE_0__.equal(url.protocol, "http:");
      assert__WEBPACK_IMPORTED_MODULE_0__.equal(url.search, "");
    });
  });
  describe("#resolve()", () => {
    it("should join subfolders", () => {
      const a = "http://example.com/fred/chasen/";
      const b = "ops/derf.html";
      const resolved = new _src_utils_url__WEBPACK_IMPORTED_MODULE_1__/* ["default"] */ .A(a).resolve(b);
      assert__WEBPACK_IMPORTED_MODULE_0__.equal(resolved, "http://example.com/fred/chasen/ops/derf.html");
    });
    it("should resolve up a level", () => {
      const a = "http://example.com/fred/chasen/index.html";
      const b = "../derf.html";
      const resolved = new _src_utils_url__WEBPACK_IMPORTED_MODULE_1__/* ["default"] */ .A(a).resolve(b);
      assert__WEBPACK_IMPORTED_MODULE_0__.equal(resolved, "http://example.com/fred/derf.html");
    });
    it("should resolve absolute", () => {
      const a = "http://example.com/fred/chasen/index.html";
      const b = "/derf.html";
      const resolved = new _src_utils_url__WEBPACK_IMPORTED_MODULE_1__/* ["default"] */ .A(a).resolve(b);
      assert__WEBPACK_IMPORTED_MODULE_0__.equal(resolved, "http://example.com/derf.html");
    });
    it("should resolve with search strings", () => {
      const a = "http://example.com/fred/chasen/index.html?debug=true";
      const b = "/derf.html";
      const resolved = new _src_utils_url__WEBPACK_IMPORTED_MODULE_1__/* ["default"] */ .A(a).resolve(b);
      assert__WEBPACK_IMPORTED_MODULE_0__.equal(resolved, "http://example.com/derf.html");
    });
    // it("should handle directory with a dot", () => {
    // 	const a = "http://example.com/fred/chasen/index.epub/"
    // 	const url = new Url(a)
    // 	assert.equal(url.directory, "/fred/chasen/index.epub/")
    // 	assert.equal(url.extension, "")
    // }) // Doesn't work with path.parse
    it("should handle file urls", () => {
      const directory = "/var/mobile/Containers/Data/Application/F47E4434-9B98-4654-93F1-702336B08EE6/Documents/books/moby-dick/";
      const href = "file://" + directory + "derf.html";
      const url = new _src_utils_url__WEBPACK_IMPORTED_MODULE_1__/* ["default"] */ .A(href);
      assert__WEBPACK_IMPORTED_MODULE_0__.equal(url.href, href);
      assert__WEBPACK_IMPORTED_MODULE_0__.equal(url.directory, directory);
      assert__WEBPACK_IMPORTED_MODULE_0__.equal(url.extension, "html");
      assert__WEBPACK_IMPORTED_MODULE_0__.equal(url.filename, "derf.html");
      assert__WEBPACK_IMPORTED_MODULE_0__.equal(url.origin, "file://"); // origin should be blank
      assert__WEBPACK_IMPORTED_MODULE_0__.equal(url.protocol, "file:");
      assert__WEBPACK_IMPORTED_MODULE_0__.equal(url.search, "");
    });
    it("should resolve with file urls", () => {
      const a = "file:///var/mobile/Containers/Data/Application/books/";
      const b = "derf.html";
      const resolved = new _src_utils_url__WEBPACK_IMPORTED_MODULE_1__/* ["default"] */ .A(a).resolve(b);
      assert__WEBPACK_IMPORTED_MODULE_0__.equal(resolved, "file:///var/mobile/Containers/Data/Application/books/derf.html");
    });
  });
});
})();

__webpack_exports__ = __webpack_exports__["default"];
/******/ 	return __webpack_exports__;
/******/ })()
;
});
//# sourceMappingURL=test.js.map