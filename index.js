import { createServer } from 'http'
import { routes } from '#app/router.js';

const DOMAIN = 'http://localhost';
const PORT = 3000;
const HOST = `${DOMAIN}:${PORT}`;

const app = createServer(function(request, response){
	const parsedUrl = new URL(request.url, HOST);
	request.appParsedUrl = parsedUrl;

	const reqFn = routes[parsedUrl.pathname] ?? function(_, response){
		response.end('404');
	}
	reqFn(request, response);
});

app.listen(PORT);
console.log('Server is active now');