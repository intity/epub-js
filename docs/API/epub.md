<a name="ePub"></a>

# ePub(input, [options]) ⇒ <code>Book</code>
Create a new Book instance

**Kind**: global function  
**Returns**: <code>Book</code> - a new Book object  

| Param | Type | Description |
| --- | --- | --- |
| input | <code>string</code> \| <code>ArrayBuffer</code> | URL, Path or ArrayBuffer |
| [options] | <code>object</code> | to pass to the book |

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
