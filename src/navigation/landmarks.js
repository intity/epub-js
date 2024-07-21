import {
    qs,
    qsa,
    filterChildren,
    querySelectorByType
} from "../utils/core";

/**
 * Landmarks Parser
 * @link https://www.w3.org/TR/epub/#sec-nav-landmarks
 */
class Landmarks extends Map {
    /**
     * Constructor
     * @param {Document|object} target 
     */
    constructor(target) {

        super();
        if (target) {
            this.parse(target);
        }
    }

    /**
     * Parse Landmarks
     * @param {Document|object} target 
     * @returns {Landmarks}
     */
    parse(target) {

        this.clear();

        const isXml = target.nodeType;

        let html;
        if (isXml) {
            html = qs(target, "html");
        }

        if (!isXml){
            this.load(target.landmarks);
        } else if (html) {
            this.parseNav(target);
        }
        
        return this;
    }

    /**
	 * Parse landmarks from a Epub >= 3.0 Nav
	 * @param {Document} navHtml
	 * @private
	 */
	parseNav(navHtml) {

		const navElement = querySelectorByType(navHtml, "nav", "landmarks");
		const navItems = navElement ? qsa(navElement, "li") : [];
		const len = navItems.length;

		if (!navItems || len === 0) return;

		for (let i = 0; i < len; ++i) {
			const item = this.navItem(navItems[i]);
			if (item) {
				this.set(item.type, item);
			}
		}
	}

    /**
	 * Create a landmarkItem
	 * @param {Node} item
	 * @return {object|null} LandmarkItem
	 * @private
	 */
	navItem(item) {

		const link = filterChildren(item, "a", true);

		if (!link) return null;

		const type = link.getAttributeNS("http://www.idpf.org/2007/ops", "type") || undefined;
		const href = link.getAttribute("href") || "";

		return {
			type,
			href,
			label: link.textContent || ""
		};
	}

    /**
     * Load Landmarks from JSON
     * @param {object[]} items Serialized items
     */
    load(items) {

        if (!items) return;
        items.forEach((item) => {
            this.set(item.type, item);
        });
    }

    /**
     * destroy
     */
    destroy() {

        this.clear();
    }
}

export default Landmarks;