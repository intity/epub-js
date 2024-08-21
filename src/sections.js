import EpubCFI from "./epubcfi";
import Hook from "./utils/hook";
import Section from "./section";
import {
    replaceBase,
    replaceMeta,
    replaceCanonical
} from "./utils/replacements";

/**
 * Sections class
 * @extends {Map}
 */
class Sections extends Map {

    constructor() {

        super();
        /**
         * @member {object} hooks
         * @property {Hook} content
         * @property {Hook} serialize
         * @memberof Sections
         * @readonly
         */
        this.hooks = {
            content: new Hook(this),
            serialize: new Hook(this)
        };
        // Register replacements
        this.hooks.content.register(replaceBase);
        this.hooks.content.register(replaceMeta);
        this.hooks.content.register(replaceCanonical);
        this.points = {};
        this.nav = undefined;
        this.pkg = undefined;
    }

    /**
     * Clear sections
     */
    clear() {

        this.forEach((i) => i.destroy());
        this.hooks.serialize.clear();
        this.hooks.content.clear();
        this.hooks.content.register(replaceBase);
        this.hooks.content.register(replaceMeta);
        this.hooks.content.register(replaceCanonical);
        this.points = {};
        super.clear();
    }

    /**
     * Get an item from the spine
     * @param {string|number} [target]
     * @return {Section|null} section
     * @example sections.get();
     * @example sections.get(3);
     * @example sections.get("#chapter_001");
     * @example sections.get("chapter_001.xhtml");
     * @example sections.get("epubcfi(/6/8!/4/2/16/1:0)")
     * @override
     */
    get(target) {

        let result;
        if (typeof target === "undefined") {
            result = this.first();
        } else if (typeof target === "number" && isNaN(target) === false) {
            result = [...this.values()][target];
        } else if (typeof target === "string") {
            if (EpubCFI.prototype.isCfiString(target)) {
                const cfi = new EpubCFI(target);
                const pos = cfi.spinePos;
                result = [...this.values()][pos];
            } else if (target.indexOf("#") === 0) {
                if (result = this.pkg.spine.get(target.substring(1))) {
                    result = [...this.values()][result.index];
                }
            } else {
                if (result = this.nav.toc.get(target)) {
                    result = super.get(result.bind);
                } else {
                    target = target.split("#")[0]; // Remove fragments
                    result = super.get(target);
                }
            }
        }
        return result || null;
    }

    /**
     * Find the first Section in the Spine
     * @return {Section|null} first section
     */
    first() {

        return this.points.first || null;
    }

    /**
     * Find the last Section in the Spine
     * @return {Section|null} last section
     */
    last() {

        return this.points.last || null;
    }

    /**
     * Unpack items from a opf into spine items
     * @param {Packaging} packaging
     * @param {Navigation} navigation 
     * @param {Function} resolve URL resolve
     * @param {Function} canonical Resolve canonical url
     * @returns {Promise<Sections>}
     */
    unpack(packaging, navigation, resolve, canonical) {

        this.pkg = packaging;
        this.nav = navigation;
        const manifest = packaging.manifest;
        const spine = packaging.spine;
        const toc = navigation.toc;
        const len = packaging.spine.size;
        spine.forEach((itemref, key) => {

            const item = manifest.get(key);
            const data = {};

            data.cfiBase = EpubCFI.prototype.generateChapterComponent(
                spine.nodeIndex,
                itemref.index,
                itemref.id
            );

            if (item) {
                const link = toc.get(item.href);
                data.bind = link ? link.bind : item.href;
                data.href = item.href;
                data.url = resolve(item.href, true);
                data.canonical = canonical(item.href);
                data.properties = [];

                if (item.properties.length) {
                    data.properties.push.apply(
                        data.properties,
                        item.properties
                    );
                }
            }

            data.idref = itemref.idref;
            data.index = itemref.index;
            data.linear = itemref.linear;

            if (data.linear === "yes") {
                data.prev = () => {
                    let prevIndex = data.index;
                    while (prevIndex > 0) {
                        let prev = this.get(prevIndex - 1);
                        if (prev && prev.linear) {
                            return prev;
                        }
                        prevIndex -= 1;
                    }
                    return null;
                };
                data.next = () => {
                    let nextIndex = data.index;
                    while (nextIndex < this.size - 1) {
                        let next = this.get(nextIndex + 1);
                        if (next && next.linear) {
                            return next;
                        }
                        nextIndex += 1;
                    }
                    return null;
                };
            } else {
                data.prev = () => {
                    return null;
                }
                data.next = () => {
                    return null;
                }
            }

            const section = new Section(data, this.hooks);

            if (section.linear && !this.points.first) {
                this.points["first"] = section;
            }

            this.set(data.bind, section);
        });

        if (this.size) {
            let prevIndex = this.size;
            while (prevIndex > 0) {
                let prev = this.get(prevIndex - 1);
                if (prev && prev.linear) {
                    this.points["last"] = prev;
                    break;
                }
                prevIndex -= 1;
            }
        }

        return new Promise((resolve) => {
            resolve(this);
        });
    }

    /**
     * destroy
     */
    destroy() {

        this.clear();
        this.hooks = undefined;
        this.points = undefined;
        this.nav = undefined;
        this.pkg = undefined;
    }
}

export default Sections;