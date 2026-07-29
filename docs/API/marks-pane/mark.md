<a name="Mark"></a>

# Mark
<p>Mark class</p>

**Kind**: global class  

* [Mark](#Mark)
    * _instance_
        * [.bind(element, container)](#Mark+bind)
        * [.unbind()](#Mark+unbind) ⇒ <code>Node</code>
        * [.clear()](#Mark+clear)
        * *[.render()](#Mark+render)*
        * [.dispatchEvent(e)](#Mark+dispatchEvent)
        * [.getBoundingClientRect()](#Mark+getBoundingClientRect) ⇒ <code>DOMRect</code>
        * [.getClientRects()](#Mark+getClientRects) ⇒ <code>Array.&lt;object&gt;</code>
    * _static_
        * [.element](#Mark.element) : <code>Node</code>

<a name="Mark+bind"></a>

## mark.bind(element, container)
<p>bind</p>

**Kind**: instance method of [<code>Mark</code>](#Mark)  

| Param | Type | Description |
| --- | --- | --- |
| element | <code>Node</code> | <p>the mark container to rects</p> |
| container | <code>Node</code> | <p>the epub-view container</p> |

<a name="Mark+unbind"></a>

## mark.unbind() ⇒ <code>Node</code>
<p>unbind</p>

**Kind**: instance method of [<code>Mark</code>](#Mark)  
<a name="Mark+clear"></a>

## mark.clear()
<p>Clear the mark container</p>

**Kind**: instance method of [<code>Mark</code>](#Mark)  
<a name="Mark+render"></a>

## *mark.render()*
<p>render</p>

**Kind**: instance abstract method of [<code>Mark</code>](#Mark)  
<a name="Mark+dispatchEvent"></a>

## mark.dispatchEvent(e)
<p>Dispatch event</p>

**Kind**: instance method of [<code>Mark</code>](#Mark)  

| Param | Type |
| --- | --- |
| e | <code>MouseEvent</code> | 

<a name="Mark+getBoundingClientRect"></a>

## mark.getBoundingClientRect() ⇒ <code>DOMRect</code>
<p>Get bounding client rect</p>

**Kind**: instance method of [<code>Mark</code>](#Mark)  
<a name="Mark+getClientRects"></a>

## mark.getClientRects() ⇒ <code>Array.&lt;object&gt;</code>
<p>Get client rects</p>

**Kind**: instance method of [<code>Mark</code>](#Mark)  
<a name="Mark.element"></a>

## Mark.element : <code>Node</code>
<p>the mark container to rects</p>

**Kind**: static property of [<code>Mark</code>](#Mark)  
**Read only**: true  
