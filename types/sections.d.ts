import Hook from "./utils/hook";
import Packaging from "./packaging";
import Section from "./section";

export default class Sections extends Array {

    constructor();

    spineByHref: object[];
    spineById: object[];
    hooks: {
        content: Hook,
        serialize: Hook
    };
    loaded: boolean;

    get(target?: string | number): Section;
    first(): Section;
    last(): Section;
    unpack(packaging: Packaging, resolve: Function, canonical: Function): void;
    destroy(): void;

    private append(section: Section): number;
    private prepend(section: Section): number;
    private remove(section: Section): number;
}