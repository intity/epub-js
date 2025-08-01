import assert from "assert"
import request from "../src/utils/request"
import Archive from "../src/archive"
import JSZip from "jszip"

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

describe("Archive", () => {
    let uri, bin, archive
    before(async () => {
        uri = url("/assets/alice.epub")
        bin = await request(uri, "binary")
    })
    describe("#constructor()", () => {
        it("should be create instance", async () => {
            archive = new Archive()
            assert.ok(archive.instance instanceof JSZip)
        })
        it("should be open .epub file from ArrayBuffer", async () => {
            const epub = await archive.open(bin)
            assert.equal(epub.files.mimetype.name, "mimetype")
        })
    })
})