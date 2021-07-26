const express = require('express');
var request = require('request');
const dotenv = require('dotenv');
dotenv.config();

// Pulls Bitcoin username and password from .env file
const USER = process.env.RPC_USER;
const PASS = process.env.RPC_PASSWORD;

const headers = {
	"content-type": "text/plain;"
};

// Creates a new set of routes for transaction endpoints
const transactionRouter = express.Router();

// New route /send with a JSON body to create a new wallet with a given name
transactionRouter.post('/send', (req, res) => {

	// Takes recipient address from request JSON body
	const toAddress = req.body.toAddress;

	// Takes transfer amount from request JSON body
	const amount = req.body.amount;

	// Adds recipient address and transfer amount to JSON body format required by Bitcoin Core
	const dataString = `{"jsonrpc: "1.0", "id": "curltext", "method": "sendtoaddress", "params": ["${toAddress}", ${amount}] }`;

	// Neatly organizes all request arguments
	const options = {
		url: `http://${USER}:${PASS}@54.167.84.55:8332/`,
		method: 'POST',
		headers: headers,
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

// New route /get with a JSON body to get info on a transaction
transactionRouter.get('/get/:txid', (req, res) => {
	var options = {
		url: `http://127.0.0.1:8332/rest/tx/${req.params.txid}.json`
	};

	callback = (error, response, body) => {
		if (!error && response.statusCode==200) {
			const data = JSON.parse(body);
			res.json(data);
		}
	}
	request(options, callback);
});

// TO ADD NEW ROUTES WRITE THEM HERE
// transactionRouter.get('/exampleGet', (req, res) => {});
// transactionRouter.post('/examplePost', (req, res) => {});

// Export the created routes for attachment to paretn route
module.exports = transactionRouter;