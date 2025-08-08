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

const init = async () => {
    //--NOTE: Init book object without called the book.open() method
    const path = url("/assets/alice.epub")
    //--BOOK_INIT [in: INIT_PATH]
    const book = new Book(path)
    //--ARCH_INIT [in: INIT]
    book.archive = new Archive()
    book.archived = true
    //--PATH: http://localhost:8080/assets/alice.epub
    //--ARCH_OPEN_URI [in: PATH, out: Object]
    //--TODO: add to: 'book.fromURI(path)' --> 'book.archive.openUrl')
    const jszip_data = await book.archive.openUrl(path)
    //--BOOK_RESOLVE [in: META-INF/container.xml]
    const container_path = book.resolve(CONTAINER_PATH_0)
    //--ARCH_REQUEST [in: /META-INF/container.xml, out: Document]
    const container_data = await book.archive.request(container_path)
    //--ARCH_PARSE [in: Document, out: Container]
    //--TODO: mv book.container --> book.archive.container
    const container_inst = await book.container.parse(container_data)
    //--PACK_PATH [in: OPS/package.opf, out: /OPS/package.opf]
    const pack_path = "\/" + container_inst.fullPath
    //--ARCH_REQUEST [in: /OPS/package.opf, out: Document]
    const pack_data = await book.archive.request(pack_path)
    //--PACK_PARSE [in: Document, out: Packaging]
    const pack = await book.packaging.parse(pack_data)
    //--TARGET_INST [out: Resources]
    const inst = book.resources
    const data = jszip_data
    return Promise.resolve({ book, pack, inst, data })
}

describe("Resources", () => {
    let book, pack, inst, data
    before(async () => {
        const pr = await init()
        book = pr.book
        pack = pr.pack
        inst = pr.inst
        data = pr.data
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