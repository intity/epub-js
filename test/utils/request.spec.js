import assert from "assert"
import request from "../../src/utils/request";

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
        const uri = "../assets/handbook/EPUB/xhtml/nav.xhtml"
        const doc = await request(uri, "xhtml").then((e) => {
			console.log(doc)
		},(err) => {
			console.log(err)
		})
		assert.equal(uri, "../assets/handbook/EPUB/xhtml/nav.xhtml")
    })
})