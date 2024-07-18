interface HooksObject {
    [key: string]: Hook
}

export default class Hook {

    constructor(context: any);

    register(func: Function): void;
    register(arr: Function[]): void;
    deregister(func: Function): void;
    trigger(...args: any[]): Promise<any>;
    list(): any[];
    clear(): void;
}