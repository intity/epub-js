# Reading System Features

Supported features of the reading system.

Name               | Description
-------------------|------------
`dom-manipulation` | Scripts may make structural changes to the document’s DOM [1].
`layout-changes`   | Scripts may modify attributes and CSS styles that affect content layout [1].
`touch-events`     | The device supports touch events, and the reading system passes touch events to the content.
`mouse-events`     | The device supports mouse events, and the reading system passes mouse events to the content.
`keyboard-events`  | The device supports keyboard events, and the reading system passes keyboard events to the content.
`spine-scripting`  | Indicates whether the reading system supports spine-level scripting [2].

[1] applies to [spine-level scripting](https://www.w3.org/TR/epub-33/#sec-scripted-spine) [epub-33] only.

[2] e.g., so a container-constrained script [epub-33] can determine whether any actions that depend on scripting support in a top-level content document have any chance of success before attempting them.