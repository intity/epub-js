import Path from "./utils/path";
import { qs } from "./utils/core";

/**
 * Parsing the Epub Container
 * @link https://www.w3.org/TR/epub/#sec-container-metainf
 */
class Container {
	/**
	 * Constructor
	 */
	constructor() {
		/**
		 * @member {string} directory Package directory
		 * @memberof Container
		 * @readonly
		 */
		this.directory = "";
		/**
		 * @member {string} fullPath Path to package file
		 * @memberof Container
		 * @readonly
		 */
		this.fullPath = "";
		/**
		 * @member {string} encoding Encoding
		 * @memberof Container
		 * @readonly
		 */
		this.encoding = "";
		/**
		 * @member {string} mediaType Media type
		 * @memberof Container
		 * @readonly
		 */
		this.mediaType = "";
		/**
		 * @member {string} version
		 * @memberof Container
		 * @readonly
		 */
		this.version = "";
	}

	/**
	 * Clear parts
	 */
	clear() {

		this.directory = "";
		this.fullPath = "";
		this.encoding = "";
		this.mediaType = "";
		this.version = "";
	}

	/**
	 * Parse the Container XML
	 * @param {Document} doc
	 * @returns {Promise<Container>}
	 */
	parse(doc) {

		if (!doc) {
			throw new Error("Container File Not Found");
		}

		const container = qs(doc, "container");

		if (!container) {
			throw new Error("container node not found");
		}

		const rootfile = qs(doc, "rootfile");

		if (!rootfile) {
			throw new Error("rootfile node not found");
		}

		this.fullPath = rootfile.getAttribute("full-path");
		this.directory = Path.prototype.dirname(this.fullPath);
		this.encoding = doc.characterSet;
		this.mediaType = rootfile.getAttribute("media-type");
		this.version = container.getAttribute("version");

		return Promise.resolve(this);
	}

	/**
	 * Load a container from JSON
	 * @param {object} container 
	 * @returns {Promise<Container>}
	 */
	load(container) {

		Object.keys(container).forEach(p => {
			switch (p) {
				case "directory":
					this.directory = container[p];
					break;
				case "encoding":
					this.encoding = container[p];
					break;
				case "full-path":
					this.fullPath = container[p];
					break;
				case "media-type":
					this.mediaType = container[p];
					break;
				case "version":
					this.version = container[p];
					break;
			}
		});

		return Promise.resolve(this);
	}

	/**
	 * destroy
	 */
	destroy() {

		this.directory = undefined;
		this.encoding = undefined;
		this.fullPath = undefined;
		this.mediaType = undefined;
		this.version = undefined;
	}
}

export default Container;