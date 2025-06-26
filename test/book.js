import assert from "assert"
import Book from "../src/book"

const ASSETRION_TYPE = {
	OPEN: "open",
	DESTROY: "destroy"
}

const arrayBufferToBase64 = (buffer) => {
	let binary = ""
	let bytes = new Uint8Array(buffer)
	let len = bytes.byteLength
	for (let i = 0; i < len; i++) {
		binary += String.fromCharCode(bytes[i])
	}
	return window.btoa(binary)
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

const destroy = (book) => {
	assert.equal(book.archive, undefined)
	assert.equal(book.archived, undefined)
	assert.equal(book.container, undefined)
	assert.equal(book.cover, undefined)
	assert.equal(book.isOpen, undefined)
	assert.equal(book.loaded, undefined)
	assert.equal(book.loading, undefined)
	assert.equal(book.packaging, undefined)
	assert.equal(book.path, undefined)
	assert.equal(book.rendition, undefined)
	assert.equal(book.request, undefined)
	assert.equal(book.resources, undefined)
	assert.equal(book.sections, undefined)
	assert.equal(book.settings, undefined)
	assert.equal(book.storage, undefined)
	assert.equal(book.url, undefined)
}

const assertion = (book, type, opts) => {
	switch (type) {
		case ASSETRION_TYPE.OPEN:
			open(book, opts)
			break;
		case ASSETRION_TYPE.DESTROY:
			destroy(book)
			break;

	}
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

describe("Book", () => {
	describe("open book from epub file of local server", () => {
		const book = new Book()
		const path = url("/assets/alice.epub")
		it("should open a archived epub", async () => {
			await book.open(path)
			await book.opened
			assertion(book, ASSETRION_TYPE.OPEN, {
				archived: true,
				url: "/"
			})
		})
		it("should have a blob cover url", async () => {
			const coverUrl = await book.coverUrl()
			assert(/blob:/.test(coverUrl))
		})
		it("should destroy book instance", async () => {
			book.destroy()
			assertion(book, ASSETRION_TYPE.DESTROY)
		})
	})
	describe("open book from epub file of remote server", () => {
		const book = new Book()
		const path = url("/assets/alice.epub")
		it("should open a archived epub", async () => {
			await book.open(path)
			await book.opened
			assertion(book, ASSETRION_TYPE.OPEN, {
				archived: true,
				url: "/"
			})
		})
		it("should have a blob cover url", async () => {
			const coverUrl = await book.coverUrl()
			assert(/blob:/.test(coverUrl))
		})
		it("should destroy book instance", async () => {
			book.destroy()
			assertion(book, ASSETRION_TYPE.DESTROY)
		})
	})
	describe("open book from array buffer", () => {
		let book, data
		before(async () => {
			const response = await fetch(url("/assets/alice.epub"))
			data = await response.arrayBuffer()
			book = new Book()
		})
		it("should open a archived epub", async () => {
			await book.open(data)
			await book.opened
			assertion(book, ASSETRION_TYPE.OPEN, {
				archived: true,
				url: "/"
			})
		})
		it("should have a blob cover url", async () => {
			const coverUrl = await book.coverUrl()
			assert(/blob:/.test(coverUrl))
		})
		it("should destroy book instance", async () => {
			book.destroy()
			assertion(book, ASSETRION_TYPE.DESTROY)
		})
	})
	describe("open book from data URL in base64 encoding", () => {
		let book, data
		before(async () => {
			const response = await fetch(url("/assets/alice.epub"))
			const blob = await response.blob()
			const buff = await blob.arrayBuffer()
			data = arrayBufferToBase64(buff)
			book = new Book()
		})
		it("should open a archived epub", async () => {
			await book.open(data, "base64")
			await book.opened
			assertion(book, ASSETRION_TYPE.OPEN, {
				archived: true,
				url: "/"
			})
		})
		it("should have a blob cover url", async () => {
			const coverUrl = await book.coverUrl()
			assert(/blob:/.test(coverUrl))
		})
		it("should destroy book instance", async () => {
			book.destroy()
			assertion(book, ASSETRION_TYPE.DESTROY)
		})
	})
	describe("open book from epub file without cover", () => {
		const book = new Book()
		const path = url("/assets/alice_without_cover.epub")
		it("should open a archived epub", async () => {
			await book.open(path)
			await book.opened
			assertion(book, ASSETRION_TYPE.OPEN, {
				archived: true,
				url: "/"
			})
		})
		it("should have a empty cover url", async () => {
			const coverUrl = await book.coverUrl()
			assert.equal(coverUrl, null)
		})
		it("should destroy book instance", async () => {
			book.destroy()
			assertion(book, ASSETRION_TYPE.DESTROY)
		})
	})
	describe("open book from directory of local server", () => {
		const book = new Book()
		const path = url("/assets/alice/")
		it("should open a unarchived epub", async () => {
			await book.open(path)
			await book.opened
			assertion(book, ASSETRION_TYPE.OPEN, {
				archived: false,
				url: path
			})
		})
		it("should destroy book instance", async () => {
			book.destroy()
			assertion(book, ASSETRION_TYPE.DESTROY)
		})
	})
	describe("open book from directory of remote server", () => {
		const book = new Book()
		const path = url("/assets/alice/")
		it("should open a unarchived epub", async () => {
			await book.open(path)
			await book.opened
			assertion(book, ASSETRION_TYPE.OPEN, {
				archived: false,
				url: path
			})
		})
		it("should destroy book instance", async () => {
			book.destroy()
			assertion(book, ASSETRION_TYPE.DESTROY)
		})
	})
})