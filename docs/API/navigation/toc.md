<a name="Toc"></a>

# Toc ⇐ <code>Array</code>
Table Of Contents Parser

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
Constructor

<a name="Toc+get"></a>

## toc.get(target) ⇒ <code>object</code>
Get navigation item by href

**Kind**: instance method of [<code>Toc</code>](#Toc)  
**Returns**: <code>object</code> - navItem  

| Param | Type |
| --- | --- |
| target | <code>string</code> | 

**Example**  
```js
toc.get("chapter_001.xhtml")
```
<a name="Toc+parse"></a>

## toc.parse(target) ⇒ [<code>Promise.&lt;Toc&gt;</code>](#Toc)
Parse out the toc items

**Kind**: instance method of [<code>Toc</code>](#Toc)  

| Param | Type |
| --- | --- |
| target | <code>Node</code> \| <code>Array.&lt;object&gt;</code> | 

<a name="Toc+clear"></a>

## toc.clear()
Clear navigation items

**Kind**: instance method of [<code>Toc</code>](#Toc)  
<a name="Toc+destroy"></a>

## toc.destroy()
destroy

**Kind**: instance method of [<code>Toc</code>](#Toc)  
<a name="Toc.links"></a>

## Toc.links : <code>Map</code>
**Kind**: static property of [<code>Toc</code>](#Toc)  
**Read only**: true  
