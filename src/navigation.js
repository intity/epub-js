import Landmarks from "./landmarks";
import PageList from "./pagelist";
import Toc from "./toc";

/**
 * Navigation Parser
 */
class Navigation {
	/**
	 * Constructor
	 * @param {Document|object} target navigation html OR xhtml OR ncx OR json
	 */
	constructor(target) {
		/**
		 * Landmarks
		 * @member {Landmarks} landmarks
		 * @memberof Navigation
		 * @readonly
		 */
		this.landmarks = new Landmarks(target);
		/**
		 * List of numbered pages
		 * @member {PageList} pageList
		 * @memberof Navigation
		 * @readonly
		 */
		this.pageList = new PageList(target);
		/**
		 * Table of Contents
		 * @member {Toc} toc
		 * @memberof Navigation
		 * @readonly
		 */
		this.toc = new Toc(target);
	}

	/**
	 * forEach pass through
	 * @param {IArguments} args
	 */
	forEach(...args) {

		this.toc.forEach(...args);
	}

	/**
	 * destroy
	 */
	destroy() {

		this.landmarks.destroy();
		this.landmarks = undefined;
		this.pageList.destroy();
		this.pageList = undefined;
		this.toc.destroy();
		this.toc = undefined;
	}
}

export default Navigation;