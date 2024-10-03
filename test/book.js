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
			await book.open("/assets/alice.epub")
			assertion(book, {
				archived: true,
				url: "/"
			})
		})
		it("should have a blob coverUrl", async () => {
			const coverUrl = await book.coverUrl()
			assert(/^blob:http:\/\/localhost:8080\/[^\/]+$/.test(coverUrl))
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
			assert(/^blob:http:\/\/localhost:8080\/[^\/]+$/.test(coverUrl))
		})
		after(() => {
			book.destroy()
		})
	})
	describe("open book from array buffer", () => {
		let book, data
		before(async () => {
			const response = await fetch("/assets/alice.epub")
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
			assert(/^blob:http:\/\/localhost:8080\/[^\/]+$/.test(coverUrl))
		})
		after(() => {
			book.destroy()
			data = undefined;
		})
	})
	describe("open book from data URL in base64 encoding", () => {
		let book, data
		before(async () => {
			book = new Book()
			const response = await fetch("/assets/alice.epub")
			const blob = await response.blob()
			return new Promise((resolve, reject) => {
				const reader = new FileReader()
				reader.onload = (e) => {
					data = e.target.result
					resolve(data)
				}
				reader.onerror = (err) => reject(err)
				reader.readAsDataURL(blob)
			})
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
			assert(/^blob:http:\/\/localhost:8080\/[^\/]+$/.test(coverUrl))
		})
		after(() => {
			book.destroy()
			data = undefined;
		})
	})
	describe("open book from epub file without cover", () => {
		const book = new Book()
		it("should open a archived epub", async () => {
			await book.open("/assets/alice_without_cover.epub")
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
			await book.open("/assets/alice/")
			assertion(book, {
				archived: false,
				url: "http://localhost:8080/assets/alice/"
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
	/*describe("open book from container.json of local server", () => {
		const book = new Book()
		it("should open a unarchived epub", async () => {
			await book.open("/assets/alice/", "json")
			assertion(book, {
				archived: false,
				url: "http://localhost:8080/assets/alice/"
			})
		})
		it("should have a local coverUrl", async () => {
			const coverUrl = await book.coverUrl()
			assert.equal(coverUrl, "http://localhost:8080/assets/alice/OPS/images/cover_th.jpg")
		})
	})
	describe("open book from container.json of remote server", () => {
		const book = new Book()
		it("should open a unarchived epub", async () => {
			await book.open("https://intity.github.io/epub-js/assets/alice/", "json")
			assertion(book, {
				archived: false,
				url: "https://intity.github.io/epub-js/assets/alice/"
			})
		})
		it("should have a local coverUrl", async () => {
			const coverUrl = await book.coverUrl()
			assert.equal(coverUrl, "https://intity.github.io/epub-js/assets/alice/OPS/images/cover_th.jpg")
		})
	})*/
})