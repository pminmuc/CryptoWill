var Web3 = require('web3');
var fs = require('fs');

// Init web3 provider to communicate with local blockchain.
var web3 = new Web3(new Web3.providers.HttpProvider("http://127.0.0.1:7545"));
// Read contract abi
var deployedFactory = fs.readFileSync("./build/contracts/LastWillFactory.json", "UTF8");
var deployedLastWill = fs.readFileSync("./build/contracts/LastWill.json", "UTF8");
// Store parsed JSON
var factoryJSON = JSON.parse(deployedFactory);
var lastWillJSON = JSON.parse(deployedLastWill);
// Store contract abi
var factoryAbi = factoryJSON.abi;
var lastWillAbi = lastWillJSON.abi;
// Store contract address
var factoryAddress = factoryJSON.networks[5777].address;
// Create contract object
var lastWillFactory = new web3.eth.Contract(factoryAbi, factoryAddress);

async function newLastWill(addr, value, email, deadline, benAccs, benRatios, verAcc) {
    const response = await lastWillFactory.methods.newLastWill(email, deadline, benAccs, benRatios, verAcc).send({from: addr, value: 1, gas: 6721000});
    console.log(response);
    return response;
}

async function getWill(addr) {
    let response = await lastWillFactory.methods.getWill().call({from: addr});
    return response;
}

async function getVerWill(addr) {
    let response = await lastWillFactory.methods.getVerWill().call({from: addr});
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

async function hasVerWill(addr) {
    let willFound = await lastWillFactory.methods.hasVerWill().call({from: addr});
    return willFound;
}

// Used to get all the information about a will.
// Param: Address of the CONTRACT/LAST WILL
// Return: information on a will
async function getWillInfo(contractAddr) {
    let will = await lastWillFactory.methods.getWillInfo(contractAddr).call();
    return will;
}

// Used to verify a will
// Param: Account address of witness
// Return: Nothing.
async function verifyWill(witnessAddr) {
    // Get contract address to verify
    let _contractAddr = await getVerWill(witnessAddr);

    // Get contract object.
    var lastWill = await new web3.eth.Contract(lastWillAbi, _contractAddr);

    // Verify the will.
    await lastWill.methods.verifyWill().send({from: witnessAddr, value: 1, gas: 300000});
}

// Used to confirm death of testator
// Param: Account address of witness
// Return: Nothing.
async function confirmDeath(witnessAddr) {
    // Get contract address to verify
    let _contractAddr = await getVerWill(witnessAddr);

    // Get contract object.
    var lastWill = await new web3.eth.Contract(lastWillAbi, _contractAddr);

    // Confirm testator as dead.
    await lastWill.methods.confirmDeath().send({from: witnessAddr, value: 1, gas: 300000});
}


// Used to withdraw money from the will
// Param: Account address of user, amount to withdraw
// Return: Nothing.
async function withdrawFromWill(userAddr, amount) {
    // Get contract address
    let _contractAddr = await getWill(userAddr);

    // Get contract object.
    var lastWill = await new web3.eth.Contract(lastWillAbi, _contractAddr);

    // Withdraw amount from will
    await lastWill.methods.withdraw(amount).send({from: userAddr});
}

// Export all the necessary functions and attributes.
module.exports.factoryAddress = factoryAddress;
module.exports.getWill = getWill;
module.exports.newLastWill = newLastWill;
module.exports.transferToWill = transferToWill;
module.exports.hasLastWill = hasLastWill;
module.exports.getWillInfo = getWillInfo;
module.exports.verifyWill = verifyWill;
module.exports.confirmDeath = confirmDeath;
module.exports.hasVerWill = hasVerWill;
module.exports.getVerWill = getVerWill;
module.exports.withdrawFromWill = withdrawFromWill;


