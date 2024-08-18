import Metadata from "./packaging/metadata";
import Manifest from "./packaging/manifest";
import Spine from "./packaging/spine";
import { qs } from "./utils/core";

/**
 * Open Packaging Format Parser
 */
class Packaging {
	/**
	 * Constructor
	 */
	constructor() {
		/**
		 * @member {Metadata} metadata
		 * @memberof Packaging
		 * @readonly
		 */
		this.metadata = new Metadata();
		/**
		 * @member {Manifest} manifest
		 * @memberof Packaging
		 * @readonly
		 */
		this.manifest = new Manifest();
		/**
		 * @member {Spine} spine
		 * @memberof Packaging
		 * @readonly
		 */
		this.spine = new Spine();
		/**
		 * @member {string} direction
		 * @memberof Packaging
		 * @readonly
		 */
		this.direction = null;
		/**
		 * @member {string} version Package version
		 * @memberof Packaging
		 * @readonly
		 */
		this.version = null;
		/**
		 * @member {string} uniqueIdentifier
		 * @memberof Packaging
		 * @readonly
		 */
		this.uniqueIdentifier = null;
	}

	/**
	 * Clear packaging parts
	 */
	clear() {

		this.metadata.clear();
		this.manifest.clear();
		this.spine.clear();
		this.direction = null;
		this.version = null;
		this.uniqueIdentifier = null;
	}

	/**
	 * Parse OPF XML
	 * @param {Document} packageXml OPF XML
	 * @return {Promise<Packaging>}
	 */
	async parse(packageXml) {

		if (!packageXml) {
			throw new Error("Package File Not Found");
		}

		const metadataNode = qs(packageXml, "metadata");
		if (!metadataNode) {
			throw new Error("No Metadata Found");
		}

		const manifestNode = qs(packageXml, "manifest");
		if (!manifestNode) {
			throw new Error("No Manifest Found");
		}

		const spineNode = qs(packageXml, "spine");
		if (!spineNode) {
			throw new Error("No Spine Found");
		}

		const tasks = [];
		tasks.push(this.metadata.parse(metadataNode));
		tasks.push(this.manifest.parse(manifestNode));
		tasks.push(this.spine.parse(spineNode));
		this.direction = this.parseDirection(packageXml, spineNode);
		this.version = this.parseVersion(packageXml);
		this.uniqueIdentifier = this.metadata.get("identifier");
		if (typeof this.uniqueIdentifier === "undefined") {
			this.uniqueIdentifier = this.findUniqueIdentifier(packageXml);
		}

		return Promise.all(tasks).then(() => {
			return this;
		});
	}

	/**
	 * Parse direction flow
	 * @param {Document} packageXml
	 * @param {Node} node spine node 
	 * @returns {string}
	 * @private
	 */
	parseDirection(packageXml, node) {

		const el = packageXml.documentElement;
		let dir = el.getAttribute("dir");
		if (dir === null) {
			dir = node.getAttribute("page-progression-direction");
		}
		return dir || "";
	}

	/**
	 * Parse package version
	 * @param {Document} packageXml 
	 * @returns {string}
	 * @private
	 */
	parseVersion(packageXml) {

		const el = packageXml.documentElement;
		return el.getAttribute("version") || "";
	}

	/**
	 * Find Unique Identifier
	 * @param {Document} packageXml
	 * @return {string} Unique Identifier text
	 * @private
	 */
	findUniqueIdentifier(packageXml) {

		const el = packageXml.documentElement;
		const uniqueIdentifier = el.getAttribute("unique-identifier");
		if (!uniqueIdentifier) {
			return "";
		}

		const identifier = packageXml.getElementById(uniqueIdentifier);
		if (!identifier) {
			return "";
		}

		if (identifier.localName === "identifier" &&
			identifier.namespaceURI === "http://purl.org/dc/elements/1.1/") {
			return identifier.childNodes.length > 0 ? identifier.childNodes[0].nodeValue.trim() : "";
		}

		return "";
	}

	/**
	 * Load package from JSON
	 * @param {object} data Serialized JSON object data
	 * @return {Promise<Packaging>}
	 */
	async load(data) {

		const tasks = [];
		tasks.push(this.metadata.load(data.metadata));
		tasks.push(this.manifest.load(data.manifest));
		tasks.push(this.spine.load(data.spine));
		this.direction = data.direction;
		this.version = data.version;
		this.uniqueIdentifier = this.metadata.get("identifier");

		return Promise.all(tasks).then(() => {
			return this;
		});
	}

	/**
	 * destroy
	 */
	destroy() {

		this.metadata.destroy();
		this.manifest.destroy();
		this.spine.destroy();

		this.metadata = undefined;
		this.manifest = undefined;
		this.spine = undefined;
		this.direction = undefined;
		this.version = undefined;
		this.uniqueIdentifier = undefined;
	}
}

export default Packaging;