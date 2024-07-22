import assert from "assert"
import Navigation from "../src/navigation"
import request from "../src/utils/request"

describe("Navigation", () => {
    let nav
    before(() => {
        nav = new Navigation()
    })
    describe("#parse()", () => {
        it("should parse navigation from nav.xhtml document", async () => {
            const nav = new Navigation()
            const req = await request("/assets/alice/OPS/nav.xhtml")
            await nav.parse(req)
            assert.equal(nav.landmarks.size, 1)
            assert.equal(nav.pageList.length, 48)
            assert.equal(nav.toc.links.size, 11)
        })
        it("should parse navigation from nav.ncx document", async () => {
            const nav = new Navigation()
            const req = await request("/assets/alice/OPS/nav.ncx")
            await nav.parse(req)
            assert.equal(nav.pageList.length, 48)
            assert.equal(nav.toc.links.size, 11)
        })
        it("should parse navigation from nav.json object", async () => {
            const req = await request("/assets/alice/OPS/nav.json")
            await nav.parse(req)
            assert.equal(nav.landmarks.size, 1)
            assert.equal(nav.pageList.length, 48)
            assert.equal(nav.toc.links.size, 11)
        })
    })
    describe("#clear()", () => {
        it("should clear navigation parts", () => {
            nav.clear()
            assert.equal(nav.landmarks.size, 0)
            assert.equal(nav.pageList.length, 0)
            assert.equal(nav.toc.length, 0)
        })
    })
})