<a name="Section"></a>

# Section
<p>Represents a Section of the Book
In most books this is equivalent to a Chapter</p>

**Kind**: global class  

* [Section](#Section)
    * [new Section(item, hooks)](#new_Section_new)
    * _instance_
        * [.load(request)](#Section+load) ⇒ <code>Promise.&lt;Element&gt;</code>
        * [.render(request)](#Section+render) ⇒ <code>Promise.&lt;string&gt;</code>
        * [.find(query)](#Section+find) ⇒ <code>Array.&lt;object&gt;</code>
        * [.search(query, [maxSeqEle])](#Section+search) ⇒ <code>Array.&lt;object&gt;</code>
        * [.cfiFromRange(range)](#Section+cfiFromRange) ⇒ <code>string</code>
        * [.cfiFromElement(el)](#Section+cfiFromElement) ⇒ <code>string</code>
        * [.unload()](#Section+unload)
        * [.destroy()](#Section+destroy)
    * _static_
        * [.idref](#Section.idref) : <code>string</code>
        * [.linear](#Section.linear) : <code>boolean</code>
        * [.index](#Section.index) : <code>number</code>
        * [.href](#Section.href) : <code>string</code>
        * [.url](#Section.url) : <code>string</code>
        * [.canonical](#Section.canonical) : <code>string</code>
        * [.cfiBase](#Section.cfiBase) : <code>string</code>
        * [.next](#Section.next) : <code>function</code>
        * [.prev](#Section.prev) : <code>function</code>
        * [.properties](#Section.properties) : <code>Array.&lt;string&gt;</code>
        * [.document](#Section.document) : <code>Document</code>
        * [.contents](#Section.contents) : <code>Element</code>
        * [.output](#Section.output) : <code>string</code>

<a name="new_Section_new"></a>

## new Section(item, hooks)
<p>Constructor</p>


| Param | Type | Description |
| --- | --- | --- |
| item | <code>object</code> | <p>Spine Item</p> |
| hooks | <code>object</code> |  |

<a name="Section+load"></a>

## section.load(request) ⇒ <code>Promise.&lt;Element&gt;</code>
<p>Load the section from its url</p>

**Kind**: instance method of [<code>Section</code>](#Section)  
**Returns**: <code>Promise.&lt;Element&gt;</code> - <p>a promise with the xml document</p>  

| Param | Type | Description |
| --- | --- | --- |
| request | <code>function</code> | <p>a request method to use for loading</p> |

<a name="Section+render"></a>

## section.render(request) ⇒ <code>Promise.&lt;string&gt;</code>
<p>Render the contents of a section</p>

**Kind**: instance method of [<code>Section</code>](#Section)  
**Returns**: <code>Promise.&lt;string&gt;</code> - <p>output a serialized XML Document</p>  
**Todo**

- [ ] better way to return this from hooks?


| Param | Type | Description |
| --- | --- | --- |
| request | <code>function</code> | <p>a request method to use for loading</p> |

<a name="Section+find"></a>

## section.find(query) ⇒ <code>Array.&lt;object&gt;</code>
<p>Find a string in a section</p>

**Kind**: instance method of [<code>Section</code>](#Section)  
**Returns**: <code>Array.&lt;object&gt;</code> - <p>A list of matches, with form { cfi, excerpt }</p>  

| Param | Type | Description |
| --- | --- | --- |
| query | <code>string</code> | <p>The query string to find</p> |

<a name="Section+search"></a>

## section.search(query, [maxSeqEle]) ⇒ <code>Array.&lt;object&gt;</code>
<p>Search a string in multiple sequential Element of the section.
If the document.createTreeWalker api is missed(eg: IE8), use
<code>find</code> as a fallback.</p>

**Kind**: instance method of [<code>Section</code>](#Section)  
**Returns**: <code>Array.&lt;object&gt;</code> - <p>A list of matches, with form { cfi, excerpt }</p>  

| Param | Type | Default | Description |
| --- | --- | --- | --- |
| query | <code>string</code> |  | <p>The query string to search</p> |
| [maxSeqEle] | <code>number</code> | <code>5</code> | <p>The maximum number of Element that are combined for search, default value is 5.</p> |

<a name="Section+cfiFromRange"></a>

## section.cfiFromRange(range) ⇒ <code>string</code>
<p>Get a CFI from a Range in the Section</p>

**Kind**: instance method of [<code>Section</code>](#Section)  
**Returns**: <code>string</code> - <p>cfi an EpubCFI string</p>  

| Param | Type |
| --- | --- |
| range | <code>Range</code> | 

<a name="Section+cfiFromElement"></a>

## section.cfiFromElement(el) ⇒ <code>string</code>
<p>Get a CFI from an Element in the Section</p>

**Kind**: instance method of [<code>Section</code>](#Section)  
**Returns**: <code>string</code> - <p>cfi an EpubCFI string</p>  

| Param | Type |
| --- | --- |
| el | <code>Element</code> | 

<a name="Section+unload"></a>

## section.unload()
<p>Unload the section document</p>

**Kind**: instance method of [<code>Section</code>](#Section)  
<a name="Section+destroy"></a>

## section.destroy()
<p>destroy</p>

**Kind**: instance method of [<code>Section</code>](#Section)  
<a name="Section.idref"></a>

## Section.idref : <code>string</code>
**Kind**: static property of [<code>Section</code>](#Section)  
**Read only**: true  
<a name="Section.linear"></a>

## Section.linear : <code>boolean</code>
**Kind**: static property of [<code>Section</code>](#Section)  
**Read only**: true  
<a name="Section.index"></a>

## Section.index : <code>number</code>
**Kind**: static property of [<code>Section</code>](#Section)  
**Read only**: true  
<a name="Section.href"></a>

## Section.href : <code>string</code>
**Kind**: static property of [<code>Section</code>](#Section)  
**Read only**: true  
<a name="Section.url"></a>

## Section.url : <code>string</code>
**Kind**: static property of [<code>Section</code>](#Section)  
**Read only**: true  
<a name="Section.canonical"></a>

## Section.canonical : <code>string</code>
**Kind**: static property of [<code>Section</code>](#Section)  
**Read only**: true  
<a name="Section.cfiBase"></a>

## Section.cfiBase : <code>string</code>
**Kind**: static property of [<code>Section</code>](#Section)  
**Read only**: true  
<a name="Section.next"></a>

## Section.next : <code>function</code>
**Kind**: static property of [<code>Section</code>](#Section)  
**Read only**: true  
<a name="Section.prev"></a>

## Section.prev : <code>function</code>
**Kind**: static property of [<code>Section</code>](#Section)  
**Read only**: true  
<a name="Section.properties"></a>

## Section.properties : <code>Array.&lt;string&gt;</code>
**Kind**: static property of [<code>Section</code>](#Section)  
**Read only**: true  
<a name="Section.document"></a>

## Section.document : <code>Document</code>
**Kind**: static property of [<code>Section</code>](#Section)  
**Read only**: true  
<a name="Section.contents"></a>

## Section.contents : <code>Element</code>
**Kind**: static property of [<code>Section</code>](#Section)  
**Read only**: true  
<a name="Section.output"></a>

## Section.output : <code>string</code>
**Kind**: static property of [<code>Section</code>](#Section)  
**Read only**: true  
