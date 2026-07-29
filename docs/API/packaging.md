<a name="Packaging"></a>

# Packaging
<p>Open Packaging Format Parser</p>

**Kind**: global class  

* [Packaging](#Packaging)
    * [new Packaging()](#new_Packaging_new)
    * _instance_
        * [.clear()](#Packaging+clear)
        * [.parse(packageXml)](#Packaging+parse) ⇒ [<code>Promise.&lt;Packaging&gt;</code>](#Packaging)
        * [.load(data)](#Packaging+load) ⇒ [<code>Promise.&lt;Packaging&gt;</code>](#Packaging)
        * [.destroy()](#Packaging+destroy)
    * _static_
        * [.metadata](#Packaging.metadata) : <code>Metadata</code>
        * [.manifest](#Packaging.manifest) : <code>Manifest</code>
        * [.spine](#Packaging.spine) : <code>Spine</code>
        * [.direction](#Packaging.direction) : <code>string</code>
        * [.version](#Packaging.version) : <code>string</code>
        * [.uniqueIdentifier](#Packaging.uniqueIdentifier) : <code>string</code>

<a name="new_Packaging_new"></a>

## new Packaging()
<p>Constructor</p>

<a name="Packaging+clear"></a>

## packaging.clear()
<p>Clear packaging parts</p>

**Kind**: instance method of [<code>Packaging</code>](#Packaging)  
<a name="Packaging+parse"></a>

## packaging.parse(packageXml) ⇒ [<code>Promise.&lt;Packaging&gt;</code>](#Packaging)
<p>Parse OPF XML</p>

**Kind**: instance method of [<code>Packaging</code>](#Packaging)  

| Param | Type | Description |
| --- | --- | --- |
| packageXml | <code>Document</code> | <p>OPF XML</p> |

<a name="Packaging+load"></a>

## packaging.load(data) ⇒ [<code>Promise.&lt;Packaging&gt;</code>](#Packaging)
<p>Load package from JSON</p>

**Kind**: instance method of [<code>Packaging</code>](#Packaging)  

| Param | Type | Description |
| --- | --- | --- |
| data | <code>object</code> | <p>Serialized JSON object data</p> |

<a name="Packaging+destroy"></a>

## packaging.destroy()
<p>destroy</p>

**Kind**: instance method of [<code>Packaging</code>](#Packaging)  
<a name="Packaging.metadata"></a>

## Packaging.metadata : <code>Metadata</code>
**Kind**: static property of [<code>Packaging</code>](#Packaging)  
**Read only**: true  
<a name="Packaging.manifest"></a>

## Packaging.manifest : <code>Manifest</code>
**Kind**: static property of [<code>Packaging</code>](#Packaging)  
**Read only**: true  
<a name="Packaging.spine"></a>

## Packaging.spine : <code>Spine</code>
**Kind**: static property of [<code>Packaging</code>](#Packaging)  
**Read only**: true  
<a name="Packaging.direction"></a>

## Packaging.direction : <code>string</code>
**Kind**: static property of [<code>Packaging</code>](#Packaging)  
**Read only**: true  
<a name="Packaging.version"></a>

## Packaging.version : <code>string</code>
<p>Package version</p>

**Kind**: static property of [<code>Packaging</code>](#Packaging)  
**Read only**: true  
<a name="Packaging.uniqueIdentifier"></a>

## Packaging.uniqueIdentifier : <code>string</code>
**Kind**: static property of [<code>Packaging</code>](#Packaging)  
**Read only**: true  
