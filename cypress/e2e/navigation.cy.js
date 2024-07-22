import Navigation from "../../src/navigation"
import request from "../../src/utils/request"

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
            expect(nav.landmarks.size).to.equal(1)
            expect(nav.pageList.length).to.equal(48)
            expect(nav.toc.links.size).to.equal(11)
        })
        it("should parse navigation from nav.ncx document", async () => {
            const nav = new Navigation()
            const req = await request("/assets/alice/OPS/nav.ncx")
            await nav.parse(req)
            expect(nav.pageList.length).to.equal(48)
            expect(nav.toc.links.size).to.equal(11)
        })
        it("should parse navigation from nav.json object", async () => {
            const req = await request("/assets/alice/OPS/nav.json")
            await nav.parse(req)
            expect(nav.landmarks.size).to.equal(1)
            expect(nav.pageList.length).to.equal(48)
            expect(nav.toc.links.size).to.equal(11)
        })
    })
    describe("#clear()", () => {
        it("should clear navigation parts", () => {
            nav.clear()
            expect(nav.landmarks.size).to.equal(0)
            expect(nav.pageList.length).to.equal(0)
            expect(nav.toc.length).to.equal(0)
        })
    })
})