import assert from "assert"
import Book from "../src/book"
import CustomVM from "./manager"

const EPUBJS_EID = "viewport"

const url = (path) => (/epub-js/.test(location.href) ? "/epub-js" : "") + path

describe("Rendition", () => {
    let book, rendition
    const init = async (n, options) => {

        if (book === undefined) {
            book = new Book("../assets/handbook/")
            await book.opened
        }
        if (rendition === undefined && n) {
            rendition = book.renderTo(EPUBJS_EID, options)
        }
        return rendition.started
    }
    describe("#requireManager()", () => {
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
    describe("#display()", () => {
        before(async () => {
            await init(1)
        })
        it("should be displayed by default", async () => {
            const section = await rendition.display()
            assert.equal(section.cfiBase, "/6/2")
            assert.equal(section.index, 0)
            assert.equal(section.idref, "s0")
            assert.equal(section.href, "xhtml/nav.xhtml")
            assert.equal(section.url, url("/assets/handbook/EPUB/xhtml/nav.xhtml"))
        })
        it("should be displayed by index", async () => {
            const section = await rendition.display(1)
            assert.equal(section.cfiBase, "/6/4")
            assert.equal(section.index, 1)
            assert.equal(section.idref, "s1")
            assert.equal(section.href, "xhtml/introduction.xhtml")
            assert.equal(section.url, url("/assets/handbook/EPUB/xhtml/introduction.xhtml"))
        })
        it("should be displayed by idref", async () => {
            const section = await rendition.display("#s2")
            assert.equal(section.cfiBase, "/6/6")
            assert.equal(section.index, 2)
            assert.equal(section.idref, "s2")
            assert.equal(section.href, "xhtml/mathml.xhtml")
            assert.equal(section.url, url("/assets/handbook/EPUB/xhtml/mathml.xhtml"))
        })
        it("should be displayed by href", async () => {
            const section = await rendition.display("xhtml/mathml.xhtml")
            assert.equal(section.cfiBase, "/6/6")
            assert.equal(section.index, 2)
            assert.equal(section.idref, "s2")
            assert.equal(section.href, "xhtml/mathml.xhtml")
            assert.equal(section.url, url("/assets/handbook/EPUB/xhtml/mathml.xhtml"))
        })
        it("should be displayed by epubcfi", async () => {
            const section = await rendition.display("epubcfi(/6/6!/4/2[s2]/2[mathml]/1:0)")
            assert.equal(section.cfiBase, "/6/6")
            assert.equal(section.index, 2)
            assert.equal(section.idref, "s2")
            assert.equal(section.href, "xhtml/mathml.xhtml")
            assert.equal(section.url, url("/assets/handbook/EPUB/xhtml/mathml.xhtml"))
        })
    })
    describe("#next()", () => {
        before(async () => {
            await init(1)
            await rendition.display(0)
        })
        it("should be next to section index 1", async () => {
            await rendition.next()
            const loc = rendition.currentLocation()
            assert.equal(loc.start.index, 1)
        })
        it("should be next to section index 2", async () => {
            await rendition.next()
            const loc = rendition.currentLocation()
            assert.equal(loc.start.index, 2)
        })
    })
    describe("#prev()", () => {
        before(async () => {
            await init(1)
            await rendition.display(2)
        })
        it("should be prev to section.index 1", async () => {
            await rendition.prev()
            const loc = rendition.currentLocation()
            assert.equal(loc.start.index, 1)
        })
        it("should be prev to section.index 0", async () => {
            await rendition.prev()
            const loc = rendition.currentLocation()
            assert.equal(loc.start.index, 0)
        })
    })
    describe("#resize()", () => {
        before(async () => {
            await init(1, { spread: "none" })
            await rendition.display(2)
        })
        it("should be viewport resizing to width 500", () => {
            const size = rendition.resize(500, "100%")
            assert.equal(size.width, 500)
        })
        it("should be viewport resizing to height 600", () => {
            const size = rendition.resize("100%", 600)
            assert.equal(size.height, 600)
        })
        it("should be viewport resizing by default", () => {
            const size = rendition.resize("100%", "100%")
            assert.equal(rendition.viewport.rect.width, size.width)
            assert.equal(rendition.viewport.rect.height, size.height)
        })
    })
    describe("#upateLayout()", () => {
        before(async () => {
            await init(1, { spread: "auto" })
            await rendition.display(2)
        })
        it("should be updating layout.spread:none", async () => {
            rendition.updateLayout({ spread: "none" })
            assert.equal(rendition.layout.spread, "none")
        })
        it("should be updating layout.spread:auto", async () => {
            rendition.updateLayout({ spread: "auto" })
            assert.equal(rendition.layout.spread, "auto")
        })
        it("should be updating layout.flow:scrolled", async () => {
            await rendition.updateLayout({ flow: "scrolled" })
            assert.equal(rendition.layout.flow, "scrolled")
        })
        it("should be updating layout.flow:scrolled-doc", async () => {
            await rendition.updateLayout({ flow: "scrolled-doc" })
            assert.equal(rendition.layout.flow, "scrolled-doc")
        })
        it("should be updating layout.flow:paginated", async () => {
            await rendition.updateLayout({ flow: "paginated" })
            assert.equal(rendition.layout.flow, "paginated")
        })
    })
})