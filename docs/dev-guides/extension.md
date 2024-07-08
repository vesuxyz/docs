---
id: extension
title: Extension contract
sidebar_label: Extension
sidebar_position: 4
slug: /dev-guides/extension
---

## Extension Interface

The following functions need to be implemented for a valid extension contract.

You can also check the interface here on [Github](https://github.com/vesuxyz/vesu-v1/blob/main/src/extension/interface.cairo).

### singleton

Returns the address of the singleton contract

##### Returns

- `singleton` - address of the singleton contract

```
fn singleton(
        self: @TContractState
    ) -> ContractAddress;
```

### price

Returns the price for a given asset in a given pool

##### Arguments

- `pool_id` - id of the pool
- `asset` - address of the asset

##### Returns

- `AssetPrice` - latest price of the asset and its validity

```
fn price(
        self: @TContractState,
        pool_id: felt252,
        asset: ContractAddress
    ) -> AssetPrice;
```

### interest_rate

Returns the current interest rate for a given asset in a given pool, given it's utilization

##### Arguments

- `pool_id` - id of the pool
- `asset` - address of the asset
- `utilization` - utilization of the asset
- `last_updated` - last time the interest rate was updated
- `last_full_utilization_rate` - The interest value when utilization is 100% [SCALE]

##### Returns

- `interest_rate` - current interest rate

```
fn interest_rate(
        self: @TContractState,
        pool_id: felt252,
        asset: ContractAddress,
        utilization: u256,
        last_updated: u64,
        last_full_utilization_rate: u256,
    ) -> u256;
```

### rate_accumulator

Returns the current rate accumulator for a given asset in a given pool, given it's utilization

##### Arguments

- `pool_id` - id of the pool
- `asset` - address of the asset
- `utilization` - utilization of the asset
- `last_updated` - last time the interest rate was updated
- `last_rate_accumulator` - last rate accumulator
- `last_full_utilization_rate` - the interest value when utilization is 100% [SCALE]

##### Returns

- `rate_accumulator` - current rate accumulator
- `last_full_utilization_rate` - the interest value when utilization is 100% [SCALE]

```
fn rate_accumulator(
        self: @TContractState,
        pool_id: felt252,
        asset: ContractAddress,
        utilization: u256,
        last_updated: u64,
        last_rate_accumulator: u256,
        last_full_utilization_rate: u256,
    ) -> (u256, u256);
```

## Hooks

### before_modify_position

Modify position callback. Called by the Singleton contract before updating the position.

See `before_modify_position` in [`position_hooks.cairo`](https://github.com/vesuxyz/vesu-v1/blob/main/src/extension/components/position_hooks.cairo).

##### Arguments

- `context` - contextual state of the user (position owner)
- `collateral` - amount of collateral to be set/added/removed
- `debt` - amount of debt to be set/added/removed
- `data` - modify position data
- `caller` - address of the caller

##### Returns

- `collateral` - amount of collateral to be set/added/removed
- `debt` - amount of debt to be set/added/removed

```
fn before_modify_position(
        ref self: TContractState,
        context: Context,
        collateral: Amount,
        debt: Amount,
        data: Span<felt252>,
        caller: ContractAddress
    ) -> (Amount, Amount);
```

### after_modify_position

Modify position callback. Called by the Singleton contract after updating the position.
See `after_modify_position` in [`position_hooks.cairo`](https://github.com/vesuxyz/vesu-v1/blob/main/src/extension/components/position_hooks.cairo).

##### Arguments

- `context` - contextual state of the user (position owner)
- `collateral_delta` - collateral balance delta of the position
- `collateral_shares_delta` - collateral shares balance delta of the position
- `debt_delta` - debt balance delta of the position
- `nominal_debt_delta` - nominal debt balance delta of the position
- `data` - modify position data
- `caller` - address of the caller

##### Returns

- `bool` - true if the callback was successful

```
fn after_modify_position(
        ref self: TContractState,
        context: Context,
        collateral_delta: i257,
        collateral_shares_delta: i257,
        debt_delta: i257,
        nominal_debt_delta: i257,
        data: Span<felt252>,
        caller: ContractAddress
    ) -> bool;
```

### before_transfer_position

Transfer position callback. Called by the Singleton contract before transferring collateral / debt
between position.
See `before_transfer_position` in [`position_hooks.cairo`](https://github.com/vesuxyz/vesu-v1/blob/main/src/extension/components/position_hooks.cairo).

##### Arguments

_ `from_context` - contextual state of the user (position owner) from which to transfer collateral / debt
_ `to_context` - contextual state of the user (position owner) to which to transfer collateral / debt
_ `collateral` - amount of collateral to be transferred
_ `debt` - amount of debt to be transferred
_ `data` - modify position data
_ `caller` - address of the caller

##### Returns

_ `collateral` - amount of collateral to be transferred
_ `debt` - amount of debt to be transferred

```
fn before_transfer_position(
        ref self: TContractState,
        from_context: Context,
        to_context: Context,
        collateral: UnsignedAmount,
        debt: UnsignedAmount,
        data: Span<felt252>,
        caller: ContractAddress
    ) -> (UnsignedAmount, UnsignedAmount);
```

### after_transfer_position

Transfer position callback. Called by the Singleton contract after transferring collateral / debt
See `after_transfer_position` in [`position_hooks.cairo`](https://github.com/vesuxyz/vesu-v1/blob/main/src/extension/components/position_hooks.cairo).

##### Arguments

- `from_context` - contextual state of the user (position owner) from which to transfer collateral / debt
- `to_context` - contextual state of the user (position owner) to which to transfer collateral / debt
- `collateral_delta` - collateral balance delta that was transferred
- `collateral_shares_delta` - collateral shares balance delta that was transferred
- `debt_delta` - debt balance delta that was transferred
- `nominal_debt_delta` - nominal debt balance delta that was transferred
- `data` - modify position data
- `caller` - address of the caller

##### Returns

- `bool` - true if the callback was successful

```
fn after_transfer_position(
        ref self: TContractState,
        from_context: Context,
        to_context: Context,
        collateral_delta: u256,
        collateral_shares_delta: u256,
        debt_delta: u256,
        nominal_debt_delta: u256,
        data: Span<felt252>,
        caller: ContractAddress
    ) -> bool;
```

### before_liquidate_position

Liquidate position callback. Called by the Singleton contract before liquidating the position.
See `before_liquidate_position` in [`position_hooks.cairo`](https://github.com/vesuxyz/vesu-v1/blob/main/src/extension/components/position_hooks.cairo).

##### Arguments

- `context` - contextual state of the user (position owner)
- `collateral` - amount of collateral to be set/added/removed
- `debt` - amount of debt to be set/added/removed
- `data` - liquidation data
- `caller` - address of the caller

##### Returns

- `collateral` - amount of collateral to be removed
- `debt` - amount of debt to be removed
- `bad_debt` - amount of bad debt accrued during the liquidation

```
fn before_liquidate_position(
        ref self: TContractState,
        context: Context,
        data: Span<felt252>,
        caller: ContractAddress
    ) -> (u256, u256, u256);
```

### after_liquidate_position

Liquidate position callback. Called by the Singleton contract after liquidating the position.
See `before_liquidate_position` in [`position_hooks.cairo`](https://github.com/vesuxyz/vesu-v1/blob/main/src/extension/components/position_hooks.cairo).

##### Arguments

- `context` - contextual state of the user (position owner)
- `collateral_delta` - collateral balance delta of the position
- `collateral_shares_delta` - collateral shares balance delta of the position
- `debt_delta` - debt balance delta of the position
- `nominal_debt_delta` - nominal debt balance delta of the position
- `bad_debt` - accrued bad debt from the liquidation
- `data` - liquidation data
- `caller` - address of the caller

##### Returns

- `bool` - true if the callback was successful

```
fn after_liquidate_position(
        ref self: TContractState,
        context: Context,
        collateral_delta: i257,
        collateral_shares_delta: i257,
        debt_delta: i257,
        nominal_debt_delta: i257,
        bad_debt: u256,
        data: Span<felt252>,
        caller: ContractAddress
    ) -> bool;
```

## Example Extension

If you're interested to see the full implementation check here on [Github](https://github.com/vesuxyz/vesu-v1/blob/main/src/extension/default_extension.cairo).
