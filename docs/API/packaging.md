<a name="Packaging"></a>

# Packaging
Open Packaging Format Parser

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
Constructor

<a name="Packaging+clear"></a>

## packaging.clear()
Clear packaging parts

**Kind**: instance method of [<code>Packaging</code>](#Packaging)  
<a name="Packaging+parse"></a>

## packaging.parse(packageXml) ⇒ [<code>Promise.&lt;Packaging&gt;</code>](#Packaging)
Parse OPF XML

**Kind**: instance method of [<code>Packaging</code>](#Packaging)  

| Param | Type | Description |
| --- | --- | --- |
| packageXml | <code>Document</code> | OPF XML |

<a name="Packaging+load"></a>

## packaging.load(data) ⇒ [<code>Promise.&lt;Packaging&gt;</code>](#Packaging)
Load package from JSON

**Kind**: instance method of [<code>Packaging</code>](#Packaging)  

| Param | Type | Description |
| --- | --- | --- |
| data | <code>object</code> | Serialized JSON object data |

<a name="Packaging+destroy"></a>

## packaging.destroy()
destroy

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
Package version

**Kind**: static property of [<code>Packaging</code>](#Packaging)  
**Read only**: true  
<a name="Packaging.uniqueIdentifier"></a>

## Packaging.uniqueIdentifier : <code>string</code>
**Kind**: static property of [<code>Packaging</code>](#Packaging)  
**Read only**: true  
