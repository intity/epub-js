import EventEmitter from "event-emitter";
import EpubCFI from "../../epubcfi";
import Contents from "../../contents";
import { EVENTS } from "../../utils/constants";
import { extend, borders, uuid, isNumber, bounds, defer, createBlobUrl, revokeBlobUrl } from "../../utils/core";
import { Pane, Highlight, Underline } from "marks-pane";

const AXIS_H = "horizontal";
const AXIS_V = "vertical";

/**
 * IframeView class
 */
class IframeView {
	/**
	 * Constructor
	 * @param {Layout} layout
	 * @param {Section} section
	 * @param {object} [options]
	 * @param {string} [options.axis] values: `"horizontal"` OR `"vertical"`
	 * @param {string} [options.method] values: `"blobUrl"` OR `"srcdoc"` OR `"write"`
	 * @param {string} [options.ignoreClass='']
	 * @param {boolean} [options.allowPopups=false]
	 * @param {boolean} [options.allowScriptedContent=false]
	 * @param {boolean} [options.forceRight=false]
	 */
	constructor(layout, section, options) {
		/**
		 * @member {object} settings
		 * @memberof IframeView
		 * @readonly
		 */
		this.settings = extend({
			axis: null,
			method: null,
			forceRight: false,
			forceEvenPages: false,
			ignoreClass: "",
			allowPopups: false,
			allowScriptedContent: false,
		}, options || {});
		/**
		 * @member {string} id
		 * @memberof IframeView
		 * @readonly
		 */
		this.id = "epubjs-view-" + uuid();
		/**
		 * @member {Section} section
		 * @memberof IframeView
		 * @readonly
		 */
		this.section = section;
		this.element = this.container();
		this.added = false;
		this.displayed = false;
		this.rendered = false;
		this.fixedWidth = 0; // unused
		this.fixedHeight = 0; // unused
		/**
		 * @member {EpubCFI} epubcfi Blank Cfi for Parsing
		 * @memberof IframeView
		 * @readonly
		 */
		this.epubcfi = new EpubCFI();
		/**
		 * @member {Layout} layout
		 * @memberof IframeView
		 * @readonly
		 */
		this.layout = layout;
		this.layout.on(EVENTS.LAYOUT.UPDATED, (props, changed) => {
			this.updateLayout();
		});
		this.pane = undefined;
		this.highlights = {};
		this.underlines = {};
		this.marks = {};
		this.setAxis(this.settings.axis);
	}

	/**
	 * Create view container
	 * @returns {Element} HTML element
	 * @private
	 */
	container() {

		const element = document.createElement("div");
		element.classList.add("epub-view");
		element.style.height = "0";
		element.style.width = "0";
		element.style.overflow = "hidden";
		element.style.position = "relative";
		return element;
	}

	/**
	 * Create iframe element
	 * @returns {Element} iframe
	 */
	create() {

		this.iframe = document.createElement("iframe");
		this.iframe.id = this.id;
		this.iframe.seamless = "seamless";
		this.iframe.style.overflow = "hidden";
		this.iframe.style.border = "none";
		this.iframe.style.width = "0";
		this.iframe.style.height = "0";

		// sandbox
		this.iframe.sandbox = "allow-same-origin";
		if (this.settings.allowPopups) {
			this.iframe.sandbox += " allow-popups";
		}
		if (this.settings.allowScriptedContent) {
			this.iframe.sandbox += " allow-scripts";
		}

		this.iframe.setAttribute("enable-annotation", "true");
		this.element.setAttribute("ref", this.section.index);
		this.elementBounds = bounds(this.element);

		if (this.settings.method === null) {
			this.settings.method = ("srcdoc" in this.iframe) ? "srcdoc" : "write";
		}

		this.added = true;
		this.resizing = true;
		this.width = 0;
		this.height = 0;

		return this.iframe;
	}

	/**
	 * render
	 * @param {function} request 
	 * @returns {object} section render object
	 */
	render(request) {

		this.create();

		const sectionRender = this.section.render(request);
		return sectionRender.then((contents) => {
			return this.load(contents);
		}).then(() => {
			// find and report the writingMode axis
			const writingMode = this.contents.writingMode();
			const hasVertical = writingMode.indexOf(AXIS_V) === 0;

			// Set the axis based on the flow and writing mode
			let axis;
			if (this.layout.flow === "scrolled") {
				axis = hasVertical ? AXIS_H : AXIS_V;
			} else {
				axis = hasVertical ? AXIS_V : AXIS_H;
			}

			if (hasVertical && this.layout.flow === "paginated") {
				this.layout.delta = this.layout.height;
			}

			this.setAxis(axis);
			this.emit(EVENTS.VIEWS.AXIS, axis);

			this.setWritingMode(writingMode);
			this.emit(EVENTS.VIEWS.WRITING_MODE, writingMode);

			// apply the layout function to the contents
			this.layout.format(this.contents, this.section, this.axis);

			// Listen for events that require an expansion of the iframe
			this.addListeners();

			return new Promise((resolve, reject) => {
				// Expand the iframe to the full size of the content
				this.expand();

				if (this.settings.forceRight) {
					this.element.style.marginLeft = this.width + "px";
				}
				resolve();
			});

		}, (err) => {
			this.emit(EVENTS.VIEWS.LOAD_ERROR, err);
			return new Promise((resolve, reject) => {
				reject(err);
			});
		}).then(() => {
			this.emit(EVENTS.VIEWS.RENDERED, this.section);
		});
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
			this.textWidth = undefined;
			this.textHeight = undefined;
			this.contentWidth = undefined; // unused
			this.contentHeight = undefined; // unused
		}
		this.needsReframe = true;
	}

	/**
	 * size
	 * Determine locks base on settings
	 * @param {number} [width] 
	 * @param {number} [height] 
	 */
	size(width, height) {
		
		width = width || this.layout.width;
		height = height || this.layout.height;

		let what;
		if (this.layout.name === "pre-paginated") {
			what = "both";
		} else if (this.settings.axis === AXIS_H) {
			what = "height";
		} else {
			what = "width";
		}

		this.lock(what, width, height);
	}

	/**
	 * lock
	 * Lock an axis to element dimensions, taking borders into account
	 * @param {string} what 
	 * @param {number} width 
	 * @param {number} height 
	 */
	lock(what, width, height) {

		const elBorders = borders(this.element);

		let iframeBorders;
		if (this.iframe) {
			iframeBorders = borders(this.iframe);
		} else {
			iframeBorders = { width: 0, height: 0 };
		}

		switch (what) {
			case "both":
				if (isNumber(width) && isNumber(height)) {
					this.lockedWidth = width - elBorders.width - iframeBorders.width;
					this.lockedHeight = height - elBorders.height - iframeBorders.height;
					// this.resize(this.lockedWidth, this.lockedHeight);
				}
				break;
			case "width":
				if (isNumber(width)) {
					this.lockedWidth = width - elBorders.width - iframeBorders.width;
					// this.resize(this.lockedWidth, width); // width keeps ratio correct
				}
				break;
			case "height":
				if (isNumber(height)) {
					this.lockedHeight = height - elBorders.height - iframeBorders.height;
					// this.resize(width, this.lockedHeight);
				}
				break;
		}

		if (this.displayed && this.iframe) {
			this.expand();
		}
	}

	/**
	 * expand
	 * Resize a single axis based on content dimensions
	 */
	expand() {

		let width = this.lockedWidth;
		let height = this.lockedHeight;

		if (!this.iframe || this.expanding) return;

		this.expanding = true;

		if (this.layout.name === "pre-paginated") {
			width = this.layout.columnWidth;
			height = this.layout.height;
		} else if (this.settings.axis === AXIS_H) {
			// Get the width of the text
			width = this.contents.textSize().width;

			if (width % this.layout.pageWidth > 0) {
				width = Math.ceil(width / this.layout.pageWidth) * this.layout.pageWidth;
			}

			if (this.settings.forceEvenPages) {
				const columns = (width / this.layout.pageWidth);
				if (this.layout.divisor > 1 &&
					this.layout.name === "reflowable" &&
					(columns % 2 > 0)) {
					// add a blank page
					width += this.layout.pageWidth;
				}
			}
		} else if (this.settings.axis === "vertical") {
			// Expand Vertically
			height = this.contents.textSize().height;

			if (this.layout.flow === "paginated" &&
				height % this.layout.height > 0) {
				height = Math.ceil(height / this.layout.height) * this.layout.height;
			}
		}

		// Only Resize if dimensions have changed or
		// if Frame is still hidden, so needs reframing
		if (this.needsReframe ||
			this.width !== width ||
			this.height !== height) {
			this.reframe(width, height);
		}

		this.expanding = false;
	}

	/**
	 * reframe
	 * @param {number} width 
	 * @param {number} height 
	 */
	reframe(width, height) {

		this.element.style.width = width + "px";
		this.element.style.height = height + "px";

		this.iframe.style.width = width + "px";
		this.iframe.style.height = height + "px";

		this.width = width;
		this.height = height;

		const size = {
			width: width,
			height: height,
			widthDelta: this.prevBounds ? width - this.prevBounds.width : width,
			heightDelta: this.prevBounds ? height - this.prevBounds.height : height,
		};

		this.pane && this.pane.render();

		requestAnimationFrame(() => {
			for (let m in this.marks) {
				if (this.marks.hasOwnProperty(m)) {
					const mark = this.marks[m];
					this.placeMark(mark.element, mark.range);
				}
			}
		});

		this.onResize(this, size);
		this.emit(EVENTS.VIEWS.RESIZED, size);
		this.prevBounds = size;
		this.elementBounds = bounds(this.element);
	}

	/**
	 * load
	 * @param {string} contents 
	 * @returns {Promise} loading promise
	 */
	load(contents) {

		const loading = new defer();
		const loaded = loading.promise;

		if (!this.iframe) {
			loading.reject(new Error("No Iframe Available"));
			return loaded;
		}

		this.iframe.onload = (e) => this.onLoad(e, loading);

		if (this.settings.method === "blobUrl") {
			this.blobUrl = createBlobUrl(contents, "application/xhtml+xml");
			this.iframe.src = this.blobUrl;
			this.element.appendChild(this.iframe);
		} else if (this.settings.method === "srcdoc") {
			this.iframe.srcdoc = contents;
			this.element.appendChild(this.iframe);
		} else {
			this.element.appendChild(this.iframe);
			this.document = this.iframe.contentDocument;

			if (!this.document) {
				loading.reject(new Error("No Document Available"));
				return loaded;
			}

			this.iframe.contentDocument.open();
			if (window.MSApp && MSApp.execUnsafeLocalFunction) {
				// For Cordova windows platform
				MSApp.execUnsafeLocalFunction(() => {
					this.iframe.contentDocument.write(contents);
				});
			} else {
				this.iframe.contentDocument.write(contents);
			}
			this.iframe.contentDocument.close();
		}

		return loaded;
	}

	/**
	 * onLoad
	 * @param {Event} event 
	 * @param {defer} promise 
	 */
	onLoad(event, promise) {

		this.window = this.iframe.contentWindow;
		this.document = this.iframe.contentDocument;
		this.document.body.style.overflow = "hidden";
		this.contents = new Contents(this.document, this.document.body, this.section);
		this.rendering = false;

		let link = this.document.querySelector("link[rel='canonical']");
		if (link) {
			link.setAttribute("href", this.section.canonical);
		} else {
			link = this.document.createElement("link");
			link.setAttribute("rel", "canonical");
			link.setAttribute("href", this.section.canonical);
			this.document.querySelector("head").appendChild(link);
		}

		this.contents.on(EVENTS.CONTENTS.EXPAND, () => {
			if (this.displayed && this.iframe) {
				this.expand();
				if (this.contents) {
					this.layout.format(this.contents);
				}
			}
		});

		this.contents.on(EVENTS.CONTENTS.RESIZE, (rect) => {
			if (this.displayed && this.iframe) {
				this.expand();
				if (this.contents) {
					this.layout.format(this.contents);
				}
			}
		});

		promise.resolve(this.contents);
	}

	/**
	 * Update Layout
	 * @private
	 */
	updateLayout() {

		if (this.contents) {
			this.layout.format(this.contents);
			this.expand();
		}
	}

	/**
	 * Set axis
	 * @param {string} value 
	 */
	setAxis(value) {

		if (value === null) {
			value = this.layout.flow === "paginated" ? AXIS_H : AXIS_V;
		}

		if (value == AXIS_H) {
			this.element.style.flex = "none";
		} else {
			this.element.style.flex = "initial";
		}

		this.settings.axis = value;
		this.size();
	}

	/**
	 * Set writing mode
	 * @param {string} mode 
	 */
	setWritingMode(mode) {
		// this.element.style.writingMode = mode;
		this.writingMode = mode;
	}

	addListeners() {
		//TODO: Add content listeners for expanding
	}

	removeListeners(layoutFunc) {
		//TODO: remove content listeners for expanding
	}

	/**
	 * display
	 * @param {function} request 
	 * @returns {Promise} displayed promise
	 */
	display(request) {

		const displayed = new defer();

		if (this.displayed === false) {

			this.render(request).then(() => {

				this.emit(EVENTS.VIEWS.DISPLAYED, this);
				this.onDisplayed(this);
				this.displayed = true;
				displayed.resolve(this);
			}, (err) => {
				displayed.reject(err, this);
			});

		} else {
			displayed.resolve(this);
		}

		return displayed.promise;
	}

	/**
	 * show
	 */
	show() {

		this.element.style.visibility = "visible";

		if (this.iframe) {
			this.iframe.style.visibility = "visible";

			// Remind Safari to redraw the iframe
			this.iframe.style.transform = "translateZ(0)";
			this.iframe.offsetWidth;
			this.iframe.style.transform = null;
		}

		this.emit(EVENTS.VIEWS.SHOWN, this);
	}

	/**
	 * hide
	 */
	hide() {

		this.element.style.visibility = "hidden";
		this.iframe.style.visibility = "hidden";

		this.stopExpanding = true;
		this.emit(EVENTS.VIEWS.HIDDEN, this);
	}

	/**
	 * offset
	 * @returns {object}
	 */
	offset() {

		return {
			top: this.element.offsetTop,
			left: this.element.offsetLeft
		}
	}

	/**
	 * position
	 * @returns {DOMRect}
	 */
	position() {

		return this.element.getBoundingClientRect();
	}

	/**
	 * locationOf
	 * @param {*} target 
	 * @returns {object}
	 */
	locationOf(target) {

		const parentPos = this.iframe.getBoundingClientRect();
		const targetPos = this.contents.locationOf(target, this.settings.ignoreClass);

		return {
			"left": targetPos.left,
			"top": targetPos.top
		};
	}

	/**
	 * Stub, override with a custom functions
	 * @param {*} view 
	 */
	onDisplayed(view) {}

	/**
	 * Stub, override with a custom functions
	 * @param {*} view 
	 * @param {Event} e 
	 */
	onResize(view, e) {}

	/**
	 * bounds
	 * @param {boolean} [force=false] 
	 * @returns {Element}
	 */
	bounds(force = false) {

		if (force || !this.elementBounds) {
			this.elementBounds = bounds(this.element);
		}

		return this.elementBounds;
	}

	/**
	 * highlight
	 * @param {string|EpubCFI} cfiRange 
	 * @param {object} [data={}] 
	 * @param {function} cb callback function
	 * @param {string} [className='epubjs-hl'] 
	 * @param {object} [styles={}] 
	 * @returns {object}
	 */
	highlight(cfiRange, data = {}, cb, className = "epubjs-hl", styles = {}) {

		if (!this.contents) {
			return;
		}
		const attributes = Object.assign({
			"fill": "yellow",
			"fill-opacity": "0.3",
			"mix-blend-mode": "multiply"
		}, styles);
		const range = this.contents.range(cfiRange);
		const emitter = () => {
			this.emit(EVENTS.VIEWS.MARK_CLICKED, cfiRange, data);
		};

		data["epubcfi"] = cfiRange;

		if (!this.pane) {
			this.pane = new Pane(this.iframe, this.element);
		}

		const m = new Highlight(range, className, data, attributes);
		const h = this.pane.addMark(m);

		this.highlights[cfiRange] = {
			"mark": h,
			"element": h.element,
			"listeners": [emitter, cb]
		};

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
	 * @param {*} cfiRange 
	 * @param {*} [data={}] 
	 * @param {*} cb 
	 * @param {*} [className='epubjs-ul'] 
	 * @param {*} [styles={}] 
	 * @returns {object}
	 */
	underline(cfiRange, data = {}, cb, className = "epubjs-ul", styles = {}) {

		if (!this.contents) {
			return;
		}
		const attributes = Object.assign({ "stroke": "black", "stroke-opacity": "0.3", "mix-blend-mode": "multiply" }, styles);
		let range = this.contents.range(cfiRange);
		let emitter = () => {
			this.emit(EVENTS.VIEWS.MARK_CLICKED, cfiRange, data);
		};

		data["epubcfi"] = cfiRange;

		if (!this.pane) {
			this.pane = new Pane(this.iframe, this.element);
		}

		let m = new Underline(range, className, data, attributes);
		let h = this.pane.addMark(m);

		this.underlines[cfiRange] = { "mark": h, "element": h.element, "listeners": [emitter, cb] };

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
	 * mark
	 * @param {*} cfiRange 
	 * @param {*} [data={}] 
	 * @param {*} cb 
	 * @returns {object}
	 */
	mark(cfiRange, data = {}, cb) {

		if (!this.contents) {
			return;
		}

		if (cfiRange in this.marks) {
			let item = this.marks[cfiRange];
			return item;
		}

		let range = this.contents.range(cfiRange);
		if (!range) {
			return;
		}
		let container = range.commonAncestorContainer;
		let parent = (container.nodeType === 1) ? container : container.parentNode;

		let emitter = (e) => {
			this.emit(EVENTS.VIEWS.MARK_CLICKED, cfiRange, data);
		};

		if (range.collapsed && container.nodeType === 1) {
			range = new Range();
			range.selectNodeContents(container);
		} else if (range.collapsed) { // Webkit doesn't like collapsed ranges
			range = new Range();
			range.selectNodeContents(parent);
		}

		let mark = this.document.createElement("a");
		mark.setAttribute("ref", "epubjs-mk");
		mark.style.position = "absolute";

		mark.dataset["epubcfi"] = cfiRange;

		if (data) {
			Object.keys(data).forEach((key) => {
				mark.dataset[key] = data[key];
			});
		}

		if (cb) {
			mark.addEventListener("click", cb);
			mark.addEventListener("touchstart", cb);
		}

		mark.addEventListener("click", emitter);
		mark.addEventListener("touchstart", emitter);

		this.placeMark(mark, range);

		this.element.appendChild(mark);

		this.marks[cfiRange] = { "element": mark, "range": range, "listeners": [emitter, cb] };

		return parent;
	}

	/**
	 * placeMark
	 * @param {*} element 
	 * @param {*} range 
	 */
	placeMark(element, range) {

		let top, right;

		if (this.layout.name === "pre-paginated" ||
			this.settings.axis !== AXIS_H) {
			const pos = range.getBoundingClientRect();
			top = pos.top;
			right = pos.right;
		} else {
			// Element might break columns, so find the left most element
			const rects = range.getClientRects();
			let left;
			for (let i = 0; i != rects.length; i++) {
				const rect = rects[i];
				if (!left || rect.left < left) {
					left = rect.left;
					// right = rect.right;
					right = Math.ceil(left / this.layout.props.pageWidth) * this.layout.props.pageWidth - (this.layout.gap / 2);
					top = rect.top;
				}
			}
		}

		element.style.top = `${top}px`;
		element.style.left = `${right}px`;
	}

	/**
	 * unhighlight
	 * @param {*} cfiRange 
	 */
	unhighlight(cfiRange) {

		let item;
		if (cfiRange in this.highlights) {
			item = this.highlights[cfiRange];
			this.pane.removeMark(item.mark);
			item.listeners.forEach((l) => {
				if (l) {
					item.element.removeEventListener("click", l);
					item.element.removeEventListener("touchstart", l);
				};
			});
			delete this.highlights[cfiRange];
		}
	}

	/**
	 * ununderline
	 * @param {*} cfiRange 
	 */
	ununderline(cfiRange) {

		let item;
		if (cfiRange in this.underlines) {
			item = this.underlines[cfiRange];
			this.pane.removeMark(item.mark);
			item.listeners.forEach((l) => {
				if (l) {
					item.element.removeEventListener("click", l);
					item.element.removeEventListener("touchstart", l);
				};
			});
			delete this.underlines[cfiRange];
		}
	}

	/**
	 * unmark
	 * @param {*} cfiRange 
	 */
	unmark(cfiRange) {

		let item;
		if (cfiRange in this.marks) {
			item = this.marks[cfiRange];
			this.element.removeChild(item.element);
			item.listeners.forEach((l) => {
				if (l) {
					item.element.removeEventListener("click", l);
					item.element.removeEventListener("touchstart", l);
				};
			});
			delete this.marks[cfiRange];
		}
	}

	/**
	 * destroy
	 */
	destroy() {

		for (let cfiRange in this.highlights) {
			this.unhighlight(cfiRange);
		}

		for (let cfiRange in this.underlines) {
			this.ununderline(cfiRange);
		}

		for (let cfiRange in this.marks) {
			this.unmark(cfiRange);
		}

		if (this.blobUrl) {
			revokeBlobUrl(this.blobUrl);
		}

		if (this.displayed) {
			this.displayed = false;

			this.removeListeners();
			this.contents.destroy();

			this.stopExpanding = true;
			this.element.removeChild(this.iframe);

			if (this.pane) {
				this.pane.element.remove();
				this.pane = undefined;
			}

			this.iframe = undefined;
			this.contents = undefined;

			this.textWidth = null;
			this.textHeight = null;
			this.width = null;
			this.height = null;
		}

		// this.element.style.height = "0px";
		// this.element.style.width = "0px";
	}
}

EventEmitter(IframeView.prototype);

export default IframeView;