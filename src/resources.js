import { substitute } from "./utils/replacements";
import {
	blob2base64,
	createBlobUrl
} from "./utils/core";
import Url from "./utils/url";
import mime from "./utils/mime";

const _URL = window.URL || window.webkitURL || window.mozURL;

/**
 * Assets container for URL replacements
 * @extends {Map}
 */
class Resources extends Map {
	/**
	 * Constructor
	 * @param {Function} request
	 * @param {Function} resolve
	 * @param {string} [replacements=null]
	 */
	constructor(request, resolve, replacements) {

		super();
		this.archive = undefined;
		this.storage = undefined;
		this.request = request;
		this.resolve = resolve;
		this.replacements = replacements || null;
	}

	/**
	 * Clear replacement URLs
	 * @override
	 */
	clear() {

		if (this.replacements === "blobUrl") {
			this.forEach((value, key) => {
				_URL.revokeObjectURL(value);
			});
		}
		super.clear();
	}

	/**
	 * Create a url to a resource
	 * @param {string} href
	 * @param {string} [mimeType]
	 * @return {Promise<string>} Promise resolves with url string
	 */
	async createUrl(href, mimeType) {

		const uri = this.resolve(href); // absolute path
		const url = new Url(uri);
		const base64 = this.replacements === "base64";

		if (this.archive) {
			const type = base64 ? "base64" : "blob";
			return this.archive.request(uri, type).then((data) => {
				return base64 ? data : _URL.createObjectURL(data);
			});
		} else if (base64) {
			return this.request(uri, "blob").then((blob) => {
				return blob2base64(blob);
			});
		} else {
			return this.request(uri, "blob").then((blob) => {
				const type = mimeType || mime.lookup(url.filename);
				return createBlobUrl(blob, type);
			});
		}
	}

	/**
	 * Revoke URL for a resource item
	 * @param {string} url 
	 */
	revokeUrl(url) {

		if (this.replacements === "blobUrl") {
			const blobUrl = this.get(url);
			if (blobUrl) {
				_URL.revokeObjectURL(blobUrl);
			}
		}
	}

	/**
	 * Substitute urls in content, with replacements,
	 * relative to a url if provided
	 * @param {string} content
	 * @param {Section} section
	 */
	substitute(content, section) {

		section.output = substitute(
			content,
			section,
			[...this.keys()],
			[...this.values()]
		);
	}

	/**
	 * Unpack resources from manifest
	 * @param {Manifest} manifest
	 * @param {Archive} archive
	 * @param {Storage} storage
	 * @returns {Promise<Resources>}
	 */
	async unpack(manifest, archive, storage) {

		this.archive = archive;
		this.storage = storage;

		if (this.replacements === null) {
			this.replacements = (archive || storage.name) ? "blobUrl" : null;
		}

		const tasks = [];

		manifest.forEach((item, key) => {
			if (item["media-type"] === "application/xhtml+xml" ||
				item["media-type"] === "text/html") {
				if (storage.name && !archive) {
					tasks.push(storage.put(this.resolve(item.href)));
				}
			} else if (this.replacements) {
				const task = this.createUrl(item.href, item["media-type"]).then((url) => {
					this.set(item.href, url);
					return url;
				});
				tasks.push(task);
			} else {
				this.set(item.href, null);
			}
		});

		return Promise.all(tasks).then(() => {
			return this;
		});
	}

	/**
	 * destroy
	 */
	destroy() {

		this.clear();
		this.archive = undefined;
		this.storage = undefined;
		this.request = undefined;
		this.resolve = undefined;
		this.replacements = undefined;
	}
}

export default Resources;