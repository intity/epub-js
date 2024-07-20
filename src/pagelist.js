import EpubCFI from "./epubcfi";
import {
	qs,
	qsa,
	querySelectorByType,
	indexOfSorted,
	locationOf
} from "./utils/core";

/**
 * Page List Parser
 * @link https://www.w3.org/TR/epub/#sec-nav-pagelist
 * @extends {Array}
 */
class PageList extends Array {
	/**
	 * Constructor
	 * @param {Document} [xml] 
	 */
	constructor(xml) {

		super();
		this.epubcfi = new EpubCFI();
		/**
		 * Page indexes
		 * @member {number[]} pages
		 * @memberof PageList
		 * @readonly
		 */
		this.pages = [];
		/**
		 * @member {string[]} locations
		 * @memberof PageList
		 * @readonly
		 */
		this.locations = [];
		/**
		 * @member {number} firstPage
		 * @memberof PageList
		 * @readonly
		 */
		this.firstPage = 0;
		/**
		 * @member {number} lastPage
		 * @memberof PageList
		 * @readonly
		 */
		this.lastPage = 0;
		/**
		 * @member {number} totalPages
		 * @memberof PageList
		 * @readonly
		 */
		this.totalPages = 0;

		if (xml) {
			this.parse(xml);
		}

		if (this.length) {
			this.process();
		}
	}

	/**
	 * Parse PageList
	 * @param {Document|object} target
	 * @returns {PageList}
	 */
	parse(target) {

		this.clear();
		
		const isXml = target.nodeType;
		
		let html;
		let ncx;

		if (isXml) {
			html = qs(target, "html");
			ncx = qs(target, "ncx");
		}

		if (!isXml) {
			this.load(target["page-list"]);
		} else if (html) {
			this.parseNav(target);
		} else if (ncx) {
			this.parseNcx(target);
		}

		return this;
	}

	/**
	 * Parse a Nav PageList
	 * @param {Node} node
	 * @return {PageList}
	 * @private
	 */
	parseNav(node) {

		const navElement = querySelectorByType(node, "nav", "page-list");
		const navItems = navElement ? qsa(navElement, "li") : [];
		const length = navItems.length;

		if (!navItems || length === 0) return this;

		for (let i = 0; i < length; ++i) {
			const item = this.navItem(navItems[i]);
			this.push(item);
		}

		return this;
	}

	/**
	 * Create navItem
	 * @param {Node} node
	 * @return {object} PageList item
	 * @private
	 */
	navItem(node) {

		const content = qs(node, "a");
		const href = content.getAttribute("href") || "";
		const text = content.textContent || "";
		const page = parseInt(text);

		if (href.indexOf("epubcfi") !== -1) {
			const split = href.split("#");
			return {
				cfi: split.length > 1 ? split[1] : null,
				packageUrl: split[0],
				href,
				page
			};
		} else {
			return {
				href,
				page
			};
		}
	}

	/**
	 * parseNcx
	 * @param {Node} node 
	 * @returns {PageList}
	 * @private
	 */
	parseNcx(node) {

		const pageList = qs(node, "pageList");

		if (!pageList) return this;

		const pageTargets = qsa(pageList, "pageTarget");
		const length = pageTargets.length;

		if (!pageTargets || pageTargets.length === 0) {
			return this;
		}

		for (let i = 0; i < length; ++i) {
			const item = this.ncxItem(pageTargets[i]);
			this.push(item);
		}

		return this;
	}

	/**
	 * Create ncxItem
	 * @param {Node} node 
	 * @returns {object}
	 * @private
	 */
	ncxItem(node) {

		const navLabel = qs(node, "navLabel");
		const navLabelText = qs(navLabel, "text");
		const pageText = navLabelText.textContent;
		const content = qs(node, "content");

		return {
			href: content.getAttribute("src"),
			page: parseInt(pageText, 10)
		};
	}

	/**
	 * Process pageList items
	 * @private
	 */
	process() {

		this.forEach((item) => {
			this.pages.push(item.page);
			if (item.cfi) {
				this.locations.push(item.cfi);
			}
		}, this);
		this.firstPage = parseInt(this.pages[0]);
		this.lastPage = parseInt(this.pages[this.pages.length - 1]);
		this.totalPages = this.lastPage - this.firstPage;
	}

	/**
	 * Get a page index from a EpubCFI
	 * @param {string} cfi EpubCFI
	 * @return {number} Page index
	 */
	pageFromCfi(cfi) {
		// Check if the pageList has not been set yet
		if (this.locations.length === 0) {
			return -1;
		}
		// TODO: check if CFI is valid?

		// check if the cfi is in the location list
		let pg, index = indexOfSorted(cfi,
			this.locations,
			this.epubcfi.compare
		);
		if (index != -1) {
			pg = this.pages[index];
		} else {
			// Otherwise add it to the list of locations
			// Insert it in the correct position in the locations page
			index = locationOf(cfi, this.locations, this.epubcfi.compare);
			// Get the page at the location just before the new one, or return the first
			pg = (index - 1 >= 0) ? this.pages[index - 1] : this.pages[0];
			if (pg !== undefined) {
				// Add the new page in so that the locations and page array match up
				//this.pages.splice(index, 0, pg);
			} else {
				pg = -1;
			}
		}
		return pg;
	}

	/**
	 * Get a EpubCFI by Page index
	 * @param {string|number} pg Page index
	 * @return {string|null} cfi
	 */
	cfiFromPage(pg) {
		// check that pg is an int
		if (typeof pg !== "number") {
			pg = parseInt(pg);
		}

		// check if the cfi is in the page list
		// Pages could be unsorted.
		const index = this.pages.indexOf(pg);
		let cfi = null;
		if (index !== -1) {
			cfi = this.locations[index];
		}
		// TODO: handle pages not in the list
		return cfi;
	}

	/**
	 * Get a Page index from Book percentage
	 * @param {number} value Percentage
	 * @return {number} Page index
	 */
	pageFromPercentage(value) {

		return Math.round(this.totalPages * value);
	}

	/**
	 * Returns a value between 0 - 1 corresponding to the location of a page
	 * @param {number} pg the page
	 * @return {number} Percentage
	 */
	percentageFromPage(pg) {

		const percentage = (pg - this.firstPage) / this.totalPages;
		return Math.round(percentage * 1000) / 1000;
	}

	/**
	 * Returns a value between 0 - 1 corresponding to the location of a cfi
	 * @param {string} cfi EpubCFI
	 * @return {number} Percentage
	 */
	percentageFromCfi(cfi) {

		const pg = this.pageFromCfi(cfi);
		const percentage = this.percentageFromPage(pg);
		return percentage;
	}

	/**
	 * Load PageList from JSON
	 * @param {object[]} data Serialized JSON data items
	 * @private
	 */
	load(data) {

		if (!data) return;
		data.forEach((item) => {
			this.push(item);
		});
	}

	/**
	 * Clear PageList
	 */
	clear() {

		if (this.length) {
			this.splice(0);
			this.pages.splice(0);
			this.locations.splice(0);
			this.firstPage = 0;
			this.lastPage = 0;
			this.totalPages = 0;
		}
	}

	/**
	 * Destroy
	 */
	destroy() {

		this.clear();
		this.pages = undefined;
		this.locations = undefined;
		this.firstPage = undefined;
		this.lastPage = undefined;
		this.totalPages = undefined;
		this.epubcfi = undefined;
	}
}

export default PageList;