const { URL } = require("node:url")
const { JSDOM } = require("jsdom")
const { ResizeObserver } = require("resize-observer")
const JSZip = require("jszip")
const localforage = require("localforage")

const html = "<!DOCTYPE html><html><head></head><body></body></html>"
const vdom = new JSDOM(html, {
    url: "http://localhost",
    contentType: "text/html",
    resources: "usable"
})
const window = vdom.window
//-- NODEJS
global.URL = URL
global.requestAnimationFrame = window.requestAnimationFrame = (fn) => {
    return setTimeout(fn, 0)
}
global.cancelAnimationFrame = window.cancelAnimationFrame = (id) => {
    clearTimeout(id)
}
//-- JSDOM
global.window = window
global.document = window.document
global.location = window.location
global.navigator = window.navigator
global.screen = window.screen
global.Array = window.Array
global.Blob = window.Blob
global.Document = window.Document
global.DOMParser = window.DOMParser
global.Element = window.Element
global.Map = window.Map
global.Node = window.Node
global.NodeFilter = window.NodeFilter
global.NodeList = window.NodeList
global.Object = window.Object
global.Range = window.Range
global.XMLHttpRequest = window.XMLHttpRequest
global.XMLSerializer = window.XMLSerializer
global.XPathResult = window.XPathResult
//-- DEPS
global.JSZip = JSZip
global.localforage = localforage
global.ResizeObserver = ResizeObserver