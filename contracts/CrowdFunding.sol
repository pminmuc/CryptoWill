pragma solidity ^0.5.8;

interface token {
    function transfer(address receiver, uint amount) external;
}

contract CrowdFunding {
    address payable public owner;
    uint public goalAmount;
    uint public totalAmount;
    uint public deadline;
    uint public price;
    token public tokenReward;
    mapping(address => uint256) public balanceOf;
    bool public goalReached;
    bool public ended;

    event GoalReached(address ownerAddress, uint amountRaisedValue);
    event FundTransfer(address backer, uint amount, bool isContribution);

    modifier onlyOwner() {
        require(msg.sender == owner);
        _;
    }

    modifier afterDeadline() {
        require(now >= deadline);
        _;
    }
    constructor(
        uint _goalAmount,
        uint _durationMinutes,
        uint _costOfToken,
        address _tokenAddress
    ) public {
        owner = msg.sender;
        goalAmount = _goalAmount * 1 ether;
        deadline = now + _durationMinutes * 1 minutes;
        price = _costOfToken * 1 ether;
        tokenReward = token(_tokenAddress);
        totalAmount = 0;
        goalReached = false;
        ended = false;
    }

    function fund() payable external {
        require(!ended);
        uint amount = msg.value;
        // Adjustment to prevent overfunding when no tokens are left.
        if (totalAmount + amount > goalAmount) {
            uint excessAmount = totalAmount + amount - goalAmount;
            msg.sender.transfer(excessAmount);
            amount = amount - excessAmount;
        }
        balanceOf[msg.sender] += amount;
        totalAmount += amount;
        tokenReward.transfer(msg.sender, amount / price);
        emit FundTransfer(msg.sender, amount, true);
    }

    function checkGoalReached() external afterDeadline {
        require(!ended);
        if (totalAmount >= goalAmount) {
            goalReached = true;
            emit GoalReached(owner, totalAmount);
        }
        ended = true;
    }

    function withdraw() external afterDeadline {
        if (!goalReached) {
            uint amount = balanceOf[msg.sender];
            balanceOf[msg.sender] = 0;
            if (amount > 0) {
                if (msg.sender.send(amount)) {
                    emit FundTransfer(msg.sender, amount, false);
                } else {
                    balanceOf[msg.sender] = amount;
                }
            }
        }
        if (goalReached && owner == msg.sender) {
            if (owner.send(totalAmount)) {
                emit FundTransfer(owner, totalAmount, false);
            } else {
                goalReached = false;
            }
        }
    }

    function kill() public onlyOwner {
        selfdestruct(owner);
    }

    function getDeadline() public view returns (uint) {
        return deadline;
    }

    function getEnd() public view returns (bool) {
        return ended;
    }

    function getTotalAmount() public view returns (uint) {
        return totalAmount;
    }

    function getGoalAmount() public view returns (uint) {
        return goalAmount;
    }

    function getOwner() public view returns (address payable) {
        return owner;
    }

    function getGoalReached() public view returns (bool) {
        return goalReached;
    }

    function getBalanceByAddress(address addr) public view returns (uint256) {
        return balanceOf[addr];
    }
}