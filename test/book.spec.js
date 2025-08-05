import assert from "assert"
import Book from "../src/book"
import Container from "../src/container"
import Packaging from "../src/packaging"
import Resources from "../src/resources"
import Sections from "../src/sections"
import Storage from "../src/storage"
import Locations from "../src/locations"
import Navigation from "../src/navigation"

const ASSETRION_TYPE = {
	OPEN: "open",
	CLEAR: "clear",
	DESTROY: "destroy"
}

const url = (path) => {

	let result = location.origin
	if (/localhost/.test(result)) {
		result += path
	} else {
		result += "epub-js"
		result += path
	}
	return result
}

const open = (book, { archived, url }) => {

	assert.equal(book.isOpen, true)
	assert.equal(book.archived, archived)
	assert.equal(book.url.toString(), url)
	assert.equal(book.container.directory, "OPS/")
	assert.equal(book.container.fullPath, "OPS/package.opf")
	assert.equal(book.container.encoding, "UTF-8")
	assert.equal(book.container.mediaType, "application/oebps-package+xml")
}

const clear = (book) => {

	const jszip = book.archive.instance
	const props = jszip.files
	assert.equal(Object.keys(props).length, 0)
	assert.equal(jszip.comment, null)
	assert.equal(jszip.root, "")
}

const destroy = (book) => {

	Object.keys(book).forEach(p =>  {
		assert.equal(book[p], undefined)
	})
}

const assertion = (book, type, opts) => {

	switch (type) {
		case ASSETRION_TYPE.OPEN:
			open(book, opts)
			break;
		case ASSETRION_TYPE.CLEAR:
			clear(book)
			break;
		case ASSETRION_TYPE.DESTROY:
			destroy(book)
			break;

	}
}

const init = (path) => {

	return {
		book: new Book(),
		path: url(path)
	}
}

describe("Book", () => {
	let book, path, type
	describe("#constructor()", () => {
		it("should be create instance preset", () => {
			const inst = init("/assets/alice.epub")
			book = inst.book
			path = inst.path
			assert.equal(book.archive, undefined)
			assert.equal(book.rendition, undefined)
			assert.equal(book.url, undefined)
			assert.ok(typeof book.request === "function")
			assert.ok(book.container instanceof Container)
			assert.ok(book.packaging instanceof Packaging)
			assert.ok(book.resources instanceof Resources)
			assert.ok(book.sections instanceof Sections)
			assert.ok(book.storage instanceof Storage)
			assert.ok(book.locations instanceof Locations)
			assert.ok(book.navigation instanceof Navigation)
		})
	})
	describe("#determineType()", () => {
		it("should be input type definition as epub", () => {
			type = book.determineType(path)
			assert.equal(type, "epub")
		})
	})
	describe("#open()", () => {
		it("should be open .epub file", async () => {
			await book.open(path)
			await book.opened
			assertion(book, ASSETRION_TYPE.OPEN, {
				archived: true,
				url: "/"
			})
		})
	})
	describe("#clear()", () => {
		it("should be clear book object", () => {
			book.clear()
			assertion(book, ASSETRION_TYPE.CLEAR)
		})
	})
	describe("#destroy()", () => {
		it("should destroy book instance", () => {
			book.destroy()
			assertion(book, ASSETRION_TYPE.DESTROY)
		})
	})
})