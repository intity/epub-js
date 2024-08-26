import assert from "assert"
import Book from "../src/book"

describe("Rendition", () => {
    let book, rendition
    before(async () => {
        book = new Book("/assets/handbook/")
        await book.opened
        rendition = book.renderTo(document.body, {
            width: "100%",
            height: "100%"
        })
    })
    describe("#display()", () => {
        it("should be displayed by default", () => {
            rendition.display().then((section) => {
                assert.equal(section.index, 0)
                assert.equal(section.idref, "s0")
                assert.equal(section.href, "xhtml/nav.xhtml")
                assert.equal(section.url, "/assets/handbook/EPUB/xhtml/nav.xhtml")
            })
        })
        it("should be displayed by index", () => {
            rendition.display(3).then((section) => {
                assert.equal(section.index, 3)
                assert.equal(section.idref, "s2")
                assert.equal(section.href, "xhtml/mathml.xhtml")
                assert.equal(section.url, "/assets/handbook/EPUB/xhtml/mathml.xhtml")
            })
        })
        it("should be displayed by idref", () => {
            rendition.display("#s2").then((section) => {
                assert.equal(section.index, 3)
                assert.equal(section.idref, "s2")
                assert.equal(section.href, "xhtml/mathml.xhtml")
                assert.equal(section.url, "/assets/handbook/EPUB/xhtml/mathml.xhtml")
            })
        })
        it("should be displayed by href", () => {
            rendition.display("xhtml/mathml.xhtml").then((section) => {
                assert.equal(section.index, 3)
                assert.equal(section.idref, "s2")
                assert.equal(section.href, "xhtml/mathml.xhtml")
                assert.equal(section.url, "/assets/handbook/EPUB/xhtml/mathml.xhtml")
            })
        })
        it("should be displayed by EpubCFI", () => {
            rendition.display("epubcfi(/6/6!/4/2[mathml]/2/1:0)").then((section) => {
                assert.equal(section.index, 3)
                assert.equal(section.idref, "s2")
                assert.equal(section.href, "xhtml/mathml.xhtml")
                assert.equal(section.url, "/assets/handbook/EPUB/xhtml/mathml.xhtml")
            })
        })
    })
})