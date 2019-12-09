pragma solidity ^0.5.8;

contract CustomToken {
    string public name;
    string public symbol;
    uint8 public decimals;
    mapping(address => uint256) public balanceOf;

    event Transfer(address _from, address _to, uint _value);

    constructor(string memory _tokenName, string memory _tokenSymbol, uint8 _decimalUnits, uint256
        _initialSupply) public {
        name = _tokenName;
        symbol = _tokenSymbol;
        decimals = _decimalUnits;
        balanceOf[msg.sender] = _initialSupply;
    }

    function transfer(address _to, uint256 _value) public {
        require(balanceOf[msg.sender] >= _value);
        require(balanceOf[_to] + _value >= balanceOf[_to]);
        balanceOf[msg.sender] -= _value;
        balanceOf[_to] += _value;
        emit Transfer(msg.sender, _to, _value);
    }

    function getName() public view returns (string memory) {
        return name;
    }

    function getSymbol() public view returns(string memory) {
        return symbol;
    }

    function getDecimals() public view returns (uint8) {
        return decimals;
    }

    function getBalanceByAddress(address addr) public view returns (uint256) {
        return balanceOf[addr];
    }
}