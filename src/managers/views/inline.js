import Contents from "../../contents";
import Defer from "../../utils/defer";
import {
	extend, 
	qs, 
	parse
} from "../../utils/core";
import View from "./view";

/**
 * InlineView class
 * @extends {View}
 */
class InlineView extends View {
	/**
	 * Constructor
	 * @param {Layout} layout 
	 * @param {Section} section 
	 * @param {object} [options]
	 * @param {string} [options.ignoreClass='']
	 * @param {number} [options.width]
	 * @param {number} [options.height]
	 */
	constructor(layout, section, options) {

		super(layout, section);

		this.settings = extend({
			width: 0,
			height: 0,
			ignoreClass: ""
		}, options || {});
	}

	/**
	 * Create div element
	 * @returns {Element} div
	 * @override
	 */
	create() {

		this.frame = document.createElement("div");
		this.frame.id = this.id;
		this.frame.style.overflow = "hidden";
		this.frame.style.border = "none";
		this.frame.style.wordSpacing = "initial";
		this.frame.style.lineHeight = "initial";
		this.width = 0;
		this.height = 0;
		return this.frame;
	}

	/**
	 * Load view
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

		const doc = parse(contents, "text/html");
		const body = qs(doc, "body");

		this.container.appendChild(this.frame);
		this.document = this.frame.ownerDocument;

		if (!this.document) {
			loading.reject(new Error("No Document Available"));
			return loading.promise;
		}

		this.contents = new Contents(this.document, this.frame);
		this.frame.innerHTML = body.innerHTML;

		loading.resolve(this.contents);
		return loading.promise;
	}
}

export default InlineView;