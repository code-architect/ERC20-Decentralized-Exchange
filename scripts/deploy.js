const hre = require("hardhat");
const fs = require("fs/promises");

async function main() {

  // const Token = await hre.ethers.deployContract("BankAccount");
  // await Token.waitForDeployment();
  //
  // console.log(
  //     `deployed to ${Token.target}`
  // );
  // await writeDeploymentInfo(Token);
  const Token = await hre.ethers.getContractFactory('Token');
  const token = await Token.deploy("100");

  const CAC = await hre.ethers.getContractFactory('CAC');
  const cac = await CAC.deploy(token.getAddress(), "100");

  // console.log(
  //     `deployed to ${token.target}`
  //     `deployed to ${cac.target}`
  // );
  await writeDeploymentInfo(token, "token.json");
  await writeDeploymentInfo(cac, "cac.json");
}

async function writeDeploymentInfo(contract, filename="") {
  const data = {
    contract: {
      abi: contract.interface.format(),
    },
  };

  const content = JSON.stringify(data, null, 2);
  await fs.writeFile(filename, content, { encoding: "utf-8" });
}

// We recommend this pattern to be able to use async/await everywhere
// and properly handle errors.
main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});