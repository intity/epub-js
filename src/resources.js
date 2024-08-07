import { substitute } from "./utils/replacements";
import {
	createBase64Url,
	createBlobUrl,
	blob2base64
} from "./utils/core";
import Url from "./utils/url";
import mime from "./utils/mime";
import Path from "./utils/path";

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
		this.request = request;
		this.resolve = resolve;
		this.replacements = replacements || null;
	}

	/**
	 * Create a new CSS file with the replaced URLs
	 * @param {string} href the original css file
	 * @param {Archive} [archive]
	 * @return {Promise<string>} returns a BlobUrl to the new CSS file or a data url
	 * @private
	 */
	async createCss(href, archive) {
		
		let path = new Path(href);
		if (path.isAbsolute(path.toString())) {
			return new Promise((resolve) => {
				resolve(href);
			});
		}

		const uri = this.resolve(href); // absolute path

		let response;
		if (archive) {
			response = archive.getText(uri);
		} else {
			response = this.request(uri, "text");
		}

		if (!response) {
			// file not found, don't replace
			return new Promise((resolve) => {
				resolve(href);
			});
		}

		return response.then((text) => {
			let url;
			if (this.replacements === "base64") {
				url = createBase64Url(text, "text/css");
			} else {
				url = createBlobUrl(text, "text/css");
			}
			return url;
		});
	}

	/**
	 * Create a url to a resource
	 * @param {string} href
	 * @param {Archive} [archive]
	 * @return {Promise<string>} Promise resolves with url string
	 * @private
	 */
	async createUrl(href, archive) {
		
		const uri = this.resolve(href); // absolute path
		const url = new Url(uri);
		const mimeType = mime.lookup(url.filename);
		const base64 = this.replacements === "base64";

		if (archive) {
			return archive.createUrl(uri, { base64 });
		} else if (base64) {
			return this.request(uri, "blob").then((blob) => {
				return blob2base64(blob);
			});
		} else {
			return this.request(uri, "blob").then((blob) => {
				return createBlobUrl(blob, mimeType);
			});
		}
	}

	/**
	 * Replace url to blobUrl or base64
	 * @param {object} item manifest item
	 * @param {Archive} [archive]
	 * @returns {Promise<string>}
	 * @private
	 */
	async replace(item, archive) {

		if (item.type === "text/css") {
			return this.createCss(item.href, archive).then((url) => {
				this.set(item.href, url);
				return url;
			});
		} else {
			return this.createUrl(item.href, archive).then((url) => {
				this.set(item.href, url);
				return url;
			});
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
			[...this.keys()],
			[...this.values()]
		);
	}

	/**
	 * Unpack resources from manifest
	 * @param {Manifest} manifest
	 * @param {Archive} [archive]
	 * @returns {Promise<Resources>}
	 */
	async unpack(manifest, archive) {

		if (this.replacements === null) {
			this.replacements = archive ? "blobUrl" : null;
		}
		
		const tasks = [];

		manifest.forEach((item, key) => {
			if (item.type === "application/xhtml+xml" ||
				item.type === "text/html") {
				//...
			} else if (this.replacements) {
				tasks.push(this.replace(item, archive));
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
		this.replacements = undefined;
	}
}

export default Resources;