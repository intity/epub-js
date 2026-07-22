import assert from "assert";
import Book from "../src/book";
import Locations from "../src/locations";
import request from "../src/utils/request";

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
      const idx = sections[2].idx;
      const sec = book.section(idx);
      const lcs = new Locations();
      await lcs.parse(sec.contents, sec.cfiBase, chars);
      const loc = [...lcs.values()][0];
      assert.equal(idx, 2);
      assert.equal(lcs.size, 1);
      assert.equal(loc.start.cfi, "epubcfi(/6/6!/4/2,/4[pgepubid00001]/1:0,/14/4/2/1:33)");
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
      locs.set({ start: { cfi: sections[3].cfi } });
      assert.equal(curr.start.index, 1);
      assert.equal(curr.start.percentage, 0.01);
      locs.set({ start: { cfi: sections[4].cfi } });
      assert.equal(curr.start.index, 14);
      assert.equal(curr.start.percentage, 0.14);
      locs.set({ start: { cfi: sections[5].cfi } });
      assert.equal(curr.start.index, 25);
      assert.equal(curr.start.percentage, 0.25);
      locs.set({ start: { cfi: sections[6].cfi } });
      assert.equal(curr.start.index, 36);
      assert.equal(curr.start.percentage, 0.36);
      locs.set({ start: { cfi: sections[7].cfi } });
      assert.equal(curr.start.index, 50);
      assert.equal(curr.start.percentage, 0.50);
      locs.set({ start: { cfi: sections[8].cfi } });
      assert.equal(curr.start.index, 61);
      assert.equal(curr.start.percentage, 0.61);
      locs.set({ start: { cfi: sections[9].cfi } });
      assert.equal(curr.start.index, 71);
      assert.equal(curr.start.percentage, 0.71);
      locs.set({ start: { cfi: sections[10].cfi } });
      assert.equal(curr.start.index, 77);
      assert.equal(curr.start.percentage, 0.77);
      locs.set({ start: { cfi: sections[11].cfi } });
      assert.equal(curr.start.index, 89);
      assert.equal(curr.start.percentage, 0.89);
      locs.set({ start: { cfi: sections[12].cfi } });
      assert.equal(curr.start.index, 95);
      assert.equal(curr.start.percentage, 0.95);
    });
    it("should set current location by index", () => {
      const locs = book.locations;
      const curr = book.locations.current;
      const keys = [...locs.keys()];
      locs.on("changed", (current, changed) => {
        if (changed.start.index) {
          assert.equal(current.start.cfi, keys[current.start.index]);
          assert.equal(current.start.index, changed.start.index);
        }
      });
      locs.set({ start: { index: 1 } }); // section:03
      assert.equal(curr.start.percentage, 0.01);
      locs.set({ start: { index: 14 } }); // section:04
      assert.equal(curr.start.percentage, 0.14);
      locs.set({ start: { index: 25 } }); // section:05
      assert.equal(curr.start.percentage, 0.25);
      locs.set({ start: { index: 36 } }); // section:06
      assert.equal(curr.start.percentage, 0.36);
      locs.set({ start: { index: 50 } }); // section:07
      assert.equal(curr.start.percentage, 0.50);
      locs.set({ start: { index: 61 } }); // section:08
      assert.equal(curr.start.percentage, 0.61);
      locs.set({ start: { index: 71 } }); // section:09
      assert.equal(curr.start.percentage, 0.71);
      locs.set({ start: { index: 77 } }); // section:10
      assert.equal(curr.start.percentage, 0.77);
      locs.set({ start: { index: 89 } }); // section:11
      assert.equal(curr.start.percentage, 0.89);
      locs.set({ start: { index: 95 } }); // section:12
      assert.equal(curr.start.percentage, 0.95);
    });
    it("should set current location by percentage", () => {
      const locs = book.locations;
      const curr = book.locations.current;
      const keys = [...locs.keys()];
      locs.on("changed", (current, changed) => {
        if (changed.start.percentage) {
          assert.equal(current.start.cfi, keys[current.start.index]);
          assert.equal(current.start.percentage, changed.start.percentage);
        }
      });
      locs.set({ start: { percentage: 0.01 } }); // section:03
      assert.equal(curr.start.index, 1);
      locs.set({ start: { percentage: 0.14 } }); // section:04
      assert.equal(curr.start.index, 14);
      locs.set({ start: { percentage: 0.25 } }); // section:05
      assert.equal(curr.start.index, 25);
      locs.set({ start: { percentage: 0.36 } }); // section:06
      assert.equal(curr.start.index, 36);
      locs.set({ start: { percentage: 0.50 } }); // section:07
      assert.equal(curr.start.index, 50);
      locs.set({ start: { percentage: 0.61 } }); // section:08
      assert.equal(curr.start.index, 61);
      locs.set({ start: { percentage: 0.71 } }); // section:09
      assert.equal(curr.start.index, 71);
      locs.set({ start: { percentage: 0.77 } }); // section:10
      assert.equal(curr.start.index, 77);
      locs.set({ start: { percentage: 0.89 } }); // section:11
      assert.equal(curr.start.index, 89);
      locs.set({ start: { percentage: 0.95 } }); // section:12
      assert.equal(curr.start.index, 95);
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
    it("should clear locations #1", () => {
      book.locations.clear();
      assert.equal(book.locations.size, 0);
    });
  });
  describe("#load()", () => {
    it("should load locations from string", () => {
      book.locations.load(locations);
      assert.equal(book.locations.size, 101);
    });
    it("should clear locations #2", () => {
      book.locations.clear();
      assert.equal(book.locations.size, 0);
    });
    it("should load locations from ./data.json", async () => {
      const items = await request("./data.json", "json");
      const data = JSON.stringify({ items });
      book.locations.load(data);
      assert.equal(book.locations.size, 66);
    });
  });
});
