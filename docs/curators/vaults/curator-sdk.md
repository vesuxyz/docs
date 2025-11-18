---
id: curator-sdk
title: How to manage an existing Vault
sidebar_label: Manage Vault
sidebar_position: 3
---

Management of the Vault strategy includes the following actions:
- allocation of idle funds to the strategy
- re-allocation of funds among the approved strategy positions
- unwinding of positions to free liquidity to honor redemptions

All these activities are performed by the vault's __Strategist__ role. We here outline how these activities can be executed using the Vault Curator SDK.

## Why use this SDK

It reads a vault's Merkle Tree configuration (`VaultConfigData`) and creates correctly-formatted `Call` objects (proofs, decoders, targets, selectors and calldata). The SDK does not send transactions — it returns `Call` objects you can execute with your account/provider.

## Setup
- **From file:** `const sdk = VaultCuratorSDK.fromFile('./path/to/vault-config.json');`
- **From object:** `const sdk = new VaultCuratorSDK(configObject);`
- **Execute calls:** Use your Starknet account/provider to send the returned `Call` or `Call[]` (for example `account.execute(calls)` from `starknet.js`).

## Call object format
- `contractAddress`: `Manager` contract address (set by SDK)
- `entrypoint`: `manage_vault_with_merkle_verification` (set by SDK)
- `calldata`: string array containing [proofs..., decoder_and_sanitizer, targets, selectors, calldata length, ...calldata]

## Important notes
- The SDK expects `VaultConfigData` with `metadata`, `leafs` and `tree` (the strategy Merkle Tree). If an operation's leaf is missing the method throws.
- Amounts are converted to Starknet `uint256` via `uint256.bnToUint256(...)`. Pass BigNumberish values.

## General functions

**approve(approveParams: ApproveParams): Call**
- Purpose: Build a `Call` that calls the manager's approved `approve(spender, amount)` operation enabling `spender` to spend the vault's funds.
- Params: `{ target: string; spender: string; amount: BigNumberish }` (`target` is the token contract address expected in the vault config leaf)
- Returns: a `Call` object ready to be executed. The calldata includes the spender address and `uint256` amount.
- Errors: throws if a matching leaf isn't found in the config (selector + target + argument address checks).
- Example:

```ts
const call = sdk.approve({ target: underlyingAddress, spender: vaultAddress, amount: '1000000000000000000' });
await account.execute([call]);
```

**bringLiquidity(params: BringLiquidityParams): Call**
- Purpose: Build a `Call` for the vault's "bring liquidity" operation (sends underlying assets from the _Vault Allocator_ back to the _Vault_ to honor redemptions).
- Params: `{ amount: BigNumberish }`
- Returns: a `Call` object that includes the Merkle proofs, decoder, target & selector, and the `uint256` amount calldata.
- Errors: throws if the "bring liquidity" leaf is not present in the config.
- Tip: Use `bringLiquidityHelper(shouldApprove, amount)` to optionally emit an `approve` call followed by `bringLiquidity` in a single `Call[]`.
- Example:

```ts
const calls = sdk.bringLiquidityHelper(true, '1000000000000000000');
await account.execute(calls); // approve + bringLiquidity
```

## ERC4626 functions

**deposit(params: DepositParams): Call**
- Purpose: Build a deposit `Call` that instructs the manager to deposit `assets` into an enabled third-party ERC4626 vault (e.g. like Vesu vTokens).
- Params: `{ target: string; assets: BigNumberish; receiver: string }`
- Returns: a `Call` object containing Merkle proofs, decoder, target/selector and calldata: `uint256` followed by the `receiver` address.
- Errors: throws if a matching `deposit` leaf isn't found in the vault config.
- Example:

```ts
const call = sdk.deposit({ target: vaultAddress, assets: '1000000000000000000', receiver: userAddress });
await account.execute([call]);
```

**withdraw(params: WithdrawParams): Call**
- Purpose: Build a withdraw `Call` to instruct the manager to withdraw `assets` from an enabled third-party ERC4626 vault and send them to `receiver`.
- Params: `{ target: string; assets: BigNumberish; receiver: string; owner: string }`
- Returns: a `Call` where `assets` is encoded as `uint256` and followed by `receiver` and `owner` addresses.
- Errors: throws if the `withdraw` leaf is not found in the config.
- Example:

```ts
const call = sdk.withdraw({ target: strategyAddress, assets: '1000', receiver: vaultAddress, owner: vaultAddress });
await account.execute([call]);
```

## Starknet-Vault-Kit functions

**requestRedeem(params: RequestRedeemParams): Call**
- Purpose: Build a request redeem `Call` to queue a redeem request for an enabled third-party SVK vault.
- Params: `{ target: string; shares: BigNumberish; receiver: string; owner: string }`
- Returns: a `Call` encoding `shares` as `uint256` followed by `receiver` and `owner`.
- Errors: throws if `request_redeem` leaf missing.
- Example:

```ts
const call = sdk.requestRedeem({ target: vaultAddress, shares: '1000', receiver: vaultAddress, owner: vaultAddress });
await account.execute([call]);
```

**claimRedeem(params: ClaimRedeemParams): Call**
- Purpose: Build a claim redeem `Call` to claim an earlier redeem request by `id`.
- Params: `{ target: string; id: BigNumberish }`
- Returns: a `Call` with `id` encoded as `uint256`.
- Errors: throws if `claim_redeem` leaf missing.
- Example:

```ts
const call = sdk.claimRedeem({ target: vaultAddress, id: '42' });
await account.execute([call]);
```

## Avnu functions

**multiRouteSwap(params: MultiRouteSwapParams): Call**
- Purpose: Build a swap `Call` that serializes multiple routes and amounts to swap tokens via the Avnu aggregator.
- Params: `MultiRouteSwapParams` (see SDK types) — includes `target`, `sell_token_address`, `sell_token_amount`, `buy_token_address`, `buy_token_amount`, `buy_token_min_amount`, `integrator_fee_amount_bps`, `integrator_fee_recipient`, `routes: Route[]`, and `beneficiary`.
- Returns: a `Call` with all amounts encoded as `uint256`s and the `routes` array serialized.
- Errors: throws if the configured `multi_route_swap` leaf is not found.
- Tip: Use `multiRouteSwapHelper` to automatically add an approval call for the sell token when needed.
- Example:

```ts
const calls = sdk.multiRouteSwapHelper({
	target: swapRouterAddress,
	sell_token_address: sellToken,
	sell_token_amount: '1000000',
	buy_token_address: buyToken,
	buy_token_amount: '0',
	buy_token_min_amount: '1',
	integrator_fee_amount_bps: 0,
	integrator_fee_recipient: feeRecipient,
	routes: [{ sell_token: sellToken, buy_token: buyToken, exchange_address: exch, percent: '100', additional_swap_params: [] }]
});
await account.execute(calls);
```

## Vesu V2 functions

`modifyPositionV2(params: ModifyPositionParamsV2): Call`
- Purpose: Build a modify-position `Call` to borrow or repay funds on Vesu V2.
- Params: `ModifyPositionParamsV2` — includes `target`, `collateral_asset`, `debt_asset`, `collateral: AmountV2`, `debt: AmountV2`, and `user`.
- Returns: a `Call` with the ModifyPosition data encoded.
- Errors: throws if the `modify_position` leaf for Vesu V2 is not present in the config.
- Example:

```ts
const paramsV2 = {
	target: poolAddress,
	collateral_asset: collAsset,
	debt_asset: debtAsset,
	collateral: { denomination: 'Native', value: { abs: '1000', is_negative: false } },
	debt: { denomination: 'Native', value: { abs: '0', is_negative: false } },
	user: vaultAddress
};
const call = sdk.modifyPositionV2(paramsV2);
await account.execute([call]);
```

## Final notes

We here only outlined a subset of the available features in the Starknet-Vault-Kit SDK. For the full documentation and more examples please refer to the SDK's GitHub repository [here](https://github.com/ForgeYields/starknet_vault_kit/tree/main/sdk).