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

    let _verif = req.body.verifier;

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
