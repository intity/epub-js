import Book from "../book";
import Layout from "../layout";
import Section from "../section";
import Contents from "../contents";
import View, { ViewSettings } from "./view";
import { EpubCFIPair } from "../mapping";
import Mapping from "../../src/mapping";

export interface ViewLocation {
    href: string,
    index: number,
    pages: number[],
    totalPages: number,
    mapping: EpubCFIPair
}

export interface ManagerOptions extends ViewSettings {
    infinite?: boolean,
    overflow?: string
}

export default class Manager {

    constructor(book: Book, layout: Layout, options: object);

    mapping: Mapping;
    paginated: boolean;
    location: object[];

    add(section: Section, forceRight?: boolean): Promise<any>;
    getContents(): Contents[];
    render(element: Element, size?: { width: number, height: number }): void;
    resize(width?: number, height?: number, epubcfi?: string): void;
    display(section: Section, target: string | number): Promise<any>;
    next(): Promise<any>;
    prev(): Promise<any>;
    clear(): void;
    current(): View;
    currentLocation(): ViewLocation[];
    visible(): View[];
    bounds(): DOMRect;
    updateLayout(): void;
    isRendered(): boolean;
    destroy(): void;
    //-- event emitters
    emit(type: any, ...args: any[]): void;
    off(type: any, listener: any): any;
    on(type: any, listener: any): any;
    once(type: any, listener: any, ...args: any[]): any;
    //-- event handlers
    private onOrientationChange(e: Event): void;
    private onScroll(): void;
    //-- helper methods
    private afterDisplayed(view: View): void;
    private afterResized(view: View): void;
    private counter(bounds: object): void;
    private createView(section: Section, forceRight?: boolean): View;
    private requireView(view: string | Function | object): any;
    private scrollBy(x: number, y: number, silent: boolean): void;
    private scrollTo(x: number, y: number, silent: boolean): void;
    private append(section: Section, forceRight?: boolean): Promise<any>;
    private prepend(section: Section, forceRight?: boolean): Promise<any>;
    private moveTo(offset: { top: number, left: number }): void;
    private isVisible(view: View, offsetPrev: number, offsetNext: number, rect?: DOMRect): boolean;
    private updateAxis(axis: string, forceUpdate?: boolean): void;
    private updateWritingMode(mode: string): void;
}