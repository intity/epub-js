export default class RangeObject {

    constructor();

    collapse(toStart: boolean): void;
    setStart(startNode: Node, startOffset: Node): void;
    setEnd(endNode: Node, endOffset: Node): void;
    selectNode(referenceNode: Node): void;
    selectNodeContents(referenceNode: Node): void;
}