import assert from "assert"
import Book from "../src/book"

const assertion = (book, { archived, url }) => {
	assert.equal(book.isOpen, true)
	assert.equal(book.archived, archived)
	assert.equal(book.url.toString(), url)
	assert.equal(book.container.directory, "OPS/")
	assert.equal(book.container.fullPath, "OPS/package.opf")
	assert.equal(book.container.encoding, "UTF-8")
	assert.equal(book.container.mediaType, "application/oebps-package+xml")
}

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
			const response = await fetch("http://localhost:8080/assets/alice.epub")
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
		})
	})
	describe("open book from data URL in base64 encoding", () => {
		let book, data
		before(async () => {
			const response = await fetch("http://localhost:8080/assets/alice.epub")
			const blob = await response.blob()
			const buff = Buffer.from(await blob.arrayBuffer())
			data = buff.toString("base64")
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
				url: `${location.origin + location.pathname.replace("/test/", "")}/assets/alice/`
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