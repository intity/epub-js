import EventEmitter from "event-emitter";
import EpubCFI from "./epubcfi";
import Location from "./location";
import Sections from "./sections";
import Section from "./section";
import Defer from "./utils/defer";
import Queue from "./utils/queue";
import { EVENTS } from "./utils/constants";
import { qs } from "./utils/core";

/**
 * Find Locations for a Book
 * @extends {Map}
 */
class Locations extends Map {
  /**
   * Constructor
   * @param {Sections} [sections]
   * @param {function} [request]
   * @param {number} [pause=100]
   */
  constructor(sections, request, pause) {

    super();
    this.sections = sections;
    this.request = request;
    this.idref = null;
    this.pause = pause || 100;
    this.chars = 150;
    this.processing = new Defer();
    /**
     * @member {Location} current Current Location
     * @property {object} start
     * @property {object} end
     * @memberof Locations
     * @readonly
     */
    this.current = new Location();
    /**
     * @member {Promise<Locations>} generated
     * @memberof Locations
     * @readonly
     */
    this.generated = this.processing.promise;
    this.q = new Queue(this);
  }

  /**
   * Load all of sections in the book to generate locations
   * @param {number} [chars] how many chars to split on (default:150)
   * @return {Promise<Locations>} Locations
   */
  async generate(chars) {

    if (Number.isInteger(chars)) {
      this.chars = chars;
    } else if (typeof chars === "object") {
      this.pause = parseInt(chars.pause) || this.pause;
      this.chars = parseInt(chars.chars) || this.chars;
    } else {
      console.warn("The input value type is not an integer or object:", chars);
    }

    this.q.pause();
    this.sections.forEach((section) => {

      if (section.linear) {
        this.q.enqueue(this.process.bind(this), section);
      }
    });

    return this.q.run().then(() => {

      const len = this.size === 1 ? 1 : this.size - 1;
      const arr = [...this.values()];
      arr.forEach((loc, index) => {
        loc.start.index = index;
        loc.start.percentage = index / len;
      });
      if (this.size) {
        this.current.set(arr[0]);
      }
      this.processing.resolve(this);
      return this;
    });
  }

  /**
   * createRange
   * @returns {object}
   * @private
   */
  createRange() {

    return {
      startContainer: undefined,
      startOffset: undefined,
      endContainer: undefined,
      endOffset: undefined
    };
  }

  /**
   * process
   * @param {Section} section
   * @returns {Promise<Locations>}
   */
  async process(section) {

    return section.load(this.request).then((contents) => {
      return this.parse(contents, section.cfiBase);
    });
  }

  /**
   * parse
   * @param {Element} contents
   * @param {string} cfiBase
   * @param {number} [chars]
   * @returns {Promise<Locations>}
   */
  async parse(contents, cfiBase, chars) {

    chars = chars || this.chars;

    let range;
    let counter = 0;
    let prev;
    const parser = (node) => {

      const def = new Defer();

      if (node.textContent.trim().length === 0) {
        def.resolve(false);
        return def.promise; // continue
      }

      // Start range
      if (counter == 0) {
        range = this.createRange();
        range.startContainer = node;
        range.startOffset = 0;
      }

      const len = node.length;
      let dist = chars - counter;
      let pos = 0;

      // Node is smaller than a break,
      // skip over it
      if (dist > len) {
        counter += len;
        pos = len;
      }

      while (pos < len) {
        dist = chars - counter;

        if (counter === 0) {
          // Start new range
          pos += 1;
          range = this.createRange();
          range.startContainer = node;
          range.startOffset = pos;
        }

        // Gone over
        if (pos + dist >= len) {
          // Continue counter for next node
          counter += len - pos;
          // break
          pos = len;
          // At End
        } else {
          // Advance pos
          pos += dist;
          // End the previous range
          range.endContainer = node;
          range.endOffset = pos;
          const cfi = new EpubCFI(range, cfiBase).toString();
          const loc = new Location().set({ start: { cfi } });
          this.set(cfi, loc);
          counter = 0;
        }
      }

      prev = node;
      def.resolve(true);
      return def.promise;
    };

    const doc = contents.ownerDocument;
    const body = qs(doc, "body");

    return this.treeWalker(body, parser).then(() => {
      // Close remaining
      if (range && range.startContainer && prev) {
        range.endContainer = prev;
        range.endOffset = prev.length;
        const cfi = new EpubCFI(range, cfiBase).toString();
        const loc = new Location().set({ start: { cfi } });
        this.set(cfi, loc);
        counter = 0;
      }
      return this;
    });
  }

  /**
   * treeWalker
   * @param {Node} root
   * @param {function} func
   * @returns {Promise<any>}
   * @private
   */
  treeWalker(root, func) {

    const what = NodeFilter.SHOW_TEXT;
    const task = document.createTreeWalker(root, what);
    const tasks = [];
    while (task.nextNode()) {
      tasks.push(func(task.currentNode));
    }
    return Promise.all(tasks);
  }

  /**
   * Finds where something would fit into a sorted array
   * @param {Location} item
   * @param {Location[]} array
   * @param {function} [compareFunc] colback func
   * @param {function} [start]
   * @param {function} [end]
   * @return {number} location (index in array)
   */
  locationOf(item, array, compareFunc, start, end) {

    const _start = start || 0;
    const _end   = end || array.length;
    const pivot  = parseInt(_start + (_end - _start) / 2);

    if (!compareFunc) {
      compareFunc = (a, b) => {
        if (a >  b) return  1;
        if (a <  b) return -1;
        if (a == b) return  0;
      };
    }

    if (_end - _start <= 0) {
      return pivot;
    }

    const compared = compareFunc(array[pivot], item);

    if (_end - _start === 1) {
      return compared >= 0 ? pivot : pivot + 1;
    }

    if (compared === 0) {
      return pivot;
    }

    if (compared === -1) {
      return this.locationOf(
        item, array,
        compareFunc,
        pivot, _end); // recursive call
    } else {
      return this.locationOf(
        item, array,
        compareFunc,
        _start, pivot); // recursive call
    }
  }

  /**
   * Get a location from an EpubCFI
   * @param {string|EpubCFI} value EpubCFI
   * @return {number} Location index or -1 otherwise
   */
  locationFromCfi(value) {

    if (this.size === 0) return -1;

    const cfi = new EpubCFI(value);
    const arr = [...this.keys()];
    const ind = this.locationOf(cfi, arr, cfi.compare);
    const max = this.size - 1;
    return ind > max ? -1 : ind;
  }

  /**
   * Get a percentage position in locations from an EpubCFI
   * @param {string|EpubCFI} cfi EpubCFI
   * @return {number} Percentage
   */
  percentageFromCfi(cfi) {

    if (this.size === 0) {
      return 0;
    }
    // Find closest cfi
    const index = this.locationFromCfi(cfi);
    // Get percentage in total
    return this.percentageFromLocation(index);
  }

  /**
   * Get a percentage position from a location index
   * @param {number} index Location index
   * @return {number} Percentage
   */
  percentageFromLocation(index) {

    if (this.size === 0 ||
      this.size >= index && index < 0) {
      return 0;
    }
    const len = this.size === 1 ? 1 : this.size - 1;
    return (index / len);
  }

  /**
   * Get an EpubCFI from location index
   * @param {number} index Location index
   * @return {string|null} EpubCFI string format
   */
  cfiFromLocation(index) {

    if (this.size === 0 ||
      this.size >= index && index < 0) {
      return null;
    }
    return [...this.keys()][index];
  }

  /**
   * Get an EpubCFI from location percentage
   * @param {number} value Percentage in ranging from 0 to 1
   * @return {string|null} EpubCFI string format
   */
  cfiFromPercentage(value) {

    let ret, max = this.size - 1;
    if (value >= 0 && value <= 1) {
      const index = Math.round(max * value);
      ret = this.cfiFromLocation(index);
    } else {
      const cfi = new EpubCFI([...this.keys()][max]);
      cfi.collapse();
      ret = cfi.toString();
      console.warn("Recommended a normalize value to between 0 - 1");
    }
    return ret;
  }

  /**
   * Load locations from JSON
   * @param {string} locations
   * @returns {Locations}
   */
  load(locations) {

    if (typeof locations === "string") {
      this.clear();
      const data = JSON.parse(locations);
      data.items.forEach(i => this.set(i.start.cfi, new Location().set(i)));
      this.idref = data.idref || data.items.length ? data.items[0].start.cfi : null;
      this.chars = data.chars || this.chars;
      this.pause = data.pause || this.pause;
      const loc = this.get(this.idref);
      this.current.set(loc);
    } else {
      console.error("Invalid argument type");
    }

    return this;
  }

  /**
   * Save locations to JSON
   * @param {number} [type] default 0, compact array 1
   * @return {string} A JSON string
   */
  save(type) {

    const items = [...this.values()];
    const idref = this.current.start.cfi;
    const chars = this.chars;
    const pause = this.pause;
    const array = [];
    let ret;
    switch (type) {
      default:
        ret = JSON.stringify({ items, idref, chars, pause });
        break;
      case 1:
        items.forEach((v, i) => {
          array.push({
            start: v.start,
            end: v.end
          });
        });
        ret = JSON.stringify(array);
        break;
    }
    return ret;
  }

  /**
   * Set current location
   * @param {any} key EpubCFI to string
   * @param {any} val Location
   * @example locations.set(key, val)
   * @example locations.set({ start: { cfi } })
   * @example locations.set({ start: { index } })
   * @example locations.set({ start: { percentage } })
   * @example locations.set({ start, end })
   * @returns {any} Locations
   * @override
   */
  set(key, val) {

    let options;

    if (typeof key === "string" && val instanceof Location) {
      return super.set(key, val);
    } else {
      options = typeof key === "object" ? key : {};
    }

    const set_cfi = (value) => {
      let ret = null;
      const ind = this.locationFromCfi(value);
      const loc = [...this.values()][ind];
      if (loc) ret = this.current.set(loc);
      return ret;
    };

    const set_index = (value) => {
      let ret = null;
      const cfi = this.cfiFromLocation(value);
      const loc = this.get(cfi);
      if (loc) ret = this.current.set(loc);
      return ret;
    };

    const set_percentage = (value) => {
      let ret = null;
      const cfi = this.cfiFromPercentage(value);
      const loc = this.get(cfi);
      if (loc) ret = this.current.set(loc);
      return ret;
    };

    Object.keys(options).forEach(opt => {
      const value = options[opt];
      if (this.current[opt] === value || typeof value === "undefined") {
        delete options[opt];
      } else if (typeof value === "object" && (opt === "start" || opt === "end")) {
        if (typeof value.cfi === "string") {
          if (!set_cfi(value.cfi)) {
            delete value.cfi;
          }
        }
        if (typeof value.index === "number") {
          if (!set_index(value.index)) {
            delete value.index;
          }
        }
        if (typeof value.percentage === "number") {
          if (!set_percentage(value.percentage)) {
            delete value.percentage;
          }
        }
      } else {
        throw new Error("Invalid value type to " + opt);
      }
    });

    if (Object.keys(options).length) {
      const { ...current } = this.current;
      /**
       * Current location changed
       * @event changed
       * @param {object} current Current location
       * @param {object} changed Changed properties
       * @memberof Locations
       */
      this.emit(EVENTS.LOCATIONS.CHANGED, current, options);
    }

    return this;
  }

  /**
   * Clear locations
   */
  clear() {

    super.clear();
    this.current.clear();
  }

  /**
   * Destroy the Locations object
   */
  destroy() {

    this.clear();
    this.pause = undefined;
    this.chars = undefined;
    this.current && this.current.destroy();
    this.current = undefined;
    this.q.stop();
    this.q = undefined;
    this.generated = undefined;
  }
}

EventEmitter(Locations.prototype);

export default Locations;
