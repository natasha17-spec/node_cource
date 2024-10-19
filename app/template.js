import { readFileSync } from 'fs'
import { resolve } from 'path';
import { getDirName } from './utils.js'

export function renderTemplate(path, vars){
	let html = readFileSync(resolve(getDirName(import.meta.url), path)).toString('utf-8');
	
	html = html.replace(/{{(.+?)}}/g, function(_, name){
		name = name.trim();

		if(vars[name] === undefined){
			console.log('no var with name' + name);
			return '';
		}

		return vars[name];
	})

	return html;
}