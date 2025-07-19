import Contents from "../../contents";
import Defer from "../../utils/defer";
import { EVENTS } from "../../utils/constants";
import {
	extend,
	createBlobUrl,
	revokeBlobUrl
} from "../../utils/core";
import View from "./view";

/**
 * IframeView class
 * @extends {View}
 */
class IframeView extends View {
	/**
	 * Constructor
	 * @param {Layout} layout ref
	 * @param {Section} section ref
	 * @param {object} [options]
	 * @param {string} [options.ignoreClass='']
	 * @param {string} [options.method='write'] values: `"blobUrl"` OR `"srcdoc"` OR `"write"`
	 * @param {string[]} [options.sandbox=[]] iframe sandbox policy list
	 */
	constructor(layout, section, options) {

		super(layout, section);

		this.settings = extend({
			method: null,
			sandbox: [],
			forceEvenPages: false,
			ignoreClass: ""
		}, options || {});
		this.blobUrl = null;
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
	 * Create iframe element
	 * @returns {Element} iframe
	 * @override
	 */
	create() {

		this.frame = document.createElement("iframe");
		this.frame.id = this.id;
		this.frame.seamless = "seamless";
		this.frame.style.overflow = "hidden";
		this.frame.style.border = "none";
		this.frame.style.width = "0";
		this.frame.style.height = "0";
		this.settings.sandbox.forEach(p => p && (this.frame.sandbox.add(p)));
		this.frame.setAttribute("enable-annotation", "true");
		this.width = 0;
		this.height = 0;
		return this.frame;
	}

	/**
	 * Update writing mode
	 * @param {string} value 
	 * @override
	 */
	mode(value) {

		const mode = value || this.contents.mode;

		if (this.writingMode !== mode) {
			this.writingMode = mode;
			this.emit(EVENTS.VIEWS.WRITING_MODE, mode);
		}
	}

	/**
	 * Load iframe
	 * @param {string} contents 
	 * @returns {Promise<any>} loading promise
	 * @override
	 */
	load(contents) {

		const loading = new Defer();

		if (!this.frame) {
			loading.reject(new Error("No Iframe Available"));
			return loading.promise;
		}

		this.container.appendChild(this.frame);
		this.document = this.frame.contentDocument;
		this.frame.onload = (e) => this.onLoad(e, loading);

		if (!this.document) {
			loading.reject(new Error("No Document Available"));
			return loading.promise;
		} else if (this.method === "blobUrl") {
			this.blobUrl = createBlobUrl(contents, "application/xhtml+xml");
			this.frame.src = this.blobUrl;
		} else if (this.method === "srcdoc") {
			this.frame.srcdoc = contents;
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
	 * Show container
	 * @override
	 */
	show() {

		if (this.frame) {
			// Remind Safari to redraw the iframe
			this.frame.style.transform = "translateZ(0)";
			this.frame.style.transform = null;
		}
		super.show();
	}

	/**
	 * Destroy the IframeView object
	 * @override
	 */
	destroy() {

		if (this.blobUrl) {
			revokeBlobUrl(this.blobUrl);
			this.blobUrl = undefined;
		}

		if (this.displayed) {
			super.destroy();
			this.method = undefined;
			this.writingMode = undefined;
		}
	}
}

export default IframeView;