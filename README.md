# React Truffle Box

This box comes with everything you need to start using Truffle to write, compile, test, and deploy smart contracts, and interact with them from a React app.

## Installation

First ensure you are in an empty directory.

Run the `unbox` command using 1 of 2 ways.

```sh
# Install Truffle globally and run `truffle unbox`
$ npm install -g truffle
$ truffle unbox react
```

```sh
# Alternatively, run `truffle unbox` via npx
$ npx truffle unbox react
```

Start the react dev server.

```sh
$ cd client
$ npm start
  Starting the development server...
```

From there, follow the instructions on the hosted React app. It will walk you through using Truffle and Ganache to deploy the `SimpleStorage` contract, making calls to it, and sending transactions to change the contract's state.

## FAQ

- __How do I use this with Ganache (or any other network)?__

  The Truffle project is set to deploy to Ganache by default. If you'd like to change this, it's as easy as modifying the Truffle config file! Check out [our documentation on adding network configurations](https://trufflesuite.com/docs/truffle/reference/configuration/#networks). From there, you can run `truffle migrate` pointed to another network, restart the React dev server, and see the change take place.

- __Where can I find more resources?__

  This Box is a sweet combo of [Truffle](https://trufflesuite.com) and [Create React App](https://create-react-app.dev). Either one would be a great place to start!


- __Notes__

Commands:

  Contracts: Compile:         cd truffle && truffle compile
  Contracts: Test:            cd truffle && truffle test
  Contracts: Migrate:         cd truffle && truffle migrate
  Dapp: Run dev server:       cd client && npm start
  Dapp: Test:                 cd client && npm test
  Dapp: Build for production: cd client && npm run build


For testing, it's important to test on a local ganach network with gasprice 0
```
reset; truffle test --network development
truffle run contract-size
truffle migrate --network goerli
```


The contract is on Goerli under the following address:
0x5EB5AFf80B9e9119E12FFB5f847758a99D1caC18


2_deploy_star_notary.js
=======================

   Deploying 'StarNotary'
   ----------------------
   > transaction hash:    0x743d2d337dc91d7eee7c3f91e8e00dc686c30bcb9312b694dc2dc77171d980a5
   > Blocks: 1            Seconds: 13
   > contract address:    0x5EB5AFf80B9e9119E12FFB5f847758a99D1caC18
   > block number:        7843184
   > block timestamp:     1666871688
   > account:             0x9D01ED9408137AaE96fc0969A01401732A249EBb
   > balance:             0.660998695868355202
   > gas used:            2549034 (0x26e52a)
   > gas price:           136.096352436 gwei
   > value sent:          0 ETH
   > total cost:          0.346914229635346824 ETH

   Pausing for 2 confirmations...

   -------------------------------
   > confirmation number: 1 (block: 7843185)
   > confirmation number: 2 (block: 7843186)
   > Saving artifacts
   -------------------------------------
   > Total cost:     0.346914229635346824 ETH