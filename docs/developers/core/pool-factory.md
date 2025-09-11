---
id: pool-factory
title: PoolFactory contract
sidebar_label: PoolFactory
sidebar_position: 5
---

:::warning
Curators should always use the official `PoolFactory` contract to create new Vesu pools in order to ensure consistency of the pool configuration and compatibility with the Vesu backend and frontend infrastructure.
:::

The `PoolFactory` enables anyone to securely create and initialize new Vesu pools and oracles. It further maintains mappings of `VToken -> Pool` and `Pool, Asset -> VToken` that allow you to look up and verify the `VToken` associated with a pool and asset.

## Storage

We here show the full storage of the `Pool` contract with inline docs.

```
struct Storage {
    pool_class_hash: felt252,
    v_token_class_hash: felt252,
    oracle_class_hash: felt252,
    v_token_for_asset: Map<(ContractAddress, ContractAddress), ContractAddress>,
    asset_for_v_token: Map<(ContractAddress, ContractAddress), ContractAddress>,
    #[substorage(v0)]
    ownable: OwnableComponent::Storage,
}
```

## User Functions

### VToken Lookup

Use this function to identify the address of the VToken contract for a specific pool and asset.

```
/// Returns the vToken address for a given collateral asset
/// # Arguments
/// * `pool` - address of the pool
/// * `asset` - address of the asset
/// # Returns
/// * `v_token` - address of the vToken contract
fn v_token_for_asset(self: @ContractState, pool: ContractAddress, asset: ContractAddress) -> ContractAddress
```

### Asset Lookup

Use this function to identify the address of the asset for a specific pool and VToken.

```
/// Returns the collateral asset for a given vToken
/// # Arguments
/// * `pool` - address of the pool
/// * `v_token` - address of the vToken contract
/// # Returns
/// * `asset` - address of the collateral asset
fn asset_for_v_token(self: @ContractState, pool: ContractAddress, v_token: ContractAddress) -> ContractAddress
```

### Create Pool

:::info
The `PoolFactory` always assignes the `owner` role of a pool, that is the role with permission to upgrade the `Pool` contract, to the _Vesu Security Council_.
:::

:::info
The pool `name` can only be set at pool creation time. It can not be changed at a later point as this may result in inconsistent data (both offchain and onchain).
:::

:::info
When creating a new pool, you will have to first approve the `PoolFactory` to spend `2000` base units of each asset that you set up the pool with. These units are burned as an _Inflation Fee_ during the process of pool creation to protect from certain attack vectors.
:::

:::warning
The `curator` needs to accept its nomination after the pool has been created. Use the `accept_curator_ownership` function on the deployed pool through a Starknet block explorer like [Voyager](https://voyager.online) to accept your nomination.
:::

Use this function to create a new Vesu pool. The `create_pool` function will deploy a new `Pool` contract, instantiate it with the provided pool parameters, deploy a new `VToken` for each of the pool assets, and return the address of the new pool (aka the `pool_id`).

```
/// Creates a new pool
/// # Arguments
/// * `name` - name of the pool
/// * `curator` - curator of the pool
/// * `oracle` - oracle of the pool
/// * `fee_recipient` - fee recipient of the pool
/// * `asset_params` - asset parameters
/// * `v_token_params` - vToken parameters
/// * `interest_rate_params` - interest rate model parameters
/// * `pair_params` - pair parameters
/// # Returns
/// * `pool_id` - id of the pool
fn create_pool(
    ref self: ContractState,
    name: felt252,
    curator: ContractAddress,
    oracle: ContractAddress,
    fee_recipient: ContractAddress,
    mut asset_params: Span<AssetParams>,
    mut v_token_params: Span<VTokenParams>,
    mut interest_rate_params: Span<InterestRateConfig>,
    mut pair_params: Span<PairParams>,
) -> ContractAddress
```

### Add Asset to an existing pool

:::info
When adding a new asset, you will have to first approve the `PoolFactory` to spend `2000` base units of that asset. These units are burned as an _Inflation Fee_ during the process of pool creation to protect from certain attack vectors.
:::

Use this function to add a new asset to an existing pool. The `add_asset` function will correctly add and initialize the new asset to the pool and further deploy a corresponding VToken.

```
/// Adds an asset to the pool. The curator has to nominate the factory as the curator.
/// The factory will pass the ownership back to the curator after the asset is added.
/// # Arguments
/// * `pool` - address of the pool
/// * `asset` - address of the asset
/// * `asset_params` - asset parameters
/// * `interest_rate_config` - interest rate model configuration
/// * `v_token_params` - vToken parameters
fn add_asset(
    ref self: ContractState,
    pool: ContractAddress,
    asset: ContractAddress,
    asset_params: AssetParams,
    interest_rate_config: InterestRateConfig,
    v_token_params: VTokenParams,
)
```

### Create Oracle

:::info
There exists a _Factory Oracle_ which maintains all major price feeds and can be freely used when creating new pools. You can find the address [here](/docs/developers/addresses.md).
:::

:::info
The `PoolFactory` always assignes the `owner` role of an oracle, that is the role with permission to upgrade the `Oracle` contract, to the _Vesu Security Council_.
:::

Use this function to create and initialize a new oracle. You will be able to specify an oracle `manager` who has the permission to change the oracle configuration after creation.

```
/// Creates a new oracle contract
/// # Arguments
/// * `manager` - manager of the oracle
/// * `pragma_oracle` - address of the pragma oracle contract
/// * `pragma_summary` - address of the pragma summary contract
/// # Returns
/// * `oracle` - address of the oracle contract
fn create_oracle(
    ref self: ContractState,
    manager: ContractAddress,
    pragma_oracle: ContractAddress,
    pragma_summary: ContractAddress,
) -> ContractAddress
```