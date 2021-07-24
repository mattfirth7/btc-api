## Bitcoin API

## Table of Contents
* [General Info](#general-info)
* [Usage](#usage)

## General Info
This project is a simple API for interacting with a Bitcoin node. It currently has only simple routes for wallet creation, wallet info, sending a transaction, and getting transaction info.
Written in NodeJS v16.2.0

## Usage
There are two ways to interact with this API:
1. Use the available [frontend](http://localhost:3000)
    * For creating a wallet you will need a string to use as your wallet name
    * For sending a transaction you will need the address for the wallet you wish to send to and the amount you wish to send
    * For receiving info on a transaction you will need the transaction hash/transaction id.
  

2. Download [Insomnia](https://insomnia.rest/download), then send the appropriate request based on the following:
    #### Wallet
    * Create Wallet:
      * POST request to http://localhost:4444/api/wallet/create
      * JSON body: { walletName: "yourwalletnamehere" }
  
    * Get Wallet Info:
      * GET request to http://localhost:4444/api/wallet/get
  
 
    #### Transactions
    * Send Transaction:
      * POST request to http://localhost:4444/api/transaction/send
      * JSON body: { toAddress: "recipientaddresshere", amount: x } where x is your desired number
  
    * Get Transaction Info:
      * GET request to http://localhost:4444/api/transaction/send
      * JSON body: { txid: "desiredtransactionidhere" }
