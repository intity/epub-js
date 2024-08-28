import assert from "assert"
import Navigation from "../src/navigation"
import request from "../src/utils/request"

describe("Navigation", () => {
    const items = {}
    before(async () => {
        const tasks = []
        const task = async (index, path) => {
            return request(path).then((doc) => {
                items[index] = {
                    nav: new Navigation(),
                    doc
                }
            })
        }
        tasks.push(task(0, "/assets/alice/OPS/nav.xhtml"))
        tasks.push(task(1, "/assets/alice/OPS/nav.ncx"))
        tasks.push(task(2, "/assets/alice/OPS/nav.json"))
        return Promise.all(tasks)
    })
    describe("#parse()", () => {
        it("should parse navigation from nav.xhtml document", async () => {
            const nav = items[0].nav
            const doc = items[0].doc
            await nav.parse(doc)
            assert.equal(nav.landmarks.size, 1)
            assert.equal(nav.pageList.length, 48)
            assert.equal(nav.toc.links.size, 11)
        })
        it("should parse navigation from nav.ncx document", async () => {
            const nav = items[1].nav
            const doc = items[1].doc
            await nav.parse(doc)
            assert.equal(nav.pageList.length, 48)
            assert.equal(nav.toc.links.size, 11)
        })
        it("should parse navigation from nav.json object", async () => {
            const nav = items[2].nav
            const doc = items[2].doc
            await nav.parse(doc)
            assert.equal(nav.landmarks.size, 1)
            assert.equal(nav.pageList.length, 48)
            assert.equal(nav.toc.links.size, 11)
        })
    })
    describe("#clear()", () => {
        it("should clear navigation parts", () => {
            const nav = items[0].nav
            nav.clear()
            assert.equal(nav.landmarks.size, 0)
            assert.equal(nav.pageList.length, 0)
            assert.equal(nav.toc.length, 0)
        })
    })
})