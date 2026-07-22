const fs = require("fs");
const path = require("path");
const JSZip = require("jszip");
const { JSDOM } = require("jsdom");
const { pathToFileURL } = require("url");

const dom = new JSDOM("<!DOCTYPE html>");
globalThis.window = dom.window;
globalThis.JSZip = JSZip;
globalThis.Node = dom.window.Node;
globalThis.NodeFilter = dom.window.NodeFilter;
globalThis.Promise = dom.window.Promise;
globalThis.Range = dom.window.Range;
globalThis.URL = dom.window.URL;
globalThis.XMLHttpRequest = dom.window.XMLHttpRequest;
globalThis.document = dom.window.document;
globalThis.navigator = dom.window.navigator;

globalThis.requestAnimationFrame = dom.window.requestAnimationFrame = (cb) => {
  return setTimeout(cb, 1000 / 60);
};
globalThis.cancelAnimationFrame = dom.window.cancelAnimationFrame = (id) => {
  clearTimeout(id);
};

(async () => {
  const obj = require("./dist/epub.cjs");
  const time = Date.now();
  const ePub = obj.ePub;
  const absolutePath = path.resolve("./assets/alice/");
  const directoryUrl = pathToFileURL(absolutePath).href + "/";
  const book = ePub(directoryUrl);
  await book.opened;
  await book.locations.generate(880); // chars/pages -- 880/66
  /*
  const items = [...book.locations.values()];
  const array = [];
  items.forEach((v, i) => {
    const loc = {
      start: v.start,
      end: v.end
    };
    array.push(loc);
  });
  const data = JSON.stringify(array);
  */
  const data = book.locations.save(1);
  const outp = path.resolve(__dirname, "test/data.json");
  fs.writeFile(outp, data, "utf8", (err) => {
    if (err) {
      console.error("Error writeFile:", err);
      return;
    }
  });
  const t = (Date.now() - time).toString().padStart(3);
  console.log("output [time:%s ms, path:%s]", t, outp);
})();
