<a name="Storage"></a>

# Storage ⇐ <code>Input</code>
Handles saving and requesting files from local storage

**Kind**: global class  
**Extends**: <code>Input</code>  

* [Storage](#Storage) ⇐ <code>Input</code>
    * [new Storage(name)](#new_Storage_new)
    * _instance_
        * [.createInstance()](#Storage+createInstance)
        * [.get(input)](#Storage+get) ⇒ <code>Promise.&lt;any&gt;</code>
        * [.set(input, data)](#Storage+set) ⇒ <code>Promise.&lt;(ArrayBuffer\|null)&gt;</code>
        * [.put(url)](#Storage+put) ⇒ <code>Promise.&lt;ArrayBuffer&gt;</code>
        * [.dispatch(url, [type], [withCredentials], [headers])](#Storage+dispatch) ⇒ <code>Promise.&lt;(Blob\|string\|JSON\|Document\|XMLDocument)&gt;</code>
        * [.getBlob(url, [mimeType])](#Storage+getBlob) ⇒ <code>Promise.&lt;(Blob\|null)&gt;</code>
        * [.getText(url, [mimeType])](#Storage+getText) ⇒ <code>Promise.&lt;(string\|null)&gt;</code>
        * [.getBase64(url, [mimeType])](#Storage+getBase64) ⇒ <code>Promise.&lt;(string\|null)&gt;</code>
        * [.unpack(spine, resolve)](#Storage+unpack) ⇒ [<code>Promise.&lt;Storage&gt;</code>](#Storage)
        * [.destroy()](#Storage+destroy)
    * _static_
        * [.name](#Storage.name) : <code>string</code>
        * [.online](#Storage.online) : <code>boolean</code>

<a name="new_Storage_new"></a>

## new Storage(name)
Constructor


| Param | Type | Description |
| --- | --- | --- |
| name | <code>string</code> | This should be the name of the application for modals |

<a name="Storage+createInstance"></a>

## storage.createInstance()
Create LocalForage instance

**Kind**: instance method of [<code>Storage</code>](#Storage)  
<a name="Storage+get"></a>

## storage.get(input) ⇒ <code>Promise.&lt;any&gt;</code>
Get entry from Storage

**Kind**: instance method of [<code>Storage</code>](#Storage)  

| Param | Type | Description |
| --- | --- | --- |
| input | <code>string</code> \| <code>number</code> | key |

**Example**  
```js
storage.get(0).then(data => ...)
```
**Example**  
```js
storage.get('https://example.com/to/book.epub').then(data => ...)
```
<a name="Storage+set"></a>

## storage.set(input, data) ⇒ <code>Promise.&lt;(ArrayBuffer\|null)&gt;</code>
Set data into Storage

**Kind**: instance method of [<code>Storage</code>](#Storage)  

| Param | Type |
| --- | --- |
| input | <code>string</code> \| <code>number</code> | 
| data | <code>ArrayBuffer</code> | 

<a name="Storage+put"></a>

## storage.put(url) ⇒ <code>Promise.&lt;ArrayBuffer&gt;</code>
Put data into Storage

**Kind**: instance method of [<code>Storage</code>](#Storage)  

| Param | Type |
| --- | --- |
| url | <code>string</code> | 

<a name="Storage+dispatch"></a>

## storage.dispatch(url, [type], [withCredentials], [headers]) ⇒ <code>Promise.&lt;(Blob\|string\|JSON\|Document\|XMLDocument)&gt;</code>
Dispatch a request by URL

**Kind**: instance method of [<code>Storage</code>](#Storage)  

| Param | Type | Description |
| --- | --- | --- |
| url | <code>string</code> | a url to request from storage |
| [type] | <code>string</code> | specify the type of the returned result |
| [withCredentials] | <code>boolean</code> |  |
| [headers] | <code>Array.&lt;string&gt;</code> |  |

<a name="Storage+getBlob"></a>

## storage.getBlob(url, [mimeType]) ⇒ <code>Promise.&lt;(Blob\|null)&gt;</code>
Get a Blob from Storage by URL

**Kind**: instance method of [<code>Storage</code>](#Storage)  

| Param | Type |
| --- | --- |
| url | <code>string</code> | 
| [mimeType] | <code>string</code> | 

<a name="Storage+getText"></a>

## storage.getText(url, [mimeType]) ⇒ <code>Promise.&lt;(string\|null)&gt;</code>
Get a Text from Storage by URL

**Kind**: instance method of [<code>Storage</code>](#Storage)  

| Param | Type |
| --- | --- |
| url | <code>string</code> | 
| [mimeType] | <code>string</code> | 

<a name="Storage+getBase64"></a>

## storage.getBase64(url, [mimeType]) ⇒ <code>Promise.&lt;(string\|null)&gt;</code>
Get a base64 encoded result from Storage by URL

**Kind**: instance method of [<code>Storage</code>](#Storage)  
**Returns**: <code>Promise.&lt;(string\|null)&gt;</code> - base64 encoded  

| Param | Type |
| --- | --- |
| url | <code>string</code> | 
| [mimeType] | <code>string</code> | 

<a name="Storage+unpack"></a>

## storage.unpack(spine, resolve) ⇒ [<code>Promise.&lt;Storage&gt;</code>](#Storage)
Unpack spine items into Storage

**Kind**: instance method of [<code>Storage</code>](#Storage)  
**Returns**: [<code>Promise.&lt;Storage&gt;</code>](#Storage) - store objects  

| Param | Type |
| --- | --- |
| spine | <code>Spine</code> | 
| resolve | <code>function</code> | 

<a name="Storage+destroy"></a>

## storage.destroy()
destroy

**Kind**: instance method of [<code>Storage</code>](#Storage)  
<a name="Storage.name"></a>

## Storage.name : <code>string</code>
**Kind**: static property of [<code>Storage</code>](#Storage)  
**Read only**: true  
<a name="Storage.online"></a>

## Storage.online : <code>boolean</code>
Current status

**Kind**: static property of [<code>Storage</code>](#Storage)  
**Read only**: true  
