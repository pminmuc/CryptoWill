pragma solidity ^0.5.8;

contract LastWill {
    // Owner of the Contract and his email
    address payable public owner;
    string private email;
    // Bool if this contract has been verified yet.
    bool private verified;
    // Bool Is this Contract still valid?
    bool private valid;
    // time of validity?
    uint256 private deadline;
    // Struct of the beneficiaries
    struct Beneficiary {
        address payable addBen;
        uint256 ratio;
        bool isBenef;
    }

    // Mapping of bens
    mapping (address => Beneficiary) private ben;
    // Addresses of the beneficiaries as key to access struct
    address[] private benAccs;

    // Struct for the verifiers.
    struct Verifier {
        address payable addVer;
        bool verifiedWill;
        bool confirmedDeath;
        bool isVerifier;
    }
    mapping (address => Verifier ) private witnesses;

    address[] private witnessAccs;

    // Constructor for new Last Will
    constructor (
        string memory _email,
        uint256 _deadline,
        address[] memory _benAccs,
        uint256[] memory _ratio,
        address[] memory _witnessAccs
    ) public {
        owner = msg.sender;
        email = _email;
        valid = true;
        verified = false;
        deadline = now + _deadline * 1 minutes;

        for (uint i = 0; i < _benAccs.length; i++) {
            benAccs.push(_benAccs[i]);
            ben[benAccs[i]] = Beneficiary(address(uint160(_benAccs[i])), _ratio[i], true);
        }

        for (uint i = 0; i < _witnessAccs.length; i++) {
            witnessAccs.push(_witnessAccs[i]);
            witnesses[witnessAccs[i]] = Verifier(address(uint160(witnessAccs[i])), false, false, true);
        }
        // Change later when adding more Witnesses.
        // witness = Verifier(_verifier, false, false);
    }

    //
    //  MODIFIERS
    //

    // Modifier that requires sender to be the owner.
    modifier onlyOwner() {
        require(msg.sender == owner);
        _;
    }

    // Modifier that requires the last will the be verified.
    modifier afterVerification() {
        require(verified);
        _;
    }

    // Modifier that requires sender to be a beneficiary.
    modifier onlyBeneficiary() {
        require(ben[msg.sender].isBenef == true);
        _;
    }

    // Modifier that requires sender to be a verifier.
    modifier onlyVerifier() {
        require(witnesses[msg.sender].isVerifier == true);
        _;
    }

    //Check if all Witnesses confirmed the death of the person
    modifier afterDeath() {
        bool isDead = false;
        for(uint i = 0; i < witnessAccs.length; i++) {
            if(witnesses[witnessAccs[i]].confirmedDeath) {
                isDead = true;
            }
        }
        require(isDead);
        _;
    }

    //
    // ACTUAL LOGIC
    //

    function() payable external{
        emit Received(msg.sender, msg.value);
    }

    // Verify Will
    function verifyWill() onlyVerifier public {
        witnesses[msg.sender].verifiedWill = true;
    }
    // Verify Death
    function confirmDeath() onlyVerifier public {
        witnesses[msg.sender].confirmedDeath = true;
    }

    function inherit() onlyBeneficiary afterVerification afterDeath public {
        address payable benef = msg.sender;
        uint256 inheritance = 0;
        uint256 share = ben[address(benef)].ratio;

        // Calculate the inheritance amount for beneficiary
        inheritance = address(this).balance * share;

        // Send the inheritance amount to the beneficiary
        benef.transfer(inheritance);
        emit Withdrew(msg.sender, inheritance);

        // Set share to 0 to avoid double inheritance.
        ben[address(benef)].ratio = 0;
    }

    function withdraw() onlyOwner public {

    }

    //
    //  GETTER FUNCTIONS
    //
    function getEmail() view public returns(string memory) {
        return email;
    }


    function getVerified() view public returns(bool) {
        return verified;
    }

    function getValid() view public returns(bool) {
        return valid;
    }

    function getDeadline() view public returns(uint256) {
        return deadline;
    }

    function getBenAccs() view public returns(address[] memory) {
        return benAccs;
    }

    function getWitnesses() view public returns(address[] memory) {
        return witnessAccs;
    }
    //
    // EVENTS
    //
    event Received(address from, uint256 amount);
    event Withdrew(address to, uint256 amount);
}



