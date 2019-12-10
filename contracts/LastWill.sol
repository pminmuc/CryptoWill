pragma solidity ^0.5.8;

contract LastWill {
    // Owner of the Contract and his email
    address payable public owner;
    string private email;
    // NUmber of Verifications that this Contract received
    uint256 private numbOfVer;
    // Bool Is this Contract still valid?
    bool private valid;
    // Array of contacts of the owner
    string private information;
    //time of validity?
    uint256 private deadline;
    // Struct of the beneficiaries
    struct Beneficiary{
        address addBen;
        uint256 ratio;
        string contact;
    }

    //mapping of bens
    mapping (address => Beneficiary) private ben;
    // addresses of the beneficiaries as key to access struct
    address[] private benAccs;


    // function LastWill(){
    //
    // }

    //Constructor for new Last Will
    constructor(
        string memory _email,
        string memory _information,
        uint256 _deadline,
        address[] memory _benAccs,
        //string[] memory _contact,
        uint256[] memory _ratio
    ) public {
        owner = msg.sender;
        email = _email;
        numbOfVer = 0;
        valid = true;
        _information = information;
        _deadline = now + _deadline * 1 minutes;
        _benAccs = benAccs;
        for(uint i = 0; i < benAccs.length; i++) {
            ben[benAccs[i]] = Beneficiary(benAccs[i], _ratio[i], "Nothing Yet");
        }
    }

    modifier onlyOwner() {
        require(msg.sender == owner);
        _;
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

    function getValid() view public returns(bool) {
        return valid;
    }

    function getInformation() view public returns(string memory) {
        return information;
    }

    function getDeadline() view public returns(uint256) {
        return deadline;
    }

    function getBenAccs() view public returns(address[] memory) {
        return benAccs;
    }
}


