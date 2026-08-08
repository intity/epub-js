<a name="Archive"></a>

# Archive ⇐ <code>Input</code>
<p>Handles Unzipping a requesting files from an Epub Archive</p>

**Kind**: global class  
**Extends**: <code>Input</code>  

* [Archive](#Archive) ⇐ <code>Input</code>
    * [.createInstance()](#Archive+createInstance)
    * [.open(input, [encoding])](#Archive+open) ⇒ <code>Promise.&lt;any&gt;</code>
    * [.clear()](#Archive+clear)
    * [.openUrl(zipUrl, [isBase64])](#Archive+openUrl) ⇒ <code>Promise.&lt;any&gt;</code>
    * [.get(url)](#Archive+get) ⇒ <code>object</code>
    * [.getBlob(url, [mimeType])](#Archive+getBlob) ⇒ <code>Promise.&lt;(Blob\|null)&gt;</code>
    * [.getText(url)](#Archive+getText) ⇒ <code>Promise.&lt;(string\|null)&gt;</code>
    * [.getBase64(url, [mimeType])](#Archive+getBase64) ⇒ <code>Promise.&lt;(string\|null)&gt;</code>

<a name="Archive+createInstance"></a>

## archive.createInstance()
<p>Create JSZip instance</p>

**Kind**: instance method of [<code>Archive</code>](#Archive)  
<a name="Archive+open"></a>

## archive.open(input, [encoding]) ⇒ <code>Promise.&lt;any&gt;</code>
<p>Open an archive</p>

**Kind**: instance method of [<code>Archive</code>](#Archive)  
**Returns**: <code>Promise.&lt;any&gt;</code> - <p>zipfile</p>  

| Param | Type | Description |
| --- | --- | --- |
| input | <code>string</code> \| <code>ArrayBuffer</code> |  |
| [encoding] | <code>string</code> | <p>tells JSZip if the input data is base64 encoded</p> |

<a name="Archive+clear"></a>

## archive.clear()
<p>Clear the JSZip.files to empty</p>

**Kind**: instance method of [<code>Archive</code>](#Archive)  
<a name="Archive+openUrl"></a>

## archive.openUrl(zipUrl, [isBase64]) ⇒ <code>Promise.&lt;any&gt;</code>
<p>Load and Open an archive</p>

**Kind**: instance method of [<code>Archive</code>](#Archive)  
**Returns**: <code>Promise.&lt;any&gt;</code> - <p>zipfile</p>  

| Param | Type | Description |
| --- | --- | --- |
| zipUrl | <code>string</code> |  |
| [isBase64] | <code>boolean</code> | <p>tells JSZip if the input data is base64 encoded</p> |

<a name="Archive+get"></a>

## archive.get(url) ⇒ <code>object</code>
<p>Get entry from Archive</p>

**Kind**: instance method of [<code>Archive</code>](#Archive)  
**Returns**: <code>object</code> - <p>entry</p>  

| Param | Type |
| --- | --- |
| url | <code>string</code> | 

**Example**  
```js
archive.get("META-INF/container.xml")
```
<a name="Archive+getBlob"></a>

## archive.getBlob(url, [mimeType]) ⇒ <code>Promise.&lt;(Blob\|null)&gt;</code>
<p>Get a Blob from Archive by URL</p>

**Kind**: instance method of [<code>Archive</code>](#Archive)  

| Param | Type |
| --- | --- |
| url | <code>string</code> | 
| [mimeType] | <code>string</code> | 

<a name="Archive+getText"></a>

## archive.getText(url) ⇒ <code>Promise.&lt;(string\|null)&gt;</code>
<p>Get Text from Archive by URL</p>

**Kind**: instance method of [<code>Archive</code>](#Archive)  

| Param | Type |
| --- | --- |
| url | <code>string</code> | 

<a name="Archive+getBase64"></a>

## archive.getBase64(url, [mimeType]) ⇒ <code>Promise.&lt;(string\|null)&gt;</code>
<p>Get a base64 encoded result from Archive by URL</p>

**Kind**: instance method of [<code>Archive</code>](#Archive)  
**Returns**: <code>Promise.&lt;(string\|null)&gt;</code> - <p>base64 encoded</p>  

| Param | Type |
| --- | --- |
| url | <code>string</code> | 
| [mimeType] | <code>string</code> | 

