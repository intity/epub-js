<a name="Sections"></a>

# Sections ⇐ <code>Array</code>
Sections class

**Kind**: global class  
**Extends**: <code>Array</code>  

* [Sections](#Sections) ⇐ <code>Array</code>
    * _instance_
        * [.clear()](#Sections+clear)
        * [.get([target])](#Sections+get) ⇒ <code>Section</code> \| <code>null</code>
        * [.first()](#Sections+first) ⇒ <code>Section</code> \| <code>null</code>
        * [.last()](#Sections+last) ⇒ <code>Section</code> \| <code>null</code>
        * [.unpack(packaging, resolve, canonical)](#Sections+unpack) ⇒ [<code>Promise.&lt;Sections&gt;</code>](#Sections)
        * [.destroy()](#Sections+destroy)
    * _static_
        * [.hooks](#Sections.hooks) : <code>object</code>
        * [.loaded](#Sections.loaded) : <code>boolean</code>

<a name="Sections+clear"></a>

## sections.clear()
Clear sections

**Kind**: instance method of [<code>Sections</code>](#Sections)  
<a name="Sections+get"></a>

## sections.get([target]) ⇒ <code>Section</code> \| <code>null</code>
Get an item from the spine

**Kind**: instance method of [<code>Sections</code>](#Sections)  
**Returns**: <code>Section</code> \| <code>null</code> - section  

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
Find the first Section in the Spine

**Kind**: instance method of [<code>Sections</code>](#Sections)  
**Returns**: <code>Section</code> \| <code>null</code> - first section  
<a name="Sections+last"></a>

## sections.last() ⇒ <code>Section</code> \| <code>null</code>
Find the last Section in the Spine

**Kind**: instance method of [<code>Sections</code>](#Sections)  
**Returns**: <code>Section</code> \| <code>null</code> - last section  
<a name="Sections+unpack"></a>

## sections.unpack(packaging, resolve, canonical) ⇒ [<code>Promise.&lt;Sections&gt;</code>](#Sections)
Unpack items from a opf into spine items

**Kind**: instance method of [<code>Sections</code>](#Sections)  

| Param | Type | Description |
| --- | --- | --- |
| packaging | <code>Packaging</code> |  |
| resolve | <code>function</code> | URL resolve |
| canonical | <code>function</code> | Resolve canonical url |

<a name="Sections+destroy"></a>

## sections.destroy()
destroy

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

<a name="Sections.loaded"></a>

## Sections.loaded : <code>boolean</code>
**Kind**: static property of [<code>Sections</code>](#Sections)  
**Read only**: true  
