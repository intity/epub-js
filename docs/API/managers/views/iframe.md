<a name="IframeView"></a>

# IframeView
IframeView class

**Kind**: global class  

* [IframeView](#IframeView)
    * [new IframeView(layout, section, [options])](#new_IframeView_new)
    * _instance_
        * [.create()](#IframeView+create) ⇒ <code>Element</code>
        * [.render(request)](#IframeView+render) ⇒ <code>Promise.&lt;string&gt;</code>
        * [.reset()](#IframeView+reset)
        * [.update()](#IframeView+update)
        * [.load(contents)](#IframeView+load) ⇒ <code>Promise.&lt;any&gt;</code>
        * [.onLoad(event, defer)](#IframeView+onLoad)
        * [.display(request)](#IframeView+display) ⇒ <code>Promise.&lt;view&gt;</code>
        * [.show()](#IframeView+show)
        * [.hide()](#IframeView+hide)
        * [.offset()](#IframeView+offset) ⇒ <code>Object</code>
        * [.position()](#IframeView+position) ⇒ <code>DOMRect</code>
        * [.locationOf(target)](#IframeView+locationOf) ⇒ <code>Object</code>
        * [.bounds([force])](#IframeView+bounds) ⇒ <code>Object</code>
        * [.highlight(cfiRange, [data], [cb], [className], [styles])](#IframeView+highlight) ⇒ <code>object</code>
        * [.underline(cfiRange, [data], [cb], [className], [styles])](#IframeView+underline) ⇒ <code>object</code>
        * [.unhighlight(cfiRange)](#IframeView+unhighlight) ⇒ <code>boolean</code>
        * [.ununderline(cfiRange)](#IframeView+ununderline) ⇒ <code>boolean</code>
        * [.destroy()](#IframeView+destroy)
    * _static_
        * [.settings](#IframeView.settings) : <code>object</code>
        * [.id](#IframeView.id) : <code>string</code>
        * [.section](#IframeView.section) : <code>Section</code>
        * [.contents](#IframeView.contents) : <code>Contents</code>
        * [.epubcfi](#IframeView.epubcfi) : <code>EpubCFI</code>
        * [.layout](#IframeView.layout) : <code>Layout</code>
        * [.marks](#IframeView.marks) : <code>Marks</code>
        * [.method](#IframeView.method) : <code>string</code>
        * [.writingMode](#IframeView.writingMode) : <code>string</code>
        * ["loaderror" (err)](#IframeView.event_loaderror)
        * ["rendered" (view)](#IframeView.event_rendered)
        * ["resized" (size)](#IframeView.event_resized)
        * ["displayed"](#IframeView.event_displayed)
        * ["shown" (view)](#IframeView.event_shown)
        * ["hidden" (view)](#IframeView.event_hidden)
        * ["markClicked" (cfiRange, data)](#IframeView.event_markClicked)
        * ["markClicked" (cfiRange, data)](#IframeView.event_markClicked)

<a name="new_IframeView_new"></a>

## new IframeView(layout, section, [options])
Constructor


| Param | Type | Default | Description |
| --- | --- | --- | --- |
| layout | <code>Layout</code> |  |  |
| section | <code>Section</code> |  |  |
| [options] | <code>object</code> |  |  |
| [options.method] | <code>string</code> | <code>&quot;&#x27;write&#x27;&quot;</code> | values: `"blobUrl"` OR `"srcdoc"` OR `"write"` |
| [options.ignoreClass] | <code>string</code> | <code>&quot;&#x27;&#x27;&quot;</code> |  |
| [options.allowPopups] | <code>boolean</code> | <code>false</code> |  |
| [options.allowScriptedContent] | <code>boolean</code> | <code>false</code> |  |
| [options.forceRight] | <code>boolean</code> | <code>false</code> |  |

<a name="IframeView+create"></a>

## iframeView.create() ⇒ <code>Element</code>
Create iframe element

**Kind**: instance method of [<code>IframeView</code>](#IframeView)  
**Returns**: <code>Element</code> - iframe  
<a name="IframeView+render"></a>

## iframeView.render(request) ⇒ <code>Promise.&lt;string&gt;</code>
render

**Kind**: instance method of [<code>IframeView</code>](#IframeView)  
**Returns**: <code>Promise.&lt;string&gt;</code> - section render  

| Param | Type |
| --- | --- |
| request | <code>function</code> | 

<a name="IframeView+reset"></a>

## iframeView.reset()
reset

**Kind**: instance method of [<code>IframeView</code>](#IframeView)  
<a name="IframeView+update"></a>

## iframeView.update()
Update view

**Kind**: instance method of [<code>IframeView</code>](#IframeView)  
<a name="IframeView+load"></a>

## iframeView.load(contents) ⇒ <code>Promise.&lt;any&gt;</code>
load

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

<a name="IframeView+display"></a>

## iframeView.display(request) ⇒ <code>Promise.&lt;view&gt;</code>
display

**Kind**: instance method of [<code>IframeView</code>](#IframeView)  
**Returns**: <code>Promise.&lt;view&gt;</code> - displayed promise  

| Param | Type |
| --- | --- |
| request | <code>function</code> | 

<a name="IframeView+show"></a>

## iframeView.show()
show

**Kind**: instance method of [<code>IframeView</code>](#IframeView)  
<a name="IframeView+hide"></a>

## iframeView.hide()
hide

**Kind**: instance method of [<code>IframeView</code>](#IframeView)  
<a name="IframeView+offset"></a>

## iframeView.offset() ⇒ <code>Object</code>
offset

**Kind**: instance method of [<code>IframeView</code>](#IframeView)  
<a name="IframeView+position"></a>

## iframeView.position() ⇒ <code>DOMRect</code>
position

**Kind**: instance method of [<code>IframeView</code>](#IframeView)  
<a name="IframeView+locationOf"></a>

## iframeView.locationOf(target) ⇒ <code>Object</code>
locationOf

**Kind**: instance method of [<code>IframeView</code>](#IframeView)  

| Param | Type |
| --- | --- |
| target | <code>string</code> \| <code>EpubCFI</code> | 

<a name="IframeView+bounds"></a>

## iframeView.bounds([force]) ⇒ <code>Object</code>
bounds

**Kind**: instance method of [<code>IframeView</code>](#IframeView)  

| Param | Type | Default |
| --- | --- | --- |
| [force] | <code>boolean</code> | <code>false</code> | 

<a name="IframeView+highlight"></a>

## iframeView.highlight(cfiRange, [data], [cb], [className], [styles]) ⇒ <code>object</code>
highlight

**Kind**: instance method of [<code>IframeView</code>](#IframeView)  

| Param | Type | Default | Description |
| --- | --- | --- | --- |
| cfiRange | <code>string</code> |  |  |
| [data] | <code>object</code> | <code>{}</code> |  |
| [cb] | <code>function</code> | <code></code> | callback function |
| [className] | <code>string</code> | <code>&quot;&#x27;epubjs-hl&#x27;&quot;</code> |  |
| [styles] | <code>object</code> | <code>{}</code> |  |

<a name="IframeView+underline"></a>

## iframeView.underline(cfiRange, [data], [cb], [className], [styles]) ⇒ <code>object</code>
underline

**Kind**: instance method of [<code>IframeView</code>](#IframeView)  

| Param | Type | Default |
| --- | --- | --- |
| cfiRange | <code>string</code> |  | 
| [data] | <code>object</code> | <code>{}</code> | 
| [cb] | <code>function</code> | <code></code> | 
| [className] | <code>string</code> | <code>&quot;&#x27;epubjs-ul&#x27;&quot;</code> | 
| [styles] | <code>object</code> | <code>{}</code> | 

<a name="IframeView+unhighlight"></a>

## iframeView.unhighlight(cfiRange) ⇒ <code>boolean</code>
unhighlight

**Kind**: instance method of [<code>IframeView</code>](#IframeView)  

| Param | Type |
| --- | --- |
| cfiRange | <code>string</code> | 

<a name="IframeView+ununderline"></a>

## iframeView.ununderline(cfiRange) ⇒ <code>boolean</code>
ununderline

**Kind**: instance method of [<code>IframeView</code>](#IframeView)  

| Param | Type |
| --- | --- |
| cfiRange | <code>string</code> | 

<a name="IframeView+destroy"></a>

## iframeView.destroy()
destroy

**Kind**: instance method of [<code>IframeView</code>](#IframeView)  
<a name="IframeView.settings"></a>

## IframeView.settings : <code>object</code>
**Kind**: static property of [<code>IframeView</code>](#IframeView)  
**Read only**: true  
<a name="IframeView.id"></a>

## IframeView.id : <code>string</code>
**Kind**: static property of [<code>IframeView</code>](#IframeView)  
**Read only**: true  
<a name="IframeView.section"></a>

## IframeView.section : <code>Section</code>
**Kind**: static property of [<code>IframeView</code>](#IframeView)  
**Read only**: true  
<a name="IframeView.contents"></a>

## IframeView.contents : <code>Contents</code>
**Kind**: static property of [<code>IframeView</code>](#IframeView)  
**Read only**: true  
<a name="IframeView.epubcfi"></a>

## IframeView.epubcfi : <code>EpubCFI</code>
Blank Cfi for Parsing

**Kind**: static property of [<code>IframeView</code>](#IframeView)  
**Read only**: true  
<a name="IframeView.layout"></a>

## IframeView.layout : <code>Layout</code>
**Kind**: static property of [<code>IframeView</code>](#IframeView)  
**Read only**: true  
<a name="IframeView.marks"></a>

## IframeView.marks : <code>Marks</code>
**Kind**: static property of [<code>IframeView</code>](#IframeView)  
**Read only**: true  
<a name="IframeView.method"></a>

## IframeView.method : <code>string</code>
Load method

**Kind**: static property of [<code>IframeView</code>](#IframeView)  
**Read only**: true  
<a name="IframeView.writingMode"></a>

## IframeView.writingMode : <code>string</code>
**Kind**: static property of [<code>IframeView</code>](#IframeView)  
**Read only**: true  
<a name="IframeView.event_loaderror"></a>

## "loaderror" (err)
**Kind**: event emitted by [<code>IframeView</code>](#IframeView)  

| Param | Type |
| --- | --- |
| err | <code>object</code> | 

<a name="IframeView.event_rendered"></a>

## "rendered" (view)
**Kind**: event emitted by [<code>IframeView</code>](#IframeView)  

| Param | Type |
| --- | --- |
| view | [<code>IframeView</code>](#IframeView) | 

<a name="IframeView.event_resized"></a>

## "resized" (size)
**Kind**: event emitted by [<code>IframeView</code>](#IframeView)  

| Param | Type |
| --- | --- |
| size | <code>object</code> | 

<a name="IframeView.event_displayed"></a>

## "displayed"
**Kind**: event emitted by [<code>IframeView</code>](#IframeView)  
<a name="IframeView.event_shown"></a>

## "shown" (view)
**Kind**: event emitted by [<code>IframeView</code>](#IframeView)  

| Param | Type |
| --- | --- |
| view | [<code>IframeView</code>](#IframeView) | 

<a name="IframeView.event_hidden"></a>

## "hidden" (view)
**Kind**: event emitted by [<code>IframeView</code>](#IframeView)  

| Param | Type |
| --- | --- |
| view | [<code>IframeView</code>](#IframeView) | 

<a name="IframeView.event_markClicked"></a>

## "markClicked" (cfiRange, data)
**Kind**: event emitted by [<code>IframeView</code>](#IframeView)  

| Param | Type |
| --- | --- |
| cfiRange | <code>string</code> | 
| data | <code>object</code> | 

<a name="IframeView.event_markClicked"></a>

## "markClicked" (cfiRange, data)
**Kind**: event emitted by [<code>IframeView</code>](#IframeView)  

| Param | Type |
| --- | --- |
| cfiRange | <code>string</code> | 
| data | <code>object</code> | 

