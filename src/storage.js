import { isXml, parse } from "./utils/core";
import Defer from "./utils/defer";
import mime from "./utils/mime";
import EventEmitter from "event-emitter";
import localforage from "localforage";

const _URL = window.URL || window.webkitURL || window.mozURL;

/**
 * Handles saving and requesting files from local storage
 */
class Storage {
	/**
	 * Constructor
	 * @param {string} name This should be the name of the application for modals
	 * @param {Function} request
	 * @param {Function} resolve
	 */
	constructor(name, request, resolve) {

		this.name = name;
		this.request = request;
		this.resolve = resolve;
		/**
		 * @member {LocalForage} instance
		 * @memberof Storage
		 * @readonly
		 */
		this.instance = undefined;
		/**
		 * @member {object} urlCache
		 * @memberof Storage
		 * @readonly
		 */
		this.urlCache = {};
		/**
		 * @member {boolean} online Current status
		 * @memberof Storage
		 * @readonly
		 */
		this.online = window.navigator.onLine;
	}

	/**
	 * Create LocalForage instance
	 */
	createInstance() {

		if (localforage) {
			this.instance = localforage.createInstance({
				name: this.name
			});
			this.appendListeners();
		} else {
			throw new TypeError("LocalForage lib not loaded");
		}
	}

	/**
	 * Append online and offline event listeners
	 * @private
	 */
	appendListeners() {

		window.addEventListener("online", this.status.bind(this));
		window.addEventListener("offline", this.status.bind(this));
	}

	/**
	 * Remove online and offline event listeners
	 * @private
	 */
	removeListeners() {

		window.removeEventListener("online", this.status.bind(this));
		window.removeEventListener("offline", this.status.bind(this));
	}

	/**
	 * Update the online / offline status
	 * @param {Event} event 
	 * @private
	 */
	status(event) {

		this.online = event.type === "online";

		if (this.online) {
			this.emit("online");
		} else {
			this.emit("offline");
		}
	}

	/**
	 * Add all of a book manifest to the storage
	 * @param {Manifest} manifest  book manifest
	 * @param {boolean} [force=false] force resaving manifest
	 * @return {Promise<object>} store objects
	 */
	add(manifest, force = false) {

		const items = [...manifest.values()];
		const mapped = items.map(async (item) => {

			const { href } = item;
			const url = this.resolve(href);
			const key = this.getKey(url);

			return await this.instance.getItem(key).then((item) => {
				if (!item || force) {
					return this.request(url, "binary").then((data) => {
						return this.instance.setItem(key, data);
					});
				} else {
					return item;
				}
			});
		});
		return Promise.all(mapped);
	}

	/**
	 * Get entry from storage
	 * @param {string|number} input key
	 * @returns {Promise<any>}
	 * @example storage.get(0).then(data => ...)
	 * @example storage.get('entry-key').then(data => ...)
	 */
	async get(input) {

		const key = this.getKey(input);
		return this.instance.getItem(key);
	}

	/**
	 * Set data into storage
	 * @param {string|number} input
	 * @param {ArrayBuffer} data
	 * @return {Promise<ArrayBuffer|null>}
	 */
	async set(input, data) {

		const key = this.getKey(input);
		return this.instance.setItem(key, data);
	}

	/**
	 * Dispatch request by url
	 * @param {string} url a url to request from storage
	 * @param {string} [type] specify the type of the returned result
	 * @param {boolean} [withCredentials]
	 * @param {string[]} [headers]
	 * @return {Promise<Blob|string|JSON|Document|XMLDocument>}
	 */
	async dispatch(url, type, withCredentials, headers) {

		if (this.online) {
			//-- From network
			return this.request(
				url,
				type,
				withCredentials,
				headers
			).then((data) => {
				return this.set(url, data);
			});
		} else {
			//-- From storage
			return this.retrieve(url, type);
		}
	}

	/**
	 * Request a url from storage
	 * @param {string} url a url to request from storage
	 * @param {string} type specify the type of the returned result
	 * @return {Promise<Blob|string|JSON|Document|XMLDocument>}
	 */
	async retrieve(url, type) {

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
					message: "File not found in storage: " + url,
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
	 * @return {any} the parsed result
	 * @private
	 */
	handleResponse(response, type) {

		let r;
		if (isXml(type)) {
			r = parse(response, "text/xml");
		} else if (type === "xhtml") {
			r = parse(response, "application/xhtml+xml");
		} else if (type === "html" || type === "htm") {
			r = parse(response, "text/html");
		} else if (type === "json") {
			r = JSON.parse(response);
		} else {
			r = response;
		}
		return r;
	}

	/**
	 * Get entry key from input
	 * @param {string|number} input 
	 * @returns {string} key
	 * @private
	 */
	getKey(input) {

		let key = null;
		if (typeof input === "string") {
			key = window.encodeURIComponent(input);
		} else {
			key = `book-${input}`;
		}
		return key;
	}

	/**
	 * Get a Blob from Storage by Url
	 * @param {string} url
	 * @param {string} [mimeType]
	 * @return {Blob}
	 */
	getBlob(url, mimeType) {

		const key = this.getKey(url);
		const type = mimeType || mime.lookup(url);

		return this.instance.getItem(key).then((uint8array) => {
			if (!uint8array) return;
			return new Blob([uint8array], { type });
		});
	}

	/**
	 * Get Text from Storage by Url
	 * @param {string} url
	 * @param {string} [mimeType]
	 * @return {string}
	 */
	getText(url, mimeType) {

		const key = this.getKey(url);
		const type = mimeType || mime.lookup(url);

		return this.instance.getItem(key).then((uint8array) => {
			if (!uint8array) return;
			const deferred = new Defer();
			const reader = new FileReader();
			const blob = new Blob([uint8array], { type });

			reader.onloadend = () => {
				deferred.resolve(reader.result);
			};
			reader.readAsText(blob, type);
			return deferred.promise;
		});
	}

	/**
	 * Get a base64 encoded result from Storage by Url
	 * @param {string} url
	 * @param {string} [mimeType]
	 * @return {string} base64 encoded
	 */
	getBase64(url, mimeType) {

		const key = this.getKey(url);
		const type = mimeType || mime.lookup(url);

		return this.instance.getItem(key).then((uint8array) => {
			if (!uint8array) return;
			const deferred = new Defer();
			const reader = new FileReader();
			const blob = new Blob([uint8array], { type });

			reader.onloadend = () => {
				deferred.resolve(reader.result);
			};
			reader.readAsDataURL(blob, type);
			return deferred.promise;
		});
	}

	/**
	 * Create a Url from a stored item
	 * @param {string} url
	 * @param {object} [options.base64] use base64 encoding or blob url
	 * @return {Promise<string>} url promise with Url string
	 */
	createUrl(url, options) {

		const deferred = new Defer();

		if (url in this.urlCache) {
			deferred.resolve(this.urlCache[url]);
			return deferred.promise;
		}

		let response;
		if (options && options.base64) {
			response = this.getBase64(url);

			if (response) {
				response.then((tempUrl) => {

					this.urlCache[url] = tempUrl;
					deferred.resolve(tempUrl);
				});
			}
		} else {
			response = this.getBlob(url);

			if (response) {
				response.then((blob) => {

					const tempUrl = _URL.createObjectURL(blob);
					this.urlCache[url] = tempUrl;
					deferred.resolve(tempUrl);
				});
			}
		}

		if (!response) {
			deferred.reject({
				message: "File not found in storage: " + url,
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

		for (const fromCache in this.urlCache) {
			_URL.revokeObjectURL(fromCache);
		}
		this.urlCache = {};
		this.removeListeners();
	}
}

EventEmitter(Storage.prototype);

export default Storage;