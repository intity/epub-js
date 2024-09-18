<a name="Viewport"></a>

# Viewport
viewport configuration class

**Kind**: global class  

* [Viewport](#Viewport)
    * [new Viewport(layout, options)](#new_Viewport_new)
    * _instance_
        * [.attachTo(input, options)](#Viewport+attachTo) ⇒ <code>Element</code>
        * [.wrap(container)](#Viewport+wrap) ⇒ <code>Element</code>
        * [.size([width], [height])](#Viewport+size) ⇒ <code>object</code>
        * [.getSheet()](#Viewport+getSheet) ⇒ <code>CSSStyleSheet</code>
        * [.addStyleRules(selector, rulesArray)](#Viewport+addStyleRules)
        * [.update()](#Viewport+update)
        * [.destroy()](#Viewport+destroy)
    * _static_
        * [.id](#Viewport.id) : <code>string</code>
        * [.container](#Viewport.container) : <code>Element</code>
        * [.target](#Viewport.target) : <code>Element</code>
        * [.rect](#Viewport.rect) : <code>object</code>

<a name="new_Viewport_new"></a>

## new Viewport(layout, options)
Constructor


| Param | Type | Description |
| --- | --- | --- |
| layout | <code>Layout</code> |  |
| options | <code>object</code> |  |
| [options.hidden] | <code>boolean</code> | viewport hidden |

<a name="Viewport+attachTo"></a>

## viewport.attachTo(input, options) ⇒ <code>Element</code>
Attach to viewport element

**Kind**: instance method of [<code>Viewport</code>](#Viewport)  

| Param | Type | Description |
| --- | --- | --- |
| input | <code>Element</code> \| <code>string</code> | viewport element |
| options | <code>object</code> |  |
| options.width | <code>string</code> \| <code>number</code> | viewport width |
| options.height | <code>string</code> \| <code>number</code> | viewport height |

<a name="Viewport+wrap"></a>

## viewport.wrap(container) ⇒ <code>Element</code>
wrap

**Kind**: instance method of [<code>Viewport</code>](#Viewport)  
**Returns**: <code>Element</code> - wrapper  

| Param | Type |
| --- | --- |
| container | <code>Element</code> | 

<a name="Viewport+size"></a>

## viewport.size([width], [height]) ⇒ <code>object</code>
size

**Kind**: instance method of [<code>Viewport</code>](#Viewport)  

| Param | Type |
| --- | --- |
| [width] | <code>string</code> \| <code>number</code> | 
| [height] | <code>string</code> \| <code>number</code> | 

<a name="Viewport+getSheet"></a>

## viewport.getSheet() ⇒ <code>CSSStyleSheet</code>
getSheet

**Kind**: instance method of [<code>Viewport</code>](#Viewport)  
<a name="Viewport+addStyleRules"></a>

## viewport.addStyleRules(selector, rulesArray)
addStyleRules

**Kind**: instance method of [<code>Viewport</code>](#Viewport)  

| Param | Type |
| --- | --- |
| selector | <code>string</code> | 
| rulesArray | <code>Array.&lt;object&gt;</code> | 

<a name="Viewport+update"></a>

## viewport.update()
Update viewport container

**Kind**: instance method of [<code>Viewport</code>](#Viewport)  
<a name="Viewport+destroy"></a>

## viewport.destroy()
destroy

**Kind**: instance method of [<code>Viewport</code>](#Viewport)  
<a name="Viewport.id"></a>

## Viewport.id : <code>string</code>
viewport id

**Kind**: static property of [<code>Viewport</code>](#Viewport)  
**Read only**: true  
<a name="Viewport.container"></a>

## Viewport.container : <code>Element</code>
viewport container

**Kind**: static property of [<code>Viewport</code>](#Viewport)  
**Read only**: true  
<a name="Viewport.target"></a>

## Viewport.target : <code>Element</code>
viewport element

**Kind**: static property of [<code>Viewport</code>](#Viewport)  
**Read only**: true  
<a name="Viewport.rect"></a>

## Viewport.rect : <code>object</code>
viewport rect

**Kind**: static property of [<code>Viewport</code>](#Viewport)  
**Read only**: true  
