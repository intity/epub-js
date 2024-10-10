import EventEmitter from "event-emitter";
import Contents from "../../contents";
import Defer from "../../utils/defer";
import { EVENTS } from "../../utils/constants";
import {
	extend,
	createBlobUrl,
	revokeBlobUrl,
	uuid
} from "../../utils/core";
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
	 * @param {string[]} [options.sandbox=[]] iframe sandbox policy list
	 */
	constructor(layout, section, options) {

		this.layout = layout;
		this.section = section;
		this.settings = extend({
			method: null,
			sandbox: [],
			forceEvenPages: false,
			ignoreClass: "",
		}, options || {});
		/**
		 * @member {string} id
		 * @memberof IframeView
		 * @readonly
		 */
		this.id = "vc-" + uuid();
		/**
		 * @member {Contents} contents
		 * @memberof IframeView
		 * @readonly
		 */
		this.contents = null;
		this.document = null;
		/**
		 * @member {Element} container
		 * @memberof IframeView
		 * @readonly
		 */
		this.container = null;
		this.displayed = false;
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
		this.init();
	}

	/**
	 * create view-container
	 * @private
	 */
	init() {

		this.container = document.createElement("div");
		this.container.classList.add("view-container");
		this.container.style.height = "0";
		this.container.style.width = "0";
		this.container.style.overflow = "hidden";
		this.container.style.position = "relative";
	}

	/**
	 * Create iframe element
	 * @returns {Element} iframe
	 * @private
	 */
	create() {

		this.iframe = document.createElement("iframe");
		this.iframe.id = this.id;
		this.iframe.seamless = "seamless";
		this.iframe.style.overflow = "hidden";
		this.iframe.style.border = "none";
		this.iframe.style.width = "0";
		this.iframe.style.height = "0";
		this.settings.sandbox.forEach(p => {
			if (p) this.iframe.sandbox.add(p);
		});
		this.iframe.setAttribute("enable-annotation", "true");
		this.container.setAttribute("ref", this.section.index);
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
			this.update();
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
		}
	}

	/**
	 * Update view
	 */
	update() {

		this.contents.format(this.layout);
		this.axis();
		this.mode();
		this.expand();
	}

	/**
	 * update axis
	 * @private
	 */
	axis() {

		if (this.layout.axis === AXIS_H) {
			this.container.style.flex = "none";
		} else {
			this.container.style.flex = "initial";
		}
	}

	/**
	 * update writing mode
	 * @param {string} value 
	 * @private
	 */
	mode(value) {

		const mode = value || this.contents.mode;

		if (this.writingMode !== mode) {
			this.writingMode = mode;
			this.emit(EVENTS.VIEWS.WRITING_MODE, mode);
		}
	}

	/**
	 * Resize a single axis based on content dimensions
	 * @private
	 */
	expand() {

		if (!this.iframe || this.expanding) return;

		this.expanding = true;
		const sz = this.contents.textSize();

		if (this.layout.axis === AXIS_H) {

			if (sz.width % this.layout.pageWidth > 0) {
				sz.width = Math.ceil(sz.width / this.layout.pageWidth) * this.layout.pageWidth;
			}

			if (this.settings.forceEvenPages) {
				const columns = (sz.width / this.layout.pageWidth);
				if (this.layout.divisor > 1 &&
					this.layout.name === "reflowable" &&
					(columns % 2 > 0)) {
					// add a blank page
					sz.width += this.layout.pageWidth;
				}
			}
		} else if (this.layout.axis === AXIS_V) {

			if (this.layout.flow === "paginated" &&
				sz.height % this.layout.height > 0) {
				sz.height = Math.ceil(sz.height / this.layout.height) * this.layout.height;
			}
		}

		if (this.width !== sz.width ||
			this.height !== sz.height) {
			this.reframe(sz.width, sz.height);
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

		this.container.style.width = width + "px";
		this.container.style.height = height + "px";

		this.iframe.style.width = width + "px";
		this.iframe.style.height = height + "px";

		this.width = width;
		this.height = height;

		this.marks && this.marks.render();
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

		this.container.appendChild(this.iframe);
		this.document = this.iframe.contentDocument;
		this.iframe.onload = (e) => this.onLoad(e, loading);

		if (!this.document) {
			loading.reject(new Error("No Document Available"));
			return loading.promise;
		} else if (this.method === "blobUrl") {
			this.blobUrl = createBlobUrl(contents, "application/xhtml+xml");
			this.iframe.src = this.blobUrl;
		} else if (this.method === "srcdoc") {
			this.iframe.srcdoc = contents;
		} else {
			this.document.open();
			this.document.write("<!DOCTYPE html>");
			this.document.write(contents);
			this.document.close();
		}

		return loading.promise;
	}

	/**
	 * onLoad
	 * @param {Event} event 
	 * @param {Defer} defer 
	 */
	onLoad(event, defer) {

		this.document = event.target.contentDocument;
		this.contents = new Contents(this.document, this.document.body, this.section);

		let link = this.document.querySelector("link[rel='canonical']");
		if (link) {
			link.setAttribute("href", this.section.canonical);
		} else {
			link = this.document.createElement("link");
			link.setAttribute("rel", "canonical");
			link.setAttribute("href", this.section.canonical);
			this.document.head.appendChild(link);
		}

		this.contents.on(EVENTS.CONTENTS.RESIZED, (rect) => {
			/**
			 * @event resized
			 * @param {object} rect
			 * @memberof IframeView
			 */
			this.emit(EVENTS.VIEWS.RESIZED, rect);
		});

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

		this.container.style.visibility = "visible";
		this.iframe.style.visibility = "visible";
		// Remind Safari to redraw the iframe
		this.iframe.style.transform = "translateZ(0)";
		this.iframe.offsetWidth;
		this.iframe.style.transform = null;
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

		this.container.style.visibility = "hidden";
		this.iframe.style.visibility = "hidden";
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
			top: this.container.offsetTop,
			left: this.container.offsetLeft
		};
	}

	/**
	 * position
	 * @returns {DOMRect}
	 */
	position() {

		return this.container.getBoundingClientRect();
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
			this.marks = new Marks(this.iframe, this.container);
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
			this.marks = new Marks(this.iframe, this.container);
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
			this.blobUrl = undefined;
		}

		if (this.displayed) {
			this.displayed = undefined;
			this.expanding = undefined;
			this.document = undefined;
			this.contents.destroy();
			this.contents = undefined;
			this.settings = undefined;
			this.section = undefined;
			this.container.removeChild(this.iframe);
			this.container = undefined;
			this.iframe = undefined;
			this.layout = undefined;
			this.method = undefined;
			this.width = undefined;
			this.height = undefined;
			this.writingMode = undefined;
			this.id = undefined;

			if (this.marks) {
				this.marks.element.remove();
				this.marks.clear();
				this.marks = undefined;
			}
		}
	}
}

EventEmitter(IframeView.prototype);

export default IframeView;