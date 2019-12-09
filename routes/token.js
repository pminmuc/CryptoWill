var Web3 = require('web3');
var fs = require('fs');

// Init web3 provider to communicate with local blockchain.
var web3 = new Web3(new Web3.providers.HttpProvider("http://127.0.0.1:7545"));

// Read contract abi
var deployedContract = fs.readFileSync("./build/contracts/CustomToken.json", "UTF8")

// Store parsed JSON
var contractJSON = JSON.parse(deployedContract);

// Store contract abi
var contractAbi = contractJSON.abi;

// Store contract address
var contractAddress = contractJSON.networks[5777].address;

// Create contract object
var tokenContract = new web3.eth.Contract(contractAbi, contractAddress);

async function getBalanceByAddress(addr) {
    const response = await tokenContract.methods.getBalanceByAddress(addr).call();
    return response;
}

// Export function
module.exports.getBalanceByAddress = getBalanceByAddress;

