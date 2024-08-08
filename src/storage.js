import EventEmitter from "event-emitter";
import localforage from "localforage";
import request from "./utils/request";
import mime from "./utils/mime";
import Defer from "./utils/defer";
import Input from "./input";

/**
 * Handles saving and requesting files from local storage
 * @extends {Input}
 */
class Storage extends Input {
	/**
	 * Constructor
	 * @param {string} name This should be the name of the application for modals
	 */
	constructor(name) {

		super();
		/**
		 * @member {string} name
		 * @memberof Storage
		 * @readonly
		 */
		this.name = name;
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
	 * Append event listeners
	 * @private
	 */
	appendListeners() {

		window.addEventListener("online", this.status.bind(this));
		window.addEventListener("offline", this.status.bind(this));
	}

	/**
	 * Remove event listeners
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
	 * Get entry from Storage
	 * @param {string|number} input key
	 * @returns {Promise<any>}
	 * @example storage.get(0).then(data => ...)
	 * @example storage.get('https://example.com/to/book.epub').then(data => ...)
	 */
	async get(input) {

		const key = this.getKey(input);
		return this.instance.getItem(key);
	}

	/**
	 * Set data into Storage
	 * @param {string|number} input
	 * @param {ArrayBuffer} data
	 * @return {Promise<ArrayBuffer|null>}
	 */
	async set(input, data) {

		const key = this.getKey(input);
		return this.instance.setItem(key, data);
	}

	/**
	 * Put data into Storage
	 * @param {string} url 
	 * @returns {Promise<ArrayBuffer>}
	 */
	async put(url) {

		return this.get(url).then((data) => {
			return data || request(url, "binary").then((result) => {
				return this.set(url, result);
			});
		});
	}

	/**
	 * Dispatch a request by URL
	 * @param {string} url a url to request from storage
	 * @param {string} [type] specify the type of the returned result
	 * @param {boolean} [withCredentials]
	 * @param {string[]} [headers]
	 * @return {Promise<Blob|string|JSON|Document|XMLDocument>}
	 */
	async dispatch(url, type, withCredentials, headers) {

		if (this.online) {
			//-- From network
			const tasks = [];
			tasks.push(request(
				url,
				type,
				withCredentials,
				headers
			));
			tasks.push(this.put(url));
			return Promise.all(tasks).then((result) => {
				return result[0] || null;
			});
		} else {
			//-- From storage
			return this.request(url, type);
		}
	}

	/**
	 * Get entry key from input
	 * @param {string|number} input 
	 * @returns {string} key
	 * @private
	 */
	getKey(input) {

		let key;
		if (typeof input === "string") {
			key = input;
		} else {
			key = `book-${input}`;
		}
		return key;
	}

	/**
	 * Get a Blob from Storage by URL
	 * @param {string} url
	 * @param {string} [mimeType]
	 * @returns {Promise<Blob|null>}
	 * @override
	 */
	async getBlob(url, mimeType) {

		return this.get(url).then((data) => {
			if (!data) return null;
			const type = mimeType || mime.lookup(url);
			return new Blob([data], { type });
		});
	}

	/**
	 * Get a Text from Storage by URL
	 * @param {string} url
	 * @param {string} [mimeType]
	 * @returns {Promise<string|null>}
	 * @override
	 */
	async getText(url, mimeType) {

		return this.get(url).then((data) => {
			if (!data) return null;
			const def = new Defer();
			const reader = new FileReader();
			const type = mimeType || mime.lookup(url);
			const blob = new Blob([data], { type });
			reader.onloadend = () => {
				def.resolve(reader.result);
			};
			reader.readAsText(blob, type);
			return def.promise;
		});
	}

	/**
	 * Get a base64 encoded result from Storage by URL
	 * @param {string} url
	 * @param {string} [mimeType]
	 * @returns {Promise<string|null>} base64 encoded
	 * @override
	 */
	async getBase64(url, mimeType) {

		return this.get(url).then((data) => {
			if (!data) return null;
			const def = new Defer();
			const reader = new FileReader();
			const type = mimeType || mime.lookup(url);
			const blob = new Blob([data], { type });
			reader.onloadend = () => {
				def.resolve(reader.result);
			};
			reader.readAsDataURL(blob, type);
			return def.promise;
		});
	}

	/**
	 * destroy
	 * @override
	 */
	destroy() {

		super.destroy();
		this.removeListeners();
	}
}

EventEmitter(Storage.prototype);

export default Storage;