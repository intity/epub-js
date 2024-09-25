import EpubCFI from "./epubcfi";
import Section from "./section";

export interface ViewportSettings {
    width: string,
    height: string,
    scale: string,
    minimum: string,
    maximum: string,
    scalable: string
}

export default class Contents {

    constructor(doc: Document, content: Element, section: Section);

    content: Element;
    contentRect: object;
    document: Document;
    epubcfi: EpubCFI;
    window: Window;
    mode: string;

    appendClass(className: string): void;
    removeClass(className: string): void;
    appendScript(key: string, src: string): Promise<Node>;
    removeScript(key: string): boolean;
    clearScripts(): void;
    appendStylesheet(key: string, input: string | object): Promise<Node>;
    removeStylesheet(key: string): boolean;
    clearStylesheets(): void;
    cfiFromNode(node: Node, ignoreClass?: string): string;
    cfiFromRange(range: Range, ignoreClass?: string): string;
    columns(width: number, height: number, columnWidth: number, gap: number, dir: string): void;
    css(property: string, value: string, priority?: boolean): string;
    destroy(): void;
    direction(dir?: string): void;
    locationOf(target: string | EpubCFI, ignoreClass?: string): { left: number, top: number };
    map(layout: any): any;
    format(contents: Contents): void;
    mapPage(cfiBase: string, layout: object, start: number, end: number, dev: boolean): any;
    overflow(overflow: string): string;
    overflowX(overflow: string): string;
    overflowY(overflow: string): string;
    range(cfi: string, ignoreClass?: string): Range;
    root(): Element;
    scale(scale: number, offsetX: number, offsetY: number): void;
    scrollHeight(): number;
    scrollWidth(): number;
    size(width?: number, height?: number, dir?: string): void;
    textSize(): { width: number, height: number };
    viewport(options: ViewportSettings): ViewportSettings;
    width(w: number): number;
    height(h: number): number;
    writingMode(mode?: string): string;
    //-- event emitters
    emit(type: any, ...args: any[]): void;
    off(type: any, listener: any): any;
    on(type: any, listener: any): any;
    once(type: any, listener: any, ...args: any[]): any;
    //-- listeners
    private appendListeners(): void;
    private removeListeners(): void;
    private fontLoadListeners(): void;
    private imageLoadListeners(): void;
    private mediaQueryListeners(): void;
    private transitionListeners(): void;
    //-- event handlers
    private expand(): void;
    private resize(entries: object[]): void;
    private selectionHandler(e: Event): void;
    private triggerEvent(e: Event): void;
    //-- helper methods
    private createLink(key: string, src: string): Promise<Node>;
    private createStyle(key: string, rules: object): Promise<Node>;
}