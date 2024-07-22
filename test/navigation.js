import assert from "assert"
import Navigation from "../src/navigation"
import request from "../src/utils/request"

describe("Navigation", () => {
    let navigation
    before(() => {
        navigation = new Navigation()
    })
    describe("#parse()", () => {
        it("should parse navigation from nav.xhtml document", async () => {
            const nav = await request("/assets/alice/OPS/nav.xhtml")
            await navigation.parse(nav)
            assert.equal(navigation.landmarks.size, 1)
            assert.equal(navigation.pageList.length, 48)
            assert.equal(navigation.toc.links.size, 11)
            navigation.clear()
        })
        it("should parse navigation from nav.ncx document", async () => {
            const nav = await request("/assets/alice/OPS/nav.ncx")
            await navigation.parse(nav)
            assert.equal(navigation.pageList.length, 48)
            assert.equal(navigation.toc.links.size, 11)
            navigation.clear()
        })
        it("should parse navigation from nav.json object", async () => {
            const nav = await request("/assets/alice/OPS/nav.json")
            await navigation.parse(nav)
            assert.equal(navigation.landmarks.size, 1)
            assert.equal(navigation.pageList.length, 48)
            assert.equal(navigation.toc.links.size, 11)
            navigation.clear()
        })
    })
})