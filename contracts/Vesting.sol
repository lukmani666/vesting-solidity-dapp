// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

import "@openzeppelin/contracts/token/ERC20/IERC20.sol";

contract Vesting {
    struct Stakeholder {
        address stakeholderAddress;
        uint256 amount;
        uint256 releaseTime;
        bool isWithdrawn;
    }

    address public admin;
    IERC20 public token;
    mapping(address => Stakeholder) public stakeholders;
    address[] public stakeholderList;

    event TokensReleased(address stakeholder, uint256 amount);

    modifier onlyAdmin() {
        require(msg.sender == admin, "Only admin can call this function");
        _;
    }

    constructor(address tokenAddress) {
        admin = msg.sender;
        token = IERC20(tokenAddress);
    }

    function addStakeholder(address _stakeholderAddress, uint256 _amount, uint256 _releaseTime) external onlyAdmin {
        stakeholders[_stakeholderAddress] = Stakeholder(_stakeholderAddress, _amount, _releaseTime, false);
        stakeholderList.push(_stakeholderAddress);
    }

    function withdrawTokens() external {
        Stakeholder storage stakeholder = stakeholders[msg.sender];
        require(block.timestamp >= stakeholder.releaseTime, "Tokens are still vested");
        require(!stakeholder.isWithdrawn, "Tokens already withdrawn");

        token.transfer(msg.sender, stakeholder.amount);
        stakeholder.isWithdrawn = true;

        emit TokensReleased(msg.sender, stakeholder.amount);
    }

    function adminWithdrawTokens(address _stakeholderAddress) external onlyAdmin {
        Stakeholder storage stakeholder = stakeholders[_stakeholderAddress];
        require(block.timestamp >= stakeholder.releaseTime, "Tokens are still vested");
        require(!stakeholder.isWithdrawn, "Tokens already withdrawn");

        token.transfer(admin, stakeholder.amount);
        stakeholder.isWithdrawn = true;

        emit TokensReleased(_stakeholderAddress, stakeholder.amount);
    }
}