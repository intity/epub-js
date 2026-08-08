<a name="Marks"></a>

# Marks
<p>Marks class</p>

**Kind**: global class  

* [Marks](#Marks)
    * [new Marks(target, [container])](#new_Marks_new)
    * _instance_
        * [.appendMark(key, mark)](#Marks+appendMark) ⇒ <code>Mark</code>
        * [.removeMark(key)](#Marks+removeMark) ⇒ <code>void</code>
        * [.render()](#Marks+render)
    * _static_
        * [.element](#Marks.element) : <code>Node</code>

<a name="new_Marks_new"></a>

## new Marks(target, [container])
<p>Constructor</p>


| Param | Type | Default | Description |
| --- | --- | --- | --- |
| target | <code>Node</code> |  | <p>view</p> |
| [container] | <code>Node</code> | <code>document.body</code> | <p>epub-view container</p> |

<a name="Marks+appendMark"></a>

## marks.appendMark(key, mark) ⇒ <code>Mark</code>
<p>Append mark</p>

**Kind**: instance method of [<code>Marks</code>](#Marks)  

| Param | Type |
| --- | --- |
| key | <code>string</code> | 
| mark | <code>Mark</code> | 

<a name="Marks+removeMark"></a>

## marks.removeMark(key) ⇒ <code>void</code>
<p>Remove mark</p>

**Kind**: instance method of [<code>Marks</code>](#Marks)  

| Param | Type |
| --- | --- |
| key | <code>string</code> | 

<a name="Marks+render"></a>

## marks.render()
<p>render</p>

**Kind**: instance method of [<code>Marks</code>](#Marks)  
<a name="Marks.element"></a>

## Marks.element : <code>Node</code>
<p>the marks container</p>

**Kind**: static property of [<code>Marks</code>](#Marks)  
**Read only**: true  
