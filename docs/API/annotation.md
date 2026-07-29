<a name="Annotation"></a>

# Annotation
<p>Annotation class</p>

**Kind**: global class  

* [Annotation](#Annotation)
    * [new Annotation(type, cfiRange, [options])](#new_Annotation_new)
    * _instance_
        * [.update(data)](#Annotation+update)
        * [.attach(view)](#Annotation+attach) ⇒ <code>object</code> \| <code>null</code>
        * [.detach(view)](#Annotation+detach) ⇒ <code>boolean</code>
        * [.text()](#Annotation+text)
    * _static_
        * [.type](#Annotation.type) : <code>string</code>
        * [.sectionIndex](#Annotation.sectionIndex) : <code>number</code>
        * [.mark](#Annotation.mark) : <code>Mark</code>
        * ["attach" (result)](#Annotation.event_attach)
        * ["detach" (result)](#Annotation.event_detach)

<a name="new_Annotation_new"></a>

## new Annotation(type, cfiRange, [options])
<p>Constructor</p>


| Param | Type | Description |
| --- | --- | --- |
| type | <code>string</code> | <p>Type of annotation to add: <code>&quot;highlight&quot;</code> OR <code>&quot;underline&quot;</code></p> |
| cfiRange | <code>string</code> | <p>EpubCFI range to attach annotation to</p> |
| [options] | <code>object</code> |  |
| [options.data] | <code>object</code> | <p>Data to assign to annotation</p> |
| [options.cb] | <code>function</code> | <p>Callback after annotation is clicked</p> |
| [options.className] | <code>string</code> | <p>CSS class to assign to annotation</p> |
| [options.styles] | <code>object</code> | <p>CSS styles to assign to annotation</p> |

<a name="Annotation+update"></a>

## annotation.update(data)
<p>Update stored data</p>

**Kind**: instance method of [<code>Annotation</code>](#Annotation)  

| Param | Type |
| --- | --- |
| data | <code>object</code> | 

<a name="Annotation+attach"></a>

## annotation.attach(view) ⇒ <code>object</code> \| <code>null</code>
<p>Add to a view</p>

**Kind**: instance method of [<code>Annotation</code>](#Annotation)  

| Param | Type |
| --- | --- |
| view | <code>View</code> | 

<a name="Annotation+detach"></a>

## annotation.detach(view) ⇒ <code>boolean</code>
<p>Remove from a view</p>

**Kind**: instance method of [<code>Annotation</code>](#Annotation)  

| Param | Type |
| --- | --- |
| view | <code>View</code> | 

<a name="Annotation+text"></a>

## annotation.text()
<p>[Not Implemented] Get text of an annotation</p>

**Kind**: instance method of [<code>Annotation</code>](#Annotation)  
**Todo:**: needs implementation in contents  
<a name="Annotation.type"></a>

## Annotation.type : <code>string</code>
**Kind**: static property of [<code>Annotation</code>](#Annotation)  
**Read only**: true  
<a name="Annotation.sectionIndex"></a>

## Annotation.sectionIndex : <code>number</code>
**Kind**: static property of [<code>Annotation</code>](#Annotation)  
**Read only**: true  
<a name="Annotation.mark"></a>

## Annotation.mark : <code>Mark</code>
**Kind**: static property of [<code>Annotation</code>](#Annotation)  
**Read only**: true  
<a name="Annotation.event_attach"></a>

## "attach" (result)
**Kind**: event emitted by [<code>Annotation</code>](#Annotation)  

| Param | Type |
| --- | --- |
| result | <code>Mark</code> | 

<a name="Annotation.event_detach"></a>

## "detach" (result)
**Kind**: event emitted by [<code>Annotation</code>](#Annotation)  

| Param | Type |
| --- | --- |
| result | <code>boolean</code> | 

