const TFTToken = artifacts.require("./TFTToken.sol")
const MasterChef = artifacts.require("./MasterChef.sol")

module.exports = async function (deployer, network, accounts) {
  /**
   * add the desired token to the next line
   * @example
   * deployer.deploy(TFTToken)
   */

  const _devaddr = process.env.DEV_ADDR;
  const _feeAddress = process.env.FEE_ADDR;
  const _tftPerBlock = process.env.TFT_PER_BLOCK;
  const _startBlock = process.env.START_BLOCK;

  console.log('_devaddr: ', _devaddr);
  console.log('_feeAddress: ', _feeAddress);
  console.log('_tftPerBlock: ', _tftPerBlock);
  console.log('_startBlock: ', _startBlock);

  deployer.deploy(TFTToken).then(function () {
    return deployer.deploy(MasterChef, TFTToken.address, _devaddr, _feeAddress, _tftPerBlock, _startBlock)
  })
}
