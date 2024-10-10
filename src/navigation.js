import Landmarks from "./navigation/landmarks";
import PageList from "./navigation/pagelist";
import Toc from "./navigation/toc";
import { qsa } from "./utils/core";

/**
 * Navigation Parser
 * @link https://www.w3.org/TR/epub/#sec-nav
 */
class Navigation {
	/**
	 * Constructor
	 */
	constructor() {
		/**
		 * Landmarks
		 * @member {Landmarks} landmarks
		 * @memberof Navigation
		 * @readonly
		 */
		this.landmarks = new Landmarks();
		/**
		 * List of numbered pages
		 * @member {PageList} pageList
		 * @memberof Navigation
		 * @readonly
		 */
		this.pageList = new PageList();
		/**
		 * Table of Contents
		 * @member {Toc} toc
		 * @memberof Navigation
		 * @readonly
		 */
		this.toc = new Toc();
	}

	/**
	 * Clear all navigation parts
	 */
	clear() {

		this.landmarks.clear();
		this.pageList.clear();
		this.toc.clear();
	}

	/**
	 * Parse navigation document
	 * @param {Document} doc html OR xhtml OR ncx
	 * @returns {Promise<Navigation>}
	 */
	async parse(doc) {

		const tasks = [];
		const element = doc.documentElement;

		if (element.tagName === "html") {
			const items = qsa(doc, "nav")
			items.forEach((nav) => {
				const type = nav.getAttribute("epub:type");
				switch (type) {
					case "landmarks":
						tasks.push(this.landmarks.parse(nav));
						break;
					case "page-list":
						tasks.push(this.pageList.parse(nav));
						break;
					case "toc":
						tasks.push(this.toc.parse(nav));
						break;
				}
			});
		} else if (element.tagName === "ncx") {
			const items = [...element.children];
			items.forEach((item) => {
				switch (item.tagName) {
					case "navMap":
						tasks.push(this.toc.parse(item));
						break;
					case "pageList":
						tasks.push(this.pageList.parse(item));
						break;
				}
			});
		}

		return Promise.all(tasks).then(() => {
			return this;
		});
	}

	/**
	 * Load navigation object from JSON
	 * @param {object} data 
	 * @returns {Promise<Navigation>}
	 */
	async load(data) {

		const tasks = [];
		tasks.push(this.landmarks.parse(data["landmarks"] || []));
		tasks.push(this.pageList.parse(data["page-list"] || []));
		tasks.push(this.toc.parse(data["toc"] || []));
		return Promise.all(tasks).then(() => {
			return this;
		});
	}

	/**
	 * forEach pass through
	 * @param {IArguments} args
	 */
	forEach(...args) {

		this.toc.forEach(...args);
	}

	/**
	 * destroy
	 */
	destroy() {

		this.clear();
		this.landmarks.destroy();
		this.landmarks = undefined;
		this.pageList.destroy();
		this.pageList = undefined;
		this.toc.destroy();
		this.toc = undefined;
	}
}

export default Navigation;