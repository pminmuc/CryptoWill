function loadMyWill() {
    let accountAddress = document.getElementById("myHiddenAccount").value;

    // Send post request with accountAddress
    $.post('myWill/' + accountAddress, function (req, res, next) {
        let json = req;
        let hasLastWill = json["hasLastWill"];
        let _email = json["email"];
        let _contractAddr = json["contractAddr"];
        let _verified = json["verified"];
        let _benAccs = json["benAccs"];
        let _verAccs = json["verAccs"];

        if (hasLastWill) {
            let html = "" +
                "<h3>Your Last Will</h3>" +
                "                                <div>\n" +
                "                                    <p>Contract Address: <br>" +
                _contractAddr + "</p>\n" +
                "                                </div>\n" +
                "                                <div>\n" +
                "                                    <p>Email: <br>" +
                _email + "</p>\n" +
                "                                </div>\n" +
                "                                <div>\n" +
                "                                    <p>Beneficiaries: <br>" +
                _benAccs + "</p>\n" +
                "                                </div>\n" +
                "                                <div>\n" +
                "                                    <p>Verification: <br>" +
                _verified + "</p>\n" +
                "                                </div>\n" +
                "                                <div>\n" +
                "                                    <p>Verifiers: <br>" +
                _verAccs + "</p>\n" +
                "                                </div>"
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
        let hasLastWill = json["hasLastWill"];
        let _email = json["email"];
        let _contractAddr = json["contractAddr"];
        let _verified = json["verified"];
        let _benAccs = json["benAccs"];
        let _verAccs = json["verAccs"];

        if (hasLastWill) {
            let html = "" +
                "<h3>Last Will to verify</h3>" +
                "                                <div>\n" +
                "                                    <p>Contract Address: <br>" +
                _contractAddr + "</p>\n" +
                "                                </div>\n" +
                "                                <div>\n" +
                "                                    <p>Email: <br>" +
                _email + "</p>\n" +
                "                                </div>\n" +
                "                                <div>\n" +
                "                                    <p>Beneficiaries: <br>" +
                _benAccs + "</p>\n" +
                "                                </div>\n" +
                "                                <div>\n" +
                "                                    <p>Verification: <br>" +
                _verified + "</p>\n" +
                "                                </div>\n" +
                "                                <div>\n" +
                "                                    <p>Verifiers: <br>" +
                _verAccs + "</p>\n" +
                "                                </div>"
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