var LastWillFactory = artifacts.require("LastWillFactory");
var LastWill = artifacts.require("LastWill");

module.exports = async function(deployer) {
  // Deploy contracts.
  await deployer.deploy(LastWillFactory);

};