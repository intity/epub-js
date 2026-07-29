<a name="Rendition"></a>

# Rendition
<p>Rendition class</p>

**Kind**: global class  

* [Rendition](#Rendition)
    * [new Rendition(book, [options])](#new_Rendition_new)
    * _instance_
        * [.attachTo(element)](#Rendition+attachTo) ⇒ <code>Promise.&lt;any&gt;</code>
        * [.display([target])](#Rendition+display) ⇒ <code>Promise.&lt;Section&gt;</code>
        * [.moveTo(offset)](#Rendition+moveTo)
        * [.resize([width], [height])](#Rendition+resize) ⇒ <code>Object</code>
        * [.clear()](#Rendition+clear)
        * [.next()](#Rendition+next) ⇒ <code>Promise.&lt;any&gt;</code>
        * [.prev()](#Rendition+prev) ⇒ <code>Promise.&lt;any&gt;</code>
        * [.updateLayout(options)](#Rendition+updateLayout)
        * [.currentLocation()](#Rendition+currentLocation) ⇒ <code>object</code> \| <code>Promise.&lt;object&gt;</code>
        * [.getRange(epubcfi, ignoreClass)](#Rendition+getRange) ⇒ <code>Range</code>
        * [.getContents()](#Rendition+getContents) ⇒ <code>Array.&lt;Contents&gt;</code>
        * [.views()](#Rendition+views) ⇒ <code>Views</code>
        * [.destroy()](#Rendition+destroy)
    * _static_
        * [.settings](#Rendition.settings) : <code>object</code>
        * [.hooks](#Rendition.hooks) : <code>object</code>
        * [.annotations](#Rendition.annotations) : <code>Annotations</code>
        * [.themes](#Rendition.themes) : <code>Themes</code>
        * [.epubcfi](#Rendition.epubcfi) : <code>EpubCFI</code>
        * [.this.location](#Rendition.this.location) : <code>object</code>
        * [.started](#Rendition.started) : <code>Promise.&lt;any&gt;</code>
        * [.layout](#Rendition.layout) : <code>Layout</code>
        * [.viewport](#Rendition.viewport) : <code>Viewport</code>
        * ["layout" (props, changed)](#Rendition.event_layout)
        * ["resized" (rect)](#Rendition.event_resized)
        * ["orientationchange" (target)](#Rendition.event_orientationchange)
        * ["started"](#Rendition.event_started)
        * ["attached"](#Rendition.event_attached)
        * ["displayed" (section)](#Rendition.event_displayed)
        * ["displayError" (err)](#Rendition.event_displayError)
        * ["rendered" (view)](#Rendition.event_rendered)
        * ["removed" (view)](#Rendition.event_removed)
        * ["relocated" (location)](#Rendition.event_relocated)
        * ["selected" (cfirange, contents)](#Rendition.event_selected)
        * ["markClicked" (cfiRange, data, contents)](#Rendition.event_markClicked)

<a name="new_Rendition_new"></a>

## new Rendition(book, [options])
<p>Displays an Epub as a series of Views for each Section.
Requires Manager and View class to handle specifics of rendering
the section content.</p>


| Param | Type | Default | Description |
| --- | --- | --- | --- |
| book | <code>Book</code> |  |  |
| [options] | <code>object</code> |  |  |
| [options.width] | <code>string</code> \| <code>number</code> |  | <p>viewport width</p> |
| [options.height] | <code>string</code> \| <code>number</code> |  | <p>viewport height</p> |
| [options.ignoreClass] | <code>string</code> |  | <p>class for the cfi parser to ignore</p> |
| [options.manager] | <code>string</code> \| <code>function</code> | <code>&quot;&#x27;default&#x27;&quot;</code> | <p>string values: default / continuous</p> |
| [options.view] | <code>string</code> \| <code>function</code> | <code>&quot;&#x27;iframe&#x27;&quot;</code> |  |
| [options.method] | <code>string</code> | <code>&quot;&#x27;write&#x27;&quot;</code> | <p>values: <code>&quot;write&quot;</code> OR <code>&quot;srcdoc&quot;</code></p> |
| [options.layout] | <code>string</code> |  | <p>layout to force</p> |
| [options.spread] | <code>string</code> |  | <p>force spread value</p> |
| [options.direction] | <code>string</code> |  | <p>direction <code>&quot;ltr&quot;</code> OR <code>&quot;rtl&quot;</code></p> |
| [options.pageWidth] | <code>number</code> |  | <p>page width</p> |
| [options.pageHeight] | <code>number</code> |  | <p>page height</p> |
| [options.minSpreadWidth] | <code>number</code> |  | <p>overridden by spread: none (never) / both (always)</p> |
| [options.stylesheet] | <code>string</code> |  | <p>url of stylesheet to be injected</p> |
| [options.script] | <code>string</code> |  | <p>url of script to be injected</p> |
| [options.snap] | <code>object</code> |  | <p>use snap scrolling</p> |
| [options.writingMode] | <code>string</code> | <code>&quot;&#x27;horizontal-tb&#x27;&quot;</code> |  |
| [options.sandbox] | <code>Array.&lt;string&gt;</code> | <code>[]</code> | <p>iframe sandbox policy list</p> |

<a name="Rendition+attachTo"></a>

## rendition.attachTo(element) ⇒ <code>Promise.&lt;any&gt;</code>
<p>Call to attach the container to an element in the dom.
Container must be attached before rendering can begin.</p>

**Kind**: instance method of [<code>Rendition</code>](#Rendition)  

| Param | Type | Description |
| --- | --- | --- |
| element | <code>Element</code> \| <code>string</code> | <p>viewport element</p> |

<a name="Rendition+display"></a>

## rendition.display([target]) ⇒ <code>Promise.&lt;Section&gt;</code>
<p>The request will be added to the rendering Queue, so it will wait until
book is opened, rendering started and all other rendering tasks have
finished to be called.</p>

**Kind**: instance method of [<code>Rendition</code>](#Rendition)  

| Param | Type | Description |
| --- | --- | --- |
| [target] | <code>string</code> \| <code>number</code> | <p><code>Section.index</code> OR <code>Section.idref</code> OR <code>Section.href</code> OR EpubCFI</p> |

**Example**  
```js
rendition.display()
```
**Example**  
```js
rendition.display(3)
```
**Example**  
```js
rendition.display("#chapter_001")
```
**Example**  
```js
rendition.display("chapter_001.xhtml")
```
**Example**  
```js
rendition.display("epubcfi(/6/8!/4/2/16/1:0)")
```
<a name="Rendition+moveTo"></a>

## rendition.moveTo(offset)
<p>Move the Rendition to a specific offset
Usually you would be better off calling display()</p>

**Kind**: instance method of [<code>Rendition</code>](#Rendition)  

| Param | Type |
| --- | --- |
| offset | <code>object</code> | 

<a name="Rendition+resize"></a>

## rendition.resize([width], [height]) ⇒ <code>Object</code>
<p>Resize viewport container</p>

**Kind**: instance method of [<code>Rendition</code>](#Rendition)  

| Param | Type |
| --- | --- |
| [width] | <code>number</code> \| <code>string</code> | 
| [height] | <code>number</code> \| <code>string</code> | 

**Example**  
```js
rendition.resize(800, 600)
```
**Example**  
```js
rendition.resize("90%", 600)
```
<a name="Rendition+clear"></a>

## rendition.clear()
<p>Clear all rendered views</p>

**Kind**: instance method of [<code>Rendition</code>](#Rendition)  
<a name="Rendition+next"></a>

## rendition.next() ⇒ <code>Promise.&lt;any&gt;</code>
<p>Go to the next &quot;page&quot; in the rendition</p>

**Kind**: instance method of [<code>Rendition</code>](#Rendition)  
<a name="Rendition+prev"></a>

## rendition.prev() ⇒ <code>Promise.&lt;any&gt;</code>
<p>Go to the previous &quot;page&quot; in the rendition</p>

**Kind**: instance method of [<code>Rendition</code>](#Rendition)  
<a name="Rendition+updateLayout"></a>

## rendition.updateLayout(options)
<p>Layout configuration</p>

**Kind**: instance method of [<code>Rendition</code>](#Rendition)  

| Param | Type |
| --- | --- |
| options | <code>object</code> | 

<a name="Rendition+currentLocation"></a>

## rendition.currentLocation() ⇒ <code>object</code> \| <code>Promise.&lt;object&gt;</code>
<p>Get the Current Location object</p>

**Kind**: instance method of [<code>Rendition</code>](#Rendition)  
**Returns**: <code>object</code> \| <code>Promise.&lt;object&gt;</code> - <p>location (may be a promise)</p>  
<a name="Rendition+getRange"></a>

## rendition.getRange(epubcfi, ignoreClass) ⇒ <code>Range</code>
<p>Get a Range from a Visible CFI</p>

**Kind**: instance method of [<code>Rendition</code>](#Rendition)  

| Param | Type | Description |
| --- | --- | --- |
| epubcfi | <code>string</code> | <p>EpubCfi string</p> |
| ignoreClass | <code>string</code> |  |

<a name="Rendition+getContents"></a>

## rendition.getContents() ⇒ <code>Array.&lt;Contents&gt;</code>
<p>Get the Contents object of each rendered view</p>

**Kind**: instance method of [<code>Rendition</code>](#Rendition)  
<a name="Rendition+views"></a>

## rendition.views() ⇒ <code>Views</code>
<p>Get the views member from the manager</p>

**Kind**: instance method of [<code>Rendition</code>](#Rendition)  
<a name="Rendition+destroy"></a>

## rendition.destroy()
<p>Remove and Clean Up the Rendition</p>

**Kind**: instance method of [<code>Rendition</code>](#Rendition)  
<a name="Rendition.settings"></a>

## Rendition.settings : <code>object</code>
**Kind**: static property of [<code>Rendition</code>](#Rendition)  
**Read only**: true  
<a name="Rendition.hooks"></a>

## Rendition.hooks : <code>object</code>
<p>Adds Hook methods to the Rendition prototype</p>

**Kind**: static property of [<code>Rendition</code>](#Rendition)  
**Properties**

| Name | Type |
| --- | --- |
| hooks.content | <code>Hook</code> | 
| hooks.display | <code>Hook</code> | 
| hooks.layout | <code>Hook</code> | 
| hooks.render | <code>Hook</code> | 
| hooks.show | <code>Hook</code> | 
| hooks.unloaded | <code>Hook</code> | 

<a name="Rendition.annotations"></a>

## Rendition.annotations : <code>Annotations</code>
**Kind**: static property of [<code>Rendition</code>](#Rendition)  
**Read only**: true  
<a name="Rendition.themes"></a>

## Rendition.themes : <code>Themes</code>
**Kind**: static property of [<code>Rendition</code>](#Rendition)  
**Read only**: true  
<a name="Rendition.epubcfi"></a>

## Rendition.epubcfi : <code>EpubCFI</code>
**Kind**: static property of [<code>Rendition</code>](#Rendition)  
**Read only**: true  
<a name="Rendition.this.location"></a>

## Rendition.this.location : <code>object</code>
<p>A Rendered Location Range</p>

**Kind**: static property of [<code>Rendition</code>](#Rendition)  
**Properties**

| Name | Type | Description |
| --- | --- | --- |
| start | <code>object</code> |  |
| start.bin | <code>number</code> |  |
| start.cfi | <code>string</code> | <p>EpubCFI string format</p> |
| start.index | <code>string</code> |  |
| start.href | <code>string</code> |  |
| start.displayed | <code>object</code> |  |
| start.displayed.page | <code>number</code> |  |
| start.displayed.total | <code>number</code> |  |
| start.percentage | <code>number</code> |  |
| end | <code>object</code> |  |
| end.bin | <code>number</code> |  |
| end.cfi | <code>string</code> | <p>EpubCFI string format</p> |
| end.index | <code>string</code> |  |
| end.href | <code>string</code> |  |
| end.displayed | <code>object</code> |  |
| end.displayed.page | <code>number</code> |  |
| end.displayed.total | <code>number</code> |  |
| end.percentage | <code>number</code> |  |

<a name="Rendition.started"></a>

## Rendition.started : <code>Promise.&lt;any&gt;</code>
<p>returns after the rendition has started</p>

**Kind**: static property of [<code>Rendition</code>](#Rendition)  
<a name="Rendition.layout"></a>

## Rendition.layout : <code>Layout</code>
**Kind**: static property of [<code>Rendition</code>](#Rendition)  
**Read only**: true  
<a name="Rendition.viewport"></a>

## Rendition.viewport : <code>Viewport</code>
**Kind**: static property of [<code>Rendition</code>](#Rendition)  
**Read only**: true  
<a name="Rendition.event_layout"></a>

## "layout" (props, changed)
<p>Emit of updated the Layout state</p>

**Kind**: event emitted by [<code>Rendition</code>](#Rendition)  

| Param | Type |
| --- | --- |
| props | <code>Layout</code> | 
| changed | <code>object</code> | 

<a name="Rendition.event_resized"></a>

## "resized" (rect)
<p>Emit that the rendition has been resized</p>

**Kind**: event emitted by [<code>Rendition</code>](#Rendition)  

| Param | Type |
| --- | --- |
| rect | <code>object</code> | 

<a name="Rendition.event_orientationchange"></a>

## "orientationchange" (target)
**Kind**: event emitted by [<code>Rendition</code>](#Rendition)  

| Param | Type |
| --- | --- |
| target | <code>object</code> | 

<a name="Rendition.event_started"></a>

## "started"
<p>Emit that rendering has started</p>

**Kind**: event emitted by [<code>Rendition</code>](#Rendition)  
<a name="Rendition.event_attached"></a>

## "attached"
<p>Emit that rendering has attached to an element</p>

**Kind**: event emitted by [<code>Rendition</code>](#Rendition)  
<a name="Rendition.event_displayed"></a>

## "displayed" (section)
<p>Emit that a section has been displayed</p>

**Kind**: event emitted by [<code>Rendition</code>](#Rendition)  

| Param | Type |
| --- | --- |
| section | <code>Section</code> | 

<a name="Rendition.event_displayError"></a>

## "displayError" (err)
<p>Emit that has been an error displaying</p>

**Kind**: event emitted by [<code>Rendition</code>](#Rendition)  

| Param | Type |
| --- | --- |
| err | <code>Error</code> | 

<a name="Rendition.event_rendered"></a>

## "rendered" (view)
<p>Emit that a section has been rendered</p>

**Kind**: event emitted by [<code>Rendition</code>](#Rendition)  

| Param | Type |
| --- | --- |
| view | <code>View</code> | 

<a name="Rendition.event_removed"></a>

## "removed" (view)
<p>Emit that a section has been removed</p>

**Kind**: event emitted by [<code>Rendition</code>](#Rendition)  

| Param | Type |
| --- | --- |
| view | <code>View</code> | 

<a name="Rendition.event_relocated"></a>

## "relocated" (location)
**Kind**: event emitted by [<code>Rendition</code>](#Rendition)  

| Param | Type |
| --- | --- |
| location | <code>object</code> | 

<a name="Rendition.event_selected"></a>

## "selected" (cfirange, contents)
<p>Emit that a text selection has occurred</p>

**Kind**: event emitted by [<code>Rendition</code>](#Rendition)  

| Param | Type |
| --- | --- |
| cfirange | <code>string</code> | 
| contents | <code>Contents</code> | 

<a name="Rendition.event_markClicked"></a>

## "markClicked" (cfiRange, data, contents)
<p>Emit that a mark was clicked</p>

**Kind**: event emitted by [<code>Rendition</code>](#Rendition)  

| Param | Type |
| --- | --- |
| cfiRange | <code>EpubCFI</code> | 
| data | <code>object</code> | 
| contents | <code>Contents</code> | 

