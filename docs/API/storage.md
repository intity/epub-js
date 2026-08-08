<a name="Storage"></a>

# Storage ⇐ <code>Input</code>
<p>Handles saving and requesting files from local storage</p>

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
        * [.destroy()](#Storage+destroy)
    * _static_
        * [.name](#Storage.name) : <code>string</code>
        * [.online](#Storage.online) : <code>boolean</code>

<a name="new_Storage_new"></a>

## new Storage(name)
<p>Constructor</p>


| Param | Type | Description |
| --- | --- | --- |
| name | <code>string</code> | <p>This should be the name of the application for modals</p> |

<a name="Storage+createInstance"></a>

## storage.createInstance()
<p>Create LocalForage instance</p>

**Kind**: instance method of [<code>Storage</code>](#Storage)  
<a name="Storage+get"></a>

## storage.get(input) ⇒ <code>Promise.&lt;any&gt;</code>
<p>Get entry from Storage</p>

**Kind**: instance method of [<code>Storage</code>](#Storage)  

| Param | Type | Description |
| --- | --- | --- |
| input | <code>string</code> \| <code>number</code> | <p>key</p> |

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
<p>Set data into Storage</p>

**Kind**: instance method of [<code>Storage</code>](#Storage)  

| Param | Type |
| --- | --- |
| input | <code>string</code> \| <code>number</code> | 
| data | <code>ArrayBuffer</code> | 

<a name="Storage+put"></a>

## storage.put(url) ⇒ <code>Promise.&lt;ArrayBuffer&gt;</code>
<p>Put data into Storage</p>

**Kind**: instance method of [<code>Storage</code>](#Storage)  

| Param | Type |
| --- | --- |
| url | <code>string</code> | 

<a name="Storage+dispatch"></a>

## storage.dispatch(url, [type], [withCredentials], [headers]) ⇒ <code>Promise.&lt;(Blob\|string\|JSON\|Document\|XMLDocument)&gt;</code>
<p>Dispatch a request by URL</p>

**Kind**: instance method of [<code>Storage</code>](#Storage)  

| Param | Type | Description |
| --- | --- | --- |
| url | <code>string</code> | <p>a url to request from storage</p> |
| [type] | <code>string</code> | <p>specify the type of the returned result</p> |
| [withCredentials] | <code>boolean</code> |  |
| [headers] | <code>Array.&lt;string&gt;</code> |  |

<a name="Storage+getBlob"></a>

## storage.getBlob(url, [mimeType]) ⇒ <code>Promise.&lt;(Blob\|null)&gt;</code>
<p>Get a Blob from Storage by URL</p>

**Kind**: instance method of [<code>Storage</code>](#Storage)  

| Param | Type |
| --- | --- |
| url | <code>string</code> | 
| [mimeType] | <code>string</code> | 

<a name="Storage+getText"></a>

## storage.getText(url, [mimeType]) ⇒ <code>Promise.&lt;(string\|null)&gt;</code>
<p>Get a Text from Storage by URL</p>

**Kind**: instance method of [<code>Storage</code>](#Storage)  

| Param | Type |
| --- | --- |
| url | <code>string</code> | 
| [mimeType] | <code>string</code> | 

<a name="Storage+getBase64"></a>

## storage.getBase64(url, [mimeType]) ⇒ <code>Promise.&lt;(string\|null)&gt;</code>
<p>Get a base64 encoded result from Storage by URL</p>

**Kind**: instance method of [<code>Storage</code>](#Storage)  
**Returns**: <code>Promise.&lt;(string\|null)&gt;</code> - <p>base64 encoded</p>  

| Param | Type |
| --- | --- |
| url | <code>string</code> | 
| [mimeType] | <code>string</code> | 

<a name="Storage+destroy"></a>

## storage.destroy()
<p>destroy</p>

**Kind**: instance method of [<code>Storage</code>](#Storage)  
<a name="Storage.name"></a>

## Storage.name : <code>string</code>
**Kind**: static property of [<code>Storage</code>](#Storage)  
**Read only**: true  
<a name="Storage.online"></a>

## Storage.online : <code>boolean</code>
<p>Current status</p>

**Kind**: static property of [<code>Storage</code>](#Storage)  
**Read only**: true  
