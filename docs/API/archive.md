<a name="Archive"></a>

# Archive ⇐ <code>Input</code>
Handles Unzipping a requesting files from an Epub Archive

**Kind**: global class  
**Extends**: <code>Input</code>  

* [Archive](#Archive) ⇐ <code>Input</code>
    * [.createInstance()](#Archive+createInstance)
    * [.open(input, [encoding])](#Archive+open) ⇒ <code>Promise.&lt;any&gt;</code>
    * [.clear()](#Archive+clear)
    * [.openUrl(zipUrl, [isBase64])](#Archive+openUrl) ⇒ <code>Promise.&lt;any&gt;</code>
    * [.getBlob(url, [mimeType])](#Archive+getBlob) ⇒ <code>Promise.&lt;(Blob\|null)&gt;</code>
    * [.getText(url)](#Archive+getText) ⇒ <code>Promise.&lt;(string\|null)&gt;</code>
    * [.getBase64(url, [mimeType])](#Archive+getBase64) ⇒ <code>Promise.&lt;(string\|null)&gt;</code>

<a name="Archive+createInstance"></a>

## archive.createInstance()
Create JSZip instance

**Kind**: instance method of [<code>Archive</code>](#Archive)  
<a name="Archive+open"></a>

## archive.open(input, [encoding]) ⇒ <code>Promise.&lt;any&gt;</code>
Open an archive

**Kind**: instance method of [<code>Archive</code>](#Archive)  
**Returns**: <code>Promise.&lt;any&gt;</code> - zipfile  

| Param | Type | Description |
| --- | --- | --- |
| input | <code>string</code> \| <code>ArrayBuffer</code> |  |
| [encoding] | <code>string</code> | tells JSZip if the input data is base64 encoded |

<a name="Archive+clear"></a>

## archive.clear()
Clear the JSZip.files to empty

**Kind**: instance method of [<code>Archive</code>](#Archive)  
<a name="Archive+openUrl"></a>

## archive.openUrl(zipUrl, [isBase64]) ⇒ <code>Promise.&lt;any&gt;</code>
Load and Open an archive

**Kind**: instance method of [<code>Archive</code>](#Archive)  
**Returns**: <code>Promise.&lt;any&gt;</code> - zipfile  

| Param | Type | Description |
| --- | --- | --- |
| zipUrl | <code>string</code> |  |
| [isBase64] | <code>boolean</code> | tells JSZip if the input data is base64 encoded |

<a name="Archive+getBlob"></a>

## archive.getBlob(url, [mimeType]) ⇒ <code>Promise.&lt;(Blob\|null)&gt;</code>
Get a Blob from Archive by URL

**Kind**: instance method of [<code>Archive</code>](#Archive)  

| Param | Type |
| --- | --- |
| url | <code>string</code> | 
| [mimeType] | <code>string</code> | 

<a name="Archive+getText"></a>

## archive.getText(url) ⇒ <code>Promise.&lt;(string\|null)&gt;</code>
Get Text from Archive by URL

**Kind**: instance method of [<code>Archive</code>](#Archive)  

| Param | Type |
| --- | --- |
| url | <code>string</code> | 

<a name="Archive+getBase64"></a>

## archive.getBase64(url, [mimeType]) ⇒ <code>Promise.&lt;(string\|null)&gt;</code>
Get a base64 encoded result from Archive by URL

**Kind**: instance method of [<code>Archive</code>](#Archive)  
**Returns**: <code>Promise.&lt;(string\|null)&gt;</code> - base64 encoded  

| Param | Type |
| --- | --- |
| url | <code>string</code> | 
| [mimeType] | <code>string</code> | 

