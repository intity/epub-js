<a name="Metadata"></a>

# Metadata ⇐ <code>Map</code>
<p>Metadata class</p>

**Kind**: global class  
**Extends**: <code>Map</code>  

* [Metadata](#Metadata) ⇐ <code>Map</code>
    * _instance_
        * [.parse(node)](#Metadata+parse) ⇒ [<code>Promise.&lt;Metadata&gt;</code>](#Metadata)
        * [.load(metadata)](#Metadata+load) ⇒ [<code>Promise.&lt;Metadata&gt;</code>](#Metadata)
        * [.destroy()](#Metadata+destroy)
    * _static_
        * [.cover](#Metadata.cover) : <code>Node</code>

<a name="Metadata+parse"></a>

## metadata.parse(node) ⇒ [<code>Promise.&lt;Metadata&gt;</code>](#Metadata)
<p>Parse the metadata node</p>

**Kind**: instance method of [<code>Metadata</code>](#Metadata)  

| Param | Type | Description |
| --- | --- | --- |
| node | <code>Node</code> | <p>metadata</p> |

<a name="Metadata+load"></a>

## metadata.load(metadata) ⇒ [<code>Promise.&lt;Metadata&gt;</code>](#Metadata)
<p>Load metadata from JSON</p>

**Kind**: instance method of [<code>Metadata</code>](#Metadata)  

| Param | Type |
| --- | --- |
| metadata | <code>object</code> | 

<a name="Metadata+destroy"></a>

## metadata.destroy()
<p>destroy</p>

**Kind**: instance method of [<code>Metadata</code>](#Metadata)  
<a name="Metadata.cover"></a>

## Metadata.cover : <code>Node</code>
<p>Legacy spec (2.x) support</p>

**Kind**: static property of [<code>Metadata</code>](#Metadata)  
**Read only**: true  
