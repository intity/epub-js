import { qsa, qsp } from "../utils/core";

/**
 * Manifest class
 * @extends {Map}
 */
class Manifest extends Map {

    constructor() {

        super();
        /**
         * @member {string} navPath
         * @memberof Manifest
         * @readonly
         */
        this.navPath = null;
        /**
         * @member {string} coverPath
         * @memberof Manifest
         * @readonly
         */
        this.coverPath = null;
    }

    /**
     * Clear manifest
     */
    clear() {

        super.clear();
        this.navPath = null;
        this.coverPath = null;
    }

    /**
     * Parse the manifest node
     * @param {Node} node manifest
     * @returns {Promise<Manifest>}
     */
    parse(node) {

        //-- Turn items into an array
        const items = qsa(node, "item");
        //-- Create an object with the id as key
        items.forEach((item) => {
            const props = item.getAttribute("properties") || "";
            const entry = {
                id: item.getAttribute("id"),
                href: item.getAttribute("href") || "",
                type: item.getAttribute("media-type") || "",
                overlay: item.getAttribute("media-overlay") || "",
                properties: props.length ? props.split(" ") : []
            };
            this.set(entry.id, entry);
            if (this.navPath === null && (props === "nav" || entry.type === "application/x-dtbncx+xml")) {
                this.navPath = entry.href;
            }
            if (this.coverPath === null && props === "cover-image") {
                this.coverPath = entry.href;
            }
        });

        if (this.coverPath === null) {
            this.coverPath = this.findCoverPath(node);
        }

        return new Promise((resolve, reject) => {
            resolve(this);
        });
    }

    /**
     * Find the Cover Path for Epub 2.0
     * @param {Node} node manifest node
     * @return {string} href
     * @private
     */
    findCoverPath(node) {

        const doc = node.ownerDocument;
        const meta = qsp(doc, "meta", { name: "cover" });

        if (meta) {
            const id = meta.getAttribute("content");
            const item = doc.getElementById(id);
            return item ? item.getAttribute("href") : null;
        }

        return null;
    }

    /**
     * Load manifest from JSON
     * @param {object[]} manifest 
     * @returns {Promise<Manifest>}
     */
    load(manifest) {

        manifest.forEach((item) => {
            for (const prop of item.properties) {
				switch (prop) {
					case "nav":
                        this.navPath = item.href;
						break;
                    case "cover-image":
                        this.coverPath = item.href;
                        break;
				}
			}
            this.set(item.id, item);
        });

        return new Promise((resolve, reject) => {
            resolve(this);
        });
    }

    /**
     * destroy
     */
    destroy() {

        this.clear();
        this.navPath = undefined;
        this.coverPath = undefined;
    }
}

export default Manifest;