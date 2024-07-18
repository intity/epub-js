export interface NavItem {
    id: string,
    href: string,
    label: string,
    parent?: string,
    subitems?: NavItem[]
}

export interface LandmarkItem {
    type?: string,
    href?: string,
    label?: string
}

export default class Navigation {

    constructor(xml: XMLDocument);

    toc: NavItem[];
    landmarks: LandmarkItem[];
    length: number;

    forEach(args: IArguments): void;
    get(target: string): NavItem;
    getByIndex(target: string): NavItem;
    landmark(type: string): LandmarkItem;
    load(json: string): NavItem[];
    parse(xml: XMLDocument): void;

    private parseNav(navHtml: XMLDocument): NavItem[];
    private landmarkItem(item: Element): LandmarkItem;
    private navItem(item: Element): NavItem;
    private ncxItem(item: Element): NavItem;
    private parseLandmarks(navHtml: XMLDocument): LandmarkItem[];
    private parseNav(navHtml: XMLDocument): NavItem[];
    private parseNcx(navHtml: XMLDocument): NavItem[];
    private unpack(toc: NavItem[]): void;
}