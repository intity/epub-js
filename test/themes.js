import assert from "assert"
import Book from "../src/book"

const url = () => `${location.href.replace("/test/", "")}/examples/themes.css`

describe("Themes", () => {
    let book, rendition, theme
    before(async () => {
        book = new Book("../assets/alice/")
        rendition = book.renderTo(document.body, {
            spread: "none"
        })
        await book.opened
        await rendition.display()
    })
    describe("#register()", () => {
        it("should register a theme by url", async () => {
            rendition.themes.register("light", url())
            await rendition.hooks.content
            theme = rendition.themes.get("light")
            assert.equal(theme.url, url())
            rendition.themes.register("dark", url())
            await rendition.hooks.content
            theme = rendition.themes.get("dark")
            assert.equal(theme.url, url())
            rendition.themes.clear()
            await rendition.hooks.content
            assert.equal(rendition.themes.size, 0)
        })
        it("should register a theme by rules", async () => {
            rendition.themes.register("light", { background: "#fff", color: "#000" })
            await rendition.hooks.content
            theme = rendition.themes.get("light")
            assert.equal(theme.rules.background, "#fff")
            assert.equal(theme.rules.color, "#000")
            rendition.themes.register("dark", { background: "#000", color: "#fff" })
            await rendition.hooks.content
            theme = rendition.themes.get("dark")
            assert.equal(theme.rules.background, "#000")
            assert.equal(theme.rules.color, "#fff")
            rendition.themes.clear()
            assert.equal(rendition.themes.size, 0)
        })
        it("should register a themes from object with rules", async () => {
            rendition.themes.register({
                light: {
                    body: {
                        background: "#fff",
                        color: "#000"
                    }
                },
                dark: {
                    body: {
                        background: "#000",
                        color: "#fff"
                    }
                }
            })
            await rendition.hooks.content
            theme = rendition.themes.get("light")
            assert.equal(theme.rules.body.background, "#fff")
            assert.equal(theme.rules.body.color, "#000")
            theme = rendition.themes.get("dark")
            assert.equal(theme.rules.body.background, "#000")
            assert.equal(theme.rules.body.color, "#fff")
            rendition.themes.clear()
            assert.equal(rendition.themes.size, 0)
        })
        it("should register a themes from object with urls", async () => {
            rendition.themes.register({
                light: url(),
                dark: url()
            })
            await rendition.hooks.content
            theme = rendition.themes.get("light")
            assert.equal(theme.url, url())
            theme = rendition.themes.get("dark")
            assert.equal(theme.url, url())
        })
    })
    describe("#select()", () => {
        it ("switching theme using select method", async () => {
            rendition.themes.on("selected", (key, theme) => {
                if (key === null) {
                    assert.equal(theme.injected, false)
                } else {
                    assert.equal(theme.injected, true)
                }
            })
            rendition.themes.select("light")
            await rendition.hooks.content
            assert.equal(rendition.themes.current, "light")
            rendition.themes.select("dark")
            await rendition.hooks.content
            assert.equal(rendition.themes.current, "dark")
            rendition.themes.select(null)
            await rendition.hooks.content
            assert.equal(rendition.themes.current, null)
        })
    })
    describe("#appendRule()", () => {
        it("should inject css rule into contents", async () => {
            rendition.themes.appendRule("font-size", "100%")
            await rendition.hooks.content
            const rule = rendition.themes.rules["font-size"]
            assert.equal(rule.value, "100%")
        })
    })
    describe("#removeRule()", () => {
        it("should reject css rule into contents", async () => {
            rendition.themes.removeRule("font-size")
            await rendition.hooks.content
            const rule = rendition.themes.rules["font-size"]
            assert.equal(rule, undefined)
        })
    })
    describe("#clear()", () => {
        it("should clear all themes", async () => {
            rendition.themes.clear()
            await rendition.hooks.content
            assert.equal(rendition.themes.size, 0)
        })
    })
    after(() => {
        book.destroy()
    })
})