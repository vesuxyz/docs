---
id: borrow
title: How to Borrow
sidebar_label: Borrow
sidebar_position: 3
---

This guide walks you through opening and closing an Borrow position.

## Opening a Position
Borrow assets on Vesu by using a collateral.

1. Open [vesu.xyz/borrow](https://vesu.xyz/borrow) to see available markets. Use the filters to select your collateral and borrow asset. You can also filter by curator, pool, or show only tokens in your wallet.  
Click on the market you want to borrow from or learn more about.

![borrow-1.png](images/borrow-1.png)

2. Check the details for the borrowing pair. Each page shows:  
   - **Supply APR & Borrow APY**: current supply and borrow rate
   - **Liquidity**: available liquiditiy to borrow
   - **Security and Oracles**: audits, bug bounty, monitoring, and price feeds  
   - **Liquidation**: max LTV before liquidation, liquidation bonus, and type (e.g., full liquidation)
   - **Collateral exposure**: assets your deposit can be borrowed against and their debt caps  
   - **Interest rate curve**: how rates change with utilization  
   - **Addresses**: contracts for pool, extension & asset

3. Enter the amounts for your collateral and borrow.
   Review the expected yield, costs, and liquidation price. Choose a loan-to-value you’re comfortable with.

4. Click **Borrow** and confirm in your wallet.

Once confirmed, your position appears in your overview with the borrowed amount and collateral balance.

## Closing a Position
To close a borrow position, you first need to have the borrowed asset in your wallet to repay the debt.

1. Go to your positions overview and select the one you want to close.  
2. Click **Close** and confirm in your wallet to repay your debt.  
3. Once confirmed, your collateral is released back to your wallet.