var CrowdFunding = artifacts.require("CrowdFunding");
var CustomToken = artifacts.require("CustomToken");
var LastWillFactory = artifacts.require("LastWillFactory");

module.exports = async function(deployer) {
  // Deploy contracts.
  await deployer.deploy(LastWillFactory);
};