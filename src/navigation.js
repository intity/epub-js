import Landmarks from "./navigation/landmarks";
import PageList from "./navigation/pagelist";
import Toc from "./navigation/toc";
import { qs, qsa } from "./utils/core";

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
	 * Parse navigation
	 * @param {Document|object} target navigation html OR xhtml OR ncx OR json
	 * @returns {Promise<any>}
	 */
	parse(target) {

		this.landmarks.clear();
		this.pageList.clear();
		this.toc.clear();
		const tasks = [];

		if (target.nodeType === Node.DOCUMENT_NODE) {
			let items, ncx;
			if (target.body && (items = qsa(target, "nav"))) {
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
			} else if ((ncx = qs(target, "ncx"))) {
				for (const ch of ncx.children) {
					switch (ch.nodeName) {
						case "navMap":
							tasks.push(this.toc.parse(ch));
							break;
						case "pageList":
							tasks.push(this.pageList.parse(ch));
							break;
					}
				}
			}
		} else if (typeof target === "object") {
			tasks.push(this.landmarks.parse(target["landmarks"] || []));
			tasks.push(this.pageList.parse(target["page-list"] || []));
			tasks.push(this.toc.parse(target["toc"] || []));
		}

		return Promise.all(tasks);
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

		this.landmarks.destroy();
		this.landmarks = undefined;
		this.pageList.destroy();
		this.pageList = undefined;
		this.toc.destroy();
		this.toc = undefined;
	}
}

export default Navigation;