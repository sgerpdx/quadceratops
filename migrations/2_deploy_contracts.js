const Asteroid = artifacts.require("Asteroid");
//const SafeMath = artifacts.require("SafeMath");

module.exports = function (deployer) {
  //deployer.deploy(SafeMath);

  //deployer.link(SafeMath, Asteroid);
  deployer.deploy(Asteroid, 1000000);
};
