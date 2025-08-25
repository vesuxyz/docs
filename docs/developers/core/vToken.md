---
id: vtoken
title: vToken contract
sidebar_label: vToken
sidebar_position: 4
---

The Vesu `VToken` is a simple vault that is deployed by the `PoolFactory` for each asset in a pool. It offers a conveninent way for lenders to supply (withdraw) assets in (from) the corresponding Vesu pool. The `vToken` follows the ERC-4626 interface and uses OpenZeppelin's standard implementation.

We here only discuss the specific hook implementations in the `VToken` contract. For more information on OpenZeppelin's ERC-4626 implementation, see their source code [here](https://github.com/OpenZeppelin/cairo-contracts/blob/main/packages/token/src/erc20/extensions/erc4626/erc4626.cairo).

:::info
The `VToken` implementation does not make use of the OpenZeppelin ERC-4626 vault's fee feature. No fees are taken in a `VToken`. 
:::

## ERC-4626 Hook Implementations

OpenZeppelin's ERC-4626 vault allows custom implementations to change the behavior of certain functions through a system of hooks, that are used by these functions. We here discuss the specific implementation of these hooks by Vesu's `VToken` contract.

### get_total_assets Hook

The vault's total assets are computed by converting the total vault shares, which translates directly to collateral shares in the underlying Vesu pool, to assets using the pool's conversion logic.

```
fn get_total_assets(self: @ERC4626Component::ComponentState<TContractState>) -> u256 {
    self
        .vesu_pool()
        .calculate_collateral(
            self.asset.read(), i257_new(self.erc20.total_supply(), true)
        )
}
```

### before_deposit Hook

tbd

### after_deposit Hook

tbd

### before_withdraw Hook

tbd

### after_withdraw Hook

tbd