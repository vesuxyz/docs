---
id: architecture
title: Vesu Protocol Architecture
sidebar_label: Architecture
sidebar_position: 1
---

The Vesu V2 protocol is built with a focus on simplicity and security. It consists of a few building blocks that aim at maximally isolate user funds, reduce the attack surface increase the overall confidence in the codebase. The architecture of the Vesu V2 protocol and its building blocks is outlined in the figure below.

![Vesu Architecture](../images/vesu-v2-architecture.png)

## Lending Pool

Lending pools are isolated in a separate instance of the `Pool` contract. This contract manages all state, user funds and interactions related to that specific pool. This way, in Vesu V2 user funds are isolated by design in separate `Pool` instances.

At the same time, the concept of lending pairs and positions remains exactly the same as in the Vesu V1 protocol. Thus, Vesu V2 pools remain as flexible as it gets when it comes to the configuration of different loan structures within a pool. Similarly, pool curators keep the granular level of control over risk exposures and parameters as known from Vesu V1.

## Oracle 

:::info
An official _Factory Oracle_ exists and is free to be used by all pools and curators. However, curators are free to use custom oracles too.
:::

The `Pool` computes the solvency of positions based on collateral and debt asset prices. It fetches these asset prices from an external, fully trusted, `Oracle`. A _Factory Oracle_ exists and maintains price feeds for all major assets. This _Factory Oracle_ uses Pragma price feeds and implements additional price validations which the `Pool` consumes to decide whether to trust a price or not. In case the `Pool` receives an untrusted price, it pauses all asset withdrawals.

## vToken

The `PoolFactory` deploys a `vToken` for each asset in a new pool. The `vToken` offers lenders a simplified UX for depositing funds into a pool and issues a share token in return. `vToken`s are stand-alone, ERC-4626 compatible vaults and work in isolation of the pool itself.

## Pool Factory

The `PoolFactory` allows curators to create new `Pool` instances through a simple interface, `create_pool`. Upon pool creation, the `PoolFactory` deploys a new `Pool` contract, initializes it with the provided asset and pair parameters and deploys the respective `vToken`s. Pool creation and curation remains a permissionless activity continuing Vesu's legacy of empowering fully open, global and secure lending markets on Starknet.

## Pauser Agent

A highlight introduced with the Vesu V2 protocol is the ability for curators to opt-in to having a lending pool being monitored by Hypernative's real-time threat detection and onchain actions infrastructure. This enables the respective pool's to be continuously monitored and temporarily paused in case of a potential threat, thereby serving as a crucial layer of protection for users and the Starknet ecosystem. 

## Upgradeability

For security purposes, the `Pool` and `Oracle` contracts are upgradeable with the permission to upgrade owned by the _Vesu Security Council_. This council is explained in more details in the [Security docs](/docs/security/security-council.md).
