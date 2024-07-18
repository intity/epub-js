import Path from "./path";

export default class Url {

    constructor(url: string, base: string);

    readonly path: Path;
    
    resolve(what: string): string;
    relative(what: string): string;
    toString(): string;
}