require('dotenv').config()
const HDWalletProvider = require('truffle-hdwallet-provider')
const abbrv = (str) => `${str.substr(0, 4)}...`

if (!process.env.PRIVATE_KEY) {
  throw new Error('define PRIVATE_KEY in .env first!')
} else {
  console.log('Using env var PRIVATE_KEY', abbrv(process.env.PRIVATE_KEY))
}
if (process.env.BSCSCAN_APIKEY) {
  console.log('Using env var process.env.BSCSCAN_APIKEY', abbrv(process.env.BSCSCAN_APIKEY))
}

module.exports = {
  plugins: ['truffle-plugin-verify'],
  api_keys: {
    bscscan: process.env.BSCSCAN_APIKEY,
  },
  networks: {
    development: {
      host: 'localhost',
      port: 8545,
      network_id: '*',
    },
    testnet: {
      provider: () => new HDWalletProvider(process.env.PRIVATE_KEY, `https://data-seed-prebsc-1-s1.binance.org:8545`),
      network_id: 97,
      confirmations: 10,
      timeoutBlocks: 200,
      skipDryRun: true
    },
    bsc: {
      provider: () => new HDWalletProvider(process.env.PRIVATE_KEY, `https://bsc-dataseed1.binance.org`),
      network_id: 56,
      confirmations: 10,
      timeoutBlocks: 200,
      skipDryRun: true
    },
  },
  // Set default mocha options here, use special reporters etc.
  mocha: {},
  compilers: {
    solc: {
      version: "0.6.12",    // Fetch exact version from solc-bin (default: truffle's version)
      // docker: true,        // Use "0.5.1" you've installed locally with docker (default: false)
      settings: {          // See the solidity docs for advice about optimization and evmVersion
        optimizer: {
          enabled: false,
          runs: 200
        },
      }
    },
  },
}
