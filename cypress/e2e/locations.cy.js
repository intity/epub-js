import Book from "../../src/book"
import Locations from "../../src/locations"
import * as core from "../../src/utils/core"

const assets = (path) => {
    return "../../assets/" + path
}

const load = async (path) => {
    let result
    await fetch(path).then(res => res.text()).then(text => {
        result = text
    })
    return result
}

describe("Locations", () => {
    let book, rendition, text
    before(async () => {
        book = new Book(assets("alice/OPS/package.opf"))
		rendition = book.renderTo(document.body, {
			width: "100%",
			height: "100%"
		})
		await book.opened
		await rendition.display()
        text = await load(assets("locations.xhtml"))
    })
    describe("#parse()", () => {
		it("should parse locations from a document", () => {
			const doc = core.parse(text, "application/xhtml+xml")
			const elm = doc.documentElement
			const lcs = new Locations().parse(elm, "/6/4[chap01ref]", 100)
			expect(lcs.size).to.equal(15)
		})
		it("should parse locations from xmldom", () => {
			const doc = core.parse(text, "application/xhtml+xml", true)
			const elm = doc.documentElement
			const lcs = new Locations().parse(elm, "/6/4[chap01ref]", 100)
			expect(lcs.size).to.equal(15)
		})
	})
    describe("#generate()", () => {
		it("should generate locations", async () => {
			await book.locations.generate(549).then((locations) => {
				expect(locations.size).to.equal(101)
			})
		})
	})
    describe("#set()", () => {
		it("should set current location by EpubCFI", async () => {
			const locs = book.locations
			const curr = book.locations.current
			rendition.display(3).then(() => { // section:3
				locs.set({ cfi: rendition.currentLocation().start.cfi })
				expect(curr.index).to.equal(1)
				expect(curr.percentage).to.equal(0.01)
			})
			rendition.display(4).then(() => { // section:4
				locs.set({ cfi: rendition.currentLocation().start.cfi })
				expect(curr.index).to.equal(14)
				expect(curr.percentage).to.equal(0.14)
			})
			rendition.display(5).then(() => { // section:5
				locs.set({ cfi: rendition.currentLocation().start.cfi })
				expect(curr.index).to.equal(25)
				expect(curr.percentage).to.equal(0.25)
			})
			rendition.display(6).then(() => { // section:6
				locs.set({ cfi: rendition.currentLocation().start.cfi })
				expect(curr.index).to.equal(36)
				expect(curr.percentage).to.equal(0.36)
			})
			rendition.display(7).then(() => { // section:7
				locs.set({ cfi: rendition.currentLocation().start.cfi })
				expect(curr.index).to.equal(50)
				expect(curr.percentage).to.equal(0.50)
			})
			rendition.display(8).then(() => { // section:8
				locs.set({ cfi: rendition.currentLocation().start.cfi })
				expect(curr.index).to.equal(61)
				expect(curr.percentage).to.equal(0.61)
			})
			rendition.display(9).then(() => { // section:9
				locs.set({ cfi: rendition.currentLocation().start.cfi })
				expect(curr.index).to.equal(71)
				expect(curr.percentage).to.equal(0.71)
			})
			rendition.display(10).then(() => { // section:10
				locs.set({ cfi: rendition.currentLocation().start.cfi })
				expect(curr.index).to.equal(77)
				expect(curr.percentage).to.equal(0.77)
			})
			rendition.display(11).then(() => { // section:11
				locs.set({ cfi: rendition.currentLocation().start.cfi })
				expect(curr.index).to.equal(89)
				expect(curr.percentage).to.equal(0.89)
			})
			rendition.display(12).then(() => { // section:12
				locs.set({ cfi: rendition.currentLocation().start.cfi })
				expect(curr.index).to.equal(95)
				expect(curr.percentage).to.equal(0.95)
			})
		})
		it("should set current location by index", () => {
			const locs = book.locations
			const curr = book.locations.current
			const keys = [...locs.keys()]
			locs.on("changed", (current, changed) => {
				if (changed.index) {
					expect(current.cfi).to.equal(keys[changed.index])
					expect(current.index).to.equal(changed.index)
				}
			})
			locs.set({ index: 1 }) // section:3
			expect(curr.percentage).to.equal(0.01)
			locs.set({ index: 14 }) // section:4
			expect(curr.percentage).to.equal(0.14)
			locs.set({ index: 25 }) // section:5
			expect(curr.percentage).to.equal(0.25)
			locs.set({ index: 36 }) // section:6
			expect(curr.percentage).to.equal(0.36)
			locs.set({ index: 50 }) // section:7
			expect(curr.percentage).to.equal(0.50)
			locs.set({ index: 61 }) // section:8
			expect(curr.percentage).to.equal(0.61)
			locs.set({ index: 71 }) // section:9
			expect(curr.percentage).to.equal(0.71)
			locs.set({ index: 77 }) // section:10
			expect(curr.percentage).to.equal(0.77)
			locs.set({ index: 89 }) // section:11
			expect(curr.percentage).to.equal(0.89)
			locs.set({ index: 95 }) // section:12
			expect(curr.percentage).to.equal(0.95)
		})
		it("should set current location by percentage", () => {
			const locs = book.locations
			const curr = book.locations.current
			const keys = [...locs.keys()]
			locs.on("changed", (current, changed) => {
				if (changed.percentage) {
					expect(current.cfi).to.equal(keys[current.index])
					expect(current.percentage).to.equal(changed.percentage)
				}
			})
			locs.set({ percentage: 0.01 }) // section:3
			expect(curr.index).to.equal(1)
			locs.set({ percentage: 0.14 }) // section:4
			expect(curr.index).to.equal(14)
			locs.set({ percentage: 0.25 }) // section:5
			expect(curr.index).to.equal(25)
			locs.set({ percentage: 0.36 }) // section:6
			expect(curr.index).to.equal(36)
			locs.set({ percentage: 0.50 }) // section:7
			expect(curr.index).to.equal(50)
			locs.set({ percentage: 0.61 }) // section:8
			expect(curr.index).to.equal(61)
			locs.set({ percentage: 0.71 }) // section:9
			expect(curr.index).to.equal(71)
			locs.set({ percentage: 0.77 }) // section:10
			expect(curr.index).to.equal(77)
			locs.set({ percentage: 0.89 }) // section:11
			expect(curr.index).to.equal(89)
			locs.set({ percentage: 0.95 }) // section:12
			expect(curr.index).to.equal(95)
		})
	})
	describe("#cfiFromPercentage()", () => {
		it("should get EpubCFI from percentage", () => {
			const locs = book.locations
			const keys = [...locs.keys()]
			keys.forEach((key, index) => {
				const percentage = index / (locs.size - 1)
				expect(key).to.equal(locs.cfiFromPercentage(percentage))
			})
		})
	})
})