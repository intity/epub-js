import assert from "assert"
import request from "../../src/utils/request"

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

describe("Core", () => {
	describe("#request()", () => {
		it("should be request of the xml type", async () => {
			const uri = url("/assets/handbook/META-INF/container.xml")
			const doc = await request(uri, "xml")
			assert.ok(doc instanceof Document)
		})
		it("should be request of the json type", async () => {
			const uri = url("/assets/handbook/META-INF/container.json")
			const obj = await request(uri, "json")
			assert.equal(obj["directory"], "EPUB/")
			assert.equal(obj["encoding"], "UTF-8")
			assert.equal(obj["full-path"], "EPUB/package.json")
			assert.equal(obj["media-type"], "application/json")
			assert.equal(obj["version"], "1.0")
		})
		it("should be request of the binary type", async () => {
			const uri = url("/assets/alice.epub")
			const bin = await request(uri, "binary")
			assert.ok(bin instanceof ArrayBuffer)
		})
	})
})