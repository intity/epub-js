<a name="Container"></a>

# Container
<p>Parsing the Epub Container</p>

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
<p>Constructor</p>

<a name="Container+clear"></a>

## container.clear()
<p>Clear parts</p>

**Kind**: instance method of [<code>Container</code>](#Container)  
<a name="Container+parse"></a>

## container.parse(doc) ⇒ [<code>Promise.&lt;Container&gt;</code>](#Container)
<p>Parse the Container XML</p>

**Kind**: instance method of [<code>Container</code>](#Container)  

| Param | Type |
| --- | --- |
| doc | <code>Document</code> | 

<a name="Container+load"></a>

## container.load(container) ⇒ [<code>Promise.&lt;Container&gt;</code>](#Container)
<p>Load a container from JSON</p>

**Kind**: instance method of [<code>Container</code>](#Container)  

| Param | Type |
| --- | --- |
| container | <code>object</code> | 

<a name="Container+destroy"></a>

## container.destroy()
<p>destroy</p>

**Kind**: instance method of [<code>Container</code>](#Container)  
<a name="Container.directory"></a>

## Container.directory : <code>string</code>
<p>Package directory</p>

**Kind**: static property of [<code>Container</code>](#Container)  
**Read only**: true  
<a name="Container.fullPath"></a>

## Container.fullPath : <code>string</code>
<p>Path to package file</p>

**Kind**: static property of [<code>Container</code>](#Container)  
**Read only**: true  
<a name="Container.encoding"></a>

## Container.encoding : <code>string</code>
<p>Encoding</p>

**Kind**: static property of [<code>Container</code>](#Container)  
**Read only**: true  
<a name="Container.mediaType"></a>

## Container.mediaType : <code>string</code>
<p>Media type</p>

**Kind**: static property of [<code>Container</code>](#Container)  
**Read only**: true  
<a name="Container.version"></a>

## Container.version : <code>string</code>
**Kind**: static property of [<code>Container</code>](#Container)  
**Read only**: true  
