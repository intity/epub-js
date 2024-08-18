import Input from "./input";

export default class Storage extends Input {

    constructor(name: string);

    name?: string;
    online: boolean;

    createInstance(): void;
    get(input: string | number): Promise<any>;
    set(input: string | number, data: ArrayBuffer): Promise<ArrayBuffer | null>;
    put(url: string): Promise<ArrayBuffer>;
    dispatch(url: string, type?: string, withCredentials?: boolean, headers?: object[]): Promise<Blob | string | JSON | Document | XMLDocument>;
    getBlob(url: string, mimeType?: string): Promise<Blob | null>;
    getText(url: string, mimeType?: string): Promise<string | null>;
    getBase64(url: string, mimeType?: string): Promise<string | null>;
    destroy(): void;

    private getKey(input: string | number): string;
    private appendListeners(): void;
    private removeListeners(): void;
    private status(event: Event): void;
}