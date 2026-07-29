<a name="Locations"></a>

# Locations ⇐ <code>Map</code>
<p>Find Locations for a Book</p>

**Kind**: global class  
**Extends**: <code>Map</code>  

* [Locations](#Locations) ⇐ <code>Map</code>
    * [new Locations([sections], [request], [pause])](#new_Locations_new)
    * _instance_
        * [.generate([chars])](#Locations+generate) ⇒ [<code>Promise.&lt;Locations&gt;</code>](#Locations)
        * [.process(section)](#Locations+process) ⇒ [<code>Promise.&lt;Locations&gt;</code>](#Locations)
        * [.parse(contents, cfiBase, [chars])](#Locations+parse) ⇒ [<code>Promise.&lt;Locations&gt;</code>](#Locations)
        * [.locationOf(item, array, [compareFunc], [start], [end])](#Locations+locationOf) ⇒ <code>number</code>
        * [.locationFromCfi(value)](#Locations+locationFromCfi) ⇒ <code>number</code>
        * [.percentageFromCfi(cfi)](#Locations+percentageFromCfi) ⇒ <code>number</code>
        * [.percentageFromLocation(index)](#Locations+percentageFromLocation) ⇒ <code>number</code>
        * [.cfiFromLocation(index)](#Locations+cfiFromLocation) ⇒ <code>string</code> \| <code>null</code>
        * [.cfiFromPercentage(value)](#Locations+cfiFromPercentage) ⇒ <code>string</code> \| <code>null</code>
        * [.load(locations)](#Locations+load) ⇒ [<code>Locations</code>](#Locations)
        * [.save([type])](#Locations+save) ⇒ <code>string</code>
        * [.set(key, val)](#Locations+set) ⇒ <code>any</code>
        * [.clear()](#Locations+clear)
        * [.destroy()](#Locations+destroy)
    * _static_
        * [.current](#Locations.current) : <code>Location</code>
        * [.generated](#Locations.generated) : [<code>Promise.&lt;Locations&gt;</code>](#Locations)
        * ["changed" (current, changed)](#Locations.event_changed)

<a name="new_Locations_new"></a>

## new Locations([sections], [request], [pause])
<p>Constructor</p>


| Param | Type | Default |
| --- | --- | --- |
| [sections] | <code>Sections</code> |  | 
| [request] | <code>function</code> |  | 
| [pause] | <code>number</code> | <code>100</code> | 

<a name="Locations+generate"></a>

## locations.generate([chars]) ⇒ [<code>Promise.&lt;Locations&gt;</code>](#Locations)
<p>Load all of sections in the book to generate locations</p>

**Kind**: instance method of [<code>Locations</code>](#Locations)  
**Returns**: [<code>Promise.&lt;Locations&gt;</code>](#Locations) - <p>Locations</p>  

| Param | Type | Description |
| --- | --- | --- |
| [chars] | <code>number</code> | <p>how many chars to split on (default:150)</p> |

<a name="Locations+process"></a>

## locations.process(section) ⇒ [<code>Promise.&lt;Locations&gt;</code>](#Locations)
<p>process</p>

**Kind**: instance method of [<code>Locations</code>](#Locations)  

| Param | Type |
| --- | --- |
| section | <code>Section</code> | 

<a name="Locations+parse"></a>

## locations.parse(contents, cfiBase, [chars]) ⇒ [<code>Promise.&lt;Locations&gt;</code>](#Locations)
<p>parse</p>

**Kind**: instance method of [<code>Locations</code>](#Locations)  

| Param | Type |
| --- | --- |
| contents | <code>Element</code> | 
| cfiBase | <code>string</code> | 
| [chars] | <code>number</code> | 

<a name="Locations+locationOf"></a>

## locations.locationOf(item, array, [compareFunc], [start], [end]) ⇒ <code>number</code>
<p>Finds where something would fit into a sorted array</p>

**Kind**: instance method of [<code>Locations</code>](#Locations)  
**Returns**: <code>number</code> - <p>location (index in array)</p>  

| Param | Type | Description |
| --- | --- | --- |
| item | <code>Location</code> |  |
| array | <code>Array.&lt;Location&gt;</code> |  |
| [compareFunc] | <code>function</code> | <p>colback func</p> |
| [start] | <code>function</code> |  |
| [end] | <code>function</code> |  |

<a name="Locations+locationFromCfi"></a>

## locations.locationFromCfi(value) ⇒ <code>number</code>
<p>Get a location from an EpubCFI</p>

**Kind**: instance method of [<code>Locations</code>](#Locations)  
**Returns**: <code>number</code> - <p>Location index or -1 otherwise</p>  

| Param | Type | Description |
| --- | --- | --- |
| value | <code>string</code> \| <code>EpubCFI</code> | <p>EpubCFI</p> |

<a name="Locations+percentageFromCfi"></a>

## locations.percentageFromCfi(cfi) ⇒ <code>number</code>
<p>Get a percentage position in locations from an EpubCFI</p>

**Kind**: instance method of [<code>Locations</code>](#Locations)  
**Returns**: <code>number</code> - <p>Percentage</p>  

| Param | Type | Description |
| --- | --- | --- |
| cfi | <code>string</code> \| <code>EpubCFI</code> | <p>EpubCFI</p> |

<a name="Locations+percentageFromLocation"></a>

## locations.percentageFromLocation(index) ⇒ <code>number</code>
<p>Get a percentage position from a location index</p>

**Kind**: instance method of [<code>Locations</code>](#Locations)  
**Returns**: <code>number</code> - <p>Percentage</p>  

| Param | Type | Description |
| --- | --- | --- |
| index | <code>number</code> | <p>Location index</p> |

<a name="Locations+cfiFromLocation"></a>

## locations.cfiFromLocation(index) ⇒ <code>string</code> \| <code>null</code>
<p>Get an EpubCFI from location index</p>

**Kind**: instance method of [<code>Locations</code>](#Locations)  
**Returns**: <code>string</code> \| <code>null</code> - <p>EpubCFI string format</p>  

| Param | Type | Description |
| --- | --- | --- |
| index | <code>number</code> | <p>Location index</p> |

<a name="Locations+cfiFromPercentage"></a>

## locations.cfiFromPercentage(value) ⇒ <code>string</code> \| <code>null</code>
<p>Get an EpubCFI from location percentage</p>

**Kind**: instance method of [<code>Locations</code>](#Locations)  
**Returns**: <code>string</code> \| <code>null</code> - <p>EpubCFI string format</p>  

| Param | Type | Description |
| --- | --- | --- |
| value | <code>number</code> | <p>Percentage in ranging from 0 to 1</p> |

<a name="Locations+load"></a>

## locations.load(locations) ⇒ [<code>Locations</code>](#Locations)
<p>Load locations from JSON</p>

**Kind**: instance method of [<code>Locations</code>](#Locations)  

| Param | Type |
| --- | --- |
| locations | <code>string</code> | 

<a name="Locations+save"></a>

## locations.save([type]) ⇒ <code>string</code>
<p>Save locations to JSON</p>

**Kind**: instance method of [<code>Locations</code>](#Locations)  
**Returns**: <code>string</code> - <p>A JSON string</p>  

| Param | Type | Description |
| --- | --- | --- |
| [type] | <code>number</code> | <p>default 0, compact array 1</p> |

<a name="Locations+set"></a>

## locations.set(key, val) ⇒ <code>any</code>
<p>Set current location</p>

**Kind**: instance method of [<code>Locations</code>](#Locations)  
**Returns**: <code>any</code> - <p>Locations</p>  

| Param | Type | Description |
| --- | --- | --- |
| key | <code>any</code> | <p>EpubCFI to string</p> |
| val | <code>any</code> | <p>Location</p> |

**Example**  
```js
locations.set(key, val)
```
**Example**  
```js
locations.set({ start: { cfi } })
```
**Example**  
```js
locations.set({ start: { index } })
```
**Example**  
```js
locations.set({ start: { percentage } })
```
**Example**  
```js
locations.set({ start, end })
```
<a name="Locations+clear"></a>

## locations.clear()
<p>Clear locations</p>

**Kind**: instance method of [<code>Locations</code>](#Locations)  
<a name="Locations+destroy"></a>

## locations.destroy()
<p>Destroy the Locations object</p>

**Kind**: instance method of [<code>Locations</code>](#Locations)  
<a name="Locations.current"></a>

## Locations.current : <code>Location</code>
<p>Current Location</p>

**Kind**: static property of [<code>Locations</code>](#Locations)  
**Read only**: true  
**Properties**

| Name | Type |
| --- | --- |
| start | <code>object</code> | 
| end | <code>object</code> | 

<a name="Locations.generated"></a>

## Locations.generated : [<code>Promise.&lt;Locations&gt;</code>](#Locations)
**Kind**: static property of [<code>Locations</code>](#Locations)  
**Read only**: true  
<a name="Locations.event_changed"></a>

## "changed" (current, changed)
<p>Current location changed</p>

**Kind**: event emitted by [<code>Locations</code>](#Locations)  

| Param | Type | Description |
| --- | --- | --- |
| current | <code>object</code> | <p>Current location</p> |
| changed | <code>object</code> | <p>Changed properties</p> |

