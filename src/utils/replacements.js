/**
 * @module replacements
 */

import { qs } from "./core";
import Url from "./url";

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
		url = location.origin + section.url;
		const uri = new URL(url);
		if (uri.searchParams.size) {
			url = [...uri.searchParams.values()][0];
		}
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

	const base = qs(contents.ownerDocument, "base");
	const location = base ? base.getAttribute("href") : undefined;
	const replaceLink = (link) => {

		const href = link.getAttribute("href");

		if (href.indexOf("mailto:") === 0) {
			return;
		}
		if (href.indexOf("://") > -1) { // is absolute
			link.setAttribute("target", "_blank");
		} else {
			let uri;
			try {
				uri = new Url(href, location);
			} catch (err) {
				console.error(err);
			}
			link.onclick = (e) => {

				if (uri && uri.hash) {
					fn(uri.path.path + uri.hash);
				} else if (uri) {
					fn(uri.path.path);
				} else {
					fn(href);
				}
				return false;
			};
		}
	};

	for (let i = 0; i < links.length; i++) {
		replaceLink(links[i]);
	}
}

/**
 * substitute
 * @param {string} content 
 * @param {string[]} urls 
 * @param {string[]} replacements 
 */
export const substitute = (content, urls, replacements) => {

	urls.forEach((url, i) => {
		if (url && replacements[i]) {
			// Account for special characters in the file name.
			// See https://stackoverflow.com/a/6318729.
			url = url.replace(/[-[\]{}()*+?.,\\^$|#\s]/g, "\\$&");
			content = content.replace(new RegExp(url, "g"), replacements[i]);
		}
	});
	return content;
}