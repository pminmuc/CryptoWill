function loadMyWill() {
    let accountAddress = document.getElementById("myHiddenAccount").value;

    // Send post request with accountAddress
    $.post('myWill/' + accountAddress, function (req, res, next) {
        let json = req;
        console.log(json);
        let _hasLastWill = json["hasLastWill"];
        let _email = json["email"];
        let _contractAddr = json["contractAddr"];
        let _contractBal = json["contractBal"];
        let _verified = json["verified"];
        let _benAccs = json["benAccs"];
        let _ratios = json["ratios"];
        let _verAccs = json["verAccs"];

        if (_hasLastWill) {
            let html = "" +
                "<h3>My Last Will</h3>" +
                "                                <div>\n" +
                "                                    <p>Contract Address: <br>" +
                _contractAddr + "</p>\n" +
                "                                </div>\n" +
                "                                 <div>\n" +
                "                                    <p>Contract Balance: <br>" +
                _contractBal + "ETH </p>\n" +
                "                                </div>\n" +
                "                                <div>\n" +
                "                                    <p>Email: <br>" +
                _email + "</p>\n" +
                "                                </div>\n" +
                "                                <div>\n" +
                "                                    <p>Verification: <br>" +
                _verified + "</p>\n" +
                "                                </div>\n";

            // Generate html for beneficiary information
            var htmlBenef = "                                <div>\n" +
                "                                    <p>Beneficiaries: <br>";
            for (let i = 0; i < _benAccs.length; i++) {
                htmlBenef = htmlBenef + _benAccs[i] + " Share: " + _ratios[i] + "% <br>";
            }
            htmlBenef = htmlBenef + "</p>\n" + "</div>\n";

            // Generate html for verifiers
            var htmlVeref = "                                <div>\n" +
                "                                    <p>Verifiers: <br>";
            for (let i = 0; i < _verAccs.length; i++) {
                htmlVeref = htmlVeref + _verAccs[i] + "<br>";
            }
            htmlVeref = htmlVeref + "</p>\n" + "</div>\n";

            // Append beneficary and verifier information
            html = html + htmlBenef + htmlVeref;
            document.getElementById("willInformation").innerHTML = html;
        } else {
            let html = "<h3>You dont currently have a will associated with this account</h3>";
            document.getElementById("willInformation").innerHTML = html;
        }
    });
}

function loadAbout() {
    let accountAddress = document.getElementById("myHiddenAccount").value;

    $.get('/about/' + accountAddress);
}

function loadCreateWill() {
    let accountAddress = document.getElementById("myHiddenAccount").value;

    document.getElementById("createAddr").value = accountAddress;
}

function loadWitness() {
    let accountAddress = document.getElementById("myHiddenAccount").value;

    $.post('witness/' + accountAddress, function (req, res, next) {

        let json = req;
        let _hasLastWill = json["hasLastWill"];
        let _email = json["email"];
        let _contractAddr = json["contractAddr"];
        let _contractBal = json["contractBal"];
        let _verified = json["verified"];
        let _benAccs = json["benAccs"];
        let _ratios = json["ratios"];
        let _verAccs = json["verAccs"];

        if (_hasLastWill) {
            let html = "" +
                "<h3>Last Will to verify</h3>" +
                "                                <div>\n" +
                "                                    <p>Contract Address: <br>" +
                _contractAddr + "</p>\n" +
                "                                </div>\n" +
                "                                 <div>\n" +
                "                                    <p>Contract Balance: <br>" +
                _contractBal + "ETH </p>\n" +
                "                                </div>\n" +
                "                                <div>\n" +
                "                                    <p>Email: <br>" +
                _email + "</p>\n" +
                "                                </div>\n" +
                "                                <div>\n" +
                "                                    <p>Verification: <br>" +
                _verified + "</p>\n" +
                "                                </div>\n";

            // Generate html for beneficiary information
            var htmlBenef = "                                <div>\n" +
                "                                    <p>Beneficiaries: <br>";
            for (let i = 0; i < _benAccs.length; i++) {
                htmlBenef = htmlBenef + _benAccs[i] + " Share: " + _ratios[i] + "% <br>";
            }
            htmlBenef = htmlBenef + "</p>\n" + "</div>\n";

            // Generate html for verifiers
            var htmlVeref = "                                <div>\n" +
                "                                    <p>Verifiers: <br>";
            for (let i = 0; i < _verAccs.length; i++) {
                htmlVeref = htmlVeref + _verAccs[i] + "<br>";
            }
            htmlVeref = htmlVeref + "</p>\n" + "</div>\n";

            // Append beneficary and verifier information
            html = html + htmlBenef + htmlVeref;
            document.getElementById("willInformation").innerHTML = html;
        } else {
            let html = "<h3>You dont currently have a will to verify</h3>";
            document.getElementById("willInformation").innerHTML = html;
        }
    });
}

function verifyWill() {
    let accountAddress = document.getElementById("myHiddenAccount").value;

    $.post('verifyWill/' + accountAddress, function (req, res, next) {

    });

    window.alert("Contract Verification Sent");
}

function confirmDeath() {
    let accountAddress = document.getElementById("myHiddenAccount").value;

    $.post('confirmDeath/' + accountAddress, function (req, res, next) {

    });
    window.alert("Confirmation of Death Sent");
}

// At the beginning the counter of the beneficiaries starts at 0
var benefIds = 0;
// ADD beneficiaries
function addForm() {
    // console.log("Test / add Form button");
    benefIds ++;
    let objTo = document.getElementById('benefs');
    let appendNode = document.createElement("div");
    appendNode.setAttribute("class","beneficiaries" + benefIds)
    // console.log(objTo);
    let htmlStr = '<div class="row form-group">\n' +
        '                                    <div class="col-md-12">\n' +
        '                                        <label class="sr-only" for="benef">Beneficiary</label>\n' +
        '                                        <input id="benAddr'+ benefIds+'" type="text" name="benef" class="form-control"\n' +
        '                                               placeholder="Beneficiary address">\n' +
        '                                    </div>\n' +
        '                                </div>\n' +
        '\n' +
        '                                <div class="row form-group">\n' +
        '                                    <div class="col-md-12">\n' +
        '                                        <label class="sr-only" for="share">Share</label>\n' +
        '                                        <input id="benShare'+ benefIds+'" type="text" name="share" class="form-control"\n' +
        '                                               placeholder="Beneficiaries share">\n' +
        '                                    </div>\n' +
        '</div>\n' +
        '                                 <div class="row form-group">\n' +
        '                                     <p id="descr">Address and Share for the '+ (benefIds + 1) +'th Beneficiary </p>\n' +
        '                                    <button class="btn btn-outline-danger col-md-12" id="benRemove'+ benefIds +'"type="button" onClick="removeForm('+ benefIds +')">Remove Beneficiary</button>\n' +
        '                                </div>';

    // Check if the button will be invalid because the id is wrong:
    if(benefIds > 1) {
        document.getElementById("benRemove" + (benefIds - 1)).style.visibility = 'hidden';
    }
    appendNode.innerHTML = htmlStr;
    objTo.appendChild(appendNode);

}
//remove beneficiaries
function removeForm(number) {
    benefIds--;
    $('.beneficiaries' + number).remove();
    if(benefIds > 0) {
        document.getElementById("benRemove" + benefIds).style.visibility = 'visible';
    }
}

//Number of verifier 0 at the beginning
var verifier = 0;
function addVerifier() {
    verifier++;

    let objTo2 = document.getElementById('Verifs');
    let appendNode2 = document.createElement("div");
    appendNode2.setAttribute("class","verifscat2" + verifier);
    let htmlStr2 = '<div class="row form-group">\n' +
        '                                    <div class="col-md-12">\n' +
        '                                        <label class="sr-only" for="verifier">Verifier</label>\n' +
        '                                        <input id="verif' + verifier +'" type="text" name="verifier" class="form-control"\n' +
        '                                               placeholder="Verfifiers address">\n' +
        '                                    </div>\n' +
        '</div>\n' +
        '<div class="row form-group">\n' +
        '                                     <p id="descr">Address for the '+ (verifier + 1) +'th Verifier </p>\n' +
        '                                    <button class="btn btn-outline-danger col-md-12" id="removeVer' + verifier + '" onclick="removeVerifier(' + verifier +')" type="button">Remove Verifier</button>\n' +
        '                                    </div>';

    if(verifier > 1) {
        document.getElementById("removeVer" + (verifier - 1)).style.visibility = 'hidden';
    }
    appendNode2.innerHTML = htmlStr2;
    objTo2.appendChild(appendNode2);
}
//REMOVE Verifiers
function removeVerifier(verId) {
    //Console Logs for testing
    // console.log(verId);
    // console.log($('.verifscat2' + verId));

    verifier--;
    $('.verifscat2' + verId).remove();
    if(verifier > 0) {
        document.getElementById("removeVer" + verifier).style.visibility = 'visible';
    }
}

//Get all the values from the Elements for submitting and sending the elements to the backend
function submitTheWill() {
    let name = document.getElementById("name").value;
    let email = document.getElementById("email").value;
    let accAddr = document.getElementById("accAddr").value;

    //Loop through all of the addresses, ratios and verifiers that exist
    let benAddresses = [];
    for(let i = 0; i <= benefIds; i++)
    {
        let idBen = "benAddr" + i;
        benAddresses.push(document.getElementById(idBen).value);
    }
    let benRatios = [];
    for(let i = 0; i <= benefIds; i++) {
        let idRatio = "benShare" + i;
        benRatios.push(document.getElementById(idRatio).value);
    }

    let verifAddresses = [];
    for(let i = 0; i <= verifier; i++) {
        let idVerif = "verif" + i;
        verifAddresses.push(document.getElementById(idVerif).value);
    }

    console.log("Verif Addresses: " + verifAddresses);
    console.log("benShares" + benRatios);
    console.log("benAddresses" + benAddresses);
    console.log(name + email + accAddr);

    // String it
    let stringB = JSON.stringify(benAddresses);
    let stringR = JSON.stringify(benRatios);
    let stringVA = JSON.stringify(verifAddresses);
    // console.log(stringB);
    let json = {
        name : name,
        email : email,
        accAddr : accAddr,
        benAddresses : stringB,
        benRatios : stringR,
        verifAddresses : stringVA
    };
    console.log(json);
    $.post('/submitWill', json , async function (data) {
    console.log("Post Request");
        console.log(data);
        window.alert(data.error);

    });
}