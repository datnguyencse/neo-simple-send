require('dotenv').config()
const { default: Neon, rpc, api, wallet } = require("@cityofzion/neon-js");

// Receiver address
const RECEIVER_ADDRESS = "AWKECj9RD8rS8RPcpCgYVjk1DeYyHwxZm3";
// We add Account "myAccount" to the wallet using a wif key.
const WIF = process.env.WIF;
const myAccount = new wallet.Account(WIF);

// This node ip must run neoscan and neo fullnode, rpc post 30333
const nodeUrl = `http://${process.env.NODE_IP}:30333`; // RPC URL

const privateNetConfig = {
  name: "PrivateNet",
  nodes: [
    `${process.env.NODE_IP}:20333`,
    `${process.env.NODE_IP}:20334`,
    `${process.env.NODE_IP}:20335`,
    `${process.env.NODE_IP}:20336`
  ],
  extra: {
    neoscan: `http://${process.env.NODE_IP}:4000/api/main_net`
  }
};

// Add network config to neon-js
const privateNet = new rpc.Network(privateNetConfig);
Neon.add.network(privateNet, true);
const apiProvider = new api.neoscan.instance("PrivateNet");

const intent = api.makeIntent({ NEO: 1, GAS: 1 }, RECEIVER_ADDRESS);

// Sender configs
const config = {
  api: apiProvider, // Network
  url: nodeUrl,
  account: myAccount, // Your Account
  intents: intent,
  gas: 0, // Optional, system fee
  fees: 0 // Optional, network fee
};

// Neon API
Neon.sendAsset(config)
.then(config => {
  console.log("\n\n--- Response ---");
  console.log(config.response);
})
.catch(config => {
  console.log(config);
});
