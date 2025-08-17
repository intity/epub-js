import assert from "assert"
import request from "../../src/utils/request"
import {
    replaceBase,
    replaceMeta,
    replaceCanonical,
    replaceLinks,
    substitute
} from "../../src/utils/replacements"
import Section from "../../src/section"
import Hook from "../../src/utils/hook"

const url = (path) => {

    let result = location.origin
    if (/localhost/.test(result)) {
        result += path
    } else {
        result += "epub-js"
        result += path
    }
    return result
}

const init = async () => {

    const keys = [
        "/assets/handbook/EPUB/xhtml/nav.xhtml",
        "/assets/handbook/EPUB/xhtml/introduction.xhtml",
        "/assets/handbook/EPUB/xhtml/mathml.xhtml",
        "/assets/handbook/EPUB/css/epub.css"
    ]
    const urls = [
        url(keys[0]),
        url(keys[1]),
        url(keys[2]),
        url(keys[3])
    ]
    const docs = [
        await request(urls[0], "xhtml"),
        await request(urls[1], "xhtml"),
        await request(urls[2], "xhtml"),
    ]
    const text = [
        await request(urls[0], "text"),
        await request(urls[1], "text"),
        await request(urls[2], "text"),
        await request(urls[3], "text")
    ]
    //--HOOKS
    const hooks = {
        content: new Hook(),
        serialize: new Hook()
    }
    //--SPINE
    const spine = [{
        href: "css/epub.css",
        idref: "r0",
        linear: "no",
        properties: [],
        //--EXT
        canonical: keys[3],
        cfiBase: "/6/2",
        index: 0,
        url: keys[3]
    }, {
        href: "xhtml/nav.xhtml",
        idref: "s0",
        linear: "yes",
        properties: ["nav"],
        //--EXT
        canonical: keys[0],
        cfiBase: "/6/4",
        index: 1,
        url: keys[0]
    }, {
        href: "xhtml/introductin.xhtml",
        idref: "s1",
        linear: "yes",
        properties: [],
        //--EXT
        canonical: keys[1],
        cfiBase: "/6/6",
        index: 2,
        url: keys[1]
    }, {
        href: "xhtml/mathml.xhtml",
        idref: "s2",
        linear: "yes",
        properties: ["mathml"],
        //--EXT
        canonical: keys[2],
        cfiBase: "6/8",
        index: 3,
        url: keys[2]
    }]
    //--SECTIONS
    const sect = []
    spine.forEach(item => {
        if (item.linear === "yes") {
            sect.push(new Section(item, hooks))
        }
    })
    //--RENDER
    await sect[0].render(request)
    await sect[1].render(request)
    await sect[2].render(request)
    //--DONE
    return { docs, text, sect, urls }
}

describe("Core [utils/replacements]", () => {

    let docs, text, sect, urls
    before(async () => {
        const pr = await init()
        docs = pr.docs
        text = pr.text
        sect = pr.sect
        urls = pr.urls
    })
    describe("#replaceBase()", () => {
        it("should be replace base URI", () => {
            docs.forEach((doc, i) => {
                replaceBase(doc, sect[i])
                assert.equal(doc.baseURI, urls[i])
            })
        })
    })
    describe("#replaceCanonical()", () => {
        it("should be replace meta canonical", () => {
            docs.forEach((doc, i) => {
                replaceCanonical(doc, sect[i])
                const head = doc.head.innerHTML
                assert.ok(/canonical/.test(head))
            })
        })
    })
    describe("#replaceMeta()", () => {
        it("should be replase meta", () => {
            docs.forEach((doc, i) => {
                replaceMeta(doc, sect[i])
                const head = doc.head.innerHTML
                assert.ok(/dc.identifier/.test(head))
            })
        })
    })
    describe("#replaceLinks()", () => {
        const cb = (href) => console.log(href)
        it("should be replace links to docs[0]", () => {
            const links = replaceLinks(docs[0], cb)
            assert.ok(links instanceof NodeList)
            assert.equal(links.length, 2)
            assert.equal(links[0], urls[1])
            assert.equal(links[1], urls[2])
            links.forEach((item, i) => {
                assert.ok(item instanceof HTMLAnchorElement)
            })
        })
        it("should be replace links to docs[1]", () => {
            const links = replaceLinks(docs[1], cb)
            assert.ok(links instanceof NodeList)
            assert.equal(links.length, 0)
        })
        it("should be replace links to docs[2]", () => {
            const links = replaceLinks(docs[2], cb)
            assert.ok(links instanceof NodeList)
            assert.equal(links.length, 0)
        })
    })
    describe("#substitute()", () => {
        const rcls = [
            "css/epub.css"
        ]
        const repl = [
            "blob:http://localhost:8080/f217130f-7351-4f84-9b5c-75087f485ddf"
        ]
        it("should be substitute text[0] content", () => {
            const content = substitute(text[0], sect[0], rcls, repl)
            assert.ok(typeof content === "string")
            assert.ok(/blob:/.test(content))
        })
        it("should be substitute text[1] content", () => {
            const content = substitute(text[1], sect[1], rcls, repl)
            assert.ok(typeof content === "string")
            assert.ok(/blob:/.test(content))
        })
        it("should be substitute text[2] content", () => {
            const content = substitute(text[2], sect[2], rcls, repl)
            assert.ok(typeof content === "string")
            assert.ok(/blob:/.test(content))
        })
    })
})