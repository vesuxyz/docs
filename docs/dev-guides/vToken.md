---
id: vToken
title: vToken contract
sidebar_label: vToken
sidebar_position: 5
slug: /dev-guides/vToken
---

This page gives an overview of the vault Tokens' storage architecture and available functions.

vTokens are shares of the underlying asset in a pool. A conversion rate determines the asset amount a user can redeem for the vTokens, and during deposit, how much vToken the user gets after depositing the assets.

Our vTokens follow the ERC4626 standard and we encourage to check the [SNIP](https://github.com/starknet-io/SNIPs/pull/95) we created.

Check [here](https://github.com/vesuxyz/vesu-v1/blob/main/src/v_token.cairo) the full source code.

## Storage

The following section shows each storage variable available in the vToken contract.

#### erc20

Storing the ERC20 specific storage variables

```
erc20: ERC20Component::Storage
```

#### pool_id

The id of the pool in which the vToken's underlying asset is deposited into

```
pool_id: felt252
```

#### extension

The vToken is linked to an pool, each pool has an extension, this storage variable stores the extension of this pool.

```
extension: ContractAddress
```

#### asset

The underlying asset of the vToken

```
asset: ContractAddress
```

#### is_legacy

Flag indicating whether the asset is a legacy ERC20 token using camelCase or snake_case

```
is_legacy: bool
```

## Functions

### extension

Returns the address of the extension associated with the vToken

#### Returns

- address of the extension

```
fn extension(self: @ContractState) -> ContractAddress
```

### pool_id

Returns the id of the pool in which the vToken's underlying asset is deposited into

#### Returns

- id of the pool

```
fn pool_id(self: @ContractState) -> felt252
```

### approve_extension

Re-approves the vToken to be spendable by the extension

```
fn approve_extension(ref self: ContractState)
```

### mint_v_token

Permissioned minting of vTokens. Can only be called by the associated extension.

#### Arguments

- `recipient` - address to mint the vToken to
- `amount` - amount of vToken to mint [SCALE]

#### Returns

- true if the minting was successful

```
fn mint_v_token(
        ref self: ContractState,
        recipient: ContractAddress,
        amount: u256
    ) -> bool
```

### burn_v_token

Permissioned burning of vTokens. Can only be called by the associated extension.
`from` needs to approve the extension to burn the vToken.

#### Arguments

- `from` - address to burn the vToken from
- `amount` - amount of vToken to burn [SCALE]

#### Returns

- true if the burning was successful

```
fn burn_v_token(
        ref self: ContractState,
        from: ContractAddress,
        amount: u256
    ) -> bool
```

## Functions implementing ERC4626

### asset

Returns the address of the underlying asset of the vToken

#### Returns

- address of the asset

```
fn asset(self: @ContractState) -> ContractAddress
```

### total_assets

Returns the total amount of underlying assets deposited via the vToken

#### Returns

- total amount of assets [asset scale]

```
fn total_assets(self: @ContractState) -> u256
```

### convert_to_shares

Converts an amount of assets to the equivalent amount of vToken shares

#### Arguments

- `assets` - amount of assets to convert [asset scale]

#### Returns

- amount of vToken shares [SCALE]

```
fn convert_to_shares(
        self: @ContractState,
        assets: u256
    ) -> u256
```

### convert_to_assets

Converts an amount of vToken shares to the equivalent amount of assets

#### Arguments

- `shares` - amount of vToken shares to convert [SCALE]

#### Returns

- amount of assets [asset scale]

```
fn convert_to_assets(
        self: @ContractState,
        shares: u256
    ) -> u256
```

### max_deposits

Returns the maximum amount of assets that can be deposited via the vToken

#### Arguments

- `receiver` - address to receive the vToken shares

#### Returns

- maximum amount of assets [asset scale]

```
fn max_deposit(
        self: @ContractState,
        receiver: ContractAddress
    ) -> u256
```

### preview_deposit

Returns the amount of vToken shares that will be minted for the given amount of deposited assets

#### Arguments

- `assets` - amount of assets to deposit [asset scale]

#### Returns

- amount of vToken shares minted [SCALE]

```
fn preview_deposit(
        self: @ContractState,
        assets: u256
    ) -> u256
```

### deposit

Deposits assets into the pool and mints vTokens (shares) to the receiver

#### Arguments

- `assets` - amount of assets to deposit [asset scale]
- `receiver` - address to receive the vToken shares

#### Returns

- amount of vToken shares minted [SCALE]

```
fn deposit(
        ref self: ContractState,
        assets: u256,
        receiver: ContractAddress
    ) -> u256
```

### max_mint

Returns the maximum amount of vToken shares that can be minted

#### Arguments

- `receiver` - address to receive the vToken shares

#### Returns

- maximum amount of vToken shares minted [SCALE]

```
fn max_mint(
        self: @ContractState,
        receiver: ContractAddress
    ) -> u256
```

### preview_mint

Returns the amount of assets that will be deposited for a given amount of minted vToken shares

#### Arguments

- `shares` - amount of vToken shares to mint [SCALE]

#### Returns

- amount of assets deposited [asset scale]

```
fn preview_mint(
        self: @ContractState,
        shares: u256
    ) -> u256
```

### mint

Mints vToken shares to the receiver by depositing assets into the pool

#### Arguments

- `shares` - amount of vToken shares to mint [SCALE]
- `receiver` - address to receive the vToken shares

#### Returns

- amount of assets deposited [asset scale]

```
fn mint(
        ref self: ContractState,
        shares: u256,
        receiver: ContractAddress
    ) -> u256
```

### max_withdraw

Returns the maximum amount of assets that can be withdrawn by the owner of the vToken shares

#### Arguments

- `owner` - address of the owner of the vToken shares

#### Returns

- maximum amount of assets [asset scale]

```
fn max_withdraw(
        self: @ContractState,
        owner: ContractAddress
    ) -> u256
```

### preview_withdraw

Returns the amount of vToken shares that will be burned for a given amount of withdrawn assets

#### Arguments

- `assets` - amount of assets to withdraw [asset scale]

#### Returns

- amount of vToken shares burned [SCALE]

```
fn preview_withdraw(
        self: @ContractState,
        assets: u256
    ) -> u256
```

### withdraw

Withdraws assets from the pool and burns vTokens (shares) from the owner of the vTokens

#### Arguments

- `assets` - amount of assets to withdraw [asset scale]
- `receiver` - address to receive the withdrawn assets
- `owner` - address of the owner of the vToken shares

#### Returns

- amount of vTokens (shares) burned [SCALE]

```
fn withdraw(
        ref self: ContractState,
        assets: u256,
        receiver: ContractAddress,
        owner: ContractAddress
    ) -> u256
```

### max_redeem

Returns the maximum amount of vToken shares that can be redeemed by the owner of the vTokens (shares)

#### Arguments

- `owner` - address of the owner

#### Returns

- maximum amount of vToken shares [SCALE]

```
fn max_redeem(
        self: @ContractState,
        owner: ContractAddress
    ) -> u256
```

### preview_redeem

Returns the amount of assets that will be withdrawn for a given amount of redeemed / burned vTokens (shares)

#### Arguments

- `shares` - amount of vToken shares to redeem [SCALE]

#### Returns

- amount of assets withdrawn [asset scale]

```
fn preview_redeem(
        self: @ContractState,
        shares: u256
    ) -> u256
```

### redeem

Redeems / burns vTokens (shares) from the owner and withdraws assets from the pool

#### Arguments

- `shares` - amount of vToken shares to redeem [SCALE]
- `receiver` - address to receive the withdrawn assets
- `owner` - address of the owner of the vToken shares

#### Returns

- amount of assets withdrawn [asset scale]

```
fn redeem(
        ref self: ContractState,
        shares: u256,
        receiver: ContractAddress,
        owner: ContractAddress
    ) -> u256
```
