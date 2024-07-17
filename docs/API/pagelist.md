<a name="PageList"></a>

# PageList
Page List Parser

**Kind**: global class  

* [PageList](#PageList)
    * [new PageList([xml])](#new_PageList_new)
    * [.parse(xml)](#PageList+parse) ⇒ <code>Array.&lt;{href: string, page: number}&gt;</code>
    * [.pageFromCfi(cfi)](#PageList+pageFromCfi) ⇒ <code>number</code>
    * [.cfiFromPage(pg)](#PageList+cfiFromPage) ⇒ <code>string</code> \| <code>null</code>
    * [.pageFromPercentage(value)](#PageList+pageFromPercentage) ⇒ <code>number</code>
    * [.percentageFromPage(pg)](#PageList+percentageFromPage) ⇒ <code>number</code>
    * [.percentageFromCfi(cfi)](#PageList+percentageFromCfi) ⇒ <code>number</code>
    * [.destroy()](#PageList+destroy)

<a name="new_PageList_new"></a>

## new PageList([xml])
Constructor


| Param | Type |
| --- | --- |
| [xml] | <code>Document</code> | 

<a name="PageList+parse"></a>

## pageList.parse(xml) ⇒ <code>Array.&lt;{href: string, page: number}&gt;</code>
Parse PageList Xml

**Kind**: instance method of [<code>PageList</code>](#PageList)  

| Param | Type |
| --- | --- |
| xml | <code>Document</code> | 

<a name="PageList+pageFromCfi"></a>

## pageList.pageFromCfi(cfi) ⇒ <code>number</code>
Get a page index from a EpubCFI

**Kind**: instance method of [<code>PageList</code>](#PageList)  
**Returns**: <code>number</code> - Page index  

| Param | Type | Description |
| --- | --- | --- |
| cfi | <code>string</code> | EpubCFI |

<a name="PageList+cfiFromPage"></a>

## pageList.cfiFromPage(pg) ⇒ <code>string</code> \| <code>null</code>
Get a EpubCFI by Page index

**Kind**: instance method of [<code>PageList</code>](#PageList)  
**Returns**: <code>string</code> \| <code>null</code> - cfi  

| Param | Type | Description |
| --- | --- | --- |
| pg | <code>string</code> \| <code>number</code> | Page index |

<a name="PageList+pageFromPercentage"></a>

## pageList.pageFromPercentage(value) ⇒ <code>number</code>
Get a Page index from Book percentage

**Kind**: instance method of [<code>PageList</code>](#PageList)  
**Returns**: <code>number</code> - Page index  

| Param | Type | Description |
| --- | --- | --- |
| value | <code>number</code> | Percentage |

<a name="PageList+percentageFromPage"></a>

## pageList.percentageFromPage(pg) ⇒ <code>number</code>
Returns a value between 0 - 1 corresponding to the location of a page

**Kind**: instance method of [<code>PageList</code>](#PageList)  
**Returns**: <code>number</code> - Percentage  

| Param | Type | Description |
| --- | --- | --- |
| pg | <code>number</code> | the page |

<a name="PageList+percentageFromCfi"></a>

## pageList.percentageFromCfi(cfi) ⇒ <code>number</code>
Returns a value between 0 - 1 corresponding to the location of a cfi

**Kind**: instance method of [<code>PageList</code>](#PageList)  
**Returns**: <code>number</code> - Percentage  

| Param | Type | Description |
| --- | --- | --- |
| cfi | <code>string</code> | EpubCFI |

<a name="PageList+destroy"></a>

## pageList.destroy()
Destroy

**Kind**: instance method of [<code>PageList</code>](#PageList)  
