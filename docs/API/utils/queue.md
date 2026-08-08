<a name="Queue"></a>

# Queue ⇐ <code>Array</code>
<p>Queue for handling tasks one at a time</p>

**Kind**: global class  
**Extends**: <code>Array</code>  

* [Queue](#Queue) ⇐ <code>Array</code>
    * [new Queue(context)](#new_Queue_new)
    * [.enqueue(task, ...args)](#Queue+enqueue) ⇒ <code>Promise.&lt;any&gt;</code>
    * [.dequeue()](#Queue+dequeue) ⇒ <code>Promise.&lt;any&gt;</code>
    * [.dump()](#Queue+dump)
    * [.run()](#Queue+run) ⇒ <code>Promise.&lt;any&gt;</code>
    * [.clear()](#Queue+clear)
    * [.pause()](#Queue+pause)
    * [.stop()](#Queue+stop)
    * [.destroy()](#Queue+destroy)

<a name="new_Queue_new"></a>

## new Queue(context)
<p>Constructor</p>


| Param | Type | Description |
| --- | --- | --- |
| context | <code>object</code> | <p>what this will resolve to in the tasks</p> |

<a name="Queue+enqueue"></a>

## queue.enqueue(task, ...args) ⇒ <code>Promise.&lt;any&gt;</code>
<p>Add an item to the queue</p>

**Kind**: instance method of [<code>Queue</code>](#Queue)  

| Param | Type |
| --- | --- |
| task | <code>any</code> | 
| ...args | <code>Array</code> | 

<a name="Queue+dequeue"></a>

## queue.dequeue() ⇒ <code>Promise.&lt;any&gt;</code>
<p>Run one item</p>

**Kind**: instance method of [<code>Queue</code>](#Queue)  
<a name="Queue+dump"></a>

## queue.dump()
<p>Run All Immediately</p>

**Kind**: instance method of [<code>Queue</code>](#Queue)  
<a name="Queue+run"></a>

## queue.run() ⇒ <code>Promise.&lt;any&gt;</code>
<p>Run all tasks sequentially, at convince</p>

**Kind**: instance method of [<code>Queue</code>](#Queue)  
<a name="Queue+clear"></a>

## queue.clear()
<p>Clear all items in wait</p>

**Kind**: instance method of [<code>Queue</code>](#Queue)  
<a name="Queue+pause"></a>

## queue.pause()
<p>Pause a running queue</p>

**Kind**: instance method of [<code>Queue</code>](#Queue)  
<a name="Queue+stop"></a>

## queue.stop()
<p>End the queue</p>

**Kind**: instance method of [<code>Queue</code>](#Queue)  
<a name="Queue+destroy"></a>

## queue.destroy()
<p>Destroy the Queue object</p>

**Kind**: instance method of [<code>Queue</code>](#Queue)  
