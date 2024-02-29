---
id: create-market
title: How to create a new lending market
sidebar_label: Create Market
sidebar_position: 2
slug: /create/create-market
---

In this section, we'll learn how to create new VESU markets.

Creating VESU markets can't be done from the VESU website, as we currently do not support this feature (coming soon).

Having established that, we are going to look at how you can create a market by calling the VESU core smart contracts.

1. Head to the deployed VESU contract on Starkscan/Voyager, connect your wallet and call the `create_pool` method.

2. Pass in the required arguments:
- `asset_params`: Which is an array of the asset parameters
- `max_position_ltv_params`: Which is an array of the loan-to-value parameters
- `extension`: Which is the address of the deployed extension you'll like to use for the pool

3. On creation, you should get returned your new pool ID.