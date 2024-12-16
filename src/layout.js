import { EVENTS } from "./utils/constants";
import EventEmitter from "event-emitter";

/**
 * Figures out the CSS values to apply for a layout
 */
class Layout {
	/**
	 * Constructor
	 * @param {object} [options] 
	 * @param {string} [options.flow='paginated'] values: `"paginated"` OR `"scrolled"` OR `"scrolled-doc"`
	 * @param {string} [options.spread='auto'] values: `"auto"` OR `"none"`
	 * @param {string} [options.direction='ltr'] values: `"ltr"` OR `"rtl"`
	 * @param {string} [options.orientation='auto'] values: `"auto"` OR `"landscape"` OR `"portrait"`
	 * @param {number} [options.minSpreadWidth=800]
	 * @param {number} [options.pageWidth] page width
	 * @param {number} [options.pageHeight] page height
	 */
	constructor(options) {
		/**
		 * @member {string} axis
		 * @memberof Layout
		 * @readonly
		 */
		this.axis = "horizontal";
		/**
		 * @member {string} name Layout name
		 * @memberof Layout
		 * @readonly
		 */
		this.name = "reflowable";
		/**
		 * @member {string} flow
		 * @memberof Layout
		 * @readonly
		 */
		this.flow = "paginated";
		/**
		 * @member {boolean} spread
		 * @memberof Layout
		 * @readonly
		 */
		this.spread = "auto";
		/**
		 * @member {string} direction
		 * @memberof Layout
		 * @readonly
		 */
		this.direction = "ltr";
		/**
		 * @member {string} orientation no implementation
		 * @memberof Layout
		 * @readonly
		 */
		this.orientation = "auto";
		/**
		 * @member {string} viewport no implementation
		 * @memberof Layout
		 * @readonly
		 */
		this.viewport = "";
		/**
		 * @member {number} minSpreadWidth
		 * @memberof Layout
		 * @readonly
		 */
		this.minSpreadWidth = 800;
		/**
		 * @member {number} width Layout width
		 * @memberof Layout
		 * @readonly
		 */
		this.width = 0;
		/**
		 * @member {number} height Layout height
		 * @memberof Layout
		 * @readonly
		 */
		this.height = 0;
		/**
		 * @member {number} pageWidth
		 * @memberof Layout
		 * @readonly
		 */
		this.pageWidth = 0;
		/**
		 * @member {number} pageHeight
		 * @memberof Layout
		 * @readonly
		 */
		this.pageHeight = 0;
		/**
		 * @member {number} spreadWidth Spread width
		 * @memberof Layout
		 * @readonly
		 */
		this.spreadWidth = 0;
		/**
		 * @member {number} delta
		 * @memberof Layout
		 * @readonly
		 */
		this.delta = 0;
		/**
		 * @member {number} columnWidth Column width
		 * @memberof Layout
		 * @readonly
		 */
		this.columnWidth = 0;
		/**
		 * @member {number} gap
		 * @memberof Layout
		 * @readonly
		 */
		this.gap = 0;
		/**
		 * @member {number} divisor
		 * @memberof Layout
		 * @readonly
		 */
		this.divisor = 1;
		this.set(options || {});
	}

	/**
	 * Set options
	 * @param {object} options
	 */
	set(options) {

		const error = (name) => console.error(`Invalid '${name}' property type`);
		Object.keys(options).forEach(opt => {
			const value = options[opt];
			if (this[opt] === value || typeof value === "undefined") {
				delete options[opt];
			} else if (
				opt === "direction" ||
				opt === "orientation") {
				if (typeof value === "string") {
					this[opt] = options[opt];
				} else error(opt);
			} else if (opt === "flow") {
				if (typeof value === "string") {
					switch (value) {
						case "scrolled":
						case "scrolled-continuous":
							this.flow = "scrolled";
							this.axis = "vertical"; // autocomplete
							this.spread = "none"; // autocomplete
							break;
						case "scrolled-doc":
							this.flow = value;
							this.axis = "vertical"; // autocomplete
							this.spread = "none"; // autocomplete
							break;
						default:
							this.flow = "paginated";
							this.axis = "horizontal"; // autocomplete
							break;
					}
				} else error(opt);
			} else if (opt === "spread") {
				if (typeof value === "string") {
					switch (value) {
						case "auto":
						case "both":
							this.spread = "auto";
							break;
						default:
							this.spread = "none";
							break;
					}
				} else error(opt);
			} else if (
				opt === "width" ||
				opt === "height" ||
				opt === "pageWidth" ||
				opt === "pageHeight" ||
				opt === "gap" ||
				opt === "minSpreadWidth") {
				if (typeof value === "number") {
					if (value >= 0) {
						this[opt] = options[opt];
					}
				} else error(opt);
			}
		});

		this.calculate();

		if (Object.keys(options).length) {
			this.emit(EVENTS.LAYOUT.UPDATED, this, options);
		}
	}

	/**
	 * Calculate the dimensions of the pagination
	 * @param {number} [width] width of the rendering
	 * @param {number} [height] height of the rendering
	 * @param {number} [gap] width of the gap between columns
	 */
	calculate(width, height, gap) {

		const szw = width || this.width;
		const szh = height || this.height;

		if (!(gap >= 0)) {
			let section;
			if (this.axis === "horizontal") {
				section = Math.floor(szw / 12);
			} else {
				section = Math.floor(szh / 17);
			}
			this.gap = ((section % 2 === 0) ? section : section - 1);
		} else {
			this.gap = gap;
		}

		if (this.flow === "paginated") {
			this.divisor = this.spread === "auto" && szw >= this.minSpreadWidth ? 2 : 1;
			this.columnWidth = (szw / this.divisor) - this.gap;
			this.spreadWidth = (this.columnWidth * this.divisor) + this.gap;
			this.pageWidth = this.columnWidth + this.gap;
			this.pageHeight = szh;
		} else {
			this.divisor = 1;
		}

		this.delta = szw;
		this.width = szw;
		this.height = szh;
	}

	/**
	 * Count number of pages
	 * @param {number} totalLength
	 * @param {number} [pageLength]
	 * @return {{spreads: number, pages: number}}
	 */
	count(totalLength, pageLength) {

		let spreads, pages;
		if (this.flow === "paginated") {
			pageLength = pageLength || this.delta;
			spreads = Math.ceil(totalLength / pageLength);
			pages = spreads * this.divisor;
		} else {
			pageLength = pageLength || this.height;
			spreads = Math.ceil(totalLength / pageLength);
			pages = spreads;
		}
		return { spreads, pages }
	}

	/**
	 * destroty
	 */
	destroy() {

		Object.keys(this).forEach(p => this[p] = undefined);
	}
}

EventEmitter(Layout.prototype);

export default Layout;