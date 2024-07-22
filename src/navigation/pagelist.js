import EpubCFI from "../epubcfi";
import {
	qs,
	qsa,
	indexOfSorted,
	locationOf
} from "../utils/core";

/**
 * Page List Parser
 * @link https://www.w3.org/TR/epub/#sec-nav-pagelist
 * @extends {Array}
 */
class PageList extends Array {
	/**
	 * Constructor
	 */
	constructor() {

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
	}

	/**
	 * Parse Page List
	 * @param {Node|object[]} target
	 * @returns {Promise<PageList>}
	 */
	parse(target) {

		if (Array.isArray(target)) {
			this.load(target);
		} else if (target.nodeName === "nav") {
			this.parseNav(target);
		} else if (target.nodeName === "pageList") {
			this.parseNcx(target);
		}

		if (this.length) {
			this.process();
		}

		return new Promise((resolve, reject) => {
            resolve(this);
        });
	}

	/**
	 * Parse page-list from a Epub >= 3.0 Nav
	 * @param {Node} node nav
	 * @private
	 */
	parseNav(node) {

		const navItems = node ? qsa(node, "li") : [];

		navItems.forEach((item) => {
			this.push(this.navItem(item));
		});
	}

	/**
	 * Create navItem
	 * @param {Node} node li
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
	 * @param {Node} node pageList
	 * @private
	 */
	parseNcx(node) {

		const pageTargets = qsa(node, "pageTarget") || [];

		pageTargets.forEach((item) => {
			this.push(this.ncxItem(item));
		});
	}

	/**
	 * Create ncxItem
	 * @param {Node} node pageTarget
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
	 * @param {object[]} items Serialized JSON data items
	 * @private
	 */
	load(items) {

		items.forEach((item) => {
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