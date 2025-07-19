import { extend } from "./utils/core";

/**
 * Location class
 */
class Location {
    /**
     * Constructor
     */
    constructor() {
        /**
         * @member {string} cfi EpubCFI string format
         * @memberof Location
         * @readonly
         */
        this.cfi = null;
        /**
         * @member {number} index Location index
         * @memberof Location
         * @readonly
         */
        this.index = 0;
        /**
         * Percentage in the range from 0 to 1
         * @member {number} percentage
         * @memberof Location
         * @readonly
         */
        this.percentage = 0;
    }

    /**
     * Set location properties
     * @param {object} [props]
     * @param {string} [props.cfi]
     * @param {number} [props.index]
     * @param {number} [props.percentage]
     */
    set(props) {

        extend(this, props || {});
        return this;
    }

    /**
     * Destroy the Location object
     */
    destroy() {

        Object.keys(this).forEach(p => (this[p] = undefined));
    }
}

export default Location;