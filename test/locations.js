import assert from "assert"
import Book from "../src/book"
import Locations from "../src/locations"
import * as core from "../src/utils/core"
import chapter from "../assets/locations.xhtml"

describe("Locations", () => {
	let book, rendition
	before(async () => {
		book = new Book("/assets/alice/")
		rendition = book.renderTo(document.body, {
			width: "100%",
			height: "100%"
		})
		await book.opened
		await rendition.display()
	})
	describe("#parse()", () => {
		it("should parse locations from a document", () => {
			const doc = core.parse(chapter, "application/xhtml+xml")
			const elm = doc.documentElement
			const lcs = new Locations().parse(elm, "/6/4[chap01ref]", 100)
			assert.equal(lcs.size, 15)
		})
		it("should parse locations from xmldom", () => {
			const doc = core.parse(chapter, "application/xhtml+xml", true)
			const elm = doc.documentElement
			const lcs = new Locations().parse(elm, "/6/4[chap01ref]", 100)
			assert.equal(lcs.size, 15)
		})
	})
	describe("#generate()", () => {
		it("should generate locations", async () => {
			await book.locations.generate(549)
			assert.equal(book.locations.size, 101)
		})
	})
	describe("#set()", () => {
		it("should set current location by EpubCFI", async () => {
			const locs = book.locations
			const curr = book.locations.current
			await rendition.display(3) // section:3
			locs.set({ cfi: rendition.currentLocation().start.cfi })
			assert.equal(curr.index, 1)
			assert.equal(curr.percentage, 0.01)
			await rendition.display(4) // section:4
			locs.set({ cfi: rendition.currentLocation().start.cfi })
			assert.equal(curr.index, 14)
			assert.equal(curr.percentage, 0.14)
			await rendition.display(5) // section:5
			locs.set({ cfi: rendition.currentLocation().start.cfi })
			assert.equal(curr.index, 25)
			assert.equal(curr.percentage, 0.25)
			await rendition.display(6) // section:6
			locs.set({ cfi: rendition.currentLocation().start.cfi })
			assert.equal(curr.index, 36)
			assert.equal(curr.percentage, 0.36)
			await rendition.display(7) // section:7
			locs.set({ cfi: rendition.currentLocation().start.cfi })
			assert.equal(curr.index, 50)
			assert.equal(curr.percentage, 0.50)
			await rendition.display(8) // section:8
			locs.set({ cfi: rendition.currentLocation().start.cfi })
			assert.equal(curr.index, 61)
			assert.equal(curr.percentage, 0.61)
			await rendition.display(9) // section:9
			locs.set({ cfi: rendition.currentLocation().start.cfi })
			assert.equal(curr.index, 71)
			assert.equal(curr.percentage, 0.71)
			await rendition.display(10) // section:10
			locs.set({ cfi: rendition.currentLocation().start.cfi })
			assert.equal(curr.index, 77)
			assert.equal(curr.percentage, 0.77)
			await rendition.display(11) // section:11
			locs.set({ cfi: rendition.currentLocation().start.cfi })
			assert.equal(curr.index, 89)
			assert.equal(curr.percentage, 0.89)
			await rendition.display(12) // section:12
			locs.set({ cfi: rendition.currentLocation().start.cfi })
			assert.equal(curr.index, 95)
			assert.equal(curr.percentage, 0.95)
		})
		it("should set current location by index", () => {
			const locs = book.locations
			const curr = book.locations.current
			const keys = [...locs.keys()]
			locs.on("changed", (current, changed) => {
				if (changed.index) {
					assert.equal(current.cfi, keys[changed.index])
					assert.equal(current.index, changed.index)
				}
			})
			locs.set({ index: 1 }) // section:3
			assert.equal(curr.percentage, 0.01)
			locs.set({ index: 14 }) // section:4
			assert.equal(curr.percentage, 0.14)
			locs.set({ index: 25 }) // section:5
			assert.equal(curr.percentage, 0.25)
			locs.set({ index: 36 }) // section:6
			assert.equal(curr.percentage, 0.36)
			locs.set({ index: 50 }) // section:7
			assert.equal(curr.percentage, 0.50)
			locs.set({ index: 61 }) // section:8
			assert.equal(curr.percentage, 0.61)
			locs.set({ index: 71 }) // section:9
			assert.equal(curr.percentage, 0.71)
			locs.set({ index: 77 }) // section:10
			assert.equal(curr.percentage, 0.77)
			locs.set({ index: 89 }) // section:11
			assert.equal(curr.percentage, 0.89)
			locs.set({ index: 95 }) // section:12
			assert.equal(curr.percentage, 0.95)
		})
		it("should set current location by percentage", () => {
			const locs = book.locations
			const curr = book.locations.current
			const keys = [...locs.keys()]
			locs.on("changed", (current, changed) => {
				if (changed.percentage) {
					assert.equal(current.cfi, keys[current.index])
					assert.equal(current.percentage, changed.percentage)
				}
			})
			locs.set({ percentage: 0.01 }) // section:3
			assert.equal(curr.index, 1)
			locs.set({ percentage: 0.14 }) // section:4
			assert.equal(curr.index, 14)
			locs.set({ percentage: 0.25 }) // section:5
			assert.equal(curr.index, 25)
			locs.set({ percentage: 0.36 }) // section:6
			assert.equal(curr.index, 36)
			locs.set({ percentage: 0.50 }) // section:7
			assert.equal(curr.index, 50)
			locs.set({ percentage: 0.61 }) // section:8
			assert.equal(curr.index, 61)
			locs.set({ percentage: 0.71 }) // section:9
			assert.equal(curr.index, 71)
			locs.set({ percentage: 0.77 }) // section:10
			assert.equal(curr.index, 77)
			locs.set({ percentage: 0.89 }) // section:11
			assert.equal(curr.index, 89)
			locs.set({ percentage: 0.95 }) // section:12
			assert.equal(curr.index, 95)
		})
	})
	describe("#cfiFromPercentage()", () => {
		it("should get EpubCFI from percentage", () => {
			const locs = book.locations
			const keys = [...locs.keys()]
			keys.forEach((key, index) => {
				const percentage = index / (locs.size - 1)
				assert.equal(key, locs.cfiFromPercentage(percentage))
			})
		})
	})
})