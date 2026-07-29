<a name="Defer"></a>

# Defer
<p>Creates a new pending promise and provides methods to resolve or reject it.</p>

**Kind**: global class  

* [Defer](#Defer)
    * [new Defer()](#new_Defer_new)
    * _instance_
        * [.destroy()](#Defer+destroy)
    * _static_
        * [.id](#Defer.id) : <code>string</code>
        * [.dump](#Defer.dump) : <code>object</code>
        * [.resolve](#Defer.resolve) : <code>function</code>
        * [.reject](#Defer.reject) : <code>function</code>
        * [.promise](#Defer.promise) : <code>Promise</code>

<a name="new_Defer_new"></a>

## new Defer()
<p>Constructor</p>

<a name="Defer+destroy"></a>

## defer.destroy()
<p>Dectroy the Defer object</p>

**Kind**: instance method of [<code>Defer</code>](#Defer)  
<a name="Defer.id"></a>

## Defer.id : <code>string</code>
**Kind**: static property of [<code>Defer</code>](#Defer)  
**Read only**: true  
<a name="Defer.dump"></a>

## Defer.dump : <code>object</code>
<p>Dump for debug trace</p>

**Kind**: static property of [<code>Defer</code>](#Defer)  
<a name="Defer.resolve"></a>

## Defer.resolve : <code>function</code>
<p>A method to resolve the associated Promise with the value passed.
If the promise is already settled it does nothing.</p>

**Kind**: static property of [<code>Defer</code>](#Defer)  
**Read only**: true  

| Param | Type | Description |
| --- | --- | --- |
| value | <code>any</code> | <p>: This value is used to resolve the promise If the value is a Promise then the associated promise assumes the state of Promise passed as value.</p> |

<a name="Defer.reject"></a>

## Defer.reject : <code>function</code>
<p>A method to reject the associated Promise with the value passed.
If the promise is already settled it does nothing.</p>

**Kind**: static property of [<code>Defer</code>](#Defer)  
**Read only**: true  

| Param | Type | Description |
| --- | --- | --- |
| reason | <code>any</code> | <p>: The reason for the rejection of the Promise. Generally its an Error object. If however a Promise is passed, then the Promise itself will be the reason for rejection no matter the state of the Promise.</p> |

<a name="Defer.promise"></a>

## Defer.promise : <code>Promise</code>
<p>A newly created Pomise object.
Initially in pending state.</p>

**Kind**: static property of [<code>Defer</code>](#Defer)  
**Read only**: true  
