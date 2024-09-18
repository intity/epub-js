<a name="ContinuousViewManager"></a>

# ContinuousViewManager ⇐ <code>DefaultViewManager</code>
Continuous view manager

**Kind**: global class  
**Extends**: <code>DefaultViewManager</code>  

* [ContinuousViewManager](#ContinuousViewManager) ⇐ <code>DefaultViewManager</code>
    * [new ContinuousViewManager(book, [options])](#new_ContinuousViewManager_new)
    * _instance_
        * [.render(element, size)](#ContinuousViewManager+render)
        * [.display(section, [target])](#ContinuousViewManager+display) ⇒ <code>Promise.&lt;(view\|null)&gt;</code>
        * [.fill(value)](#ContinuousViewManager+fill) ⇒ <code>Promise.&lt;any&gt;</code>
        * [.moveTo(offset)](#ContinuousViewManager+moveTo)
        * [.removeShownListeners(view)](#ContinuousViewManager+removeShownListeners)
        * [.update([offset])](#ContinuousViewManager+update) ⇒ <code>Promise.&lt;any&gt;</code>
        * [.appendEventListeners()](#ContinuousViewManager+appendEventListeners)
        * [.onscroll(e)](#ContinuousViewManager+onscroll)
        * [.onscrollend(e)](#ContinuousViewManager+onscrollend)
        * [.scrolled(e)](#ContinuousViewManager+scrolled)
        * [.next()](#ContinuousViewManager+next)
        * [.prev()](#ContinuousViewManager+prev)
        * [.destroy()](#ContinuousViewManager+destroy)
    * _static_
        * [.name](#ContinuousViewManager.name) : <code>string</code>

<a name="new_ContinuousViewManager_new"></a>

## new ContinuousViewManager(book, [options])
Constructor


| Param | Type | Default | Description |
| --- | --- | --- | --- |
| book | <code>Book</code> |  |  |
| [options] | <code>object</code> |  |  |
| [options.axis] | <code>string</code> |  |  |
| [options.snap] | <code>object</code> |  |  |
| [options.method] | <code>string</code> |  | values: `"blobUrl"` OR `"srcdoc"` OR `"write"` |
| [options.ignoreClass] | <code>string</code> | <code>&quot;&#x27;&#x27;&quot;</code> |  |
| [options.view] | <code>string</code> \| <code>object</code> | <code>&quot;&#x27;iframe&#x27;&quot;</code> |  |

<a name="ContinuousViewManager+render"></a>

## continuousViewManager.render(element, size)
render

**Kind**: instance method of [<code>ContinuousViewManager</code>](#ContinuousViewManager)  

| Param | Type | Description |
| --- | --- | --- |
| element | <code>Element</code> \| <code>string</code> | viewport element |
| size | <code>object</code> |  |

<a name="ContinuousViewManager+display"></a>

## continuousViewManager.display(section, [target]) ⇒ <code>Promise.&lt;(view\|null)&gt;</code>
display

**Kind**: instance method of [<code>ContinuousViewManager</code>](#ContinuousViewManager)  
**Returns**: <code>Promise.&lt;(view\|null)&gt;</code> - displaying promise  

| Param | Type |
| --- | --- |
| section | <code>Section</code> | 
| [target] | <code>string</code> \| <code>number</code> | 

<a name="ContinuousViewManager+fill"></a>

## continuousViewManager.fill(value) ⇒ <code>Promise.&lt;any&gt;</code>
fill

**Kind**: instance method of [<code>ContinuousViewManager</code>](#ContinuousViewManager)  

| Param | Type |
| --- | --- |
| value | <code>Defer</code> | 

<a name="ContinuousViewManager+moveTo"></a>

## continuousViewManager.moveTo(offset)
moveTo

**Kind**: instance method of [<code>ContinuousViewManager</code>](#ContinuousViewManager)  

| Param | Type |
| --- | --- |
| offset | <code>object</code> | 

<a name="ContinuousViewManager+removeShownListeners"></a>

## continuousViewManager.removeShownListeners(view)
Remove Previous Listeners if present

**Kind**: instance method of [<code>ContinuousViewManager</code>](#ContinuousViewManager)  

| Param | Type |
| --- | --- |
| view | <code>\*</code> | 

<a name="ContinuousViewManager+update"></a>

## continuousViewManager.update([offset]) ⇒ <code>Promise.&lt;any&gt;</code>
update

**Kind**: instance method of [<code>ContinuousViewManager</code>](#ContinuousViewManager)  

| Param | Type |
| --- | --- |
| [offset] | <code>number</code> | 

<a name="ContinuousViewManager+appendEventListeners"></a>

## continuousViewManager.appendEventListeners()
appendEventListeners

**Kind**: instance method of [<code>ContinuousViewManager</code>](#ContinuousViewManager)  
<a name="ContinuousViewManager+onscroll"></a>

## continuousViewManager.onscroll(e)
onscroll

**Kind**: instance method of [<code>ContinuousViewManager</code>](#ContinuousViewManager)  

| Param | Type |
| --- | --- |
| e | <code>Event</code> | 

<a name="ContinuousViewManager+onscrollend"></a>

## continuousViewManager.onscrollend(e)
onscrollend

**Kind**: instance method of [<code>ContinuousViewManager</code>](#ContinuousViewManager)  

| Param | Type |
| --- | --- |
| e | <code>Event</code> | 

<a name="ContinuousViewManager+scrolled"></a>

## continuousViewManager.scrolled(e)
scrolled

**Kind**: instance method of [<code>ContinuousViewManager</code>](#ContinuousViewManager)  

| Param | Type |
| --- | --- |
| e | <code>Event</code> | 

<a name="ContinuousViewManager+next"></a>

## continuousViewManager.next()
next

**Kind**: instance method of [<code>ContinuousViewManager</code>](#ContinuousViewManager)  
<a name="ContinuousViewManager+prev"></a>

## continuousViewManager.prev()
prev

**Kind**: instance method of [<code>ContinuousViewManager</code>](#ContinuousViewManager)  
<a name="ContinuousViewManager+destroy"></a>

## continuousViewManager.destroy()
destroy

**Kind**: instance method of [<code>ContinuousViewManager</code>](#ContinuousViewManager)  
<a name="ContinuousViewManager.name"></a>

## ContinuousViewManager.name : <code>string</code>
**Kind**: static property of [<code>ContinuousViewManager</code>](#ContinuousViewManager)  
**Read only**: true  
