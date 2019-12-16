function loadMyWill() {
    let accountAddress = document.getElementById("myHiddenAccount").value;

    // Send post request with accountAddress
    $.post('myWill/' + accountAddress, function (req, res, next) {
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
}

function confirmDeath() {
    let accountAddress = document.getElementById("myHiddenAccount").value;

    $.post('confirmDeath/' + accountAddress, function (req, res, next) {

    });
}

function createWill() {

}

var Forms;
var benefIds = 0;

function addForm() {
    console.log("Test / add Form button");
    Forms ++;
    benefIds ++;
    var objTo = document.getElementById('benefs');
    var appendNode = document.createElement("div");
    appendNode.setAttribute("class","beneficiaries")
    console.log(objTo);
    htmlStr = '<div class="row form-group">\n' +
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
        '                                    <button type="button" onclick="addForm()">Add Beneficiaries</button>\n' +
        '                                </div>';

    appendNode.innerHTML = htmlStr;

    console.log(htmlStr);

    objTo.appendChild(appendNode);

}
