import EpubCFI from "./epubcfi";
import Section from "./section";
import Sections from "./sections";
import Location from "./location";

export default class Locations extends Map {

    constructor(sections: Sections, request?: Function, pause?: number);

    current: Location;
    generated: Promise<any>;

    generate(chars: number): Promise<Locations>;
    process(section: Section): Promise<Locations>;
    parse(contents: Element, cfiBase: string, chars: number): Locations;
    locationFromCfi(cfi: string | EpubCFI): number;
    percentageFromCfi(cfi: string | EpubCFI): number;
    percentageFromLocation(loc: number): number;
    cfiFromLocation(loc: number): string;
    cfiFromPercentage(percentage: number): string;
    load(locations: string): Locations;
    save(): string;
    set(key: any, value: any): any;
    set(options: object): Locations;
    clear(): void;
    destroy(): void;

    private createRange(): {
        startContainer: Element,
        startOffset: number,
        endContainer: Element,
        endOffset: number
    };
}