export default class Defer {

    constructor();

    readonly id: string;
    readonly resolve: Function;
    readonly reject: Function;
    readonly promise: Promise<any>;
}