<a name="Toc"></a>

# Toc ⇐ <code>Array</code>
<p>Table Of Contents Parser</p>

**Kind**: global class  
**Extends**: <code>Array</code>  
**Link**: https://www.w3.org/TR/epub/#sec-nav-toc  

* [Toc](#Toc) ⇐ <code>Array</code>
    * [new Toc()](#new_Toc_new)
    * _instance_
        * [.get(target)](#Toc+get) ⇒ <code>object</code>
        * [.parse(target)](#Toc+parse) ⇒ [<code>Promise.&lt;Toc&gt;</code>](#Toc)
        * [.clear()](#Toc+clear)
        * [.destroy()](#Toc+destroy)
    * _static_
        * [.links](#Toc.links) : <code>Map</code>

<a name="new_Toc_new"></a>

## new Toc()
<p>Constructor</p>

<a name="Toc+get"></a>

## toc.get(target) ⇒ <code>object</code>
<p>Get navigation item by href</p>

**Kind**: instance method of [<code>Toc</code>](#Toc)  
**Returns**: <code>object</code> - <p>navItem</p>  

| Param | Type |
| --- | --- |
| target | <code>string</code> | 

**Example**  
```js
toc.get("chapter_001.xhtml")
```
<a name="Toc+parse"></a>

## toc.parse(target) ⇒ [<code>Promise.&lt;Toc&gt;</code>](#Toc)
<p>Parse out the toc items</p>

**Kind**: instance method of [<code>Toc</code>](#Toc)  

| Param | Type |
| --- | --- |
| target | <code>Node</code> \| <code>Array.&lt;object&gt;</code> | 

<a name="Toc+clear"></a>

## toc.clear()
<p>Clear navigation items</p>

**Kind**: instance method of [<code>Toc</code>](#Toc)  
<a name="Toc+destroy"></a>

## toc.destroy()
<p>destroy</p>

**Kind**: instance method of [<code>Toc</code>](#Toc)  
<a name="Toc.links"></a>

## Toc.links : <code>Map</code>
**Kind**: static property of [<code>Toc</code>](#Toc)  
**Read only**: true  
