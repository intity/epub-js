import EventEmitter from "event-emitter";
import EpubCFI from "./epubcfi";
import Mapping from "./mapping";
import Defer from "./utils/defer";
import { replaceLinks } from "./utils/replacements";
import { EVENTS, DOM_EVENTS } from "./utils/constants";
import { isNumber, prefixed, borders, defaults } from "./utils/core";

const hasNavigator = typeof (navigator) !== "undefined";
const isChrome = hasNavigator && /Chrome/.test(navigator.userAgent);
const isWebkit = hasNavigator && !isChrome && /AppleWebKit/.test(navigator.userAgent);

/**
 * Handles DOM manipulation, queries and events for View contents
 */
class Contents {
	/**
	 * Constructor
	 * @param {Document} doc Document
	 * @param {Element} content Parent Element (typically Body)
	 * @param {Section} section Section object reference
	 */
	constructor(doc, content, section) {

		this.document = doc;
		/**
		 * @member {Element} content document.body by current location
		 * @memberof Contents
		 * @readonly
		 */
		this.content = content || this.document.body;
		/**
		 * @member {object} contentRect
		 * @memberof Contents
		 * @readonly
		 */
		this.contentRect = {
			bottom: 0,
			height: 0,
			left: 0,
			right: 0,
			top: 0,
			width: 0,
			x: 0,
			y: 0,
		};
		/**
		 * @member {Section} section
		 * @memberof Contents
		 * @readonly
		 */
		this.section = section;
		this.scripts = new Map();
		this.styles = new Map();
		this.active = true;
		this.window = this.document.defaultView;
		/**
		 * @member {string} mode writing-mode
		 * @memberof Contents
		 * @readonly
		 */
		this.mode = this.writingMode();
		this.appendListeners();
	}

	/**
	 * Get or Set width
	 * @param {number} [w]
	 * @returns {number} width
	 */
	width(w) {

		const frame = this.content;

		if (w && isNumber(w)) {
			w = w + "px";
		}

		if (w) {
			frame.style.width = w;
		}

		return parseInt(this.window.getComputedStyle(frame)["width"]);
	}

	/**
	 * Get or Set height
	 * @param {number} [h]
	 * @returns {number} height
	 */
	height(h) {

		const frame = this.content;

		if (h && isNumber(h)) {
			h = h + "px";
		}

		if (h) {
			frame.style.height = h;
		}

		return parseInt(this.window.getComputedStyle(frame)["height"]);
	}

	/**
	 * Get size of the text using Range
	 * @returns {{ width: number, height: number }}
	 */
	textSize() {

		const range = this.document.createRange();
		range.selectNodeContents(this.content);
		const rect = range.getBoundingClientRect();
		const border = borders(this.content);
		const width = rect.width + border.width;
		const height = this.content.clientHeight;

		return {
			width: Math.round(width),
			height: Math.round(height)
		}
	}

	/**
	 * Get documentElement scrollWidth
	 * @returns {number} width
	 */
	scrollWidth() {

		return this.document.documentElement.scrollWidth;
	}

	/**
	 * Get documentElement scrollHeight
	 * @returns {number} height
	 */
	scrollHeight() {

		return this.document.documentElement.scrollHeight;
	}

	/**
	 * Set overflow css style of the contents
	 * @param {string} [overflow]
	 * @returns {string}
	 */
	overflow(overflow) {

		const elt = this.document.documentElement;

		if (overflow) {
			elt.style.overflow = overflow;
		}

		return this.window.getComputedStyle(elt)["overflow"];
	}

	/**
	 * Set overflowX css style of the documentElement
	 * @param {string} [overflow]
	 * @returns {string}
	 */
	overflowX(overflow) {

		const elt = this.document.documentElement;

		if (overflow) {
			elt.style.overflowX = overflow;
		}

		return this.window.getComputedStyle(elt)["overflowX"];
	}

	/**
	 * Set overflowY css style of the documentElement
	 * @param {string} [overflow]
	 * @returns {string}
	 */
	overflowY(overflow) {

		const elt = this.document.documentElement;

		if (overflow) {
			elt.style.overflowY = overflow;
		}

		return this.window.getComputedStyle(elt)["overflowY"];
	}

	/**
	 * Set Css styles on the contents element (typically Body)
	 * @param {string} property
	 * @param {string} value
	 * @param {boolean} [priority] set as "important"
	 * @returns {any}
	 */
	css(property, value, priority) {

		const content = this.content;

		if (value) {
			content.style.setProperty(property, value, priority ? "important" : "");
		} else {
			content.style.removeProperty(property);
		}

		return this.window.getComputedStyle(content)[property];
	}

	/**
	 * Get or Set the viewport element
	 * @param {object} [options]
	 * @param {string} [options.width]
	 * @param {string} [options.height]
	 * @param {string} [options.scale]
	 * @param {string} [options.minimum]
	 * @param {string} [options.maximum]
	 * @param {string} [options.scalable]
	 * @returns {object}
	 */
	viewport(options) {

		const parsed = {
			width: undefined,
			height: undefined,
			scale: undefined,
			minimum: undefined,
			maximum: undefined,
			scalable: undefined
		};
		let viewport = this.document.querySelector("meta[name='viewport']");

		/***
		 * check for the viewport size
		 * <meta name="viewport" content="width=1024,height=697" />
		 */
		if (viewport && viewport.hasAttribute("content")) {

			const content = viewport.getAttribute("content");
			const width = content.match(/width\s*=\s*([^,]*)/);
			const height = content.match(/height\s*=\s*([^,]*)/);
			const scale = content.match(/initial-scale\s*=\s*([^,]*)/);
			const minimum = content.match(/minimum-scale\s*=\s*([^,]*)/);
			const maximum = content.match(/maximum-scale\s*=\s*([^,]*)/);
			const scalable = content.match(/user-scalable\s*=\s*([^,]*)/);

			if (width && width.length && typeof width[1] !== "undefined") {
				parsed.width = width[1];
			}
			if (height && height.length && typeof height[1] !== "undefined") {
				parsed.height = height[1];
			}
			if (scale && scale.length && typeof scale[1] !== "undefined") {
				parsed.scale = scale[1];
			}
			if (minimum && minimum.length && typeof minimum[1] !== "undefined") {
				parsed.minimum = minimum[1];
			}
			if (maximum && maximum.length && typeof maximum[1] !== "undefined") {
				parsed.maximum = maximum[1];
			}
			if (scalable && scalable.length && typeof scalable[1] !== "undefined") {
				parsed.scalable = scalable[1];
			}
		}

		const settings = defaults(options || {}, parsed);
		const newContent = [];

		if (options) {
			if (settings.width) {
				newContent.push("width=" + settings.width);
			}

			if (settings.height) {
				newContent.push("height=" + settings.height);
			}

			if (settings.scale) {
				newContent.push("initial-scale=" + settings.scale);
			}

			if (settings.scalable === "no") {
				newContent.push("minimum-scale=" + settings.scale);
				newContent.push("maximum-scale=" + settings.scale);
				newContent.push("user-scalable=" + settings.scalable);
			} else {

				if (settings.scalable) {
					newContent.push("user-scalable=" + settings.scalable);
				}

				if (settings.minimum) {
					newContent.push("minimum-scale=" + settings.minimum);
				}

				if (settings.maximum) {
					newContent.push("minimum-scale=" + settings.maximum);
				}
			}

			if (viewport === null) {
				viewport = this.document.createElement("meta");
				viewport.setAttribute("name", "viewport");
				this.document.head.appendChild(viewport);
			}

			viewport.setAttribute("content", newContent.join(", "));
			this.window.scrollTo(0, 0);
		}

		return settings;
	}

	/**
	 * Event emitter for when the contents has expanded
	 * @private
	 */
	expand() {

		this.emit(EVENTS.CONTENTS.EXPAND);
	}

	/**
	 * content resize event handler
	 * @param {object[]} entries
	 * @private
	 */
	resize(entries) {

		let changed = false;
		const cmp = (rect) => Object.keys(this.contentRect).forEach(p => {
			if (!rect) return;
			if (this.contentRect[p] !== rect[p] && rect[p] !== void 0) {
				this.contentRect[p] = rect[p];
				changed = true;
			}
		});
		entries.forEach((entry) => cmp(entry.contentRect));
		if (!changed) return;
		this.emit(EVENTS.CONTENTS.RESIZED, this.contentRect);
	}

	/**
	 * Get the documentElement
	 * @returns {Element} documentElement
	 */
	root() {

		if (!this.document) return null;
		return this.document.documentElement;
	}

	/**
	 * Get the location offset of a EpubCFI or an #id
	 * @param {string | EpubCFI} target
	 * @param {string} [ignoreClass] for the cfi
	 * @returns {{ left: number, top: number }} target position left and top
	 */
	locationOf(target, ignoreClass) {

		const targetPos = { left: 0, top: 0 };

		if (!this.document) return targetPos;
		let position;
		if (EpubCFI.prototype.isCfiString(target)) {

			const range = new EpubCFI(target).toRange(this.document, ignoreClass);

			if (range) {
				try {
					if (!range.endContainer ||
						(range.startContainer == range.endContainer
							&& range.startOffset == range.endOffset)) {
						// If the end for the range is not set, it results in collapsed becoming
						// true. This in turn leads to inconsistent behaviour when calling
						// getBoundingRect. Wrong bounds lead to the wrong page being displayed.
						// https://developer.microsoft.com/en-us/microsoft-edge/platform/issues/15684911/
						let pos = range.startContainer.textContent.indexOf(" ", range.startOffset);
						if (pos == -1) {
							pos = range.startContainer.textContent.length;
						}
						range.setEnd(range.startContainer, pos);
					}
				} catch (e) {
					console.error("setting end offset to start container length failed", e);
				}

				if (range.startContainer.nodeType === Node.ELEMENT_NODE) {
					position = range.startContainer.getBoundingClientRect();
					targetPos.left = position.left;
					targetPos.top = position.top;
				} else {
					// Webkit does not handle collapsed range bounds correctly
					// https://bugs.webkit.org/show_bug.cgi?id=138949

					// Construct a new non-collapsed range
					if (isWebkit) {
						const container = range.startContainer;
						const newRange = new Range();
						try {
							if (container.nodeType === Node.ELEMENT_NODE) {
								position = container.getBoundingClientRect();
							} else if (range.startOffset + 2 < container.length) {
								newRange.setStart(container, range.startOffset);
								newRange.setEnd(container, range.startOffset + 2);
								position = newRange.getBoundingClientRect();
							} else if (range.startOffset - 2 > 0) {
								newRange.setStart(container, range.startOffset - 2);
								newRange.setEnd(container, range.startOffset);
								position = newRange.getBoundingClientRect();
							} else { // empty, return the parent element
								position = container.parentNode.getBoundingClientRect();
							}
						} catch (e) {
							console.error(e, e.stack);
						}
					} else {
						position = range.getBoundingClientRect();
					}
				}
			}

		} else if (typeof target === "string" && target.indexOf("#") > -1) {

			const id = target.substring(target.indexOf("#") + 1);
			const el = this.document.getElementById(id);
			if (el) {
				if (isWebkit) {
					// Webkit reports incorrect bounding rects in Columns
					const newRange = new Range();
					newRange.selectNode(el);
					position = newRange.getBoundingClientRect();
				} else {
					position = el.getBoundingClientRect();
				}
			}
		}

		if (position) {
			targetPos.left = position.left;
			targetPos.top = position.top;
		}

		return targetPos;
	}

	/**
	 * Create stylesheet link
	 * @param {string} key 
	 * @param {string} src 
	 * @returns {Promise<Node>}
	 * @private
	 */
	createLink(key, src) {

		return new Promise((resolve, reject) => {
			const id = `epubjs-injected-css-${key}`;
			let node = this.styles.get(id);
			if (node) {
				this.document.head.removeChild(node);
			}
			node = this.document.createElement("link");
			node.rel = "stylesheet";
			node.type = "text/css";
			node.href = src;
			node.onload = () => {
				resolve(node);
			};
			node.onerror = () => {
				reject(new Error(`Failed to load source: ${src}`));
			};
			this.document.head.appendChild(node);
			this.styles.set(id, node);
		});
	}

	/**
	 * Create stylesheet rules
	 * @param {string} key 
	 * @param {object} rules 
	 * @returns {Promise<Node>}
	 * @private
	 */
	createStyle(key, rules) {

		return new Promise((resolve) => {
			const id = `epubjs-injected-css-${key}`;
			let node = this.styles.get(id);
			if (node) {
				this.document.head.removeChild(node);
			}
			node = this.document.createElement("style");
			node.id = id;
			this.document.head.appendChild(node);
			Object.keys(rules).forEach((selector) => {
				const value = rules[selector];
				const index = node.sheet.cssRules.length;
				const items = Object.keys(value).map((k) => {
					return `${k}:${value[k]}`;
				}).join(";");
				node.sheet.insertRule(`${selector}{${items}}`, index);
			});
			this.styles.set(id, node);
			resolve(node);
		});
	}

	/**
	 * Append a stylesheet link/rules to the document head
	 * @param {string} key
	 * @param {string|object} input url or rules 
	 * @returns {Promise<Node>}
	 * @example appendStylesheet("common", "/pach/to/stylesheet.css")
	 * @example appendStylesheet("common", "https://example.com/to/stylesheet.css")
	 * @example appendStylesheet("common", { h1: { "font-size": "1.5em" }})
	 */
	appendStylesheet(key, input) {

		const def = new Defer();

		if (!this.document) {
			def.reject(new Error("Document cannot be null"));
			return def.promise;
		}

		if (typeof input === "string") {
			this.createLink(key, input).then((node) => {
				def.resolve(node);
			});
		} else {
			this.createStyle(key, input).then((node) => {
				def.resolve(node);
			});
		}

		return def.promise;
	}

	/**
	 * Remove a stylesheet link from the document head
	 * @param {string} key 
	 * @returns {boolean}
	 */
	removeStylesheet(key) {

		if (!this.document) {
			return false;
		}
		const id = `epubjs-injected-css-${key}`;
		const node = this.styles.get(id);
		if (typeof node === "undefined") {
			return false;
		}
		this.document.head.removeChild(node);
		return this.styles.delete(id);
	}

	/**
	 * Clear all injected stylesheets
	 */
	clearStylesheets() {

		this.styles.forEach((node) => {
			this.document.head.removeChild(node);
		});
		this.styles.clear();
	}

	/**
	 * Append a script node to the document head
	 * @param {string} key
	 * @param {string} src url 
	 * @example appendScript("common", "/path/to/script.js")
	 * @example appendScript("common", "https://examples.com/to/script.js")
	 * @returns {Promise<Node>} loaded
	 */
	appendScript(key, src) {

		return new Promise((resolve, reject) => {

			if (!this.document) {
				reject(new Error("Document cannot be null"));
				return;
			}

			const id = `epubjs-injected-src-${key}`;
			let node = this.styles.get(id);
			if (typeof node === "undefined") {
				node = this.document.createElement("script");
				node.type = "text/javascript";
				node.src = src;
				node.onload = () => {
					resolve(node);
				};
				node.onerror = () => {
					reject(new Error(`Failed to load source: ${src}`));
				};
				this.document.head.appendChild(node);
			}
			this.scripts.set(id, node);
		});
	}

	/**
	 * Remove a script node from the document head
	 * @param {string} key 
	 * @returns {boolean}
	 */
	removeScript(key) {

		if (!this.document) {
			return false;
		}
		const id = `epubjs-injected-src-${key}`;
		const node = this.scripts.get(id);
		if (typeof node === "undefined") {
			return false;
		}
		this.document.head.removeChild(node);
		return this.scripts.remove(id);
	}

	/**
	 * Clear all injected scripts
	 */
	clearScripts() {

		this.scripts.forEach((node) => {
			this.document.head.removeChild(node);
		})
		this.scripts.clear();
	}

	/**
	 * Append a class to the contents container
	 * @param {string} className
	 */
	appendClass(className) {

		if (!this.document) return;

		const content = this.content;

		if (content) {
			content.classList.add(className);
		}
	}

	/**
	 * Remove a class from the contents container
	 * @param {string} className
	 */
	removeClass(className) {

		if (!this.document) return;

		const content = this.content;

		if (content) {
			content.classList.remove(className);
		}
	}

	/**
	 * Get a Dom Range from EpubCFI
	 * @param {EpubCFI} cfi
	 * @param {string} [ignoreClass]
	 * @returns {Range} range
	 */
	range(cfi, ignoreClass) {

		const epubcfi = new EpubCFI(cfi);
		return epubcfi.toRange(this.document, ignoreClass);
	}

	/**
	 * Get an EpubCFI from a Dom Range
	 * @param {Range} range
	 * @param {string} [ignoreClass]
	 * @returns {string} EpubCFI
	 */
	cfiFromRange(range, ignoreClass) {

		return new EpubCFI(range, this.section.cfiBase, ignoreClass).toString();
	}

	/**
	 * Get an EpubCFI from a Dom node
	 * @param {Node} node
	 * @param {string} [ignoreClass]
	 * @returns {string} EpubCFI
	 */
	cfiFromNode(node, ignoreClass) {

		return new EpubCFI(node, this.section.cfiBase, ignoreClass).toString();
	}

	/**
	 * map
	 * @param {Layout} layout 
	 * @todo find where this is used - remove?
	 * @returns {object[]}
	 */
	map(layout) {

		const map = new Mapping(layout);
		return map.section();
	}

	/**
	 * Apply CSS to a Document
	 * @param {Layout} layout 
	 */
	format(layout) {

		if (layout.flow === "paginated") {
			this.columns(layout);
		} else {
			this.size(layout);
		}
	}

	/**
	 * Size the contents to a given width and height
	 * @param {Layout} layout
	 * @private
	 */
	size(layout) {

		const doc = layout.flow === "scrolled-doc";
		const szw = doc ? layout.pageWidth : layout.width;
		const dir = layout.direction;

		this.width(szw);
		this.viewport({
			width: szw,
			scale: 1.0,
			scalable: "no"
		});
		this.direction(dir);

		this.css("height", "auto");
		this.css("padding", "20px " + (szw / 12) + "px");
		this.css("overflow", "hidden");
		this.css("margin", "0");
		this.css("box-sizing", "border-box");
	}

	/**
	 * Apply columns to the contents for pagination
	 * @param {Layout} layout
	 * @private
	 */
	columns(layout) {

		const pgw = layout.pageWidth;
		const pgh = layout.pageHeight;
		const clw = layout.columnWidth;
		const dir = layout.direction;
		const gap = layout.gap;

		this.width(pgw);
		this.height(pgh);
		this.viewport({
			width: pgw,
			height: pgh,
			scale: 1.0,
			scalable: "no"
		});
		this.direction(dir);

		this.css("overflow", "hidden");
		this.css("margin", "0", true);
		this.css("box-sizing", "border-box");
		this.css("max-height", "inherit");
		this.css("display", "block");
		this.css("padding-top", "20px");
		this.css("padding-bottom", "20px");
		this.css("padding-left", (gap / 2) + "px", true);
		this.css("padding-right", (gap / 2) + "px", true);
		this.css("column-gap", gap + "px");
		this.css("column-fill", "auto");
		this.css("column-width", clw + "px");

		// Fix glyph clipping in WebKit
		// https://github.com/futurepress/epub.js/issues/983
		this.css("-webkit-line-box-contain", "block glyphs replaced");
	}

	/**
	 * Scale contents from center
	 * @param {number} scale
	 * @param {number} offsetX
	 * @param {number} offsetY
	 */
	scale(scale, offsetX, offsetY) {

		const value = "scale(" + scale + ")";

		let translate = "";
		if (offsetX >= 0 || offsetY >= 0) {
			translate = " translate(" + (offsetX || 0) + "px, " + (offsetY || 0) + "px )";
		}

		this.css("transform", value + translate);
		this.css("transform-origin", "top left");
	}

	/**
	 * Set the direction of the text
	 * @param {string} [dir='ltr'] values: `"ltr"` OR `"rtl"`
	 */
	direction(dir = "ltr") {

		this.document.documentElement.dir = dir;
	}

	/**
	 * mapPage
	 * @param {string} cfiBase 
	 * @param {Layout} layout 
	 * @param {number} start 
	 * @param {number} end 
	 * @param {boolean} dev 
	 * @returns {any}
	 */
	mapPage(cfiBase, layout, start, end, dev) {

		const mapping = new Mapping(layout, dev);
		return mapping.page(this, cfiBase, start, end);
	}

	/**
	 * Set the writingMode of the text
	 * @param {string} [mode='horizontal-tb'] `"horizontal-tb"` OR `"vertical-rl"` OR `"vertical-lr"`
	 */
	writingMode(mode = "horizontal-tb") {

		if (this.mode === mode) return this.mode;
		const WRITING_MODE = prefixed("writing-mode");
		const elt = this.document.documentElement;
		elt.style[WRITING_MODE] = mode;
		this.mode = this.window.getComputedStyle(elt)[WRITING_MODE] || "";
		return this.mode;
	}

	/**
	 * Append listeners
	 * @private
	 */
	appendListeners() {

		if (!this.document) return;
		//-- DOM EVENTS
		DOM_EVENTS.forEach(eventName => {
			this.document.addEventListener(eventName,
				this.triggerEvent.bind(this), { passive: true });
		}, this);
		//-- SELECTION
		this.document.addEventListener("selectionchange",
			this.selectionHandler.bind(this), { passive: true }
		);
		//-- RESIZE
		this.resizeObserver = new ResizeObserver((e) => {
			requestAnimationFrame(() => this.resize(e));
		});
		this.resizeObserver.observe(this.document.documentElement);
		//-- LINK CLICKED
		replaceLinks(this.content, (href) => {
			this.emit(EVENTS.CONTENTS.LINK_CLICKED, href);
		});
	}

	/**
	 * Remove listeners
	 * @private
	 */
	removeListeners() {

		if (!this.document) return;
		//-- DOM EVENTS
		DOM_EVENTS.forEach(eventName => {
			this.document.removeEventListener(eventName,
				this.triggerEvent.bind(this), { passive: true });
		}, this);
		//-- SELECTION
		this.document.removeEventListener("selectionchange",
			this.selectionHandler.bind(this), { passive: true }
		);
		//-- RESIZE
		if (this.resizeObserver) {
			this.resizeObserver.disconnect();
		}
		//-- MUTATION
		if (this.mutationObserver) {
			this.mutationObserver.disconnect();
		}
	}

	/**
	 * Emit passed browser events
	 * @private
	 */
	triggerEvent(e) {

		this.emit(e.type, e);
	}

	/**
	 * Handle getting text on selection
	 * @private
	 */
	selectionHandler(e) {

		if (this.selectionEndTimeout) {
			clearTimeout(this.selectionEndTimeout);
		}

		this.selectionEndTimeout = setTimeout(() => {
			const selection = this.window.getSelection();
			if (!(selection && selection.rangeCount > 0))
				return;
			const range = selection.getRangeAt(0);
			if (!range.collapsed) {
				const cfirange = new EpubCFI(range, this.section.cfiBase).toString();
				this.emit(EVENTS.CONTENTS.SELECTED, cfirange);
				this.emit(EVENTS.CONTENTS.SELECTED_RANGE, range);
			}
		}, 250);
	}

	/**
	 * Test if images are loaded or add listener for when they load
	 * @private
	 */
	imageLoadListeners() {

		const images = this.document.querySelectorAll("img");
		for (let i = 0; i < images.length; i++) {
			const img = images[i];

			if (typeof img.naturalWidth !== "undefined" &&
				img.naturalWidth === 0) {
				img.onload = this.expand.bind(this);
			}
		}
	}

	/**
	 * Listen for media query changes and emit 'expand' event
	 * Adapted from: https://github.com/tylergaw/media-query-events/blob/master/js/mq-events.js
	 * @private
	 */
	mediaQueryListeners() {

		const sheets = this.document.styleSheets;
		const mediaChangeHandler = (m) => {
			if (m.matches) {
				setTimeout(this.expand.bind(this), 1);
			}
		};

		for (let i = 0; i < sheets.length; i += 1) {
			let rules;
			// Firefox errors if we access cssRules cross-domain
			try {
				rules = sheets[i].cssRules;
			} catch (e) {
				console.error(e);
				return;
			}
			if (!rules) return; // Stylesheets changed
			for (let j = 0; j < rules.length; j += 1) {
				if (rules[j].media) {
					const mql = this.window.matchMedia(rules[j].media.mediaText);
					mql.onchange = mediaChangeHandler;
				}
			}
		}
	}

	/**
	 * Listen for font load and check for resize when loaded (unused)
	 * @private
	 */
	fontLoadListeners() {

		if (!this.document || !this.document.fonts) {
			return;
		}

		//this.document.fonts.ready.then(() => this.resize());
	}

	/**
	 * Use css transitions to detect resize (unused)
	 * @private
	 */
	transitionListeners() {

		const body = this.content;

		body.style["transitionProperty"] = "font, font-size, font-size-adjust, font-stretch, font-variation-settings, font-weight, width, height";
		body.style["transitionDuration"] = "0.001ms";
		body.style["transitionTimingFunction"] = "linear";
		body.style["transitionDelay"] = "0";

		//this.document.addEventListener('transitionend', this.resize.bind(this));
	}

	/**
	 * Use MutationObserver to listen for changes in 
	 * the DOM and check for resize (unused)
	 * @private
	 */
	mutationListener() {

		const mutation = (mutations, observer) => {

			mutations.forEach(m => {
				//console.log(m)
			});
		}

		this.mutationObserver = new MutationObserver(mutation);
		this.mutationObserver.observe(this.document, {
			attributes: true,
			childList: true,
			characterData: true,
			subtree: true
		});
	}

	/**
	 * destroy
	 */
	destroy() {

		this.removeListeners();
		this.clearStylesheets();
		this.styles = undefined;
		this.clearScripts();
		this.scripts = undefined;
		this.section = undefined;
	}
}

EventEmitter(Contents.prototype);

export default Contents;