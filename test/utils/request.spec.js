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

describe("#request()", () => {
	it("should be request of the xhtml type", async () => {
		const uri = url("/assets/handbook/EPUB/xhtml/nav.xhtml")
		const doc = await request(uri, "xhtml")
		assert.ok(doc instanceof Document)
	})
	it("should be request of the binary type", async () => {
		const uri = url("/assets/alice.epub")
		const bin = await request(uri, "binary")
		assert.ok(bin instanceof ArrayBuffer)
	})
})