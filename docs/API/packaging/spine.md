<a name="Spine"></a>

# Spine ⇐ <code>Map</code>
A collection of Spine Items

**Kind**: global class  
**Extends**: <code>Map</code>  

* [Spine](#Spine) ⇐ <code>Map</code>
    * _instance_
        * [.parse(node)](#Spine+parse) ⇒ [<code>Promise.&lt;Spine&gt;</code>](#Spine)
        * [.load(spine)](#Spine+load) ⇒ [<code>Promise.&lt;Spine&gt;</code>](#Spine)
        * [.destroy()](#Spine+destroy)
    * _static_
        * [.nodeIndex](#Spine.nodeIndex) : <code>number</code>

<a name="Spine+parse"></a>

## spine.parse(node) ⇒ [<code>Promise.&lt;Spine&gt;</code>](#Spine)
Parse element spine

**Kind**: instance method of [<code>Spine</code>](#Spine)  

| Param | Type | Description |
| --- | --- | --- |
| node | <code>Node</code> | spine |

<a name="Spine+load"></a>

## spine.load(spine) ⇒ [<code>Promise.&lt;Spine&gt;</code>](#Spine)
Load spine from JSON

**Kind**: instance method of [<code>Spine</code>](#Spine)  

| Param | Type |
| --- | --- |
| spine | <code>Array.&lt;object&gt;</code> | 

<a name="Spine+destroy"></a>

## spine.destroy()
destroy

**Kind**: instance method of [<code>Spine</code>](#Spine)  
<a name="Spine.nodeIndex"></a>

## Spine.nodeIndex : <code>number</code>
Node index from the package.opf

**Kind**: static property of [<code>Spine</code>](#Spine)  
**Read only**: true  
