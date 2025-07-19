import EventEmitter from "event-emitter";
import Mapping from "../../mapping";
import Views from "../helpers/views";
import Queue from "../../utils/queue";
import IframeView from "../views/iframe";
import InlineView from "../views/inline";
import scrollType from "../../utils/scrolltype";
import Defer from "../../utils/defer";
import { EVENTS } from "../../utils/constants";
import { extend, isNumber } from "../../utils/core";
import debounce from "lodash/debounce";

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
		this.mapping = new Mapping(this.layout);
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
		this.views = new Views();
		this.viewport = book.rendition.viewport;
		/**
		 * @member {string} writingMode
		 * @memberof DefaultViewManager
		 * @readonly
		 */
		this.writingMode = null;
		this.q = new Queue(this);
	}

	/**
	 * render
	 * @param {Element|string} element viewport element
	 * @param {object} size 
	 * @param {string|number} size.width
	 * @param {string|number} size.height
	 */
	render(element, size) {

		this.scrollType = scrollType();
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

		const displaying = new Defer();

		if (target === section.href || isNumber(target)) {
			target = undefined;
		}

		const view = this.views.find(section);
		if (view) {
			const offset = view.offset();
			let x, y = offset.top;
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
		this.append(section).then((view) => {

			// Move to correct place within the section, if needed
			if (target) {
				const offset = view.locationOf(target);
				this.moveTo(offset, view.width);
			}
			return view;
		}, (err) => {
			displaying.reject(err);
		}).then((view) => {
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
			lsc.addEventListener(
				"scrollend",
				this.onscrollend.bind(this)
			);
		}
		const timeout = this.name === "default" ? 0 : 30;
		this.scrollend = debounce(this.scrolled.bind(this), timeout);
	}

	/**
	 * removeEventListeners
	 * @private
	 */
	removeEventListeners() {

		const lsc = this.views.container;
		lsc.removeEventListener("scroll", this.onscroll.bind(this));
		if ("onscrollend" in window) {
			lsc.removeEventListener(
				"scrollend",
				this.onscrollend.bind(this)
			);
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
		if (typeof view === "string" && view === "iframe") {
			result = IframeView;
		} else if (view === "inline") {
			result = InlineView;
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

		let distX = 0, distY;
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

		view.on(EVENTS.VIEWS.RESIZED, (rect) => {
			this.resized(view);
		});

		view.on(EVENTS.VIEWS.WRITING_MODE, (mode) => {
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

		view.on(EVENTS.VIEWS.RESIZED, (rect) => {
			this.counter(view);
			this.resized(view);
		});

		view.on(EVENTS.VIEWS.WRITING_MODE, (mode) => {
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
		const def = new Defer();
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
				left = lsc.scrollLeft + (this.layout.delta * -1);

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
			this.append(section).then((view) => {

				// Reset position to start for scrolled-doc vertical-rl in default mode
				if (!ish && dir === "rtl" &&
					this.scrollType === "default") {
					this.scrollTo(lsc.scrollWidth, 0, true);
				}
				this.views.show();
				def.resolve(view);
			}, (err) => {
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
		const def = new Defer();
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
			}
			else {
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
				this.scrollBy(0, -(this.layout.height), true);
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
			this.prepend(section).then((view) => {

				if (ish) {
					if (dir === "rtl") {
						if (this.scrollType === "default") {
							this.scrollTo(0, 0, true);
						}
						else {
							this.scrollTo((lsc.scrollWidth * -1) + this.layout.delta, 0, true);
						}
					} else {
						this.scrollTo(lsc.scrollWidth - this.layout.delta, 0, true);
					}
				}
				this.views.show();
				def.resolve(view);
			}, (err) => {
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
		const sections = views.map((view) => {

			const { href, index } = view.section;

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
				pages.push({ index: i });
			}

			const mapping = this.mapping.page(
				view.contents,
				view.section.cfiBase,
				startPos,
				endPos
			);

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
		const sections = views.map((view) => {

			const { href, index } = view.section;
			const total = this.layout.count(view.width).pages;
			const startPos = Math.abs(left);
			const endPos = Math.abs(left) + rect.width;
			const startPage = Math.floor(startPos / this.layout.pageWidth);
			const endPage = Math.floor(endPos / this.layout.pageWidth);

			const pages = [];
			for (let i = startPage; i < endPage; i++) {
				pages.push({ index: i });
			}

			const mapping = this.mapping.page(
				view.contents,
				view.section.cfiBase,
				startPos,
				endPos
			);

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

		if (this.layout.axis === AXIS_H &&
			vpos.right > rect.left - offsetPrev &&
			vpos.left < rect.right + offsetNext) {
			return true;
		}

		if (this.layout.axis === AXIS_V &&
			vpos.bottom > rect.top - offsetPrev &&
			vpos.top < rect.bottom + offsetNext) {
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

		if (this.paginated &&
			this.name === "default") {
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

		if (this.paginated &&
			this.name === "default") {
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
			this.layout.calculate(
				this.viewport.rect.width,
				this.viewport.rect.height,
				this.settings.gap
			);
			this.settings.offset = this.layout.delta / this.layout.divisor;
		} else {
			this.layout.calculate(
				this.viewport.rect.width,
				this.viewport.rect.height
			);
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

			view && contents.push(view.contents)
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
	 * Destroy the DefaultViewManager object
	 */
	destroy() {

		if (!this.views) return;
		this.removeEventListeners();
		this.views.destroy();
		this.views = undefined;
		this.ignore = undefined;
		this.mapping.destroy();
		this.mapping = undefined;
		this.location = undefined;
		this.rendered = undefined;
		this.paginated = undefined;
		this.scrollType = undefined;
		this.writingMode = undefined;
	}
}

EventEmitter(DefaultViewManager.prototype);

export default DefaultViewManager;