const TIMELOCK = artifacts.require("Lock");
const ethers = require('ethers');

function encodeParameters(types, values) {
    const abi = new ethers.utils.AbiCoder();
    return abi.encode(types, values);
}

function get_interval(hours) {
    return parseInt((new Date().getTime() + (60 * 60 * hours * 1000)) / 1000);
}

async function updateEmissionRate(cli, target, eta, run, TokensPerBlock) {
    let tx;
    const value = 0; // timelock
    const signature = 'updateEmissionRate(uint256)';
    const data = encodeParameters(['uint256'], [TokensPerBlock]);
    console.log('target', target);
    console.log('value', value);
    console.log('signature', signature);
    console.log('data', data);
    console.log('eta', eta); //

    if (run)
        tx = await cli.executeTransaction(target, value, signature, data, eta);
    else
        tx = await cli.queueTransaction(target, value, signature, data, eta);
    console.log('tx', tx.tx);
}

async function set(cli, target, eta, run, _pid, _point) {
    let tx;
    const value = 0;
    const pid = _pid;
    const point = _point;
    // set(uint256 _pid, uint256 _allocPoint, bool _withUpdate)
    const signature = 'set(uint256,uint256,bool)';
    const params = [pid, point, true];
    const data = encodeParameters(['uint256', 'uint256', 'bool'], params);
    console.log('target', target);
    console.log('value', value);
    console.log('signature', signature);
    console.log('data', data);
    console.log('eta', eta);
    console.log('params', params);
    console.log('run', run);

    if (run)
        tx = await cli.executeTransaction(target, value, signature, data, eta);
    else
        tx = await cli.queueTransaction(target, value, signature, data, eta);
    console.log('tx', tx.tx);
}

async function changeOwner(cli, target, to) {
    const value = 0;
    const signature = 'transferOwnership(address)';
    const data = encodeParameters(['address'], [to]);
    const eta = get_interval(25);
    //const eta = '1613880149';

    console.log('target', target);
    console.log('value', value);
    console.log('signature', signature);
    console.log('data', JSON.stringify(data));
    console.log('eta', eta);
    try {
        const tx = await cli.queueTransaction(target, value, signature, data, eta);
        //const tx = await cli.executeTransaction(target, value, signature, data, eta);
        console.log('tx', tx.tx);
    } catch (e) {
        console.log('ERR', e);
    }
}

module.exports = async function (deployer) {

    let TokensPerBlock = web3.utils.toWei('1');

    // new
    const master = '0x87cB13199c16E4B05aC2a26688d799dC24136c86';
    const timelock = '0xF5FCF1C7e489EFDBc33367630B1f77627b51EA79'; // new
    // const eta = get_interval(73);
    // return console.log( get_interval(25) );

    try {
        const cli = await TIMELOCK.at(timelock);
        // GLTO-BNB from 40x to 60x
        // await set(cli, master, 1616097549, true, 1, 6000);
        // GLTO-BUSD from 20x to 40x
        // await set(cli, master, 1616097549, true, 2, 4000);
        await updateEmissionRate(cli, master, 1616615173, true, TokensPerBlock);

    } catch (e) {
        console.log("[ERROR]", e.toString());
    }
    process.exit(0);
};

// add(uint256 _allocPoint, IBEP20 _lpToken, bool _withUpdate)
async function add(cli, target, eta, run, _allocPoint, _lpToken) {
    let tx;
    const value = 0;
    const signature = 'add(uint256,address,bool)';
    const args = [_allocPoint, _lpToken, false];
    const data = encodeParameters(['uint256', 'address', 'bool'], args);
    console.log('target', target);
    console.log('value', value);
    console.log('signature', signature);
    console.log('data', data);
    console.log('args', args);
    console.log('eta', eta);
    return;
    if (run)
        tx = await cli.executeTransaction(target, value, signature, data, eta);
    else
        tx = await cli.queueTransaction(target, value, signature, data, eta);
    console.log('tx', tx.tx);

}
