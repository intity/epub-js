<a name="Url"></a>

# Url
<p>Creates a Url object for parsing and manipulation of a url string</p>

**Kind**: global class  

* [Url](#Url)
    * [new Url(url, [base])](#new_Url_new)
    * _instance_
        * [.resolve(path)](#Url+resolve) ⇒ <code>string</code>
        * [.relative(path)](#Url+relative) ⇒ <code>string</code>
        * [.toString()](#Url+toString) ⇒ <code>string</code>
    * _static_
        * [.path](#Url.path) : <code>Path</code>

<a name="new_Url_new"></a>

## new Url(url, [base])
<p>Constructor</p>


| Param | Type | Description |
| --- | --- | --- |
| url | <code>string</code> | <p>a url string (relative or absolute)</p> |
| [base] | <code>string</code> | <p>optional base for the url, default to window.location.href</p> |

<a name="Url+resolve"></a>

## url.resolve(path) ⇒ <code>string</code>
<p>Resolves a relative path to a absolute url</p>

**Kind**: instance method of [<code>Url</code>](#Url)  
**Returns**: <code>string</code> - <p>url</p>  

| Param | Type |
| --- | --- |
| path | <code>string</code> | 

<a name="Url+relative"></a>

## url.relative(path) ⇒ <code>string</code>
<p>Resolve a path relative to the url</p>

**Kind**: instance method of [<code>Url</code>](#Url)  
**Returns**: <code>string</code> - <p>path</p>  

| Param | Type |
| --- | --- |
| path | <code>string</code> | 

<a name="Url+toString"></a>

## url.toString() ⇒ <code>string</code>
<p>toString</p>

**Kind**: instance method of [<code>Url</code>](#Url)  
<a name="Url.path"></a>

## Url.path : <code>Path</code>
**Kind**: static property of [<code>Url</code>](#Url)  
**Read only**: true  
