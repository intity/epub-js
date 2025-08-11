const { Blob } = require("node:buffer")
const { URL } = require("node:url")
const { JSDOM } = require("jsdom")
const { ResizeObserver } = require("resize-observer")
const html = "<!DOCTYPE html><html><head></head><body></body></html>"
const vdom = new JSDOM(html, {
    url: "http://localhost:8080",
    contentType: "text/html",
    resources: "usable"
})
const wind = vdom.window
//--NODEJS
global.URL = URL
global.Blob = Blob
//--JSDOM
global.requestAnimationFrame = wind.requestAnimationFrame = (fn) => {
    return setTimeout(fn, 0)
}
global.cancelAnimationFrame = wind.cancelAnimationFrame = (id) => {
    clearTimeout(id)
}
global.window = wind
global.document = wind.document
global.location = wind.location
global.navigator = wind.navigator
global.screen = wind.screen
global.Document = wind.Document
global.DOMParser = wind.DOMParser
global.Element = wind.Element
global.HTMLAnchorElement = wind.HTMLAnchorElement
global.Node = wind.Node
global.NodeFilter = wind.NodeFilter
global.NodeList = wind.NodeList
global.Object = wind.Object
global.Range = wind.Range
global.XMLHttpRequest = wind.XMLHttpRequest
global.XMLSerializer = wind.XMLSerializer
global.XPathResult = wind.XPathResult
//--DEPS
global.ResizeObserver = ResizeObserver