// import web3 library
import Web3 from 'web3';
import { ethers } from 'ethers';
const web3 = new Web3("https://sphinx.shardeum.org/");

// create web3 instance using injected provider
let web3js;
let selectedAddress;

// define SudokuSolver contract address and ABI
const contractAddress = "0xcc2bDFAA45FD5fe6021117F198491134C3F75aE9";
const contractABI = [
	{
		"inputs": [],
		"name": "computeBruteForceWin",
		"outputs": [],
		"stateMutability": "nonpayable",
		"type": "function"
	},
	{
		"inputs": [],
		"stateMutability": "nonpayable",
		"type": "constructor"
	},
	{
		"inputs": [
			{
				"internalType": "uint256",
				"name": "",
				"type": "uint256"
			},
			{
				"internalType": "uint256",
				"name": "",
				"type": "uint256"
			}
		],
		"name": "currentBoard",
		"outputs": [
			{
				"internalType": "uint8",
				"name": "",
				"type": "uint8"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "address",
				"name": "",
				"type": "address"
			}
		],
		"name": "didThePlayerWin",
		"outputs": [
			{
				"internalType": "bool",
				"name": "",
				"type": "bool"
			}
		],
		"stateMutability": "view",
		"type": "function"
	}
];

// create contract instance
const contract = new web3.eth.Contract(contractABI, contractAddress);

// function to connect wallet
async function connectWallet() {
  // modern dapp browsers
  if (window.ethereum) {
    try {
      await window.ethereum.request({ method: 'eth_requestAccounts' });
      web3js = new Web3(window.ethereum);
      selectedAddress = await getSelectedAddress();
      console.log("Wallet connected: ", selectedAddress);
    } catch (error) {
      console.error(error);
    }
  }
  // legacy dapp browsers
  else if (window.web3) {
    web3js = new Web3(web3.currentProvider);
    selectedAddress = await getSelectedAddress();
    console.log("Wallet connected: ", selectedAddress);
  }
  // non-dapp browsers
  else {
    alert('Please install a wallet extension to connect to Ethereum');
  }
}

// function to get selected account address
async function getSelectedAddress() {
  // get selected account address
  const accounts = await web3js.eth.getAccounts();
  return accounts[0];
}

// function to call computeBruteForceWin() function on contract
async function computeBruteForceWin() {
  // call computeBruteForceWin() function on contract with selected address
  await contract.methods.computeBruteForceWin().send({ from: selectedAddress });
}
// function to check if player has won
async function didThePlayerWin() {
    const selectedAddress = await getSelectedAddress();
  
    // check if player has won using didThePlayerWin() mapping on contract
    const result = await contract.methods.didThePlayerWin(selectedAddress).call();
  
    if (result) {
      console.log("Congratulations! You won.");
    } else {
      console.log("Sorry, you did not win.");
    }
  }
  
  // function to connect wallet
  async function connectWallet() {
    // request access to user's accounts
    await window.ethereum.enable();
  
    // update UI to show connected address
    const selectedAddress = await getSelectedAddress();
    document.getElementById("connected-address").textContent = selectedAddress;
  }
  
  // add event listeners to buttons
  document.getElementById("compute-button").addEventListener("click", computeBruteForceWin);
  document.getElementById("win-check-button").addEventListener("click", didThePlayerWin);
  document.getElementById("connect-wallet-button").addEventListener("click", connectWallet);
  
