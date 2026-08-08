<a name="module_replacements"></a>

# replacements

* [replacements](#module_replacements)
    * [.replaceBase](#module_replacements.replaceBase)
    * [.replaceCanonical](#module_replacements.replaceCanonical)
    * [.replaceMeta](#module_replacements.replaceMeta)
    * [.replaceLinks](#module_replacements.replaceLinks) ⇒ <code>NodeList</code>
    * [.substitute](#module_replacements.substitute) ⇒ <code>string</code>

<a name="module_replacements.replaceBase"></a>

## replacements.replaceBase
<p>replaceBase</p>

**Kind**: static constant of [<code>replacements</code>](#module_replacements)  

| Param | Type |
| --- | --- |
| doc | <code>Document</code> | 
| section | <code>Section</code> | 

<a name="module_replacements.replaceCanonical"></a>

## replacements.replaceCanonical
<p>replaceCanonical</p>

**Kind**: static constant of [<code>replacements</code>](#module_replacements)  

| Param | Type |
| --- | --- |
| doc | <code>Document</code> | 
| section | <code>Section</code> | 

<a name="module_replacements.replaceMeta"></a>

## replacements.replaceMeta
<p>replaceMeta</p>

**Kind**: static constant of [<code>replacements</code>](#module_replacements)  

| Param | Type |
| --- | --- |
| doc | <code>Document</code> | 
| section | <code>Section</code> | 

<a name="module_replacements.replaceLinks"></a>

## replacements.replaceLinks ⇒ <code>NodeList</code>
<p>Replace links from node</p>

**Kind**: static constant of [<code>replacements</code>](#module_replacements)  
**Returns**: <code>NodeList</code> - <p>Replace links</p>  
**Todo**

- [ ] move me to Contents


| Param | Type | Description |
| --- | --- | --- |
| contents | <code>Node</code> |  |
| cb | <code>function</code> | <p>Callback function</p> |

**Example**  
```js
replaceLinks(node, (href) => { actions })
```
<a name="module_replacements.substitute"></a>

## replacements.substitute ⇒ <code>string</code>
<p>This function replaces all URLs in the content text block.</p>

**Kind**: static constant of [<code>replacements</code>](#module_replacements)  
**Returns**: <code>string</code> - <p>Modified content in text format.</p>  

| Param | Type | Description |
| --- | --- | --- |
| content | <code>string</code> | <p>Content in text format</p> |
| section | <code>Section</code> | <p>Section</p> |
| urls | <code>Array.&lt;string&gt;</code> | <p>URLs</p> |
| repl | <code>Array.&lt;string&gt;</code> | <p>Replacements array</p> |

