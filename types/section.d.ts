import { HooksObject } from "./utils/hook";

export interface GlobalLayout {
    layout: string,
    spread: string,
    orientation: string
}

export interface LayoutSettings {
    layout: string,
    spread: string,
    orientation: string
}

export interface SpineItem {
    index: number,
    cfiBase: string,
    href?: string,
    url?: string,
    canonical?: string,
    properties?: string[],
    linear?: string,
    next: () => SpineItem,
    prev: () => SpineItem,
}

export default class Section {

    constructor(item: SpineItem, hooks: HooksObject);

    idref: string;
    linear: boolean;
    properties: string[];
    index: number;
    href: string;
    url: string;
    canonical: string;
    next: () => SpineItem;
    prev: () => SpineItem;
    cfiBase: string;

    document: Document;
    contents: Element;
    output: string;
    hooks: HooksObject;

    load(request: Function): Promise<Element>;
    render(request?: Function): Promise<string>;
    find(query: string): object[];
    search(query: string, maxSeqEle?: number): object[];
    reconcileLayoutSettings(globalLayout: GlobalLayout): LayoutSettings;
    cfiFromRange(range: Range): string;
    cfiFromElement(el: Element): string;
    unload(): void;
    destroy(): void;
}