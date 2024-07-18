import Archive from "./archive";
import Manifest from "./manifest";

export default class Resources {

    constructor(manifest: Manifest, options: {
        archive?: Archive,
        resolve: Function,
        request: Function,
        replacements?: string
    });

    get(path: string): Promise<string>;
    process(manifest: Manifest): void;
    createUrl(uri: string): Promise<string>;
    replacements(): Promise<string[]>;
    relativeTo(absolute: string): string[];
    replaceCss(): Promise<string[]>;
    substitute(content: string, url?: string): string;
    destroy(): void;

    private replaceUrls(): Array<Promise<string[]>>;
    private createCssFile(href: string): Promise<string>;
}