const TFTToken = artifacts.require("./TFTToken.sol")
const MasterChef = artifacts.require("./MasterChef.sol")

module.exports = async function (deployer, network, accounts) {
  /**
   * add the desired token to the next line
   * @example
   * deployer.deploy(TFTToken)
   */

  const _devaddr = process.env.DEV_ADDR;
  const _depositFeeAddress = process.env.DEPOSIT_FEE_ADDR;
  const _harvestFeeAddress = process.env.HARVEST_FEE_ADDR;
  const _tftPerBlock = process.env.TFT_PER_BLOCK;
  const _startBlock = process.env.START_BLOCK;

  console.log('_devaddr: ', _devaddr);
  console.log('_depositFeeAddress: ', _depositFeeAddress);
  console.log('_harvestFeeAddress: ', _harvestFeeAddress);
  console.log('_tftPerBlock: ', _tftPerBlock);
  console.log('_startBlock: ', _startBlock);

  deployer.deploy(TFTToken).then(function () {
    return deployer.deploy(MasterChef, TFTToken.address, _devaddr, _depositFeeAddress, _harvestFeeAddress, _tftPerBlock, _startBlock)
  })
}
