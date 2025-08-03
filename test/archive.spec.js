import assert from "assert"
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
    let uri, zip, archive
    before(async () => {
        uri = url("/assets/alice.epub")
    })
    describe("#constructor()", () => {
        it("should be create instance", async () => {
            archive = new Archive()
            assert.ok(archive.instance instanceof JSZip)
        })
    })
    describe("#openUrl()", () => {
        it("should be open .epub file from URL", async () => {
            zip = await archive.openUrl(uri)
            assert.equal(zip.files.mimetype.name, "mimetype")
        })
    })
    describe("#get()", () => {
        it("should be get entry from the archive by URI", () => {
            const entry = archive.get("/META-INF/container.xml")
            assert.equal(entry.name, "META-INF/container.xml")
        })
    })
})