var express = require('express');
var router = express.Router();
var bodyParser = require('body-parser');
var factory = require('./factory');
var verifyInfo = require('./verifyInfo');
var Web3 = require('web3');


// Init web3 provider to communicate with local blockchain.
 var web3 = new Web3(new Web3.providers.HttpProvider("http://127.0.0.1:7545"));
// var web3 = new Web3(new Web3.providers.HttpProvider("http://192.168.43.13:7545"));

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
    // Open witness page
    res.render('witness', {title: "Verification"});
});

/* GET myWill page*/
router.get('/myWill', async function (req, res, next) {
    res.render('myWill', {title: "MyWill"});
});

/* Handle request to verify the will using the supplied address*/
router.post('/verifyWill/:userAddr', async function (req, res, next) {
    let userAddr = req.params.userAddr;

    // Verify the will.
    await factory.verifyWill(userAddr);

    // Provide some feedback to show that verification was successful?!
    res.redirect('/witness');
});

/* Handle confirm Death request*/
router.post('/confirmDeath/:userAddr', async function (req, res, next) {
    let userAddr = req.params.userAddr;

   // Send death confirmation
    await factory.confirmDeath(userAddr);

    // Provide feedback on successful death confirmation.
    res.redirect('/witness');
});


/* GET myWill page with additional information based on the user's address. */
router.post('/myWill/:userAddr', async function (req, res, next) {
    // Get users account address from the parameters.
    let userAddr = req.params.userAddr;
    let _hasLastWill = false;
    let _contractAddr = "";
    let _contractBal = "";

    // Get stuff from contract
    let _email = "Email";
    let _verified = false;
    let _benAccs = "BenAccs";
    let _ratios = "";
    let _verAccs = "Verifier";


    // Check if there is a last will associated with the account.
    if (await factory.hasLastWill(userAddr)) {
        _hasLastWill = true;
        _contractAddr = await factory.getWill(userAddr);
        _contractBal = web3.utils.fromWei(await web3.eth.getBalance(_contractAddr), "ether");

        let willInfo = await factory.getWillInfo(_contractAddr);
        _email = willInfo[0];
        _verified = willInfo[1];
        _benAccs = willInfo[2];
        _ratios = willInfo[3];
        _verAccs = willInfo[4];
    }

    // Return will information to client.
    await res.json({
        hasLastWill: _hasLastWill,
        email: _email,
        verified: _verified,
        contractAddr: _contractAddr,
        benAccs: _benAccs,
        ratios: _ratios,
        verAccs: _verAccs,
        contractBal: _contractBal
        }
        );
});

/* GET witness page with additional information based on the user's address. */
router.post('/witness/:userAddr', async function (req, res, next) {
    // Get users account address from the parameters.
    let userAddr = req.params.userAddr;
    let _hasLastWill = false;
    let _contractAddr = "";
    let _contractBal = "";

    // Get stuff from contract
    let _email = "Email";
    let _verified = false;
    let _benAccs = "BenAccs";
    let _ratios = "";
    let _verAccs = "Verifier";

    // Check if there is a last will associated with the account.
    if (await factory.hasVerWill(userAddr)) {
        _hasLastWill = true;
        _contractAddr = await factory.getVerWill(userAddr);
        _contractBal = web3.utils.fromWei(await web3.eth.getBalance(_contractAddr), "ether");

        let willInfo = await factory.getWillInfo(_contractAddr);
        _email = willInfo[0];
        _verified = willInfo[1];
        _benAccs = willInfo[2];
        _ratios = willInfo[3];
        _verAccs = willInfo[4];
    }

    // Return will information to client.
    await res.json({
            hasLastWill: _hasLastWill,
            email: _email,
            verified: _verified,
            contractAddr: _contractAddr,
            benAccs: _benAccs,
            ratios: _ratios,
            verAccs: _verAccs,
            contractBal: _contractBal
        }
    );
});

/* Handle will creation request */
router.post('/submitWill', async function (req, res) {


    let _name = req.body.name;
    console.log(_name);
    console.log(req.body);
    //let _name = req.body.name;

    // Get information from message
    let _email = req.body.email;
    let _addr = req.body.accAddr;


    let _benef = JSON.parse(req.body.benAddresses);
    console.log(_benef);


    let _benefShare = JSON.parse(req.body.benRatios);

    let _verif = JSON.parse(req.body.verifAddresses);

    console.log((verifyInfo.validAddress(_addr) && verifyInfo.containsAddress(_benef) && verifyInfo.containsAddress(_verif)));

    console.log(verifyInfo.validAddress(_addr));
    console.log(verifyInfo.containsAddress(_benef));
    console.log(verifyInfo.containsAddress(_verif));
    // Check for the last Will to contain unvalid constraints - owner & beneficiary & verifier address can not be the same
    if (! (verifyInfo.validAddress(_addr) && verifyInfo.containsAddress(_benef) && verifyInfo.containsAddress(_verif))) {
        await res.json({error:"Addresses must be valid Ethereum Addresses!"});
        console.log("wrong addresses");
    }else if(_benef.includes(_addr)) {
        await res.json({error:"Wrong Address - Beneficiary can not include LastWill owners address!"});
        console.log("Wrong Addr - Ben can not include LastWill owners Address!");
    } else if(_verif.includes(_addr)) {
        await res.json({error:"Wrong Address - Verifier can not include LastWill owners address!"});
        console.log("Wrong Addr - verifier can not include lastwill owners address!");
    } else if(verifyInfo.verifyAdd(_benef, _verif)) {
        await res.json({error:"Beneficiary and Verifier must have different addresses!"});
        console.log("ben and ver must have different addresses");
    } else if(verifyInfo.ratioCheck(_benefShare)) {
        await res.json({error:"The ratio of shares that beneficiaries will receive is invalid"});
        console.log("ratio of shares is either >100 or <0 !!!");
    } else {

        // Submit will and process it
        await factory.newLastWill(_addr, 0, _email, 0, _benef, _benefShare, _verif);
        await res.json({error:"The LastWill was successfully created."});

    }
    // Return back to services


});

/* Handle will information request */
router.post('/getWill', async function (req, res) {

    // Get information from message
    let _addr = req.body.addr;

    // Submit will and process it
    const response = await factory.getWill(_addr);
    console.log(response);

    // Return back to services
    res.redirect('/createWill');
});

/* Handle request to transfer funds to the will */
router.post('/transferToWill', async function (req, res) {
    // Get information from message
    let _addr = req.body.addr;
    let _value = req.body.value;

    // Process fund transmission
    await factory.transferToWill(_addr, _value);

    console.log(await web3.eth.getBalance(await factory.getWill(_addr)));

    // Return back to services
    res.redirect('/createWill');
});

/* Handle withdrawal request. */
router.post('/withdrawFromWill', async function (req, res) {
    // Get information from message
    let _addr = req.body.addr;
    let _value = req.body.value;

    // Process fund transmission
    await factory.withdrawFromWill(_addr, _value);

    console.log(await web3.eth.getBalance(await factory.getWill(_addr)));

    // Return back to services
    res.redirect('/createWill');
});

module.exports = router;
