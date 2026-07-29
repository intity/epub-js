<a name="Themes"></a>

# Themes
<p>Themes to apply to displayed content</p>

**Kind**: global class  

* [Themes](#Themes)
    * [new Themes(rendition)](#new_Themes_new)
    * _instance_
        * [.register(args)](#Themes+register)
        * [.registerThemes(themes)](#Themes+registerThemes)
        * [.registerUrl(name, input)](#Themes+registerUrl)
        * [.registerRules(name, rules)](#Themes+registerRules)
        * [.select([name])](#Themes+select)
        * [.clear()](#Themes+clear)
        * [.appendRule(name, value, [priority])](#Themes+appendRule)
        * [.removeRule(name)](#Themes+removeRule)
        * [.removeRules()](#Themes+removeRules)
        * [.fontSize(size)](#Themes+fontSize)
        * [.font(f)](#Themes+font)
        * [.destroy()](#Themes+destroy)
    * _static_
        * [.current](#Themes.current) : <code>string</code>
        * [.rules](#Themes.rules) : <code>object</code>
        * ["selected" (name, theme)](#Themes.event_selected)
        * ["injected" (key, theme, contents)](#Themes.event_injected)
        * ["rejected" (key, theme, contents)](#Themes.event_rejected)

<a name="new_Themes_new"></a>

## new Themes(rendition)
<p>Constructor</p>


| Param | Type |
| --- | --- |
| rendition | <code>Rendition</code> | 

<a name="Themes+register"></a>

## themes.register(args)
<p>Add themes to be used by a rendition</p>

**Kind**: instance method of [<code>Themes</code>](#Themes)  

| Param | Type |
| --- | --- |
| args | <code>IArguments</code> | 

**Example**  
```js
register("light", "/path/to/light.css")
```
**Example**  
```js
register("light", "https://example.com/to/light.css")
```
**Example**  
```js
register("light", { body: { color: "purple"}})
```
**Example**  
```js
register({ light: {...}, dark: {...}})
```
<a name="Themes+registerThemes"></a>

## themes.registerThemes(themes)
<p>Register themes object</p>

**Kind**: instance method of [<code>Themes</code>](#Themes)  

| Param | Type |
| --- | --- |
| themes | <code>object</code> | 

<a name="Themes+registerUrl"></a>

## themes.registerUrl(name, input)
<p>Register a url</p>

**Kind**: instance method of [<code>Themes</code>](#Themes)  

| Param | Type | Description |
| --- | --- | --- |
| name | <code>string</code> | <p>Theme name</p> |
| input | <code>string</code> | <p>URL string</p> |

**Example**  
```js
registerUrl("light", "light.css")
```
**Example**  
```js
registerUrl("light", "http://example.com/light.css")
```
<a name="Themes+registerRules"></a>

## themes.registerRules(name, rules)
<p>Register rule</p>

**Kind**: instance method of [<code>Themes</code>](#Themes)  

| Param | Type |
| --- | --- |
| name | <code>string</code> | 
| rules | <code>object</code> | 

**Example**  
```js
registerRules("light", { body: { color: "purple"}})
```
<a name="Themes+select"></a>

## themes.select([name])
<p>Use null to reject the current selected theme</p>

**Kind**: instance method of [<code>Themes</code>](#Themes)  

| Param | Type | Description |
| --- | --- | --- |
| [name] | <code>string</code> | <p>Theme name</p> |

<a name="Themes+clear"></a>

## themes.clear()
<p>Clear all themes</p>

**Kind**: instance method of [<code>Themes</code>](#Themes)  
<a name="Themes+appendRule"></a>

## themes.appendRule(name, value, [priority])
<p>Append rule</p>

**Kind**: instance method of [<code>Themes</code>](#Themes)  

| Param | Type | Default |
| --- | --- | --- |
| name | <code>string</code> |  | 
| value | <code>string</code> |  | 
| [priority] | <code>boolean</code> | <code>false</code> | 

<a name="Themes+removeRule"></a>

## themes.removeRule(name)
<p>Remove rule</p>

**Kind**: instance method of [<code>Themes</code>](#Themes)  

| Param | Type |
| --- | --- |
| name | <code>string</code> | 

<a name="Themes+removeRules"></a>

## themes.removeRules()
<p>Remove all rules</p>

**Kind**: instance method of [<code>Themes</code>](#Themes)  
<a name="Themes+fontSize"></a>

## themes.fontSize(size)
<p>Adjust the font size of a rendition</p>

**Kind**: instance method of [<code>Themes</code>](#Themes)  

| Param | Type |
| --- | --- |
| size | <code>string</code> | 

<a name="Themes+font"></a>

## themes.font(f)
<p>Adjust the font-family of a rendition</p>

**Kind**: instance method of [<code>Themes</code>](#Themes)  

| Param | Type |
| --- | --- |
| f | <code>string</code> | 

<a name="Themes+destroy"></a>

## themes.destroy()
<p>destroy</p>

**Kind**: instance method of [<code>Themes</code>](#Themes)  
<a name="Themes.current"></a>

## Themes.current : <code>string</code>
**Kind**: static property of [<code>Themes</code>](#Themes)  
**Read only**: true  
<a name="Themes.rules"></a>

## Themes.rules : <code>object</code>
<p>Injected css rules</p>

**Kind**: static property of [<code>Themes</code>](#Themes)  
**Read only**: true  
<a name="Themes.event_selected"></a>

## "selected" (name, theme)
<p>Emit which occurs when theme is selected</p>

**Kind**: event emitted by [<code>Themes</code>](#Themes)  

| Param | Type | Description |
| --- | --- | --- |
| name | <code>string</code> | <p>Theme key</p> |
| theme | <code>object</code> | <p>Theme value</p> |

<a name="Themes.event_injected"></a>

## "injected" (key, theme, contents)
<p>Emit of injected a stylesheet into contents</p>

**Kind**: event emitted by [<code>Themes</code>](#Themes)  

| Param | Type | Description |
| --- | --- | --- |
| key | <code>string</code> | <p>Theme key</p> |
| theme | <code>object</code> | <p>Theme value</p> |
| contents | <code>Contents</code> |  |

<a name="Themes.event_rejected"></a>

## "rejected" (key, theme, contents)
<p>Emit of rejected a stylesheet into contents</p>

**Kind**: event emitted by [<code>Themes</code>](#Themes)  

| Param | Type | Description |
| --- | --- | --- |
| key | <code>string</code> | <p>Theme key</p> |
| theme | <code>object</code> | <p>Theme value</p> |
| contents | <code>Contents</code> |  |

