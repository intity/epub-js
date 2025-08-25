import assert from "assert"
import request from "../src/utils/request"
import Packaging from "../src/packaging"

describe("Packaging", () => {
    let pkg1, pkg2
    before(async () => {
        pkg1 = await request("../assets/alice/OPS/package.opf", null)
        pkg2 = await request("../assets/alice/OPS/package.json", "json")
    })
    describe("#parse()", () => {
        it ("should parse package.opf from document", async () => {
            const packaging = new Packaging()
            await packaging.parse(pkg1)
            assert.equal(packaging.version, "3.0")
            assert.equal(packaging.metadata.size, 10)
            assert.equal(packaging.manifest.size, 42)
            assert.equal(packaging.spine.size, 13)
        })
    })
    describe("#load()", () => {
        it ("should load package.json from object", async () => {
            const packaging = new Packaging()
            await packaging.load(pkg2)
            assert.equal(packaging.version, "3.0")
            assert.equal(packaging.metadata.size, 10)
            assert.equal(packaging.manifest.size, 42)
            assert.equal(packaging.spine.size, 13)
        })
    })
})