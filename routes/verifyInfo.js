var Web3 = require('web3');
var fs = require('fs');

// Init web3 provider to communicate with local blockchain.
var web3 = new Web3(new Web3.providers.HttpProvider("http://127.0.0.1:7545"));


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



module.exports.ratioCheck = ratioCheck;
module.exports.verifyAdd = verifyAdd;