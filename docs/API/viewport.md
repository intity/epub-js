<a name="Viewport"></a>

# Viewport
viewport configuration class

**Kind**: global class  

* [Viewport](#Viewport)
    * [new Viewport(layout)](#new_Viewport_new)
    * _instance_
        * [.attachTo(input, options)](#Viewport+attachTo) ⇒ <code>Element</code> \| <code>null</code>
        * [.size([width], [height])](#Viewport+size) ⇒ <code>object</code>
        * [.update()](#Viewport+update)
        * [.destroy()](#Viewport+destroy)
    * _static_
        * [.container](#Viewport.container) : <code>Element</code>
        * [.target](#Viewport.target) : <code>Element</code>
        * [.rect](#Viewport.rect) : <code>object</code>

<a name="new_Viewport_new"></a>

## new Viewport(layout)
Constructor


| Param | Type |
| --- | --- |
| layout | <code>Layout</code> | 

<a name="Viewport+attachTo"></a>

## viewport.attachTo(input, options) ⇒ <code>Element</code> \| <code>null</code>
Attach to viewport element

**Kind**: instance method of [<code>Viewport</code>](#Viewport)  
**Returns**: <code>Element</code> \| <code>null</code> - attached element  

| Param | Type | Description |
| --- | --- | --- |
| input | <code>Element</code> \| <code>string</code> | viewport element |
| options | <code>object</code> |  |
| options.width | <code>string</code> \| <code>number</code> | viewport container width |
| options.height | <code>string</code> \| <code>number</code> | viewport container height |
| options.views | <code>object</code> |  |

<a name="Viewport+size"></a>

## viewport.size([width], [height]) ⇒ <code>object</code>
size

**Kind**: instance method of [<code>Viewport</code>](#Viewport)  

| Param | Type |
| --- | --- |
| [width] | <code>string</code> \| <code>number</code> | 
| [height] | <code>string</code> \| <code>number</code> | 

<a name="Viewport+update"></a>

## viewport.update()
Update viewport container

**Kind**: instance method of [<code>Viewport</code>](#Viewport)  
<a name="Viewport+destroy"></a>

## viewport.destroy()
destroy

**Kind**: instance method of [<code>Viewport</code>](#Viewport)  
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
