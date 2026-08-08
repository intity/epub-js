<a name="Contents"></a>

# Contents
<p>Handles DOM manipulation, queries and events for View contents</p>

**Kind**: global class  

* [Contents](#Contents)
    * [new Contents(doc, content, section)](#new_Contents_new)
    * _instance_
        * [.width([w])](#Contents+width) ⇒ <code>number</code>
        * [.height([h])](#Contents+height) ⇒ <code>number</code>
        * [.textSize(layout)](#Contents+textSize) ⇒ <code>Object</code>
        * [.scrollWidth()](#Contents+scrollWidth) ⇒ <code>number</code>
        * [.scrollHeight()](#Contents+scrollHeight) ⇒ <code>number</code>
        * [.overflow([overflow])](#Contents+overflow) ⇒ <code>string</code>
        * [.overflowX([overflow])](#Contents+overflowX) ⇒ <code>string</code>
        * [.overflowY([overflow])](#Contents+overflowY) ⇒ <code>string</code>
        * [.css(property, value, [priority], [target])](#Contents+css) ⇒ <code>any</code>
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
        * [.content](#Contents.content) : <code>Element</code>
        * [.contentRect](#Contents.contentRect) : <code>object</code>
        * [.section](#Contents.section) : <code>Section</code>
        * [.mode](#Contents.mode) : <code>string</code>

<a name="new_Contents_new"></a>

## new Contents(doc, content, section)
<p>Constructor</p>


| Param | Type | Description |
| --- | --- | --- |
| doc | <code>Document</code> | <p>Document</p> |
| content | <code>Element</code> | <p>Parent Element (typically Body)</p> |
| section | <code>Section</code> | <p>Section object reference</p> |

<a name="Contents+width"></a>

## contents.width([w]) ⇒ <code>number</code>
<p>Get or Set width</p>

**Kind**: instance method of [<code>Contents</code>](#Contents)  
**Returns**: <code>number</code> - <p>width</p>  

| Param | Type |
| --- | --- |
| [w] | <code>number</code> | 

<a name="Contents+height"></a>

## contents.height([h]) ⇒ <code>number</code>
<p>Get or Set height</p>

**Kind**: instance method of [<code>Contents</code>](#Contents)  
**Returns**: <code>number</code> - <p>height</p>  

| Param | Type |
| --- | --- |
| [h] | <code>number</code> | 

<a name="Contents+textSize"></a>

## contents.textSize(layout) ⇒ <code>Object</code>
<p>Get size of the text using Range</p>

**Kind**: instance method of [<code>Contents</code>](#Contents)  

| Param | Type |
| --- | --- |
| layout | <code>Layout</code> | 

<a name="Contents+scrollWidth"></a>

## contents.scrollWidth() ⇒ <code>number</code>
<p>Get documentElement scrollWidth</p>

**Kind**: instance method of [<code>Contents</code>](#Contents)  
**Returns**: <code>number</code> - <p>width</p>  
<a name="Contents+scrollHeight"></a>

## contents.scrollHeight() ⇒ <code>number</code>
<p>Get documentElement scrollHeight</p>

**Kind**: instance method of [<code>Contents</code>](#Contents)  
**Returns**: <code>number</code> - <p>height</p>  
<a name="Contents+overflow"></a>

## contents.overflow([overflow]) ⇒ <code>string</code>
<p>Set overflow css style of the contents</p>

**Kind**: instance method of [<code>Contents</code>](#Contents)  

| Param | Type |
| --- | --- |
| [overflow] | <code>string</code> | 

<a name="Contents+overflowX"></a>

## contents.overflowX([overflow]) ⇒ <code>string</code>
<p>Set overflowX css style of the documentElement</p>

**Kind**: instance method of [<code>Contents</code>](#Contents)  

| Param | Type |
| --- | --- |
| [overflow] | <code>string</code> | 

<a name="Contents+overflowY"></a>

## contents.overflowY([overflow]) ⇒ <code>string</code>
<p>Set overflowY css style of the documentElement</p>

**Kind**: instance method of [<code>Contents</code>](#Contents)  

| Param | Type |
| --- | --- |
| [overflow] | <code>string</code> | 

<a name="Contents+css"></a>

## contents.css(property, value, [priority], [target]) ⇒ <code>any</code>
<p>Set Css styles on the contents element (typically Body)</p>

**Kind**: instance method of [<code>Contents</code>](#Contents)  

| Param | Type | Description |
| --- | --- | --- |
| property | <code>string</code> |  |
| value | <code>string</code> |  |
| [priority] | <code>boolean</code> | <p>set as &quot;important&quot;</p> |
| [target] | <code>Element</code> |  |

<a name="Contents+viewport"></a>

## contents.viewport([options]) ⇒ <code>object</code>
<p>Get or Set the viewport element</p>

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
<p>Get the documentElement</p>

**Kind**: instance method of [<code>Contents</code>](#Contents)  
**Returns**: <code>Element</code> - <p>documentElement</p>  
<a name="Contents+locationOf"></a>

## contents.locationOf(target, [ignoreClass]) ⇒ <code>Object</code>
<p>Get the location offset of a EpubCFI or an #id</p>

**Kind**: instance method of [<code>Contents</code>](#Contents)  
**Returns**: <code>Object</code> - <p>target position left and top</p>  

| Param | Type | Description |
| --- | --- | --- |
| target | <code>string</code> \| <code>EpubCFI</code> |  |
| [ignoreClass] | <code>string</code> | <p>for the cfi</p> |

<a name="Contents+appendStylesheet"></a>

## contents.appendStylesheet(key, input) ⇒ <code>Promise.&lt;Node&gt;</code>
<p>Append a stylesheet link/rules to the document head</p>

**Kind**: instance method of [<code>Contents</code>](#Contents)  

| Param | Type | Description |
| --- | --- | --- |
| key | <code>string</code> |  |
| input | <code>string</code> \| <code>object</code> | <p>url or rules</p> |

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
<p>Remove a stylesheet link from the document head</p>

**Kind**: instance method of [<code>Contents</code>](#Contents)  

| Param | Type |
| --- | --- |
| key | <code>string</code> | 

<a name="Contents+clearStylesheets"></a>

## contents.clearStylesheets()
<p>Clear all injected stylesheets</p>

**Kind**: instance method of [<code>Contents</code>](#Contents)  
<a name="Contents+appendScript"></a>

## contents.appendScript(key, src) ⇒ <code>Promise.&lt;Node&gt;</code>
<p>Append a script node to the document head</p>

**Kind**: instance method of [<code>Contents</code>](#Contents)  
**Returns**: <code>Promise.&lt;Node&gt;</code> - <p>loaded</p>  

| Param | Type | Description |
| --- | --- | --- |
| key | <code>string</code> |  |
| src | <code>string</code> | <p>url</p> |

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
<p>Remove a script node from the document head</p>

**Kind**: instance method of [<code>Contents</code>](#Contents)  

| Param | Type |
| --- | --- |
| key | <code>string</code> | 

<a name="Contents+clearScripts"></a>

## contents.clearScripts()
<p>Clear all injected scripts</p>

**Kind**: instance method of [<code>Contents</code>](#Contents)  
<a name="Contents+appendClass"></a>

## contents.appendClass(className)
<p>Append a class to the contents container</p>

**Kind**: instance method of [<code>Contents</code>](#Contents)  

| Param | Type |
| --- | --- |
| className | <code>string</code> | 

<a name="Contents+removeClass"></a>

## contents.removeClass(className)
<p>Remove a class from the contents container</p>

**Kind**: instance method of [<code>Contents</code>](#Contents)  

| Param | Type |
| --- | --- |
| className | <code>string</code> | 

<a name="Contents+range"></a>

## contents.range(cfi, [ignoreClass]) ⇒ <code>Range</code>
<p>Get a Dom Range from EpubCFI</p>

**Kind**: instance method of [<code>Contents</code>](#Contents)  
**Returns**: <code>Range</code> - <p>range</p>  

| Param | Type |
| --- | --- |
| cfi | <code>EpubCFI</code> | 
| [ignoreClass] | <code>string</code> | 

<a name="Contents+cfiFromRange"></a>

## contents.cfiFromRange(range, [ignoreClass]) ⇒ <code>string</code>
<p>Get an EpubCFI from a Dom Range</p>

**Kind**: instance method of [<code>Contents</code>](#Contents)  
**Returns**: <code>string</code> - <p>EpubCFI</p>  

| Param | Type |
| --- | --- |
| range | <code>Range</code> | 
| [ignoreClass] | <code>string</code> | 

<a name="Contents+cfiFromNode"></a>

## contents.cfiFromNode(node, [ignoreClass]) ⇒ <code>string</code>
<p>Get an EpubCFI from a Dom node</p>

**Kind**: instance method of [<code>Contents</code>](#Contents)  
**Returns**: <code>string</code> - <p>EpubCFI</p>  

| Param | Type |
| --- | --- |
| node | <code>Node</code> | 
| [ignoreClass] | <code>string</code> | 

<a name="Contents+map"></a>

## contents.map(layout) ⇒ <code>Array.&lt;object&gt;</code>
<p>map</p>

**Kind**: instance method of [<code>Contents</code>](#Contents)  
**Todo**

- [ ] find where this is used - remove?


| Param | Type |
| --- | --- |
| layout | <code>Layout</code> | 

<a name="Contents+format"></a>

## contents.format(layout)
<p>Apply CSS to a Document</p>

**Kind**: instance method of [<code>Contents</code>](#Contents)  

| Param | Type |
| --- | --- |
| layout | <code>Layout</code> | 

<a name="Contents+scale"></a>

## contents.scale(scale, offsetX, offsetY)
<p>Scale contents from center</p>

**Kind**: instance method of [<code>Contents</code>](#Contents)  

| Param | Type |
| --- | --- |
| scale | <code>number</code> | 
| offsetX | <code>number</code> | 
| offsetY | <code>number</code> | 

<a name="Contents+direction"></a>

## contents.direction([dir])
<p>Set the direction of the text</p>

**Kind**: instance method of [<code>Contents</code>](#Contents)  

| Param | Type | Default | Description |
| --- | --- | --- | --- |
| [dir] | <code>string</code> | <code>&quot;&#x27;ltr&#x27;&quot;</code> | <p>values: <code>&quot;ltr&quot;</code> OR <code>&quot;rtl&quot;</code></p> |

<a name="Contents+mapPage"></a>

## contents.mapPage(cfiBase, layout, start, end, dev) ⇒ <code>any</code>
<p>mapPage</p>

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
<p>Set the writingMode of the text</p>

**Kind**: instance method of [<code>Contents</code>](#Contents)  

| Param | Type | Default | Description |
| --- | --- | --- | --- |
| [mode] | <code>string</code> | <code>&quot;&#x27;horizontal-tb&#x27;&quot;</code> | <p><code>&quot;horizontal-tb&quot;</code> OR <code>&quot;vertical-rl&quot;</code> OR <code>&quot;vertical-lr&quot;</code></p> |

<a name="Contents+destroy"></a>

## contents.destroy()
<p>destroy</p>

**Kind**: instance method of [<code>Contents</code>](#Contents)  
<a name="Contents.content"></a>

## Contents.content : <code>Element</code>
<p>document.body by current location</p>

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
<p>writing-mode</p>

**Kind**: static property of [<code>Contents</code>](#Contents)  
**Read only**: true  
