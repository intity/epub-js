<a name="Viewport"></a>

# Viewport
<p>viewport configuration class</p>

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
<p>Constructor</p>


| Param | Type |
| --- | --- |
| layout | <code>Layout</code> | 

<a name="Viewport+attachTo"></a>

## viewport.attachTo(input, options) ⇒ <code>Element</code> \| <code>null</code>
<p>Attach to viewport element</p>

**Kind**: instance method of [<code>Viewport</code>](#Viewport)  
**Returns**: <code>Element</code> \| <code>null</code> - <p>attached element</p>  

| Param | Type | Description |
| --- | --- | --- |
| input | <code>Element</code> \| <code>string</code> | <p>viewport element</p> |
| options | <code>object</code> |  |
| options.width | <code>string</code> \| <code>number</code> | <p>viewport container width</p> |
| options.height | <code>string</code> \| <code>number</code> | <p>viewport container height</p> |
| options.views | <code>object</code> |  |

<a name="Viewport+size"></a>

## viewport.size([width], [height]) ⇒ <code>object</code>
<p>size</p>

**Kind**: instance method of [<code>Viewport</code>](#Viewport)  

| Param | Type |
| --- | --- |
| [width] | <code>string</code> \| <code>number</code> | 
| [height] | <code>string</code> \| <code>number</code> | 

<a name="Viewport+update"></a>

## viewport.update()
<p>Update viewport container</p>

**Kind**: instance method of [<code>Viewport</code>](#Viewport)  
<a name="Viewport+destroy"></a>

## viewport.destroy()
<p>destroy</p>

**Kind**: instance method of [<code>Viewport</code>](#Viewport)  
<a name="Viewport.container"></a>

## Viewport.container : <code>Element</code>
<p>viewport container</p>

**Kind**: static property of [<code>Viewport</code>](#Viewport)  
**Read only**: true  
<a name="Viewport.target"></a>

## Viewport.target : <code>Element</code>
<p>viewport element</p>

**Kind**: static property of [<code>Viewport</code>](#Viewport)  
**Read only**: true  
<a name="Viewport.rect"></a>

## Viewport.rect : <code>object</code>
<p>viewport rect</p>

**Kind**: static property of [<code>Viewport</code>](#Viewport)  
**Read only**: true  
