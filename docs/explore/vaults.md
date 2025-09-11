---
id: vaults
title: Explore Vesu Vaults
sidebar_label: Vaults
sidebar_position: 4
---

Vaults on Vesu are programmable yield strategies: automated, trust-minimized, and open to anyone. Curators can design and launch custom vaults that interact with Vesu lending markets and other DeFi protocols on Starknet.

## Core features

Vesu Vaults are designed to be secure, flexible, and composable. Each vault follows a clearly defined structure:

- Launched and managed by professional third-party curators
- Deposits are instant and non-custodial
- Withdrawals follow a strategy-specific delay, allowing the vault to optimize capital efficiency while maintaining a liquidity buffer
- Enforced onchain **strategy mandate** ensures funds are only used as defined  
- A vault’s **Assets under Management (AuM)** and share price are calculated by a trustless onchain **NAV Oracle**  
- Optional fee configurations: management, performance, or redemption

## Use cases

The Vaults are designed to support a wide range of strategies. This can for example include:

- Diversified `USDC` yield by lending across multiple Vesu pools
- Boosted `wBTC` yield via borrowing `USDC` against `wBTC` collateral, to generate yield on the borrowed `USDC`
- Automated looping of `ETH` staking yield
- Basis trade strategies 

And much more. The infrastructure is designed to enable almost any possible onchain strategy.

## How it works

A modular architecture balances flexibility for curators with safety for users. Key to this are the following innovations:

- Built on the [**starknet-vault-kit**](https://github.com/ForgeYields/starknet_vault_kit), an extension to the proven ERC-4626 standard comparable to an __asynchronous redemption ERC-7540 vault__
- Enforced **strategy mandates** ensure that deposited funds are only used as specified
- An onchain __AuM Oracle__ trustlessly computes and reports the vault's __Assets under Management__
- Strategies can integrate with Vesu for lending and borrowing, Avnu for swaps and arbitrary third-party ERC-4626 vaults

![Vesu Vaults](./images/vesu-vaults.png)
_Vaults allocate liquidity across DeFi protocols, follow onchain strategy mandates, and report performance via a AuM oracle._

## Curator model

In the spirit of Vesu's open and permissionless market model, Vesu Vaults adopts the same open curator model. Vault strategies can be launched by anyone using Vesu's flexible and secure vault infrastructure. Vault curators are professional third-parties and their responsibilities includes, but are not limited to, the following:

- Careful design and backtesting of yield strategies
- Creation and initial setup of new yield strategies
- Ongoing management of the yield strategy, eg rebalancing across different yield sources
- Maintaining the vault’s liquidity buffer for redemptions
- Monitoring of market conditions and risk management

This open model creates a dynamic marketplace of competing vault strategies, driving innovation, efficiency, and better yields for users.


## Security

As with all of the Vesu infrastructure we put a strong focus on the security of Vesu Vaults. 

- Smart contracts are fully audited
- $100k [bug bounty program](https://immunefi.com/bounty/vesu/)
- Strategy mandates and NAV oracles minimize trust assumptions

Read more about audits, security partners, and our full process in the [Security docs](/docs/security/index.md).