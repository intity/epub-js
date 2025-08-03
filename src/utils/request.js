import Path from "./path";
import Defer from "./defer";
import { isXml, parse } from "./core";

const SUPPORTS_URL = window && window.URL ? true : false;
const BLOB_RESPONSE = SUPPORTS_URL ? "blob" : "arraybuffer";

const error = (e, def, msg = "Error") => {

	const xhr = e.target;
	def.dump["error"] = xhr.status;
	def.reject({
		message: msg,
		target: xhr,
		stack: new Error().stack,
		trace: {
			dump: def.dump,
			uuid: def.id
		}
	});
};

const read = (e, def) => {

	const xhr = e.target;

	if (xhr.status === 403) {
		error(e, def, "Forbidden");
	} else if (def.dump["read"]) {
		def.dump["read"].push(xhr.status);
	} else {
		def.dump["read"] = [xhr.status];
	}
}

const load = (e, type, def) => {

	const xhr = e.target;

	let r;
	if (xhr.responseType === "document") {
		if (xhr.response === null &&
			xhr.responseXML === null) {
			def.reject({
				message: "Empty Response",
				target: xhr,
				stack: new Error().stack,
				trace: {
					dump: def.dump,
					uuid: def.id
				}
			});
		} else if (xhr.responseXML) {
			r = xhr.responseXML;
		} else if (isXml(type)) {
			r = parse(xhr.response, "text/xml");
		} else if (type === "xhtml") {
			r = parse(xhr.response, "application/xhtml+xml");
		} else if (type === "html" || type === "htm") {
			r = parse(xhr.response, "text/html");
		}
	} else if (xhr.responseType === "json") {
		r = xhr.response;
	} else if (xhr.responseType === "blob") {
		if (SUPPORTS_URL) {
			r = xhr.response;
		} else {
			// Safari doesn't support responseType blob, 
			// so create a blob from arraybuffer
			r = new Blob([xhr.response]);
		}
	} else {
		r = xhr.response;
	}

	def.dump["load"] = [
		xhr.status,
		xhr.responseType
	];
	def.resolve(r);
}

const progress = (e, def) => {

	const xhr = e.target;
	def.dump["progress"] = xhr.status;
};

const start = (e, def) => {

	const xhr = e.target;
	def.dump["start"] = xhr.status;
};

const end = (e, def) => {

	const xhr = e.target;
	def.dump["end"] = xhr.status;
};

/**
 * request
 * @todo Fallback for url if window isn't defined
 * @param {string|ArrayBuffer} url 
 * @param {string} [type] 
 * @param {boolean} [withCredentials=false] 
 * @param {object[]} [headers=[]] 
 * @returns {Promise<any>}
 */
const request = (url, type, withCredentials = false, headers = []) => {

	const def = new Defer();
	const xhr = new XMLHttpRequest();

	type = type || new Path(url).extension;
	xhr.withCredentials = withCredentials;

	if (isXml(type)) {
		xhr.responseType = "document";
		xhr.overrideMimeType("text/xml"); // for OPF parsing
	} else if (type === "xhtml") {
		xhr.responseType = "document";
	} else if (type === "html" || type === "htm") {
		xhr.responseType = "document";
	} else if (type === "binary") {
		xhr.responseType = "arraybuffer";
	} else if (type === "blob") {
		xhr.responseType = BLOB_RESPONSE;
	} else if (type === "json") {
		xhr.responseType = "json";
	}

	xhr.onreadystatechange = (e) => read(e, def);
	xhr.onload = (e) => load(e, type, def);
	xhr.onprogress = (e) => progress(e, def);
	xhr.onloadstart = (e) => start(e, def);
	xhr.onloadend = (e) => end(e, def);
	xhr.onerror = (e) => error(e, def);
	xhr.open("GET", url, true);

	for (const header in headers) {
		xhr.setRequestHeader(header, headers[header]);
	}

	xhr.send();

	return def.promise;
}

export default request;