const { ethers } = require("ethers");

async function main() {
  // Read the contract ABI from the JSON file
  const contractABI = require("./NFTCollection.json");

  // Replace <contract_address> with the actual contract address
  const contractAddress = "0x5FbDB2315678afecb367f032d93F642f64180aa3";

  // Replace <recipient_address> with the address you want to transfer the NFTs to
  const fxPortalBridgeAddress  = "0x8626f6940E2eb28930eFb4CeF49B2d1F2C9C1199";

  // Replace <private_key> with your private key
  const privateKey = "0xac0974bec39a17e36ba4a6b4d238ff944bacb478cbed5efcae784d7bf4f2ff80";

  // Replace <rpc_provider> with your RPC provider URL
  const rpcProvider = "http://127.0.0.1:8545";

  // Connect to the Ethereum provider
  const provider = new ethers.providers.JsonRpcProvider(rpcProvider);

  // Create a signer instance using the private key
  const signer = new ethers.Wallet(privateKey, provider);

  // Create a contract instance
  const contract = new ethers.Contract(contractAddress, contractABI, signer);

  // Transfer all minted NFTs to the recipient address
  await contract.transferAll(fxPortalBridgeAddress );

  console.log("Batch transfer complete!");
}

main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
});
