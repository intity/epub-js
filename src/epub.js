import Book from "./book";
import Rendition from "./rendition";
import EpubCFI from "./epubcfi";
import Contents from "./contents";
import * as utils from "./utils/core";
import IframeView from "./managers/views/iframe";
import InlineView from "./managers/views/inline";
import DefaultViewManager from "./managers/default";
import ContinuousViewManager from "./managers/continuous";
import { EPUBJS_VERSION } from "./utils/constants";

/**
 * Create a new Book instance
 * @param {string|ArrayBuffer} input URL, Path or ArrayBuffer
 * @param {object} [options] to pass to the book
 * @returns {Book} a new Book object
 * @example ePub()
 * @example ePub("/path/to/book/")
 * @example ePub("/path/to/book/", { replacements: "blobUrl", store: "epub-js" })
 * @example ePub("/path/to/book.epub")
 * @example ePub("https://example.com/to/book.epub")
 */
function ePub(input, options) {

	return new Book(input, options);
}

ePub.VERSION = EPUBJS_VERSION;

if (typeof (global) !== "undefined") {
	global.EPUBJS_VERSION = EPUBJS_VERSION;
}

ePub.Book = Book;
ePub.Rendition = Rendition;
ePub.Contents = Contents;
ePub.EpubCFI = EpubCFI;
ePub.manager = (t) => {
	let ret;
	switch(t)
	{
		default:
			ret = DefaultViewManager;
			break;
		case "continuous":
			ret = ContinuousViewManager;
			break;
	}
	return ret;
};
ePub.view = (t) => {
	let ret;
	switch(t)
	{
		default:
			ret = IframeView;
			break;
		case "inline":
			ret = InlineView;
			break;
	}
	return ret;
};
ePub.utils = utils;

export default ePub;