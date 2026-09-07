const assert = require("node:assert");
const fs = require("fs");
const { describe, it } = require("node:test");
const { pathToFileURL } = require("url");

const ASSERTION_TYPE = {
  INIT: "init",
  OPEN: "open",
  CLEAR: "clear",
  DESTROY: "destroy"
};

const INPUT_TYPE = {
  EPUB: "epub",
  BINARY: "binary",
  BASE64: "base64",
  DIRECTORY: "directory"
};

const TEST_LIST = [];

const epubToArrayBuffer = async (path) => {
  const nodeBuffer = fs.readFileSync(path);
  const uint8Array = new Uint8Array(nodeBuffer);
  return uint8Array.buffer;
};

const arrayBufferToBase64 = (buffer) => {
  let binary = "";
  let bytes = new Uint8Array(buffer);
  let len = bytes.byteLength;
  for (let i = 0; i < len; i++) {
    binary += String.fromCharCode(bytes[i]);
  }
  return window.btoa(binary);
};

const ctor = (book) => {
  assert.strictEqual(book.archive, undefined);
  assert.strictEqual(book.container.directory, "");
  assert.strictEqual(book.container.fullPath, "");
  assert.strictEqual(book.container.encoding, "");
  assert.strictEqual(book.container.mediaType, "");
  assert.strictEqual(book.container.version, "");
  assert.strictEqual(book.navigation.toc.length, 0);
  assert.strictEqual(book.rendition, undefined);
  assert.strictEqual(book.resources.size, 0);
  assert.strictEqual(book.sections.size, 0);
  assert.strictEqual(book.url, undefined);
};

const open = (book, { archived, path, type, uri }) => {
  switch (type) {
    case INPUT_TYPE.EPUB:
    case INPUT_TYPE.BASE64:
    case INPUT_TYPE.DIRECTORY:
      assert.ok(typeof path === "string");
      break;
    case INPUT_TYPE.BINARY:
      assert.ok(typeof path === "object");
      assert.ok(path instanceof ArrayBuffer);
      break;
  }
  assert.strictEqual(book.isOpen, true);
  assert.strictEqual(book.archived, archived);
  assert.strictEqual(book.container.directory, "OPS/");
  assert.strictEqual(book.container.fullPath, "OPS/package.opf");
  assert.strictEqual(book.container.encoding, "UTF-8");
  assert.strictEqual(book.container.mediaType, "application/oebps-package+xml");
  assert.strictEqual(book.container.version, "1.0");
  assert.strictEqual(book.url.toString(), uri);
};

const clear = (book) => {
  if (book.archived) {
    const jszip = book.archive.instance;
    const props = jszip.files;
    assert.ok(typeof props === "object");
    assert.strictEqual(Object.keys(props).length, 0);
    assert.strictEqual(jszip.comment, null);
    assert.strictEqual(jszip.root, "");
  } else {
    assert.strictEqual(book.archive, undefined);
  }
  //assert.strictEqual(book.isOpen, false);
  // move packaging
  assert.strictEqual(book.packaging.metadata.size, 0);
  assert.strictEqual(book.packaging.manifest.size, 0);
  assert.strictEqual(book.packaging.spine.size, 0);
  assert.strictEqual(book.packaging.direction, null);
  assert.strictEqual(book.packaging.version, null);
  assert.strictEqual(book.packaging.uniqueIdentifier, null);
  assert.strictEqual(book.packaging.writingMode, null);
};

const destroy = (book) => {
  Object.keys(book).forEach(p =>  {
    assert.strictEqual(book[p], undefined);
  });
};

const assertion = (book, type, opts) => {
  switch (type) {
    case ASSERTION_TYPE.INIT:
      ctor(book);
      break;
    case ASSERTION_TYPE.OPEN:
      open(book, opts);
      break;
    case ASSERTION_TYPE.CLEAR:
      clear(book);
      break;
    case ASSERTION_TYPE.DESTROY:
      destroy(book);
      break;
  }
};

const init = async (p, type) => {
  const Book = require("../src/book").default;
  const path = require("path");
  const data = {
    book: new Book(),
    path: null,
    type
  };
  const target = path.resolve(__dirname, p);
  switch (type) {
    case INPUT_TYPE.EPUB:
      data.path = pathToFileURL(target).href;
      break;
    case INPUT_TYPE.BINARY:
      data.path = await epubToArrayBuffer(target);
      break;
    case INPUT_TYPE.BASE64:
      const bin = await epubToArrayBuffer(target);
      data.path = arrayBufferToBase64(bin);
      break;
    case INPUT_TYPE.DIRECTORY:
      data.path = pathToFileURL(target).href + "/";
      break;
  }
  TEST_LIST.push(data);
  return Promise.resolve(data);
};

describe("Book", () => {
  it("should init book #1 type:epub", async () => {
    const { book } = await init("../assets/alice.epub", INPUT_TYPE.EPUB);
    assertion(book, ASSERTION_TYPE.INIT);
  });
  it("should init book #2 type:binary", async () => {
    const { book } = await init("../assets/alice.epub", INPUT_TYPE.BINARY);
    assertion(book, ASSERTION_TYPE.INIT);
  });
  it("should init book #3 type:base64", async () => {
    const { book } = await init("../assets/alice.epub", INPUT_TYPE.BASE64);
    assertion(book, ASSERTION_TYPE.INIT);
  });
  it("should init book #4 type:directory", async () => {
    const { book } = await init("../assets/alice/", INPUT_TYPE.DIRECTORY);
    assertion(book, ASSERTION_TYPE.INIT);
  });
  it("should open book #1", async () => {
    const { book, path, type } = TEST_LIST[0];
    await book.open(path);
    await book.opened;
    assertion(book, ASSERTION_TYPE.OPEN, {
      archived: true,
      path,
      type,
      uri: "/"
    });
  });
  it("should open book #2", async () => {
    const { book, path, type } = TEST_LIST[1];
    await book.open(path);
    await book.opened;
    assertion(book, ASSERTION_TYPE.OPEN, {
      archived: true,
      path,
      type,
      uri: "/"
    });
  });
  it("should open book #3", async () => {
    const { book, path, type } = TEST_LIST[2];
    await book.open(path, "base64");
    await book.opened;
    assertion(book, ASSERTION_TYPE.OPEN, {
      archived: true,
      path,
      type,
      uri: "/"
    });
  });
  it("should open book #4", async () => {
    const { book, path, type } = TEST_LIST[3];
    await book.open(path);
    await book.opened;
    assertion(book, ASSERTION_TYPE.OPEN, {
      archived: false,
      path,
      type,
      uri: path
    });
  });
  it("should clear book #1", async () => {
    const book = TEST_LIST[0].book;
    await book.clear();
    assertion(book, ASSERTION_TYPE.CLEAR);
  });
  it("should clear book #2", async () => {
    const book = TEST_LIST[1].book;
    await book.clear();
    assertion(book, ASSERTION_TYPE.CLEAR);
  });
  it("should clear book #3", async () => {
    const book = TEST_LIST[2].book;
    await book.clear();
    assertion(book, ASSERTION_TYPE.CLEAR);
  });
  it("should clear book #4", async () => {
    const book = TEST_LIST[3].book;
    await book.clear();
    assertion(book, ASSERTION_TYPE.CLEAR);
  });
  it("should destroy book #1", () => {
    const book = TEST_LIST[0].book;
    book.destroy();
    assertion(book, ASSERTION_TYPE.DESTROY);
  });
  it("should destroy book #2", () => {
    const book = TEST_LIST[1].book;
    book.destroy();
    assertion(book, ASSERTION_TYPE.DESTROY);
  });
  it("should destroy book #3", () => {
    const book = TEST_LIST[2].book;
    book.destroy();
    assertion(book, ASSERTION_TYPE.DESTROY);
  });
  it("should destroy book #4", () => {
    const book = TEST_LIST[3].book;
    book.destroy();
    assertion(book, ASSERTION_TYPE.DESTROY);
  });
});
