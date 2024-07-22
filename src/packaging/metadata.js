/**
 * Metadata class
 * @extends {Map}
 */
class Metadata extends Map {

    constructor() { super(); }

    /**
     * Parse the metadata node
     * @param {Node} node metadata
     * @returns {Promise<Metadata>}
     */
    parse(node) {

        for (const item of node.children) {
            if (item.nodeName === "meta") {
                this.parseMeta(item);
            } else if (/dc:/.test(item.nodeName)) {
                // dc:title
                // dc:creator
                // dc:description
                // dc:publisher
                // dc:identifier
                // dc:language
                // dc:subject
                // dc:rights
                // dc:date
                // dc:type
                const key = item.nodeName.substring(3);
                this.set(key, item.textContent);
            }
        }

        return new Promise((resolve, reject) => {
            resolve(this);
        });
    }

    /**
     * Parse the meta node
     * @param {Node} item 
     * @returns {void}
     * @private
     */
    parseMeta(item) {

        const prop = item.getAttribute("property");

        if (typeof prop === "undefined" ||
            typeof prop !== "string") {
            return;
        } else if (/rendition:/.test(prop)) {
            // rendition:layout
            // rendition:spread
            // rendition:flow
            // rendition:viewport
            // rendition:orientation
            const key = prop.substring(10);
            this.set(key, item.textContent);
        } else if (/dcterms:/.test(prop)) {
            // dcterms:modified
            const key = prop.substring(8);
            this.set(key, item.textContent);
        } else if (/media:/.test(prop)) {
            // media:active-class
            // media:duration
            // media:narrator
            // media:playback-active-class
            this.set(prop, item.textContent);
        }
    }

    /**
     * Load metadata from JSON
     * @param {object} metadata 
     * @returns {Promise<Metadata>}
     */
    load(metadata) {

        Object.keys(metadata).forEach((prop) => {
			this.set(prop, metadata[prop]);
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
    }
}

export default Metadata;