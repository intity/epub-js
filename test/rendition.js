import assert from "assert"
import Book from "../src/book"

const url = (path) => (/epub-js/.test(location.href) ? "/epub-js" : "") + path

describe("Rendition", () => {
    let book, rendition
    before(async () => {
        book = new Book("../assets/handbook/")
        await book.opened
        rendition = book.renderTo(document.body)
    })
    describe("#display()", () => {
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
        it("should be displayed by EpubCFI", async () => {
            const section = await rendition.display("epubcfi(/6/6!/4/2[mathml]/2/1:0)")
            assert.equal(section.index, 2)
            assert.equal(section.idref, "s2")
            assert.equal(section.href, "xhtml/mathml.xhtml")
            assert.equal(section.url, url("/assets/handbook/EPUB/xhtml/mathml.xhtml"))
        })
    })
    after(() => {
        book.destroy()
        book = undefined
        rendition = undefined
    })
})