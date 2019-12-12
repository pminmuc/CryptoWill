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

    //Get stuff from blockchain contract
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
    console.log("refreshWill Address: ")
    console.log(userAddr);
    let hasLastWill = await factory.hasLastWill(userAddr);
    let will = await factory.getWillInfo(userAddr);
    console.log(will);

    let email = will[0];
    console.log(email);
    let validity = will[1];
    console.log(validity);
    let benAccs = will[2];
    console.log(benAccs);
    let witnessAccs = will[3];
    let witness = witnessAccs[0];
    console.log(witness);

    res.render('myWill', {title: "MyWill",Address:userAddr, email:email, benAccs:benAccs, verifier:validity, witness:witness, hasLastWill:hasLastWill});
});


// /* GET myWill page. */
// router.get('/myWill/:userAddr', async function (req, res, next) {
//     // Get users account address from the parameters.
//     let addr = req.params.userAddr;
//     let hasLastWill = false;
//
//     // Check if there is a last will associated with the account.
//     if (await factory.hasLastWill(addr)) {
//         hasLastWill = true;
//     }
//
//     // DEBUG
//     console.log("Has last will: " + hasLastWill);
//
//     // Get stuff from contract
//     let email = "Email";
//     let benAccs = "BenAccs";
//     let verifier = "Verifier";
//
//
//     // Return back to services
//     res.render('myWill');
//
//     res.render('myWill', {
//         //hasLastWill: hasLastWill,
//         //email: email,
//         //benAccs: benAccs,
//         //verifier: verifier
//     });
// });

/* Handle will creation request */
router.post('/submitWill', async function (req, res) {
    // Get information from message
    let _email = req.body.email;
    console.log(_email);
    let _addr = req.body.addr;
    // Works with different accounts only, getting Revert message otherwise!
    let _benef = [];
    console.log(_benef);
     _benef.push(req.body.benef);
     _benef.push(req.body.benef2);
    console.log(_benef);
    let _benefShare = [];
    _benefShare.push(req.body.share);
    _benefShare.push(req.body.share2);

    let _verif = [req.body.verifier];

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
