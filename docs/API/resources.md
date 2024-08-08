<a name="Resources"></a>

# Resources ⇐ <code>Map</code>
Assets container for URL replacements

**Kind**: global class  
**Extends**: <code>Map</code>  

* [Resources](#Resources) ⇐ <code>Map</code>
    * [new Resources(request, resolve, [replacements])](#new_Resources_new)
    * [.clear()](#Resources+clear)
    * [.createCss(href)](#Resources+createCss) ⇒ <code>Promise.&lt;string&gt;</code>
    * [.createUrl(href)](#Resources+createUrl) ⇒ <code>Promise.&lt;string&gt;</code>
    * [.revokeUrl(url)](#Resources+revokeUrl)
    * [.substitute(content, section)](#Resources+substitute)
    * [.unpack(manifest, archive, storage)](#Resources+unpack) ⇒ [<code>Promise.&lt;Resources&gt;</code>](#Resources)
    * [.destroy()](#Resources+destroy)

<a name="new_Resources_new"></a>

## new Resources(request, resolve, [replacements])
Constructor


| Param | Type | Default |
| --- | --- | --- |
| request | <code>function</code> |  | 
| resolve | <code>function</code> |  | 
| [replacements] | <code>string</code> | <code>null</code> | 

<a name="Resources+clear"></a>

## resources.clear()
Clear replacement URLs

**Kind**: instance method of [<code>Resources</code>](#Resources)  
<a name="Resources+createCss"></a>

## resources.createCss(href) ⇒ <code>Promise.&lt;string&gt;</code>
Create a new CSS file with the replaced URLs

**Kind**: instance method of [<code>Resources</code>](#Resources)  
**Returns**: <code>Promise.&lt;string&gt;</code> - returns a BlobUrl to the new CSS file or a data url  

| Param | Type | Description |
| --- | --- | --- |
| href | <code>string</code> | the original css file |

<a name="Resources+createUrl"></a>

## resources.createUrl(href) ⇒ <code>Promise.&lt;string&gt;</code>
Create a url to a resource

**Kind**: instance method of [<code>Resources</code>](#Resources)  
**Returns**: <code>Promise.&lt;string&gt;</code> - Promise resolves with url string  

| Param | Type |
| --- | --- |
| href | <code>string</code> | 

<a name="Resources+revokeUrl"></a>

## resources.revokeUrl(url)
Revoke URL for a resource item

**Kind**: instance method of [<code>Resources</code>](#Resources)  

| Param | Type |
| --- | --- |
| url | <code>string</code> | 

<a name="Resources+substitute"></a>

## resources.substitute(content, section)
Substitute urls in content, with replacements,
relative to a url if provided

**Kind**: instance method of [<code>Resources</code>](#Resources)  

| Param | Type |
| --- | --- |
| content | <code>string</code> | 
| section | <code>Section</code> | 

<a name="Resources+unpack"></a>

## resources.unpack(manifest, archive, storage) ⇒ [<code>Promise.&lt;Resources&gt;</code>](#Resources)
Unpack resources from manifest

**Kind**: instance method of [<code>Resources</code>](#Resources)  

| Param | Type |
| --- | --- |
| manifest | <code>Manifest</code> | 
| archive | <code>Archive</code> | 
| storage | <code>Storage</code> | 

<a name="Resources+destroy"></a>

## resources.destroy()
destroy

**Kind**: instance method of [<code>Resources</code>](#Resources)  
