---
id: borrow-repay
title: Borrow and repay
sidebar_label: Borrow & Repay
sidebar_position: 2
---

Positions in Vesu are created, managed, and closed through a single function, called `manage_position`, on the respective `Pool`'s contract. We here discuss how compute your calldata to borrow and repay assets on a position.

## Borrow assets

To borrow assets, use the `manage_position` function of the respective `Pool` contract with the following `ModifyPositionParams(collateral_asset,debt_asset,user,collateral,debt)` data:

- `collateral_asset`: The address of the asset that is to be supplied as collateral
- `debt_asset`: The address of the asset that is to be borrowed
- `user`: The address of the position owner
- `collateral`: The amount that should be supplied as collateral encoded as a positive integer
- `debt`: The amount that should be borrowed encoded as a positive integer

The amounts have to follow the `Amount` type as explained [here](/docs/developers/core/pool.md). To supply collateral and borrow assets, you will have to specify both the `collateral` and `debt` amount's `value` fields as positive numbers. 

As an example, the data for a user with account address 0x1 to supply 1000 STRK as collateral and borrow 100 USDC will look like this:

```
ModifyPositionParams(
    0x04718f5a0fc34cc1af16a1cdee98ffb20c31f5cd61d6ab07201858f4287c938d,
    0x053c91253bc9682c04929ca02ed00b3e423f6710d2ee7e0d5ebb06f3ecf368a8,
    0x1,
    Amount(AmountDenomination:Assets, 1000),
    Amount(AmountDenomination:Assets, 100)
)
```

## Repay assets

To repay debt of an existing position, follow the exact same approach as explained in the "Borrow assets" section but specify only a non-zero amount in the `debt` field:

- `collateral_asset`: The address of the collateral asset of the position
- `debt_asset`: The address of the debt asset of the position
- `user`: The address of the position owner
- `collateral`: A zero amount
- `debt`: The amount that should be repaid encoded as a negative integer

As an example, the data for a user with account address 0x1, borrowing USDC with STRK as collateral, and wanting to repay 50 USDC will look like this:

```
ModifyPositionParams(
    0x04718f5a0fc34cc1af16a1cdee98ffb20c31f5cd61d6ab07201858f4287c938d,
    0x053c91253bc9682c04929ca02ed00b3e423f6710d2ee7e0d5ebb06f3ecf368a8,
    0x1,
    Amount(AmountDenomination:Assets, 0),
    Amount(AmountDenomination:Assets, -50)
)
```

## Close position

To close a position, a user needs to repay all outstanding debt and withdraw all remaining collateral assets. However, due to the nature of per-block interest accruals, the total debt outstanding and collateral assets withdrawable are only known at the block where the transaction is included. Therefore, amounts have to be expressed in `Native` denomination instead.

The `ModifyPositionParams` data thus are computed as:

- `collateral_asset`: The address of the collateral asset of the position
- `debt_asset`: The address of the debt asset of the position
- `user`: The address of the position owner
- `collateral`: The `collateral_shares` owned by the position encoded as an `Amount` with `AmountDenomination:Native` and negative integer in the `value` field
- `debt`: The `nominal_debt` owed by the position encoded as an `Amount` with `AmountDenomination:Native` and negative integer in the `value` field

As an example, the data for a user with account address 0x1, borrowing USDC with STRK as collateral, and having 900 `collateral_shares` and 90 `nominal_debt` units outstanding will look like:

```
ModifyPositionParams(
    0x04718f5a0fc34cc1af16a1cdee98ffb20c31f5cd61d6ab07201858f4287c938d,
    0x053c91253bc9682c04929ca02ed00b3e423f6710d2ee7e0d5ebb06f3ecf368a8,
    0x1,
    Amount(AmountDenomination:Native, -900),
    Amount(AmountDenomination:Native, -90)
)
```