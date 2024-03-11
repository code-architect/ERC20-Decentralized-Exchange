// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.0;

import "@openzeppelin/contracts/token/ERC20/ERC20.sol";

contract CAC 
{
    IERC20 public associatedToken;
    uint price;
    address owner;

    constructor(IERC20 _token, uint _price) 
    {
        associatedToken = _token;
        owner = msg.sender;
        price = _price;
    }

    //================================================================= Modifiers Start ==========================================================================//

    modifier onlyOwner
    {
        require(msg.sender == owner, "You are not the owner");
        _;
    }

    //================================================================= Modifiers Ends ===========================================================================//

    function sell() external onlyOwner
    {
        uint allowance = associatedToken.allowance(msg.sender, address(this));
        require(allowance > 0, " You mush allow this contract to at least one token");
        bool sent = associatedToken.transferFrom(msg.sender, address(this), allowance);
        require(sent, "failed to send");
    }

}