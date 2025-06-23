const nftABI = [
  {
    "inputs": [
      { "internalType": "string", "name": "initialBaseURI", "type": "string" },
      { "internalType": "string", "name": "initialHiddenUri", "type": "string" },
      { "internalType": "string", "name": "initialContractMetadataUri", "type": "string" }
    ],
    "stateMutability": "nonpayable",
    "type": "constructor"
  },
  {
    "inputs": [{ "internalType": "address", "name": "owner", "type": "address" }],
    "name": "balanceOf",
    "outputs": [{ "internalType": "uint256", "name": "", "type": "uint256" }],
    "stateMutability": "view",
    "type": "function"
  }
  // Solo incluimos lo necesario para balanceOf. Puedes incluir todo si deseas.
];

export default nftABI;
