---
id: datamodel
title: Data Models
sidebar_label: Data Models
sidebar_position: 6
slug: /dev-guides/datamodels
---

For a full overview over all data models check on [Github](https://github.com/vesuxyz/vesu-v1/blob/main/src/data_model.cairo).

### AssetParams

```
struct AssetParams {
    asset: ContractAddress,
    floor: u256, // [SCALE]
    initial_rate_accumulator: u256, // [SCALE]
    initial_full_utilization_rate: u256, // [SCALE]
    max_utilization: u256, // [SCALE]
    is_legacy: bool,
    fee_rate: u256, // [SCALE]
}
```

### LTVParams

```
struct LTVParams {
    collateral_asset_index: usize,
    debt_asset_index: usize,
    max_ltv: u64, // [SCALE]
}
```

### ModifyPositionParams

```
struct ModifyPositionParams {
    pool_id: felt252,
    collateral_asset: ContractAddress,
    debt_asset: ContractAddress,
    user: ContractAddress,
    collateral: Amount,
    debt: Amount,
    data: Span<felt252>
}
```

### TransferPositionParams

```
struct TransferPositionParams {
    pool_id: felt252,
    from_collateral_asset: ContractAddress,
    from_debt_asset: ContractAddress,
    to_collateral_asset: ContractAddress,
    to_debt_asset: ContractAddress,
    from_user: ContractAddress,
    to_user: ContractAddress,
    collateral: UnsignedAmount,
    debt: UnsignedAmount,
    from_data: Span<felt252>,
    to_data: Span<felt252>
}
```

### LiquidatePositionParams

```
struct LiquidatePositionParams {
    pool_id: felt252,
    collateral_asset: ContractAddress,
    debt_asset: ContractAddress,
    user: ContractAddress,
    receive_as_shares: bool,
    data: Span<felt252>
}
```

### UpdatePositionResponse

```
struct UpdatePositionResponse {
    collateral_delta: i257, // [asset scale]
    collateral_shares_delta: i257, // [SCALE]
    debt_delta: i257, // [asset scale]
    nominal_debt_delta: i257, // [SCALE]
    bad_debt: u256, // [asset scale]
}
```

### Context

```
struct Context {
    pool_id: felt252,
    extension: ContractAddress,
    collateral_asset: ContractAddress,
    debt_asset: ContractAddress,
    collateral_asset_config: AssetConfig,
    debt_asset_config: AssetConfig,
    collateral_asset_price: AssetPrice,
    debt_asset_price: AssetPrice,
    collateral_asset_fee_shares: u256,
    debt_asset_fee_shares: u256,
    max_ltv: u64,
    user: ContractAddress,
    position: Position
}

```
