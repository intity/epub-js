<a name="proxyMouse"></a>

# proxyMouse(target, marks)
<p>Start proxying all mouse events that occur on the target node to each node in
a set of tracked marks.</p>
<p>The marks in tracked do not strictly have to be DOM Nodes, but they do have
to have dispatchEvent, getBoundingClientRect, and getClientRects methods.</p>

**Kind**: global function  

| Param | Type | Description |
| --- | --- | --- |
| target | <code>Node</code> | <p>The node on which to listen for mouse events.</p> |
| marks | <code>Array.&lt;Mark&gt;</code> | <p>A (possibly mutable) array of marks to which to proxy events.</p> |

