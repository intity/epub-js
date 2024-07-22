<a name="PageList"></a>

# PageList ⇐ <code>Array</code>
Page List Parser

**Kind**: global class  
**Extends**: <code>Array</code>  
**Link**: https://www.w3.org/TR/epub/#sec-nav-pagelist  

* [PageList](#PageList) ⇐ <code>Array</code>
    * [new PageList()](#new_PageList_new)
    * _instance_
        * [.parse(target)](#PageList+parse) ⇒ [<code>Promise.&lt;PageList&gt;</code>](#PageList)
        * [.pageFromCfi(cfi)](#PageList+pageFromCfi) ⇒ <code>number</code>
        * [.cfiFromPage(pg)](#PageList+cfiFromPage) ⇒ <code>string</code> \| <code>null</code>
        * [.pageFromPercentage(value)](#PageList+pageFromPercentage) ⇒ <code>number</code>
        * [.percentageFromPage(pg)](#PageList+percentageFromPage) ⇒ <code>number</code>
        * [.percentageFromCfi(cfi)](#PageList+percentageFromCfi) ⇒ <code>number</code>
        * [.clear()](#PageList+clear)
        * [.destroy()](#PageList+destroy)
    * _static_
        * [.pages](#PageList.pages) : <code>Array.&lt;number&gt;</code>
        * [.locations](#PageList.locations) : <code>Array.&lt;string&gt;</code>
        * [.firstPage](#PageList.firstPage) : <code>number</code>
        * [.lastPage](#PageList.lastPage) : <code>number</code>
        * [.totalPages](#PageList.totalPages) : <code>number</code>

<a name="new_PageList_new"></a>

## new PageList()
Constructor

<a name="PageList+parse"></a>

## pageList.parse(target) ⇒ [<code>Promise.&lt;PageList&gt;</code>](#PageList)
Parse Page List

**Kind**: instance method of [<code>PageList</code>](#PageList)  

| Param | Type |
| --- | --- |
| target | <code>Node</code> \| <code>Array.&lt;object&gt;</code> | 

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

<a name="PageList+clear"></a>

## pageList.clear()
Clear PageList

**Kind**: instance method of [<code>PageList</code>](#PageList)  
<a name="PageList+destroy"></a>

## pageList.destroy()
Destroy

**Kind**: instance method of [<code>PageList</code>](#PageList)  
<a name="PageList.pages"></a>

## PageList.pages : <code>Array.&lt;number&gt;</code>
Page indexes

**Kind**: static property of [<code>PageList</code>](#PageList)  
**Read only**: true  
<a name="PageList.locations"></a>

## PageList.locations : <code>Array.&lt;string&gt;</code>
**Kind**: static property of [<code>PageList</code>](#PageList)  
**Read only**: true  
<a name="PageList.firstPage"></a>

## PageList.firstPage : <code>number</code>
**Kind**: static property of [<code>PageList</code>](#PageList)  
**Read only**: true  
<a name="PageList.lastPage"></a>

## PageList.lastPage : <code>number</code>
**Kind**: static property of [<code>PageList</code>](#PageList)  
**Read only**: true  
<a name="PageList.totalPages"></a>

## PageList.totalPages : <code>number</code>
**Kind**: static property of [<code>PageList</code>](#PageList)  
**Read only**: true  
