<a name="PageList"></a>

# PageList ⇐ <code>Array</code>
<p>Page List Parser</p>

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
<p>Constructor</p>

<a name="PageList+parse"></a>

## pageList.parse(target) ⇒ [<code>Promise.&lt;PageList&gt;</code>](#PageList)
<p>Parse Page List</p>

**Kind**: instance method of [<code>PageList</code>](#PageList)  

| Param | Type |
| --- | --- |
| target | <code>Node</code> \| <code>Array.&lt;object&gt;</code> | 

<a name="PageList+pageFromCfi"></a>

## pageList.pageFromCfi(cfi) ⇒ <code>number</code>
<p>Get a page index from a EpubCFI</p>

**Kind**: instance method of [<code>PageList</code>](#PageList)  
**Returns**: <code>number</code> - <p>Page index</p>  

| Param | Type | Description |
| --- | --- | --- |
| cfi | <code>string</code> | <p>EpubCFI</p> |

<a name="PageList+cfiFromPage"></a>

## pageList.cfiFromPage(pg) ⇒ <code>string</code> \| <code>null</code>
<p>Get a EpubCFI by Page index</p>

**Kind**: instance method of [<code>PageList</code>](#PageList)  
**Returns**: <code>string</code> \| <code>null</code> - <p>cfi</p>  

| Param | Type | Description |
| --- | --- | --- |
| pg | <code>string</code> \| <code>number</code> | <p>Page index</p> |

<a name="PageList+pageFromPercentage"></a>

## pageList.pageFromPercentage(value) ⇒ <code>number</code>
<p>Get a Page index from Book percentage</p>

**Kind**: instance method of [<code>PageList</code>](#PageList)  
**Returns**: <code>number</code> - <p>Page index</p>  

| Param | Type | Description |
| --- | --- | --- |
| value | <code>number</code> | <p>Percentage</p> |

<a name="PageList+percentageFromPage"></a>

## pageList.percentageFromPage(pg) ⇒ <code>number</code>
<p>Returns a value between 0 - 1 corresponding to the location of a page</p>

**Kind**: instance method of [<code>PageList</code>](#PageList)  
**Returns**: <code>number</code> - <p>Percentage</p>  

| Param | Type | Description |
| --- | --- | --- |
| pg | <code>number</code> | <p>the page</p> |

<a name="PageList+percentageFromCfi"></a>

## pageList.percentageFromCfi(cfi) ⇒ <code>number</code>
<p>Returns a value between 0 - 1 corresponding to the location of a cfi</p>

**Kind**: instance method of [<code>PageList</code>](#PageList)  
**Returns**: <code>number</code> - <p>Percentage</p>  

| Param | Type | Description |
| --- | --- | --- |
| cfi | <code>string</code> | <p>EpubCFI</p> |

<a name="PageList+clear"></a>

## pageList.clear()
<p>Clear PageList</p>

**Kind**: instance method of [<code>PageList</code>](#PageList)  
<a name="PageList+destroy"></a>

## pageList.destroy()
<p>Destroy</p>

**Kind**: instance method of [<code>PageList</code>](#PageList)  
<a name="PageList.pages"></a>

## PageList.pages : <code>Array.&lt;number&gt;</code>
<p>Page indexes</p>

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
