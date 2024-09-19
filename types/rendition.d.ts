import Book from "./book";
import Contents from "./contents";
import Section from "./section";
import View from "./managers/view";
import Hook from "./utils/hook";
import Themes from "./themes";
import EpubCFI from "./epubcfi";
import Annotations from "./annotations";
import Queue from "./utils/queue";

export interface RenditionOptions {
    width?: number | string,
    height?: number | string,
    ignoreClass?: string,
    manager?: string | Function | object,
    view?: string | Function | object,
    flow?: string,
    layout?: string,
    spread?: string,
    minSpreadWidth?: number,
    stylesheet?: string,
    resizeOnOrientationChange?: boolean,
    script?: string,
    infinite?: boolean,
    overflow?: string,
    snap?: boolean | object,
    defaultDirection?: string,
    sandbox: string[]
}

export interface DisplayedLocation {
    index: number,
    href: string,
    cfi: string,
    location: number,
    percentage: number,
    displayed: {
        page: number,
        total: number
    }
}

export interface Location {
    start: DisplayedLocation,
    end: DisplayedLocation,
    atStart: boolean,
    atEnd: boolean
}

export default class Rendition {

    constructor(book: Book, options: RenditionOptions);

    settings: RenditionOptions;
    book: Book;
    hooks: {
        display: Hook,
        serialize: Hook,
        content: Hook,
        unloaded: Hook,
        layout: Hook,
        render: Hook,
        show: Hook
    }
    themes: Themes;
    annotations: Annotations;
    epubcfi: EpubCFI;
    q: Queue;
    location: Location;
    started: Promise<void>;

    attachTo(element: Element): Promise<void>;
    clear(): void;

    currentLocation(): DisplayedLocation;
    currentLocation(): Promise<DisplayedLocation>;

    destroy(): void;
    display(target?: string): Promise<void>;
    display(target?: number): Promise<void>;
    getContents(): Contents[];
    getRange(cfi: string, ignoreClass?: string): Range;
    located(location: Location): DisplayedLocation;
    moveTo(offset: number): void;
    next(): Promise<void>;
    prev(): Promise<void>;
    requireManager(manager: string | Function | object): any;
    resize(width: number, height: number): void;
    setManager(manager: Function): void;
    start(): void;
    views(): View[];
    updateLayout(options: object): void;
    //-- Event emitters
    emit(type: any, ...args: any[]): void;
    off(type: any, listener: any): any;
    on(type: any, listener: any): any;
    once(type: any, listener: any, ...args: any[]): any;
    //-- rendition.hooks.content
    private adjustImages(contents: Contents): Promise<void>;
    private handleLinks(contents: Contents): void;
    private passEvents(contents: Contents): void;
    //-- book.sections.hooks.content
    private injectIdentifier(doc: Document, section: Section): void;
    private injectScript(doc: Document, section: Section): void;
    private injectStylesheet(doc: Document, section: Section): void;
    //-- event handlers
    private afterDisplayed(view: any): void;
    private afterRemoved(view: any): void;
    private reportLocation(): Promise<void>;
    private triggerMarkEvent(cfiRange: string, data: object, contents: Contents): void;
    private triggerSelectedEvent(cfiRange: string, contents: Contents): void;
    private triggerViewEvent(e: Event, contents: Contents): void;
    private onOrientationChange(orientation: string): void;
    private onResized(size: { width: number, height: number }): void;
    //-- helper methods
    private determineLayoutProperties(metadata: object): object;
}