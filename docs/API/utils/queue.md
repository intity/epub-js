<a name="Queue"></a>

# Queue ⇐ <code>Array</code>
Queue for handling tasks one at a time

**Kind**: global class  
**Extends**: <code>Array</code>  

* [Queue](#Queue) ⇐ <code>Array</code>
    * [new Queue(context)](#new_Queue_new)
    * [.enqueue(task, [...args])](#Queue+enqueue) ⇒ <code>Promise.&lt;any&gt;</code>
    * [.dequeue()](#Queue+dequeue) ⇒ <code>Promise.&lt;any&gt;</code>
    * [.dump()](#Queue+dump)
    * [.run()](#Queue+run) ⇒ <code>Promise.&lt;any&gt;</code>
    * [.clear()](#Queue+clear)
    * [.pause()](#Queue+pause)
    * [.stop()](#Queue+stop)
    * [.destroy()](#Queue+destroy)

<a name="new_Queue_new"></a>

## new Queue(context)
Constructor


| Param | Type | Description |
| --- | --- | --- |
| context | <code>object</code> | what this will resolve to in the tasks |

<a name="Queue+enqueue"></a>

## queue.enqueue(task, [...args]) ⇒ <code>Promise.&lt;any&gt;</code>
Add an item to the queue

**Kind**: instance method of [<code>Queue</code>](#Queue)  

| Param | Type |
| --- | --- |
| task | <code>any</code> | 
| [...args] | <code>Array.&lt;any&gt;</code> | 

<a name="Queue+dequeue"></a>

## queue.dequeue() ⇒ <code>Promise.&lt;any&gt;</code>
Run one item

**Kind**: instance method of [<code>Queue</code>](#Queue)  
<a name="Queue+dump"></a>

## queue.dump()
Run All Immediately

**Kind**: instance method of [<code>Queue</code>](#Queue)  
<a name="Queue+run"></a>

## queue.run() ⇒ <code>Promise.&lt;any&gt;</code>
Run all tasks sequentially, at convince

**Kind**: instance method of [<code>Queue</code>](#Queue)  
<a name="Queue+clear"></a>

## queue.clear()
Clear all items in wait

**Kind**: instance method of [<code>Queue</code>](#Queue)  
<a name="Queue+pause"></a>

## queue.pause()
Pause a running queue

**Kind**: instance method of [<code>Queue</code>](#Queue)  
<a name="Queue+stop"></a>

## queue.stop()
End the queue

**Kind**: instance method of [<code>Queue</code>](#Queue)  
<a name="Queue+destroy"></a>

## queue.destroy()
Destroy the Queue object

**Kind**: instance method of [<code>Queue</code>](#Queue)  
