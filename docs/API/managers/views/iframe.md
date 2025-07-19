<a name="IframeView"></a>

# IframeView ⇐ <code>View</code>
IframeView class

**Kind**: global class  
**Extends**: <code>View</code>  

* [IframeView](#IframeView) ⇐ <code>View</code>
    * [new IframeView(layout, section, [options])](#new_IframeView_new)
    * _instance_
        * [.create()](#IframeView+create) ⇒ <code>Element</code>
        * [.mode(value)](#IframeView+mode)
        * [.load(contents)](#IframeView+load) ⇒ <code>Promise.&lt;any&gt;</code>
        * [.onLoad(event, defer)](#IframeView+onLoad)
        * [.show()](#IframeView+show)
        * [.destroy()](#IframeView+destroy)
    * _static_
        * [.method](#IframeView.method) : <code>string</code>
        * [.writingMode](#IframeView.writingMode) : <code>string</code>
        * ["resized" (rect)](#IframeView.event_resized)

<a name="new_IframeView_new"></a>

## new IframeView(layout, section, [options])
Constructor


| Param | Type | Default | Description |
| --- | --- | --- | --- |
| layout | <code>Layout</code> |  | ref |
| section | <code>Section</code> |  | ref |
| [options] | <code>object</code> |  |  |
| [options.ignoreClass] | <code>string</code> | <code>&quot;&#x27;&#x27;&quot;</code> |  |
| [options.method] | <code>string</code> | <code>&quot;&#x27;write&#x27;&quot;</code> | values: `"blobUrl"` OR `"srcdoc"` OR `"write"` |
| [options.sandbox] | <code>Array.&lt;string&gt;</code> | <code>[]</code> | iframe sandbox policy list |

<a name="IframeView+create"></a>

## iframeView.create() ⇒ <code>Element</code>
Create iframe element

**Kind**: instance method of [<code>IframeView</code>](#IframeView)  
**Returns**: <code>Element</code> - iframe  
<a name="IframeView+mode"></a>

## iframeView.mode(value)
Update writing mode

**Kind**: instance method of [<code>IframeView</code>](#IframeView)  

| Param | Type |
| --- | --- |
| value | <code>string</code> | 

<a name="IframeView+load"></a>

## iframeView.load(contents) ⇒ <code>Promise.&lt;any&gt;</code>
Load iframe

**Kind**: instance method of [<code>IframeView</code>](#IframeView)  
**Returns**: <code>Promise.&lt;any&gt;</code> - loading promise  

| Param | Type |
| --- | --- |
| contents | <code>string</code> | 

<a name="IframeView+onLoad"></a>

## iframeView.onLoad(event, defer)
onLoad

**Kind**: instance method of [<code>IframeView</code>](#IframeView)  

| Param | Type |
| --- | --- |
| event | <code>Event</code> | 
| defer | <code>Defer</code> | 

<a name="IframeView+show"></a>

## iframeView.show()
Show container

**Kind**: instance method of [<code>IframeView</code>](#IframeView)  
<a name="IframeView+destroy"></a>

## iframeView.destroy()
Destroy the IframeView object

**Kind**: instance method of [<code>IframeView</code>](#IframeView)  
<a name="IframeView.method"></a>

## IframeView.method : <code>string</code>
Load method

**Kind**: static property of [<code>IframeView</code>](#IframeView)  
**Read only**: true  
<a name="IframeView.writingMode"></a>

## IframeView.writingMode : <code>string</code>
**Kind**: static property of [<code>IframeView</code>](#IframeView)  
**Read only**: true  
<a name="IframeView.event_resized"></a>

## "resized" (rect)
**Kind**: event emitted by [<code>IframeView</code>](#IframeView)  

| Param | Type |
| --- | --- |
| rect | <code>object</code> | 

