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

		const views = this.views;
		const delta = offset || this.settings.offset || 0;
		const promises = [];

		for (let i = 0; i < views.length; i++) {

			const view = views[i];

			if (this.isVisible(view, delta, delta)) {
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

		if (this.paginated &&
			this.layout.axis === AXIS_H) {
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

		if (this.paginated &&
			this.layout.axis === AXIS_H) {
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

export default ContinuousViewManager;