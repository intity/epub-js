import request from "./utils/request";
import mime from "./utils/mime";
import Input from "./input";
import JSZip from "jszip";

/**
 * Handles Unzipping a requesting files from an Epub Archive
 * @extends {Input}
 */
class Archive extends Input {

	constructor() {

		super();
		this.createInstance();
	}

	/**
	 * Create JSZip instance
	 */
	createInstance() {

		if (JSZip) {
			this.instance = new JSZip();
		} else {
			throw new Error("JSZip lib not loaded");
		}
	}

	/**
	 * Open an archive
	 * @param {string|ArrayBuffer} input
	 * @param {string} [encoding] tells JSZip if the input data is base64 encoded
	 * @returns {Promise<any>} zipfile
	 */
	open(input, encoding) {

		if (encoding === "base64") {
			const data = input.split(",");
			input = data.length === 2 ? data[1] : input;
		}
		return this.instance.loadAsync(input, {
			base64: encoding === "base64"
		});
	}

	/**
	 * Load and Open an archive
	 * @param {string} zipUrl
	 * @param {boolean} [isBase64] tells JSZip if the input data is base64 encoded
	 * @returns {Promise<any>} zipfile
	 */
	async openUrl(zipUrl, isBase64) {

		return request(zipUrl, "binary").then((data) => {
			return this.instance.loadAsync(data, {
				base64: isBase64
			});
		});
	}

	/**
	 * Get entry from Archive
	 * @param {string} url 
	 * @returns {object} entry
	 * @private
	 */
	get(url) {

		const name = window.decodeURIComponent(url.substring(1));
		return this.instance.file(name);
	}

	/**
	 * Get a Blob from Archive by URL
	 * @param {string} url
	 * @param {string} [mimeType]
	 * @returns {Promise<Blob|null>}
	 * @override
	 */
	async getBlob(url, mimeType) {

		const entry = this.get(url);

		if (entry) {
			const type = mimeType || mime.lookup(entry.name);
			return entry.async("uint8array").then((data) => {
				return new Blob([data], { type });
			});
		} else {
			return new Promise((resolve) => {
				resolve(null);
			});
		}
	}

	/**
	 * Get Text from Archive by URL
	 * @param {string} url
	 * @returns {Promise<string|null>}
	 * @override
	 */
	async getText(url) {

		const entry = this.get(url);

		if (entry) {
			return entry.async("string").then((text) => {
				return text;
			});
		} else {
			return new Promise((resolve) => {
				resolve(null);
			});
		}
	}

	/**
	 * Get a base64 encoded result from Archive by URL
	 * @param {string} url
	 * @param {string} [mimeType]
	 * @returns {Promise<string|null>} base64 encoded
	 * @override
	 */
	async getBase64(url, mimeType) {

		const entry = this.get(url);

		if (entry) {
			const type = mimeType || mime.lookup(entry.name);
			return entry.async("base64").then((data) => {
				return "data:" + type + ";base64," + data;
			});
		} else {
			return new Promise((resolve) => {
				resolve(null);
			});
		}
	}
}

export default Archive;