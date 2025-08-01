import RangeObject from "./utils/rangeobject";
import { findChildren, isNumber } from "./utils/core";

/**
 * Parsing and creation of EpubCFIs:
 * @link https://idpf.org/epub/linking/cfi/epub-cfi.html
 * 
 * Implements:
 * - Character Offset: `epubcfi(/6/4[chap01ref]!/4[body01]/10[para05]/2/1:3)`
 * - Simple Ranges: `epubcfi(/6/4[chap01ref]!/4[body01]/10[para05],/2/1:1,/3:4)`
 * 
 * Does Not Implement:
 * - Temporal Offset `(~)`
 * - Spatial Offset `(@)`
 * - Temporal-Spatial Offset `(~ + @)`
 * - Text Location Assertion `([)`
 */
class EpubCFI {
	/**
	 * Constructor
	 * @param {string|Range|Node} [data] values: 'epubcfi(..)' OR range OR node
	 * @param {string|object} [base] base component
	 * @param {string} [ignoreClass] class to ignore when parsing DOM
	 * @example new EpubCFI()
	 * @example new EpubCFI("epubcfi(/6/2[cover]!/6)")
	 * @example new EpubCFI("epubcfi(/6/2[cover]!/6)", "/6/6[end]")
	 * @example new EpubCFI("epubcfi(/6/2[cover]!/6)", "/6/6[end]", "token-hl")
	 */
	constructor(data, base, ignoreClass) {
		/**
		 * Base component
		 * @member {object} base
		 * @memberof EpubCFI
		 * @readonly
		 */
		this.base = {};
		/**
		 * EpubCFI string format
		 * @member {string} hash
		 * @memberof EpubCFI
		 * @readonly
		 */
		this.hash = "";
		/**
		 * @member {string} ignoreClass
		 * @memberof EpubCFI
		 * @readonly
		 */
		this.ignoreClass = "";
		/**
		 * Path component
		 * @member {object} path
		 * @memberof EpubCFI
		 * @readonly
		 */
		this.path = {};
		/**
		 * @member {boolean} range
		 * @memberof EpubCFI
		 * @readonly
		 */
		this.range = false;
		/**
		 * Spine position
		 * @member {number} spinePos
		 * @memberof EpubCFI
		 * @readonly
		 */
		this.spinePos = 0; // For compatibility
		/**
		 * Start component
		 * @member {object} start
		 * @memberof EpubCFI
		 * @readonly
		 */
		this.start = null;
		/**
		 * End component
		 * @member {object} end
		 * @memberof EpubCFI
		 * @readonly
		 */
		this.end = null;
		/**
		 * @member {string} type
		 * @memberof EpubCFI
		 * @readonly
		 */
		this.type = undefined;
		this.set({ data, base, ignoreClass });
	}

	/**
	 * Set object data options
	 * @param {object} [options]
	 * @param {string|Range|Node} [options.data]
	 * @param {string|object} [options.base]
	 * @param {string} [options.ignoreClass]
	 * @returns {EpubCFI}
	 * @example in: epubcfi.set({ data: "epubcfi(/6/2[cover]!/6)" })
	 * @example in: epubcfi.set({ data: range })
	 * @example in: epubcfi.set({ data: node })
	 * @example in: epubcfi.set({ base: "/6/6[end]" })
	 * @example in: epubcfi.set({ ignoreClass: "annotator-hl" })
	 */
	set(options) {

		let data, base, igcl, type;
		const b = (value) => {
			if (base) return;
			if (typeof value === "string") {
				this.base = this.parseComponent(value);
				this.spinePos = this.base.steps[1].index;
			} else if (typeof value === "object" && value.steps) {
				this.base = value;
			}
			base = this.base;
		};
		const c = (value) => {
			if (igcl) return;
			if (typeof value === "string") {
				this.ignoreClass = value;
			}
			igcl = this.ignoreClass;
		};
		const d = (value) => {
			if (data) return;
			type = type || this.checkType(value);
			if (type === "string") {
				data = this.parse(value);
			} else if (type === "range") {
				data = this.fromRange(value, base, igcl);
			} else if (type === "node") {
				data = this.fromNode(value, base, igcl);
			} else if (type === "EpubCFI") {
				data = value;
			} else if (!value) {
				data = this;
			} else {
				throw new TypeError("not a valid argument for EpubCFI");
			}
			data.type = type || this.type;
		};
		Object.keys(options).forEach(opt => {

			const value = options[opt];
			if (this[opt] === value || typeof value === "undefined") {
				delete options[opt];
			} else if (opt === "data") {
				b(options["base"]);
				c(options["ignoreClass"]);
				d(value);
			} else if (opt === "base") {
				b(value);
				c(options["ignoreClass"]);
				d(options["data"]);
			} else if (opt === "ignoreClass") {
				b(options["base"]);
				c(value);
				d(options["data"]);
			}
		});
		return data ? Object.assign(this, data) : this;
	}

	/**
	 * Check the type to input
	 * @param {string|Range|Node} cfiFrom
	 * @returns {string|undefined} argument type
	 */
	checkType(cfiFrom) {

		if (typeof cfiFrom === "undefined") {
			return undefined;
		} else if (this.isCfiString(cfiFrom)) {
			return "string";
		} else if (typeof cfiFrom === "object") {
			if (cfiFrom instanceof Range ||
				typeof cfiFrom.startContainer !== "undefined") {
				return "range";
			} else if (cfiFrom instanceof Node) {
				return "node";
			} else if (cfiFrom instanceof EpubCFI) {
				return "EpubCFI";
			} else return undefined;
		} else return undefined;
	}

	/**
	 * Collapse a CFI Range to a single CFI Position
	 * @param {boolean} [toStart]
	 */
	collapse(toStart) {

		if (this.range === false) return;

		if (toStart) {
			this.path.steps = this.path.steps.concat(this.start.steps);
			this.path.terminal = this.start.terminal;
		} else {
			this.path.steps = this.path.steps.concat(this.end.steps);
			this.path.terminal = this.end.terminal;
		}

		this.range = false;
	}

	/**
	 * Compare which of two CFIs is earlier in the text
	 * @param {string|EpubCFI} cfiOne 
	 * @param {string|EpubCFI} cfiTwo 
	 * @returns {number} First is earlier = -1, Second is earlier = 1, They are equal = 0 
	 */
	compare(cfiOne, cfiTwo) {

		if (typeof cfiOne === "string") {
			cfiOne = new EpubCFI(cfiOne);
		}
		if (typeof cfiTwo === "string") {
			cfiTwo = new EpubCFI(cfiTwo);
		}
		// Compare Spine Positions
		if (cfiOne.spinePos > cfiTwo.spinePos) return 1;
		if (cfiOne.spinePos < cfiTwo.spinePos) return -1;

		let stepsA, terminalA;
		if (cfiOne.range) {
			stepsA = cfiOne.path.steps.concat(cfiOne.start.steps);
			terminalA = cfiOne.start.terminal;
		} else {
			stepsA = cfiOne.path.steps;
			terminalA = cfiOne.path.terminal;
		}

		let stepsB, terminalB;
		if (cfiTwo.range) {
			stepsB = cfiTwo.path.steps.concat(cfiTwo.start.steps);
			terminalB = cfiTwo.start.terminal;
		} else {
			stepsB = cfiTwo.path.steps;
			terminalB = cfiTwo.path.terminal;
		}
		// Compare Each Step in the First item
		for (let i = 0; i < stepsA.length; i++) {
			if (!stepsA[i]) return -1;
			if (!stepsB[i]) return 1;
			if (stepsA[i].index > stepsB[i].index) return 1;
			if (stepsA[i].index < stepsB[i].index) return -1;
		}
		// All steps in First equal to Second and First is Less Specific
		if (stepsA.length < stepsB.length) return -1;

		// Compare the character offset of the text node
		if (terminalA.offset > terminalB.offset) return 1;
		if (terminalA.offset < terminalB.offset) return -1;

		return 0; // CFI's are equal
	}

	/**
	 * Generate chapter component
	 * @param {number} spineNodeIndex
	 * @param {number} position
	 * @param {string} [id] 
	 * @returns {string} EpubCFI string format
	 */
	generateChapterComponent(spineNodeIndex, position, id) {

		const pos = parseInt(position);
		const index = (spineNodeIndex + 1) * 2;
		let cfi = "/" + index + "/";
		cfi += (pos + 1) * 2;
		if (id) cfi += "[" + id + "]";
		return cfi;
	}

	/**
	 * Get chapter component
	 * @param {string} cfiStr EpubCFI string format
	 * @example in: /6/4!/4/1:0 out: /6/4
	 * @returns {string} Base component
	 * @private
	 */
	getBaseComponent(cfiStr) {

		const indirection = cfiStr.split("!");
		return indirection[0];
	}

	/**
	 * Get path component
	 * @param {string} cfiStr EpubCFI string format
	 * @example in: /6/4!/4/1:0 out: /4/1:0
	 * @returns {string} Path component
	 * @private
	 */
	getPathComponent(cfiStr) {

		const indirection = cfiStr.split("!");
		if (indirection[1]) {
			const ranges = indirection[1].split(",");
			return ranges[0];
		}
	}

	/**
	 * getRange
	 * @param {string} cfiStr EubCFI string format
	 * @example in: /6/4!/4/1:0
	 * @returns {object[]|null} An array of ranges or null if the array length is not 3
	 * @private
	 */
	getRange(cfiStr) {

		const ranges = cfiStr.split(",");

		if (ranges.length === 3) {
			return [
				ranges[1],
				ranges[2]
			];
		}

		return null;
	}

	/**
	 * Get the offset component of a character (unused)
	 * @param {string} cfiStr 
	 * @returns {string}
	 * @private
	 */
	getCharacterOffsetComponent(cfiStr) {

		const arr = cfiStr.split(":");
		return arr[1] || "";
	}

	/**
	 * Check if a string is wrapped with "epubcfi()"
	 * @param {string} str EpubCFI string format
	 * @returns {boolean} `true` if the string is valid, `false` otherwise
	 */
	isCfiString(str) {

		if (typeof str === "string" &&
			str.indexOf("epubcfi(") === 0 &&
			str[str.length - 1] === ")") {
			return true;
		}
		return false;
	}

	/**
	 * joinSteps
	 * @param {object[]} steps 
	 * @returns {string} 
	 * @private
	 */
	joinSteps(steps) {

		if (!steps) return "";
		return steps.map(part => {

			let segment = "";
			if (part.type === "element") {
				segment += (part.index + 1) * 2;
			}
			if (part.type === "text") {
				segment += 1 + (2 * part.index); // TODO: double check that this is odd
			}
			if (part.id) {
				segment += "[" + part.id + "]";
			}
			return segment;

		}).join("/");
	}

	/**
	 * pathTo
	 * @param {Node} node 
	 * @param {number} offset 
	 * @param {string} [ignoreClass] 
	 * @returns {object} segment object
	 * @private
	 */
	pathTo(node, offset, ignoreClass) {

		const segment = {
			steps: [],
			terminal: {
				offset: null,
				assertion: null
			}
		};

		let step, curNode = node;
		while (
			curNode &&
			curNode.parentNode &&
			curNode.parentNode.nodeType !== Node.DOCUMENT_NODE) {

			if (ignoreClass) {
				step = this.filteredStep(curNode, ignoreClass);
			} else {
				step = this.step(curNode);
			}

			if (step) segment.steps.unshift(step);
			curNode = curNode.parentNode;
		}

		if (offset !== null && offset >= 0) {
			segment.terminal.offset = offset;
			// Make sure we are getting to a textNode if there is an offset
			const len = segment.steps.length;
			const idx = len ? (len - 1) : len;
			const stp = idx ? segment.steps[idx].type : null; 
			if (stp && stp !== "text") {
				segment.steps.push({
					index: 0,
					type: "text"
				});
			}
		}

		return segment;
	}

	/**
	 * equalStep
	 * @param {object} stepA 
	 * @param {object} stepB 
	 * @returns {boolean}
	 * @private
	 */
	equalStep(stepA, stepB) {

		if (stepA && stepB &&
			stepA.id === stepB.id &&
			stepA.index === stepB.index &&
			stepA.type === stepB.type) {
			return true;
		}
		return false;
	}

	/**
	 * filter
	 * @param {Node} node 
	 * @param {string} [ignoreClass] 
	 * @returns {Node} 
	 * @private
	 */
	filter(node, ignoreClass) {

		let parent;
		let isText;
		let needsIgnoring;

		if (node.nodeType === Node.TEXT_NODE) {
			isText = true;
			parent = node.parentNode;
			needsIgnoring = node.parentNode.classList.contains(ignoreClass);
		} else {
			isText = false;
			needsIgnoring = node.classList.contains(ignoreClass);
		}

		if (needsIgnoring && isText) {
			const prevSibling = parent.previousSibling;
			const nextSibling = parent.nextSibling;
			let sibling; // to join with

			// If the sibling is a text node, join the nodes
			if (prevSibling && prevSibling.nodeType === Node.TEXT_NODE) {
				sibling = prevSibling;
			} else if (nextSibling && nextSibling.nodeType === Node.TEXT_NODE) {
				sibling = nextSibling;
			}

			return sibling || node;

		} else if (needsIgnoring && !isText) {
			// Otherwise just skip the element node
			return null;
		} else {
			// No need to filter
			return node;
		}
	}

	/**
	 * filteredPosition
	 * @param {Node} node 
	 * @param {string} [ignoreClass] 
	 * @returns {number} index
	 * @private
	 */
	filteredPosition(node, ignoreClass) {

		let children, map;

		if (node.nodeType === Node.ELEMENT_NODE) {
			children = node.parentNode.children;
			map = this.normalizedMap(children, Node.ELEMENT_NODE, ignoreClass);
		} else {
			children = node.parentNode.childNodes;
			// Inside an ignored node
			if (node.parentNode.classList.contains(ignoreClass)) {
				node = node.parentNode;
				children = node.parentNode.childNodes;
			}
			map = this.normalizedMap(children, Node.TEXT_NODE, ignoreClass);
		}

		const index = Array.prototype.indexOf.call(children, node);

		return map[index];
	}

	/**
	 * filteredStep
	 * @param {Node} node 
	 * @param {string} ignoreClass 
	 * @returns {object} step
	 * @private
	 */
	filteredStep(node, ignoreClass) {

		const _node = this.filter(node, ignoreClass);

		// Node filtered, so ignore
		if (_node === null) return;
		return {
			id: _node.id,
			index: this.filteredPosition(_node, ignoreClass),
			tagName: _node.tagName,
			type: (_node.nodeType === Node.TEXT_NODE) ? "text" : "element"
		}
	}

	/**
	 * findNode
	 * @param {object[]} steps 
	 * @param {Document} [doc] 
	 * @param {string} [ignoreClass] 
	 * @returns {Node}
	 * @private
	 */
	findNode(steps, doc, ignoreClass) {

		const dc = doc || document;
		let container;

		if (ignoreClass) {
			container = this.walkToNode(steps, dc, ignoreClass);
		} else if (typeof dc.evaluate !== "undefined") {
			const xpath = this.stepsToXpath(steps);
			const xtype = XPathResult.FIRST_ORDERED_NODE_TYPE;
			container = dc.evaluate(xpath, dc, null, xtype, null).singleNodeValue;
		} else {
			container = this.walkToNode(steps, dc);
		}

		return container;
	}

	/**
	 * fixMiss
	 * @param {object[]} steps 
	 * @param {number} offset 
	 * @param {Document} [doc] 
	 * @param {string} [ignoreClass] 
	 * @returns {object|void}
	 * @private
	 */
	fixMiss(steps, offset, doc, ignoreClass) {

		let container = this.findNode(steps.slice(0, -1), doc, ignoreClass);
		const children = container.childNodes;
		const lastStepIndex = steps[steps.length - 1].index;
		const map = this.normalizedMap(children, Node.TEXT_NODE, ignoreClass);

		for (const childIndex in map) {

			if (!map.hasOwnProperty(childIndex)) return;

			if (map[childIndex] === lastStepIndex) {
				const child = children[childIndex];
				const len = child.textContent.length;
				if (offset > len) {
					offset = offset - len;
				} else {
					if (child.nodeType === Node.ELEMENT_NODE) {
						container = child.childNodes[0];
					} else {
						container = child;
					}
					break;
				}
			}
		}

		return {
			container: container,
			offset: offset
		}
	}

	/**
	 * Create a EpubCFI object from a Node
	 * @param {Node} node
	 * @param {string|object} base
	 * @param {string} [ignoreClass]
	 * @returns {EpubCFI}
	 */
	fromNode(node, base, ignoreClass) {

		const cfi = new EpubCFI();

		if (typeof base === "string") {
			cfi.base = this.parseComponent(base);
			cfi.spinePos = cfi.base.steps[1].index;
		} else if (typeof base === "object") {
			cfi.base = base;
		}

		cfi.path = this.pathTo(node, null, ignoreClass);
		return cfi;
	}

	/**
	 * Create a CFI object from a Range
	 * @param {Range} range
	 * @param {string|object} base
	 * @param {string} [ignoreClass]
	 * @returns {EpubCFI} 
	 */
	fromRange(range, base, ignoreClass) {

		const cfi = new EpubCFI();
		const start = range.startContainer;
		const end = range.endContainer;
		let startOffset = range.startOffset;
		let endOffset = range.endOffset;
		let needsIgnoring = false;
		const doc = start.ownerDocument;

		if (ignoreClass) {
			// Tell pathTo if / what to ignore
			needsIgnoring = (doc.querySelector("." + ignoreClass) !== null);
		}

		if (typeof base === "string") {
			cfi.base = this.parseComponent(base);
			cfi.spinePos = cfi.base.steps[1].index;
		} else if (typeof base === "object") {
			cfi.base = base;
		}

		const offset = () => {
			if (needsIgnoring) {
				startOffset = this.patchOffset(start, startOffset, ignoreClass);
			}
		};

		if (range.collapsed) {
			offset();
			cfi.path = this.pathTo(start, startOffset, ignoreClass);
		} else {
			cfi.range = true;
			offset();

			cfi.start = this.pathTo(start, startOffset, ignoreClass);
			if (needsIgnoring) {
				endOffset = this.patchOffset(end, endOffset, ignoreClass);
			}

			cfi.end = this.pathTo(end, endOffset, ignoreClass);

			// Create a new empty path
			cfi.path = {
				steps: [],
				terminal: null
			}

			// Push steps that are shared between start and end to the common path
			for (let i = 0, len = cfi.start.steps.length; i < len; i++) {
				if (this.equalStep(cfi.start.steps[i], cfi.end.steps[i])) {
					if (i === len - 1) {
						// Last step is equal, check terminals
						if (cfi.start.terminal === cfi.end.terminal) {
							// CFI's are equal
							cfi.path.steps.push(cfi.start.steps[i]);
							// Not a range
							cfi.range = false;
						}
					} else {
						cfi.path.steps.push(cfi.start.steps[i]);
					}
				} else {
					break;
				}
			}

			cfi.start.steps = cfi.start.steps.slice(cfi.path.steps.length);
			cfi.end.steps = cfi.end.steps.slice(cfi.path.steps.length);

			// TODO: Add Sanity check to make sure that the end if greater than the start
		}

		return cfi;
	}

	/**
	 * normalizedMap
	 * @param {Node[]} children 
	 * @param {number} nodeType 
	 * @param {string} [ignoreClass] 
	 * @returns {object}
	 * @private
	 */
	normalizedMap(children, nodeType, ignoreClass) {

		const output = {};
		let prevIndex = -1;
		let currNodeType;
		let prevNodeType;

		for (let i = 0, len = children.length; i < len; i++) {

			currNodeType = children[i].nodeType;

			// Check if needs ignoring
			if (currNodeType === Node.ELEMENT_NODE &&
				children[i].classList.contains(ignoreClass)) {
				currNodeType = Node.TEXT_NODE;
			}

			if (i > 0 &&
				currNodeType === Node.TEXT_NODE &&
				prevNodeType === Node.TEXT_NODE) {
				// join text nodes
				output[i] = prevIndex;
			} else if (nodeType === currNodeType) {
				prevIndex = prevIndex + 1;
				output[i] = prevIndex;
			}

			prevNodeType = currNodeType;
		}

		return output;
	}

	/**
	 * Parse a cfi string to a EpubCFI object representation
	 * @todo Comparison of the base component from the parse method
	 * @param {string} hash EpubCFI string format
	 * @returns {EpubCFI} EpubCFI object
	 */
	parse(hash) {

		const cfi = new EpubCFI();

		if (typeof hash !== "string") {
			throw new TypeError("invalid argument type");
		}

		if (this.isCfiString(hash)) {
			// Remove initial 'epubcfi(' and ending ')'
			cfi.hash = hash; // save EpubCFI string
			cfi.type = "string";
			hash = hash.slice(8, hash.length - 1);
		} else {
			throw new Error("invalid EpubCFI string format");
		}

		const baseComponent = this.getBaseComponent(hash);

		// Make sure this is a valid cfi or return
		if (!baseComponent) {
			cfi.spinePos = -1;
			return cfi;
		}

		cfi.base = this.parseComponent(baseComponent);

		const pathComponent = this.getPathComponent(hash);
		cfi.path = this.parseComponent(pathComponent);

		const range = this.getRange(hash);
		if (range) {
			cfi.range = true;
			cfi.start = this.parseComponent(range[0]);
			cfi.end = this.parseComponent(range[1]);
		}

		// Chapter segment is always the second step
		cfi.spinePos = cfi.base.steps[1].index;

		return cfi;
	}

	/**
	 * Parsing the component string value
	 * @param {string} value string value
	 * @example in: /4/1:1 out: object
	 * @returns {object} component object
	 * @private
	 */
	parseComponent(value) {

		const component = {
			steps: [],
			terminal: {
				offset: null,
				assertion: null
			}
		}

		const parts = value.split(":");
		const steps = parts[0].split("/");

		if (parts.length > 1) {
			component.terminal = this.parseTerminal(parts[1]);
		}

		if (steps[0] === "") {
			steps.shift(); // Ignore the first slash
		}

		component.steps = steps.map(step => this.parseStep(step));
		return component;
	}

	/**
	 * Parsing the step string value
	 * Check if step is a text node or element
	 * @param {string} str string value
	 * @returns {object} step object
	 * @private
	 */
	parseStep(str) {

		const num = parseInt(str);
		if (isNaN(num)) return;
		const isElement = (num % 2 === 0);
		const hasBrackets = str.match(/\[(.*)\]/);
		return {
			id: hasBrackets && hasBrackets[1] ? hasBrackets[1] : null,
			index: isElement ? num / 2 - 1 : (num - 1) / 2,
			type: isElement ? "element" : "text"
		}
	}

	/**
	 * Parsing the terminal string value
	 * @param {string} str string value
	 * @returns {object} terminal object
	 * @private
	 */
	parseTerminal(str) {

		const arr = str.match(/\[(.*)\]/);
		const cmp = arr && arr[1];
		const txt = cmp ? str.split("[")[0] : str;
		const num = parseInt(txt);
		return {
			assertion: cmp ? arr[1] : null,
			offset: isNumber(num) ? num : null
		}
	}

	/**
	 * Get patch offset of text node
	 * @param {Node} node 
	 * @param {number} offset 
	 * @param {string} [ignoreClass] 
	 * @returns {number} Total offset
	 * @private
	 */
	patchOffset(node, offset, ignoreClass) {

		if (node.nodeType !== Node.TEXT_NODE) {
			throw new Error("Anchor must be a text node");
		}

		let curr = node;
		let totalOffset = offset;

		// If the parent is a ignored node, get offset from it's start
		if (node.parentNode.classList.contains(ignoreClass)) {
			curr = node.parentNode;
		}

		while (curr.previousSibling) {

			if (curr.previousSibling.nodeType === Node.ELEMENT_NODE) {
				// Originally a text node, so join
				if (curr.previousSibling.classList.contains(ignoreClass)) {
					totalOffset += curr.previousSibling.textContent.length;
				} else {
					break; // Normal node, dont join
				}
			} else {
				// If the previous sibling is a text node, join the nodes
				totalOffset += curr.previousSibling.textContent.length;
			}
			curr = curr.previousSibling;
		}

		return totalOffset;
	}

	/**
	 * Get position index
	 * @param {Node} node 
	 * @returns {number} Position index
	 * @private
	 */
	position(node) {

		let children, index;

		if (node.nodeType === Node.ELEMENT_NODE) {
			children = node.parentNode.children;
			if (!children) {
				children = findChildren(node.parentNode);
			}
			index = Array.prototype.indexOf.call(children, node);
		} else {
			children = this.textNodes(node.parentNode);
			index = children.indexOf(node);
		}

		return index;
	}

	/**
	 * segmentString
	 * @param {object} segment 
	 * @returns {string}
	 * @private
	 */
	segmentString(segment) {

		let str = "/";
		str += this.joinSteps(segment.steps);

		if (segment.terminal && segment.terminal.offset !== null) {
			str += ":" + segment.terminal.offset;
		}
		if (segment.terminal && segment.terminal.assertion !== null) {
			str += "[" + segment.terminal.assertion + "]";
		}

		return str;
	}

	/**
	 * step
	 * @param {Node} node 
	 * @returns {object} step object
	 * @private
	 */
	step(node) {

		return {
			id: node.id,
			index: this.position(node),
			tagName: node.tagName,
			type: (node.nodeType === Node.TEXT_NODE) ? "text" : "element"
		}
	}

	/**
	 * stepsToXpath
	 * @param {object[]} steps 
	 * @returns {string}
	 * @private
	 */
	stepsToXpath(steps) {

		const xpath = [".", "*"];

		steps.forEach(step => {

			const position = step.index + 1;

			if (step.id) {
				xpath.push("*[position()=" + position + " and @id='" + step.id + "']");
			} else if (step.type === "text") {
				xpath.push("text()[" + position + "]");
			} else {
				xpath.push("*[" + position + "]");
			}
		})

		return xpath.join("/");
	}

	/**
	 * stepsToQuerySelector (unused)
	 * @param {object[]} steps 
	 * @returns {string}
	 * @private
	 */
	stepsToQuerySelector(steps) {

		const query = ["html"];

		steps.forEach(step => {

			const position = step.index + 1;
			if (step.id) {
				query.push("#" + step.id);
			} else if (step.type === "text") {
				// unsupported in querySelector
				// query.push("text()[" + position + "]");
			} else {
				query.push("*:nth-child(" + position + ")");
			}
		});

		return query.join(">");
	}

	/**
	 * textNodes
	 * @param {Node} container 
	 * @param {string} [ignoreClass] 
	 * @returns {object[]}
	 * @private
	 */
	textNodes(container, ignoreClass) {

		return Array.prototype.slice.call(container.childNodes).filter(node => {
			if (node.nodeType === Node.TEXT_NODE) {
				return true;
			} else if (node.classList.contains(ignoreClass)) {
				return true;
			}
			return false;
		})
	}

	/**
	 * Creates a DOM range representing a CFI
	 * @param {Document} [doc] document referenced in the base
	 * @param {string} [ignoreClass]
	 * @return {Range}
	 */
	toRange(doc, ignoreClass) {

		const dc = doc || document;
		let start, end, startContainer, endContainer;
		let startSteps, endSteps, hasOffset;
		let range, missed;
		const needsIgnoring = ignoreClass && (dc.querySelector("." + ignoreClass) !== null);
		const reqClass = needsIgnoring ? ignoreClass : undefined;

		if (typeof (dc.createRange) !== "undefined") {
			range = dc.createRange();
		} else {
			range = new RangeObject();
		}

		if (this.range) {
			start = this.start;
			startSteps = this.path.steps.concat(start.steps);
			startContainer = this.findNode(startSteps, dc, reqClass);
			end = this.end;
			endSteps = this.path.steps.concat(end.steps);
			endContainer = this.findNode(endSteps, dc, reqClass);
		} else {
			start = this.path;
			startSteps = this.path.steps;
			startContainer = this.findNode(startSteps, dc, reqClass);
		}

		if (startContainer) {
			try {
				hasOffset = start.terminal.offset !== null;
				range.setStart(startContainer, hasOffset ? start.terminal.offset : 0);
			} catch (e) {
				missed = this.fixMiss(startSteps, start.terminal.offset, dc, reqClass);
				range.setStart(missed.container, missed.offset);
				console.warn(e);
			}
		} else {
			// console.error("No startContainer found for", this.toString());
			// return null; // No start found
			throw new Error("No startContainer found for", this.toString());
		}

		if (endContainer) {
			try {
				hasOffset = end.terminal.offset !== null;
				range.setEnd(endContainer, hasOffset ? end.terminal.offset : 0);
			} catch (e) {
				missed = this.fixMiss(endSteps, this.end.terminal.offset, dc, reqClass);
				range.setEnd(missed.container, missed.offset);
				console.warn(e);
			}
		}

		return range;
	}

	/**
	 * Convert CFI to a epubcfi(...) string
	 * @returns {string} EpubCFI string format
	 */
	toString() {

		let str = "epubcfi(";
		str += this.segmentString(this.base);
		str += "!";
		str += this.segmentString(this.path);
		// Add Range, if present
		if (this.range && this.start) {
			str += ",";
			str += this.segmentString(this.start);
		}
		if (this.range && this.end) {
			str += ",";
			str += this.segmentString(this.end);
		}
		str += ")";
		return str;
	}

	/**
	 * walkToNode
	 * @param {object[]} steps 
	 * @param {Document} [doc] 
	 * @param {string} [ignoreClass] 
	 * @returns {Node}
	 * @private
	 */
	walkToNode(steps, doc, ignoreClass) {

		const dc = doc || document;
		let container = dc.documentElement;

		for (let i = 0, len = steps.length; i < len; i++) {
			const step = steps[i];

			if (step.type === "element") {
				//better to get a container using id as some times step.index may not be correct
				//For ex.https://github.com/futurepress/epub.js/issues/561
				if (step.id) {
					container = dc.getElementById(step.id);
				}
				else {
					const children = container.children || findChildren(container);
					container = children[step.index];
				}
			} else if (step.type === "text") {
				container = this.textNodes(container, ignoreClass)[step.index];
			}
			if (!container) {
				//Break the for loop as due to incorrect index we can get error if
				//container is undefined so that other functionailties works fine
				//like navigation
				break;
			}
		}

		return container;
	}

	/**
	 * Destroy the EpubCFI object
	 */
	destroy() {

		Object.keys(this).forEach(p => (this[p] = undefined));
	}
}

export default EpubCFI;