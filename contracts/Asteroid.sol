// SPDX-License-Identifier: MIT
pragma solidity >=0.4.22 <0.9.0;

// import './SafeMath.sol';

contract Asteroid {
  // using SafeMath for uint;

  address public forge;
  string public _name = 'Asteroid Token';
  string public _symbol = 'ASTR';
  uint public _decimals = 0;
  uint public supply;
  uint[] balances;

  // creates table of accounts + balances
  mapping (address => uint) public accounts;
  // creates table of accounts + allowances(allowance *is* balance of account)
  mapping(address => mapping (address => uint)) allowed;



  struct Dino {
    string dinoName;
    address dinoAddress;
  }
  // mapping (address => Dino) dinos;
  Dino[] public dinos;
  // address[] public dinoAccounts;

  constructor() public {
    //this explains where each thing comes from, e.g. 
    forge = msg.sender;
    supply = 1000000;
  }

// function addDino(string memory _dinoName, address _dinoAddress) public returns(uint) {
//   Dino.dinoName = _dinoName;
//   Dino.dinoAddress = _dinoAddress;
//   return dinos.length;
// }


  // Minting -- Ryan's burning/distribution scheme commented out:
// function mint(address receiver, uint amount) public returns (bool) {
//   require(msg.sender == forge);
//   require(amount < balances[forge], "Insufficient assets for minting");
//   // uint burn = amount / 10;
//   // uint perCapita = amount / (balances.length -1);
//   // blances[forge] = balance - burn;
//   balances[receiver] += amount;
//   supply += amount;
//   // for (uint i = 1; i < balances.length; i++) {
//   //   balances[i] += perCapita;
//   // }
//   return true;
// }

//maybe take the {} part out from these first 3 and move them up to variable declarations?
//"Function state mutability can be restricted to pure function name() public view returns (string memory) {..."}
function name() public view returns (string memory) {
  return _name;
}

function symbol() public view returns (string memory) {
  return _symbol;
}

function decimals() public view returns (uint) {
  return _decimals;
}

function totalSupply() public view returns (uint) {
  return supply;
}

function balanceOf(address _owner) public view returns (uint balance) {
    uint index = accounts[_owner];
    return balances[index];
}

function transfer(address _to, uint _value) public returns (bool success) {
  require(_value < accounts[forge], "Insufficient assets for transfer");
  accounts[msg.sender] -= _value;
  accounts[_to] += _value;
  emit Transfer(msg.sender, _to, _value);
  return true;
}

function transferFrom(address _to, address _from, uint _value) public returns (bool success) {
  require(_value < accounts[_from], "Insufficient assets for transfer");
  accounts[msg.sender] -= _value;
  accounts[_to] += _value;
  emit Transfer(msg.sender, _to, _value);
  return true;
}


// function approve(address _spender, uint256 _value) public returns (bool success) {
//     return true;
// }


// function allowance(address _owner, address _spender) public view returns (uint256 remaining) {
//   return 0;
// }


event Transfer(address indexed _from, address indexed _to, uint _value);
// event Approval(address indexed _owner, address indexed _spender, uint256 _value);

}
  