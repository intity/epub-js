export default class Metadata extends Map {

    constructor();

    parse(node: Node): void;
    destroy(): void;

    private parseMeta(item: Node): void;
}