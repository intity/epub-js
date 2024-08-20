import { qsa, indexOfNode } from "../utils/core";

/**
 * A collection of Spine Items
 * @extends {Map}
 */
class Spine extends Map {

	constructor() {

		super();
		/**
		 * Node index from the package.opf
		 * @member {number} nodeIndex
		 * @memberof Spine
		 * @readonly
		 */
		this.nodeIndex = 0;
	}

	/**
	 * Clear spine items
	 */
	clear() {

		super.clear();
		this.nodeIndex = 0;
	}

	/**
	 * Parse element spine
	 * @param {Node} node spine
	 * @returns {Promise<Spine>}
	 */
	parse(node) {

		const items = qsa(node, "itemref");
		items.forEach((item, index) => {

			const props = item.getAttribute("properties") || "";
			const idref = item.getAttribute("idref");
			this.set(idref, {
				id: item.getAttribute("id"),
				idref: idref,
				index: index,
				linear: item.getAttribute("linear") || "yes",
				properties: props.length ? props.split(" ") : []
			})
		});
		this.nodeIndex = indexOfNode(node, Node.ELEMENT_NODE);

		return new Promise((resolve) => {
            resolve(this);
        });
	}

	/**
	 * Load spine from JSON
	 * @param {object[]} spine 
	 * @returns {Promise<Spine>}
	 */
	load(spine) {
		
		spine.forEach((item, index) => {
			this.set(item.idref, {
				id: item.id || null,
				idref: item.idref,
				index: index,
				linear: item.linear,
				properties: item.properties
			});
		});
		this.nodeIndex = 0;

		return new Promise((resolve) => {
            resolve(this);
        });
	}

	/**
	 * destroy
	 */
	destroy() {

		this.clear();
		this.nodeIndex = undefined;
	}
}

export default Spine;