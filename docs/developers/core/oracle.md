---
id: oracle
title: Oracle contract
sidebar_label: Oracle
sidebar_position: 3
---

The `Oracle` contract serves as an adapter between a `Pool` instance and a third-party oracle provider such as Pragma or ChainLink. The oracle fetches the raw price for an asset from the oracle provider and validates this price according to the following criteria:

- number of price sources used to compute the price
- price staleness
- non-zero price

:::info
These criteria are based on the Pragma oracle provider feeds and may change as other providers are supported in the future.
:::

The oracle then returns the raw price with a price validity flag (true, false) to the `Pool` contract which then either consumes the price or pauses the pool.

## Data Types

Vesu V2 defines a number of data types, or `struct`s, that are reused across the different components. We here discuss the main types related to the `Pool` contract.

### OracleConfig

The `OracleConfig` type contains all parameters relevant to the configuration of a specific asset's price feed.

```
pub struct OracleConfig {
    pub pragma_key: felt252,
    pub timeout: u64, // [seconds]
    pub number_of_sources: u32, // [0, 255]
    pub start_time_offset: u64, // [seconds]
    pub time_window: u64, // [seconds]
    pub aggregation_mode: AggregationMode,
}
```

### AssetPrice

:::info
Note that the `AssetPrice` is always returned in 18-decimals precision irrespective of the decimals used for the feed by the oracle provider.
:::

The `AssetPrice` type expresses a specific asset price, as returned by the respective oracle provider, and its validity flag, which is derived by the `Oracle` itself based on the price's metadata.

```
pub struct AssetPrice {
    pub value: u256,
    pub is_valid: bool,
}
```

## Storage

We here show the full storage of the `Oracle` contract with inline docs.

```
struct Storage {
    #[substorage(v0)]
    ownable: OwnableComponent::Storage,
    // The address of the pragma oracle contract
    pragma_oracle: ContractAddress,
    // The address of the pragma summary contract
    pragma_summary: ContractAddress,
    // asset -> oracle configuration
    oracle_configs: Map<ContractAddress, OracleConfig>,
    // The owner of the pool
    curator: ContractAddress,
    // The pending curator
    pending_curator: ContractAddress,
}
```

## Price Function

:::warning
Make sure that all configured price feeds return an `AssetPrice` that is denominated in the same base asset, e.g. USD, or you risk inconsistent valuation of Vesu positions and unintended liquidations or bad debt as a result.   
:::

The `price` function is called by the `Pool` contract upon every user interaction with a pool to compute the value of a position's collateral and debt.

```
/// Returns the current price for an asset and the validity status of the price.
/// The price can be invalid if price is too old (stale) or if the number of price sources is too low.
/// # Arguments
/// * `asset` - address of the asset
/// # Returns
/// * `AssetPrice` - latest price of the asset and its validity
fn price(self: @ContractState, asset: ContractAddress) -> AssetPrice
```

## Owner Functions

:::info
Note that only the owner of the `Oracle` has permission to use the below functions.
:::

### Add a new Asset Feed

To add a new asset price feed, use the `add_asset` function:

```
/// Sets oracle config for an asset
/// # Arguments
/// * `asset` - address of the asset
/// * `oracle_config` - oracle configuration
fn add_asset(ref self: ContractState, asset: ContractAddress, oracle_config: OracleConfig)
```

### Change Oracle Parameter

To change a specific parameter for an asset's price feed, use the `set_oracle_parameter` function:

```
/// Sets a parameter for a given oracle configuration of an asset
/// # Arguments
/// * `asset` - address of the asset
/// * `parameter` - parameter name
/// * `value` - value of the parameter
fn set_oracle_parameter(ref self: ContractState, asset: ContractAddress, parameter: felt252, value: felt252)
```

Note, the following parameters can be changed:

- `pragma_key`
- `timeout`
- `number_of_sources`
- `start_time_offset`
- `time_window`
- `aggregation_mode``
