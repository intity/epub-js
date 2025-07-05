# Input types configuration

This section of the documentation describes the specifics of the configuration when opening a digital book in various contexts.

## Definition of types

The **epub.js** library supports the following input types:

| Input type  | typeof   | instanceof    | Detection |
|-------------|----------|---------------|-----------|
| `binary`    | `object` | `ArrayBuffer` | auto      |
| `base64`    | `string` |               | require   |
| `epub`      | `string` |               | auto      |
| `directiry` | `string` |               | auto      |

## Open book from ArrayBuffer

```
Input[type]            : binary
Resources.replacements : blobUrl
```

This input type is mainly used when opening a file via the **readAsArrayBuffer** method of the [FileReader](https://developer.mozilla.org/en-US/docs/Web/API/FileReader) interface. Typically, the resulting `ArrayBuffer` is stored in the browser's IndexedDB database. For example,

```js
const book = ePub({ store: "epub-js" })
...
book.storage.set(0, input).then((data) => {
    book.open(data)
})
```

You can then redownload the book from the Storage when the page is reloaded. For example,

```js
book.storage.get(0).then((data) => {
    if (data) book.open(data)
})
```

Full example: [Open from File with storage](../examples/input-with-storage.html)

### Required Dependencies

```html
<script src="jszip.min.js"></script>
<script src="localforage.min.js"></script>
```

## Open book from data URL in base64 encoding

```
Input[type]            : base64
Resources.replacements : blobUrl
```

This input type has a similar configuration to the `binary` type. The only difference is that the data received via the **readAsDataURL** method is **base64** encoded. However, the input type must be explicitly defined. For example,

```js
const book = epub({ store: "epub-js" })
...
book.storage.set(0, input).then((data) => {
    book.open(data, "base64")
})
```

You can also define the encoding in the constructor. For example,

```js
const book = ePub({ store: "epub-js", encoding: "base64" })
...
book.storage.set(0, input).then((data) => {
    book.open(data)
})
```

### Required Dependencies

```html
<script src="jszip.min.js"></script>
<script src="localforage.min.js"></script>
```

## Open book from epub File

```
Input[type]            : epub
Resources.replacements : blobUrl
```

According to the specification, an epub file is a ZIP container (see [OCF ZIP container](https://www.w3.org/TR/epub/#sec-container-zip)). Reading the contents of a ZIP container is done using the third-party library [JSZip](https://github.com/Stuk/jszip).

The path to the file can be either relative,

```js
const book = ePub("/path/to/book.epub")
```

or URL,
```js
const book = ePub("https://example.com/to/book.epub")
```

### Required Dependencies

```html
<script src="jszip.min.js"></script>
```

## Open book from directory

```
Input[type]            : directory
Resources.replacements : null
```

Following W3C recommendations, the container root directory can be determined from the location of the `META-INF/container.xml` file. This path should not change. For example, the following input:

```js
const book = ePub("/path/to/book/")
```

should be defined as the root directory of the book container.

By default, the `Resources.replacements` property is set to `null`. However, if the workbook is opened in the context of the `Storage` interface, then the value of the `Resources.replacements` property will be automatically changed to `blobUrl`. If you want links to resources to be in `base64` encoding, you need to explicitly specify this. For example,

```js
const book = ePub("/path/to/book/", {
    replacements: "base64",
    store: "epub-js"
})
```

Full example: [Storage when unarchive](../examples/storage-when-unarchive.html)

### Container format extentsion

The following configuration is experimental. In fact, this input type is an extension of the `directory` type. The difference is that we explicitly define the container format as JSON.

```js
const book = ePub("/path/to/book/", { format: "json" })
```

>Note that this format is not specified as a standard. The question of which format should be adopted as a reference is open to [discussion](https://github.com/intity/epub-js/discussions/3).

The following files are used as examples:

- [container.json](../assets/alice/META-INF/container.json)
- [package.json](../assets/alice/OPS/package.json)
- [nav.json](../assets/alice/OPS/nav.json)