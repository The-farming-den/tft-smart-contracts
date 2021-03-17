// SPDX-License-Identifier: MIT

pragma solidity 0.6.12;

import './TFTToken.sol';
import '@openzeppelin/contracts/math/SafeMath.sol';
import '@openzeppelin/contracts/access/Ownable.sol';

contract TimeLock is Ownable {
    using SafeMath for uint256;

    // Constants
    uint256 public constant LOCK_PERIOD = 15 days;
    uint256 public constant VESTING_PERIOD = 60 days;

    // Variables

    uint256 public lastUnlockTime;
    uint256 public initialLockedAmount;
    uint256 public lockStartTime;
    bool public locked = false;
    uint256 public totalUnlocked = 0;

    TFTToken public token;

    // Events
    event LockToken(uint256 amount, uint256 snapshot);

    // Constructor

    constructor(TFTToken _token) public {
        token = _token;
    }

    // View Functions

    function availableForClaim() public view returns (uint256) {
        if (locked == false) return 0;
        if ((now - lockStartTime) < LOCK_PERIOD) return 0;
        uint256 past = now - lastUnlockTime;
        uint256 lockBalance = token.balanceOf(address(this));
        uint256 tokensWant = initialLockedAmount.mul(past).div(VESTING_PERIOD);
        uint256 pending = lockBalance > tokensWant ? tokensWant : lockBalance;
        return pending;
    }

    function balance() public view returns (uint256) {
        return token.balanceOf(address(this));
    }

    // Methods

    function setToken(address tokenAddress) external onlyOwner {
        require(tokenAddress != address(0), 'TeamLock: token address can not be 0');
        token = TFTToken(tokenAddress);
    }

    function lock() external onlyOwner {
        require(locked == false, 'TeamLock: already locked');

        uint256 currentBalance = token.balanceOf(address(this));
        require(currentBalance > 0, 'TeamLock: no tokens to lock');

        lockStartTime = now;
        lastUnlockTime = now + LOCK_PERIOD; // set as default
        initialLockedAmount = currentBalance;
        locked = true;

        emit LockToken(initialLockedAmount, now);
    }

    function claim(address to) external onlyOwner {
        require(locked == true, 'TeamLock: not yet locked');
        require(to != address(0), 'TeamLock: to address can not be 0');
        require((now - lockStartTime) >= LOCK_PERIOD, 'TeamLock: it is still locked. you can not claim anything');

        uint256 past = now - lastUnlockTime;
        uint256 lockBalance = token.balanceOf(address(this));
        require(lockBalance > 0, 'TeamLock: no tokens left for unlock');

        uint256 tokensWant = initialLockedAmount.mul(past).div(VESTING_PERIOD);
        uint256 tokensToUnlock = lockBalance > tokensWant ? tokensWant : lockBalance;
        require(tokensToUnlock > 0, 'TeamLock: no tokens left for unlock');

        lastUnlockTime = now;
        totalUnlocked = totalUnlocked.add(tokensToUnlock);
        token.transfer(to, tokensToUnlock);
    }
}
