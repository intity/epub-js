<a name="Mapping"></a>

# Mapping
<p>Map text locations to CFI ranges</p>

**Kind**: global class  

* [Mapping](#Mapping)
    * [new Mapping(layout, [dev])](#new_Mapping_new)
    * [.section(view)](#Mapping+section) ⇒ <code>Array.&lt;object&gt;</code>
    * [.page(contents, cfiBase, start, end)](#Mapping+page) ⇒ <code>Object</code>
    * [.findRanges(view)](#Mapping+findRanges) ⇒ <code>Array.&lt;object&gt;</code>
    * [.rangeListToCfiList(cfiBase, columns)](#Mapping+rangeListToCfiList) ⇒ <code>Array.&lt;object&gt;</code>
    * [.destroy()](#Mapping+destroy)

<a name="new_Mapping_new"></a>

## new Mapping(layout, [dev])
<p>Constructor</p>


| Param | Type | Default | Description |
| --- | --- | --- | --- |
| layout | <code>Layout</code> |  | <p>Layout ref</p> |
| [dev] | <code>boolean</code> | <code>false</code> | <p>toggle developer highlighting</p> |

<a name="Mapping+section"></a>

## mapping.section(view) ⇒ <code>Array.&lt;object&gt;</code>
<p>Find CFI pairs for entire section at once</p>

**Kind**: instance method of [<code>Mapping</code>](#Mapping)  

| Param | Type |
| --- | --- |
| view | <code>any</code> | 

<a name="Mapping+page"></a>

## mapping.page(contents, cfiBase, start, end) ⇒ <code>Object</code>
<p>Find CFI pairs for a page</p>

**Kind**: instance method of [<code>Mapping</code>](#Mapping)  

| Param | Type | Description |
| --- | --- | --- |
| contents | <code>Contents</code> | <p>Contents from view</p> |
| cfiBase | <code>string</code> | <p>string of the base for a cfi</p> |
| start | <code>number</code> | <p>position to start at</p> |
| end | <code>number</code> | <p>position to end at</p> |

<a name="Mapping+findRanges"></a>

## mapping.findRanges(view) ⇒ <code>Array.&lt;object&gt;</code>
<p>findRanges</p>

**Kind**: instance method of [<code>Mapping</code>](#Mapping)  
**Returns**: <code>Array.&lt;object&gt;</code> - <p>columns</p>  

| Param | Type |
| --- | --- |
| view | <code>\*</code> | 

<a name="Mapping+rangeListToCfiList"></a>

## mapping.rangeListToCfiList(cfiBase, columns) ⇒ <code>Array.&lt;object&gt;</code>
<p>rangeListToCfiList</p>

**Kind**: instance method of [<code>Mapping</code>](#Mapping)  

| Param | Type |
| --- | --- |
| cfiBase | <code>string</code> | 
| columns | <code>Array.&lt;object&gt;</code> | 

<a name="Mapping+destroy"></a>

## mapping.destroy()
<p>Destroy the Mapping object</p>

**Kind**: instance method of [<code>Mapping</code>](#Mapping)  
