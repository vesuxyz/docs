---
id: vtoken
title: vToken contract
sidebar_label: vToken
sidebar_position: 4
---

The Vesu `v_token` is a simple vault that offers a conveninent way for lenders to supply assets in an underlying Vesu pool. The `v_token` follows the ERC-4626 interface and hence is compatible with wallets, strategy vaults and other apps on Starknet. We here discuss the implementation details of the `v_token`, you can find more information on how to deposit and withdraw with `v_token` [here](/docs/developers/interact/deposit-withdraw.md).

## Basics

### ERC-4626 standard

The `v_token` implementation follows the ERC-4626 standard and hence exposes the same standard functions. You can find more information on the ERC-4626 standard, adapted for Starknet, on Starknet's SNIP forum [here](https://github.com/starknet-io/SNIPs/blob/main/SNIPS/snip-22.md). 

### v_token - Pool relationship

A Vesu `v_token` always corresponds to a single underlying asset and `Pool`. All deposits in a `v_token` are instantly supplied as liquidity in the underlying `Pool` and earn interest and rewards as regular deposits in the `Pool`.

### v_token shares - collateral_shares relationship

`v_token` shares correspond 1:1 to `collateral_shares` of the underlying asset and pool. In other words, 1 `v_token` share is always redeemable for the exact same amount of underlying assets than 1 `collateral_share`.

### v_token creation

:::info
You can verify the address of a `v_token` for the underlying asset and pool (and vice-versa) with the `v_token_for_asset` and `asset_for_v_token` functions on the `PoolFactory` (read more [here](/docs/developers/core/pool-factory.md)).
:::

When a new `Pool` is created, the corresponding `v_token`s are also deployed in the `PoolFactory` contract. As a result, "official" `v_token`s exist for all factory created `Pool`s.

### Trust assumption

The `v_token` operates fully autonomous with deposits & withdraws processed atomically with the user's interactions. As a result, the `v_token` does not have a _Manager_ or _Owner_ role and does not add any additional trust assumptions compared to other deposits in a Vesu `Pool`.


## User functions

We here highlight the main user functions, you can find more details (and ERC-4626 functions) in the `v_token` source code and the ERC-4626 SNIP [here](https://github.com/starknet-io/SNIPs/blob/main/SNIPS/snip-22.md).

### Asset management

The `v_token` exposes a number of basic functions related to the management of the underlying assets and Vesu `Pool`:

```
/// Returns the address of the pool associated with the vToken
/// # Returns
/// * address of the pool
fn pool_contract(self: @ContractState) -> ContractAddress
```

```
/// Returns the address of the underlying asset of the vToken
/// # Returns
/// * address of the asset
fn asset(self: @ContractState) -> ContractAddress
```

```
/// Returns the total amount of underlying assets deposited via the vToken
/// # Returns
/// * total amount of assets [asset scale]
fn total_assets(self: @ContractState) -> u256
```

```
/// Converts an amount of assets to the equivalent amount of vToken shares
/// # Arguments
/// * `assets` - amount of assets to convert [asset scale]
/// # Returns
/// * amount of vToken shares [SCALE]
fn convert_to_shares(self: @ContractState, assets: u256) -> u256
```

```
/// Converts an amount of vToken shares to the equivalent amount of assets
/// # Arguments
/// * `shares` - amount of vToken shares to convert [SCALE]
/// # Returns
/// * amount of assets [asset scale]
fn convert_to_assets(self: @ContractState, shares: u256) -> u256
```

### Deposit & withdraw

:::info
The `v_token` maintains a single lending position in the underlying `Pool` through which user deposits & withdraws are atomically managed.
:::

To deposit assets in the `v_token`, use the `deposit` function:

```
/// Deposits assets into the pool and mints vTokens (shares) to the receiver
/// # Arguments
/// * `assets` - amount of assets to deposit [asset scale]
/// * `receiver` - address to receive the vToken shares
/// # Returns
/// * amount of vToken shares minted [SCALE]
fn deposit(ref self: ContractState, assets: u256, receiver: ContractAddress) -> u256
```

To withdraw assets from the `v_token`, use the `withdraw` function:

```
/// Withdraws assets from the pool and burns vTokens (shares) from the owner of the vTokens
/// # Arguments
/// * `assets` - amount of assets to withdraw [asset scale]
/// * `receiver` - address to receive the withdrawn assets
/// * `owner` - address of the owner of the vToken shares
/// # Returns
/// * amount of vTokens (shares) burned [SCALE]
fn withdraw(ref self: ContractState, assets: u256, receiver: ContractAddress, owner: ContractAddress) -> u256
```