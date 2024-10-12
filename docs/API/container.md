<a name="Container"></a>

# Container
Parsing the Epub Container

**Kind**: global class  
**Link**: https://www.w3.org/TR/epub/#sec-container-metainf  

* [Container](#Container)
    * [new Container()](#new_Container_new)
    * _instance_
        * [.clear()](#Container+clear)
        * [.parse(doc)](#Container+parse) ⇒ [<code>Promise.&lt;Container&gt;</code>](#Container)
        * [.load(container)](#Container+load) ⇒ [<code>Promise.&lt;Container&gt;</code>](#Container)
        * [.destroy()](#Container+destroy)
    * _static_
        * [.directory](#Container.directory) : <code>string</code>
        * [.fullPath](#Container.fullPath) : <code>string</code>
        * [.encoding](#Container.encoding) : <code>string</code>
        * [.mediaType](#Container.mediaType) : <code>string</code>
        * [.version](#Container.version) : <code>string</code>

<a name="new_Container_new"></a>

## new Container()
Constructor

<a name="Container+clear"></a>

## container.clear()
Clear parts

**Kind**: instance method of [<code>Container</code>](#Container)  
<a name="Container+parse"></a>

## container.parse(doc) ⇒ [<code>Promise.&lt;Container&gt;</code>](#Container)
Parse the Container XML

**Kind**: instance method of [<code>Container</code>](#Container)  

| Param | Type |
| --- | --- |
| doc | <code>Document</code> | 

<a name="Container+load"></a>

## container.load(container) ⇒ [<code>Promise.&lt;Container&gt;</code>](#Container)
Load a container from JSON

**Kind**: instance method of [<code>Container</code>](#Container)  

| Param | Type |
| --- | --- |
| container | <code>object</code> | 

<a name="Container+destroy"></a>

## container.destroy()
destroy

**Kind**: instance method of [<code>Container</code>](#Container)  
<a name="Container.directory"></a>

## Container.directory : <code>string</code>
Package directory

**Kind**: static property of [<code>Container</code>](#Container)  
**Read only**: true  
<a name="Container.fullPath"></a>

## Container.fullPath : <code>string</code>
Path to package file

**Kind**: static property of [<code>Container</code>](#Container)  
**Read only**: true  
<a name="Container.encoding"></a>

## Container.encoding : <code>string</code>
Encoding

**Kind**: static property of [<code>Container</code>](#Container)  
**Read only**: true  
<a name="Container.mediaType"></a>

## Container.mediaType : <code>string</code>
Media type

**Kind**: static property of [<code>Container</code>](#Container)  
**Read only**: true  
<a name="Container.version"></a>

## Container.version : <code>string</code>
**Kind**: static property of [<code>Container</code>](#Container)  
**Read only**: true  
