import { renderTemplate } from "../template.js";

export function favicon(_, response){
	response.end('no image');
}

export function home(_, response){
	const html = renderTemplate('./views/index.html', { });
	response.end(html);
}