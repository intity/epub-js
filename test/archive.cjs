const assert = require("node:assert");
const { describe, before, it } = require("node:test");
const { pathToFileURL } = require("url");
const path = require("path");
const JSZip = require("jszip");
const Archive = require("../src/archive").default;

const CONTAINER_PATH_0 = "META-INF/container.xml";
const CONTAINER_PATH_1 = "META-INF/container.json";
const TEST_LIST = [];

describe("Archive", () => {
  let bookPath;
  before(async () => {
    const absolutePath = path.resolve(__dirname, "../assets/alice.epub");
    bookPath = pathToFileURL(absolutePath).href;
  });
  it("should be #0.constructor init (JSZip instance)", () => {
    const archive = new Archive();
    TEST_LIST.push({ archive });
    assert.ok(archive.instance instanceof JSZip);
  });
  it("should be #0.openUrl *.epub file", async () => {
    const { archive } = TEST_LIST[0];
    const jszip = await archive.openUrl(bookPath);
    const mimetype = jszip.files["mimetype"];
    assert.ok(jszip instanceof JSZip);
    assert.ok(mimetype.date instanceof Date);
    assert.strictEqual(mimetype.name, "mimetype");
    assert.strictEqual(mimetype.dir, false);
  });
  it("should be #0.get entry from archive by URI", () => {
    const { archive } = TEST_LIST[0];
    const entry = archive.get("/META-INF/container.xml");
    assert.ok(entry.date instanceof Date);
    assert.strictEqual(entry.name, CONTAINER_PATH_0);
    assert.strictEqual(entry.dir, false);
  });
  it("should be #0.clear object (JSZip.files empty)", async () => {
    const { archive } = TEST_LIST[0];
    archive.clear();
    assert.strictEqual(Object.keys(archive.instance.files).length, 0);
    assert.strictEqual(archive.instance.files["mimetype"], undefined);
  });
  it("should be #0.destroy object", () => {
    const { archive } = TEST_LIST[0];
    archive.destroy();
    Object.keys(archive).forEach(p => {
      assert.strictEqual(archive[p], undefined);
    });
  });
});
