<a name="EpubCFI"></a>

# EpubCFI
<p>Parsing and creation of EpubCFIs:</p>

**Kind**: global class  
**Link**: https://idpf.org/epub/linking/cfi/epub-cfi.html

Implements:
- Character Offset: `epubcfi(/6/4[chap01ref]!/4[body01]/10[para05]/2/1:3)`
- Simple Ranges: `epubcfi(/6/4[chap01ref]!/4[body01]/10[para05],/2/1:1,/3:4)`

Does Not Implement:
- Temporal Offset `(~)`
- Spatial Offset `(@)`
- Temporal-Spatial Offset `(~ + @)`
- Text Location Assertion `([)`  

* [EpubCFI](#EpubCFI)
    * [new EpubCFI([data], [base], [ignoreClass])](#new_EpubCFI_new)
    * _instance_
        * [.set([options])](#EpubCFI+set) ⇒ [<code>EpubCFI</code>](#EpubCFI)
        * [.checkType(cfiFrom)](#EpubCFI+checkType) ⇒ <code>string</code> \| <code>undefined</code>
        * [.collapse([toStart])](#EpubCFI+collapse)
        * [.compare(cfiOne, cfiTwo)](#EpubCFI+compare) ⇒ <code>number</code>
        * [.generateChapterComponent(spineNodeIndex, position, [id])](#EpubCFI+generateChapterComponent) ⇒ <code>string</code>
        * [.isCfiString(str)](#EpubCFI+isCfiString) ⇒ <code>boolean</code>
        * [.fromNode(node, base, [ignoreClass])](#EpubCFI+fromNode) ⇒ [<code>EpubCFI</code>](#EpubCFI)
        * [.fromRange(range, base, [ignoreClass])](#EpubCFI+fromRange) ⇒ [<code>EpubCFI</code>](#EpubCFI)
        * [.parse(hash)](#EpubCFI+parse) ⇒ [<code>EpubCFI</code>](#EpubCFI)
        * [.toRange([doc], [ignoreClass])](#EpubCFI+toRange) ⇒ <code>Range</code>
        * [.toString()](#EpubCFI+toString) ⇒ <code>string</code>
        * [.destroy()](#EpubCFI+destroy)
    * _static_
        * [.base](#EpubCFI.base) : <code>object</code>
        * [.hash](#EpubCFI.hash) : <code>string</code>
        * [.ignoreClass](#EpubCFI.ignoreClass) : <code>string</code>
        * [.path](#EpubCFI.path) : <code>object</code>
        * [.range](#EpubCFI.range) : <code>boolean</code>
        * [.spinePos](#EpubCFI.spinePos) : <code>number</code>
        * [.start](#EpubCFI.start) : <code>object</code>
        * [.end](#EpubCFI.end) : <code>object</code>
        * [.type](#EpubCFI.type) : <code>string</code>

<a name="new_EpubCFI_new"></a>

## new EpubCFI([data], [base], [ignoreClass])
<p>Constructor</p>


| Param | Type | Description |
| --- | --- | --- |
| [data] | <code>string</code> \| <code>Range</code> \| <code>Node</code> | <p>values: 'epubcfi(..)' OR range OR node</p> |
| [base] | <code>string</code> \| <code>object</code> | <p>base component</p> |
| [ignoreClass] | <code>string</code> | <p>class to ignore when parsing DOM</p> |

**Example**  
```js
new EpubCFI()
```
**Example**  
```js
new EpubCFI("epubcfi(/6/2[cover]!/6)")
```
**Example**  
```js
new EpubCFI("epubcfi(/6/2[cover]!/6)", "/6/6[end]")
```
**Example**  
```js
new EpubCFI("epubcfi(/6/2[cover]!/6)", "/6/6[end]", "token-hl")
```
<a name="EpubCFI+set"></a>

## epubCFI.set([options]) ⇒ [<code>EpubCFI</code>](#EpubCFI)
<p>Set object data options</p>

**Kind**: instance method of [<code>EpubCFI</code>](#EpubCFI)  

| Param | Type |
| --- | --- |
| [options] | <code>object</code> | 
| [options.data] | <code>string</code> \| <code>Range</code> \| <code>Node</code> | 
| [options.base] | <code>string</code> \| <code>object</code> | 
| [options.ignoreClass] | <code>string</code> | 

**Example**  
```js
in: epubcfi.set({ data: "epubcfi(/6/2[cover]!/6)" })
```
**Example**  
```js
in: epubcfi.set({ data: range })
```
**Example**  
```js
in: epubcfi.set({ data: node })
```
**Example**  
```js
in: epubcfi.set({ base: "/6/6[end]" })
```
**Example**  
```js
in: epubcfi.set({ ignoreClass: "annotator-hl" })
```
<a name="EpubCFI+checkType"></a>

## epubCFI.checkType(cfiFrom) ⇒ <code>string</code> \| <code>undefined</code>
<p>Check the type to input</p>

**Kind**: instance method of [<code>EpubCFI</code>](#EpubCFI)  
**Returns**: <code>string</code> \| <code>undefined</code> - <p>argument type</p>  

| Param | Type |
| --- | --- |
| cfiFrom | <code>string</code> \| <code>Range</code> \| <code>Node</code> | 

<a name="EpubCFI+collapse"></a>

## epubCFI.collapse([toStart])
<p>Collapse a CFI Range to a single CFI Position</p>

**Kind**: instance method of [<code>EpubCFI</code>](#EpubCFI)  

| Param | Type |
| --- | --- |
| [toStart] | <code>boolean</code> | 

<a name="EpubCFI+compare"></a>

## epubCFI.compare(cfiOne, cfiTwo) ⇒ <code>number</code>
<p>Compare which of two CFIs is earlier in the text</p>

**Kind**: instance method of [<code>EpubCFI</code>](#EpubCFI)  
**Returns**: <code>number</code> - <p>First is earlier = -1, Second is earlier = 1, They are equal = 0</p>  

| Param | Type |
| --- | --- |
| cfiOne | <code>string</code> \| [<code>EpubCFI</code>](#EpubCFI) | 
| cfiTwo | <code>string</code> \| [<code>EpubCFI</code>](#EpubCFI) | 

<a name="EpubCFI+generateChapterComponent"></a>

## epubCFI.generateChapterComponent(spineNodeIndex, position, [id]) ⇒ <code>string</code>
<p>Generate chapter component</p>

**Kind**: instance method of [<code>EpubCFI</code>](#EpubCFI)  
**Returns**: <code>string</code> - <p>EpubCFI string format</p>  

| Param | Type |
| --- | --- |
| spineNodeIndex | <code>number</code> | 
| position | <code>number</code> | 
| [id] | <code>string</code> | 

<a name="EpubCFI+isCfiString"></a>

## epubCFI.isCfiString(str) ⇒ <code>boolean</code>
<p>Check if a string is wrapped with &quot;epubcfi()&quot;</p>

**Kind**: instance method of [<code>EpubCFI</code>](#EpubCFI)  
**Returns**: <code>boolean</code> - <p><code>true</code> if the string is valid, <code>false</code> otherwise</p>  

| Param | Type | Description |
| --- | --- | --- |
| str | <code>string</code> | <p>EpubCFI string format</p> |

<a name="EpubCFI+fromNode"></a>

## epubCFI.fromNode(node, base, [ignoreClass]) ⇒ [<code>EpubCFI</code>](#EpubCFI)
<p>Create a EpubCFI object from a Node</p>

**Kind**: instance method of [<code>EpubCFI</code>](#EpubCFI)  

| Param | Type |
| --- | --- |
| node | <code>Node</code> | 
| base | <code>string</code> \| <code>object</code> | 
| [ignoreClass] | <code>string</code> | 

<a name="EpubCFI+fromRange"></a>

## epubCFI.fromRange(range, base, [ignoreClass]) ⇒ [<code>EpubCFI</code>](#EpubCFI)
<p>Create a CFI object from a Range</p>

**Kind**: instance method of [<code>EpubCFI</code>](#EpubCFI)  

| Param | Type |
| --- | --- |
| range | <code>Range</code> | 
| base | <code>string</code> \| <code>object</code> | 
| [ignoreClass] | <code>string</code> | 

<a name="EpubCFI+parse"></a>

## epubCFI.parse(hash) ⇒ [<code>EpubCFI</code>](#EpubCFI)
<p>Parse a cfi string to a EpubCFI object representation</p>

**Kind**: instance method of [<code>EpubCFI</code>](#EpubCFI)  
**Returns**: [<code>EpubCFI</code>](#EpubCFI) - <p>EpubCFI object</p>  
**Todo**

- [ ] Comparison of the base component from the parse method


| Param | Type | Description |
| --- | --- | --- |
| hash | <code>string</code> | <p>EpubCFI string format</p> |

<a name="EpubCFI+toRange"></a>

## epubCFI.toRange([doc], [ignoreClass]) ⇒ <code>Range</code>
<p>Creates a DOM range representing a CFI</p>

**Kind**: instance method of [<code>EpubCFI</code>](#EpubCFI)  

| Param | Type | Description |
| --- | --- | --- |
| [doc] | <code>Document</code> | <p>document referenced in the base</p> |
| [ignoreClass] | <code>string</code> |  |

<a name="EpubCFI+toString"></a>

## epubCFI.toString() ⇒ <code>string</code>
<p>Convert CFI to a epubcfi(...) string</p>

**Kind**: instance method of [<code>EpubCFI</code>](#EpubCFI)  
**Returns**: <code>string</code> - <p>EpubCFI string format</p>  
<a name="EpubCFI+destroy"></a>

## epubCFI.destroy()
<p>Destroy the EpubCFI object</p>

**Kind**: instance method of [<code>EpubCFI</code>](#EpubCFI)  
<a name="EpubCFI.base"></a>

## EpubCFI.base : <code>object</code>
<p>Base component</p>

**Kind**: static property of [<code>EpubCFI</code>](#EpubCFI)  
**Read only**: true  
<a name="EpubCFI.hash"></a>

## EpubCFI.hash : <code>string</code>
<p>EpubCFI string format</p>

**Kind**: static property of [<code>EpubCFI</code>](#EpubCFI)  
**Read only**: true  
<a name="EpubCFI.ignoreClass"></a>

## EpubCFI.ignoreClass : <code>string</code>
**Kind**: static property of [<code>EpubCFI</code>](#EpubCFI)  
**Read only**: true  
<a name="EpubCFI.path"></a>

## EpubCFI.path : <code>object</code>
<p>Path component</p>

**Kind**: static property of [<code>EpubCFI</code>](#EpubCFI)  
**Read only**: true  
<a name="EpubCFI.range"></a>

## EpubCFI.range : <code>boolean</code>
**Kind**: static property of [<code>EpubCFI</code>](#EpubCFI)  
**Read only**: true  
<a name="EpubCFI.spinePos"></a>

## EpubCFI.spinePos : <code>number</code>
<p>Spine position</p>

**Kind**: static property of [<code>EpubCFI</code>](#EpubCFI)  
**Read only**: true  
<a name="EpubCFI.start"></a>

## EpubCFI.start : <code>object</code>
<p>Start component</p>

**Kind**: static property of [<code>EpubCFI</code>](#EpubCFI)  
**Read only**: true  
<a name="EpubCFI.end"></a>

## EpubCFI.end : <code>object</code>
<p>End component</p>

**Kind**: static property of [<code>EpubCFI</code>](#EpubCFI)  
**Read only**: true  
<a name="EpubCFI.type"></a>

## EpubCFI.type : <code>string</code>
**Kind**: static property of [<code>EpubCFI</code>](#EpubCFI)  
**Read only**: true  
