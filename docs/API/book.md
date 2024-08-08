<a name="Book"></a>

# Book
An Epub representation with methods for the loading, 
parsing and manipulation of its contents.

**Kind**: global class  

* [Book](#Book)
    * [new Book(input, [options])](#new_Book_new)
    * _instance_
        * [.clear()](#Book+clear)
        * [.open(input, [openAs])](#Book+open) ⇒ [<code>Promise.&lt;Book&gt;</code>](#Book)
        * [.load(path, [type])](#Book+load) ⇒ <code>Promise.&lt;any&gt;</code>
        * [.resolve(path, [absolute])](#Book+resolve) ⇒ <code>string</code>
        * [.canonical(path)](#Book+canonical) ⇒ <code>string</code>
        * [.section([target])](#Book+section) ⇒ <code>Section</code> \| <code>null</code>
        * [.renderTo(element, [options])](#Book+renderTo) ⇒ <code>Rendition</code>
        * [.setRequestCredentials(credentials)](#Book+setRequestCredentials)
        * [.setRequestHeaders(headers)](#Book+setRequestHeaders)
        * [.coverUrl()](#Book+coverUrl) ⇒ <code>Promise.&lt;string&gt;</code>
        * [.getRange(cfiRange)](#Book+getRange) ⇒ <code>Promise.&lt;Range&gt;</code>
        * [.key([identifier])](#Book+key) ⇒ <code>string</code>
        * [.destroy()](#Book+destroy)
    * _static_
        * [.request](#Book.request) : <code>function</code>
        * [.storage](#Book.storage) : <code>Storage</code>
        * [.rendition](#Book.rendition) : <code>Rendition</code>
        * [.container](#Book.container) : <code>Container</code>
        * [.packaging](#Book.packaging) : <code>Packaging</code>
        * [.resources](#Book.resources) : <code>Resources</code>
        * [.sections](#Book.sections) : <code>Sections</code>
        * [.locations](#Book.locations) : <code>Locations</code>
        * [.navigation](#Book.navigation) : <code>Navigation</code>
        * [.url](#Book.url) : <code>Url</code>
        * [.archived](#Book.archived) : <code>boolean</code>
        * [.cover](#Book.cover) : <code>string</code>
        * [.path](#Book.path) : <code>Path</code>
        * [.isOpen](#Book.isOpen) : <code>boolean</code>
        * [.opened](#Book.opened) : [<code>Promise.&lt;Book&gt;</code>](#Book)
        * [.loaded](#Book.loaded) : <code>object</code>
        * ["openFailed" (error)](#Book.event_openFailed)

<a name="new_Book_new"></a>

## new Book(input, [options])

| Param | Type | Default | Description |
| --- | --- | --- | --- |
| input | <code>string</code> \| <code>ArrayBuffer</code> |  |  |
| [options] | <code>object</code> |  |  |
| [options.request] | <code>object</code> |  | object options to xhr request |
| [options.request.method] | <code>function</code> | <code></code> | a request function to use instead of the default |
| [options.request.withCredentials] | <code>boolean</code> | <code>false</code> | send the xhr request withCredentials |
| [options.request.headers] | <code>Array.&lt;string&gt;</code> | <code>[]</code> | send the xhr request headers |
| [options.encoding] | <code>string</code> | <code>&quot;&#x27;binary&#x27;&quot;</code> | optional to pass `"binary"` or `"base64"` for archived Epubs |
| [options.replacements] | <code>string</code> | <code>null</code> | use `"base64"` or `"blobUrl"` for replacing assets |
| [options.canonical] | <code>function</code> |  | optional function to determine canonical urls for a path |
| [options.store] | <code>string</code> | <code>false</code> | cache the contents in local storage, value should be the name of the reader |

**Example**  
```js
new Book("/path/to/book/" { replacements: "blobUrl", store: "epub-js" })
```
<a name="Book+clear"></a>

## book.clear()
Clear parts

**Kind**: instance method of [<code>Book</code>](#Book)  
<a name="Book+open"></a>

## book.open(input, [openAs]) ⇒ [<code>Promise.&lt;Book&gt;</code>](#Book)
Open a epub or url

**Kind**: instance method of [<code>Book</code>](#Book)  
**Returns**: [<code>Promise.&lt;Book&gt;</code>](#Book) - of when the book has been loaded  

| Param | Type | Description |
| --- | --- | --- |
| input | <code>string</code> \| <code>ArrayBuffer</code> | Url, Path or ArrayBuffer |
| [openAs] | <code>string</code> | input type: `"binary"` OR `"base64"` OR `"epub"` OR `"opf"` OR `"json"` OR `"directory"` |

**Example**  
```js
book.open("/path/to/book/")
```
**Example**  
```js
book.open("/path/to/book/OPS/package.opf")
```
**Example**  
```js
book.open("/path/to/book.epub")
```
**Example**  
```js
book.open("https://example.com/book/")
```
**Example**  
```js
book.open("https://example.com/book/OPS/package.opf")
```
**Example**  
```js
book.open("https://example.com/book.epub")
```
**Example**  
```js
book.open([arraybuffer], "binary")
```
<a name="Book+load"></a>

## book.load(path, [type]) ⇒ <code>Promise.&lt;any&gt;</code>
Load a resource from the Book

**Kind**: instance method of [<code>Book</code>](#Book)  
**Returns**: <code>Promise.&lt;any&gt;</code> - returns a promise with the requested resource  

| Param | Type | Default | Description |
| --- | --- | --- | --- |
| path | <code>string</code> |  | path to the resource to load |
| [type] | <code>string</code> | <code>null</code> |  |

<a name="Book+resolve"></a>

## book.resolve(path, [absolute]) ⇒ <code>string</code>
Resolve a path to it's absolute position in the Book

**Kind**: instance method of [<code>Book</code>](#Book)  
**Returns**: <code>string</code> - the resolved path string  

| Param | Type | Default | Description |
| --- | --- | --- | --- |
| path | <code>string</code> |  |  |
| [absolute] | <code>boolean</code> | <code>false</code> | force resolving the full URL |

<a name="Book+canonical"></a>

## book.canonical(path) ⇒ <code>string</code>
Get a canonical link to a path

**Kind**: instance method of [<code>Book</code>](#Book)  
**Returns**: <code>string</code> - the canonical path string  

| Param | Type |
| --- | --- |
| path | <code>string</code> | 

<a name="Book+section"></a>

## book.section([target]) ⇒ <code>Section</code> \| <code>null</code>
Gets a Section of the Book from the Spine
Alias for `book.sections.get`

**Kind**: instance method of [<code>Book</code>](#Book)  

| Param | Type |
| --- | --- |
| [target] | <code>string</code> \| <code>number</code> | 

**Example**  
```js
book.section()
```
**Example**  
```js
book.section(3)
```
**Example**  
```js
book.section("#chapter_001")
```
**Example**  
```js
book.section("chapter_001.xhtml")
```
**Example**  
```js
book.section("epubcfi(/6/8!/4/2/16/1:0)")
```
<a name="Book+renderTo"></a>

## book.renderTo(element, [options]) ⇒ <code>Rendition</code>
Sugar to render a book to an element

**Kind**: instance method of [<code>Book</code>](#Book)  

| Param | Type | Description |
| --- | --- | --- |
| element | <code>Element</code> \| <code>string</code> | element or string to add a rendition to |
| [options] | <code>object</code> |  |

<a name="Book+setRequestCredentials"></a>

## book.setRequestCredentials(credentials)
Set if request should use withCredentials

**Kind**: instance method of [<code>Book</code>](#Book)  

| Param | Type |
| --- | --- |
| credentials | <code>boolean</code> | 

<a name="Book+setRequestHeaders"></a>

## book.setRequestHeaders(headers)
Set headers request should use

**Kind**: instance method of [<code>Book</code>](#Book)  

| Param | Type |
| --- | --- |
| headers | <code>Array.&lt;string&gt;</code> | 

<a name="Book+coverUrl"></a>

## book.coverUrl() ⇒ <code>Promise.&lt;string&gt;</code>
Get the cover url

**Kind**: instance method of [<code>Book</code>](#Book)  
**Returns**: <code>Promise.&lt;string&gt;</code> - coverUrl  
<a name="Book+getRange"></a>

## book.getRange(cfiRange) ⇒ <code>Promise.&lt;Range&gt;</code>
Find a DOM Range for a given CFI Range

**Kind**: instance method of [<code>Book</code>](#Book)  

| Param | Type | Description |
| --- | --- | --- |
| cfiRange | <code>EpubCFI</code> | a epub cfi range |

<a name="Book+key"></a>

## book.key([identifier]) ⇒ <code>string</code>
Generates the Book Key using the identifier in the manifest or other string provided

**Kind**: instance method of [<code>Book</code>](#Book)  
**Returns**: <code>string</code> - key  

| Param | Type | Description |
| --- | --- | --- |
| [identifier] | <code>string</code> | to use instead of metadata identifier |

<a name="Book+destroy"></a>

## book.destroy()
Destroy the Book and all associated objects

**Kind**: instance method of [<code>Book</code>](#Book)  
<a name="Book.request"></a>

## Book.request : <code>function</code>
**Kind**: static property of [<code>Book</code>](#Book)  
**Read only**: true  
<a name="Book.storage"></a>

## Book.storage : <code>Storage</code>
**Kind**: static property of [<code>Book</code>](#Book)  
**Read only**: true  
<a name="Book.rendition"></a>

## Book.rendition : <code>Rendition</code>
**Kind**: static property of [<code>Book</code>](#Book)  
**Read only**: true  
<a name="Book.container"></a>

## Book.container : <code>Container</code>
**Kind**: static property of [<code>Book</code>](#Book)  
**Read only**: true  
<a name="Book.packaging"></a>

## Book.packaging : <code>Packaging</code>
**Kind**: static property of [<code>Book</code>](#Book)  
**Read only**: true  
<a name="Book.resources"></a>

## Book.resources : <code>Resources</code>
**Kind**: static property of [<code>Book</code>](#Book)  
**Read only**: true  
<a name="Book.sections"></a>

## Book.sections : <code>Sections</code>
**Kind**: static property of [<code>Book</code>](#Book)  
**Read only**: true  
<a name="Book.locations"></a>

## Book.locations : <code>Locations</code>
**Kind**: static property of [<code>Book</code>](#Book)  
**Read only**: true  
<a name="Book.navigation"></a>

## Book.navigation : <code>Navigation</code>
**Kind**: static property of [<code>Book</code>](#Book)  
**Read only**: true  
<a name="Book.url"></a>

## Book.url : <code>Url</code>
**Kind**: static property of [<code>Book</code>](#Book)  
**Read only**: true  
<a name="Book.archived"></a>

## Book.archived : <code>boolean</code>
**Kind**: static property of [<code>Book</code>](#Book)  
**Read only**: true  
<a name="Book.cover"></a>

## Book.cover : <code>string</code>
**Kind**: static property of [<code>Book</code>](#Book)  
**Read only**: true  
<a name="Book.path"></a>

## Book.path : <code>Path</code>
**Kind**: static property of [<code>Book</code>](#Book)  
**Read only**: true  
<a name="Book.isOpen"></a>

## Book.isOpen : <code>boolean</code>
**Kind**: static property of [<code>Book</code>](#Book)  
**Read only**: true  
<a name="Book.opened"></a>

## Book.opened : [<code>Promise.&lt;Book&gt;</code>](#Book)
returns after the book is loaded

**Kind**: static property of [<code>Book</code>](#Book)  
**Read only**: true  
<a name="Book.loaded"></a>

## Book.loaded : <code>object</code>
Sequential loading of tasks

**Kind**: static property of [<code>Book</code>](#Book)  
**Read only**: true  
**Properties**

| Name | Type |
| --- | --- |
| packaging | <code>Promise.&lt;Packaging&gt;</code> | 
| resources | <code>Promise.&lt;Resources&gt;</code> | 
| sections | <code>Promise.&lt;Sections&gt;</code> | 
| navigation | <code>Promise.&lt;Navigation&gt;</code> | 
| cover | <code>Promise.&lt;string&gt;</code> | 

<a name="Book.event_openFailed"></a>

## "openFailed" (error)
**Kind**: event emitted by [<code>Book</code>](#Book)  

| Param | Type |
| --- | --- |
| error | <code>object</code> | 

