<a name="Navigation"></a>

# Navigation
Navigation Parser

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
Constructor

<a name="Navigation+clear"></a>

## navigation.clear()
Clear all navigation parts

**Kind**: instance method of [<code>Navigation</code>](#Navigation)  
<a name="Navigation+parse"></a>

## navigation.parse(doc) ⇒ [<code>Promise.&lt;Navigation&gt;</code>](#Navigation)
Parse navigation document

**Kind**: instance method of [<code>Navigation</code>](#Navigation)  

| Param | Type | Description |
| --- | --- | --- |
| doc | <code>Document</code> | html OR xhtml OR ncx |

<a name="Navigation+load"></a>

## navigation.load(data) ⇒ [<code>Promise.&lt;Navigation&gt;</code>](#Navigation)
Load navigation object from JSON

**Kind**: instance method of [<code>Navigation</code>](#Navigation)  

| Param | Type |
| --- | --- |
| data | <code>object</code> | 

<a name="Navigation+forEach"></a>

## navigation.forEach(...args)
forEach pass through

**Kind**: instance method of [<code>Navigation</code>](#Navigation)  

| Param | Type |
| --- | --- |
| ...args | <code>IArguments</code> | 

<a name="Navigation+destroy"></a>

## navigation.destroy()
destroy

**Kind**: instance method of [<code>Navigation</code>](#Navigation)  
<a name="Navigation.landmarks"></a>

## Navigation.landmarks : <code>Landmarks</code>
Landmarks

**Kind**: static property of [<code>Navigation</code>](#Navigation)  
**Read only**: true  
<a name="Navigation.pageList"></a>

## Navigation.pageList : <code>PageList</code>
List of numbered pages

**Kind**: static property of [<code>Navigation</code>](#Navigation)  
**Read only**: true  
<a name="Navigation.toc"></a>

## Navigation.toc : <code>Toc</code>
Table of Contents

**Kind**: static property of [<code>Navigation</code>](#Navigation)  
**Read only**: true  
