---
id: curator-onboarding
title: Pool Curator Onboarding
sidebar_label: Onboarding
sidebar_position: 1
slug: /curators/onboarding
---


Vesu allows third-party _Pool Curators_ to create and manage new lending pools. This guide builds the starting point for new Pool Curators and contains all information needed for a smooth onboarding experience.

## Basics

Pool Curators have the ability to create and manage isolated lending pools in a permissionless manner. These lending pools can be configured with:

- An arbitrary combinations of borrow and collateral assets
- Collateral rehypothecation or strict isolation
- A state-of-the-art adaptive interest rate model
- Support for different price oracles

Depending on the use case, pools can be configured as fully immutable, or their risk parameters can be actively managed by curators.

:::info
Read more on the technical concepts in the Vesu [whitepaper](../explore/whitepaper) and developer [guides](../dev-guides/architecture).
:::

## Why create a Vesu pool

The growing Starknet ecosystem offers cutting edge DeFi protocols including DEXs, lending markets, derivatives and aggregators. This opens vast opportunities for new DeFi strategies. As the only open and neutral lending protocol on Starknet, Vesu offers a great basis to build any lending market and unlock new DeFi products and strategies such as:

- New lending markets for assets which cannot yet be borrowed and used as collateral to borrow.
- More efficient lending markets e.g. through an active risk curation strategy.
- Innovation of new lending markets and features (e.g. new liquidation mechanism, new oracles, etc.).

## Getting started

Carefully read the following points before creating a new lending pool:

- Make sure you understand how Vesu lending pools work, read the [whitepaper](../explore/whitepaper) and reach out on the Vesu [Discord](https://discord.gg/G9Gxgujj8T) if you have a question.
- Gauge demand from LPs and borrowers for the new pool, if your pool fails to attract liquidity, borrowing will not be possible and LPs will not earn interest.
- Ensure the existing pool extensions support the desired assets and that an oracle price feed exists.
- Carefully draft the pool's risk parameters to align with the target audience's risk-reward expectations.
- If you intend to have the new pool listed on Vesu, make sure you understand the pool listing [process](./listing).

## How to create a Vesu pool

Follow the [_Create Pool Guide_](../user-guides/create-pool-guide) and [_Update Pool Guide_](../user-guides/manage-pool-guide) in order to learn how to creating and managing Vesu lending pools.

## What else to consider

:::info
When creating a new pool, each market has to be seeded with a minimal amount of assets (2000 wei to be specific). This amount is locked permanently in order to mitigate a well-known _share inflation_ attack.
:::

:::info
Note that pools with custom extensions can also be created by crafting the respective transaction manually or through a block explorer.
:::

## Q&A

### Which Oracles can I use to create a pool?

Currently, the pools page only supports new pools with Pragma or Chainlink oracle feeds.

### Should I keep or revoke pool ownership?

Indeed, Vesu pools can be configured with an owner who can change the configuration of a pool. There are good reasons for both, revoking or keeping that privilege. E.g. active pool management allows the curator to adapt the configuration to changing market conditions and thus makes the pool more attractive across different market regimes. On the other hand, immutable pools, i.e. a pool for which no owner is configured, offer both LPs and borrowers much more predictability and remove the human element as an additional source of risk. Thus, the decision to revoke or keep pool ownership ultimately depends on the use case and target users.

### Does Vesu take protocol fees?

No. There is no fee mechanism that would allow Vesu, the Vesu team or anyone associated with the Vesu team to take a protocol fee. Fees are defined on each pool individually by the Pool Curator and exclusively claimable by the Pool Curator.

### Do I have to use Vesu’s Pools page to curate pools?

No. Technically speaking, new pools can be created by interacting with the Vesu protocol directly, either by integrating the protocol with your own smart contract or through a public block explorer like [Voyager](https://voyager.online). However, this requires good engineering and Cairo skills. The Vesu Pools page is a more convenient way to curate Vesu pools.