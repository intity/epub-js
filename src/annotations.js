import Annotation from "./annotation";

/**
 * Handles managing adding & removing Annotations
 */
class Annotations extends Map {
	/**
	 * Constructor
	 * @param {Rendition} rendition
	 */
	constructor(rendition) {

		super();
		this.rendition = rendition;
		this.rendition.hooks.render.register(this.inject.bind(this));
		this.rendition.hooks.unloaded.register(this.reject.bind(this));
	}

	/**
	 * Append an annotation to store
	 * @param {string} type Type of annotation to append: `"highlight"` OR `"underline"`
	 * @param {string} cfiRange EpubCFI range to attach annotation to
	 * @param {object} [options]
	 * @param {object} [options.data] Data to assign to annotation
	 * @param {Function} [options.cb] Callback after annotation is added
	 * @param {string} [options.className] CSS class to assign to annotation
	 * @param {object} [options.styles] CSS styles to assign to annotation
	 * @returns {Annotation} Annotation that was append
	 */
	append(type, cfiRange, options) {

		const key = encodeURI(type + ":" + cfiRange);
		const annotation = new Annotation(type, cfiRange, options);

		this.rendition.views().forEach((view) => {
			const index = view.section.index;
			if (annotation.sectionIndex === index) {
				annotation.attach(view);
			}
		});

		this.set(key, annotation);
		return annotation;
	}

	/**
	 * Remove an annotation from store
	 * @param {string} type Type of annotation to remove: `"highlight"` OR `"underline"`
	 * @param {string} cfiRange EpubCFI range to attach annotation to
	 */
	remove(type, cfiRange) {

		const key = encodeURI(type + ":" + cfiRange);
		const annotation = this.get(key);

		if (annotation) {
			this.rendition.views().forEach((view) => {
				const index = view.section.index;
				if (annotation.sectionIndex === index) {
					annotation.detach(view);
				}
			});
			this.delete(key);
		}
	}

	/**
	 * Hook for injecting annotation into a view
	 * @param {View} view
	 * @private
	 */
	inject(view) {

		const index = view.section.index;
		this.forEach((note, key) => {
			if (note.sectionIndex === index) {
				note.attach(view);
			}
		});
	}

	/**
	 * Hook for removing annotation from a view
	 * @param {View} view
	 * @private
	 */
	reject(view) {

		const index = view.section.index;
		this.forEach((note, key) => {
			if (note.sectionIndex === index) {
				note.detach(view);
			}
		});
	}

	/**
	 * [Not Implemented] Show annotations
	 * @TODO: needs implementation in View
	 */
	show() { }

	/**
	 * [Not Implemented] Hide annotations
	 * @TODO: needs implementation in View
	 */
	hide() { }
}

export default Annotations;