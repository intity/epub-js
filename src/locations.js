import EventEmitter from "event-emitter";
import EpubCFI from "./epubcfi";
import Location from "./location";
import Defer from "./utils/defer";
import Queue from "./utils/queue";
import { EVENTS } from "./utils/constants";
import { qs, sprint, locationOf } from "./utils/core";

/**
 * Find Locations for a Book
 */
class Locations extends Map {
	/**
	 * Constructor
	 * @param {Sections} [sections]
	 * @param {Function} [request]
	 * @param {Number} [pause=100]
	 */
	constructor(sections, request, pause) {

		super();
		this.sections = sections;
		this.pause = pause || 100;
		this.break = 150;
		this.request = request;
		/**
		 * @member {Location} current Current Location
		 * @memberof Locations
		 * @readonly
		 */
		this.current = new Location();
		this.processing = new Defer();
		/**
		 * @member {Promise} generated
		 * @memberof Locations
		 * @readonly
		 */
		this.generated = this.processing.promise;
		this.processingTimeout = undefined;
		this.q = new Queue(this);
	}

	/**
	 * Load all of sections in the book to generate locations
	 * @param {Number} [chars] how many chars to split on (default:150)
	 * @return {Promise<Locations>} Locations
	 */
	async generate(chars) {

		if (Number.isInteger(chars)) {
			this.break = chars;
		} else {
			this.break = parseInt(chars)
			console.warn("The input value type is not an integer")
		}

		this.q.pause();
		this.sections.forEach((section) => {

			if (section.linear) {
				this.q.enqueue(this.process.bind(this), section);
			}
		});

		return this.q.run().then(() => {

			const len = this.size === 1 ? 1 : this.size - 1;
			const arr = [...this.values()];
			arr.forEach((loc, index) => {
				loc.index = index;
				loc.percentage = index / len;
			});
			if (this.size) {
				this.current.set(arr[0]);
			}
			this.processing.resolve(this);
			return this;
		});
	}

	/**
	 * createRange
	 * @returns {Object}
	 */
	createRange() {

		return {
			startContainer: undefined,
			startOffset: undefined,
			endContainer: undefined,
			endOffset: undefined
		};
	}

	/**
	 * process
	 * @param {Section} section 
	 * @returns {Promise<Element>}
	 */
	async process(section) {

		return section.load(this.request).then((contents) => {
			const completed = new Defer();
			const locations = this.parse(contents, section.cfiBase);

			section.unload();

			this.processingTimeout = setTimeout(() => {
				completed.resolve(locations);
			}, this.pause);
			return completed.promise;
		});
	}

	/**
	 * parse
	 * @param {Element} contents 
	 * @param {String} cfiBase 
	 * @param {Number} [chars]
	 * @returns {Locations}
	 */
	parse(contents, cfiBase, chars) {

		chars = chars || this.break;

		let range;
		let counter = 0;
		let prev;
		const parser = (node) => {

			if (node.textContent.trim().length === 0) {
				return false; // continue
			}

			// Start range
			if (counter == 0) {
				range = this.createRange();
				range.startContainer = node;
				range.startOffset = 0;
			}

			const len = node.length;
			let dist = chars - counter;
			let pos = 0;

			// Node is smaller than a break,
			// skip over it
			if (dist > len) {
				counter += len;
				pos = len;
			}

			while (pos < len) {
				dist = chars - counter;

				if (counter === 0) {
					// Start new range
					pos += 1;
					range = this.createRange();
					range.startContainer = node;
					range.startOffset = pos;
				}

				// Gone over
				if (pos + dist >= len) {
					// Continue counter for next node
					counter += len - pos;
					// break
					pos = len;
					// At End
				} else {
					// Advance pos
					pos += dist;
					// End the previous range
					range.endContainer = node;
					range.endOffset = pos;
					const cfi = new EpubCFI(range, cfiBase).toString();
					const loc = new Location().set({ cfi });
					this.set(cfi, loc);
					counter = 0;
				}
			}
			prev = node;
		};

		const doc = contents.ownerDocument;
		const body = qs(doc, "body");
		sprint(body, parser.bind(this));

		// Close remaining
		if (range && range.startContainer && prev) {
			range.endContainer = prev;
			range.endOffset = prev.length;
			const cfi = new EpubCFI(range, cfiBase).toString();
			const loc = new Location().set({ cfi });
			this.set(cfi, loc);
			counter = 0;
		}

		return this;
	}

	/**
	 * Get a location from an EpubCFI
	 * @param {String} value EpubCFI string format
	 * @return {Number} Location index or -1 otherwise
	 */
	locationFromCfi(value) {

		if (this.size === 0) return -1;

		const cfi = new EpubCFI(value);
		const arr = [...this.keys()];
		const ind = locationOf(cfi, arr, cfi.compare);
		const max = this.size - 1;
		return ind > max ? -1 : ind;
	}

	/**
	 * Get a percentage position in locations from an EpubCFI
	 * @param {String} cfi EpubCFI string format
	 * @return {Number} Percentage
	 */
	percentageFromCfi(cfi) {

		if (this.size === 0) {
			return 0;
		}
		// Find closest cfi
		const index = this.locationFromCfi(cfi);
		// Get percentage in total
		return this.percentageFromLocation(index);
	}

	/**
	 * Get a percentage position from a location index
	 * @param {Number} index Location index
	 * @return {Number} Percentage
	 */
	percentageFromLocation(index) {

		if (this.size === 0 ||
			this.size >= index && index < 0) {
			return 0;
		}
		const len = this.size === 1 ? 1 : this.size - 1;
		return (index / len);
	}

	/**
	 * Get an EpubCFI from location index
	 * @param {Number} index Location index
	 * @return {String|null} EpubCFI string format
	 */
	cfiFromLocation(index) {

		if (this.size === 0 ||
			this.size >= index && index < 0) {
			return null;
		}
		return [...this.keys()][index];
	}

	/**
	 * Get an EpubCFI from location percentage
	 * @param {Number} value Percentage in ranging from 0 to 1
	 * @return {String|null} EpubCFI string format
	 */
	cfiFromPercentage(value) {

		let ret, max = this.size - 1;
		if (value >= 0 && value <= 1) {
			const index = Math.round(max * value);
			ret = this.cfiFromLocation(index);
		} else {
			const cfi = new EpubCFI([...this.keys()][max]);
			cfi.collapse();
			ret = cfi.toString();
			console.warn("Recommended a normalize value to between 0 - 1");
		}
		return ret;
	}

	/**
	 * Load locations from JSON
	 * @param {String} locations
	 */
	load(locations) {

		if (typeof locations === "string") {
			this.clear();
			const data = JSON.parse(locations);
			data.items.forEach(i => this.set(i.cfi, i));
			this.break = data.break;
			this.pause = data.pause;
			this.current.set(this.get(data.idref));
		} else {
			console.error("Invalid argument type");
		}

		return this;
	}

	/**
	 * Save locations to JSON
	 * @return {String} A JSON string
	 */
	save() {

		return JSON.stringify({
			items: [...this.values()],
			idref: this.current.cfi,
			break: this.break,
			pause: this.pause
		});
	}

	/**
	 * Set current location
	 * @param {Object} [options]
	 * @param {String} [options.cfi] EpubCFI string format
	 * @param {Number} [options.index] Location index
	 * @param {Number} [options.percentage] Percentage
	 */
	set(options) {

		if (arguments.length === 2) {
			super.set(arguments[0], arguments[1]);
			return this;
		} else if (this.size === 0) {
			return this;
		}

		Object.keys(options || {}).forEach(opt => {
			const value = options[opt];
			if (this.current[opt] === value || typeof value === "undefined") {
				delete options[opt];
			} else if (typeof value === "string") {
				if (opt === "cfi" && EpubCFI.prototype.isCfiString(value)) {
					const ind = this.locationFromCfi(value);
					const loc = [...this.values()][ind];
					if (loc) {
						this.current.set(loc);
					} else {
						delete options[opt];
					}
				}
			} else if (typeof value === "number") {
				if (opt === "index") {
					const cfi = this.cfiFromLocation(value);
					const loc = this.get(cfi);
					if (loc) {
						this.current.set(loc);
					} else {
						delete options[opt];
					}
				} else if (opt === "percentage") {
					const cfi = this.cfiFromPercentage(value);
					const loc = this.get(cfi);
					if (loc) {
						this.current.set(loc);
					} else {
						delete options[opt];
					}
				}
			} else {
				console.error("Invalid value type to " + opt);
			}
		});

		if (Object.keys(options || {}).length) {
			const { ...current } = this.current;
			/**
			 * Current location changed
			 * @event changed
			 * @param {Object} current Current location
			 * @param {Object} changed Changed properties
			 * @memberof Locations
			 */
			this.emit(EVENTS.LOCATIONS.CHANGED, current, options);
		}
	}

	/**
	 * clear locations
	 */
	clear() {

		super.clear();
		this.current.cfi = null;
		this.current.index = -1;
		this.current.percentage = 0;
	}

	/**
	 * destroy
	 */
	destroy() {

		this.clear();
		this.pause = undefined;
		this.break = undefined;
		this.current = undefined;
		this.request = undefined;
		this.q.stop();
		this.q = undefined;
		this.sections = undefined;
		this.generated = undefined;
		clearTimeout(this.processingTimeout);
	}
}

EventEmitter(Locations.prototype);

export default Locations;