import { monitor } from "./controllers/admin.js";
import { add, flow } from "./controllers/bets.js";
import { favicon, home } from "./controllers/static.js";

export const routes = {
	'/': home,
	'/favicon.ico': favicon,
	'/api/bets': flow,
	'/api/bets/create': add,
	'/admin/monitor': monitor
};