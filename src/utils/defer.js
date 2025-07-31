import { uuid } from "./core";

/**
 * Creates a new pending promise and provides methods to resolve or reject it.
 */
class Defer {
    /**
     * Constructor
     */
    constructor() {
        /**
         * @member {string} id
         * @memberof Defer
         * @readonly
         */
        this.id = uuid();
        /**
         * Dump for debug trace
         * @member {Map} dump
         * @memberof Defer
         */
        this.dump = new Map();
        /**
         * A method to resolve the associated Promise with the value passed.
         * If the promise is already settled it does nothing.
         * @member {function} resolve
         * @param {any} value : This value is used to resolve the promise
         * If the value is a Promise then the associated promise assumes 
         * the state of Promise passed as value.
         * @memberof Defer
         * @readonly
         */
        this.resolve = null;
        /**
         * A method to reject the associated Promise with the value passed.
         * If the promise is already settled it does nothing.
         * @member {function} reject
         * @param {any} reason : The reason for the rejection of the Promise.
         * Generally its an Error object. If however a Promise is passed, then 
         * the Promise itself will be the reason for rejection no matter 
         * the state of the Promise.
         * @memberof Defer
         * @readonly
         */
        this.reject = null;
        /**
         * A newly created Pomise object.
         * Initially in pending state.
         * @member {Promise} promise
         * @memberof Defer
         * @readonly
         */
        this.promise = new Promise((resolve, reject) => {
            this.resolve = resolve;
            this.reject = reject;
        });
    }

    /**
     * Dectroy the Defer object
     */
    destroy() {

        Object.keys(this).forEach(p => (this[p] = undefined));
    }
}

export default Defer;