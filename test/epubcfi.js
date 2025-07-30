import assert from "assert"
import request from "../src/utils/request"
import EpubCFI from "../src/epubcfi"

const ASSERTION_TYPES = {
	I: 0, // INIT
	H: 1, // HASH
	N: 2, // NODE
	R: 4  // RANGE
}

const assertion = (inst, hash, t) => {
	switch (t) {
		case ASSERTION_TYPES.I:
			//--TARGET
			assert.equal(inst.hash, "")
			assert.equal(inst.type, undefined)
			//--RANGE
			assert.equal(inst.range, false)
			assert.equal(inst.start, null)
			assert.equal(inst.end, null)
			//--BASE:PATH
			assert.equal(Object.keys(inst.base).length, 0)
			assert.equal(Object.keys(inst.path).length, 0)
			//--MISC
			assert.equal(inst.spinePos, 0)
			assert.equal(inst.ignoreClass, "")
			assert.equal(inst.toString(), "epubcfi(/!/)")
			break;
		case ASSERTION_TYPES.H:
			//--TARGET
			assert.equal(inst.hash, hash)
			assert.equal(inst.type, "string")
			//--RANGE
			if (inst.range) {
				assert.equal(inst.range, true)
				assert.equal(inst.start.steps.length, 1)
				assert.equal(inst.end.steps.length, 1)
			} else {
				assert.equal(inst.range, false)
				assert.equal(inst.start, null)
				assert.equal(inst.end, null)
			}
			//--BASE
			assert.equal(inst.base.steps.length, 2)
			assert.equal(inst.base.steps[0].id, null)
			assert.equal(inst.base.steps[0].index, 2)
			assert.equal(inst.base.steps[0].type, "element")
			assert.equal(inst.base.steps[1].id, null)
			assert.equal(inst.base.steps[1].index, 0)
			assert.equal(inst.base.steps[1].type, "element")
			assert.equal(inst.base.terminal.assertion, null)
			assert.equal(inst.base.terminal.offset, null)
			//--PATH
			assert.equal(inst.path.steps[0].id, null)
			assert.equal(inst.path.steps[0].index, 1)
			assert.equal(inst.path.steps[0].type, "element")
			assert.equal(inst.path.steps[1].id, "toc")
			assert.equal(inst.path.steps[1].index, 0)
			assert.equal(inst.path.steps[1].type, "element")
			assert.equal(inst.path.steps[2].id, "contents")
			assert.equal(inst.path.steps[2].index, 0)
			assert.equal(inst.path.steps[2].type, "element")
			assert.equal(inst.path.terminal.assertion, null)
			if (inst.range) {
				assert.equal(inst.path.steps.length, 3)
				assert.equal(inst.path.terminal.offset, null)
			} else {
				assert.equal(inst.path.steps.length, 4)
				assert.equal(inst.path.steps[3].id, null)
				assert.equal(inst.path.steps[3].index, 0)
				assert.equal(inst.path.steps[3].type, "text")
				assert.equal(inst.path.terminal.offset, 0)
			}
			//--MISC
			assert.equal(inst.spinePos, 0)
			assert.equal(inst.ignoreClass, "")
			assert.equal(inst.toString(), hash)
			break;
		case ASSERTION_TYPES.N:
		case ASSERTION_TYPES.R:
			//--TARGET
			assert.equal(inst.hash, "")
			if (inst.type === "node") {
				assert.equal(inst.type, "node")
			} else {
				assert.equal(inst.type, "range")
			}
			//--RANGE
			if (inst.range) {
				assert.equal(inst.range, true)
			} else {
				assert.equal(inst.range, false)
				assert.equal(inst.start, null)
				assert.equal(inst.end, null)
			}
			//--BASE
			assert.equal(inst.base.steps.length, 2)
			assert.equal(inst.base.steps[0].id, null)
			assert.equal(inst.base.steps[0].index, 2)
			assert.equal(inst.base.steps[0].type, "element")
			assert.equal(inst.base.steps[1].id, null)
			assert.equal(inst.base.steps[1].index, 0)
			assert.equal(inst.base.steps[1].type, "element")
			assert.equal(inst.base.terminal.assertion, null)
			assert.equal(inst.base.terminal.offset, null)
			//--PATH
			assert.equal(inst.path.steps.length, 0)
			assert.equal(inst.path.terminal.assertion, null)
			if (inst.type === "node") {
				assert.equal(inst.path.terminal.offset, null)
			} else {
				assert.equal(inst.path.terminal.offset, 0)
			}
			//--MISC
			assert.equal(inst.spinePos, 0)
			assert.equal(inst.ignoreClass, "")
			if (inst.type === "node") {
				assert.equal(inst.toString(), "epubcfi(/6/2!/)")
			} else {
				assert.equal(inst.toString(), "epubcfi(/6/2!/:0)")
			}
			break;
	}
}

describe("EpubCFI", () => {
	let doc0, doc1, doc2, doc3
	before(async () => {
		doc0 = await request("../assets/handbook/EPUB/xhtml/nav.xhtml")
		doc1 = await request("../assets/chapter1.xhtml")
		doc2 = await request("../assets/chapter1-highlights.xhtml")
		doc3 = await request("../assets/highlight.xhtml")
	})
	describe("#constructor()", () => {
		const base = "/6/2"
		it("should be created instance by default", () => {
			const inst = new EpubCFI()
			assertion(inst, null, ASSERTION_TYPES.I)
		})
		it("should be created instance with (hash)", () => {
			const hash = "epubcfi(/6/2!/4/2[toc]/2[contents]/1:0)"
			const inst = new EpubCFI(hash)
			assertion(inst, hash, ASSERTION_TYPES.H)
		})
		it("should be created instance with (hash) to range", () => {
			const hash = "epubcfi(/6/2!/4/2[toc]/2[contents],/1:0,/1:17)"
			const inst = new EpubCFI(hash)
			assertion(inst, hash, ASSERTION_TYPES.H)
		})
		it("should be created instance with (node, base)", () => {
			const node = doc0.documentElement
			const inst = new EpubCFI(node, base)
			assertion(inst, null, ASSERTION_TYPES.N)
		})
		it("should be created instanse with (range, base)", () => {
			const range = doc0.createRange()
			const inst = new EpubCFI(range, base)
			assertion(inst, null, ASSERTION_TYPES.R)
		})
	})
	describe("#set()", () => {
		const hash = "epubcfi(/6/2!/4/2[toc]/2[contents]/1:0)"
		const inst = new EpubCFI()
		it("should be update epubcfi.hash", () => {
			inst.set({ data: hash })
			assertion(inst, hash, ASSERTION_TYPES.H)
		})
		it("should be update epubcfi.base component", () => {
			const base = "/6/2"
			inst.set({ base })
			assertion(inst, hash, ASSERTION_TYPES.H)
		})
		it("should be update epubcfi.type of node", () => {
			const data = doc0.documentElement
			inst.set({ data })
			assertion(inst, null, ASSERTION_TYPES.N)
		})
		it("should be update epubcfi.type of range", () => {
			const data = doc0.createRange()
			inst.set({ data })
			assertion(inst, null, ASSERTION_TYPES.R)
		})
	})
	describe("#parse()", () => {
		it("should parse a cfi", () => {
			const hash = "epubcfi(/6/2!/4/2[toc]/2[contents]/1:0)"
			const inst = EpubCFI.prototype.parse(hash)
			assertion(inst, hash, ASSERTION_TYPES.H)
		})
		xit("should parse a cfi and ignore the base if present", () => {
			const hash = "epubcfi(/6/2!/4/2[toc]/2[contents]/1:0)"
			const inst = EpubCFI.prototype.parse(hash, "/6/2")
			assert.equal(inst.spinePos, 0)
		}) // TODO: comparison of the base component from the parse method is not implemented
		it("should parse a cfi with a character offset", () => {
			const hash = "epubcfi(/6/4[chap01ref]!/4[body01]/10[para05]/2/1:3)"
			const inst = EpubCFI.prototype.parse(hash)
			assert.equal(inst.path.terminal.offset, 3)
		})
		it("should be parse a (hash) by range with offset", () => {
			const hash = "epubcfi(/6/4[chap01ref]!/4[body01]/10[para05],/2/1:1,/3:4)"
			const inst = EpubCFI.prototype.parse(hash)
			assert.equal(inst.range, true)
			assert.equal(inst.start.steps.length, 2)
			assert.equal(inst.end.steps.length, 1)
			assert.equal(inst.start.terminal.offset, 1)
			assert.equal(inst.end.terminal.offset, 4)
		})
	})
	describe("#toString()", () => {
		it("should parse a cfi and write it back", () => {
			const cfi1 = "epubcfi(/6/2[cover]!/6)"
			const cfi2 = "epubcfi(/6/4[chap01ref]!/4[body01]/10[para05]/2/1:3)"
			const cfi3 = "epubcfi(/6/4[chap01ref]!/4[body01]/10[para05],/2/1:1,/3:4)"
			assert.equal(new EpubCFI(cfi1).toString(), cfi1)
			assert.equal(new EpubCFI(cfi2).toString(), cfi2)
			assert.equal(new EpubCFI(cfi3).toString(), cfi3)
		})
	})
	describe("#checkType()", () => {
		it("should determine the type as cfi string", () => {
			const hash = "epubcfi(/6/2[cover]!/6)"
			const type = EpubCFI.prototype.checkType(hash)
			assert.equal(type, "string")
		})
		it("should determine the type as node", () => {
			const node = doc0.documentElement
			const type = EpubCFI.prototype.checkType(node)
			assert.equal(type, "node")
		})
		it("should determine the type as range", () => {
			const range = doc0.createRange()
			const type = EpubCFI.prototype.checkType(range)
			assert.equal(type, "range")
		})
		it("should determine the type as EpubCFI instance", () => {
			const hash = "epubcfi(/6/4[chap01ref]!/4[body01]/10[para05]/2/1:3)"
			const inst = new EpubCFI(hash)
			const type = EpubCFI.prototype.checkType(inst)
			assert.equal(type, "EpubCFI")
		})
		it("should determine the type as undefined", () => {
			[
				"",
				"/6/2[cover]!/6",
				"epubcfi(/6/2[cover]!/6"
			].forEach(val => {
				assert.equal(EpubCFI.prototype.checkType(val), undefined)
			})
		})
	})
	describe("#compare()", () => {
		const epubcfi = new EpubCFI()
		it("should compare CFIs", () => {
			// Spines
			assert.equal(epubcfi.compare(
				"epubcfi(/6/4[cover]!/4)",
				"epubcfi(/6/2[cover]!/4)"
			), 1, "First spine is greater")
			assert.equal(epubcfi.compare(
				"epubcfi(/6/4[cover]!/4)",
				"epubcfi(/6/6[cover]!/4)"
			), -1, "Second spine is greater")
			// First is deeper
			assert.equal(epubcfi.compare(
				"epubcfi(/6/2[cover]!/8/2)",
				"epubcfi(/6/2[cover]!/6)"
			), 1, "First Element is after Second")
			assert.equal(epubcfi.compare(
				"epubcfi(/6/2[cover]!/4/2)",
				"epubcfi(/6/2[cover]!/6)"
			), -1, "First Element is before Second")
			// Second is deeper
			assert.equal(epubcfi.compare(
				"epubcfi(/6/2[cover]!/8/2)",
				"epubcfi(/6/2[cover]!/6/4/2/2)"
			), 1, "First Element is after Second")
			assert.equal(epubcfi.compare(
				"epubcfi(/6/2[cover]!/4/4)",
				"epubcfi(/6/2[cover]!/6/4/2/2)"
			), -1, "First Element is before Second")
			assert.equal(epubcfi.compare(
				"epubcfi(/6/2[cover]!/4/6)",
				"epubcfi(/6/2[cover]!/4/6/8/1:0)"
			), -1, "First is less specific, so is before Second")
			// Same Depth
			assert.equal(epubcfi.compare(
				"epubcfi(/6/2[cover]!/6/8)",
				"epubcfi(/6/2[cover]!/6/2)"
			), 1, "First Element is after Second")
			assert.equal(epubcfi.compare(
				"epubcfi(/6/2[cover]!/4/20)",
				"epubcfi(/6/2[cover]!/6/10)"
			), -1, "First Element is before Second")
			// Text nodes
			assert.equal(epubcfi.compare(
				"epubcfi(/6/2[cover]!/4/5)",
				"epubcfi(/6/2[cover]!/4/3)"
			), 1, "First TextNode is after Second")
			assert.equal(epubcfi.compare(
				"epubcfi(/6/2[cover]!/4/7)",
				"epubcfi(/6/2[cover]!/4/13)"
			), -1, "First TextNode is before Second")
			// Char offset
			assert.equal(epubcfi.compare(
				"epubcfi(/6/2[cover]!/4/5:1)",
				"epubcfi(/6/2[cover]!/4/5:0)"
			), 1, "First Char Offset after Second")
			assert.equal(epubcfi.compare(
				"epubcfi(/6/2[cover]!/4/5:2)",
				"epubcfi(/6/2[cover]!/4/5:30)"
			), -1, "Second Char Offset before Second")
			// Normal example
			assert.equal(epubcfi.compare(
				"epubcfi(/6/2[cover]!/4/8/5:1)",
				"epubcfi(/6/2[cover]!/4/6/15:2)"
			), 1, "First Element after Second")
			assert.equal(epubcfi.compare(
				"epubcfi(/6/2[cover]!/4/8/1:0)",
				"epubcfi(/6/2[cover]!/4/8/1:0)"
			), 0, "All Equal")
			// Different Lengths
			assert.equal(epubcfi.compare(
				"epubcfi(/6/16[id42]!/4[5N3C0-8c483216e03a4ff49927fc1a97dc7b2c]/10/1:317)",
				"epubcfi(/6/16[id42]!/4[5N3C0-8c483216e03a4ff49927fc1a97dc7b2c]/10/2[page18]/1:0)"
			), -1, "First CFI is before Second")
			assert.equal(epubcfi.compare(
				"epubcfi(/6/16[id42]!/4[5N3C0-8c483216e03a4ff49927fc1a97dc7b2c]/12/1:0)",
				"epubcfi(/6/16[id42]!/4[5N3C0-8c483216e03a4ff49927fc1a97dc7b2c]/12/2/1:9)"
			), -1, "First CFI is before Second")
			assert.equal(epubcfi.compare(
				"epubcfi(/6/16!/4/12/1:0)",
				"epubcfi(/6/16!/4/12/2/1:9)"
			), -1, "First CFI is before Second")
		})
		it("should destroy object", () => {
			epubcfi.destroy()
			Object.keys(epubcfi).forEach(p => {
				assert.equal(epubcfi[p], undefined)
			})
		})
	})
	describe("#fromNode()", () => {
		const base = "/6/4[chap01ref]"
		it("should get a cfi from a p node", () => {
			const elm = doc2.getElementById("c001p0004")
			const cfi = new EpubCFI(elm, base)
			assert.equal(elm.nodeType, Node.ELEMENT_NODE, "provided a element node")
			assert.equal(cfi.toString(), "epubcfi(/6/4[chap01ref]!/4/2/10/2[c001p0004])")
		})
		it("should get a cfi from a text node", () => {
			const elm = doc2.getElementById("c001p0004")
			const txt = elm.childNodes[0]
			const cfi = new EpubCFI(txt, base)
			assert.equal(txt.nodeType, Node.TEXT_NODE, "provided a text node")
			assert.equal(cfi.toString(), "epubcfi(/6/4[chap01ref]!/4/2/10/2[c001p0004]/1)")
		})
		it("should get a cfi from a text node inside a highlight", () => {
			const elm = doc2.getElementById("highlight-1")
			const txt = elm.childNodes[0]
			const cfi = new EpubCFI(txt, base, "annotator-hl")
			assert.equal(txt.nodeType, Node.TEXT_NODE, "provided a text node")
			assert.equal(cfi.toString(), "epubcfi(/6/4[chap01ref]!/4/2/32/2[c001p0017]/1)")
		})
		it("should get a cfi from a highlight node", () => {
			const txt = doc2.getElementById("highlight-1")
			const cfi = new EpubCFI(txt, base, "annotator-hl")
			assert.equal(txt.nodeType, Node.ELEMENT_NODE, "provided a highlight node")
			assert.equal(cfi.toString(), "epubcfi(/6/4[chap01ref]!/4/2/32/2[c001p0017])")
		})
	})
	describe("#fromRange()", () => {
		const base = "/6/4[chap01ref]"
		it("should get a cfi from a collapsed range", () => {
			const t1 = doc1.getElementById("c001p0004").childNodes[0]
			const range = doc1.createRange()
			range.setStart(t1, 6)
			const cfi = new EpubCFI(range, base)
			assert.equal(cfi.range, false)
			assert.equal(cfi.toString(), "epubcfi(/6/4[chap01ref]!/4/2/10/2[c001p0004]/1:6)")
		})
		it("should get a cfi from a range", () => {
			const t1 = doc1.getElementById("c001p0004").childNodes[0]
			const t2 = doc1.getElementById("c001p0007").childNodes[0]
			const range = doc1.createRange()
			range.setStart(t1, 6)
			range.setEnd(t2, 27)
			const cfi = new EpubCFI(range, base)
			assert.equal(cfi.range, true)
			assert.equal(cfi.toString(), "epubcfi(/6/4[chap01ref]!/4/2,/10/2[c001p0004]/1:6,/16/2[c001p0007]/1:27)")
		})
		it("should get a cfi from a range with offset 0", () => {
			const t1 = doc1.getElementById("c001p0004").childNodes[0]
			const range = doc1.createRange()
			range.setStart(t1, 0)
			range.setEnd(t1, 1)
			const cfi = new EpubCFI(range, base)
			assert.equal(cfi.range, true)
			assert.equal(cfi.toString(), "epubcfi(/6/4[chap01ref]!/4/2/10/2[c001p0004],/1:0,/1:1)")
		})
		it("should get a cfi from a range inside a highlight", () => {
			const t1 = doc2.getElementById("highlight-1").childNodes[0]
			const range = doc2.createRange()
			range.setStart(t1, 6)
			const cfi = new EpubCFI(range, base, "annotator-hl")
			assert.equal(cfi.toString(), "epubcfi(/6/4[chap01ref]!/4/2/32/2[c001p0017]/1:43)")
		})
		it("should get a cfi from a range past a highlight", () => {
			const t1 = doc2.getElementById("c001s0001").childNodes[1]
			const range = doc2.createRange()
			range.setStart(t1, 25)
			const cfi = new EpubCFI(range, base, "annotator-hl")
			assert.equal(cfi.toString(), "epubcfi(/6/4[chap01ref]!/4/2/4/2[c001s0001]/1:41)")
		}) // TODO: might need to have double ranges in front
		it("should get a cfi from a range in between two highlights", () => {
			const t1 = doc3.getElementById("p2").childNodes[1]
			const range = doc3.createRange()
			range.setStart(t1, 4)
			const cfi = new EpubCFI(range, base, "annotator-hl")
			assert.equal(cfi.toString(), "epubcfi(/6/4[chap01ref]!/4/4[p2]/1:123)")
		})
		it("should correctly count text nodes, independent of any elements present in between", () => {
			const t1 = doc3.getElementById("p3").childNodes[2]
			const range = doc3.createRange()
			range.setStart(t1, 4)
			const cfi = new EpubCFI(range, base)
			assert.equal(cfi.toString(), "epubcfi(/6/4[chap01ref]!/4/6[p3]/3:4)")
		})
	})
	describe("#toRange()", () => {
		const base = "/6/4[chap01ref]"
		const ignoreClass = "annotator-hl"
		it("should get a range from a cfi", () => {
			const t1 = doc2.getElementById("c001p0004").childNodes[0]
			const ogRange = doc2.createRange()
			ogRange.setStart(t1, 6)
			const cfi = new EpubCFI(ogRange, base)
			// Check it was parse correctly
			assert.equal(cfi.toString(), "epubcfi(/6/4[chap01ref]!/4/2/10/2[c001p0004]/1:6)")
			// Check the range
			const newRange = cfi.toRange(doc2)
			assert.equal(newRange.startContainer, t1)
			assert.equal(newRange.startOffset, 6)
			assert.equal(newRange.collapsed, true)
		})
		it("should get a range from a cfi with a range", () => {
			const t1 = doc2.getElementById("c001p0004").childNodes[0]
			const t2 = doc2.getElementById("c001p0007").childNodes[0]
			const ogRange = doc2.createRange()
			ogRange.setStart(t1, 6)
			ogRange.setEnd(t2, 27)
			const cfi = new EpubCFI(ogRange, base)
			// Check it was parse correctly
			assert.equal(cfi.toString(), "epubcfi(/6/4[chap01ref]!/4/2,/10/2[c001p0004]/1:6,/16/2[c001p0007]/1:27)")
			// Check the range
			const newRange = cfi.toRange(doc2)
			assert.equal(newRange.startContainer, t1)
			assert.equal(newRange.startOffset, 6)
			assert.equal(newRange.endContainer, t2)
			assert.equal(newRange.endOffset, 27)
			assert.equal(newRange.collapsed, false)
		})
		xit("should get a cfi from a range inside a highlight", () => {
			const t1 = doc2.getElementById("highlight-1").childNodes[0]
			const ogRange = doc2.createRange()
			ogRange.setStart(t1, 6)
			const cfi = new EpubCFI(ogRange, base, ignoreClass)
			assert.equal(cfi.toString(), "epubcfi(/6/4[chap01ref]!/4/2/32/2[c001p0017]/1:43)")
			// Check the range
			const newRange = cfi.toRange(doc2, ignoreClass)
			assert.equal(newRange.startContainer, t1)
			assert.equal(newRange.startContainer.textContent, t1.textContent)
			assert.equal(newRange.startOffset, 6)
			assert.equal(newRange.collapsed, true)
		})
		xit("should get a cfi from a range inside a highlight range", () => {
			const t1 = doc2.getElementById("highlight-2").childNodes[0]
			const t2 = doc2.getElementById("c001s0001").childNodes[1]
			const ogRange = doc2.createRange()
			ogRange.setStart(t1, 5)
			ogRange.setEnd(t2, 25)
			const cfi = new EpubCFI(ogRange, base, ignoreClass)
			assert.equal(cfi.toString(), "epubcfi(/6/4[chap01ref]!/4/2/4/2[c001s0001],/1:5,/1:41)")
			// Check the range
			const newRange = cfi.toRange(doc2, ignoreClass)
			assert.equal(newRange.startContainer, t1)
			assert.equal(newRange.startContainer.textContent, t1.textContent)
			assert.equal(newRange.startOffset, 5)
			assert.equal(newRange.endContainer, t2)
			assert.equal(newRange.endContainer.textContent, t2.textContent)
			assert.equal(newRange.endOffset, 25)
			assert.equal(newRange.collapsed, false)
		})
	})
	describe("#isCfiString()", () => {
		it("should check if the string is wrapped using 'epubcfi()'", () => {
			const hash = "epubcfi(/6/4[chap01ref]!/4/2,/10/2[c001p0004]/1:6,/16/2[c001p0007]/1:27)"
			assert.equal(EpubCFI.prototype.isCfiString(hash), true)
		})
	})
})