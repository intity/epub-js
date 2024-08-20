import assert from "assert"
import Book from "../src/book"

describe("Rendition", () => {
    let book, rendition
    before(async () => {
        book = new Book("/assets/linear-algebra/")
        await book.opened
        rendition = book.renderTo(document.body, {
            width: "100%",
            height: "100%"
        })
    })
    describe("#display()", () => {
        it("should be displayed by default", () => {
            rendition.display().then((section) => {
                assert.equal(section.index, 1)
                assert.equal(section.idref, "c2")
                assert.equal(section.href, "xhtml/copyright.xhtml")
                assert.equal(section.url, "/assets/linear-algebra/EPUB/xhtml/copyright.xhtml")
            })
        })
        it("should be displayed by index", () => {
            rendition.display(8).then((section) => {
                assert.equal(section.index, 8)
                assert.equal(section.idref, "c9")
                assert.equal(section.href, "xhtml/fcla-xml-2.30li9.xhtml")
                assert.equal(section.url, "/assets/linear-algebra/EPUB/xhtml/fcla-xml-2.30li9.xhtml")
            })
        })
        it("should be displayed by idref", () => {
            rendition.display("#c9").then((section) => {
                assert.equal(section.index, 8)
                assert.equal(section.idref, "c9")
                assert.equal(section.href, "xhtml/fcla-xml-2.30li9.xhtml")
                assert.equal(section.url, "/assets/linear-algebra/EPUB/xhtml/fcla-xml-2.30li9.xhtml")
            })
        })
        it("should be displayed by href", () => {
            rendition.display("xhtml/fcla-xml-2.30li9.xhtml").then((section) => {
                assert.equal(section.index, 8)
                assert.equal(section.idref, "c9")
                assert.equal(section.href, "xhtml/fcla-xml-2.30li9.xhtml")
                assert.equal(section.url, "/assets/linear-algebra/EPUB/xhtml/fcla-xml-2.30li9.xhtml")
            })
        })
        it("should be displayed by EpubCFI", () => {
            rendition.display("epubcfi(/6/18!/4[x10-9000]/2/2/1:0)").then((section) => {
                assert.equal(section.index, 8)
                assert.equal(section.idref, "c9")
                assert.equal(section.href, "xhtml/fcla-xml-2.30li9.xhtml")
                assert.equal(section.url, "/assets/linear-algebra/EPUB/xhtml/fcla-xml-2.30li9.xhtml")
            })
        })
    })
})