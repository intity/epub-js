import {
    qsa,
    filterChildren
} from "../utils/core";

/**
 * Landmarks Parser
 * @link https://www.w3.org/TR/epub/#sec-nav-landmarks
 * @extends {Map}
 */
class Landmarks extends Map {
    /**
     * Constructor
     */
    constructor() { super(); }

    /**
     * Parse Landmarks
     * @param {Node|object[]} target nav
     * @returns {Promise<Landmarks>}
     */
    parse(target) {

        if (Array.isArray(target)) {
            this.load(target);
        } else if (target.nodeName === "nav") {
            this.parseNav(target);
        }

        return new Promise((resolve, reject) => {
            resolve(this);
        });
    }

    /**
     * Parse landmarks from a Epub >= 3.0 Nav
     * @param {Node} node nav
     */
    parseNav(node) {

        const navItems = node ? qsa(node, "li") : [];

        navItems.forEach((item) => {
            const entry = this.navItem(item);
            if (entry) {
                this.set(entry.type, entry);
            }
        });
    }

    /**
     * Create a LandmarkItem
     * @param {Node} node li
     * @return {object|null} LandmarkItem
     * @private
     */
    navItem(node) {

        const link = filterChildren(node, "a", true);

        if (!link) return null;

        const type = link.getAttribute("epub:type");
        const href = link.getAttribute("href") || "";

        if (!type) return null;

        return {
            type,
            href,
            label: link.textContent || ""
        };
    }

    /**
     * Load Landmarks from JSON
     * @param {object[]} items Serialized items
     * @private
     */
    load(items) {

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