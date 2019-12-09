var CrowdFunding = artifacts.require("CrowdFunding");
var CustomToken = artifacts.require("CustomToken");

module.exports = async function(deployer) {
  // Deploy contracts.
  await deployer.deploy(CustomToken, "Custom token", "CTK", 0, 1000);
  await deployer.deploy(CrowdFunding, 1000, 2, 1, CustomToken.address);

  // Send initial amount of custom tokens to the contract.
  let ctdeployed = await CustomToken.deployed();
  await ctdeployed.transfer(CrowdFunding.address, 1000);
};