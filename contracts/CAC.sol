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

    function withdrawTokens() external onlyOwner
    {
        uint balance = associatedToken.balanceOf(address(this));
        associatedToken.transfer(msg.sender, balance);
    }

    function withdrawFunds() external onlyOwner
    {
        (bool sent,) = payable(msg.sender).call{value: address(this).balance}("");
        require(sent, "Failed!!");
    }

    function getprice(uint numTokens) public view returns(uint)
    {
        return numTokens * price;
    }

    function buy(uint numTokens) external payable
    {
        require(numTokens <= getToenBalance(), "Not enough tokens");
        uint tokenPrice = getprice(numTokens);
        require(msg.value == tokenPrice, "Invalid value sent");

        associatedToken.transfer(msg.sender, numTokens);
    }

    function getToenBalance() public view returns(uint)
    {
        return associatedToken.balanceOf(address(this));
    }
}