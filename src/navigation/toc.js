import {
    qs,
    filterChildren
} from "../utils/core";

/**
 * Table Of Contents Parser
 * @link https://www.w3.org/TR/epub/#sec-nav-toc
 * @extends {Array}
 */
class Toc extends Array {
    /**
     * Constructor
     */
    constructor() {

        super();
        /**
         * @member {Map} links
         * @memberof Toc
         * @readonly
         */
        this.links = new Map();
    }

    /**
     * Get navigation item by href
     * @param {string} target
     * @return {object} navItem
     * @example toc.get("chapter_001.xhtml")
     */
    get(target) {

        return this.links.get(target);
    }

    /**
     * Parse out the toc items
     * @param {Node|object[]} target 
     * @returns {Promise<Toc>}
     */
    parse(target) {

        if (Array.isArray(target)) {
            this.load(target);
        } else if (target.nodeName === "nav") {
            this.parseNav(target);
        } else if (target.nodeName === "navMap") {
            this.parseNcx(target);
        }

        return new Promise((resolve, reject) => {
            resolve(this);
        });
    }

    /**
     * Parse toc from a Epub >= 3.0 Nav
     * @param {Node} nav
     * @param {object[]} [toc=null]
     * @private
     */
    parseNav(nav, toc = null) {

        const navList = filterChildren(nav, "ol", true);

        if (!navList) return;
        if (!navList.children) return;

        const len = navList.children.length;
        const items = toc || this;

        for (let i = 0; i < len; i++) {
            const child = navList.children[i];
            if (child.nodeName !== "li")
                continue;
            const item = this.navItem(child, navList);
            if (item) {
                items.push(item);
                this.parseNav(child, item.subitems); // recursive call
            }
        }
    }

    /**
     * Create a navItem
     * @param {Node} item
     * @param {Node} parent 
     * @return {object|null} navItem
     * @private
     */
    navItem(item, parent) {

        const link = qs(item, "a") || qs(item, "span");

        if (!link) return null;

        const href = link.getAttribute("href");
        const id = item.getAttribute("id") || href;
        const label = link.textContent || "";
        const entry = {
            id,
            href,
            label,
            parent,
            subitems: []
        };
        this.links.set(href, entry);
        return entry;
    }

    /**
     * Parse from a Epub 2 NCX
     * @link https://www.w3.org/TR/epub/#sec-opf2-ncx
     * @param {Node} node navMap
     * @param {object[]} [toc=null]
     * @private
     */
    parseNcx(node, toc = null) {

        if (!node.children) return;

        const len = node.children.length;
        const items = toc || this;

        for (let i = 0; i < len; ++i) {
            const child = node.children[i];
            if (child.nodeName !== "navPoint")
                continue;
            const item = this.ncxItem(child, node);
            items.push(item);
            this.parseNcx(child, item.subitems); // recursive call
        }
    }

    /**
     * Create a ncxItem
     * @param {Node} item navPoint
     * @param {Node} parent 
     * @return {object} ncxItem
     * @private
     */
    ncxItem(item, parent) {

        const content = qs(item, "content");
        const navLabel = qs(item, "navLabel");
        const href = content.getAttribute("src");
        const id = item.getAttribute("id") || href;
        const label = navLabel.textContent || "";
        const entry = {
            id,
            href,
            label,
            parent,
            subitems: []
        };
        this.links.set(href, entry);
        return entry;
    }

    /**
     * Load navigation items from JSON
     * @param {object[]} items Serialized JSON items
     * @private
     */
    load(items, level = 0) {
        
        level += 1;
        items.forEach((item) => {
            if (level === 1) {
                this.push(item);
            }
            this.links.set(item.href, item);
            this.load(item.subitems, level); // recursive call
        });
    }

    /**
     * Clear navigation items
     */
    clear() {

        if (this.length) {
            this.links.clear();
            this.splice(0);
        }
    }

    /**
     * destroy
     */
    destroy() {

        this.clear();
        this.links = undefined;
    }
}

export default Toc;