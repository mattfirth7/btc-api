import express from 'express';

import { walletRouter } from './wallet';
import { transactionRouter } from './transaction';

export const services = express.Router();

services.use('/wallet', walletRouter);
services.use('/transaction', transactionRouter);