<a name="View"></a>

# View
The View base class

**Kind**: global class  

* [View](#View)
    * [new View(layout, section)](#new_View_new)
    * _instance_
        * *[.clear()](#View+clear) ⇒ <code>number</code>*
        * *[.create()](#View+create) ⇒ <code>Element</code>*
        * *[.render(request)](#View+render) ⇒ <code>Promise.&lt;string&gt;</code>*
        * *[.reset()](#View+reset)*
        * *[.update()](#View+update)*
        * *[.axis()](#View+axis)*
        * *[.mode(value)](#View+mode)*
        * *[.expand()](#View+expand)*
        * *[.reframe(width, height)](#View+reframe)*
        * *[.load(contents)](#View+load) ⇒ <code>Promise.&lt;any&gt;</code>*
        * [.display(request)](#View+display) ⇒ [<code>Promise.&lt;View&gt;</code>](#View)
        * [.show()](#View+show)
        * *[.hide()](#View+hide)*
        * [.offset()](#View+offset) ⇒ <code>Object</code>
        * [.position()](#View+position) ⇒ <code>DOMRect</code>
        * [.locationOf(target)](#View+locationOf) ⇒ <code>Object</code>
        * [.highlight(cfiRange, [data], [cb], [className], [styles])](#View+highlight) ⇒ <code>object</code>
        * [.unhighlight(cfiRange)](#View+unhighlight) ⇒ <code>boolean</code>
        * [.underline(cfiRange, [data], [cb], [className], [styles])](#View+underline) ⇒ <code>object</code>
        * [.ununderline(cfiRange)](#View+ununderline) ⇒ <code>boolean</code>
        * *[.destroy()](#View+destroy)*
    * _static_
        * [.id](#View.id) : <code>string</code>
        * [.contents](#View.contents) : <code>Contents</code>
        * [.container](#View.container) : <code>Element</code>
        * [.displayed](#View.displayed) : <code>boolean</code>
        * [.document](#View.document) : <code>Document</code>
        * [.expanding](#View.expanding) : <code>boolean</code>
        * [.this.frame](#View.this.frame) : <code>Node</code>
        * [.marks](#View.marks) : <code>Marks</code>
        * [.width](#View.width) : <code>number</code>
        * [.height](#View.height) : <code>number</code>
        * [.settings](#View.settings) : <code>object</code>
        * ["loaderror" (err)](#View.event_loaderror)
        * ["rendered" (view)](#View.event_rendered)
        * ["displayed"](#View.event_displayed)
        * ["shown" (view)](#View.event_shown)
        * ["markClicked" (cfiRange, data)](#View.event_markClicked)
        * ["markClicked" (cfiRange, data)](#View.event_markClicked)

<a name="new_View_new"></a>

## new View(layout, section)
Constructor


| Param | Type |
| --- | --- |
| layout | <code>layout</code> | 
| section | <code>section</code> | 

<a name="View+clear"></a>

## *view.clear() ⇒ <code>number</code>*
Clear all marks

**Kind**: instance abstract method of [<code>View</code>](#View)  
**Returns**: <code>number</code> - number of marks  
<a name="View+create"></a>

## *view.create() ⇒ <code>Element</code>*
Create frame element

**Kind**: instance abstract method of [<code>View</code>](#View)  
**Returns**: <code>Element</code> - iframe  
<a name="View+render"></a>

## *view.render(request) ⇒ <code>Promise.&lt;string&gt;</code>*
render

**Kind**: instance abstract method of [<code>View</code>](#View)  
**Returns**: <code>Promise.&lt;string&gt;</code> - section render  

| Param | Type |
| --- | --- |
| request | <code>function</code> | 

<a name="View+reset"></a>

## *view.reset()*
Reset frame

**Kind**: instance abstract method of [<code>View</code>](#View)  
<a name="View+update"></a>

## *view.update()*
Update view

**Kind**: instance abstract method of [<code>View</code>](#View)  
<a name="View+axis"></a>

## *view.axis()*
Update axis

**Kind**: instance abstract method of [<code>View</code>](#View)  
<a name="View+mode"></a>

## *view.mode(value)*
Update mode

**Kind**: instance abstract method of [<code>View</code>](#View)  

| Param | Type |
| --- | --- |
| value | <code>string</code> | 

<a name="View+expand"></a>

## *view.expand()*
Expanding

**Kind**: instance abstract method of [<code>View</code>](#View)  
<a name="View+reframe"></a>

## *view.reframe(width, height)*
reframe

**Kind**: instance abstract method of [<code>View</code>](#View)  

| Param | Type |
| --- | --- |
| width | <code>number</code> | 
| height | <code>number</code> | 

<a name="View+load"></a>

## *view.load(contents) ⇒ <code>Promise.&lt;any&gt;</code>*
Load frame

**Kind**: instance abstract method of [<code>View</code>](#View)  
**Returns**: <code>Promise.&lt;any&gt;</code> - loading promise  

| Param | Type |
| --- | --- |
| contents | <code>string</code> | 

<a name="View+display"></a>

## view.display(request) ⇒ [<code>Promise.&lt;View&gt;</code>](#View)
Display view

**Kind**: instance method of [<code>View</code>](#View)  
**Returns**: [<code>Promise.&lt;View&gt;</code>](#View) - displayed promise  

| Param | Type |
| --- | --- |
| request | <code>function</code> | 

<a name="View+show"></a>

## view.show()
Show container

**Kind**: instance method of [<code>View</code>](#View)  
<a name="View+hide"></a>

## *view.hide()*
Hide container

**Kind**: instance abstract method of [<code>View</code>](#View)  
<a name="View+offset"></a>

## view.offset() ⇒ <code>Object</code>
offset

**Kind**: instance method of [<code>View</code>](#View)  
<a name="View+position"></a>

## view.position() ⇒ <code>DOMRect</code>
position

**Kind**: instance method of [<code>View</code>](#View)  
<a name="View+locationOf"></a>

## view.locationOf(target) ⇒ <code>Object</code>
locationOf

**Kind**: instance method of [<code>View</code>](#View)  

| Param | Type |
| --- | --- |
| target | <code>string</code> \| <code>EpubCFI</code> | 

<a name="View+highlight"></a>

## view.highlight(cfiRange, [data], [cb], [className], [styles]) ⇒ <code>object</code>
highlight

**Kind**: instance method of [<code>View</code>](#View)  

| Param | Type | Default | Description |
| --- | --- | --- | --- |
| cfiRange | <code>string</code> |  |  |
| [data] | <code>object</code> | <code>{}</code> |  |
| [cb] | <code>function</code> | <code></code> | callback function |
| [className] | <code>string</code> | <code>&quot;&#x27;epubjs-hl&#x27;&quot;</code> |  |
| [styles] | <code>object</code> | <code>{}</code> |  |

<a name="View+unhighlight"></a>

## view.unhighlight(cfiRange) ⇒ <code>boolean</code>
unhighlight

**Kind**: instance method of [<code>View</code>](#View)  

| Param | Type |
| --- | --- |
| cfiRange | <code>string</code> | 

<a name="View+underline"></a>

## view.underline(cfiRange, [data], [cb], [className], [styles]) ⇒ <code>object</code>
underline

**Kind**: instance method of [<code>View</code>](#View)  

| Param | Type | Default |
| --- | --- | --- |
| cfiRange | <code>string</code> |  | 
| [data] | <code>object</code> | <code>{}</code> | 
| [cb] | <code>function</code> | <code></code> | 
| [className] | <code>string</code> | <code>&quot;&#x27;epubjs-ul&#x27;&quot;</code> | 
| [styles] | <code>object</code> | <code>{}</code> | 

<a name="View+ununderline"></a>

## view.ununderline(cfiRange) ⇒ <code>boolean</code>
ununderline

**Kind**: instance method of [<code>View</code>](#View)  

| Param | Type |
| --- | --- |
| cfiRange | <code>string</code> | 

<a name="View+destroy"></a>

## *view.destroy()*
Destroy the View object

**Kind**: instance abstract method of [<code>View</code>](#View)  
<a name="View.id"></a>

## View.id : <code>string</code>
**Kind**: static property of [<code>View</code>](#View)  
**Read only**: true  
<a name="View.contents"></a>

## View.contents : <code>Contents</code>
**Kind**: static property of [<code>View</code>](#View)  
**Read only**: true  
<a name="View.container"></a>

## View.container : <code>Element</code>
**Kind**: static property of [<code>View</code>](#View)  
**Read only**: true  
<a name="View.displayed"></a>

## View.displayed : <code>boolean</code>
**Kind**: static property of [<code>View</code>](#View)  
**Read only**: true  
<a name="View.document"></a>

## View.document : <code>Document</code>
**Kind**: static property of [<code>View</code>](#View)  
**Read only**: true  
<a name="View.expanding"></a>

## View.expanding : <code>boolean</code>
**Kind**: static property of [<code>View</code>](#View)  
**Read only**: true  
<a name="View.this.frame"></a>

## View.this.frame : <code>Node</code>
**Kind**: static property of [<code>View</code>](#View)  
**Read only**: true  
<a name="View.marks"></a>

## View.marks : <code>Marks</code>
**Kind**: static property of [<code>View</code>](#View)  
**Read only**: true  
<a name="View.width"></a>

## View.width : <code>number</code>
**Kind**: static property of [<code>View</code>](#View)  
**Read only**: true  
<a name="View.height"></a>

## View.height : <code>number</code>
**Kind**: static property of [<code>View</code>](#View)  
**Read only**: true  
<a name="View.settings"></a>

## View.settings : <code>object</code>
**Kind**: static property of [<code>View</code>](#View)  
**Read only**: true  
<a name="View.event_loaderror"></a>

## "loaderror" (err)
**Kind**: event emitted by [<code>View</code>](#View)  

| Param | Type |
| --- | --- |
| err | <code>object</code> | 

<a name="View.event_rendered"></a>

## "rendered" (view)
**Kind**: event emitted by [<code>View</code>](#View)  

| Param | Type |
| --- | --- |
| view | <code>IframeView</code> | 

<a name="View.event_displayed"></a>

## "displayed"
**Kind**: event emitted by [<code>View</code>](#View)  
<a name="View.event_shown"></a>

## "shown" (view)
**Kind**: event emitted by [<code>View</code>](#View)  

| Param | Type |
| --- | --- |
| view | <code>IframeView</code> | 

<a name="View.event_markClicked"></a>

## "markClicked" (cfiRange, data)
**Kind**: event emitted by [<code>View</code>](#View)  

| Param | Type |
| --- | --- |
| cfiRange | <code>string</code> | 
| data | <code>object</code> | 

<a name="View.event_markClicked"></a>

## "markClicked" (cfiRange, data)
**Kind**: event emitted by [<code>View</code>](#View)  

| Param | Type |
| --- | --- |
| cfiRange | <code>string</code> | 
| data | <code>object</code> | 

