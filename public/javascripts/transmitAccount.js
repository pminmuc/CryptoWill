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
//NOT working / try to add a form dynamically loading
function addForm() {
    console.log("WHY");
    $(document).on('click', '.btn-add', function(e)
    {
        e.preventDefault();
        console.log("Why");
        var controlForm = $('.controls form:first'),
            currentEntry = $(this).parents('.entry:first'),
            newEntry = $(currentEntry.clone()).appendTo(controlForm);

        newEntry.find('input').val('');
        controlForm.find('.entry:not(:last) .btn-add')
            .removeClass('btn-add').addClass('btn-remove')
            .removeClass('btn-success').addClass('btn-danger')
            .html('<span class="glyphicon glyphicon-minus"></span>');
    }).on('click', '.btn-remove', function(e)
    {
        $(this).parents('.entry:first').remove();

        e.preventDefault();

        return false;
    });
}
