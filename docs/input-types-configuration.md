# Input types configuration

This section of the documentation describes the specifics of the configuration when opening a digital book in various contexts.

## Determinate types

The **epub.js** library supports the following input types:

| Input type  | typeof   | instanceof    | Detection |
|-------------|----------|---------------|-----------|
| `binary`    | `object` | `ArrayBuffer` | auto      |
| `base64`    | `string` |               | require   |
| `epub`      | `string` |               | auto      |
| `opf`       | `string` |               | auto      |
| `json`      | `string` |               | auto      |
| `directiry` | `string` |               | auto      |

## Open book from ArrayBuffer

**Input type:** `binary`

**Resources.replacements:** `blobUrl`

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

**Input type:** `base64`

**Resources.replacements:** `blobUrl`

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

**Input type:** `epub`

**Resources.replacements:** `blobUrl`

According to the specification, an epub file is a ZIP container (see [OCF ZIP container](https://www.w3.org/TR/epub/#sec-container-zip)). Reading the contents of a ZIP container is done using the third-party library [JSZip](https://github.com/Stuk/jszip).

The path to the file can be either relative,

```js
const book = ePub("/path/to/book.epub")
```

or URL,
```js
const book = ePub("https:/example.com/to/book.epub")
```

### Required Dependencies

```html
<script src="jszip.min.js"></script>
```

## Open book from package.opf

**Input type:** `opf`

**Resources.replacements:** `null`

This input type is essentially a file as well. However, it is an XML file that describes the entire structure of subdirectories and files relative to the root directory of the package. For example, when entering:

```js
const book = ePub("/path/to/book/OPS/package.opf")
```

the root directory of the package is `/path/to/book/OPS/`

## Open book from package.json

**Input type:** `json`

**Resources.replacements:** `null`

This input type is similar to the `opf` type, only in JSON format. For example,

```js
const book = ePub("/path/to/book/OPS/package.json")
```

Note that this package format is not specified as a standard. The question of which format should be adopted as a reference is open to discussion (see the [package.json](../assets/alice/OPS/package.json) data format for more information).

## Open book from directory

**Input type:** `directory`

**Resources.replacements:** `null`

Following W3C recommendations, the container root directory can be determined from the location of the `META-INF/container.xml` file. This path should not change. For example, the following input:

```js
const book = ePub("/path/to/book/")
```

should be defined as the root directory of the book container.

By default, the `Resources.replacements` property is set to `null`. However, if the workbook is opened in the context of the `Storage` interface, then you need to set the value of the `Resources.replacements` property to `blobUrl` or `base64`. For example,

```js
const book = ePub("https://example.com/to/book/", {
    replacements: "blobUrl",
    store: "epub-js"
})
```

Full example: [Storage on unarchive](../examples/storage-on-unarchive.html)