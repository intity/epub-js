import Archive from "./archive";
import Storage from "./storage";
import Section from "./section";
import Manifest from "./manifest";

export default class Resources extends Map {

    constructor(request: Function, resolve: Function, replacements?: string);

    archive?: Archive;
    storage: Storage;

    clear(): void;
    createCss(uri: string): Promise<string>;
    createUrl(uri: string): Promise<string>;
    revokeUrl(url: string): void;
    replace(item: object): Promise<string>;
    substitute(content: string, section: Section): void;
    unpack(manifest: Manifest, archive: Archive, storage: Storage): Promise<Resources>;
    destroy(): void;
}