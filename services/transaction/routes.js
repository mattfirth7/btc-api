const express = require('express');
var request = require('request');
const dotenv = require('dotenv');
dotenv.config();

const USER = process.env.RPC_USER;
const PASS = process.env.RPC_PASSWORD;

const headers = {
	"content-type": "text/plain;"
};

const transactionRouter = express.Router();

transactionRouter.post('/send', (req, res) => {
	const toAddress = req.body.toAddress;
	const amount = req.body.amount;

	const dataString = `{"jsonrpc: "1.0", "id": "curltext", "method": "sendtoaddress", "params": ["${toAddress}", ${amount}] }`
	const options = {
		url: `http://${USER}:${PASS}@127.0.0.1:8332/`,
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