const express = require('express');

// Import routes for wallet and transaction
const walletRouter = require('./wallet');
const transactionRouter = require('./transaction');

// Creates a new router
const services = express.Router();

// Attaches all of the routes from walletRouter to fall under /wallet
services.use('/wallet', walletRouter);
services.use('/transaction', transactionRouter);

// Exports the created routes for attachment to the parent /api route
module.exports = services;