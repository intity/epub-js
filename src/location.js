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
     * Start location
     * @member {object} start
     * @property {number} bin
     * @property {string} cfi
     * @property {string} href
     * @property {number} index
     * @property {number} percentage
     * @memberof Location
     * @readonly
     */
    this.start = {};
    /**
     * End location
     * @member {object} end
     * @property {number} bin
     * @property {string} cfi
     * @property {string} href
     * @property {number} index
     * @property {number} percentage
     * @memberof Location
     * @readonly
     */
    this.end = {};
  }

  /**
   * Set location properties
   * @param {object} [props]
   * @param {number} [props.start.bin]
   * @param {string} [props.start.cfi]
   * @param {number} [props.start.index]
   * @param {number} [props.start.percentage]
   * @param {number} [props.end.bin]
   * @param {string} [props.end.cfi]
   * @param {number} [props.end.index]
   * @param {number} [props.end.percentage]
   */
  set(props) {

    extend(this, props || {});
    return this;
  }

  /**
   * Clear locations
   */
  clear() {

    this.start.cfi = null;
    this.start.index = -1;
    this.start.percentage = 0;
    this.end.cfi = null;
    this.end.index = -1;
    this.end.percentage = 0;
  }

  /**
   * Destroy the Location object
   */
  destroy() {

    Object.keys(this).forEach(p => (this[p] = undefined));
  }
}

export default Location;
