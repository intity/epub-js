<a name="Mapping"></a>

# Mapping
Map text locations to CFI ranges

**Kind**: global class  

* [Mapping](#Mapping)
    * [new Mapping(layout, [dev])](#new_Mapping_new)
    * [.section(view)](#Mapping+section) ⇒ <code>Array.&lt;object&gt;</code>
    * [.page(contents, cfiBase, start, end)](#Mapping+page) ⇒ <code>Object</code>
    * [.findRanges(view)](#Mapping+findRanges) ⇒ <code>Array.&lt;object&gt;</code>
    * [.rangeListToCfiList(cfiBase, columns)](#Mapping+rangeListToCfiList) ⇒ <code>Array.&lt;object&gt;</code>

<a name="new_Mapping_new"></a>

## new Mapping(layout, [dev])
Constructor


| Param | Type | Default | Description |
| --- | --- | --- | --- |
| layout | <code>Layout</code> |  | Layout to apply |
| [dev] | <code>boolean</code> | <code>false</code> | toggle developer highlighting |

<a name="Mapping+section"></a>

## mapping.section(view) ⇒ <code>Array.&lt;object&gt;</code>
Find CFI pairs for entire section at once

**Kind**: instance method of [<code>Mapping</code>](#Mapping)  

| Param | Type |
| --- | --- |
| view | <code>any</code> | 

<a name="Mapping+page"></a>

## mapping.page(contents, cfiBase, start, end) ⇒ <code>Object</code>
Find CFI pairs for a page

**Kind**: instance method of [<code>Mapping</code>](#Mapping)  

| Param | Type | Description |
| --- | --- | --- |
| contents | <code>Contents</code> | Contents from view |
| cfiBase | <code>string</code> | string of the base for a cfi |
| start | <code>number</code> | position to start at |
| end | <code>number</code> | position to end at |

<a name="Mapping+findRanges"></a>

## mapping.findRanges(view) ⇒ <code>Array.&lt;object&gt;</code>
findRanges

**Kind**: instance method of [<code>Mapping</code>](#Mapping)  
**Returns**: <code>Array.&lt;object&gt;</code> - columns  

| Param | Type |
| --- | --- |
| view | <code>\*</code> | 

<a name="Mapping+rangeListToCfiList"></a>

## mapping.rangeListToCfiList(cfiBase, columns) ⇒ <code>Array.&lt;object&gt;</code>
rangeListToCfiList

**Kind**: instance method of [<code>Mapping</code>](#Mapping)  

| Param | Type |
| --- | --- |
| cfiBase | <code>string</code> | 
| columns | <code>Array.&lt;object&gt;</code> | 

