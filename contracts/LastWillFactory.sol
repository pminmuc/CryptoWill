
pragma solidity ^0.5.8;

import "./LastWill.sol";

contract LastWillFactory {

    // Store all the wills that have been created.
    mapping(address => address) wills;

    // Returns the will to a specific user address.
    function getWill() public view returns(address) {
        return wills[msg.sender];
    }

    function newLastWill(
        string memory _email,
        uint256 _deadline,
        address[] memory _benAccs,
        uint256[] memory _ratio,
        address payable _verifier
    ) payable public returns(address will) {
        // Create new will.
        will = address(new LastWill(_email, _deadline, _benAccs, _ratio, _verifier));

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
