<a name="EpubCFI"></a>

# EpubCFI
Parsing and creation of EpubCFIs:

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
Constructor


| Param | Type | Description |
| --- | --- | --- |
| [data] | <code>string</code> \| <code>Range</code> \| <code>Node</code> | values: 'epubcfi(..)' OR range OR node |
| [base] | <code>string</code> \| <code>object</code> | base component |
| [ignoreClass] | <code>string</code> | class to ignore when parsing DOM |

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
Set object data options

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
Check the type to input

**Kind**: instance method of [<code>EpubCFI</code>](#EpubCFI)  
**Returns**: <code>string</code> \| <code>undefined</code> - argument type  

| Param | Type |
| --- | --- |
| cfiFrom | <code>string</code> \| <code>Range</code> \| <code>Node</code> | 

<a name="EpubCFI+collapse"></a>

## epubCFI.collapse([toStart])
Collapse a CFI Range to a single CFI Position

**Kind**: instance method of [<code>EpubCFI</code>](#EpubCFI)  

| Param | Type |
| --- | --- |
| [toStart] | <code>boolean</code> | 

<a name="EpubCFI+compare"></a>

## epubCFI.compare(cfiOne, cfiTwo) ⇒ <code>number</code>
Compare which of two CFIs is earlier in the text

**Kind**: instance method of [<code>EpubCFI</code>](#EpubCFI)  
**Returns**: <code>number</code> - First is earlier = -1, Second is earlier = 1, They are equal = 0  

| Param | Type |
| --- | --- |
| cfiOne | <code>string</code> \| [<code>EpubCFI</code>](#EpubCFI) | 
| cfiTwo | <code>string</code> \| [<code>EpubCFI</code>](#EpubCFI) | 

<a name="EpubCFI+generateChapterComponent"></a>

## epubCFI.generateChapterComponent(spineNodeIndex, position, [id]) ⇒ <code>string</code>
Generate chapter component

**Kind**: instance method of [<code>EpubCFI</code>](#EpubCFI)  
**Returns**: <code>string</code> - EpubCFI string format  

| Param | Type |
| --- | --- |
| spineNodeIndex | <code>number</code> | 
| position | <code>number</code> | 
| [id] | <code>string</code> | 

<a name="EpubCFI+isCfiString"></a>

## epubCFI.isCfiString(str) ⇒ <code>boolean</code>
Check if a string is wrapped with "epubcfi()"

**Kind**: instance method of [<code>EpubCFI</code>](#EpubCFI)  
**Returns**: <code>boolean</code> - `true` if the string is valid, `false` otherwise  

| Param | Type | Description |
| --- | --- | --- |
| str | <code>string</code> | EpubCFI string format |

<a name="EpubCFI+fromNode"></a>

## epubCFI.fromNode(node, base, [ignoreClass]) ⇒ [<code>EpubCFI</code>](#EpubCFI)
Create a EpubCFI object from a Node

**Kind**: instance method of [<code>EpubCFI</code>](#EpubCFI)  

| Param | Type |
| --- | --- |
| node | <code>Node</code> | 
| base | <code>string</code> \| <code>object</code> | 
| [ignoreClass] | <code>string</code> | 

<a name="EpubCFI+fromRange"></a>

## epubCFI.fromRange(range, base, [ignoreClass]) ⇒ [<code>EpubCFI</code>](#EpubCFI)
Create a CFI object from a Range

**Kind**: instance method of [<code>EpubCFI</code>](#EpubCFI)  

| Param | Type |
| --- | --- |
| range | <code>Range</code> | 
| base | <code>string</code> \| <code>object</code> | 
| [ignoreClass] | <code>string</code> | 

<a name="EpubCFI+parse"></a>

## epubCFI.parse(hash) ⇒ [<code>EpubCFI</code>](#EpubCFI)
Parse a cfi string to a EpubCFI object representation

**Kind**: instance method of [<code>EpubCFI</code>](#EpubCFI)  
**Returns**: [<code>EpubCFI</code>](#EpubCFI) - EpubCFI object  
**Todo**

- [ ] Comparison of the base component from the parse method


| Param | Type | Description |
| --- | --- | --- |
| hash | <code>string</code> | EpubCFI string format |

<a name="EpubCFI+toRange"></a>

## epubCFI.toRange([doc], [ignoreClass]) ⇒ <code>Range</code>
Creates a DOM range representing a CFI

**Kind**: instance method of [<code>EpubCFI</code>](#EpubCFI)  

| Param | Type | Description |
| --- | --- | --- |
| [doc] | <code>Document</code> | document referenced in the base |
| [ignoreClass] | <code>string</code> |  |

<a name="EpubCFI+toString"></a>

## epubCFI.toString() ⇒ <code>string</code>
Convert CFI to a epubcfi(...) string

**Kind**: instance method of [<code>EpubCFI</code>](#EpubCFI)  
**Returns**: <code>string</code> - EpubCFI string format  
<a name="EpubCFI+destroy"></a>

## epubCFI.destroy()
Destroy the EpubCFI object

**Kind**: instance method of [<code>EpubCFI</code>](#EpubCFI)  
<a name="EpubCFI.base"></a>

## EpubCFI.base : <code>object</code>
Base component

**Kind**: static property of [<code>EpubCFI</code>](#EpubCFI)  
**Read only**: true  
<a name="EpubCFI.hash"></a>

## EpubCFI.hash : <code>string</code>
EpubCFI string format

**Kind**: static property of [<code>EpubCFI</code>](#EpubCFI)  
**Read only**: true  
<a name="EpubCFI.ignoreClass"></a>

## EpubCFI.ignoreClass : <code>string</code>
**Kind**: static property of [<code>EpubCFI</code>](#EpubCFI)  
**Read only**: true  
<a name="EpubCFI.path"></a>

## EpubCFI.path : <code>object</code>
Path component

**Kind**: static property of [<code>EpubCFI</code>](#EpubCFI)  
**Read only**: true  
<a name="EpubCFI.range"></a>

## EpubCFI.range : <code>boolean</code>
**Kind**: static property of [<code>EpubCFI</code>](#EpubCFI)  
**Read only**: true  
<a name="EpubCFI.spinePos"></a>

## EpubCFI.spinePos : <code>number</code>
Spine position

**Kind**: static property of [<code>EpubCFI</code>](#EpubCFI)  
**Read only**: true  
<a name="EpubCFI.start"></a>

## EpubCFI.start : <code>object</code>
Start component

**Kind**: static property of [<code>EpubCFI</code>](#EpubCFI)  
**Read only**: true  
<a name="EpubCFI.end"></a>

## EpubCFI.end : <code>object</code>
End component

**Kind**: static property of [<code>EpubCFI</code>](#EpubCFI)  
**Read only**: true  
<a name="EpubCFI.type"></a>

## EpubCFI.type : <code>string</code>
**Kind**: static property of [<code>EpubCFI</code>](#EpubCFI)  
**Read only**: true  
