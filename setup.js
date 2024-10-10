import { URL } from "node:url"
import { JSDOM } from "jsdom"
import { ResizeObserver } from "resize-observer"
import JSZip from "jszip"
import localforage from "localforage"

const html = "<!DOCTYPE html><html><head></head><body></body></html>"
const dom = new JSDOM(html, {
    url: "http://localhost:8080/",
    contentType: "text/html",
    resources: "usable"
})
const window = dom.window
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
global.navigator = window.navigator
global.screen = window.screen
global.DOMParser = window.DOMParser
global.Element = window.Element
global.Node = window.Node
global.NodeList = window.NodeList
global.XMLHttpRequest = window.XMLHttpRequest
global.XMLSerializer = window.XMLSerializer
//-- DEPS
global.JSZip = JSZip
global.localforage = localforage
global.ResizeObserver = ResizeObserver