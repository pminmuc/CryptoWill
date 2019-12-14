var express = require('express');
var router = express.Router();
var bodyParser = require('body-parser');
var factory = require('./factory');
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

/* GET witness page. */
router.get('/witness', async function (req, res, next) {

    // Get stuff from blockchain contract
    // IMPLEMENT
    let isWitness = true;
    let email = "Email"
    let benAccs = "BenAccs"
    let verifier = "Verifier"

    // Open witness page
    res.render('witness', {isWitness: isWitness, email: email, benAccs: benAccs, verifier: verifier});
});

router.get('/myWill', async function (req, res, next) {
    res.render('myWill', {title: "MyWill"});
});

router.post('/refreshWill', async function (req, res, next) {
    let userAddr = req.body.refreshAddr;
    console.log(userAddr);

    res.render('myWill', {title: "MyWill"});
});

router.post('/verifyWill', async function (req, res, next) {
    let addr = req.body.addr;
    console.log(addr);

    // Verify the will.
    await factory.verifyWill(addr);

    // Provide some feedback to show that verification was successful?!
    res.redirect('/witness');
});

router.post('/confirmDeath', async function (req, res, next) {
   let addr = req.body.addr;
   console.log(addr);

   // Send death confirmation
   //  await factory.pronounceDeath(addr, contractAddr);

    // Provide feedback on successful death confirmation.
    res.redirect('/witness');
});


/* GET myWill page. */
router.post('/myWill/:userAddr', async function (req, res, next) {
    // Get users account address from the parameters.
    let userAddr = req.params.userAddr;
    let _hasLastWill = false;
    let _contractAddr = "";

    // Get stuff from contract
    let _email = "Email";
    let _verified = false;
    let _benAccs = "BenAccs";
    let _verAccs = "Verifier";

    // Check if there is a last will associated with the account.
    if (await factory.hasLastWill(userAddr)) {
        _hasLastWill = true;
        _contractAddr = await factory.getWill(userAddr);

        let willInfo = await factory.getWillInfo(_contractAddr);
        _email = willInfo[0];
        _verified = willInfo[1];
        _benAccs = willInfo[2];
        _verAccs = willInfo[3];
    }

    // DEBUG
    console.log("Has last will: " + _hasLastWill);

    // Return will information to client.
    await res.json({
        hasLastWill: _hasLastWill,
        email: _email,
        verified: _verified,
        contractAddr: _contractAddr,
        benAccs: _benAccs,
        verAccs: _verAccs
        }
        );
});

/* GET myWill page. */
router.post('/witness/:userAddr', async function (req, res, next) {
    // Get users account address from the parameters.
    let userAddr = req.params.userAddr;
    let _hasLastWill = false;
    let _contractAddr = "";

    // Get stuff from contract
    let _email = "Email";
    let _verified = false;
    let _benAccs = "BenAccs";
    let _verAccs = "Verifier";

    // Check if there is a last will associated with the account.
    if (await factory.hasVerWill(userAddr)) {
        _hasLastWill = true;
        _contractAddr = await factory.getVerWill(userAddr);

        let willInfo = await factory.getWillInfo(_contractAddr);
        _email = willInfo[0];
        _verified = willInfo[1];
        _benAccs = willInfo[2];
        _verAccs = willInfo[3];
    }

    // DEBUG
    console.log("Has last will to verify: " + _hasLastWill);

    // Return will information to client.
    await res.json({
            hasLastWill: _hasLastWill,
            email: _email,
            verified: _verified,
            contractAddr: _contractAddr,
            benAccs: _benAccs,
            verAccs: _verAccs
        }
    );
});

/* Handle will creation request */
router.post('/submitWill', async function (req, res) {
    // Get information from message
    let _email = req.body.email;
    let _addr = req.body.addr;

    let _benef = [];
    _benef.push(req.body.benef);
    _benef.push(req.body.benef2);

    let _benefShare = [];
    _benefShare.push(req.body.share);
    _benefShare.push(req.body.share2);

    let _verif = []
    _verif.push(req.body.verifier);

    // Submit will and process it
    await factory.newLastWill(_addr, 0, _email, 0, _benef, _benefShare, _verif);

    // Return back to services
    res.redirect('/createWill');
});

/* Handle will creation request */
router.post('/getWill', async function (req, res) {
    // Get information from message
    let _addr = req.body.addr;

    // Submit will and process it
    const response = await factory.getWill(_addr);
    console.log(response);

    // Return back to services
    res.redirect('/createWill');
});

/* Handle will creation request */
router.post('/transferToWill', async function (req, res) {
    // Get information from message
    let _addr = req.body.addr;
    let _value = req.body.value;

    // Submit will and process it
    await factory.transferToWill(_addr, _value);

    console.log(await web3.eth.getBalance(await factory.getWill(_addr)));

    // Return back to services
    res.redirect('/createWill');
});

module.exports = router;
