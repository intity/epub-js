import EventEmitter from "event-emitter";
import Defer from "../../utils/defer";
import Marks from "../../marks-pane/marks";
import Highlight from "../../marks-pane/highlight";
import Underline from "../../marks-pane/underline";
import { uuid } from "../../utils/core";
import { EVENTS } from "../../utils/constants";

/**
 * The View base class
 */
class View {
    /**
     * Constructor
     * @param {layout} layout 
     * @param {section} section 
     */
    constructor(layout, section) {
        /**
         * @member {string} id
         * @memberof View
         * @readonly
         */
        this.id = "vi-" + uuid();
        /**
         * @member {Contents} contents
         * @memberof View
         * @readonly
         */
        this.contents = null;
        /**
         * @member {Element} container
         * @memberof View
         * @readonly
         */
        this.container = null;
        /**
         * @member {boolean} displayed
         * @memberof View
         * @readonly
         */
        this.displayed = false;
        /**
         * @member {Document} document
         * @memberof View
         * @readonly
         */
        this.document = null;
        /**
         * @member {boolean} expanding
         * @memberof View
         * @readonly
         */
        this.expanding = false;
        /**
         * @member {Node}
         * @memberof View
         * @readonly
         */
        this.frame = null;
        /**
         * @member {Marks} marks
         * @memberof View
         * @readonly
         */
        this.marks = null;
        /**
         * @member {number} width
         * @memberof View
         * @readonly
         */
        this.width = 0;
        /**
         * @member {number} height
         * @memberof View
         * @readonly
         */
        this.height = 0;
        this.layout = layout;
        this.section = section;
        /**
         * @member {object} settings
         * @memberof View
         * @readonly
         */
        this.settings = null;
        this.init();
    }

    /**
     * Create the view-container
     * @private
     */
    init() {

        this.container = document.createElement("div");
        this.container.classList.add("view-container");
        this.container.style.height = "0";
        this.container.style.width = "0";
        this.container.style.overflow = "hidden";
        this.container.style.position = "relative";
        this.container.setAttribute("ref", this.section.index);
    }

    /**
     * Clear all marks
     * @returns {number} number of marks
     * @abstract
     */
    clear() {

        let len = 0;

        if (this.marks) {
            this.marks.forEach((mark, key) => {
                if (mark instanceof Highlight) {
                    len = this.unhighlight(mark.data["epubcfi"]) ? (len += 1) : len;
                } else {
                    len = this.ununderline(mark.data["epubcfi"]) ? (len += 1) : len;
                }
            });
        }
        return len;
    }

    /**
	 * Create frame element
	 * @returns {Element} iframe
	 * @abstract
	 */
    create() {}

    /**
	 * render
	 * @param {function} request 
	 * @returns {Promise<string>} section render
     * @abstract
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
			 * @memberof View
			 */
			this.emit(EVENTS.VIEWS.LOAD_ERROR, err);
			def.reject(err);
		}).then(() => {
			/**
			 * @event rendered
			 * @param {IframeView} view
			 * @memberof View
			 */
			this.emit(EVENTS.VIEWS.RENDERED, this);
		});

		return def.promise;
	}

    /**
	 * Reset frame
     * @abstract
	 */
	reset() {

		if (this.frame) {
			this.frame.style.width = "0";
			this.frame.style.height = "0";
			this.width = 0;
			this.height = 0;
		}
	}

    /**
	 * Update view
     * @abstract
	 */
	update() {

		this.contents.format(this.layout);
		this.axis();
		this.mode();
		this.expand();
	}

    /**
     * Update axis
     * @abstract
     */
    axis() {

        if (this.layout.axis === "horizontal") {
			this.container.style.flex = "none";
		} else {
			this.container.style.flex = "initial";
		}
    }

    /**
     * Update mode
     * @param {string} value 
     * @abstract
     */
    mode(value) {}

    /**
     * Expanding
     * @abstract
     */
    expand() {

		if (!this.frame || this.expanding) return;

		this.expanding = true;
		const sz = this.contents.textSize();
		const pw = this.layout.pageWidth;

		if (this.layout.flow === "paginated") {

			if (sz.width % pw > 0) {
				sz.width = Math.ceil(sz.width / pw) * pw;
			}

			if (this.settings.forceEvenPages) {
				const columns = (sz.width / pw);
				if (this.layout.divisor > 1 &&
					this.layout.name === "reflowable" &&
					(columns % 2 > 0)) {
					// add a blank page
					sz.width += pw;
				}
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
	 * @abstract
	 */
    reframe(width, height) {

		if (!this.frame) return;

		this.container.style.width = width + "px";
		this.container.style.height = height + "px";

		this.frame.style.width = width + "px";
		this.frame.style.height = height + "px";

		this.width = width;
		this.height = height;

		this.marks && this.marks.render();
	}

    /**
     * Load frame
     * @param {string} contents 
     * @returns {Promise<any>} loading promise
     * @abstract
     */
    load(contents) {

        return Promise.resolve();
    }

    /**
	 * Display view
	 * @param {function} request 
	 * @returns {Promise<View>} displayed promise
	 */
	display(request) {

		const displayed = new Defer();

		if (this.displayed) {
			displayed.resolve(this);
		} else {
			this.render(request).then(() => {
				/**
				 * @event displayed
				 * @memberof View
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
     * Show container
     */
    show() {

        this.container.style.visibility = "visible";
		if (this.frame) {
			this.frame.style.visibility = "visible";
		}
        /**
		 * @event shown
		 * @param {IframeView} view
		 * @memberof View
		 */
		this.emit(EVENTS.VIEWS.SHOWN, this);
    }

    /**
     * Hide container
     * @abstract
     */
    hide() {

        this.container.style.visibility = "hidden";
		if (this.frame) {
			this.frame.style.visibility = "hidden";
		}
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

		const pos = this.contents.locationOf(target, this.settings.ignoreClass);

		return {
			left: pos.left,
			top: pos.top
		};
	}

    /**
     * highlight
     * @param {string} cfiRange 
     * @param {object} [data={}] 
     * @param {function} [cb=null] callback function
     * @param {string} [className='epubjs-hl'] 
     * @param {object} [styles={}] 
     * @returns {object}
     */
    highlight(cfiRange, data = {}, cb = null, className = "epubjs-hl", styles = {}) {

        if (!this.contents) return;

        data["epubcfi"] = cfiRange;

        if (this.marks === null) {
            this.marks = new Marks(this.frame, this.container);
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
             * @memberof View
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
     * underline
     * @param {string} cfiRange 
     * @param {object} [data={}] 
     * @param {function} [cb=null]
     * @param {string} [className='epubjs-ul'] 
     * @param {object} [styles={}] 
     * @returns {object}
     */
    underline(cfiRange, data = {}, cb = null, className = "epubjs-ul", styles = {}) {

        if (!this.contents) return;

        data["epubcfi"] = cfiRange;

        if (this.marks === null) {
            this.marks = new Marks(this.frame, this.container);
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
             * @memberof View
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
     * Destroy the View object
     * @abstract
     */
    destroy() {

        if (this.marks && this.displayed) {
            this.marks.element.remove();
            this.marks.clear();
            this.marks = undefined;
        }
        if (this.displayed) {
            this.displayed = undefined;
            this.container.removeChild(this.frame);
            this.container = undefined;
            this.contents.destroy();
            this.contents = undefined;
        }
        this.expanding = undefined;
        this.document = undefined;
        this.frame = undefined;
        this.size = undefined;
        this.id = undefined;
        this.width = undefined;
        this.height = undefined;
        this.settings = undefined;
    }
}

EventEmitter(View.prototype);

export default View;