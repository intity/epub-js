export default class Path {

    constructor(uri: string);

    parse(path: string): object;
    dirname(path: string): string;
    isAbsolute(path: string): boolean;
    isDirectory(path: string): boolean;
    resolve(...args: any[]): string;
    relative(from: string, to: string): string;
    normalize(path: string): string;
    splitPath(filename: string): string;
    toString(): string;
}