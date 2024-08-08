export default abstract class Input {

    constructor();

    instance?: object;
    urlCache: object;

    clear(): void;
    request(url: string, type: string): Promise<Blob | string | JSON | Document | XMLDocument>;
    handleResponse(response: any, type: string): Blob | string | JSON | Document | XMLDocument;
    getBlob(url: string, mimeType: string): Promise<Blob | null>;
    getText(url: string, mimeType: string): Promise<string | null>;
    getBase64(url: string, mimeType: string): Promise<string | null>;
    createUrl(url: string, options: object): Promise<string>;
    revokeUrl(url: string): void;
    destroy(): void;
}