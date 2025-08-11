<a name="module_replacements"></a>

# replacements

* [replacements](#module_replacements)
    * [.replaceBase](#module_replacements.replaceBase)
    * [.replaceCanonical](#module_replacements.replaceCanonical)
    * [.replaceMeta](#module_replacements.replaceMeta)
    * [.replaceLinks](#module_replacements.replaceLinks) ⇒ <code>NodeList</code>
    * [.substitute](#module_replacements.substitute)

<a name="module_replacements.replaceBase"></a>

## replacements.replaceBase
replaceBase

**Kind**: static constant of [<code>replacements</code>](#module_replacements)  

| Param | Type |
| --- | --- |
| doc | <code>Document</code> | 
| section | <code>Section</code> | 

<a name="module_replacements.replaceCanonical"></a>

## replacements.replaceCanonical
replaceCanonical

**Kind**: static constant of [<code>replacements</code>](#module_replacements)  

| Param | Type |
| --- | --- |
| doc | <code>Document</code> | 
| section | <code>Section</code> | 

<a name="module_replacements.replaceMeta"></a>

## replacements.replaceMeta
replaceMeta

**Kind**: static constant of [<code>replacements</code>](#module_replacements)  

| Param | Type |
| --- | --- |
| doc | <code>Document</code> | 
| section | <code>Section</code> | 

<a name="module_replacements.replaceLinks"></a>

## replacements.replaceLinks ⇒ <code>NodeList</code>
Replace links from node

**Kind**: static constant of [<code>replacements</code>](#module_replacements)  
**Returns**: <code>NodeList</code> - Replace links  
**Todo**

- [ ] move me to Contents


| Param | Type | Description |
| --- | --- | --- |
| contents | <code>Node</code> |  |
| cb | <code>function</code> | Callback function |

**Example**  
```js
replaceLinks(node, (href) => { actions })
```
<a name="module_replacements.substitute"></a>

## replacements.substitute
substitute

**Kind**: static constant of [<code>replacements</code>](#module_replacements)  

| Param | Type |
| --- | --- |
| content | <code>string</code> | 
| urls | <code>Array.&lt;string&gt;</code> | 
| replacements | <code>Array.&lt;string&gt;</code> | 

