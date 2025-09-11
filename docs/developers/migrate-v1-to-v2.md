---
id: migrate-v1-to-v2
title: Migrate Positions from V1 to V2
sidebar_label: Migrate V1 to V2
sidebar_position: 5
---

:::info
Migration of positions from the Vesu V1 version is not mandatory. Vesu V1 pools will continue to be supported and there is no risk of maintaining positions in the V1 version. However, liquidity will naturally migrate to the Vesu V2 pools as these will be more deeply integrated in the Starknet ecosystem going forward. Users, and in particular borrowers, are thus advised to monitor V1 pools and migrate their positions as the borrow conditions indicate decreasing liquidity.
:::

## Migration steps

Since the migration of Vesu V1 positions is not required, we don't automate that for users and also don't offer a simplified UI for it. That means, to migrate a position from Vesu V1 to V2, users have to close their V1 position and reopen it in one of the V2 pools. On the Vesu V2 frontend, V1 and V2 pools will be clearly labeled.

## Vesu V2 addresses

:::danger
The Vesu V2 protocol is currently in closed beta testing. The contract addresses below have not been audited or thorougly tested. We strongly advise you to only supply insignificant amounts of assets into these contracts.
:::

We have deployed a version of the Vesu V2 protocol on Starknet mainnet for testing and integration purposes. Find the contract addresses [here](/docs/developers/addresses.md).

## Breaking changes

Vesu V2 introduces some breaking changes compared to V1. We here provide an overview of these changes. If you have more questions, please reach out on our [Discord](https://discord.gg/G9Gxgujj8T).

- Deprecation of Singleton architecture: Vesu V1 built on a Singleton contract that manages the state and assets for all pools. This concept has been replaced with a Pool instance model where the state and assets are isolated into separate `Pool` contracts. To interact with a position in a specific pool, users now have to send transactions to the specific pool's address instead of the same Singleton address as before.
- Removal of hooks and extension: Vesu V1's hooks system has been removed entirely making the separation of pool logic into core and extension unnecessary. In Vesu V2, all logic is now contained in a single `Pool` contract.
- Removal of autonomous pool shutdown: The pool shutdown system in Vesu V1 was intended to enable for an orderly wind down of failed pools. This system has added significant complexity to the Vesu V1 codebase since it was designed for immutable pools. With the introduction of the _Vesu Security Council_ and its ability to upgrade pools in case of an emergency, this mechanism was now removed.
- Removal of `transfer_position` function: The `transfer_position` function has been removed entirely to simplify the codebase. The same user flows can be achieved by a periphery contract using _flash loans_.
- Removal of `AmountType` enum: The Vesu V2 `Amount` type does not support the `AmountType` enum anymore. All Amounts are expressed as `Delta` types.
- Removal of `pool_id` fields: Since interactions with a specific pool are now isolated on separate instances, the `pool_id` field in the following data types has been removed: `ModifyPositionParams`, `LiquidatePositionParams`.
- Removal of `data` fields: The `data` fields was intended for advanced use cases involving hooks in the Vesu V1 codebase. With the removal of hooks, the `data` field was also removed from the following data types: `ModifyPositionParams`, `LiquidatePositionParams`.
- Removal of `receive_as_shares` flag: The `receive_as_shares` flag of the `LiquidatePositionParams` was deactivated already with the migration of the Vesu V1 codebase to the SingletonV2 implementation that was executed in June 2025. In the Vesu V2 implementation, this flag has now been removed entirely as it was unused.
- Addition of `fee_shares` in `asset_config`: The accrued fee shares are now explicitly tracked in a new variable `fee_shares` in the `asset_config` of the respective asset in a pool.
- Addition of `pool_pausing_agent`: This is a new role that is added to pools with the ability to pause deposits and withdrawals in an emergency. Pool curators can assign this role, such as Vesu's Hypernative pauser agent.