import assert from "assert";
import Book from "../src/book";
import Locations from "../src/locations";

describe("Locations", function () {
  let book, rendition, locations, sections = {};
  const chars = 549;
  this.timeout(10000);
  before(async () => {
    book = new Book("../assets/alice/");
    await book.opened;
    rendition = book.renderTo(document.body);
    const set = (index, section) => {
      sections[index] = {
        cfi: rendition.currentLocation().start.cfi,
        idx: section.index
      }
    };
    const tasks = [];
    for (let i = 2; i < 13; ++i) {
      tasks.push(rendition.display(i).then((s) => set(i, s)));
    }
    return Promise.all(tasks);
  });
  describe("#parse()", () => {
    it("should parse locations from a document", async () => {
      const sec = book.section(sections[2].idx);
      const lcs = new Locations();
      await lcs.parse(sec.contents, sec.cfiBase, chars);
      const loc = [...lcs.values()][0];
      assert.equal(lcs.size, 1);
      assert.equal(loc.cfi, "epubcfi(/6/6!/4/2,/4[pgepubid00001]/1:0,/14/4/2/1:33)");
      assert.equal(loc.index, 0);
      assert.equal(loc.percentage, 0);
    });
  });
  describe("#generate()", () => {
    it("should generate locations", async () => {
      await book.locations.generate(chars);
      assert.equal(book.locations.size, 101);
    });
  });
  describe("#set()", () => {
    it("should set current location by epubcfi", () => {
      const locs = book.locations;
      const curr = book.locations.current;
      locs.set({ cfi: sections[3].cfi });
      assert.equal(curr.index, 1);
      assert.equal(curr.percentage, 0.01);
      locs.set({ cfi: sections[4].cfi });
      assert.equal(curr.index, 14);
      assert.equal(curr.percentage, 0.14);
      locs.set({ cfi: sections[5].cfi });
      assert.equal(curr.index, 25);
      assert.equal(curr.percentage, 0.25);
      locs.set({ cfi: sections[6].cfi });
      assert.equal(curr.index, 36);
      assert.equal(curr.percentage, 0.36);
      locs.set({ cfi: sections[7].cfi });
      assert.equal(curr.index, 50);
      assert.equal(curr.percentage, 0.50);
      locs.set({ cfi: sections[8].cfi });
      assert.equal(curr.index, 61);
      assert.equal(curr.percentage, 0.61);
      locs.set({ cfi: sections[9].cfi });
      assert.equal(curr.index, 71);
      assert.equal(curr.percentage, 0.71);
      locs.set({ cfi: sections[10].cfi });
      assert.equal(curr.index, 77);
      assert.equal(curr.percentage, 0.77);
      locs.set({ cfi: sections[11].cfi });
      assert.equal(curr.index, 89);
      assert.equal(curr.percentage, 0.89);
      locs.set({ cfi: sections[12].cfi });
      assert.equal(curr.index, 95);
      assert.equal(curr.percentage, 0.95);
    });
    it("should set current location by index", () => {
      const locs = book.locations;
      const curr = book.locations.current;
      const keys = [...locs.keys()];
      locs.on("changed", (current, changed) => {
        if (changed.index) {
          assert.equal(current.cfi, keys[changed.index]);
          assert.equal(current.index, changed.index);
        }
      });
      locs.set({ index: 1  }); // section:03
      assert.equal(curr.percentage, 0.01);
      locs.set({ index: 14 }); // section:04
      assert.equal(curr.percentage, 0.14);
      locs.set({ index: 25 }); // section:05
      assert.equal(curr.percentage, 0.25);
      locs.set({ index: 36 }); // section:06
      assert.equal(curr.percentage, 0.36);
      locs.set({ index: 50 }); // section:07
      assert.equal(curr.percentage, 0.50);
      locs.set({ index: 61 }); // section:08
      assert.equal(curr.percentage, 0.61);
      locs.set({ index: 71 }); // section:09
      assert.equal(curr.percentage, 0.71);
      locs.set({ index: 77 }); // section:10
      assert.equal(curr.percentage, 0.77);
      locs.set({ index: 89 }); // section:11
      assert.equal(curr.percentage, 0.89);
      locs.set({ index: 95 }); // section:12
      assert.equal(curr.percentage, 0.95);
    })
    it("should set current location by percentage", () => {
      const locs = book.locations;
      const curr = book.locations.current;
      const keys = [...locs.keys()];
      locs.on("changed", (current, changed) => {
        if (changed.percentage) {
          assert.equal(current.cfi, keys[current.index]);
          assert.equal(current.percentage, changed.percentage);
        }
      });
      locs.set({ percentage: 0.01 }); // section:03
      assert.equal(curr.index, 1);
      locs.set({ percentage: 0.14 }); // section:04
      assert.equal(curr.index, 14);
      locs.set({ percentage: 0.25 }); // section:05
      assert.equal(curr.index, 25);
      locs.set({ percentage: 0.36 }); // section:06
      assert.equal(curr.index, 36);
      locs.set({ percentage: 0.50 }); // section:07
      assert.equal(curr.index, 50);
      locs.set({ percentage: 0.61 }); // section:08
      assert.equal(curr.index, 61);
      locs.set({ percentage: 0.71 }); // section:09
      assert.equal(curr.index, 71);
      locs.set({ percentage: 0.77 }); // section:10
      assert.equal(curr.index, 77);
      locs.set({ percentage: 0.89 }); // section:11
      assert.equal(curr.index, 89);
      locs.set({ percentage: 0.95 }); // section:12
      assert.equal(curr.index, 95);
    });
  });
  describe("#cfiFromPercentage()", () => {
    it("should get epubcfi from percentage", () => {
      const locs = book.locations;
      const keys = [...locs.keys()];
      keys.forEach((key, index) => {
        const percentage = index / (locs.size - 1);
        assert.equal(key, locs.cfiFromPercentage(percentage));
      });
    });
  });
  describe("#save()", () => {
    it("should save locations", () => {
      locations = book.locations.save();
      assert.ok(locations);
    });
  });
  describe("#clear()", () => {
    it("should clear locations", () => {
      book.locations.clear();
      assert.equal(book.locations.size, 0);
    });
  });
  describe("#load()", () => {
    it("should load locations", () => {
      book.locations.load(locations);
      assert.equal(book.locations.size, 101);
    });
  });
});
