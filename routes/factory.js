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

async function newLastWill(addr, value, email, deadline, benAccs, benRatios, verAcc) {
    const response = await lastWillFactory.methods.newLastWill(email, deadline, benAccs, benRatios, verAcc).send({from: addr, value: 1, gas: 6721000});
    console.log(response);
    return response;
}

async function getWill(addr) {
    let response = await lastWillFactory.methods.getWill().call({from: addr});
    return response;
}

async function transferToWill(addr, value) {
    let willAddr = await getWill(addr);
    let _value = await web3.utils.toWei(value, "ether");

    // TODO
    // Do we need to unlock here?!

    await web3.eth.sendTransaction({from: addr, to: willAddr, value: _value});
}

async function hasLastWill(addr) {
    let willFound = await lastWillFactory.methods.hasLastWill().call({from: addr});
    return willFound;
}

async function getWillInfo(addr) {
    let will = await lastWillFactory.methods.getWillInfo().call({from: addr});
    return will;
}

async function witnessWill(witnessAddr) {
    await lastWillFactory.methods.witnessWill().call({from: witnessAddr});
}

async function pronounceDeath(witnessAddr, contractAddr) {
    await lastWillFactory.methods.pronounceDeath(contractAddr).call({from: witnessAddr});
}

// Export all the necessary functions and attributes.
module.exports.contractAddr = contractAddress;
module.exports.getWill = getWill;
module.exports.newLastWill = newLastWill;
module.exports.transferToWill = transferToWill;
module.exports.hasLastWill = hasLastWill;
module.exports.getWillInfo = getWillInfo;
module.exports.witnessWill = witnessWill;
module.exports.pronounceDeath = pronounceDeath;


