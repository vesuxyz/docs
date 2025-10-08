---
id: rewards
title: Rewards on Vesu
sidebar_label: Rewards
sidebar_position: 5
---

Vesu users can currently earn STRK rewards through two active ecosystem programs by the Starknet Foundation: [BTCFi Season](#btcfi-season) and [DeFi Spring](#defi-spring). Each program has its own goals, focus assets, and reward structure.


## BTCFi Season

The Starknet Foundation allocated 100 million STRK to bootstrap the BTCFi ecosystem.  
Unlike past programs that focused on static TVL, BTCFi Season rewards **active BTC usage**, especially **borrowing stablecoins against BTC collateral**.

Vesu plays a central role as the main money market where users can supply Bitcoin and borrow stablecoins directly on Starknet. The goal is to bootstrap real BTC utility, allowing Bitcoin holders to use their assets productively while staying in full self-custody.

### Eligible Markets

**BTC Collateral:**
- WBTC  
- LBTC  
- SolvBTC  
- tBTC  
- uniBTC (soon)  
- YBTC.B (soon)  

**Borrowable Stablecoins:**
- USDC  
- USDT  
- CASH  

:::note
To qualify for BTCFi rewards, stablecoins must be **borrowed against eligible BTC collateral**.
:::


Rewards are distributed by the Starknet Foundation to participating protocols based on activity.  
Vesu does not manage or guarantee the distribution schedule or amounts.

For more information, visit the official [BTCFi Season website](https://btcfiseason.starknet.org/).

## DeFi Spring

The Starknet Foundation allocates STRK rewards to participating protocols, such as Vesu, based on a set of activity metrics. These metrics determine the weekly distribution of STRK tokens to each protocol. For more information, visit the official [DeFi Spring](https://defispring.starknet.io/about) page.

### How is my STRK allocation determined?

Your allocation of STRK tokens depends on two factors:

1. The total amount of STRK distributed to Vesu is based on a set of metrics that are defined and monitored by the Starknet Foundation.
2. Your share is determined by the value of your deposited assets relative to the total value locked (TVL) across all participants in eligible markets over a given period.

:::tip
You can track your total interest earnings (across all markets) on the [Vesu Leaderboard](./leaderboard.md).
:::

### Eligible Markets

The following markets are eligible for DeFi Spring rewards:

- STRK
- xSTRK
- wstETH
- ETH
- USDC
- USDT

:::note
According to the Starknet Foundation’s criteria, only non-recursive deposits of stablecoins (USDC/USDT) are eligible for DeFi Spring rewards. For example, if you deposit USDC and borrow USDT, you’ll still earn the organic Supply APY on your USDC, but you won’t receive any extra STRK rewards due to the USDT debt.
:::

## Claiming Rewards
The Starknet Foundation distributes STRK rewards weekly to participating protocols.  
Once distributed, users can claim their earned share directly on Starknet via a permissionless contract.

:::tip
Learn more about claiming rewards in this [guide](../user-guides/claim-rewards.md).
:::

