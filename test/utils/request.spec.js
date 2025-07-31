import assert from "assert"
import request from "../../src/utils/request"

describe("#request()", () => {
    it("should be request of the xhtml type", async () => {
        const uri = "../assets/handbook/EPUB/xhtml/nav.xhtml"
        const doc = await request(uri, "xhtml").then((e) => {
			console.log(doc)
		},(err) => {
			console.log(err)
			console.log("TARGET: ", err.target instanceof XMLHttpRequest)
		})
		assert.ok(typeof doc === "object")
    })
})