import Archive from "./archive";
import Container from "./container";
import Locations from "./locations";
import Metadata from "./metadata";
import Manifest from "./manifest";
import Rendition, { RenditionOptions } from "./rendition";
import Section from "./section";
import Sections from "./sections";
import Spine from "./spine";
import Navigation from "./navigation";
import PageList, { PageListItem } from "./pagelist";
import Url from "./utils/url";
import Path from "./utils/path";
import Resources from "./resources";
import Packaging from "./packaging";
import Storage from "./storage";

export interface BookOptions {
    request?: {
        method?: (url: string, type: string, withCredentials: object, headers: string[]) => Promise<object>,
        withCredentials?: boolean,
        headers?: string[]
    },
    encoding?: string,
    replacements?: string,
    canonical?: (path: string) => string,
    openAs?: string,
    store?: boolean
}

export default class Book {

    constructor(url?: string, options?: BookOptions);

    readonly settings: BookOptions;
    readonly opening: any; // should be core.defer
    readonly opened: Promise<Book>;
    readonly isOpen: boolean;
    readonly loaded: {
        metadata: Promise<Metadata>,
        manifest: Promise<Manifest>,
        spine: Promise<Spine>,
        cover: Promise<string>,
        navigation: Promise<Navigation>,
        pageList: Promise<PageListItem[]>,
        resources: Promise<string[]>,
    }
    readonly ready: Promise<void>;
    readonly request: Function;
    readonly locations: Locations;
    readonly navigation: Navigation;
    readonly pageList: PageList;
    readonly url: Url;
    readonly path: Path;
    readonly archived: boolean;
    readonly archive: Archive;
    readonly resources: Resources;
    readonly rendition: Rendition
    readonly container: Container;
    readonly packaging: Packaging;
    readonly sections: Sections;
    readonly storage: Storage;

    canonical(path: string): string;
    coverUrl(): Promise<string | null>;
    destroy(): void;
    determineType(input: string): string;
    getRange(cfiRange: string): Promise<Range>;
    key(identifier?: string): string;
    load(path: string): Promise<object>;
    loadNavigation(opf: XMLDocument): Promise<Navigation>;
    open(input: string | ArrayBuffer, what?: string): Promise<object>;
    openContainer(url: string): Promise<string>;
    openEpub(data: BinaryType, encoding?: string): Promise<Book>;
    openManifest(url: string): Promise<Book>;
    openPackaging(url: string): Promise<Book>;
    renderTo(element: Element | string, options?: RenditionOptions): Rendition;
    resolve(path: string, absolute?: boolean): string;
    section(target: string | number): Section;
    setRequestCredentials(credentials: object): void;
    setRequestHeaders(headers: object): void;
    unarchive(input: BinaryType, encoding?: string): Promise<Archive>;
    store(name: string): Storage;
    unpack(opf: XMLDocument): Promise<Book>;
    //-- event emitters
    emit(type: any, ...args: any[]): void;
    off(type: any, listener: any): any;
    on(type: any, listener: any): any;
    once(type: any, listener: any, ...args: any[]): any;
    //-- helper methods
    private replacements(): Promise<void>;
}