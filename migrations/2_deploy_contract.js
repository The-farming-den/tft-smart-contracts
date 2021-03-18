// const TFTToken = artifacts.require("./TFTToken.sol")
// const TimeLock = artifacts.require("./TimeLock.sol")
// const MasterChef = artifacts.require("./MasterChef.sol")
const Lock = artifacts.require("./Lock.sol")

module.exports = async function (deployer, network, accounts) {
  /**
   * add the desired token to the next line
   * @example
   * deployer.deploy(TFTToken)
   */

  // const _depositFeeAddress = process.env.DEPOSIT_FEE_ADDR;
  // const _harvestFeeAddress = process.env.HARVEST_FEE_ADDR;
  // const _tftPerBlock = process.env.TFT_PER_BLOCK;
  // const _startBlock = process.env.START_BLOCK;

  // console.log('_depositFeeAddress: ', _depositFeeAddress);
  // console.log('_harvestFeeAddress: ', _harvestFeeAddress);
  // console.log('_tftPerBlock: ', _tftPerBlock);
  // console.log('_startBlock: ', _startBlock);

  // await deployer.deploy(TFTToken)

  // console.log('TFTToken Address: ', TFTToken.address);
  // await deployer.deploy(TimeLock, TFTToken.address)
  // await deployer.deploy(MasterChef, TFTToken.address, _depositFeeAddress, _harvestFeeAddress, _tftPerBlock, _startBlock)
  await deployer.deploy(Lock, process.env.DEPLOYER, 3 * 24 * 60 * 60);
}
