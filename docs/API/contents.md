<a name="Contents"></a>

# Contents
Handles DOM manipulation, queries and events for View contents

**Kind**: global class  

* [Contents](#Contents)
    * [new Contents(doc, content, section)](#new_Contents_new)
    * _instance_
        * [.width([w])](#Contents+width) ⇒ <code>number</code>
        * [.height([h])](#Contents+height) ⇒ <code>number</code>
        * [.textSize()](#Contents+textSize) ⇒ <code>Object</code>
        * [.scrollWidth()](#Contents+scrollWidth) ⇒ <code>number</code>
        * [.scrollHeight()](#Contents+scrollHeight) ⇒ <code>number</code>
        * [.overflow([overflow])](#Contents+overflow) ⇒ <code>string</code>
        * [.overflowX([overflow])](#Contents+overflowX) ⇒ <code>string</code>
        * [.overflowY([overflow])](#Contents+overflowY) ⇒ <code>string</code>
        * [.css(property, value, [priority])](#Contents+css) ⇒ <code>any</code>
        * [.viewport([options])](#Contents+viewport) ⇒ <code>object</code>
        * [.root()](#Contents+root) ⇒ <code>Element</code>
        * [.locationOf(target, [ignoreClass])](#Contents+locationOf) ⇒ <code>Object</code>
        * [.appendStylesheet(key, input)](#Contents+appendStylesheet) ⇒ <code>Promise.&lt;Node&gt;</code>
        * [.removeStylesheet(key)](#Contents+removeStylesheet) ⇒ <code>boolean</code>
        * [.clearStylesheets()](#Contents+clearStylesheets)
        * [.appendScript(key, src)](#Contents+appendScript) ⇒ <code>Promise.&lt;Node&gt;</code>
        * [.removeScript(key)](#Contents+removeScript) ⇒ <code>boolean</code>
        * [.clearScripts()](#Contents+clearScripts)
        * [.appendClass(className)](#Contents+appendClass)
        * [.removeClass(className)](#Contents+removeClass)
        * [.range(cfi, [ignoreClass])](#Contents+range) ⇒ <code>Range</code>
        * [.cfiFromRange(range, [ignoreClass])](#Contents+cfiFromRange) ⇒ <code>string</code>
        * [.cfiFromNode(node, [ignoreClass])](#Contents+cfiFromNode) ⇒ <code>string</code>
        * [.map(layout)](#Contents+map) ⇒ <code>Array.&lt;object&gt;</code>
        * [.format(layout)](#Contents+format)
        * [.scale(scale, offsetX, offsetY)](#Contents+scale)
        * [.direction([dir])](#Contents+direction)
        * [.mapPage(cfiBase, layout, start, end, dev)](#Contents+mapPage) ⇒ <code>any</code>
        * [.writingMode([mode])](#Contents+writingMode)
        * [.destroy()](#Contents+destroy)
    * _static_
        * [.epubcfi](#Contents.epubcfi) : <code>EpubCFI</code>
        * [.content](#Contents.content) : <code>Element</code>
        * [.contentRect](#Contents.contentRect) : <code>object</code>
        * [.section](#Contents.section) : <code>Section</code>
        * [.mode](#Contents.mode) : <code>string</code>

<a name="new_Contents_new"></a>

## new Contents(doc, content, section)
Constructor


| Param | Type | Description |
| --- | --- | --- |
| doc | <code>Document</code> | Document |
| content | <code>Element</code> | Parent Element (typically Body) |
| section | <code>Section</code> | Section object reference |

<a name="Contents+width"></a>

## contents.width([w]) ⇒ <code>number</code>
Get or Set width

**Kind**: instance method of [<code>Contents</code>](#Contents)  
**Returns**: <code>number</code> - width  

| Param | Type |
| --- | --- |
| [w] | <code>number</code> | 

<a name="Contents+height"></a>

## contents.height([h]) ⇒ <code>number</code>
Get or Set height

**Kind**: instance method of [<code>Contents</code>](#Contents)  
**Returns**: <code>number</code> - height  

| Param | Type |
| --- | --- |
| [h] | <code>number</code> | 

<a name="Contents+textSize"></a>

## contents.textSize() ⇒ <code>Object</code>
Get size of the text using Range

**Kind**: instance method of [<code>Contents</code>](#Contents)  
<a name="Contents+scrollWidth"></a>

## contents.scrollWidth() ⇒ <code>number</code>
Get documentElement scrollWidth

**Kind**: instance method of [<code>Contents</code>](#Contents)  
**Returns**: <code>number</code> - width  
<a name="Contents+scrollHeight"></a>

## contents.scrollHeight() ⇒ <code>number</code>
Get documentElement scrollHeight

**Kind**: instance method of [<code>Contents</code>](#Contents)  
**Returns**: <code>number</code> - height  
<a name="Contents+overflow"></a>

## contents.overflow([overflow]) ⇒ <code>string</code>
Set overflow css style of the contents

**Kind**: instance method of [<code>Contents</code>](#Contents)  

| Param | Type |
| --- | --- |
| [overflow] | <code>string</code> | 

<a name="Contents+overflowX"></a>

## contents.overflowX([overflow]) ⇒ <code>string</code>
Set overflowX css style of the documentElement

**Kind**: instance method of [<code>Contents</code>](#Contents)  

| Param | Type |
| --- | --- |
| [overflow] | <code>string</code> | 

<a name="Contents+overflowY"></a>

## contents.overflowY([overflow]) ⇒ <code>string</code>
Set overflowY css style of the documentElement

**Kind**: instance method of [<code>Contents</code>](#Contents)  

| Param | Type |
| --- | --- |
| [overflow] | <code>string</code> | 

<a name="Contents+css"></a>

## contents.css(property, value, [priority]) ⇒ <code>any</code>
Set Css styles on the contents element (typically Body)

**Kind**: instance method of [<code>Contents</code>](#Contents)  

| Param | Type | Description |
| --- | --- | --- |
| property | <code>string</code> |  |
| value | <code>string</code> |  |
| [priority] | <code>boolean</code> | set as "important" |

<a name="Contents+viewport"></a>

## contents.viewport([options]) ⇒ <code>object</code>
Get or Set the viewport element

**Kind**: instance method of [<code>Contents</code>](#Contents)  

| Param | Type |
| --- | --- |
| [options] | <code>object</code> | 
| [options.width] | <code>string</code> | 
| [options.height] | <code>string</code> | 
| [options.scale] | <code>string</code> | 
| [options.minimum] | <code>string</code> | 
| [options.maximum] | <code>string</code> | 
| [options.scalable] | <code>string</code> | 

<a name="Contents+root"></a>

## contents.root() ⇒ <code>Element</code>
Get the documentElement

**Kind**: instance method of [<code>Contents</code>](#Contents)  
**Returns**: <code>Element</code> - documentElement  
<a name="Contents+locationOf"></a>

## contents.locationOf(target, [ignoreClass]) ⇒ <code>Object</code>
Get the location offset of a EpubCFI or an #id

**Kind**: instance method of [<code>Contents</code>](#Contents)  
**Returns**: <code>Object</code> - target position left and top  

| Param | Type | Description |
| --- | --- | --- |
| target | <code>string</code> \| <code>EpubCFI</code> |  |
| [ignoreClass] | <code>string</code> | for the cfi |

<a name="Contents+appendStylesheet"></a>

## contents.appendStylesheet(key, input) ⇒ <code>Promise.&lt;Node&gt;</code>
Append a stylesheet link/rules to the document head

**Kind**: instance method of [<code>Contents</code>](#Contents)  

| Param | Type | Description |
| --- | --- | --- |
| key | <code>string</code> |  |
| input | <code>string</code> \| <code>object</code> | url or rules |

**Example**  
```js
appendStylesheet("common", "/pach/to/stylesheet.css")
```
**Example**  
```js
appendStylesheet("common", "https://example.com/to/stylesheet.css")
```
**Example**  
```js
appendStylesheet("common", { h1: { "font-size": "1.5em" }})
```
<a name="Contents+removeStylesheet"></a>

## contents.removeStylesheet(key) ⇒ <code>boolean</code>
Remove a stylesheet link from the document head

**Kind**: instance method of [<code>Contents</code>](#Contents)  

| Param | Type |
| --- | --- |
| key | <code>string</code> | 

<a name="Contents+clearStylesheets"></a>

## contents.clearStylesheets()
Clear all injected stylesheets

**Kind**: instance method of [<code>Contents</code>](#Contents)  
<a name="Contents+appendScript"></a>

## contents.appendScript(key, src) ⇒ <code>Promise.&lt;Node&gt;</code>
Append a script node to the document head

**Kind**: instance method of [<code>Contents</code>](#Contents)  
**Returns**: <code>Promise.&lt;Node&gt;</code> - loaded  

| Param | Type | Description |
| --- | --- | --- |
| key | <code>string</code> |  |
| src | <code>string</code> | url |

**Example**  
```js
appendScript("common", "/path/to/script.js")
```
**Example**  
```js
appendScript("common", "https://examples.com/to/script.js")
```
<a name="Contents+removeScript"></a>

## contents.removeScript(key) ⇒ <code>boolean</code>
Remove a script node from the document head

**Kind**: instance method of [<code>Contents</code>](#Contents)  

| Param | Type |
| --- | --- |
| key | <code>string</code> | 

<a name="Contents+clearScripts"></a>

## contents.clearScripts()
Clear all injected scripts

**Kind**: instance method of [<code>Contents</code>](#Contents)  
<a name="Contents+appendClass"></a>

## contents.appendClass(className)
Append a class to the contents container

**Kind**: instance method of [<code>Contents</code>](#Contents)  

| Param | Type |
| --- | --- |
| className | <code>string</code> | 

<a name="Contents+removeClass"></a>

## contents.removeClass(className)
Remove a class from the contents container

**Kind**: instance method of [<code>Contents</code>](#Contents)  

| Param | Type |
| --- | --- |
| className | <code>string</code> | 

<a name="Contents+range"></a>

## contents.range(cfi, [ignoreClass]) ⇒ <code>Range</code>
Get a Dom Range from EpubCFI

**Kind**: instance method of [<code>Contents</code>](#Contents)  
**Returns**: <code>Range</code> - range  

| Param | Type |
| --- | --- |
| cfi | <code>EpubCFI</code> | 
| [ignoreClass] | <code>string</code> | 

<a name="Contents+cfiFromRange"></a>

## contents.cfiFromRange(range, [ignoreClass]) ⇒ <code>string</code>
Get an EpubCFI from a Dom Range

**Kind**: instance method of [<code>Contents</code>](#Contents)  
**Returns**: <code>string</code> - EpubCFI  

| Param | Type |
| --- | --- |
| range | <code>Range</code> | 
| [ignoreClass] | <code>string</code> | 

<a name="Contents+cfiFromNode"></a>

## contents.cfiFromNode(node, [ignoreClass]) ⇒ <code>string</code>
Get an EpubCFI from a Dom node

**Kind**: instance method of [<code>Contents</code>](#Contents)  
**Returns**: <code>string</code> - EpubCFI  

| Param | Type |
| --- | --- |
| node | <code>Node</code> | 
| [ignoreClass] | <code>string</code> | 

<a name="Contents+map"></a>

## contents.map(layout) ⇒ <code>Array.&lt;object&gt;</code>
map

**Kind**: instance method of [<code>Contents</code>](#Contents)  
**Todo**

- [ ] find where this is used - remove?


| Param | Type |
| --- | --- |
| layout | <code>Layout</code> | 

<a name="Contents+format"></a>

## contents.format(layout)
Apply CSS to a Document

**Kind**: instance method of [<code>Contents</code>](#Contents)  

| Param | Type |
| --- | --- |
| layout | <code>Layout</code> | 

<a name="Contents+scale"></a>

## contents.scale(scale, offsetX, offsetY)
Scale contents from center

**Kind**: instance method of [<code>Contents</code>](#Contents)  

| Param | Type |
| --- | --- |
| scale | <code>number</code> | 
| offsetX | <code>number</code> | 
| offsetY | <code>number</code> | 

<a name="Contents+direction"></a>

## contents.direction([dir])
Set the direction of the text

**Kind**: instance method of [<code>Contents</code>](#Contents)  

| Param | Type | Default | Description |
| --- | --- | --- | --- |
| [dir] | <code>string</code> | <code>&quot;&#x27;ltr&#x27;&quot;</code> | values: `"ltr"` OR `"rtl"` |

<a name="Contents+mapPage"></a>

## contents.mapPage(cfiBase, layout, start, end, dev) ⇒ <code>any</code>
mapPage

**Kind**: instance method of [<code>Contents</code>](#Contents)  

| Param | Type |
| --- | --- |
| cfiBase | <code>string</code> | 
| layout | <code>Layout</code> | 
| start | <code>number</code> | 
| end | <code>number</code> | 
| dev | <code>boolean</code> | 

<a name="Contents+writingMode"></a>

## contents.writingMode([mode])
Set the writingMode of the text

**Kind**: instance method of [<code>Contents</code>](#Contents)  

| Param | Type | Default | Description |
| --- | --- | --- | --- |
| [mode] | <code>string</code> | <code>&quot;&#x27;horizontal-tb&#x27;&quot;</code> | `"horizontal-tb"` OR `"vertical-rl"` OR `"vertical-lr"` |

<a name="Contents+destroy"></a>

## contents.destroy()
destroy

**Kind**: instance method of [<code>Contents</code>](#Contents)  
<a name="Contents.epubcfi"></a>

## Contents.epubcfi : <code>EpubCFI</code>
Blank Cfi for Parsing

**Kind**: static property of [<code>Contents</code>](#Contents)  
**Read only**: true  
<a name="Contents.content"></a>

## Contents.content : <code>Element</code>
document.body by current location

**Kind**: static property of [<code>Contents</code>](#Contents)  
**Read only**: true  
<a name="Contents.contentRect"></a>

## Contents.contentRect : <code>object</code>
**Kind**: static property of [<code>Contents</code>](#Contents)  
**Read only**: true  
<a name="Contents.section"></a>

## Contents.section : <code>Section</code>
**Kind**: static property of [<code>Contents</code>](#Contents)  
**Read only**: true  
<a name="Contents.mode"></a>

## Contents.mode : <code>string</code>
writing-mode

**Kind**: static property of [<code>Contents</code>](#Contents)  
**Read only**: true  
