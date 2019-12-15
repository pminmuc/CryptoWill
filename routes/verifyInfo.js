var Web3 = require('web3');
var fs = require('fs');

// Init web3 provider to communicate with local blockchain.
var web3 = new Web3(new Web3.providers.HttpProvider("http://127.0.0.1:7545"));


// Verify if Beneficiary address is contained in verifiers
function verifyAdd(benef, verif) {
    for(var i = 0; i < benef.length; i++) {
        if(verif.includes(benef[i])) {
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



module.exports.ratioCheck = ratioCheck;
module.exports.verifyAdd = verifyAdd;