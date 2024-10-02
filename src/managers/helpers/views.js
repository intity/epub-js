/**
 * Views
 */
class Views extends Array {
	/**
	 * Constructor
	 */
	constructor() {

		super();
		/**
		 * @member {Element} container
		 * @memberof Views
		 * @readonly
		 */
		this.container = null;
		this.init();
	}

	init() {

		this.container = document.createElement("div");
		this.container.classList.add("views-container");
		this.container.style.display = "flex";
		this.container.style.width = "100%";
		this.container.style.height = "100%";
	}

	/**
	 * first
	 * @returns {object} view
	 */
	first() {

		return this[0];
	}

	/**
	 * last
	 * @returns {object} view
	 */
	last() {

		return this[this.length - 1];
	}

	/**
	 * get
	 * @param {number} i index
	 * @returns {object} view
	 */
	get(i) {

		return this[i];
	}

	/**
	 * append
	 * @param {object} view 
	 * @returns {object} view
	 */
	append(view) {

		this.container.appendChild(view.container);
		this.push(view);
		return view;
	}

	/**
	 * prepend
	 * @param {object} view 
	 * @returns {object} view
	 */
	prepend(view) {

		this.container.insertBefore(view.container, this.container.firstChild);
		this.unshift(view);
		return view;
	}

	/**
	 * insert
	 * @param {object} view 
	 * @param {number} index 
	 * @returns {object} view
	 */
	insert(view, index) {

		const children = this.container.children;
		if (index < children.length) {
			this.container.insertBefore(view.container, children[index]);
		} else {
			this.container.appendChild(view.container);
		}
		this.splice(index, 0, view);
		return view;
	}

	/**
	 * remove
	 * @param {object} view 
	 * @param {number} [i] index
	 */
	remove(view, i) {
		
		const index = i || this.indexOf(view);
		if (index > -1) {
			this.container.removeChild(view.container);
			this.splice(index, 1);
			view.destroy();
		}
	}

	/**
	 * clear
	 */
	clear() {

		const len = this.length;

		for (let i = 0; i < len; ++i) {
			const view = this[i];
			this.remove(view, i);
		}
	}

	/**
	 * find
	 * @param {Section} section 
	 * @returns {object} view
	 */
	find(section) {

		for (let i = 0; i < this.length; i++) {
			const view = this[i];
			if (view.displayed &&
				view.section.index == section.index) {
				return view;
			}
		}
	}

	/**
	 * displayed
	 * @returns {object[]}
	 */
	displayed() {

		const displayed = [];
		for (let i = 0; i < this.length; i++) {
			const view = this[i];
			if (view.displayed) {
				displayed.push(view);
			}
		}
		return displayed;
	}

	/**
	 * show
	 */
	show() {

		for (let i = 0; i < this.length; i++) {
			const view = this[i];
			if (view.displayed) {
				view.show();
			}
		}
	}

	/**
	 * hide
	 */
	hide() {

		for (let i = 0; i < this.length; i++) {
			const view = this[i];
			if (view.displayed) {
				view.hide();
			}
		}
	}

	/**
	 * update
	 */
	update() {

		for (let i = 0; i < this.length; ++i) {
			const view = this[i];
			if (view.displayed) {
				view.update();
			}
		}
	}

	/**
	 * destroy
	 */
	destroy() {

		this.clear();
		this.container = undefined;
	}
}

export default Views;