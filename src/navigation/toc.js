import {
    qs,
    filterChildren,
    querySelectorByType
} from "../utils/core";

/**
 * Table Of Contents Parser
 * @link https://www.w3.org/TR/epub/#sec-nav-toc
 */
class Toc extends Array {
    /**
     * Constructor
     * @param {Document|object} target 
     */
    constructor(target) {

        super();
        /**
         * @member {Map} links
         * @memberof Toc
         * @readonly
         */
        this.links = new Map();
        if (target) {
            this.parse(target);
        }
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
     * @param {Document|object} target 
     * @returns {Toc}
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
            this.load(target.toc);
        } else if (html) {
            const nav = querySelectorByType(target, "nav", "toc");
            this.parseNav(nav);
        } else if (ncx) {
            const nav = qs(target, "navMap");
            this.parseNcx(nav);
        }

        return this;
    }

    /**
     * Parse toc from a Epub >= 3.0 Nav
     * @param {Node} nav
     * @param {object[]} [toc=null]
     * @private
     */
    parseNav(nav, toc = null) {

        if (!nav) return;

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
     * @param {Node} nav
     * @param {object[]} [toc=null]
     * @private
     */
    parseNcx(nav, toc = null) {

        if (!nav) return;
        if (!nav.children) return;

        const len = nav.children.length;
        const items = toc || this;

        for (let i = 0; i < len; ++i) {
            const child = nav.children[i];
            if (child.nodeName !== "navPoint")
                continue;
            const item = this.ncxItem(child, nav);
            items.push(item);
            this.parseNcx(child, item.subitems); // recursive call
        }
    }

    /**
     * Create a ncxItem
     * @param {Node} item
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
     * @param {object[]} data Serialized JSON data items
     * @param {object[]} [toc=null] 
     * @private
     */
    load(data, toc = null) {

        if (!data) return;

        const items = toc || this;

        data.forEach((item) => {
            items.push(item);
            this.links.set(item.href, item);
            this.load(
                item.subitems,
                items[items.length - 1].subitems
            ); // recursive call
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