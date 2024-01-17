To run the ethereum testnet server update the .env file with testnetwork URL and user private key

# To run test  
npx hardhat test

# to deploy to the test network
npx hardhat run scripts/deploy.js --network testnet/rinkeby

once connected successfuly deployed copy the abi and address to interact with the deployed contract to the client utils folder 
