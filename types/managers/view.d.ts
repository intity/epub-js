import Defer from "../utils/defer";
import Section from "../section";
import Contents from "../contents";
import Layout from "../layout";

export interface ViewSettings {
    axis?: string,
    method?: string,
    forceRight?: boolean,
    forceEvenPages?: boolean,
    ignoreClass?: string,
    allowPopups?: boolean,
    allowScriptedContent?: boolean
}

export default class View {

    constructor(layout: Layout, section: Section, options: ViewSettings);

    readonly id: string;
    readonly contents: Contents;
    
    create(): Element;
    render(request: Function): Promise<string>;
    reset(): void;
    size(width?: number, height?: number): void;
    load(content: Contents): Promise<any>;
    setAxis(axis: string): void;
    display(request?: Function): Promise<any>;
    show(): void;
    hide(): void;
    offset(): { top: number, left: number };
    width(): number;
    height(): number;
    position(): DOMRect;
    locationOf(target: string): { top: number, left: number };
    bounds(force?: boolean): { height: number, width: number };
    highlight(cfiRange: string, data?: object, cb?: Function, className?: string, styles?: object): void;
    underline(cfiRange: string, data?: object, cb?: Function, className?: string, styles?: object): void;
    unhighlight(cfiRange: string): void;
    ununderline(cfiRange: string): void;
    destroy(): void;
    //-- event emitters
    emit(type: any, ...args: any[]): void;
    off(type: any, listener: any): any;
    on(type: any, listener: any): any;
    once(type: any, listener: any, ...args: any[]): any;
    //-- event handlers
    private onLoad(event: Event, defer: Defer): void;
}