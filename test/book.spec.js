import assert from "assert"
import Archive from "../src/archive"
import Book from "../src/book"
import Container from "../src/container"
import Packaging from "../src/packaging"
import Resources from "../src/resources"
import Sections from "../src/sections"
import Storage from "../src/storage"
import Locations from "../src/locations"
import Navigation from "../src/navigation"
import Path from "../src/utils/path"
import Url from "../src/utils/url"

const ASSETRION_TYPE = {
	INIT: "init",
	OPEN: "open",
	CLEAR: "clear",
	DESTROY: "destroy"
}

const INPUT_TYPES = {
	EPUB: "epub",
	BINARY: "binary",
	DIRECTORY: "directory"
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

const ctor = (book, opts) => {

	switch (opts.type) {
		case INPUT_TYPES.EPUB:
		case INPUT_TYPES.BINARY:
			//--OPTS
			if (opts.type === INPUT_TYPES.EPUB) {
				// console.log(book)
				// console.log(opts)
				assert.ok(typeof opts.path === "string")
			} else {
				// console.log(book)
				// console.log(opts)
				assert.ok(opts.path instanceof ArrayBuffer)
				assert.ok(typeof opts.path === "object")
			}
			//--URI
			assert.ok(book.url.path instanceof Path)
			assert.equal(book.url.href, "/")
			assert.equal(book.url.protocol, "")
			assert.equal(book.url.origin, "")
			assert.equal(book.url.hash, "")
			assert.equal(book.url.search, "")
			assert.equal(book.url.href, "/")
			assert.equal(book.url.directory, "//")
			assert.equal(book.url.extension, "")
			assert.equal(book.url.filename, "")
			//--PROPS
			if (opts.type === INPUT_TYPES.EPUB) {
				assert.ok(typeof book.archive === "undefined")
			} else {
				assert.ok(book.archive instanceof Archive)
			}
			assert.equal(book.archived, true)
			assert.equal(book.cover, null)
			assert.equal(book.path, undefined)
			break;
		case INPUT_TYPES.DIRECTORY:
			// console.log(book)
			// console.log(opts)
			//--OPTS
			assert.ok(typeof opts.path === "string")
			//--URI
			assert.ok(book.url instanceof Url)
			assert.equal(book.url.href, opts.path)
			assert.equal(book.url.protocol, "http:")
			assert.equal(book.url.origin, "http://localhost:8080")
			assert.equal(book.url.hash, "")
			assert.equal(book.url.search, "")
			//--PROPS
			assert.equal(book.archived, false)
			assert.equal(book.isOpen, false)
			assert.equal(book.cover, null)
			assert.equal(book.path, undefined)
			break;
	}
	assert.ok(typeof book.request === "function")
	assert.ok(book.container instanceof Container)
	assert.ok(book.packaging instanceof Packaging)
	assert.ok(book.resources instanceof Resources)
	assert.ok(book.sections instanceof Sections)
	assert.ok(book.storage instanceof Storage)
	assert.ok(book.locations instanceof Locations)
	assert.ok(book.navigation instanceof Navigation)
	assert.equal(book.rendition, undefined)
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

	if (book.archived) {
		const jszip = book.archive.instance
		const props = jszip.files
		assert.ok(typeof props === "object")
		assert.equal(Object.keys(props).length, 0)
		assert.equal(jszip.comment, null)
		assert.equal(jszip.root, "")
	}
}

const destroy = (book) => {

	Object.keys(book).forEach(p => {
		assert.equal(book[p], undefined)
	})
}

const assertion = (book, type, opts) => {

	switch (type) {
		case ASSETRION_TYPE.INIT:
			ctor(book, opts)
			break;
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

const init = (type, path) => {

	let input
	switch (type) {
		case INPUT_TYPES.EPUB:
		case INPUT_TYPES.DIRECTORY:
			input = url(path)
			break;
		case INPUT_TYPES.BINARY:
			input = path
			break;
	}
	return {
		book: new Book(input),
		path: input,
		type
	}
}

describe("Book", () => {
	let data, tasks = []
	before(async () => {
		const response = await fetch(url("/assets/alice.epub"))
		data = await response.arrayBuffer()
	})
	describe("#constructor(t)", () => {
		it("should be create instance by default", () => {
			const task = init()
			tasks.push(task)
			const book = tasks[0].book
			assertion(book, ASSETRION_TYPE.INIT, {
				path: undefined,
				type: undefined
			})
		})
		it("should be create instance as t:epub", () => {
			const task = init(INPUT_TYPES.EPUB, "/assets/alice.epub")
			tasks.push(task)
			const book = tasks[1].book
			assertion(book, ASSETRION_TYPE.INIT, {
				path: task.path,
				type: INPUT_TYPES.EPUB
			})
		})
		it("should be create instance as t:binary", () => {
			const task = init(INPUT_TYPES.BINARY, data)
			tasks.push(task)
			const book = tasks[2].book
			assertion(book, ASSETRION_TYPE.INIT, {
				path: task.path,
				type: INPUT_TYPES.BINARY
			})
		})
		it("should be create instance as t:directory", () => {
			const task = init(INPUT_TYPES.DIRECTORY, "/assets/alice/")
			tasks.push(task)
			const book = tasks[3].book
			assertion(book, ASSETRION_TYPE.INIT, {
				path: task.path,
				type: INPUT_TYPES.DIRECTORY
			})
		})
	})
	describe("#determineType(t)", () => {
		xit("should be input type definition as undefined", () => {
			const { book, path } = tasks[0]
			const type = book.determineType(path)
			assert.equal(type, undefined)
		}) // TODO: input type undefined
		it("should be input type definition as t:epub", () => {
			const { book, path } = tasks[1]
			const type = book.determineType(path)
			assert.equal(type, "epub")
		})
		it("should be input type definition as t:binary", () => {
			const { book, path } = tasks[2]
			const type = book.determineType(path)
			assert.equal(type, "binary")
		})
		it("should be input type definition as t:directry", () => {
			const { book, path } = tasks[3]
			const type = book.determineType(path)
			assert.equal(type, "directory")
		})
	})
	describe("#clear()", () => {
		it("should be clear book objects", () => {
			tasks.forEach(task => {
				const { book } = task
				book.clear()
				assertion(book, ASSETRION_TYPE.CLEAR)
			})
		})
	})
	describe("#open(t)", () => {
		it("should be open book as t:epub", async () => {
			const { book, path } = tasks[1]
			await book.open(path)
			await book.opened
			assertion(book, ASSETRION_TYPE.OPEN, {
				archived: true,
				url: "/"
			})
		})
		it("should be open book as t:binary", async () => {
			const { book, path } = tasks[2]
			await book.open(path)
			await book.opened
			assertion(book, ASSETRION_TYPE.OPEN, {
				archived: true,
				url: "/"
			})
		})
		it("should be open book as t:directory", async () => {
			const { book, path } = tasks[3]
			await book.open(path)
			await book.opened
			assertion(book, ASSETRION_TYPE.OPEN, {
				archived: false,
				url: path
			})
		})
	})
	describe("#destroy()", () => {
		it("should be destroy book objects", () => {
			tasks.forEach(task => {
				const { book } = task
				book.destroy()
				assertion(book, ASSETRION_TYPE.DESTROY)
			})
		})
	})
})