import Contents from "./contents";

export interface LayoutOptions {
    axis?: string,
    flow?: string,
    spread?: string,
    direction?: string,
    orientation?: string,
    minSpreadWidth?: number,
    pageWidth?: number,
    pageHeight?: number
}

export default class Layout {

    constructor(options?: LayoutOptions);

    readonly axis: string;
    readonly name: string;
    readonly flow: string;
    readonly spread: string;
    readonly direction: string;
    readonly orientation: string;
    readonly viewport: string;
    readonly minSpreadWidth: number;
    readonly width: number;
    readonly height: number;
    readonly pageWidth: number;
    readonly pageHeight: number;
    readonly spreadWidth: number;
    readonly delta: number;
    readonly columnWidth: number;
    readonly gap: number;
    readonly divisor: number;

    set(options: LayoutOptions): void;
    calculate(width: number, height: number, gap?: number): void;
    count(totalLength: number, pageLength: number): { spreads: number, pages: number };
    //-- event emitters
    emit(type: any, ...args: any[]): void;
    off(type: any, listener: any): any;
    on(type: any, listener: any): any;
    once(type: any, listener: any, ...args: any[]): any;
}