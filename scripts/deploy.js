
const hre = require("hardhat");
const fs = require("fs/promises");

async function main() {

  const Token = await hre.ethers.getContractFactory('Token');
  // const Token = await hre.ethers.deployContract('Token');
  const token = await Token.deploy("100");

  const CAC = await hre.ethers.getContractFactory('CAC');
  // const CAC = await hre.ethers.deployContract('CAC');
  const cac = await CAC.deploy(token.getAddress(), "100");

  
  console.log("Token deployment address:", token.target); 
  console.log("CAC deployment address:", cac.target); 

  await token.waitForDeployment();
  await cac.waitForDeployment();
    
  await writeDeploymentInfo(token, "token.json");
  await writeDeploymentInfo(cac, "cac.json");
}

async function writeDeploymentInfo(contract, filename="") {
  const data = {
    network: hre.network.name,
    contract: {
      address: contract.target,
      // signerAddress: contract.signer.target,
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