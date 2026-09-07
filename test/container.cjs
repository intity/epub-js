const assert = require("node:assert");
const { describe, before, it } = require("node:test");
const Container = require("../src/container").default;
const path = require("path");
const request = require("../src/utils/request").default;
const { pathToFileURL } = require("url");

describe("Container", () => {
  let filePath, inst, xml;
  before(async () => {
    const absolutePath = path.resolve(__dirname, "../assets/handbook/META-INF/container.xml");
    filePath = pathToFileURL(absolutePath).href;
    xml = await request(filePath, "xml");
  });
  it("should be create instance #1.container", () => {
    inst = new Container();
    Object.keys(inst).forEach(p => {
      assert.strictEqual(inst[p], "");
    });
    assert.ok(xml instanceof Document);
  });
  it("should be #1.parse document", async () => {
    const obj = await inst.parse(xml); // container object
    assert.strictEqual(obj.directory, "EPUB/");
    assert.strictEqual(obj.fullPath, "EPUB/package.opf");
    assert.strictEqual(obj.encoding, "UTF-8");
    assert.strictEqual(obj.mediaType, "application/oebps-package+xml");
    assert.strictEqual(obj.version, "1.0");
  });
  it("should be #1.destroy container object", () => {
    inst.destroy();
    Object.keys(inst).forEach(p => {
      assert.strictEqual(inst[p], undefined);
    });
  });
});
