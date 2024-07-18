<a name="DefaultViewManager"></a>

# DefaultViewManager
Default View Manager

**Kind**: global class  

* [DefaultViewManager](#DefaultViewManager)
    * [new DefaultViewManager(book, layout, [options])](#new_DefaultViewManager_new)
    * _instance_
        * [.render(element, size)](#DefaultViewManager+render)
        * [.destroy()](#DefaultViewManager+destroy)
        * [.resize([width], [height], [epubcfi])](#DefaultViewManager+resize)
        * [.display(section, [target])](#DefaultViewManager+display) ⇒ <code>Promise.&lt;any&gt;</code>
        * [.add(section, [forceRight])](#DefaultViewManager+add) ⇒ <code>Promise.&lt;any&gt;</code>
        * [.next()](#DefaultViewManager+next) ⇒ <code>Promise.&lt;any&gt;</code>
        * [.prev()](#DefaultViewManager+prev) ⇒ <code>Promise.&lt;any&gt;</code>
        * [.current()](#DefaultViewManager+current) ⇒ <code>\*</code>
        * [.clear()](#DefaultViewManager+clear)
        * [.currentLocation()](#DefaultViewManager+currentLocation) ⇒ <code>Array.&lt;object&gt;</code>
        * [.visible()](#DefaultViewManager+visible) ⇒ <code>Array.&lt;object&gt;</code>
        * [.bounds()](#DefaultViewManager+bounds) ⇒ <code>DOMRect</code>
        * [.updateLayout()](#DefaultViewManager+updateLayout)
        * [.getContents()](#DefaultViewManager+getContents) ⇒ <code>Array.&lt;Contents&gt;</code>
        * [.isRendered()](#DefaultViewManager+isRendered) ⇒ <code>boolean</code>
    * _static_
        * [.name](#DefaultViewManager.name) : <code>string</code>
        * [.layout](#DefaultViewManager.layout) : <code>Layout</code>
        * [.paginated](#DefaultViewManager.paginated) : <code>boolean</code>
        * [.location](#DefaultViewManager.location) : <code>Array.&lt;object&gt;</code>
        * [.rendered](#DefaultViewManager.rendered) : <code>boolean</code>
        * [.stage](#DefaultViewManager.stage) : <code>Stage</code>
        * [.container](#DefaultViewManager.container) : <code>Element</code>
        * [.views](#DefaultViewManager.views) : <code>Views</code>
        * [.stageSize](#DefaultViewManager.stageSize) : <code>object</code>
        * [.mapping](#DefaultViewManager.mapping) : <code>Mapping</code>

<a name="new_DefaultViewManager_new"></a>

## new DefaultViewManager(book, layout, [options])
Constructor


| Param | Type | Default | Description |
| --- | --- | --- | --- |
| book | <code>Book</code> |  |  |
| layout | <code>Layout</code> |  |  |
| [options] | <code>object</code> |  |  |
| [options.axis] | <code>string</code> |  |  |
| [options.method] | <code>string</code> |  | values: `"blobUrl"` OR `"srcdoc"` OR `"write"` |
| [options.ignoreClass] | <code>string</code> | <code>&quot;&#x27;&#x27;&quot;</code> |  |
| [options.view] | <code>string</code> \| <code>object</code> | <code>&quot;&#x27;iframe&#x27;&quot;</code> |  |

<a name="DefaultViewManager+render"></a>

## defaultViewManager.render(element, size)
render

**Kind**: instance method of [<code>DefaultViewManager</code>](#DefaultViewManager)  

| Param | Type |
| --- | --- |
| element | <code>Element</code> | 
| size | <code>object</code> | 
| size.width | <code>number</code> | 
| size.height | <code>number</code> | 

<a name="DefaultViewManager+destroy"></a>

## defaultViewManager.destroy()
destroy

**Kind**: instance method of [<code>DefaultViewManager</code>](#DefaultViewManager)  
<a name="DefaultViewManager+resize"></a>

## defaultViewManager.resize([width], [height], [epubcfi])
resize

**Kind**: instance method of [<code>DefaultViewManager</code>](#DefaultViewManager)  

| Param | Type |
| --- | --- |
| [width] | <code>number</code> | 
| [height] | <code>number</code> | 
| [epubcfi] | <code>string</code> | 

<a name="DefaultViewManager+display"></a>

## defaultViewManager.display(section, [target]) ⇒ <code>Promise.&lt;any&gt;</code>
display

**Kind**: instance method of [<code>DefaultViewManager</code>](#DefaultViewManager)  
**Returns**: <code>Promise.&lt;any&gt;</code> - displaying promise  

| Param | Type |
| --- | --- |
| section | <code>Section</code> | 
| [target] | <code>string</code> \| <code>number</code> | 

<a name="DefaultViewManager+add"></a>

## defaultViewManager.add(section, [forceRight]) ⇒ <code>Promise.&lt;any&gt;</code>
append

**Kind**: instance method of [<code>DefaultViewManager</code>](#DefaultViewManager)  

| Param | Type | Description |
| --- | --- | --- |
| section | <code>Section</code> | Section object |
| [forceRight] | <code>boolean</code> |  |

<a name="DefaultViewManager+next"></a>

## defaultViewManager.next() ⇒ <code>Promise.&lt;any&gt;</code>
next

**Kind**: instance method of [<code>DefaultViewManager</code>](#DefaultViewManager)  
<a name="DefaultViewManager+prev"></a>

## defaultViewManager.prev() ⇒ <code>Promise.&lt;any&gt;</code>
prev

**Kind**: instance method of [<code>DefaultViewManager</code>](#DefaultViewManager)  
<a name="DefaultViewManager+current"></a>

## defaultViewManager.current() ⇒ <code>\*</code>
Get current visible view

**Kind**: instance method of [<code>DefaultViewManager</code>](#DefaultViewManager)  
**Returns**: <code>\*</code> - view  
<a name="DefaultViewManager+clear"></a>

## defaultViewManager.clear()
clear views

**Kind**: instance method of [<code>DefaultViewManager</code>](#DefaultViewManager)  
<a name="DefaultViewManager+currentLocation"></a>

## defaultViewManager.currentLocation() ⇒ <code>Array.&lt;object&gt;</code>
currentLocation

**Kind**: instance method of [<code>DefaultViewManager</code>](#DefaultViewManager)  
**Returns**: <code>Array.&lt;object&gt;</code> - Location sections  
<a name="DefaultViewManager+visible"></a>

## defaultViewManager.visible() ⇒ <code>Array.&lt;object&gt;</code>
Get array of visible views

**Kind**: instance method of [<code>DefaultViewManager</code>](#DefaultViewManager)  
**Returns**: <code>Array.&lt;object&gt;</code> - array of visible views  
<a name="DefaultViewManager+bounds"></a>

## defaultViewManager.bounds() ⇒ <code>DOMRect</code>
Get bounds

**Kind**: instance method of [<code>DefaultViewManager</code>](#DefaultViewManager)  
<a name="DefaultViewManager+updateLayout"></a>

## defaultViewManager.updateLayout()
Update Layout

**Kind**: instance method of [<code>DefaultViewManager</code>](#DefaultViewManager)  
<a name="DefaultViewManager+getContents"></a>

## defaultViewManager.getContents() ⇒ <code>Array.&lt;Contents&gt;</code>
Get contents array from views

**Kind**: instance method of [<code>DefaultViewManager</code>](#DefaultViewManager)  
**Returns**: <code>Array.&lt;Contents&gt;</code> - [view.contents]  
<a name="DefaultViewManager+isRendered"></a>

## defaultViewManager.isRendered() ⇒ <code>boolean</code>
isRendered

**Kind**: instance method of [<code>DefaultViewManager</code>](#DefaultViewManager)  
<a name="DefaultViewManager.name"></a>

## DefaultViewManager.name : <code>string</code>
Manager name

**Kind**: static property of [<code>DefaultViewManager</code>](#DefaultViewManager)  
**Read only**: true  
<a name="DefaultViewManager.layout"></a>

## DefaultViewManager.layout : <code>Layout</code>
**Kind**: static property of [<code>DefaultViewManager</code>](#DefaultViewManager)  
**Read only**: true  
<a name="DefaultViewManager.paginated"></a>

## DefaultViewManager.paginated : <code>boolean</code>
**Kind**: static property of [<code>DefaultViewManager</code>](#DefaultViewManager)  
**Read only**: true  
<a name="DefaultViewManager.location"></a>

## DefaultViewManager.location : <code>Array.&lt;object&gt;</code>
**Kind**: static property of [<code>DefaultViewManager</code>](#DefaultViewManager)  
**Read only**: true  
<a name="DefaultViewManager.rendered"></a>

## DefaultViewManager.rendered : <code>boolean</code>
**Kind**: static property of [<code>DefaultViewManager</code>](#DefaultViewManager)  
**Read only**: true  
<a name="DefaultViewManager.stage"></a>

## DefaultViewManager.stage : <code>Stage</code>
**Kind**: static property of [<code>DefaultViewManager</code>](#DefaultViewManager)  
**Read only**: true  
**Properties**

| Name | Type |
| --- | --- |
| axis | <code>string</code> | 
| width | <code>string</code> \| <code>number</code> | 
| height | <code>string</code> \| <code>number</code> | 
| hidden | <code>boolean</code> | 
| fullsize | <code>boolean</code> | 

<a name="DefaultViewManager.container"></a>

## DefaultViewManager.container : <code>Element</code>
Stage container

**Kind**: static property of [<code>DefaultViewManager</code>](#DefaultViewManager)  
**Read only**: true  
<a name="DefaultViewManager.views"></a>

## DefaultViewManager.views : <code>Views</code>
**Kind**: static property of [<code>DefaultViewManager</code>](#DefaultViewManager)  
**Read only**: true  
<a name="DefaultViewManager.stageSize"></a>

## DefaultViewManager.stageSize : <code>object</code>
**Kind**: static property of [<code>DefaultViewManager</code>](#DefaultViewManager)  
**Read only**: true  
<a name="DefaultViewManager.mapping"></a>

## DefaultViewManager.mapping : <code>Mapping</code>
**Kind**: static property of [<code>DefaultViewManager</code>](#DefaultViewManager)  
**Read only**: true  
