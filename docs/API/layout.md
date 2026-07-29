<a name="Layout"></a>

# Layout
<p>Figures out the CSS values to apply for a layout</p>

**Kind**: global class  

* [Layout](#Layout)
    * [new Layout([options])](#new_Layout_new)
    * _instance_
        * [.set(options)](#Layout+set)
        * [.calculate([width], [height], [gap])](#Layout+calculate)
        * [.count(totalLength, [pageLength])](#Layout+count) ⇒ <code>Object</code>
        * [.destroy()](#Layout+destroy)
    * _static_
        * [.axis](#Layout.axis) : <code>string</code>
        * [.name](#Layout.name) : <code>string</code>
        * [.flow](#Layout.flow) : <code>string</code>
        * [.style](#Layout.style) : <code>string</code>
        * [.spread](#Layout.spread) : <code>boolean</code>
        * [.direction](#Layout.direction) : <code>string</code>
        * [.orientation](#Layout.orientation) : <code>string</code>
        * [.viewport](#Layout.viewport) : <code>string</code>
        * [.minSpreadWidth](#Layout.minSpreadWidth) : <code>number</code>
        * [.width](#Layout.width) : <code>number</code>
        * [.height](#Layout.height) : <code>number</code>
        * [.pageWidth](#Layout.pageWidth) : <code>number</code>
        * [.pageHeight](#Layout.pageHeight) : <code>number</code>
        * [.spreadWidth](#Layout.spreadWidth) : <code>number</code>
        * [.delta](#Layout.delta) : <code>number</code>
        * [.columnWidth](#Layout.columnWidth) : <code>number</code>
        * [.gap](#Layout.gap) : <code>number</code>
        * [.divisor](#Layout.divisor) : <code>number</code>
        * [.writingMode](#Layout.writingMode) : <code>string</code>

<a name="new_Layout_new"></a>

## new Layout([options])
<p>Constructor</p>


| Param | Type | Default | Description |
| --- | --- | --- | --- |
| [options] | <code>object</code> |  |  |
| [options.flow] | <code>string</code> | <code>&quot;&#x27;paginated&#x27;&quot;</code> | <p>values: <code>&quot;paginated&quot;</code> OR <code>&quot;scrolled&quot;</code> OR <code>&quot;scrolled-doc&quot;</code></p> |
| [options.spread] | <code>string</code> | <code>&quot;&#x27;auto&#x27;&quot;</code> | <p>values: <code>&quot;auto&quot;</code> OR <code>&quot;none&quot;</code></p> |
| [options.direction] | <code>string</code> | <code>&quot;&#x27;ltr&#x27;&quot;</code> | <p>values: <code>&quot;ltr&quot;</code> OR <code>&quot;rtl&quot;</code></p> |
| [options.orientation] | <code>string</code> | <code>&quot;&#x27;auto&#x27;&quot;</code> | <p>values: <code>&quot;auto&quot;</code> OR <code>&quot;landscape&quot;</code> OR <code>&quot;portrait&quot;</code></p> |
| [options.minSpreadWidth] | <code>number</code> | <code>800</code> |  |
| [options.pageWidth] | <code>number</code> |  | <p>page width</p> |
| [options.pageHeight] | <code>number</code> |  | <p>page height</p> |
| [options.writingMode] | <code>string</code> | <code>&quot;&#x27;horizontal-tb&#x27;&quot;</code> | <p>values: <code>&quot;horizontal-tb&quot;</code> OR <code>&quot;vertical-rl&quot;</code> OR <code>&quot;vertical-lr&quot;</code></p> |

<a name="Layout+set"></a>

## layout.set(options)
<p>Set options</p>

**Kind**: instance method of [<code>Layout</code>](#Layout)  

| Param | Type |
| --- | --- |
| options | <code>object</code> | 

<a name="Layout+calculate"></a>

## layout.calculate([width], [height], [gap])
<p>Calculate the dimensions of the pagination</p>

**Kind**: instance method of [<code>Layout</code>](#Layout)  

| Param | Type | Description |
| --- | --- | --- |
| [width] | <code>number</code> | <p>width of the rendering</p> |
| [height] | <code>number</code> | <p>height of the rendering</p> |
| [gap] | <code>number</code> | <p>width of the gap between columns</p> |

<a name="Layout+count"></a>

## layout.count(totalLength, [pageLength]) ⇒ <code>Object</code>
<p>Count number of pages</p>

**Kind**: instance method of [<code>Layout</code>](#Layout)  

| Param | Type |
| --- | --- |
| totalLength | <code>number</code> | 
| [pageLength] | <code>number</code> | 

<a name="Layout+destroy"></a>

## layout.destroy()
<p>destroty</p>

**Kind**: instance method of [<code>Layout</code>](#Layout)  
<a name="Layout.axis"></a>

## Layout.axis : <code>string</code>
**Kind**: static property of [<code>Layout</code>](#Layout)  
**Read only**: true  
<a name="Layout.name"></a>

## Layout.name : <code>string</code>
<p>Layout name</p>

**Kind**: static property of [<code>Layout</code>](#Layout)  
**Read only**: true  
<a name="Layout.flow"></a>

## Layout.flow : <code>string</code>
**Kind**: static property of [<code>Layout</code>](#Layout)  
**Read only**: true  
<a name="Layout.style"></a>

## Layout.style : <code>string</code>
**Kind**: static property of [<code>Layout</code>](#Layout)  
**Read only**: true  
<a name="Layout.spread"></a>

## Layout.spread : <code>boolean</code>
**Kind**: static property of [<code>Layout</code>](#Layout)  
**Read only**: true  
<a name="Layout.direction"></a>

## Layout.direction : <code>string</code>
**Kind**: static property of [<code>Layout</code>](#Layout)  
**Read only**: true  
<a name="Layout.orientation"></a>

## Layout.orientation : <code>string</code>
<p>no implementation</p>

**Kind**: static property of [<code>Layout</code>](#Layout)  
**Read only**: true  
<a name="Layout.viewport"></a>

## Layout.viewport : <code>string</code>
<p>no implementation</p>

**Kind**: static property of [<code>Layout</code>](#Layout)  
**Read only**: true  
<a name="Layout.minSpreadWidth"></a>

## Layout.minSpreadWidth : <code>number</code>
**Kind**: static property of [<code>Layout</code>](#Layout)  
**Read only**: true  
<a name="Layout.width"></a>

## Layout.width : <code>number</code>
<p>Layout width</p>

**Kind**: static property of [<code>Layout</code>](#Layout)  
**Read only**: true  
<a name="Layout.height"></a>

## Layout.height : <code>number</code>
<p>Layout height</p>

**Kind**: static property of [<code>Layout</code>](#Layout)  
**Read only**: true  
<a name="Layout.pageWidth"></a>

## Layout.pageWidth : <code>number</code>
**Kind**: static property of [<code>Layout</code>](#Layout)  
**Read only**: true  
<a name="Layout.pageHeight"></a>

## Layout.pageHeight : <code>number</code>
**Kind**: static property of [<code>Layout</code>](#Layout)  
**Read only**: true  
<a name="Layout.spreadWidth"></a>

## Layout.spreadWidth : <code>number</code>
<p>Spread width</p>

**Kind**: static property of [<code>Layout</code>](#Layout)  
**Read only**: true  
<a name="Layout.delta"></a>

## Layout.delta : <code>number</code>
**Kind**: static property of [<code>Layout</code>](#Layout)  
**Read only**: true  
<a name="Layout.columnWidth"></a>

## Layout.columnWidth : <code>number</code>
<p>Column width</p>

**Kind**: static property of [<code>Layout</code>](#Layout)  
**Read only**: true  
<a name="Layout.gap"></a>

## Layout.gap : <code>number</code>
**Kind**: static property of [<code>Layout</code>](#Layout)  
**Read only**: true  
<a name="Layout.divisor"></a>

## Layout.divisor : <code>number</code>
**Kind**: static property of [<code>Layout</code>](#Layout)  
**Read only**: true  
<a name="Layout.writingMode"></a>

## Layout.writingMode : <code>string</code>
**Kind**: static property of [<code>Layout</code>](#Layout)  
**Read only**: true  
