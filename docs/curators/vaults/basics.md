---
id: basics
title: How Vesu Vaults work
sidebar_label: Basics
sidebar_position: 1
---

Vesu Vaults are built from the ground up to to serve as an open protocol for professional curators to launch and manage flexible yield strategies with enterprise-grade security and minimal trust-assumptions.

![Flow of Funds](../images/vesu-vaults-flow-of-funds.png)

## How it works

Vesu Vaults is a modular vault infrastructure allowing third-party curators to launch and manage yield strategies with minimal overhead. At its core, the system builds on the proven [starknet-vault-kit](https://github.com/ForgeYields/starknet_vault_kit) and extends this in a number of ways to minimize the dependence on curators and maximize security for users.

### Vault

The __Vault__ allows users the deposit and withdraw funds to/from a Vesu Vault. It follows the ERC-4626 standard with an asynchronous redemption process. It mints an ERC-20 compatible token representing vault shares and tracking user deposits. The __Assets under Management__ and vault share price is informed by a trustless __AuM Oracle__. The Vault further handles the asynchronous redemptions and fees.

### Vault Allocator

The __Vault Allocator__ executes strategy actions initiated and verified by the __Manager__. It allocates the __Vault__'s funds in accordance with the pre-approved strategy mandate and maintains positions in the respective DeFi protocols. It further rebalances and unwinds these positions to return funds back to the __Vault__ to honor users' redemptions.

### Manager & Merkle tree verification

The __Manager__ allows the __Strategist__ role to allocate the vault's funds within its strategy mandate. This strategy mandate is defined by the __Curator__ role in form of a _Merkle tree_ whose leafs consist of approved onchain actions (such as __deposit__ in a Vesu lending pool or _swap asset A for asset B_ on Avnu). To allocate vault funds, the manager thus provides a __Merkle proof__ that a certain action is in fact a valid leaf in the __Merkle tree__ and thus permitted by the strategy mandate.

### NAV Oracle

The __AuM Oracle__ is responsible for computing the vault's __Assets under Management__ across all positions in external DeFi protocols and idle asset balances. It is therefore configured with the vault's strategy mandate and in particular the list of DeFi protocols the strategy has pre-approved to maintain positions in.

### Governor

The __Governor__ is the owner of all the components of a Vesu Vault. It delegates curator permissions, including changing the strategy mandate or fee configurations, to the __Curator__ role and upgrade permissions to the __Vesu Security Council__.

### Vault Factory

The __Vault Factory__ (not included in the diagram above) offers curators a simple and secure way to create new Vesu Vault instances. It deploys the different vault components, initializes the roles, computes the strategy mandate's merkle tree and it initializes the __Manager__ and __NAV Oracle__ with this strategy setup in order to ensure consistent management and pricing of the vault.

## Flow of Funds

The following steps outline a common sequence of interactions with Vesu Vaults and the corresponding flow of funds:

1. User deposits funds in the _Vault_ and receives ERC-4626 vault shares in return, with the share conversion rate being reported through the onchain __NAV Oracle__.
2. Funds sit in the vault contract until allocated by the __Strategist__. Allocations are only possible within the vault's strategy mandate which is enforced through an onchain __Merkle tree verification__ step.
3. The onchain __AuM Oracle__ continuously reports the vault's _Assets under Management_ in a fully trustless manner.
4. In order to withdraw funds, users __request redemptions__ by sending the desired vault shares to the vault. Redemptions are batched in epochs with a certain delay (e.g. 1 day).
5. The __Strategist__ observes redemption requests and ensures sufficient liquidity is in the vault to honor all redemptions.
6. After the redemption delay has passed, users claim their funds from the vault.

## Secure strategy mandates

Based on the built-in __Merkle tree verification__ system, Vesu Vaults ensure that yield strategies are enshrined and always enforced by the vault. This reduces both the trust assumptions in the __Strategist__ and operational security. Specifically, Vesu Vaults offer the following guarantees:

- __Curators__ are able to express a strategy mandate by encoding every action a __Strategist__ can perform as a leaf in a merkle tree and to embedd this tree in the vault itself.
- __Strategists__ are able to execute any action that is pre-approved in its embedded merkle tree by submitting a corresponding merkle proof.
- The vault enforces all __Strategist__ actions to be pre-approved by the curator by verifying the submitted action and merkle proof.
- The vault thus makes it impossible for the __Strategist__ to execute arbitrary, non pre-approved, actions and thus minimizes trust assumptions.

## Protocol integrations

Vesu Vaults currently integrates with the following DeFi protocols on Starknet:

- Vesu V2 lending pools
- Avnu DEX aggregator for asset swaps
- Third-party ERC-4626 vaults

More integrations, such as LPing on the Ekubo DEX, are planned to be added over time.

## Roles

Vesu Vaults can be configured with a set of roles and permissions: 

- __Curator__: Governs over the vault and strategy including the strategy mandate, fees and roles.
- __Strategist__: Is able to execute the strategy within the enabled mandate.
- __Rewards Caller__: Claims rewards from external distribution contracts and sends these to the __Vault Allocator__ over time.

## Fees

As a vault curator you are able to specify a number of fees:

- Management fee: An annual percentage rate applied on the vault's NAV.
- Performance fee: A percentage rate applied on the vault's P&L.
- Redemption fee: A percentage rate applied to a user's redemption amounts.

Note that multiple fees can be specified at the same time, thus applying in parallel.

## Protocol fee

The development, maintenance and operation of the Vesu Vaults infrastructure comes at a cost for Vesu. In order to cover this cost, Vesu Vaults are equipped with a __Fee Sharing__ mechanism that directs a fixed percentage of the curator's total fee revenue to Vesu. Note that curators still have full control over the fees applicable in a certain Vesu Vault and the fee sharing is limited to whatever fee configuration is made in a vault.

## Security

As with all of the Vesu infrastructure we put a strong focus on the security of Vesu Vaults. Among other aspects, this involves that 100% of the production smart contract code is audited and covered by a bug bounty. You can learn more about our rigorous security process, our security partners, our audits and other resources in our Security [docs](/docs/security/index.md).