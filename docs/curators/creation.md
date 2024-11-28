---
id: pool-creation
title: Pool Creation
sidebar_label: Creation
sidebar_position: 3
slug: /curators/creation
---

# **How to create a new lending pool**

In this section, we'll learn how to create new Vesu markets.

Vesu's permissionless nature enables everyone to create new lending pools calling the respective protocol function directly (e.g. through a block explorer). An easier way to do it is with the Pools page.

# *Requirements*

- Starknet Wallet: A multisig setup is strongly recommended for the curator role to minimize risks.
- Token Standard: New pools can be created with ERC-20 or ERC-4626 tokens (no rebasing tokens or other non-standard designs).
- Small Token Amount: A small amount of the token is required to seed the pool (at least 1,000 units in the smallest denomination, such as 0.001 USDC for a USDC pool). This amount is burned to prevent share inflation attacks and ensure pool integrity.
- Pool Parameters: Define the pool parameters in advance for smooth creation. A template for all required parameters can be found here.
- Oracle Support: The token must be supported by the chosen oracle. Verify supported assets here with Pragma.



On [vesu.xyz/pools](http://vesu.xyz//pools) click on the blue button “+ Create Pool”

1. First set the following parameters:
- Name of your pool.
- Set a Starknet account as owner or choose Immutable. If Immutable is selected no changes are possible after the creation of the new pool.
- Choose the extension contract with lending hook implementations to use for the pool. For the launch there is just one extension from Pragma available. 

2. Define the Extension
- Fee recipient: Set a Starknet account as recipient for fees, or check the Box for “No fees”
- Recovery period: The time during which a pool in emergency pause mode can attempt to recover. If you do not wish to enable an emergency pause mode, select "Deactivate". However, it is strongly recommended to keep this feature active for immutable pools to ensure an orderly shutdown mechanism. This helps limit losses and prevents potential bank runs.
- Subscription period: Defines the timeframe within which borrowers have to repay their outstanding debt in order to be able to withdraw their collateral for a pool in shutdown mode. This is directly tied to the emergency pause mode and can only be deactivated if the _Recovery Period_ parameter is also deactivated.

:::note
Learn more about the shutdown mode in our [whitepaper] (/explore/whitepaper#65-pool-emergency-shutdown.)
:::


3. Choose the assets for your pool and define the following parameter for each token.

| Parameter | Description |
| --- | --- |
| Debt Cap | An upper bound on the total debt that can be borrowed on this market |
| Debt Floor | A lower bound of debt that each borrow position needs to hold when being created |
| Max Utilization | The maximum utilization allowed on this market. Borrow or withdraw liquidity transactions revert if they result in a higher utilization. |
| Fee Rate | The performance fee taken by the fee recipient on this market. Represents a percentage on the generated interest. |
| Oracle Timeout | Required timeliness of oracle prices. A price that is older than this period is not accepted and the pool enters the emergency pause mode. |
| Oracle Num. Sources | Minimum number of price sources required for a valid oracle price. A price aggregated from fewer sources is not accepted and the pool enters the emergency pause mode. |
| IRM Target Utilization | Target Utilization of the interest rate model. The interest rate curve has a kink at this utilization. |
| IRM Min Target Utilization | Lower bound of a buffer zone around the interest rate model’s target utilization within which the curve controller does not change the curve shape. |
| IRM Max Target Utilization | Upper bound of a buffer zone around the interest rate model’s target utilization within which the curve controller does not change the curve shape. |
| IRM Min Full Utilization Rate | The minimum full utilization rate below which the curve controller does not adjust the curve shape. |
| IRM Max Full Utilization Rate | The maximum full utilization rate below which the curve controller does not adjust the curve shape. |
| IRM Initial Full Utilization Rate | The initial full utilization rate. This reflects the initial interest rate applicable for 100% utilization in the market. |
| IRM Zero Utilization Rate | The interest rate applicable for 0% utilization in the market. |
| IRM Rate Half Life | Defines the rate at which the curve controller changes the curve shape if utilization exceeds or is below the target utilization. Specifically, the curve’s Full Utilization Rate doubles (halves) if the market’s utilization is at 100% (0%) over the Rate Half Life period. |
| IRM Target Rate Percent | Defines a market’s target rate, that is the rate on the interest curve at target utilization, as a fixed percentage of the Full Utilization Rate, that is the rate at 100% utilization. |


4. Define Lending Pairs

Configure which markets (assets) users are able to use to supply and borrow assets or both. A lending pair consists of a collateral asset and a debt asset. Each pair is configured with the following parameters:

| Parameter | Description |
| --- | --- |
| Liquidation Loan-to-Value | The loan-to-value ratio at which a borrow position in the lending pair can be liquidated. |
| Emergency Pause Loan-to-Value | The global loan-to-value ratio, measured as the lending pair’s total debt (in USD) divided by the total collateral (in USD), at which the pool enters the emergency pause mode. |
| Liquidation Discount | The bonus that a liquidator earns with a liquidation of borrow positions in the lending pair. The liquidation discount expresses a percentage discount on the liquidated position’s collateral price, at which the liquidator can purchase collateral assets by repaying debt. |


5. Create pool

Check all settings and verify that everything is correct. Especially if it is an immutable pool, as then you can’t change any settings after the creation. If you click in one of the sections, you can go back to this step to make changes.

When everything is correct, click “next” and confirm the transaction in your wallet.