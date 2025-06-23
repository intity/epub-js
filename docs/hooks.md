# Hooks

The parts of the rendering process that can be hooked into are below.

Spine hooks

```js
book.spine.hooks.content // Section has been loaded and parsed
book.spine.hooks.serialize // Section is being converted to text
```

Rendition hooks

```js
rendition.hooks.render // Section is rendered to the screen
rendition.hooks.content // Section contents have been loaded
rendition.hooks.unloaded // Section contents are being unloaded
```