<a name="Resources"></a>

# Resources ⇐ <code>Map</code>
Assets container for URL replacements

**Kind**: global class  
**Extends**: <code>Map</code>  

* [Resources](#Resources) ⇐ <code>Map</code>
    * [new Resources(request, resolve, [replacements])](#new_Resources_new)
    * [.substitute(content, section)](#Resources+substitute)
    * [.unpack(manifest, [archive])](#Resources+unpack) ⇒ [<code>Promise.&lt;Resources&gt;</code>](#Resources)
    * [.destroy()](#Resources+destroy)

<a name="new_Resources_new"></a>

## new Resources(request, resolve, [replacements])
Constructor


| Param | Type | Default |
| --- | --- | --- |
| request | <code>function</code> |  | 
| resolve | <code>function</code> |  | 
| [replacements] | <code>string</code> | <code>null</code> | 

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

## resources.unpack(manifest, [archive]) ⇒ [<code>Promise.&lt;Resources&gt;</code>](#Resources)
Unpack resources from manifest

**Kind**: instance method of [<code>Resources</code>](#Resources)  

| Param | Type |
| --- | --- |
| manifest | <code>Manifest</code> | 
| [archive] | <code>Archive</code> | 

<a name="Resources+destroy"></a>

## resources.destroy()
destroy

**Kind**: instance method of [<code>Resources</code>](#Resources)  
