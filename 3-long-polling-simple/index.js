import { createServer } from 'http'
import { readFile } from 'fs';

const DOMAIN = 'http://localhost';
const PORT = 3000;
const HOST = `${DOMAIN}:${PORT}`;

const clients = [];
const bets = [];
let betFakeAi = 0;

function cleanClient(client){
	const ind = clients.findIndex(cl => cl === client);

	if(ind !== -1){
		clients.splice(ind, 1);
	}
}

function sendBetToClients(bet){
	clients.forEach(cl => cl.response.end(JSON.stringify([ bet ])));
}

function makeBet(){
	const id = ++betFakeAi;
	const bet = { id, value: id * 1000, createdAt: Date.now() };
	bets.push(bet);
	sendBetToClients(bet);
}

const app = createServer(function(request, response){
	const parsedUrl = new URL(request.url, HOST);

	switch(parsedUrl.pathname){
		case '/favicon.ico':
			response.end('');
			break;
		case '/':
			readFile('./public/index.html', function(err, data){
				response.end(data.toString('utf-8'));
			});
			break;
		case '/api/bets':
			const fromId = parseInt(parsedUrl.searchParams.get('from') ?? '0');
			const newBets = bets.filter(bet => bet.id > fromId);

			if(newBets.length > 0){
				response.end(JSON.stringify(newBets));
			}
			else{
				const client = { response, createdAt: Date.now() };
				clients.push(client);
				response.on('close', () => cleanClient(client));
			}
			break;
		case '/api/bets/create':
			makeBet();
			response.end('1');
			break;	
		case '/admin/monitor/clients':
			const clientsLog = clients.map(({ createdAt }) => ({ createdAt }));
			response.end(`
			<!DOCTYPE html>
				<html lang="en">
				<head>
					<meta charset="UTF-8">
					<meta http-equiv="refresh" content="3;url=/admin/monitor/clients" />
					<title>Document</title>
				</head>
				<body>
					<pre>${JSON.stringify(clientsLog, null, 2)}</pre>
				</body>
				</html>
			`);
			break;
		default: 
			response.end('404');
	}
});

app.listen(PORT);
console.log('Server is active now');