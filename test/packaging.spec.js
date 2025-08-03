import assert from "assert"
import request from "../src/utils/request"
import Packaging from "../src/packaging"

describe("Packaging", () => {
	let pkg1, pkg2, tasks = []
	before(async () => {
		pkg1 = await request("../assets/alice/OPS/package.opf", null)
		pkg2 = await request("../assets/alice/OPS/package.json", "json")
	})
	describe("#parse()", () => {
		it("should be parse package.opf from document", async () => {
			const pack = new Packaging()
			await pack.parse(pkg1)
			assert.equal(pack.version, "3.0")
			assert.equal(pack.metadata.size, 9)
			assert.equal(pack.manifest.size, 42)
			assert.equal(pack.spine.size, 13)
			tasks.push(pack)
		})
	})
	describe("#load()", () => {
		it("should be load package.json from object", async () => {
			const pack = new Packaging()
			await pack.load(pkg2)
			assert.equal(pack.version, "3.0")
			assert.equal(pack.metadata.size, 9)
			assert.equal(pack.manifest.size, 42)
			assert.equal(pack.spine.size, 13)
			tasks.push(pack)
		})
	})
	describe("#clear()", () => {
		it("should be cleaning object data", () => {
			if (tasks.length) {
				const pack = tasks[0]
				pack.clear()
				assert.equal(pack.direction, null)
				assert.equal(pack.version, null)
				assert.equal(pack.uniqueIdentifier, null)
				assert.equal(pack.metadata.size, 0)
				assert.equal(pack.manifest.size, 0)
				assert.equal(pack.spine.size, 0)
			}
		})
	})
	describe("#destroy()", () => {
		it("should be destroy all packages", () => {
			tasks.forEach(pack => {
				pack.destroy()
				assert.equal(pack.metadata, undefined)
				assert.equal(pack.manifest, undefined)
				assert.equal(pack.spine, undefined)
				assert.equal(pack.direction, undefined)
				assert.equal(pack.version, undefined)
				assert.equal(pack.uniqueIdentifier, undefined)
			})
		})
	})
})