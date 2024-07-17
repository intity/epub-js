export interface PageListItem {
    href: string,
    page: string,
    cfi?: string,
    packageUrl?: string
}

export default class Pagelist {

    constructor(xml: XMLDocument);

    parse(xml: XMLDocument): PageListItem[];
    pageFromCfi(cfi: string): number;
    cfiFromPage(pg: string | number): string;
    pageFromPercentage(percent: number): number;
    percentageFromPage(pg: number): number;
    destroy(): void;

    private item(node: Node): PageListItem;
    private parseNav(node: Node): PageListItem[];
    private parseNcx(node: Node): PageListItem[];
    private process(pageList: PageListItem[]): void;
}