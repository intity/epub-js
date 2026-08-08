<a name="Navigation"></a>

# Navigation
<p>Navigation Parser</p>

**Kind**: global class  
**Link**: https://www.w3.org/TR/epub/#sec-nav  

* [Navigation](#Navigation)
    * [new Navigation()](#new_Navigation_new)
    * _instance_
        * [.clear()](#Navigation+clear)
        * [.parse(doc)](#Navigation+parse) ⇒ [<code>Promise.&lt;Navigation&gt;</code>](#Navigation)
        * [.load(data)](#Navigation+load) ⇒ [<code>Promise.&lt;Navigation&gt;</code>](#Navigation)
        * [.forEach(...args)](#Navigation+forEach)
        * [.destroy()](#Navigation+destroy)
    * _static_
        * [.landmarks](#Navigation.landmarks) : <code>Landmarks</code>
        * [.pageList](#Navigation.pageList) : <code>PageList</code>
        * [.toc](#Navigation.toc) : <code>Toc</code>

<a name="new_Navigation_new"></a>

## new Navigation()
<p>Constructor</p>

<a name="Navigation+clear"></a>

## navigation.clear()
<p>Clear all navigation parts</p>

**Kind**: instance method of [<code>Navigation</code>](#Navigation)  
<a name="Navigation+parse"></a>

## navigation.parse(doc) ⇒ [<code>Promise.&lt;Navigation&gt;</code>](#Navigation)
<p>Parse navigation document</p>

**Kind**: instance method of [<code>Navigation</code>](#Navigation)  

| Param | Type | Description |
| --- | --- | --- |
| doc | <code>Document</code> | <p>html OR xhtml OR ncx</p> |

<a name="Navigation+load"></a>

## navigation.load(data) ⇒ [<code>Promise.&lt;Navigation&gt;</code>](#Navigation)
<p>Load navigation object from JSON</p>

**Kind**: instance method of [<code>Navigation</code>](#Navigation)  

| Param | Type |
| --- | --- |
| data | <code>object</code> | 

<a name="Navigation+forEach"></a>

## navigation.forEach(...args)
<p>forEach pass through</p>

**Kind**: instance method of [<code>Navigation</code>](#Navigation)  

| Param | Type |
| --- | --- |
| ...args | <code>Array</code> | 

<a name="Navigation+destroy"></a>

## navigation.destroy()
<p>Destroy the Navigation object</p>

**Kind**: instance method of [<code>Navigation</code>](#Navigation)  
<a name="Navigation.landmarks"></a>

## Navigation.landmarks : <code>Landmarks</code>
<p>Landmarks</p>

**Kind**: static property of [<code>Navigation</code>](#Navigation)  
**Read only**: true  
<a name="Navigation.pageList"></a>

## Navigation.pageList : <code>PageList</code>
<p>List of numbered pages</p>

**Kind**: static property of [<code>Navigation</code>](#Navigation)  
**Read only**: true  
<a name="Navigation.toc"></a>

## Navigation.toc : <code>Toc</code>
<p>Table of Contents</p>

**Kind**: static property of [<code>Navigation</code>](#Navigation)  
**Read only**: true  
