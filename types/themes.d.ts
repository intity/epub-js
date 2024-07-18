import Rendition from "./rendition";
import Contents from "./contents";

export default class Themes extends Map {

    constructor(rendition: Rendition);

    current: string;
    rules: object;

    register(themes: object): void;
    register(theme: string, url: string): void;
    register(theme: string, rules: object): void;
    registerThemes(themes: object): void;
    registerUrl(name: string, input: string): void;
    registerRules(name: string, rules: object): void;
    select(name: string | null): void;
    append(name: string, contents: Contents): void;
    remove(name: string, contents: Contents): void;
    clear(): void
    inject(contents: Contents): void;
    update(contents: Contents): void;
    appendRule(name: string, value: string, priority?: boolean): void;
    removeRule(name: string): void;
    removeRules(): void;
    fontSize(size: string): void;
    font(f: string): void;
    destroy(): void;
}