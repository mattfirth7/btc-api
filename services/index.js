const express = require('express');

const walletRouter = require('./wallet');

const services = express.Router();

services.use('/wallet', walletRouter);

module.exports = services;