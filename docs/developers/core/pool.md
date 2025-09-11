---
id: pool
title: Pool contract
sidebar_label: Pool
sidebar_position: 2
---

The `Pool` contract implements the state and logic of a single pool instance. Users' deposits and debt in a pool are managed in this specific `Pool` instance. It allows users to retrieve and manage their positions and curators to change the pool configuration and claim fees.

On this page, we discuss the `Pool`'s main storage variables and external functions.

## Data Types

Vesu V2 defines a number of data types, or `struct`s, that are reused across the different components. We here discuss the main types related to the `Pool` contract.

### AssetConfig

The `AssetConfig` struct contains all relevant state on a specific asset in a pool. It is stored in the `asset_configs` mapping in the `Pool` itself and can be fetched with the `asset_config` function.

```
pub struct AssetConfig { //                                     | slot | packed | notes
    //                                                          | ---- | ------ | -----
    pub total_collateral_shares: u256, //       [SCALE]         | 1    | u128   |
    pub total_nominal_debt: u256, //            [SCALE]         | 1    | u123   |
    pub reserve: u256, //                       [asset scale]   | 2    | u128   |
    pub max_utilization: u256, //               [SCALE]         | 2    | u8     | constant percentage
    pub floor: u256, //                         [SCALE]         | 2    | u8     | constant decimals
    pub scale: u256, //                         [SCALE]         | 2    | u8     | constant decimals
    pub is_legacy: bool, //                                     | 2    | u8     | constant
    pub last_updated: u64, //                   [seconds]       | 3    | u32    |
    pub last_rate_accumulator: u256, //         [SCALE]         | 3    | u64    |
    pub last_full_utilization_rate: u256, //    [SCALE]         | 3    | u64    |
    pub fee_rate: u256, //                      [SCALE]         | 3    | u8     | percentage
    // tracks the number of unclaimed allocated shares (from each asset) that can be claimed by
    // `fee_recipient`.
    pub fee_shares: u256 //                     [SCALE]         | 4    | u128   |
}
```

### Position

The `Position` struct contains the `collateral_shares` and `nominal_debt` of a user's position in the specific lending pair and pool. Note that `collateral_shares` and `nominal_debt` does not translate 1:1 to the underlying assets but a conversion has to be applied.

```
pub struct Position {
    pub collateral_shares: u256, // packed as u128 [SCALE]
    pub nominal_debt: u256 // packed as u123 [SCALE]
}
```

### Amount & AmountDenomination

The `Amount` struct is used to express a desired amount to deposit, withdraw, borrow, or repay in a user interaction and the respective `ModifyPositionParam` parameter. 

The `AmountDenomination` `enum` alows users to express a value in either `Assets` denomination, that is in underlying asset units directly, or in `Native` denomination which is the denomination that Vesu uses and is `collateral_shares` for a collateral asset and `nominal_debt` for a debt asset.

```
pub enum AmountDenomination {
    #[default]
    Native,
    Assets,
}
```

The `Amount` is then defined as the `AmountDenomination` and the actual value. 

```
pub struct Amount {
    pub denomination: AmountDenomination,
    pub value: i257,
}
```

Thereby, the `value` is a signed integer and can express both an amount to deposit or withdraw:

- Collateral asset
    - if `value >0`: deposit assets
    - if `value <0`: withdraw assets
- Debt asset
    - if `value >0`: borrow assets
    - if `value <0`: repay assets

### ModifyPositionParams

The `ModifyPositionParams` struct is used to express the changes a user wants to make to a position in a specific `Pool`. It includes the position's `collateral_asset` and `debt_asset`, the `user` who should own the position, and the `collateral` and `debt` amounts, expressed in `Amount` types, with which the position should be modified.

```
pub struct ModifyPositionParams {
    pub collateral_asset: ContractAddress,
    pub debt_asset: ContractAddress,
    pub user: ContractAddress,
    pub collateral: Amount,
    pub debt: Amount,
}
```

The `ModifyPositionParams` allows to express all sorts of position modifications including deposit, withdrawal, borrow, repay and is used for all position interactions with the `modify_position` function. Read more on this in the _Interact with Vesu_ [section](/docs/developers/interact/borrow-repay.md).

### LiquidatePositionParams

The `LiquidatePositionParams` struct is used to execute liquidations of insolvent position through the `liquidate_position` function.

The liquidator defines which position to liquidate with the respective `collateral_asset`, `debt_asset` and `user` fields. He indicates the amount of debt, in `Assets` denomination, he wishes to repay with the `debt_to_repay` field and defines the minimal amount of collateral, in `Assets` denomination, he wants to receive in exchange with the `min_collateral_to_receive`.

```
pub struct LiquidatePositionParams {
    pub collateral_asset: ContractAddress,
    pub debt_asset: ContractAddress,
    pub user: ContractAddress,
    pub min_collateral_to_receive: u256,
    pub debt_to_repay: u256,
}
```

## Storage

We here show the full storage of the `Pool` contract with inline docs.

```
struct Storage {
    // tracks the name
    pool_name: felt252,
    // tracks the state of each position
    // (collateral_asset, debt_asset, user) -> position
    positions: Map<(ContractAddress, ContractAddress, ContractAddress), Position>,
    // tracks the delegation status for each delegator to a delegatee
    // (delegator, delegatee) -> delegation
    delegations: Map<(ContractAddress, ContractAddress), bool>,
    // tracks the configuration / state of each asset
    // asset -> asset configuration
    asset_configs: Map<ContractAddress, AssetConfig>,
    // Oracle contract address
    oracle: ContractAddress,
    // fee recipient
    fee_recipient: ContractAddress,
    // tracks the configuration / state of each pair
    // (collateral_asset, debt_asset) -> pair configuration
    pair_configs: Map<(ContractAddress, ContractAddress), PairConfig>,
    // tracks the total collateral shares and the total nominal debt for each pair
    // (collateral asset, debt asset) -> pair configuration
    pairs: Map<(ContractAddress, ContractAddress), Pair>,
    // tracks the address that can pause the contract
    pausing_agent: ContractAddress,
    // The owner of the pool
    curator: ContractAddress,
    // The pending curator
    pending_curator: ContractAddress,
    // Indicates whether the contract is paused
    paused: bool,
    #[substorage(v0)]
    ownable: OwnableComponent::Storage,
    // storage for the interest rate model component
    #[substorage(v0)]
    interest_rate_model: interest_rate_model_component::Storage,
}
```

## User functions

Users interact with a Vesu pool primarily through the function `position`, to retrieve a position, and `modify_position`, to create or update an existing position.

### Modify a position

:::info
Learn more on how to use this function [here](/docs/developers/interact/borrow-repay.md).
:::

Use this function to create, modify and close positions. See section _Modify Position Params_ above to learn more about the different configurations of the function arguments to achieve the different position updates.

```
/// Adjusts a positions collateral and debt balances
/// # Arguments
/// * `params` - see ModifyPositionParams
/// # Returns
/// * `response` - see UpdatePositionResponse
fn modify_position(ref self: ContractState, params: ModifyPositionParams) -> UpdatePositionResponse
```

### Retrieve a position

Use this function to retrieve the current state of a user position including its collateral shares (`Native` denomination), nominal debt (`Native` denomination), collateral assets (`Asset` denomination) and debt assets (`Asset` denomination).

```
/// Returns the current state of a position
/// # Arguments
/// * `collateral_asset` - address of the collateral asset
/// * `debt_asset` - address of the debt asset
/// * `user` - address of the position's owner
/// # Returns
/// * `position` - position state
/// * `collateral` - amount of collateral (computed from position.collateral_shares) [asset scale]
/// * `debt` - amount of debt (computed from position.nominal_debt) [asset scale]
fn position(
    self: @ContractState, collateral_asset: ContractAddress, debt_asset: ContractAddress, user: ContractAddress,
) -> (Position, u256, u256)
```

## Liquidator functions

Use this function to liquidate an insolvent position.

```
/// Liquidates a position
/// # Arguments
/// * `params` - see LiquidatePositionParams
/// # Returns
/// * `response` - see UpdatePositionResponse
fn liquidate_position(ref self: ContractState, params: LiquidatePositionParams) -> UpdatePositionResponse
```

## Curator functions

:::warning
To create a new pool and add a new asset to an existing pool, curators should always use the `create_pool` and `add_asset` functions on the `PoolFactory` contract.
:::

:::info
Note that only the `curator` role of the `Pool` contract has permission to use the below functions.
:::

### Change Asset Parameter

To change a specific parameter for an asset, use the `set_asset_parameter` function:

```
/// Sets a parameter of an asset
/// # Arguments
/// * `asset` - address of the asset
/// * `parameter` - parameter name
/// * `value` - value of the parameter
fn set_asset_parameter(ref self: ContractState, asset: ContractAddress, parameter: felt252, value: u256)
```

Note, the following parameters can be changed:

- `max_utilization`
- `floor`
- `fee_rate`

### Change Interest Rate Parameter

To change a specific parameter of an asset's interest rate model, use the `set_interest_rate_parameter` function:

```
/// Sets a parameter for a given interest rate configuration for an asset
/// # Arguments
/// * `asset` - address of the asset
/// * `parameter` - parameter name
/// * `value` - value of the parameter
fn set_interest_rate_parameter(
    ref self: ContractState, asset: ContractAddress, parameter: felt252, value: u256,
)
```

### Change Pair Parameter

To change a specific parameter for a lending pair, use the `set_pair_parameter` function:

```
/// Sets a parameter for a given pair configuration
/// # Arguments
/// * `collateral_asset` - address of the collateral asset
/// * `debt_asset` - address of the debt asset
/// * `parameter` - parameter name
/// * `value` - value of the parameter
fn set_pair_parameter(
    ref self: ContractState,
    collateral_asset: ContractAddress,
    debt_asset: ContractAddress,
    parameter: felt252,
    value: u128,
)
```

Note, the following parameters can be changed:

- `max_ltv`
- `liquidation_factor`
- `debt_cap`

### Change Fee Recipient

To change the `fee_recipient` for a pool, use the `set_fee_recipient_parameter` function:

```
/// Sets the address to which fees are sent.
/// # Arguments
/// * `fee_recipient` - new fee address
fn set_fee_recipient(ref self: ContractState, fee_recipient: ContractAddress)
```

### Nominate new Curator

To initiate the transfer of the curator role of a pool, use the `nominate_curator` function. Note, transferring the curator role is a 2-step process and requires the new curator to accept the transfer.

```
/// Initiate transferring ownership of the pool.
/// The nominated curator should invoke `accept_curator_ownership` to complete the transfer.
/// At that point, the original curator will be removed and replaced with the nominated curator.
/// # Arguments
/// * `curator` - address of the new curator
fn nominate_curator(ref self: ContractState, pending_curator: ContractAddress)
```

### Accept Curator Role

:::info
Note that without accepting a curator nomintation, you will not be able to use the curator permissions in a pool.
:::

Use this function to accept the nomination of the curator role.

```
/// Accept the curator address.
/// At this point, the original curator will be removed and replaced with the nominated curator.
fn accept_curator_ownership(ref self: ContractState)
```

### Change the Pauser Agent

:::warning
The _Pauser Agent_ role has the permission to pause deposits and withdrawals on a pool. Make sure you assign this role only to a trusted agent.
:::

Use this function to assign the _Pauser Agent_ role to a new account.

```
/// Sets the pausing agent
/// # Arguments
/// * `pausing_agent` - address of the pausing agent
fn set_pausing_agent(ref self: ContractState, pausing_agent: ContractAddress)
```

### Pause pool

:::warning
Pausing a pool should only be used in an emergency as it pauses all deposits and withdrawals in a pool. Pools can be paused by the _Pauser Agent_, _Curator_ and _Owner_ but only be unpaused by the curator or owner. 
:::

Use this function to pause deposits and withdrawals (including liquidations) in a pool.

```
/// Pauses the contract
/// Requirements: The contract is not paused
/// Emits a `Paused` event
fn pause(ref self: ContractState)
```

### Unpause pool

Use this function to unpause a paused pool.

```
/// Lifts the pause on the contract
/// Requirements: The contract is paused
/// Emits an `Unpaused` event
fn unpause(ref self: ContractState)
```