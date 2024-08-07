export interface PageListItem {
    href: string,
    page: string,
    cfi?: string,
    packageUrl?: string
}

export default class Pagelist extends Array {

    constructor(xml: XMLDocument);

    parse(xml: XMLDocument): PageListItem[];
    cfiFromPage(pg: string | number): string;
    pageFromCfi(cfi: string): number;
    pageFromPercentage(percent: number): number;
    percentageFromPage(pg: number): number;
    destroy(): void;

    private navItem(node: Node): PageListItem;
    private ncxItem(node: Node): PageListItem;
    private parseNav(node: Node): PageListItem[];
    private parseNcx(node: Node): PageListItem[];
    private process(): void;
}