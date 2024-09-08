import { isNumber, uuid } from "./utils/core";
import { EVENTS } from "./utils/constants";
import EventEmitter from "event-emitter";

/**
 * viewport configuration class
 */
class Viewport {
	/**
	 * Constructor
	 * @param {object} options
	 * @param {boolean} [options.hidden] viewport hidden
	 */
	constructor(options) {

		this.settings = options || {};
		/**
		 * viewport axis
		 * @member {string} axis
		 * @memberof Viewport
		 * @readonly
		 */
		this.axis = null;
		/**
		 * viewport id
		 * @member {string} id
		 * @memberof Viewport
		 * @readonly
		 */
		this.id = "vp-" + uuid();
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
			y: 0,
		};
	}

	/**
	 * Set options
	 * @param {object} options 
	 */
	set(options) {

		Object.keys(options).forEach((opt) => {
			const value = options[opt];
			if (this[opt] === value || typeof value === "undefined") {
				delete options[opt];
			} else if (opt === "axis") {
				this.updateAxis(value);
			} else if (opt === "flow") {
				this.updateFlow(value);
			} else if (opt === "direction") {
				this.direction(value);
			}
		});
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

		if (this.settings.hidden) {
			this.wrapper = this.wrap(container);
		}
		return container;
	}

	/**
	 * wrap
	 * @param {Element} container 
	 * @returns {Element} wrapper
	 */
	wrap(container) {

		const wrapper = document.createElement("div");
		wrapper.style.visibility = "hidden";
		wrapper.style.overflow = "hidden";
		wrapper.style.width = "0";
		wrapper.style.height = "0";
		wrapper.appendChild(container);
		return wrapper;
	}

	/**
	 * Attach to viewport element
	 * @param {Element|string} input viewport element
	 * @param {object} options
	 * @param {string} options.axis
	 * @param {string} options.flow
	 * @param {string} options.direction
	 * @param {string|number} options.width viewport width
	 * @param {string|number} options.height viewport height
	 * @param {Layout} layout
	 * @returns {Element}
	 */
	attachTo(input, options) {

		const element = this.getElement(input);
		if (!element) return;

		this.container = this.create(options);

		let base;
		if (this.settings.hidden) {
			base = this.wrapper;
		} else {
			base = this.container;
		}

		element.appendChild(base);
		this.target = element;
		this.appendListeners();
		this.set(options);
		return element;
	}

	/**
	 * appendListeners
	 * @private
	 */
	appendListeners() {
		//-- ORIENTATION_CHANGE
		screen.orientation.addEventListener("change", this.orientation.bind(this));
		//-- RESIZE
		this.resizeFunc = new ResizeObserver((e) => {
			requestAnimationFrame(() => this.resize(e));
		});
		this.resizeFunc.observe(this.target);
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
	 * resize
	 * @param {object} entries 
	 * @private
	 */
	resize(entries) {

		let changed = false;
		const cmp = (rect) => Object.keys(this.rect).forEach(p => {
			if (!rect) return;
			if (this.rect[p] !== rect[p] && rect[p] !== void 0) {
				this.rect[p] = rect[p];
				changed = true;
			}
		});
		entries.forEach((entry) => cmp(entry.contentRect));
		changed && this.emit(EVENTS.VIEWPORT.RESIZED, this.rect);
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
	 * getSheet
	 * @returns {CSSStyleSheet}
	 */
	getSheet() {

		const style = document.createElement("style");
		// WebKit hack --> https://davidwalsh.name/add-rules-stylesheets
		style.appendChild(document.createTextNode(""));

		document.head.appendChild(style);
		return style.sheet;
	}

	/**
	 * addStyleRules
	 * @param {string} selector 
	 * @param {object[]} rulesArray 
	 */
	addStyleRules(selector, rulesArray) {

		let scope = "#" + this.id + " ";
		let rules = "";

		if (!this.sheet) {
			this.sheet = this.getSheet();
		}

		rulesArray.forEach(set => {
			for (const prop in set) {
				if (set.hasOwnProperty(prop)) {
					rules += prop + ":" + set[prop] + ";";
				}
			}
		});

		this.sheet.insertRule(scope + selector + " {" + rules + "}", 0);
	}

	/**
	 * Update direction
	 * @param {string} value `layout.direction` value
	 * @private
	 */
	direction(value) {

		if (this.container) {
			this.container.dir = value;
		}
		if (this.target) {
			this.target.dir = value;
			this.target.classList.add(value);
		}
	}

	/**
	 * Update axis
	 * @param {string} value values: `"horizontal"` OR `"vertical"`
	 * @private
	 */
	updateAxis(value) {

		if (value === "horizontal") {
			this.container.style.flexDirection = "row";
		} else {
			this.container.style.flexDirection = null;
		}
		this.axis = value;
	}

	/**
	 * Update flow
	 * @param {string} [value] `layout.flow` value
	 * @private
	 */
	updateFlow(value) {

		switch (value) {
			case "paginated":
				this.container.style["overflow-y"] = "hidden";
				this.container.style["overflow-x"] = "hidden";
				this.container.style.flexWrap = "nowrap";
				break;
			case "scrolled":
				this.container.style["overflow-y"] = "auto";
				this.container.style["overflow-x"] = "hidden";
				this.container.style.flexWrap = "wrap";
				break;
			case "scrolled-doc":
				this.container.style["overflow-y"] = "hidden";
				this.container.style["overflow-x"] = "hidden";
				this.container.style.flexWrap = "wrap";
				break;
		}
		this.target.className = value;
	}

	/**
	 * destroy
	 */
	destroy() {

		if (this.target) {

			let base;
			if (this.settings.hidden) {
				base = this.wrapper;
			} else {
				base = this.container;
			}

			if (this.target.contains(base)) {
				this.target.removeChild(base);
			}

			this.removeListeners();
		}
	}
}

EventEmitter(Viewport.prototype);

export default Viewport;