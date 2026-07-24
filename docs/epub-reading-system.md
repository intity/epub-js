# EPUB Reading System

>Document status: Draft

Specification: [EPUB Reading Systems 3.4](https://www.w3.org/TR/epub-rs-34/)

Supported features of the reading system.

## Backend

>Feature status: `develop`

The REST API concept.

1. Request book metadata by `pubId`:

```sh
curl http://localhost/?pubId=edu.nyu.itp.future-of-publishing.alice-in-wonderland
```

Response metadata in JSON format:

```json
{
  "contributor": "Gordon Robinson",
  "creator": "Lewis Carroll",
  "identifier": "edu.nyu.itp.future-ofpublishing.alice-in-wonderland",
  "language": "en-US",
  "license": "",
  "rights": "Public domain in the USA.",
  "source": "http://www.gutenberg.org/files/19033/19033-h/19033-h.htm",
  "subject": "fantasy",
  "title": "Alice's Adventures in Wonderland",
  "type": "@book"
}
```

2. Request `spine` by `pubId` and `package`:

```sh
curl http://localhost/?pubId=identifier_str&package=spine
```

Response:

```json
{
  "spine": [
    {"0": "cover"},
    {"1": "nav"},
    {"2": "titlepage"},
    {"3": "chapter_001"},
    {"N": "chapter_00N"}
  ]
}
```

3. Request `itemref` by `pubId` and `index`:

```sh
curl http://localhost/?pubId=identifier_str&index=3
```

Response:

```json
{
  "index": 3,
  "idref": "chapter_001",
  "title": "Down The Rabbit-Hole",
  "range": ["/6/8!/4/2/2[pgepubid00004]/1:0", "/6/8!/4/2/44/1:281"],
  "data": "",
  "type": "chapter"
}
```

4. Request range by `pubId` and `index` and `epubcfi`:

```sh
curl http://localhost/?pubId=identifier_str&index=3&epubcfi=...
```

Response to range format:

```json
{
  "index": 3,
  "idref": "chapter_003",
  "title": "Down The Rabbit-Hole",
  "range": ["A...", "...B"],
  "data": "A...B",
  "type": "chapter"
}
```

>In this case, only the `range` array changes, depending on `epubcfi`.

5. Request by `md5`:

```sh
curl http://localhost/?md5=d6d1d3258600881142ebce23e0be0c5b
```
Response to (1)

>This interface is for internal use because MD5 may change when optimizing the EPUB container data.

## Frontend

>Feature status: `develop`

Status number: `0` - unsupported; `1` - supported; `2` - partially supported

 Name              | Status | Description
-------------------|--------|------------
`dom-manipulation` |`1`     | Scripts may make structural changes to the document’s DOM [1].
`layout-changes`   |`1`     | Scripts may modify attributes and CSS styles that affect content layout [1].
`touch-events`     |`1`     | The device supports touch events, and the reading system passes touch events to the content.
`mouse-events`     |`1`     | The device supports mouse events, <br>and the reading system passes mouse events to the content.
`keyboard-events`  |`1`     | The device supports keyboard events, <br>and the reading system passes keyboard events to the content.
`spine-scripting`  |`2`     | Indicates whether the reading system supports spine-level scripting [2].

Source: [Features](https://www.w3.org/TR/epub-rs-34/#app-ers-hasFeature-features)

[1] applies to [spine-level scripting](https://www.w3.org/TR/epub-33/#sec-scripted-spine) [epub-33] only.

[2] e.g., so a [container-constrained script](https://www.w3.org/TR/epub-33/#sec-scripted-container-constrained) can determine whether any actions that depend on scripting support in a top-level content document have any chance of success before attempting them.

