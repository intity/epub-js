import assert from "assert"
import request from "../src/utils/request"
import Container from "../src/container"

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

describe("Container", () => {
    let xml, uri, inst
    before(async () => {
        uri = url("/assets/handbook/META-INF/container.xml")
        xml = await request(uri, "xml")
    })
    describe("#constructor()", () => {
        it("should be create instance container", () => {
            inst = new Container()
            Object.keys(inst).forEach(p => {
                assert.equal(inst[p], "")
            })
            assert.ok(xml instanceof Document)
        })
    })
    describe("#parse()", () => {
        it("should be parse document", async () => {
            const obj = await inst.parse(xml) // container object
            assert.equal(obj.directory, "EPUB/")
            assert.equal(obj.fullPath, "EPUB/package.opf")
            assert.equal(obj.encoding, "UTF-8")
            assert.equal(obj.mediaType, "application/oebps-package+xml")
            assert.equal(obj.version, "1.0")
        })
    })
    describe("#destroy()", () => {
        it("should be destroy container object", () => {
            inst.destroy()
            Object.keys(inst).forEach(p => {
                assert.equal(inst[p], undefined)
            })
        })
    })
})