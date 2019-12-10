var myWeb3;
var account;

function getWeb3() {
    if (typeof window.web3 === 'undefined') {
        // no web3, use fallback
        console.error("Please use a web3 browser");
        myWeb3 = new Web3(new Web3.providers.HttpProvider("http://127.0.0.1:7545"));
    } else {
        // window.web3 == web3 most of the time. Don't override the provided,
        // web3, just wrap it in your Web3.
        myWeb3 = new Web3(window.web3.currentProvider);

        console.log("Found web3!");
        console.log(myWeb3.eth.defaultAccount);

        myWeb3.eth.getAccounts(function(error, accounts) {
            console.log(accounts)
        })

        document.getElementById("currAccount").innerHTML = "Currently logged in with account:" + myWeb3.eth.accounts[0];
    }
}

window.onload = function() {
    getWeb3();
};