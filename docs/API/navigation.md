<a name="Navigation"></a>

# Navigation
Navigation Parser

**Kind**: global class  
**Link**: https://www.w3.org/TR/epub/#sec-nav  

* [Navigation](#Navigation)
    * [new Navigation()](#new_Navigation_new)
    * _instance_
        * [.clear()](#Navigation+clear)
        * [.parse(target)](#Navigation+parse) ⇒ <code>Promise.&lt;any&gt;</code>
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

## navigation.parse(target) ⇒ <code>Promise.&lt;any&gt;</code>
Parse navigation

**Kind**: instance method of [<code>Navigation</code>](#Navigation)  

| Param | Type | Description |
| --- | --- | --- |
| target | <code>Document</code> \| <code>object</code> | navigation html OR xhtml OR ncx OR json |

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
