---
id: singleton
title: Singleton contract
sidebar_label: Singleton
sidebar_position: 2
---

This page gives an overview over the storage and the functions of the Singleton contract.

## Storage

The following sections shows each storage variable available in the singleton contract.

##### creator_nonce (LegacyMap)

Tracks a nonce for each creator of a pool to deterministically derive the `pool_id` from it.

```
// creator -> nonce
creator_nonce: LegacyMap::<ContractAddress, felt252>
```

##### extensions (LegacyMap)

Tracks the address of the extension contract for each pool.

```
// pool_id -> extension
extensions: LegacyMap::<felt252, ContractAddress>
```

##### asset_configs (LegacyMap)

Tracks the configuration / state of each asset in each pool.

Mapping from pool_id & asset to

```
// (pool_id, asset) -> asset configuration
asset_configs: LegacyMap::<(felt252, ContractAddress), AssetConfig>
```

##### ltv_configs (LegacyMap)

Tracks the max. allowed loan-to-value ratio for each asset pairing in each pool.

Mapping from PoolId & Asset to loan-to-value configruation.

```
ltv_configs: LegacyMap::<(felt252, ContractAddress, ContractAddress), LTVConfig>
```

##### positions (LegacyMap)

Tracks the state of each position in each pool.

```
// (pool_id, collateral_asset, debt_asset, user) -> position
positions: LegacyMap::<(felt252, ContractAddress, ContractAddress, ContractAddress), Position>
```

##### delegations (LegacyMap)

Tracks the delegation status for each delegator to a delegatee for a specific pool.

```
// (pool_id, delegator, delegatee) -> delegation
delegations: LegacyMap::<(felt252, ContractAddress, ContractAddress), bool>
```

##### lock (boolean)

Tracks the reentrancy lock status to prohibit reentrancy when loading the context or the asset config.

```
lock: bool
```

## Functions

#### asset_config_unsafe

Returns the configuration / state of an asset for a given pool
This method does not prevent reentrancy which may result in asset_config being out of date.
For contract to contract interactions `asset_config()` should be used instead.

Check source code on [Github](https://github.com/vesuxyz/vesu-v1/blob/main/src/singleton.cairo#L693).

##### Arguments

- `pool_id` - id of the pool
- `asset` - address of the asset

##### Returns

- `asset_config` - asset configuration
- `fee_shares` - accrued fee shares minted to the fee recipient

```
fn asset_config_unsafe(
        self: @ContractState,
        pool_id: felt252,
        asset: ContractAddress
    ) -> (AssetConfig, u256)
```

### asset_config

Wrapper around `asset_config()` that prevents reentrancy

Check source code on [Github](https://github.com/vesuxyz/vesu-v1/blob/main/src/singleton.cairo#L717).

##### Arguments

- `pool_id` - id of the pool
- `asset` - address of the asset

##### Returns

- `asset_config` - asset configuration
- `fee_shares` - accrued fee shares minted to the fee recipient

```
fn asset_config(
        ref self: ContractState,
        pool_id: felt252,
        asset: ContractAddress
    ) -> (AssetConfig, u256)
```

### ltv_config

Returns the loan-to-value configuration between two assets (pair) in the pool.

Check source code on [Github](https://github.com/vesuxyz/vesu-v1/blob/main/src/singleton.cairo#L732).

##### Arguments

- `pool_id` - id of the pool
- `collateral_asset` - address of the collateral asset
- `debt_asset` - address of the debt asset

##### Returns

- `ltv_config` - ltv configuration

```
fn ltv_config(
        self: @ContractState,
        pool_id: felt252,
        collateral_asset: ContractAddress,
        debt_asset: ContractAddress
    ) -> LTVConfig
```

### position_unsafe

Returns the current state of a position.

Check source code on [Github](https://github.com/vesuxyz/vesu-v1/blob/main/src/singleton.cairo#L748)

##### Arguments

- `pool_id` - id of the pool
- `collateral_asset` - address of the collateral asset
- `debt_asset` - address of the debt asset
- `user` - address of the position's owner

##### Returns

- `position` - position state
- `collateral` - amount of collateral (computed from position.collateral_shares) [asset scale]
- `debt` - amount of debt (computed from position.nominal_debt) [asset scale]

```
fn position_unsafe(
    self: @ContractState,
    pool_id: felt252,
    collateral_asset: ContractAddress,
    debt_asset: ContractAddress,
    user: ContractAddress
  ) -> (Position, u256, u256)
```

### position

Wrapper around position() that prevents reentrancy.

Check source code on [Github](https://github.com/vesuxyz/vesu-v1/blob/main/src/singleton.cairo#L770)

##### Arguments

- `pool_id` - id of the pool
- `collateral_asset` - address of the collateral asset
- `debt_asset` - address of the debt asset
- `user` - address of the position's owner

##### Returns

- `position` - position state
- `collateral` - amount of collateral (computed from position.collateral_shares) [asset scale]
- `debt` - amount of debt (computed from position.nominal_debt) [asset scale]

```
fn position(
    ref self: ContractState,
    pool_id: felt252,
    collateral_asset: ContractAddress,
    debt_asset: ContractAddress,
    user: ContractAddress
  ) -> (Position, u256, u256)
```

### check_collateralization_unsafe

Checks if a position is collateralized according to the max. loan-to-value ratio.

Check source code on [Github](https://github.com/vesuxyz/vesu-v1/blob/main/src/singleton.cairo#L794)

##### Arguments

- `pool_id` - id of the pool
- `collateral_asset` - address of the collateral asset
- `debt_asset` - address of the debt asset
- `user` - address of the position's owner

##### Returns

- `collateralized` - true if the position is collateralized, false otherwise
- `collateral_value` - USD value of the collateral [SCALE]
- `debt_value` - USD value of the debt [SCALE]

```
fn check_collateralization_unsafe(
    self: @ContractState,
    pool_id: felt252,
    collateral_asset: ContractAddress,
    debt_asset: ContractAddress,
    user: ContractAddress
) -> (bool, u256, u256)
```

### check_collateralization

Wrapper around check_collateralization_unsafe() that prevents reentrancy

Check source code on [Github](https://github.com/vesuxyz/vesu-v1/blob/main/src/singleton.cairo#L816)

##### Arguments

- `pool_id` - id of the pool
- `collateral_asset` - address of the collateral asset
- `debt_asset` - address of the debt asset
- `user` - address of the position's owner

##### Returns

- `collateralized` - true if the position is collateralized, false otherwise
- `collateral_value` - USD value of the collateral [SCALE]
- `debt_value` - USD value of the debt [SCALE]

```
fn check_collateralization(
    ref self: ContractState,
    pool_id: felt252,
    collateral_asset: ContractAddress,
    debt_asset: ContractAddress,
    user: ContractAddress
  ) -> (bool, u256, u256)
```

### rate_accumulator_unsafe

Calculates the current (using the current block's timestamp) rate accumulator for a given asset in a pool.

Check source code on [Github](https://github.com/vesuxyz/vesu-v1/blob/main/src/singleton.cairo#L837)

##### Arguments

- `pool_id` - id of the pool
- `asset` - address of the asset

##### Returns

- `rate_accumulator` - computed rate accumulator [SCALE]

```
fn rate_accumulator_unsafe(
    self: @ContractState,
    pool_id: felt252,
    asset: ContractAddress) -> u256
```

### rate_accumulator

Wrapper around rate_accumulator() that prevents reentrancy.

Check source code on [Github](https://github.com/vesuxyz/vesu-v1/blob/main/src/singleton.cairo#L848).

##### Arguments

- `pool_id` - id of the pool
- `asset` - address of the asset

##### Returns

- `rate_accumulator` - computed rate accumulator [SCALE]

```
fn rate_accumulator(
    ref self: ContractState,
    pool_id: felt252,
    asset: ContractAddress) -> u256
```

### utilization_unsafe

Calculates the current utilization of an asset in a pool.

Check source code on [Github](https://github.com/vesuxyz/vesu-v1/blob/main/src/singleton.cairo#L862).

##### Arguments

- `pool_id` - id of the pool
- `asset` - address of the asset

##### Returns

- `utilization` - computed utilization [SCALE]

```
fn utilization_unsafe(
    self: @ContractState,
    pool_id: felt252,
    asset: ContractAddress) -> u256
```

### utilization

Wrapper around utilization() that prevents reentrancy.

Check source code on [Github](https://github.com/vesuxyz/vesu-v1/blob/main/src/singleton.cairo#L873).

##### Arguments

- `pool_id` - id of the pool
- `asset` - address of the asset

##### Returns

- `utilization` - computed utilization [SCALE]

```
fn utilization(
    ref self: ContractState,
    pool_id: felt252,
    asset: ContractAddress) -> u256
```

### delegation

Returns the delegation status of a delegator to a delegatee for a specific pool.

Check source code on [Github](https://github.com/vesuxyz/vesu-v1/blob/main/src/singleton.cairo#L888).

##### Arguments

- `pool_id` - id of the pool
- `delegator` - address of the delegator
- `delegatee` - address of the delegatee

##### Returns

- `delegation` - delegation status (true = delegate, false = undelegate)

```
fn delegation(
    self: @ContractState,
    pool_id: felt252,
    delegator: ContractAddress,
    delegatee: ContractAddress) -> bool
```

### calculate_pool_id

Derives the pool_id for a given creator and nonce.

Check source code on [Github](https://github.com/vesuxyz/vesu-v1/blob/main/src/singleton.cairo#L900).

##### Arguments

- `caller_address` - address of the creator
- `nonce` - nonce of the creator (creator_nonce() + 1 to derive the pool_id of the next pool)

##### Returns

- `pool_id` - id of the pool

```
fn calculate_pool_id(
    self: @ContractState,
    caller_address: ContractAddress,
    nonce: felt252) -> felt252
```

### calculate_debt

Calculates the debt for a given amount of nominal debt, the current rate accumulator and debt asset's scale.

Check source code on [Github](https://github.com/vesuxyz/vesu-v1/blob/main/src/singleton.cairo#L912).

##### Arguments

- `nominal_debt` - amount of nominal debt [asset scale]
- `rate_accumulator` - current rate accumulator [SCALE]
- `asset_scale` - debt asset's scale

##### Returns

- `debt` - computed debt [asset scale]

```
fn calculate_debt(
    self: @ContractState,
    nominal_debt: i257,
    rate_accumulator: u256,
    asset_scale: u256) -> u256
```

### calculate_nominal_debt

Calculates the nominal debt for a given amount of debt, the current rate accumulator and debt asset's scale.

Check source code on [Github](https://github.com/vesuxyz/vesu-v1/blob/main/src/singleton.cairo#L923).

##### Arguments

- `debt` - amount of debt [asset scale]
- `rate_accumulator` - current rate accumulator [SCALE]
- `asset_scale` - debt asset's scale

##### Returns

- `nominal_debt` - computed nominal debt [asset scale]

```
fn calculate_nominal_debt(
    self: @ContractState,
    debt: i257,
    rate_accumulator: u256,
    asset_scale: u256) -> u256
```

### calculate_collateral_shares_unsafe

Calculates the number of collateral shares (that would be e.g. minted) for a given amount of collateral assets.

Check source code on [Github](https://github.com/vesuxyz/vesu-v1/blob/main/src/singleton.cairo#L934).

##### Arguments

- `pool_id` - id of the pool
- `asset` - address of the asset
- `collateral` - amount of collateral [asset scale]

##### Returns

- `collateral_shares` - computed collateral shares [SCALE]

```
fn calculate_collateral_shares_unsafe(
    self: @ContractState,
    pool_id: felt252,
    asset: ContractAddress,
    collateral: i257) -> u256
```

### calculate_collateral_shares

Wrapper around calculate_collateral_shares() that prevents reentrancy.

Check source code on [Github](https://github.com/vesuxyz/vesu-v1/blob/main/src/singleton.cairo#L948).

##### Arguments

- `pool_id` - id of the pool
- `asset` - address of the asset
- `collateral` - amount of collateral [asset scale]

##### Returns

- `collateral_shares` - computed collateral shares [SCALE]

```
fn calculate_collateral_shares(
    ref self: ContractState,
    pool_id: felt252,
    asset: ContractAddress,
    collateral: i257) -> u256
```

### calculate_collateral_unsafe

Calculates the amount of collateral assets (that can e.g. be redeemed) for a given amount of collateral shares.

Check source code on [Github](https://github.com/vesuxyz/vesu-v1/blob/main/src/singleton.cairo#L965).

##### Arguments

- `pool_id` - id of the pool
- `asset` - address of the asset
- `collateral_shares` - amount of collateral shares

##### Returns

- `collateral` - computed collateral [asset scale]

```
fn calculate_collateral_unsafe(
    self: @ContractState,
    pool_id: felt252,
    asset: ContractAddress,
    collateral_shares: i257) -> u256
```

### calculate_collateral

Wrapper around calculate_collateral() that prevents reentrancy.

Check source code on [Github](https://github.com/vesuxyz/vesu-v1/blob/main/src/singleton.cairo#L979).

##### Arguments

- `pool_id` - id of the pool
- `asset` - address of the asset
- `collateral_shares` - amount of collateral shares

##### Returns

- `collateral` - computed collateral [asset scale]

```
fn calculate_collateral(
    ref self: ContractState,
    pool_id: felt252,
    asset: ContractAddress,
    collateral_shares: i257) -> u256
```

### deconstruct_collateral_amount_unsafe

Deconstructs the collateral amount into collateral delta, collateral shares delta and its sign.

Check source code on [Github](https://github.com/vesuxyz/vesu-v1/blob/main/src/singleton.cairo#L999).

##### Arguments

- `pool_id` - id of the pool
- `collateral_asset` - address of the collateral asset
- `debt_asset` - address of the debt asset
- `user` - address of the position's owner
- `collateral` - amount of collateral

##### Returns

- `collateral_delta` - computed collateral delta [asset scale]
- `collateral_shares_delta` - computed collateral shares delta [SCALE]

```
fn deconstruct_collateral_amount_unsafe(
    self: @ContractState,
    pool_id: felt252,
    collateral_asset: ContractAddress,
    debt_asset: ContractAddress,
    user: ContractAddress,
    collateral: Amount) -> (i257, i257)
```

### deconstruct_collateral_amount

Wrapper around deconstruct_collateral_amount() that prevents reentrancy.

Check source code on [Github](https://github.com/vesuxyz/vesu-v1/blob/main/src/singleton.cairo#L1021).

##### Arguments

- `pool_id` - id of the pool
- `collateral_asset` - address of the collateral asset
- `debt_asset` - address of the debt asset
- `user` - address of the position's owner
- `collateral` - amount of collateral

##### Returns

- `collateral_delta` - computed collateral delta [asset scale]
- `collateral_shares_delta` - computed collateral shares delta [SCALE]

```
fn deconstruct_collateral_amount(
    ref self: ContractState,
    pool_id: felt252,
    collateral_asset: ContractAddress,
    debt_asset: ContractAddress,
    user: ContractAddress,
    collateral: Amount) -> (i257, i257)
```

### deconstruct_debt_amount_unsafe

Deconstructs the debt amount into debt delta, nominal debt delta and its sign.

Check source code on [Github](https://github.com/vesuxyz/vesu-v1/blob/main/src/singleton.cairo#L1047).

##### Arguments

- `pool_id` - id of the pool
- `collateral_asset` - address of the collateral asset
- `debt_asset` - address of the debt asset
- `user` - address of the position's owner
- `debt` - amount of debt

##### Returns

- `debt_delta` - computed debt delta [asset scale]
- `nominal_debt_delta` - computed nominal debt delta [SCALE]

```
fn deconstruct_debt_amount_unsafe(
    self: @ContractState,
    pool_id: felt252,
    collateral_asset: ContractAddress,
    debt_asset: ContractAddress,
    user: ContractAddress,
    debt: Amount) -> (i257, i257)
```

### deconstruct_debt_amount

Wrapper around deconstruct_debt_amount() that prevents reentrancy.

Check source code on [Github](https://github.com/vesuxyz/vesu-v1/blob/main/src/singleton.cairo#L1071).

##### Arguments

- `pool_id` - id of the pool
- `collateral_asset` - address of the collateral asset
- `debt_asset` - address of the debt asset
- `user` - address of the position's owner
- `debt` - amount of debt

##### Returns

- `debt_delta` - computed debt delta [asset scale]
- `nominal_debt_delta` - computed nominal debt delta [SCALE]

```
fn deconstruct_debt_amount(
    ref self: ContractState,
    pool_id: felt252,
    collateral_asset: ContractAddress,
    debt_asset: ContractAddress,
    user: ContractAddress,
    debt: Amount) -> (i257, i257)
```

### context_unsafe

Loads the contextual state for a given user. This includes the pool's extension address, the state of the collateral and debt assets, loan-to-value configurations and the state of the position. This method does not prevent reentrancy which may result in context being out of date. For contract-to-contract interactions context() should be used instead.

Check source code on [Github](https://github.com/vesuxyz/vesu-v1/blob/main/src/singleton.cairo#L1098).

##### Arguments

- `pool_id` - id of the pool
- `collateral_asset` - address of the collateral asset
- `debt_asset` - address of the debt asset
- `user` - address of the position's owner

##### Returns

- `context` - contextual state

```
fn context_unsafe(
    self: @ContractState,
    pool_id: felt252,
    collateral_asset: ContractAddress,
    debt_asset: ContractAddress,
    user: ContractAddress) -> Context
```

### context

Wrapper around context() that prevents reentrancy.

Check source code on [Github](https://github.com/vesuxyz/vesu-v1/blob/main/src/singleton.cairo#L1149).

##### Arguments

- `pool_id` - id of the pool
- `collateral_asset` - address of the collateral asset
- `debt_asset` - address of the debt asset
- `user` - address of the position's owner

##### Returns

- `context` - contextual state

```
fn context(
    ref self: ContractState,
    pool_id: felt252,
    collateral_asset: ContractAddress,
    debt_asset: ContractAddress,
    user: ContractAddress) -> Context
```

### create_pool

Creates a new pool.

Check source code on [Github](https://github.com/vesuxyz/vesu-v1/blob/main/src/singleton.cairo#L1170).

##### Arguments

- `asset_params` - array of asset parameters
- `ltv_params` - array of loan-to-value parameters
- `extension` - address of the extension contract

##### Returns

- `pool_id` - id of the pool

```
fn create_pool(
    ref self: ContractState,
    asset_params: Span<AssetParams>,
    mut ltv_params: Span<LTVParams>,
    extension: ContractAddress) -> felt252
```

### modify_position

Adjusts a position's collateral and debt balances.

Check source code on [Github](https://github.com/vesuxyz/vesu-v1/blob/main/src/singleton.cairo#L1212).

##### Arguments

- `params` - see ModifyPositionParams

##### Returns

- `response` - see UpdatePositionResponse

```
fn modify_position(
    ref self: ContractState,
    params: ModifyPositionParams) -> UpdatePositionResponse
```

### transfer_position

Transfers a position's collateral and/or debt balances to another position in the same pool. Either the collateral or debt asset addresses match. For transfers to the same position, `modify_position` should be used instead.

Check source code on [Github](https://github.com/vesuxyz/vesu-v1/blob/main/src/singleton.cairo#L1280).

##### Arguments

- `params` - see TransferPositionParams

```
fn transfer_position(
    ref self: ContractState,
    params: TransferPositionParams
)
```

### liquidate_position

Liquidates a position.

Check source code on [Github](https://github.com/vesuxyz/vesu-v1/blob/main/src/singleton.cairo#L1523).

##### Arguments

- `params` - see LiquidatePositionParams

##### Returns

- `response` - see UpdatePositionResponse

```
fn liquidate_position(
    ref self: ContractState,
    params: LiquidatePositionParams
) -> UpdatePositionResponse
```

### flash_loan

Executes a flash loan.

Check source code on [Github](https://github.com/vesuxyz/vesu-v1/blob/main/src/singleton.cairo#L1624).

##### Arguments

- `receiver` - address of the flash loan receiver
- `asset` - address of the asset
- `amount` - amount of the asset to loan
- `is_legacy` - whether the asset is in legacy format
- `data` - data to pass to the flash loan receiver

```
fn flash_loan(
    ref self: ContractState,
    receiver: ContractAddress,
    asset: ContractAddress,
    amount: u256,
    is_legacy: bool,
    data: Span<felt252>
)
```

### modify_delegation

Modifies the delegation status of a delegator to a delegatee for a specific pool.

Check source code on [Github](https://github.com/vesuxyz/vesu-v1/blob/main/src/singleton.cairo#L1645).

##### Arguments

- `pool_id` - id of the pool
- `delegatee` - address of the delegatee
- `delegation` - delegation status (true = delegate, false = undelegate)

```
fn modify_delegation(
    ref self: ContractState,
    pool_id: felt252,
    delegatee: ContractAddress,
    delegation: bool
)
```

### donate_to_reserve

Donates an amount of an asset to the pool's reserve.

Check source code on [Github](https://github.com/vesuxyz/vesu-v1/blob/main/src/singleton.cairo#L1656).

##### Arguments

- `pool_id` - id of the pool
- `asset` - address of the asset
- `amount` - amount to donate [asset scale]

```
fn donate_to_reserve(
    ref self: ContractState,
    pool_id: felt252,
    asset: ContractAddress,
    amount: u256
)
```

### retrieve_from_reserve

Retrieves an amount of an asset from the pool's reserve. Can only be called by the pool's extension.

Check source code on [Github](https://github.com/vesuxyz/vesu-v1/blob/main/src/singleton.cairo#L1675).

##### Arguments

- `pool_id` - id of the pool
- `asset` - address of the asset
- `receiver` - address of the receiver
- `amount` - amount to retrieve [asset scale]

```
fn retrieve_from_reserve(
    ref self: ContractState,
    pool_id: felt252,
    asset: ContractAddress,
    receiver: ContractAddress,
    amount: u256
)
```

### set_ltv_config

Sets the loan-to-value configuration between two assets (pair) in the pool.

Check source code on [Github](https://github.com/vesuxyz/vesu-v1/blob/main/src/singleton.cairo#L1698).

##### Arguments

- `pool_id` - id of the pool
- `collateral_asset` - address of the collateral asset
- `debt_asset` - address of the debt asset
- `ltv_config` - ltv configuration

```
fn set_ltv_config(
    ref self: ContractState,
    pool_id: felt252,
    collateral_asset: ContractAddress,
    debt_asset: ContractAddress,
    ltv_config: LTVConfig
)
```

### set_asset_config

Sets the configuration / initial state of an asset for a given pool.

Check source code on [Github](https://github.com/vesuxyz/vesu-v1/blob/main/src/singleton.cairo#L1719).

##### Arguments

- `pool_id` - id of the pool
- `params` - see AssetParams

```
fn set_asset_config(
    ref self: ContractState,
    pool_id: felt252,
    params: AssetParams
)
```

### set_asset_parameter

Sets a parameter of an asset for a given pool.

Check source code on [Github](https://github.com/vesuxyz/vesu-v1/blob/main/src/singleton.cairo#L1753).

##### Arguments

- `pool_id` - id of the pool
- `asset` - address of the asset
- `parameter` - parameter name
- `value` - value of the parameter

```
fn set_asset_parameter(
    ref self: ContractState,
    pool_id: felt252,
    asset: ContractAddress,
    parameter: felt252,
    value: u256
)
```

### set_extension

Sets the pool's extension address.

Check source code on [Github](https://github.com/vesuxyz/vesu-v1/blob/main/src/singleton.cairo#L1784).

##### Arguments

- `pool_id` - id of the pool
- `extension` - address of the extension contract

```
fn set_extension(
    ref self: ContractState,
    pool_id: felt252,
    extension: ContractAddress
)
```

### claim_fee_shares

Attributes the outstanding fee shares to the pool's extension.

Check source code on [Github](https://github.com/vesuxyz/vesu-v1/blob/main/src/singleton.cairo#L1794).

##### Arguments

- `pool_id` - id of the pool
- `asset` - address of the asset

```
fn claim_fee_shares(
    ref self: ContractState,
    pool_id: felt252,
    asset: ContractAddress
)
```
