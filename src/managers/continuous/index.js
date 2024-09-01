import { extend } from "../../utils/core";
import Defer from "../../utils/defer";
import DefaultViewManager from "../default";
import Snap from "../helpers/snap";
import { EVENTS } from "../../utils/constants";

const AXIS_H = "horizontal";

/**
 * Continuous view manager
 * @extends {DefaultViewManager}
 */
class ContinuousViewManager extends DefaultViewManager {
	/**
	 * Constructor
	 * @param {Book} book
	 * @param {object} [options]
	 * @param {string} [options.axis]
	 * @param {object} [options.snap]
	 * @param {string} [options.method] values: `"blobUrl"` OR `"srcdoc"` OR `"write"`
	 * @param {string} [options.ignoreClass='']
	 * @param {string|object} [options.view='iframe']
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
			allowPopups: false,
			allowScriptedContent: false,
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
			this.snapper = new Snap(this, this.settings.snap);
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

		const full = value || new Defer();

		this.q.enqueue(() => {
			return this.check();
		}).then((result) => {
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

		let distX = 0, distY = 0;

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

		const rect = this.bounds();
		const views = this.views;
		const delta = offset || this.settings.offset || 0;
		const updating = new Defer();
		const promises = [];

		for (let i = 0; i < views.length; i++) {

			const view = views[i];

			if (this.isVisible(view, delta, delta, rect)) {
				if (view.displayed) {
					view.show();
				} else {
					const displayed = view.display(this.load)
						.then((view) => {
							view.show();
						});
					promises.push(displayed);
				}
			}
		}

		if (promises.length) {
			return Promise.all(promises).catch((err) => {
				updating.reject(err);
			});
		} else {
			updating.resolve();
			return updating.promise;
		}
	}

	/**
	 * check
	 * @param {number} [offsetLeft]
	 * @param {number} [offsetTop]
	 * @returns {Promise<any>}
	 * @private
	 */
	check(offsetLeft, offsetTop) {

		const checking = new Defer();
		const promises = [];
		const vph = this.viewport.axis === AXIS_H;
		const vpc = this.viewport.container;
		const rtl = this.layout.direction === "rtl";
		let delta = this.settings.offset || 0;

		if (offsetLeft && vph) {
			delta = offsetLeft;
		}

		if (offsetTop && !vph) {
			delta = offsetTop;
		}

		const bounds = this.bounds(); // bounds saved this until resize
		const visibleLength = vph ? Math.floor(bounds.width) : bounds.height;
		const contentLength = vph ? vpc.scrollWidth : vpc.scrollHeight;
		let offset = vph ? this.scrollLeft : this.scrollTop;

		if (this.fullsize) {
			// Scroll offset starts at 0 and goes negative
			if ((vph && rtl && this.scrollType === "negative") ||
				(!vph && rtl && this.scrollType === "default")) {
				offset = offset * -1;
			}
		} else if (this.writingMode.indexOf(AXIS_H) === 0) {
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
			const last = this.views.last();
			const next = last && last.section.next();
			if (next) {
				promises.push(this.append(next));
			}
		};

		const prepend = () => {
			const first = this.views.first();
			const prev = first && first.section.prev();
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
				return this.check(); // recursive call
			}).then(() => {
				// Check to see if anything new is on screen after rendering
				return this.update(delta);
			}, (err) => {
				return err;
			});
		} else {
			this.q.enqueue(() => {
				this.update();
			});
			checking.resolve(false);
			return checking.promise;
		}
	}

	/**
	 * appendEventListeners
	 * @override
	 */
	appendEventListeners() {

		super.appendEventListeners();

		if (this.fullsize) {
			let dir;
			if (this.layout.direction === "rtl" &&
				this.scrollType === "default") {
				dir = -1;
			} else {
				dir = 1;
			}
			this.scrollTop = window.scrollY * dir;
			this.scrollLeft = window.scrollX * dir;
		} else {
			this.scrollTop = this.viewport.container.scrollTop;
			this.scrollLeft = this.viewport.container.scrollLeft;
		}
	}

	/**
	 * onscroll
	 * @param {Event} e 
	 * @override
	 */
	onscroll(e) {

		if (e.target.nodeType === Node.DOCUMENT_NODE) {
			let dir;
			if (this.layout.direction === "rtl" &&
				this.scrollType === "default") {
				dir = -1;
			} else {
				dir = 1;
			}
			this.scrollTop = window.scrollY * dir;
			this.scrollLeft = window.scrollX * dir;
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
	 * @override
	 */
	onscrollend(e) {

		this.scrollend(e);
	}

	/**
	 * scrolled
	 * @param {Event} e 
	 * @override
	 */
	scrolled(e) {

		this.q.enqueue(() => {
			return this.check();
		});
		this.q.run().then(() => {
			this.emit(EVENTS.MANAGERS.SCROLLED, {
				top: this.scrollTop,
				left: this.scrollLeft
			});
		});
	}

	/**
	 * next
	 * @override
	 */
	next() {

		let delta;
		if (this.layout.name === "pre-paginated" &&
			this.layout.spread === "auto") {
			delta = this.layout.delta * 2;
		} else {
			delta = this.layout.delta;
		}

		if (this.views.length === 0) return;
		if (this.paginated &&
			this.viewport.axis === AXIS_H) {
			this.scrollBy(delta, 0, true);
		} else {
			this.scrollBy(0, this.layout.height, true);
		}

		this.q.enqueue(() => {
			return this.check();
		});
	}

	/**
	 * prev
	 * @override
	 */
	prev() {

		let delta;
		if (this.layout.name === "pre-paginated" &&
			this.layout.spread === "auto") {
			delta = this.layout.delta * 2;
		} else {
			delta = this.layout.delta;
		}

		if (this.views.length === 0) return;

		if (this.paginated &&
			this.viewport.axis === AXIS_H) {
			this.scrollBy(-delta, 0, true);
		} else {
			this.scrollBy(0, -this.layout.height, true);
		}

		this.q.enqueue(() => {
			return this.check();
		});
	}

	/**
	 * destroy
	 * @override
	 */
	destroy() {

		super.destroy();
		clearTimeout(this.scrollTimeout);
		clearTimeout(this.trimTimeout);

		if (this.snapper) {
			this.snapper.destroy();
		}
	}
}

export default ContinuousViewManager;