import { isNumber, uuid } from "./utils/core";
import { EVENTS } from "./utils/constants";
import EventEmitter from "event-emitter";

/**
 * viewport configuration class
 */
class Viewport {
	/**
	 * Constructor
	 * @param {Layout} layout
	 * @param {object} options
	 * @param {boolean} [options.hidden] viewport hidden
	 */
	constructor(layout, options) {

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
		this.settings = options || {};
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
	 * Attach to viewport element
	 * @param {Element|string} input viewport element
	 * @param {object} options
	 * @param {string|number} options.width viewport width
	 * @param {string|number} options.height viewport height
	 * @param {Layout} layout
	 * @returns {Element}
	 */
	attachTo(input, options) {

		const element = this.getElement(input);
		if (!element) return;

		this.views = options.views;
		this.container = this.create(options);
		this.container.appendChild(this.views.container);

		let base;
		if (this.settings.hidden) {
			base = this.wrapper;
		} else {
			base = this.container;
		}

		element.appendChild(base);
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