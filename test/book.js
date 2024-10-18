import assert from "assert"
import Book from "../src/book"

const arrayBufferToBase64 = (buffer) => {
	let binary = ""
	let bytes = new Uint8Array(buffer)
	let len = bytes.byteLength
	for (let i = 0; i < len; i++) {
		binary += String.fromCharCode(bytes[i])
	}
	return window.btoa(binary)
}

const assertion = (book, { archived, url }) => {
	assert.equal(book.isOpen, true)
	assert.equal(book.archived, archived)
	assert.equal(book.url.toString(), url)
	assert.equal(book.container.directory, "OPS/")
	assert.equal(book.container.fullPath, "OPS/package.opf")
	assert.equal(book.container.encoding, "UTF-8")
	assert.equal(book.container.mediaType, "application/oebps-package+xml")
}

const url = (path) => location.href.replace("test/", "") + path

describe("Book", () => {
	describe("open book from epub file of local server", () => {
		const book = new Book()
		it("should open a archived epub", async () => {
			await book.open("../assets/alice.epub")
			assertion(book, {
				archived: true,
				url: "/"
			})
		})
		it("should have a blob coverUrl", async () => {
			const coverUrl = await book.coverUrl()
			assert(/blob:/.test(coverUrl))
		})
		after(() => {
			book.destroy()
		})
	})
	describe("open book from epub file of remote server", () => {
		const book = new Book()
		it("should open a archived epub", async () => {
			await book.open("https://intity.github.io/epub-js/assets/alice.epub")
			assertion(book, {
				archived: true,
				url: "/"
			})
		})
		it("should have a blob coverUrl", async () => {
			const coverUrl = await book.coverUrl()
			assert(/blob:/.test(coverUrl))
		})
		after(() => {
			book.destroy()
		})
	})
	describe("open book from array buffer", () => {
		let book, data
		before(async () => {
			const response = await fetch(url("assets/alice.epub"))
			data = await response.arrayBuffer()
			book = new Book()
		})
		it("should open a archived epub", async () => {
			await book.open(data)
			assertion(book, {
				archived: true,
				url: "/"
			})
		})
		it("should have a blob coverUrl", async () => {
			const coverUrl = await book.coverUrl()
			assert(/blob:/.test(coverUrl))
		})
		after(() => {
			book.destroy()
			data = undefined;
		})
	})
	describe("open book from data URL in base64 encoding", () => {
		let book, data
		before(async () => {
			const response = await fetch(url("assets/alice.epub"))
			const blob = await response.blob()
			const buff = await blob.arrayBuffer()
			data = arrayBufferToBase64(buff)
			book = new Book()
		})
		it("should open a archived epub", async () => {
			await book.open(data, "base64")
			assertion(book, {
				archived: true,
				url: "/"
			})
		})
		it("should have a blob coverUrl", async () => {
			const coverUrl = await book.coverUrl()
			assert(/blob:/.test(coverUrl))
		})
		after(() => {
			book.destroy()
			data = undefined;
		})
	})
	describe("open book from epub file without cover", () => {
		const book = new Book()
		it("should open a archived epub", async () => {
			await book.open("../assets/alice_without_cover.epub")
			assertion(book, {
				archived: true,
				url: "/"
			})
		})
		it("should have a empty coverUrl", async () => {
			const coverUrl = await book.coverUrl()
			assert.equal(coverUrl, null)
		})
		after(() => {
			book.destroy()
		})
	})
	describe("open book from directory of local server", () => {
		const book = new Book()
		it("should open a unarchived epub", async () => {
			await book.open("../assets/alice/")
			assertion(book, {
				archived: false,
				url: url("assets/alice/")
			})
		})
		after(() => {
			book.destroy()
		})
	})
	describe("open book from directory of remote server", () => {
		const book = new Book()
		it("should open a unarchived epub", async () => {
			await book.open("https://intity.github.io/epub-js/assets/alice/")
			assertion(book, {
				archived: false,
				url: "https://intity.github.io/epub-js/assets/alice/"
			})
		})
		after(() => {
			book.destroy()
		})
	})
})