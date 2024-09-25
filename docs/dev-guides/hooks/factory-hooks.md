---
id: factory-hooks
title: Explore the factory hooks
sidebar_label: Factory Hooks
sidebar_position: 3
slug: /dev-guides/hooks/factory-hooks
---

As already discussed in our [whitepaper](/explore/whitepaper#6-factory-extension) Vesu comes with a already implemented extension which we call the factory extension or default extension.

In this article we explore this contract into more detail, to learn how to write our own extension contract and get some inspiration.

The interface we need to implement defines the functions

- singleton
- price
- interest_rate
- rate_accumulator
- before_modify_position
- after_modify_position
- before_transfer_position
- after_transfer_position
- before_liquidate_position
- after_liquidate_position

Let's see how the default extension implements it.

### singleton

Returns the address of the singleton contract

```rust
fn singleton(self: @ContractState) -> ContractAddress {
    self.singleton.read()
}
```

### price

Must return the price for a given asset in a given pool.

Vesu delegates the implementation of oracle price feeds to a lending pool’s extension.

The default extension integrates with the Pragma oracle which offers robust price feeds for a variety of assets on Starknet.

```rust
fn price(
        self: @ContractState,
        pool_id: felt252,
        asset: ContractAddress
    ) -> AssetPrice
{
    let (value, is_valid) = self.pragma_oracle.price(pool_id, asset);
    AssetPrice { value, is_valid }
}
```

### interest_rate

Returns the current interest rate for a given asset in a given pool, given it's utilization.

The default's extension interest rate model is implemented as here on [Github](https://github.com/vesuxyz/vesu-v1/blob/main/src/extension/components/interest_rate_model.cairo).

```rust
fn interest_rate(
    self: @ContractState,
    pool_id: felt252,
    asset: ContractAddress,
    utilization: u256,
    last_updated: u64,
    last_full_utilization_rate: u256,
) -> u256 {
    let (interest_rate, _) = self
        .interest_rate_model
        .interest_rate(pool_id, asset, utilization, last_updated, last_full_utilization_rate);
    interest_rate
}
```

### rate_accumulator

Returns the current rate accumulator for a given asset in a given pool, given it's utilization.

The default's extension rate accumulator is implemented as here on [Github](https://github.com/vesuxyz/vesu-v1/blob/main/src/extension/components/interest_rate_model.cairo).

```rust
fn rate_accumulator(
            self: @ContractState,
            pool_id: felt252,
            asset: ContractAddress,
            utilization: u256,
            last_updated: u64,
            last_rate_accumulator: u256,
            last_full_utilization_rate: u256,
        ) -> (u256, u256) {
            self
                .interest_rate_model
                .rate_accumulator(
                    pool_id, asset, utilization, last_updated, last_rate_accumulator, last_full_utilization_rate
                )
        }
```

## Hooks

### before_modify_position

The default extension hasn't implemented a particular `before_modify_position` hook, it just returns the user's values (collateral, debt).

```
fn before_modify_position(
        ref self: ContractState,
        context: Context,
        collateral: Amount,
        debt: Amount,
        data: Span<felt252>,
        caller: ContractAddress
    ) -> (Amount, Amount) {
        assert!(get_caller_address() == self.singleton.read(), "caller-not-singleton");
        (collateral, debt)
    }
```

### after_modify_position

`after_modify_position` hook is implemented as defined [here](https://github.com/vesuxyz/vesu-v1/blob/main/src/extension/components/position_hooks.cairo#L423).

`after_modify_position` does a few emergency checks, and if none is active, it returns true.

If `true` collateral and debt amounts are allowed to be modified in any way.

```
fn after_modify_position(
        ref self: ComponentState<TContractState>,
        mut context: Context,
        collateral_delta: i257,
        collateral_shares_delta: i257,
        debt_delta: i257,
        nominal_debt_delta: i257,
        data: Span<felt252>,
        caller: ContractAddress
    ) -> bool {
    self.update_pair(ref context, collateral_shares_delta, nominal_debt_delta);

    let shutdown_mode = self.update_shutdown_status(ref context);

    // check invariants for collateral and debt amounts

    // check shutdown mode against shutdown types

    //
    true
}
```

### before_transfer_position

Transfer position callback. Called by the Singleton contract before transferring collateral / debt between position.

The function returns

- `collateral` - amount of collateral to be transferred
- `debt` - amount of debt to be transferred

In the implementation of the default extension the amounts are returned unchanged.

```rust
fn before_transfer_position(
        ref self: ComponentState<TContractState>,
        from_context: Context,
        to_context: Context,
        collateral: UnsignedAmount,
        debt: UnsignedAmount,
        data: Span<felt252>,
        caller: ContractAddress
    ) -> (UnsignedAmount, UnsignedAmount) {
        if from_context.debt_asset == Zeroable::zero() && from_context.user == get_contract_address() {
            ISingletonDispatcher { contract_address: self.get_contract().singleton() }
                .modify_delegation(from_context.pool_id, caller, true);
        }
        (collateral, debt)
    }
```

### after_transfer_position

Implements logic to execute after a transfer of collateral or debt from one position to another.
Revokes the caller's delegate to modify the position owned by the extension itself.

#### Returns

- `bool` - true if it was successful, false otherwise

```rust
fn after_transfer_position(
            ref self: ComponentState<TContractState>,
            mut from_context: Context,
            mut to_context: Context,
            collateral_delta: u256,
            collateral_shares_delta: u256,
            debt_delta: u256,
            nominal_debt_delta: u256,
            data: Span<felt252>,
            caller: ContractAddress
        ) -> bool {
            // skip shutdown mode evaluation and updating the pairs collateral shares and nominal debt balances
            // if the pairs are the same
            let (from_shutdown_mode, to_shutdown_mode) = if (from_context.pool_id == to_context.pool_id
                && from_context.collateral_asset == to_context.collateral_asset
                && from_context.debt_asset == to_context.debt_asset) {
                let from_shutdown_mode = self.update_shutdown_status(ref from_context);
                (from_shutdown_mode, from_shutdown_mode)
            } else {
                // either the collateral asset or the debt asset has to match (also enforced by the singleton)
                assert!(
                    from_context.collateral_asset == to_context.collateral_asset
                        || from_context.debt_asset == to_context.debt_asset,
                    "asset-mismatch"
                );
                self
                    .update_pair(
                        ref from_context, i257_new(collateral_shares_delta, true), i257_new(nominal_debt_delta, true)
                    );
                self
                    .update_pair(
                        ref to_context, i257_new(collateral_shares_delta, false), i257_new(nominal_debt_delta, false)
                    );
                (self.update_shutdown_status(ref from_context), self.update_shutdown_status(ref to_context))
            };

            // if shutdown mode has been triggered then the 'from' position should have no debt and only
            // transfers within the same pairing are allowed
            if from_shutdown_mode != ShutdownMode::None || to_shutdown_mode != ShutdownMode::None {
                assert!(from_context.position.nominal_debt == 0, "shutdown-non-zero-debt");
                assert!(
                    from_context.collateral_asset == to_context.collateral_asset
                        && from_context.debt_asset == to_context.debt_asset,
                    "shutdown-pair-mismatch"
                );
            }

            // mint vTokens if collateral shares are transferred to the corresponding vToken pairing
            if to_context.debt_asset == Zeroable::zero() && to_context.user == get_contract_address() {
                assert!(from_context.collateral_asset == to_context.collateral_asset, "v-token-to-asset-mismatch");
                let mut tokenization = self.get_contract_mut();
                tokenization
                    .mint_or_burn_v_token(
                        to_context.pool_id,
                        to_context.collateral_asset,
                        caller,
                        i257_new(collateral_shares_delta, false)
                    );
            }

            // burn vTokens if collateral shares are transferred from the corresponding vToken pairing
            if from_context.debt_asset == Zeroable::zero() && from_context.user == get_contract_address() {
                assert!(from_context.collateral_asset == to_context.collateral_asset, "v-token-from-asset-mismatch");
                ISingletonDispatcher { contract_address: self.get_contract().singleton() }
                    .modify_delegation(from_context.pool_id, caller, false);
                let mut tokenization = self.get_contract_mut();
                tokenization
                    .mint_or_burn_v_token(
                        to_context.pool_id, to_context.collateral_asset, caller, i257_new(collateral_shares_delta, true)
                    );
            }

            true
        }
```

### before_liquidate_position

Implements logic to execute before a position gets liquidated. See implementation [here](https://github.com/vesuxyz/vesu-v1/blob/main/src/extension/components/position_hooks.cairo#L588)

Liquidations are only allowed in normal and recovery mode.

```rust
// don't allow for liquidations if the pool is not in normal or recovery mode
let shutdown_mode = self.update_shutdown_status(ref context);
assert!(
    (shutdown_mode == ShutdownMode::None || shutdown_mode == ShutdownMode::Recovery)
        && context.collateral_asset_price.is_valid
        && context.debt_asset_price.is_valid,
    "emergency-mode"
);
```

The liquidator has to be specify how much debt to repay and the minimum amount of collateral to receive in exchange. The value of the collateral is discounted by the liquidation factor in comparison to the current price (according to the oracle).

```rust
// apply liquidation factor to debt value to get the collateral amount to release
let collateral_value_to_receive = debt_to_repay
    * context.debt_asset_price.value
    / context.debt_asset_config.scale;
let mut collateral_to_receive = (collateral_value_to_receive * SCALE / context.collateral_asset_price.value)
    * context.collateral_asset_config.scale
    / liquidation_factor;
```

In an event where there's not enough collateral to cover the debt, the liquidation will result in bad debt. The bad debt is attributed to the pool and distributed amongst the lenders of the corresponding collateral asset. The liquidator receives all the collateral but only has to repay the proportioned debt value.

```rust
// account for bad debt if there isn't enough collateral to cover the debt
let mut bad_debt = 0;
if collateral_value < debt_value {
    // limit the bad debt by the outstanding collateral and debt values (in usd)
    if collateral_value < debt_to_repay * context.debt_asset_price.value / context.debt_asset_config.scale {
        bad_debt = (debt_value - collateral_value)
            * context.debt_asset_config.scale
            / context.debt_asset_price.value;
        debt_to_repay = debt;
    } else {
        // derive the bad debt proportionally to the debt repaid
        bad_debt = debt_to_repay * (debt_value - collateral_value) / collateral_value;
        debt_to_repay = debt_to_repay + bad_debt;
    }
}
```

### after_liquidate_position

Implements logic to execute after a position gets liquidated.

```rust
fn after_liquidate_position(
        ref self: ComponentState<TContractState>,
        mut context: Context,
        collateral_delta: i257,
        collateral_shares_delta: i257,
        debt_delta: i257,
        nominal_debt_delta: i257,
        bad_debt: u256,
        data: Span<felt252>,
        caller: ContractAddress
    ) -> bool {
        self.update_pair(ref context, collateral_shares_delta, nominal_debt_delta);
        self.update_shutdown_status(ref context);
        true
    }
```
