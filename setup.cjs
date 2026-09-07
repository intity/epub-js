const { Blob } = require("node:buffer");
const { URL } = require("node:url");
const { JSDOM } = require("jsdom");
const { ResizeObserver } = require("resize-observer");

const html = "<!DOCTYPE html><html><head></head><body></body></html>";
const vdom = new JSDOM(html, {
  url: "http://localhost:8080",
  contentType: "text/html",
  resources: "usable"
});
const wind = vdom.window;
//--NODEJS
globalThis.URL = URL;
globalThis.Blob = Blob;
//--JSDOM
Object.defineProperty(globalThis, "navigator", {
  value: wind.navigator,
  configurable: true,
  enumerable: true,
  writable: true
});
globalThis.requestAnimationFrame = wind.requestAnimationFrame = (fn) => {
  return setTimeout(fn, 1000 / 60);
};
globalThis.cancelAnimationFrame = wind.cancelAnimationFrame = (id) => {
  clearTimeout(id);
};
globalThis.window = wind;
globalThis.document = wind.document;
globalThis.location = wind.location;
globalThis.screen = wind.screen;
globalThis.Document = wind.Document;
globalThis.DOMParser = wind.DOMParser;
globalThis.Element = wind.Element;
globalThis.HTMLAnchorElement = wind.HTMLAnchorElement;
globalThis.Node = wind.Node;
globalThis.NodeFilter = wind.NodeFilter;
globalThis.NodeList = wind.NodeList;
globalThis.Object = wind.Object;
globalThis.Range = wind.Range;
globalThis.XMLHttpRequest = wind.XMLHttpRequest;
globalThis.XMLSerializer = wind.XMLSerializer;
globalThis.XPathResult = wind.XPathResult;
//--DEPS
globalThis.ResizeObserver = ResizeObserver;
