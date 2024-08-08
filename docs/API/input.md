<a name="Input"></a>

# Input
Base class for Archive and Storage

**Kind**: global class  

* [Input](#Input)
    * [new Input()](#new_Input_new)
    * _instance_
        * [.clear()](#Input+clear)
        * [.request(url, [type])](#Input+request) ⇒ <code>Promise.&lt;(Blob\|string\|JSON\|Document\|XMLDocument)&gt;</code>
        * [.handleResponse(response, [type])](#Input+handleResponse) ⇒ <code>any</code>
        * *[.getBlob(url, [mimeType])](#Input+getBlob) ⇒ <code>Promise.&lt;(Blob\|null)&gt;</code>*
        * *[.getText(url, [mimeType])](#Input+getText) ⇒ <code>Promise.&lt;(string\|null)&gt;</code>*
        * *[.getBase64(url, [mimeType])](#Input+getBase64) ⇒ <code>Promise.&lt;(string\|null)&gt;</code>*
        * [.createUrl(url, [options])](#Input+createUrl) ⇒ <code>Promise.&lt;string&gt;</code>
        * [.revokeUrl(url)](#Input+revokeUrl)
        * [.destroy()](#Input+destroy)
    * _static_
        * [.instance](#Input.instance) : <code>object</code>
        * [.urlCache](#Input.urlCache) : <code>object</code>

<a name="new_Input_new"></a>

## new Input()
Constructor

<a name="Input+clear"></a>

## input.clear()
Clear the Archive cache

**Kind**: instance method of [<code>Input</code>](#Input)  
<a name="Input+request"></a>

## input.request(url, [type]) ⇒ <code>Promise.&lt;(Blob\|string\|JSON\|Document\|XMLDocument)&gt;</code>
Request a url from the archive

**Kind**: instance method of [<code>Input</code>](#Input)  

| Param | Type | Description |
| --- | --- | --- |
| url | <code>string</code> | a url to request from the archive |
| [type] | <code>string</code> | specify the type of the returned result |

<a name="Input+handleResponse"></a>

## input.handleResponse(response, [type]) ⇒ <code>any</code>
Handle the response from request

**Kind**: instance method of [<code>Input</code>](#Input)  
**Returns**: <code>any</code> - the parsed result  

| Param | Type |
| --- | --- |
| response | <code>any</code> | 
| [type] | <code>string</code> | 

<a name="Input+getBlob"></a>

## *input.getBlob(url, [mimeType]) ⇒ <code>Promise.&lt;(Blob\|null)&gt;</code>*
Get a Blob from entries by URL

**Kind**: instance abstract method of [<code>Input</code>](#Input)  

| Param | Type |
| --- | --- |
| url | <code>string</code> | 
| [mimeType] | <code>string</code> | 

<a name="Input+getText"></a>

## *input.getText(url, [mimeType]) ⇒ <code>Promise.&lt;(string\|null)&gt;</code>*
Get a Text from entries by URL

**Kind**: instance abstract method of [<code>Input</code>](#Input)  

| Param | Type |
| --- | --- |
| url | <code>string</code> | 
| [mimeType] | <code>string</code> | 

<a name="Input+getBase64"></a>

## *input.getBase64(url, [mimeType]) ⇒ <code>Promise.&lt;(string\|null)&gt;</code>*
Get a base64 encoded result from entries by URL

**Kind**: instance abstract method of [<code>Input</code>](#Input)  
**Returns**: <code>Promise.&lt;(string\|null)&gt;</code> - base64 encoded  

| Param | Type |
| --- | --- |
| url | <code>string</code> | 
| [mimeType] | <code>string</code> | 

<a name="Input+createUrl"></a>

## input.createUrl(url, [options]) ⇒ <code>Promise.&lt;string&gt;</code>
Create a URL from a stored item

**Kind**: instance method of [<code>Input</code>](#Input)  
**Returns**: <code>Promise.&lt;string&gt;</code> - url promise with Url string  

| Param | Type | Description |
| --- | --- | --- |
| url | <code>string</code> |  |
| [options] | <code>object</code> |  |
| [options.base64] | <code>string</code> | use base64 encoding or blob url |

<a name="Input+revokeUrl"></a>

## input.revokeUrl(url)
Revoke Temp Url for a archive item

**Kind**: instance method of [<code>Input</code>](#Input)  

| Param | Type | Description |
| --- | --- | --- |
| url | <code>string</code> | url of the item in the store |

<a name="Input+destroy"></a>

## input.destroy()
destroy

**Kind**: instance method of [<code>Input</code>](#Input)  
<a name="Input.instance"></a>

## Input.instance : <code>object</code>
**Kind**: static property of [<code>Input</code>](#Input)  
**Read only**: true  
<a name="Input.urlCache"></a>

## Input.urlCache : <code>object</code>
**Kind**: static property of [<code>Input</code>](#Input)  
**Read only**: true  