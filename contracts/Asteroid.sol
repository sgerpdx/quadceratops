// SPDX-License-Identifier: MIT
pragma solidity >=0.4.22 <0.9.0;

import './SafeMath.sol';

Contract Asteroid {
  using SafeMath for uint;

  address public slacksmith;
  uint public supply;

  // creates table of accounts + balances
  mapping (address => uint) public balances;
  // creates table of accounts + allowances(allowance *is* balance of account)
  mapping(address => mapping (address => uint256)) allowed;



  struct Dino {
    string dinoName;
    address dinoAddress;
  }
  // mapping (address => Dino) dinos;
  // Dino[] public dinos;
  // address[] public dinoAccounts;

    constructor() public {
    //this explains where each thing comes from, e.g. 
    slacksmith = msg.sender;


    balances.push(0);
    supply = 1000000;
    balances.push(1000000);
    accounts[tx.origin] = 1;
  }

function addDino(string _dinoName, address _dinoAddress) public returns(uint) {
  dinos.length++;
  dinos[dinos.length-1].dinoName = _dinoName;
  dinos[dinos.length-1].dinoAddress = _dinoAddress;
  return dinos.length;
}


  // Minting -- Ryan's burning/distribution scheme commented out:
function mint(address receiver, uint amount) public returns (bool) {
  require(msg.sender == slacksmith);
  require(amount < balances[slacksmith], "Insufficient assets for minting");
  // uint burn = amount / 10;
  // uint perCapita = amount / (balances.length -1);
  // blances[slacksmith] = balance - burn;
  balances[receiver] += amount;
  supply += amount;
  // for (uint i = 1; i < balances.length; i++) {
  //   balances[i] += perCapita;
  // }
  return true;
}

function name() public view returns (string memory) {
    return 'Asteroid Token';
}
function symbol() public view returns (string memory) {
    return 'ASTR';
}
function decimals() public view returns (uint8) {
    return 0;
}
function totalSupply() public view returns (uint256) {
  return supply;
}

function balanceOf(address _owner) public view returns (uint256 balance) {
    uint index = accounts[_owner];
    return balances[index];
}

function transfer(address _to, uint256 _value) public returns (bool success) {
  require(_value < balances[slacksmith], "Insufficient assets for transfer");
  balances[msg.sender] -= _value;
  balances[_to] += _value;
  emit Transfer(msg.sender, _to, _value);
  return true;
}

function transferFrom(address _to, address _from, uint256 _value) public returns (bool success) {
  require(_value < balances[sender], "Insufficient assets for transfer");
  balances[msg.sender] -= _value;
  balances[_to] += _value;
  emit Transfer(msg.sender, _to, _value);
  return true;
}


function approve(address _spender, uint256 _value) public returns (bool success) {
    return true;
}


function allowance(address _owner, address _spender) public view returns (uint256 remaining) {
  return 0;
}


event Transfer(address indexed _from, address indexed _to, uint256 _value)
event Approval(address indexed _owner, address indexed _spender, uint256 _value)

}
  