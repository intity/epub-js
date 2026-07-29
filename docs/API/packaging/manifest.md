<a name="Manifest"></a>

# Manifest ⇐ <code>Map</code>
<p>Manifest class</p>

**Kind**: global class  
**Extends**: <code>Map</code>  

* [Manifest](#Manifest) ⇐ <code>Map</code>
    * _instance_
        * [.clear()](#Manifest+clear)
        * [.parse(node)](#Manifest+parse) ⇒ [<code>Promise.&lt;Manifest&gt;</code>](#Manifest)
        * [.load(manifest)](#Manifest+load) ⇒ [<code>Promise.&lt;Manifest&gt;</code>](#Manifest)
        * [.destroy()](#Manifest+destroy)
    * _static_
        * [.navPath](#Manifest.navPath) : <code>string</code>
        * [.coverPath](#Manifest.coverPath) : <code>string</code>

<a name="Manifest+clear"></a>

## manifest.clear()
<p>Clear manifest</p>

**Kind**: instance method of [<code>Manifest</code>](#Manifest)  
<a name="Manifest+parse"></a>

## manifest.parse(node) ⇒ [<code>Promise.&lt;Manifest&gt;</code>](#Manifest)
<p>Parse the manifest node</p>

**Kind**: instance method of [<code>Manifest</code>](#Manifest)  

| Param | Type | Description |
| --- | --- | --- |
| node | <code>Node</code> | <p>manifest</p> |

<a name="Manifest+load"></a>

## manifest.load(manifest) ⇒ [<code>Promise.&lt;Manifest&gt;</code>](#Manifest)
<p>Load manifest from JSON</p>

**Kind**: instance method of [<code>Manifest</code>](#Manifest)  

| Param | Type |
| --- | --- |
| manifest | <code>Array.&lt;object&gt;</code> | 

<a name="Manifest+destroy"></a>

## manifest.destroy()
<p>destroy</p>

**Kind**: instance method of [<code>Manifest</code>](#Manifest)  
<a name="Manifest.navPath"></a>

## Manifest.navPath : <code>string</code>
**Kind**: static property of [<code>Manifest</code>](#Manifest)  
**Read only**: true  
<a name="Manifest.coverPath"></a>

## Manifest.coverPath : <code>string</code>
**Kind**: static property of [<code>Manifest</code>](#Manifest)  
**Read only**: true  
