
pragma solidity ^0.5.8;

import "./LastWill.sol";

contract LastWillFactory {

    // Store all the wills that have been created.
    mapping(address => address) wills;

    // Mapping from Beneficiaries to wills that are stored
    mapping(address => address) verWills;

    // Returns true if account is in the mapping.
    function hasLastWill() public view returns(bool) {
        if (address(wills[msg.sender]) != address(0)) {
            return true;
        }
        return false;
    }

    // Returns the will to a specific user address.
    function getWill() public view returns(address) {
        return wills[msg.sender];
    }
    // Returns the will to a specific Beneficiary
    function getVerWill() public view returns(address) {
        return verWills[msg.sender];
    }
    // DOes the Validator has a will to validate???
    function hasVerWill() public view returns(bool) {
        if (address(verWills[msg.sender]) != address(0)) {
            return true;
        }
        return false;
    }

    // Returns information about the will.
    function getWillInfo(address contractAddr) public view returns(string memory, bool, address[] memory, address[] memory) {
        LastWill will = LastWill(address(uint160(contractAddr)));
        string memory _email = will.getEmail();
        bool _verified = will.getVerified();
        address[] memory _benAccs = will.getBenAccs();
        address[] memory _witnAccs = will.getWitnesses();
        return(_email, _verified, _benAccs, _witnAccs);
    }

    function newLastWill(
        string memory _email,
        uint256 _deadline,
        address[] memory _benAccs,
        uint256[] memory _ratio,
        address[] memory _verifier
    ) payable public returns(address will) {
        // Create new will.
        will = address(new LastWill(msg.sender, _email, _deadline, _benAccs, _ratio, _verifier));

        for(uint i = 0; i < _verifier.length; i++) {
            verWills[_verifier[i]] = will;
        }

        // Add will to sender will.
        wills[msg.sender] = address(will);

        // Send ether from this transaction to the created will.
        address(uint160(will)).transfer(msg.value);

        return will;
    }

    // Prevents accidental sending of ether to the factory
    function() external {
        revert();
    }
}
