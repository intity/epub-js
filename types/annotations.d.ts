import Annotation from "./annotation";
import Rendition from "./rendition";
import View from "./managers/view";

export default class Annotations extends Map {

    constructor(rendition: Rendition);

    append(type: string, cfiRange: string, options: { data?: object, cb?: Function, className?: string, styles?: object }): Annotation;
    remove(cfiRange: string, type: string): void;

    private inject(view: View): void;
    private reject(view: View): void;
}