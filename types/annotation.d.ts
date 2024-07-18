import View from "./managers/view";

export default class Annotation {

    constructor(type: string, cfiRange: string,
        options?: {
        data?: object,
        cb?: Function,
        className?: string,
        styles?: object
    });

    update(data: object): void;
    attach(view: View): any;
    detach(view: View): any;
    //-- event emitters
    emit(type: any, ...args: any[]): void;
    off(type: any, listener: any): any;
    on(type: any, listener: any): any;
    once(type: any, listener: any, ...args: any[]): any;
}