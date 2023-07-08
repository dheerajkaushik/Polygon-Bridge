const { ethers } = require("ethers");
const fs = require("fs");

async function main() {
  // Read the contract ABI from the JSON file
  const contractABI = require("./NFTCollection.json");

  // Replace <contract_address> with the actual contract address
  const contractAddress = "0x5FbDB2315678afecb367f032d93F642f64180aa3";

  // Specify the private key of the signer
  const privateKey = "0xac0974bec39a17e36ba4a6b4d238ff944bacb478cbed5efcae784d7bf4f2ff80";

  // Connect to the Ethereum provider
  const provider = new ethers.providers.JsonRpcProvider("http://127.0.0.1:8545");

  // Create a signer instance using the private key
  const signer = new ethers.Wallet(privateKey, provider);

  // Create a contract instance
  const contract = new ethers.Contract(contractAddress, contractABI, signer);

  // Read the IPFS URLs for the NFT images from a file
  const ipfsUrls = fs.readFileSync("ipfs_urls.txt", "utf-8").split("\n");

  // Mint NFTs with the IPFS URLs
  for (let i = 0; i < ipfsUrls.length; i++) {
    await contract.mint(ipfsUrls[i]);
  }

  console.log("Batch minting complete!");
}

main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
});
