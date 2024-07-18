import Metadata from "./metadata";
import Manifest from "./manifest";
import Spine from "./spine";

export interface PackagingObject {
    metadata: Metadata,
    manifest: Manifest,
    spine: Spine,
    direction: string,
    version: string
}

export default class Packaging {

    constructor(packageXML: XMLDocument);

    metadata: Metadata;
    manifest: Manifest;
    spine: Spine;
    direction: string;
    version: string;
    uniqueIdentifier: string;

    parse(packageXML: XMLDocument): PackagingObject;
    parseDirection(packageXML: XMLDocument): string;
    parseVersion(packageXML: XMLDocument): string;
    load(json: string): PackagingObject;
    destroy(): void;

    private findUniqueIdentifier(packageXML: XMLDocument): string;
}