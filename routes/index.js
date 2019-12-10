var express = require('express');
var router = express.Router();
var bodyParser = require('body-parser');
var contract = require('./contract');
var token = require('./token');
var Web3 = require('web3');

// Init web3 provider to communicate with local blockchain.
var web3 = new Web3(new Web3.providers.HttpProvider("http://127.0.0.1:7545"));

/* GET home page. */
router.get('/', async function (req, res, next) {
    // Open homepage
    res.render('index', {title: 'Home'});
});

/* GET about page. */
router.get('/about', async function (req, res, next) {
    // Open about
    res.render('about', {title: 'About'});
});

/* GET contact page. */
router.get('/contact', async function (req, res, next) {
    // Open contact page
    res.render('contact', {title: 'Contact'});
});

/* GET create Will page. */
router.get('/createWill', async function (req, res, next) {
    // Open create Will page
    res.render('createWill', {title: 'Creation'});
});

/* Handle will creation request */
router.post('/submitWill', async function (req, res) {
    // Get information from message
    let _benef = req.body.benef;
    let _benefShare = req.body.share;
    let _verif = req.body.verifier;

    // Submit will and process it


    // Return back to services
    res.redirect('/services');
});

/* Handle submission request */
router.post('/submit-data', async function (req, res) {
    // Get information from the client-request.
    let _accAddr = req.body.accAddr;
    let _amount = req.body.amount;
    let _pwd = req.body.pwd;

    // Check if address is valid
    if (web3.utils.isAddress(_accAddr)) {
        // Check if amount is valid
        if (_amount > 0 && parseInt(web3.utils.fromWei(await web3.eth.getBalance(_accAddr), "ether")) > _amount) {
            // Unlock wallet for transaction with passphrase supplied.
            await web3.eth.personal.unlockAccount(_accAddr, _pwd, 30)
                .then((response) => {
                    console.log(response);
                }).catch((error) => {
                    console.log(error);
                });

            // Send transaction
            await contract.fund(_accAddr, _amount);
        } else {
            console.log("Insufficient funds.");
        }
    } else {
        console.log("Invalid address");
    }

    // Get necessary information from the contract.
    let _owner = await contract.getOwner();
    let _contrAddr = contract.contractAddr;
    let _contrBal = await contract.getContractBalance();
    let _funded = await contract.getTotalAmount();
    let _goal = await contract.getGoalAmount();
    let _currTokens = await token.getBalanceByAddress(_contrAddr);
    let _ended = await contract.getEnded();

    // Set status of current crowdfunding
    let _status;
    if (_ended) {
        if (parseInt(_funded) >= parseInt(_goal)) {
            _status = "Funding finished successful.";
        } else {
            _status = "Funding failed."
        }
    } else {
        _status = "Funding still active."
    }

    let _userAddr = _accAddr;
    let _userFunding = await contract.getBalanceByAddress(_userAddr);
    let _userTokens = await token.getBalanceByAddress(_userAddr);

    // Open page with given information
    res.render('investor', {
        title: 'Investor',
        contractAddr: _contrAddr,
        ownerAddr: _owner,
        status: _status,
        funded: _funded,
        goal: _goal,
        contractBalance: _contrBal,
        tokens: _currTokens,
        userAddr: _userAddr,
        userFunding: _userFunding,
        userTokens: _userTokens
    });
});

module.exports = router;