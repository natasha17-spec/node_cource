import { createServer } from 'http'
import { readFile } from 'fs';

const DOMAIN = 'http://localhost';
const PORT = 3000;
const HOST = `${DOMAIN}:${PORT}`;

const bets = [];
let betFakeAi = 0;

function makeBet(){
	const id = ++betFakeAi;
	const bet = { id, value: id * 1000, createdAt: Date.now() };
	bets.push(bet);
}

function betsFakeProccess(){
	const delay = Math.floor(Math.random() * 10000) + 5000;
	console.log(`next bet in future, ${delay}`);

	setTimeout(() => {
		makeBet();
		betsFakeProccess();
	},	delay);
}

betsFakeProccess();

const app = createServer(function(request, response){
	const parsedUrl = new URL(request.url, HOST);
	console.log(parsedUrl);
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
			response.end(JSON.stringify(newBets));
			break;
		default: 
			response.end('404');
	}
});

app.listen(PORT);
console.log('Server is active now');