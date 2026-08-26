const assert = require("node:assert");
const { describe, before, it } = require("node:test");
const request = require("../src/utils/request").default;
const EpubCFI = require("../src/epubcfi").default;
const { pathToFileURL } = require("url");

const ASSERTION_TYPE = {
  I: 0, // INIT
  H: 1, // HASH
  N: 2, // NODE
  R: 4  // RANGE
};
const TEST_LIST = [];

const assertion = (inst, hash, t) => {
  switch (t) {
    case ASSERTION_TYPE.I:
      //--TARGET
      assert.strictEqual(inst.hash, "");
      assert.strictEqual(inst.type, undefined);
      //--RANGE
      assert.strictEqual(inst.range, false);
      assert.strictEqual(inst.start, null);
      assert.strictEqual(inst.end, null);
      //--BASE:PATH
      assert.strictEqual(Object.keys(inst.base).length, 0);
      assert.strictEqual(Object.keys(inst.path).length, 0);
      //--MISC
      assert.strictEqual(inst.spinePos, 0);
      assert.strictEqual(inst.ignoreClass, "");
      assert.strictEqual(inst.toString(), "epubcfi(/!/)");
      break;
    case ASSERTION_TYPE.H:
      //--TARGET
      assert.strictEqual(inst.hash, hash);
      assert.strictEqual(inst.type, "string");
      //--RANGE
      if (inst.range) {
        assert.strictEqual(inst.range, true);
        assert.strictEqual(inst.start.steps.length, 1);
        assert.strictEqual(inst.end.steps.length, 1);
      } else {
        assert.strictEqual(inst.range, false);
        assert.strictEqual(inst.start, null);
        assert.strictEqual(inst.end, null);
      }
      //--BASE
      assert.strictEqual(inst.base.steps.length, 2);
      assert.strictEqual(inst.base.steps[0].id, null);
      assert.strictEqual(inst.base.steps[0].index, 2);
      assert.strictEqual(inst.base.steps[0].type, "element");
      assert.strictEqual(inst.base.steps[1].id, null);
      assert.strictEqual(inst.base.steps[1].index, 0);
      assert.strictEqual(inst.base.steps[1].type, "element");
      assert.strictEqual(inst.base.terminal.assertion, null);
      assert.strictEqual(inst.base.terminal.offset, null);
      //--PATH
      assert.strictEqual(inst.path.steps[0].id, null);
      assert.strictEqual(inst.path.steps[0].index, 1);
      assert.strictEqual(inst.path.steps[0].type, "element");
      assert.strictEqual(inst.path.steps[1].id, "toc");
      assert.strictEqual(inst.path.steps[1].index, 0);
      assert.strictEqual(inst.path.steps[1].type, "element");
      assert.strictEqual(inst.path.steps[2].id, "contents");
      assert.strictEqual(inst.path.steps[2].index, 0);
      assert.strictEqual(inst.path.steps[2].type, "element");
      assert.strictEqual(inst.path.terminal.assertion, null);
      if (inst.range) {
        assert.strictEqual(inst.path.steps.length, 3);
        assert.strictEqual(inst.path.terminal.offset, null);
      } else {
        assert.strictEqual(inst.path.steps.length, 4);
        assert.strictEqual(inst.path.steps[3].id, null);
        assert.strictEqual(inst.path.steps[3].index, 0);
        assert.strictEqual(inst.path.steps[3].type, "text");
        assert.strictEqual(inst.path.terminal.offset, 0);
      }
      //--MISC
      assert.strictEqual(inst.spinePos, 0);
      assert.strictEqual(inst.ignoreClass, "");
      assert.strictEqual(inst.toString(), hash);
      break;
    case ASSERTION_TYPE.N:
    case ASSERTION_TYPE.R:
      //--TARGET
      assert.strictEqual(inst.hash, "");
      if (inst.type === "node") {
        assert.strictEqual(inst.type, "node");
      } else {
        assert.strictEqual(inst.type, "range");
      }
      //--RANGE
      if (inst.range) {
        assert.strictEqual(inst.range, true);
      } else {
        assert.strictEqual(inst.range, false);
        assert.strictEqual(inst.start, null);
        assert.strictEqual(inst.end, null);
      }
      //--BASE
      assert.strictEqual(inst.base.steps.length, 2);
      assert.strictEqual(inst.base.steps[0].id, null);
      assert.strictEqual(inst.base.steps[0].index, 2);
      assert.strictEqual(inst.base.steps[0].type, "element");
      assert.strictEqual(inst.base.steps[1].id, null);
      assert.strictEqual(inst.base.steps[1].index, 0);
      assert.strictEqual(inst.base.steps[1].type, "element");
      assert.strictEqual(inst.base.terminal.assertion, null);
      assert.strictEqual(inst.base.terminal.offset, null);
      //--PATH
      assert.strictEqual(inst.path.steps.length, 0);
      assert.strictEqual(inst.path.terminal.assertion, null);
      if (inst.type === "node") {
        assert.strictEqual(inst.path.terminal.offset, null);
      } else {
        assert.strictEqual(inst.path.terminal.offset, 0);
      }
      //--MISC
      assert.strictEqual(inst.spinePos, 0);
      assert.strictEqual(inst.ignoreClass, "");
      if (inst.type === "node") {
        assert.strictEqual(inst.toString(), "epubcfi(/6/2!/)");
      } else {
        assert.strictEqual(inst.toString(), "epubcfi(/6/2!/:0)");
      }
      break;
  }
};

describe("EpubCFI", () => {
  before(async () => {
    const path = require("path");
    const absolutePath = path.resolve(__dirname, "../assets");
    const root = pathToFileURL(absolutePath).href;
    const doc0 = await request(root + "/handbook/EPUB/xhtml/nav.xhtml");
    const doc1 = await request(root + "/chapter1.xhtml");
    const doc2 = await request(root + "/chapter1-highlights.xhtml");
    const doc3 = await request(root + "/highlight.xhtml");
    const base = "/6/2";
    const base2 = "/6/4[chap01ref]";
    const hash = "epubcfi(/6/2!/4/2[toc]/2[contents]/1:0)";
    const inst = new EpubCFI();
    TEST_LIST.push({ inst, base, base2, hash, doc0, doc1, doc2, doc3 });
  });
  it("should be #1.constructor init by default", () => {
    const inst = new EpubCFI();
    TEST_LIST.push({ inst });
    assertion(inst, null, ASSERTION_TYPE.I);
  });
  it("should be #2.constructor init with (hash)", () => {
    const hash = "epubcfi(/6/2!/4/2[toc]/2[contents]/1:0)";
    const inst = new EpubCFI(hash);
    TEST_LIST.push({ inst });
    assertion(inst, hash, ASSERTION_TYPE.H);
  });
  it("should be #3.constructor init with (hash) to range", () => {
    const hash = "epubcfi(/6/2!/4/2[toc]/2[contents],/1:0,/1:17)";
    const inst = new EpubCFI(hash);
    assertion(inst, hash, ASSERTION_TYPE.H);
  });
  it("should be #4.constructor init with (node, base)", () => {
    const { base, doc0 } = TEST_LIST[0];
    const node = doc0.documentElement;
    const inst = new EpubCFI(node, base);
    TEST_LIST.push({ inst });
    assertion(inst, null, ASSERTION_TYPE.N);
  });
  it("should be #5.constructor init with (range, base)", () => {
    const { base, doc0 } = TEST_LIST[0];
    const range = doc0.createRange();
    const inst = new EpubCFI(range, base);
    TEST_LIST.push({ inst });
    assertion(inst, null, ASSERTION_TYPE.R);
  });
  it("should be #0.set epubcfi.hash", () => {
    const { inst, hash } = TEST_LIST[0];
    inst.set({ data: hash });
    assertion(inst, hash, ASSERTION_TYPE.H);
  });
  it("should be #0.set epubcfi.base component", () => {
    const { inst, base, hash } = TEST_LIST[0];
    inst.set({ base });
    assertion(inst, hash, ASSERTION_TYPE.H);
  });
  it("should be #0.set epubcfi.type of node", () => {
    const { inst, doc0 } = TEST_LIST[0];
    const data = doc0.documentElement;
    inst.set({ data });
    assertion(inst, null, ASSERTION_TYPE.N);
  });
  it("should be #0.set epubcfi.type of range", () => {
    const { inst, doc0 } = TEST_LIST[0];
    const data = doc0.createRange();
    inst.set({ data });
    assertion(inst, null, ASSERTION_TYPE.R);
  });
  it("should be #.parse a cfi", () => {
    const hash = "epubcfi(/6/2!/4/2[toc]/2[contents]/1:0)";
    const inst = EpubCFI.prototype.parse(hash);
    assertion(inst, hash, ASSERTION_TYPE.H);
  });
  it("should be #.parse a cfi with a character offset", () => {
    const hash = "epubcfi(/6/4[chap01ref]!/4[body01]/10[para05]/2/1:3)";
    const inst = EpubCFI.prototype.parse(hash);
    assert.strictEqual(inst.path.terminal.offset, 3);
  });
  it("should be #.parse a (hash) by range with offset", () => {
    const hash = "epubcfi(/6/4[chap01ref]!/4[body01]/10[para05],/2/1:1,/3:4)";
    const inst = EpubCFI.prototype.parse(hash);
    assert.strictEqual(inst.range, true);
    assert.strictEqual(inst.start.steps.length, 2);
    assert.strictEqual(inst.end.steps.length, 1);
    assert.strictEqual(inst.start.terminal.offset, 1);
    assert.strictEqual(inst.end.terminal.offset, 4);
  });
  it("should parse a cfi and write it back #6..8.toString", () => {
    const cfi0 = "epubcfi(/6/2[cover]!/6)";
    const cfi1 = "epubcfi(/6/4[chap01ref]!/4[body01]/10[para05]/2/1:3)";
    const cfi2 = "epubcfi(/6/4[chap01ref]!/4[body01]/10[para05],/2/1:1,/3:4)";
    const list = [
      new EpubCFI(cfi0),
      new EpubCFI(cfi1),
      new EpubCFI(cfi2)
    ];
    TEST_LIST.push(list[0]);
    TEST_LIST.push(list[1]);
    TEST_LIST.push(list[2]);
    assert.strictEqual(list[0].toString(), cfi0);
    assert.strictEqual(list[1].toString(), cfi1);
    assert.strictEqual(list[2].toString(), cfi2);
  });
  it("should determine the type as hash #.checkType", () => {
    const hash = "epubcfi(/6/2[cover]!/6)";
    const type = EpubCFI.prototype.checkType(hash);
    assert.strictEqual(type, "string");
  });
  it("should determine the type as node #.checkType", () => {
    const { doc0 } = TEST_LIST[0];
    const node = doc0.documentElement;
    const type = EpubCFI.prototype.checkType(node);
    assert.strictEqual(type, "node");
  });
  it("should determine the type as range #.checkType", () => {
    const { doc0 } = TEST_LIST[0];
    const range = doc0.createRange();
    const type = EpubCFI.prototype.checkType(range);
    assert.strictEqual(type, "range");
  });
  it("should determine the type as EpubCFI instance #9.checkType", () => {
    const hash = "epubcfi(/6/4[chap01ref]!/4[body01]/10[para05]/2/1:3)";
    const inst = new EpubCFI(hash);
    const type = EpubCFI.prototype.checkType(inst);
    TEST_LIST.push({ inst });
    assert.strictEqual(type, "EpubCFI");
  });
  it("should determine the type as 'undefined' #.checkType", () => {
    [
      "",
      "/6/2[cover]!/6",
      "epubcfi(/6/2[cover]!/6"
    ].forEach(val => {
      assert.strictEqual(EpubCFI.prototype.checkType(val), undefined);
    });
  });
  it("should be #0.compare CFIs", () => {
    const epubcfi = TEST_LIST[0].inst;
    // Spines
    assert.strictEqual(epubcfi.compare(
      "epubcfi(/6/4[cover]!/4)",
      "epubcfi(/6/2[cover]!/4)"
    ), 1, "First spine is greater");
    assert.strictEqual(epubcfi.compare(
      "epubcfi(/6/4[cover]!/4)",
      "epubcfi(/6/6[cover]!/4)"
    ), -1, "Second spine is greater");
    // First is deeper
    assert.strictEqual(epubcfi.compare(
      "epubcfi(/6/2[cover]!/8/2)",
      "epubcfi(/6/2[cover]!/6)"
    ), 1, "First Element is after Second");
    assert.strictEqual(epubcfi.compare(
      "epubcfi(/6/2[cover]!/4/2)",
      "epubcfi(/6/2[cover]!/6)"
    ), -1, "First Element is before Second");
    // Second is deeper
    assert.strictEqual(epubcfi.compare(
      "epubcfi(/6/2[cover]!/8/2)",
      "epubcfi(/6/2[cover]!/6/4/2/2)"
    ), 1, "First Element is after Second");
    assert.strictEqual(epubcfi.compare(
      "epubcfi(/6/2[cover]!/4/4)",
      "epubcfi(/6/2[cover]!/6/4/2/2)"
    ), -1, "First Element is before Second");
    assert.strictEqual(epubcfi.compare(
      "epubcfi(/6/2[cover]!/4/6)",
      "epubcfi(/6/2[cover]!/4/6/8/1:0)"
    ), -1, "First is less specific, so is before Second");
    // Same Depth
    assert.strictEqual(epubcfi.compare(
      "epubcfi(/6/2[cover]!/6/8)",
      "epubcfi(/6/2[cover]!/6/2)"
    ), 1, "First Element is after Second");
    assert.strictEqual(epubcfi.compare(
      "epubcfi(/6/2[cover]!/4/20)",
      "epubcfi(/6/2[cover]!/6/10)"
    ), -1, "First Element is before Second");
    // Text nodes
    assert.strictEqual(epubcfi.compare(
      "epubcfi(/6/2[cover]!/4/5)",
      "epubcfi(/6/2[cover]!/4/3)"
    ), 1, "First TextNode is after Second");
    assert.strictEqual(epubcfi.compare(
      "epubcfi(/6/2[cover]!/4/7)",
      "epubcfi(/6/2[cover]!/4/13)"
    ), -1, "First TextNode is before Second");
    // Char offset
    assert.strictEqual(epubcfi.compare(
      "epubcfi(/6/2[cover]!/4/5:1)",
      "epubcfi(/6/2[cover]!/4/5:0)"
    ), 1, "First Char Offset after Second");
    assert.strictEqual(epubcfi.compare(
      "epubcfi(/6/2[cover]!/4/5:2)",
      "epubcfi(/6/2[cover]!/4/5:30)"
    ), -1, "Second Char Offset before Second");
    // Normal example
    assert.strictEqual(epubcfi.compare(
      "epubcfi(/6/2[cover]!/4/8/5:1)",
      "epubcfi(/6/2[cover]!/4/6/15:2)"
    ), 1, "First Element after Second");
    assert.strictEqual(epubcfi.compare(
      "epubcfi(/6/2[cover]!/4/8/1:0)",
      "epubcfi(/6/2[cover]!/4/8/1:0)"
    ), 0, "All Equal");
    // Different Lengths
    assert.strictEqual(epubcfi.compare(
      "epubcfi(/6/16[id42]!/4[5N3C0-8c483216e03a4ff49927fc1a97dc7b2c]/10/1:317)",
      "epubcfi(/6/16[id42]!/4[5N3C0-8c483216e03a4ff49927fc1a97dc7b2c]/10/2[page18]/1:0)"
    ), -1, "First CFI is before Second");
    assert.strictEqual(epubcfi.compare(
      "epubcfi(/6/16[id42]!/4[5N3C0-8c483216e03a4ff49927fc1a97dc7b2c]/12/1:0)",
      "epubcfi(/6/16[id42]!/4[5N3C0-8c483216e03a4ff49927fc1a97dc7b2c]/12/2/1:9)"
    ), -1, "First CFI is before Second");
    assert.strictEqual(epubcfi.compare(
      "epubcfi(/6/16!/4/12/1:0)",
      "epubcfi(/6/16!/4/12/2/1:9)"
    ), -1, "First CFI is before Second");
  });
  it("should get a cfi from a p node #10.fromNode", () => {
    const { base2, doc2 } = TEST_LIST[0];
    const node = doc2.getElementById("c001p0004");
    const inst = new EpubCFI(node, base2);
    TEST_LIST.push({ inst });
    assert.strictEqual(node.nodeType, Node.ELEMENT_NODE, "provided a element node");
    assert.strictEqual(inst.toString(), "epubcfi(/6/4[chap01ref]!/4/2/10/2[c001p0004])");
  });
  it("should get a cfi from a text node #11.fromNode", () => {
    const { base2, doc2 } = TEST_LIST[0];
    const node = doc2.getElementById("c001p0004");
    const text = node.childNodes[0];
    const inst = new EpubCFI(text, base2);
    TEST_LIST.push({ inst });
    assert.strictEqual(text.nodeType, Node.TEXT_NODE, "provided a text node");
    assert.strictEqual(inst.toString(), "epubcfi(/6/4[chap01ref]!/4/2/10/2[c001p0004]/1)");
  });
  it("should get a cfi from a text node inside a highlight #12.fromNode", () => {
    const { base2, doc2 } = TEST_LIST[0];
    const node = doc2.getElementById("highlight-1");
    const text = node.childNodes[0];
    const inst = new EpubCFI(text, base2, "annotator-hl");
    TEST_LIST.push({ inst });
    assert.strictEqual(text.nodeType, Node.TEXT_NODE, "provided a text node");
    assert.strictEqual(inst.toString(), "epubcfi(/6/4[chap01ref]!/4/2/32/2[c001p0017]/1)");
  });
  it("should get a cfi from a highlight node #13.fromNode", () => {
    const { base2, doc2 } = TEST_LIST[0];
    const text = doc2.getElementById("highlight-1");
    const inst = new EpubCFI(text, base2, "annotator-hl");
    TEST_LIST.push({ inst });
    assert.strictEqual(text.nodeType, Node.ELEMENT_NODE, "provided a highlight node");
    assert.strictEqual(inst.toString(), "epubcfi(/6/4[chap01ref]!/4/2/32/2[c001p0017])");
  });
  it("should get a cfi from a collapsed range #14.fromRange", () => {
    const { base2, doc1 } = TEST_LIST[0];
    const t1 = doc1.getElementById("c001p0004").childNodes[0];
    const range = doc1.createRange();
    range.setStart(t1, 6);
    const inst = new EpubCFI(range, base2);
    TEST_LIST.push({ inst });
    assert.strictEqual(inst.range, false);
    assert.strictEqual(inst.toString(), "epubcfi(/6/4[chap01ref]!/4/2/10/2[c001p0004]/1:6)");
  });
  it("should get a cfi from a range #15.fromRange", () => {
    const { base2, doc1 } = TEST_LIST[0];
    const t1 = doc1.getElementById("c001p0004").childNodes[0];
    const t2 = doc1.getElementById("c001p0007").childNodes[0];
    const range = doc1.createRange();
    range.setStart(t1, 6);
    range.setEnd(t2, 27);
    const inst = new EpubCFI(range, base2);
    TEST_LIST.push({ inst });
    assert.strictEqual(inst.range, true);
    assert.strictEqual(inst.toString(), "epubcfi(/6/4[chap01ref]!/4/2,/10/2[c001p0004]/1:6,/16/2[c001p0007]/1:27)");
  });
  it("should get a cfi from a range with offset 0 #16.fromRange", () => {
    const { base2, doc1 } = TEST_LIST[0];
    const t1 = doc1.getElementById("c001p0004").childNodes[0];
    const range = doc1.createRange();
    range.setStart(t1, 0);
    range.setEnd(t1, 1);
    const inst = new EpubCFI(range, base2);
    TEST_LIST.push({ inst });
    assert.strictEqual(inst.range, true);
    assert.strictEqual(inst.toString(), "epubcfi(/6/4[chap01ref]!/4/2/10/2[c001p0004],/1:0,/1:1)");
  });
  it("should get a cfi from a range inside a highlight #17.fromRange", () => {
    const { base2, doc2 } = TEST_LIST[0];
    const t1 = doc2.getElementById("highlight-1").childNodes[0];
    const range = doc2.createRange();
    range.setStart(t1, 6);
    const inst = new EpubCFI(range, base2, "annotator-hl");
    TEST_LIST.push({ inst });
    assert.strictEqual(inst.toString(), "epubcfi(/6/4[chap01ref]!/4/2/32/2[c001p0017]/1:43)");
  });
  it("should get a cfi from a range past a highlight #18.fromRange", () => {
    const { base2, doc2 } = TEST_LIST[0];
    const t1 = doc2.getElementById("c001s0001").childNodes[1];
    const range = doc2.createRange();
    range.setStart(t1, 25);
    const inst = new EpubCFI(range, base2, "annotator-hl");
    TEST_LIST.push({ inst });
    assert.strictEqual(inst.toString(), "epubcfi(/6/4[chap01ref]!/4/2/4/2[c001s0001]/1:41)");
  }); // TODO: might need to have double ranges in front
  it("should get a cfi from a range in between two highlights #19.fromRange", () => {
    const { base2, doc3 } = TEST_LIST[0];
    const t1 = doc3.getElementById("p2").childNodes[1];
    const range = doc3.createRange();
    range.setStart(t1, 4);
    const inst = new EpubCFI(range, base2, "annotator-hl");
    TEST_LIST.push({ inst });
    assert.strictEqual(inst.toString(), "epubcfi(/6/4[chap01ref]!/4/4[p2]/1:123)");
  });
  it("should correctly count text nodes, independent of any elements present in between #20.fromRange", () => {
    const { base2, doc3 } = TEST_LIST[0];
    const t1 = doc3.getElementById("p3").childNodes[2];
    const range = doc3.createRange();
    range.setStart(t1, 4);
    const inst = new EpubCFI(range, base2);
    TEST_LIST.push({ inst });
    assert.strictEqual(inst.toString(), "epubcfi(/6/4[chap01ref]!/4/6[p3]/3:4)");
  });
  const ignoreClass = "annotator-hl";
  it("should get a range from a cfi #21.toRange", () => {
    const { base2, doc2 } = TEST_LIST[0];
    const t1 = doc2.getElementById("c001p0004").childNodes[0];
    const ogRange = doc2.createRange();
    ogRange.setStart(t1, 6);
    const inst = new EpubCFI(ogRange, base2);
    TEST_LIST.push({ inst });
    // Check it was parse correctly
    assert.strictEqual(inst.toString(), "epubcfi(/6/4[chap01ref]!/4/2/10/2[c001p0004]/1:6)");
    // Check the range
    const newRange = inst.toRange(doc2);
    assert.strictEqual(newRange.startContainer, t1);
    assert.strictEqual(newRange.startOffset, 6);
    assert.strictEqual(newRange.collapsed, true);
  });
  it("should get a range from a cfi with a range #22.toRange", () => {
    const { base2, doc2 } = TEST_LIST[0];
    const t1 = doc2.getElementById("c001p0004").childNodes[0];
    const t2 = doc2.getElementById("c001p0007").childNodes[0];
    const ogRange = doc2.createRange();
    ogRange.setStart(t1, 6);
    ogRange.setEnd(t2, 27);
    const inst = new EpubCFI(ogRange, base2);
    TEST_LIST.push({ inst });
    // Check it was parse correctly
    assert.strictEqual(inst.toString(), "epubcfi(/6/4[chap01ref]!/4/2,/10/2[c001p0004]/1:6,/16/2[c001p0007]/1:27)");
    // Check the range
    const newRange = inst.toRange(doc2);
    assert.strictEqual(newRange.startContainer, t1);
    assert.strictEqual(newRange.startOffset, 6);
    assert.strictEqual(newRange.endContainer, t2);
    assert.strictEqual(newRange.endOffset, 27);
    assert.strictEqual(newRange.collapsed, false);
  });
  it("should check if the string is wrapped using 'epubcfi()' #.isCfiString", () => {
    const hash = "epubcfi(/6/4[chap01ref]!/4/2,/10/2[c001p0004]/1:6,/16/2[c001p0007]/1:27)";
    assert.strictEqual(EpubCFI.prototype.isCfiString(hash), true);
  });
  it("should #N.destroy object", () => {
    TEST_LIST.forEach((v, i) => {
      if (v.inst instanceof EpubCFI) {
        v.inst.destroy();
        Object.keys(v.inst).forEach(p => {
          assert.strictEqual(v.inst[p], undefined);
        });
      }
    });
  });
});
