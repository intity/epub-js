# Rendering System Architecture

>Document status: draft

The architecture of the rendering system contains many abstractions that help to solve complex problems. In particular, customizing the layout of pages in different views. The central place in the rendering system is occupied by the [Layout](API/layout.md) class, which provides the basic infrastructure for performing derivative calculations.

Below is the graph of dependencies on the **layout** object.

<img src="../assets/img/deps.svg" class="horizontal" />

Most of the dependent objects rely on the `layout.updated` event to finish synchronizing with the current state of the `layout` object. The `layout` object itself depends on the `viewport.resized` event. This happens every time the **viewport-container** is resized.

However, the `layout` object knows nothing about containers, since it is only intended for calculations. Containers are created and configured by the [Viewport](API/viewport.md) class. The following image should clarify the technical details.

<img src="../assets/img/rendition-viewport.svg" class="horizontal" />

First of all, this class must attach to the `div#viewport` element, in order to then wrap the `div.viewport-container` inside it. This, in turn, will run the `viewport.resized` event, which will change the state of the `layout` object. Finally, the rendering process at the `manager` object level must be triggered.

## Horizontal axis

### rendition-flow-paginated

Configuration

```js
var rendition = book.renderTo("viewport", {
    axis: "horizontal", // default
    flow: "paginated", // default
    width: "100%", // default
    height: "100%", // default
    layout: "reflowable", // default
    spread: "none",
    manager: "default"
})
```

Designations

```
SW:viewport.container.scrollWidth
SL:viewport.container.scrollLeft
CW:layout.width = viewport.container.clientWidth
CH:layout.height = viewport.container.clientHeight
PW:layout.pageWidth = CW
PH:layout.pageHeight = CH
```

<img src="../assets/img/rendition-flow-painated.svg" class="horizontal" />

## Vertical axis

### rendotion-flow-scrolled-doc

Configuration

```js
var rendition = book.renderTo("viewport", {
    axis: "vertical", // autocomplete
    flow: "scrolled-doc",
    width: "100%", // default
    height: "100%", // default
    layout: "reflowable", // default
    spread: "none", // autocomplete
    manager: "continuous",
    pageWidth: 800
})
```

Designations

```
SH:viewport.container.scrollHeight
ST:viewport.container.scrollTop
CW:layout.width = viewport.container.clientWidth
CH:layout.height = viewport.container.clientHeight
PW:layout.pageWidth = 800
PH:layout.pageHeight = 0
GL:layout.gap
VH:view.contents.content.clientHeight
```

<img src="../assets/img/rendition-flow-scrolled-doc.svg" width=380 />

### rendition-flow-scrolled-continuous

Configuration

```js
var rendition = book.renderTo("viewport", {
    axis: "vertical", // autocomplete
    flow: "scrolled-continuous",
    width: "100%", // default
    height: "100%", // default
    layout: "reflowable", // default
    spread: "none", // autocomplete
    manager: "continuous"
})
```

Designations

```
SH:viewport.container.scrollHeight
ST:viewport.container.scrollTop
CW:layout.width = viewport.container.clientWidth
CH:layout.height = viewport.container.clientHeight
PW:layout.pageWidth = CW
PH:layout.pageHeight = CH
VH:view.contents.content.clientHeight
```

<img src="../assets/img/rendition-flow-scrolled-continuous.svg" width=380 />