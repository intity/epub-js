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
    documentElement: Element;
    epubcfi: EpubCFI;
    window: Window;

    appendClass(className: string): void;
    removeClass(className: string): void;
    appendScript(src: string, key: string): Promise<Node>;
    removeScript(key: string): boolean;
    clearScripts(): void;
    appendStylesheet(src: string, key: string): Promise<boolean>;
    removeStylesheet(key: string): boolean;
    clearStylesheets(): void;
    appendStylesheetRules(rules: object, key: string): Promise<boolean>;
    appendSerializedCSS(css: string, key: string): Promise<boolean>;
    cfiFromNode(node: Node, ignoreClass?: string): string;
    cfiFromRange(range: Range, ignoreClass?: string): string;
    columns(width: number, height: number, columnWidth: number, gap: number, dir: string): void;
    css(property: string, value: string, priority?: boolean): string;
    destroy(): void;
    direction(dir?: string): void;
    fit(width: number, height: number): void;
    height(h: number): number;
    locationOf(target: string | EpubCFI, ignoreClass?: string): { left: number, top: number };
    map(layout: any): any;
    mapPage(cfiBase: string, layout: object, start: number, end: number, dev: boolean): any;
    overflow(overflow: string): string;
    overflowX(overflow: string): string;
    overflowY(overflow: string): string;
    range(cfi: string, ignoreClass?: string): Range;
    root(): Element;
    scaler(scale: number, offsetX: number, offsetY: number): void;
    scrollHeight(): number;
    scrollWidth(): number;
    size(width?: number, height?: number, dir?: string): void;
    textHeight(): number;
    textWidth(): number;
    viewport(options: ViewportSettings): ViewportSettings;
    width(w: number): number;
    writingMode(mode?: string): string;
    //-- event emitters
    emit(type: any, ...args: any[]): void;
    off(type: any, listener: any): any;
    on(type: any, listener: any): any;
    once(type: any, listener: any, ...args: any[]): any;
    //-- listeners
    private listeners(): void;
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
    private getStylesheetNode(key: string): Node;
}