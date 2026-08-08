<a name="module_core"></a>

# core

* [core](#module_core)
    * [.uuid](#module_core.uuid) ⇒ <code>string</code>
    * [.documentHeight](#module_core.documentHeight) ⇒ <code>number</code>
    * [.isElement](#module_core.isElement) ⇒ <code>boolean</code>
    * [.isNumber](#module_core.isNumber) ⇒ <code>boolean</code>
    * [.isFloat](#module_core.isFloat) ⇒ <code>boolean</code>
    * [.prefixed](#module_core.prefixed) ⇒ <code>string</code>
    * [.defaults](#module_core.defaults) ⇒ <code>object</code>
    * [.extend](#module_core.extend) ⇒ <code>object</code>
    * [.insert](#module_core.insert) ⇒ <code>number</code>
    * [.indexOfSorted](#module_core.indexOfSorted) ⇒ <code>number</code>
    * [.bounds](#module_core.bounds) ⇒ <code>Object</code>
    * [.borders](#module_core.borders) ⇒ <code>Object</code>
    * [.nodeBounds](#module_core.nodeBounds) ⇒ <code>DOMRect</code>
    * [.windowBounds](#module_core.windowBounds) ⇒ <code>Object</code>
    * [.indexOfNode](#module_core.indexOfNode) ⇒ <code>number</code>
    * [.indexOfTextNode](#module_core.indexOfTextNode) ⇒ <code>number</code>
    * [.indexOfElementNode](#module_core.indexOfElementNode) ⇒ <code>number</code>
    * [.isXml](#module_core.isXml) ⇒ <code>boolean</code>
    * [.createBlob](#module_core.createBlob) ⇒ <code>Blob</code>
    * [.createBlobUrl](#module_core.createBlobUrl) ⇒ <code>string</code>
    * [.revokeBlobUrl](#module_core.revokeBlobUrl)
    * [.createBase64Url](#module_core.createBase64Url) ⇒ <code>string</code>
    * [.type](#module_core.type) ⇒ <code>string</code>
    * [.parse](#module_core.parse) ⇒ <code>Document</code>
    * [.qs](#module_core.qs) ⇒ <code>Element</code>
    * [.qsa](#module_core.qsa) ⇒ <code>Array.&lt;Element&gt;</code>
    * [.qsp](#module_core.qsp) ⇒ <code>Array.&lt;Element&gt;</code>
    * [.sprint](#module_core.sprint)
    * [.treeWalker](#module_core.treeWalker)
    * [.walk](#module_core.walk) ⇒ <code>boolean</code>
    * [.blob2base64](#module_core.blob2base64) ⇒ <code>Promise.&lt;string&gt;</code>
    * [.querySelectorByType](#module_core.querySelectorByType) ⇒ <code>Array.&lt;Element&gt;</code>
    * [.findChildren](#module_core.findChildren) ⇒ <code>Array.&lt;Element&gt;</code>
    * [.parents](#module_core.parents) ⇒ <code>Array.&lt;Node&gt;</code>
    * [.filterChildren](#module_core.filterChildren) ⇒ <code>Array.&lt;Element&gt;</code>
    * [.getParentByTagName](#module_core.getParentByTagName) ⇒ <code>Array.&lt;Node&gt;</code>

<a name="module_core.uuid"></a>

## core.uuid ⇒ <code>string</code>
<p>Generates a UUID</p>

**Kind**: static constant of [<code>core</code>](#module_core)  
**Returns**: <code>string</code> - <p>uuid</p>  
**Link**: https://stackoverflow.com/questions/105034/how-do-i-create-a-guid-uuid  
<a name="module_core.documentHeight"></a>

## core.documentHeight ⇒ <code>number</code>
<p>Gets the height of a document</p>

**Kind**: static constant of [<code>core</code>](#module_core)  
**Returns**: <code>number</code> - <p>height</p>  
<a name="module_core.isElement"></a>

## core.isElement ⇒ <code>boolean</code>
<p>Checks if a node is an element</p>

**Kind**: static constant of [<code>core</code>](#module_core)  

| Param | Type |
| --- | --- |
| obj | <code>object</code> | 

<a name="module_core.isNumber"></a>

## core.isNumber ⇒ <code>boolean</code>
<p>isNumber</p>

**Kind**: static constant of [<code>core</code>](#module_core)  

| Param | Type |
| --- | --- |
| n | <code>any</code> | 

<a name="module_core.isFloat"></a>

## core.isFloat ⇒ <code>boolean</code>
<p>isFloat</p>

**Kind**: static constant of [<code>core</code>](#module_core)  

| Param | Type |
| --- | --- |
| n | <code>any</code> | 

<a name="module_core.prefixed"></a>

## core.prefixed ⇒ <code>string</code>
<p>Get a prefixed css property</p>

**Kind**: static constant of [<code>core</code>](#module_core)  

| Param | Type |
| --- | --- |
| unprefixed | <code>string</code> | 

<a name="module_core.defaults"></a>

## core.defaults ⇒ <code>object</code>
<p>Apply defaults to an object</p>

**Kind**: static constant of [<code>core</code>](#module_core)  

| Param | Type |
| --- | --- |
| obj | <code>object</code> | 

<a name="module_core.extend"></a>

## core.extend ⇒ <code>object</code>
<p>Extend properties of an object</p>

**Kind**: static constant of [<code>core</code>](#module_core)  

| Param | Type |
| --- | --- |
| target | <code>object</code> | 

<a name="module_core.insert"></a>

## core.insert ⇒ <code>number</code>
<p>Fast quicksort insert for sorted array -- based on:</p>

**Kind**: static constant of [<code>core</code>](#module_core)  
**Returns**: <code>number</code> - <p>location (in array)</p>  
**Link**: https://stackoverflow.com/questions/1344500/efficient-way-to-insert-a-number-into-a-sorted-array-of-numbers  

| Param | Type |
| --- | --- |
| item | <code>any</code> | 
| array | <code>array</code> | 
| [compareFunction] | <code>function</code> | 

<a name="module_core.indexOfSorted"></a>

## core.indexOfSorted ⇒ <code>number</code>
<p>Finds index of something in a sorted array
Returns -1 if not found</p>

**Kind**: static constant of [<code>core</code>](#module_core)  
**Returns**: <code>number</code> - <p>index (in array) or -1</p>  

| Param | Type |
| --- | --- |
| item | <code>any</code> | 
| array | <code>array</code> | 
| [compareFunction] | <code>function</code> | 
| [start] | <code>function</code> | 
| [end] | <code>function</code> | 

<a name="module_core.bounds"></a>

## core.bounds ⇒ <code>Object</code>
<p>Find the bounds of an element
taking padding and margin into account</p>

**Kind**: static constant of [<code>core</code>](#module_core)  

| Param | Type |
| --- | --- |
| el | <code>Element</code> | 

<a name="module_core.borders"></a>

## core.borders ⇒ <code>Object</code>
<p>Find the bounds of an element
taking padding, margin and borders into account</p>

**Kind**: static constant of [<code>core</code>](#module_core)  

| Param | Type |
| --- | --- |
| el | <code>Element</code> | 

<a name="module_core.nodeBounds"></a>

## core.nodeBounds ⇒ <code>DOMRect</code>
<p>Find the bounds of any node
allows for getting bounds of text nodes by wrapping them in a range</p>

**Kind**: static constant of [<code>core</code>](#module_core)  

| Param | Type |
| --- | --- |
| node | <code>Node</code> | 

<a name="module_core.windowBounds"></a>

## core.windowBounds ⇒ <code>Object</code>
<p>Find the equivalent of getBoundingClientRect of a browser window</p>

**Kind**: static constant of [<code>core</code>](#module_core)  
<a name="module_core.indexOfNode"></a>

## core.indexOfNode ⇒ <code>number</code>
<p>Gets the index of a node in its parent</p>

**Kind**: static constant of [<code>core</code>](#module_core)  
**Returns**: <code>number</code> - <p>index</p>  

| Param | Type |
| --- | --- |
| node | <code>Node</code> | 
| typeId | <code>string</code> | 

<a name="module_core.indexOfTextNode"></a>

## core.indexOfTextNode ⇒ <code>number</code>
<p>Gets the index of a text node in its parent</p>

**Kind**: static constant of [<code>core</code>](#module_core)  
**Returns**: <code>number</code> - <p>index</p>  

| Param | Type |
| --- | --- |
| textNode | <code>Node</code> | 

<a name="module_core.indexOfElementNode"></a>

## core.indexOfElementNode ⇒ <code>number</code>
<p>Gets the index of an element node in its parent</p>

**Kind**: static constant of [<code>core</code>](#module_core)  
**Returns**: <code>number</code> - <p>index</p>  

| Param | Type |
| --- | --- |
| elementNode | <code>Element</code> | 

<a name="module_core.isXml"></a>

## core.isXml ⇒ <code>boolean</code>
<p>Check if extension is xml</p>

**Kind**: static constant of [<code>core</code>](#module_core)  

| Param | Type |
| --- | --- |
| ext | <code>string</code> | 

<a name="module_core.createBlob"></a>

## core.createBlob ⇒ <code>Blob</code>
<p>Create a new blob</p>

**Kind**: static constant of [<code>core</code>](#module_core)  

| Param | Type |
| --- | --- |
| content | <code>any</code> | 
| mime | <code>string</code> | 

<a name="module_core.createBlobUrl"></a>

## core.createBlobUrl ⇒ <code>string</code>
<p>Create a new blob url</p>

**Kind**: static constant of [<code>core</code>](#module_core)  
**Returns**: <code>string</code> - <p>url</p>  

| Param | Type |
| --- | --- |
| content | <code>any</code> | 
| mime | <code>string</code> | 

<a name="module_core.revokeBlobUrl"></a>

## core.revokeBlobUrl
<p>Remove a blob url</p>

**Kind**: static constant of [<code>core</code>](#module_core)  

| Param | Type |
| --- | --- |
| url | <code>string</code> | 

<a name="module_core.createBase64Url"></a>

## core.createBase64Url ⇒ <code>string</code>
<p>Create a new base64 encoded url</p>

**Kind**: static constant of [<code>core</code>](#module_core)  
**Returns**: <code>string</code> - <p>url</p>  

| Param | Type |
| --- | --- |
| content | <code>any</code> | 
| mime | <code>string</code> | 

<a name="module_core.type"></a>

## core.type ⇒ <code>string</code>
<p>Get type of an object</p>

**Kind**: static constant of [<code>core</code>](#module_core)  
**Returns**: <code>string</code> - <p>type</p>  

| Param | Type |
| --- | --- |
| obj | <code>object</code> | 

<a name="module_core.parse"></a>

## core.parse ⇒ <code>Document</code>
<p>Parse xml (or html) markup</p>

**Kind**: static constant of [<code>core</code>](#module_core)  
**Returns**: <code>Document</code> - <p>document</p>  

| Param | Type |
| --- | --- |
| markup | <code>string</code> | 
| mime | <code>string</code> | 

<a name="module_core.qs"></a>

## core.qs ⇒ <code>Element</code>
<p>querySelector polyfill</p>

**Kind**: static constant of [<code>core</code>](#module_core)  
**Returns**: <code>Element</code> - <p>element</p>  

| Param | Type | Description |
| --- | --- | --- |
| el | <code>Element</code> |  |
| sel | <code>string</code> | <p>selector string</p> |

<a name="module_core.qsa"></a>

## core.qsa ⇒ <code>Array.&lt;Element&gt;</code>
<p>querySelectorAll polyfill</p>

**Kind**: static constant of [<code>core</code>](#module_core)  
**Returns**: <code>Array.&lt;Element&gt;</code> - <p>elements</p>  

| Param | Type | Description |
| --- | --- | --- |
| el | <code>Element</code> |  |
| sel | <code>string</code> | <p>selector string</p> |

<a name="module_core.qsp"></a>

## core.qsp ⇒ <code>Array.&lt;Element&gt;</code>
<p>querySelector by property</p>

**Kind**: static constant of [<code>core</code>](#module_core)  
**Returns**: <code>Array.&lt;Element&gt;</code> - <p>elements</p>  

| Param | Type | Description |
| --- | --- | --- |
| el | <code>Element</code> |  |
| sel | <code>string</code> | <p>selector string</p> |
| props | <code>Array.&lt;object&gt;</code> |  |

<a name="module_core.sprint"></a>

## core.sprint
<p>Sprint through all text nodes in a document</p>

**Kind**: static constant of [<code>core</code>](#module_core)  

| Param | Type | Description |
| --- | --- | --- |
| root | <code>Element</code> | <p>element to start with</p> |
| func | <code>function</code> | <p>function to run on each element</p> |

<a name="module_core.treeWalker"></a>

## core.treeWalker
<p>Create a treeWalker</p>

**Kind**: static constant of [<code>core</code>](#module_core)  

| Param | Type | Description |
| --- | --- | --- |
| root | <code>Element</code> | <p>element to start with</p> |
| func | <code>function</code> | <p>function to run on each element</p> |
| filter | <code>function</code> \| <code>object</code> | <p>function or object to filter with</p> |

<a name="module_core.walk"></a>

## core.walk ⇒ <code>boolean</code>
**Kind**: static constant of [<code>core</code>](#module_core)  

| Param | Type | Description |
| --- | --- | --- |
| node | <code>Node</code> |  |
| callback | <code>function</code> | <p>false for continue,true for break inside callback</p> |

<a name="module_core.blob2base64"></a>

## core.blob2base64 ⇒ <code>Promise.&lt;string&gt;</code>
<p>Convert a blob to a base64 encoded string</p>

**Kind**: static constant of [<code>core</code>](#module_core)  

| Param | Type |
| --- | --- |
| blob | <code>Blob</code> | 

<a name="module_core.querySelectorByType"></a>

## core.querySelectorByType ⇒ <code>Array.&lt;Element&gt;</code>
<p>querySelector with filter by epub type</p>

**Kind**: static constant of [<code>core</code>](#module_core)  
**Returns**: <code>Array.&lt;Element&gt;</code> - <p>elements</p>  

| Param | Type | Description |
| --- | --- | --- |
| html | <code>Element</code> |  |
| element | <code>string</code> | <p>element type to find</p> |
| type | <code>string</code> | <p>epub type to find</p> |

<a name="module_core.findChildren"></a>

## core.findChildren ⇒ <code>Array.&lt;Element&gt;</code>
<p>Find direct descendents of an element</p>

**Kind**: static constant of [<code>core</code>](#module_core)  
**Returns**: <code>Array.&lt;Element&gt;</code> - <p>children</p>  

| Param | Type |
| --- | --- |
| el | <code>Element</code> | 

<a name="module_core.parents"></a>

## core.parents ⇒ <code>Array.&lt;Node&gt;</code>
<p>Find all parents (ancestors) of an element</p>

**Kind**: static constant of [<code>core</code>](#module_core)  
**Returns**: <code>Array.&lt;Node&gt;</code> - <p>parents</p>  

| Param | Type |
| --- | --- |
| node | <code>Node</code> | 

<a name="module_core.filterChildren"></a>

## core.filterChildren ⇒ <code>Array.&lt;Element&gt;</code>
<p>Find all direct descendents of a specific type</p>

**Kind**: static constant of [<code>core</code>](#module_core)  
**Returns**: <code>Array.&lt;Element&gt;</code> - <p>children</p>  

| Param | Type |
| --- | --- |
| el | <code>Element</code> | 
| nodeName | <code>string</code> | 
| [single] | <code>boolean</code> | 

<a name="module_core.getParentByTagName"></a>

## core.getParentByTagName ⇒ <code>Array.&lt;Node&gt;</code>
<p>Filter all parents (ancestors) with tag name</p>

**Kind**: static constant of [<code>core</code>](#module_core)  
**Returns**: <code>Array.&lt;Node&gt;</code> - <p>parents</p>  

| Param | Type |
| --- | --- |
| node | <code>Node</code> | 
| tagname | <code>string</code> | 

