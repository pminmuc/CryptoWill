async function loadMyWill() {
    let accountAddress = document.getElementById("myHiddenAccount").value;
    console.log(accountAddress);

    // Send post request with accountAddress
    $.post('myWill/' + accountAddress, function (req, res, next) {
        let json = req;
        let _email = "email";
        let value = json[_email];
        console.log(value);
        console.log(req);
    });
}

function loadAbout() {
    let accountAddress = document.getElementById("myHiddenAccount").value;
    console.log(accountAddress);
    $.get('/about/' + accountAddress);
}

function loadCreateWill() {
    let accountAddress = document.getElementById("myHiddenAccount").value;
    console.log(accountAddress);
    $.get('/createWill/' + accountAddress);
}

function loadWitness() {
    let accountAddress = document.getElementById("myHiddenAccount").value;
    console.log(accountAddress);
    $.get('/witness/' + accountAddress);
}