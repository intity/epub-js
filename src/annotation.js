import EventEmitter from "event-emitter";
import EpubCFI from "./epubcfi";
import { EVENTS } from "./utils/constants";

/**
 * Annotation class
 */
class Annotation {
    /**
     * Constructor
     * @param {String} type Type of annotation to add: `"highlight"` OR `"underline"`
     * @param {String} cfiRange EpubCFI range to attach annotation to
     * @param {Object} [options]
     * @param {Object} [options.data] Data to assign to annotation
     * @param {Function} [options.cb] Callback after annotation is clicked
     * @param {String} [options.className] CSS class to assign to annotation
     * @param {Object} [options.styles] CSS styles to assign to annotation
     */
    constructor(type, cfiRange, { data, cb, className, styles }) {
        /**
         * @member {String} type
         * @memberof Annotation
         * @readonly
         */
        this.type = type;
        this.cfiRange = cfiRange;
        /**
         * @member {Number} sectionIndex
         * @memberof Annotation
         * @readonly
         */
        this.sectionIndex = new EpubCFI(cfiRange).spinePos;
        this.data = data;
        this.cb = cb;
        this.className = className;
        this.styles = styles;
        /**
         * @member {Mark} mark
         * @memberof Annotation
         * @readonly
         */
        this.mark = undefined;
    }

    /**
     * Update stored data
     * @param {Object} data
     */
    update(data) {

        this.data = data;
    }

    /**
     * Add to a view
     * @param {View} view
     * @returns {Object|null}
     */
    attach(view) {

        let result;
        if (!view) {
            return null;
        } else if (this.type === "highlight") {
            result = view.highlight(
                this.cfiRange,
                this.data,
                this.cb,
                this.className,
                this.styles
            );
        } else if (this.type === "underline") {
            result = view.underline(
                this.cfiRange,
                this.data,
                this.cb,
                this.className,
                this.styles
            );
        }

        this.mark = result;
        /**
         * @event attach
         * @param {Mark} result
         * @memberof Annotation
         */
        this.emit(EVENTS.ANNOTATION.ATTACH, result);
        return result;
    }

    /**
     * Remove from a view
     * @param {View} view
     * @returns {Boolean}
     */
    detach(view) {

        let result = false;
        if (!view) {
            return result;
        } else if (this.type === "highlight") {
            result = view.unhighlight(this.cfiRange);
        } else if (this.type === "underline") {
            result = view.ununderline(this.cfiRange);
        }

        this.mark = undefined;
        /**
         * @event detach
         * @param {Boolean} result
         * @memberof Annotation
         */
        this.emit(EVENTS.ANNOTATION.DETACH, result);
        return result;
    }

    /**
     * [Not Implemented] Get text of an annotation
     * @TODO: needs implementation in contents
     */
    text() { }
}

EventEmitter(Annotation.prototype);

export default Annotation;