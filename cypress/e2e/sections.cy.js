import Book from "../../src/book"

describe("Sections", () => {
    let book
    before(async () => {
        book = new Book("../../assets/alice/")
        await book.opened
    })
    describe("#get()", () => {
        it("should get default section", () => {
            const section = book.sections.get()
            expect(section.idref).to.equal("titlepage")
            expect(section.linear).to.equal(true)
            expect(section.index).to.equal(2)
            expect(section.href).to.equal("titlepage.xhtml")
            expect(section.url).to.equal("/assets/alice/OPS/titlepage.xhtml")
            expect(section.cfiBase).to.equal("/6/6")
        })
        it("should get section from index", () => {
            const section = book.sections.get(1)
            expect(section.idref).to.equal("nav")
            expect(section.linear).to.equal(false)
            expect(section.index).to.equal(1)
            expect(section.href).to.equal("nav.xhtml")
            expect(section.url).to.equal("/assets/alice/OPS/nav.xhtml")
            expect(section.cfiBase).to.equal("/6/4")
        })
        it("should get section from id", () => {
            const section = book.sections.get("#chapter_010")
            expect(section.idref).to.equal("chapter_010")
            expect(section.linear).to.equal(true)
            expect(section.index).to.equal(12)
            expect(section.href).to.equal("chapter_010.xhtml")
            expect(section.url).to.equal("/assets/alice/OPS/chapter_010.xhtml")
            expect(section.cfiBase).to.equal("/6/26")
        })
        it("should get section from href", () => {
            const section = book.sections.get("chapter_001.xhtml")
            expect(section.idref).to.equal("chapter_001")
            expect(section.linear).to.equal(true)
            expect(section.index).to.equal(3)
            expect(section.href).to.equal("chapter_001.xhtml")
            expect(section.url).to.equal("/assets/alice/OPS/chapter_001.xhtml")
            expect(section.cfiBase).to.equal("/6/8")
        })
        it("should get section from epubcfi", () => {
            const section = book.sections.get("epubcfi(/6/8!/4/2/16/1:0)")
            expect(section.idref).to.equal("chapter_001")
            expect(section.linear).to.equal(true)
            expect(section.index).to.equal(3)
            expect(section.href).to.equal("chapter_001.xhtml")
            expect(section.url).to.equal("/assets/alice/OPS/chapter_001.xhtml")
            expect(section.cfiBase).to.equal("/6/8")
        })
    })
    describe("#first()", () => {
        it("should get first section", () => {
            const section = book.sections.first()
            expect(section.idref).to.equal("titlepage")
            expect(section.linear).to.equal(true)
            expect(section.index).to.equal(2)
            expect(section.href).to.equal("titlepage.xhtml")
            expect(section.url).to.equal("/assets/alice/OPS/titlepage.xhtml")
            expect(section.cfiBase).to.equal("/6/6")
        })
    })
    describe("#last()", () => {
        it("should get last section", () => {
            const section = book.sections.last()
            expect(section.idref).to.equal("chapter_010")
            expect(section.linear).to.equal(true)
            expect(section.index).to.equal(12)
            expect(section.href).to.equal("chapter_010.xhtml")
            expect(section.url).to.equal("/assets/alice/OPS/chapter_010.xhtml")
            expect(section.cfiBase).to.equal("/6/26")
        })
    })
})