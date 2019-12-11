function loadMyWill() {
    let accountAddress = document.getElementById("myHiddenAccount").value;
    console.log(accountAddress);
    $.get('/myWill/' + accountAddress);
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