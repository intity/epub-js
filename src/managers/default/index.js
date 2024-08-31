import EventEmitter from "event-emitter";
import Mapping from "../../mapping";
import Stage from "../helpers/stage";
import Views from "../helpers/views";
import Queue from "../../utils/queue";
import IframeView from "../views/iframe";
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
	 * @param {Layout} layout 
	 * @param {object} [options]
	 * @param {string} [options.axis]
	 * @param {string} [options.method] values: `"blobUrl"` OR `"srcdoc"` OR `"write"`
	 * @param {string} [options.ignoreClass='']
	 * @param {string|object} [options.view='iframe']
	 */
	constructor(book, layout, options) {
		/**
		 * @member {string} name Manager name
		 * @memberof DefaultViewManager
		 * @readonly
		 */
		this.name = "default";
		this.load = book.load.bind(book);
		/**
		 * @member {Layout} layout
		 * @memberof DefaultViewManager
		 * @readonly
		 */
		this.layout = layout;
		this.layout.on(EVENTS.LAYOUT.UPDATED, (props, changed) => {
			if (changed.flow) {
				this.fullsize = changed.flow === "scrolled-doc";
				this.paginated = changed.flow === "paginated";
				if (this.paginated) {
					this.updateAxis(AXIS_H);
				} else {
					this.updateAxis(AXIS_V);
				}
			}
			this.clear();
			this.updateLayout();
		});
		this.settings = extend({
			axis: null,
			view: "iframe",
			hidden: false,
			method: null,
			ignoreClass: "",
			allowPopups: false,
			allowScriptedContent: false,
			forceEvenPages: true
		}, options || {});
		this.fullsize = this.layout.flow === "scrolled-doc";
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
		 * @member {boolean} rendered
		 * @memberof DefaultViewManager
		 * @readonly
		 */
		this.rendered = false;
		this.scrollTop = 0;
		this.scrollLeft = 0;
		this.scrollType = null;
		/**
		 * @member {Stage} stage
		 * @memberof DefaultViewManager
		 * @property {string} axis
		 * @property {boolean} hidden
		 * @readonly
		 */
		this.stage = new Stage(this.layout, {
			axis: this.settings.axis,
			hidden: this.settings.hidden
		});
		/**
		 * @member {Views} views 
		 * @memberof DefaultViewManager
		 * @readonly
		 */
		this.views = [];
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
		this.stage.attachTo(element, size);
		this.views = new Views(this.stage.container);
		this.rendered = true;
		this.updateLayout();
		//-- events
		this.stage.onResize(this.onResized.bind(this));
		this.stage.onOrientationChange(this.onOrientationChange.bind(this));
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

		// Check if moving to target is needed
		if (target === section.href || isNumber(target)) {
			target = undefined;
		}

		// Check to make sure the section we want isn't already shown
		const view = this.views.find(section);

		// View is already shown, just move to correct location in view
		if (view && this.layout.name !== "pre-paginated") {
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

		this.clear(); // Hide all current views

		let forceRight = false;
		if (this.layout.name === "pre-paginated" &&
			this.layout.divisor === 2 &&
			section.properties.includes("page-spread-right")) {
			forceRight = true;
		}

		this.append(section, forceRight).then((view) => {

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
		
		if (this.paginated && this.name === "default") {
			return;
		}
		
		let container;
		if (this.fullsize) {
			container = window;
		} else {
			container = this.stage.container;
		}
		container.addEventListener("scroll", this.onscroll.bind(this));
		if ("onscrollend" in window) {
			container.addEventListener(
				"scrollend",
				this.onscrollend.bind(this)
			);
		}
		this.scrollend = debounce(this.scrolled.bind(this), 30);
	}

	/**
	 * removeEventListeners
	 * @private
	 */
	removeEventListeners() {

		if (this.paginated && this.name === "default") {
			return;
		}
		
		let container;
		if (this.fullsize) {
			container = window;
		} else {
			container = this.stage.container;
		}
		container.removeEventListener("scroll", this.onscroll.bind(this));
		if ("onscrollend" in window) {
			container.removeEventListener(
				"scrollend",
				this.onscrollend.bind(this)
			);
		}
		this.scrollend = undefined;
	}

	/**
	 * onOrientationChange
	 * @param {Event} e 
	 * @private
	 */
	onOrientationChange(e) {

		const orientation = e.target.screen.orientation;
		/**
		 * @event orientationchange
		 * @param {object} orientation
		 * @memberof DefaultViewManager
		 */
		this.emit(EVENTS.MANAGERS.ORIENTATION_CHANGE, orientation);
	}

	/**
	 * onResized
	 * @param {Event} e 
	 * @private
	 */
	onResized(e) {

		this.resize();
	}

	/**
	 * resize
	 * @param {number} [width] 
	 * @param {number} [height] 
	 * @param {string} [epubcfi] 
	 */
	resize(width, height, epubcfi) {

		this.clear();
		this.updateLayout(width, height);
		this.emit(EVENTS.MANAGERS.RESIZED, {
			width: this.stage.width,
			height: this.stage.height
		}, epubcfi);
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
			result = IframeView;
		} else {
			result = view;
		}
		return result;
	}

	/**
	 * createView
	 * @param {Section} section 
	 * @param {boolean} [forceRight]
	 * @returns {object} View (default: IframeView)
	 * @private
	 */
	createView(section, forceRight) {

		const view = this.requireView(this.settings.view);
		return new view(this.layout, section, {
			axis: this.settings.axis,
			snap: this.settings.snap,
			method: this.settings.method,
			allowPopups: this.settings.allowPopups,
			ignoreClass: this.settings.ignoreClass,
			allowScriptedContent: this.settings.allowScriptedContent,
			forceRight: forceRight,
			forceEvenPages: this.settings.forceEvenPages
		});
	}

	/**
	 * afterDisplayed
	 * @param {*} view 
	 * @private
	 */
	afterDisplayed(view) {

		this.emit(EVENTS.MANAGERS.ADDED, view);
	}

	/**
	 * afterResized
	 * @param {*} view 
	 * @private
	 */
	afterResized(view) {

		this.emit(EVENTS.MANAGERS.RESIZE, view.section);
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
		const vpc = this.stage.container;

		if (this.paginated) {
			distX = Math.floor(offset.left / this.layout.delta) * this.layout.delta;

			if (distX + this.layout.delta > vpc.scrollWidth) {
				distX = vpc.scrollWidth - this.layout.delta;
			}

			distY = Math.floor(offset.top / this.layout.delta) * this.layout.delta;

			if (distY + this.layout.delta > vpc.scrollHeight) {
				distY = vpc.scrollHeight - this.layout.delta;
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
	 * @param {boolean} [forceRight] 
	 * @returns {Promise<any>}
	 * @private
	 */
	append(section, forceRight) {

		const view = this.createView(section, forceRight);

		view.on(EVENTS.VIEWS.DISPLAYED, () => {
			this.afterDisplayed(view);
		});

		view.on(EVENTS.VIEWS.RESIZED, (bounds) => {
			this.afterResized(view);
		});

		view.on(EVENTS.VIEWS.AXIS, (axis) => {
			this.updateAxis(axis);
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
	 * @param {boolean} [forceRight] 
	 * @returns {Promise<any>}
	 * @private
	 */
	prepend(section, forceRight) {

		const view = this.createView(section, forceRight);

		view.on(EVENTS.VIEWS.DISPLAYED, () => {
			this.afterDisplayed(view);
		});

		view.on(EVENTS.VIEWS.RESIZED, (bounds) => {
			this.counter(bounds);
			this.afterResized(view);
		});

		view.on(EVENTS.VIEWS.AXIS, (axis) => {
			this.updateAxis(axis);
		});

		view.on(EVENTS.VIEWS.WRITING_MODE, (mode) => {
			this.updateWritingMode(mode);
		});

		this.views.prepend(view);

		return view.display(this.load);
	}

	/**
	 * counter
	 * @param {object} bounds 
	 * @private
	 */
	counter(bounds) {

		if (this.settings.axis === AXIS_V) {
			this.scrollBy(0, bounds.heightDelta, true);
		} else {
			this.scrollBy(bounds.widthDelta, 0, true);
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
		const hvx = this.paginated && this.settings.axis === AXIS_H;
		const vpc = this.stage.container;

		if (this.views.length === 0) {
			def.resolve(null);
			return def.promise;
		} else if (hvx && dir === "ltr") {

			this.scrollLeft = vpc.scrollLeft;
			left = vpc.scrollLeft + vpc.offsetWidth + this.layout.delta;

			if (left <= vpc.scrollWidth) {
				this.scrollBy(this.layout.delta, 0, true);
			} else {
				section = this.views.last().section.next();
			}
		} else if (hvx && dir === "rtl") {

			this.scrollLeft = vpc.scrollLeft;

			if (this.scrollType === "default") {
				left = vpc.scrollLeft;

				if (left > 0) {
					this.scrollBy(this.layout.delta, 0, true);
				} else {
					section = this.views.last().section.next();
				}
			} else {
				left = vpc.scrollLeft + (this.layout.delta * -1);

				if (left > vpc.scrollWidth * -1) {
					this.scrollBy(this.layout.delta, 0, true);
				} else {
					section = this.views.last().section.next();
				}
			}
		} else if (this.paginated && this.settings.axis === AXIS_V) {

			this.scrollTop = vpc.scrollTop;
			const top = vpc.scrollTop + vpc.offsetHeight;

			if (top < vpc.scrollHeight) {
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
			this.updateLayout();

			let forceRight = false;
			if (this.layout.name === "pre-paginated" &&
				this.layout.divisor === 2 &&
				section.properties.includes("page-spread-right")) {
				forceRight = true;
			}

			this.append(section, forceRight).then((view) => {

				// Reset position to start for scrolled-doc vertical-rl in default mode
				if (!hvx && dir === "rtl" &&
					this.scrollType === "default") {
					this.scrollTo(vpc.scrollWidth, 0, true);
				}
				this.views.show();
				def.resolve(view);
			}, (err) => {
				def.reject(err);
			});
		} else {
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
		const hvx = this.paginated && this.settings.axis === AXIS_H;
		const vpc = this.stage.container;

		if (this.views.length === 0) {
			def.resolve(null);
			return def.promise;
		} else if (hvx && dir === "ltr") {

			this.scrollLeft = vpc.scrollLeft;
			left = vpc.scrollLeft;

			if (left > 0) {
				this.scrollBy(-this.layout.delta, 0, true);
			} else {
				section = this.views.first().section.prev();
			}
		} else if (hvx && dir === "rtl") {

			this.scrollLeft = vpc.scrollLeft;

			if (this.scrollType === "default") {
				left = vpc.scrollLeft + vpc.offsetWidth;

				if (left < vpc.scrollWidth) {
					this.scrollBy(-this.layout.delta, 0, true);
				} else {
					section = this.views.first().section.prev();
				}
			}
			else {
				left = vpc.scrollLeft;

				if (left < 0) {
					this.scrollBy(-this.layout.delta, 0, true);
				} else {
					section = this.views.first().section.prev();
				}
			}
		} else if (this.paginated && this.settings.axis === AXIS_V) {

			this.scrollTop = vpc.scrollTop;
			const top = vpc.scrollTop;

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
			this.updateLayout();

			let forceRight = false;
			if (this.layout.name === "pre-paginated" &&
				this.layout.divisor === 2 &&
				typeof section.prev() !== "object") {
				forceRight = true;
			}

			this.prepend(section, forceRight).then((view) => {

				if (hvx) {
					if (dir === "rtl") {
						if (this.scrollType === "default") {
							this.scrollTo(0, 0, true);
						}
						else {
							this.scrollTo((vpc.scrollWidth * -1) + this.layout.delta, 0, true);
						}
					} else {
						this.scrollTo(vpc.scrollWidth - this.layout.delta, 0, true);
					}
				}
				this.views.show();
				def.resolve(view);
			}, (err) => {
				def.reject(err);
			});
		} else {
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
			// Current is the last visible view
			return views[views.length - 1];
		}
		return null;
	}

	/**
	 * clear views
	 */
	clear() {

		if (this.views) {
			this.views.hide();
			this.scrollTo(0, 0, true);
			this.views.clear();
		}
	}

	/**
	 * currentLocation
	 * @returns {object[]} Location sections
	 */
	currentLocation() {

		this.updateLayout();
		if (this.paginated && this.settings.axis === AXIS_H) {
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

		let offset = 0, used = 0;
		if (this.fullsize) {
			offset = this.settings.axis === AXIS_V ? window.scrollY : window.scrollX;
		}

		const container = this.stage.container.getBoundingClientRect();
		const pageHeight = container.height < window.innerHeight ? container.height : window.innerHeight;
		const pageWidth = container.width < window.innerWidth ? container.width : window.innerWidth;
		const views = this.visible();
		const sections = views.map((view) => {

			const { index, href } = view.section;
			const position = view.position();

			let startPos;
			let endPos;
			let stopPos;
			let total;

			if (this.settings.axis === AXIS_V) {
				startPos = offset + container.top - position.top + used;
				endPos = startPos + pageHeight - used;
				stopPos = pageHeight;
				total = this.layout.count(view.height, pageHeight).pages;
			} else {
				startPos = offset + container.left - position.left + used;
				endPos = startPos + pageWidth - used;
				stopPos = pageWidth;
				total = this.layout.count(view.width, pageWidth).pages;
			}

			let startPage = Math.ceil(startPos / stopPos);
			let endPage = Math.ceil(endPos / stopPos);

			// Reverse page counts for horizontal rtl
			if (this.settings.axis === AXIS_H &&
				this.layout.direction === "rtl") {
				const tmp = startPage;
				startPage = total - endPage;
				endPage = total - tmp;
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
				axis: this.settings.axis,
				href,
				index,
				pages,
				total,
				mapping
			}
		});

		return sections;
	}

	/**
	 * Get location from paginated flow
	 * @returns {object[]} sections
	 * @private
	 */
	paginatedLocation() {

		let left = 0, used = 0;
		if (this.fullsize) {
			left = window.scrollX;
		}

		const container = this.stage.container.getBoundingClientRect();
		const views = this.visible();
		const sections = views.map((view) => {

			const { index, href } = view.section;
			const position = view.position();

			// Find mapping
			let offset;
			let startPos;
			let endPos;
			let pageWidth;

			if (this.layout.direction === "rtl") {
				offset = container.right - left;
				pageWidth = Math.min(Math.abs(offset - position.left), this.layout.width) - used;
				endPos = position.width - (position.right - offset) - used;
				startPos = endPos - pageWidth;
			} else {
				offset = container.left + left;
				pageWidth = Math.min(position.right - offset, this.layout.width) - used;
				startPos = offset - position.left + used;
				endPos = startPos + pageWidth;
			}

			used += pageWidth;

			let startPage = Math.floor(startPos / this.layout.pageWidth);
			let endPage = Math.floor(endPos / this.layout.pageWidth);

			// start page should not be negative
			if (startPage < 0) {
				startPage = 0;
				endPage = endPage + 1;
			}

			const total = this.layout.count(view.width).pages;
			// Reverse page counts for rtl
			if (this.layout.direction === "rtl") {
				const tmp = startPage;
				startPage = total - endPage;
				endPage = total - tmp;
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
				axis: this.settings.axis,
				href,
				index,
				pages,
				total,
				mapping
			}
		});

		return sections;
	}

	/**
	 * isVisible
	 * @param {any} view 
	 * @param {number} offsetPrev 
	 * @param {number} offsetNext 
	 * @param {DOMRect} [rect] 
	 * @returns {boolean}
	 * @private
	 */
	isVisible(view, offsetPrev, offsetNext, rect) {

		const position = view.position();
		const container = rect || this.bounds();

		if (this.settings.axis === AXIS_H &&
			position.right > container.left - offsetPrev &&
			position.left < container.right + offsetNext) {

			return true;

		} else if (this.settings.axis === AXIS_V &&
			position.bottom > container.top - offsetPrev &&
			position.top < container.bottom + offsetNext) {

			return true;
		}

		return false;
	}

	/**
	 * Get array of visible views
	 * @returns {object[]} array of visible views
	 */
	visible() {

		const container = this.bounds();
		const views = this.views.displayed();
		const items = [];

		for (let i = 0, len = views.length; i < len; i++) {
			const view = views[i];
			if (this.isVisible(view, 0, 0, container)) {
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
		const vpc = this.stage.container;

		if (silent) {
			this.ignore = true;
		}

		if (this.fullsize) {
			window.scrollBy(x * dir, y * dir);
		} else {
			if (x) vpc.scrollLeft += x * dir;
			if (y) vpc.scrollTop += y;
		}
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

		if (this.fullsize) {
			window.scrollTo(x, y);
		} else {
			this.stage.container.scrollLeft = x;
			this.stage.container.scrollTop = y;
		}
	}

	/**
	 * scrolled
	 * @param {Event} e 
	 * @description This event handler is used when the browser does not support the onscrollend event.
	 */
	scrolled(e) {

		clearTimeout(this.afterScrolled);
		this.afterScrolled = setTimeout(() => {
			this.emit(EVENTS.MANAGERS.SCROLLED, {
				top: this.scrollTop,
				left: this.scrollLeft
			});
		}, 20);
	}

	/**
	 * onscroll
	 * @param {Event} e 
	 * @private
	 */
	onscroll(e) {

		if (e.target.nodeType === Node.DOCUMENT_NODE) {
			this.scrollTop = window.scrollY;
			this.scrollLeft = window.scrollX;
		} else if (e.target.nodeType === Node.ELEMENT_NODE) {
			this.scrollTop = e.target.scrollTop;
			this.scrollLeft = e.target.scrollLeft;
		}

		if (this.ignore) {
			this.ignore = false;
		} else {
			this.emit(EVENTS.MANAGERS.SCROLL, {
				top: this.scrollTop,
				left: this.scrollLeft
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

		if (e.target.nodeType === Node.DOCUMENT_NODE) {
			this.scrollTop = window.scrollY;
			this.scrollLeft = window.scrollX;
		} else if (e.target.nodeType === Node.ELEMENT_NODE) {
			this.scrollTop = e.target.scrollTop;
			this.scrollLeft = e.target.scrollLeft;
		}
		
		this.emit(EVENTS.MANAGERS.SCROLLED, {
			top: this.scrollTop,
			left: this.scrollLeft
		});
	}

	/**
	 * Get bounds
	 * @returns {DOMRect}
	 */
	bounds() {

		return this.stage.bounds();
	}

	/**
	 * Update Layout
	 * @param {string|number} [width] 
	 * @param {string|number} [height] 
	 */
	updateLayout(width, height) {

		if (this.fullsize) {
			const view = this.current();
			height = view && view.height;
		}

		this.stage.size(width, height);

		if (this.paginated) {
			this.layout.calculate(
				this.stage.width,
				this.stage.height,
				this.settings.gap
			);
			// Set the look ahead offset for what is visible
			this.settings.offset = this.layout.delta / this.layout.divisor;
		} else {
			this.layout.calculate(
				this.stage.width,
				this.stage.height
			);
		}

		/**
		 * @member {Mapping} mapping
		 * @memberof DefaultViewManager
		 * @readonly
		 */
		this.mapping = new Mapping(this.layout, this.settings.axis);
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
	 * Update axis
	 * @param {string} axis
	 * @param {boolean} [forceUpdate=false] force update
	 * @private
	 */
	updateAxis(axis, forceUpdate = false) {

		if (axis === this.settings.axis &&
			forceUpdate === false) {
			return;
		}

		this.settings.axis = axis;
		this.stage.axis(axis);

		if (this.mapping) {
			this.mapping = new Mapping(this.layout, axis);
		}
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
	 * destroy
	 */
	destroy() {

		this.ignore = true;
		clearTimeout(this.afterScrolled);
		this.clear();
		this.removeEventListeners();
		this.stage.destroy();
		this.rendered = false;
		this.scrollTop = undefined;
		this.scrollLeft = undefined;
		this.scrollType = undefined;
		this.writingMode = undefined;
	}
}

EventEmitter(DefaultViewManager.prototype);

export default DefaultViewManager;