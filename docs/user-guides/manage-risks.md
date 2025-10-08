---
id: manage-risks
title: Understand and manage risks of Vesu 
sidebar_label: Manage Risks
sidebar_position: 9
---

Using Vesu comes with opportunities and risks. This page gives an overview of the most important risk factors when earning, borrowing, or multiplying.

:::info
This guide is for informational purposes only and does not contain financial advice. Always assess your own risk tolerance and be prepared for market volatility.
:::

## General Risks

These risks exist on every decentralized lending platform, and Vesu is no exception.  

- **Smart contract risk**: Bugs or vulnerabilities could be exploited. Mitigated through multiple audits, a bug bounty, and onchain monitoring, but never fully eliminated.  
- **Oracle risk**: Oracles might fail, be stale, or manipulated. Pools on Vesu use Pragma price feeds, which have been reliable since Starknet’s launch.  
- **Collateral risk**: Your deposit may be borrowed against assets that depeg, fail, or are exploited. Always check which collateral a pool allows.  
- **Curator risk**: Pool curators can adjust parameters. On Vesu, all curators are screened experts and well-known teams (e.g. Vesu, Re7 Labs, Alterscope, Braavos). The risk is limited but still exists.  
- **Curator risk**: Each pool is managed by an independent curator who sets parameters such as collateral factors or interest rate models. Always review the curator information and pool setup to ensure it matches your own risk tolerance.
- **Accessibility risk**: If the Vesu frontend is unavailable, funds remain safe. For these cases, a minimal fallback frontend is available: [lite.vesu.xyz](https://lite.vesu.xyz).  


## Borrow & Multiply Risks

Borrowing on Vesu, or using Multiply (which automates borrowing and swapping back into your collateral), comes with the same core risks. The main things to keep in mind are:

- Market utilization affects rates. High utilization can push borrow costs up. 
- Loan-to-Value (LTV) and liquidation price must be monitored closely, especially with volatile assets.  

When you borrow or multiply, your risk depends on the mix of collateral and debt.  

Here are the main strategies, what they mean, and the risks that go with them:

**Stable collateral, volatile debt**  
Example: deposit USDC, borrow ETH.  
Effectively short ETH. If ETH rises, repaying becomes more expensive, your LTV increases, and liquidation risk grows.  

**Volatile collateral, stable debt**  
Example: deposit ETH, borrow USDC.  
Effectively long ETH. If ETH falls, collateral value drops, LTV rises, and liquidation risk increases.  

**Volatile collateral and volatile debt**  
Example: deposit ETH, borrow wBTC.  
You’re exposed to both assets. If their prices move differently, your position can shift quickly, increasing or reducing risk depending on the direction. Close monitoring is required. 

**Correlated collateral and debt**  
Example: ETH/wstETH.  
Typically more stable since both assets are expected move together. Risks appear if correlation weakens or if borrowing costs exceed the yield on your supplied asset.