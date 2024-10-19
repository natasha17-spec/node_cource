import { renderTemplate } from "../template.js";
import { shitFunctionForAdminMonitor } from "./bets.js";

export function monitor(_, response){
	const data = shitFunctionForAdminMonitor().map(({ createdAt }) => ({ createdAt }));
	const html = renderTemplate('./views/monitor.html', { logs: JSON.stringify(data) });
	response.end(html);
}