require('dotenv').config()
const { default: Neon, rpc, api, wallet } = require("@cityofzion/neon-js");

// We add Account "myAccount" to the wallet using a wif key.
const WIF = process.env.WIF;
const myAccount = new wallet.Account(WIF);

console.log(myAccount.privateKey)
