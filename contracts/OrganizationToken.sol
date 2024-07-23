// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

import "@openzeppelin/contracts/token/ERC20/ERC20.sol";

contract OrganizationToken is ERC20 {
    address public admin;

    constructor(string memory name, string memory symbol, uint256 initialSupply) ERC20(name, symbol) {
        admin = msg.sender;
        _mint(admin, initialSupply);
    }
}