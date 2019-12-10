pragma solidity ^0.5.8;

contract LastWill {
    // Owner of the Contract and his email
    address payable public owner;
    string private email;
    // Number of Verifications that this Contract received
    uint256 private numbOfVer;
    // Bool if this contract has been verified yet.
    bool private verified;
    // Verifier for the contract
    Verifier witness;
    // Bool Is this Contract still valid?
    bool private valid;
    // time of validity?
    uint256 private deadline;
    // Struct of the beneficiaries
    struct Beneficiary {
        address payable addBen;
        uint256 ratio;
    }
    // Struct for the verifiers.
    struct Verifier {
        address payable addVer;
        bool verified;
    }

    // Mapping of bens
    mapping (address => Beneficiary) private ben;
    // Addresses of the beneficiaries as key to access struct
    address[] private benAccs;

    // Constructor for new Last Will
    constructor (
        string memory _email,
        uint256 _deadline,
        address[] memory _benAccs,
        uint256[] memory _ratio,
        address payable _verifier
    ) public {
        owner = msg.sender;
        email = _email;
        numbOfVer = 0;
        valid = true;
        verified = false;
        deadline = now + _deadline * 1 minutes;
        for (uint i = 0; i < _benAccs.length; i++) {
            benAccs[i] = _benAccs[i];
            ben[benAccs[i]] = Beneficiary(address(uint160(_benAccs[i])), _ratio[i]);
        }

        // Change later when adding more Witnesses.
        witness = Verifier(_verifier, false);
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
        bool isBenef = false;
        for (uint i = 0; i < benAccs.length; i++) {
            if (msg.sender == benAccs[i]) {
                isBenef = true;
            }
        }
        require(isBenef);
        _;
    }

    // Modifier that requires sender to be a verifier.
    modifier onlyVerifier() {
        require(msg.sender == witness.addVer);
        _;
    }

    //
    // ACTUAL LOGIC
    //

    function() payable external{
        emit Received(msg.sender, msg.value);
    }

    function verify() onlyVerifier public {

    }

    function inherit() onlyBeneficiary afterVerification public {
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

    function getNumbOfVer() view public returns(uint256) {
        return numbOfVer;
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

    //
    // EVENTS
    //
    event Received(address from, uint256 amount);
    event Withdrew(address to, uint256 amount);
}



