import { isXml, parse } from "./utils/core";
import Defer from "./utils/defer";
import Path from "./utils/path";

/**
 * Base class for Archive and Storage
 */
class Input {
	/**
	 * Constructor
	 */
	constructor() {
		/**
		 * @member {object} instance
		 * @memberof Input
		 * @readonly
		 */
		this.instance = null;
	}

	/**
	 * Request a URL from entries
	 * @param {string} url a URL to request
	 * @param {string} [type] specify the type of the returned result
	 * @returns {Promise<Blob|string|JSON|Document|XMLDocument>}
	 */
	async request(url, type) {

		type = type || new Path(url).extension;

		let response;
		if (type === "blob" || type === "binary") {
			response = this.getBlob(url);
		} else if (type === "base64") {
			response = this.getBase64(url);
		} else {
			response = this.getText(url);
		}

		return response.then((r) => {
			const deferred = new Defer();
			if (r) {
				const result = this.handleResponse(r, type);
				deferred.resolve(result);
			} else {
				deferred.reject({
					message: "File not found in: " + url,
					stack: new Error().stack
				});
			}
			return deferred.promise;
		});
	}

	/**
	 * Handle the response from request
	 * @param {any} response
	 * @param {string} [type]
	 * @returns {any} the parsed result
	 */
	handleResponse(response, type) {

		let r;
		if (isXml(type)) {
			r = parse(response, "text/xml");
		} else if (type === "xhtml") {
			r = parse(response, "application/xhtml+xml");
		} else if (type == "html" || type == "htm") {
			r = parse(response, "text/html");
		} else if (type === "json") {
			r = JSON.parse(response);
		} else {
			r = response;
		}
		return r;
	}

	/**
	 * Get a Blob from entries by URL
	 * @param {string} url
	 * @param {string} [mimeType]
	 * @returns {Promise<Blob|null>}
	 * @abstract
	 */
	async getBlob(url, mimeType) { }

	/**
	 * Get a Text from entries by URL
	 * @param {string} url
	 * @param {string} [mimeType]
	 * @returns {Promise<string|null>}
	 * @abstract
	 */
	async getText(url, mimeType) { }

	/**
	 * Get a base64 encoded result from entries by URL
	 * @param {string} url
	 * @param {string} [mimeType]
	 * @returns {Promise<string|null>} base64 encoded
	 * @abstract
	 */
	async getBase64(url, mimeType) { }

	/**
	 * destroy
	 */
	destroy() {

		this.instance = undefined;
	}
}

export default Input;