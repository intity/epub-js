/**
 * @module replacements
 */

import { qs } from "./core";

/**
 * replaceBase
 * @param {Document} doc 
 * @param {Section} section 
 */
export const replaceBase = (doc, section) => {

	if (!doc) return;

	let head = qs(doc, "head");
	let base = qs(head, "base");

	if (!base) {
		base = doc.createElement("base");
		head.insertBefore(base, head.firstChild);
	}

	let url = section.url;
	const absolute = (url.indexOf("://") > -1);

	if (!absolute) {
		const uri = new URL(url, doc.baseURI);
		url = uri.href;
	}

	base.setAttribute("href", url);
}

/**
 * replaceCanonical
 * @param {Document} doc 
 * @param {Section} section 
 */
export const replaceCanonical = (doc, section) => {

	if (!doc) return;

	let url = section.canonical;
	let head = qs(doc, "head");
	let link = qs(head, "link[rel='canonical']");

	if (link) {
		link.setAttribute("href", url);
	} else {
		link = doc.createElement("link");
		link.setAttribute("rel", "canonical");
		link.setAttribute("href", url);
		head.appendChild(link);
	}
}

/**
 * replaceMeta
 * @param {Document} doc 
 * @param {Section} section 
 */
export const replaceMeta = (doc, section) => {

	if (!doc) return;

	let head = qs(doc, "head");
	let meta = qs(head, "link[property='dc.identifier']");

	if (meta) {
		meta.setAttribute("content", section.idref);
	} else {
		meta = doc.createElement("meta");
		meta.setAttribute("name", "dc.identifier");
		meta.setAttribute("content", section.idref);
		head.appendChild(meta);
	}
}

/**
 * replaceLinks
 * @param {Node} contents 
 * @param {function} fn 
 * @todo move me to Contents
 */
export const replaceLinks = (contents, fn) => {

	const links = contents.querySelectorAll("a[href]");

	if (!links.length) return;

	const replaceLink = (link) => {

		const href = link.getAttribute("href");

		if (href.indexOf("mailto:") === 0) {
			return;
		}
		if (href.indexOf("://") > -1) { // is absolute
			link.setAttribute("target", "_blank");
		} else {
			link.onclick = (e) => {
				fn(href);
				return false;
			};
		}
	};

	for (let i = 0; i < links.length; i++) {
		replaceLink(links[i]);
	}
}

const relative = (p1, p2) => {

	const arr = p1.split("/");
	let result = "";
	for (let i = 1; i < arr.length; ++i) {
		result += "../"
	}
	return result + p2;
};

/**
 * substitute
 * @param {string} content 
 * @param {string[]} urls 
 * @param {string[]} replacements 
 */
export const substitute = (content, section, urls, replacements) => {

	urls.forEach((url, i) => {
		if (url && replacements[i]) {
			// Account for special characters in the file name.
			// See https://stackoverflow.com/a/6318729.
			url = relative(section.href, url);
			url = url.replace(/[-[\]{}()*+?.,\\^$|#\s]/g, "\\$&");
			content = content.replace(new RegExp(url, "g"), replacements[i]);
		}
	});
	return content;
}