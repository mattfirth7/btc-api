const express = require('express');
var request = require('request');
const dotenv = require('dotenv');
const Client = require('bitcoin-core')
dotenv.config();


// Pulls Bitcoin username and password from .env files
const USER = process.env.RPC_USER;
const PASS = process.env.RPC_PASSWORD;

const client = new Client({host: "18.234.174.222", username: USER, password: PASS, port: 8333});

const headers = {
	"content-type": "text/plain;"
};


// Creates new set of routes for the wallet endpoints
const walletRouter = express.Router();

walletRouter.get('/getinfo', (req, res) => {
	const dataString = `{"jsonrpc:"1.0", "id":"curltest", "method":"getinfo", "params":[] }`;
	const options = {
		url: `http://${USER}:${PASS}@127.0.0.1:8333`,
		method: 'POST',
		headers: headers,
		body: dataString
	};

	callback = (error, response, body) => {
		if (!error && response.statusCode == 200) {
			const data = JSON.parse(body);
			res.send(data);
		}
	};

	request(options, callback);
});


// New route /create with a JSON body to create a new wallet with a given name
walletRouter.post("/create", (req, res) => {
	console.log('received');

	// Takes wallet name from request JSON body
	const walletName = req.body.walletName;

	// Adds the wallet name to JSON body format requried by Bitcoin Core
	const dataString = `{"jsonrpc": "1.0","id": "curltest", "method": "createwallet", "params": ["${walletName}"]}`;

	// Neatly organizes all request arguments
	const options = {
		url: `http://127.0.0.1:8333/`,
		method: 'POST',
		headers: headers,
		auth: {
			user: USER,
			pass: PASS
		},
		body: dataString
	};

	// If the request was successful, return the receipt from Bitcoin Core to user
	callback = (error, response, body) => {
		if (!error && response.statusCode == 200) {
			const data = JSON.parse(body);
			res.send(data);
		}
	};

	// Send request
	request(options, callback);
});


// New route /get with a JSON body to get info on the Bitcoin Core wallet
// We use JSON body rather than URL parameters because we don't want to
// show the wallet address in the URL
walletRouter.get('/get', (req, res) => {
	const walletAddress = req.body.walletAddress;

	const privKeyDataString = `{"jsonrpc": "1.0", "id": "curltest", "method": "dumpprivkey", "params": ["${walletAddress}"] }`;
	const privKeyOptions = {
		url: `http://${USER}:${PASS}@18.234.174.222 :8332/`,
		method: 'POST',
		headers: headers,
		body: privKeyDataString
	};

	const balDataString = `{"jsonrpc": "1.0", "id": "curltest, "method": "getwalletinfo", "params": [] }`;
	const balOptions = {
		url: `http://${USER}:${PASS}@54.167.84.55:8332/`,
		method: 'POST',
		headers: headers,
		body: balDataString
	};

	// The information required has to come from multiple requests
	// so we use a promise chain to sequentially get that data and then return
	// it to the user as JSON
	request(balOptions)
		.then((response) => response.json())
		.then((walletInfoRes) => {
			const walletInfo = walletInfoRes;

			return request(privKeyOptions);
		})
		.then((response) => response.json())
		.then((privKeyRes) => {
			const privKey = privKeyRes;

			res.json({ wallet_info: walletInfo, private_key: privKey });
		});



});

// TO ADD NEW ROUTES WRITE THEM HERE
// walletRouter.get('/exampleGet', (req, res) => {});
// walletRouter.post('/examplePost', (req, res) => {});

// Export the created routes for attachement to parent route
module.exports = walletRouter;