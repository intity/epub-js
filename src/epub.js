import Book from "./book";
import Rendition from "./rendition";
import EpubCFI from "./epubcfi";
import Contents from "./contents";
import * as utils from "./utils/core";
import { EPUBJS_VERSION } from "./utils/constants";

import IframeView from "./managers/views/iframe";
import DefaultViewManager from "./managers/default";
import ContinuousViewManager from "./managers/continuous";

/**
 * Create a new Book instance
 * @param {string|ArrayBuffer} inpit URL, Path or ArrayBuffer
 * @param {object} [options] to pass to the book
 * @returns {Book} a new Book object
 * @example ePub()
 * @example ePub("/path/to/book/")
 * @example ePub("/path/to/book/", { replacements: "blobUrl", store: "epub-js" })
 * @example ePub("/path/to/book.epub")
 * @example ePub("https://example.com/to/book.epub")
 */
function ePub(inpit, options) {

	return new Book(inpit, options);
}

ePub.VERSION = EPUBJS_VERSION;

if (typeof(global) !== "undefined") {
	global.EPUBJS_VERSION = EPUBJS_VERSION;
}

ePub.Book = Book;
ePub.Rendition = Rendition;
ePub.Contents = Contents;
ePub.EpubCFI = EpubCFI;
ePub.utils = utils;

export default ePub;