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

        const arr = target.split("/");
        const key = arr.length ? arr[arr.length - 1] : target;

        return this.links.get(target) || this.links.get(key);
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

        return new Promise((resolve) => {
            resolve(this);
        });
    }

    /**
     * Parse toc from a Epub >= 3.0 Nav
     * @param {Node} nav
     * @param {object[]} [toc=null]
     * @param {string} [parentId=null] 
     * @private
     */
    parseNav(nav, toc = null, parentId = null) {

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
                item.parentId = parentId;
                items.push(item);
                this.parseNav(child, item.subitems, item.id); // recursive call
            }
        }
    }

    /**
     * Create a navItem
     * @param {Node} node
     * @return {object|null} navItem
     * @private
     */
    navItem(node) {

        const link = qs(node, "a") || qs(node, "span");

        if (!link) return null;

        const href = link.getAttribute("href");
        const harr = href.split("#");
        const hash = harr.length === 2 ? harr[1] : "";
        const id = node.getAttribute("id") || hash || href;
        const label = link.textContent || "";
        const entry = {
            id,
            href,
            bind: harr[0],
            label,
            parentId: null,
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
     * @param {string} [parentId=null] 
     * @private
     */
    parseNcx(node, toc = null, parentId = null) {

        if (!node.children) return;

        const len = node.children.length;
        const items = toc || this;

        for (let i = 0; i < len; ++i) {
            const child = node.children[i];
            if (child.nodeName !== "navPoint")
                continue;
            const item = this.ncxItem(child);
            item.parentId = parentId;
            items.push(item);
            this.parseNcx(child, item.subitems, item.id); // recursive call
        }
    }

    /**
     * Create a ncxItem
     * @param {Node} node navPoint
     * @return {object} ncxItem
     * @private
     */
    ncxItem(node) {

        const content = qs(node, "content");
        const navLabel = qs(node, "navLabel");
        const href = content.getAttribute("src");
        const harr = href.split("#");
        const hash = harr.length === 2 ? harr[1] : "";
        const id = node.getAttribute("id") || hash || href;
        const label = navLabel.textContent || "";
        const entry = {
            id,
            href,
            bind: harr[0],
            label,
            parentId: null,
            subitems: []
        };
        this.links.set(href, entry);
        return entry;
    }

    /**
     * Load navigation items from JSON
     * @param {object[]} items Serialized JSON items
     * @param {number} [level=0] 
     * @param {string} [parentId=null] 
     * @private
     */
    load(items, level = 0, parentId = null) {

        level += 1;
        items.forEach((item) => {
            const href = item.href;
            const harr = href.split("#");
            const hash = harr.length === 2 ? harr[1] : "";
            item.id = item.id || hash || href;
            item.bind = harr[0];
            item.parentId = parentId;
            if (level === 1) {
                this.push(item);
            }
            this.links.set(href, item);
            this.load(item.subitems, level, item.id); // recursive call
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