---
slug: 2025-11-27-unified-liquidity
title: Preparing for Unified Liquidity
authors: [marc]
tags: [Announcement]
---

![Unified Liquidity](unified-liquidity.png)

In December, liquidity on Vesu will be unified. Native USDC is coming to Starknet and Vesu will support the transition from day one.

This moment is also used to unify liquidity on Vesu more broadly. Over time, Vesu grew to 18 different pools across V1 and V2, which made it harder to find the right market and spread liquidity across many smaller pools. Consolidating positions in V2 reduces this fragmentation and brings liquidity together in one place.

To make the upgrade easy, a migration tool will be available for a simple move.

## What you need to know

:::info TL;DR
- All USDC.e and V1 positions will move to native USDC and V2 pools
- Rewards on USDC.e stop once migration begins
- V1 pools will stay active but in a limited mode
- A simple 1-click migration flow will be available on Vesu
:::

The current bridged USDC will be renamed USDC.e and native USDC will take over the USDC ticker across Starknet apps and explorers. USDC.e positions should migrate early, as rewards on USDC.e will end and all new incentives will run on native USDC.

Once the migration begins, V1 pools will enter a limited mode. Opening new debt or increasing Multiply positions will no longer be possible. 

The migration tool will support both steps: moving from USDC.e to native USDC and shifting V1 positions into the newer V2 pools. Affected positions will be clearly marked in the app and can be moved easily.

## Benefits of Vesu V2

V2 pools have been live for over two months and run on improved smart contracts that have been [fully audited by Zenith, ChainSecurity and OpenZeppelin](https://docs.vesu.xyz/security/audits).

The updated architecture gives each pool its own contract, reducing complexity, improving gas efficiency and providing stronger risk isolation. With liquidity concentrated in these pools, the overall user experience becomes simpler, and all future improvements will build on this version.

## Benefits of native USDC

Native USDC is issued directly by Circle and comes with clear benefits:

- One unified, canonical USDC  
- Lower risk and fewer trust assumptions  
- Fully reserved and redeemable 1:1
- Faster, more reliable cross-chain transfers through CCTP
- Opens the door for institutional players on Starknet

It is the version exchanges, custodians and market makers prefer. 

## Next steps
There’s nothing you need to do right now. Just keep an eye on our socials. We’ll post the exact go-live announcement on [X](https://x.com/vesuxyz) and [Discord](https://discord.gg/G9Gxgujj8T) once everything is ready.

If you have any questions, now or during the migration, feel free to open a ticket in our [Discord](https://discord.gg/G9Gxgujj8T). We’re here to help.