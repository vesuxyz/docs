---
id: manage-risks
title: Understand and manage risks of Vesu 
sidebar_label: Manage Risks
sidebar_position: 9
---

Using Vesu comes with opportunities and risks.  
This page gives an overview of the most important risk factors when earning, borrowing, or multiplying.

:::info
This guide is for informational purposes only and does not contain financial advice. Always assess your own risk tolerance and be prepared for market volatility.
:::

## General Risks

These risks exist on every decentralized lending platform, and Vesu is no exception.  

- **Smart contract risk**: Bugs or vulnerabilities could be exploited. Mitigated through multiple audits, a bug bounty, and on-chain monitoring, but never fully eliminated.  
- **Oracle risk**: Oracles might fail, be stale, or manipulated. Pools on Vesu use Pragma price feeds, which have been reliable since Starknet’s launch.  
- **Collateral risk**: Your deposit may be borrowed against assets that depeg, fail, or are exploited. Always check which collateral a pool allows.  
- **Curator risk**: Pool curators can adjust parameters. On Vesu, all curators are screened experts and well-known teams (e.g. Vesu, Re7 Labs, Alterscope, Braavos). The risk is limited but still exists.  
- **Accessibility risk**: If the Vesu frontend is unavailable, funds remain safe. For these cases, a minimal fallback frontend is also available: [lite.vesu.xyz](https://lite.vesu.xyz).  


## Borrow & Multiply Risks

Borrowing on Vesu, or using Multiply (which automates borrowing and swapping back into your collateral), comes with the same core risks. The main things to keep in mind are:

- **Market utilization** affects rates. High utilization can push borrow costs up, while supply returns improve.  
- **Loan-to-Value (LTV) and liquidation price** must be monitored closely, especially with volatile assets like ETH or wBTC.  

When you borrow (or use Multiply), your risk depends on the mix of collateral and debt.  
Here are the main strategies, what they mean, and the risks that go with them:

**Stable collateral, volatile debt**  
Example: deposit USDC, borrow ETH.  
Effectively short ETH. If ETH rises, repaying becomes more expensive, your LTV increases, and liquidation risk grows.  

**Volatile collateral, stable debt**  
Example: deposit ETH, borrow USDC.  
Effectively long ETH. If ETH falls, collateral value drops, LTV rises, and liquidation risk increases.  

**Volatile collateral and volatile debt**  
Example: deposit ETH, borrow wBTC.  
Exposed to two moving assets. If they diverge in price, debt may outpace collateral, raising liquidation risk.  

**Correlated collateral and debt**  
Examples: ETH/wstETH.  
Safer if correlation holds, but risk appears if the peg breaks or if borrow APR rises above supply APY.  