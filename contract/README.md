To run the ethereum testnet server update the .env file with testnetwork URL and user private key

# To run test  
npx hardhat test

# to deploy to the test network
npx hardhat run scripts/deploy.js -—network sepolia

once deployed successfuly copy the ABI (Application Binary Interface) file into client utils folder 
