<a name="Sections"></a>

# Sections ⇐ <code>Map</code>
<p>Sections class</p>

**Kind**: global class  
**Extends**: <code>Map</code>  

* [Sections](#Sections) ⇐ <code>Map</code>
    * _instance_
        * [.clear()](#Sections+clear)
        * [.get([target])](#Sections+get) ⇒ <code>Section</code> \| <code>null</code>
        * [.first()](#Sections+first) ⇒ <code>Section</code> \| <code>null</code>
        * [.last()](#Sections+last) ⇒ <code>Section</code> \| <code>null</code>
        * [.unpack(packaging, navigation, resolve, canonical)](#Sections+unpack) ⇒ [<code>Promise.&lt;Sections&gt;</code>](#Sections)
        * [.destroy()](#Sections+destroy)
    * _static_
        * [.hooks](#Sections.hooks) : <code>object</code>

<a name="Sections+clear"></a>

## sections.clear()
<p>Clear sections</p>

**Kind**: instance method of [<code>Sections</code>](#Sections)  
<a name="Sections+get"></a>

## sections.get([target]) ⇒ <code>Section</code> \| <code>null</code>
<p>Get an item from the spine</p>

**Kind**: instance method of [<code>Sections</code>](#Sections)  
**Returns**: <code>Section</code> \| <code>null</code> - <p>section</p>  

| Param | Type |
| --- | --- |
| [target] | <code>string</code> \| <code>number</code> | 

**Example**  
```js
sections.get();
```
**Example**  
```js
sections.get(3);
```
**Example**  
```js
sections.get("#chapter_001");
```
**Example**  
```js
sections.get("chapter_001.xhtml");
```
**Example**  
```js
sections.get("epubcfi(/6/8!/4/2/16/1:0)")
```
<a name="Sections+first"></a>

## sections.first() ⇒ <code>Section</code> \| <code>null</code>
<p>Find the first Section in the Spine</p>

**Kind**: instance method of [<code>Sections</code>](#Sections)  
**Returns**: <code>Section</code> \| <code>null</code> - <p>first section</p>  
<a name="Sections+last"></a>

## sections.last() ⇒ <code>Section</code> \| <code>null</code>
<p>Find the last Section in the Spine</p>

**Kind**: instance method of [<code>Sections</code>](#Sections)  
**Returns**: <code>Section</code> \| <code>null</code> - <p>last section</p>  
<a name="Sections+unpack"></a>

## sections.unpack(packaging, navigation, resolve, canonical) ⇒ [<code>Promise.&lt;Sections&gt;</code>](#Sections)
<p>Unpack items from a opf into spine items</p>

**Kind**: instance method of [<code>Sections</code>](#Sections)  

| Param | Type | Description |
| --- | --- | --- |
| packaging | <code>Packaging</code> |  |
| navigation | <code>Navigation</code> |  |
| resolve | <code>function</code> | <p>URL resolve</p> |
| canonical | <code>function</code> | <p>Resolve canonical url</p> |

<a name="Sections+destroy"></a>

## sections.destroy()
<p>destroy</p>

**Kind**: instance method of [<code>Sections</code>](#Sections)  
<a name="Sections.hooks"></a>

## Sections.hooks : <code>object</code>
**Kind**: static property of [<code>Sections</code>](#Sections)  
**Read only**: true  
**Properties**

| Name | Type |
| --- | --- |
| content | <code>Hook</code> | 
| serialize | <code>Hook</code> | 

