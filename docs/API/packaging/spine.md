<a name="Spine"></a>

# Spine ⇐ <code>Map</code>
<p>A collection of Spine Items</p>

**Kind**: global class  
**Extends**: <code>Map</code>  

* [Spine](#Spine) ⇐ <code>Map</code>
    * _instance_
        * [.clear()](#Spine+clear)
        * [.parse(node)](#Spine+parse) ⇒ [<code>Promise.&lt;Spine&gt;</code>](#Spine)
        * [.load(spine)](#Spine+load) ⇒ [<code>Promise.&lt;Spine&gt;</code>](#Spine)
        * [.destroy()](#Spine+destroy)
    * _static_
        * [.nodeIndex](#Spine.nodeIndex) : <code>number</code>

<a name="Spine+clear"></a>

## spine.clear()
<p>Clear spine items</p>

**Kind**: instance method of [<code>Spine</code>](#Spine)  
<a name="Spine+parse"></a>

## spine.parse(node) ⇒ [<code>Promise.&lt;Spine&gt;</code>](#Spine)
<p>Parse element spine</p>

**Kind**: instance method of [<code>Spine</code>](#Spine)  

| Param | Type | Description |
| --- | --- | --- |
| node | <code>Node</code> | <p>spine</p> |

<a name="Spine+load"></a>

## spine.load(spine) ⇒ [<code>Promise.&lt;Spine&gt;</code>](#Spine)
<p>Load spine from JSON</p>

**Kind**: instance method of [<code>Spine</code>](#Spine)  

| Param | Type |
| --- | --- |
| spine | <code>Array.&lt;object&gt;</code> | 

<a name="Spine+destroy"></a>

## spine.destroy()
<p>destroy</p>

**Kind**: instance method of [<code>Spine</code>](#Spine)  
<a name="Spine.nodeIndex"></a>

## Spine.nodeIndex : <code>number</code>
<p>Node index from the package.opf</p>

**Kind**: static property of [<code>Spine</code>](#Spine)  
**Read only**: true  
