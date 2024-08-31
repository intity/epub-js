import { isNumber, windowBounds, uuid } from "../../utils/core";
import throttle from "lodash/throttle";

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
		 * viewport width
		 * @member {number} width
		 * @memberof Viewport
		 * @readonly
		 */
		this.width = 0;
		/**
		 * viewpor height
		 * @member {number} height
		 * @memberof Viewport
		 * @readonly
		 */
		this.height = 0;
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
		this.set(options);
		return element;
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
	 * onResize
	 * @param {function} func 
	 */
	onResize(func) {

		this.resizeFunc = throttle(func, 50);
		window.addEventListener(
			"resize",
			this.resizeFunc,
			false
		);
	}

	/**
	 * onOrientationChange
	 * @param {function} func 
	 */
	onOrientationChange(func) {

		this.orientationChangeFunc = func;
		window.addEventListener(
			"orientationchange",
			this.orientationChangeFunc,
			false
		);
	}

	/**
	 * size
	 * @param {string|number} [width] 
	 * @param {string|number} [height] 
	 * @returns {object}
	 */
	size(width, height) {

		this.width = this.target.clientWidth;
		this.height = this.target.clientHeight;

		if (!width) {
			width = this.width;
			this.container.style.width = width + "px";
		} else if (isNumber(width)) {
			this.container.style.width = width + "px";
			this.width = width;
		} else {
			this.container.style.width = width;
		}

		if (!height) {
			height = this.height;
			this.container.style.height = height + "px";
		} else if (isNumber(height)) {
			this.container.style.height = height + "px";
			this.height = height;
		} else {
			this.container.style.height = height;
		}

		if (!isNumber(width)) {
			width = this.container.clientWidth;
		}

		if (!isNumber(height)) {
			height = this.container.clientHeight;
		}

		const styles = window.getComputedStyle(this.container);
		const padding = {
			left: parseFloat(styles["padding-left"]) || 0,
			right: parseFloat(styles["padding-right"]) || 0,
			top: parseFloat(styles["padding-top"]) || 0,
			bottom: parseFloat(styles["padding-bottom"]) || 0
		};

		return {
			width: width - padding.left - padding.right,
			height: height - padding.top - padding.bottom
		}
	}

	/**
	 * Get bounding client rect
	 * @returns {DOMRect|object}
	 */
	bounds() {

		let box;
		if (this.container.style.overflow !== "visible") {
			box = this.container && this.container.getBoundingClientRect();
		}

		if (!box || !box.width || !box.height) {
			return windowBounds();
		} else {
			return box;
		}
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

			window.removeEventListener("resize", this.resizeFunc);
			window.removeEventListener("orientationChange", this.orientationChangeFunc);
		}
	}
}

export default Viewport;