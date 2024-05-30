import { uuid, isNumber, isElement, windowBounds, extend } from "../../utils/core";
import { EVENTS } from "../../utils/constants";
import throttle from "lodash/throttle";

/**
 * Stage
 */
class Stage {
	/**
	 * Constructor
	 * @param {Layout} layout 
	 * @param {object} options
	 * @param {string} options.axis
	 * @param {boolean} options.fullsize
	 * @param {string|number} options.width
	 * @param {string|number} options.height
	 */
	constructor(layout, options) {
		/**
		 * @member {object} settings
		 * @memberof Stage
		 * @readonly
		 */
		this.settings = options || {};
		/**
		 * @member {string} id
		 * @memberof Stage
		 * @readonly
		 */
		this.id = "epubjs-container-" + uuid();
		/**
		 * @member {Element} container
		 * @memberof Stage
		 * @readonly
		 */
		this.container = this.create(this.settings);
		this.layout = layout;
		this.layout.on(EVENTS.LAYOUT.UPDATED, (props, changed) => {
			if (changed.flow) {
				this.updateFlow(changed.flow);
			} else if (changed.direction) {
				this.direction(changed.direction);
			}
		});
		this.updateFlow();
		this.direction();
		this.axis(options.axis || "vertical");

		if (this.settings.hidden) {
			this.wrapper = this.wrap(this.container);
		}
	}

	/**
	 * Creates an element to render to.
	 * Resizes to passed width and height or to the elements size
	 * @param {object} options 
	 * @returns {Element} container
	 */
	create(options) {

		let width = options.width;
		let height = options.height;

		extend(this.settings, options);

		if (options.height && isNumber(options.height)) {
			height = options.height + "px";
		}

		if (options.width && isNumber(options.width)) {
			width = options.width + "px";
		}

		// Create new container element
		const container = document.createElement("div");
		container.id = this.id;
		container.classList.add("epub-container");

		// Style Element
		container.style.wordSpacing = "0";
		container.style.lineHeight = "0";
		container.style.verticalAlign = "top";
		container.style.position = "relative";
		container.style.display = "flex";
		container.style.flexWrap = "nowrap";

		if (width) {
			container.style.width = width;
		}

		if (height) {
			container.style.height = height;
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
	 * getElement
	 * @param {Element|string} element 
	 * @returns {Element}
	 */
	getElement(element) {

		let elm;
		if (isElement(element)) {
			elm = element;
		} else if (typeof element === "string") {
			elm = document.getElementById(element);
		} else {
			throw new TypeError("not valid argument type");
		}
		return elm;
	}

	/**
	 * attachTo
	 * @param {Element|string} what 
	 * @returns {Element}
	 */
	attachTo(what) {

		const element = this.getElement(what);
		if (!element) return;

		let base;
		if (this.settings.hidden) {
			base = this.wrapper;
		} else {
			base = this.container;
		}

		element.appendChild(base);
		this.parentElement = element;

		return element;
	}

	/**
	 * getContainer
	 * @returns {Element} container
	 */
	getContainer() {

		return this.container;
	}

	/**
	 * onResize
	 * @param {*} func 
	 */
	onResize(func) {
		// Only listen to window for resize event if width and height are not fixed.
		// This applies if it is set to a percent or auto.
		if (!isNumber(this.settings.width) ||
			!isNumber(this.settings.height)) {
			this.resizeFunc = throttle(func, 50);
			window.addEventListener("resize", this.resizeFunc, false);
		}
	}

	/**
	 * onOrientationChange
	 * @param {*} func 
	 */
	onOrientationChange(func) {

		this.orientationChangeFunc = func;
		window.addEventListener("orientationchange", this.orientationChangeFunc, false);
	}

	/**
	 * size
	 * @param {string|number} [width] 
	 * @param {string|number} [height] 
	 * @returns {object}
	 */
	size(width, height) {

		let bounds;
		let _width = width || this.settings.width;
		let _height = height || this.settings.height;

		// If width or height are set to false, inherit them from containing element
		if (!width) {
			bounds = this.parentElement.getBoundingClientRect();

			if (bounds.width) {
				width = Math.floor(bounds.width);
				this.container.style.width = width + "px";
			}
		} else {
			if (isNumber(width)) {
				this.container.style.width = width + "px";
			} else {
				this.container.style.width = width;
			}
		}

		if (!height) {
			bounds = bounds || this.parentElement.getBoundingClientRect();

			if (bounds.height) {
				height = bounds.height;
				this.container.style.height = height + "px";
			}

		} else {
			if (isNumber(height)) {
				this.container.style.height = height + "px";
			} else {
				this.container.style.height = height;
			}
		}

		if (!isNumber(width)) {
			width = this.container.clientWidth;
		}

		if (!isNumber(height)) {
			height = this.container.clientHeight;
		}

		this.containerStyles = window.getComputedStyle(this.container);
		this.containerPadding = {
			left: parseFloat(this.containerStyles["padding-left"]) || 0,
			right: parseFloat(this.containerStyles["padding-right"]) || 0,
			top: parseFloat(this.containerStyles["padding-top"]) || 0,
			bottom: parseFloat(this.containerStyles["padding-bottom"]) || 0
		};

		// Bounds not set, get them from window
		let wndBounds = windowBounds();
		let bodyStyles = window.getComputedStyle(document.body);
		let bodyPadding = {
			left: parseFloat(bodyStyles["padding-left"]) || 0,
			right: parseFloat(bodyStyles["padding-right"]) || 0,
			top: parseFloat(bodyStyles["padding-top"]) || 0,
			bottom: parseFloat(bodyStyles["padding-bottom"]) || 0
		};

		if (!_width) {
			width = wndBounds.width - bodyPadding.left - bodyPadding.right;
		}

		if ((this.settings.fullsize && !_height) || !_height) {
			height = wndBounds.height - bodyPadding.top - bodyPadding.bottom;
		}

		return {
			width: width - this.containerPadding.left - this.containerPadding.right,
			height: height - this.containerPadding.top - this.containerPadding.bottom
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
	 * Set axis
	 * @param {string} value values: `"horizontal"` OR `"vertical"`
	 */
	axis(value) {

		if (value === "horizontal") {
			this.container.style.flexDirection = "row";
		} else {
			this.container.style.flexDirection = null;
		}
		this.settings.axis = value;
	}

	/**
	 * Update direction
	 * @param {string} [value] direction
	 * @private
	 */
	direction(value) {

		value = value || this.layout.direction;

		if (this.container) {
			this.container.dir = value;
		}

		if (this.settings.fullsize) {
			document.body.style["direction"] = value;
		}
	}

	/**
	 * Update Flow
	 * @param {string} [value] `layout.flow` value
	 * @private
	 */
	updateFlow(value) {

		value = value || this.layout.flow;
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

		if (this.parentElement) {

			let base;
			if (this.settings.hidden) {
				base = this.wrapper;
			} else {
				base = this.container;
			}

			if (this.parentElement.contains(base)) {
				this.parentElement.removeChild(base);
			}

			window.removeEventListener("resize", this.resizeFunc);
			window.removeEventListener("orientationChange", this.orientationChangeFunc);
		}
	}
}

export default Stage;