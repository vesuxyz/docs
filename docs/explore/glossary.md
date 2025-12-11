---
id: glossary
title: Glossary
sidebar_label: Glossary
sidebar_position: 6
---

A collection of important terms and concepts

## General

### Asset

A specific crypto asset or *ERC20* token, or extensions thereof.

### Collateral Asset

The *Asset* that is deposited as collateral in a specific lending pair or *Position*.

### Loan Asset

The *Asset* that is borrowed in a specific lending pair or *Position*.

### Pool

An isolated lending arrangement that supports the lending and borrowing of different *Assets*, each a lending *Market*.

### Market

A specific *Asset* that can be lent and borrowed in a *Pool*. 

### Position

A specific lend or borrow position characterized by the *Collateral Asset*, *Loan Asset*, and *Pool ID*.

### Funds

The amount of an *Asset* supplied in a specific *Market*.

### Collateral Asset Price

The USD price of the *Collateral Asset* as reported by the *Pool*’s oracle price feed.

### Loan Asset Price

The USD price of the *Loan Asset* as reported by the *Pool*’s oracle price feed.

## Interest Rates

### Interest Rate Curve

The specific model according to which the *Interest Rate* adjusts to the lending and borrowing activity in a given *Market*.

This model is implemented in Vesu’s lending hooks and configured in each *Market* individually. 

### Interest Rate Curve Controller

A submodule of the *Interest Rate Curve* that controls how the *Full Utilization Rate*, and thus the shape of the *Interest Rate Curve*, is adjusted based on the lending and borrowing activity in a *Market*.

### Zero Utilization Rate

The per-second interest rate that applies for a *Utilization* of 0% in a given *Market*. 

The *Zero Utilization Rate* is static and can only be changed by the *Pool Curator.*

### Target Utilization

The *Utilization* that is configured as the target for a given *Market.*

Note, the *Target Utilization* is always larger than 0% and smaller than 100%.

### Minimum Full Utilization Rate

The minimum value that the per-second interest rate can be for a *Utilization* of 100% in a given *Market*.

The *Minimum Full Utilization Rate* is static and can only be changed by the *Pool Curator.*

### Maximum Full Utilization Rate

The maximum value that the per-second interest rate can be for a *Utilization* of 100% in a given *Market*.

The *Minimum Full Utilization Rate* is static and can only be changed by the *Pool Curator.*

### Last Updated

The timestamp reflecting the block in which the *Last Full Utilization Rate* (and the *Rate Accumulator*) was adjusted the last time by the *Interest Rate Curve Controller*.

### Last Full Utilization Rate

The last value of the *Full Utilization Rate* that was snapshotted at the *Last Updated* timestamp by the *Interest Rate Curve Controller*.

### Full Utilization Rate

The current per-second interest rate that applies for a *Utilization* of 100% in a given *Market*.

The *Interest Rate Curve Controller* constantly adjusts the *Full Utilization Rate* within the *Minimum Full Utilization Rate* and *Maximum Full Utilization Rate* depending on whether the *Utilization* exceeds or subceeds the *Market*’s *Target Utilization*.

```jsx
time_delta = current_timestamp - last_updated

if utilization < min_target_utilization:
	utilization_delta = (min_target_utilization - utilization) / min_target_utilization
  decay = rate_half_life + (utilization_delta * time_delta)
  full_utilization_rate = (last_full_utilization_rate * rate_half_life) / decay

else if utilization > max_target_utilization:
	utilization_delta = (utilization - max_target_utilization) / (1 - max_target_utilization)
  growth = rate_half_life + (utilization_delta * time_delta)
  full_utilization_rate = (last_full_utilization_rate * growth) / rate_half_life
            

else:
	full_utilization_rate = last_full_utilization_rate
```

Note, the *Full Utilization Rate* is only updated by the *Interest Rate Curve Controller* if the current *Utilization* exceeds the configured threshold values *Min Target Utilization* and *Max Target Utilization.*

### Target Rate Percent

The value of the per-second interest rate expressed as a percentage of the *Full Utilization Rate* of a given *Market*.

### Target Rate

The per-second interest rate that applies for a *Utilization* exactly at the *Target Utilization* for a given *Market*.

`target_rate = zero_utilization_rate + (full_utilization_rate - zero_utilization_rate) * target_rate_percent`

### Interest Rate

The per-second interest rate based on the current or a projected *Utilization* and the *Interest Rate Curve* of a given *Market*.

```jsx
interest_rate(utilization) = 
	if utilization < target_utilization:
		zero_utilization_rate + utilization * (target_rate - zero_utilization_rate) / target_utilization
	
	else:
		target_rate + (utilization - target_utilization) * (full_utilization_rate - target_rate) / (1 - target_utilization)
```

### Rate Accumulator

An index tracking the accumulation of interest based on the current *Utilization* and *Interest Rate* in a given *Market.*

The *Rate Accumulator* always starts with a value of 1.0 for a newly initiated *Market* and is constantly updated with each user interacting with the *Market* based on the then applicable *Interest Rate.*

`rate_accumulator = last_rate_accumulator * (1 + interest_rate(current_utilization)) ** (current_timestamp - last_updated)`

## Pools & Markets

### Total Nominal Debt

The total debt outstanding in a *Market*, across all *Positions*, excluding accumulated interest.

### Total Debt

The total debt outstanding in a *Market*, across all *Positions*, including accumulated interest.

`total_debt = rate_accumulator * total_nominal_debt`

### Total Collateral Shares

The total shares outstanding, across all *Positions*, for a *Market*. These shares are eligible to claim the *Market*‘s *Total Supplied*.

### Reserves

The portion of *Funds* in a *Market* that is not borrowed, or the idle liquidity in a *Market*.

### Total Supplied

The total *Funds* supplied in a *Market* including *Total Debt* outstanding.

`total_supplied = reserves + total_debt`

### Utilization

The percentage of *Funds* borrowed in a *Market*.

`utilization = total_debt / total_supplied`

### Max Utilization

The maximal percentage of *Funds* that is enabled to be borrowed in a *Market*. By default, this is 100% but can be lower for different *Markets*.

`max_utilization <= 100%`

### Total Liquidity

The total *Funds* available in a *Market* *Borrowers* to borrow and *Lenders* to withdraw.

`total_liquidity = max_utilization * total_supplied`

### Liquidity

The remaining *Funds* available in a *Market* for lenders or borrowers to withdraw.

`liquidity = max(0, total_liquidity - total_debt)`

### Debt Cap

The maximal amount of *Total Debt* of a *Market* beyond which borrowing is restricted.

`total_debt <= debt_cap`

### Debt Floor

The minimal *Position Debt,* expressed in USD, a “Borrow” position must be created with.

### Total Debt Capacity

The remaining debt a *Market* allows to borrow given its *Liquidity* and *Debt Cap*.

`debt_capacity = min(liquidity, max(0, debt_cap - total_debt))`

### Borrow APR

The current simple interest rate, that is the interest rate without per-second compounding effect, that applies on a *Borrower*’s *Nominal Debt* based on the current *Utilization* and *Interest Rate* in a given *Market*.

`borrow_apr = (1 + interest_rate(current_utilization)) ** (360 * 86400) - 1`

### Gross Lending APR

The current simple interest rate, that is the interest rate without per-second compounding effect, that *Lenders* in a given *Market* earn without accounting for fees.

`lending_apr = utilization * borrow_apr`

### Lending APR

The current simple interest rate after fees, that *Lenders* in a given *Market* earn.

`lending_apr = utilization * borrow_apr`

## Positions

### Position Nominal Debt

The debt of a *Position* excluding accumulated interest.

### Position Debt

The debt of a *Position* including accumulated interest.

`position_debt = rate_accumulator * position_nominal_debt`

### Position Collateral Shares

The shares of a *Market* owned by a *Position*.

### Position Collateral

The *Funds* claimable by the *Position Collateral Shares* of a *Position*.

### Position Loan-to-Value

The percentage value of a *Position*’s *Position Debt* given its *Position Collateral*.

`position_ltv = (position_debt * loan_asset_price) / (position_collateral * collateral_asset_price)`

### Liquidation Loan-to-Value

The maximal *Position Loan-to-Value* of a *Position* beyond which it is available for liquidation in a given *Market*.

### Max Loan-to-Value

The maximal *Position Loan-to-Value* of a *Position* beyond which borrowing is restricted in order to ensure a minimal health factor for newly created or updated *Borrow Positions.*

`max_ltv = 0.95 * liquidation_ltv`

### Collateral Liquidation Price

The *Collateral Asset Price* that has to be reached for a *Position* to be liquidated, assuming the *Position*’s current *Position Collateral*, *Position Debt* and a constant *Loan Asset Price*.

`collateral_liquidation_price = (position_debt * loan_asset_price) / (position_collateral * liquidation_ltv)`

### Loan Liquidation Price

The *Loan Asset Price* that has to be reached for a *Position* to be liquidated, assuming the *Position*’s current *Position Collateral*, *Position Debt* and a constant *Collateral Asset Price*.

`loan_liquidation_price = liquidation_ltv * position_collateral * collateral_asset_price / position_debt`

### Position Debt Capacity

The remaining debt a Position allows to borrow, given the *Position*’s current *Position Collateral*, *Position Debt* and the *Pool*’s *Max Loan-to-Value*.

`position_debt_capacity = (max_ltv * position_collateral * collateral_asset_price / loan_asset_price) - position_debt`

## Multiply

### Multiply Position

A *Position* involving two correlated *Collateral Asset* and *Loan Asset* with the goal of increasing the (long) exposure to the *Collateral Asset* while “shorting” the *Loan Asset*. 

A *Multiply Position* in fact is represented as a regular *Borrow Position* with the difference that the borrowed *Loan Asset* is swapped to more of the *Collateral Asset* which is then deposited as additional *Position Collateral.* Or, when closing a *Multiply Position*, a portion of the *Position Collateral* is swapped to the *Loan Asset* to repay the *Position Debt.*

### Multiply Asset

The *Asset* multiplied in a “Multiply” *Position* or, in other words, the *Collateral Asset* in which exposure is built up. 

### Swap Quote

The spot price quoted by the external DEX market for the swap of borrowed *Loan Assets* to the *Multiply Asset* when creating (or increasing) the *Multiply Position*. Or, the spot price quoted for the swap of *Position Collateral* to the *Loan Asset* when closing (or decreasing) the *Multiply Position* or computing it’s *Net Asset Value.*

Note, currently Vesu is integrated with the Ekubo DEX spot market for the execution of *Multiply Positions.*

### Net Asset Value

The amount of *Collateral Assets* a *Multiply Position* allows to withdraw after repaying its *Position Debt,* expressed in *Collateral Asset* units.

`net_asset_value = position_collateral - swap_quote * position_debt`

### Multiplier

The exposure in the *Multiply Asset* expressed as the proportion of the *Multiply Position*’s total *Position Collateral* compared to its *Net Asset Value*.

`multiplier = position_collateral / net_asset_value`

### Max Multiplier

The maximal *Multiplier* of a *Multiply Position* beyond which borrowing is restricted in order to ensure a minimal health factor for newly created or updated *Borrow Positions.*

`max_multiplier = swap_quote * debt_asset_price / (swap_quote * debt_asset_price - max_ltv * collateral_asset_price)`

Note, this formula accounts for a possible mismatch between the *Assets*’ Oracle prices and spot prices, as achieved in a DEX swap. The formula simplifies under the assumption that these prices are the same.

`max_multiplier = 1 / (1 - max_ltv)`

### Net APR

The net yield of a *Multiply Position* when accounting for all accumulating yield on its *Position Collateral* and borrow cost on the *Position Debt*. The *Net APR* is expressed as a simple annualized rate, that is without accounting for per-second compounding.

`net_apr = multiplier * (asset_apr + lending_apr + rewards_apr) - (multiplier - 1) * borrow_apr`

### Max APR

The maximal *Net APR* of a *Multiply Position* based on the *Max Multiplier*.

`max_apy = max_multiplier * (asset_apr + lending_apr + rewards_apr) - (max_multiplier - 1) * borrow_apr`

### Liquidation Price

The price of the *Collateral Asset* expressed in terms of the *Loan Asset* that has to be reached for a *Multiply Position* to be liquidated, assuming the *Position*’s current *Position Collateral* and *Position Debt*.

`liquidation_price = position_debt / (position_collateral * liquidation_ltv)`

# Effective APRs

### Effective Borrow APR

The effective *Borrow APR* a *Borrower* will pay after taking out a *Loan*.

```jsx
effective_borrow_apr(projected_utilization) = 
	(1 + interest_rate(projected_utilization)) ** (360 * 86400) - 1
```

with

`projected_utilization = (total_debt + loan) / total_supplied`

### Effective Lending APR

The effective *Lending APR* a *Lender* will earn after her *Deposit*.

```jsx
effective_lending_apr(projected_utilization) = 
	projected_utilization * ((1 + interest_rate(projected_utilization)) ** (360 * 86400) - 1)
```

with

`projected_utilization = total_debt / (total_supplied + deposit)`

### Effective Net APR

The effectie *Net APR* of a *Multiply Position* will generate after taking into account a user’s *Deposit* (or *Withdrawal*) and new *Multiplier*.

`effective_net_apr = new_multiplier * (asset_apr + effective_lending_apr(projected_utilization_lending) + rewards_apr) - (new_multiplier - 1) * effective_borrow_apr(projected_utilization_borrow)`

with

`projected_utilization_lending = total_debt / (total_supplied + deposit)`

`projected_utilization_borrow = (total_debt + delta_debt) / total_supplied`