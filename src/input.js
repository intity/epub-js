import { isXml, parse } from "./utils/core";
import Defer from "./utils/defer";
import Path from "./utils/path";

const _URL = window.URL || window.webkitURL || window.mozURL;

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
		/**
		 * @member {object} urlCache
		 * @memberof Input
		 * @readonly
		 */
		this.urlCache = {};
	}

	/**
	 * Clear the Archive cache
	 */
	clear() {

		for (const fromCache in this.urlCache) {
			_URL.revokeObjectURL(fromCache);
		}
		this.urlCache = {};
	}

	/**
	 * Request a url from the archive
	 * @param {string} url a url to request from the archive
	 * @param {string} [type] specify the type of the returned result
	 * @returns {Promise<Blob|string|JSON|Document|XMLDocument>}
	 */
	async request(url, type) {

		type = type || new Path(url).extension;

		let response;
		if (type === "blob" || type === "binary") {
			response = this.getBlob(url);
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
	 * Create a URL from a stored item
	 * @param {string} url
	 * @param {object} [options] 
	 * @param {string} [options.base64] use base64 encoding or blob url
	 * @returns {Promise<string>} url promise with Url string
	 */
	createUrl(url, options) {

		const deferred = new Defer();
		const base64 = options && options.base64;

		if (url in this.urlCache) {
			deferred.resolve(this.urlCache[url]);
			return deferred.promise;
		}

		let response;
		if (base64 && (response = this.getBase64(url))) {
			response.then((tempUrl) => {

				this.urlCache[url] = tempUrl;
				deferred.resolve(tempUrl);
			});
		} else if (response = this.getBlob(url)) {
			response.then((blob) => {

				const tempUrl = _URL.createObjectURL(blob);
				this.urlCache[url] = tempUrl;
				deferred.resolve(tempUrl);
			});
		}

		if (!response) {
			deferred.reject({
				message: "File not found in: " + url,
				stack: new Error().stack
			});
		}

		return deferred.promise;
	}

	/**
	 * Revoke Temp Url for a archive item
	 * @param {string} url url of the item in the store
	 */
	revokeUrl(url) {

		const fromCache = this.urlCache[url];
		if (fromCache) {
			_URL.revokeObjectURL(fromCache);
		}
	}

	/**
	 * destroy
	 */
	destroy() {

		this.clear();
		this.urlCache = undefined;
		this.instance = undefined;
	}
}

export default Input;