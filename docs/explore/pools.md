---
id: pools
title: Explore Vesu pools
sidebar_label: Pools
sidebar_position: 2
---

Pools are the core building block of Vesu’s modular lending infrastructure. They are non-custodial, autonomous markets for overcollateralized lending and borrowing. Lenders supply assets as liquidity. Borrowers deposit collateral to borrow other assets. Pool creation and management is permissionless. Curators can deploy and manage secure, use-case-specific lending markets.

This page introduces the core concepts behind Vesu pools.

## Lending market structure

Vesu’s modular architecture allows [curators](/docs/explore/curators.md) to create fully isolated lending pools. Each pool is configurable based on demand and can be tailored to different market needs and use cases.

![Vesu vTokens](./images/markets.png)

## Modular lending pools

Vesu’s pool design supports a wide range of lending configurations using three core concepts:

- **Asset**: An ERC-20 token used as collateral, debt, or both.
- **Lending pair**: A unidirectional agreement between a collateral and debt asset, with specific loan-to-value, liquidation bonus, and debt cap settings.
- **Lending pool**: A collection of lending pairs sharing liquidity, allowing multiple asset combinations within a single pool.

For example, a pool might let users borrow USDC against ETH collateral, with an 80% loan-to-value ratio.

![Vesu Lending Pair](./images/lending-pair.png)

The diagram below shows different pool configurations:

![Vesu Lending Pools](./images/lending-pool.png)

- **Pool A**: A single lending pair to borrow USDC against wETH.
- **Pool B**: Bi-directional pairs, allowing collateral to be reused across pairs. This introduces risk through rehypothecation.
- **Pool C**: Multiple collateral assets can be used to borrow USDC, each pair with its own maximum loan-to-value setting.

## Positions

Each lending pair tracks a separate __position__, which includes your deposit and any outstanding debt. Users can have multiple positions in a pool, each tied to a specific pair.

Unlike protocols like Aave, Vesu doesn’t use a global account model. This allows for more granular risk control and reduces protocol complexity.

:::info
Vesu tracks positions per lending pair to enable specific risk settings and significantly reduce the implementation complexity of the protocol.
:::

![Vesu Positions](./images/positions.png)

In the example above, the user holds three positions in Pool C with an overall nominal debt outstanding of 3.5M USDC. Note that the positions in fact track **Supply Shares** and **Nominal Debt** which are explained in more detail in the following sections.

## Liquidity & risk

:::info
In Vesu V2, each pool is a separate contract with its own funds and risk profile.
:::

Assets supplied to a pool are shared across its lending pairs, maximizing capital efficiency. Liquidity is not shared across pools, meaning risk is isolated per pool.

## Interest rates

Lending markets price demand using interest rates. Vesu’s interest rate model (IRM) adjusts automatically, with no governance.

![Vesu Interest Rate Model](./images/adaptive-irm.png)

The IRM has two components:
- An interest rate curve that adjusts instantly with utilization
- A curve controller that gradually shifts the curve based on sustained demand changes

This gives Vesu stable and predictable behavior for both lenders and borrowers.

## Liquidations

All positions must stay overcollateralized. Collateral value must always exceed debt. If a position exceeds the liquidation loan-to-value set by its pair, it becomes eligible for liquidation.

Anyone can repay the debt and receive the collateral at a discount. Vesu uses a full liquidation model: liquidators repay all debt in exchange for discounted collateral.

![Vesu vTokens](./images/liquidation.png)

The example shows a liquidator repaying the full debt and receiving the max eligible collateral based on prices and the configured bonus.

## vTokens

__vTokens__ are ERC-4626 compatible vault tokens that represent your share in a Vesu pool. They simplify supply and withdrawal.

![Vesu vTokens](./images/vToken.png)

Each asset in each pool has its own vToken. Supplying mints vTokens; withdrawing burns them. As interest accrues, the vToken exchange rate increases, letting you withdraw more over time.

Read more in the [SNIP-22 spec](https://github.com/starknet-io/SNIPs/blob/main/SNIPS/snip-22.md).
