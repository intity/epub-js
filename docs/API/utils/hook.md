<a name="Hook"></a>

# Hook
<p>Hooks allow for injecting functions that must all complete in order before finishing
They will execute in parallel but all must finish before continuing
Functions may return a promise if they are async.</p>

**Kind**: global class  

* [Hook](#Hook)
    * [new Hook(context)](#new_Hook_new)
    * _instance_
        * [.register()](#Hook+register)
        * [.deregister()](#Hook+deregister)
        * [.trigger()](#Hook+trigger) ⇒ <code>Array.&lt;Promise&gt;</code>
        * [.list()](#Hook+list) ⇒ <code>Array</code>
        * [.clear()](#Hook+clear)
    * _static_
        * [.tasks](#Hook.tasks) : <code>Array</code>

<a name="new_Hook_new"></a>

## new Hook(context)
<p>Constructor</p>


| Param | Type | Description |
| --- | --- | --- |
| context | <code>any</code> | <p>scope of this</p> |

**Example**  
```js
this.content = new Hook(this);
```
<a name="Hook+register"></a>

## hook.register()
<p>Adds a function to be run before a hook completes</p>

**Kind**: instance method of [<code>Hook</code>](#Hook)  
**Example**  
```js
this.content.register(() => {...});
```
<a name="Hook+deregister"></a>

## hook.deregister()
<p>Removes a function</p>

**Kind**: instance method of [<code>Hook</code>](#Hook)  
**Example**  
```js
this.content.deregister(() => {...});
```
<a name="Hook+trigger"></a>

## hook.trigger() ⇒ <code>Array.&lt;Promise&gt;</code>
<p>Triggers a hook to run all functions</p>

**Kind**: instance method of [<code>Hook</code>](#Hook)  
**Example**  
```js
this.content.trigger(args).then(() => {...});
```
<a name="Hook+list"></a>

## hook.list() ⇒ <code>Array</code>
<p>list</p>

**Kind**: instance method of [<code>Hook</code>](#Hook)  
<a name="Hook+clear"></a>

## hook.clear()
<p>clear</p>

**Kind**: instance method of [<code>Hook</code>](#Hook)  
<a name="Hook.tasks"></a>

## Hook.tasks : <code>Array</code>
**Kind**: static property of [<code>Hook</code>](#Hook)  
**Read only**: true  
