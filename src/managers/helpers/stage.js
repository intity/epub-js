import { isNumber, windowBounds, uuid } from "../../utils/core";
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
	 * @param {string} options.axis viewport axis
	 * @param {boolean} options.hidden
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
		this.id = "vp-" + uuid();
		/**
		 * viewport container
		 * @member {Element} container
		 * @memberof Stage
		 * @readonly
		 */
		this.container = null;
		this.layout = layout;
		this.layout.on(EVENTS.LAYOUT.UPDATED, (props, changed) => {
			if (changed.flow) {
				this.updateFlow(changed.flow);
			} else if (changed.direction) {
				this.direction(changed.direction);
			}
		});
		/**
		 * viewport element
		 * @member {Element} target
		 * @memberof Stage
		 * @readonly
		 */
		this.target = null;
	}

	/**
	 * Create viewport-container
	 * @param {object} size
	 * @param {string|number} size.width
	 * @param {string|number} size.height
	 * @returns {Element} container
	 * @private
	 */
	create(size) {

		let szw = size.width;
		let szh = size.height;

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
	 * @param {Element|string} input 
	 * @param {object} size 
	 * @param {string|number} size.width viewport width
	 * @param {string|number} size.height viewport height
	 * @returns {Element}
	 */
	attachTo(input, size) {

		const element = this.getElement(input);
		if (!element) return;

		this.container = this.create(size);

		let base;
		if (this.settings.hidden) {
			base = this.wrapper;
		} else {
			base = this.container;
		}

		element.appendChild(base);
		this.target = element;
		this.axis(this.settings.axis || "vertical");
		this.direction();
		this.updateFlow();
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
	 * getContainer
	 * @returns {Element} container
	 */
	getContainer() {

		return this.container;
	}

	/**
	 * onResize
	 * @param {function} func 
	 */
	onResize(func) {

		this.resizeFunc = func;
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

		const dir = value || this.layout.direction;

		if (this.container) {
			this.container.dir = dir;
		}

		if (this.target) {
			this.target.dir = dir;
		}
	}

	/**
	 * Update Flow
	 * @param {string} [value] `layout.flow` value
	 * @private
	 */
	updateFlow(value) {

		const flow = value || this.layout.flow;
		switch (flow) {
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

export default Stage;