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
         * @member {String} cfi EpubCFI string format
         * @memberof Location
         */
        this.cfi = null;
        /**
         * @member {Number} index Location index
         * @memberof Location
         */
        this.index = 0;
        /**
         * Percentage in the range from 0 to 1
         * @member {Number} percentage
         * @memberof Location
         */
        this.percentage = 0;
    }

    /**
     * Set location properties
     * @param {Object} [props]
     * @param {String} [props.cfi]
     * @param {Number} [props.index]
     * @param {Number} [props.percentage]
     */
    set(props) {

        extend(this, props || {});
        return this;
    }
}

export default Location;