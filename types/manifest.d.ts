export default class Manifest extends Map {

    constructor();

    navPath: string;
    coverPath: string;

    parse(node: Node): void;
    destroy(): void;

    private findCoverPath(node: Node): string;
}