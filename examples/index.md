# Examples

This section of the documentation contains a list of links to examples that demonstrate the basic features of the **epub-js** library. This may be useful for developers who want to use this library in their projects. Most examples present only one feature to make it easier for developers to understand the specifics of the implementation.

## Layout rendering control

Specification section: [Reflowable layouts](https://www.w3.org/TR/epub/#flow)

Metadata property: `rendition:flow`

1. [Spreading a document into pages](paginated.html)

    Metadata value: `paginated`
    
    Display an ebook two pages at a time. Sections of the ebook are displayed separately so if a section has a single page or an odd number of pages it will display with a blank page on the right.

2. [Continuous swiping of pages (mobile)](paginated-continuous.html)

    Metadata value: `paginated`

    This example is for devices that support the touch events API (see [Using Touch Events](https://developer.mozilla.org/en-US/docs/Web/API/Touch_events/Using_Touch_Events)).

    The fundamental difference from example (1) is that the views container can include many items. This can be thought of as a stack of views, with the previous, current, and next views arranged sequentially. Only the current view is displayed on the screen; the others are always hidden. However, this rendering method requires more computing resources. To navigate through pages, use swipe touch.

3. [Scrolling a document](scrolled.html)

    Metadata value: `scrolled-doc`

    In this example, the `flow` option is defined as `scrolled`. Each section of the book is displayed within the bounds of the `views-container`, with a scrollable hidden area. To navigate between sections, use the left and right arrows, as well as key bindings.

4. [Continuous scrolling of documents](scrolled-doc.html)

    Metadata value: `scrolled-doc`

    Displays each **section** or **chapter** of the ebook in its entirety as a single page of variable height that you can scroll up and down. The difference from example (3) is that the width and height of `views-container` is 100%, and the `pageWidth` option is 800.

5. [Continuous scrolling of documents (mobile)](scrolled-continuous.html)

    Metadata value: `scrolled-continuous`

    The view is the same as in example (2). However, the documents are not divided into pages, but scrolled along the vertical axis.

6. [Layout](layout.html)

    This example combines examples (1,3,4) in one. Basically, this example is needed to test layout features.

>Note: Although the `rendition:flow` property value is defined as `scrolled-doc` for the (3) and (4) examples, they are different at the layout level.

## Navigation controls

7. [Table of Contents](toc.html)

    This example represents table of contents as a drop-down list of sections.

8. [Locations](locations.html)

    This example demonstrates how to implement a range based on the content of a book as a percentage. First, the `book.locations` array is generated. This data is then used to calculate each location's percentage.

## Annotation controls

9. [Highlight](annotations-highlight.html)

    Adds the ability to highlight text in the ebook. This version provides no mechanism for saving highlights after the browser is closed. It is an example of capability rather than a working implementation. It works as follows: When a section of text is selected a `rendition.on("selected"...)` function notes the location of the beginning and ending of the selected text. Two things happen. The code adds a new element to the outer page in a list at the bottom describing the selection and providing a "remove" link.

10. [Underline](annotations-underline.html)

    Unlike example (9), this example demonstrates underlining annotations (without background color).

## Opening a book from a local file

11. [Open book from File](input.html)

    Allows you to select an epub file from your local computer that gets rendered in the browser.

12. [Open book from File with Storage](input-with-storage.html)

    This example is similar to example (11), but using the Storage interface.

    >Note: The `book-0` key is constant for any open book. If the user reloads the page, the book will be loaded from the browser storage using the already known key. However, if the user opens another book, the data in the storage will be overwritten.

## Other means of rendering

13. [Contents](contents.html)

    This example demonstrates the `innerText` rendering from range, which was obtained from EpubCFI format string.

14. [Renderless](renderless.html)

    The name for this example is misleading since the book certainly does render. What's unique in this example is that the book's table of contents is read in and a list of sections in developed, then each section is rendered as it is called for by a `section.render()` call, but there's no master `book.renderTo()` call. Functionlly this seems exactly the same as (3) example.

## Other examples

15. [Archived](archived.html)

    Display ebook from an `*.epub` file rather than an unzipped folder. This may be substantially slower for large ebooks.

16. [Hooks](hooks.html)

    This example shows how to insert external javascript and external css files into a book after the book has been loaded into memory. This might, for example, allow you to override internal css from the ebook to change fonts and `text-size` by either replacing a css file from the ebook or calling a JavaScript that gets added to the inside of the ebook such as adding jQuery inside the ebook. For example: this could be used to have + and - buttons that increase or decrease the `font-size` in the ebook. When the + or - button is pressed it could call to insert and execute a script to replace the font-size of paragraph elements with one slightly larger or smaller. This example doesn't actually implement any such thing, it just shows how to insert the code, or insert a css file.

    You can't just run a script on the outer page to change things inside the rendered ebook because the ebook is rendered inside an `iframe`. This mechanism lets you inject things into the `iframe` and run them after the book is rendered.

17. [Open book from search options](path.html)

    Use the `URI` search option to override the path from the remote server.

    Input example (add to the end of the URL):

    ```
    localhost/examples/path.html?URI=url/to/book.epub
    ```

    By default, the relative path to the **Alice** book located on the local server is used.

18. [Storage](storage.html)

    This example demonstrates a storage feature to keep the book rendering running when disconnected from the internet.

19. [Storage when unarchive](storage-when-unarchive.html)

    This example is similar to example (18). However, in this case, the book is opened from a directory. In addition, we set the `replacements` option to `base64` for performance comparison.

20. [Themes](themes.html)

    This example demonstrates the features to register and configure custom themes for a book.