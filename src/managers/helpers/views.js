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
		this.container = document.createElement("div");
		this.container.classList.add("views-container");
		this.container.style.display = "flex";
		this.container.style.width = "100%";
		this.container.style.height = "100%";
		/**
		 * @member {boolean} hidden
		 * @memberof Views
		 * @readonly
		 */
		this.hidden = false;
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

		this.container.appendChild(view.element);
		this.push(view);
		return view;
	}

	/**
	 * prepend
	 * @param {object} view 
	 * @returns {object} view
	 */
	prepend(view) {

		this.container.insertBefore(view.element, this.container.firstChild);
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
			this.container.insertBefore(view.element, children[index]);
		} else {
			this.container.appendChild(view.element);
		}
		this.splice(index, 0, view);
		return view;
	}

	/**
	 * remove
	 * @param {object} view 
	 */
	remove(view) {

		const index = this.indexOf(view);
		if (index > -1) {
			this.splice(index, 1);
		}
		this.destroy(view);
	}

	/**
	 * destroy
	 * @param {object} view 
	 */
	destroy(view) {

		if (view.displayed) {
			view.destroy();
		}
		this.container.removeChild(view.element);
	}

	/**
	 * clear
	 * @returns {void}
	 */
	clear() {

		if (this.length === 0) return;
		for (let i = 0; i < this.length; i++) {
			const view = this[i];
			this.destroy(view);
		}
		this.splice(0);
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
		this.hidden = false;
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
		this.hidden = true;
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
}

export default Views;