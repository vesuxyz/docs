---
slug: 2026-01-07-Re7-pool-upgrade
title: Re7 Pool Upgrade
authors: [marc]
tags: [Announcement]
---

# Re7 Pool Upgrade


Re7 Labs, the main curator behind Vesu’s BTCFi pools, has upgraded their remaining legacy pools to V2.

Affected positions are guided through a simple, one-click migration flow directly in the Vesu UI.

<img of migration flow or how marked in position overview>

## TL;DR

- Re7 Labs’ remaining V1 pools are migrating to V2   
- The Re7 USDC V1 pool is being deprecated
- Migration is live and handled directly in the app  
- Funds remain safe throughout  

## New Re7 Pools

| V1 pool | New V2 pool |
|--------|-------------|
| Re7 xSTRK | Re7 STRK |
| Re7 wstETH | Re7 ETH |
| Re7 Starknet Ecosystem | Re7 Labs Starknet Ecosystem |

#### Note on Re7 STRK

Previously, the Re7 xSTRK pool used the STRK price directly, as this was the most reliable oracle available at the time of launch.

With the migration to V2, the Re7 STRK pool now uses the xSTRK conversion rate price feed.

As part of the migration, xSTRK positions will reflect their full underlying value. In the migration flow, you will see a higher USD value for xSTRK compared to before (around +12% based on current rates).

<img of xSTRK migration>

## Re7 USDC pool deprecation

The **Re7 USDC** pool is being deprecated.

Markets from this pool are migrated as follows:
- ETH and wstETH → **Re7 ETH**  
- STRK → **Re7 STRK**  
- USDC.e → **native USDC in Re7 USDC Core**  
- WBTC → **Re7 USDC Core**

BTCFi rewards for WBTC continue in the Re7 USDC Core pool.

## V2 as the new standard

With this upgrade, all liquidity is coming fully to V2.

This allows:
- Fewer markets and less fragmentation  
- A simpler, clearer UX  
- Full focus on V2 going forward  
- Improved smart contracts as the single standard  

V2 is now the foundation for all future improvements on Vesu.

If you have any questions, feel free to reach out in Discord. We’re happy to help.