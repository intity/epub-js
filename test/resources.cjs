const assert = require("node:assert");
const { describe, before, after, it } = require("node:test");
const Book = require("../src/book").default;
const Archive = require("../src/archive").default;
const Storage = require("../src/storage").default;
const Packaging = require("../src/packaging").default;
const Resources = require("../src/resources").default;
const Container = require("../src/container").default;
const { pathToFileURL } = require("url");
const fs = require("fs");

const CONTAINER_PATH_0 = "META-INF/container.xml";
const CONTAINER_PATH_1 = "META-INF/container.json";
const TEST_LIST = [];

const init = async () => {
  //--NOTE: Init book object without called the book.open() method
  const path = require("path");
  const absolutePath = path.resolve(__dirname, "../assets/alice.epub");
  const bookPath = pathToFileURL(absolutePath).href;
  //--BOOK_INIT [in: BOOK_PATH]
  const book = new Book(bookPath);
  //--ARCHIVE_INIT
  book.archive = new Archive();
  book.storage = new Storage("epub-js-test");
  book.archived = true;
  //--BOOK_PATH: file:///.../assets/alice.epub
  //--BOOK_ARCHIVE_OPEN [in: BOOK_PATH, out: object]
  //--TODO: add method to 'book.fromURI' --> 'book.archive.openUrl'
  const data = await book.archive.openUrl(bookPath);
  //--BOOK_RESOLVE [in: META-INF/container.xml]
  const containerPath = book.resolve(CONTAINER_PATH_0);
  //--ARCH_REQUEST [in: /META-INF/container.xml, out: Document]
  const containerData = await book.archive.request(containerPath);
  //--BOOK_CONTAINER_PARSE [in: Document, out: Container]
  //--TODO: mv property 'book.container' --> 'book.archive.container'
  const containerInst = await book.container.parse(containerData);
  //--PACK_PATH [in: OPS/package.opf, out: /OPS/package.opf]
  const packPath = "\/" + containerInst.fullPath;
  //--ARCH_REQUEST [in: /OPS/package.opf, out: Document]
  const packData = await book.archive.request(packPath);
  //--BOOK_PACKAGING_PARSE [in: Document, out: Packaging]
  const pack = await book.packaging.parse(packData);
  //--BOOK_RESOURCES_INST [out: Resources]
  const inst = book.resources;
  return Promise.resolve({ book, data, pack, inst });
};

describe("Resources", () => {
  before(async () => {
    const pr = await init();
    TEST_LIST.push(pr); // [0]
  });
  after(async () => {
    const { book } = TEST_LIST[0];
    book.destroy();
  });
  it("should be #1.constructor init", () => {
    const { book } = TEST_LIST[0];
    const inst = new Resources(book.request, book.resolve, "blobUrl");
    inst.archive = new Archive();
    inst.storage = new Storage("epub-js-test");
    TEST_LIST.push({ inst }); // [1]
    assert.strictEqual(inst.size, 0);
  });
  it("should be #0.unpack resources", async () => {
    const { book, pack, inst } = TEST_LIST[0];
    await inst.unpack(
      pack.manifest,
      book.archive,
      book.storage
    );
    assert.strictEqual(inst.size, 29);
  });
  it("should be #0.resolve keys", async () => {
    const { inst } = TEST_LIST[0];
    inst.forEach((v, k) => {
      const key = inst.resolve(k);
      const entry = inst.archive.get(key);
      assert.strictEqual(entry.name, key.substring(1));
    });
  });
  it("should be #0.createUrl (blob URL)", async () => {
    const { inst } = TEST_LIST[0];
    const path = "images/cover_th.jpg";
    const href = inst.resolve(path);
    const type = "blob";
    const blob = await inst.archive.request(href, type);
    const bURL = await inst.createUrl(href, type);
    assert.ok(blob instanceof Blob);
    assert.ok(/blob:/.test(bURL));
    assert.strictEqual(href, "/OPS/images/cover_th.jpg");
    assert.strictEqual(blob.size, 36192);
    assert.strictEqual(blob.type, "image/jpeg");
    assert.strictEqual(inst.size, 29);
  });
  it("should be #0.revkeUrl (blob URL)", async () => {
    const { inst } = TEST_LIST[0];
    const path = "images/cover_th.jpg";
    const href = inst.resolve(path);
    const list = [
      inst.revokeUrl(href),
      inst.revokeUrl(path)
    ];
    const bURL = list[1].blobUrl;
    assert.ok(typeof list[0].blobUrl === "undefined");
    assert.ok(/blob:/.test(bURL));
    assert.strictEqual(href, "/OPS/images/cover_th.jpg");
    assert.strictEqual(list[0].result, 1);
    assert.strictEqual(list[1].result, 2); // success
    assert.strictEqual(inst.size, 29);
  });
  it("should be #N.destroy object", async () => {
    const { book } = TEST_LIST[0];
    const inst1 = book.resources;
    inst1.destroy();
    Object.keys(inst1).forEach(p => {
      if (!(p === "archive" || p === "storage")) {
        assert.strictEqual(inst1[p], undefined);
      }
    });
    assert.strictEqual(inst1.size, 0);
    const inst2 = TEST_LIST[1].inst;
    inst2.destroy();
    Object.keys(inst2).forEach(p => {
      if (!(p === "archive" || p === "storage")) {
        assert.strictEqual(inst2[p], undefined);
      }
    });
    assert.strictEqual(inst2.size, 0);
  });
});
