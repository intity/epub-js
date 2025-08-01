import EventEmitter from "event-emitter";
import Annotations from "./annotations";
import EpubCFI from "./epubcfi";
import Layout from "./layout";
import Themes from "./themes";
import Defer from "./utils/defer";
import Hook from "./utils/hook";
import Viewport from "./viewport";
import Queue from "./utils/queue";
import { extend, isFloat } from "./utils/core";
import { EPUBJS_VERSION, EVENTS, DOM_EVENTS } from "./utils/constants";
import DefaultViewManager from "./managers/default/index";
import ContinuousViewManager from "./managers/continuous/index";

/**
 * Rendition class
 * @description
 * Displays an Epub as a series of Views for each Section.
 * Requires Manager and View class to handle specifics of rendering
 * the section content.
 */
class Rendition {
	/**
	 * Constructor
	 * @param {Book} book
	 * @param {object} [options]
	 * @param {string|number} [options.width] viewport width
	 * @param {string|number} [options.height] viewport height
	 * @param {string} [options.ignoreClass] class for the cfi parser to ignore
	 * @param {string|function} [options.manager='default'] string values: default / continuous
	 * @param {string|function} [options.view='iframe']
	 * @param {string} [options.method='write'] values: `"write"` OR `"srcdoc"`
	 * @param {string} [options.layout] layout to force
	 * @param {string} [options.spread] force spread value
	 * @param {string} [options.direction] direction `"ltr"` OR `"rtl"`
	 * @param {number} [options.pageWidth] page width
	 * @param {number} [options.pageHeight] page height
	 * @param {number} [options.minSpreadWidth] overridden by spread: none (never) / both (always)
	 * @param {string} [options.stylesheet] url of stylesheet to be injected
	 * @param {string} [options.script] url of script to be injected
	 * @param {object} [options.snap] use snap scrolling
	 * @param {string[]} [options.sandbox=[]] iframe sandbox policy list
	 */
	constructor(book, options) {
		/**
		 * @member {object} settings
		 * @memberof Rendition
		 * @readonly
		 */
		this.settings = extend({
			width: null,
			height: null,
			manager: "default",
			view: "iframe",
			flow: null,
			method: "write", // the 'baseUrl' value is set from the 'book.settings.replacements' property
			layout: null,
			spread: null,
			minSpreadWidth: 800,
			script: null,
			snap: null,
			direction: null, // TODO: implement to 'auto' detection
			ignoreClass: "",
			sandbox: [],
			stylesheet: null
		}, options || {});

		this.book = book;
		/**
		 * Adds Hook methods to the Rendition prototype
		 * @member {object} hooks
		 * @property {Hook} hooks.content
		 * @property {Hook} hooks.display
		 * @property {Hook} hooks.layout
		 * @property {Hook} hooks.render
		 * @property {Hook} hooks.show
		 * @property {Hook} hooks.unloaded
		 * @memberof Rendition
		 */
		this.hooks = {
			content: new Hook(this),
			display: new Hook(this),
			layout: new Hook(this),
			render: new Hook(this),
			show: new Hook(this),
			unloaded: new Hook(this)
		}
		this.hooks.content.register(this.handleLinks.bind(this));
		this.hooks.content.register(this.passEvents.bind(this));
		this.hooks.content.register(this.adjustImages.bind(this));

		this.book.sections.hooks.content.register(this.injectIdentifier.bind(this));

		if (this.settings.stylesheet) {
			this.book.sections.hooks.content.register(this.injectStylesheet.bind(this));
		}

		if (this.settings.script) {
			this.book.sections.hooks.content.register(this.injectScript.bind(this));
		}
		/**
		 * @member {Annotations} annotations
		 * @memberof Rendition
		 * @readonly
		 */
		this.annotations = new Annotations(this);
		/**
		 * @member {Themes} themes
		 * @memberof Rendition
		 * @readonly
		 */
		this.themes = new Themes(this);
		/**
		 * @member {EpubCFI} epubcfi
		 * @memberof Rendition
		 * @readonly
		 */
		this.epubcfi = new EpubCFI();
		/**
		 * A Rendered Location Range
		 * @typedef location
		 * @type {object}
		 * @property {object} start
		 * @property {string} start.index
		 * @property {string} start.href
		 * @property {object} start.displayed
		 * @property {number} start.displayed.page
		 * @property {number} start.displayed.total
		 * @property {string} start.cfi EpubCFI string format
		 * @property {number} start.location
		 * @property {number} start.percentage
		 * @property {object} end
		 * @property {string} end.index
		 * @property {string} end.href
		 * @property {object} end.displayed
		 * @property {number} end.displayed.page
		 * @property {number} end.displayed.total
		 * @property {string} end.cfi EpubCFI string format
		 * @property {number} end.location
		 * @property {number} end.percentage
		 * @property {boolean} atStart Location at start position
		 * @property {boolean} atEnd Location at end position
		 * @memberof Rendition
		 */
		this.location = null;
		this.starting = new Defer();
		/**
		 * returns after the rendition has started
		 * @member {Promise<any>} started
		 * @memberof Rendition
		 */
		this.started = this.starting.promise;
		this.q = new Queue(this);
		// Hold queue until book is opened
		this.q.enqueue(this.book.opened);
		// Block the queue until rendering is started
		this.q.enqueue(this.start.bind(this));
	}

	/**
	 * Require the manager from passed string, or as a class function
	 * @param {string|function} manager 
	 * @return {any} manager
	 * @private
	 */
	requireManager(manager) {

		let ret;

		// If manager is a string, try to load from imported managers
		if (typeof manager === "string") {
			switch (manager) {
				case "continuous":
					ret = ContinuousViewManager;
					break;
				default:
					ret = DefaultViewManager;
					break;
			}
		} else if (typeof manager === "function") {
			// otherwise, assume we were passed a class function
			ret = manager;
		}

		return ret;
	}

	/**
	 * Start the rendering
	 * @private
	 */
	start() {

		const props = this.determineLayoutProperties();
		/**
		 * @member {Layout} layout
		 * @memberof Rendition
		 * @readonly
		 */
		this.layout = new Layout(props);
		this.layout.on(EVENTS.LAYOUT.UPDATED, (props, changed) => {
			/**
			 * Emit of updated the Layout state
			 * @event layout
			 * @param {Layout} props
			 * @param {object} changed
			 * @memberof Rendition
			 */
			this.emit(EVENTS.RENDITION.LAYOUT, props, changed);
		});
		/**
		 * @member {Viewport} viewport
		 * @memberof Rendition
		 * @readonly
		 */
		this.viewport = new Viewport(this.layout);
		this.viewport.on(EVENTS.VIEWPORT.RESIZED, (rect) => {

			if (this.layout.flow === "paginated") {
				this.layout.set({
					width: rect.width,
					height: rect.height
				});
			} else if (this.layout.axis === "horizontal") {
				this.layout.set({
					height: rect.height
				});
			} else if (this.layout.axis === "vertical") {
				this.layout.set({
					width: rect.width,
				});
			}
			if (!this.location) return;
			/**
			 * Emit that the rendition has been resized
			 * @event resized
			 * @param {object} rect
			 * @memberof Rendition
			 */
			this.emit(EVENTS.RENDITION.RESIZED, rect);
		});
		this.viewport.on(EVENTS.VIEWPORT.ORIENTATION_CHANGE, (target) => {
			/**
			 * @event orientationchange
			 * @param {object} target
			 * @memberof Rendition
			 */
			this.emit(EVENTS.RENDITION.ORIENTATION_CHANGE, target);
		});

		if (!this.manager) {
			const manager = this.requireManager(this.settings.manager);
			const options = {
				snap: this.settings.snap,
				view: this.settings.view,
				method: this.settings.method,
				sandbox: this.settings.sandbox,
				ignoreClass: this.settings.ignoreClass
			};
			this.manager = new manager(this.book, options);
		}

		this.manager.on(EVENTS.MANAGERS.ADDED, this.afterDisplayed.bind(this));
		this.manager.on(EVENTS.MANAGERS.REMOVED, this.afterRemoved.bind(this));
		this.manager.on(EVENTS.MANAGERS.RESIZED, this.onResized.bind(this));
		this.manager.on(EVENTS.MANAGERS.RELOCATED, this.relocated.bind(this));
		/**
		 * Emit that rendering has started
		 * @event started
		 * @memberof Rendition
		 */
		this.emit(EVENTS.RENDITION.STARTED);
		navigator.epubReadingSystem = {
			name: "epub-js",
			version: EPUBJS_VERSION,
			layoutStyle: this.layout.style,
			hasFeature: (name) => {
				switch (name) {
					case "dom-manipulation":
						return true;
					case "layout-changes":
						return true;
					case "touch-events":
						return true;
					case "mouse-events":
						return true;
					case "keyboard-events":
						return true;
					case "spine-scripting":
						return false;
					default:
						return false;
				}
			}
		};
		this.starting.resolve();
	}

	/**
	 * Attach to viewport container
	 * @param {Element|string} element viewport element
	 * @return {Promise<any>}
	 * @description
	 * Call to attach the container to an element in the dom.
	 * Container must be attached before rendering can begin.
	 */
	attachTo(element) {

		return this.q.enqueue(() => {
			// Start rendering
			this.manager.render(element, {
				width: this.settings.width,
				height: this.settings.height
			});
			/**
			 * Emit that rendering has attached to an element
			 * @event attached
			 * @memberof Rendition
			 */
			this.emit(EVENTS.RENDITION.ATTACHED);
		});
	}

	/**
	 * Display a point in the book
	 * @param {string|number} [target] `Section.index` OR `Section.idref` OR `Section.href` OR EpubCFI
	 * @example rendition.display()
	 * @example rendition.display(3)
	 * @example rendition.display("#chapter_001")
	 * @example rendition.display("chapter_001.xhtml")
	 * @example rendition.display("epubcfi(/6/8!/4/2/16/1:0)")
	 * @return {Promise<Section>}
	 * @description
	 * The request will be added to the rendering Queue, so it will wait until 
	 * book is opened, rendering started and all other rendering tasks have 
	 * finished to be called.
	 */
	display(target) {

		return this.q.enqueue(this._display.bind(this), target);
	}

	/**
	 * Tells the manager what to display immediately
	 * @param {string|number} [target]
	 * @return {Promise<Section>}
	 * @private
	 */
	_display(target) {

		const displaying = new Defer();

		// Check if this is a book percentage
		if (this.book.locations.size && isFloat(target)) {
			target = this.book.locations.cfiFromPercentage(parseFloat(target));
		}

		const section = this.book.sections.get(target);

		if (!section) {
			displaying.reject(new Error("No Section Found"));
			return displaying.promise;
		}

		this.manager.display(section, target).then(() => {

			displaying.resolve(section);
			/**
			 * Emit that a section has been displayed
			 * @event displayed
			 * @param {Section} section
			 * @memberof Rendition
			 */
			this.emit(EVENTS.RENDITION.DISPLAYED, section);
		}, (err) => {
			/**
			 * Emit that has been an error displaying
			 * @event displayError
			 * @param {Error} err
			 * @memberof Rendition
			 */
			this.emit(EVENTS.RENDITION.DISPLAY_ERROR, err);
		}).then(() => {
			this.viewport.update();
		});

		return displaying.promise;
	}

	/**
	 * Report what section has been displayed
	 * @param {object} view
	 * @private
	 */
	afterDisplayed(view) {

		view.on(EVENTS.VIEWS.MARK_CLICKED, (cfiRange, data) => {
			this.triggerMarkEvent(cfiRange, data, view.contents)
		});

		this.hooks.render.trigger(view, this).then(() => {
			if (view.contents) {
				this.hooks.content.trigger(view.contents, this).then(() => {
					/**
					 * Emit that a section has been rendered
					 * @event rendered
					 * @param {View} view
					 * @memberof Rendition
					 */
					this.emit(EVENTS.RENDITION.RENDERED, view);
				});
			} else {
				this.emit(EVENTS.RENDITION.RENDERED, view);
			}
		});
	}

	/**
	 * Report what has been removed
	 * @param {object} view
	 * @private
	 */
	afterRemoved(view) {

		this.hooks.unloaded.trigger(view, this).then(() => {
			/**
			 * Emit that a section has been removed
			 * @event removed
			 * @param {View} view
			 * @memberof Rendition
			 */
			this.emit(EVENTS.RENDITION.REMOVED, view);
		})
	}

	/**
	 * Report resize events and display the last seen location
	 * @param {object} view 
	 * @private
	 */
	onResized(view) {

		return this.adjustImages(view.contents);
	}

	/**
	 * Move the Rendition to a specific offset
	 * Usually you would be better off calling display()
	 * @param {object} offset
	 */
	moveTo(offset) {

		this.manager.moveTo(offset);
	}

	/**
	 * Resize viewport container
	 * @param {number|string} [width]
	 * @param {number|string} [height]
	 * @returns {{ width: number, height: number }}
	 * @example rendition.resize(800, 600)
	 * @example rendition.resize("90%", 600)
	 */
	resize(width, height) {

		return this.viewport.size(width, height);
	}

	/**
	 * Clear all rendered views
	 */
	clear() {

		this.manager.clear();
	}

	/**
	 * Go to the next "page" in the rendition
	 * @return {Promise<any>}
	 */
	next() {

		return this.q.enqueue(this.manager.next.bind(this.manager));
	}

	/**
	 * Go to the previous "page" in the rendition
	 * @return {Promise<any>}
	 */
	prev() {

		return this.q.enqueue(this.manager.prev.bind(this.manager));
	}

	/**
	 * Determine the Layout properties from metadata and settings
	 * @link http://www.idpf.org/epub/301/spec/epub-publications.html#meta-properties-rendering
	 * @return {object} Layout properties
	 * @private
	 */
	determineLayoutProperties() {

		const { metadata, direction } = this.book.packaging;
		return {
			name: this.settings.layout || metadata.get("layout"),
			flow: this.settings.flow || metadata.get("flow"),
			spread: this.settings.spread || metadata.get("spread"),
			viewport: metadata.get("viewport"),
			direction: this.settings.direction || direction || "ltr",
			orientation: this.settings.orientation || metadata.get("orientation"),
			minSpreadWidth: this.settings.minSpreadWidth,
			pageWidth: this.settings.pageWidth,
			pageHeight: this.settings.pageHeight
		}
	}

	/**
	 * Layout configuration
	 * @param {object} options
	 */
	updateLayout(options) {

		this.layout.set(options);
	}

	/**
	 * Get the Current Location object
	 * @return {displayedLocation|Promise} location (may be a promise)
	 */
	currentLocation() {

		const location = this.manager.currentLocation(); // [{}]
		if (location && location.then && typeof location.then === "function") {
			location.then((result) => {
				return this.located(result);
			});
		} else if (location) {
			return this.located(location);
		}
	}

	/**
	 * Creates a Rendition#locationRange from location passed by the Manager
	 * @param {object[]} target Location sections
	 * @returns {object}
	 * @private
	 */
	located(target) {

		if (target.length === 0) return {};

		const start = target[0];
		const end = target[target.length - 1];
		const loc = {
			atStart: false,
			atEnd: false,
			start: {
				cfi: start.mapping.start,
				href: start.href,
				index: start.index,
				displayed: {
					page: start.pages[0],
					total: start.total
				}
			},
			end: {
				cfi: end.mapping.end,
				href: end.href,
				index: end.index,
				displayed: {
					page: end.pages[end.pages.length - 1],
					total: end.total
				}
			}
		};

		const locations = this.book.locations;
		if (locations.size) {
			const locStart = locations.locationFromCfi(start.mapping.start);
			const locEnd = locations.locationFromCfi(end.mapping.end);

			if (locStart !== -1) {
				loc.start.location = locStart;
				loc.start.percentage = locations.percentageFromLocation(locStart);
			}
			if (locEnd !== -1) {
				loc.end.location = locEnd;
				loc.end.percentage = locations.percentageFromLocation(locEnd);
			}
		}

		const pageList = this.book.navigation.pageList;
		if (pageList.length) {
			const pageStart = pageList.pageFromCfi(start.mapping.start);
			const pageEnd = pageList.pageFromCfi(end.mapping.end);

			if (pageStart !== -1) {
				loc.start.page = pageStart;
			}
			if (pageEnd !== -1) {
				loc.end.page = pageEnd;
			}
		}

		const startPage = loc.start.displayed.page;
		if (this.book.sections.first().index === start.index &&
			startPage.index === 0) {
			loc.atStart = true;
		}

		const endPage = loc.end.displayed.page;
		if (this.book.sections.last().index === end.index &&
			endPage.index === loc.end.displayed.total - 1) {
			loc.atEnd = true;
		}

		return loc;
	}

	/**
	 * relocated event handler
	 * @fires relocated
	 * @param {object[]} loc 
	 * @private
	 */
	relocated(loc) {

		const located = this.located(loc);
		if (!located && (!located.start || !located.end)) {
			return;
		}
		this.location = located;
		/**
		 * @event relocated
		 * @param {object} location
		 * @memberof Rendition
		 */
		this.emit(EVENTS.RENDITION.RELOCATED, this.location);
	}

	/**
	 * Pass the events from a view's Contents
	 * @param {Contents} view contents
	 * @private
	 */
	passEvents(contents) {

		DOM_EVENTS.forEach((e) => {
			contents.on(e, (ev) => this.triggerViewEvent(ev, contents));
		});

		contents.on(EVENTS.CONTENTS.SELECTED, (e) => this.triggerSelectedEvent(e, contents));
	}

	/**
	 * Emit events passed by a view
	 * @param {event} e
	 * @private
	 */
	triggerViewEvent(e, contents) {

		this.emit(e.type, e, contents);
	}

	/**
	 * Emit a selection event's CFI Range passed from a a view
	 * @param {string} cfirange
	 * @private
	 */
	triggerSelectedEvent(cfirange, contents) {
		/**
		 * Emit that a text selection has occurred
		 * @event selected
		 * @param {string} cfirange
		 * @param {Contents} contents
		 * @memberof Rendition
		 */
		this.emit(EVENTS.RENDITION.SELECTED, cfirange, contents);
	}

	/**
	 * Emit a markClicked event with the cfiRange and data from a mark
	 * @param {EpubCFI} cfirange
	 * @param {object} data 
	 * @param {Contents} contents 
	 * @private
	 */
	triggerMarkEvent(cfiRange, data, contents) {
		/**
		 * Emit that a mark was clicked
		 * @event markClicked
		 * @param {EpubCFI} cfiRange
		 * @param {object} data
		 * @param {Contents} contents
		 * @memberof Rendition
		 */
		this.emit(EVENTS.RENDITION.MARK_CLICKED, cfiRange, data, contents);
	}

	/**
	 * Get a Range from a Visible CFI
	 * @param {string} epubcfi EpubCfi string
	 * @param {string} ignoreClass
	 * @return {Range}
	 */
	getRange(epubcfi, ignoreClass) {

		const cfi = new EpubCFI(epubcfi);
		const found = this.manager.visible().filter((view) => {
			if (cfi.spinePos === view.section.index) return true;
		});

		// Should only every return 1 item
		if (found.length) {
			return found[0].contents.range(cfi, ignoreClass);
		}
	}

	/**
	 * Hook to adjust images to fit in columns
	 * @param {Contents} contents
	 * @returns {Promise<Node|null>}
	 * @private
	 */
	adjustImages(contents) {

		const content = contents ? contents.content : null;
		if (!content) {
			return Promise.resolve(null);
		}
		const padding = {
			top: parseFloat(content.style["padding-top"]),
			bottom: parseFloat(content.style["padding-bottom"]),
			left: parseFloat(content.style["padding-left"]),
			right: parseFloat(content.style["padding-right"])
		};
		const paddingX = padding.left + padding.right;
		const paddingY = padding.top + padding.bottom;
		const width = (this.layout.columnWidth ? (this.layout.columnWidth - paddingX) + "px" : "100%") + " !important";
		const height = (content.offsetHeight - paddingY) + "px !important";

		return contents.appendStylesheet("images", {
			"img": {
				"max-width": width,
				"max-height": height,
				"object-fit": "contain",
				"page-break-inside": "avoid",
				"break-inside": "avoid",
				"box-sizing": "border-box"
			},
			"svg": {
				"max-width": width,
				"max-height": height,
				"page-break-inside": "avoid",
				"break-inside": "avoid"
			}
		});
	}

	/**
	 * Get the Contents object of each rendered view
	 * @returns {Array<Contents>}
	 */
	getContents() {

		return this.manager ? this.manager.getContents() : [];
	}

	/**
	 * Get the views member from the manager
	 * @returns {Views}
	 */
	views() {

		const views = this.manager ? this.manager.views : undefined;
		return views || [];
	}

	/**
	 * Hook to handle link clicks in rendered content
	 * @param {Contents} contents
	 * @private
	 */
	handleLinks(contents) {

		if (contents) {
			contents.on(EVENTS.CONTENTS.LINK_CLICKED, (href) => {
				this.display(href);
			});
		}
	}

	/**
	 * Hook to handle injecting stylesheet before
	 * a Section is serialized
	 * @param {Document} doc
	 * @param {Section} section
	 * @private
	 */
	injectStylesheet(doc, section) {

		const style = doc.createElement("link");
		style.setAttribute("type", "text/css");
		style.setAttribute("rel", "stylesheet");
		style.setAttribute("href", this.settings.stylesheet);
		doc.getElementsByTagName("head")[0].appendChild(style);
	}

	/**
	 * Hook to handle injecting scripts before
	 * a Section is serialized
	 * @param {Document} doc
	 * @param {Section} section
	 * @private
	 */
	injectScript(doc, section) {

		const script = doc.createElement("script");
		script.setAttribute("type", "text/javascript");
		script.setAttribute("src", this.settings.script);
		script.textContent = " "; // Needed to prevent self closing tag
		doc.getElementsByTagName("head")[0].appendChild(script);
	}

	/**
	 * Hook to handle the document identifier before a Section is serialized
	 * @param {Document} doc
	 * @param {Section} section 
	 * @private
	 */
	injectIdentifier(doc, section) {

		const ident = this.book.packaging.metadata.get("identifier");
		const meta = doc.createElement("meta");
		meta.setAttribute("name", "dc.relation.ispartof");
		if (ident) meta.setAttribute("content", ident);
		doc.getElementsByTagName("head")[0].appendChild(meta);
	}

	/**
	 * Remove and Clean Up the Rendition
	 */
	destroy() {

		this.q.destroy();
		this.layout.destroy();
		this.themes.destroy();
		this.viewport.destroy();
		this.manager.destroy();
		this.hooks.display.clear();
		this.hooks.content.clear();
		this.hooks.layout.clear();
		this.hooks.render.clear();
		this.hooks.show.clear();
		this.hooks.unloaded.clear();
		this.hooks = undefined;
		this.layout = undefined;
		this.themes = undefined;
		this.manager = undefined;
		this.epubcfi = undefined;
		this.started = undefined;
		this.starting = undefined;
		this.viewport = undefined;
		this.q = undefined;
	}
}

EventEmitter(Rendition.prototype);

export default Rendition;