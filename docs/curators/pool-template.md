---
id: pool-template
title: Pool Template
sidebar_label: Pool Template
sidebar_position: 4
slug: /curators/pool-template
---

## General Pool Information

| Parameter | Type | Description |
| --- | --- | --- |
| Pool Name | String | Name of the pool shown on the pools page and accessible on-chain |
| Pool Owner (optional) | Starknet Account | Address of the pool owner (curator) who will be able to update parameters. If no curator should be enabled check the “Immutable” box. |
| Extension | Selection | The extension contract with lending hook implementations to use for the pool. |

:::warning
The pool curator role should be assigned to an appropriate multisig setup in order to mitigate related risks.
:::

## Pool Extension Information

| Parameter | Type | Description |
| --- | --- | --- |
| Fee Recipient (optional) | Starknet Account | Address of the account being able to claim fees (if any). If no fees are enabled on the pool’s markets, select the “No fees” checkbox. |
| Recovery Period | Time Period | Related to the pool’s emergency pause mode. Represents the period within which a pool in emergency pause mode can recover. If you do not want to configure an emergency pause mode, select “Deactivate”. The emergency pause mode should only be deactivated on curated pools. |
| Subscription Period | Time Period | Related to the pool’s emergency pause mode. Represents the period within which borrowers have to repay their outstanding debt in order to be able to withdraw their collateral for a pool in shutdown mode. This can only be deactivated if the pool’s emergency pause mode is deactivated through the *Recovery Period* parameter. |

## Markets Information

Allows to configure a list of enabled markets in this pool. For each market, the following parameters have to be configured.

| Parameter | Type | Description |
| --- | --- | --- |
| Debt Cap | Number ($) | An upper bound on the total debt that can be borrowed on this market |
| Debt Floor | Number ($) | A lower bound of debt that each borrow position needs to hold when being created |
| Max Utilization | Number (%) | The maximum utilization allowed on this market. Borrow or withdraw liquidity transactions revert if they result in a higher utilization. |
| Fee Rate | Number (%) | The performance fee taken by the fee recipient on this market. Represents a percentage on the generated interest. |
| Oracle Timeout | Time Period | Required timeliness of oracle prices. A price that is older than this period is not accepted and the pool enters the emergency pause mode. |
| Oracle Num. Sources | Integer | Minimum number of price sources required for a valid oracle price. A price aggregated from fewer sources is not accepted and the pool enters the emergency pause mode. |
| IRM Target Utilization | Number (%) | Target Utilization of the interest rate model. The interest rate curve has a kink at this utilization. |
| IRM Min Target Utilization | Number (%) | Lower bound of a buffer zone around the interest rate model’s target utilization within which the curve controller does not change the curve shape. |
| IRM Max Target Utilization | Number (%) | Upper bound of a buffer zone around the interest rate model’s target utilization within which the curve controller does not change the curve shape. |
| IRM Min Full Utilization Rate | Number (%) | The minimum full utilization rate below which the curve controller does not adjust the curve shape. |
| IRM Max Full Utilization Rate | Number (%) | The maximum full utilization rate below which the curve controller does not adjust the curve shape. |
| IRM Initial Full Utilization Rate | Number (%) | The initial full utilization rate. This reflects the initial interest rate applicable for 100% utilization in the market. |
| IRM Zero Utilization Rate | Number (%) | The interest rate applicable for 0% utilization in the market. |
| IRM Rate Half Life | Time Period | Defines the rate at which the curve controller changes the curve shape if utilization exceeds or is below the target utilization. Specifically, the curve’s Full Utilization Rate doubles (halves) if the market’s utilization is at 100% (0%) over the Rate Half Life period. |
| IRM Target Rate Percent | Number (%) | Defines a market’s target rate, that is the rate on the interest curve at target utilization, as a fixed percentage of the Full Utilization Rate, that is the rate at 100% utilization. |

## Lending Pairs Information

Allows to configure a list of enabled lending pairs in this pool. These lending pairs define which markets (assets) users are able to use to supply and borrow assets or both. A lending pair consists of a collateral asset and a debt asset and is configured with the following parameters.

| Parameter | Type | Description |
| --- | --- | --- |
| Liquidation Loan-to-Value | Number (%) | The loan-to-value ratio at which a borrow position in the lending pair can be liquidated. |
| Emergency Pause Loan-to-Value | Number (%) | The global loan-to-value ratio, measured as the lending pair’s total debt (in USD) divided by the total collateral (in USD), at which the pool enters the emergency pause mode. |
| Liquidation Discount | Number (%) | The bonus that a liquidator earns with a liquidation of borrow positions in the lending pair. The liquidation discount expresses a percentage discount on the liquidated position’s collateral price, at which the liquidator can purchase collateral assets by repaying debt. |

## Example: Genesis Pool

We here list the initial configuration of the first Vesu pool, the Genesis Pool, for reference and inspiration. Note, however, that each market and lending pair exhibits a different risk profile and requires an individual assessment and configuration.

### General / Extension Parameters

| Parameter | Value | Comments |
| --- | --- | --- |
| Pool Name | Genesis |  |
| Pool Owner | Vesu Multisig | The plan is to revoke pool ownership asap |
| Extension | Default Pragma | The default extension with pragma oracle support |
| Fee Recipient | 0x0 | No fees taken on the pool |
| Recovery Period | 30 days | A paused pool has 30 days to recover, otherwise it enters shutdown mode |
| Subscription Period | 14 days | A shutdown pool allows borrowers to repay their debt within 14 days, if NOT repaid, borrowers forfeit their claim on collateral assets |

### Markets

| Parameter | ETH, WBTC, USDC, USDT, STRK, wstETH | Comments |
| --- | --- | --- |
| Debt Cap | N/A | Debt cap was introduced post launch |
| Debt Floor | $100 | We consider reducing this to $10 |
| Max Utilization | 95% |  |
| Fee Rate | 0% | No fees on Genesis pool |
| Oracle Timeout | 4 hours |  |
| Oracle Num. Sources | 4 | We consider reducing this to 2 |
| IRM Target Utilization | 80% |  |
| IRM Min Target Utilization | 78% |  |
| IRM Max Target Utilization | 82% |  |
| IRM Min Full Utilization Rate | 0.5% | We consider increasing this to 50% |
| IRM Max Full Utilization Rate | 300% |  |
| IRM Initial Full Utilization Rate | 50% |  |
| IRM Zero Utilization Rate | 0.1% |  |
| IRM Rate Half Life | 1 day | We consider increasing this to 5 days |
| IRM Target Rate Percent | 20% |  |

### Lending Pairs

| Parameter | Value / comments |
| --- | --- |
| Liquidation LTV | ETH/USDC: 68%, ETH/wstETH: 87%, USDC/USDT: 93% |
| Emergency Pause Loan-to-Value | 90% for all lending pairs |
| Liquidation Discount | Between 90-95% depending on the liquidity and volatility of the lending pair |