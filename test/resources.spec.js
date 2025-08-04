import assert from "assert"
import Book from "../src/book"
import Archive from "../src/archive"
import Storage from "../src/storage"
import Packaging from "../src/packaging"
import Resources from "../src/resources"
import Container from "../src/container"

const CONTAINER_PATH_0 = "META-INF/container.xml"

const url = (path) => {

    let result = location.origin
    if (/localhost/.test(result)) {
        result += path
    } else {
        result += "epub-js"
        result += path
    }
    return result
}

describe("Resources", () => {
    let path, book, epub, data, cobj, pack, inst
    before(async () => {
        //--BOOK_PATH:
        path = url("/assets/alice.epub")
        //--BOOK_INIT    : PATH
        book = new Book(path)
        book.archive = new Archive()
        book.archived = true
        //--BOOK_FROM_URI: book.fromURI(path) --> book.archive.openUrl : Promise<EDB>
        epub = await book.archive.openUrl(path)
        //--BOOK_RESOLVE : PATH
        path = book.resolve(CONTAINER_PATH_0)
        //--ARCH_REQUEST : input.request(path)
        data = await book.archive.request(path)
        //--ARCH_PARSE   : Document
        cobj = await book.container.parse(data)
        //--EPUB_PATH    : OPS/package.opf
        path = cobj.fullPath
        //--ARCH_REQUEST : PATH
        data = await book.archive.request("\/" + path)
        //--PACK_PARSE   : Document
        pack = await book.packaging.parse(data)
        //--DONE         : Packaging
        inst = book.resources
    })
    describe("#constructor()", () => {
        it("should be check instance", () => {
            assert.ok(inst.archive instanceof Archive)
            assert.ok(inst.storage instanceof Storage)
            assert.ok(book.container instanceof Container)
            assert.ok(book.resources instanceof Resources)
            assert.ok(book.packaging instanceof Packaging)
            assert.equal(inst.size, 0)
            assert.equal(inst.replacements, "blobUrl")
        })
    })
    describe("#unpack()", () => {
        it("should be unpack resources", async () => {
            await inst.unpack(
                pack.manifest,
                inst.archive,
                inst.storage
            )
            assert.equal(inst.size, 29)
        })
    })
    describe("#createUrl()", () => {
        it("should be create blob URL", async () => {
            const path = "images/cover_th.jpg"
            const href = inst.resolve(path)
            const type = "blob"
            const blob = await inst.archive.request(href, type)
            const burl = await inst.createUrl(href, type)
            assert.ok(blob instanceof Blob)
            assert.ok(/blob:/.test(burl))
        })
    })
    describe("#destroy()", () => {
        it("should be destroy object", () => {
            inst.destroy()
            Object.keys(inst).forEach(p => {
                assert.equal(inst[p], undefined)
            })
            assert.equal(inst.size, 0)
        })
    })
})