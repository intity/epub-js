<a name="Metadata"></a>

# Metadata ⇐ <code>Map</code>
Metadata class

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
Parse the metadata node

**Kind**: instance method of [<code>Metadata</code>](#Metadata)  

| Param | Type | Description |
| --- | --- | --- |
| node | <code>Node</code> | metadata |

<a name="Metadata+load"></a>

## metadata.load(metadata) ⇒ [<code>Promise.&lt;Metadata&gt;</code>](#Metadata)
Load metadata from JSON

**Kind**: instance method of [<code>Metadata</code>](#Metadata)  

| Param | Type |
| --- | --- |
| metadata | <code>object</code> | 

<a name="Metadata+destroy"></a>

## metadata.destroy()
destroy

**Kind**: instance method of [<code>Metadata</code>](#Metadata)  
<a name="Metadata.cover"></a>

## Metadata.cover : <code>Node</code>
Legacy spec (2.x) support

**Kind**: static property of [<code>Metadata</code>](#Metadata)  
**Read only**: true  
