---
id: pools
title: Explore Vesu pools
sidebar_label: Pools
sidebar_position: 2
---

Pools are the basic building block making Vesu a modular and secure lending infrastructure. Pools represent non-custodial, autonomous lending markets that offer secure over-collateralized lending & borrowing. Lenders supply assets that serve as liquidity. Borrowers deposit collateral assets in order to borrow other asset from the pool. Pool creation and management is permissionless, allowing professional curators to maintain secure and efficient lending markets.

We here present the unique concepts behind Vesu lending pools.

## Lending market structure

TODO: Overview of vesu lending market and actors

![Vesu vTokens](./images/markets.png)

## Modular lending pools

Vesu adopts a modular lending pool design that support a very flexible and convenient approach to configuring a variety of lending agreements based on the following concepts:

- Asset: is an ERC-20 compatible token that is enabled in a pool to serve as collateral, debt or both.
- Lending pair: is a uni-directional lending agreement designating a specific _collateral asset_ and _debt asset_ whereby a certain _loan-to-value ratio_, _liquidation bonus, and _debt cap_ is enforced.
- Lending pool: is a collection of various _lending pairs_, thereby enabling multiple collateral-debt asset relationships to work in tandem and with shared liquidity.

As an example, the diagram below exhibits an example lending pair that accepts ETH (Ether) as collateral asset and allows borrowing of USDC (USD Coin) at a maximal loan-to-value ratio of 80% (other parameters are not printed for simplicity).

![Vesu Lending Pair](./images/lending-pair.png)

Furthermore, the following diagram depicts a variety of lending pool configurations highlighting Vesu’s modular design.

![Vesu Lending Pools](./images/lending-pool.png)

- Pool A (upper left) demonstrates the most basic pool configuration with only a single lending pair allowing for the borrowing of USDC against WETH collateral at a maximal loan-to-value ratio of 80%.
- By adding the reverse lending pair, Pool B shows a bi-directional pool configuration where both collateral assets serve as both debt and collateral assets. Note that this configuration effectively reflects the traditional financial practice of rehypothecation in which collateral assets are re-used to increase capital efficiency. This practices introduces new risks within so-called collateral chains, leading to other protocols offering users the ability to preclude their collateral from being used as such. While Vesu lending pools do not offer this optionality to individual borrowers inherently, the concept of uni-directional lending pairs allows for more granular control over how collateral rehypothecation is enabled on the pool level (e.g. which collateral can be used to borrow a rehypothecated asset).
- Finally, Pool C shows yet another configuration which supports borrowing USDC with various collateral assets. Note that each lending pair defines a fixed, collateral specific maximal loan-to-value ratio which is critical for enabling both capital efficiency and liquidation safety.

## Positions

A user's collateral, or simple deposit, and debt are tracked with a _position_. Positions always only account for a specific pair of collateral and debt assets or, in other words, for a specific _lending pair_. As a result, users may maintain multiple positions in a pool, each associated with a different lending pair. This is different e.g. from Aave where a global (pool) account model is implemented resulting in there being only a single position tracked per pool. 

:::info
The reason for tracking positions per lending pair is to enable more granular risk parameters, that is per lending pair, and to significantly reduce the implementation complexity of the protocol.
:::

![Vesu Positions](./images/positions.png)

The diagram shows a User, Owner: 0x5trK, that owns three positions split across different lending pairs in Pool C, WETH → USDC, WBTC → USDC, STRK → USDC, and with an overall nominal debt outstanding of 3.5M USDC. Note that the positions in fact track _Supply Shares_ and _Nominal Debt_ which are explained in more detail in the following sections.

## Liquidity & risk

:::info
In Vesu V2, pools and user funds are separated into individual pool instances thus isolating risks by design.
:::

Assets supplied in a Vesu lending pool serve as __shared liquidity__ across all associated lending pairs, or collateral assets respectively, to allow for maximal capital efficiency. At the same time, this liquidity is not shared with other lending pools, thus isolating risks across pools. Hence, **liquidity and risks are shared** only among the lenders in a lending pool, not to those outside of it.

## Interest rates

Lending markets price the current demand for an asset in terms of its interest rate. Allowing supply and demand to efficiently discover the equilibrium rate is an important function of a lending market. Vesu lending markets are thus equipped with a dynamic, fully autonomous interest rate model (IRM) that does not require any governance interventions. 

![Vesu Interest Rate Model](./images/adaptive-irm.png)

As indicated in the diagram above, the Vesu IRM consists of a traditional _interest rate curve_ from which the interest rate is derived based on the market's current utilization. The rate moves instantaneously on this curve as the utilization changes. The second component is an autonomous curve controller which gradually adjusts the shape of the curve itself as utilization sustains higher or lower levels than its configured target utilization. Combined, these two components give the Vesu IRM a very robust and predictable behavior improving market conditions for both lenders and borrowers.

## Liquidations

Positions on the Vesu lending protocol have to be over-collateralized, meaning that at any point in time the value of the collateral has to exceed the value of the position's debt. In order to enforce this invariant and protect lenders from insolvent borrow positions, the protocol implements an open liquidation model. Positions are deemed insolvent if the value of the position debt compared to the value of the position collateral, or the position loan-to-value, exceeds the liquidation loan-to-value specified in the respective lending pair. 

Insolvent positions are then eligible to be liquidated by anyone willing to repay the position's debt in exchange for collateral assets priced at a certain discount. Thereby, in order to incentivize speedy liquidations, the protocol employs a __full liquidations__ model allowing the liquidator to repay a position's total debt balance outstanding to receive discounted collateral. 

![Vesu vTokens](./images/liquidation.png)

The diagram above demonstrates the effect of a liquidation on a borrower's position. The liquidator repays the total outstanding debt and receives the maximal amount of collateral possible, based on the price of the collateral and debt assets at the liquidation and the configured _liquidation bonus_.

## vTokens

Vesu _vTokens_ offer a conveninent way for lenders to supply and withdraw assets in an underlying Vesu pool. vTokens are simplified _Tokenized Vaults_, or yield strategies, that follow the ERC-4626 [interface](https://github.com/starknet-io/SNIPs/blob/main/SNIPS/snip-22.md) and hence are compatible with wallets, and all sorts of apps on Starknet.

![Vesu vTokens](./images/vToken.png)

For each asset and pool a corresponding vToken exists. Lenders simply supply assets in the Vesu pool by using the vToken's `deposit` function which mints a corresponding vault share token instead. As interest accumulates in the Vesu pool, the vault share token exchange rate increases allowing the lender to withdraw an increasing amount of underlying assets over time using the vToken's `withdraw` function.