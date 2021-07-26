## Bitcoin API

## Table of Contents
* [General Info](#general-info)
* [Usage](#usage)

## General Info
This project is a simple API for interacting with a Bitcoin node. It currently has only simple routes for wallet creation, wallet info, sending a transaction, and getting transaction info.
Written in NodeJS v16.2.0

## Usage
To interact with this API:

Download [Insomnia](https://insomnia.rest/download), then send the appropriate request based on the following:
    #### Wallet
    * Create Wallet:
      * POST request to http://18.234.174.222:4444/api/wallet/create
      * JSON body: { walletName: "yourwalletnamehere" }
  
    * Get Wallet Info:
      * GET request to http://18.234.174.222:4444/api/wallet/get
  
 
    #### Transactions
    * Send Transaction:
      * POST request to http://18.234.174.222:4444/api/transaction/send
      * JSON body: { toAddress: "recipientaddresshere", amount: x } where x is your desired number
  
    * Get Transaction Info:
      * GET request to http://18.234.174.222:4444/api/transaction/get/:txid
