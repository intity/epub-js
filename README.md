# Introduction to the epub-js library

The **epub-js** is an open-source JavaScript library for rendering [EPUB](https://en.wikipedia.org/wiki/EPUB) documents in the browser on many devices. Essentially, this library provides an interface for common ebook features (such as rendering, persistence and pagination) without the need to develop a dedicated application or plugin.

In addition, some components of the **epub-js** library can also be used in **commonjs** projects on the server.

## Why was this fork created

Initially, the main reason for creating the [intity/epub-js](https://github.com/intity/epub-js) fork (hereinafter **epub-js**) was to fix the problems of the deprecated API.

However, upon closer examination of the source code of the [futurepress/epub.js](https://github.com/futurepress/epub.js) library, architectural problems related to dynamic layout rebuilding were discovered. As a result, the architecture of the **epub-js** library was significantly reworked, which led to a violation of the backward compatibility of the API.

## Why EPUB

The [EPUB standard](https://www.w3.org/TR/epub/) is a widely used and easily convertible format. Many books are currently in this format, and it is convertible to many other formats (such as PDF, Mobi and iBooks).

An unzipped EPUB3 is a collection of HTML5 files, CSS, images and other media – just like any other website. However, it enforces a schema of book components, which allows us to render a book and its parts based on a controlled vocabulary.

More specifically, the EPUB schema standardizes the table of contents, provides a manifest that enables the caching of the entire book, and separates the storage of the content from how it’s displayed.

## Development goals

The new stage of development of the **epub-js** library assumes a higher quality level of optimization and API testing. To achieve this goal, a deep understanding of the specifics of the application of technologies that form the basis of this library is required. The main task of development is to reach the optimization limit through unit testing.

In addition, it is necessary to develop a scheme that will allow configuring library components at the build stage, excluding unused code.

A secondary goal is to develop documentation that should make it easier for the community to learn the API, which includes a detailed description of the architecture and various methods for configuring the **epub-js** library.

## Getting Started

If using archived `.epub` files include [JSZip](https://stuk.github.io/jszip/) (this must precede inclusion of **epub.js**):

```html
<script src="../dist/jszip.min.js"></script>
```

Get the minified code from the build folder:

```html
<script src="../dist/epub.min.js"></script>
```

Set up a element to render to:

```html
<div id="viewport"></div>
```

Create the new ePub, and then render it to that element:

```html
<script>
  const book = ePub("uri/to/book.epub")
  const rend = book.renderTo("viewport", {
    width: 600,
    height: 400
  })
  rend.display().then((section) => {
    console.log(section)
  })
</script>
```

## Setting up the render manager

A rendering manager is an entity that defines the base class of content generation. Preloaded documents from the EPUB container are added to the DOM structure to be rendered during the rendering stage. The **epub-js** library provides two rendering managers: `default` and `continuous`.

Default configuration:

```js
book.renderTo("viewport", {
  manager: "default"
})
```
The `default` manager renders one section at a time, using minimal device resources. The default configuration is more suitable for devices where navigation is controlled only by a keyboard or mouse.

Example: [examples/paginated.html](examples/paginated.html)

Configuration with continuous rendering manager:

```js
book.renderTo("viewport", {
  manager: "continuous"
})
```

The `continuous` manager creates a continuous flow of scrollable area composed of a set of sections.

Examples (for mobile devices):

- [examples/paginated-continuous.html](examples/paginated-continuous.html)
- [examples/scrolled-continuous.html](examples/scrolled-continuous.html)

## Setting up the flow

Flow is a layout property that determines how pages are reflowed. The **epub-js** library provides the following types for the `flow` property:

- `paginated`
- `scrolled`
- `scrolled-doc`

Default configuration:

```js
book.renderTo("viewport", {
  flow: "paginated"
})
```

The `paginated` type defines a method for rearranging the document content into columns. Each column represents a page that moves along the horizontal axis within the visible portion of the `viewport` container. Pages that extend beyond the visible portion of the container are always hidden. In fact, the entire `viewport` container moves. However, the horizontal scrolling mechanism is hidden from the user so that only a quick change of frames is displayed on the visible portion of the container.

Example: [examples/paginated.html](examples/paginated.html)

Configuration of a `scrolled` flow:

```js
book.renderTo("viewport", {
  flow: "scrolled"
})
```

The `scrolled` type defines a method for reflowing the document's content across the width of the `viewport` container, with the scrollable area hidden along the vertical axis.

Example: [examples/scrolled.html](examples/scrolled.html)

Configuration of a `scrolled-doc` flow:

```js
book.renderTo("viewport", {
  flow: "scrolled-doc",
  pageWidth: 800
})
```

The `scrolled-doc` type is an extension of the `scrolled` type. This type makes it easy to customize the layout of pages within the boundaries defined by the `pageWidth` property.

Example: [examples/scrolled-doc.html](examples/scrolled-doc.html)

## Embedded Scripts

[Scripted content](https://www.w3.org/TR/epub/#sec-scripted-content) (or embedded JavaScript) is disabled by default due to the potential for malicious code execution. However, if needed, you can configure sandbox permissions in the rendering configuration, for example:

```js
book.renderTo("viewport", {
  sandbox: [
    "allow-same-origin",
    "allow-scripts"
  ]
})
```

This will thus allow sandboxed content to run scripts.

>Technically, this is done by sandboxing the `iframe` element in which the content is rendered. It is also recommended to clean the server-side of the EPUB content.

## Hooks

Similar to a plugins, **epub.js** implements events that can be "hooked" into. Thus you can interact with and manipulate the contents of the book.

Examples of this functionality is loading videos from YouTube links before displaying a chapter's contents or implementing annotation.

Hooks require an event to register to and a can return a promise to block until they are finished.

Example hook:

```js
rendition.hooks.content.register((contents, view) => {
  const items = contents.document.querySelectorAll("[video]")
  items.forEach((item) => {
    // do something with the video item
  })
})
```

For more details, see the related section of the [Hooks](docs/index.html?q=hooks) documentation.

## Documentation

All documentation is available at [docs/index.md](docs/).

## Running a local server

install **node.js**

Then install the project dependences with `npm`

```js
npm install
```

You can run the reader locally with the command

```js
npm run start
```

## Examples

You can find all the source code for the examples in the [epub-js/examples](examples/) subsection of the repository.

>Please note: not all examples work; some may be outdated.

You can find a list of working examples on the [Examples](https://intity.github.io/epub-js/examples/) page.

There is also a project [epubreader-js](https://github.com/intity/epubreader-js/), which implements the main features of the library [futurepress/epub.js](https://github.com/futurepress/epub.js).

## Testing

The [mocha](https://mochajs.org/) framework is used for unit testing. All tests are performed in the browser console. First, you need to start the local server with the following command:

```js
npm run start
```

Then open the page in the browser at: [/test/](http://localhost:8080/test/)

Finally, open the browser console to see the test results.

## Building and distribution

Builds are concatenated and minified using [webpack](https://webpack.js.org/) and [babel](https://babeljs.io/)

To generate a new build run

```js
npm run prepare
```

or to continuously build run

```js
npm run watch
```

## License

```
URL: https://opensource.org/license/bsd-2-clause
```