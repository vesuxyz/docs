---
id: vaults
title: Explore Vesu Vaults
sidebar_label: Vaults
sidebar_position: 4
---

Vesu Vaults are programmable yield strategies built on Starknet, designed to make onchain yield more accessible and efficient. They abstract away the complexity of managing positions, optimizing yield, or handling redemptions. Everything runs on audited smart contracts, managed by independent curators.

## Core features

Vesu Vaults remove the usual friction in yield farming by providing a set of simple, powerful guarantees:

- Non-custodial deposits, processed instantly  
- Withdrawals follow a strategy-specific delay to optimize capital efficiency  
- Funds can only be used according to an onchain **strategy mandate**  
- Supports optional fees: management, performance, redemption

## Use cases

The Vaults are designed to support a wide range of strategies. These can include strategies like:

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

In the spirit of Vesu's open and permissionless market model, Vesu Vaults adopts the same open curator model. Vault strategies can be launched by anyone using Vesu's flexible and secure vault infrastructure. Vault curators are professional third-parties responsible for tasks such as:

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