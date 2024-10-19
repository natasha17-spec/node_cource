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

export function shitFunctionForAdminMonitor(){
	return clients;
}

export function flow(request, response){
	const fromId = parseInt(request.appParsedUrl.searchParams.get('from') ?? '0');
	const newBets = bets.filter(bet => bet.id > fromId);

	if(newBets.length > 0){
		response.end(JSON.stringify(newBets));
	}
	else{
		const client = { response, createdAt: Date.now() };
		clients.push(client);
		response.on('close', () => cleanClient(client));
	}
}

export function add(_, response){
	const id = ++betFakeAi;
	const bet = { id, value: id * 1000, createdAt: Date.now() };
	bets.push(bet);
	sendBetToClients(bet);
	response.end(JSON.stringify(bet));
}