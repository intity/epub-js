const renderer = {
    link({ href, text }) {
        let target = "" 
        if (/https:/.test(href)) {
            target = `target="_blank"`
        } else if (/.md/.test(href)) {
            const loc = window.location
            const sub = /API/.test(loc.href) ? "API/" : ""
            if (/docs/.test(href)) {
                const arr = href.split('/')
                href = href.replace(href, `docs/?q=${sub}${arr[arr.length - 1]}`)
            } else {
                href = href.replace(href, `?q=${sub}${href}`)
            }
        }
        return `<a href="${href}" ${target}>${text}</a>`
    },
    heading({ tokens, depth }) {
        const text = this.parser.parseInline(tokens)
        const link = text.toLowerCase().replace(/[^\w]+/g, '-')
        return `
        <h${depth} tabindex="-1" id="${link}">
            <a class="anchor" href="#${link}">#</a>
            ${text}
        </h${depth}>`
    }
}

marked.use({ renderer })

const load = async (e, url) => {
    return fetch(url).then((r) => r.text()).then((data) => {
        const main = document.getElementById("content")
        const page = document.createElement("div")
        page.className = "page"
        page.innerHTML = marked.parse(data)
        main.appendChild(page)
    })
}

export default load;