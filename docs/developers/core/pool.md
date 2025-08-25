---
id: pool
title: Pool contract
sidebar_label: Pool
sidebar_position: 2
---

The `Pool` contract implements the state and logic of a single pool instance. User's deposits and debt in a pool are managed in this specific `Pool` instance. It allows users to retrieve and manage their positions and curators to change the pool configuration and claim fees.

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

The `Amount` is then defined as the `AmountDenomination` and the actual value. Thereby, the `value` is a signed integer and can express both an amount to deposit or withdraw:

- Collateral asset
    - if `value >0`: deposit assets
    - if `value <0`: withdraw assets
- Debt asset
    - if `value >0`: borrow assets
    - if `value <0`: repay assets

pub struct Amount {
    pub denomination: AmountDenomination,
    pub value: i257,
}
```

### ModifyPositionParams

The `ModifyPositionParams` struct is used to express the changes a user wants to make to a position in a specific `Pool`. It includes the position's `collateral_asset` and `debt_asset`, the `user` who should own the position, and the `collateral` and `debt` amounts, expressed in `Amount` types, with which the position should be modified.

Note that if `user` is not the sender of the transaction, `user` first has to delegate his position to the sender through `modify_delegation`.

This struct allows to express all sorts of position modifications including deposit, withdrawal, borrow, repay and is used for all position interactions with the `modify_position` function.


```
pub struct ModifyPositionParams {
    pub collateral_asset: ContractAddress,
    pub debt_asset: ContractAddress,
    pub user: ContractAddress,
    pub collateral: Amount,
    pub debt: Amount,
}
```

### LiquidatePositionParams

The `LiquidatePositionParams` struct is used to execute liquidations of insolvent position through the `liquidate_position` function.

The liquidator defiens which position to liquidate with the respective `collateral_asset`, `debt_asset` and `user` fields. He indicates the amount of debt, in `Assets` denomination, he wishes to repay with the `debt_to_repay` field and defines the minimal amount of collateral, in `Assets` denomination, he wants to receive in exchange with the `min_collateral_to_receive`.

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
    // The owner of the pool
    curator: ContractAddress,
    // The pending curator
    pending_curator: ContractAddress,
    // Indicates whether the contract is paused
    paused: bool,
    // tracks the configuration / state of each asset
    // asset -> asset configuration
    asset_configs: Map<ContractAddress, AssetConfig>,
    // tracks the max. allowed loan-to-value ratio for each asset pairing
    // (collateral_asset, debt_asset) -> ltv configuration
    ltv_configs: Map<(ContractAddress, ContractAddress), LTVConfig>,
    // tracks the state of each position
    // (collateral_asset, debt_asset, user) -> position
    positions: Map<(ContractAddress, ContractAddress, ContractAddress), Position>,
    // tracks the delegation status for each delegator to a delegatee
    // (delegator, delegatee) -> delegation
    delegations: Map<(ContractAddress, ContractAddress), bool>,
    // fee recipient
    fee_recipient: ContractAddress,
    // tracks the address that can transition the shutdown mode
    shutdown_mode_agent: ContractAddress,
    // contains the shutdown configuration
    shutdown_config: ShutdownConfig,
    // contains the current shutdown mode
    fixed_shutdown_mode: ShutdownState,
    // contains the liquidation configuration for each pair
    // (collateral_asset, debt_asset) -> liquidation configuration
    liquidation_configs: Map<(ContractAddress, ContractAddress), LiquidationConfig>,
    // tracks the total collateral shares and the total nominal debt for each pair
    // (collateral asset, debt asset) -> pair configuration
    pairs: Map<(ContractAddress, ContractAddress), Pair>,
    // tracks the debt caps for each asset
    debt_caps: Map<(ContractAddress, ContractAddress), u256>,
    // Oracle contract address
    oracle: ContractAddress,
    #[substorage(v0)]
    ownable: OwnableComponent::Storage,
    // storage for the interest rate model component
    #[substorage(v0)]
    interest_rate_model: interest_rate_model_component::Storage,
}
```

## User functions

Users interact with a Vesu pool primarily through the function `position`, to retrieve a position, and `modify_position`, to create or update an existing position.

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

```
/// Adjusts a positions collateral and debt balances
/// # Arguments
/// * `params` - see ModifyPositionParams
/// # Returns
/// * `response` - see UpdatePositionResponse
fn modify_position(ref self: ContractState, params: ModifyPositionParams) -> UpdatePositionResponse
```

## Liquidator functions

To liquidate an insolvent position, a liquidator uses the `liquidate_position` function.

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
To create a new pool, curators should always use the `create_pool` function on the `PoolFactory` contract.
:::

:::info
Note that only the `curator` role of the `Pool` contract has permission to use the below functions.
:::

### Add Asset

To add a new asset to the pool, use the `add_asset` function:

```
/// Adds a new asset to the pool
/// This function assumes that the oracle config was already set up for the asset.
/// # Arguments
/// * `params` - see AssetParams
fn add_asset(ref self: ContractState, params: AssetParams, interest_rate_config: InterestRateConfig)
```

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

### Change Fee Recipient

To change the `fee_recipient` for a pool, use the `set_fee_recipient_parameter` function:

```
/// Sets the address to which fees are sent.
/// # Arguments
/// * `fee_recipient` - new fee address
fn set_fee_recipient(ref self: ContractState, fee_recipient: ContractAddress)
```

### Change the Curator

To initiate the transfer of the curator role of a pool, use the `nominate_curator` function. Note, transferring the curator role is a 2-step process and requires the new curator to accept the transfer.

```
/// Initiate transferring ownership of the pool.
/// The nominated curator should invoke `accept_curator_ownership` to complete the transfer.
/// At that point, the original curator will be removed and replaced with the nominated curator.
/// # Arguments
/// * `curator` - address of the new curator
fn nominate_curator(ref self: ContractState, pending_curator: ContractAddress)
```