<a name="Resources"></a>

# Resources ⇐ <code>Map</code>
<p>Assets container for URL replacements</p>

**Kind**: global class  
**Extends**: <code>Map</code>  

* [Resources](#Resources) ⇐ <code>Map</code>
    * [new Resources(request, resolve, [replacements])](#new_Resources_new)
    * [.clear()](#Resources+clear)
    * [.createUrl(href, [mimeType])](#Resources+createUrl) ⇒ <code>Promise.&lt;string&gt;</code>
    * [.revokeUrl(url)](#Resources+revokeUrl) ⇒ <code>Object</code>
    * [.substitute(content, section)](#Resources+substitute)
    * [.unpack(manifest, archive, storage)](#Resources+unpack) ⇒ [<code>Promise.&lt;Resources&gt;</code>](#Resources)
    * [.destroy()](#Resources+destroy)

<a name="new_Resources_new"></a>

## new Resources(request, resolve, [replacements])
<p>Constructor</p>


| Param | Type | Default |
| --- | --- | --- |
| request | <code>function</code> |  | 
| resolve | <code>function</code> |  | 
| [replacements] | <code>string</code> | <code>null</code> | 

<a name="Resources+clear"></a>

## resources.clear()
<p>Clear replacement URLs</p>

**Kind**: instance method of [<code>Resources</code>](#Resources)  
<a name="Resources+createUrl"></a>

## resources.createUrl(href, [mimeType]) ⇒ <code>Promise.&lt;string&gt;</code>
<p>Create a url to a resource</p>

**Kind**: instance method of [<code>Resources</code>](#Resources)  
**Returns**: <code>Promise.&lt;string&gt;</code> - <p>Promise resolves with url string</p>  

| Param | Type |
| --- | --- |
| href | <code>string</code> | 
| [mimeType] | <code>string</code> | 

<a name="Resources+revokeUrl"></a>

## resources.revokeUrl(url) ⇒ <code>Object</code>
<p>Revoke URL for a resource item</p>

**Kind**: instance method of [<code>Resources</code>](#Resources)  
**Returns**: <code>Object</code> - <p>Result:</p>
<ol start="0">
<li>no-replacements</li>
<li>replacements</li>
<li>success</li>
</ol>  

| Param | Type |
| --- | --- |
| url | <code>string</code> | 

<a name="Resources+substitute"></a>

## resources.substitute(content, section)
<p>Substitute urls in content, with replacements,
relative to a url if provided</p>

**Kind**: instance method of [<code>Resources</code>](#Resources)  

| Param | Type |
| --- | --- |
| content | <code>string</code> | 
| section | <code>Section</code> | 

<a name="Resources+unpack"></a>

## resources.unpack(manifest, archive, storage) ⇒ [<code>Promise.&lt;Resources&gt;</code>](#Resources)
<p>Unpack resources from manifest</p>

**Kind**: instance method of [<code>Resources</code>](#Resources)  

| Param | Type |
| --- | --- |
| manifest | <code>Manifest</code> | 
| archive | <code>Archive</code> | 
| storage | <code>Storage</code> | 

<a name="Resources+destroy"></a>

## resources.destroy()
<p>destroy</p>

**Kind**: instance method of [<code>Resources</code>](#Resources)  
