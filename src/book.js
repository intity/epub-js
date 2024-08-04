import EventEmitter from "event-emitter";
import { extend } from "./utils/core";
import Defer from "./utils/defer";
import Url from "./utils/url";
import Path from "./utils/path";
import Locations from "./locations";
import Container from "./container";
import Packaging from "./packaging";
import Navigation from "./navigation";
import Resources from "./resources";
import Rendition from "./rendition";
import Archive from "./archive";
import request from "./utils/request";
import EpubCFI from "./epubcfi";
import Storage from "./storage";
import { EPUBJS_VERSION, EVENTS } from "./utils/constants";
import Sections from "./sections";

const CONTAINER_PATH = "META-INF/container.xml";
const INPUT_TYPE = {
	BINARY: "binary",
	BASE64: "base64",
	EPUB: "epub",
	OPF: "opf",
	MANIFEST: "json",
	DIRECTORY: "directory"
};

/**
 * An Epub representation with methods for the loading, 
 * parsing and manipulation of its contents.
 * @class
 * @param {string|ArrayBuffer} [uri]
 * @param {object} [options]
 * @param {object} [options.request] object options to xhr request
 * @param {Function} [options.request.method=null] a request function to use instead of the default
 * @param {boolean} [options.request.withCredentials=false] send the xhr request withCredentials
 * @param {string[]} [options.request.headers=[]] send the xhr request headers
 * @param {string} [options.encoding='binary'] optional to pass `"binary"` or `"base64"` for archived Epubs
 * @param {string} [options.replacements=null] use `"base64"` or `"blobUrl"` for replacing assets
 * @param {Function} [options.canonical] optional function to determine canonical urls for a path
 * @param {string} [options.openAs] input type: `"binary"` OR `"base64"` OR `"epub"` OR `"opf"` OR `"json"` OR `"directory"`
 * @param {string} [options.store=false] cache the contents in local storage, value should be the name of the reader
 * @returns {Book}
 * @example new Book("/path/to/book/")
 * @example new Book("/path/to/book/", { replacements: "blobUrl" })
 * @example new Book("/path/to/book.epub")
 * @example new Book("/path/to/book.epub", { replacements: "base64" })
 */
class Book {
	constructor(uri, options) {
		// Allow passing just options to the Book
		if (typeof (options) === "undefined" &&
			typeof (uri) !== "string" &&
			uri instanceof Blob === false &&
			uri instanceof ArrayBuffer === false) {
			options = uri;
			uri = undefined;
		}

		this.settings = extend({
			request: {
				method: null,
				withCredentials: false,
				headers: []
			},
			encoding: undefined,
			replacements: null,
			canonical: undefined,
			openAs: undefined,
			store: undefined
		}, options || {});

		this.opening = new Defer(); // Promises
		/**
		 * @member {Promise<any>} opened returns after the book is loaded
		 * @memberof Book
		 * @readonly
		 */
		this.opened = this.opening.promise;
		/**
		 * @member {boolean} isOpen
		 * @memberof Book
		 * @readonly
		 */
		this.isOpen = false;

		this.loading = {
			cover: new Defer(),
			sections: new Defer(),
			navigation: new Defer(),
			packaging: new Defer(),
			resources: new Defer(),
			storage: new Defer()
		};

		this.loaded = {
			cover: this.loading.cover.promise,
			sections: this.loading.sections.promise,
			navigation: this.loading.navigation.promise,
			packaging: this.loading.packaging.promise,
			resources: this.loading.resources.promise,
			storage: this.loading.storage.promise
		};
		/**
		 * @member {Promise<any>} ready returns after the book is loaded and parsed
		 * @memberof Book
		 * @readonly
		 */
		this.ready = Promise.all([
			this.loaded.cover,
			this.loaded.sections,
			this.loaded.navigation,
			this.loaded.packaging,
			this.loaded.resources,
			this.loaded.storage
		]);
		/**
		 * Queue for methods used before opening
		 * @member {boolean} isRendered
		 * @memberof Book
		 * @readonly
		 */
		this.isRendered = false;
		/**
		 * @member {Function} request
		 * @memberof Book
		 * @readonly
		 */
		this.request = this.settings.request.method || request;
		/**
		 * @member {Navigation} navigation
		 * @memberof Book
		 * @readonly
		 */
		this.navigation = new Navigation();
		/**
		 * @member {Url} url
		 * @memberof Book
		 * @readonly
		 */
		this.url = undefined;
		/**
		 * @member {Path} path
		 * @memberof Book
		 * @readonly
		 */
		this.path = undefined;
		/**
		 * @member {boolean} archived
		 * @memberof Book
		 * @readonly
		 */
		this.archived = false;
		/**
		 * @member {Archive} archive
		 * @memberof Book
		 * @private
		 */
		this.archive = undefined;
		/**
		 * @member {Storage} storage
		 * @memberof Book
		 * @readonly
		 */
		this.storage = new Storage(this.settings.store);
		/**
		 * @member {Resources} resources
		 * @memberof Book
		 * @readonly
		 */
		this.resources = new Resources(
			this.request.bind(this),
			this.resolve.bind(this),
			this.settings.replacements
		);
		/**
		 * @member {Rendition} rendition
		 * @memberof Book
		 * @readonly
		 */
		this.rendition = undefined;
		/**
		 * @member {Container} container
		 * @memberof Book
		 * @readonly
		 */
		this.container = new Container();
		/**
		 * @member {Packaging} packaging
		 * @memberof Book
		 * @readonly
		 */
		this.packaging = new Packaging();
		/**
		 * @member {Sections} sections
		 * @memberof Book
		 * @readonly
		 */
		this.sections = new Sections();
		/**
		 * @member {Locations} locations
		 * @memberof Book
		 * @readonly
		 */
		this.locations = new Locations(
			this.sections,
			this.load.bind(this)
		);

		if (this.settings.store) {
			this.storage.createInstance();
		}

		if (uri) {
			this.open(uri, this.settings.openAs).catch((error) => {
				/**
				 * @event openFailed
				 * @param {object} error
				 * @memberof Book
				 */
				this.emit(EVENTS.BOOK.OPEN_FAILED, error);
			});
		}
	}

	/**
	 * Clear parts
	 */
	clear() {

		this.url = undefined;
		this.path = undefined;
		this.container.clear();
		this.cover = null;
		this.packaging.clear();
		this.resources.clear();
		this.sections.clear();
		this.navigation.clear();
		this.locations.clear();
	}

	/**
	 * Open a epub or url
	 * @param {string|ArrayBuffer} input Url, Path or ArrayBuffer
	 * @param {string} [openAs] 
	 * @returns {Promise<any>} of when the book has been loaded
	 * @example book.open("/path/to/book/")
	 * @example book.open("/path/to/book/OPS/package.opf")
	 * @example book.open("/path/to/book.epub")
	 * @example book.open("https://example.com/book/")
	 * @example book.open("https://example.com/book/OPS/package.opf")
	 * @example book.open("https://example.com/book.epub")
	 * @example book.open([arraybuffer], "binary")
	 */
	async open(input, openAs) {

		let opening;
		const type = openAs || this.determineType(input);

		if (this.settings.store) {
			this.store(input);
		}

		if (type === INPUT_TYPE.BINARY) {
			this.archived = true;
			this.url = new Url("/", "");
			opening = this.openEpub(input);
		} else if (type === INPUT_TYPE.BASE64) {
			this.archived = true;
			this.url = new Url("/", "");
			opening = this.openEpub(input, type);
		} else if (type === INPUT_TYPE.EPUB) {
			this.archived = true;
			this.url = new Url("/", "");
			opening = this.request(input, "binary",
				this.settings.request.withCredentials,
				this.settings.request.headers
			).then(this.openEpub.bind(this));
		} else if (type === INPUT_TYPE.OPF) {
			this.url = new Url(input);
			const uri = this.url.path.toString();
			opening = this.openPackaging(uri);
		} else if (type === INPUT_TYPE.MANIFEST) {
			this.url = new Url(input);
			const uri = this.url.path.toString();
			opening = this.openManifest(uri);
		} else if (type === INPUT_TYPE.DIRECTORY) {
			this.url = new Url(input);
			opening = this.openDirectory();
		}

		return opening;
	}

	/**
	 * Open an archived epub
	 * @param {string|ArrayBuffer} input
	 * @param {string} [encoding] input type: `"base64"`
	 * @returns {Promise<any>}
	 * @private
	 */
	async openEpub(input, encoding) {

		const type = encoding || this.settings.encoding;

		return this.unarchive(input, type).then(() => {
			return this.openContainer(CONTAINER_PATH);
		}).then((url) => {
			return this.openPackaging(url);
		});
	}

	/**
	 * Open the epub container
	 * @param {string} url
	 * @returns {Promise<string>}
	 * @private
	 */
	async openContainer(url) {
		
		return this.load(url).then((xml) => {
			return this.container.parse(xml);
		}).then((container) => {
			return this.resolve(container.fullPath);
		});
	}

	/**
	 * Open the package.opf
	 * @param {string} url
	 * @returns {Promise<any>}
	 * @private
	 */
	async openPackaging(url) {

		this.path = new Path(url);
		return this.load(url).then((xml) => {
			return this.packaging.parse(xml);
		}).then(() => {
			return this.unpack();
		});
	}

	/**
	 * Open the manifest JSON
	 * @param {string} url
	 * @returns {Promise<any>}
	 * @private
	 */
	async openManifest(url) {

		this.path = new Path(url);
		return this.load(url).then((json) => {
			return this.packaging.load(json);
		}).then(() => {
			return this.unpack();
		});
	}

	/**
	 * Open book from directory
	 * @returns {Promise<any>}
	 * @private
	 */
	async openDirectory() {

		return this.openContainer(CONTAINER_PATH).then((url) => {
			return this.openPackaging(url);
		});
	}

	/**
	 * Load a resource from the Book
	 * @param {string} path path to the resource to load
	 * @param {string} [type=null] 
	 * @returns {Promise<any>} returns a promise with the requested resource
	 */
	load(path, type = null) {

		const resolved = this.resolve(path);

		if (this.archived) {
			return this.archive.request(resolved);
		} else {
			return this.request(resolved, type,
				this.settings.request.withCredentials,
				this.settings.request.headers);
		}
	}

	/**
	 * Resolve a path to it's absolute position in the Book
	 * @param {string} path
	 * @param {boolean} [absolute=false] force resolving the full URL
	 * @returns {string} the resolved path string
	 */
	resolve(path, absolute = false) {

		if (!path) return;

		if (path.indexOf("://") > -1) {
			return path; // is absolute
		}

		let resolved = path;
		if (this.path) {
			resolved = this.path.resolve(this.path.directory, path);
		}

		if (absolute === false && this.url) {
			resolved = this.url.resolve(resolved);
		}

		return resolved;
	}

	/**
	 * Get a canonical link to a path
	 * @param {string} path
	 * @returns {string} the canonical path string
	 */
	canonical(path) {

		if (!path) return "";

		let url;
		if (this.settings.canonical) {
			url = this.settings.canonical(path);
		} else {
			url = this.resolve(path, true);
		}

		return url;
	}

	/**
	 * Determine the type of they input passed to open
	 * @param {string} input
	 * @returns {string} values: `"binary"` OR `"directory"` OR `"epub"` OR `"opf"`
	 * @private
	 */
	determineType(input) {

		if (this.settings.encoding === "base64") {
			return INPUT_TYPE.BASE64;
		}

		if (typeof (input) !== "string") {
			return INPUT_TYPE.BINARY;
		}

		const path = new Url(input).path;

		let extension = path.extension;
		// If there's a search string, remove it before determining type
		if (extension) {
			extension = extension.replace(/\?.*$/, "");
		}

		if (!extension) {
			return INPUT_TYPE.DIRECTORY;
		}

		if (extension === "epub") {
			return INPUT_TYPE.EPUB;
		}

		if (extension === "opf") {
			return INPUT_TYPE.OPF;
		}

		if (extension === "json") {
			return INPUT_TYPE.MANIFEST;
		}
	}

	/**
	 * Unpack the contents of the book packaging
	 * @private
	 */
	async unpack() {

		this.loading.packaging.resolve(this.packaging);
		this.resources.unpack(
			this.packaging.manifest,
			this.archive
		).then((resources) => {
			this.loading.resources.resolve(resources);
		});
		this.sections.unpack(
			this.packaging,
			this.resolve.bind(this),
			this.canonical.bind(this)
		).then((sections) => {
			this.loading.sections.resolve(sections);
		});
		this.loadNavigation().then((navigation) => {
			this.loading.navigation.resolve(navigation);
		});

		if (this.settings.store && this.storage.online && !this.archived) {
			this.storage.unpack(
				this.packaging.spine,
				this.resolve.bind(this)
			).then((storage) => {
				this.loading.storage.resolve(storage);
			});
		} else {
			this.loading.storage.resolve(this.storage);
		}

		if (this.resources.replacements) {
			this.sections.hooks.serialize.register(
				this.resources.substitute.bind(this.resources)
			);
		}

		if (this.packaging.manifest.coverPath) {
			this.cover = this.resolve(this.packaging.manifest.coverPath);
		}

		this.loading.cover.resolve(this.cover);
		this.ready.then(() => {
			this.isOpen = true;
			this.opening.resolve(this);
		});
	}

	/**
	 * Load navigation
	 * @returns {Promise<Navigation>}
	 * @private
	 */
	async loadNavigation() {

		const navPath = this.packaging.manifest.navPath;

		if (navPath) {
			return this.load(navPath).then((target) => {
				return this.navigation.parse(target);
			}).then(() => {
				return this.navigation;
			});
		} else {
			return new Promise((resolve) => {
				resolve(this.navigation);
			});
		}
	}

	/**
	 * Gets a Section of the Book from the Spine
	 * Alias for `book.sections.get`
	 * @param {string|number} [target]
	 * @returns {Section|null}
	 * @example book.section()
	 * @example book.section(3)
	 * @example book.section("#chapter_001")
	 * @example book.section("chapter_001.xhtml")
	 * @example book.section("epubcfi(/6/8!/4/2/16/1:0)")
	 */
	section(target) {

		return this.sections.get(target);
	}

	/**
	 * Sugar to render a book to an element
	 * @param {Element|string} element element or string to add a rendition to
	 * @param {object} [options]
	 * @returns {Rendition}
	 */
	renderTo(element, options) {

		const method = "blobUrl";

		if (this.settings.replacements === method) {
			options = extend({ method }, options || {})
		}
		this.rendition = new Rendition(this, options);
		this.rendition.attachTo(element);

		return this.rendition;
	}

	/**
	 * Set if request should use withCredentials
	 * @param {boolean} credentials
	 */
	setRequestCredentials(credentials) {

		this.settings.request.withCredentials = credentials;
	}

	/**
	 * Set headers request should use
	 * @param {string[]} headers
	 */
	setRequestHeaders(headers) {

		this.settings.request.headers = headers;
	}

	/**
	 * Unarchive a zipped epub
	 * @param {string|ArrayBuffer} input url string or arraybuffer data
	 * @param {string} [encoding] input type: `"base64"`
	 * @returns {Promise<any>}
	 * @private
	 */
	unarchive(input, encoding) {

		this.archive = new Archive();
		return this.archive.open(input, encoding);
	}

	/**
	 * Storage configure
	 * @param {string|ArrayBuffer} input
	 * @private
	 */
	store(input) {
		
		if (typeof input === "string") {
			//-- replace request method to go through store
			this.request = this.storage.dispatch.bind(this.storage);
		}
	}

	/**
	 * Get the cover url
	 * @returns {Promise<string>} coverUrl
	 */
	async coverUrl() {

		return this.loaded.cover.then(() => {

			if (!this.cover) {
				return null;
			}

			if (this.archived) {
				return this.archive.createUrl(this.cover);
			} else {
				return this.cover;
			}
		});
	}

	/**
	 * Find a DOM Range for a given CFI Range
	 * @param {EpubCFI} cfiRange a epub cfi range
	 * @returns {Promise<Range>}
	 */
	async getRange(cfiRange) {

		const cfi = new EpubCFI(cfiRange);
		const item = this.sections.get(cfi.spinePos);
		const request = this.load.bind(this);
		if (!item) {
			return new Promise((resolve, reject) => {
				reject(new Error("CFI could not be found"));
			});
		}
		return item.load(request).then((contents) => {
			const range = cfi.toRange(item.document);
			return range;
		});
	}

	/**
	 * Generates the Book Key using the identifier in the manifest or other string provided
	 * @param {string} [identifier] to use instead of metadata identifier
	 * @returns {string} key
	 */
	key(identifier) {

		const ident = identifier ||
			this.packaging.metadata.get("identifier") ||
			this.url.filename;
		return `epubjs:${EPUBJS_VERSION}:${ident}`;
	}

	/**
	 * Destroy the Book and all associated objects
	 */
	destroy() {

		this.opened = undefined;
		this.loading = undefined;
		this.loaded = undefined;
		this.ready = undefined;

		this.isOpen = false;
		this.isRendered = false;

		this.archive && this.archive.destroy();
		this.locations && this.locations.destroy();
		this.resources && this.resources.destroy();
		this.container && this.container.destroy();
		this.packaging && this.packaging.destroy();
		this.rendition && this.rendition.destroy();

		this.archive = undefined;
		this.locations = undefined;
		this.resources = undefined;
		this.container = undefined;
		this.packaging = undefined;
		this.rendition = undefined;

		this.navigation.destroy();
		this.navigation = undefined;
		this.url = undefined;
		this.path = undefined;
		this.archived = false;
	}
}

EventEmitter(Book.prototype);

export default Book;