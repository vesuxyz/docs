---
id: build-hooks
title: Build new lending hooks
sidebar_label: Build Hooks
sidebar_position: 4
slug: /dev-guides/hooks/build-hooks
---

In the last section, we took a detailed look at what Vesu extensions are. In this section, we are going to take a deep dive into how you can go about building your first extension.

As mentioned in the previous section, there are a variety of extension hooks you could implement, but these are the main ones:

```rust
use alexandria_math::i257::i257;
use starknet::{ContractAddress};
use vesu::data_model::{Amount, Context, AssetPrice};

#[starknet::interface]
trait IExtension<TContractState> {
    fn singleton(self: @TContractState) -> ContractAddress;

    fn price(self: @TContractState, pool_id: felt252, asset: ContractAddress) -> AssetPrice;

    fn interest_rate(
        self: @TContractState,
        pool_id: felt252,
        asset: ContractAddress,
        utilization: u256,
        last_updated: u64,
        last_full_utilization_rate: u256,
    ) -> u256;

    fn rate_accumulator(
        self: @TContractState,
        pool_id: felt252,
        asset: ContractAddress,
        utilization: u256,
        last_updated: u64,
        last_rate_accumulator: u256,
        last_full_utilization_rate: u256,
    ) -> (u256, u256);

    fn before_modify_position(
        ref self: TContractState, context: Context, collateral: Amount, debt: Amount, data: Span<felt252>
    ) -> (Amount, Amount);

    fn after_modify_position(
        ref self: TContractState, context: Context, collateral_delta: i257, debt_delta: i257, data: Span<felt252>,
    ) -> bool;

    fn before_liquidate_position(
        ref self: TContractState, context: Context, data: Span<felt252>
    ) -> (Amount, Amount, u256);

    fn after_liquidate_position(
        ref self: TContractState,
        context: Context,
        collateral_delta: i257,
        debt_delta: i257,
        bad_debt: u256,
        data: Span<felt252>
    ) -> bool;
}
```

With these many functions to plug into, you can customize basically all possible actions that are important in a lending pool opening up new possibilities such as automated position management, advanced liquidation options, KYC-ed and RWA pools etc.

Let's explore what each of these functions/hooks can do.

### The singleton
This is the piece that holds them all together. usually returns a `ContractAddress`.

### Price hook
This hook can be used to fetch the current price of either a supply or debt asset. The implementation of this hook is vital to the operation of the market as failure to appropriately implement fail-safes can lead to dangerous outcomes for the users' funds.

#### parameters
`pool_id` - ID of the lending pool/market.

`asset` - contract address of the asset in question.

#### returns
`AssetPrice` - A struct returning the price value and validity.

### Interest rate hook
This hook can be used to calculate the accrued interest on a position. Vesu remains agnostic towards these, giving developers the freedom to innovate.

#### parameters
`pool_id`- ID of the lending pool/market.

`asset` - contract address of the asset in question.

`utilization` -

`last_updated` - last time the rate was updated.

`last_full_utilization_rate` -

#### returns
`u256` - interest rate value

### Rate accumulator hook
Called prior to every position change and effectively asks the extension to compute and collect interest on all positions.

#### parameters
`pool_id`- ID of the lending pool/market.

`asset` - contract address of the asset in question.

`utilization` - 

`last_updated` - last time the rate was updated.

`last_rate_accumulator` - last acummulated interest.

`last_full_utilization_rate` - 

#### returns
`(u256, u256)` - 

### before_modify_position hook
Called right before a position in the pool is modified.

#### parameters
`context` -

`collateral` - 

`debt` - 

`data` - 

#### returns
`(Amount, Amount)` -

### after_modify_position hook
Called after a position in the pool is modified.

#### parameters
`context` - 

`collateral_delta` -

`debt_delta` - 

`data` - 

#### returns
`bool` - 

### before_liquidate_position
Called prior to the liquidation of a pool position.

#### parameters
`context` -

`data` - 

#### returns
`(Amount, Amount, u256) -

### after_liquidate_position

#### parameters
`context` -

`collateral_delta` - 

`debt_delta` - 

`bad_debt` - 

`data` - 

#### returns
`bool` - 

In the coming months, we will be doing some more in-depth tutorials on building extensions for the Vesu lending markets. Stay tuned.