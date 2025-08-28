---
id: liquidate
title: Programmatically liquidate positions
sidebar_label: Liquidate
sidebar_position: 3
---

:::info
We have developed an open-source liquidation bot in collaboration with the Pragma team. You can find more information on the bot [here](/docs/developers/liquidation-bot.md).
:::


## Liquidate Position

To liquidate an insolvent position in a specific Vesu pool, use the `liquidate_position` function:

```
/// Liquidates a position
/// # Arguments
/// * `params` - see LiquidatePositionParams
/// # Returns
/// * `response` - see UpdatePositionResponse
fn liquidate_position(ref self: ContractState, params: LiquidatePositionParams) -> UpdatePositionResponse
```

Provide the following information with the `LiquidatePositionParams` argument:

- collateral_asset: The address of the position's collateral asset
- debt_asset: The address of the position's debt asset
- user: The address of the user who's position is to be liquidated
- min_collateral_to_receive: The minimal amount of collateral, in `Assets` denomination, you want to receive in exchange for repaying `debt_to_repay`.
- debt_to_repay: The amount of debt, in `Assets` denomination, you want to repay (is capped at the position's outstanding debt).
