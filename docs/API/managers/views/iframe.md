<a name="IframeView"></a>

# IframeView ⇐ <code>View</code>
<p>IframeView class</p>

**Kind**: global class  
**Extends**: <code>View</code>  

* [IframeView](#IframeView) ⇐ <code>View</code>
    * [new IframeView(layout, section, [options])](#new_IframeView_new)
    * _instance_
        * [.create()](#IframeView+create) ⇒ <code>Element</code>
        * [.mode()](#IframeView+mode)
        * [.load(contents)](#IframeView+load) ⇒ <code>Promise.&lt;any&gt;</code>
        * [.onLoad(event, defer)](#IframeView+onLoad)
        * [.show()](#IframeView+show)
        * [.destroy()](#IframeView+destroy)
    * _static_
        * [.method](#IframeView.method) : <code>string</code>
        * ["resized" (rect)](#IframeView.event_resized)

<a name="new_IframeView_new"></a>

## new IframeView(layout, section, [options])
<p>Constructor</p>


| Param | Type | Default | Description |
| --- | --- | --- | --- |
| layout | <code>Layout</code> |  | <p>ref</p> |
| section | <code>Section</code> |  | <p>ref</p> |
| [options] | <code>object</code> |  |  |
| [options.ignoreClass] | <code>string</code> | <code>&quot;&#x27;&#x27;&quot;</code> |  |
| [options.method] | <code>string</code> | <code>&quot;&#x27;write&#x27;&quot;</code> | <p>values: <code>&quot;blobUrl&quot;</code> OR <code>&quot;srcdoc&quot;</code> OR <code>&quot;write&quot;</code></p> |
| [options.sandbox] | <code>Array.&lt;string&gt;</code> | <code>[]</code> | <p>iframe sandbox policy list</p> |

<a name="IframeView+create"></a>

## iframeView.create() ⇒ <code>Element</code>
<p>Create iframe element</p>

**Kind**: instance method of [<code>IframeView</code>](#IframeView)  
**Returns**: <code>Element</code> - <p>iframe</p>  
<a name="IframeView+mode"></a>

## iframeView.mode()
<p>Update writing mode</p>

**Kind**: instance method of [<code>IframeView</code>](#IframeView)  
<a name="IframeView+load"></a>

## iframeView.load(contents) ⇒ <code>Promise.&lt;any&gt;</code>
<p>Load iframe</p>

**Kind**: instance method of [<code>IframeView</code>](#IframeView)  
**Returns**: <code>Promise.&lt;any&gt;</code> - <p>loading promise</p>  

| Param | Type |
| --- | --- |
| contents | <code>string</code> | 

<a name="IframeView+onLoad"></a>

## iframeView.onLoad(event, defer)
<p>onLoad</p>

**Kind**: instance method of [<code>IframeView</code>](#IframeView)  

| Param | Type |
| --- | --- |
| event | <code>Event</code> | 
| defer | <code>Defer</code> | 

<a name="IframeView+show"></a>

## iframeView.show()
<p>Show container</p>

**Kind**: instance method of [<code>IframeView</code>](#IframeView)  
<a name="IframeView+destroy"></a>

## iframeView.destroy()
<p>Destroy the IframeView object</p>

**Kind**: instance method of [<code>IframeView</code>](#IframeView)  
<a name="IframeView.method"></a>

## IframeView.method : <code>string</code>
<p>Load method</p>

**Kind**: static property of [<code>IframeView</code>](#IframeView)  
**Read only**: true  
<a name="IframeView.event_resized"></a>

## "resized" (rect)
**Kind**: event emitted by [<code>IframeView</code>](#IframeView)  

| Param | Type |
| --- | --- |
| rect | <code>object</code> | 

