---
id: hooks-basics
title: Learn the basics of lending hooks
sidebar_label: Hooks Basics
sidebar_position: 2
slug: /dev-guides/hooks/hooks-basics
---

One of the unique features, that makes Vesu stand out, is the ability to customize/configure lending pool features using extensions.

Similar to Uniswap v4, Developers can create custom pool configurations controlling key aspects such as how the solvency of a position is determined, how oracles are implemented, how liquidations are handled etc, introducing totally new lending experiences.

These configurations can further be deployed on the fly by anyone when creating a new market.

### Architecture

Extensions in Vesu are unique programs containing different functionalities that can be invoked through hooks called from the Vesu lending protocol upon a user action.

In the next sections, let's explore some major extension hooks:

#### Interest Rate Accumulator Hook
This hook is usually called prior to every position change and is responsible for computing and collecting interest on all positions.

The general approach to collecting interest can be divided into:
1. Compute liquidity utilization of the respective asset.
2. Compute the interest rate as a function of liquidity utilization.
3. Accrue interest according to the interest rate by updating a (global) rate accumulator.

Based on this rate accumulator, Vesu then evaluates the gross debt outstanding at both the position and global levels.

By delegating the implementation of the interst rate model to a pool's extension, developers are able to further innovate and adopt state-of-the-art interest rate models for future lending pools.

#### Oracle Price Hook
This hook is called to fetch the current price of either a supply or debt asset in order to verify the solvency/insolvency of a positon.

The implementation of the oracle price feed is very vital when the immutable nature of Vesu lending pools is taken into account as failure to implement appropriate fail-safes can lead to dangerous outcomes such as user funds being stuck in a pool due to stale oracle price feeds, etc.

Putting these into consideration, Vesu is built to remain fully agnostic toward oracle implementations, delegating these to extensions, in order to embrace ground-breaking innovations and solutions from other developers.

It is worthy to note that the implementation of this extension goes a long way in altering a lending pool's risk profile.

#### Modify Position Hook
This hook is called with every position update and allows for execution of custom logic in the extension.

This allows for the introduction of new pool features such as:
1. Deposit tokenization
2. Pool pausing
3. P2P lender and borrower matching
4. Position rebalancing

and many more..

#### Liquidate Position Hook
This hook is called with the liquidation of an insolvent position. The extension would usually implement logic for computing and returning the liquidation amounts.

Vesu remains agnostic to the details of the liquidation strategy, giving room for implementations such as partial liquidations, dynamic liquidator incentives, etc.

Extensions opens a door of limitless possibilities for lending markets, and in the next section, we are going to take you through the process of building your first extension.