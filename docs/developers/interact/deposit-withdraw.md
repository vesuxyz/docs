---
id: supply-withdraw
title: Supply and withdraw
sidebar_label: Supply & Withdraw
sidebar_position: 1
---

:::info
Each Vesu V2 pool, if created from the official `PoolFactory` contract, has a corresponding vToken that follows the ERC-4626 interface and uses the OpenZeppelin standard implementation that is available [here](https://github.com/OpenZeppelin/cairo-contracts/blob/main/packages/token/src/erc20/extensions/erc4626/erc4626.cairo).
:::

:::info
The vToken to a specific asset and pool can be verified onchain as explained [here](/docs/developers/core/pool-factory.md).
:::

Vesu vTokens offer a convenient way to supply and withdraw assets in a specific Vesu pool. These vTokens serve as simplified vaults which pool users' assets in a single position in the respective pool and issue a share token to the user.


## Supply assets

To supply assets in a specific Vesu pool, identify the corresponding vToken and use its `deposit` function:

```
/// Mints Vault shares to `receiver` by depositing exactly `assets` of underlying tokens.
/// Returns the amount of newly-minted shares.
///
/// Requirements:
///
/// - `assets` is less than or equal to the max deposit amount for `receiver`.
///
/// Emits a `Deposit` event.
fn deposit(
    ref self: ComponentState<TContractState>, assets: u256, receiver: ContractAddress,
) -> u256
```

## Withdraw assets

To withdraw assets from a specific Vesu pool, identify the corresponding vToken and use its `withdraw` function:

```
/// Burns shares from `owner` and sends exactly `assets` of underlying tokens to `receiver`.
///
/// Requirements:
///
/// - `assets` is less than or equal to the max withdraw amount of `owner`.
///
/// Emits a `Withdraw` event.
fn withdraw(
    ref self: ComponentState<TContractState>,
    assets: u256,
    receiver: ContractAddress,
    owner: ContractAddress,
) -> u256
```

## Alternative Way to Supply and Withdraw

Alternatively, if you do not want to use the vToken's `deposit` and `withdraw` functions, you can use the `manage_position` function of the respective `Pool` contract with the following `ModifyPositionParams` data:

- `collateral_asset`: The address of the asset that you want to supply or withdraw
- `debt_asset`: The address of a second asset that is supported by the pool (this pure implementation detail)
- `user`: The address of the position owner (can be a different one than the transaction sender)
- collateral: The amount that you want to deposit or withdraw
- debt: An `Amount` reflecting 0

All amounts have to follow the `Amount` type as explained [here](/docs/developers/core/pool.md). 

The `value` field determines whether your transaction is going to supply or withdraw assets from the specific pool:
- `value > 0`: supply assets
- `value < 0`: withdraw assets