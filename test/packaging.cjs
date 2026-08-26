const assert = require("node:assert");
const { describe, before, it } = require("node:test");
const request = require("../src/utils/request").default;
const Packaging = require("../src/packaging").default;
const path = require("path");
const { pathToFileURL } = require("url");

describe("Packaging", () => {
  let path1, path2, tasks = [];
  before(async () => {
    const aPath1 = path.resolve(__dirname, "../assets/alice/OPS/package.opf");
    const aPath2 = path.resolve(__dirname, "../assets/alice/OPS/package.json");
    path1 = await request(pathToFileURL(aPath1).href, null);
    path2 = await request(pathToFileURL(aPath2).href, "json");
  });
  it("should be #N.constructor init", () => {
    tasks.push(new Packaging());
    tasks.push(new Packaging());
    tasks.forEach(pack => {
      assert.strictEqual(pack.direction, null);
      assert.strictEqual(pack.version, null);
      assert.strictEqual(pack.metadata.size, 0);
      assert.strictEqual(pack.manifest.size, 0);
      assert.strictEqual(pack.spine.size, 0);
      assert.strictEqual(pack.uniqueIdentifier, null);
      assert.strictEqual(pack.writingMode, null);
    });
  });
  it("should be #1.parse package.opf", async () => {
    const pack = tasks[0];
    await pack.parse(path1);
    assert.strictEqual(pack.direction, ""); // fixed --> "ltr"
    assert.strictEqual(pack.version, "3.0");
    assert.strictEqual(pack.metadata.size, 10);
    assert.strictEqual(pack.manifest.size, 42);
    assert.strictEqual(pack.spine.size, 13);
    assert.strictEqual(pack.uniqueIdentifier, "edu.nyu.itp.future-of-publishing.alice-in-wonderland");
    assert.strictEqual(pack.writingMode, null);
  });
  it("should be #2.load package.json", async () => {
    const pack = tasks[1];
    await pack.load(path2);
    assert.strictEqual(pack.direction, "ltr");
    assert.strictEqual(pack.version, "3.0");
    assert.strictEqual(pack.metadata.size, 10);
    assert.strictEqual(pack.manifest.size, 42);
    assert.strictEqual(pack.spine.size, 13);
    assert.strictEqual(pack.uniqueIdentifier, "edu.nyu.itp.future-of-publishing.alice-in-wonderland");
    assert.strictEqual(pack.writingMode, null); // fixed --> "horizontal-tb"
  });
  it("should be #N.clear object data", () => {
    tasks.forEach(pack => {
      pack.clear();
      assert.strictEqual(pack.direction, null);
      assert.strictEqual(pack.version, null);
      assert.strictEqual(pack.writingMode, null);
      assert.strictEqual(pack.metadata.size, 0);
      assert.strictEqual(pack.manifest.size, 0);
      assert.strictEqual(pack.spine.size, 0);
      assert.strictEqual(pack.uniqueIdentifier, null);
    });
  });
  it("should be #N.destroy all packages", () => {
    tasks.forEach(pack => {
      pack.destroy();
      assert.strictEqual(pack.direction, undefined);
      assert.strictEqual(pack.version, undefined);
      assert.strictEqual(pack.metadata, undefined);
      assert.strictEqual(pack.manifest, undefined);
      assert.strictEqual(pack.spine, undefined);
      assert.strictEqual(pack.uniqueIdentifier, undefined);
      assert.strictEqual(pack.writingMode, undefined);
    });
  });
});
