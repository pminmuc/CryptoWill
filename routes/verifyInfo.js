var Web3 = require('web3');
var fs = require('fs');

// Init web3 provider to communicate with local blockchain.
var web3 = new Web3(new Web3.providers.HttpProvider("http://127.0.0.1:7545"));


// Helping functions from web3:

/**
 * Checks if the given string is an address
 *
 * @method isAddress
 * @param {String} address the given HEX adress
 * @return {Boolean}
 */
var isAddress = function (address) {
    if (!/^(0x)?[0-9a-f]{40}$/i.test(address)) {
        // check if it has the basic requirements of an address
        return false;
    } else if (/^(0x)?[0-9a-f]{40}$/.test(address) || /^(0x)?[0-9A-F]{40}$/.test(address)) {
        // If it's all small caps or all all caps, return true
        return true;
    } else {
        // Otherwise check each case
        return true;
    }
};


// Verify if Beneficiary address is contained in verifiers
function verifyAdd(benef, verif) {
    console.log(benef);
    console.log(verif);
    for(var i = 0; i < benef.length; i++) {
        console.log(benef.length);
        if(verif.includes(benef[i])) {
            console.log(benef[i]);
            console.log(verif);
            return true;
        }
    }
    return false;
}

// CHeck if the ratio is valid
function ratioCheck(ratio) {
    var ratioInt = 0;
    for(var i = 0; i < ratio.length; i ++) {
        ratioInt += ratio[i];
        if(ratioInt > 100) {
            return true;
        }
    }
    if (ratioInt > 0 && ratioInt <= 100) {
        return false;
    }
    return true;
}

function containsAddress(addrArray) {
    for(let i = 0; i < addrArray.length; i++) {
        if(isAddress(addrArray[i])) {
            return false;
        }
    }
    return true;
}

function validAddress(address) {
    if(isAddress(address)) {
        return true;
    }
    return false;
}




module.exports.containsAddress = containsAddress;
module.exports.validAddress = validAddress;
module.exports.ratioCheck = ratioCheck;
module.exports.verifyAdd = verifyAdd;
