<a name="Book"></a>

# Book
<p>An Epub representation with methods for the loading,
parsing and manipulation of its contents.</p>

**Kind**: global class  

* [Book](#Book)
    * [new Book([input], [options])](#new_Book_new)
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

## new Book([input], [options])
<p>Constructor</p>


| Param | Type | Default | Description |
| --- | --- | --- | --- |
| [input] | <code>string</code> \| <code>ArrayBuffer</code> |  | <p>Url, Path or ArrayBuffer</p> |
| [options] | <code>object</code> |  |  |
| [options.format] | <code>string</code> | <code>&quot;&#x27;xml&#x27;&quot;</code> | <p>epub container format</p> |
| [options.request] | <code>object</code> |  | <p>object options to xhr request</p> |
| [options.request.method] | <code>function</code> |  | <p>a request function to use instead of the default</p> |
| [options.request.withCredentials] | <code>boolean</code> | <code>false</code> | <p>send the xhr request withCredentials</p> |
| [options.request.headers] | <code>Array.&lt;string&gt;</code> | <code>[]</code> | <p>send the xhr request headers</p> |
| [options.encoding] | <code>string</code> | <code>&quot;&#x27;binary&#x27;&quot;</code> | <p>optional to pass <code>&quot;binary&quot;</code> or <code>&quot;base64&quot;</code> for archived Epubs</p> |
| [options.replacements] | <code>string</code> | <code>null</code> | <p>use <code>&quot;base64&quot;</code> or <code>&quot;blobUrl&quot;</code> for replacing assets</p> |
| [options.canonical] | <code>function</code> |  | <p>optional function to determine canonical urls for a path</p> |
| [options.store] | <code>string</code> | <code>null</code> | <p>cache the contents in local storage, value should be the name of the reader</p> |

**Example**  
```js
new Book()
```
**Example**  
```js
new Book("/path/to/book/", { store: "epub-js" })
```
**Example**  
```js
new Book({ replacements: "base64", store: "epub-js" })
```
<a name="Book+clear"></a>

## book.clear()
<p>Clear parts</p>

**Kind**: instance method of [<code>Book</code>](#Book)  
<a name="Book+open"></a>

## book.open(input, [openAs]) ⇒ [<code>Promise.&lt;Book&gt;</code>](#Book)
<p>Open a epub or url</p>

**Kind**: instance method of [<code>Book</code>](#Book)  
**Returns**: [<code>Promise.&lt;Book&gt;</code>](#Book) - <p>of when the book has been loaded</p>  

| Param | Type | Description |
| --- | --- | --- |
| input | <code>string</code> \| <code>ArrayBuffer</code> | <p>Url, Path or ArrayBuffer</p> |
| [openAs] | <code>string</code> | <p>input type: <code>&quot;binary&quot;</code> OR <code>&quot;base64&quot;</code> OR <code>&quot;epub&quot;</code> OR <code>&quot;json&quot;</code> OR <code>&quot;directory&quot;</code></p> |

**Example**  
```js
book.open("/path/to/book/")
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
book.open("https://example.com/book.epub")
```
**Example**  
```js
book.open([arraybuffer], "binary")
```
<a name="Book+load"></a>

## book.load(path, [type]) ⇒ <code>Promise.&lt;any&gt;</code>
<p>Load a resource from the Book</p>

**Kind**: instance method of [<code>Book</code>](#Book)  
**Returns**: <code>Promise.&lt;any&gt;</code> - <p>returns a promise with the requested resource</p>  

| Param | Type | Default | Description |
| --- | --- | --- | --- |
| path | <code>string</code> |  | <p>path to the resource to load</p> |
| [type] | <code>string</code> | <code>null</code> |  |

<a name="Book+resolve"></a>

## book.resolve(path, [absolute]) ⇒ <code>string</code>
<p>Resolve a path to it's absolute position in the Book</p>

**Kind**: instance method of [<code>Book</code>](#Book)  
**Returns**: <code>string</code> - <p>the resolved path string</p>  

| Param | Type | Default | Description |
| --- | --- | --- | --- |
| path | <code>string</code> |  |  |
| [absolute] | <code>boolean</code> | <code>false</code> | <p>force resolving the full URL</p> |

<a name="Book+canonical"></a>

## book.canonical(path) ⇒ <code>string</code>
<p>Get a canonical link to a path</p>

**Kind**: instance method of [<code>Book</code>](#Book)  
**Returns**: <code>string</code> - <p>the canonical path string</p>  

| Param | Type |
| --- | --- |
| path | <code>string</code> | 

<a name="Book+section"></a>

## book.section([target]) ⇒ <code>Section</code> \| <code>null</code>
<p>Gets a Section of the Book from the Spine
Alias for <code>book.sections.get</code></p>

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
<p>Sugar to render a book to an element</p>

**Kind**: instance method of [<code>Book</code>](#Book)  

| Param | Type | Description |
| --- | --- | --- |
| element | <code>Element</code> \| <code>string</code> | <p>element or string to add a rendition to</p> |
| [options] | <code>object</code> |  |

<a name="Book+setRequestCredentials"></a>

## book.setRequestCredentials(credentials)
<p>Set if request should use withCredentials</p>

**Kind**: instance method of [<code>Book</code>](#Book)  

| Param | Type |
| --- | --- |
| credentials | <code>boolean</code> | 

<a name="Book+setRequestHeaders"></a>

## book.setRequestHeaders(headers)
<p>Set headers request should use</p>

**Kind**: instance method of [<code>Book</code>](#Book)  

| Param | Type |
| --- | --- |
| headers | <code>Array.&lt;string&gt;</code> | 

<a name="Book+coverUrl"></a>

## book.coverUrl() ⇒ <code>Promise.&lt;string&gt;</code>
<p>Get the cover url</p>

**Kind**: instance method of [<code>Book</code>](#Book)  
**Returns**: <code>Promise.&lt;string&gt;</code> - <p>coverUrl</p>  
<a name="Book+getRange"></a>

## book.getRange(cfiRange) ⇒ <code>Promise.&lt;Range&gt;</code>
<p>Find a DOM Range for a given CFI Range</p>

**Kind**: instance method of [<code>Book</code>](#Book)  

| Param | Type | Description |
| --- | --- | --- |
| cfiRange | <code>EpubCFI</code> | <p>a epub cfi range</p> |

<a name="Book+key"></a>

## book.key([identifier]) ⇒ <code>string</code>
<p>Generates the Book Key using the identifier in the manifest or other string provided</p>

**Kind**: instance method of [<code>Book</code>](#Book)  
**Returns**: <code>string</code> - <p>key</p>  

| Param | Type | Description |
| --- | --- | --- |
| [identifier] | <code>string</code> | <p>to use instead of metadata identifier</p> |

<a name="Book+destroy"></a>

## book.destroy()
<p>Destroy the Book and all associated objects</p>

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
<p>returns after the book is loaded</p>

**Kind**: static property of [<code>Book</code>](#Book)  
**Read only**: true  
<a name="Book.loaded"></a>

## Book.loaded : <code>object</code>
<p>Sequential loading of tasks</p>

**Kind**: static property of [<code>Book</code>](#Book)  
**Read only**: true  
**Properties**

| Name | Type |
| --- | --- |
| packaging | <code>Promise.&lt;Packaging&gt;</code> | 
| resources | <code>Promise.&lt;Resources&gt;</code> | 
| navigation | <code>Promise.&lt;Navigation&gt;</code> | 
| sections | <code>Promise.&lt;Sections&gt;</code> | 
| cover | <code>Promise.&lt;string&gt;</code> | 

<a name="Book.event_openFailed"></a>

## "openFailed" (error)
**Kind**: event emitted by [<code>Book</code>](#Book)  

| Param | Type |
| --- | --- |
| error | <code>object</code> | 

