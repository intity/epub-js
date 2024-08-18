import assert from "assert"
import request from "../src/utils/request"
import Packaging from "../src/packaging"

describe("Packaging", () => {
    let packageXML, packageJSON
    before(async () => {
        packageXML = await request("/assets/alice/OPS/package.opf", null)
        packageJSON = await request("/assets/alice/OPS/package.json", "json")
    })
    describe("#parse()", () => {
        it ("should parse package.opf from document", () => {
            const packaging = new Packaging()
            packaging.parse(packageXML)
            assert.equal(packaging.version, "3.0")
            assert.equal(packaging.metadata.size, 10)
            assert.equal(packaging.manifest.size, 42)
            assert.equal(packaging.spine.size, 13)
        })
    })
    describe("#load()", () => {
        it ("should load package.json from object", () => {
            const packaging = new Packaging()
            packaging.load(packageJSON)
            assert.equal(packaging.version, "3.0")
            assert.equal(packaging.metadata.size, 10)
            assert.equal(packaging.manifest.size, 42)
            assert.equal(packaging.spine.size, 13)
        })
    })
})