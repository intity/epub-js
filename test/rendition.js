import assert from "assert";
import Book from "../src/book";
import CustomVM from "./manager";

const TEST_LIST = [];
const TEST_PR = {
  book: null,
  index: -1
};

const url = (path) => (/epub-js/.test(location.href) ? "/epub-js" : "") + path;
const init = async (n, options) => {
  let book, rendition, manager;
  if (TEST_PR.index === -1) {
    TEST_PR.book = new Book(url("/assets/handbook/"));
    await TEST_PR.book.opened;
    book = TEST_PR.book;
  } else {
    book = TEST_PR.book;
  }
  if (n === 1) {
    rendition = book.renderTo(document.body, options);
    await rendition.started;
    manager = rendition.manager;
  }
  TEST_PR.index += 1;
  const index = TEST_PR.index;
  TEST_LIST.push({
    book,
    rendition,
    manager,
    index
  });
  const value = TEST_LIST[TEST_PR.index];
  return Promise.resolve(value);
};

describe("Rendition", function () {
  this.timeout(3450);
  describe("#requireManager()", () => {
    let manager;
    before(async () => {
      const pr = await init(1, { manager: CustomVM }); // [0]
      await pr.rendition.display();
      manager = pr.manager;
    });
    it("should be custom manager", () => {
      assert.ok(manager instanceof CustomVM);
      assert.equal(typeof manager, "object");
      assert.equal(manager.name, "custom");
    });
  });
  describe("#display()", () => {
    let rendition;
    before(async () => {
      const pr = await init(1); // [1]
      rendition = pr.rendition;
    });
    it("should be displayed by default", async () => {
      const section = await rendition.display();
      assert.equal(section.cfiBase, "/6/2");
      assert.equal(section.index, 0);
      assert.equal(section.idref, "s0");
      assert.equal(section.href, "xhtml/cover.xhtml");
      assert.equal(section.linear, true);
      assert.equal(section.url, url("/assets/handbook/EPUB/xhtml/cover.xhtml"));
    });
    it("should be displayed by index", async () => {
      const section = await rendition.display(1);
      assert.equal(section.cfiBase, "/6/4");
      assert.equal(section.index, 1);
      assert.equal(section.idref, "s1");
      assert.equal(section.href, "xhtml/nav.xhtml");
      assert.equal(section.linear, true);
      assert.equal(section.url, url("/assets/handbook/EPUB/xhtml/nav.xhtml"));
    });
    it("should be displayed by idref", async () => {
      const section = await rendition.display("#s2");
      assert.equal(section.cfiBase, "/6/6");
      assert.equal(section.index, 2);
      assert.equal(section.idref, "s2");
      assert.equal(section.href, "xhtml/introduction.xhtml");
      assert.equal(section.url, url("/assets/handbook/EPUB/xhtml/introduction.xhtml"));
    });
    it("should be displayed by href", async () => {
      const section = await rendition.display("xhtml/mathml.xhtml");
      assert.equal(section.cfiBase, "/6/8");
      assert.equal(section.index, 3);
      assert.equal(section.idref, "s3");
      assert.equal(section.href, "xhtml/mathml.xhtml");
      assert.equal(section.url, url("/assets/handbook/EPUB/xhtml/mathml.xhtml"));
    });
    it("should be displayed by epubcfi", async () => {
      const section = await rendition.display("epubcfi(/6/8!/4/2[s3]/2[mathml]/1:0)");
      assert.equal(section.cfiBase, "/6/8");
      assert.equal(section.index, 3);
      assert.equal(section.idref, "s3");
      assert.equal(section.href, "xhtml/mathml.xhtml");
      assert.equal(section.url, url("/assets/handbook/EPUB/xhtml/mathml.xhtml"));
    });
  });
  describe("#next()", () => {
    let rendition;
    before(async () => {
      const pr = await init(1); // [2]
      await pr.rendition.display(1);
      rendition = pr.rendition;
    });
    it("should be next to section index 2", async () => {
      await rendition.next();
      const loc = rendition.currentLocation();
      assert.equal(loc.start.index, 2);
    });
    it("should be next to section index 3", async () => {
      await rendition.next();
      const loc = rendition.currentLocation();
      assert.equal(loc.start.index, 3);
    });
  });
  describe("#prev()", () => {
    let rendition;
    before(async () => {
      const pr = await init(1); // [3]
      await pr.rendition.display(3);
      rendition = pr.rendition;
    });
    it("should be prev to section.index 2", async () => {
      await rendition.prev();
      const loc = rendition.currentLocation();
      assert.equal(loc.start.index, 2);
    });
    it("should be prev to section.index 1", async () => {
      await rendition.prev();
      const loc = rendition.currentLocation();
      assert.equal(loc.start.index, 1);
    });
  });
  describe("#resize()", () => {
    let rendition;
    before(async () => {
      const pr = await init(1, { spread: "none" }); // [4]
      await pr.rendition.display(3);
      rendition = pr.rendition;
    });
    it("should be viewport resizing to width 500", () => {
      const size = rendition.resize(500, "100%");
      assert.equal(size.width, 500);
    });
    it("should be viewport resizing to height 600", () => {
      const size = rendition.resize("100%", 600);
      assert.equal(size.height, 600);
    });
    it("should be viewport resizing by default", () => {
      const size = rendition.resize("100%", "100%");
      assert.equal(rendition.viewport.rect.width, size.width);
      assert.equal(rendition.viewport.rect.height, size.height);
    });
  });
  describe("#upateLayout()", () => {
    let rendition;
    before(async () => {
      const pr = await init(1, { spread: "auto" }); // [5]
      await pr.rendition.display(3);
      rendition = pr.rendition;
    });
    it("should be updating layout.spread:none", async () => {
      rendition.updateLayout({ spread: "none" });
      assert.equal(rendition.layout.spread, "none");
    });
    it("should be updating layout.spread:auto", async () => {
      rendition.updateLayout({ spread: "auto" });
      assert.equal(rendition.layout.spread, "auto");
    });
    it("should be updating layout.flow:scrolled", async () => {
      await rendition.updateLayout({ flow: "scrolled" });
      assert.equal(rendition.layout.flow, "scrolled");
    });
    it("should be updating layout.flow:scrolled-doc", async () => {
      await rendition.updateLayout({ flow: "scrolled-doc" });
      assert.equal(rendition.layout.flow, "scrolled-doc");
    });
    it("should be updating layout.flow:paginated", async () => {
      await rendition.updateLayout({ flow: "paginated" });
      assert.equal(rendition.layout.flow, "paginated");
    });
    it("should be updating layout.writingMode:vertical-rl", async () => {
      await rendition.updateLayout({ writingMode: "vertical-rl" });
      assert.equal(rendition.layout.writingMode, "vertical-rl");
    });
    it("should be updating layout.writingMode:vertical-lr", async () => {
      await rendition.updateLayout({ writingMode: "vertical-lr" });
      assert.equal(rendition.layout.writingMode, "vertical-lr");
    });
    it("should be updating layout.writingMode:horizontal-tb", async () => {
      await rendition.updateLayout({ writingMode: "horizintal-tb" });
      assert.equal(rendition.layout.writingMode, "horizontal-tb");
    });
  });
  describe("#destroy()", () => {
    after(() => {
      TEST_PR.index = -1;
    });
    it("should be #[0..5].destroy objects", () => {
      TEST_LIST.forEach((pr, i) => {
        pr.rendition.destroy(),
        Object.keys(pr.rendition).forEach(p => {
          if (
            p === "book" ||
            p === "location" ||
            p === "annotations" ||
            p === "settings"
          ) return;
          assert.equal(pr.rendition[p], undefined);
        });
      });
      assert.equal(TEST_PR.index, TEST_LIST.length - 1);
    });
  });
});
