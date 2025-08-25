---
id: pool-factory
title: PoolFactory contract
sidebar_label: PoolFactory
sidebar_position: 5
---

:::warning
Curators should always use the official `PoolFactory` contract to create new Vesu pools in order to ensure consistency of the pool configuration and compatibility with the Vesu backend and frontend infrastructure.
:::

The `PoolFactory` contract implements the logic that enables anyone to create a new Vesu pool. It further maintains a mapping of `VToken -> Pool` that offers a simplified look up and verification of `VToken` contracts.

## Storage

We here show the full storage of the `Pool` contract with inline docs.

```
struct Storage {
    pool_class_hash: felt252,
    v_token_class_hash: felt252,
    v_token_for_asset: Map<(ContractAddress, ContractAddress), ContractAddress>,
    asset_for_v_token: Map<(ContractAddress, ContractAddress), ContractAddress>,
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

Use this function to create a new Vesu pool. The `create_pool` function will deploy a new `Pool` contract, instantiate it with the provided pool parameters, deploy a new `VToken` for each of the pool assets, and return the address of the new pool (aka the `pool_id`).

```
/// Creates a new pool
/// # Arguments
/// * `name` - name of the pool
/// * `owner` - owner of the pool
/// * `curator` - curator of the pool
/// * `oracle` - oracle of the pool
/// * `fee_recipient` - fee recipient of the pool
/// * `shutdown_params` - shutdown parameters
/// * `asset_params` - asset parameters
/// * `v_token_params` - vToken parameters
/// * `ltv_params` - loan-to-value parameters
/// * `interest_rate_params` - interest rate model parameters
/// * `liquidation_params` - liquidation parameters
/// * `debt_cap_params` - debt cap parameters
/// # Returns
/// * `pool_id` - id of the pool
fn create_pool(
    ref self: ContractState,
    name: felt252,
    owner: ContractAddress,
    curator: ContractAddress,
    oracle: ContractAddress,
    fee_recipient: ContractAddress,
    shutdown_params: ShutdownParams,
    mut asset_params: Span<AssetParams>,
    mut v_token_params: Span<VTokenParams>,
    mut ltv_params: Span<LTVParams>,
    mut interest_rate_params: Span<InterestRateConfig>,
    mut liquidation_params: Span<LiquidationParams>,
    mut debt_cap_params: Span<DebtCapParams>,
) -> ContractAddress
```