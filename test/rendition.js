import assert from "assert"
import Book from "../src/book"
import CustomVM from "./manager"

const url = (path) => (/epub-js/.test(location.href) ? "/epub-js" : "") + path

describe("Rendition", () => {
    let book, rendition
    const init = async (n, options) => {

        if (book === undefined) {
            book = new Book("../assets/handbook/")
            await book.opened
        }
        if (rendition === undefined && n === 1) {
            rendition = book.renderTo(document.body, options)
        }
        return Promise.resolve({ book, rendition })
    }
    describe("#requireManager", () => {
        before(async () => {
            await init(1, { manager: CustomVM })
            await rendition.display()
        })
        it("should be create custom manager", () => {
            const manager = rendition.manager
            assert.ok(manager instanceof CustomVM)
            assert.equal(typeof manager, "object")
            assert.equal(manager.name, "custom")
        })
    })
    describe("#renderTo()", () => {
        before(async () => init(0))
        it("should be prepare render", () => {
            rendition = book.renderTo(document.body)
            rendition.on("attached", () => {
                assert.ok(true)
            })
        })
    })
    describe("#display()", () => {
        before(async () => init(1))
        it("should be displayed by default", async () => {
            const section = await rendition.display()
            assert.equal(section.index, 0)
            assert.equal(section.idref, "s0")
            assert.equal(section.href, "xhtml/nav.xhtml")
            assert.equal(section.url, url("/assets/handbook/EPUB/xhtml/nav.xhtml"))
        })
        it("should be displayed by index", async () => {
            const section = await rendition.display(2)
            assert.equal(section.index, 2)
            assert.equal(section.idref, "s2")
            assert.equal(section.href, "xhtml/mathml.xhtml")
            assert.equal(section.url, url("/assets/handbook/EPUB/xhtml/mathml.xhtml"))
        })
        it("should be displayed by idref", async () => {
            const section = await rendition.display("#s2")
            assert.equal(section.index, 2)
            assert.equal(section.idref, "s2")
            assert.equal(section.href, "xhtml/mathml.xhtml")
            assert.equal(section.url, url("/assets/handbook/EPUB/xhtml/mathml.xhtml"))
        })
        it("should be displayed by href", async () => {
            const section = await rendition.display("xhtml/mathml.xhtml")
            assert.equal(section.index, 2)
            assert.equal(section.idref, "s2")
            assert.equal(section.href, "xhtml/mathml.xhtml")
            assert.equal(section.url, url("/assets/handbook/EPUB/xhtml/mathml.xhtml"))
        })
        it("should be displayed by epubcfi", async () => {
            const section = await rendition.display("epubcfi(/6/6!/4/2[mathml]/2/1:0)")
            assert.equal(section.index, 2)
            assert.equal(section.idref, "s2")
            assert.equal(section.href, "xhtml/mathml.xhtml")
            assert.equal(section.url, url("/assets/handbook/EPUB/xhtml/mathml.xhtml"))
        })
    })
    describe("#next()", () => {
        before(async () => init(1))
        it("should be displayed by index 0", async () => {
            const section = await rendition.display(0)
            assert.equal(section.index, 0)
        })
        it("should be next section", async () => {
            await rendition.next()
            const loc = rendition.currentLocation()
            assert.equal(loc.start.index, 1)
        })
    })
    describe("#prev()", () => {
        before(async () => init(1))
        it("should be displayed by index 1", async () => {
            const section = await rendition.display(1)
            assert.equal(section.index, 1)
        })
        it("should be prev section", async () => {
            await rendition.prev()
            const loc = rendition.currentLocation()
            assert.equal(loc.start.index, 0)
        })
    })
})