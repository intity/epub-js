const assert = require("node:assert");
const { describe, before, it } = require("node:test");
const { pathToFileURL } = require("url");
const path = require("path");
const JSZip = require("jszip");

const CONTAINER_PATH_0 = "META-INF/container.xml";
const CONTAINER_PATH_1 = "META-INF/container.json";
const TEST_LIST = [];

describe("Archive", () => {
  let bookPath;
  before(async () => {
    const absolutePath = path.resolve(__dirname, "../assets/alice.epub");
    bookPath = pathToFileURL(absolutePath).href;
  });
  it("should be created #1.instance JSZip", () => {
    const Archive = require("../src/archive").default;
    const archive = new Archive();
    TEST_LIST.push({ archive });
    assert.ok(archive.instance instanceof JSZip);
  });
  it("should be #1.openUrl *.epub file", async () => {
    const { archive } = TEST_LIST[0];
    const jszip = await archive.openUrl(bookPath);
    assert.ok(jszip instanceof JSZip);
  });
  it("should be #1.get entry from archive by URI", () => {
    const { archive } = TEST_LIST[0];
    const entry = archive.get("/META-INF/container.xml");
    assert.strictEqual(entry.name, CONTAINER_PATH_0);
  });
  it("should be #1.clear instance", async () => {
    const { archive } = TEST_LIST[0];
    archive.clear();
    //assert.ok();
  });
});
