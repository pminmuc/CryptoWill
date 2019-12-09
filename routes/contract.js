var Web3 = require('web3');
var fs = require('fs');

// Init web3 provider to communicate with local blockchain.
var web3 = new Web3(new Web3.providers.HttpProvider("http://127.0.0.1:7545"));

// Read contract abi
var deployedContract = fs.readFileSync("./build/contracts/CrowdFunding.json", "UTF8")

// Store parsed JSON
var contractJSON = JSON.parse(deployedContract);

// Store contract abi
var contractAbi = contractJSON.abi;

// Store contract address
var contractAddress = contractJSON.networks[5777].address;

// Create contract object
var crowdfundingContract = new web3.eth.Contract(contractAbi, contractAddress);

var _goalReached = false;

async function getOwner() {
    const response = await crowdfundingContract.methods.getOwner().call();
    return response;
}

async function getTotalAmount() {
    let response = await crowdfundingContract.methods.getTotalAmount().call();
    return web3.utils.fromWei(response, "ether");
}

async function getGoalAmount() {
    let response = await crowdfundingContract.methods.getGoalAmount().call();
    return web3.utils.fromWei(response, "ether");
}

async function getDeadline() {
    let response = await crowdfundingContract.methods.getDeadline().call();
    return response;
}

async function getEnded() {
    let response = await crowdfundingContract.methods.getEnd().call();
    return response;
}

async function getOwnerBalance() {
    let response = await web3.eth.getBalance(await getOwner());
    return web3.utils.fromWei(response, "ether");
}

async function checkGoalReached() {
    let _owner = await getOwner();
    await crowdfundingContract.methods.checkGoalReached().send({from: _owner, gas: 6721900})
        .then((response) => {
            console.log("Check goal successful.");
        }).catch((error) => {
            console.log("Check goal failed.");
        });
    _goalReached = await crowdfundingContract.methods.getGoalReached().call();
}

async function withdraw() {
    let _owner = await getOwner();
    await checkGoalReached();
    await crowdfundingContract.methods.withdraw().send({from: _owner, gas: 6721900});
}

async function fund(fromAddr, amount) {
    // Convert from Ether to Wei.
    let _amount = await web3.utils.toWei(amount, "ether");

    // Call method fund in crowdfunding contract to send ETH to the contract.
    await crowdfundingContract.methods.fund().send({from: fromAddr, value: _amount, gas: 6721900})
        .then((response) => {
            console.log("Funding successful.");
            console.log(response);
        }).catch((error) => {
            console.log("Funding failed.");
            console.log(error);
        });

    await checkGoalReached();
}

async function getContractBalance() {
    let response = await web3.eth.getBalance(contractAddress);
    return web3.utils.fromWei(response, "ether");
}

async function getBalanceByAddress(addr) {
    let response = await crowdfundingContract.methods.getBalanceByAddress(addr).call();
    return web3.utils.fromWei(response, "ether");
}

// Export all the necessary functions and attributes.
module.exports.contractAddr = contractAddress;
module.exports.goalReached = _goalReached;
module.exports.getOwner = getOwner;
module.exports.getTotalAmount = getTotalAmount;
module.exports.getGoalAmount = getGoalAmount;
module.exports.getDeadline = getDeadline;
module.exports.getEnded = getEnded;
module.exports.getOwnerBalance = getOwnerBalance;
module.exports.checkGoalReached = checkGoalReached;
module.exports.withdraw = withdraw;
module.exports.fund = fund;
module.exports.getContractBalance = getContractBalance;
module.exports.getBalanceByAddress = getBalanceByAddress;


