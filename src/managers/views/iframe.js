import EventEmitter from "event-emitter";
import EpubCFI from "../../epubcfi";
import Contents from "../../contents";
import Defer from "../../utils/defer";
import { EVENTS } from "../../utils/constants";
import { extend, borders, uuid, isNumber, bounds, createBlobUrl, revokeBlobUrl } from "../../utils/core";
import Marks from "../../marks-pane/marks";
import Highlight from "../../marks-pane/highlight";
import Underline from "../../marks-pane/underline";

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
	 * @param {string} [options.method='write'] values: `"blobUrl"` OR `"srcdoc"` OR `"write"`
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
		/**
		 * @member {Contents} contents
		 * @memberof IframeView
		 * @readonly
		 */
		this.contents = null;
		this.document = null;
		this.element = this.container();
		this.added = false;
		this.displayed = false;
		this.rendered = false;
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
		/**
		 * @member {Marks} marks
		 * @memberof IframeView
		 * @readonly
		 */
		this.marks = null;
		/**
		 * Load method
		 * @member {string} method
		 * @memberof IframeView
		 * @readonly
		 */
		this.method = this.settings.method || "write";
		/**
		 * @member {string} writingMode
		 * @memberof IframeView
		 * @readonly
		 */
		this.writingMode = "";
	}

	/**
	 * Create view container
	 * @returns {Element} HTML element
	 * @private
	 */
	container() {

		const element = document.createElement("div");
		element.classList.add("view-container");
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

		if (this.method === "srcdoc" && ("srcdoc" in this.iframe)) {
			this.method = "srcdoc";
		}

		this.added = true;
		this.resizing = true;
		this.width = 0;
		this.height = 0;

		return this.iframe;
	}

	/**
	 * render
	 * @param {Function} request 
	 * @returns {Promise<string>} section render
	 */
	render(request) {

		const def = new Defer();

		this.create();
		this.section.render(request).then((contents) => {
			return this.load(contents);
		}).then((output) => {

			this.setWritingMode(this.contents.mode);
			this.update();

			if (this.settings.forceRight) {
				this.element.style.marginLeft = this.width + "px";
			}

			def.resolve(output);
		}, (err) => {
			/**
			 * @event loaderror
			 * @param {object} err
			 * @memberof IframeView
			 */
			this.emit(EVENTS.VIEWS.LOAD_ERROR, err);
			def.reject(err);
		}).then(() => {
			/**
			 * @event rendered
			 * @param {IframeView} view
			 * @memberof IframeView
			 */
			this.emit(EVENTS.VIEWS.RENDERED, this);
		});

		return def.promise;
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
	 * Update view
	 */
	update() {

		this.contents.format(this.layout, this.section);
		this.axis();
		this.size();
		this.expand();
	}

	/**
	 * update axis
	 * @private
	 */
	axis() {

		if (this.layout.axis === AXIS_H) {
			this.element.style.flex = "none";
		} else {
			this.element.style.flex = "initial";
		}
	}

	/**
	 * Set writing mode
	 * @param {string} mode 
	 * @private
	 */
	setWritingMode(mode) {

		if (this.writingMode !== mode) {
			this.writingMode = mode;
			this.emit(EVENTS.VIEWS.WRITING_MODE, mode);
		}
	}

	/**
	 * update size
	 * @private
	 */
	size() {

		const elb = borders(this.element);
		const ifb = borders(this.iframe);
		const szw = this.layout.width;
		const szh = this.layout.height;

		if (this.layout.name === "pre-paginated") {
			this.lockedWidth = szw - elb.width - ifb.width;
			this.lockedHeight = szh - elb.height - ifb.height;
		} else if (this.layout.axis === AXIS_V) {
			this.lockedWidth = szw - elb.width - ifb.width;
		} else {
			this.lockedHeight = szh - elb.height - ifb.height;
		}
	}

	/**
	 * Resize a single axis based on content dimensions
	 * @private
	 */
	expand() {

		let width = this.lockedWidth;
		let height = this.lockedHeight;

		if (!this.iframe || this.expanding) return;

		this.expanding = true;

		if (this.layout.name === "pre-paginated") {
			width = this.layout.columnWidth;
			height = this.layout.height;
		} else if (this.layout.axis === AXIS_H) {
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
		} else if (this.layout.axis === AXIS_V) {
			// Expand Vertically
			const size = this.contents.textSize();
			width = size.width;
			height = size.height;

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
	 * @private
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

		this.marks && this.marks.render();
		/**
		 * @event resized
		 * @param {object} size
		 * @memberof IframeView
		 */
		this.emit(EVENTS.VIEWS.RESIZED, size);
		this.prevBounds = size;
		this.elementBounds = bounds(this.element);
	}

	/**
	 * load
	 * @param {string} contents 
	 * @returns {Promise<any>} loading promise
	 */
	load(contents) {

		const loading = new Defer();

		if (!this.iframe) {
			loading.reject(new Error("No Iframe Available"));
			return loading.promise;
		}

		if (this.method === "blobUrl") {
			this.blobUrl = createBlobUrl(contents, "application/xhtml+xml");
			this.iframe.src = this.blobUrl;
			this.element.appendChild(this.iframe);
		} else if (this.method === "srcdoc") {
			this.iframe.srcdoc = contents;
			this.element.appendChild(this.iframe);
		} else {
			this.element.appendChild(this.iframe);
			this.document = this.iframe.contentDocument;

			if (!this.document) {
				loading.reject(new Error("No Document Available"));
				return loading.promise;
			}

			this.document.open();
			this.document.write("<!DOCTYPE html>"); // required in Firefox
			this.document.write(contents);
			this.document.close();
		}

		this.iframe.onload = (e) => this.onLoad(e, loading);
		return loading.promise;
	}

	/**
	 * onLoad
	 * @param {Event} event 
	 * @param {Defer} defer 
	 */
	onLoad(event, defer) {

		this.window = this.iframe.contentWindow;
		this.document = this.iframe.contentDocument;
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

		defer.resolve(this.contents);
	}

	/**
	 * display
	 * @param {Function} request 
	 * @returns {Promise<view>} displayed promise
	 */
	display(request) {

		const displayed = new Defer();

		if (this.displayed) {
			displayed.resolve(this);
		} else {
			this.render(request).then(() => {
				/**
				 * @event displayed
				 * @memberof IframeView
				 */
				this.emit(EVENTS.VIEWS.DISPLAYED);
				this.displayed = true;
				displayed.resolve(this);
			}, (err) => {
				displayed.reject(err);
			});
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
		/**
		 * @event shown
		 * @param {IframeView} view
		 * @memberof IframeView
		 */
		this.emit(EVENTS.VIEWS.SHOWN, this);
	}

	/**
	 * hide
	 */
	hide() {

		this.element.style.visibility = "hidden";
		this.iframe.style.visibility = "hidden";
		this.stopExpanding = true;
		/**
		 * @event hidden
		 * @param {IframeView} view
		 * @memberof IframeView
		 */
		this.emit(EVENTS.VIEWS.HIDDEN, this);
	}

	/**
	 * offset
	 * @returns {{ top: number, left: number }}
	 */
	offset() {

		return {
			top: this.element.offsetTop,
			left: this.element.offsetLeft
		};
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
	 * @param {string|EpubCFI} target 
	 * @returns {{ top: number, left: number }}
	 */
	locationOf(target) {

		const pos = this.contents.locationOf(
			target, this.settings.ignoreClass
		);

		return {
			top: pos.top,
			left: pos.left
		};
	}

	/**
	 * bounds
	 * @param {boolean} [force=false] 
	 * @returns {{ height: number, width: number }}
	 */
	bounds(force = false) {

		if (force || !this.elementBounds) {
			this.elementBounds = bounds(this.element);
		}

		return this.elementBounds;
	}

	/**
	 * highlight
	 * @param {string} cfiRange 
	 * @param {object} [data={}] 
	 * @param {Function} [cb=null] callback function
	 * @param {string} [className='epubjs-hl'] 
	 * @param {object} [styles={}] 
	 * @returns {object}
	 */
	highlight(cfiRange, data = {}, cb = null, className = "epubjs-hl", styles = {}) {

		if (!this.contents) {
			return;
		}

		data["epubcfi"] = cfiRange;

		if (this.marks === null) {
			this.marks = new Marks(this.iframe, this.element);
		}

		const attributes = Object.assign({
			"fill": "yellow",
			"fill-opacity": "0.3",
			"mix-blend-mode": "multiply"
		}, styles);
		const emitter = (e) => {
			/**
			 * @event markClicked
			 * @param {string} cfiRange
			 * @param {object} data
			 * @memberof IframeView
			 */
			this.emit(EVENTS.VIEWS.MARK_CLICKED, cfiRange, data);
		};
		const key = encodeURI("epubjs-hl:" + cfiRange);
		const range = this.contents.range(cfiRange);
		const m = new Highlight(range, {
			className,
			data,
			attributes,
			listeners: [emitter, cb]
		});
		const h = this.marks.appendMark(key, m);

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
	 * @param {string} cfiRange 
	 * @param {object} [data={}] 
	 * @param {Function} [cb=null]
	 * @param {string} [className='epubjs-ul'] 
	 * @param {object} [styles={}] 
	 * @returns {object}
	 */
	underline(cfiRange, data = {}, cb = null, className = "epubjs-ul", styles = {}) {

		if (!this.contents) {
			return;
		}

		data["epubcfi"] = cfiRange;

		if (this.marks === null) {
			this.marks = new Marks(this.iframe, this.element);
		}

		const attributes = Object.assign({
			"stroke": "black",
			"stroke-opacity": "0.3",
			"mix-blend-mode": "multiply"
		}, styles);
		const emitter = (e) => {
			/**
			 * @event markClicked
			 * @param {string} cfiRange
			 * @param {object} data
			 * @memberof IframeView
			 */
			this.emit(EVENTS.VIEWS.MARK_CLICKED, cfiRange, data);
		};
		const key = encodeURI("epubjs-ul:" + cfiRange);
		const range = this.contents.range(cfiRange);
		const m = new Underline(range, {
			className,
			data,
			attributes,
			listeners: [emitter, cb]
		});
		const h = this.marks.appendMark(key, m);

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
	 * unhighlight
	 * @param {string} cfiRange 
	 * @returns {boolean}
	 */
	unhighlight(cfiRange) {

		const key = encodeURI("epubjs-hl:" + cfiRange);
		const mark = this.marks.get(key);
		let result = false;
		if (mark) {
			mark.listeners.forEach((l) => {
				if (l) {
					mark.element.removeEventListener("click", l);
					mark.element.removeEventListener("touchstart", l);
				};
			});
			this.marks.removeMark(key);
			result = true;
		}
		return result;
	}

	/**
	 * ununderline
	 * @param {string} cfiRange 
	 * @returns {boolean}
	 */
	ununderline(cfiRange) {

		const key = encodeURI("epubjs-ul:" + cfiRange);
		const mark = this.marks.get(key);
		let result = false;
		if (mark) {
			mark.listeners.forEach((l) => {
				if (l) {
					mark.element.removeEventListener("click", l);
					mark.element.removeEventListener("touchstart", l);
				};
			});
			this.marks.removeMark(key);
			result = true;
		}
		return result;
	}

	/**
	 * destroy
	 */
	destroy() {

		if (this.marks) {
			this.marks.forEach((mark, key) => {
				if (mark instanceof Highlight) {
					this.unhighlight(mark.data["epubcfi"]);
				} else {
					this.ununderline(mark.data["epubcfi"]);
				}
			});
		}

		if (this.blobUrl) {
			revokeBlobUrl(this.blobUrl);
		}

		if (this.displayed) {
			this.displayed = false;

			this.contents.destroy();

			this.stopExpanding = true;
			this.element.removeChild(this.iframe);

			if (this.marks) {
				this.marks.element.remove();
				this.marks.clear();
			}

			this.iframe = undefined;
			this.contents = undefined;
			this.document = undefined;

			this.textWidth = null;
			this.textHeight = null;
			this.width = null;
			this.height = null;
		}
	}
}

EventEmitter(IframeView.prototype);

export default IframeView;