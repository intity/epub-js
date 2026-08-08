<a name="Annotations"></a>

# Annotations
<p>Handles managing adding &amp; removing Annotations</p>

**Kind**: global class  

* [Annotations](#Annotations)
    * [new Annotations(rendition)](#new_Annotations_new)
    * [.append(type, cfiRange, [options])](#Annotations+append) ⇒ <code>Annotation</code>
    * [.remove(type, cfiRange)](#Annotations+remove)
    * [.show()](#Annotations+show)
    * [.hide()](#Annotations+hide)

<a name="new_Annotations_new"></a>

## new Annotations(rendition)
<p>Constructor</p>


| Param | Type |
| --- | --- |
| rendition | <code>Rendition</code> | 

<a name="Annotations+append"></a>

## annotations.append(type, cfiRange, [options]) ⇒ <code>Annotation</code>
<p>Append an annotation to store</p>

**Kind**: instance method of [<code>Annotations</code>](#Annotations)  
**Returns**: <code>Annotation</code> - <p>Annotation that was append</p>  

| Param | Type | Description |
| --- | --- | --- |
| type | <code>string</code> | <p>Type of annotation to append: <code>&quot;highlight&quot;</code> OR <code>&quot;underline&quot;</code></p> |
| cfiRange | <code>string</code> | <p>EpubCFI range to attach annotation to</p> |
| [options] | <code>object</code> |  |
| [options.data] | <code>object</code> | <p>Data to assign to annotation</p> |
| [options.cb] | <code>function</code> | <p>Callback after annotation is added</p> |
| [options.className] | <code>string</code> | <p>CSS class to assign to annotation</p> |
| [options.styles] | <code>object</code> | <p>CSS styles to assign to annotation</p> |

<a name="Annotations+remove"></a>

## annotations.remove(type, cfiRange)
<p>Remove an annotation from store</p>

**Kind**: instance method of [<code>Annotations</code>](#Annotations)  

| Param | Type | Description |
| --- | --- | --- |
| type | <code>string</code> | <p>Type of annotation to remove: <code>&quot;highlight&quot;</code> OR <code>&quot;underline&quot;</code></p> |
| cfiRange | <code>string</code> | <p>EpubCFI range to attach annotation to</p> |

<a name="Annotations+show"></a>

## annotations.show()
<p>[Not Implemented] Show annotations</p>

**Kind**: instance method of [<code>Annotations</code>](#Annotations)  
**Todo:**: needs implementation in View  
<a name="Annotations+hide"></a>

## annotations.hide()
<p>[Not Implemented] Hide annotations</p>

**Kind**: instance method of [<code>Annotations</code>](#Annotations)  
**Todo:**: needs implementation in View  
