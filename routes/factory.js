var Web3 = require('web3');
var fs = require('fs');

// Init web3 provider to communicate with local blockchain.
var web3 = new Web3(new Web3.providers.HttpProvider("http://127.0.0.1:7545"));

// Read contract abi
var deployedContract = fs.readFileSync("./build/contracts/LastWillFactory.json", "UTF8")

// Store parsed JSON
var contractJSON = JSON.parse(deployedContract);

// Store contract abi
var contractAbi = contractJSON.abi;

// Store contract address
var contractAddress = contractJSON.networks[5777].address;

// Create contract object
var lastWillFactory = new web3.eth.Contract(contractAbi, contractAddress);

async function getWill(addr) {
    const response = await lastWillFactory.methods.getWill().call({from: addr});
    return response;
}

async function newLastWill(addr, value, email, deadline, benAccs, benRatios, verAcc) {
    // try {
        const response = await lastWillFactory.methods.newLastWill(email, deadline, benAccs, benRatios, verAcc).send({from: addr, value: 1, gas: 6721000});
        console.log(response);
        return response;
    // } catch(error) {
    //     // DEBUG
    //     console.log("ERROR");
    //     return(error);
    // }
}

// Export all the necessary functions and attributes.
module.exports.contractAddr = contractAddress;
module.exports.getWill = getWill;
module.exports.newLastWill = newLastWill;


