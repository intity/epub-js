import JSZip = require("jszip");
import Input from "./input";

export default class Archive extends Input {

    constructor();

    createInstance(): void;
    open(input: BinaryType, encoding?: string): Promise<JSZip>;
    openUrl(zipUrl: string, isBase64?: boolean): Promise<JSZip>;
    getBlob(url: string, mimeType?: string): Promise<Blob | null>;
    getText(url: string): Promise<string | null>;
    getBase64(url: string, mimeType?: string): Promise<string | null>;

    private get(url: string): object;
}