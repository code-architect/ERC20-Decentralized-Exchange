// const { expect } = require("chai");
// const {ethers} = require("hardhat");
//
// describe("CAC", () => {
//     let tokenSupply = "100";
//     let token;
//     let cac;
//     let price = 100;
//     let owner;
//     let addr1;
//     let addr2;
//
//     before(async () => {
//         [owner, addr1, addr2] = await ethers.getSigners();
//         const Token= await ethers.getContractFactory("Token");
//         token = await Token.deploy(tokenSupply);
//
//         const CAC = await ethers.getContractFactory("CAC");
//         cac = await CAC.deploy(token.address, price);
//     });
//
//     describe("Sell", () => {
//         it("Should fail if contract is not approved", async () => {
//             await expect(cac.sell()).to.be.reverted;
//         });
//
//         it("Should allow CAC to transfer tokens", async () => {
//             await token.approve(cac.address, 100);
//         });
//
//         it("Should not allow non-owner to call sell()", async () => {
//             await expect(cac.connect(addr1).sell()).to.be.reverted;
//         });
//
//         it("Sell should transfer token from owner to contract", async () => {
//             await expect(cac.sell()).to.changeTokenBalances(token,[owner.address, cac.address], [-100, 100]);
//         });
//     });
//
//     describe("Getters", () => {
//
//     });
//
//     describe("Buy", () => {
//
//     });
//
//     describe("Withdraw Tokens", () => {
//
//     });
//
//     describe("Withdraw Funds", () => {
//
//     });
// });