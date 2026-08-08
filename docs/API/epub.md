<a name="ePub"></a>

# ePub(input, [options]) ⇒ <code>Book</code>
<p>Create a new Book instance</p>

**Kind**: global function  
**Returns**: <code>Book</code> - <p>a new Book object</p>  

| Param | Type | Description |
| --- | --- | --- |
| input | <code>string</code> \| <code>ArrayBuffer</code> | <p>URL, Path or ArrayBuffer</p> |
| [options] | <code>object</code> | <p>to pass to the book</p> |

**Example**  
```js
ePub()
```
**Example**  
```js
ePub("/path/to/book/")
```
**Example**  
```js
ePub("/path/to/book/", { replacements: "blobUrl", store: "epub-js" })
```
**Example**  
```js
ePub("/path/to/book.epub")
```
**Example**  
```js
ePub("https://example.com/to/book.epub")
```
