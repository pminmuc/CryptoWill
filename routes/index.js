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

    // Open create Will page
    res.render('witness', {isWitness: isWitness, email:email, benAccs: benAccs, verifier: verifier});
});

/* GET myWill page. */
router.get('/myWill', async function (req, res, next) {

    //Get stuff from contract
    // IMPLEMENT
    let hasLastWill = true;
    let email = "Email"
    let benAccs = "BenAccs"
    let verifier = "Verifier"

    // Open create Will page
    res.render('myWill', {
        hasLastWill: hasLastWill,
        email: email,
        benAccs: benAccs,
        verifier: verifier
    });
});

/* Handle will creation request */
router.post('/submitWill', async function (req, res) {
    // Get information from message
    let _email = req.body.email;
    let _addr = req.body.addr;
    let _benef = [];
    _benef.push(req.body.benef);
    let _benefShare = [];
    _benefShare.push(req.body.share);
    let _verif = req.body.verifier;

    // DEBUG
    console.log("This still works");

    // Submit will and process it
    await factory.newLastWill(_addr, 0, _email, 0, _benef, _benefShare, _verif);

    // DEBUG
    console.log("This does also work");

    // TODO
    // What to do with the address that newLastWill gives us? Should be displayed somewhere

    // Return back to services
    res.redirect('/createWill');
});

module.exports = router;
